
import { PrismaClient, Prisma } from "../generated/client/deno/edge.ts";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true
        }
      ]
    }
  }
]

/**
 * Seed the database.
 */

for (const u of userData) {
  const user = await prisma.user.create({
    data: u
  })
  console.log(`Created user with id: ${user.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();