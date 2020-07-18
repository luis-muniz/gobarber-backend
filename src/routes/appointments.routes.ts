import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticaded from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticaded);

appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const createAppointmentService = new CreateAppointmentService();

  const parseDate = parseISO(date);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parseDate,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;
