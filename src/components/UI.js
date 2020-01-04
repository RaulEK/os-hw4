import React, {useState} from 'react';
import './UI.css'

const UI = ({choiceHandler}) => {

    const arrays = [
        {id: 1, name: 'Esimene', value: "A,2;B,3;A,-;C,4;D,5;B,-;E,15"},
        {id: 2, name: 'Teine', value: "A,4;B,3;C,6;D,5;B,-;E,5;A,-;F,10"},
        {id: 3, name: 'Kolmas', value: "A,2;B,3;C,4;D,5;B,-;E,7;D,-;F,10;A,-;G,40"},
    ];

    const [choice, setChoice] = useState('1');

    const handleChoice = (value) => {
        setChoice(value);
    };

    const [userArray, setUserArray] = useState('');

    const handleUserArray = (event) => {
        setUserArray(event.target.value.trim())
    };

    const renderVisualization = () => {
        if (choice > arrays.length) {
            choiceHandler(userArray)
        } else {
            choiceHandler(arrays[choice - 1].value)
        }
    };

    return (
        <div className='ui'>
            <h3> Vali või sisesta järjend (kujul A,2;B,3;A,-;C,4). Max 10 sündmust. </h3>
            {arrays.map(array =>
                <div key={array.id} className="row">
                    <label>
                        <input type="radio" checked={choice === array.id}
                               onChange={() => handleChoice(array.id)}/>
                        {array.name}
                    </label>
                    {array.value}
                </div>
            )}
            <div className="row">
                <label>
                    <input type="radio" checked={choice === arrays.length + 1}
                           onChange={() => handleChoice(arrays.length + 1)}/>
                    Enda oma:
                </label>
                <input type="text" value={userArray} onChange={handleUserArray}/>
            </div>
            <button onClick={renderVisualization}>Käivita</button>
        </div>
    )
};

export default UI;