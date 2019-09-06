export function getAppointmentsForDay(state, day) {
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

export function getInterviewersForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  } else {
    const filteredDays = state.days.filter(daysObj => daysObj.name === day);
    if (filteredDays.length === 0) {
      return filteredDays;
    } else {
      let interviewers = [];
      for (let day in state.interviewers) {
        for (let id of filteredDays[0].interviewers) {
          if (id === Number(day))
            interviewers.push(state.interviewers[`${id}`]);
        }
      }
      return interviewers;
    }
  }
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const results = {};
  results.student = interview.student;
  results.interviewer = state.interviewers[interview.interviewer];
  return results;
}