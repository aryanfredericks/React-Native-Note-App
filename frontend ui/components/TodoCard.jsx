import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import TodoContext from '../contexts/todos/TodoContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const TodoCard = ({ title, description , index }) => {

    const nav = useNavigation();

    const { randomColors,todos  ,triggerReload, setTriggerReload, setTodo } = useContext(TodoContext);

    const handleEdit = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setTodo({
            ...todos[index],
            userId : userId
        });
        nav.navigate('Note' , {noteId :todos[index].id });
    }


    const handleDelete = async () => {
        const noteId = todos[index].id;
        try {
            await axios({
                url : 'http://10.0.2.2:8080/api/v1/todos/'+noteId,
                method : 'delete',
            });
            setTriggerReload(!triggerReload);
        } catch (error) {
            
        }
    }
    return (
        <View
            style={[styles.container, { backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)] }]}
        >
            <View
                style={styles.bottomBtn}
            >
                <AntDesign 
                onPress={handleEdit}
                name='edit' 
                size={20} 
                color={'green'} />
            </View>
            <View
                style={styles.topButton}
            >
                <AntDesign 
                onPress={handleDelete}
                name='delete' 
                size={20} 
                color={'red'} />
            </View>
            <Text
                style={styles.title}
            >Title : {title}</Text>
            <Text
                style={styles.desc}
            >Description : {description}</Text>
        </View>
    )
}

export default TodoCard

const styles = StyleSheet.create({
    container: {
        width: 360,
        height: 200,
        margin: 10,
        padding: 10,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70,
        borderWidth: 2,
        borderColor: 'black',
        position: 'relative',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    bottomBtn: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black'
    },
    topButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black'
    },
    desc: {
        fontSize: 18,
        color: 'white',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
})