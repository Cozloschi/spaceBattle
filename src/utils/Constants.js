import { Dimensions } from 'react-native';

export default {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    COLLISIONS: {
        PROJECTILE_BOTTOM: 'PROJECTILE_BOTTOM',
        PROJECTILE_SPACESHIP: 'PROJECTILE_SPACESHIP'
    },
    LABELS: {
        PROJECTILE: 'PROJECTILE',
        SPACESHIP: 'SPACESHIP',
        BOTTOM: 'BOTTOM'
    },
    DISPATCH: {
        PROJECTILE_BOTTOM: 'PROJECTILE_BOTTOM',
        GAME_OVER: 'GAME_OVER'
    }
}