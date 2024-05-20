import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

declare global {
  var prisma: PrismaClient | undefined
}

function getPrismaClient() {
  const neon = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(neon)
  return new PrismaClient({ adapter })
}

// NOTE: This is done to avoid multiple instances of PrismaClient in development.
export const prisma = globalThis.prisma || getPrismaClient()
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
