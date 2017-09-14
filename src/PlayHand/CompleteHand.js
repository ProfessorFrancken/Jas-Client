import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class CompleteHand extends Component {
    render() {
        let btnStyleSuccess = "btn btn-outline-success btn-block btn-lg my-3";
        let btnStylePit = "btn btn-link text-danger btn-block btn-lg my-3";
        let btnStyleWet = "btn btn-link text-warning btn-block btn-lg my-3";

        return (
            <ul className="list-unstyled row mb-0">
                <li className="col-sm-12 col-md-3 d-flex align-items-center">
                    <h4 className="h6">
                        {this.props.title}
                    </h4>
                </li>

                {/* Unless a the bid was pid, since counting */}
                <li className="col-4 col-md-3 d-flex align-items-center">
                    <button className={btnStyleSuccess} onClick={this.props.countPoints}>
                        <FontAwesome name="hand-spock-o" className="mr-2" />
                        Count
                    </button>
                </li>

                { // If the other team earned fame then they won at least one round, so
                  // no pit can be earned
                    ! this.props.enablePit ? '' :
                    <li className="col-4 col-md-3 d-flex align-items-center">
                        <button className={btnStylePit} onClick={this.props.confirmPit}>
                            <FontAwesome name="hand-stop-o" className="mr-2" />
                            {this.props.isPlaying ? 'Pit' : 'Anti pit'}
                        </button>
                    </li>
                }

                {
                    ! this.props.isPlaying ? '' :
                    <li className="col-4 col-md-3 d-flex align-items-center">
                        <button className={btnStyleWet} onClick={this.props.confirmWet}>
                            <FontAwesome name="tint" className="mr-2" />
                            Wet
                        </button>
                    </li>
                }
            </ul>
        );
    }
}
