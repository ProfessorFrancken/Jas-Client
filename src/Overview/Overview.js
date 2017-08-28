import React, { Component } from 'react';

const sumFame = (numbers) => numbers.reduce((sum, next) => sum + next.fame, 0);

export default class Overview extends Component {

    dealHand() {
        this.props.pushEvent({
            name: "HandWasDealt",
            payload: {
                gameId: this.props.gameId,
                dealer: this.dealer()
            }
        });
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

            body.push(
                ...hands.reverse().map((hand, idx) => {
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
