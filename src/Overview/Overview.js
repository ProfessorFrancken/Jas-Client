import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

let Fame = (props) => {
    let { fame } = props;

    let tally = fame.sort((fame) => fame.fame).map((fame) => {
        if (fame.fame === 20) {
            return 'Ⅰ';
        }
        if (fame.fame === 50) {
            return 'Ⅴ';
        }
        if (fame.fame === 100) {
            return 'Ⅹ';
        }

        return fame.fame;
    }).join('');

    return <span >{tally}</span>;
}

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
        return this.props.dealer
    }

    players(team) {
        return this.props.players
        .filter((player) => player.team === team)
        .map((player) => player.name);
    }

    render() {
        let ResultOfHand = (props) => {
            let { hand } = props;

            let fameByUs = hand.fame.filter((fame) => fame.team === 'we');
            let fameByThem = hand.fame.filter((fame) => fame.team === 'they');

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

            return <tr key={hand.number}>
                <td>{hand.number}</td>
                <td>{we}</td>
                <td><Fame fame={fameByUs} /></td>
                <td>{they}</td>
                <td><Fame fame={fameByThem} /></td>
            </tr>
        };

        let ResultOfBranch = (props) => {
            let { branch } = props;

            return (
                <tr className="bg-dark text-white">
                    <td>
                        <strong>
                            Branch {branch.number}
                        </strong>
                    </td>
                    <td>{branch.we}</td>
                    <td>{branch.we_fame}</td>
                    <td>{branch.they}</td>
                    <td>{branch.they_fame}</td>
                </tr>
            );
        }

        let PlayNewHand = () => {
            return <button className="btn btn-lg btn-block btn-primary rounded-0" onClick={() => this.dealHand()}>
                Deal a new hand
            </button>;
        }

        let FinishGame = () => {
            return (
                <div>
                    <p className="card-body text-center">
                        You've finished this game
                    </p>
                    <button className="btn btn-lg btn-block btn-warning rounded-0" onClick={() => this.finishGame()}>
                        Play a new game
                    </button>
                </div>
            )
        }

        let currentBranch = this.props.branches[this.props.branches.length - 1];

        return (
            <div className="card my-4">

                {(this.props.branches.length === 4 && currentBranch.hands.length === 4) ? <FinishGame /> : <PlayNewHand />}

                <div className="row no-gutters d-flex justify-content-around align-items-center">
                    {this.props.players.map((player, idx) => {
                         let isDealer = player.name === this.dealer();
                         let dealerStyle = "bg-dark text-white";
                         let playerStyle = "";

                         return <div className="col-6 col-sm-3" key={idx}>
                             <div className={"text-center p-4 " + (isDealer ? dealerStyle : playerStyle)}>
                                 {isDealer ? <FontAwesome name="user-circle" className="mr-2" /> : ""}
                                 {idx + 1}.
                                 {player.name}
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
                        {this.props.branches.reverse().map((branch, idx) => {
                             let body = branch.hands.reverse()
                                              .map((hand, idx) => <ResultOfHand hand={hand} />);

                             // Whenever a branch is completed, show its statistics
                             if (branch.hands.length === 4) {
                                 body.unshift(
                                     <ResultOfBranch branch={branch} />
                                 );
                             }
                             return [...body]
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
};
