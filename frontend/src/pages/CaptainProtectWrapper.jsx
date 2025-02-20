import {useContext, useEffect, useState} from 'react';
import {CaptainDataContext} from '../context/CaptainContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loader from '../assets/loader.json';
import PropTypes from 'prop-types';

const CaptainProtectWrapper = ({
	children
}) => {
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
	const {captain, setCaptain} = useContext(CaptainDataContext)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if(!token){
			navigate('/captain-login')
		}

		axios.get(`${import.meta.env.VITE_BASE_URL
		}/captain/profile`,{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(response => {
			if(response.status === 200){
				setCaptain(response.data.captain)
				setIsLoading(false)
			}
		}).catch(err =>{
			console.log(err)
			localStorage.removeItem('token')
			navigate('/captain-login')
		})
	},[ token ])

	if(isLoading){
		return (
			<div>
				<Lottie animationData={loader} />
			</div>
		)
	}

  return (
	<>
	{children}
	</>
  );
};
CaptainProtectWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CaptainProtectWrapper;