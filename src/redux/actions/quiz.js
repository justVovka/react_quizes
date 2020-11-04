import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes.json`);
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
      console.error(error);
    }
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function quizSetState(answerState, results) {
  return { type: QUIZ_SET_STATE, answerState, results };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }
    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rigthAnswer === answerId) {
      if (!results[answerId]) {
        results[answerId] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));

      const timeout = window.setTimeout(() => {
        console.log(isQuizFinished(state));
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          console.log(state.activeQuestion);
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearInterval(timeout);
      }, 1000);
    } else {
      results[answerId] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
}
