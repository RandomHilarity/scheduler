import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "reducers/application";

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
