## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```


## Generate module

```bash
$ nest g module <module_name>
$ nest g service <service_name> <option>
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
##Prisma

[Prisma](https://www.prisma.io/docs)

## Installation

```bash
$ yarn add -D prisma
$ npx prisma init
```
# Help

```bash
$ npx prisma --help
```

# Create migrations from your Prisma schema, apply them to the database, generate artifacts

```bash
$ npx prisma migrate dev
```


# Studio

```bash
$ npx prisma studio
```

## Runing the container

```bash
$ docker-compose up -d
```

```bash
$ docker-compose up -d dev-db
```

# Stopping the container

```bash
$ docker-compose down
```