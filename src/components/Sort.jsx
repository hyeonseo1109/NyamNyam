import {
  useSortIsOpen,
  useSortRatingFirst, 
  useSortRatingSecond, 
  useSortReviewFirst, 
  useSortReviewSecond 
} from "../store";


export function Sort (data) {
  let result = [...data];

  const reviewFirst = useSortReviewFirst((s)=>s.reviewFirst);
  const reviewSecond = useSortReviewSecond((s)=>s.reviewSecond);
  const ratingFirst = useSortRatingFirst((s)=>s.ratingFirst);
  const ratingSecond = useSortRatingSecond((s)=>s.ratingSecond);
  const sortIsOpen = useSortIsOpen(s=>s.sortIsOpen);


  // ⭐ 별점 조건
  if (ratingFirst) result = result.filter(m => m.rating >= 4);
  if (ratingSecond) result = result.filter(m => m.rating >= 3.5);

  // ✍ 리뷰 수 조건
  if (reviewFirst) result = result.filter(m => m.user_ratings_total > 100);
  if (reviewSecond) result = result.filter(m => m.user_ratings_total > 50);

  // 🟢 영업중 조건
  if (sortIsOpen) result = result.filter(m => m.opening_hours?.open_now === true);

  return result;
}