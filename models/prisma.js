const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;

//ทำให้เชื่อมกับ mysql ได้ npm@ prisma/client
