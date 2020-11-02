import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCleator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';

import Layout from './hos/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCleator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
