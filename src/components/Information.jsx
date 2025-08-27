import { useDetailPage, useDetailResult } from "../store";
import { VscPinned } from "react-icons/vsc";


export function Information () {
    const detailResult = useDetailResult((s)=> s.detailResult);
    const setIsDetailPage = useDetailPage((s)=>s.setIsDetailPage);
    // const detailImageUrl = detailResult.photos?.[0].getUrl({ maxWidth: 300 });
    console.log("상세정보:", detailResult);
  
  return (<>
    <div
      className="border border-gray-400 w-[50rem] h-[20rem] bg-[#fefefb] overflow-y-scroll"
    >
      <div className="flex justify-between">
        <div 
          onClick={()=>setIsDetailPage(false)}
          className="text-4xl">X</div>
        <VscPinned size={50}/>
      </div>
      <div className="">
        <p>{detailResult.types}</p>
        <p className="text-5xl">{detailResult.name}</p>
        <p>{detailResult.formatted_address}</p>
        <p>영업
          {detailResult?.opening_hours?.isOpen()
              ? "중"
              : "종료"
            }
        </p>
        {detailResult.opening_hours?.weekday_text 
        && detailResult.opening_hours.weekday_text.map((d, i)=> <p key={i}>{d}</p>)}
        <p>★{detailResult.rating}</p>
        <p>총 리뷰 {detailResult.user_ratings_total}개</p>
        {detailResult.reviews?.length > 1
        && detailResult.reviews.map((r, i)=><p key={i}>{r.text}</p>)}
      </div>
    </div>
  </>)
}