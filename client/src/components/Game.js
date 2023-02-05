import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";


function Game () {
    const cookies = new Cookies();
    const cookieData = cookies.get("TOKEN");
    const [user, setUser] = useState(cookieData.username);
    const [gameOn, setGameOn] = useState(false);
    const [message, setMessage] = useState("Choose Difficulty:");
    const [currentMode, setCurrentMode] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [allChoices, setAllChoices] = useState([]);
    const [score, setScore] = useState(0);
    const [correctChoice, setCorrectChoice] = useState("");

    const getQuestion = async(mode) => {
        axios.get(`https://the-trivia-api.com/api/questions?limit=1&difficulty=${mode}`)
        .then(res => {
           const question = res.data[0].question;
           let allChoices = [];
           for (const choice of res.data[0].incorrectAnswers) {
               allChoices.push(choice);
           }
           const correctChoice = res.data[0].correctAnswer;
           allChoices.push(correctChoice);
           for (let i = allChoices.length - 1; i > 0; i--) {
               let j = Math.floor(Math.random() * (i + 1));
               let temp = allChoices[i];
               allChoices[i] = allChoices[j];
               allChoices[j] = temp;
           };
           setCurrentQuestion(question);
           setAllChoices(allChoices);
           setCorrectChoice(correctChoice);
           }).catch(err => console.error(err))
        };
    
    const submitAnswer = (answer) => {
        if (answer === correctChoice) {
            switch (currentMode) {
                case "easy":
                    setScore(score + 1);
                    break;
                case "medium":
                    setScore(score + 2);;
                    break;
                case "hard":
                    setScore(score + 4);;
                    break;
            }
            getQuestion(currentMode);
        } else {
            gameOver(user, score);
        }
    }

    const gameOver = (username, score) => {
        axios
        .post("http://localhost:4000/api/player", {
            username: username,
            newScore: score
        });
        setScore(0);
        setGameOn(false);
        setMessage("Game Over! Play again?");
        setCurrentMode("");
        setCurrentQuestion("");
        setAllChoices([]);
        setCorrectChoice("");
    }

    const chooseMode = (mode) => {
        setCurrentMode(mode);
        getQuestion(mode);
        setGameOn(true);
        setMessage("");
    }

    const Modes = () => <div className="chooseMode">
            <button className="app-button"
             onClick = {() => chooseMode("easy")}>
                Easy
            </button>
            <button className="app-button" 
            onClick = {() => chooseMode("medium")}>
            Medium</button>
            <button className="app-button" 
            onClick = {() => chooseMode("hard")}>
            Hard</button>
        </div>
    
    const Scoreboard = () => <div className="scoreboard">
        <p>Current Score: {score}</p>
    </div>

    return (
        <div>
            <h2>{message}</h2>
            {!gameOn ? <Modes /> : null}
            {gameOn ? <Scoreboard /> : null}
            <div>
                <p>{currentQuestion}</p>
                <div>
                    {
                    allChoices.map(choice =>
                        <button
                        className="app-button"
                        onClick={() => submitAnswer(choice)}>
                            {choice}
                        </button>
                        )}
                </div>
                <footer className="footer">
                    <a className="link" href="/dashboard">
                        Back to Home Page.
                    </a>
                </footer>
            </div>
        </div>
        )
}


export default Game;