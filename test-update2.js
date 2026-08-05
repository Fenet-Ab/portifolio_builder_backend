require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log("No users in db");
    return;
  }
  const user = users[0];
  console.log("Found user:", user.email);

  // Check profile
  let profile = await prisma.profile.findUnique({ where: { userId: user.id } });
  
  if (!profile) {
    console.log("Creating profile...");
    profile = await prisma.profile.create({
      data: {
        userId: user.id,
        fullName: "Original Name",
        title: "Original Title",
        bio: "Original Bio"
      }
    });
  }

  console.log("Current profile:", profile.fullName);

  console.log("Updating profile...");
  const updated = await prisma.profile.update({
    where: { userId: user.id },
    data: { fullName: "Updated Name " + Date.now() }
  });

  console.log("Updated profile:", updated.fullName);
}
main().finally(() => prisma.$disconnect());
