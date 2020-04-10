import React, { Component } from 'react';

import { SafeAreaView, Text } from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Home</Text>
            </SafeAreaView>
        );
    }
}
