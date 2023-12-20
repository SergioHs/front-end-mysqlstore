import React,{ useContext, useEffect} from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext"
import { AuthContext, AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from "next/router";

function Appbar({onMenuToggle}) {
  const { theme } = useContext(ThemeContext);
  const { userInfo } = useContext(AuthContext);
  const router = useRouter();

  if(userInfo){
    if(userInfo.user.user_image == undefined){ 
      userInfo.user.user_image  = 'user.jpg';
    }
  }

  const authContext = useAuth();
  const { logout } = authContext;

  const onLogout = async () => {
      logout(null)
      router.push(`/login`);
  };

  useEffect(() => {
  }, [theme]);

  return (
  <div className={`flex justify-between items-center p-4
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}
  
  `}>
    <div className={`
    ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      Infnet e-commerce  
    </div>

    <div className={`flex justify-between items-center p-4`}>
      {userInfo && (<div className={`mx-4 flex items-center gap-2
      ${theme === 'dark' ? 'text-white' : 'text-black'}`}>

        <img className="object-contain h-12 w-12 rounded-full" src={'http://localhost:3000/'+userInfo?.user.user_image}/>

        <h1> {userInfo && userInfo.user.user_name}</h1>
      </div>)}

      <button className="mx-4" onClick={onLogout}>
        {userInfo && 'Logout'}
      </button>

    <button onClick={onMenuToggle}>
      <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    </div>
    </div>
  )
}

export default Appbar;