import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { arg, inputObjectType, mutationField, nonNull, objectType, queryField } from "nexus";

import { Context } from "../context";
import { APP_SECRET, getUserId } from "../utils";
import { UserCreateInput } from "./User";

export const signUp = mutationField((t) => {
  t.field("signup", {
    type: "AuthPayload",
    args: {
      data: nonNull(arg({ type: UserCreateInput })),
    },
    resolve: async (_parent, { data: { email, name, password } }, context: Context) => {
      const hashedPassword = await hash(password, 10);
      const user = await context.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
    description: "Creates a User and Auth JWT Token",
  });
});

export const login = mutationField((t) => {
  t.field("login", {
    type: "AuthPayload",
    args: {
      data: nonNull(arg({ type: UserLoginInput })),
    },
    resolve: async (_parent, { data: { email } }, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: { email },
      });
      return {
        token: sign({ userId: Number(user?.id) }, APP_SECRET),
        user,
      };
    },
    description: "Creates a Auth JWT Token for User, if email and password match db",
  });
});

export const whoami = queryField((t) => {
  t.nullable.field("whoami", {
    type: "User",
    resolve: (_parent, _args, context: Context) => {
      const id = Number(getUserId(context));
      return context.prisma.user.findUnique({
        where: { id },
      });
    },
    description: "Using Auth Header retrives user data from db",
  });
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token", { description: "JWT Token" });
    t.field("user", { type: "User" });
  },
});

export const UserLoginInput = inputObjectType({
  name: "UserLoginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
  description: "Type definition to a User Login",
});

export const loginTypes = {
  signUp,
  login,
  whoami,
  UserLoginInput,
  AuthPayload,
};
