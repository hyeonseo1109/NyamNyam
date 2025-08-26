import { useDetailResult } from "../store";
import { VscPinned } from "react-icons/vsc";


export function Information () {
    const detailResult = useDetailResult((s)=> s.detailResult);
    // const detailImageUrl = detailResult.photos?.[0].getUrl({ maxWidth: 300 });
    console.log(detailResult);
  
  return (<>
    <div
      className="border border-gray-400 w-[50rem] h-[20rem] bg-[#fefefb]"
    >
      <div className="flex justify-between">
        <div className="text-4xl">X</div>
        <VscPinned size={50}/>
      </div>
      <div>
        <p className="text-5xl">{detailResult.name}</p>
        {/* <img src={detailImageUrl}/> */}
        <p>★{detailResult.rating}</p>
        <p>영업
          {detailResult?.opening_hours?.open_now
              ? "중"
              : "종료"
          }
        </p>
      </div>
    </div>
  </>)
}