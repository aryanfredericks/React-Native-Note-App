import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import UserContext from '../contexts/user/UserContext';
const AppBar = ({ title }) => {

    const { setUserLoginData, setUserSignUpData } = useContext(UserContext);
    return (
        <View style={styles.appBar}>
            <Text
                style={styles.title}
            >{title}</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    setUserLoginData({
                        email: '',
                        password: '',
                    });
                    setUserSignUpData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                }}
            >
                <Text
                    style={{ color: 'white' }}
                >
                    Clear All
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AppBar

const styles = StyleSheet.create({
    appBar: {
        position: 'absolute',
        top: 0,
        height: 80,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
        marginLeft: 30,
    },
    btn: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 32,
    }
})