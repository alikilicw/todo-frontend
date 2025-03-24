# Next.js TODO Project Setup

This document explains how to set up and run a frontend project using Next.js.

The project is running on a docker container where located in Digitalocean cloud server. It can be reachable by this url: http://134.209.118.95:3000/

A sample user can be created by registering in usual process.

## Requirements

-   **Node.js**: v18 or later
-   **NPM** or **Yarn**

## Clone the Repository

```
git clone https://github.com/alikilicw/todo-frontend
cd todo-frontend
```

## Install Dependencies

If using NPM:

```
npm install
```

If using Yarn:

```
yarn install
```

## Configure Environment Variables

Create a `<span>.env</span>` file in the root directory and configure it as follows:

```
NEXT_PUBLIC_BACKEND_URL=http://<backend_host>:<backend_port>
```

Adjust the necessary variables according to your environment.

## Run the Project

### Run in Development Mode

```
npm run dev
```

### Build and Run in Production Mode

```
npm run build
npm run start
```

## Run with Docker

If using Docker, follow these steps:
