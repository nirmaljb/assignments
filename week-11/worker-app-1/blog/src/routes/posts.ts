import { type PrismaClient } from "@prisma/client";
import { type Context, Hono } from "hono";
import { verify } from "hono/jwt";

type Bindings = {
    JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
        const posts = await prisma.blog.findMany({});
        return c.json({ posts });
    }catch(error) {
        return c.json({ message: 'Something went wrong', error }, 500);
    }
});

app.post('/', async (c: Context) => {
    try {
        const { title, body, authorId } = await c.req.json();
        const prisma: PrismaClient = c.get('prisma');
        
        const post = await prisma.blog.create({
            data: {
                title,
                body,
                authorId
            }
        });
        
        return c.json({ message: 'Post created!', post_id: post.unique_id});

    }catch(error) {
        return c.json({ message: 'Something went wrong', error }, 500);
    }
});

export default app;
