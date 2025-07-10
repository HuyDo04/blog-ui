import httpRequest from "../utils/httpRequest"

export const getAll = async () => {
    const response = await httpRequest.get("/posts");
    return response
}

export const getOneById = async (id) => {
    const response = await httpRequest.get(`posts/id/${id}`)
    return response
}

export const getOneBySlug = async (slug) => {
    const response = await httpRequest.get(`/posts/${slug}`)
    return response
}

export const update = async (id, data) => {
    const response = await httpRequest.put(`/posts/id/${id}`, data);
    console.log("Update in:", response);
    return response;
  }
  
export const del = async (id) => {
    const response = await httpRequest.del(`/posts/${id}`)
    return response
}

export const create = async (data) => {
    const response = await httpRequest.post(`/posts`, data);
    return response
}

export default {
    getAll,
    getOneBySlug,
    update,
    del,
    create,
    getOneById
}