import React, { Component } from 'react';

export default class AddFameToHand extends Component {
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
        );
    }
}
