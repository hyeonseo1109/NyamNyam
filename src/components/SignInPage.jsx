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

  const validateSignUp = () => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    const phoneRegex = /^\d{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!nameRegex.test(signUpForm.userName)) {
      return "이름은 2~8자의 한글, 영문, 숫자만 사용할 수 있습니다.";
    }
    if (!phoneRegex.test(signUpForm.userPhone)) {
      return "전화번호는 숫자만 입력하며 10~11자리여야 합니다.";
    }
    if (!emailRegex.test(signUpForm.userEmail)) {
      return "유효한 이메일 형식이 아닙니다.";
    }
    if (!passwordRegex.test(signUpForm.userPassword)) {
      return "비밀번호는 6자 이상이며, 영문과 숫자를 포함해야 합니다.";
    }
    return null;
  };

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();
    const error = validateSignUp();
    if (error) {
      alert(error);
      return;
    }
    try {
      const res = await axios.post("https://api.nyamnyam.r-e.kr/auth/register", signUpForm);
      console.log(res.data);
      alert("회원가입 성공! 로그인을 진행해주세요.");
      setSignUpForm({
        userEmail: "",
        userPassword: "",
        userName: "",
        userPhone: "",
      });
    } catch (err) {
      console.error(err.message);
      alert("중복된 이메일입니다! 다른 이메일을 사용해주세요.");
    }
  };

  const signInHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api.nyamnyam.r-e.kr/auth/login", signInForm);
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
    <div className="flex flex-col gap-5 my-10 bg-[#c2ccd8] p-30 rounded-[2rem] shadow-[0_0_0.4rem_#888]">
      <img 
        src='/logo.png'
        className="w-[15rem] mx-auto my-3"
      />
      
      <form 
        className="flex flex-col bg-gray-200 p-5 gap-5 justify-center  rounded-[0.8rem]"
        onSubmit={signInHandleSubmit}
      >
        <h1>NyamNyam에 돌아오셨군요!</h1>
        <input 
          type="text" 
          placeholder="이메일"
          name="userEmail"
          value={signInForm.userEmail}
          onChange={signInHandleChange}
          className="rounded-[0.6rem] px-2 bg-[#ffffffe0] w-[15rem] h-[2rem]"
        ></input>
        <div className="flex ">
          <input 
            type={passwordShow ? "text" : "password"}
            placeholder="비밀번호"
            name="userPassword"
            value={signInForm.userPassword}
            onChange={signInHandleChange}
            className=" rounded-bl-[0.6rem] rounded-tl-[0.6rem] px-2 bg-[#ffffffe0]  w-[13.5rem] h-[2rem]"
          ></input>
          <button 
            type="button"
            onClick={() => setPasswordShow(!passwordShow)}
            className="bg-[#f1f1f1e0] rounded-br-[0.6rem] rounded-tr-[0.6rem] w-[1.5rem] justify-center flex items-center ">{ !passwordShow ?
              <IoEyeOutline />
            : <IoEyeOffOutline />
            }</button>
        </div>
        <button 
          className="bg-gray-300 rounded-[0.6rem]  h-[2rem] hover:bg-[#b8bdc5]"
          type="submit">로그인</button>
      </form>

      <form 
        className="flex flex-col bg-gray-200 p-5 gap-5 justify-center rounded-[0.8rem] "
        onSubmit={signUpHandleSubmit}
      >
        <h1>NyamNyam이 처음이신가요?</h1>
        <input 
          type="text" 
          placeholder="이름"
          name="userName"
          value={signUpForm.userName}
          onChange={signUpHandleChange}
          className="rounded-[0.6rem] px-2 bg-[#ffffffe0] w-[15rem]  h-[2rem]"
        ></input>
        <input 
          type="text" 
          placeholder="전화번호"
          name="userPhone"
          value={signUpForm.userPhone}
          onChange={signUpHandleChange}
          className="rounded-[0.6rem] px-2 bg-[#ffffffe0] w-[15rem] h-[2rem]"
        ></input>
        <input 
          type="text" 
          placeholder="이메일"
          name="userEmail"
          value={signUpForm.userEmail}
          onChange={signUpHandleChange}
          className="rounded-[0.6rem] px-2 bg-[#ffffffe0] w-[15rem] h-[2rem]"
        ></input>
        <div className="flex ">
          <input 
            type={passwordShow ? "text" : "password"}
            placeholder="비밀번호"
            name="userPassword"
            value={signUpForm.userPassword}
            onChange={signUpHandleChange}
            className=" rounded-bl-[0.6rem] rounded-tl-[0.65rem] px-2 bg-[#ffffffe0]  w-[13.5rem] h-[2rem]"
          ></input>
          <button 
            type="button"
            onClick={() => setPasswordShow(!passwordShow)}
            className="bg-[#f1f1f1e0] rounded-br-[0.6rem] rounded-tr-[0.6rem] w-[1.5rem] justify-center flex items-center ">{ !passwordShow ?
              <IoEyeOutline />
            : <IoEyeOffOutline />
            }</button>
        </div>
        
        <button 
          className="bg-gray-300 rounded-[0.6rem] h-[2rem] hover:bg-[#b8bdc5]"
          type="submit">회원가입</button>
      </form>
    </div>
  </>);
}
