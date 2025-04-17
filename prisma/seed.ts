import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    // Drivers
    {
      name: 'Innova Destroyer',
      price: 16.99,
      image: '/images/destroyer.jpg',
      description: 'Overstable distance driver perfect for forehand and backhand.',
      category: 'drivers',
    },
    // Midranges
    {
      name: 'Discraft Buzzz',
      price: 14.99,
      image: '/images/buzzz.jpg',
      description: 'One of the most popular midranges ever made.',
      category: 'midranges',
    },
    // Putters
    {
      name: 'Gateway Wizard',
      price: 12.99,
      image: '/images/wizard.jpg',
      description: 'Beadless putter with a neutral flight and great grip.',
      category: 'putters',
    },
    // Accessories
    {
      name: 'Innova Dewfly Towel',
      price: 8.99,
      image: '/images/dewfly.jpg',
      description: 'Super absorbent towel to keep your discs dry.',
      category: 'accessories',
    },
    {
      name: 'Dynamic Discs Mini Marker',
      price: 3.99,
      image: '/images/mini-marker.jpg',
      description: 'PDGA approved mini marker disc.',
      category: 'accessories',
    },
    {
      name: 'Grip EQ Disc Golf Bag',
      price: 199.99,
      image: '/images/grip-eq-bag.jpg',
      description: 'High-quality disc golf bag with room for everything.',
      category: 'accessories',
    },
  ];

  for (const product of products) {
    try {
      await prisma.product.create({
        data: product,
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        console.log(`⚠️  Skipped duplicate: ${product.name}`);
      } else {
        throw e;
      }
    }
  }

  console.log('🌱 Seeded products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
