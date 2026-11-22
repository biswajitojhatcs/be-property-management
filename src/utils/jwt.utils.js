import "dotenv/config";
import { SignJWT, jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const signToken = (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(encodedKey);
};

export const verifyToken = async (token) => {
  const { payload } = await jwtVerify(token, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload;
};
