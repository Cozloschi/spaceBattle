let projectileIds = 0
const Projectiles = (entities, { touches, screen }) => {
    //let world = entities.physics.world;
    //console.log(entities)
    /*touches.filter(t => t.type === "press").forEach(t => {
        let body = Matter.Bodies.circle(
            t.event.pageX,
            t.event.pageY,
            boxSize,
            boxSize,
            {
                frictionAir: 0.021,
                restitution: 1.0
            }
        );

        Matter.World.add(world, [body]);

        entities[++boxIds] = {
            body: body,
            size: [boxSize, boxSize],
            color: boxIds % 2 == 0 ? "pink" : "#B8E986",
            renderer: Box
        };
    });*/
    return entities
};

export default Projectiles