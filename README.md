# UMP-React-Frontend

## Introduction

This is the frontend of online music practice application "Ultra Music Practice", powered by React.js, Next.js, and Chakra.js, programmed in TypeScript.

## Usage

**IMPORTANT: If you need to develop locally, make sure to create a file named .env.local in the root directory to configure API endpoint like this:**

```shell
NEXT_PUBLIC_APT_END_POINT=https://www.example.com/path
```

Replace https://www.example.com/path with the actual host name and api path of backend server.
The file .env.local will not be uploaded to GitHub, and the variable will be set automatically during depolyment.

This project is initialized with PNPM. To install all dependencies, run:

```shell
pnpm install
```

To start the development server, run:

```shell
pnpm run dev
```

To produce a static production build, run:

```shell
pnpm run build
```

Static build can be found in directory named 'out'.
