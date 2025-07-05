import { Hono } from 'hono'
import user from "./routes/user";
import { prisma } from './middleware/prisma';

const app = new Hono()

app.use('api/v1/*', prisma());
app.route('api/v1/user', user);

export default app
