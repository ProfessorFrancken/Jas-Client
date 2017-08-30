import React, { Component } from 'react';
import { Spade, Heart, Diamond, Club, Sans } from '../Suits.js';

export default class Bidding extends Component {

    constructor(props) {
        super();

        this.selectSuit = this.selectSuit.bind(this);
        this.submitBid = this.submitBid.bind(this);
        this.state = {
            suit: "spades",
            bid: 80,
            team: "we",
        };
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

    suits() {
        return [
            { value: 'spades', label: <span><Spade />{'Spades'}</span> },
            { value: 'hearts', label: <span><Heart />{'Hearts'}</span> },
            { value: 'diamonds', label: <span><Diamond />{'Diamonds'}</span> },
            { value: 'clubs', label: <span><Club />{'Clubs'}</span> },
            { value: 'sans', label: <Sans /> },
        ]
    }

    render() {
        let that = this;

        let ChooseTeam = () => {
            return <div className="my-3">
                <div className="card-body">
                    <div className="card-title">
                        <h3>Who's playing?</h3>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <button
                            type="button"
                            className={"rounded-0 btn btn-lg btn-block " + (this.state.team === "we" ? "btn-primary" : "btn-outline-primary")}
                            onClick={ () => that.selectTeam('we') }
                        >
                            We ({this.players('we').join(' and ')})
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            type="button"
                            className={"rounded-0 btn btn-lg btn-block " + (this.state.team === "they" ? "btn-primary" : "btn-outline-primary")}
                            onClick={ () => that.selectTeam('they') }
                        >
                            They ({this.players('they').join(' and ')})
                        </button>
                    </div>
                </div>
            </div>
        };

        let ChooseSuit = () => {
            return <div className="my-3">
                <div className="card-body">
                    <div className="card-title">
                        <h3>Choose a suit</h3>
                    </div>
                </div>
                <div className="row no-gutters">
                    {this.suits().map((suit) => {
                         return <div className="col">
                             <button
                                 className={"rounded-0 btn btn-block btn-lg " + (this.state.suit === suit.value ? "btn-primary" : "btn-outline-primary")}
                                 onClick={() => that.selectSuit({ value: suit.value })}
                             >
                                 { suit.label }
                             </button>
                         </div>
                    })}
                </div>
            </div>
        };

        let ChooseBid = () => {
            return <div className="my-3">
                <div className="card-body">
                    <div className="card-title">
                        <h3>Choose a bid</h3>
                    </div>
                </div>
                <div className="row no-gutters">
                    {this.possibleBids().map((bid) => {
                         return (
                             <div className="col-6 col-sm-4 col-md-3">
                                 <button
                                     className={"rounded-0 btn btn-lg btn-block " + (this.state.bid === bid ? "btn-primary" :  "btn-outline-primary")}
                                     onClick={() => that.selectBid(bid)}
                                 >
                                     {bid}
                                 </button>
                             </div>
                         );
                    })}
                </div>
            </div>
        };

        return (
            <div className="card my-4">
                <div className="card-header">
                    <h2>
                        Submit a new bid
                    </h2>
                </div>

                <ChooseSuit />
                <ChooseBid />
                <ChooseTeam />

                <button className="rounded-0 btn btn-lg btn-block btn-outline-success" onClick={that.submitBid}>
                    Submit bid
                </button>
            </div>
        )
    }
};
