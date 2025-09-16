import { PrismaClient } from './generated/prisma'; // o desde tu ruta custom si usas `output` en schema.prisma

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('✅ Prisma conectado correctamente');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Error al conectar Prisma:', e);
  process.exit(1);
});
