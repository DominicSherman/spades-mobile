import {
    blue,
    darkBlue,
    green,
    lightBlue,
    lightGray,
    mediumGray,
    mintGreen,
    orange,
    peach,
    peach2,
    seaFoam,
    violet,
    voltBlue,
    white
} from './style-variables';
import {
    BLUE,
    DARK_ORIGINAL,
    DARK_SEA_FOAM,
    GREEN,
    MINT_GREEN,
    ORANGE,
    ORIGINAL,
    PEACH,
    SEA_FOAM,
    VIOLET,
    VOLT_BLUE
} from './constants';

const BASIC_LIGHT_THEMES = {
    headerFooterBackground: blue,
    headerFooterText: white,
    headerIcons: white,
    headerLogo: white,
    leftGradient: [blue, blue],
    leftScore: darkBlue,
    playerDivider: white,
    rightGradient: [blue, blue],
    rightScore: darkBlue
};
const BASIC_DARK_THEMES = {
    headerFooterBackground: blue,
    headerFooterText: white,
    headerIcons: darkBlue,
    headerLogo: darkBlue,
    leftGradient: [white, white],
    leftScore: white,
    playerDivider: darkBlue,
    rightGradient: [white, white],
    rightScore: white
};

export const COLOR_THEMES = {
    [BLUE]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: blue
    },
    [DARK_ORIGINAL]: BASIC_DARK_THEMES,
    [DARK_SEA_FOAM]: {
        ...BASIC_DARK_THEMES,
        headerFooterBackground: seaFoam
    },
    [GREEN]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: green,
        leftGradient: [green, green],
        rightGradient: [green, green]
    },
    [MINT_GREEN]: {
        ...BASIC_DARK_THEMES,
        headerFooterBackground: mintGreen
    },
    [ORANGE]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: orange,
        leftGradient: [orange, orange],
        rightGradient: [orange, orange]
    },
    [ORIGINAL]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: lightGray,
        headerFooterText: mediumGray,
        headerIcons: lightBlue,
        headerLogo: lightBlue,
        leftGradient: [violet, peach],
        leftScore: peach,
        rightGradient: [lightBlue, blue],
        rightScore: lightBlue
    },
    [PEACH]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: peach2,
        leftGradient: [peach2, peach2],
        rightGradient: [peach2, peach2]
    },
    [SEA_FOAM]: {
        ...BASIC_LIGHT_THEMES,
        headerFooterBackground: seaFoam,
        leftGradient: [seaFoam, seaFoam],
        rightGradient: [seaFoam, seaFoam]
    },
    [VIOLET]: {
        ...BASIC_DARK_THEMES,
        headerFooterBackground: violet
    },
    [VOLT_BLUE]: {
        ...BASIC_DARK_THEMES,
        headerFooterBackground: voltBlue
    }
};

