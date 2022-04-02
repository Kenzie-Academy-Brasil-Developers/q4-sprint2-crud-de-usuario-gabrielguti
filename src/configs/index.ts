import dotenv from "dotenv";

dotenv.config();

export const config: {
  secretKey: any;
  expiresIn: string;
} = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN,
};
