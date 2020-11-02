import React, { Component } from 'react';

import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Select from '../../components/ui/Select/Select';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFramework';
import Auxiliary from '../../hos/Auxiliary/Auxiliary';
import axios from '../../axios/axios-quiz';

import classes from './QuizCleator.css';

export default class QuizCleator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswer: 1,
    formControls: createFormControls(),
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  addQuestionHandler = (event) => {
    event.preventDefault();
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rigthAnswer: this.state.rightAnswer,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswer: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/quizes.json', this.state.quiz);
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswer: 1,
        formControls: createControl(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  selectChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      rightAnswer: +event.target.value,
    });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswer}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCleator}>
        <div>
          <h1>Создание тестов</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}
