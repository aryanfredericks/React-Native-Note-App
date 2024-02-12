import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import TodoContext from '../contexts/todos/TodoContext'
const QuoteComponent = () => {
    const { randomQuotes } = useContext(TodoContext);
    return (
        <View style={styles.quoteBox}>
            <Text
                style={[styles.quote , {fontSize : 35}]}
            >Welcome Back !</Text>
            <Text
                style={styles.quote}
            >{randomQuotes[Math.floor(Math.random() * 5)]}</Text>
        </View>
    )
}

export default QuoteComponent

const styles = StyleSheet.create({
    quote: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    quoteBox : {
        padding: 10,
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
})