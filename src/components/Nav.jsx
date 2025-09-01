import { useEffect } from "react";
import { useDetailPage, useMenu, useMyPage } from "../store";
import { Search } from "./Search";
import { MdOutlineMenu } from "react-icons/md";
import Menu from "./Menu";
import MyPage from "./Mypage";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

export function Nav () {
  const setIsMenu = useMenu((s)=>s.setIsMenu);
  const isMenu = useMenu((s)=>s.isMenu);
  const setIsMyPage = useMyPage((s)=>s.setIsMyPage);
  const isMyPage = useMyPage((s)=>s.isMyPage);
  const setIsDetailPage = useDetailPage((s)=>s.setIsDetailPage);
  

  useEffect(()=> {
    console.log("메뉴상태:", isMenu)
  }, [isMenu]);

    useEffect(()=> {
    console.log("마이페이지상태:", isMyPage)
  }, [isMyPage]);

  useEffect(()=> {
      setIsDetailPage(false);
  }, [isMyPage]);


  return (<>
  <div className="flex gap-10 justify-between">
    <div>
      <MdOutlineMenu 
        size={30}
        onClick={()=>
          setIsMenu(!isMenu)
        }
      />
      { isMenu && <Menu/>}
      
    </div>
    <div className="flex gap-10">
      <Search/> 
      { isMyPage && <MyPage/>}
      { !isMyPage ? 
        <IoPersonCircleOutline 
          size={30}
          onClick={()=>setIsMyPage(!isMyPage)}
        />
      : 
      <AiOutlineClose 
        onClick={()=> {
          setIsMyPage(!isMyPage)
        }}
      />}
    </div>
  </div>


  </>)
}