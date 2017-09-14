import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddFameToHand extends Component {
    static propTypes = {
        team: PropTypes.string.isRequired,
        fame: PropTypes.number.isRequired,
        addFame: PropTypes.func.isRequired,
    };

    render() {
        let btnStyle = "rounded-0 btn btn-outline-primary btn-block btn-lg my-3";

        return (
            <ul className={"list-unstyled row no-gutters mb-0" + (this.props.team === 'We' ? '' : ' bg-light')}>
                <li className="col-sm-12 col-md-3 d-flex align-items-center">
                    <h4 className="h6">
                        {this.props.team} <small> ({this.props.fame} fame) </small>
                    </h4>
                </li>

		            {[20, 50, 100].map((fame) => {
                	   return <li key={fame} className="col-4 col-md-3 d-flex align-items-center">
		                     <button className={btnStyle} onClick={() => this.props.addFame(fame)}>
					                   + {fame} <span className="d-none d-md-inline">fame</span>
				                 </button>
	                   </li>
		            })}
            </ul>
        );
    }
}
