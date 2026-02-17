<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <div class="task-info">
        <input type="checkbox" :checked="task.completed" @change="toggle(task)" />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <span v-if="task.completed" class="completed-text">Completada</span>
        <p v-if="task.description" class="description">{{ task.description }}</p>
      </div>
      <button @click="remove(task)" class="btn-delete">Eliminar</button>
    </li>
  </ul>
  <div v-if="message" :class="{ error: error }">{{ message }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { taskAPI } from '../services/api'

const tasks = ref([])
const message = ref('')
const error = ref(false)

// Cargar todas las tareas
async function loadTasks() {
  try {
    const res = await taskAPI.getAll()
    tasks.value = res.data.data || []
  } catch (e) {
    console.error(e)
    message.value = 'Error cargando tareas.'
    error.value = true
  }
}

// Marcar o desmarcar tarea como completada
async function toggle(task) {
  try {
    const res = await taskAPI.update(task.id, { completed: !task.completed })
    task.completed = res.data.data.completed
  } catch (e) {
    console.error(e)
    message.value = 'Error actualizando tarea.'
    error.value = true
  }
}

// Eliminar una tarea
async function remove(task) {
  if (!confirm('Eliminar tarea?')) return
  try {
    await taskAPI.delete(task.id)
    tasks.value = tasks.value.filter(t => t.id !== task.id)
  } catch (e) {
    console.error(e)
    message.value = 'Error eliminando tarea.'
    error.value = true
  }
}

// Cuando el componente se monta, carga tareas
onMounted(() => {
  loadTasks()  // Esto cargará tareas al inicio

})

// Exponer método loadTasks() para que el padre lo llame
defineExpose({ loadTasks })
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.task-info {
  display: flex;
  flex-direction: column;
}

.task-info span {
  margin-left: 8px;
  font-weight: 500;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.completed-text {
  font-size: 12px;
  color: #4CAF50;
  margin-left: 10px;
  font-weight: bold;
}

.description {
  font-size: 13px;
  color: #555;
  margin-top: 4px;
  margin-left: 24px;
}

.btn-delete {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  height: fit-content;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.error {
  color: #d93025;
  margin-top: 10px;
}
</style>