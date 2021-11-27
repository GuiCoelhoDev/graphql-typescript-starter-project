import { PrismaClient } from "@prisma/client";
import { Request } from "@types/express";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: Request;
}

export function createContext({ req }: { req: Request }): Context {
  return {
    req,
    prisma,
  };
}
