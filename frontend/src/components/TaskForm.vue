<template>
  <form @submit.prevent="submit" class="task-form">
    <input v-model="title" placeholder="Título" class="input" />
    <textarea v-model="description" placeholder="Descripción (opcional)" class="textarea"></textarea>
    <div class="actions">
      <button type="submit" class="btn">Crear tarea</button>
      <span v-if="message" :class="{ error: error }">{{ message }}</span>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { taskAPI } from '../services/api'

const emit = defineEmits(['task-created'])

const title = ref('')
const description = ref('')
const message = ref('')
const error = ref(false)

async function submit() {
  if (!title.value.trim()) {
    message.value = 'El título es requerido.'
    error.value = true
    return
  }

  try {
    await taskAPI.create({ title: title.value, description: description.value })
    title.value = ''
    description.value = ''
    message.value = 'Tarea creada.'
    error.value = false

    // Emitimos evento al componente padre para recargar la lista
    emit('task-created')
  } catch (e) {
    console.error(e)
    message.value = 'Error al crear la tarea.'
    error.value = true
  }
}
</script>
<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fdfdfd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input, .textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.textarea {
  resize: vertical;
  min-height: 60px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #45a049;
}

.error {
  color: #d93025;
  font-size: 13px;
}
</style>