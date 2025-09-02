import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


export function SignInPage() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    userEmail: "",
    userPassword: "",
    userName: "",
    userPhone: "",
  })
  
  const [signInForm, setSignInForm] = useState({
    userEmail: "",
    userPassword: "",
  })

  const [passwordShow, setPasswordShow] = useState(false);

  const signUpHandleChange = (e) => {
    setSignUpForm({...signUpForm, [e.target.name]: e.target.value });
  };

  const signInHandleChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value })
  }

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://api.nyamnyam.r-e.kr/auth/register", signUpForm);
      console.log(res.data);
      alert("회원가입 성공");
    } catch (err) {
      console.error(err.message);
      alert("회원가입 실패");
    }
  };

  const signInHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://api.nyamnyam.r-e.kr/auth/login", signInForm);
      // 로그인도 post로. DB 조회 후 JWT 토큰을 발급해주는 행위 → 리소스를 "생성"하는 성격
      //GET은 쿼리스트링에 노출되니 POST(body 안에 담기는 거)
      console.log(res.data);
      navigate('/map');
      alert("로그인 성공");
      // 여기서 res.data.accessToken 저장 (ex. localStorage)
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (err) {
      console.error(err.message);
      alert("로그인 실패");
    }
  };



  return (<>
    <div className="flex flex-col gap-5 my-5">
      
      <form 
        className="flex flex-col bg-gray-100 p-5 gap-5 justify-center  rounded-[0.8rem]"
        onSubmit={signInHandleSubmit}
      >
        <input 
          type="text" 
          placeholder="이메일"
          name="userEmail"
          value={signInForm.userEmail}
          onChange={signInHandleChange}
          className="border rounded-[0.5rem] px-2 bg-[#ffffffe0] w-[13rem]"
        ></input>
        <div className="flex ">
          <input 
            type={passwordShow ? "text" : "password"}
            placeholder="비밀번호"
            name="userPassword"
            value={signInForm.userPassword}
            onChange={signInHandleChange}
            className="border  rounded-bl-[0.5rem] rounded-tl-[0.5rem] px-2 bg-[#ffffffe0]  w-[11.5rem]"
          ></input>
          <button 
            type="button"
            onClick={() => setPasswordShow(!passwordShow)}
            className="border bg-[#f1f1f1e0] rounded-br-[0.5rem] rounded-tr-[0.5rem] w-[1.5rem] justify-center flex items-center ">{ !passwordShow ?
              <IoEyeOutline />
            : <IoEyeOffOutline />
            }</button>
        </div>
        <button 
          className="bg-gray-300 rounded-[0.5rem]"
          type="submit">로그인</button>
      </form>

      <form 
        className="flex flex-col bg-gray-100 p-5 gap-5 justify-center rounded-[0.8rem]"
        onSubmit={signUpHandleSubmit}
      >
        <input 
          type="text" 
          placeholder="이름"
          name="userName"
          value={signUpForm.userName}
          onChange={signUpHandleChange}
          className="border rounded-[0.5rem] px-2 bg-[#ffffffe0] w-[13rem]"
        ></input>
        <input 
          type="text" 
          placeholder="전화번호"
          name="userPhone"
          value={signUpForm.userPhone}
          onChange={signUpHandleChange}
          className="border rounded-[0.5rem] px-2 bg-[#ffffffe0] w-[13rem]"
        ></input>
        <input 
          type="text" 
          placeholder="이메일"
          name="userEmail"
          value={signUpForm.userEmail}
          onChange={signUpHandleChange}
          className="border rounded-[0.5rem] px-2 bg-[#ffffffe0] w-[13rem]"
        ></input>
        <div className="flex ">
          <input 
            type={passwordShow ? "text" : "password"}
            placeholder="비밀번호"
            name="userPassword"
            value={signUpForm.userPassword}
            onChange={signUpHandleChange}
            className="border  rounded-bl-[0.5rem] rounded-tl-[0.5rem] px-2 bg-[#ffffffe0]  w-[11.5rem]"
          ></input>
          <button 
            type="button"
            onClick={() => setPasswordShow(!passwordShow)}
            className="border bg-[#f1f1f1e0] rounded-br-[0.5rem] rounded-tr-[0.5rem] w-[1.5rem] justify-center flex items-center "><IoEyeOutline /></button>
        </div>
        
        <button 
          className="bg-gray-300 rounded-[0.5rem]"
          type="submit">회원가입</button>
      </form>
    </div>
  </>);
}
