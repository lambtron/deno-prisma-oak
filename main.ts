import { Prisma, PrismaClient } from "./generated/client/deno/edge.ts";
import {
  Application,
  helpers,
  Router,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";

const prisma = new PrismaClient();
const app = new Application();
const router = new Router();

router
  .get("/", async(context) => {
    context.response.body = "Hello, world!";
  })
  .get("/dinosaur", async(context) => {
    // Get all dinosaurs.
  })
  .get("/dinosaur/:id", async(context) => {
    // Get one dinosaur by id.
  })
  .post("/dinosaur", async(context) => {
    // Create a new dinosaur.
  })
  .delete("/dinosaur/:id", async(context) => {
    // Delete a dinosaur by id.
  })


  // .post("/signup", async (context) => {
  //   const { name, email, posts } = context.request.body;

  //   const postData = posts?.map((post: Prisma.PostCreateInput) => {
  //     return { title: post?.title, content: post?.content };
  //   });

  //   const result = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       posts: {
  //         create: postData,
  //       },
  //     },
  //   });
  //   context.response.body = result;
  // })
  // .post("/post", async (context) => {
  //   const { title, content, authorEmail } = context.request.body;
  //   const result = await prisma.post.create({
  //     data: {
  //       title,
  //       content,
  //       author: { connect: { email: authorEmail } },
  //     },
  //   });
  //   context.response.body = result;
  // })
  // .put("/post/:id/views", async (context) => {
  //   const { id } = context.params;
  //   try {
  //     const post = await prisma.post.update({
  //       where: { id: Number(id) },
  //       data: {
  //         viewCount: {
  //           increment: 1,
  //         },
  //       },
  //     });
  //     context.response.body = post;
  //   } catch (error) {
  //     context.response.body =
  //       `Post with ID ${id} does not exist in the database.`;
  //   }
  // })
  // .put("/publish/:id", async (context) => {
  //   const { id } = context.params;
  //   try {
  //     const postData = await prisma.post.findUnique({
  //       where: { id: Number(id) },
  //       select: {
  //         published: true,
  //       },
  //     });
  //     const updatedPost = await prisma.post.update({
  //       where: { id: Number(id) || undefined },
  //       data: { published: !postData?.published },
  //     });
  //     context.response.body = updatedPost;
  //   } catch (error) {
  //     context.response.body =
  //       `Post with ID ${id} does not exist in the database.`;
  //   }
  // })
  // .delete("/post/:id", async (context) => {
  //   const { id } = context.params;
  //   const post = await prisma.post.delete({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  //   context.response.body = post;
  // })
  // .get("/users", async (context) => {
  //   const users = await prisma.user.findMany();
  //   context.response.body = users;
  // })
  // .get("/user/:id/drafts", async (context) => {
  //   const { id } = context.params;
  //   const drafts = await prisma.user.findUnique({
  //     where: {
  //       id: Number(id),
  //     },
  //   })
  //     .posts({
  //       where: { published: false },
  //     });
  //   context.response.body = drafts;
  // })
  // .get("/post/:id", async (context) => {
  //   const { id }: { id?: string } = context.params;
  //   const post = await prisma.post.findUnique({
  //     where: { id: Number(id) },
  //   });
  //   context.response.body = post;
  // })
  // .get("/feed", async (context) => {
  //   const { searchString, skip, take, orderBy } = helpers.getQuery(context);
  //   const or: Prisma.PostWhereInput = searchString
  //     ? {
  //       OR: [
  //         { title: { contains: searchString as string } },
  //         { content: { contains: searchString as string } },
  //       ],
  //     }
  //     : {};

  //   const posts = await prisma.post.findMany({
  //     where: {
  //       published: true,
  //       ...or,
  //     },
  //     include: { author: true },
  //     take: Number(take) || undefined,
  //     skip: Number(skip) || undefined,
  //     orderBy: {
  //       updatedAt: orderBy as Prisma.SortOrder,
  //     },
  //   });

  //   context.response.body = posts;
  // });

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 8000 });
