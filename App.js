import React from 'react'
import {
    SafeAreaView,
    StyleSheet
} from 'react-native'

import Root from './src/screens/Root'

const App: () => React$Node = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Root />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    }
})

export default App
