
import axios from "axios";

const baseUrl = 'http://localhost:3017/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getAllService = { getAll }

export default getAllService