import api from "./api"

const authService = {
    login: async (Username,Password)=>{
        try{
            const res = await api.post('/login',{Username,Password})
            return res.data
        }catch{err}{
            console.log(err);
            
            return err
        }
    },
 signup: async(name, dob, phone, email, username, password) => {
    try {
        const response = await api.post('/signup', {name,dob,phone,email,username,password});
        return response.data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

}
export default authService;