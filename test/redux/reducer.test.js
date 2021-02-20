import Chance from 'chance';

import reducer from '../../src/redux/reducer';
import {LIGHT, ORIGINAL} from '../../src/constants/constants';
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
} from '../../src/redux/action-types';
import {createRandomProps, createRandomRound} from '../model-factory';

const chance = new Chance();

describe('reducer', () => {
    const defaultState = {
        currRound: {
            player1Bid: 0,
            player2Bid: 0,
            player3Bid: 0,
            player4Bid: 0,
            team1Total: 0,
            team2Total: 0
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

    let anyAction;

    beforeEach(() => {
        anyAction = chance.string();
    });

    it('should return state if an action fails to match', () => {
        const expectedState = chance.string();

        const actualState = reducer(expectedState, anyAction);

        expect(actualState).toBe(expectedState);
    });

    it('should return the default state if not called with state', () => {
        const actualState = reducer(undefined, anyAction);

        expect(actualState).toEqual(defaultState);
    });

    it('should restart when the action is RESTART', () => {
        const originalState = createRandomProps();

        const action = {
            type: RESTART
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...defaultState,
            team1: {
                ...defaultState.team1,
                firstPlayer: originalState.team1.firstPlayer,
                secondPlayer: originalState.team1.secondPlayer
            },
            team2: {
                ...defaultState.team2,
                firstPlayer: originalState.team2.firstPlayer,
                secondPlayer: originalState.team2.secondPlayer
            },
            theme: originalState.theme
        });
    });

    it('should set isBids when the action is SET_IS_BIDS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            isBids: chance.string()
        };

        const isBids = chance.string();
        const action = {
            data: isBids,
            type: SET_IS_BIDS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            isBids
        });
    });

    it('should set rounds when the action is SET_ROUNDS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            rounds: chance.string()
        };

        const rounds = chance.string();
        const action = {
            data: rounds,
            type: SET_ROUNDS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            rounds
        });
    });

    it('should add bids when the action is ADD_BIDS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            rounds: chance.n(createRandomRound, chance.d6())
        };

        const bids = createRandomRound();
        const action = {
            data: bids,
            type: ADD_BIDS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
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
            }, ...originalState.rounds]
        });
    });

    it('should reset the current round when the action is RESET', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: createRandomRound()
        };

        const action = {
            type: RESET
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                player1Bid: 0,
                player2Bid: 0,
                player3Bid: 0,
                player4Bid: 0
            }
        });
    });

    it('should set firstPlayer when the action is SET_PLAYER_ONE_NAME', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team1: {
                [chance.string()]: chance.string()
            }
        };

        const firstPlayer = chance.string();
        const action = {
            data: firstPlayer,
            type: SET_PLAYER_ONE_NAME
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team1: {
                ...originalState.team1,
                firstPlayer
            }
        });
    });

    it('should set secondPlayer when the action is SET_PLAYER_TWO_NAME', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team1: {
                [chance.string()]: chance.string()
            }
        };

        const secondPlayer = chance.string();
        const action = {
            data: secondPlayer,
            type: SET_PLAYER_TWO_NAME
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team1: {
                ...originalState.team1,
                secondPlayer
            }
        });
    });

    it('should set thirdPlayer when the action is SET_PLAYER_THREE_NAME', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team2: {
                [chance.string()]: chance.string()
            }
        };

        const thirdPlayer = chance.string();
        const action = {
            data: thirdPlayer,
            type: SET_PLAYER_THREE_NAME
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team2: {
                ...originalState.team2,
                firstPlayer: thirdPlayer
            }
        });
    });

    it('should set fourthPlayer when the action is SET_PLAYER_FOUR_NAME', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team2: {
                [chance.string()]: chance.string()
            }
        };

        const fourthPlayer = chance.string();
        const action = {
            data: fourthPlayer,
            type: SET_PLAYER_FOUR_NAME
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team2: {
                ...originalState.team2,
                secondPlayer: fourthPlayer
            }
        });
    });

    it('should set player1Bid when the action is SET_PLAYER_ONE_BID', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player1Bid = chance.string();
        const action = {
            data: player1Bid,
            type: SET_PLAYER_ONE_BID
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player1Bid
            }
        });
    });

    it('should set player2Bid when the action is SET_PLAYER_TWO_BID', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player2Bid = chance.string();
        const action = {
            data: player2Bid,
            type: SET_PLAYER_TWO_BID
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player2Bid
            }
        });
    });

    it('should set player3Bid when the action is SET_PLAYER_THREE_BID', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player3Bid = chance.string();
        const action = {
            data: player3Bid,
            type: SET_PLAYER_THREE_BID
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player3Bid
            }
        });
    });

    it('should set player4Bid when the action is SET_PLAYER_FOUR_BID', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player4Bid = chance.string();
        const action = {
            data: player4Bid,
            type: SET_PLAYER_FOUR_BID
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player4Bid
            }
        });
    });

    it('should set player1Actual when the action is SET_PLAYER_ONE_ACTUAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player1Actual = chance.string();
        const action = {
            data: player1Actual,
            type: SET_PLAYER_ONE_ACTUAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player1Actual
            }
        });
    });

    it('should set player2Actual when the action is SET_PLAYER_TWO_ACTUAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player2Actual = chance.string();
        const action = {
            data: player2Actual,
            type: SET_PLAYER_TWO_ACTUAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player2Actual
            }
        });
    });

    it('should set player3Actual when the action is SET_PLAYER_THREE_ACTUAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player3Actual = chance.string();
        const action = {
            data: player3Actual,
            type: SET_PLAYER_THREE_ACTUAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player3Actual
            }
        });
    });

    it('should set player4Actual when the action is SET_PLAYER_FOUR_ACTUAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: {
                [chance.string()]: chance.string()
            }
        };

        const player4Actual = chance.string();
        const action = {
            data: player4Actual,
            type: SET_PLAYER_FOUR_ACTUAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                ...originalState.currRound,
                player4Actual
            }
        });
    });

    it('should set team1Score when the action is SET_TEAM_ONE_SCORE', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team1: {
                [chance.string()]: chance.string()
            }
        };

        const team1Score = chance.string();
        const action = {
            data: team1Score,
            type: SET_TEAM_ONE_SCORE
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team1: {
                ...originalState.team1,
                score: team1Score
            }
        });
    });

    it('should set team2Score when the action is SET_TEAM_TWO_SCORE', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team2: {
                [chance.string()]: chance.string()
            }
        };

        const team2Score = chance.string();
        const action = {
            data: team2Score,
            type: SET_TEAM_TWO_SCORE
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team2: {
                ...originalState.team2,
                score: team2Score
            }
        });
    });

    it('should set team1Bags when the action is SET_TEAM_ONE_BAGS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team1: {
                [chance.string()]: chance.string()
            }
        };

        const team1Bags = chance.string();
        const action = {
            data: team1Bags,
            type: SET_TEAM_ONE_BAGS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team1: {
                ...originalState.team1,
                bags: team1Bags
            }
        });
    });

    it('should set team2Bags when the action is SET_TEAM_TWO_BAGS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            team2: {
                [chance.string()]: chance.string()
            }
        };

        const team2Bags = chance.string();
        const action = {
            data: team2Bags,
            type: SET_TEAM_TWO_BAGS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            team2: {
                ...originalState.team2,
                bags: team2Bags
            }
        });
    });

    it('should undo bids when the action is UNDO_BIDS', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: createRandomRound(),
            rounds: chance.n(createRandomRound, chance.d6() + 1)
        };

        const action = {
            type: UNDO_BIDS
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                player1Bid: originalState.rounds[0].playerOne.bid,
                player2Bid: originalState.rounds[0].playerTwo.bid,
                player3Bid: originalState.rounds[0].playerThree.bid,
                player4Bid: originalState.rounds[0].playerFour.bid
            },
            rounds: [...originalState.rounds.slice(1)]
        });
    });

    it('should undo actual when the action is UNDO_ACTUAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            currRound: createRandomRound(),
            rounds: chance.n(createRandomRound, chance.d6() + 1)
        };

        const action = {
            type: UNDO_ACTUAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            currRound: {
                player1Bid: originalState.rounds[0].playerOne.actual,
                player2Bid: originalState.rounds[0].playerTwo.actual,
                player3Bid: originalState.rounds[0].playerThree.actual,
                player4Bid: originalState.rounds[0].playerFour.actual
            },
            rounds: [{
                ...originalState.rounds[0],
                playerFour: {
                    ...originalState.rounds[0].playerFour,
                    actual: null
                },
                playerOne: {
                    ...originalState.rounds[0].playerOne,
                    actual: null
                },
                playerThree: {
                    ...originalState.rounds[0].playerThree,
                    actual: null
                },
                playerTwo: {
                    ...originalState.rounds[0].playerTwo,
                    actual: null
                },
                team1Actual: null,
                team2Actual: null
            }, ...originalState.rounds.slice(1)]
        });
    });

    it('should toggle shouldShowHistory when the action is TOGGLE_SHOW_HISTORY', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            shouldShowHistory: chance.bool()
        };

        const action = {
            type: TOGGLE_SHOW_HISTORY
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            shouldShowHistory: !originalState.shouldShowHistory
        });
    });

    it('should toggle showInfoModal when the action is TOGGLE_SHOW_INFO_MODAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            showInfoModal: chance.bool()
        };

        const action = {
            type: TOGGLE_SHOW_INFO_MODAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            showInfoModal: !originalState.showInfoModal
        });
    });

    it('should toggle showSettingsModal when the action is TOGGLE_SHOW_SETTINGS_MODAL', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            showSettingsModal: chance.bool()
        };

        const action = {
            type: TOGGLE_SHOW_SETTINGS_MODAL
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            showSettingsModal: !originalState.showSettingsModal
        });
    });

    it('should toggle background when the action is SET_THEME', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            theme: {
                background: chance.string(),
                color: chance.string()
            }
        };

        const background = chance.string();
        const action = {
            data: background,
            type: SET_THEME
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            theme: {
                background,
                color: originalState.theme.color
            }
        });
    });

    it('should toggle color when the action is SET_COLOR', () => {
        const originalState = {
            [chance.string()]: chance.string(),
            theme: {
                background: chance.string(),
                color: chance.string()
            }
        };

        const color = chance.string();
        const action = {
            data: color,
            type: SET_COLOR
        };

        const actualState = reducer(originalState, action);

        expect(actualState).toEqual({
            ...originalState,
            theme: {
                background: originalState.theme.background,
                color
            }
        });
    });
});
