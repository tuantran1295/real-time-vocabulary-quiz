import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QuizCard from './common/QuizCard';
import moment from 'moment';
import editData from "../firestore/editData";
import {toast} from "react-toastify";
import addData from "../firestore/addData";
import {getDocument} from "../firestore/getData";
import rightAnswer from "../assets/correct-answer.mp3";
import wrongAnswer from "../assets/wrong-answer.mp3";

export default function PlayQuiz() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [questionCounter, setQuesCounter] = useState(1);
    const [questionsArray, setQuesArray] = useState([]);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [leaderboardId, setLeaderboardId] = useState('');

    useEffect(() => {
        if (state) {
            const {quizId, username} = state;
            getQuestionArray(quizId);

            username ?? setPlayerName(username);
            console.log(username);
        }

    }, [])

    const getQuestionArray = async (quizId = 'PfaHs5gmYsNGfBnZrU28') => {
        const {result, error} = await getDocument('Quiz', quizId);
        console.log(result);
        if (result.exists()) {
            const data = result.data();
            console.log("Document data:", data);
            setQuesArray(data.questions);
        } else {
            toast.error("Quiz does not exist");
        }
        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error));
        }
    }

    const nextQuestion = () => {
        if (questionCounter < questionsArray.length + 1) {
            setQuesCounter(questionCounter + 1);
            updateSessionData();
        }
    }
    useEffect(() => { // only update leaderboard when score change
       if (state) updateLeaderboardScore();
        // debugger;
    },[score])

    const updateSessionData = async () => {
        const playSessionDocID = localStorage.getItem('playSessionDocID');
        const requestData = {
            currentQuestion: questionCounter + 1,
            currentScore: score
        }
        const {result, error} = await editData(
            'PlaySession', playSessionDocID, requestData);
        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error));
            return;
        }
        return result;
    }

    const updateLeaderboardScore = async () => {
        const playSessionDocID = localStorage.getItem('playSessionDocID');
        const sessionId = localStorage.getItem('sessionId');
        if (questionCounter === 1) { // Just answer first question
            const requestData = {
                username: state.username,
                timestamp: moment().format('LLL'),
                score: score,
                playSessionDocID: playSessionDocID,
                sessionId: sessionId
            };
            const {result, error} = await addData('Leaderboard', requestData);
            if (result) {
                setLeaderboardId(result.id);
                return result;
            }
            if (error) {
                console.log(error);
                toast.error(JSON.stringify(error));
            }
        } else {// second question to last question
            const requestData = {
                score: score
            }
            const {result, error} = await editData(
                'Leaderboard', leaderboardId, requestData);
            if (error) {
                console.log(error);
                toast.error(JSON.stringify(error));
                return;
            }
            return result;
        }
    }

    const submitQuiz = () => {
        navigate('/leaderboard', {
            state: {
                finalResults: score,
            }
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
                    <>
                        <audio src={rightAnswer} id="correct-answer"></audio>
                        <audio src={wrongAnswer} id="wrong-answer"></audio>
                    </>
                </div>
            ) : (
                <div className='submit-container'>
                    <h2>The Quiz is now finished..</h2>
                    <p>You can see your rank on leaderboard..</p>
                    <Button
                        onClick={submitQuiz}
                        variant="contained"
                        style={{ marginLeft: 10 }}>
                        Show leaderboard
                    </Button>
                </div>
            )}
        </div>
    )
}
