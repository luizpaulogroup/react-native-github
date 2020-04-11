import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #EEE;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
`;

export const Input = styled.TextInput`
  margin: 10px;
  height: 45px;
  padding: 5px 15px;
  font-size: 14px;
  align-self: stretch;
  border: solid 1px #EEE;
  border-radius: 5px;
  background: #FFF;
  color: #000;
`;

export const Button = styled.TouchableOpacity`
  margin: 10px;
  padding: 15px 15px;
  align-self: stretch;
  border: solid 1px #EEE;
  border-radius: 5px;
  background: #000;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
`;
