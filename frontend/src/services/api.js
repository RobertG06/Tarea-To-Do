import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error)
    return Promise.reject(error)
  }
)

// API de Tareas
export const taskAPI = {
  // Obtener todas las tareas
  getAll() {
    return api.get('/tasks')
  },

  // Crear una nueva tarea
  create(taskData) {
    return api.post('/tasks', taskData)
  },

  // Actualizar una tarea
  update(id, taskData) {
    return api.put(`/tasks/${id}`, taskData)
  },

  // Eliminar una tarea
  delete(id) {
    return api.delete(`/tasks/${id}`)
  },

  // Obtener una tarea específica
  getById(id) {
    return api.get(`/tasks/${id}`)
  },
}

export default api
