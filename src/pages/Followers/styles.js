import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

export const ContentUser = styled.View`
    flex: 1;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    background: #FFF;
    align-items: center;    
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const Follower = styled.TouchableOpacity`
    align-self: stretch;
    padding: 10px;
    display: flex;
    flex-direction: row;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    background: #FFF;
    border-radius: 5px;
`;

export const FollowerAvatarUrl = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 25px;
`;

export const FollowerName = styled.Text`
    padding: 5px;
    align-self: center;
    font-size: 12px;
    color: #444;
`;