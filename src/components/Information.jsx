import { useState } from "react";
import { useDetailPage, useDetailResult } from "../store";
import Like from "./Like";

function translateType(type) {
  switch(type) {
    case "restaurant": return "#음식점";
    case "cafe": return "#카페";
    case "bar": return "#술집";
    case "bakery": return "#베이커리";
    case "meal_takeaway": return "#포장 전문";
    case "meal_delivery": return "#배달";
    case "food": return "#음식";
    case "grocery_or_supermarket": return "#슈퍼마켓";
    case "convenience_store": return "#편의점";
  }
}

export function Information () {
    const detailResult = useDetailResult((s)=> s.detailResult);
    const setIsDetailPage = useDetailPage((s)=>s.setIsDetailPage);
    // const detailImageUrl = detailResult.photos?.[0].getUrl({ maxWidth: 300 });
    console.log("상세정보:", detailResult);
    const [page, setPage] = useState(0);
  
  return (<>
    <div
      className="border border-gray-400 w-[40rem] h-[20rem] bg-[#fefefb] overflow-y-scroll flex flex-col items-center"
    >
      <div className="flex justify-between">
        <div 
          onClick={()=>setIsDetailPage(false)}
          className="text-4xl absolute left-0 top-0 cursor-pointer">X</div>
        <Like/>
      </div>
      <div>
        <div className="flex justify-center gap-3">
          {detailResult.types && detailResult.types.map((t, i)=> <p key={i}>{translateType(t)}</p>)}
        </div>
        <p className="text-5xl">{detailResult.name}</p>
        <p>{detailResult.formatted_address}</p>

        <p>
          영업 {detailResult?.opening_hours?.isOpen() ? "중" : "종료"}
        </p>

        {detailResult.opening_hours?.weekday_text 
        && detailResult.opening_hours.weekday_text.map((d, i)=> <p key={i}>{d}</p>)}
        <span>★{detailResult.rating}  / </span>
        <span>(총 리뷰 {detailResult.user_ratings_total}개)</span>
        <div>{detailResult.reviews?.length > 1
        && detailResult.reviews.map((r, i)=>
        <p 
          key={i}
          className="flex justify-start text-left"
        >{i+1} - {r.text}</p>)}</div>
      </div>
      <div className="w-[25rem] flex items-center gap-5 justify-start">
        <div
          onClick={()=>{
            page>=1 && setPage(page-1)
          }}
          className="text-[3rem]">
            ⟨
          </div>
        <img 
          src={detailResult.photos?.[page].getUrl()}
          className=""
        />
        <div
          onClick={()=> page<detailResult.photos.length-1 && setPage(page+1)}
          className="text-[3rem]"
        >
          ⟩
        </div>
      </div>
    </div>
  </>)
}