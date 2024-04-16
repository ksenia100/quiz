import React, { useState } from 'react';
import './Quiz.css';

type Answer = {
    text: string;
    isCorrect: boolean;
};

type Question = {
    question: string;
    answers: Answer[];
};

type QuizProps = {
    questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<boolean[]>(Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const checkAnswer = (answerIndex: number) => {
        const isCorrect = questions[currentQuestion].answers[answerIndex].isCorrect;
        setUserAnswers(prevState => {
            const updatedAnswers = [...prevState];
            updatedAnswers[currentQuestion] = isCorrect;
            return updatedAnswers;
        });
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prevState => prevState + 1);
        } else {
            const correctAnswers = userAnswers.filter(answer => answer).length;
            setScore(correctAnswers);
            setShowResults(true);
        }
    };

    return (
        <div className="quiz-container">
            <div className="question-container">
                <h3>Question {currentQuestion + 1} of 3</h3>
                <hr />
                <h4>{questions[currentQuestion].question}</h4>
                <ul>
                    {questions[currentQuestion].answers.map((answer, answerIndex) => (
                        <li key={answerIndex}>
                            <button
                                className={userAnswers[currentQuestion] === null ? '' : answer.isCorrect ? 'correct' : 'incorrect'}
                                onClick={() => checkAnswer(answerIndex)}
                                disabled={userAnswers[currentQuestion] !== null}>
                                {answer.text}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={nextQuestion} className="next-button" disabled={userAnswers[currentQuestion] === null}>
                    Next
                </button>
                <div className="checkmarks">
                    {userAnswers.map((answer, index) => (
                        <div key={index} className={`checkmark ${answer === null ? '' : (answer ? 'checked' : 'unchecked')}`} />
                    ))}
                </div>

            </div>
            {showResults && <p>Your score: {score} з {questions.length}</p>}
        </div>
    );

};

export default Quiz;
