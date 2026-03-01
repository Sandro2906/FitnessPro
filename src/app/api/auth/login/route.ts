import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const username = (body.username || '').trim();
        const password = body.password || '';

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const user = await getUserByUsername(username);
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials. User not found.' }, { status: 401 });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json({ message: 'Login successful', user: userWithoutPassword });

        // Set a very simple cookie for auth (in production use JWT or NextAuth)
        response.cookies.set({
            name: 'auth_session',
            value: JSON.stringify({ id: user.id, username: user.username }),
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to process request: ' + error.message }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.delete('auth_session');
    return response;
}
