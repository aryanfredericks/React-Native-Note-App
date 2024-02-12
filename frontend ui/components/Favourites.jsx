import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Favourites = () => {

    const buttonData = [
        'MyNotes',
        'Favourites',
        'Important',
        'Contacts',
        'Todos',
        'Work Related',
        'Assignments',
    ];


    return (
        <View
            style={styles.container}
        >
            <FlatList
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            horizontal = {true}
            data={buttonData}
            renderItem={({item})=>(
                <TouchableOpacity
                style={styles.btn}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btn : {
        backgroundColor: '#9e79d9',
        padding: 5,
        margin : 10,
        borderRadius: 5,
        borderWidth : 1,
    }
})