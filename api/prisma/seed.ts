import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const user of userData) {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${newUser.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
