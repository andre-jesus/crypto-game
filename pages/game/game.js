
import React, { useState } from "react";
import { io } from "socket.io-client";
import Rock from "../../icons/Rock";
import Paper from "../../icons/Paper";
import Scissors from "../../icons/Scissors";
import { useEffect } from "react";
import style from "../../styles/Game.module.css"
// import { useMoralis } from "react-moralis";


const socket = io.connect("http://localhost:3001");

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("disconnect", () => {
    console.log(socket.id);
});

socket.on("player_joined", (arg) => {
    console.log(arg);
});

const choices = [
    { id: 1, name: "rock", component: Rock, losesTo: 2 },
    { id: 2, name: "paper", component: Paper, losesTo: 3 },
    { id: 3, name: "scissors", component: Scissors, losesTo: 1 },
];

// 1. handle user choices
// 2. determine the winner based on choices
// 3. reset game if user wants to play again

function App() {
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [gameState, setGameState] = useState(null); // wins, lose, draws
    const [roomCreated, setRoomCreateState] = useState(null);

    useEffect(() => {
        restartGame();
    }, []);
    // set draw
    socket.on("game_over", (arg) => {
        console.log("GAME OVER");
        if (arg.winner == socket.id) {
            setGameState("win");
        } else {
            setGameState("lose");
        }
    });

    function restartGame() {
        setGameState(null);
        setUserChoice(null);

        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);
    }

    function handleCreateButtonPressed() {
        var roomName = document.getElementById("create-room-name").value;
        console.log(roomName);
        socket.emit("join_room", roomName);
        setRoomCreateState(true);
    }

    function handleUserChoice(choice) {
        const chosenChoice = choices.find((c) => c.id === choice);
        // setUserChoice(chosenChoice);

        socket.emit("player_choice", chosenChoice);
        // determine the winner

        // if (chosenChoice.losesTo === computerChoice.id) {
        //   // lose
        //   setGameState("lose");
        //   setLosses((losses) => losses + 1);
        // } else if (computerChoice.losesTo === chosenChoice.id) {
        //   // win
        //   setGameState("win");
        //   setWins((wins) => wins + 1);
        // } else if (computerChoice.id === chosenChoice.id) {
        //   // draw
        //   setGameState("draw");
        // }
    }

    function renderComponent(choice) {
        const Component = choice.component;
        return <Component />;
    }

    return (
        <div className={style.box}>
            <div className={style.app}>
                {/* information goes here */}
                <div className={style.info}>
                    <h1>Rock. Paper. Scissors</h1>

                    {/* wins vs losses stats */}
                    <div className={style.wins - losses}>
                        <div className={style.wins}>
                            <span className={style.number}>{wins}</span>
                            <span className={style.text}>{wins === 1 ? "Win" : "Wins"}</span>
                        </div>

                        <div className={style.losses}>
                            <span className={style.number}>{losses}</span>
                            <span className={style.text
                            }>{losses === 1 ? "Loss" : "Losses"}</span>
                        </div>
                        <div className={style.create_room}>
                            <input type="text" id="create-room-name"></input>
                            <button className={style.create_room_btn} onClick={() => depositToGame('0.01')}>create</button>
                        </div>
                    </div>
                </div>

                {/* the popup to show win/loss/draw */}
                {gameState && (
                    <div className={`style.game_state ${gameState}`}>
                        <div>
                            <div className={style.game_state_content}>
                                {/* <p>{renderComponent(userChoice)}</p> */}
                                {gameState === "win" && <p>Congrats! You Won!</p>}
                                {gameState === "lose" && <p>Sorry! You Lose!</p>}
                                {gameState === "draw" && <p>You drew!</p>}
                                {/* <p>{renderComponent(computerChoice)}</p> */}
                            </div>
                            <button onClick={() => restartGame()}>Play Again</button>
                        </div>
                    </div>
                )}

                <div className={style.choices}>
                    {/* choices captions */}
                    <div>You</div>
                    <div />
                    <div>Player 2</div>

                    {/* buttons for my choice */}
                    {/* TODO create a mapping for the buttons */}
                    <div className={style.player_btn}>
                        <button className={style.rock} onClick={() => handleUserChoice(1)}>
                            <Rock />
                        </button>
                        <button className={style.paper} onClick={() => handleUserChoice(2)}>
                            <Paper />
                        </button>
                        <button className={style.scissors} onClick={() => handleUserChoice(3)}>
                            <Scissors />
                        </button>
                    </div>

                    <div className={style.vs}>vs</div>
                    {/* show the computer's choice */}
                    <div className={style.p2_choice}>
                        <button className={style.p2_rock}>
                            <Rock />
                        </button>
                        <button className={style.p2_paper}>
                            <Paper />
                        </button>
                        <button className={style.p2_scissors}>
                            <Scissors />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
