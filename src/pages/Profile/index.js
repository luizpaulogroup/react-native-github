import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Container } from '../../Components/Container';

import {
    ButtonBack,
    AvatarUrl,
    ContentUser,
    LoginUser,
    BioUser,
    ActionsUser,
    Button,
    ButtonText
} from './styles';

import api from '../../services/api';

export default function Profile({ navigation, route }) {

    const { data } = route.params;

    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingAddToStore, setLoadingAddToStore] = useState(false);
    const [loadingDelToStore, setLoadingDelToStore] = useState(false);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        getRepos();
        getFollowers();
        retriveData();
    }, [exist]);

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

    const retriveData = async () => {

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            Object.entries(json).forEach(([key, value]) => {

                if (value.id === data.id) {
                    setExist(true);
                }

            });

        } catch (error) {
            console.log(error);
        }

    }

    const addUser = async () => {

        setLoadingAddToStore(true);

        try {

            var obj = {
                id: data.id,
                login: data.login,
                avatar_url: data.avatar_url,
                bio: data.bio
            }

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var array = json;

            var error = null;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id == data.id) {
                    alert('Você já adicionou esse usuário na sua lista');
                    error = true;
                }

            });

            if (!error) {

                console.log('User successfully added to your list');

                array.push(obj);

                await AsyncStorage.setItem('STORE', JSON.stringify(array));

                setExist(true);

            }

        } catch (error) {
            console.log(error);
        }

        setLoadingAddToStore(false);

    }

    const delUser = async () => {

        setLoadingDelToStore(true);

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var array = [];

            var counter = 0;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id != data.id) {
                    array[counter] = value;
                    counter++;
                }

            });

            await AsyncStorage.setItem('STORE', JSON.stringify(array));

            setExist(false);

            console.log('User successfully removed from your list');

        } catch (error) {
            console.log(error);
        }

        setLoadingDelToStore(false);

    }

    const handleRepositories = () => navigation.navigate('Repositories', { repos, user: data.login });

    const handleFollowers = () => navigation.navigate('Followers', { followers, user: data.login });

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ButtonBack onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={25} color="#000" />
                </ButtonBack>
                <AvatarUrl source={{ uri: data.avatar_url }} />
                <ContentUser>
                    <LoginUser>{data.login}</LoginUser>
                    <BioUser>{data.bio}</BioUser>
                    <ActionsUser>
                        {exist ? (
                            <Button style={{ backgroundColor: '#FFF' }} disabled={loadingDelToStore} onPress={delUser}>
                                {loadingDelToStore ? <ActivityIndicator /> : <ButtonText>Following</ButtonText>}
                            </Button>
                        ) : (
                                <Button style={{ backgroundColor: '#1976D2' }} disabled={loadingAddToStore} onPress={addUser}>
                                    {loadingAddToStore ? <ActivityIndicator /> : <ButtonText style={{ color: '#FFF' }}>Follow</ButtonText>}
                                </Button>
                            )}
                        <Button style={{ marginLeft: 2 }} disabled={loading} onPress={handleRepositories}>
                            {loading ? <ActivityIndicator /> : <ButtonText>Repositories</ButtonText>}
                        </Button>
                        <Button style={{ marginLeft: 2 }} disabled={loading} onPress={handleFollowers}>
                            {loading ? <ActivityIndicator /> : <ButtonText>Followers</ButtonText>}
                        </Button>
                    </ActionsUser>

                </ContentUser>
            </ScrollView>
        </Container>
    );
}
