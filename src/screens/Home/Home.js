import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'


class Home extends Component {
    static navigationOptions = {
        header: null,
    }
    
    navigateGame = () => this.props.navigation.navigate('Game');

    render() {
        return (
            <Text onPress={this.navigateGame}>
                Go to game
            </Text>
        )
    }
}

const styles = StyleSheet.create({

})

export default Home