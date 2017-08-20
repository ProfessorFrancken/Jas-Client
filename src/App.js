import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Select from 'react-select';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import sweetAlert from 'sweetalert';

import 'sweetalert/dist/sweetalert.css';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

const swal = sweetAlert;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

            {/*
            Idea: add a Bid class which contians the bid in points and the suit.
            It should be renderable (React Component) and have funcitons that
            can verify whether a game (fame + points) is won


            Todo:

            [ ] auto wet (works partially)
            [x] disable pit if pit is no longer possible
            [ ] add verzaken (Forsaken?)
            */}

            Array.prototype.chunk = function(groupsize){
                var sets = [], chunks, i = 0;
                chunks = this.length / groupsize;

                while(i < chunks){
                    sets[i] = this.splice(0,groupsize);
                	i++;
                }

                return sets;
            };

            var globals = {
                players: [
                {name: "", team: "we", added: false},
                {name: "", team: "they", added: false},
                {name: "", team: "we", added: false},
                {name: "", team: "they", added: false},
                ],
                bid: {
                    value: undefined,
                    suit: undefined, // clubs, clover, hearts, diamonds
                    team: undefined, // 0, 1
                },
            };
            window.events = [
            ];

            const steenKool = {
                fame: 'feem',
            }

            const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
            const sumFame = (numbers) => numbers.reduce((sum, next) => sum + next.fame, 0);

            const SuitIcon = (props) => {

                const imgStyle = {
                    width: props.width ? props.width : "20px",
                    maxHeight: "100%",
                    marginRight: "0.5em"
                };

                return <img src={props.src} style={imgStyle}/>
            }

            const Spade =   () => <SuitIcon src="./Spade.png"/>
            const Heart =   () => <SuitIcon src="./Heart.png"/>
            const Diamond = () => <SuitIcon src="./Diamond.png"/>
            const Club =    () => <SuitIcon src="./Club.png"/>
            const Sans =    () => <SuitIcon src="./Sans2.png" width="60px"/>

            const bidStringToComponent = (bid) => {
                switch (bid) {
                    case 'spades': return <Spade />
                    case 'hearts': return <Heart />
                    case 'diamonds': return <Diamond />
                    case 'clubs': return <Club />
                    case 'sans': return <Sans />
                }

            };
            const Bid = (props) => <span><strong>{props.bid}</strong> {bidStringToComponent(props.suit)}</span>

            class AddPlayer extends React.Component {
                constructor(props) {
                    super();

                    this.state = {
                        name: "Mark",
                        completed: false,
                    }

                    this.changeName = this.changeName.bind(this);
                    this.addPlayer = this.addPlayer.bind(this);
                    this.toggleWrites = props.toggleWrites;
                }

                changeName(event) {

                    this.props.toggleWrites();
                    this.setState({
                        name: event.target.value
                    });
                }

                addPlayer() {
                    if (this.state.name === '') {
                        return;
                    }

                    if (this.state.completed) {
                        this.props.onRemovePlayer(
                        this.props.number,
                        )
                    } else {
                        this.props.onAddPlayer(
                        this.props.number,
                        this.props.team,
                        this.state.name
                        )
                    }

                    this.setState({
                        completed: ! this.state.completed
                    });
                }

                render() {
                    let that = this;

                    let disableAddPlayerBtn = this.state.name === '';

                    return (
                    <li className={"list-group-item " + (this.props.team === "we" ? "list-group-item-success" : "list-group-item-info")}>
                        <div className="row">
                            <div className="col-md-2 d-flex align-items-center">
                                #{this.props.number} : {this.props.team === "we" ? "We" : "They"}
                            </div>
                            <div className="col-md-4">
                                <input
                                type="text"
                                value={this.state.name}
                                onChange={this.changeName}
                                readOnly={this.state.completed}
                                className="form-control"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-center justify-content-around">
                                <div className={"form-check form-check-inline " + this.state.completed ? "disabled" : ""}>
                                    <label className="form-check-label">
                                        <input
                                        type="checkbox"
                                        value="writes"
                                        checked={this.props.writes}
                                        onChange={this.toggleWrites}
                                        className="form-check-input"
                                        disabled={this.state.completed}
                                        />
                                        Writes
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button
                                className={this.state.completed ? 'btn btn-block btn-outline-danger' : 'btn btn-block btn-outline-primary'}
                                onClick={this.addPlayer}
                                disabled={disableAddPlayerBtn}
                                >
                                {this.state.completed ? 'Change player' : 'Add Player'}
                            </button>
                        </div>
                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                            <small className="text-muted d-none">
                                Fjelo: #123
                            </small>
                        </div>
                    </div>
                </li>
                )
            }
        }

        class AddPlayers extends React.Component {
            constructor() {
                super();

                this.state = {
                    players: [
                        { name: "Mark", }
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

        class Bidding extends React.Component {

            constructor(props) {
                super();

                this.selectSuit = this.selectSuit.bind(this);
                this.submitBid = this.submitBid.bind(this);
                this.state = {
                    suit: "spades",
                    bid: 80,
                    team: "we",
                }
            }

            selectTeam(team) {
                this.setState({ team });
            }

            selectSuit(event) {
                this.setState({
                    suit: event.value
                });

                const isSans = event.value === 'sans';

                const bids = isSans
                ? [70, 80, 90, 100, 110, 120, 130, 'pit']
                : [82, 92, 102, 112, 122, 132, 142, 152, 162, 'pit'];

                // Check if the current bid is valid, otherwise reset it to the lowest possible bid
                if (! bids.includes(this.state.bid)) {
                    this.setState({ bid: bids[bids.length - 2] });
                }
            }

            selectBid(bid) {
                this.setState({ bid });
            }

            possibleBids() {
                const isSans = this.state.suit === 'sans' ;

                return  isSans
                ? [70, 80, 90, 100, 110, 120, 130, 'pit']
                : [82, 92, 102, 112, 122, 132, 142, 152, 162, 'pit'];
            }


            players(team) {
                return this.props.players
                    .filter((player) => player.team === team)
                    .map((player) => player.name);
            }

            submitBid() {
                this.props.pushEvent({
                    name: "BidWasPlaced",
                    payload: {
                        gameId: this.props.gameId,
                        ...this.state
                    }
                });
            }

            render() {
                let that = this;

                const isSans = this.state.suit === 'sans';

                return (
                <div className="card my-4">
                    <div className="card-body">
                        <h2>
                            Submit the bid by
                        </h2>

                        <div className="row">
                            <div className="col-md-6">
                                <button
                                type="button"
                                className={"my-1 btn btn-lg btn-block " + (this.state.team === "we" ? "btn-primary" : "btn-outline-primary")}
                                onClick={ () => that.selectTeam('we') }
                                >
                                We ({this.players('we').join(' and ')})
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button
                            type="button"
                            className={"my-1 btn btn-lg btn-block " + (this.state.team === "they" ? "btn-primary" : "btn-outline-primary")}
                            onClick={ () => that.selectTeam('they') }
                            >
                            They ({this.players('they').join(' and ')})
                        </button>
                    </div>
                </div>
                <div className="form-group my-4">
                    <Select
                    name="choose-suit"
                    value={that.state.suit}
                    options={[
                        { value: 'spades', label: <span><Spade />{'Spades'}</span> },
                        { value: 'hearts', label: <span><Heart />{'Hearts'}</span> },
                        { value: 'diamonds', label: <span><Diamond />{'Diamonds'}</span> },
                        { value: 'clubs', label: <span><Club />{'Clubs'}</span> },
                        { value: 'sans', label: <Sans /> },
                        ]}
                        onChange={that.selectSuit}
                        searchable={false}
                        clearable={false}
                        />
                    </div>
                    <h3 className="text-center my-3">Choose your bid</h3>
                    <div className="row">
                        {this.possibleBids().map((bid) => {
                            return (
                            <div className="col-6 col-sm-4 col-md-3 my-3">
                                <button
                                className={"btn btn-lg btn-block " + (this.state.bid === bid ? "btn-primary" :  "btn-outline-primary")}
                                onClick={() => that.selectBid(bid)}
                                >
                                {bid}
                            </button>
                        </div>
                        );
                    })}
                </div>
                <button className="btn btn-lg btn-block btn-outline-success" onClick={that.submitBid}>
                    Submit bid
                </button>
            </div>
        </div>
        )
    }
};

class AddFameToHand extends React.Component {
    render() {
        let btnStyle = "btn btn-outline-primary btn-block btn-lg my-3";

        return (
            <ul className={"list-unstyled row mb-0" + (this.props.team === 'We' ? '' : ' bg-light')}>
                <li className="col-sm-12 col-md-3 d-flex align-items-center">
                    <h4>
                        {this.props.team} <small> ({this.props.fame} fame) </small>
                    </h4>
                </li>

                <li className="col-4 col-md-3 d-flex align-items-center">
                    <button className={btnStyle} onClick={() => this.props.addFame(20)}>20</button>
                </li>

                <li className="col-4 col-md-3 d-flex align-items-center">
                    <button className={btnStyle} onClick={() => this.props.addFame(50)}>50</button>
                </li>

                <li className="col-4 col-md-3 d-flex align-items-center">
                    <button className={btnStyle} onClick={() => this.props.addFame(100)}>100</button>
                </li>
            </ul>
        )
    }
}

class CompleteHand extends React.Component {
    render() {
        let btnStyleSuccess = "btn btn-outline-success btn-block btn-lg my-3";
        let btnStylePit = "btn btn-link text-danger btn-block btn-lg my-3";
        let btnStyleWet = "btn btn-link text-warning btn-block btn-lg my-3";

        return (
            <ul className="list-unstyled row mb-0">
                <li className="col-sm-12 col-md-3 d-flex align-items-center">
                    <h4>
                        {this.props.title}
                    </h4>
                </li>

                {/* Unless a the bid was pid, since counting */}
                <li className="col-sm-4 col-md-3 d-flex align-items-center">
                    <button className={btnStyleSuccess} onClick={this.props.countPoints}>
                        Count our points
                    </button>
                </li>

                { // If the other team earned fame then they won at least one round, so
                  // no pit can be earned
                    ! this.props.enablePit ? '' :
                    <li className="col-sm-4 col-md-3 d-flex align-items-center">
                        <button className={btnStylePit} onClick={this.props.confirmPit}>
                            received a {this.props.isPlaying ? '' : 'anti'} Pit
                        </button>
                    </li>
                }

                {
                    ! this.props.isPlaying ? '' :
                    <li className="col-sm-4 col-md-3 d-flex align-items-center">
                        <button className={btnStyleWet} onClick={this.props.confirmWet}>went wet</button>
                    </li>
                }
            </ul>
        )
    }
}

class FameFromHand extends React.Component {
    render() {
        let undoFameStyle = "btn btn-lg btn-link " + (this.props.lastFame ? "text-dark" : "text-light");
        let players = this.props.players.join(' and ');

        return (
            <div>
            <div className="row mt-3">
                <div className="col-sm-3">
                    <h3>Add fame</h3>
                </div>

                <div className="col-sm-9 text-right">
                {! this.props.lastFame ? '' :
                    <button className={undoFameStyle} onClick={this.props.undoLastFame}>
                        Undo last fame ({this.props.undoFameAmount} fame by {players})
                    </button>
                }
                    <button className="btn btn-lg btn-link text-danger" onClick={this.props.resetFame}>Reset fame to 0</button>
                </div>
            </div>

            <AddFameToHand team="We" fame={this.props.fameByUs} addFame={this.props.addFameToUs} />
            <AddFameToHand team="They" fame={this.props.fameByThem} addFame={this.props.addFameToThem} />
            </div>
        )
    }
}

class PlayHand extends React.Component {

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
                    points: points,
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
                        points: points,
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

class CountCards extends React.Component {
    render() {

        const team = capitalizeFirstLetter(this.props.team);
        const fameByTeam = sumFame(this.props.fame
        .filter((fame) => fame.team === this.props.team)
        );

        return (
        <div className="card my-4">
            <div className="card-body">
                <button className="btn btn-link">Go back to bidding screen</button>

                <h2>
                    Count cards for {team}
                </h2>

                <p className="lead">
                    {capitalizeFirstLetter(this.props.team)}
                    ({this.props.players[0]} and {this.props.players[1]})
                    played <strong className="mr-2">{this.props.bid}</strong>
                    {this.props.suit}
                    and received {fameByTeam} fame.
                </p>

            </div>
        </div>
        )
    }
}

class Overview extends React.Component {

    dealHand() {
        this.props.pushEvent({
            name: "HandWasDealt",
            payload: {
                gameId: this.props.gameId,
                dealer: this.dealer()
            }
        })
    }

    dealer() {
        return this.props.players[this.props.hands.length % 4].name
    }

    players(team) {
        return this.props.players
        .filter((player) => player.team === team)
        .map((player) => player.name);
    }

    render() {

        let hands = [...this.props.hands];
        let chunkedhands = [...this.props.hands].chunk(4);

        const sum = (numbers) => numbers.reduce((sum, next) => sum + next, 0);

        let totals = {
            we: 0, we_fame: 0, they: 0, they_fame: 0
        };
        let tableBody = [...chunkedhands.map((hands, branchNumber) => {
            hands = hands.filter((hand) => Object.keys(hand).length !== 0);

            let body = [];

            if (hands.length === 4) {
                totals = {
                    we: totals.we + sum(hands.map((hand) => hand.we === 'Wet' ? 0 : hand.we )),
                    we_fame: totals.we_fame + sum(hands.map((hand) => sumFame(hand.fame.filter((fame) => fame.team === 'we')))),
                    they: totals.they + sum(hands.map((hand) => hand.they === 'Wet' ? 0 : hand.they )),
                    they_fame: totals.they_fame + sum(hands.map((hand) => sumFame(hand.fame.filter((fame) => fame.team === 'they')))),
                };

                body.push(
                                <tr className="bg-dark text-white">
                                    <td>
                                        <strong>
                                            Branch {branchNumber + 1}
                                        </strong>
                                    </td>
                                    <td>{totals.we}</td>
                                    <td>{totals.we_fame}</td>
                                    <td>{totals.they}</td>
                                    <td>{totals.they_fame}</td>
                                </tr>
                );
            }

                            body.push(...
                                hands.reverse().map((hand, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{branchNumber * 4 + hands.length - idx }</td>
                                            <td>{hand.we}</td>
                                            <td>{sumFame(hand.fame.filter((fame) => fame.team === 'we'))}</td>
                                            <td>{hand.they}</td>
                                            <td>{sumFame(hand.fame.filter((fame) => fame.team === 'they'))}</td>
                                        </tr>
                                    )
                                })
                            );

                            return body;
                        })].reverse();

        return (
        <div className="card my-4">
            <div className="card-body">
                <h2>
                    Overview
                </h2>

                <button className="btn btn-lg btn-block btn-primary" onClick={() => this.dealHand()}>
                    Deal a new hand
                </button>

                <p>
                    {this.players('they').join(' and ')} have to crawl twice
                </p>

                <p>
                    {this.dealer()} is the dealer
                </p>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan="2">We</th>
                            <th colSpan="2">They</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Points</th>
                            <th>Fame</th>
                            <th>Points</th>
                            <th>Fame</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...tableBody]}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
};

class JasApp extends React.Component {
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
            players: [
                {name: "Mark", team: "we", added: false},
                {name: "Arjen", team: "they", added: false},
                {name: "Anna", team: "we", added: false},
                {name: "Su-Elle", team: "they", added: false},
            ],

            // current bid state (only requires gameId)

            // current hand state
            bid: {
                team: 'we',
                suit: 'hearts',
                bid: 100,
            },

            // current count state

            // overview state (all games)
            hands: [
                { we: 1, they: 20, fame: [] },
                { we: 2, they: 20, fame: [] },
                { we: 3, they: 20, fame: [] },
                { we: 4, they: 20, fame: [] },
                { we: 5, they: 20, fame: [] },
                { we: 6, they: 20, fame: [] },
            ]
        };

        const reducers = [
            (state, event) => {
                if (event.name === "PlayerAdded") {
                    return { ... state, players: [... state.players, {
                        team: event.payload.team,
                        name: event.payload.name,
                    }]};
                }
            },

            (state, event) => {
                if (event.name === "GameStarted") {
                    return { ... state, gameId: event.payload.gameId };
                }
            },

            // Current view reducer
            (state, event) => {
                if (event.name === "HandWasDealt") {
                    return { ... state, currentView: 'bidding' };
                }

                if (event.name === "BidWasPlaced") {
                    return { ... state, currentView: 'hand' };
                }

                if ([
                    "HandWasCompleted",
//                    "TeamReceivedAPit",
//                    "TeamWentWet"
                    ].includes(event.name)) {
                    return { ... state, currentView: 'overview' };
                }
            },

            (state, event) => {
                if (event.name === "BidWasPlaced") {
                    return {
                        ... state,
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

                    let fame = event.payload.fame;

                    if (event.payload.countedBy === "we") {
                        wePoints = event.payload.points;
                        theyPoints = event.payload.maxPoints - wePoints;
                    } else {
                        theyPoints = event.payload.points;
                        wePoints = event.payload.maxPoints - theyPoints;
                    }

                    return {
                        ... state,
                        current_hand: {
                            we: wePoints,
                            they: theyPoints,
                            fame: fame
                        }
                    };
                }

                if (event.name === "TeamWentWet") {

                    let wePoints = 0;
                    let theyPoints = 0;

                    let fame = event.payload.fame;

                    if (event.payload.team === "we") {
                        wePoints = 0;
                        theyPoints = event.payload.maxPoints;

                        fame = fame.map((f) => {
                            return { team: "they", fame: f.fame }
                        });
                    } else {
                        theyPoints = 0;
                        wePoints = event.payload.maxPoints;

                        fame = fame.map((f) => {
                            return { team: "we", fame: f.fame }
                        });
                    }

                    return {
                        ... state,
                        currentView: 'overview',
                        hands: [... state.hands, {
                            we: wePoints,
                            they: theyPoints,
                            fame: fame
                        }]
                    };

                }

                if (event.name === "TeamReceivedAPit") {

                    let wePoints = 0;
                    let theyPoints = 0;

                    let fame = event.payload.fame;


                    if (event.payload.team === "we") {
                        wePoints = event.payload.maxPoints;
                        theyPoints = 0;
                        fame.push({
                            team: "we",
                            fame: 100
                        })
                    } else {
                        theyPoints = event.payload.maxPoints;
                        wePoints = 0;
                        fame.push({
                            team: "they",
                            fame: 100
                        })
                    }

                    return {
                        ... state,
                        currentView: 'overview',
                        hands: [... state.hands, {
                            we: wePoints,
                            they: theyPoints,
                            fame: fame
                        }]
                    };
                }

                if (event.name === "HandWasCompleted") {
                    return {
                        ... state,
                        current_hand: undefined,
                        currentView: 'overview',
                        hands: [... state.hands, {
                            we: state.current_hand.we,
                            they: state.current_hand.they,
                            fame: state.current_hand.fame
                        }]
                    };
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

        const states = events.reduce((state, event) => {
            if (event.name === "PlayerAdded") {
                return { ... state, players: [... state.players, {
                    team: event.payload.team,
                    name: event.payload.name,
                }]};
            }

            if (event.name === "GameStarted") {
                return { ... state, gameId: event.payload.gameId };
            }

            if (event.name === "HandWasDealt") {
                return { ... state, currentView: 'bidding' };
            }

            if (event.name === "BidWasPlaced") {
                return {
                    ... state,
                     currentView: 'hand',
                     bid: {
                         team: event.payload.team,
                         bid: event.payload.bid,
                         suit: event.payload.suit
                     }
                };
            }

            if ([
                    "PointsWereCounted",
                    "TeamReceivedAPit",
                    "TeamWentWet"
                ].includes(event.name)) {

                // { we: 1, they: 40, fame: [] },
                console.log(state.hands, [... state.hands, {
                        we: event.payload.we,
                        they: event.payload.they,
                        fame: []
                    }]);

                let wePoints = 0;
                let theyPoints = 0;

                let fame = event.payload.fame;

                switch (event.name) {
                    case "PointsWereCounted":
                        if (event.payload.countedBy === "we") {

                            wePoints = event.payload.points;
                            theyPoints = event.payload.maxPoints - wePoints;
                        } else {
                            theyPoints = event.payload.points;
                            wePoints = event.payload.maxPoints - theyPoints;
                        }
                        break;
                    case "TeamReceivedAPit":
                        if (event.payload.team === "we") {
                            wePoints = event.payload.maxPoints;
                            theyPoints = 0;
                            fame.push({
                                team: "we",
                                fame: 100
                            })
                        } else {
                            theyPoints = event.payload.maxPoints;
                            wePoints = 0;
                            fame.push({
                                team: "they",
                                fame: 100
                            })
                        }
                    break;
                    case "TeamWentWet":
                        if (event.payload.team === "we") {
                            wePoints = 0;
                            theyPoints = event.payload.maxPoints;

                            fame = fame.map((f) => {
                                 return { team: "they", fame: f.fame }
                            });
                        } else {
                            theyPoints = 0;
                            wePoints = event.payload.maxPoints;

                            fame = fame.map((f) => {
                                 return { team: "we", fame: f.fame }
                            });
                        }
                    break;
                }

                return {
                    ... state,
                    currentView: 'overview',
                    hands: [... state.hands, {
                        we: wePoints,
                        they: theyPoints,
                        fame: fame
                    }]
                };
            }

            return state;
        }, initialState);


        return state;
    }

    pushEvent(event)  {
        this.props.pushEvent(event);
    }

    renderCurrentState()
    {
        let that = this;

        {/* Once players have been added, a gameId will be available which we will use */}
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
                    hands={this.state.hands}
                />
            default:
                return <h2>Whoops something went terribly wrong!</h2>
        }
    }

    render() {
        let that = this;

        return (
            <div>
                <h1 className="text-center display-1 my-4">
                    Fjelo!
                    <small className="h2 text-muted my-5">
                        <br/>
                        Francken Jas ELO
                    </small>
                </h1>

                {this.renderCurrentState()}
            </div>
        );
    }
}

class EventSourcedApp extends React.Component{
    constructor()
    {
        super();

        this.state = { events: [] };
    }

    pushEvent(event) {
        this.setState((state) => {
            return {
                events: [... state.events, event]
            }
        });
    }

    render() {
        let that = this;

        console.log(this.state.events);

        return <JasApp
            key={this.state.events.length}
            pushEvent={(event) => that.pushEvent(event)}
            events={that.state.events}
        />;
    }
}

/*

    <PlayHand
    team="they"
    suit={<Club />}
    bid={82}
    players={this.state.players}
        gameId={this.state.gameId}
    />


    <PlayHand
    team="they"
    suit={<Diamond />}
    bid={112}
    players={this.state.players}
        gameId={this.state.gameId}
    />

    <PlayHand
    team="they"
    suit={<Spade />}
    bid={132}
    players={this.state.players}
        gameId={this.state.gameId}
    />

    <PlayHand
    team="they"
    suit={<Sans />}
    bid={112}
    players={this.state.players}
        gameId={this.state.gameId}
    />

    <PlayHand
    team="they"
    suit={<Sans />}
    bid={"pit"}
    players={this.state.players}
        gameId={this.state.gameId}
    />
*/


export default EventSourcedApp;
// export default App;
