import React from 'react';
import faker from 'faker';
import _ from "lodash";
import './App.css';
import { animateScroll as scroll } from "react-scroll";

import Header from './components/Header';
import Jumbotron from "./components/Jumbo";
import PhotoGrid from "./components/PhotoGrid";
import Footer from "./components/Footer";

const list = _.times(12, key => ({
  id: key+1,
  image: faker.internet.avatar()
}))

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      topScore: 0,
      status: "Click an image to begin!",
      selected: [],
      color: 'white'
    };
  }

  componentDidUpdate(prevProps, prevState) {

  }

  reset = () => {
    this.setState({
      score: 0,
      selected: []
    });
  };

  scrollDown = () => {
    scroll.scrollToBottom()
  }

  handleClick = e => {
    if (this.state.selected.indexOf(e.target.id) === -1) {
      return this.setState({
        selected: [...this.state.selected, e.target.id],
        score: this.state.score + 1,
        topScore: Math.max(this.state.topScore, this.state.score + 1),
        status: "You guessed correctly!"
      });
    }
    this.setState({ status: "You guessed incorrectly!" });
    return this.reset();
  };

  render() {
    const { score, topScore, status, color } = this.state;
    const source = shuffle(list);

    return <div className="App">
        <Header score={score} topScore={topScore} color={color}>
          {status}
        </Header>
        <Jumbotron onClick={this.scrollDown} />
        <PhotoGrid list={source} onClick={this.handleClick} />
        <Footer />
      </div>;
  }
}

export default App;
