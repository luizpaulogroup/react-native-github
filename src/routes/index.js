import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import Home from '../pages/Home';
import Account from '../pages/Account';
import Configuration from '../pages/Configuration';
import Profile from '../pages/Profile';
import Repositories from '../pages/Repositories';
import Followers from '../pages/Followers';

const Stack = createStackNavigator();

function myStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} options={{
                header: () => null
            }} />
            <Stack.Screen name="Repositories" component={Repositories} />
            <Stack.Screen name="Followers" component={Followers} />
        </Stack.Navigator>
    )
}

const Tabs = createBottomTabNavigator();

const Routes = () => (
    <NavigationContainer>
        <Tabs.Navigator tabBarOptions={{
            tabStyle: {
                backgroundColor: '#FFF',
            },
            activeTintColor: '#000',
        }}>
            <Tabs.Screen
                name="Home"
                component={myStack}
                options={{
                    title: "HOME",
                    tabBarLabel: ({ color }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold', color, fontSize: 10 }}>HOME</Text>
                        </View>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size - 5} />
                    ),
                }} />
            <Tabs.Screen
                name="Account"
                component={Account}
                options={{
                    title: "ACCOUNT",
                    tabBarLabel: ({ color }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold', color, fontSize: 10 }}>ACCOUNT</Text>
                        </View>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size - 5} />
                    ),
                }} />
            <Tabs.Screen
                name="Configuration"
                component={Configuration}
                options={{
                    title: "CONFIGURATION",
                    tabBarLabel: ({ color }) => (
                        <View>
                            <Text style={{ fontWeight: 'bold', color, fontSize: 10 }}>CONFIG</Text>
                        </View>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wrench" color={color} size={size - 5} />
                    ),
                }} />
        </Tabs.Navigator>
    </NavigationContainer>
);

export default Routes;