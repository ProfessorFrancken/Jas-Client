import React, { Component } from 'react';
import AddFameToHand from './AddFameToHand.js';
import FontAwesome from 'react-fontawesome';

export default class FameFromHand extends Component {
    render() {
        let undoFameStyle = "btn btn-link text-dark";

        return (
            <div>
                <h3 className="h5">Add fame</h3>
                <AddFameToHand team="We" fame={this.props.fameByUs} addFame={this.props.addFameToUs} />
                <AddFameToHand team="They" fame={this.props.fameByThem} addFame={this.props.addFameToThem} />

                {! this.props.lastFame ? '' :
                 <div className="row mt-3 text-center">
                     <div className="col">
                         <button className={undoFameStyle} onClick={this.props.undoLastFame}>

                             <FontAwesome name="undo" className="mr-2" />
                             Undo last fame
                         </button>
                     </div>
                     <div className="col">
                         <button className="btn btn-link text-danger" onClick={this.props.resetFame}>
                             <FontAwesome name="refresh" className="mr-2" />
                             Reset all fame to 0
                         </button>
		                 </div>
                 </div>
                }
            </div>
        )
    }
}
