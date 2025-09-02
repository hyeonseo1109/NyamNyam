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
      className="border border-gray-400 w-[40rem] h-[35rem] bg-[#fefefb] overflow-y-scroll flex flex-col items-center"
    >
      <div className="flex justify-between">
        <div 
          onClick={()=>setIsDetailPage(false)}
          className="text-4xl absolute left-0 top-0 cursor-pointer">X</div>
        <Like/>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center gap-3">
          {detailResult.types && detailResult.types.map((t, i)=> <p key={i}>{translateType(t)}</p>)}
        </div>
        <p className="text-5xl font-semibold">{detailResult.name}</p>
        <div className="flex mx-auto">
          <span>{detailResult.formatted_address}</span>
          <span className={`${detailResult?.opening_hours?.isOpen() ? "text-blue-500" : "text-red-500"}`}>
            &nbsp;&nbsp;(영업 {detailResult?.opening_hours?.isOpen() ? "중" : "종료"})
          </span>
        </div>
        { detailResult.photos && 
        <div className="w-[25rem] flex items-center gap-5 ml-20">
          <div
            onClick={()=>{
              page>=1 && setPage(page-1)
            }}
            className={`text-[3rem] ${page===0 ? 'text-gray-300' : 'text-gray-600'}`}>
              ⟨
          </div>
          <img 
            src={detailResult.photos?.[page].getUrl()}
            className="rounded-[0.4rem]"
          />
          <div
            onClick={()=> page<detailResult.photos.length-1 && setPage(page+1)}
            className={`text-[3rem] ${page===detailResult.photos?.length-1 ? 'text-gray-300' : 'text-gray-600'}`}>
            ⟩
            </div>
          </div>
        }

        <div className="my-4">
          {detailResult.opening_hours?.weekday_text 
          && detailResult.opening_hours.weekday_text.map((d, i)=> 
            <p 
              key={i}
            >{d}</p>)}
        </div>
        <hr
          className="my-5 mx-20 text-gray-400"/>
        <div className="text-[#fb0] font-bold">
          <span>★{detailResult.rating}  &nbsp;/&nbsp; </span>
          <span>(총 리뷰 {detailResult.user_ratings_total}개)</span>
        </div>
        <div className="flex flex-col gap-3 mb-7 mt-2 mx-6">{detailResult.reviews?.length > 1
          && detailResult.reviews.map((r, i)=>
          <div 
            key={i}
            className="flex justify-start text-left border rounded-[0.4rem] p-2 bg-[#f0f0f0] flex-col"
          >
            <div className="border w-6 h-6 items-center justify-center flex rounded-[0.3rem] bg-[#c8c8c8]">{i+1}</div>
            {r.text}
          </div>)}
        </div>
      </div>
      </div>
  </>)
}