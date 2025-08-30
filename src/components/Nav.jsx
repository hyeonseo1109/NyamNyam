import { useEffect } from "react";
import { useMenu } from "../store";
import LogoutButton from "./LogoutButton";
import { Search } from "./Search";
// import { Sort } from "./Sort";
import { MdOutlineMenu } from "react-icons/md";
import Menu from "./Menu";

export function Nav () {
  const setIsMenu = useMenu((s)=>s.setIsMenu);
  const isMenu = useMenu((s)=>s.isMenu);

  useEffect(()=> {
    console.log("메뉴상태:", isMenu)
  }, [isMenu]);

  return (<>
  <div className="flex gap-10 justify-between">
    <div>
      {/* <Sort/> */}
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
      <LogoutButton />
    </div>
  </div>


  </>)
}