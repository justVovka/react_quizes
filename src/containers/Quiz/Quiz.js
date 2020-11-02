import React, { Component } from 'react';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/ui/Loader/Loader';

export default class Quitz extends Component {
  state = {
    isFinished: false,
    activeQestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
    results: {},
  };

  onAnswerClickHandler = (answerId) => {
    const results = this.state.results;
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQestion];
    if (question.rigthAnswer === answerId) {
      if (!results[answerId]) {
        results[answerId] = 'success';
      }
      this.setState({
        answerState: {
          [answerId]: 'success',
        },
        results,
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQestion: this.state.activeQestion + 1,
            answerState: null,
          });
        }
        window.clearInterval(timeout);
      }, 1000);
    } else {
      results[answerId] = 'error';
      this.setState({
        answerState: {
          [answerId]: 'error',
        },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      isFinished: false,
      activeQestion: 0,
      answerState: null,
      results: {},
    });
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `quizes/${this.props.match.params.id}/.json`
      );
      const quiz = response.data;
      this.setState({
        quiz,
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
    console.log('Quiz id = ', this.props.match.params.id);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы:</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              onRetry={this.retryHandler}
              results={this.state.results}
              quiz={this.state.quiz}
            />
          ) : (
            <ActiveQuiz
              state={this.state.answerState}
              quizLength={this.state.quiz.length}
              activeQestion={this.state.activeQestion + 1}
              onAnswerClick={this.onAnswerClickHandler}
              question={this.state.quiz[this.state.activeQestion].question}
              answers={this.state.quiz[this.state.activeQestion].answers}
            />
          )}
        </div>
      </div>
    );
  }
}
