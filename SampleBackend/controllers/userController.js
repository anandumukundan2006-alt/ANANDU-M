import User from "../models/userModel.js";
export const signup = async (req, res) => {
    try {

        const {
            name,
            dob,
            phone,
            email,
            username,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        if (!name || !dob || !phone || !email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all required fields"
            });
        }

        const user = await User.create({
            name,
            dob,
            phone,
            email,
            username,
            password
        });

        // console.log(user);
        console.log("========== SIGNUP SUCCESS ==========");
        console.log("Name      :", user.name);
        console.log("Username  :", user.username);
        console.log("Email     :", user.email);
        console.log("Phone     :", user.phone);
        console.log("DOB       :", user.dob);
        console.log("====================================");

        return res.status(201).json({
            success: true,
            message: "Signup successfully",
            data: user
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error, })
    }
}


// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         console.log(req.body);
//         console.log(username);
//         console.log(password);
//         if (!username || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all details"
//             });
//         }
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Username not found"
//             });
//         }
//         if (user.password !== password) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Incorrect password"
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Login Successful",
//             data: user
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


export const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        console.log("Login Request:", req.body);

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details"
            });
        }

        const user = await User.findOne({ username: username });

        // console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Username not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }
        console.log("========== LOGIN SUCCESS ==========");
        console.log("Name      :", user.name);
        console.log("Username  :", user.username);
        console.log("Email     :", user.email);
        console.log("Phone     :", user.phone);
        console.log("DOB       :", user.dob);
        console.log("==================================");

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            data: user
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



export const updateProfile = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument: "after"
            }
        );

        console.log("======= PROFILE UPDATED =======");
        console.log("Name      :", user.name);
        console.log("Username  :", user.username);
        console.log("Email     :", user.email);
        console.log("Phone     :", user.phone);
        console.log("DOB       :", user.dob);
        console.log("===============================");

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: user
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};