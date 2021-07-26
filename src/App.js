import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          this is home page
        </Route>

        <Route exact path="/starred">
          this is starred page
        </Route>

        <Route>404 error</Route>
      </Switch>
    </div>
  );
}

export default App;
