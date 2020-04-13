import React, { useState, useEffect } from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native';

import { Container, Title } from '../../Components/Container';

import { ContentUser, Follower, FollowerInfo, FollowerAvatarUrl, FollowerName } from './styles';

import api from '../../services/api';

export default function Followers({ navigation, route }) {

    const { user } = route.params;

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [followers, setFollowers] = useState([]);
    const [loadingFollowers, setLoadingFollowers] = useState(false);

    useEffect(() => { getFollowers() }, []);

    const getUser = async (id, login) => {

        try {

            setUserId(id);
            setLoading(true);

            const response = await api.get(`/users/${login}`);

            const { data } = response;

            navigation.navigate('Profile', { user: data, refresh: true });

        } catch (error) {
            setUserId("");
            setLoading(false);
            alert(error.message);
        }

    }

    async function getFollowers() {

        setLoadingFollowers(true);

        try {

            const response = await api.get(`/users/${user}/followers`);

            setFollowers(response.data);

        } catch (error) {
            setLoadingFollowers(false);
            alert(`getFollowers : ${error.message}`);
            return;
        }

        setLoadingFollowers(false);

    }

    return (
        <Container>
            <ContentUser>
                <Text style={{ color: '#999' }}>Followers</Text>
                <Title>{user}</Title>
                {loadingFollowers ? (
                    <View style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator />
                    </View>
                )
                    : (
                        <FlatList
                            style={{ width: '100%', height: '100%' }}
                            showsVerticalScrollIndicator={false}
                            data={followers}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => (
                                <Follower disabled={loading && (item.id == userId) ? true : false} onPress={() => getUser(item.id, item.login)}>
                                    <FollowerInfo>
                                        <FollowerAvatarUrl source={{ uri: item.avatar_url }} />
                                        <FollowerName>{item.login}</FollowerName>
                                    </FollowerInfo>
                                    {loading && (item.id == userId) && <ActivityIndicator style={{ alignSelf: 'center' }} />}
                                </Follower>
                            )}
                        />
                    )}
            </ContentUser>
        </Container>
    );
}
