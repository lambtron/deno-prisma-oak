# How to create a RESTful API with Prisma and Oak

1. Setup the application

```
mkdir rest-api-with-prisma-oak
cd rest-api-with-prisma-oak
deno run -A npm:prisma init
```

Update the `prisma/schema.prisma` with the following:

```.prisma
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

Create a `.env` file and update the connection string with your actual PostgreSQL connection string.

2. Create the database schema

```
$ deno run -A npm:prisma db push
```

3. Generate a Prisma client for Data Proxy

```
$ deno run -A npm:prisma generate --data-prxoxy
```

4. Create a repository and connect to GitHub

5. Import your Project into Prisma Data Platform

6. Set the Data Proxy Connection string in your environment.

Replace the PostgreSQL connection string in your `.env` file with your new Data Proxy connection string.

Now install `dotenv-cli` locally:

```
npm install dotenv-cli
```

Let's create a seed script to seed the database.

7. Seed your Database

Create `./prisma/seed.ts`:

```
$ touch mkdir prisma/seed.ts
```

And in `./prisma/seed.ts`:

```ts

```

We can now run `seed.ts` with:

```
$ npx dotenv -- deno run -A prisma/seed.ts
Created dinosaur with id: 1
Created dinosaur with id: 2
Created dinosaur with id: 3
Seeding finished.
```

After doing so, your Prisma dashboard should show the new rows.

![]()

8. Create your API routes

We'll use [`oak`](https://deno.land/x/oak) to create the API routes. Let's keep them simple for now.

In your `main.ts` file:

```ts
```

Now, let's run it:

```
npx dotenv -- deno run -A main.ts
```

Let's visit `localhost:8000/users`:

[List all users]()

Next, let's `POST` a new user with this `curl` command:

```
$ curl
```

And in your Prisma dashboard, you should see a new row:

[]()

Nice!

## What's next?



prisma://aws-us-east-1.prisma-data.com/?api_key=wbvOXE_hypkbXo2S6w81nR8hOUZ7w7HjSQgSdDUEQIhcdh1MTME4HS0gTLDl8IPt