const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const purchases = await prisma.purchase.findMany({ include: { user: true } });
    console.log(JSON.stringify(purchases, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
