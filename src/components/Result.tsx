import React from 'react';
import UserCard from './UserCard';
import styled from 'styled-components';
import { UserStateInterface } from '../App';
import { Repos } from '../types';

// setter함수는 그 타입 지정을 어떻게 해야 ...? 반환값?

interface ResultProps{
    userData:UserStateInterface; 
    setIsSearched:any; 
    setIsClosed:any; 
    cleanReposData:Repos[]|null;
}
const Result: React.FC<ResultProps> = ({userData,setIsSearched,setIsClosed,cleanReposData}:ResultProps) => {
    const {status,data} = userData; //구조분해할당해서 userData를 변수에 나눠받음

    switch(status){
        case "pending":
            setIsSearched(true);
            return <ResultStyle>
                <div className="pending status" >Loading...</div>;
            </ResultStyle>
        case "resolved":
            setIsSearched(true);
            return <ResultStyle>
                <UserCard data={data} setIsClosed={setIsClosed} setIsSearched={setIsSearched} cleanReposData={cleanReposData}/>
            </ResultStyle>
        case "rejected":
            setIsSearched(true);
            return (
                <ResultStyle>
                    <UserCard  data={null} setIsClosed={setIsClosed} setIsSearched={setIsSearched}>User Not Found</UserCard>
                </ResultStyle>
            );
        case "idle":
            default:
                return <div></div>;
    }
};

export default Result;

const ResultStyle = styled.div`
.status{
    font-family: Noto Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 132.5%;
    /* or 26px */
    color: #DBDBDB;
    transition: 1s;
}
`;