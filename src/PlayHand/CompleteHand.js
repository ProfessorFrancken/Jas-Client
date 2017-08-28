import React, { Component } from 'react';

export default class CompleteHand extends Component {
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
        );
    }
}
