import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/ui/Loader/Loader';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../redux/actions/quiz';

class Quiz extends Component {
  componentDidMount = () => {
    this.props.fetchQuizById(this.props.match.params.id);
  };

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы:</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              onRetry={this.props.retryQuiz}
              results={this.props.results}
              quiz={this.props.quiz}
            />
          ) : (
            <ActiveQuiz
              state={this.props.answerState}
              quizLength={this.props.quiz.length}
              activeQuestion={this.props.activeQuestion + 1}
              onAnswerClick={this.props.quizAnswerClick}
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    results: state.quiz.results,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
