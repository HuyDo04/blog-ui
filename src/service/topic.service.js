import httpRequest from "../utils/httpRequest"

export const getAll = async () => {
    const response = await httpRequest.get("/topics");
    
    return response
}

export const getAllTopicPost = async () => {
    const response = await httpRequest.get("/");
    return response
}

export const getOne = async (id) => {
    const response = await httpRequest.get(`/topics/${id}`)
    return response
}

export const update = async (id) => {
    const response = await httpRequest.put(`/topics/${id}`)
    return response
}

export const del = async (id) => {
    const response = await httpRequest.del(`/topics/${id}`)
    return response
}

export default {
    getAll,
    getOne,
    update,
    del,
    getAllTopicPost
}