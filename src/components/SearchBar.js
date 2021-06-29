import React, { useState  } from 'react';
import styled from 'styled-components';
import searchIcon from '../images/search-icon.svg';
import closeIcon from '../images/closeIcon2.svg';
import timeIcon from '../images/time-icon.svg';

const MAX_NUM = 3; 

const SearchBar = ({getData,setIsSearched,setIsClosed,getReposData,setUserReposData}) => {
    const [userName, setUserName] = useState(null);
    const [userNameList,setUserNameList] = useState(
        JSON.parse(localStorage.getItem("userName") || "[]")
    );
    const [userHistory,setUserHistory] = useState(false);
    // const [userRepos,setUserRepos] =useState(false);
    let hide = true;

    //입력창에 들어오는 값 하나하나 받아들임. 그 값이 타겟값이고 그 값을  userName 으로 넘겨줌 (state변수)
    const ChangeHandeler = (event) => {
        // event.preventDefault();
        setUserName(event.target.value);
        // setUserReposData(event.target.value);
    }

    const saveUserName= (userNameList)=>{
        const userNameSet = new Set(userNameList);
        const userNameFilter = [...userNameSet];
        if(userNameFilter.length>MAX_NUM){
            localStorage.setItem("userName",JSON.stringify(userNameFilter.slice(-3)));
        }else{
            localStorage.setItem("userName",JSON.stringify(userNameFilter));
        }
    }

    //엔터치는 순간 그 당시의 userName값을 getData로 넘김 -> getData는 부모컴포넌트의 state값을 바꿈 
    const submitHandler = (event) => {
        event.preventDefault();
        getData(userName);
        getReposData(userName);
        setIsSearched(true);
        setIsClosed(false);
        setUserNameList([...userNameList,userName]);
        // saveUserName(userNameList); 비동기적으로 실행되므로 이렇게 하면 아직 useState값 적용 안되어 있어서 한발짝 느리다 
        saveUserName([...userNameList, userName]);
    }

    const localStorageClick = (nameList) =>{
        getData(nameList);
        getReposData(nameList);
        setIsSearched(true);
        setIsClosed(false);
    }

    const DeleteName = (nameList,userNameList) =>{
        const cleanNameList = userNameList.filter((eachName)=>{
            return eachName !== nameList
        });
        // console.log(cleanNameList);
        // saveUserName(cleanNameList);
        localStorage.setItem("userName",JSON.stringify(cleanNameList));
        setUserNameList(cleanNameList);
    }
    const appearUserHistory = (event) => {
        setUserHistory(true);
    }

    const hideUserHistory = (event) => {
        if(hide){
            setUserHistory(false);
        }
    }

    const notHide = (event) =>{
        hide = false;
    }

    const goHide = (event) =>{
        hide = true;
    }

    return(
        <SearchBarWrap>
            <form onSubmit={submitHandler}>
                <img src={searchIcon} />    
                <input type="text" value={userName} onChange={ChangeHandeler} placeholder="Github ID를 입력해주세요" onClick={appearUserHistory} onBlur={hideUserHistory}>
                </input>
            </form>
            {userHistory && <div className="historyRec" onMouseEnter={notHide} onMouseLeave={goHide}>
                {userNameList.map((nameList)=>
                    <HistoryCover >
                            <div className="historyContainer">
                                <img src={timeIcon} className="timeIcon"/>
                                <li className="nameHistory" onClick={()=>localStorageClick(nameList)} onChange={ChangeHandeler}>{nameList}</li>
                                <img value={nameList} onClick={()=>DeleteName(nameList,userNameList)} src={closeIcon} className="closeIcon" setIsClosed={setIsClosed}/>
                            </div>
                    </HistoryCover>
                )}
                </div>}
        </SearchBarWrap>
    );
}

export default SearchBar;

const SearchBarWrap = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    form{
        width: 591px;
        height: 69px;
        border: 8px solid rgba(105, 105, 105, 0.5);
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        background: #414141;
        display: flex;
        align-items: center;
    }
    img{
        margin-left: 24px;
        z-index: 1;
    }


    input{
        margin-left: 24px;
        width: 515px;
        height: 26px;   
        background-color: transparent;
        border: none;
        outline: none;
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 1.25rem;
        line-height: 132.5%;
        /* or 26px */

        display: flex;
        align-items: center;
        color: #F9F9F9;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    input::placeholder {
        color: #F9F9F9;
    }
    input:focus {
        outline: none;
    }
    .historyRec{
        position: fixed;
        display: flex;
        flex-direction: column;
        background-color: #414141;
        width: 560px;
        /* max-height: 138px; */
        box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.25);
        margin-top:70px;
        animation-name: movingHistory;
        animation-duration: 0.3s;
    }

        @keyframes movingHistory{
            from {
                transform: translateY(-10%);
                opacity: 1;
            } to {
                transform: translateY(0);
                opacity: 1;
            }   
        }
`;

const HistoryCover = styled.div`
    display: flex;
    
    /* background-color: #414141;
    width: 591px; */

    .historyContainer{
        margin-top: 8px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 591px;
        overflow: hidden;
    }
    .closeIcon{
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer; 
        margin-right: 10px;
    }
    .timeIcon{
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 20px;
    }
    li{
        list-style: none;
    }
    .nameHistory{
        font-size: 1.2rem;
        width: 410px;
        color: #F9F9F9;
        padding-bottom: 7px;
        cursor: pointer;
    }
`;