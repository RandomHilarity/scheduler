import React from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

/*  Transition States
*  SHOW - displays the appointment
*  EMPTY - displays frame with add button
*  SAVING - spinner until saving to db completed then SHOW
*  DELETING - spinner until deleeting in db completed then EMPTY
*  CREATE - shows empty FORM
*  EDIT - shows modifiable populated FORM
*  CONFIRM - shows confirm/cancel buttons
*  ERROR_DELETE/CONFIRM - shows error message if db changes fail with error message
*/

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? "SHOW" : "EMPTY"
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING");
    props
      .bookInterview(props.id, interview)
      .then(() => transition("SHOW"))
      .catch(error => transition("ERROR_SAVE", true));
  }

  function destroy() {
    transition("DELETING", true);
    props
      .deleteInterview(props.id)
      .then(() => transition("EMPTY"))
      .catch(error => transition("ERROR_DELETE", true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === "EMPTY" && <Empty onAdd={() => transition("CREATE")} />}
      {mode === "SHOW" && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition("EDIT")}
          onDelete={() => transition("CONFIRM")}
        />
      )}
      {mode === "CREATE" && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === "EDIT" && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === "SAVING" && <Status message="Saving" />}
      {mode === "DELETING" && <Status message="Deleting" />}
      {mode === "CONFIRM" && (
        <Confirm
          message="Please confirm delete."
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}
      {mode === "ERROR_SAVE" && (
        <Error message="Cannot save apppointment." onClose={() => back()} />
      )}
      {mode === "ERROR_DELETE" && (
        <Error message="Cannot cancel appointment." onClose={() => back()} />
      )}
    </article>
  );
}
