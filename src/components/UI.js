import React, {useState} from 'react';
import './UI.css'

const UI = ({choiceHandler}) => {

    const arrays = [
        {id: 1, name: 'Esimene', value: "2,5,13,29,7,1,18,40,49,4"},
        {id: 2, name: 'Teine', value: "1,10,44,2,12,3,13,20"},
        {id: 3, name: 'Kolmas', value: "45,6,16,9,33,28,11,37,49,25"},
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
        <div>
            <h3> Vali või sisesta järjend </h3>
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
                <input value={userArray} onChange={handleUserArray}/>
            </div>
            <button onClick={renderVisualization}>Käivita</button>
        </div>
    )
};

export default UI;