import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TodoContext from '../../contexts/todos/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const NoteScreen = ({ navigation , route }) => {
    const { noteId } = route.params || {};
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { createTodo, setTodo, triggerReload, setTriggerReload } = useContext(TodoContext);
    const [userId, setUserId] = useState('');

    useEffect(
        () => {
            getUserId();
        },
        []
    );

    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setTodo({
            ...createTodo,
            userId: userId.toString(),
        })
    }

    const wipeData = ()=>{
        setTodo({
            title : '',
            description : '',
            userId : userId.toString(),
            completed : false
        });
    }

    const handleCreateTodo = async () => {
        try {
            if (noteId) {
                await axios({
                    url: 'http://10.0.2.2:8080/api/v1/todos/'+noteId,
                    data: createTodo,
                    method: 'put'
                });
                setTriggerReload(!triggerReload);
                navigation.goBack();
                wipeData();
            }
            else{
                await axios({
                    url: 'http://10.0.2.2:8080/api/v1/todo',
                    data: createTodo,
                    method: 'post'
                });
                setTriggerReload(!triggerReload);
                navigation.goBack();
                wipeData();
            }
        } catch (error) {
            console.log("Error is ", error);
        }
    }
    return (
        <View>
            <View style={styles.appBar}>
                <AntDesign
                    name='arrowleft'
                    color={'white'}
                    onPress={() => {
                        setTriggerReload(!triggerReload);
                        navigation.goBack();
                        wipeData();
                    }}
                    size={30} />
                <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>Make a Note</Text>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    value={createTodo.title}
                    onChangeText={(val) => {
                        setTodo({
                            ...createTodo,
                            title: val,
                        })
                    }}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder='Description'
                    multiline={true}
                    value={createTodo.description}
                    onChangeText={(val) => {
                        setTodo({
                            ...createTodo,
                            description: val,
                        })
                    }}
                />
                <BouncyCheckbox
                    style={{ marginVertical: 20 }}
                    size={30}
                    fillColor='green'
                    unfillColor='red'
                    text='Not Complete'
                    onPress={() => {
                        setIsChecked(!isChecked);
                        setTodo({
                            ...createTodo,
                            completed: !isChecked,
                        })
                    }}
                />
                <TouchableHighlight
                    style={styles.btn}
                    onPress={handleCreateTodo}
                >
                    <Text style={{ color: 'white', fontSize: 20 }}>Add Todo</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default NoteScreen;

const styles = StyleSheet.create({
    appBar: {
        height: 100,
        backgroundColor: '#1a5bc4',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    container: {
        height: 780,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 350,
        height: 70,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        margin: 20,
    },
    textArea: {
        width: 350,
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
    }
});
