import React, { Component } from 'react';
import style from './App.module.css';
import Container from '../components/Container/Container.jsx'
import requestPromise from 'request-promise'
import request from 'request'
import WebSql from '../database/WebSql'

class App extends Component {

  webSql = null;

  constructor(props) {
    super(props);
    window.app = this;
    this.webSql = new WebSql();
  }

  state = {
    showReportToggle: false,
    isLoaded: false,
    report: [],
    error: '',
  }

  // The words we want to fetch data about
  words = ['affiliate', 'marketing', 'influencer'];

  // The filters we have for which we aggrigate data 
  filter = ['ml', 'sl', 'sp'];

  // The tables we as arrays before we make a sql table out of them
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

      //push a new array to wordsTables splicing the length of all the api calls we made for each word
      while (data.length) this.wordsTables.push(data.splice(0, this.apiCalls.length));

      this.webSql.deleteTables();
      this.webSql.createTables();

      //For each table (for each word)
      this.wordsTables.forEach((wordTable, wordIndex) => {

        //For each filter (api call that was made for the word)
        wordTable.forEach((filterResult, filterIndex) => {

          //filterResult is an object as a string , which we convert to a JSON object filterResultJson
          let filterResultJson = JSON.parse(filterResult);

          //We call populateTable sending the JSON Objects filterResultJson
          this.webSql.populateTable(this.words[wordIndex], filterResultJson, this.filter[filterIndex]);
        })
      })
    });
  }

  showReport = () => {
    this.state.showReportToggle = !this.state.showReportToggle;

    let promises = [];

    this.words.map((word) => {
      //We push all report info per word
      promises.push(this.webSql.countByFilter(word));
    })
    // console.log(reportTmp);
    // this.setState({reportData : reportTmp})

    Promise.all(promises).then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    });
  }

  render() {
    return (
      <div className={style.App}>
        <Container
          fetchWords={this.fetchWords}
          showReport={this.showReport}
          showReportToggle={this.state.showReportToggle}
          reportData={this.state.reportData}>
        </Container>
      </div>
    );
  }
}

export default App;
