import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
import Physics from '../../utils/Systems/Physics'
import GameLoop from '../../utils/Systems/GameLoop'
import Projectile from '../../utils/Systems/Projectiles'
import Constants from '../../utils/Constants'
import DefaultSpaceship from '../../components/spaceship/DefaultSpaceship'
import DefaultProjectile from '../../components/projectile/DefaultProjectile'
import Bottom from '../../components/map/Bottom'
import * as Helpers from '../../utils/Helpers'


class Game extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            running: true
        }

        this.gameEngine = null

        this.entities = this.setupWorld()
    }

    onEvent = (e) => {
        if (e.type === Constants.DISPATCH.GAME_OVER) {
            this.setState({
                running: false
            })
        }
    }

    setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false })
        let world = engine.world
        world.gravity.y = 0.2
        let spaceship = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 1.2, 50, 50, { label: Constants.LABELS.SPACESHIP, density: 1, friction: 0.1 })
        let projectile = Helpers.createProjectile(Constants.MAX_WIDTH / 3, Constants.MAX_HEIGHT / 12)
        let bottom = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 20, Constants.MAX_WIDTH, 10, { density: 1, isStatic: true, label: Constants.LABELS.BOTTOM })

        Matter.World.add(world, [projectile, spaceship, bottom])

        Matter.Events.on(engine, 'collisionStart', event => {
            let collision = Helpers.checkCollisionType(event)
            if (collision) {
                if (collision.type === Constants.COLLISIONS.PROJECTILE_SPACESHIP)
                    this.gameEngine.dispatch({ type: Constants.DISPATCH.GAME_OVER })
                if (collision.type === Constants.COLLISIONS.PROJECTILE_BOTTOM) {
                    this.gameEngine.dispatch({ type: Constants.DISPATCH.PROJECTILE_BOTTOM, body: collision.body })
                    //this.gameEngine.dispatch({ type: Constants.DISPATCH.GAME_OVER })
                }
            }
        })

        return {
            physics: { engine: engine, world: world },
            projectile: { body: projectile, size: [10, 10], backgroundColor: 'black', renderer: DefaultProjectile },
            spaceship: { body: spaceship, size: [50, 50], backgroundColor: 'black', renderer: DefaultSpaceship },
            bottom: { body: bottom, size: [Constants.MAX_WIDTH, 10], backgroundColor: 'black', renderer: Bottom }
        }
    }

    render() {
        return (
            <GameEngine
                ref={(ref) => { this.gameEngine = ref; }}
                style={styles.gameContainer}
                running={this.state.running}
                entities={this.entities}
                systems={[Physics, GameLoop, Projectile]}
                onEvent={this.onEvent}>
            </GameEngine>
        )
    }
}

const styles = StyleSheet.create({
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default Game