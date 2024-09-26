<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="newMovieTitle" placeholder="Add a new movie" />

    <input type="text" v-model="newMovieDirector" placeholder="Add a Director" />
    <multiselect 
      v-model="selectedActors" 
      :options="actors" 
      :multiple="true" 
      :close-on-select="false" 
      placeholder="Select actors" 
      label="name" 
      track-by="id">
    </multiselect>
 
    <button @click="addMovie">Add Movie</button>
    <br>
    <ul>
      <li v-for="movie in movies" :key="movie">
        id: {{ movie.id }}
        Title: {{ movie.title }}
        Director: {{ movie.director }}
        <button @click="deleteMovie(movie.id)">Delete me</button>
      </li>
    </ul>
  </div>
</template> -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="newMovieTitle" placeholder="Add a new movie" />
    <input type="text" v-model="newMovieDirector" placeholder="Add a Director" />
    <multiselect 
      v-model="selectedActors" 
      :options="actors" 
      :multiple="true" 
      :close-on-select="false" 
      placeholder="Select actors" 
      label="name" 
      track-by="id">
    </multiselect>
    <button @click="addMovie">Add Movie</button>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        id: {{ movie.id }}
        Title: {{ movie.title }}
        Director: {{ movie.director }}
        <ul>
          <li v-for="actorName in movie.actors" :key="actorName">
            Actor: {{ actorName }}
          </li>
        </ul>
      
        <button @click="deleteMovie(movie.id)">Delete me</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useMovies } from '../modules/useMovies';
import Multiselect from 'vue-multiselect';

const { 
  newMovieTitle, 
  newMovieDirector, 
  movies, 
  actors, 
  selectedActors, 
  addMovie, 
  deleteMovie 
} = useMovies();

/* 
import Multiselect from 'vue-multiselect';
import { useMovies } from '../modules/useMovies'

const { movies, addMovie, deleteMovie, newMovieTitle, newMovieDirector } = useMovies()

 */
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
