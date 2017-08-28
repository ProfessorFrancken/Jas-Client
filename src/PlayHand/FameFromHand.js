import React, { Component } from 'react';
import AddFameToHand from './AddFameToHand.js';

export default class FameFromHand extends Component {
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
