import "dotenv/config";

import "./database";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import express from "express";

import UsersResource from "./resources/UsersResource";
import ProjectsResource from "./resources/ProjectsResource";
import TasksResource from "./resources/TasksResource";

import User from "./models/user";

import locale from "./locales";
import theme from "./theme";

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();

app.use("/public", express.static("public"));

const adminJS = new AdminJS({
  databases: [],
  rootPath: "/admin",
  dashboard: {
    component: AdminJS.bundle("./components/Dashboard/index"),
  },
  resources: [UsersResource, ProjectsResource, TasksResource],
  branding: {
    companyName: "Kakau Tech",
    logo: "/public/kakau.webp",
    favicon: "/public/favicon.webp",
    softwareBrothers: false,
    theme,
  },
  ...locale,
});

// const router = AdminJSExpress.buildRouter(adminJS);
const router = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    }

    return false;
  },
  cookiePassword: process.env.SECRET,
});

app.use(adminJS.options.rootPath, router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`AdminJS is under ${port}/admin`);
});
