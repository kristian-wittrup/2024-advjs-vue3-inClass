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
    <h1>This is a Movies page</h1>
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
    <button class="btn_addMovie" @click="addMovie">Add Movie</button>
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

.btn_addMovie {
  background-color: #247fc9;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin: 40px 0 50px 0;
}

input {
  height: fit-content;
  overflow-y: auto;
  border: 1px solid #444444;
  border-radius: 4px;
  margin-top: 5px;
  background-color: #333333;
  color: #ffffff;
  margin:10px 10px 10px 0;
  padding: 10px;
}

.multiselect__tag-icon {
  margin-left: 5px;
  cursor: pointer;
  color: #ffffff;
}

.multiselect__input {
  border: none;
  outline: none;
  flex-grow: 1;
  padding: 5px;
  background-color: #333333;
  color: #ffffff;

}
.multiselect__content-wrapper {
  height: fit-content;
  overflow-y: auto;
  border: 1px solid #444444;
  border-radius: 4px;
  margin-top: 5px;
  background-color: #333333;
  color: #ffffff;
  
}

.multiselect__content {
  height: 100%;
 
  border: none;
  border-radius: 4px;
  margin-top: 5px;
  background-color: #333333;
  color: #ffffff;
  margin-bottom: 20px;
}



.multiselect__option--highlight {
  background-color: #0c786f;
  color: white;
  padding: 5px 10px;
}

.multiselect__option--selected {
  background-color: #247fc9;
  color: white;
  padding: 5px 10px;
}

.multiselect__tags {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border: 1px solid #444444;
  border-radius: 4px;
  background-color: #333333;
  padding: 5px 10px;
}

.multiselect__tag {
  background-color: #247fc9;
  color: white;
  padding: 5px 10px;
  margin: 2px;
  border-radius: 4px;
  min-width: 400px;
}

.multiselect__element {
  list-style-type: none;

  color: white;
  padding: 5px 10px;
  margin: 2px;

  border:none;
  width: auto;
}


</style>
