import React, { Component } from 'react';
// import logo from '../images/logo.svg';
import style from './App.module.css';
import Container from '../components/Container/Container.jsx'

class App extends Component {

  state = {
    showReport : false,
    isLoaded: false,
    report : null,
    error: '',
  }
  
  // the words we want to fetch data about
  words = ['affiliate', 'marketing', 'influencer'];

  // the api calls we make for each call
  apiCalls = [
    //Means like
    'https://api.datamuse.com/words?ml=',
    //Sounds like
    'https://api.datamuse.com/words?sl=',
    //Spelled like
    'https://api.datamuse.com/words?sp=',
  ]
  
  fetchWords = () => {

    fetch("https://api.datamuse.com/words?sl=affiliate")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          
          this.setState({
            isLoaded: true,
            report: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    this.setState()
  }

  render() {
    return (
      <div className={style.App}>
        <Container fetchWords={this.fetchWords}></Container>
      </div>
    );
  }
}

export default App;
