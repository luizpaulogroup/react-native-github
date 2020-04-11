import styled from "styled-components/native";

export const ContentUser = styled.View`
    margin: 5px;
    padding: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FFF;
    align-items: center;    
`;

export const Repo = styled.View`
    align-self: stretch;
    margin: 5px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border-color: #999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #FFF;
`;

export const RepoName = styled.Text`
    color: #444;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const RepoInfo = styled.View`
    display: flex;
    align-self: stretch;
    align-items: center;
    flex-direction: row;
`;

export const RepoFork = styled.View`
    width: 33.3%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RepoWatchers = styled.View`
    width: 33.3%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RepoStargazers = styled.View`
    width: 33.3%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RepoInfoTitle = styled.Text`
    color: #999;
`;

export const RepoInfoData = styled.Text`
    color: #000;
`;