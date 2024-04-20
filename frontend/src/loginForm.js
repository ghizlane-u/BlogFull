import React, { useState } from 'react';
import './index'; // Import CSS file for LoginForm styling
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [errors, setErrors] = useState();

  const navigate = useNavigate()
  const
  handleSubmit = async (e) => {
  e.preventDefault(); 
  try {
  const response = await fetch("http://localhost:3004/api/auth/login", {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password})
  }); 
  const data = await response.json();
  
  if (!response.ok) {
   
    if(response.status == 400){
     setErrors(data.message)
    }

  throw new Error(data.message); 
  }else{  
    //console.log("_id", response.data._id)
   // localStorage.setItem("_id", response.data._id);

    localStorage.setItem("token",data.token);

    setErrors("")

  alert("you had sign in succesfully"); 
  
    console.log("_id", response.data.id)
  navigate('/')

  };
 
  
 
  } catch (error) {
  
  }
 
  };
  
  return (
    // <form onSubmit={handleSubmit} className="login-form">
    //   <div className="form-group">
    //     <label htmlFor="email">Email:</label>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="password">Password:</label>
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </div>
    //   <button type="submit" className="submit-button">Login</button>
    // </form>

    <main className="w-full max-w-md mx-auto p-6">
  <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account yet?
          <a
            className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="SignUpForm"
          >
            Sign up here
          </a>
        </p>
    
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-4">   
          <span style={{color: "red",fontSize:"14px"}}> {errors? errors 
         : ""}</span>
            {/* Form Group */}
            <div> 
              <label
                htmlFor="email"
                className="block text-sm mb-2 dark:text-white"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required=""
                  aria-describedby="email-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address so we can get back to you
              </p>
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Password
                </label>
              
              </div>
              <div className="relative">
                <input 
                onChange={e=>{setPassword(e.target.value)}}
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  required=""
                  aria-describedby="password-error"
                />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              </div>
              <p
                className="hidden text-xs text-red-600 mt-2"
                id="password-error"
              >
                8+ characters required
              </p>
            </div>
            {/* End Form Group */}
            {/* Checkbox */}
            
            {/* End Checkbox */}
            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  </div>
</main>

  );
};

export default LoginForm;
