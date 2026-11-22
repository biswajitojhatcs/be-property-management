import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.validated.body;
  const user = await authService.registerUser({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  return res.status(201).json({
    message: "User registered successfully.",
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.validated.body;
  const loginResponse = await authService.loginUser({ email, password });
  if (loginResponse) {
    return res.status(200).json(loginResponse);
  }
  return res.status(401).json({ message: "Invalid email or password." });
};
