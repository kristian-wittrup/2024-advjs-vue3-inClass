<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginComponent from './components/LoginComponent.vue';

// Modal 
import ModalComponent from './components/ModalComponent.vue';
import { ref } from 'vue';
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

//import { useUsers } from './modules/useUsers'
//const { user, login, logout } = useUsers()

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

  
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/actor">Actor</RouterLink>
        <RouterLink to="/infinitescroll">InfiniteScroll</RouterLink>
        <RouterLink to="/infinitescroll3d">InfiniteScroll3d</RouterLink>
      </nav>


      <!-- Button to open the modal -->
      <button @click="openModal">Admin</button>

      <!-- Target element for teleport -->
      <div id="login-portal"></div>
     
      

   <!--    <div>
        <button v-if="!user" @click="login('admin@admin.com', '123456')">Login</button>
        <button v-if="user" @click="logout">Logout</button>
        <p v-if="user">Logged in as: {{ user.email }}</p>
      </div> -->


    </div>
  </header>

  <RouterView />


  
  <!-- Teleport the login component to the header -->
<!--   <teleport to="#login-portal">
    <LoginComponent />
  </teleport> -->


  <!-- Teleport the modal to the login-portal -->
  <teleport to="#login-portal">
    <ModalComponent v-if="showModal" @close="closeModal">
      <LoginComponent />
    </ModalComponent>
  </teleport>


    <!-- Teleport the login component to the end of the body -->
  <!--     
    <teleport to="body">
      <LoginComponent />
    </teleport> 
  -->

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
