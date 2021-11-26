import { Context } from "@starter-project/api/context";
import {
  arg,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
  queryField,
  queryType,
  intArg,
} from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.string("email");
  },
});

const queryAllUsers = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });
  },
});

const queryOneUser = queryField((t) => {
  t.field("user", {
    type: User,
    args: {
      data: nonNull(arg({ type: UserWhereInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.findFirst({
        where: {
          id: args.data.id ?? undefined,
          name: args.data.name,
          email: args.data.email ?? undefined,
        },
      });
    },
  });
});

const createUser = mutationField((t) => {
  t.field("createUser", {
    type: User,
    args: {
      data: nonNull(arg({ type: UserCreateInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.create({ data: args.data });
    },
  });
});

const patchUser = mutationField((t) => {
  t.field("editUser", {
    type: User,
    args: {
      id: intArg(),
      data: nonNull(arg({ type: UserUpdateInput })),
    },
    resolve: (_parent, args, context: Context) => {
      return context.prisma.user.update({
        where: {
          id: args.id || undefined,
        },
        data: {
          name: args.data.name,
          email: args.data.email ?? undefined,
        },
      });
    },
  });
});

const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.string("name");
    t.nonNull.string("email");
  },
});

const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.string("name");
    t.string("email");
  },
});

const UserWhereInput = inputObjectType({
  name: "UserWhereInput",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
  },
});

export const userTypes = {
  User,
  queryAllUsers,
  queryOneUser,
  createUser,
  patchUser,
  UserCreateInput,
  UserUpdateInput,
  UserWhereInput,
};
