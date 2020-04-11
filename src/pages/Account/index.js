import React, { useEffect, useState } from 'react';
import { FlatList, Text, AsyncStorage, ActivityIndicator } from 'react-native';

import { Container, Title } from '../../Components/Container';

import { ContentUser, User, UserInfo, UserAvatarUrl, UserName, Button, ButtonText } from './styles';

export default function Account({ navigation }) {

    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [loadingDelToStore, setLoadingDelToStore] = useState(false);

    useEffect(() => {
        retriveData();
    }, [userId]);

    const retriveData = async () => {

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            setUsers(json);

        } catch (error) {
            console.log(error);
        }

    }

    const delUser = async id => {

        setUserId(id);
        setLoadingDelToStore(true);

        try {

            const storage = await AsyncStorage.getItem('STORE');

            var json = JSON.parse(storage);

            var array = [];

            var counter = 0;

            Object.entries(json).forEach(([key, value]) => {

                if (value.id != id) {
                    array[counter] = value;

                    counter++;
                }

            });

            await AsyncStorage.setItem('STORE', JSON.stringify(array));

            console.log('User successfully removed from your list');

        } catch (error) {
            console.log(error);
            setLoadingDelToStore(false);
        }

        setUserId(0);

    }

    return (
        <Container style={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ContentUser>
                <Text style={{ color: '#999' }}>Account</Text>
                <Title style={{ marginBottom: 10 }}>Users</Title>
            </ContentUser>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: 'stretch' }}
                data={users}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <User onPress={() => navigation.navigate('Profile', {
                        user: {
                            id: item.id,
                            login: item.login,
                            avatar_url: item.avatar_url,
                            bio: item.bio
                        },
                        refresh: true
                    })}>
                        <UserInfo>
                            <UserAvatarUrl source={{ uri: item.avatar_url }} />
                            <UserName>{item.login}</UserName>
                        </UserInfo>
                        <Button disabled={loadingDelToStore && (userId == item.id)} onPress={() => delUser(item.id)}>
                            {loadingDelToStore && (userId == item.id) ? <ActivityIndicator /> : <ButtonText>Remover</ButtonText>}
                        </Button>
                    </User>
                )}
            />
        </Container>
    );
}
