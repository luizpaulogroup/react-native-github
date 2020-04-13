import React, { useEffect, useState } from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Container, Title } from '../../Components/Container';

import {
    ContentUser,
    Repo,
    RepoName,
    RepoInfo,
    RepoFork,
    RepoWatchers,
    RepoStargazers,
    RepoInfoTitle,
    RepoInfoData
} from './styles';

import api from '../../services/api';

export default function Repositories({ navigation, route }) {

    const { user } = route.params;

    const [repos, setRepos] = useState([]);
    const [loadingRepos, setLoadingRepos] = useState(false);

    useEffect(() => { getRepos() }, []);

    async function getRepos() {

        setLoadingRepos(true);

        try {

            const response = await api.get(`/users/${user}/repos`);

            setRepos(response.data);

        } catch (error) {
            setLoadingRepos(false);
            alert(`getRepos: ${error.message}`);
            return;
        }

        setLoadingRepos(false);

    }

    return (
        <Container>
            <ContentUser>
                <Text style={{ color: '#999' }}>Repositories</Text>
                <Title style={{ marginBottom: 10 }}>{user}</Title>
            </ContentUser>
            {loadingRepos ? (
                <View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator />
                </View>
            ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ alignSelf: 'stretch' }}
                        data={repos}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <Repo>
                                <RepoName>{item.name}</RepoName>
                                <RepoInfo>
                                    <RepoFork>
                                        <MaterialCommunityIcons name="usb" color="#999" size={20} />
                                        <RepoInfoTitle>Forks</RepoInfoTitle>
                                        <RepoInfoData>{item.forks}</RepoInfoData>
                                    </RepoFork>
                                    <RepoWatchers>
                                        <MaterialCommunityIcons name="eye" color="#999" size={20} />
                                        <RepoInfoTitle>Watchers</RepoInfoTitle>
                                        <RepoInfoData>{item.watchers}</RepoInfoData>
                                    </RepoWatchers>
                                    <RepoStargazers>
                                        <MaterialCommunityIcons name="star" color="#999" size={20} />
                                        <RepoInfoTitle>Stargazers</RepoInfoTitle>
                                        <RepoInfoData>{item.stargazers_count}</RepoInfoData>
                                    </RepoStargazers>
                                </RepoInfo>
                            </Repo>
                        )}
                    />
                )}
        </Container>
    );
}
