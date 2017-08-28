import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddPlayer extends Component {
    constructor(props) {
        super();

        this.state = {
            name: "",
            completed: false,
        }

        this.changeName = this.changeName.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.toggleWrites = props.toggleWrites;
    }

    changeName(event) {

        this.props.toggleWrites();
        this.setState({
            name: event.target.value
        });
    }

    addPlayer() {
        if (this.state.name === '') {
            return;
        }

        if (this.state.completed) {
            this.props.onRemovePlayer(
                this.props.number,
            )
        } else {
            this.props.onAddPlayer(
                this.props.number,
                this.props.team,
                this.state.name
            )
        }

        this.setState({
            completed: ! this.state.completed
        });
    }

    render() {
        let disableAddPlayerBtn = this.state.name === '';

        return (
            <li className={"list-group-item " + (this.props.team === "we" ? "list-group-item-success" : "list-group-item-info")}>
                <div className="row">
                    <div className="col-md-2 d-flex align-items-center">
                        #{this.props.number} : {this.props.team === "we" ? "We" : "They"}
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.changeName}
                            readOnly={this.state.completed}
                            placeholder="Enter player's name"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-around">
                        <div className={"form-check form-check-inline " + this.state.completed ? "disabled" : ""}>
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    value="writes"
                                    checked={this.props.writes}
                                    onChange={this.toggleWrites}
                                    className="form-check-input"
                                    disabled={this.state.completed}
                                />
                                Writes
                            </label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button
                            className={this.state.completed ? 'btn btn-block btn-outline-danger' : 'btn btn-block btn-outline-primary'}
                            onClick={this.addPlayer}
                            disabled={disableAddPlayerBtn}
                        >
                            {this.state.completed ? 'Change player' : 'Add Player'}
                        </button>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                        <small className="text-muted d-none">
                            Fjelo: #123
                        </small>
                    </div>
                </div>
            </li>
        )
    }
}

AddPlayer.propTypes = {
    toggleWrites: PropTypes.func.isRequired,
    onAddPlayer: PropTypes.func.isRequired,
    onRemovePlayer: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    team: PropTypes.oneOf(['we', 'they']).isRequired,
    writes: PropTypes.bool.isRequired,
}
