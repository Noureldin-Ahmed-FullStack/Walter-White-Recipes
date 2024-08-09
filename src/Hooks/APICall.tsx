import axios from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;
export default axios.create({
    baseURL: BaseURL
})
