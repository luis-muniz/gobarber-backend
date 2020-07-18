import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import { directoryAvatar } from '../config/uploadAvatar';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only user authenticated can update avatar', 401);
    }

    if (user.avatar_path) {
      const avatarUserPath = path.join(directoryAvatar, user.avatar_path);

      const checkAvatar = await fs.promises.stat(avatarUserPath);

      if (checkAvatar) {
        await fs.promises.unlink(avatarUserPath);
      }
    }

    user.avatar_path = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
