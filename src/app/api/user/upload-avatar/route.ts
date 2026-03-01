import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('auth_session');

        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(authCookie.value);

        const formData = await req.formData();
        const file = formData.get('avatar') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert image buffer to base64 Data URI
        const base64Image = buffer.toString('base64');
        const mimeType = file.type;
        const avatarUrl = `data:${mimeType};base64,${base64Image}`;

        // Update user in DB
        await prisma.user.update({
            where: { id: session.id },
            data: { avatarUrl }
        });

        return NextResponse.json({ message: 'Avatar uploaded successfully', avatarUrl });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload avatar' }, { status: 500 });
    }
}
