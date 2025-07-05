import type { Context, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

type Bindings = {
    DATABASE_URL: string
}

export const prisma = (): MiddlewareHandler =>
    createMiddleware<{ Bindings: Bindings }>(async (ctx: Context, next: any) => {
        if (!ctx.get('prisma')) {
            const connectionString = ctx.env.DATABASE_URL;
            const adapter = new PrismaPg({ connectionString });
            ctx.set('prisma', new PrismaClient({ adapter }));
        }
        await next();
    }
);