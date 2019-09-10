export default function reducer(state, action) {
    switch (action.type) {
      case "SET_DAY":
        return { ...state, day: action.day };
      case "SET_APPLICATION_DATA":
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
          interviewers: action.interviewers
        };
      // covers both CREATE and DELETE(destroy), also changes spots remaining
      case "SET_INTERVIEW": {
          const daysChangedSpots = state.days.map(day => {
          if (day.appointments.includes(action.id)) {
            let currentSpots = day.spots;
            if ( action.interview  && !state.appointments[action.id].interview) {
              currentSpots--;
            } else if (!action.interview && state.appointments[action.id].interview) {
              currentSpots++;
            }
            return {...day, spots: currentSpots};
          }
          return day;
        });
        const appt = {
          ...state.appointments[action.id],
          interview: action.interview
        };
        const appts = { ...state.appointments, [action.id]: appt };
  
        return { ...state, appointments: appts, days: daysChangedSpots };
      }
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }