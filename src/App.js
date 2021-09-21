import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Comments from './components/Comments';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/posts/:id" component={Comments} />
          <Route path="/posts" component={Posts} />
          <Route path="/home">
            <Redirect to="/" />
          </Route>{' '}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
