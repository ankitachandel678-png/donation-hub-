// src/services/api.js
const API_URL = 'https://donation-hub-1ry9.onrender.com/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        method,
        headers,
    };
    
    if (data) {
        config.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth APIs
export const register = (userData) => apiCall('/auth/register', 'POST', userData);
export const login = (credentials) => apiCall('/auth/login', 'POST', credentials);
export const getMe = (token) => apiCall('/auth/me', 'GET', null, token);

// School APIs
export const getSchools = () => apiCall('/schools');
export const getSchool = (id) => apiCall(`/schools/${id}`);
export const getUrgentNeeds = () => apiCall('/schools/urgent-needs');

// Campaign APIs
export const getCampaigns = () => apiCall('/campaigns');
export const getCampaign = (id) => apiCall(`/campaigns/${id}`);
export const getFeaturedCampaigns = () => apiCall('/campaigns?featured=true');

// Story APIs
export const getStories = () => apiCall('/stories');
export const getStory = (id) => apiCall(`/stories/${id}`);
export const getFeaturedStories = () => apiCall('/stories?featured=true');

// Donation APIs
export const createDonation = (donationData, token) => 
    apiCall('/donations', 'POST', donationData, token);
export const getMyDonations = (token) => 
    apiCall('/donations/my-donations', 'GET', null, token);
export const getDonationByReceipt = (receiptId, token) => 
    apiCall(`/donations/receipt/${receiptId}`, 'GET', null, token);

// Contact API
export const submitContact = (contactData) => apiCall('/contact', 'POST', contactData);

// Stats API
export const getStats = () => apiCall('/stats');

export default {
    register,
    login,
    getMe,
    getSchools,
    getSchool,
    getUrgentNeeds,
    getCampaigns,
    getCampaign,
    getFeaturedCampaigns,
    getStories,
    getStory,
    getFeaturedStories,
    createDonation,
    getMyDonations,
    getDonationByReceipt,
    submitContact,
    getStats,
};