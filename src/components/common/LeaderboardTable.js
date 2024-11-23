import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function LeaderboardTable({ leaderBoardData }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {leaderBoardData.length > 0 ? (
                    <TableHead>
                        <TableRow>
                            <TableCell>Standing</TableCell>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Date and Time</TableCell>
                            <TableCell>Final Score</TableCell>
                        </TableRow>
                    </TableHead>
                ) : (
                    <></>
                )}
                {leaderBoardData.length > 0 ? (
                    leaderBoardData.map((player, index) => {
                        return (
                            <TableBody>
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >
                                        {player.username}
                                    </TableCell>
                                    <TableCell className="table-cell">{player.timestamp + ''}</TableCell>
                                    <TableCell>{player.score}</TableCell>
                                </TableRow>

                            </TableBody>
                        )
                    })
                ) : (
                    <div className='no-data'>
                        <p>No Data to Show</p>
                    </div>
                )}
            </Table>
        </TableContainer>
    );
}
