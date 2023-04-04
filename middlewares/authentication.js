import jwt from 'jsonwebtoken';
import { TOKEN_ERROR_TYPE, TOKEN_ERROR_MSG } from '../constant/enums';

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    const errorMsg =
      error.name === TOKEN_ERROR_TYPE.EXPIRE
        ? TOKEN_ERROR_MSG.TOKEN_EXPIRED
        : TOKEN_ERROR_MSG.INVALID;
    return res.status(401).send(errorMsg);
  }

  return next();
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('A token is required for authentication');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_INTERVAL || '30d',
  });
};

export { authenticate, verifyToken, generateToken };
