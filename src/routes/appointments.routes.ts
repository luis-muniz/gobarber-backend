import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.getAll();

  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const parseDate = parseISO(date);

    const appointment = createAppointmentService.execute({
      provider,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'There is already an appointment at that time.' });
  }
});

export default appointmentsRoutes;
