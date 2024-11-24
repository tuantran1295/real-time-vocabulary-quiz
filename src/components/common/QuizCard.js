import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import AnswerGrid from "./AnswerGrid";
export default function QuizCard({
    questionCounter,
    questionsArray,
    nextQuestion,
    setResult,
    result
}) {
    return (
        <Box sx={{ minWidth: 275 }} style={{ margin: 20 }}>
            {questionsArray.length > 0 ? (
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Question: {parse(questionsArray[questionCounter - 1].questionText)}
                        </Typography>

                        {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                        {/*    Category: {parse(questionsArray[questionCounter - 1].category)}*/}
                        {/*</Typography>*/}

                        {[
                            ...questionsArray[questionCounter - 1].incorrectAnswers,
                            questionsArray[questionCounter - 1].correctAnswer
                        ].sort(() => Math.random() - 0.5)
                            .map((options, index) => {
                                return (
                                    <AnswerGrid
                                        key={index}
                                        nextQuestion={nextQuestion}
                                        options={parse(options)}
                                        setResult={setResult}
                                        result={result}
                                        correctAnswer={questionsArray[questionCounter - 1].correctAnswer}
                                    />
                                )
                            })}
                    </CardContent>
                </Card>
            ) : (
                ""
            )}

        </Box>
    );
}
