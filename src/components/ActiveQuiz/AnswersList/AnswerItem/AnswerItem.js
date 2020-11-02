import React from 'react';

import classes from './AnswerItem.css';

const AnswerItem = (props) => {
  const clss = [classes.AnswerItem];
  if (props.state) {
    clss.push(classes[props.state]);
  }
  return (
    <li
      onClick={() => props.onAnswerClick(props.answer.id)}
      className={clss.join(' ')}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
