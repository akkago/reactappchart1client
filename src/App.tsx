import { useState } from 'react';
import './App.css';
import generateRandomPoints from './chart/mock';
import { Button, TextField } from '@mui/material';
import AreaChart from './chart/AreaChart';

const defaultPointsCount = 50;

function App() {
    const [pointsCount, setPointsCount] = useState(defaultPointsCount);
    const [points, setPoints] = useState(generateRandomPoints(pointsCount));
    const handleNumberChange = (event: any) => {
        const inputNumber = event.target.value;
        setPointsCount(inputNumber);
        setPoints(generateRandomPoints(inputNumber));

    };

    return (
        <div>
            <AreaChart points={points} />
            <div className="buttons-container">
                <Button
                    variant="outlined"
                    onClick={() => setPoints(generateRandomPoints(pointsCount))}
                >
                    random
                </Button>
                <TextField
                    label="points count"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={pointsCount}
                    onChange={handleNumberChange}
                />
            </div>
        </div>
    );
}

export default App;