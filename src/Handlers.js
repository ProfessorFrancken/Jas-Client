import sweetAlert from 'sweetalert';
const swal = sweetAlert;

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default [
    (event) => { console.log("From handler: ", event); },

    (event, state, that) => {
        if (event.name !== "TeamWentWet") {
            return;
        }

        let players = state.players
            .filter((player) => player.team === event.payload.team)
            .map((player) => player.name)
            .join(' and ');

        swal(
            "Wet!",
            capitalizeFirstLetter(players) + " went wet!",
            (event.payload.team === state.bid.team) ? "warning" : "success"
        );
    },

    // Card Counter
    (event, state, that) => {

        if (event.name !== "PointsWereCounted") {
            return;
        }

        console.log({event, state});

        const maxPointsInThisGame = (state) => state.bid.suit === "sans" ? 130 : 162;

        const sumFame = (numbers) => numbers.reduce((sum, next) => sum + next.fame, 0);

        const pointsToWin = (event, state) => {
            let bid = state.bid.bid;
            let playingTeam = state.bid.team;

            if (bid === 'pit') {
                return maxPointsInThisGame(state);
            }

            let fameByPlayers = sumFame(event.payload.fame.filter((fame) => fame.team === playingTeam));
            let fameByOthers = sumFame(event.payload.fame.filter((fame) => fame.team !== playingTeam));

            let fameDifference = fameByOthers - fameByPlayers;

            return bid + 0.5 * fameDifference;
        };

        let points = event.payload.points;

        let pointsEarnedByPlayingTeam = event.payload.countedBy === state.bid.team
            ? points
            : maxPointsInThisGame(state) - points;

        // Wet
        if (pointsEarnedByPlayingTeam < pointsToWin(event, state)) {
            that.pushEvent({
                name: "TeamWentWet",
                payload: {
                    gameId: event.payload.gameId,
                    team: event.payload.countedBy,
                    fame: event.payload.fame,
                    maxPoints: event.payload.maxPoints,
                }
            });
        } else {
            that.pushEvent({
                name: "HandWasCompleted",
                payload: {
                    gameId: event.payload.gameId,
                    fame: event.payload.fame,

                    countedBy: event.payload.countedBy,
                    points: event.payload.points,
                    maxPoints: event.payload.maxPoints,
                }
            });
        }
    }

];