import React from 'react';

import classes from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const activeQuiz = (props) => (
  <div className={classes.activeQuiz}>
    <p className={classes.Qestion}>
      <span>
        <strong>{props.activeQestion}.</strong>&nbsp; {props.question}
      </span>
      <small>
        {props.activeQestion} из {props.quizLength}
      </small>
    </p>
    <AnswersList
      state={props.state}
      onAnswerClick={props.onAnswerClick}
      answers={props.answers}
    />
  </div>
);

export default activeQuiz;
