import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const neon = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(neon)
export const prisma = new PrismaClient({ adapter })
