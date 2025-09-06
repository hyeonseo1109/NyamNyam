import { useEffect } from "react";
import { useDetailPage, useMenu, useMyPage } from "../store";
import { Search } from "./Search";
import { MdOutlineMenu } from "react-icons/md";
import Menu from "./Menu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import MyPage from "./My";

export function Nav() {
  const setIsMenu = useMenu((s) => s.setIsMenu);
  const isMenu = useMenu((s) => s.isMenu);
  const setIsMyPage = useMyPage((s) => s.setIsMyPage);
  const isMyPage = useMyPage((s) => s.isMyPage);
  const setIsDetailPage = useDetailPage((s) => s.setIsDetailPage);

  useEffect(() => {
    setIsDetailPage(false);
  }, [isMyPage]);

  return (
    <>
      <div className="flex gap-10 justify-between items-center">
        <div className="flex gap-5 relative">
          {/* 아이콘 + 로고 */}
          <div className="flex gap-4 items-center h-auto relative">
            <MdOutlineMenu
              size={35}
              onClick={() => setIsMenu(!isMenu)}
              className="cursor-pointer"
            />
            <img 
              src="/longLogo.png" 
              className="w-[13rem] h-[2.5rem]" 
              // onClick={()=>map.panTo({ lat, lng })}
            />

            {/* 메뉴 */}
            {isMenu && (
              <div className="absolute top-12 left-0 z-1000">
                <Menu />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          {/* 검색창 */}
          <Search />
          <div className="flex gap-10 relative">
            <div className="absolute z-100 right-0 top-11">
              {isMyPage && <MyPage />}  
            </div>
            {/* 마이페이지 */}
            {!isMyPage ? (
              <IoPersonCircleOutline
                size={35}
                onClick={() => setIsMyPage(!isMyPage)}
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineClose
                size={30}
                onClick={() => setIsMyPage(!isMyPage)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
