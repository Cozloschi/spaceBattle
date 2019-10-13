import Matter from 'matter-js'
import Constants from './Constants'

export const checkCollisionType = event => {
    if (event.pairs.length) {
        let pair = event.pairs[0]

        //if projectile colided with bottom
        if (
            pair.bodyA.label === Constants.LABELS.BOTTOM && pair.bodyB.label === Constants.LABELS.PROJECTILE ||
            pair.bodyB.label === Constants.LABELS.BOTTOM && pair.bodyA.label === Constants.LABELS.PROJECTILE
        ) {
            let body = pair.bodyA.label === Constants.LABELS.PROJECTILE ? pair.bodyA : pair.bodyB
            return {
                type: Constants.COLLISIONS.PROJECTILE_BOTTOM,
                body
            }
        }

        //if projectile colided with spaceship
        if (
            pair.bodyA.label === Constants.LABELS.PROJECTILE && pair.bodyB.label === Constants.LABELS.SPACESHIP ||
            pair.bodyB.label === Constants.LABELS.PROJECTILE && pair.bodyA.label === Constants.LABELS.SPACESHIP
        ) {
            let body = pair.bodyA.label === Constants.LABELS.PROJECTILE ? pair.bodyA : pair.bodyB
            return {
                type: Constants.COLLISIONS.PROJECTILE_SPACESHIP,
                body
            }
        }
    }

    return undefined
}

export const createProjectile = (x, y) => {
    return Matter.Bodies.circle(x, y, 10, { density: 1, label: Constants.LABELS.PROJECTILE })
}