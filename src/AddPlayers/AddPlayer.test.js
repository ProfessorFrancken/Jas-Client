import React from 'react';
import ReactDOM from 'react-dom';
import AddPlayer from './AddPlayer';
import { shallow } from 'enzyme';


it('renders without crashing', () => {

    const addPlayer = shallow(
        <AddPlayer
            toggleWrites={() => {}}
            onAddPlayer={() => {}}
            onRemovePlayer={() => {}}
            number={1}
            team="we"
            writes={false}
        />
    );

    addPlayer.find('')


    const div = document.createElement('div');

    ReactDOM.render(
        <AddPlayer
            toggleWrites={() => {}}
            onAddPlayer={() => {}}
            onRemovePlayer={() => {}}
            number={1}
            team="we"
            writes={false}
        />,
        div
    );
});
