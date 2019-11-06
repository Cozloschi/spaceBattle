import Matter from 'matter-js'
import Constants from '../Constants'

const GameLoop = (entities, { touches, time }) => {

    let spaceship = entities.spaceship
    let missle = entities.missle

    Matter.Body.setPosition(missle.body, Matter.Vector.create(spaceship.body.position.x, spaceship.body.position.y - 30))

    touches.filter(t => t.type === "move").forEach(t => {
        //console.log(t.event.locationX)
        if (t.event.locationX > 300) {
            Matter.Body.applyForce(missle.body, missle.body.position, { x: 0, y: -2 })
        }

        if (t.event.locationX > spaceship.body.position.x) {
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: 0.5, y: 0.00 })
        } else { //missle follows the spaceship
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: -0.5, y: 0.00 })
        }
    })
    Matter.Engine.update(entities.physics.engine, time.delta)
    return entities

}

export default GameLoop