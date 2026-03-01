import { NextResponse } from 'next/server';
import { getUserByUsername, getUserByEmail, prisma } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = (body.name || '').trim();
        const username = (body.username || '').trim();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        const dateOfBirth = body.dateOfBirth;
        const phone = (body.phone || '').trim();

        // Validacije
        if (!name || !username || !email || !password || !dateOfBirth) {
            return NextResponse.json({ error: 'Name, username, email, password, and date of birth are required' }, { status: 400 });
        }

        if (await getUserByUsername(username)) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
        }

        if (await getUserByEmail(email)) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // Jednostavan hash lozinke (u produkciji bi se koristio bcrypt)
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const newUser = {
            name,
            email,
            username,
            password: hashedPassword,
            dateOfBirth: new Date(dateOfBirth),
            phone: phone || '',
        };

        const createdUser = await prisma.user.create({
            data: newUser
        });

        // Vratimo korisnika bez lozinke
        const { password: _, ...userWithoutPassword } = createdUser;
        return NextResponse.json({ message: 'Registration successful', user: userWithoutPassword }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request: ' + error.message }, { status: 500 });
    }
}
