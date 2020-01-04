import React, {useState, useEffect} from 'react';
import Result from './components/Result';
import UI from './components/UI';
import './App.css';

const App = () => {

    const [array, setArray] = useState('');

    const handleArray = (value) => {
        setArray(value)
    };

    return (
        <div id="wrapper">
            <div>
                <UI choiceHandler={handleArray}/>
            </div>
            <div className='result'>
            <Result array={array}/>
            </div>
        </div>
    )
};

export default App;