import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import rightAnswer from '../../assets/correct-answer.mp3';
import wrongAnswer from '../../assets/wrong-answer.mp3';
import JSConfetti from 'js-confetti'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AnswerGrid({
    options,
    correctAnswer,
    nextQuestion,
    setResult,
    result
}) {
    const jsConfetti = new JSConfetti();
    const correctAnswerAudio = document.getElementById('correct-answer');
    const wrongAnswerAudio = document.getElementById('wrong-answer');
    const handleOptions = (option) => {
        if (correctAnswer === option) {
            setResult(result + 1);
            playCorrectAnswerAudio();
            jsConfetti.addConfetti({
                confettiNumber: 300,
                confettiColors: [
                    '#e91e63',
                    '#00bcd4',
                    '#9c27b0',
                    '#ffeb3b',
                    '#ff5722',
                    '#212121',
                    '#ffc107',
                    '#76ff03',
                    '#00e676',
                    '#cddc39'
                ],
            })
            // toast.success("Correct Answer!", {
            //     autoClose: 2000,
            //     toastId: "correct" + Math.random()
            // })
        }
        else {
            playWrongAnswerAudio();
            // toast.error("Wrong Answer!", {
            //     autoClose: 2000,
            //     toastId: "wrong" + Math.random()
            // })
        }
        nextQuestion()
    }

    const playCorrectAnswerAudio = () => {
        if (!correctAnswerAudio.paused){
            correctAnswerAudio.pause();
            correctAnswerAudio.currentTime = 0;
            correctAnswerAudio.play();
        } else {
            correctAnswerAudio.play();
        }

    }
    const playWrongAnswerAudio = () => {
        if (!wrongAnswerAudio.paused){
            wrongAnswerAudio.pause();
            wrongAnswerAudio.currentTime = 0;
            wrongAnswerAudio.play();
        } else {
            wrongAnswerAudio.play();
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ margin: 10 }}>
                    <Item
                        className='options-grid'
                        onClick={() => handleOptions(options)}>
                        {options}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
