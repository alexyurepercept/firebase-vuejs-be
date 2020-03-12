import { Request, Response } from "express";

export async function api(req: Request, res: Response) {
  return res.status(200).send({ status: "ok" });
}
