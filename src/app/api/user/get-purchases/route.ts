import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('auth_session');

        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(authCookie.value);

        const userWithPurchases = await prisma.user.findUnique({
            where: { id: session.id },
            include: { purchases: true }
        });

        if (!userWithPurchases) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const programs = userWithPurchases.purchases.map(p => p.programId);

        return NextResponse.json({ programs });
    } catch (error: any) {
        console.error("Error fetching purchases:", error);
        return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 });
    }
}
