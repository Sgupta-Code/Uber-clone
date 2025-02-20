import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import userLoader from '../assets/user_loader.json';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && isMounted) {
          setUser(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [token, navigate, setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Lottie animationData={userLoader} loop={true} className="w-32 h-32 md:w-48 md:h-48" />
      </div>
    );
  }

  return <>{children}</>;
};

UserProtectWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtectWrapper;
