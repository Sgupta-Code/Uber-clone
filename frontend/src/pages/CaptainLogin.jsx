import { Link, useNavigate } from "react-router-dom";
import { useState , useContext} from "react";
import axios from 'axios';  
import {CaptainDataContext} from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {captain,setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email, password };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)

    if(response.status === 200){
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative px-4">
      {/* Logo on the top left */}
      <img
        className="absolute top-5 left-5 w-16 sm:w-20"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="Logo"
      />
      <div className="bg-white p-5 sm:p-7 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center pb-4">
          Captain Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-md sm:text-lg font-medium">What&rsquo;s your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-md sm:text-lg font-medium">Enter Password</h3>
          <input
            required
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-md sm:text-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>

        <div className="mt-6 sm:mt-10 text-center">
          <p className="text-sm sm:text-md text-gray-600">
            If you&rsquo;re a Rider, you can sign in here:
          </p>
        </div>

        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mt-2 rounded-lg px-4 py-2 w-full text-md sm:text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
