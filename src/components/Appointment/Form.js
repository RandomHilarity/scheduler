import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = function() {
        setName("");
        setInterviewer("");
    }

    const cancel = function() {
        reset();
        props.onCancel();
    }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            name="name"
            type="text"
            placeholder="Enter student name"
            onChange={event => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancel()}>Cancel</Button>
          <Button confirm onClick={event => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}
