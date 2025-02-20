import { io } from 'socket.io-client';
import {createContext, useEffect} from 'react';
import PropTypes from 'prop-types';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({children}) => {
    useEffect(()=> {
        socket.on('connect', ()=>{
            console.log('Connected to server');
        });
        socket.on('disconnect', ()=>{
            console.log('Disconnected from server');
        });
    },[]);

    return (
        <SocketContext.Provider value={{socket}}>
        {children}
        </SocketContext.Provider>
        
    );
};
SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SocketProvider;