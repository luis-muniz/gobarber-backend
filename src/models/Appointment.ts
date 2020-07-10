class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(id: string, provider: string, date: Date) {
    this.id = id;
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
