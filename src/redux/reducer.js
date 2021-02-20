import {LIGHT, ORIGINAL} from '../constants/constants';

import {
    ADD_BIDS,
    RESET,
    RESTART,
    SET_COLOR,
    SET_IS_BIDS,
    SET_PLAYER_FOUR_ACTUAL,
    SET_PLAYER_FOUR_BID,
    SET_PLAYER_FOUR_NAME,
    SET_PLAYER_ONE_ACTUAL,
    SET_PLAYER_ONE_BID,
    SET_PLAYER_ONE_NAME,
    SET_PLAYER_THREE_ACTUAL,
    SET_PLAYER_THREE_BID,
    SET_PLAYER_THREE_NAME,
    SET_PLAYER_TWO_ACTUAL,
    SET_PLAYER_TWO_BID,
    SET_PLAYER_TWO_NAME,
    SET_ROUNDS,
    SET_TEAM_ONE_BAGS,
    SET_TEAM_ONE_SCORE,
    SET_TEAM_TWO_BAGS,
    SET_TEAM_TWO_SCORE,
    SET_THEME,
    TOGGLE_SHOW_HISTORY,
    TOGGLE_SHOW_INFO_MODAL,
    TOGGLE_SHOW_SETTINGS_MODAL,
    UNDO_ACTUAL,
    UNDO_BIDS
} from './action-types';

const defaultState = {
    currRound: {
        player1Bid: '',
        player2Bid: '',
        player3Bid: '',
        player4Bid: '',
        team1Total: '',
        team2Total: ''
    },
    isBids: true,
    rounds: [],
    shouldShowHistory: false,
    showInfoModal: false,
    showSettingsModal: false,
    team1: {
        bags: 0,
        firstPlayer: 'Player 1',
        score: 0,
        secondPlayer: 'Player 2'
    },
    team2: {
        bags: 0,
        firstPlayer: 'Player 3',
        score: 0,
        secondPlayer: 'Player 4'
    },
    theme: {
        background: LIGHT,
        color: ORIGINAL
    }
};

const setIsBids = (state, isBids) => ({
    ...state,
    isBids
});

const setRounds = (state, rounds) => ({
    ...state,
    rounds
});

const addBids = (state, bids) => ({
    ...state,
    rounds: [{
        playerFour: {
            bid: Number(bids.player4Bid)
        },
        playerOne: {
            bid: Number(bids.player1Bid)
        },
        playerThree: {
            bid: Number(bids.player3Bid)
        },
        playerTwo: {
            bid: Number(bids.player2Bid)
        },
        team1Bids: Number(bids.team1Total),
        team2Bids: Number(bids.team2Total)
    }, ...state.rounds]
});

const reset = (state) => ({
    ...state,
    currRound: {
        player1Bid: '',
        player2Bid: '',
        player3Bid: '',
        player4Bid: ''
    }
});

const setPlayerOneName = (state, firstPlayer) => ({
    ...state,
    team1: {
        ...state.team1,
        firstPlayer
    }
});

const setPlayerTwoName = (state, secondPlayer) => ({
    ...state,
    team1: {
        ...state.team1,
        secondPlayer
    }
});

const setPlayerThreeName = (state, firstPlayer) => ({
    ...state,
    team2: {
        ...state.team2,
        firstPlayer
    }
});

const setPlayerFourName = (state, secondPlayer) => ({
    ...state,
    team2: {
        ...state.team2,
        secondPlayer
    }
});

const setPlayerOneBid = (state, player1Bid) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player1Bid
    }
});

const setPlayerTwoBid = (state, player2Bid) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player2Bid
    }
});

const setPlayerThreeBid = (state, player3Bid) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player3Bid
    }
});

const setPlayerFourBid = (state, player4Bid) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player4Bid
    }
});

const setPlayerOneActual = (state, player1Actual) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player1Actual
    }
});

const setPlayerTwoActual = (state, player2Actual) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player2Actual
    }
});

const setPlayerThreeActual = (state, player3Actual) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player3Actual
    }
});

const setPlayerFourActual = (state, player4Actual) => ({
    ...state,
    currRound: {
        ...state.currRound,
        player4Actual
    }
});

const setTeamOneScore = (state, score) => ({
    ...state,
    team1: {
        ...state.team1,
        score
    }
});

const setTeamTwoScore = (state, score) => ({
    ...state,
    team2: {
        ...state.team2,
        score
    }
});

const setTeamOneBags = (state, bags) => ({
    ...state,
    team1: {
        ...state.team1,
        bags
    }
});

const setTeamTwoBags = (state, bags) => ({
    ...state,
    team2: {
        ...state.team2,
        bags
    }
});

const undoBids = (state) => ({
    ...state,
    currRound: {
        player1Bid: state.rounds[0].playerOne.bid,
        player2Bid: state.rounds[0].playerTwo.bid,
        player3Bid: state.rounds[0].playerThree.bid,
        player4Bid: state.rounds[0].playerFour.bid
    },
    rounds: [...state.rounds.slice(1)]
});

const undoActual = (state) => ({
    ...state,
    currRound: {
        player1Bid: state.rounds[0].playerOne.actual,
        player2Bid: state.rounds[0].playerTwo.actual,
        player3Bid: state.rounds[0].playerThree.actual,
        player4Bid: state.rounds[0].playerFour.actual
    },
    rounds: [{
        ...state.rounds[0],
        playerFour: {
            ...state.rounds[0].playerFour,
            actual: null
        },
        playerOne: {
            ...state.rounds[0].playerOne,
            actual: null
        },
        playerThree: {
            ...state.rounds[0].playerThree,
            actual: null
        },
        playerTwo: {
            ...state.rounds[0].playerTwo,
            actual: null
        },
        team1Actual: null,
        team2Actual: null
    }, ...state.rounds.slice(1)]
});

const toggleShouldShowHistory = (state) => ({
    ...state,
    shouldShowHistory: !state.shouldShowHistory
});

const toggleShowInfoModal = (state) => ({
    ...state,
    showInfoModal: !state.showInfoModal
});

const toggleShowSettingsModal = (state) => ({
    ...state,
    showSettingsModal: !state.showSettingsModal
});

const setTheme = (state, background) => ({
    ...state,
    theme: {
        background,
        color: state.theme.color
    }
});

const setColor = (state, color) => ({
    ...state,
    theme: {
        background: state.theme.background,
        color
    }
});

const restart = (state) => ({
    ...defaultState,
    team1: {
        ...defaultState.team1,
        firstPlayer: state.team1.firstPlayer,
        secondPlayer: state.team1.secondPlayer
    },
    team2: {
        ...defaultState.team2,
        firstPlayer: state.team2.firstPlayer,
        secondPlayer: state.team2.secondPlayer
    },
    theme: state.theme
});

const reducerMap = {
    [ADD_BIDS]: addBids,
    [RESET]: reset,
    [RESTART]: restart,
    [SET_COLOR]: setColor,
    [SET_IS_BIDS]: setIsBids,
    [SET_PLAYER_FOUR_ACTUAL]: setPlayerFourActual,
    [SET_PLAYER_FOUR_BID]: setPlayerFourBid,
    [SET_PLAYER_FOUR_NAME]: setPlayerFourName,
    [SET_PLAYER_ONE_ACTUAL]: setPlayerOneActual,
    [SET_PLAYER_ONE_BID]: setPlayerOneBid,
    [SET_PLAYER_ONE_NAME]: setPlayerOneName,
    [SET_PLAYER_THREE_ACTUAL]: setPlayerThreeActual,
    [SET_PLAYER_THREE_BID]: setPlayerThreeBid,
    [SET_PLAYER_THREE_NAME]: setPlayerThreeName,
    [SET_PLAYER_TWO_ACTUAL]: setPlayerTwoActual,
    [SET_PLAYER_TWO_BID]: setPlayerTwoBid,
    [SET_PLAYER_TWO_NAME]: setPlayerTwoName,
    [SET_ROUNDS]: setRounds,
    [SET_TEAM_ONE_BAGS]: setTeamOneBags,
    [SET_TEAM_ONE_SCORE]: setTeamOneScore,
    [SET_TEAM_TWO_BAGS]: setTeamTwoBags,
    [SET_TEAM_TWO_SCORE]: setTeamTwoScore,
    [SET_THEME]: setTheme,
    [TOGGLE_SHOW_HISTORY]: toggleShouldShowHistory,
    [TOGGLE_SHOW_INFO_MODAL]: toggleShowInfoModal,
    [TOGGLE_SHOW_SETTINGS_MODAL]: toggleShowSettingsModal,
    [UNDO_ACTUAL]: undoActual,
    [UNDO_BIDS]: undoBids
};

export default (state = defaultState, {type, data}) => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
