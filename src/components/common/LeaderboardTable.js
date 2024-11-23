import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function LeaderboardTable({leaderBoardData}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                {leaderBoardData.length > 0 ? (
                    <TableHead>
                        <TableRow style={{textAlign: "center"}}>
                            <TableCell align="center">Standing</TableCell>
                            <TableCell align="center">Player Name</TableCell>
                            <TableCell align="center">Date and Time</TableCell>
                            <TableCell align="center">Final Score</TableCell>
                        </TableRow>
                    </TableHead>
                ) : (
                    <></>
                )}
                <TableBody>
                    {leaderBoardData.length > 0 ? (
                        leaderBoardData.map((player, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {player.username}
                                    </TableCell>
                                    <TableCell align="center">{player.timestamp + ''}</TableCell>
                                    <TableCell align="center">{player.score}</TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow className='no-data' key={1}><TableCell>No Data to Show</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
