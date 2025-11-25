// to verify Google ID token from frontend requests
// attach req.uid to all requests from authenticated users
import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase";

export interface AuthenticatedRequest extends Request {
  uid?: string;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    req.uid = decodedToken.uid;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
