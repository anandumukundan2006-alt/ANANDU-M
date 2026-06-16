import { useState } from "react";
import "./Profile.css";
import authService from "../../services/authService.js";

function Profile() {

  const [edit, setEdit] = useState(false);
  // const [user, setUser] = useState({
  //   name: "Anandu",
  //   username: "ANANDU",
  //   email: "anandu@gmail.com",
  //   phone: "1234567890",
  //   dob: "31-01-2006"
  // });


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : {
        name: "",
        username: "",
        email: "",
        phone: "",
        dob: ""
      };
  });



  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // 👇 ADD THIS HERE
  const handleSave = async () => {

    const result = await authService.updateProfile(
      user._id,
      user
    );

    if (result.success) {

      localStorage.setItem(
        "user",
        JSON.stringify(result.data)
      );

      setUser(result.data);

      alert(result.message);

      setEdit(false);

    } else {

      alert(result.message);

    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>
          Profile
        </h1>

        <div className="avatar">
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="profile"
          />
        </div>

        {edit ? (
          <div className="details">

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="dob"
              value={user.dob}
              onChange={handleChange}
            />

            <button onClick={handleSave}>
              Save
            </button>

          </div>
        ) : (
          <div className="details">

            <p>
              <strong>
                Name:
              </strong>
              {user.name}
            </p>

            <p>
              <strong>
                Username:
              </strong>
              {user.username}
            </p>

            <p>
              <strong>
                Email:
              </strong>
              {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p>
              <strong>DOB:</strong>{" "}
              {user.dob ? user.dob.split("T")[0] : ""}
            </p>

            <button onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;