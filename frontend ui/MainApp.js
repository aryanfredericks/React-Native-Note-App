import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Form from './components/Form';
import TopCircle from './components/TopCircle';
import UserProvider from './contexts/user/UserProvider';
import AppBar from './components/AppBar';
import { useState } from 'react';

const MainApp = ({navigation}) => {
    const [formType, setFormType] = useState('login');
    const [formText, setFormText] = useState('Sign Up');
    return (
        <View style={styles.container}>
            <TopCircle />
            <Form formType={
                (formType === 'login') ? 'login' : 'signup'
            }
            />
            <AppBar
                logoColor={'white'}
                title={(formType === 'login') ? 'Log In' : 'Sign Up'}
            />
            <Text
                style={styles.optionToNavigate}
            >{
                    (formText === 'Sign Up')
                        ? 'New to WalkNotes ?' :
                        'Own an account ?'
                } </Text>
            <Text
                style={[styles.signUp, styles.underline]}
                onPress={() => {
                    if (formText === 'Sign Up') {
                        setFormText('Login');
                        setFormType('signup');
                    }
                    else {
                        setFormText('Sign Up');
                        setFormType('login');
                    }
                }}
            >{
                    (formText === 'Sign Up')
                        ? 'Sign Up' :
                        'Login'
                }</Text>
        </View>
    )
}

export default MainApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionToNavigate: {
        position: 'absolute',
        bottom: 100,
        left: 50,
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
    signUp: {
        position: 'absolute',
        bottom: 97,
        left: 220,
        fontSize: 16,
        fontWeight: '900',
        color: 'black',
    },
    underline: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        paddingBottom: 2,
    },
});
