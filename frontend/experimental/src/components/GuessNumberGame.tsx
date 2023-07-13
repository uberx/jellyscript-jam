import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

const GuessNumberGame: React.FC = () => {
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
    const [userGuess, setUserGuess] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(5);

    useEffect(() => {
        if (!timeLeft) return;
        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft]);

    const submitGuess = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (parseInt(userGuess) === randomNumber) {
            setResult("Congratulations! You've guessed the number correctly.");
        } else {
            setResult("Sorry, your guess was incorrect. The correct number was " + randomNumber);
        }
        setUserGuess("");
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setTimeLeft(5);
    };

    return (
        <div>
            <h1>Guess the Number</h1>
    <form onSubmit={submitGuess}>
    <input
        type="number"
    value={userGuess}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => setUserGuess(event.target.value)}
    required
    />
    <button type="submit">Guess</button>
        </form>
    {timeLeft > 0 ? (
        <p>Time left: {timeLeft} seconds</p>
    ) : (
        <p>Time's up! Submit your guess for the next round.</p>
    )}
    <p>{result}</p>
    </div>
);
};

export default GuessNumberGame;