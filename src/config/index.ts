import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.SECRET,
  expires_in: process.env.EXPIRES_IN
};
