import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';

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
    throw new Error('JWT token is missing');
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
    throw new Error('JWT token is invalid');
  }
}
