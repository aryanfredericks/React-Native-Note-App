import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React, { useContext } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import UserContext from '../contexts/user/UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Form = ({ formType }) => {

    const { userLoginData, setUserLoginData, userSignUpData, setUserSignUpData } = useContext(UserContext);

    const navigation = useNavigation();

    const wipeAllData = ()=>{
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
    }

    const handleLogin = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://10.0.2.2:8080/api/v1/login',
                data: userLoginData,
            });
            if (response.data.status === 'success') {
                await AsyncStorage.setItem('isLoggedIn', 'true');
                await AsyncStorage.setItem('userId', response.data.todo.id.toString());
                wipeAllData();
                navigation.replace('Todo');
            }
            else {
                console.log("Invalid password");
                wipeAllData();
            }
        } catch (error) {
            console.log(error);
            wipeAllData();
        }
    }

    const handleSignUp = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://10.0.2.2:8080/api/v1/user',
                data: userSignUpData,
            });
            if (response.data === 'User Exists') {
                console.log("user already exists")
                wipeAllData();
            }
            else {
                console.log("signed up")
                wipeAllData();
            }
        } catch (error) {
            console.log(error);
            wipeAllData();
        }
    }

    return (
        <View style={
            (formType === 'login') ? styles.loginContainer : styles.signUpContainer
        }>
            {
                (formType === 'login') ?
                    null
                    :
                    <View style={[styles.textInput]}>
                        <AntDesign name='user' color={'grey'} size={30} />
                        <TextInput
                            style={styles.myText}
                            placeholder='Name'
                            placeholderTextColor={'grey'}
                            value={userLoginData.name}
                            onChangeText={
                                (val) => {
                                    setUserSignUpData({
                                        ...userSignUpData,
                                        name: val,
                                    });
                                }
                            }
                        />
                    </View>
            }
            <View style={[styles.textInput]}>
                <MaterialCommunityIcons name='email-outline' color={'grey'} size={30} />
                <TextInput
                    style={styles.myText}
                    placeholder='Email'
                    placeholderTextColor={'grey'}
                    value={
                        (formType === 'login') ? userLoginData.email : userSignUpData.email
                    }
                    onChangeText={
                        (val) => {
                            setUserLoginData({
                                ...userLoginData,
                                email: val,
                            });
                            setUserSignUpData({
                                ...userSignUpData,
                                email: val,
                            });
                        }
                    }
                />
            </View>
            <View style={[styles.textInput]}>
                <MaterialCommunityIcons name='lock-outline' color={'grey'} size={30} />
                <TextInput
                    style={styles.myText}
                    placeholder='Password'
                    placeholderTextColor={'grey'}
                    value={
                        (formType === 'login') ? userLoginData.password : userSignUpData.password
                    }
                    onChangeText={
                        (val) => {
                            setUserLoginData({
                                ...userLoginData,
                                password: val,
                            });
                            setUserSignUpData({
                                ...userSignUpData,
                                password: val,
                            });
                        }
                    }
                />
            </View>
            {
                (formType === 'login') ?
                    null
                    :
                    <View style={[styles.textInput]}>
                        <MaterialCommunityIcons name='lock-outline' color={'grey'} size={30} />
                        <TextInput
                            style={styles.myText}
                            placeholder='Confirm Password'
                            placeholderTextColor={'grey'}
                            value={userSignUpData.confirmPassword}
                            onChangeText={
                                (val) => {
                                    setUserSignUpData({
                                        ...userSignUpData,
                                        confirmPassword: val,
                                    });
                                }
                            }
                        />
                    </View>
            }
            <TouchableHighlight
                style={styles.btn}
                onPress={(e) => {
                    e.preventDefault();
                    if (formType === 'login') {
                        handleLogin();
                    }
                    else {
                        handleSignUp();
                    }
                }}
            >
                <Text style={{ color: 'white' }}>{
                    (formType === 'login') ? 'LOG IN' : 'SIGN UP'
                }</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    loginContainer: {
        height: 350,
        width: '85%',
        borderRadius: 20,
        elevation: 10,
        zIndex: 3,
        backgroundColor: 'white',
        shadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpContainer: {
        height: 500,
        width: '85%',
        borderRadius: 20,
        elevation: 10,
        zIndex: 3,
        backgroundColor: 'white',
        shadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        padding: 5,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'grey',
        width: 280,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    myText: {
        color: 'black',
        flex: 1,
        fontSize: 17,
        marginLeft: 8,
    },
    btn: {
        width: 280,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f52d1',
        borderRadius: 32,
        elevation: 6,
    }
})