import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email:email,
        password:password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType:vehicleType,
        },
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

      if (response.status === 201) {
        const data = response.data;
        setCaptain(captainData); // Fixed setCaptain
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
      
      // Clear form fields after successful signup
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setVehicleColor('');
      setVehiclePlate('');
      setVehicleCapacity('');
      setVehicleType('');
      
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative px-4">
      <img
        className="absolute top-5 left-5 w-16 sm:w-20"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="Logo"
      />
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold text-center pb-3">
          Captain Signup
        </h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <h3 className="text-md sm:text-lg font-medium">
            Captain&rsquo;s Name
          </h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-md sm:text-lg font-medium">Email</h3>
          <input
            required
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-md sm:text-lg font-medium">Password</h3>
          <input
            required
            className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-md sm:text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-md sm:text-lg font-medium">
            Vehicle Information
          </h3>
          <div className="flex gap-3">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <input required className = "bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-lg placeholder:text-base"
            type = "number"
            placeholder = "Vehicle Capacity"
            value = {vehicleCapacity}
            onChange = {(e) => setVehicleCapacity(e.target.value)}
            />
            <select required className = "bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-md sm:text-base" value = {vehicleType}
            onChange = {(e) => setVehicleType(e.target.value)}>
              <option value = "" disabled >
                Select Vehicle Type
              </option>
              <option value = "Car">Car</option>
              <option value = "auto">Van</option>
              <option value= "motorcycle">
                Motorcycle
              </option>
            </select>
          </div>
          
          <button className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-md sm:text-lg">
            Create Captain Account
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
