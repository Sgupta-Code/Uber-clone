import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import rideAnimation from "../assets/ride.json"; // Lottie animation JSON file
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Start = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row relative">
      {/* Uber Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-24 absolute top-6 left-6"
      />

      {/* Left Side: Animation + Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between items-center px-8 lg:px-16">
        {/* Lottie Animation */}
        <Lottie animationData={rideAnimation} className="w-100 h-full mt-12" />

        {/* Bottom Text */}
        <div className="w-full text-left mb-12 sm:mt-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Started with Uber</h1>
          <p className="text-lg text-gray-600 mb-6">
            Drive or ride with confidence, knowing you have Uber at your side.
          </p>
          <Link
            to="/login"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition w-full text-center"
          >
            Continue
          </Link>
        </div>
      </div>

      {/* Right Side: Map */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">
        <MapContainer center={[28.7041, 77.1025]} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[28.7041, 77.1025]}>
            <Popup>Uber Ride Pickup Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Start;
