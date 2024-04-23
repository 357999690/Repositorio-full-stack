import axios from "axios";
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const create = () => console.log(token)

// const create = async newBlog => {
//     // const config = {
//     //     headers: { Authorization: token },
//     // }

//     // const response = await axios.post(baseUrl, newBlog, config)
//     return console.log(token)
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getAllService = { getAll, create, setToken }

export default getAllService