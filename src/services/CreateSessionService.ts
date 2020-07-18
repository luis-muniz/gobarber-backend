import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const findUserEmail = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!findUserEmail) {
      throw new AppError('Invalid e-mail/password.', 401);
    }

    const checkUserPassword = await compare(password, findUserEmail.password);

    if (!checkUserPassword) {
      throw new AppError('Invalid e-mail/password.', 401);
    }

    delete findUserEmail.password;

    const token = sign({}, 'mysecret', {
      subject: findUserEmail.id,
      expiresIn: '1d',
    });

    const response: ResponseDTO = {
      user: findUserEmail,
      token,
    };

    return response;
  }
}

export default CreateSessionService;
