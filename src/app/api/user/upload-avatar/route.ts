import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const authCookie = req.headers.get('cookie')?.split('auth_session=')[1]?.split(';')[0];
        if (!authCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = JSON.parse(decodeURIComponent(authCookie));

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

        // Create unique filename
        const ext = path.extname(file.name) || '.jpg';
        const filename = `${session.id}-${Date.now()}${ext}`;

        // Setup save path
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);

        // Write file
        fs.writeFileSync(filepath, buffer);

        // Update user in DB
        const avatarUrl = `/uploads/avatars/${filename}`;

        return NextResponse.json({ message: 'Avatar uploaded successfully', avatarUrl });
    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload avatar' }, { status: 500 });
    }
}
