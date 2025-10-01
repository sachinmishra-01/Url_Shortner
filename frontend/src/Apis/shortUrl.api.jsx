import axios from "axios";

export const getShortUrl = async(payload) => {
    const {data} = await axios.post("http://localhost:5000/api/create", payload, {withCredentials: true});
    return data;
}
export const getShortUrlWithoutUser = async(payload) => {
    const {data} = await axios.post("http://localhost:5000/api/createWithoutUser", payload);
    return data;
}

export const getAllUrls = async(userId) => {
    const {data} = await axios.get("http://localhost:5000/api/user/urls", {withCredentials: true});
    return data;
}