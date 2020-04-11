import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Container, Button, ButtonText } from '../../Components/Container';

import { AvatarUrl, ContentUser, LoginUser, BioUser } from './styles';

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
        _retriveData();
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

    const _retriveData = async () => {

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            console.log(json)

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

                alert('Usuário adicionado na sua lista com sucesso');

            }

        } catch (error) {
            console.log(error);
        }

        setLoadingAddToStore(false);

    }

    const delUser = async () => {

        setLoadingDelToStore(true);

        try {

            var obj = {
                id: data.id,
                login: data.login,
                avatar_url: data.avatar_url,
                bio: data.bio
            }

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var array = [];

            var counter = 0;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id != data.id) {
                    array[counter] = value;
                }

            });

            await AsyncStorage.setItem('STORE', JSON.stringify(array));
            
            setExist(false);

            alert('Usuário removido da sua lista com sucesso');

            console.log('User successfully removed from your list');
            
        } catch (error) {
            console.log(error);
        }

        setLoadingDelToStore(false);

    }

    const handleRepositories = () => navigation.navigate('Repositories', { repos, user: data.login });

    const handleFollowers = () => navigation.navigate('Followers', { followers, user: data.login });

    console.log(exist);

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AvatarUrl source={{ uri: data.avatar_url }} />
                <ContentUser>
                    <LoginUser>{data.login}</LoginUser>
                    <BioUser>{data.bio}</BioUser>
                </ContentUser>
                <ContentUser>
                    {exist ? (
                        <Button style={{ backgroundColor: 'red' }} disabled={loadingDelToStore} onPress={delUser}>
                            {loadingDelToStore ? <ActivityIndicator /> : <ButtonText>Remover da minha lista</ButtonText>}
                        </Button>
                    ) : (
                            <Button style={{ backgroundColor: 'green' }} disabled={loadingAddToStore} onPress={addUser}>
                                {loadingAddToStore ? <ActivityIndicator /> : <ButtonText>Salvar na minha lista</ButtonText>}
                            </Button>
                        )}
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
