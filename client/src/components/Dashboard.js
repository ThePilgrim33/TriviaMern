import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { logoutUser } from "../actions/authActions";
import mason from "../images/mason.gif"

function Dashboard() {
    const cookies = new Cookies();
    const cookieData = cookies.get("TOKEN");

    const username = useState(cookieData.username);
    const [topPlayers, setTopPlayers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
        .get("http://localhost:4000/api/topPlayers")
        .then((res) => {
            const topPlayers = res.data;
            for (let i = 0; i < 5; i++) {
                topPlayers[i].rank = i + 1;
            }
            setTopPlayers(topPlayers)
            });
        });

    return (
        <div>
            <h1>Hello, {username}!</h1>
                <div>
                    <h2>Behold!  The Top Minds Of The Internet!</h2>
                        <div className="row">
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                                <img src={mason} alt="mason" />
                        </div>
                    <table  className="leaderboard">
                        <thead>
                            <tr>
                                <th>
                                    Ranking
                                </th>
                                <th>
                                    Username
                                </th>
                                <th>
                                    High Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            topPlayers.map((player) => 
                                <tr>
                                    <th scope="row">
                                        {player.rank}
                                    </th>
                                    <td>
                                        {player.username}
                                    </td>
                                    <td>
                                        {player.highScore}
                                    </td>
                                </tr>
                                )
                        }
                        </tbody>
                    </table>
                </div>
                <a className="link" href="/game">
                    Click Here To Test Your Intellect!!!
                </a>
                <div>
                    <button
                    onClick={() => logoutUser()}>
                        Log Out
                    </button>
                </div>
        </div>
    )

}

export default Dashboard;