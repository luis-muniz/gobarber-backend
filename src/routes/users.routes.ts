import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import upload from '../config/uploadAvatar';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

const usersRoutes = Router();
const uploadAvatar = multer(upload);

usersRoutes.post('/', async (request, response) => {
  try {
    const createUserService = new CreateUserService();
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarUserService = new UpdateAvatarUserService();
      const user = await updateAvatarUserService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json(user);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },
);

export default usersRoutes;
