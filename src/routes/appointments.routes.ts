import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const createAppointmentService = new CreateAppointmentService();

    const parseDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appointmentsRoutes;