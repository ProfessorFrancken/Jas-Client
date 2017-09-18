import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import handlers from './Handlers';
import JasApp from './JasApp.js';

class EventSourcedApp extends Component{
    constructor()
    {
        super();

        const events = JSON.parse(localStorage.getItem('events')) || [];

        this.state = { events };
    }

    clearEvents() {
        this.setState({ events: [] });
    }

    pushEvent(event) {

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                           .toString(16)
                           .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
        }

        const decoratedEvent = {
            ...event,
            id: guid(),
            date: (new Date()).getTime()
        };

        // Save event to server
        axios.post('/store-jas-events', decoratedEvent)
             .then(function (response) {
                 console.log(response);
             })
             .catch(function (error) {
                 console.log(error);
             });

        this.setState((state) => {
            const events = [...state.events, decoratedEvent];
            localStorage.setItem(
                'events',
                JSON.stringify(events)
            );

            return { events }
        });
    }

    render() {
        let that = this;

        return <JasApp
            key={this.state.events.length}
            pushEvent={(event) => that.pushEvent(event)}
            clearEvents={() => that.clearEvents()}
            events={that.state.events}
            handlers={handlers}
        />;
    }
}

export default EventSourcedApp;
