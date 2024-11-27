// src/apiService.js
const API_BASE_URL = 'https://4c5c083q-5000.inc1.devtunnels.ms'; // Ensure this is set to your API URL

const apiService = {
    async postFile(reviewData) {
        try {
            console.log("Json request : ", JSON.stringify(reviewData));
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(reviewData), // Convert object to JSON string
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            return await response.json(); // Return the response data
        } catch (error) {
            console.error('Error posting review:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },

    async startChat(request) {
        try {
            console.log("Json request : ", JSON.stringify(request));
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(request), // Convert object to JSON string
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            return await response.json(); // Return the response data
        } catch (error) {
            console.error('Error posting review:', error);
            throw error; // Re-throw the error for further handling if needed
        }
    },
};

export default apiService; // Export the apiService object
