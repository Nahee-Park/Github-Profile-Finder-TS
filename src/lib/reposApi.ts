import axios from "axios";
//axios는 promise API를 활용하는 HTTP 비동기 통신 라이브러리 -> get) Url에 존재하는 자원에 요청 / post) 생성파일을 서버에다가 업로드 / delete) DB에 저장된 내용 삭제 / PUT) 디비에 저장되어 있는 내용 갱신
import { Repos } from "../types";

//async가 붙으면 항상 promise가 호출됨.
//await는 async 안에 있으며, 비동기 처리를 하는 메서드 앞에 붙인다
//name으로 받는 것은 깃허브 아이디
export const reposApi = async (name: string): Promise<Repos | null> => {
  //axios.get을 이용해 url에 존제하는 자원을 요청
  try {
    const { data } = await axios.get<Repos>("https://api.github.com/users/"+name+"/repos");
    console.log("[SUCCESS] GET user's repository data", data);
    return data;
  } catch (e) {
    console.log("[FAIL] GET user's repository data", e);
    return null;
  }
};
