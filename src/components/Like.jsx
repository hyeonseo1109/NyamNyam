import { BsPin } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { useDetailResult, useLike } from "../store";
import axios from "axios";


export default function Like () {
  const liked = useLike((s)=>s.liked);
  const setLiked = useLike((s)=>s.setLiked);
  // const userId = localStorage.getItem("userId");
  const detailResult = useDetailResult((s)=>s.detailResult);
  const token = localStorage.getItem("token");

  const toggleLike = async () => {
    try {
      if (!liked) {
        // 찜하기
        await axios.post("http://3.35.209.203:3000/api/places/like",
          { restaurantId: detailResult.place_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(true);
      } else {
        // 찜 취소
        await axios.delete("http://3.35.209.203:3000/api/places/like", {
          headers: { Authorization: `Bearer ${token}` },
          data: { restaurantId: detailResult.place_id }
        });
        setLiked(false);
      }
    } catch (err) {
      console.error(err.message);
      alert("찜 에러");
    }
  };

  return (<>
  { liked ? 
    <MdPushPin 
      onClick={toggleLike}
      size={50}
      className="absolute right-1"  
    />
    : 
    <BsPin
      onClick={toggleLike}
      size={50}
      className="absolute right-1"
    /> 
  }
  </>)
}