import React, { Component } from 'react';
import GetAnswers from './GetAnswers';
import QuizStartPopup from './QuizStartPopup';
import question from '../data/question';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            total: question.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            classNames: ['', '', '', '']
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);

    }

    pushData(number) {
        this.setState({
            question: question[number].question,
            answers: [question[number].answers[0], question[number].answers[1], question[number].answers[2], question[number].answers[3] ],
            correct: question[number].correct,
            number: this.state.number + 1
        });
    }

    componentWillMount() {
        this.pushData(this.state.number);
    }

    nextQuestion() {

        if(this.state.number === this.state.total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(this.state.number)
            this.setState({
                showButton: false,
                questionAnswered: false,
                classNames: ['', '', '', '']
            });
        }

    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            number: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }


    checkAnswer(e) {
    
        if(!this.state.questionAnswered) {
            let elem = e.currentTarget;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if(answer === this.state.correct){
                updatedClassNames[answer-1] = 'right';
                this.handleIncreaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            
            this.setState({
                classNames: updatedClassNames
            })

            this.handleShowButton();
        }
    }

    render() {
        return (
            <div className="container">
                 <QuizStartPopup style={{display: this.state.displayPopup}} score={this.state.score} total={this.state.total} startQuiz={this.handleStartQuiz} />

                <div className="row">
                     <div className="col-lg-6" style={{ backgroundColor: '#0094da', marginTop:'15px', marginBottom:'15px'}}>
                        <div className="question">
                            <h4>Question {this.state.number}/{this.state.total}</h4>
                            <p>{this.state.question}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                    <GetAnswers  answers={this.state.answers} correct={this.state.correct} classNames={this.state.classNames}  checkAnswer={this.checkAnswer}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="submit">
                            {this.state.showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{this.state.number===this.state.total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;