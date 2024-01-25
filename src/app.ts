import express, { Application } from "express";
import http from "http";
import { ActionCareersRouter } from "./routes/ActionCareersRouter";

export class App {
  app: Application;
  port: number | string;
  server: http.Server;
  private actionCareerRouter: ActionCareersRouter;
  constructor(port: number | string) {
    this.app = express();
    this.port = port;
    this.server = new http.Server();
    this.actionCareerRouter = new ActionCareersRouter();
  }

  startApplication() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  registerRoutes() {
    this.app.use("/", this.actionCareerRouter.router);
  }

  configureApplication() {
    this.registerRoutes();
    this.setMiddlewares();
    this.startApplication();
  }
}
