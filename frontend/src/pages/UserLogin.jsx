import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userCredentials = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userCredentials
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Try again.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
      console.error("Login failed:", error.response?.data || error.message);

      // Remove the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative px-4">
      {/* Logo on the top left */}
      <img
        className="absolute top-7 left-7 w-16 sm:w-20"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
        alt="Logo"
      />
      <div className="bg-white p-5 sm:p-7 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center pb-4">
          User Login
        </h1>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrorMessage("")}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-md sm:text-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>

        <div className="mt-6 sm:mt-10 text-center">
          <p className="text-sm sm:text-md text-gray-600">
            If you&rsquo;re a Captain, you can sign in here:
          </p>
        </div>

        <Link
          to="/captain-login"
          className="bg-green-600 flex items-center justify-center text-white font-semibold mt-2 rounded-lg px-4 py-2 w-full text-md sm:text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;