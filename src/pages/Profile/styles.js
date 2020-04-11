import styled from "styled-components/native";

export const ButtonBack = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const ContentUser = styled.View`
    padding: 5px;
    align-self: stretch;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #FFF;
    align-items: center;    
`;

export const BioUser = styled.Text`
    margin-top: 25px;
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
