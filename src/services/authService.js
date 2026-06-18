import api from "./api"

const authService = {

    login: async (username, password) => {
        try {
            const response = await api.post("/login", {
                username,
                password
            });
            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    },






    updateProfile: async (id, userData) => {
        try {

            const response = await api.put(`/profile/${id}`, userData);

            return response.data;

        } catch (err) {

            return err.response.data;

        }
    },






    signup: async (name, dob, phone, email, username, password) => {
        try {
            const response = await api.post('/signup', { name, dob, phone, email, username, password });
            return response.data;
        }
        catch (err) {
            console.log(err);
            return err.response.data;
        }
    }
}







// ================= TRANSACTIONS =================

// Add Transaction
authService.addTransaction = async (transactionData) => {

    try {

        const response = await api.post(
            "/transaction",
            transactionData
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};

// Get Transactions
authService.getTransactions = async () => {

    try {

        const response = await api.get(
            "/transaction"
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};

// Update Transaction
authService.updateTransaction = async (
    id,
    transactionData
) => {

    try {

        const response = await api.put(
            `/transaction/${id}`,
            transactionData
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};

// Delete Transaction
authService.deleteTransaction = async (id) => {

    try {

        const response = await api.delete(
            `/transaction/${id}`
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};



// ================= DASHBOARD =================

authService.getDashboard = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await api.get(
            `/transaction?userId=${user._id}`
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};

// Get Categories
authService.getCategories = async () => {

    try {

        const response = await api.get("/category");

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};


// ================= ANALYTICS =================

authService.getAnalytics = async (
    fromDate,
    toDate,
    category
) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user._id);
        console.log(fromDate);
        console.log(toDate);
        console.log(category);
        const response = await api.get(
            `/analytics?userId=${user._id}&fromDate=${fromDate}&toDate=${toDate}&category=${category}`
        );

        return response.data;

    } catch (err) {

        return err.response.data;

    }

};

export default authService;