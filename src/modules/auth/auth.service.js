import { signToken } from "../../utils/jwt.utils.js";
import { comparePassword, hashPassword } from "../../utils/password.utils.js";
import * as authRepository from "./auth.repository.js";

export const registerUser = async (data) => {
  const hashedPassword = await hashPassword(data.password);
  const user = await authRepository.createUser({
    ...data,
    password: hashedPassword,
  });
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async (data) => {
  const user = await authRepository.findUserByEmail(data.email);
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (isPasswordValid) {
    const token = await signToken({ id: user.id, role: user.role });
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: token,
      tokenType: "Bearer",
    };
  }
  return null;
};
