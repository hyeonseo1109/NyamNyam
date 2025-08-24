import { IoSearch } from "react-icons/io5";
import { useSearch } from "../store";
import { useEffect } from "react";
import { useDebounce } from "../useDebounce";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


export function Search () {
  const searchContent = useSearch((set)=>set.searchContent);
  const setSearchContent = useSearch((set)=>set.setSearchContent);

  const [inputValue, setInputValue] = useState(searchContent || "");
  const debouncedValue = useDebounce(inputValue);

  useEffect( () => {
    setSearchContent(debouncedValue);
  }, [debouncedValue, setSearchContent])

  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ query: debouncedValue });
    } else {
      setSearchParams({});
    }
  }, [debouncedValue, setSearchParams]);


  return ( 
  <div className="flex items-center">
    <input 
      onChange={e=> setInputValue(e.target.value)}
      className="border-b"
      value={inputValue}
      placeholder="위치를 검색하세요."></input>
    <IoSearch />
  </div>)
}