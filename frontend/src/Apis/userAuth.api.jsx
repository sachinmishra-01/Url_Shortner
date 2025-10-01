import axios
 from "axios";
export const loginUser = async (email, password) => {
    const {data} = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
    }, {
  withCredentials: true
});
    return data;
};

export const registerUser = async (username, email, password) => {
    const { data } = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
    }, {
  withCredentials: true
});
    return data;
};

export const logoutUser = async () => {
    const { data } = await axios.post("http://localhost:5000/auth/logout");
    return data;
};

// export const getCurrentUser = async () => {
//     const { data } = await axios.get("http://localhost:5000/auth/me");
//     return data;
// };

// ✅ KEEP ONLY THIS VERSION
export const getAllUrls = async () => {
  const { data } = await axios.get("http://localhost:5000/api/user/urls", {
    withCredentials: true, // ✅ required to send cookie
  });
  return data;
};
