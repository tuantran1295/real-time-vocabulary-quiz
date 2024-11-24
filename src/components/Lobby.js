import React, {useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {toast} from 'react-toastify';
import moment from "moment";
import addData from "../firestore/addData";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase-config";
import {getDocument} from "../firestore/getData";

export default function Lobby() {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [roomId, setRoomId] = useState('');

    const getQuiz = () => {
        if (playerName && roomId) {
            getRoomById();
        } else if (!playerName) {
            toast.error(`Please Enter the Player's Name`);
        } else if (!roomId || typeof roomId !== "number") {
            toast.error(`Invalid Room ID`);
        }
    }

    const getRoomById = async () => {
        const {result, error} = await getDocument('Room', roomId);
        if (result.exists()) {
            const data = result.data();
            console.log("Document data:", data);
            navigateToQuiz(data.quizId);
        } else {
            toast.error("Room does not exist");
        }
        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error));
        }
    }

    const navigateToQuiz = (quizId) => {
        const sessionId = generateSessionId();
        localStorage.setItem('username', playerName);
        localStorage.setItem('sessionId', sessionId);

        updateSessionData(sessionId).then(r => {
            console.log(r);
            localStorage.setItem('playSessionDocID', r.result.id);
            navigate('/playquiz',
                {
                    state: {
                        username: playerName,
                        quizId: quizId
                    }
                })
            // debugger;
            // axios.get(
            //     `https://opentdb.com/api.php?amount=10&difficulty=easy&category=9`)
            //     .then((response) => {
            //         navigate('/playquiz',
            //             {
            //                 state: {
            //                     quizData: response.data.results,
            //                     username: playerName,
            //                     quizId: quizId
            //                 }
            //             })
            //     })
        });
    }

    const generateSessionId = () => {
        return playerName + '/' + roomId + '/' + Date.now();
    }

    const updateSessionData = async (sessionId) => {
        const requestData = {
            sessionId: sessionId,
            currentQuestion: 0,
            currentScore: 0,
            roomId: roomId,
            timestamp: moment().format('LLL'),
            status: 0,
            username: playerName
        }
        return await addData('PlaySession', requestData);
    }

    return (
        <div className='quiz-main'>
            <h1>Real Time English Quiz</h1>
            <form
                onSubmit={e => e.preventDefault()}
                className="container"
            >
                <TextField
                    required
                    style={{marginBottom: 20}}
                    fullWidth
                    className="outlined-basic"
                    label="Enter Your Name"
                    variant="outlined"
                    onChange={(e) => setPlayerName(e.target.value)}
                    value={playerName}
                />
                <TextField
                    required
                    fullWidth
                    type="number"
                    className="outlined-basic"
                    label="Enter room id"
                    variant="outlined"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                />
                <Button
                    onClick={getQuiz}
                    variant="contained"
                    style={{marginTop: 10, marginRight: 5}}>
                    PLAY QUIZ
                </Button>

                {/*<Button*/}
                {/*    onClick={addRoom}*/}
                {/*    variant="contained"*/}
                {/*    style={{ marginTop: 10, marginRight: 5 }}>*/}
                {/*    ADD ROOM*/}
                {/*</Button>*/}

                <Button
                    onClick={() => navigate('/leaderboard')}
                    variant="contained"
                    style={{marginTop: 10, marginLeft: 5}}>
                    CHECK LEADERBOARD
                </Button>
            </form>
        </div>
    )
}