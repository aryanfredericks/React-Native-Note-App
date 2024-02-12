import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TopCircle = () => {
  return (
    <View style = {styles.container}>
    </View>
  )
}

export default TopCircle

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#1f52d1',
        height : '50%',
        position :"absolute",
        width : '100%',
        transform : [{scale : 1.5}],
        top : -100,
        borderRadius : 250,
    }
})