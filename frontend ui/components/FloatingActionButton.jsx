import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const FloatingActionButton = () => {
  const nav = useNavigation();
  return (
    <View
      style={styles.fab}
    >
      <AntDesign
        name='pluscircle'
        color={'white'}
        onPress={() => {
          nav.navigate('Note');
        }}
        size={45} />
    </View>
  )
}

export default FloatingActionButton

const styles = StyleSheet.create({
  fab: {
    height: 55,
    width: 55,
    backgroundColor: '#1a5bc4',
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})