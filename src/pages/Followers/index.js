import React from 'react';
import { ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Container, Title } from '../../Components/Container';

import {
    ContentUser,
    FollowerContent,
    Follower,
    FollowerAvatarUrl,
    FollowerName,
} from './styles';

export default function Followers({ route }) {

    const { followers, user } = route.params;

    return (
        <Container>
            <ContentUser>
                <Text style={{ color: '#999' }}>Followers</Text>
                <Title style={{ marginBottom: 10 }}>{user}</Title>
            </ContentUser>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FollowerContent>
                    {followers.map(follower => (
                        <Follower key={follower.id}>
                            <FollowerAvatarUrl source={{ uri: follower.avatar_url }} />
                            <FollowerName>{follower.login}</FollowerName>
                        </Follower>
                    ))}
                </FollowerContent>
            </ScrollView>
        </Container>
    );
}
