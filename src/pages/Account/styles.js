import styled from "styled-components/native";

export const ContentUser = styled.View`
    margin: 5px;
    padding: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FFF;
    align-items: center;    
`;

export const User = styled.TouchableOpacity`
    align-self: stretch;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px;
    border-color: #999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #FFF;
`;

export const UserInfo = styled.View`
    color: #000;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const UserAvatarUrl = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 50px;
`;

export const UserName = styled.Text`
    color: #444;
    font-size: 18px;
    font-weight: bold;
    margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
  padding: 8px;
  border: solid 1px #EEE;
  border-radius: 25px;
  background: #000;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
`;
