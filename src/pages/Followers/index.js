import React from 'react';
import { FlatList, Text } from 'react-native';

import { Container, Title } from '../../Components/Container';

import { ContentUser, Follower, FollowerAvatarUrl, FollowerName } from './styles';

import api from '../../services/api';

export default function Followers({ navigation, route }) {

    const { followers, user } = route.params;
    
    const getUser = async user => {

        try {

            const response = await api.get(`/users/${user}`);

            const { data } = response;

            navigation.navigate('Profile', { user: data, refresh: true });

        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <Container>
            <ContentUser>
                <Text style={{ color: '#999' }}>Followers</Text>
                <Title style={{ marginBottom: 10 }}>{user}</Title>
                <FlatList
                    style={{ width: '100%', height: '100%' }}
                    showsVerticalScrollIndicator={false}
                    data={followers}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Follower onPress={() => getUser(item.login)}>
                            <FollowerAvatarUrl source={{ uri: item.avatar_url }} />
                            <FollowerName>{item.login}</FollowerName>
                        </Follower>
                    )}
                />
            </ContentUser>
        </Container>
    );
}
