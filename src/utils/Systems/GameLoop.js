import Matter from 'matter-js'
import Constants from '../Constants'

const GameLoop = (entities, { touches, time }) => {

    let spaceship = entities.spaceship
    touches.filter(t => t.type === "move").forEach(t => {
        if (t.event.locationX > Constants.MAX_WIDTH / 2)
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: 0.5, y: 0.00 })
        else
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: -0.5, y: 0.00 })
    })
    Matter.Engine.update(entities.physics.engine, time.delta)
    return entities

}

export default GameLoop