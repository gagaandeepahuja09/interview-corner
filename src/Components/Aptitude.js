import React, { Component } from 'react';
import { Radio, Card, Button, Icon } from 'antd';
import  { questions, technicalQuestion } from '../Data/aptitude';
import _ from 'lodash';

const RadioGroup = Radio.Group;
let icon = null;
let disp = null;

let questionChoices = questions;

const tickStyle = {
  'padding': '10px 25px',
  'fontSize': '20px',
};

class Quiz extends Component {
	constructor() {
    super();
    this.state = { answers: [], 
      givenAns: [],
      actualAns: [],
      enableAnswers: false,
      score: null,
       };
    this.onInput = this.onInput.bind(this);
    this.buildRadioButtons = this.buildRadioButtons.bind(this);
  }

  componentWillMount() {
    const selAns = _.range(25).map(function () { return "XXX" });
    const givenAns = _.range(25).map(function () { return "XXX" });
    this.setState({ givenAns: givenAns, actualAns: selAns });
    let actualAns = selAns;
    let k = 0;

    questionChoices.forEach((obj) => {
      selAns[k] = obj.answer;
      k++;
    });
    this.setState({ selAns });
    console.log(this.state.selAns);
  }

  handleSubmit = () => {
    this.setState({ enableAnswers: true });
    let score = 0;
    let givenAns = this.state.givenAns;
    let actualAns = this.state.actualAns;
    console.log('givenAns', this.state.givenAns, 'actualAns', this.state.actualAns);
    for(let i=0; i<25; i++) {
      let x = 9;
      if(givenAns[i] && actualAns[i]) {
        x = givenAns[i].localeCompare(actualAns[i])
      }
      if(x === 0) {
        score = score + 10;
        this.setState({ score: score });
      }
      console.log(score); 
    }
    this.setState({ score: score });
    console.log(this.state.score);
    window.scrollTo(0,document.body.scrollHeight);
  }

  onInput = (e) => {
    const id = e.target.name;
    const ans = e.target.value;
    const newAns = this.state.givenAns;
    const actualAns = this.state.actualAns;
    newAns[id-1] = ans;
    this.setState({ givenAns: newAns });

    console.log(this.state.givenAns);
    const answer = { id, answer: e.target.value };
    let answers;
    if (this.state.answers.some(answer => answer.id === id)) {
      answers = [...this.state.answers.filter(answer => answer.id !== id), answer];
    } else {
      answers = [...this.state.answers, answer];
    }
    this.setState({ answers }, () => console.log(this.state.answers));
  }

  buildRadioButtons(arr, type, id, ans) {
    disp = arr.map((choice, i) => {
      if(this.state.enableAnswers) {
        if(ans === choice) {
          console.log("Hello");
          icon = <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style = {tickStyle} />
        }
        else {
          icon = null;
        }
      }
      return (
        <div key={i} value={choice} className = "righter">
            <input
            type="radio"
            className="custom-control-input"
            name={id}
            id={choice}
            value={choice}
            onChange={this.onInput}
          />        
          <label for = {choice} onChange={this.onInput}>{choice}</label>
          <span>{icon}</span>
        </div>
        );  
      });
    }

  render() {
    let showScore = null;
    let showButton = (<div><Button type="primary" size="large" onClick = {this.handleSubmit}>Submit Test</Button> <br/> <br/></div>);
    if(this.state.enableAnswers) {
      icon = <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style = {tickStyle} />
      showScore = (
        <div className="card text-white bg-primary mb-3" style = {{ 'max-width': '710px', 'margin': '0 auto', 'padding': '10px', 'border-radius': '10px' }}>
          <div className="card-body">
            <h2 className="card-title"> <Icon type="like" size="large" /> Your Test Is Completed!</h2>
            <br/>
            <h3 className="card-text">Your score is {this.state.score}/250</h3>
          </div>
        </div>
        );
        window.scrollTo(0,document.body.scrollHeight);
      showButton = null;  
    }
    var iterator = questionChoices.map((question, i) => {
      const { choices, questionType, questionID, questionText, answer } = question;
      return (
      	<div>
      		<Card>
	        	<div key={i}>
	          	<h3>{questionID}. {questionText}</h3>
	          	{this.buildRadioButtons(choices, questionType, questionID, answer)}
              {disp}
	        	</div>
	        </Card>
	        <br/>
	    </div>    
      );
    });
    return (
        <div>
          <div className="card text-white bg-success" className = "linearGradient" style = {{ 'max-width': '710px', 'margin': '0 auto', 'padding': '10px', 'border-radius': '10px' }}>
              <div className="card-body">
                <h1>Mock Aptitude Test</h1><br/>
                  <h4>The test consists of 25 Aptitude Questions</h4>
                  <h4>The weightage of each question is 10 points</h4>
                  <h4>There is no negative marking</h4>
              </div>
            </div>
          <div className="form alignLeft">
            <div className="h3">
              {iterator}
            </div>
          </div>
          {showButton}
          {showScore} <br/><br/><br/>
        </div>
    );
  }
}

export default Quiz;