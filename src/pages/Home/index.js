import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Title, Input, Button, ButtonText } from '../../Components/Container';

import api from '../../services/api';

export default function Home({ navigation }) {

    const [user, setUser] = useState("luizpaulogroup");
    const [loading, setLoading] = useState(false);

    const getUser = async () => {

        setLoading(true);

        try {

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

            navigation.navigate('Profile', { data });

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
            <Title>Search for github users</Title>
            <Input
                placeholder="Enter the name here..."
                value={user}
                onChangeText={setUser}
            />
            <Button disabled={loading} onPress={getUser}>
                {loading ? <ActivityIndicator /> : <ButtonText>Search</ButtonText>}
            </Button>
        </Container>
    );
}

