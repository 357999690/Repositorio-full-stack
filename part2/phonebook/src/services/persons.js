import axios from "axios";

const baseUrl = 'http://localhost:3012/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}


const personDelete = id => {
    return axios.delete(`${baseUrl}/${id}`)

}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const exportedObject = {
    getAll,
    create,
    personDelete,
    update
}

export default exportedObject