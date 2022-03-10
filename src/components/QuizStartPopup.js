import React from 'react';

const QuizStartPopup = (props)=> {
    
    const { style, popupHandle ,popdata } = props;
 
    return (
        <div className="popup-container" style={style}>
            <div className="container">
                <div className="col-md-12 col-md-offset-2">
                    <div className="popup">
                        <h1>{popdata.title}</h1>
                        <p dangerouslySetInnerHTML={{__html:popdata.text}} />
                        <button className="fancy-btn" onClick={popupHandle}>{popdata.buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizStartPopup;