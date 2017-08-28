import React, { Component } from 'react';

import { Bid } from '../Suits.js';
import CompleteHand from './CompleteHand.js';
import FameFromHand from './FameFromHand.js';

// eslint-disable-next-line
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import sweetAlert from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const sumFame = (numbers) => numbers.reduce((sum, next) => sum + next.fame, 0);
const swal = sweetAlert;

export default class PlayHand extends Component {

    constructor() {
        super();

        this.state = { fame: [] }
    }

    addFameToUs(amount) {
        this.setState((prevState, props) => {
            return { fame: [...prevState.fame, {team: "we", fame: amount}]}
        });
    }

    addFameToThey(amount) {
        this.setState((prevState) => {
            return { fame: [...prevState.fame, {team: "they", fame: amount}]}
        });
    }

    resetFame() {
        this.setState({ fame: [] });
    }

    undoLastFame() {
        this.setState({ fame: this.state.fame.slice(0, -1) });
    }

    countPoints(team) {
        let players = this.players(team).join(' and ');

        swal({
            title: "Count points",
            text: `How much points did ${players} earn?<br/>(they require ${this.pointsToWin()} points to win)`,
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Points",
            inputType: "number",
            html: true
        },
        (points) => {
            if (points === false) {
                return false;
            }

            if (points === "" || points > this.maxPointsInThisGame()) {
                swal.showInputError("You should be capable enough to be able to count cards");
                return false
            }

            let pointsEarnedByPlayingTeam = team === this.props.team
                ? points
                : this.maxPointsInThisGame() - points;


            console.log(pointsEarnedByPlayingTeam, this.pointsToWin());

            this.props.pushEvent({
                name: "PointsWereCounted",
                payload: {
                    gameId: this.props.gameId,
                    countedBy: team,
                    points: parseInt(points, 10),
                    maxPoints: this.maxPointsInThisGame(),
                    fame: this.state.fame
                }
            });

            // Wet
            if (pointsEarnedByPlayingTeam < this.pointsToWin()) {
                // If we count our points
                if (team === this.props.team) {
                    swal("Wet!", capitalizeFirstLetter(players) + " went wet!", "warning");
                } else {
                    swal("Wet!", capitalizeFirstLetter(players) + " went wet!", "success");
                }

                this.props.pushEvent({
                    name: "TeamWentWet",
                    payload: {
                        gameId: this.props.gameId,
                        team,
                        fame: this.state.fame,
                        maxPoints: this.maxPointsInThisGame(),
                    }
                });
            } else {
                if (team === this.props.team) {
                    swal("Nice!", capitalizeFirstLetter(players) + " earned " + points + " points!", "success");
                } else {
                    swal("Played", capitalizeFirstLetter(players) + " earned " + points + " points!", "warning");
                }

                this.props.pushEvent({
                    name: "HandWasCompleted",
                    payload: {
                        gameId: this.props.gameId,
                        fame: this.state.fame,

                        countedBy: team,
                        points: parseInt(points, 10),
                        maxPoints: this.maxPointsInThisGame(),
                    }
                });
            }

        });
    }

    confirmPit(team) {
        let anti = team !== this.props.team;

        let players = this.players(team).join(' and ');

        sweetAlert(
        {
            title: anti ? "Anti pit" : "pit",
            text: "Are you sure " + players + " got a " + (anti ? "anti " : "") + "pit?",
            type: "warning",
            showCancelButton: true,
        },
        (confirmed) => {
            if (! confirmed) {
                return;
            }

            this.props.pushEvent({
                name: "TeamReceivedAPit",
                payload: {
                    gameId: this.props.gameId,
                    team,
                    anti,
                    maxPoints: this.maxPointsInThisGame(),
                    fame: this.state.fame
                }
            });
        }
        );
    }

    confirmWet(team) {

        if (team !== this.props.team) {
            sweetAlert("Whoops!", "Something has probably gone wrong since the team that isn't playing went wet..", "warning");
            return;
        }

        let players = this.players(team).join(' and ');

        sweetAlert(
        {
            title: "Wet",
            text: "Are you sure " + players + " went wet?",
            type: "warning",
            showCancelButton: true,
        },
        (confirmed) => {
            if (! confirmed) {
                return;
            }

            this.props.pushEvent({
                name: "TeamWentWet",
                payload: {
                    gameId: this.props.gameId,
                    team,
                    fame: this.state.fame,
                    maxPoints: this.maxPointsInThisGame(),
                }
            });
            return ;
        }
        );
    }

    playingPlayers() {
        return this.props.players
        .filter((player) => player.team === this.props.team)
        .map((player) => player.name);
    }

    players(team) {
        return this.props.players
            .filter((player) => player.team === team)
            .map((player) => player.name);
    }

    // Points the playing team need to earn in order to not get wet
    pointsToWin() {
        let bid = this.props.bid;

        if (bid === 'pit') {
            return this.maxPointsInThisGame();
        }

        let fameByPlayers = sumFame(this.state.fame
            .filter((fame) => fame.team === this.props.team)
        )

        let fameByOthers = sumFame(this.state.fame
            .filter((fame) => fame.team !== this.props.team)
        );

        let fameDifference = fameByOthers - fameByPlayers;

        return bid + 0.5 * fameDifference;
    }

    maxPointsInThisGame() {
        return this.props.suit === "sans" ? 130 : 162;
    }

    render() {
        let that = this;

        let fameByUs = sumFame(this.state.fame.filter((fame) => fame.team === "we"));
        let fameByThem = sumFame(this.state.fame.filter((fame) => fame.team === "they"));

        let lastFame = this.state.fame[this.state.fame.length - 1];

        let we = this.players('we').join(' and ');
        let they = this.players('they').join(' and ');

        let playingPlayers = this.playingPlayers();

        return (
        <div className="card my-4">
            <div className="card-body">
                <h2>
                    Play hand
                    <small className="ml-3 text-muted">
                        {capitalizeFirstLetter(this.props.team) + " "}
                        ({playingPlayers.join(' and ')})
                        play <Bid bid={this.props.bid} suit={this.props.suit} />
                    </small>
                </h2>

                <FameFromHand
                    lastFame={lastFame}
                    undoLastFame={() => that.undoLastFame()}
                    undoFameAmount={lastFame ? lastFame.fame : 0}
                    players={lastFame ? this.players(lastFame.team) : []}

                    resetFame={() => that.resetFame()}

                    fameByUs={fameByUs}
                    addFameToUs={(fame) => that.addFameToUs(fame)}

                    fameByThem={fameByThem}
                    addFameToThem={(fame) => that.addFameToThey(fame)}
                />

                <hr />

                <h3>
                    Complete hand:
                    <small>
                        {this.players(this.props.team).join(' and ')} require {this.pointsToWin()} points to win
                    </small>
                </h3>

                <CompleteHand
                    title={`We ${we}`}
                    countPoints={() => that.countPoints('we')}
                    confirmPit={() => that.confirmPit('we')}
                    enablePit={fameByThem === 0}
                    confirmWet={() => that.confirmWet('we')}
                    isPlaying={this.props.team === 'we'}
                />

                <CompleteHand
                    title={`They ${they}`}
                    countPoints={() => that.countPoints('they')}
                    confirmPit={() => that.confirmPit('they')}
                    enablePit={fameByUs === 0}
                    confirmWet={() => that.confirmWet('they')}
                    isPlaying={this.props.team === 'they'}
                />
            </div>
        </div>
        )
    }
}
