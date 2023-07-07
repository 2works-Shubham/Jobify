import UnAuthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // console.log(authHeader);
  // const headers = req.headers
  const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer')) 
{
  throw new UnAuthenticatedError("Authentication Invalied - Auth.js");
}

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)
    req.user = { userId: payload.userId }
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalied - Auth.js");
  }
}

export default auth;
