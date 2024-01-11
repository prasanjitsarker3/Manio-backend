import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  port: process.env.PORT,
  dataBaseURL: process.env.dataBaseURL,
  projectProcess: process.env.projectProcess,
  bcryptSalt: process.env.bcryptSalt,
  accessTokenExpaierDate: process.env.accessTokenExpaierDate,
  accessToken: process.env.accessToken,
  resetPasswordUI: process.env.resetPasswordUI,
};
