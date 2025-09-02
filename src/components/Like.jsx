import { BsPin } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { useDetailResult, useLikeId } from "../store";
import axios from "axios";


export default function Like () {
  // const liked = useLike((s)=>s.liked);
  // const setLiked = useLike((s)=>s.setLiked);
  // const userId = localStorage.getItem("userId");
  const detailResult = useDetailResult((s)=>s.detailResult);
  const token = localStorage.getItem("accessToken");

  const likedId = useLikeId((s)=>s.likedId);
  const setLikedId = useLikeId((s)=>s.setLikedId);

  const toggleLike = async () => {
    try {
      if (!likedId.includes(detailResult.place_id)) {
        // 찜하기
        await axios.post("https://api.nyamnyam.r-e.kr/api/places/like",
          { restaurantId: detailResult.place_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikedId([...likedId, detailResult.place_id]);
      } else {
        // 찜 취소
        await axios.delete("https://api.nyamnyam.r-e.kr/api/places/like", 
          { headers: { Authorization: `Bearer ${token}` },
          data: { restaurantId: detailResult.place_id }
        });
        setLikedId(likedId.filter(id => id !== detailResult.place_id));
      }
    } catch (err) {
      console.error(err.message);
      alert("찜 에러");
    }
  };

  return (<>
  { likedId.includes(detailResult.place_id) ? 
    <MdPushPin 
      onClick={toggleLike}
      size={52}
      className="absolute right-1 cursor-pointer"  
    />
    : 
    <BsPin
      onClick={toggleLike}
      size={50}
      className="absolute right-1 cursor-pointer"
    /> 
  }
  </>)
}