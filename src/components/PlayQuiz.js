import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QuizCard from './common/QuizCard';
import { database } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
export default function PlayQuiz() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [questionCounter, setQuesCounter] = useState(1);
    const [questionsArray, setQuesArray] = useState([]);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const databaseRef = collection(database, 'Leaderboard')

    useEffect(() => {
        const {quizData} = state;
        setQuesArray(quizData)
        setPlayerName(localStorage.getItem('username'))
    }, [])

    const nextQuestion = () => {
        if (questionCounter < questionsArray.length + 1) {
            setQuesCounter(questionCounter + 1)
        }
    }

    const submitQuiz = () => {
        addDoc(databaseRef, {
            username: playerName,
            timestamp: moment().format('LLL'),
            score: score
        })
            .then(() => {
                navigate('/leaderboard', {
                    state: {
                        finalResults: score,
                    }
                })
            })
    }
    return (
        <div>
            {questionCounter < questionsArray.length + 1 ? (
                <div>
                    <h1>Play Quiz</h1>

                    <h2>Question Number: {questionCounter}</h2>
                    <h3>Current Score: {score}</h3>
                    <QuizCard
                        questionsArray={questionsArray}
                        questionCounter={questionCounter}
                        nextQuestion={nextQuestion}
                        setResult={setScore}
                        result={score}
                    />
                </div>
            ) : (
                <div className='submit-container'>
                    <h2>The Quiz is now finished..</h2>
                    <p>You can Submit your Score..</p>
                    <Button
                        onClick={submitQuiz}
                        variant="contained"
                        style={{ marginLeft: 10 }}>
                        Submit
                    </Button>
                </div>
            )}
        </div>
    )
}
