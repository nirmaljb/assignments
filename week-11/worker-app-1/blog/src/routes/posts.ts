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

app.get('/:id', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
        const param_id = c.req.param('id');
        const post = await prisma.blog.findUnique({
            where: {
                unique_id: param_id
            }
        });
        return c.json({ post });
    }catch(error) {
        return c.json({ message: 'Something went wrong', error }, 500);
    }
});

app.put('/:id', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
        const param_id = c.req.param('id');

        const { title, body } = await c.req.json();

        const post = await prisma.blog.update({
            where: {
                unique_id: param_id
            },
            data: {
                title,
                body
            }
        });

        return c.json({ post });

    }catch(error) {
        if(error.code == 'P2025') return c.json({ message: 'No post found with that id' });
        return c.json({ message: 'Something went wrong', error }, 500);
    }
});

app.delete('/:id', async (c: Context) => {
    try {
        const prisma: PrismaClient = c.get('prisma');
        const param_id = c.req.param('id');
        const post = await prisma.blog.delete({
            where: {
                unique_id: param_id
            }
        });

        return c.json({ post });
    }catch(error) {
        if(error.code == 'P2025') return c.json({ message: 'No post found with that id' });
        return c.json({ message: 'Something went wrong', error }, 500);
    }
});

export default app;
