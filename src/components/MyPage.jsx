import { useDetailPage, useDetailPlaceId, useLikedIdResult } from "../store";
import LogoutButton from "./LogoutButton";

export default function MyPage () {
  const likedIdResult = useLikedIdResult((s)=>s.likedIdResult);
  const setDetailPlaceId = useDetailPlaceId((s)=>s.setDetailPlaceId);
  const setIsDetailPage = useDetailPage((s)=>s.setIsDetailPage);
  return (<>
    <div className="flex flex-col bg-[#fefefb] border w-[14rem] h-auto fixed z-10 gap-5 py-5 items-center rounded-[0.4rem]">
      <LogoutButton />
      <div className="bg-black h-[0.1rem] w-full"></div>
      <div>찜한 가게</div>
      { likedIdResult.length > 0 ?
      likedIdResult.map((result, idx) => 
      <div 
        key={idx}
        onClick={() => {
              setDetailPlaceId(result.place_id);
              setIsDetailPage(true);
            }}
      >{result.name}</div>)
      : <div>-</div>
      }
    </div>
  </>)
}