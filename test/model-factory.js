import Chance from 'chance';

import {DARK, LIGHT} from '../src/constants/constants';

const chance = new Chance();

export const createRandomRound = (round = {}) => ({
    playerFour: {
        actual: chance.natural(),
        bid: chance.natural()
    },
    playerOne: {
        actual: chance.natural(),
        bid: chance.natural()
    },
    playerThree: {
        actual: chance.natural(),
        bid: chance.natural()
    },
    playerTwo: {
        actual: chance.natural(),
        bid: chance.natural()
    },
    score: chance.natural(),
    ...round
});

export const createRandomCurrRound = (currRound = {}) => ({
    player1Bid: chance.natural(),
    player2Bid: chance.natural(),
    player3Bid: chance.natural(),
    player4Bid: chance.natural(),
    ...currRound
});

export const createRandomProps = (props = {}) => ({
    actions: {
        restart: jest.fn(),
        setColor: jest.fn(),
        setName: jest.fn(),
        setTheme: jest.fn(),
        submitValue: jest.fn(),
        toggleShowHistory: jest.fn(),
        toggleShowInfoModal: jest.fn(),
        undo: jest.fn()
    },
    bids: {
        playerFour: {
            bid: chance.natural()
        },
        playerOne: {
            bid: chance.natural()
        },
        playerThree: {
            bid: chance.natural()
        },
        playerTwo: {
            bid: chance.natural()
        },
        team1Bids: chance.natural(),
        team2Bids: chance.natural()
    },
    currRound: createRandomCurrRound(),
    isBids: chance.natural(),
    rounds: chance.n(createRandomRound, chance.d6() + 1),
    team1: {
        firstPlayer: chance.string(),
        secondPlayer: chance.string()
    },
    team2: {
        fourthPlayer: chance.string(),
        thirdPlayer: chance.string()
    },
    theme: {
        background: chance.pickone([LIGHT, DARK]),
        color: chance.string()
    },
    ...props
});
