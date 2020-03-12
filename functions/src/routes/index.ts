import { Application } from "express";
import { api } from "../controllers";
import { isAuthenticated, isAuthorized } from "../auth";

export default function(app: Application) {
  app.get("/admin_only", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin"] }),
    api
  ]);
}
