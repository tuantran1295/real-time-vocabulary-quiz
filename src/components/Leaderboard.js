import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase-config';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import Divider from '@mui/material/Divider';
import LeaderboardTable from "./common/LeaderboardTable";
export default function Leaderboard() {
    const databaseRef = collection(database, 'Leaderboard')
    const navigate = useNavigate();
    const { state } = useLocation();
    const [finalResult, setFinalResult] = useState(null);
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    useEffect(() => {
        if (state) {
            const { finalResults } = state;
            setFinalResult(finalResults)
        }
        getData()
    }, [])

    useEffect(() => {
        // const query = collection(database, 'Leaderboard');
        const unsubscribe = onSnapshot(collection(database, 'Leaderboard'),(snapshot) => {
            const newLeaderboardData = [];
            snapshot.forEach((doc) => {
                // console.log(doc.data());
                newLeaderboardData.push(doc.data());
            });
            setLeaderBoardData(sortDataByScore(newLeaderboardData));

            // snapshot.docChanges().forEach((change) => {
            //     if (change.type === "added") {
            //         const newData = leaderBoardData.push(change.doc.data());
            //         // setLeaderBoardData(sortDataByScore(newData));
            //         console.log(change.doc.data());
            //         debugger;
            //     }
            //     if (change.type === "modified") {
            //         console.log("Modified data: ", change.doc.data());
            //         debugger;
            //     }
            // })

        });
        return unsubscribe;
    }, [])

    const getData = async () => {
        const snapshot = await getDocs(databaseRef);
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setLeaderBoardData(sortDataByScore(data));
    }

    const sortDataByScore = (data) => {
        return data.sort((a, b) => (parseFloat(b.score) - parseFloat(a.score)) ||
            new Date(a.timestamp) - new Date(b.timestamp));
    }

    const retryQuiz = () => {
        navigate('/');
    }
    return (
        <div>
            <h1>Results</h1>
            {finalResult === null ? (
                <></>
            ) : (
                <h2>Your Final Score is {finalResult}</h2>
            )}

            <Button
                onClick={retryQuiz}
                variant="contained"
                style={{ marginBottom: 30 }}>
                Play Again
            </Button>
            <Divider />
            <h2>Leaderboard</h2>
            <div style={{ margin: 20 }}>
                <LeaderboardTable leaderBoardData={leaderBoardData} />
            </div>
        </div>
    )
}
