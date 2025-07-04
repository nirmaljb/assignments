import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";
import { Pool } from "pg";

type Bindings = {
    DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.post('/signup', async (c: Context) => {
    // const prisma = getPrisma(c.env.DATABASE_URL)
    const connectionString = c.env.DATABASE_URL;
    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });
    try {
        const { username, email, password } = await c.req.json();
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });

        return c.json({ message: 'user_created', unique_id: user.unique_id });
    }catch(err) {
        return c.json({ message: 'Something went wrong', error: err}, 400);
    }
})

export default app;