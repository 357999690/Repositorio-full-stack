import axios from "axios";
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObejct => {
    const request = axios.post(baseUrl, newObejct)
    return request.then(response => response.data)
}

const update = (id, newObejct) => {
    const request = axios.put(`${baseUrl}/${id}`, newObejct)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update
}