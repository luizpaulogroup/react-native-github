import React from 'react';
import { FlatList } from 'react-native';
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

export default function Repositories({ navigation, route }) {

    const { repos, user } = route.params;

    console.log(repos);

    return (
        <Container>
            <ContentUser>
                <Title style={{ margin: 10 }}>{user}</Title>
            </ContentUser>
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
        </Container>
    );
}
