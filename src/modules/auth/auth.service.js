import { hashPassword } from "../../utils/password.utils.js";
import * as authRepository from "./auth.repository.js";

export const registerUser = async (data) => {
  const hashedPassword = await hashPassword(data.password);
  return authRepository.createUser({ ...data, password: hashedPassword });
};
