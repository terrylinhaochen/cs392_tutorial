import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};

const App = () => {
  const today = new Date();
  const day = today.toLocaleString([], {weekday: 'long'});
  const date = today.toLocaleDateString([], {dateStyle: 'long'})

  return (
    <div>
      <h1>Sample React code</h1>
      
      <p>Today is {day}, {date}.</p>
    </div>
  );
};

export default App;