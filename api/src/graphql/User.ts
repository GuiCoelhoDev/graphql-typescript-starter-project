import { Context } from "@starter-project/api/context";
import {
  arg,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
  queryField,
  queryType,
  stringArg,
} from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.nonNull.string("email");
  },
});

// TODO:
const queryUsers = queryField((t) => {
  t.list.field("users", {
    type: User,
    args: {
      name: stringArg(),
      email: stringArg(),
    },
  });
});

// TODO:
const createUser = mutationField((t) => {
  t.field("createOneUser", {
    type: User,
    args: {
      data: arg({ type: nonNull(UserCreateInput) }),
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

export const userTypes = {
  User,
  queryAllUsers,
  // queryUsers,
  // createUser,
  UserCreateInput,
};
