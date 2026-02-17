<template>
  <div style="max-width: 600px; margin: auto; padding: 20px;">
    <h1>Gestor de Tareas</h1>

    <!-- Formulario de creación -->
    <task-form @task-created="reloadTasks" />

    <!-- Lista de tareas -->
    <task-list ref="taskList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskList from './components/tasklist.vue'
import TaskForm from './components/taskform.vue'

const taskList = ref(null)

function reloadTasks() {
  if (taskList.value) {
    taskList.value.loadTasks()
  }
}
</script>

<style>
h1 {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}
</style>
