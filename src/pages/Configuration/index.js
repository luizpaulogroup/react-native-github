import React, { useEffect, useState } from 'react';

import { View, Text, Switch, AsyncStorage } from 'react-native';

import { Container, Title } from '../../Components/Container';

import { Dark, Default } from '../../Components/Theme';

import { ContentUser } from './styles';

export default function Configuration() {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        handleChangeTheme();
    }, [isDark])

    const handleChangeTheme = async () => {

        try {

            await AsyncStorage.setItem('THEME', JSON.stringify({ isDark }));

            console.log('Theme successfully changed');

            const theme = await AsyncStorage.getItem('THEME');

            var { isDark: _isDark } = JSON.parse(theme);

            console.log(_isDark);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Container>
            <ContentUser>
                <Title>Configuration</Title>
            </ContentUser>
            <ContentUser>
                <View style={{
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
                    <Text style={{ fontWeight: 'bold', color: '#999' }}>Theme dark</Text>
                    <Switch
                        value={isDark}
                        onValueChange={setIsDark}
                    />
                </View>
            </ContentUser>
        </Container>
    )
}
