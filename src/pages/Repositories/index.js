import React, { Component } from 'react';

import { SafeAreaView, Text } from 'react-native';

export default class Repositories extends Component {
    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Repositories</Text>
            </SafeAreaView>
        );
    }
}
