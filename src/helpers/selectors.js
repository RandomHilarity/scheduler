export default function getAppointmentsForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  } else {
    const filteredDays = state.days.filter(daysObj => daysObj.name === day);
    if (filteredDays.length === 0) {
      return filteredDays;
    } else {
      let appointments = [];
      for (let day in state.appointments) {
        for (let id of filteredDays[0].appointments) {
          if (id === Number(day))
            appointments.push(state.appointments[`${id}`]);
        }
      }
      return appointments;
    }
  }
}
