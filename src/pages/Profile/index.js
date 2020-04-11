import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import AnimatedHeader from '../../Components/HeaderAnimated';

import { Container } from '../../Components/Container';

import { ButtonBack, ContentUser, BioUser, ActionsUser, Button, ButtonText } from './styles';

import api from '../../services/api';

export default function Profile({ navigation, route }) {

    const { user } = route.params;

    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [errorRepos, setErrorRepos] = useState(false);
    const [loadingRepos, setLoadingRepos] = useState(false);
    const [errorFollowers, setErrorFollowers] = useState(false);
    const [loadingFollowers, setLoadingFollowers] = useState(false);
    const [loadingAddToStore, setLoadingAddToStore] = useState(false);
    const [loadingDelToStore, setLoadingDelToStore] = useState(false);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        retriveData();
        getRepos();
        getFollowers();
    }, [exist, repos, followers]);

    const getRepos = async () => {

        setLoadingRepos(true);
        setErrorRepos(false);

        try {

            const response = await api.get(`/users/${user.login}/repos`);

            setRepos(response.data);

        } catch (error) {
            setErrorRepos(true);
            setLoadingRepos(false);
            alert(`getRepos: ${error.message}`);
            return;
        }

        setLoadingRepos(false);

    }

    const getFollowers = async () => {

        setLoadingFollowers(true);
        setErrorFollowers(false);

        try {

            const response = await api.get(`/users/${user.login}/followers`);

            setFollowers(response.data);

        } catch (error) {
            setErrorFollowers(true);
            setLoadingFollowers(false);
            alert(`getFollowers : ${error.message}`);
            return;
        }

        setLoadingFollowers(false);

    }

    const retriveData = async () => {

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var existTmp = false;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id === user.id) {
                    existTmp = true;
                }

            });

            if (existTmp) {
                setExist(true);
            } else {
                setExist(false);
            }

        } catch (error) {
            alert(`retriveData : ${error.message}`);
            return;
        }

    }

    const addUser = async () => {

        setLoadingAddToStore(true);

        try {

            var obj = {
                id: user.id,
                login: user.login,
                avatar_url: user.avatar_url,
                bio: user.bio
            }

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var array = json;

            var error = null;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id == user.id) {
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

                if (value.id != user.id) {
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

    const handleRepositories = () => navigation.navigate('Repositories', { repos, user: user.login });

    const handleFollowers = () => navigation.navigate('Followers', { followers, user: user.login });

    return (
        <Container style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AnimatedHeader
                style={{ flex: 1 }}
                title={user.login}
                renderLeft={() => (
                    <ButtonBack onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={25} color="#000" />
                    </ButtonBack>
                )}
                titleStyle={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    left: 10,
                    bottom: -30,
                    color: '#000'
                }}
                headerMaxHeight={300}
                parallax={true}
                imageSource={user.avatar_url}
                toolbarColor='#FFF'
                disabled={false}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ContentUser>
                        <BioUser>{user.bio}</BioUser>
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
                            {!errorRepos && <Button style={{ marginLeft: 2 }} disabled={loadingRepos} onPress={handleRepositories}>
                                {loadingRepos ? <ActivityIndicator /> : <ButtonText>Repositories</ButtonText>}
                            </Button>}
                            {!errorFollowers && <Button style={{ marginLeft: 2 }} disabled={loadingFollowers} onPress={handleFollowers}>
                                {loadingFollowers ? <ActivityIndicator /> : <ButtonText>Followers</ButtonText>}
                            </Button>}
                        </ActionsUser>
                    </ContentUser>
                </ScrollView>
            </AnimatedHeader>
        </Container>
    );
}
