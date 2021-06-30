import React, { ReactElement, useEffect, useState } from "react";
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import styled from 'styled-components';
import {getApi} from './lib/api'; //디폴트가 아니게 export할 때는 {}로 감싸줘야함 
import {reposApi} from './lib/reposApi';
import {User} from "../src/types";
import {Repos} from "../src/types";

export interface UserStateInterface {
  status: "idle" | "pending" | "resolved" | "rejected";
  data: User | null;
}
function App():ReactElement{ 
  const [isSearched,setIsSearched] = useState<true|false>(false);
  const [isClosed,setIsClosed] = useState<true|false>(false);
  const [userData, setUserData] = useState<UserStateInterface>({
    status: "idle",
    data: null,
  });
  const [userReposData,setUserReposData] = useState<Repos[]|null>(null);
  const MAX_REOPOSITORY = 10;
  const [cleanReposData,setCleanReposData]=useState<Repos[]|null>(null);

  const getData = async (userId:any) => {
    setUserData({...userData, status: "pending"});
    try{
      const data = await getApi(userId); 
      if (data === null) throw Error;
      setUserData({status:"resolved", data:data});
    }catch(e){
      setUserData({status:"rejected",data:null});
      console.log(e);
    }
  };

  const getReposData = async (userId :any) => {
    const reposData:any = await reposApi(userId);
    setUserReposData(reposData);
    if(reposData!==null ){
      if(reposData.length>MAX_REOPOSITORY){
        setCleanReposData(reposData.slice(-MAX_REOPOSITORY))
      } else{
        setCleanReposData(reposData);
      }
    }
  } 

  console.log(userReposData);
  console.log(cleanReposData);

  return (
    <Container>
    {!isSearched && <SearchBar getData={getData} setIsSearched={setIsSearched} setIsClosed={setIsClosed} getReposData={getReposData} setUserReposData={setUserReposData}/>}
    {!isClosed && <Result userData={userData} setIsSearched={setIsSearched} setIsClosed={setIsClosed} cleanReposData={cleanReposData}/>}
    </Container>
  )
}

export default App; //다른 컴포넌트에서 사용하기 위해선 export해줘야 함 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


