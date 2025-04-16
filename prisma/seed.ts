import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Innova Destroyer',
        price: 16.99,
        image: '/images/destroyer.jpg',
        description: 'Overstable distance driver perfect for forehand and backhand.',
        category: 'drivers',
      },
      {
        name: 'Discraft Buzzz',
        price: 14.99,
        image: '/images/buzzz.jpg',
        description: 'One of the most popular midranges ever made.',
        category: 'midranges',
      },
      {
        name: 'Gateway Wizard',
        price: 12.99,
        image: '/images/wizard.jpg',
        description: 'Beadless putter with a neutral flight and great grip.',
        category: 'putters',
      },
    ],
  });

  console.log('🌱 Seeded products!');
}

// Run the seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
