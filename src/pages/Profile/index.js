import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native';

import { Container, Button, ButtonText } from '../../Components/Container';

import { AvatarUrl, ContentUser, LoginUser, BioUser } from './styles';

import api from '../../services/api';

export default function Profile({ navigation, route }) {

    const { data } = route.params;

    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        getRepos();
    }, []);

    const getRepos = async () => {

        try {

            const response = await api.get(`/users/${data.login}/repos`);

            setRepos(response.data);

        } catch (error) {
            alert(error.message);
        }

    }

    const getFollowers = async () => {

        try {

            const response = await api.get(`/users/${data.login}/followers`);

            setFollowers(response.data);

        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AvatarUrl source={{ uri: data.avatar_url }} />
                <ContentUser>
                    <LoginUser>{data.login}</LoginUser>
                    <BioUser>{data.bio}</BioUser>
                </ContentUser>
                <ContentUser>
                    <Button onPress={() => navigation.navigate('Repositories', { repos, user: data.login })}>
                        <ButtonText>Repositories</ButtonText>
                    </Button>
                    <Button onPress={() => navigation.navigate('Followers', { followers, user: data.login })}>
                        <ButtonText>Followers</ButtonText>
                    </Button>
                </ContentUser>
            </ScrollView>
        </Container>
    );
}
