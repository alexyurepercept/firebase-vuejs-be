import { Application } from "express";
import { api } from "../controllers";
import { isAuthenticated, isAuthorized } from "../auth";

export default function(app: Application) {
  app.get("/basic", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "basic"] }),
    api
  ]);

  app.get("/admin", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin"] }),
    api
  ]);
}
