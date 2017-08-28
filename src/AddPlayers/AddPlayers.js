import React, { Component } from 'react';
import AddPlayer from './AddPlayer.js';
import PropTypes from 'prop-types';

export default class AddPlayers extends Component {
    constructor() {
        super();

        this.state = {
            players: [
                { name: "", team: 'we', writes: true, added: false },
                { name: "", team: 'they', writes: true, added: false },
                { name: "", team: 'we', writes: true, added: false },
                { name: "", team: 'they', writes: true, added: false }
            ],
            writes: 0
        };
    }

    addPlayer(id) {
        return (number, team, name) => {
            let players = this.state.players;
            players[number - 1] = {
                name, team, added: true
            };

            this.setState({players});
        };
    }

    removePlayer(id) {
        return (number) => {
            let players = this.state.players;
            players[number - 1].added = false;
            this.setState({players});
        };
    }

    toggleWrites(id) {
        return () => {
            this.setState({writes: id});
        };
    }

    startGame() {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                           .toString(16)
                           .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
        }


        let gameId = guid();

        // Register all players and keep a record of who is writing
        this.state.players.forEach((player, idx) => {
            this.props.pushEvent({
                name: "PlayerAdded",
                payload: {
                    gameId,
                    ...player,
                    writes: (idx === this.state.writes)
                }
            });
        });

        // Start the game allready!
        this.props.pushEvent({
            name: "GameStarted", payload: { gameId }
        });

        this.props.pushEvent({
            name: "HandWasDealt",
            payload: {
                gameId: gameId,
                dealer: "een speler, eigenlijk moet deze event afgevuurd worden door een bovenliggend component"
            }
        });

    }

    render() {
        var that = this;
        let writes = this.state.writes;
        let allPlayersAdded = this.state.players.reduce((current, next) => current && next.added, true);

        return (
            <ul className="list-group">
                <div className="list-group-item">
                    <h2>
                        Add players
                    </h2>
                </div>
                {[...Array(4)].map((x, i) =>
                    <AddPlayer
                        key={i}
                        number={i + 1}
                        team={i % 2 === 0 ? "we" : "they"}
                        writes={writes === i}
                        onAddPlayer={that.addPlayer(i)}
                        onRemovePlayer={that.removePlayer(i)}
                        toggleWrites={that.toggleWrites(i)}
                    />
                )}

                <button className={
                    "list-group-item btn " + (allPlayersAdded ? "btn-outline-success" : "btn-outline-secondary")
                }
                        disabled={! allPlayersAdded}
                        onClick={this.startGame.bind(this)}
                >
                    {allPlayersAdded ? 'Start game' : 'Register all players before starting'}
                </button>
            </ul>
        )
    }
}

AddPlayers.propTypes = {
    pushEvent: PropTypes.func.isRequired
}
