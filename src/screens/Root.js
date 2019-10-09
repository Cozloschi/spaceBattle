import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Home/Home'
import Game from './Game/Game'
const ApplicationStack = createStackNavigator({
    Home: {
        screen: Home
    },
    Game: {
        screen: Game
    }
}, {
    initialRouteName: 'Home'
})

export default createAppContainer(ApplicationStack)