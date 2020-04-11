import styled from "styled-components/native";

export const ContentUser = styled.View`
    margin: 5px;
    padding: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FFF;
    align-items: center;    
`;

export const FollowerContent = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Follower = styled.View`
    width: 45%;
    margin: 2px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #FFF;
    border-radius: 10px;
`;

export const FollowerAvatarUrl = styled.Image`
    width: 100%;
    height: 150px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const FollowerName = styled.Text`
    padding: 5px;
    align-self: center;
    font-size: 12px;
    color: #444;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;