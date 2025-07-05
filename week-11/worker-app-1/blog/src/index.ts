import { Hono, type Next } from 'hono'
import user from "./routes/user";
import posts from "./routes/posts";
import { prisma } from './middleware/prisma';
import { jwt } from 'hono/jwt';

type Bindings = {
    JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/v1/*', prisma());
// app.use('/api/v1/posts/*', (c, next: Next) => {
//     const jwtMiddleware = jwt({
//         secret: c.env.JWT_SECRET
//     })

//     return jwtMiddleware(c, next)
// })

app.route('api/v1/user', user);
app.route('api/v1/posts', posts);

export default app
