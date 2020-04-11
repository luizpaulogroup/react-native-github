import React, { useEffect, useState } from 'react';

import { ScrollView, ActivityIndicator } from 'react-native';

import { Container, Button, ButtonText } from '../../Components/Container';

import { AvatarUrl, ContentUser, LoginUser, BioUser } from './styles';

import api from '../../services/api';

export default function Profile({ navigation, route }) {

    const { data } = route.params;

    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRepos();
        getFollowers();
    }, []);

    const getRepos = async () => {

        setLoading(true);

        try {

            const response = await api.get(`/users/${data.login}/repos`);

            setRepos(response.data);

        } catch (error) {
            alert(error.message);
        }

        setLoading(false);

    }

    const getFollowers = async () => {

        setLoading(true);

        try {

            const response = await api.get(`/users/${data.login}/followers`);

            setFollowers(response.data);

        } catch (error) {
            alert(error.message);
        }

        setLoading(false);

    }

    const handleRepositories = () => navigation.navigate('Repositories', { repos, user: data.login });

    const handleFollowers = () => navigation.navigate('Followers', { followers, user: data.login });

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AvatarUrl source={{ uri: data.avatar_url }} />
                <ContentUser>
                    <LoginUser>{data.login}</LoginUser>
                    <BioUser>{data.bio}</BioUser>
                </ContentUser>
                <ContentUser>
                    <Button disabled={loading} onPress={handleRepositories}>
                        {loading ? <ActivityIndicator /> : <ButtonText>Repositories</ButtonText>}
                    </Button>
                    <Button disabled={loading} onPress={handleFollowers}>
                        {loading ? <ActivityIndicator /> : <ButtonText>Followers</ButtonText>}
                    </Button>
                </ContentUser>
            </ScrollView>
        </Container>
    );
}
