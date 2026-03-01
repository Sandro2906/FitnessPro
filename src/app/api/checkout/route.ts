import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderID, programTitle, price } = body;

        if (!orderID || !programTitle) {
            return NextResponse.json({ error: 'Missing order details' }, { status: 400 });
        }

        // Get user session
        const cookieStore = await cookies();
        const authSession = cookieStore.get('auth_session');

        if (!authSession) {
            return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
        }

        const sessionObj = JSON.parse(decodeURIComponent(authSession.value));
        const user = await prisma.user.findUnique({ where: { id: sessionObj.id } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Production Email Setup (Gmail, Outlook, Hostinger, etc) via .env
        let transporter;

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.gmail.com",
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
        } else {
            // Fallback to test ethereal email if no real credentials provided
            let testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"FitPro Trening" <no-reply@fitpro.com>', // sender address
            to: user.email, // list of receivers
            subject: `Potvrda kupovine: ${programTitle}`, // Subject line
            text: `Poštovani ${user.username},\n\nVaša uplata u iznosu od ${price} za program "${programTitle}" (Broj narudžbe: ${orderID}) je uspješno obrađena.\n\nUskoro ćete dobiti svoj program!\n\nHvala na povjerenju,\nFitPro Tim`, // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #e50914;">Hvala na kupovini, ${user.username}!</h2>
                    <p style="font-size: 16px;">Vaša uplata za program <strong>${programTitle}</strong> je uspješno obrađena.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: left;">
                        <p style="margin: 5px 0;"><strong>Iznos:</strong> ${price}</p>
                        <p style="margin: 5px 0;"><strong>Broj narudžbe:</strong> ${orderID}</p>
                    </div>
                    <p style="color: #666;">Uskoro ćete dobiti instrukcije i pristup vašem programu.</p>
                    <p style="margin-top: 30px;">S poštovanjem,<br><strong>FitPro Tim</strong></p>
                </div>
            `, // html body
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", previewUrl);

        return NextResponse.json({
            message: 'Checkout success email sent',
            success: true,
            emailPreviewUrl: previewUrl
        });

    } catch (error: any) {
        console.error('Checkout API Error:', error);
        return NextResponse.json({ error: 'Internal server error while processing checkout' }, { status: 500 });
    }
}
