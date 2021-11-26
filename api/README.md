

# GraphQL Server with Authentication & Permissions

This project uses the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation
- [**GraphQL Shield**](https://github.com/maticzav/graphql-shield): Authorization/permission layer for GraphQL schemas
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations           
- [**PostgreSQL**](https://www.postgresql.org/): Open Source Relational Database

Based on [@prisma/prisma-examples/graphql-auth](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth)

## Contents

- [Getting Started](#getting-started)

## Getting started

### 1. Download project and install dependencies

Clone this repository:

```
git clone git@github.com:tmtecnologia/graphql-typescript-starter-project.git --depth=1
```

Install yarn dependencies:

```
cd api
yarn install
```

### 2. Create and seed the database

Create a `.env` file and add the following variables

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
POSTGRES_PORT=5432
POSTGRES_DB=development
PGDATA=/var/lib/postgresql/data/pgdata
DATABASE_URL=postgresql://postgres:<POSTGRES_PASSWORD>@localhost:5432/development?schema=public
```

create a password and substitute `<POSTGRES_PASSWORD>`

create a docker volume
```bash
docker volume create graphql_postgres
```

`DATABASE_URL` will be used by prisma in [`prisma/schema.prisma`](./prisma/schema.prisma)

Install PostgreSQL in your host machine and start a server OR install Docker and use `psql.sh` script 

Run the following command to create your PostgreSQL database. This creates the `User` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
yarn prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
yarn prisma db seed
```

### 3. Create APP_SECRET variable

Add a new variable to `.env`

```
APP_SECRET=<YOUR-APP-SECRET>
```

This will be used in Authentication


### 4. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).