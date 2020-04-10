import React, { useEffect, useState } from 'react';

import { Container, Title, Input, Button, ButtonText } from '../../Components/Container';

export default function Home({ navigation }) {

    const [user, setUser] = useState("");

    return (
        <Container>
            <Title>Search for github users</Title>
            <Input
                placeholder="Enter the name here..."
                value={user}
                onChangeText={setUser}
            />
            <Button onPress={() => navigation.navigate('Profile')}>
                <ButtonText>Search</ButtonText>
            </Button>
        </Container>
    );
}

