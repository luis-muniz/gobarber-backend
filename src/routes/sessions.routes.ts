import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const createSessionService = new CreateSessionService();

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default sessionsRoutes;
