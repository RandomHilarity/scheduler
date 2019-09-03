import React from "react";
import "components/DayListItem.scss"; 
const classnames = require('classnames');

const formatSpots = function(spots){
  if (spots < 1) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `1 spot remaining`;
  }
  if (spots > 1) {
    return `${spots} spots remaining`;
  }
}

export default function DayListItem(props) {
  const dayClass = classnames({
    "day-list__item": true, 
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots < 1
  });

  const spotsText = formatSpots(props.spots);

  return (
    <li className = {dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsText}</h3>
    </li>
  );
}