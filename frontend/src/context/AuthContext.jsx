import React, { createContext, useState, useContext, useEffect } from 'react';
import { register as registerAPI, login as loginAPI, getMe, createDonation } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.log('AuthProvider - Token exists:', !!storedToken);
        console.log('AuthProvider - User exists:', !!storedUser);
        
        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(storedToken);
                // Verify token with backend
                verifyToken(storedToken, parsedUser);
            } catch (e) {
                console.error('Error parsing user:', e);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setLoading(false);
            }
        } else if (storedToken) {
            loadUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token, storedUser) => {
        try {
            const response = await getMe(token);
            if (response.success) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
            } else {
                // Token invalid
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
                setToken(null);
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            // Keep the stored user as fallback
            setUser(storedUser);
        } finally {
            setLoading(false);
        }
    };

    const loadUser = async (authToken) => {
        try {
            const response = await getMe(authToken);
            if (response.success) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
                setToken(authToken);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setToken(null);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await registerAPI(userData);
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                setToken(response.token);
                setUser(response.user);
                return { success: true, message: 'Registration successful!' };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            console.log('Logging in:', email);
            const response = await loginAPI({ email, password });
            console.log('Login response:', response);
            
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                setToken(response.token);
                setUser(response.user);
                return { success: true, message: 'Login successful!' };
            }
            return { success: false, message: response.message };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const donate = async (donationData) => {
        try {
            const response = await createDonation(donationData, token);
            if (response.success) {
                // Update user in state and localStorage
                const updatedUser = {
                    ...user,
                    totalDonated: (user?.totalDonated || 0) + donationData.amount,
                    donations: [...(user?.donations || []), {
                        amount: donationData.amount,
                        item: donationData.item,
                        receiptId: response.receiptId,
                        date: new Date().toISOString()
                    }]
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return { success: true, message: response.message, receiptId: response.receiptId };
            }
            return { success: false, message: response.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            logout,
            donate,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};