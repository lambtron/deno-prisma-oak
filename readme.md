# How to create a RESTful API with Prisma and Oak

[Prisma](https://prisma.io) has been one of our top requested modules to work
with in Deno. The demand is understandable, given that Prisma's developer
experience is top notch and plays well with so many persistent data storage
technologies.

We're excited to show you how to use Prisma with Deno.

In this How To guide, we'll setup a simple RESTful API in Deno using Oak and
Prisma.

Let's get started.

1. Setup the application

```shell
mkdir rest-api-with-prisma-oak
cd rest-api-with-prisma-oak
deno run -A npm:prisma init
```

Update the `prisma/schema.prisma` with the following:

```ts
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["deno"]
  output = "../generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Dinosaur {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  description String
}
```

Create a `.env` file and update the connection string with your actual
PostgreSQL connection string.

2. Create the database schema

```shell
deno run -A npm:prisma db push
```

3. Generate a Prisma client for Data Proxy

```shell
deno run -A npm:prisma generate --data-prxoxy
```

4. Create a repository and connect to GitHub

In order to use Prisma Data Platform, we'll first have to create a GitHub repo.

Initialize your repository, add the remote origin, then push to the repo.

5. Import your Project into Prisma Data Platform

Next, sign up for a free
[Prisma Data Platform account](https://cloud.prisma.io/).

Click **New Project** and select **Import a Prisma Repository**.

It'll ask for your PostgreSQL connection string, which you have in your `.env`.
Paste it here. Then click **Create Project**.

You'll receive a new connection string that begins with `prisma://`. You'll use
it in the next section.

6. Set the Data Proxy Connection string in your environment.

Replace the PostgreSQL connection string in your `.env` file with your new Data
Proxy connection string.

Now install `dotenv-cli` locally:

```shell
npm install dotenv-cli
```

Let's create a seed script to seed the database.

7. Seed your Database

Create `./prisma/seed.ts`:

```shell
touch mkdir prisma/seed.ts
```

And in `./prisma/seed.ts`:

```ts
import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";

const prisma = new PrismaClient();

const dinosaurData: Prisma.DinosaurCreateInput[] = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: "Abel's lizard has been reconstructed from a single skull.",
  },
  {
    name: "Acanthopholis",
    description: "No, it's not a city in Greece.",
  },
];

/**
 * Seed the database.
 */

for (const u of dinosaurData) {
  const dinosaur = await prisma.dinosaur.create({
    data: u,
  });
  console.log(`Created dinosaur with id: ${dinosaur.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();
```

We can now run `seed.ts` with:

```shell
npx dotenv -- deno run -A prisma/seed.ts
```

After doing so, your Prisma dashboard should show the new dinosaurs:

![New dinosaurs are in Prisma dashboard](/static/1-dinosaurs-in-prisma.png)

8. Create your API routes

We'll use [`oak`](https://deno.land/x/oak) to create the API routes. Let's keep
them simple for now.

In your `main.ts` file:

```ts
import { PrismaClient } from "./generated/client/deno/edge.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

/**
 * Initialize.
 */

const prisma = new PrismaClient();
const app = new Application();
const router = new Router();

/**
 * Setup routes.
 */

router
  .get("/", (context) => {
    context.response.body = "Welcome to the Dinosaur API!";
  })
  .get("/dinosaur", async (context) => {
    // Get all dinosaurs.
    const dinosaurs = await prisma.dinosaur.findMany();
    context.response.body = dinosaurs;
  })
  .get("/dinosaur/:id", async (context) => {
    // Get one dinosaur by id.
    const { id } = context.params;
    const dinosaur = await prisma.dinosaur.findUnique({
      where: {
        id: Number(id),
      },
    });
    context.response.body = dinosaur;
  })
  .post("/dinosaur", async (context) => {
    // Create a new dinosaur.
    const { name, description } = await context.request.body("json").value;
    const result = await prisma.dinosaur.create({
      data: {
        name,
        description,
      },
    });
    context.response.body = result;
  })
  .delete("/dinosaur/:id", async (context) => {
    // Delete a dinosaur by id.
    const { id } = context.params;
    const dinosaur = await prisma.dinosaur.delete({
      where: {
        id: Number(id),
      },
    });
    context.response.body = dinosaur;
  });

/**
 * Setup middleware.
 */

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * Start server.
 */

await app.listen({ port: 8000 });
```

Now, let's run it:

```shell
npx dotenv -- deno run -A main.ts
```

Let's visit `localhost:8000/dinosaurs`:

![List of all dinosaurs from REST API](/static/2-dinosaurs-from-api.png)

Next, let's `POST` a new user with this `curl` command:

```shell
curl -X POST http://localhost:8000/dinosaur -H "Content-Type: application/json" -d '{"name": "Deno", "description":"The fastest, most secure, easiest to use Dinosaur ever to walk the Earth."}'
```

And in your Prisma dashboard, you should see a new row:

![New dinosaur Deno in Prisma](/static/3-new-dinosaur-in-prisma.png)

Nice!

## What's next?

Building your next app will be more productive and fun with Deno and Prisma,
since both technologies deliver an intuitive developer experience with data
modeling, type-safety, and robust IDE support.

If you're interested in connecting Prisma to Deno Deploy,
[check out this awesome guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-deno-deploy).

We're excited to see what you build.

_Stuck? Come get help on [Twitter](https://twitter.com/deno_land) or in our
[Discord](https://discord.gg/deno)._
