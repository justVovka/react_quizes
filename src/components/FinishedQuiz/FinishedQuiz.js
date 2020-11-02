import React from 'react';

import classes from './FinishedQuiz.css';
import Button from '../ui/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((question, index) => {
          const emojiResult =
            props.results[question.id] === 'error' ? '🤬' : '😍';
          return (
            <li key={index}>
              <strong>{index}.</strong>&nbsp;{question.question} {emojiResult}
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount || '0'} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
