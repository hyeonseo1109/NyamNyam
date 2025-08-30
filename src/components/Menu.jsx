// import { useMenu } from "../store";

export default function Menu () {
  // const isMenu = useMenu((s)=> s.isMenu);
  return (<>

      <div className="flex flex-col bg-[#fefefb] border w-[12rem] h-auto fixed z-10 gap-5 py-5">
        <div>★4.0 이상</div>
        <div>★3.5 이상</div>
        <div>✍︎리뷰 100개 이상</div>
        <div>✍︎리뷰 50개 이상</div>
        <div>영업 중</div>
        <div>음식 종류</div>
      </div>
  </>)
}