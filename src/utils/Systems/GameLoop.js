import Matter from 'matter-js'
import Constants from '../Constants'

const GameLoop = (entities, { touches, time }) => {

    let spaceship = entities.spaceship
    let missle = entities.missle

   
    touches.filter(t => t.type === "move").forEach(t => {
        /*if(Matter.Bounds.contains(spaceship.body.bounds, Matter.Vector.create(t.event.locationX, t.event.locationY))){
            alert("CLICKED HIM")
        }*/
        if (t.event.locationX > spaceship.body.position.x){
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: 0.5, y: 0.00 })
            Matter.Body.applyForce(missle.body, missle.body.position, { x: 0, y: -5 })
        }else{ //missle follows the spaceship
            Matter.Body.setPosition(missle.body, Matter.Vector.create(spaceship.body.position.x, spaceship.body.position.y - 30))
          
            Matter.Body.applyForce(spaceship.body, spaceship.body.position, { x: -0.5, y: 0.00 })
        }
    })
    Matter.Engine.update(entities.physics.engine, time.delta)
    return entities

}

export default GameLoop