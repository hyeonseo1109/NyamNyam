import { Login } from "./Login";
import { Search } from "./Search";
import { Sort } from "./Sort";

export function Nav () {
  return (<>
  <div className="flex gap-10 justify-between">
    <div>
      <Sort/>
    </div>
    <div className="flex gap-10">
      <Search/> 
      <Login/>
    </div>
  </div>


  </>)
}