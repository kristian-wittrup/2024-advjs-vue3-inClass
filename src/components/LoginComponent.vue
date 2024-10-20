<template>
    <div class="login-container">
      <button v-if="!user" @click="login('admin@admin.com', '123456')">Login</button>
      <button v-if="user" @click="logout">Logout</button>
      <p v-if="user">Logged in as: {{ user.email }}</p>
    </div>
  </template>
  
  <script setup>
  import { useUsers } from '../modules/useUsers';
  
  const { user, login, logout } = useUsers();
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  
  button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>