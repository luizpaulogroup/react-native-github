import styled from "styled-components/native";

export const ButtonBack = styled.TouchableOpacity`
    margin: 10px;
    padding: 5px;
    border-radius: 25px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
    position: absolute;
    z-index: 999;
    left: 10px;
    top: 10px;
    background: #FFF;
`;

export const AvatarUrl = styled.Image`
    margin: 10px;
    align-self: stretch;
    height: 300px;
    border-radius: 10px;
`;

export const ContentUser = styled.View`
    margin: 5px;
    padding: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FFF;
    align-items: center;    
`;

export const LoginUser = styled.Text`
    color: #999;
    font-weight: bold;
`;

export const BioUser = styled.Text`
    margin-top: 5px;
    margin-bottom: 5px;
    color: #999;
`;

export const ActionsUser = styled.View`
    margin: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FFF;
    display: flex;   
    flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  padding: 5px 12px;
  align-self: stretch;
  border: solid 1px #EEE;
  border-radius: 5px;
  background: #FFF;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 12px;
`;
