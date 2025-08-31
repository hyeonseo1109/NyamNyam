import LogoutButton from "./LogoutButton";

export default function MyPage () {
  return (<>
    <div className="flex flex-col bg-[#fefefb] border w-[14rem] h-auto fixed z-10 gap-5 py-5 items-center">
      <LogoutButton />
      <div className="bg-black h-[0.1rem] w-full"></div>
      <div>찜한 가게</div>
      <div>-</div>
    </div>
  </>)
}