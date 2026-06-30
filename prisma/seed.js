const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const companies = [
  {
    name: 'DineQ Central AYCE',
    slug: 'dineq-central-ayce',
    address: 'Jl. Sudirman No. 18, Jakarta',
    phone: '021-5550-1001',
    admins: [
      { name: 'Ari Wibowo', email: 'ari.admin@dineq.test', role: 'owner' },
      { name: 'Mira Santika', email: 'mira.admin@dineq.test', role: 'manager' }
    ],
    users: [
      { name: 'Reno Saputra', phone: '0812-7000-1001', email: 'reno.user@dineq.test' },
      { name: 'Tasya Kirana', phone: '0812-7000-1002', email: 'tasya.user@dineq.test' }
    ]
  },
  {
    name: 'DineQ Garden Grill',
    slug: 'dineq-garden-grill',
    address: 'Jl. Kemang Raya No. 42, Jakarta',
    phone: '021-5550-2002',
    admins: [
      { name: 'Bima Hartono', email: 'bima.admin@dineq.test', role: 'owner' },
      { name: 'Clara Wijaya', email: 'clara.admin@dineq.test', role: 'manager' }
    ],
    users: [
      { name: 'Nadia Putri', phone: '0812-7000-2001', email: 'nadia.user@dineq.test' },
      { name: 'Yoga Pratama', phone: '0812-7000-2002', email: 'yoga.user@dineq.test' }
    ]
  }
];

async function main() {
  for (const companySeed of companies) {
    const company = await prisma.company.upsert({
      where: { slug: companySeed.slug },
      update: {
        name: companySeed.name,
        address: companySeed.address,
        phone: companySeed.phone
      },
      create: {
        name: companySeed.name,
        slug: companySeed.slug,
        address: companySeed.address,
        phone: companySeed.phone
      }
    });

    for (const admin of companySeed.admins) {
      await prisma.admin.upsert({
        where: { email: admin.email },
        update: {
          companyId: company.id,
          name: admin.name,
          role: admin.role
        },
        create: {
          companyId: company.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    }

    for (const user of companySeed.users) {
      const existingUser = await prisma.user.findFirst({ where: { phone: user.phone } });

      if (existingUser) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            companyId: company.id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        await prisma.user.create({
          data: {
            companyId: company.id,
            name: user.name,
            phone: user.phone,
            email: user.email
          }
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

