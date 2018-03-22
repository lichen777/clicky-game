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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      topScore: 0,
      status: "Click an image to begin!",
      selected: [],
      color: 'white',
      source: list
    };
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  reset = () => {
    this.setState({
      score: 0,
      selected: []
    });
  }

  scrollDown = () => {
    scroll.scrollToBottom()
  }

  textFlash(isRight) {
    setTimeout(() => {
      this.setState({
        color: "white"
      })
    }, 300)
    this.setState({
      color: isRight ? "green" : "red"
    })
  }

  handleClick = e => {
    if (this.state.selected.indexOf(e.target.id) === -1) {
      this.textFlash(true)
      return this.setState({
        selected: [...this.state.selected, e.target.id],
        score: this.state.score + 1,
        topScore: Math.max(this.state.topScore, this.state.score + 1),
        status: "You guessed correctly!",
        source: this.shuffle(this.state.source)
      });
    }
    this.setState({
      status: "You guessed incorrectly!",
      source: this.shuffle(this.state.source)
     });
    this.textFlash(false)
    return this.reset();
  }

  render() {
    const { score, topScore, status, color, source } = this.state;

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
