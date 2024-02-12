import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import QuoteComponent from '../QuoteComponent';
import Favourites from '../Favourites';
import TodoContainer from '../TodoContainer';
import FloatingActionButton from '../FloatingActionButton';
const TodoPage = () => {
  return (
    <LinearGradient
      colors={['#DAE3F2', '#5C7091']}
      start={[0, 0]}
      locations={[0.6, 1]}
      style={styles.container}
    >
      
      <QuoteComponent />
      <Favourites />
      <TodoContainer/>
      <FloatingActionButton/>
    </LinearGradient>
  )
}

export default TodoPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

})