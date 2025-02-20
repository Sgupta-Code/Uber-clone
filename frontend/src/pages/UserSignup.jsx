import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
    console.log(newUser);
    setUserData(newUser);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative px-4">
      {/* Image on the top left */}
      <img
        className="absolute top-5 left-5 w-16 sm:w-20"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
        alt="Logo"
      />
      <div className="bg-white p-5 sm:p-7 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center pb-4">
          User Signup
        </h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-md sm:text-lg font-medium">What&rsquo;s your name</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full sm:w-1/2 text-md sm:text-lg placeholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full sm:w-1/2 text-md sm:text-lg placeholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-md sm:text-lg font-medium">What&rsquo;s your email</h3>
          <input
            required
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-md sm:text-lg font-medium">Enter Password</h3>
          <input
            required
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <button className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-md sm:text-lg">
            Create Account
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

        <div className="mt-6 sm:mt-12">
          <p className="text-[10px] text-center leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;