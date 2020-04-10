import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import Account from '../pages/Account';
import Configuration from '../pages/Configuration';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Repositories from '../pages/Repositories';
import Followers from '../pages/Followers';

const Stack = createStackNavigator();

function myStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Repositories" component={Repositories} />
            <Stack.Screen name="Followers" component={Followers} />
        </Stack.Navigator>
    )
}

const Tabs = createBottomTabNavigator();

const Routes = () => (
    <NavigationContainer>
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={myStack} />
            <Tabs.Screen name="Account" component={Account} />
            <Tabs.Screen name="Configuration" component={Configuration} />
        </Tabs.Navigator>
    </NavigationContainer>
);

export default Routes;