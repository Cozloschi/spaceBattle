import Matter from 'matter-js'
import Constants from '../Constants'
import DefaultProjectile from '../../components/projectile/DefaultProjectile'
import * as Helpers from '../Helpers'

const Projectiles = (entities, { events }) => {
    let eventCollisionId = events.findIndex(event => event.type === Constants.DISPATCH.PROJECTILE_BOTTOM)
    if (eventCollisionId > -1) {
        let world = entities.physics.world
 
        //remove projectile from world
        Matter.World.remove(world, events[eventCollisionId].body)
        //remove from render
        delete entities[`${Constants.LABELS.PROJECTILE}${events[eventCollisionId].body.id}`]

        //create another 
        let xCoord = Math.floor((Math.random() * Constants.MAX_WIDTH - 10) + 10)
        let projectile = Helpers.createProjectile(xCoord, Constants.MAX_HEIGHT / 12)
        Matter.World.add(world, [projectile])
        entities[`${Constants.LABELS.PROJECTILE}${projectile.id}`] = {
            body: projectile,
            size: [10, 10],
            backgroundColor: 'black',
            renderer: DefaultProjectile
        };
    }
    return entities
};

export default Projectiles