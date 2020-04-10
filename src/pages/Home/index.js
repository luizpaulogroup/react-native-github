import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import { Container } from '../../Components/Container';

export default function Home({ navigation }) {
    return (
        <Container>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Text>Search</Text>
            </TouchableOpacity>
        </Container>
    );
}

