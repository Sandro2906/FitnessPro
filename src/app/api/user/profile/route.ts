import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const authCookie = req.headers.get('cookie')?.split('auth_session=')[1]?.split(';')[0];
        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(decodeURIComponent(authCookie));

        // Mock User response
        const user = {
            id: session.id,
            username: session.username || 'mock_user',
            email: 'mock@example.com',
            age: 25,
            phone: '',
            role: 'user',
            avatarUrl: null
        };

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export async function PUT(req: Request) {
    try {
        const authCookie = req.headers.get('cookie')?.split('auth_session=')[1]?.split(';')[0];
        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(decodeURIComponent(authCookie));
        const updates = await req.json();

        // Ignore attempt to update protected fields
        delete updates.username;
        delete updates.email;
        delete updates.id;

        if (updates.password) {
            const crypto = await import('crypto');
            updates.password = crypto.createHash('sha256').update(updates.password).digest('hex');
        }

        const updatedUser = {
            id: session.id,
            username: session.username || 'mock_user',
            email: 'mock@example.com',
            ...updates
        };

        const { password, ...safeUser } = updatedUser;
        return NextResponse.json({ message: 'Profile updated', user: safeUser });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const authCookie = req.headers.get('cookie')?.split('auth_session=')[1]?.split(';')[0];
        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(decodeURIComponent(authCookie));
        const user = {
            id: session.id,
            avatarUrl: null
        };

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete old avatar if exists
        if (user.avatarUrl) {
            const fs = await import('fs');
            const path = await import('path');
            const oldAvatarPath = path.join(process.cwd(), 'public', user.avatarUrl as string);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // Mock DB delete
        // await prisma.user.delete({ where: { id: session.id } });

        // Delete auth cookie
        const res = NextResponse.json({ message: 'Account deleted' });
        res.cookies.set('auth_session', '', { maxAge: 0, path: '/' });

        return res;

    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
