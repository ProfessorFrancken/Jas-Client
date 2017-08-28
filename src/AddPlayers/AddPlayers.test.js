import React from 'react';
import ReactDOM from 'react-dom';
import AddPlayers from './AddPlayers';
import AddPlayer from './AddPlayer';
import { shallow } from 'enzyme';


it('renders without crashing', () => {
    const addPlayers = shallow(
        <AddPlayers pushEvent={() => {}} />
    );
});

it('has the option to add 4 players', () => {
    const addPlayers = shallow(
            <AddPlayers pushEvent={() => {}} />
    );

    expect(addPlayers.find(AddPlayer).length).toBe(4);
});
