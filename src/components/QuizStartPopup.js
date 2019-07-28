import React, { Component } from 'react';

class QuizStartPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: 'start',
            title: 'Welcome to Quizz',
            text: 'React JS Multiple choice interview questions (MCQ) - Test your React JS knowledge' ,
            buttonText: 'Start the quiz' 
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }

   popupHandle() {
        if(this.state.game === 'start'){
            this.setState({
                game: 'end',
                title: 'Congratulations!',
                buttonText: 'Restart'
            });
            
            this.props.startQuiz();
        } else {            
            window.location.reload();// restart the application
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'You have completed the quiz. <br /> You got: <strong>' + this.props.score + '</strong> out of <strong>' +this.props.total +'</strong> questions right.'
        })
    }

        
    render() {
        return (
            <div className="popup-container" style={this.props.style}>
                <div className="container">
                    <div className="col-md-12 col-md-offset-2">
                        <div className="popup">
                            <h1>{this.state.title}</h1>
                            <p dangerouslySetInnerHTML={{__html:this.state.text}} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{this.state.buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuizStartPopup;