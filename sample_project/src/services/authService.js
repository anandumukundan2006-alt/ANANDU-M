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

export default authService;