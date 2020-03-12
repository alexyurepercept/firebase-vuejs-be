import { Request, Response } from "express";

export async function basicApi(req: Request, res: Response) {
  return res.status(200).send({ status: "ok" });
}
