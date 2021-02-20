import Chance from 'chance';

import {addCurrRoundResults, calculateScore, getTeamTotalBids} from '../../src/services/score-service';
import {createRandomCurrRound, createRandomRound} from '../model-factory';
import {TEAM_ONE, TEAM_TWO} from '../../src/constants/constants';
import {
    calculateNilScoreForPlayer, calculateTeamBags,
    calculateTeamScoreForBids, roundHasResults,
    teamHasBidBlindNil
} from '../../src/constants/score-helpers';

const chance = new Chance();

jest.mock('../../src/constants/score-helpers');

describe('score-service', () => {
    describe('getTeamTotalBids', () => {
        let expectedCurrRound;

        beforeEach(() => {
            expectedCurrRound = createRandomCurrRound();
        });

        describe('when there are not blind nils', () => {
            it('should return the bids added together for team one', () => {
                const actualValue = getTeamTotalBids(expectedCurrRound, TEAM_ONE);

                expect(actualValue).toBe(expectedCurrRound.player1Bid + expectedCurrRound.player2Bid);
            });

            it('should return the bids added together for team two', () => {
                const actualValue = getTeamTotalBids(expectedCurrRound, TEAM_TWO);

                expect(actualValue).toBe(expectedCurrRound.player3Bid + expectedCurrRound.player4Bid);
            });
        });

        describe('when there are blind nils', () => {
            it('should return the bids added together for team one', () => {
                teamHasBidBlindNil.mockReturnValue(true);

                const actualValue = getTeamTotalBids(expectedCurrRound, TEAM_ONE);

                expect(actualValue).toBe(expectedCurrRound.player1Bid + expectedCurrRound.player2Bid - 100);
            });

            it('should return the bids added together for team two', () => {
                teamHasBidBlindNil.mockReturnValue(true);

                const actualValue = getTeamTotalBids(expectedCurrRound, TEAM_TWO);

                expect(actualValue).toBe(expectedCurrRound.player3Bid + expectedCurrRound.player4Bid - 100);
            });
        });
    });

    describe('addCurrRoundResults', () => {
        it('should add the current round', () => {
            const expectedCurrRound = createRandomCurrRound();
            const expectedRounds = chance.n(createRandomRound, chance.d6() + 1);

            const actualValue = addCurrRoundResults(expectedCurrRound, expectedRounds);

            expect(actualValue).toEqual([
                {
                    ...expectedRounds[0],
                    playerFour: {
                        ...expectedRounds[0].playerFour,
                        actual: Number(expectedCurrRound.player4Bid)
                    },
                    playerOne: {
                        ...expectedRounds[0].playerOne,
                        actual: Number(expectedCurrRound.player1Bid)
                    },
                    playerThree: {
                        ...expectedRounds[0].playerThree,
                        actual: Number(expectedCurrRound.player3Bid)
                    },
                    playerTwo: {
                        ...expectedRounds[0].playerTwo,
                        actual: Number(expectedCurrRound.player2Bid)
                    },
                    team1Actual: getTeamTotalBids(expectedCurrRound, TEAM_ONE),
                    team2Actual: getTeamTotalBids(expectedCurrRound, TEAM_TWO)
                },
                ...expectedRounds.slice(1)
            ]);
        });
    });

    describe('calculateScore', () => {
        let expectedRounds;

        beforeEach(() => {
            calculateNilScoreForPlayer.mockReturnValue(0);
            calculateTeamScoreForBids.mockReturnValue(0);
            calculateTeamBags.mockReturnValue(0);
            roundHasResults.mockReturnValue(true);

            expectedRounds = chance.n(createRandomRound, chance.d6() + 1);
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should return 0 for all if there are no rounds', () => {
            expectedRounds = [];

            const actualValue = calculateScore(expectedRounds);

            expect(actualValue).toEqual({
                bags1: 0,
                bags2: 0,
                score1: 0,
                score2: 0
            });
        });

        it('should return 0 for all if the round does not have a result', () => {
            roundHasResults.mockReturnValue(false);

            const actualValue = calculateScore(expectedRounds);

            expect(actualValue).toEqual({
                bags1: 0,
                bags2: 0,
                score1: 0,
                score2: 0
            });
        });

        it('should add the nils score together for each player', () => {
            const expectedNilScore = chance.natural();

            calculateNilScoreForPlayer.mockReturnValue(expectedNilScore);

            const actualValue = calculateScore(expectedRounds);

            expect(actualValue).toEqual({
                bags1: 0,
                bags2: 0,
                score1: 2 * expectedNilScore * expectedRounds.length,
                score2: 2 * expectedNilScore * expectedRounds.length
            });

            expect(calculateNilScoreForPlayer).toHaveBeenCalledTimes(4 * expectedRounds.length);
        });

        it('should get the scores by calculating the team scores for the bid', () => {
            const expectedBidScore = chance.natural();

            calculateTeamScoreForBids.mockReturnValue(expectedBidScore);

            const actualValue = calculateScore(expectedRounds);

            expect(actualValue).toEqual({
                bags1: 0,
                bags2: 0,
                score1: expectedBidScore * expectedRounds.length,
                score2: expectedBidScore * expectedRounds.length
            });

            expect(calculateTeamScoreForBids).toHaveBeenCalledTimes(2 * expectedRounds.length);
        });

        it('should get bags by calculating team bags ', () => {
            const expectedTeamBags = 11;

            calculateTeamBags.mockReturnValue(expectedTeamBags);

            const actualValue = calculateScore(expectedRounds);

            expect(actualValue).toEqual({
                bags1: (expectedTeamBags - 10) * expectedRounds.length,
                bags2: (expectedTeamBags - 10) * expectedRounds.length,
                score1: -100 * expectedRounds.length,
                score2: -100 * expectedRounds.length
            });

            expect(calculateTeamBags).toHaveBeenCalledTimes(2 * expectedRounds.length);
        });
    });
});
