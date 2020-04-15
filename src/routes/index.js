import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import Home from '../pages/Home';
import Store from '../pages/Store';
import Configuration from '../pages/Configuration';
import Profile from '../pages/Profile';
import Repositories from '../pages/Repositories';
import Followers from '../pages/Followers';

const Stack = createStackNavigator();

function myStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    header: () => null
                }} />
            <Stack.Screen
                name="Repositories"
                component={Repositories} />
            <Stack.Screen
                name="Followers"
                component={Followers} />
        </Stack.Navigator>
    )
}

const Tabs = createMaterialBottomTabNavigator();

const Routes = () => (
    <>
        <StatusBar barStyle='dark-content' />
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName="Home"
                activeColor="#FFF"
                inactiveColor="#444"
                barStyle={{
                    backgroundColor: '#000'
                }}
            >
                <Tabs.Screen
                    name="Home"
                    component={myStack}
                    options={{
                        title: "HOME",
                        tabBarLabel: "HOME",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
                <Tabs.Screen
                    name="Store"
                    component={Store}
                    options={{
                        title: "STORE",
                        tabBarLabel: "STORE",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
                        ),
                    }} />
                <Tabs.Screen
                    name="Configuration"
                    component={Configuration}
                    options={{
                        title: "CONFIGURATION",
                        tabBarLabel: "CONFIG",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="wrench" color={color} size={26} />
                        ),
                    }} />
            </Tabs.Navigator>
        </NavigationContainer>
    </>
);

export default Routes;