import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';

import { Container, Title, Input, Button, ButtonText } from '../../Components/Container';

import api from '../../services/api';

export default function Home({ navigation }) {

    const [user, setUser] = useState("luizpaulogroup");
    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        NetInfo.fetch().then(({ isConnected }) => setIsConnected(isConnected));
    }, [isConnected])

    const getUser = async () => {

        setLoading(true);

        try {

            if (!isConnected) {
                alert('Check your internet connection');
                setLoading(false);
                return;
            }

            if (!user) {
                alert('Enter the name please');
                setLoading(false);
                return;
            }

            const response = await api.get(`/users/${user}`);

            const { data } = response;

            if (!data.id) {
                alert('Usuário não encontrado');
                setLoading(false);
                return;
            }

            navigation.navigate('Profile', { user: data, refresh: false });

        } catch (error) {
            alert(error.message);
        }

        setLoading(false);

    }

    return (
        <Container style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <LinearGradient
                colors={['#EEE', '#F5F5F5']}
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Title>Search for github users</Title>
                <Input
                    placeholder="Enter the name here..."
                    value={user}
                    onChangeText={setUser}
                />
                <Button disabled={loading} onPress={getUser}>
                    {loading ? <ActivityIndicator /> : <ButtonText>Search</ButtonText>}
                </Button>
            </LinearGradient>
        </Container >
    );
}

