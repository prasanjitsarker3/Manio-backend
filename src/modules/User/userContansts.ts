import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { _id: string; role: string; email: string },
  secret: string,
  expiresIn: string
) => {
  const accessToken = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return accessToken;
};

export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;
