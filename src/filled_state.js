export default {
    currentView: 'players',

    // game state (id)
    gameId: 'hoi',

    // player state
    players: [
        {name: "Mark", team: "we", added: false},
        {name: "Arjen", team: "they", added: false},
        {name: "Anna", team: "we", added: false},
        {name: "Su-Elle", team: "they", added: false},
    ],

    // current bid state (only requires gameId)

    // current hand state
    bid: {
        team: 'we',
        suit: 'hearts',
        bid: 100,
    },

    // current count state

    // overview state (all games)
    hands: [
        { we: 1, they: 20, fame: [] },
        { we: 2, they: 20, fame: [] },
        { we: 3, they: 20, fame: [] },
        { we: 4, they: 20, fame: [] },
        { we: 5, they: 20, fame: [] },
        { we: 6, they: 20, fame: [] },
    ]
};
