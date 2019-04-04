import React, { Component } from 'react';
// import logo from '../images/logo.svg';
import style from './App.module.css';
import Container from '../components/Container/Container.jsx'
import requestPromise from 'request-promise'
import request from 'request'

class App extends Component {

  state = {
    showReport : false,
    isLoaded: false,
    report : null,
    error: '',
  }
  
  

  // The words we want to fetch data about
  words = ['affiliate', 'marketing', 'influencer'];
  wordsTables = [];

  // The api calls we make for each call
  apiCalls = [
    //Means like
    'https://api.datamuse.com/words?ml=',
    //Sounds like
    'https://api.datamuse.com/words?sl=',
    //Spelled like
    'https://api.datamuse.com/words?sp=',
  ]

  fetchWords = () => {

    // all promises
    let promises = [];

    //for each word.
    let wordsPromises = this.words.map(word => {

      //make all api calls and save them as promises.
      return this.apiCalls.map(url => requestPromise(url + word));
    })
    
    //and now for each arr of promises in every word
    wordsPromises.forEach((wordsPromise) => {

      //for every promise in that array
      wordsPromise.forEach((promise) => {

        //push it to all promises
        promises.push(promise);
      })
    })
    
    //Only after all promises are resolved
    Promise.all(promises).then((data) => {      
      let wordsResult = data.map((word,index) => {
        console.log("Promise result " + index + " : " + word);

      })
    });
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
