import { useSortIsOpen, useSortRatingFirst, useSortRatingSecond, useSortReviewFirst, useSortReviewSecond } from "../store"




export default function Menu () {
  const setReviewFirst = useSortReviewFirst(s=>s.setReviewFirst);
  const reviewFirst = useSortReviewFirst(s=>s.reviewFirst);
  const setReviewSecond = useSortReviewSecond(s=>s.setReviewSecond);
  const reviewSecond = useSortReviewSecond(s=>s.reviewSecond);
  const setRatingFirst = useSortRatingFirst(s=>s.setRatingFirst);
  const ratingFirst = useSortRatingFirst(s=>s.ratingFirst);
  const setRatingSecond = useSortRatingSecond(s=>s.setRatingSecond);
  const ratingSecond = useSortRatingSecond(s=>s.ratingSecond);
  const sortIsOpen = useSortIsOpen(s=>s.sortIsOpen);
  const setSortIsOpen = useSortIsOpen(s=>s.setSortIsOpen);

  return (<>

      <div className="flex flex-col bg-[#ffffff] border w-[12rem] h-auto  gap-5 py-5 rounded-[0.4rem]">
        <div
          onClick={()=>setRatingFirst(!ratingFirst)}
          className={`${ratingFirst && "bg-gray-200"} w-[9.5rem] select-none rounded-[0.4rem] mx-auto cursor-pointer`}
        >★4.0 이상</div>
        
        <div
          onClick={()=>setRatingSecond(!ratingSecond)}
          className={`${ratingSecond && "bg-gray-200"} w-[9.5rem] select-none  rounded-[0.4rem] mx-auto cursor-pointer`}

        >★3.5 이상</div>
        <div
          onClick={()=>setReviewFirst(!reviewFirst)}
          className={`${reviewFirst && "bg-gray-200"} w-[9.5rem] select-none rounded-[0.4rem] mx-auto cursor-pointer`}

        >✍︎리뷰 100개 이상</div>
        <div
          onClick={()=>setReviewSecond(!reviewSecond)}
          className={`${reviewSecond && "bg-gray-200"} w-[9.5rem] select-none rounded-[0.4rem] mx-auto cursor-pointer`}
        >✍︎리뷰 50개 이상</div>
        <div 
          onClick={()=>setSortIsOpen(!sortIsOpen)}
          className={`${sortIsOpen && "bg-gray-200"} w-[9.5rem] select-none rounded-[0.4rem] mx-auto cursor-pointer`}
        >영업 중</div>
      </div>
  </>)
}