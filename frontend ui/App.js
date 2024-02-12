import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import UserProvider from './contexts/user/UserProvider';
import MainApp from './MainApp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TodoPage from './components/screens/TodoPage';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoProvider from './contexts/todos/TodoProvider';
import NoteScreen from './components/screens/NoteScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  const [userFound, setUserFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data === 'true') {
        setUserFound(true);
      } else {
        setUserFound(false);
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <TodoProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={userFound ? 'Todo' : 'Main'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={MainApp} />
            <Stack.Screen name="Todo" component={TodoPage} />
            <Stack.Screen name="Note" component={NoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </TodoProvider>
  );
}



