import { useReducer, useEffect } from "react";
import axios from "axios";

function reducer(state, action) {
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
      const appt = state["appointments"];
      appt[action.id]["interview"] = action.interview;
      return { ...state, appointments: appt, days: daysChangedSpots };
    }
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: "SET_DAY", day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: "SET_APPLICATION_DATA",
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
      dispatch({ type: "SET_INTERVIEW", id, interview });
    });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatch({ type: "SET_INTERVIEW", id, interview: null });
    });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
