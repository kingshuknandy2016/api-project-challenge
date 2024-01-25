import { Router } from "express";
import { ActianCareersController } from "../controllers/ActianCareersController";

export class ActionCareersRouter {
  router: Router;
  actianCareersController: ActianCareersController;
  constructor() {
    this.router = Router();
    this.actianCareersController = new ActianCareersController();
    this.setRoutes();
  }

  setRoutes() {
    this.router.get(
      "/health",
      this.actianCareersController.getActionCareersHealthCheck
    );
    this.router.get(
      "/getOpenPositions",
      this.actianCareersController.getOpenPositions.bind(
        this.actianCareersController
      )
    );
  }
}
