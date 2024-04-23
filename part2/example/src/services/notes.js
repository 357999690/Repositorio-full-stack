import axios from "axios";
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObejct => {
    const config = {
        headers: { authorization: token },
    }

    const response = await axios.post(baseUrl, newObejct, config)
    return response.data
}

const update = (id, newObejct) => {
    const request = axios.put(`${baseUrl}/${id}`, newObejct)
    return request.then(response => response.data)
}

const exportService = {
    getAll,
    create,
    update,
    setToken
}

export default exportService