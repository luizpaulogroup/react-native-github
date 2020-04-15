import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, AsyncStorage, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import AnimatedHeader from '../../Components/HeaderAnimated';

import { Container } from '../../Components/Container';

import { ButtonBack, ContentUser, BioUser, ActionsUser, Button, ButtonText } from './styles';

import api from '../../services/api';

function Profile({ navigation, route }) {

    const { user, refresh } = route.params;

    const [exec, setExec] = useState(false);
    const [exist, setExist] = useState(false);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [update, setUpdate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingAddToStore, setLoadingAddToStore] = useState(false);
    const [loadingDelToStore, setLoadingDelToStore] = useState(false);

    if (refresh) { }

    useEffect(() => {

        retriveData().then(() => {
            getAllUsers();
        });

        setExec(true);

        setTimeout(() => setLoading(false), 1200);

    })

    async function getAllUsers() {

        if (exec) {
            return;
        }

        try {

            var since = Math.ceil(Math.random() * 764);

            const response = await api.get(`/users?since=${since}`);

            setUsers(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    async function retriveData() {

        if (exec) {
            return;
        }

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

    const addUserByList = async _user => {

        setLoadingAddToStore(true);
        setUserId(_user.id);

        try {

            var obj = {
                id: _user.id,
                login: _user.login,
                avatar_url: _user.avatar_url,
                bio: _user.bio
            }

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var error = false;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id == _user.id) {
                    error = true;
                }

            });

            if (!error) {

                console.log('User successfully added to your list');

                json.push(obj);

                await AsyncStorage.setItem('STORE', JSON.stringify(json));

            }

            _storage(_user);

        } catch (error) {
            setLoadingAddToStore(false);
            console.log(error);
        }

        setLoadingAddToStore(false);

    }

    const _storage = async _user => {

        try {

            var array = users.filter(item => item.id != _user.id);

            setUsers(array);

            if (array.length == 0) {

                var since = Math.ceil(Math.random() * 764);

                const response = await api.get(`/users?since=${since}`);

                setUsers(response.data);

            }

        } catch (error) {
            console.log(error);
        }

    }

    const addUser = async (id = null) => {

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
                setUpdate(update + 1);

            }

        } catch (error) {
            setLoadingAddToStore(false);
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
            setUpdate(update + 1);

            console.log('User successfully removed from your list');

        } catch (error) {
            setLoadingDelToStore(false);
            console.log(error);
        }

        setLoadingDelToStore(false);

    }

    const handleRepositories = () => navigation.navigate('Repositories', { user: user.login });

    const handleFollowers = () => navigation.navigate('Followers', { user: user.login });


    if (loading) {
        return (
            <Container style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator />
            </Container>
        )
    }

    return (
        <Container style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AnimatedHeader
                style={{ flex: 1, alignSelf: 'stretch', zIndex: 999 }}
                title={user.login}
                renderLeft={() => (
                    <ButtonBack onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
                    </ButtonBack>
                )}
                titleStyle={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    left: 10,
                    bottom: -30,
                    color: '#000'
                }}
                headerMaxHeight={420}
                parallax={true}
                imageSource={user.avatar_url}
                toolbarColor='#FFF'
                disabled={false}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ContentUser>
                        <BioUser><Text style={{ color: '#000', fontWeight: 'bold' }}>Bio:</Text> {user.bio}</BioUser>
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
                            <Button style={{ marginLeft: 2 }} onPress={handleRepositories}>
                                <ButtonText>Repositories</ButtonText>
                            </Button>
                            <Button style={{ marginLeft: 2 }} onPress={handleFollowers}>
                                <ButtonText>Followers</ButtonText>
                            </Button>
                        </ActionsUser>
                    </ContentUser>
                    <View style={{ alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ color: '#999', fontWeight: 'bold' }}>Sugestões</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ padding: 10 }}>
                        {users.map(user => (
                            <View
                                key={user.id}
                                style={{
                                    margin: 5,
                                    padding: 10,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50
                                    }}
                                    resizeMode="contain"
                                    source={{ uri: user.avatar_url }} />
                                <Text style={{ color: '#999', marginTop: 5 }}>{user.login}</Text>
                                <Button style={{ backgroundColor: '#1976D2', marginTop: 5 }} disabled={loadingAddToStore} onPress={() => addUserByList(user)}>
                                    {loadingAddToStore && (userId == user.id) ? <ActivityIndicator /> : <ButtonText style={{ color: 'white' }}>Follow</ButtonText>}
                                </Button>
                            </View>
                        ))}
                    </ScrollView>
                </ScrollView>
            </AnimatedHeader>
        </Container >
    );
}

export default Profile;