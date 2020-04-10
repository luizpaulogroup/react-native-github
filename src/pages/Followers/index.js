import React, { Component } from 'react';

import { SafeAreaView, Text } from 'react-native';

export default class Followers extends Component {
    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Followers</Text>
            </SafeAreaView>
        );
    }
}
