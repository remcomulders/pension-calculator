# Pension Calculator

An application to calculate your pension for a given pension age.

## What's inside?

This mono repo includes the following services:

### Services

-   `api`: a [Spring Boot](https://spring.io/projects/spring-boot) server
-   `web`: an [Angular](https://angular.dev/) app

## Requirements

-   [Node](https://formulae.brew.sh/formula/node)
-   [Java](https://formulae.brew.sh/formula/openjdk)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://formulae.brew.sh/formula/docker-compose)

## Start

To start the application, you need Docker with `docker-desktop` installed.
First, install all `node_modules` run:

`cd services/web && npm i && cd ../..`

Then run:

`docker compose up --build`

This will start all applications with the PostgreSQL database, Java Spring Boot, Angular, and Adminer in a Docker container.

Navigate to:

`http://localhost:4200`

Use the email `johndoe@befrank.nl` to test with.

## Folder structure

The root of the Monorepo contains the turborepo configuration files, and the main package.json which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory | What goes inside of it        |
| --------- | ----------------------------- |
| services  | All backend and frontend apps |
