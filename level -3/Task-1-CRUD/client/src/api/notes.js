import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: API_URL });

export const notesApi = {
  list: (params = {}) => client.get("/notes", { params }).then((r) => r.data),
  get: (id) => client.get(`/notes/${id}`).then((r) => r.data),
  create: (data) => client.post("/notes", data).then((r) => r.data),
  update: (id, data) => client.put(`/notes/${id}`, data).then((r) => r.data),
  toggleFavorite: (id) => client.patch(`/notes/${id}/favorite`).then((r) => r.data),
  trash: (id) => client.patch(`/notes/${id}/trash`).then((r) => r.data),
  restore: (id) => client.patch(`/notes/${id}/restore`).then((r) => r.data),
  remove: (id) => client.delete(`/notes/${id}`).then((r) => r.data),
};
