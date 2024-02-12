import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import TodoContext from '../contexts/todos/TodoContext';
import axios from 'axios';
import TodoCard from './TodoCard';
const TodoContainer = () => {

    const navigation = useNavigation();

    const { todos, setTodos, randomColors , triggerReload} = useContext(TodoContext);

    useEffect(
        () => {
            fetchData();
        },
        [triggerReload],
    );

    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        if (userId != null) {
            try {
                const result = await axios({
                    url: `http://10.0.2.2:8080/api/v1/todos/${userId}`,
                    method: 'post',
                });
                setTodos(result.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        } else {
            console.log("Unable to fetch data: User ID not found");
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                data={todos}
                renderItem={({ item , index }) => (
                    <TodoCard 
                    description={item.description}
                    title={item.title}
                    index={index}
                    />
                )}
            />
        </View>
    );

}

export default TodoContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        width: '100%',
    },
});
