import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import AnimatedHeader from '../../Components/HeaderAnimated';

import { Container } from '../../Components/Container';

import { ButtonBack, ContentUser, BioUser, ActionsUser, Button, ButtonText } from './styles';

export default function Profile({ navigation, route }) {

    const { user, refresh } = route.params;

    const [exist, setExist] = useState(false);
    const [update, setUpdate] = useState(0);
    const [loadingAddToStore, setLoadingAddToStore] = useState(false);
    const [loadingDelToStore, setLoadingDelToStore] = useState(false);

    if (refresh) {
        retriveData();
    }

    async function retriveData() {

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
                setUpdate(update + 1);

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
            setUpdate(update + 1);

            console.log('User successfully removed from your list');

        } catch (error) {
            console.log(error);
        }

        setLoadingDelToStore(false);

    }

    const handleRepositories = () => navigation.navigate('Repositories', { user: user.login });

    const handleFollowers = () => navigation.navigate('Followers', { user: user.login });

    return (
        <Container style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AnimatedHeader
                style={{ flex: 1, alignSelf: 'stretch' }}
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
                            <Button style={{ marginLeft: 2 }} onPress={handleRepositories}>
                                <ButtonText>Repositories</ButtonText>
                            </Button>
                            <Button style={{ marginLeft: 2 }} onPress={handleFollowers}>
                                <ButtonText>Followers</ButtonText>
                            </Button>
                        </ActionsUser>
                    </ContentUser>
                </ScrollView>
            </AnimatedHeader>
        </Container>
    );
}
