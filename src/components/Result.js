import React from 'react';
import Visualize from "./Visualize";
import '../App.css'

function inputSeparator(values) {
    values = values.split(/,|;/);
    let fileNames = [];
    let fileSizes = [];

    for (let i = 0; i < values.length; i++) {
        if (i % 2 === 0) {
            fileNames.push(values[i])
        } else {
            fileSizes.push(values[i])
        }
    }
    return [fileNames, fileSizes];
}

function processInput(values) {
    const fileNames = values[0];
    const fileSizes = values[1];
    let grid = Array.from(Array(fileNames.length + 1), () => (Array.from(Array(50), () => " ")));
    let filesToWrite = [];
    let sizesToWrite = [];
    let eemaldatud = false;
    let lastRow = grid[grid.length - 1];
    for (let i = 0; i < fileNames.length; i++) {
        if (fileSizes[i] === '-') {
            eemaldatud = true;
            let index = filesToWrite.indexOf(fileNames[i]);
            filesToWrite.splice(index, 1);
            sizesToWrite.splice(index, 1);
        } else {
            eemaldatud = false;
            filesToWrite.push(fileNames[i]);
            sizesToWrite.push(fileSizes[i]);
        }
        for (let j = 0; j < filesToWrite.length; j++) {
            if (j === filesToWrite.length - 1 && eemaldatud === false) {
                let size = sizesToWrite[j];
                let index = 0;
                while (size > 0 && index < 50) {
                    if (grid[i + 1][index] === ' ') {
                        grid[i + 1][index] = filesToWrite[j];
                        size--;
                    }
                    index++;
                }
                if (size > 0) {
                    grid[i + 1][0] = '!';
                    lastRow = grid[i];
                    break;
                }
            } else {
                let size = sizesToWrite[j];
                let index = 0;
                while (size > 0) {
                    if (grid[i][index] === filesToWrite[j]) {
                        grid[i + 1][index] = filesToWrite[j];
                        size--;
                    }
                    index++;
                }
            }
        }
    }
    return [grid, lastRow];
}

function calculations(lastRow) {
    const files = new Map();
    lastRow.map(file => files.has(file) ? files.set(file, files.get(file) + 1) : files.set(file, 1));
    files.delete(' ');
    const fragmentedFiles = [];
    const lookedFiles = [];
    let lastFile = '';
    for (let i = 0; i < lastRow.length; i++) {
        if (lastRow[i] !== ' ') {
            if (!lookedFiles.includes(lastRow[i])) {
                lookedFiles.push(lastRow[i]);
            } else if (lookedFiles.includes(lastRow[i]) && lastFile !== lastRow[i] && lastFile !== '') {
                fragmentedFiles.push(lastRow[i]);
            }
            lastFile = lastRow[i];
        }
    }
    let fragmentedTotal = 0;
    let filesTotal = 0;
    for (const [key, value] of files.entries()) {
        if (fragmentedFiles.includes(key)) {
            fragmentedTotal += value;
        }
        filesTotal += value;
    }
    return [Math.round(fragmentedFiles.length / files.size * 10000) / 100 , Math.round(fragmentedTotal / filesTotal * 10000) / 100];
}

const Result = ({array}) => {

    const grid = processInput(inputSeparator(array));
    const fragments = calculations(grid[1]);

    return (
        <>
            <div className='description'>
                <h4>Tulemus:</h4>
                <p>Allesjäänud failidest on fragmenteerunud: <b>{fragments[0]}%</b></p>
                <p>Fragmenteerunud failidele kuulub kasutataud ruumist: <b>{fragments[1]}%</b></p>
            </div>
            <div className='grid'>
                <Visualize grid={grid[0]}/>
            </div>
        </>
    )
};

export default Result;