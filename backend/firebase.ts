import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const SERVICE_ACCOUNT_PATH = "./service-account.json";
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();