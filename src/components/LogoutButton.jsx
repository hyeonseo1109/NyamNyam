import { useNavigate } from "react-router-dom"

export default function LogoutButton () {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  }

  return (<>
    <button
      className="bg-gray-200 px-2 rounded-[0.5rem] h-[1.5rem] flex items-center justify-center w-[7rem]"
      onClick={handleLogout}
    >로그아웃</button>
  </>)
}