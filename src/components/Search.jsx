import { IoSearch } from "react-icons/io5";

export function Search () {
  return ( 
  <div className="flex items-center">
    <input 
      className="border-b"
      placeholder="위치를 검색하세요."></input>
    <IoSearch />
  </div>)
}