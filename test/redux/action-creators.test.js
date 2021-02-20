import Chance from 'chance';
import {Alert} from 'react-native';

import {createRandomProps, createRandomRound} from '../model-factory';
import {
    addCurrRoundResults,
    calculateScore,
    getTeamTotalBids,
    setBidsActionEnum, setNameActionsEnum
} from '../../src/services/score-service';
import {
    calculateTeamScore,
    restart, setColor,
    setName, setTheme,
    submit,
    submitValue,
    toggleShowHistory, toggleShowInfoModal, toggleShowSettingsModal,
    undo
} from '../../src/redux/action-creators';
import {
    ADD_BIDS,
    RESET,
    RESTART, SET_COLOR,
    SET_IS_BIDS,
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
import {TEAM_ONE, TEAM_TWO} from '../../src/constants/constants';
import {bidsAddUpTo13} from '../../src/constants/score-helpers';
import {logAnalyticsEvent} from '../../src/services/analytics-service';
import {BIDS_SUBMITTED} from '../../src/constants/events';

jest.mock('../../src/services/score-service');
jest.mock('../../src/constants/score-helpers');
jest.mock('../../src/services/analytics-service');

const chance = new Chance();

describe('action-creators', () => {
    let dispatchSpy,
        expectedState,
        getStateStub;

    beforeEach(() => {
        expectedState = createRandomProps();
        dispatchSpy = jest.fn();
        getStateStub = jest.fn(() => expectedState);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('calculateTeamScore', () => {
        let expectedRounds,
            expectedBags1,
            expectedBags2,
            expectedScore1,
            expectedScore2;

        beforeEach(() => {
            expectedRounds = chance.string();
            expectedBags1 = chance.natural();
            expectedBags2 = chance.natural();
            expectedScore1 = chance.natural();
            expectedScore2 = chance.natural();

            calculateScore.mockReturnValue({
                bags1: expectedBags1,
                bags2: expectedBags2,
                score1: expectedScore1,
                score2: expectedScore2
            });

            calculateTeamScore(expectedRounds)(dispatchSpy);
        });

        it('should call calculateScore', () => {
            expect(calculateScore).toHaveBeenCalledTimes(1);
            expect(calculateScore).toHaveBeenCalledWith(expectedRounds);
        });

        it('should dispatch the results', () => {
            expect(dispatchSpy).toHaveBeenCalledTimes(4);
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedScore1,
                type: SET_TEAM_ONE_SCORE
            });
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedScore2,
                type: SET_TEAM_TWO_SCORE
            });
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedBags1,
                type: SET_TEAM_ONE_BAGS
            });
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedBags2,
                type: SET_TEAM_TWO_BAGS
            });
        });
    });

    describe('submit', () => {
        let expectedTeamTotal;

        beforeEach(() => {
            expectedTeamTotal = chance.natural();

            getTeamTotalBids.mockReturnValue(expectedTeamTotal);
        });

        describe('when it isBids', () => {
            beforeEach(() => {
                expectedState.isBids = true;
                getStateStub = jest.fn(() => expectedState);

                submit()(dispatchSpy, getStateStub);
            });

            it('should log an analyticsEvent', () => {
                expect(logAnalyticsEvent).toHaveBeenCalledTimes(1);
                expect(logAnalyticsEvent).toHaveBeenCalledWith(BIDS_SUBMITTED);
            });

            it('should dispatch 3 actions', () => {
                expect(dispatchSpy).toHaveBeenCalledTimes(3);
            });

            it('should dispatch the current round with totals', () => {
                expect(getTeamTotalBids).toHaveBeenCalledTimes(2);
                expect(getTeamTotalBids).toHaveBeenCalledWith(expectedState.currRound, TEAM_ONE);
                expect(getTeamTotalBids).toHaveBeenCalledWith(expectedState.currRound, TEAM_TWO);
                expect(dispatchSpy).toHaveBeenCalledWith({
                    data: {
                        ...expectedState.currRound,
                        team1Total: expectedTeamTotal,
                        team2Total: expectedTeamTotal
                    },
                    type: ADD_BIDS
                });
            });

            it('should reset', () => {
                expect(dispatchSpy).toHaveBeenCalledWith({
                    type: RESET
                });
            });

            it('should set isBids to false', () => {
                expect(dispatchSpy).toHaveBeenCalledWith({
                    data: false,
                    type: SET_IS_BIDS
                });
            });
        });

        describe('when it is not bids', () => {
            beforeEach(() => {
                expectedState.isBids = false;
                getStateStub = jest.fn(() => expectedState);
            });

            it('should call bidsAddUpTo13', () => {
                submit()(dispatchSpy, getStateStub);

                expect(bidsAddUpTo13).toHaveBeenCalledTimes(1);
                expect(bidsAddUpTo13).toHaveBeenCalledWith(expectedState.currRound);
            });

            describe('when the bids do add up to 13', () => {
                let expectedUpdatedRounds,
                    expectedScore;

                beforeEach(() => {
                    expectedUpdatedRounds = chance.n(createRandomRound, chance.d6());
                    expectedScore = chance.natural();

                    addCurrRoundResults.mockReturnValue(expectedUpdatedRounds);
                    calculateScore.mockReturnValue(expectedScore);
                    bidsAddUpTo13.mockReturnValue(true);

                    submit()(dispatchSpy, getStateStub);
                });

                it('should get the updatedRounds and score from the service', () => {
                    expect(addCurrRoundResults).toHaveBeenCalledTimes(1);
                    expect(addCurrRoundResults).toHaveBeenCalledWith(expectedState.currRound, expectedState.rounds);
                    expect(calculateScore).toHaveBeenCalledTimes(1);
                    expect(calculateScore).toHaveBeenCalledWith(expectedUpdatedRounds);
                });

                it('should dispatch 3 actions', () => {
                    expect(dispatchSpy).toHaveBeenCalledTimes(3);
                });

                it('should dispatch the updated rounds', () => {
                    expect(dispatchSpy).toHaveBeenCalledWith({
                        data: expectedUpdatedRounds,
                        type: SET_ROUNDS
                    });
                });

                it('should reset', () => {
                    expect(dispatchSpy).toHaveBeenCalledWith({
                        type: RESET
                    });
                });

                it('should set isBids to false', () => {
                    expect(dispatchSpy).toHaveBeenCalledWith({
                        data: true,
                        type: SET_IS_BIDS
                    });
                });
            });
        });
    });

    describe('setName', () => {
        let expectedName,
            expectedPlayer;

        it('should return an action to set the name', () => {
            expectedName = chance.string();
            expectedPlayer = chance.pickone(Object.keys(setNameActionsEnum));

            const actualAction = setName(expectedName, expectedPlayer);

            expect(actualAction).toEqual({
                data: expectedName,
                type: setNameActionsEnum[expectedPlayer]
            });
        });
    });

    describe('submitValue', () => {
        let expectedName,
            expectedPlayer;

        it('should return an action to set the name', () => {
            expectedName = chance.string();
            expectedPlayer = chance.pickone(Object.keys(setBidsActionEnum));

            const actualAction = submitValue(expectedName, expectedPlayer);

            expect(actualAction).toEqual({
                data: expectedName,
                type: setBidsActionEnum[expectedPlayer]
            });
        });
    });

    describe('restart', () => {
        beforeEach(() => {
            Alert.alert = jest.fn();

            restart()(dispatchSpy);
        });

        it('should call alert', () => {
            expect(Alert.alert).toHaveBeenCalledTimes(1);
            expect(Alert.alert).toHaveBeenCalledWith(
                'Are you sure you want to restart?',
                'You cannot undo this',
                [
                    {text: 'Cancel'},
                    {
                        onPress: expect.any(Function),
                        text: 'Yes'
                    }
                ]
            );
        });

        it('should dispatch RESTART on press', () => {
            Alert.alert.mock.calls[0][2][1].onPress();

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith({type: RESTART});
        });
    });

    describe('undo', () => {
        describe('when there are rounds', () => {
            describe('when it isBids', () => {
                it('should dispatch two actions to undo it', () => {
                    undo(true)(dispatchSpy, getStateStub);

                    expect(dispatchSpy).toHaveBeenCalledTimes(2);
                    expect(dispatchSpy).toHaveBeenCalledWith({type: UNDO_ACTUAL});
                    expect(dispatchSpy).toHaveBeenCalledWith({
                        data: false,
                        type: SET_IS_BIDS
                    });
                });
            });

            describe('when it **not** isBids', () => {
                it('should dispatch two actions to undo it', () => {
                    undo(false)(dispatchSpy, getStateStub);

                    expect(dispatchSpy).toHaveBeenCalledTimes(2);
                    expect(dispatchSpy).toHaveBeenCalledWith({type: UNDO_BIDS});
                    expect(dispatchSpy).toHaveBeenCalledWith({
                        data: true,
                        type: SET_IS_BIDS
                    });
                });
            });
        });

        it('should do nothing when there are not rounds', () => {
            expectedState.rounds = [];
            getStateStub.mockReturnValue(expectedState);

            undo(chance.bool())(dispatchSpy, getStateStub);

            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });

    describe('toggleShowHistory', () => {
        it('should return an action to TOGGLE_SHOW_HISTORY', () => {
            const actualAction = toggleShowHistory();

            expect(actualAction).toEqual({type: TOGGLE_SHOW_HISTORY});
        });
    });

    describe('toggleShowInfoModal', () => {
        it('should return an action to TOGGLE_SHOW_INFO_MODAL', () => {
            const actualAction = toggleShowInfoModal();

            expect(actualAction).toEqual({type: TOGGLE_SHOW_INFO_MODAL});
        });
    });

    describe('toggleShowSettingsModal', () => {
        it('should return an action to TOGGLE_SHOW_SETTINGS_MODAL', () => {
            const actualAction = toggleShowSettingsModal();

            expect(actualAction).toEqual({type: TOGGLE_SHOW_SETTINGS_MODAL});
        });
    });

    describe('setTheme', () => {
        let expectedTheme;

        it('should dispatch an action to SET_THEME', () => {
            expectedTheme = chance.natural();

            setTheme(expectedTheme)(dispatchSpy);

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedTheme,
                type: SET_THEME
            });
        });
    });

    describe('setColor', () => {
        let expectedColor;

        it('should return an action to SET_COLOR', () => {
            expectedColor = chance.natural();

            setColor(expectedColor)(dispatchSpy);

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith({
                data: expectedColor,
                type: SET_COLOR
            });
        });
    });
});
