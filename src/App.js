import './App.css';
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Lobby from './components/Lobby';

function App() {
    return (
        <div className='app-main'>
            <Routes>
                <Route exact path='/' element={<Lobby />} />
            </Routes>
        </div>
    );
}

export default App;
