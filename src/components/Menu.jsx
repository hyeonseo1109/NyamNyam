import { useSortRatingFirst, useSortRatingSecond, useSortReviewFirst, useSortReviewSecond } from "../store"




export default function Menu () {
  const setReviewFirst = useSortReviewFirst(s=>s.setReviewFirst);
  const setReviewSecond = useSortReviewSecond(s=>s.setReviewSecond);
  const setRatingFirst = useSortRatingFirst(s=>s.setRatingFirst);
  const setRatingSecond = useSortRatingSecond(s=>s.setRatingSecond);

  return (<>

      <div className="flex flex-col bg-[#fefefb] border w-[12rem] h-auto fixed z-10 gap-5 py-5">
        <div
          onClick={(prev)=>setReviewFirst(!prev)}
        >★4.0 이상</div>
        <div
          onClick={(prev)=>setReviewSecond(!prev)}
        >★3.5 이상</div>
        <div
          onClick={(prev)=>setRatingFirst(!prev)}
        >✍︎리뷰 100개 이상</div>
        <div
          onClick={(prev)=>setRatingSecond(!prev)}
        >✍︎리뷰 50개 이상</div>
        <div
        >영업 중</div>
        <div
        >음식 종류</div>
      </div>
  </>)
}