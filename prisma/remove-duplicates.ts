import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function removeDuplicates() {
  const products = await prisma.product.findMany();

  const seen = new Set();
  const duplicates = [];

  for (const product of products) {
    const key = `${product.name}-${product.price}-${product.description}-${product.category}`;
    if (seen.has(key)) {
      duplicates.push(product.id); // store duplicate IDs
    } else {
      seen.add(key);
    }
  }

  // Delete duplicates by ID
  await prisma.product.deleteMany({
    where: {
      id: { in: duplicates },
    },
  });

  console.log(`🧹 Removed ${duplicates.length} duplicate products.`);
}

removeDuplicates()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
