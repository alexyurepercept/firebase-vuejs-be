import { Request, Response } from "express";
import * as admin from "firebase-admin";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: Function
) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ message: "user is not authenticated" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).send({ message: "user is not authenticated" });

  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "user is not authenticated" });

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    console.log("decodedToken", JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      ...decodedToken
    };
    return next();
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: "user is not authenticated" });
  }
}

export function isAuthorized(args: { hasRole: Array<"admin" | "basic"> }) {
  return (req: Request, res: Response, next: Function) => {
    for (const expectedRole of args.hasRole) {
      if (res.locals[expectedRole] === true) {
        return next();
      }
    }

    return res.status(403).send({ message: "user is not authorized" });
  };
}
