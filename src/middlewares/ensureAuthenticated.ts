import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = autHeader.split(' ');

  try {
    const decoded = verify(token, 'mysecret');

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    throw new AppError('JWT token is invalid', 401);
  }
}
