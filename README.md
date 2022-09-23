# UMP-React-Frontend

Site location: [www.ultra-music-practice.com](https://www.ultra-music-practice.com)

Frontend of a computer vision based music sheet fingering generator and sight-reading assistant. Helps generate useful annotations on music sheets for piano beginners. The service is **PAID** so this repository only includes frontend part.

<p float="left">
  <img width="250" alt="UMP1" src="https://user-images.githubusercontent.com/30245379/191986643-6539d7ac-8311-49b5-9023-c548c1ee52b1.png">
  <img width="250" alt="UMP2" src="https://user-images.githubusercontent.com/30245379/191986656-e2fe9883-b1b6-414f-89bc-2de12d68474c.png">
  <img width="250" alt="UMP3" src="https://user-images.githubusercontent.com/30245379/191986666-33987257-c2f8-44d3-b475-219b327a48d9.png">
</p>

## ✨ Features

* 🎨 Stylish design with rich CSS
* 📚 Strightforward user experience
* 🌋 Robust music sheet upload and progress tracking
* 🚧 JWT based authentication with "Sign in with Google" integration

## 🖥 Technologies

* Language: [TypeScript](https://www.typescriptlang.org)
* UI Framework: [React.js](https://reactjs.org)
* Component Library: [Chakra.js](https://chakra-ui.com)
* Application Framework: [Next.js](https://nextjs.org)

## 📦 Usage

**IMPORTANT: If you need to develop locally, make sure to create a file named .env.local in the root directory to configure API endpoint like this:**

```shell
NEXT_PUBLIC_API_END_POINT=https://www.example.com/path
```

Replace https://www.example.com/path with the actual host name and api path of backend server.

The file .env.local will not be uploaded to GitHub, and the variable should be set during deployment.

This project is initialized with PNPM. To install all dependencies, run:

```shell
pnpm install
```

To start the development server, run:

```shell
pnpm run dev
```

The project does not support static build. To create an optimized production build, run:

```shell
pnpm run build
```

Then run the following command to start the production server:

```shell
next
```

## 🎉 Frontend Controbutors

* [Haoxiang Sun](https://github.com/haoxsun23): Product Designer
* [Raymond Wu](https://github.com/RaymondWHZ): Fullstack Developer
* [Peiran Wang](https://github.com/Peirannnn): UI Designer & Developer
* [Qinyue Sun](mailto:qingyue7@illinois.edu): UI Desginer
