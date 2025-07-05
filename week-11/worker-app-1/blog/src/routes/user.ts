import { PrismaClient } from "@prisma/client";
import { type Context, Hono } from "hono";

const app = new Hono();

app.post('/signup', async (c: Context) => {
    const prisma: PrismaClient = c.get('prisma');
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
});

app.post('/signin', async (c: Context) => {
    const prisma: PrismaClient = c.get('prisma');
    try {
        const { email, password } = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user) return c.json({ message: "User doesn't exist" }, 404);

        if(user.password != password) return c.json({ message: 'invalid credientials' }, 401);
        return c.json({ user });
    }catch(err) {
        return c.json({ message: 'Something went wrong', error: err}, 400);
    }
});

export default app;