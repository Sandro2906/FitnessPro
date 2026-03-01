import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Utility functions for easy access
export async function getUserByUsername(username: string) {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: username } // Allow login by email as well
            ]
        }
    });
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email: email }
    });
}
