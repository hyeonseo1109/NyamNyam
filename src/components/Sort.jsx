import { useEffect } from "react";
import {
  useSortRatingFirst, 
  useSortRatingSecond, 
  useSortReviewFirst, 
  useSortReviewSecond 
} from "../store";


export function Sort (data) {
  const reviewFirst = useSortReviewFirst((s)=>s.reviewFirst);
  const reviewSecond = useSortReviewSecond((s)=>s.reviewSecond);
  const ratingFirst = useSortRatingFirst((s)=>s.ratingFirst);
  const ratingSecond = useSortRatingSecond((s)=>s.ratingSecond);

  useEffect(()=>{
    console.log("reviewFirst:", reviewFirst);
  }, [reviewFirst]);

  if(!reviewFirst && !reviewSecond && !ratingFirst && !ratingSecond) {
    return data;
  }


  if(ratingFirst && reviewFirst) {
    return [...data].filter((m)=>m.rating >= 4).filter((m)=>m.user_ratings_total > 100);
  }

  if(ratingFirst && reviewSecond) {
    return [...data].filter((m)=>m.rating >= 4).filter((m)=>m.user_ratings_total > 50);
  }

  if(ratingSecond && reviewFirst) {
    return [...data].filter((m)=>m.rating >= 3.5).filter((m)=>m.user_ratings_total > 100);
  }

  if(ratingSecond && reviewSecond) {
    return [...data].filter((m)=>m.rating >= 3.5).filter((m)=>m.user_ratings_total > 50);
  }


  if(ratingFirst) {
    return [...data].filter((m)=>m.rating >= 4);
  }

  if(ratingSecond) {
    return [...data].filter((m)=>m.rating >= 3.5);
  }

  if(reviewFirst) {
    return [...data].filter((m)=>m.user_ratings_total > 100);
  }

  if(reviewSecond) {
    return [...data].filter((m)=>m.user_ratings_total > 50);
  }

  return data;
}