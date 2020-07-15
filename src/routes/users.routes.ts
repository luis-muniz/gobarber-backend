import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json(users);
});

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

export default usersRoutes;
