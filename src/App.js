import './App.css';
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Lobby from './components/Lobby';
import PlayQuiz from "./components/PlayQuiz";
import Leaderboard from "./components/Leaderboard";

function App() {
    return (
        <div className='app-main'>
            <Routes>
                <Route exact path='/' element={<Lobby />} />
                <Route exact path='/playquiz' element={<PlayQuiz />} />
                <Route exact path='/leaderboard' element={<Leaderboard />} />
            </Routes>
        </div>
    );
}

export default App;
