import {getShadowColor} from '../services/style-service';

export const getShadow = (theme) => ({
    shadowColor: getShadowColor(theme),
    shadowOffset: {
        height: 3,
        width: 3
    },
    shadowOpacity: 0.2
});
