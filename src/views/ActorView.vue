<template>
  <div class="about">
    <h1>This is an actor page</h1>
    <p>Here is an actor:</p>
    <br>
<!--     test: {{ actors }} -->
    <ul>
      <li v-for="actor in actors" :key="actor.id">
       <p>
        Actor id: firebase id: {{ actor.id }}
      </p> 
      <img :src="actor.profileImage" height="150" alt="actor.name" />
      <p>
        Actor Name: {{ actor.name }}
      </p>
      <p>
        Date of Birth: {{ actor.dateOfBirth }}
      </p>
      <p>
        List of movies(biography): {{ actor.movies }}
      </p>  

      <!-- Movie biography-->
      <br>
      For each movie, we have the following information:
      <div v-if="actor.movies.length">
        <h3>Movies:</h3>
        <ul>
          <li v-for="movie in actor.movies" :key="movie.id">
            <p>{{ movie.title }}</p>
            <p>{{ movie.director }}</p>
            <p>{{ movie.actors }}</p>
            <br>
          </li>
        </ul>
      </div>
      <br>
      <br>
      <hr>
 
      <br>

    <!--     <router-link :to="{ name: 'ActorDetail', params: { id: actor.id } }">
          {{ actor.name }}
        </router-link> -->
      </li>
    </ul>



  </div>
</template>

<script setup>
import { useActors } from '../modules/useActors'

const { actors } = useActors()

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
