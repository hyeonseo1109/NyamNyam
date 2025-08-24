// import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";


export function Login() {

  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
    redirect_uri: 'http://localhost:5173',
  });
  return (
    <>
      <div
        className="bg-[#5087ef] w-[9rem] h-[2rem] text-white items-center flex justify-center"
        onClick={() => login()}
    >
      Google 로그인
    </div>;
    </>
  );
}
