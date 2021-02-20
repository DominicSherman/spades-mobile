import Chance from 'chance';

import {
    getBackgroundColor,
    getColorsForTheme,
    getDarkTextColor,
    getFooterIconColor,
    getHeaderFooterColor,
    getHeaderFooterTextColor, getHeaderIconColor, getHeaderLogoColor, getLeftScoreColor, getLeftTeamGradient,
    getLightTextColor, getPlayerDividerColor,
    getPlayerTextColor, getRightScoreColor, getRightTeamGradient,
    getShadowColor,
    getSubmitArrowColor,
    getSubmitTextColor,
    setDefault
} from '../../src/services/style-service';
import {
    BLUE,
    DARK,
    DARK_ORIGINAL,
    DARK_SEA_FOAM,
    GREEN,
    LIGHT,
    MINT_GREEN,
    ORIGINAL,
    PEACH, SEA_FOAM,
    VIOLET,
    VOLT_BLUE
} from '../../src/constants/constants';
import {darkBlue, darkFont, lightBlue, lightFont, mediumGray, white} from '../../src/constants/style-variables';
import {COLOR_THEMES} from '../../src/constants/enums';

const chance = new Chance();

const colors = [
    BLUE,
    DARK_ORIGINAL,
    DARK_SEA_FOAM,
    GREEN,
    MINT_GREEN,
    ORIGINAL,
    PEACH, SEA_FOAM,
    VIOLET,
    VOLT_BLUE
];
const nonOriginalColors = colors.filter((color) => color !== ORIGINAL);

describe('style-service', () => {
    describe('getColorsForTheme', () => {
        it('should return the correct colors it the theme is light', () => {
            const actualValues = getColorsForTheme({
                background: LIGHT
            });

            expect(actualValues).toEqual([ORIGINAL, BLUE, GREEN, SEA_FOAM, PEACH]);
        });

        it('should return the correct colors it the theme is **not** light', () => {
            const actualValues = getColorsForTheme({
                background: DARK
            });

            expect(actualValues).toEqual([DARK_ORIGINAL, VOLT_BLUE, MINT_GREEN, DARK_SEA_FOAM, VIOLET]);
        });
    });

    describe('setDefault', () => {
        it('should set the correct color if the theme is light', () => {
            const setColor = jest.fn();

            setDefault({
                background: LIGHT
            }, setColor);

            expect(setColor).toHaveBeenCalledTimes(1);
            expect(setColor).toHaveBeenCalledWith(ORIGINAL);
        });

        it('should set the correct color if the theme is dark', () => {
            const setColor = jest.fn();

            setDefault({
                background: DARK
            }, setColor);

            expect(setColor).toHaveBeenCalledTimes(1);
            expect(setColor).toHaveBeenCalledWith(DARK_ORIGINAL);
        });
    });

    describe('getShadowColor', () => {
        it('should return the correct shadowColor if the theme is LIGHT', () => {
            const actualValue = getShadowColor({
                background: LIGHT
            });

            expect(actualValue).toBe(darkBlue);
        });

        it('should return the correct shadowColor if the theme is DARK', () => {
            const actualValue = getShadowColor({
                background: DARK
            });

            expect(actualValue).toBe(white);
        });
    });

    describe('getBackgroundColor', () => {
        it('should return the correct backgroundColor if the theme is LIGHT', () => {
            const actualValue = getBackgroundColor({
                background: LIGHT
            });

            expect(actualValue).toBe(white);
        });

        it('should return the correct backgroundColor if the theme is DARK', () => {
            const actualValue = getBackgroundColor({
                background: DARK
            });

            expect(actualValue).toBe(darkBlue);
        });
    });

    describe('getPlayerTextColor', () => {
        it('should return the correct playerTextColor if the theme is LIGHT', () => {
            const actualValue = getPlayerTextColor({
                background: LIGHT
            });

            expect(actualValue).toBe(white);
        });

        it('should return the correct playerTextColor if the theme is DARK', () => {
            const actualValue = getPlayerTextColor({
                background: DARK
            });

            expect(actualValue).toBe(darkBlue);
        });
    });

    describe('getLightTextColor', () => {
        it('should return the correct lightTextColor if the theme is LIGHT', () => {
            const actualValue = getLightTextColor({
                background: LIGHT
            });

            expect(actualValue).toBe(lightFont);
        });

        it('should return the correct lightTextColor if the theme is DARK', () => {
            const actualValue = getLightTextColor({
                background: DARK
            });

            expect(actualValue).toBe(white);
        });
    });

    describe('getDarkTextColor', () => {
        it('should return the correct darkTextColor if the theme is LIGHT', () => {
            const actualValue = getDarkTextColor({
                background: LIGHT
            });

            expect(actualValue).toBe(darkFont);
        });

        it('should return the correct darkTextColor if the theme is DARK', () => {
            const actualValue = getDarkTextColor({
                background: DARK
            });

            expect(actualValue).toBe(white);
        });
    });

    describe('getSubmitArrowColor', () => {
        it('should return the correct submitArrowColor if the color is ORIGINAL', () => {
            const actualValue = getSubmitArrowColor({
                color: ORIGINAL
            });

            expect(actualValue).toBe(white);
        });

        it('should return the correct submitArrowColor if the color is **not** ORIGINAL', () => {
            const actualValue = getSubmitArrowColor({
                background: chance.pickone(nonOriginalColors)
            });

            expect(actualValue).toBe(darkBlue);
        });
    });

    describe('getSubmitTextColor', () => {
        it('should return the correct submitTextColor if the color is ORIGINAL', () => {
            const actualValue = getSubmitTextColor({
                color: ORIGINAL
            });

            expect(actualValue).toBe(mediumGray);
        });

        it('should return the correct submitTextColor if the color is **not** ORIGINAL', () => {
            const actualValue = getSubmitTextColor({
                background: chance.pickone(nonOriginalColors)
            });

            expect(actualValue).toBe(darkBlue);
        });
    });

    describe('getFooterIconColor', () => {
        it('should return the correct footerIconColor if the color is ORIGINAL', () => {
            const actualValue = getFooterIconColor({
                color: ORIGINAL
            });

            expect(actualValue).toBe(lightBlue);
        });

        it('should return the correct footerIconColor if the color is **not** ORIGINAL', () => {
            const actualValue = getFooterIconColor({
                background: chance.pickone(nonOriginalColors)
            });

            expect(actualValue).toBe(white);
        });
    });

    describe('getHeaderFooterColor', () => {
        it('should return the headerFooterBackground', () => {
            const color = chance.pickone(colors);
            const actualValue = getHeaderFooterColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].headerFooterBackground);
        });
    });

    describe('getHeaderFooterTextColor', () => {
        it('should return the headerFooterText', () => {
            const color = chance.pickone(colors);
            const actualValue = getHeaderFooterTextColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].headerFooterText);
        });
    });

    describe('getHeaderIconColor', () => {
        it('should return the headerIcons', () => {
            const color = chance.pickone(colors);
            const actualValue = getHeaderIconColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].headerIcons);
        });
    });

    describe('getHeaderLogoColor', () => {
        it('should return the headerLogo', () => {
            const color = chance.pickone(colors);
            const actualValue = getHeaderLogoColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].headerLogo);
        });
    });

    describe('getRightTeamGradient', () => {
        it('should return the rightGradient', () => {
            const color = chance.pickone(colors);
            const actualValue = getRightTeamGradient({color});

            expect(actualValue).toBe(COLOR_THEMES[color].rightGradient);
        });
    });

    describe('getLeftTeamGradient', () => {
        it('should return the leftGradient', () => {
            const color = chance.pickone(colors);
            const actualValue = getLeftTeamGradient({color});

            expect(actualValue).toBe(COLOR_THEMES[color].leftGradient);
        });
    });

    describe('getRightScoreColor', () => {
        it('should return the rightScore', () => {
            const color = chance.pickone(colors);
            const actualValue = getRightScoreColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].rightScore);
        });
    });

    describe('getLeftScoreColor', () => {
        it('should return the leftScore', () => {
            const color = chance.pickone(colors);
            const actualValue = getLeftScoreColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].leftScore);
        });
    });

    describe('getPlayerDividerColor', () => {
        it('should return the playerDivider', () => {
            const color = chance.pickone(colors);
            const actualValue = getPlayerDividerColor({color});

            expect(actualValue).toBe(COLOR_THEMES[color].playerDivider);
        });
    });
});
