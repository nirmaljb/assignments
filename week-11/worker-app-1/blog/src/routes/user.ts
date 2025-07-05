import { type PrismaClient } from "@prisma/client";
import { type Context, Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'

type Bindings = {
    JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.post('/signup', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
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
        return c.json({ message: 'Something went wrong', error: err}, 500);
    }
});

app.post('/signin', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
        const { email, password } = await c.req.json();
        console.log(email, password);
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user) return c.json({ message: "User doesn't exist" }, 404);

        if(user.password != password) return c.json({ message: 'invalid credientials' }, 401);

        const payload = {
            "unique_id": user.unique_id,
            "username": user.username,
            "email": user.email
        };

        const token = await sign(payload, c.env.JWT_SECRET);

        return c.json({ message: 'User logged in', token });
    }catch(err) {
        return c.json({ message: 'Something went wrong', error: err}, 500);
    }
});

export default app;