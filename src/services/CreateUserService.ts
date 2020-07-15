import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const findUserWithInSameEmail = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (findUserWithInSameEmail) {
      throw new Error('This email is already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;
    return user;
  }
}

export default CreateUserService;
