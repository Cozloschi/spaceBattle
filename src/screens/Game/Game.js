import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
import Physics from '../../utils/Systems/Physics'
import GameLoop from '../../utils/Systems/GameLoop'
import Projectile from '../../utils/Systems/Projectiles'
import Constants from '../../utils/Constants'
import DefaultSpaceship from '../../components/spaceship/DefaultSpaceship'
import DefaultProjectile from '../../components/projectile/DefaultProjectile'
import Bottom from '../../components/map/Bottom'


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
        if (e.type === 'gameOver') {

            this.setState({
                running: false
            })
        }
    }

    setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false })
        let world = engine.world
        world.gravity.y = 0.2
        let spaceship = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 1.2, 50, 50, { isStatic: true, label: 'spaceship' })
        let projectile = Matter.Bodies.circle(Constants.MAX_WIDTH / 3, Constants.MAX_HEIGHT / 6, 10, { density: 1, label: 'projectile' })
        let bottom = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 20, Constants.MAX_WIDTH, 10, { density: 1, isStatic: true, label: 'bottom' })


        Matter.World.add(world, [projectile, spaceship, bottom])

        Matter.Events.on(engine, 'collisionStart', (event) => {
            console.log(event)
            this.gameEngine.dispatch({ type: 'gameOver' });
        })

        return {
            physics: { engine: engine, world: world },
            spaceship: { body: spaceship, size: [50, 50], backgroundColor: 'black', renderer: DefaultSpaceship },
            projectile: { body: projectile, size: [10, 10], backgroundColor: 'black', renderer: DefaultProjectile },
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
        right: 0,
    }
})

export default Game