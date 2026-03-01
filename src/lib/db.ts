// Mock type so things don't break
export type User = {
    id: string;
    email: string;
    username: string | null;
    password?: string;
    avatarUrl?: string | null;
    role?: string;
};

export const prisma = {
    user: {
        findMany: async () => [],
        findFirst: async () => null,
        findUnique: async () => null,
        create: async (args: any) => ({ ...args.data, id: "mock_id" }),
        update: async (args: any) => ({ ...args.data }),
        delete: async () => null,
    }
};

export async function getUsers() { return []; }
export async function getUserByUsername(username: string) { return null; }
export async function getUserByEmail(email: string) { return null; }
export async function addUser(user: any) { return user; }
export async function updateUser(id: string, updatedUser: any) { return updatedUser; }
export async function deleteUser(userId: string) { return null; }
