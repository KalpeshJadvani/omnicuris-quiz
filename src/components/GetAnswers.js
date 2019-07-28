import React, { Component } from 'react';

class GetAnswers extends Component {
    constructor(props) {
        super(props);
        this.checkAnswer = this.checkAnswer.bind(this);
    }
    
    checkAnswer(e) {
    this.props.checkAnswer(e);
    }

    render() {
        return (
            <div className="answers">
                <ul>
                    <li onClick={this.checkAnswer} className={this.props.classNames[0]} data-id="1"><span>A</span> <p>{this.props.answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={this.props.classNames[1]} data-id="2"><span>B</span> <p>{this.props.answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={this.props.classNames[2]} data-id="3"><span>C</span> <p>{this.props.answers[2]}</p></li>
                    <li onClick={this.checkAnswer} className={this.props.classNames[3]} data-id="4"><span>D</span> <p>{this.props.answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

export default GetAnswers;