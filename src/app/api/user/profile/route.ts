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

        const user = await prisma.user.findUnique({ where: { id: session.id } });

        if (!user) {
            // Delete invalid auth cookie
            const res = NextResponse.json({ error: 'User not found or session expired' }, { status: 404 });
            res.cookies.set('auth_session', '', { maxAge: 0, path: '/' });
            return res;
        }

        // Calculate age
        let calculatedAge = 0;
        if (user.dateOfBirth) {
            const dob = new Date(user.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            calculatedAge = age;
        }

        const { password, ...safeUser } = user;
        // Inject calculated age for display
        return NextResponse.json({ ...safeUser, age: calculatedAge });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('auth_session');

        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(authCookie.value);
        const updates = await req.json();

        // Ignore attempt to update protected or calculated fields
        delete updates.username;
        delete updates.email;
        delete updates.id;
        delete updates.age; // calculated, not in DB
        delete updates.avatarUrl; // handled by separate route
        delete updates.createdAt;
        delete updates.dateOfBirth; // read-only on profile

        if (updates.password) {
            const crypto = await import('crypto');
            updates.password = crypto.createHash('sha256').update(updates.password).digest('hex');
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.id },
            data: updates
        });

        const { password, ...safeUser } = updatedUser;
        return NextResponse.json({ message: 'Profile updated', user: safeUser });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('auth_session');

        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(authCookie.value);
        const user = await prisma.user.findUnique({ where: { id: session.id } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await prisma.user.delete({ where: { id: session.id } });

        // Delete auth cookie
        const res = NextResponse.json({ message: 'Account deleted' });
        res.cookies.set('auth_session', '', { maxAge: 0, path: '/' });

        return res;

    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
