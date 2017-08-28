import React, { Component } from 'react';
import Select from 'react-select';
import { Spade, Heart, Diamond, Club, Sans } from '../Suits.js';
import 'react-select/dist/react-select.css';

export default class Bidding extends Component {

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
