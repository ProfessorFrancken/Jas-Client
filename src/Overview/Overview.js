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

    finishGame() {
        this.props.pushEvent({
            name: "GameWasFinished",
            payload: {
                gameId: this.props.gameId,
                hands: this.props.hands,
                players: this.props.players
            }
        });
    }

    dealer() {
        return this.props.players[(this.props.hands.length - 1) % 4].name
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

        let ResultOfHand = (props) => {
            let { idx, handNumber, hand } = props;

            let fameByUs = sumFame(hand.fame.filter((fame) => fame.team === 'we'));
            let fameByThem = sumFame(hand.fame.filter((fame) => fame.team === 'they'));

            let [we, they] = [hand.we, hand.they];
            if (hand.pit) {
                if (we > 0) {
                    we = 'P';
                } else {
                    they = 'P';
                }
            }

            if (hand.wet) {
                if (we === 0) {
                    we = 'N';
                } else {
                    they = 'N';
                }
            }

            return <tr key={idx}>
                <td>{handNumber}</td>
                <td>{we}</td>
                <td>{fameByUs}</td>
                <td>{they}</td>
                <td>{fameByThem}</td>
            </tr>
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
                ...hands.reverse().map(
                    (hand, idx) => <ResultOfHand idx={idx} handNumber={branchNumber * 4 + hands.length - idx } hand={hand} />
                )
            );

            return body;
                        })].reverse();


        let PlayNewHand = () => {
            return <button className="btn btn-lg btn-block btn-primary rounded-0" onClick={() => this.dealHand()}>
                Deal a new hand
            </button>;
        }

        let FinishGame = () => {
            return <button className="btn btn-lg btn-block btn-warning rounded-0" onClick={() => this.finishGame()}>
                You've finished this game, click here to start a new game
            </button>
        }

        return (
            <div className="card my-4">

                {this.props.hands.length >= 16 ? <FinishGame /> : <PlayNewHand />}

                <div className="row no-gutters d-flex justify-content-around align-items-center">
                    {this.props.players.map((player, idx) => {
                         let isDealer = player.name === this.dealer();
                         let dealerStyle = "bg-dark text-white";
                         let playerStyle = "";

                         return <div className="col">
                             <div className={"text-center p-4 " + (isDealer ? dealerStyle : playerStyle)}>
                                 {idx + 1}. {player.name} {isDealer ? <span><br />(Dealer)</span> : ""}
                             </div>
                         </div>
                    })}
                </div>

                <table className="table table-striped mb-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan="2">{this.players('we').join(' and ')}</th>
                            <th colSpan="2">{this.players('they').join(' and ')}</th>
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
        )
    }
};
