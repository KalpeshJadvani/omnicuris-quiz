import React, {  useState } from 'react';
import GetAnswers from './GetAnswers';
import question from '../data/question';
import QuizStartPopup from './QuizStartPopup';

const initState = {
    correct:question[0].correct,
    question : question[0].question,
    answers:[question[0].answers[0], question[0].answers[1], question[0].answers[2], question[0].answers[3] ],
    number: 1,
    total: question.length,
    showButton: false,
    questionAnswered: false,
    score: 0,
    displayPopup: 'none',
    classNames: ['', '', '', '']
}

const initialize = {
    game: 'start',
    title: 'Welcome to Quizz',
    text: 'React JS Multiple choice interview questions (MCQ) - Test your React JS knowledge' ,
    buttonText: 'Start the quiz',
};

const Dashboard = ()=> {
    
    const [state, setState ] = useState(initState);
    const [popdata, setPopdata] = useState(initialize);
    const nextQuestion = ()=>{
        const { number, total } = state;
        const tempState = {...state};
        if(number === total){
            tempState.displayPopup = 'flex';
            const temppopdata = {...popdata};
            temppopdata.game = 'end';
            temppopdata.title = 'Congratulations!';
            temppopdata.buttonText = 'Restart';
            temppopdata.text =  'You have completed the quiz. <br /> You got: <strong>' + tempState.score + '</strong> out of <strong>' + tempState.total +'</strong> questions right.';
            setPopdata(temppopdata);
        } else {
            tempState.question = question[number].question;
            tempState.answers = [question[number].answers[0], question[number].answers[1], question[number].answers[2], question[number].answers[3] ];
            tempState.correct = question[number].correct;
            tempState.number = state.number + 1;
            tempState.showButton = false;
            tempState.questionAnswered = false;
            tempState.classNames = ['', '', '', ''];
            
        }
        setState(tempState);
    }


    const checkAnswer = (e)=>{
        const tempState = {...state};
        if(!state.questionAnswered) {
            let elem = e.currentTarget;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = state.classNames;

            if(answer === state.correct){
                updatedClassNames[answer-1] = 'right';
                tempState.score  = tempState.score + 1;
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            tempState.classNames = updatedClassNames;
            tempState.showButton = true;
            tempState.questionAnswered = true;
            setState(tempState);
        }
    }

    const popupHandle = ()=> {
        if(popdata.game=== 'start'){
            initState.classNames = ['', '', '', ''];
            setState(initState);
        }else{
            const freshInitialize = { ...initialize};
            setPopdata(freshInitialize);
        }
    }


    return (
        <div className="container">
            <QuizStartPopup style={{display: state.displayPopup}} popdata={popdata}  popupHandle={popupHandle} number = {state.number}/>

            <div className="row">
                    <div className="col-lg-6" style={{ backgroundColor: '#0094da', marginTop:'15px', marginBottom:'15px'}}>
                    <div className="question">
                        <h4>Question {state.number}/{state.total}</h4>
                        <p>{state.question}</p>
                    </div>
                </div>
                <div className="col-lg-6 ">
                <GetAnswers  answers={state.answers} correct={state.correct} classNames={state.classNames}  checkAnswer={checkAnswer}/>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="submit">
                        {state.showButton ? <button className="fancy-btn" onClick={nextQuestion} >{state.number===state.total ? 'Finish quiz' : 'Next question'}</button> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;