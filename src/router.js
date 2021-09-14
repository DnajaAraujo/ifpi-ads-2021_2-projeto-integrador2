import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Feather } from '@expo/vector-icons'

import { TouchableOpacity } from 'react-native'

import Home from './pages/Home'

const Stack = createStackNavigator();


function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='home' 
                    component={Home}
                    options={{
                        title: 'Harpia',
                        
                        headerRight: () => (
                            <TouchableOpacity style={{marginRight: 15}}>
                                <Feather
                                    name="menu"
                                    size={25}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;