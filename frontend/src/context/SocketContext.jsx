import { io } from 'socket.io-client';
import { createContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`,{
    transport: ['websocket', 'polling'],
    withCredentials: true
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        const handleConnect = () => console.log('Connected to server');
        const handleDisconnect = () => console.log('Disconnected from server');
        const handleError = (error) => console.error('Socket Error:', error);

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleError);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleError);
        };
    }, []);

    const socketValue = useMemo(() => ({ socket }), []);

    return (
        <SocketContext.Provider value={socketValue}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SocketProvider;
