import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import sweetAlert from 'sweetalert';
const swal = sweetAlert;

class Help extends Component {

    showHelp() {
        swal({
            title: "Help",
            text: `Welcome to the Francken Jas ELO app.`,
            showCancelButton: true,
            cancelButtonText: "Clear current game"
        }, (confirmed) => {
            if (! confirmed) {
                localStorage.clear();
                this.props.clearEvents();
            }
        });
    }

    render() {
        return <button className="btn btn-link" onClick={() => this.showHelp()}>
            <FontAwesome name="question-circle-o" className="text-white" />
        </button>;
    }
}

export default Help;
