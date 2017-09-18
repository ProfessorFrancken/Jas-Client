import React, { Component } from 'react';
import './App.css';

import AddPlayers from './AddPlayers/AddPlayers';
import Bidding from './Bidding/Bidding';
import PlayHand from './PlayHand/PlayHand';
import Overview from './Overview/Overview';
import Help from './Help';

import logo from './assets/tfv-professor-francken.png';

export default class JasApp extends Component {
    constructor(props) {
        super();

        this.state = this.reduce(props.events);
    }

    reduce(events) {
        let initialState = {
            currentView: 'players',

            // game state (id)
            gameId: undefined,

            // player state
            players: [],

            // current bid state (only requires gameId)

            // current hand state
            bid: {
                team: undefined,
                suit: undefined,
                bid: undefined,
            },

            // current count state
            current_hand : undefined,

            // overview state (all games)
            hands: [],
            branches: [{ number: 1, we: 0, they: 0, fame: [], hands: [],
                         we_fame: 0, they_fame: 0,
            }],
        };

        /* initialState = filledState;*/

        const reducers = [
            (state, event) => {
                if (event.name === "GameWasFinished") {
                    return initialState;
                }
            },
            (state, event) => {
                if (event.name === "PlayerAdded") {
                    return { ...state, players: [...state.players, {
                        team: event.payload.team,
                        name: event.payload.name,
                    }]};
                }
            },

            (state, event) => {
                if (event.name === "GameStarted") {
                    return { ...state, gameId: event.payload.gameId };
                }
            },

            // Current view reducer
            (state, event) => {
                if (event.name === "HandWasDealt") {
                    return { ...state, currentView: 'bidding' };
                }

                if (event.name === "BidWasPlaced") {
                    return { ...state, currentView: 'hand' };
                }

                if (event.name === "HandWasCompleted") {
                    return { ...state, currentView: 'overview' };
                }
            },

            (state, event) => {
                if (event.name === "BidWasPlaced") {
                    return {
                        ...state,
                        bid: {
                            team: event.payload.team,
                            bid: event.payload.bid,
                            suit: event.payload.suit
                        }
                    };
                }
            },

            (state, event) => {
                if (event.name === "PointsWereCounted") {

                    let wePoints = 0;
                    let theyPoints = 0;

                    if (event.payload.countedBy === "we") {
                        wePoints = event.payload.points;
                        theyPoints = event.payload.maxPoints - wePoints;
                    } else {
                        theyPoints = event.payload.points;
                        wePoints = event.payload.maxPoints - theyPoints;
                    }

                    return {
                        ...state,
                        current_hand: {
                            we: wePoints,
                            they: theyPoints,
                            fame: event.payload.fame
                        }
                    };
                }

                if (event.name === "HandWasCompleted") {
                    return {
                        ...state,
                        current_hand: undefined,
                        currentView: 'overview',
                        hands: [...state.hands, {
                            number: state.hands.length,
                            we:   event.payload.we,
                            they: event.payload.they,
                            fame: event.payload.fame,
                            wet: event.payload.wet,
                            pit: event.payload.pit,
                        }]
                    };
                }
            },

            (state, event) => {
                if (event.name === "BranchWasCompleted") {
                    let lastBranch = state.branches[state.branches.length - 1];

                    // Idea: add  an option to swithc branch statistics to global or local for which we can simply use a different projector
                    return {
                        ...state,
                        branches: [ ...state.branches, {
                            number: state.branches.length + 1,
                            we: lastBranch.we,
                            they: lastBranch.they,
                            we_fame: lastBranch.we_fame,
                            they_fame: lastBranch.they_fame,
                            fame: lastBranch.fame,
                            hands: [],
                        }]
                    };
                }

                if (event.name === "HandWasCompleted") {
                    let currentBranch = state.branches[state.branches.length - 1];

                    const sumFame = (numbers) => numbers.reduce((sum, next) => sum + next.fame, 0);

                    const we_fame = currentBranch.we_fame + sumFame(event.payload.fame.filter((fame) => fame.team === 'we'));
                    const they_fame = currentBranch.they_fame + sumFame(event.payload.fame.filter((fame) => fame.team === 'they'));

                    // Add the hand to our current branch and count statistics
                    return {
                        ...state,
                        branches: [
                            ...state.branches.slice(0, -1),
                            {
                                number: currentBranch.number,
                                we: currentBranch.we + event.payload.we,
                                they: currentBranch.they + event.payload.they,
                                fame: [...currentBranch.fame, ...event.payload.fame],
                                we_fame: we_fame,
                                they_fame: they_fame,

                                hands: [ ...currentBranch.hands, {
                                    number: (currentBranch.hands.length + 1) + (currentBranch.number - 1) * 4,
                                    we:   event.payload.we,
                                    they: event.payload.they,
                                    fame: event.payload.fame,
                                    wet: event.payload.wet,
                                    pit: event.payload.pit,
                                }]
                            }
                        ]
                    }
                }

            },

            (state, event) => {
                if (event.name === "HandWasCompleted") {
                    // The fourth player is assumed to be the dealer, since
                    // the first player wil play first
                    let dealer = state.players[(state.hands.length - 1 + 4) % 4]
                    return { ...state, dealer: dealer.name };
                }
            },
        ];

        const state = events.reduce((state, event) => {
            return reducers.reduce((state, reducer) => {
                return reducer(state, event) || state;
            }, state);
        }, initialState);

        console.log(state);

        return state;
    }

    pushEvent(event)  {
        this.props.pushEvent(event);

        var that = this;
        this.props.handlers.forEach((handle) => {
            handle(event, this.state, that);
        });
    }

    renderCurrentState()
    {
        let that = this;

        switch (this.state.currentView) {
            case 'players':
                return <AddPlayers
                    pushEvent={(event) => that.pushEvent(event)}
                />
            case 'bidding':
                return <Bidding
                    pushEvent={(event) => that.pushEvent(event)}
                    gameId={this.state.gameId}
                    players={this.state.players}
                />
            case 'hand':
                return <PlayHand
                    pushEvent={(event) => that.pushEvent(event)}
                    gameId={this.state.gameId}
                    team={this.state.bid.team}
                    suit={this.state.bid.suit}
                    bid={this.state.bid.bid}
                    players={this.state.players}
                />
            case 'overview':
                return <Overview
                    pushEvent={(event) => that.pushEvent(event)}
                    gameId={this.state.gameId}
                    players={this.state.players}
                    branches={this.state.branches}
                    dealer={this.state.dealer}
                />
            default:
                return <h2>Whoops something went terribly wrong!</h2>
        }
    }

    render() {
        const Header = () => {
            return (
                <div className="mb-4">
                    <nav className="navbar navbar-dark bg-dark">
                        <div className="container">
                            <a className="navbar-brand" href="/">
                                <img
                                    src={logo}
                                    height="50"
                                    alt="T.F.V. 'Professor Francken'"
                                    style={{filter: "brightness(0) invert(1)"}}
                                    className="mr-3"
                                />
                                Francken Jas ELO
                            </a>

                            <Help clearEvents={this.props.clearEvents}/>
                        </div>
                    </nav>
                </div>
            );
        }

        return (
            <div>
                <Header />

                <div className="container">
                    {this.renderCurrentState()}
                </div>
            </div>
        );
    }
}
