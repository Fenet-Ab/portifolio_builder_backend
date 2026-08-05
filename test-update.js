const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log("No users found");
    return;
  }
  const user = users[0];
  console.log("Testing with user:", user.id);

  // create profile
  try {
    const p1 = await prisma.profile.create({
      data: {
        userId: user.id,
        fullName: "Test",
        title: "Test",
        bio: "Test"
      }
    });
    console.log("Created:", p1);
  } catch(e) {
    console.log("Create err:", e.message);
  }

  // update profile
  try {
    const p2 = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        title: "Updated Title"
      }
    });
    console.log("Updated:", p2);
  } catch(e) {
    console.log("Update err:", e.message);
  }
}
main().finally(() => prisma.$disconnect());
