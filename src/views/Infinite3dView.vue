<template>

  <div class="card"
  ref="target"
  :style="{ 
  transform: cardTransform,
  transition: 'transform 0.25s ease-out'  
  }">
  x: {{ x }}, y: {{ y }}
  <h1>Infinite Scroll 3D</h1>
  <p>Scroll down to load more movies</p>

  </div>

  <div class="movies-container">

    <div 
    v-for="movie in visibleMovies" 
    :key="movie.title" 
    class="movie-card"      
    v-motion

      :style="{ 
      transform: cardTransform,
      transition: 'transform 0.25s ease-out'  
      }"
 
    >
      <!-- ref="target" is used for 3d -->
      <!-- :visible-once="{ opacity: 1, y: 0 }" -->
      <p>Mouse position: {{ x }}, {{ y }}</p>
      <h2>{{ movie.title }}</h2>
      <p><strong>Actors:</strong> {{ movie.actors.join(', ') }}</p>
      <p><strong>Director:</strong> {{ movie.director }}</p>
      <p><strong>Release Year:</strong> {{ movie.releaseYear }}</p>
      <p><strong>Genre:</strong> {{ movie.genre }}</p>
    </div>
  </div>



</template>
  
<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

// 3d vueuse effect
import { computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const target = ref(null);

const { x, y, isOutside, elementHeight, elementWidth } = useMouseInElement(target);

const cardTransform = computed(() => {
  const MAX_ROTATION = 6;

  const rX = ( MAX_ROTATION / 2 - (y.value / elementHeight.value) * MAX_ROTATION).toFixed(2);

  const rY = ((x.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2);

  return isOutside.value 
    ? '' 
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;	


});


/** Array for showing vueUse Motion animations */
const movies = ref([
  { title: 'Inception', actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'], director: 'Christopher Nolan', releaseYear: 2010, genre: 'Sci-Fi' },
  { title: 'The Dark Knight', actors: ['Christian Bale', 'Heath Ledger'], director: 'Christopher Nolan', releaseYear: 2008, genre: 'Action' },
  { title: 'Interstellar', actors: ['Matthew McConaughey', 'Anne Hathaway'], director: 'Christopher Nolan', releaseYear: 2014, genre: 'Sci-Fi' },
  { title: 'The Matrix', actors: ['Keanu Reeves', 'Laurence Fishburne'], director: 'Lana Wachowski, Lilly Wachowski', releaseYear: 1999, genre: 'Sci-Fi' },
  { title: 'Pulp Fiction', actors: ['John Travolta', 'Uma Thurman'], director: 'Quentin Tarantino', releaseYear: 1994, genre: 'Crime' },
  { title: 'The Shawshank Redemption', actors: ['Tim Robbins', 'Morgan Freeman'], director: 'Frank Darabont', releaseYear: 1994, genre: 'Drama' },
  { title: 'Fight Club', actors: ['Brad Pitt', 'Edward Norton'], director: 'David Fincher', releaseYear: 1999, genre: 'Drama' },
  { title: 'Forrest Gump', actors: ['Tom Hanks', 'Robin Wright'], director: 'Robert Zemeckis', releaseYear: 1994, genre: 'Drama' },
  { title: 'The Godfather', actors: ['Marlon Brando', 'Al Pacino'], director: 'Francis Ford Coppola', releaseYear: 1972, genre: 'Crime' },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', actors: ['Elijah Wood', 'Ian McKellen'], director: 'Peter Jackson', releaseYear: 2001, genre: 'Fantasy' },
  { title: 'Star Wars: Episode IV - A New Hope', actors: ['Mark Hamill', 'Harrison Ford'], director: 'George Lucas', releaseYear: 1977, genre: 'Sci-Fi' },
  { title: 'The Avengers', actors: ['Robert Downey Jr.', 'Chris Evans'], director: 'Joss Whedon', releaseYear: 2012, genre: 'Action' },
  { title: 'Gladiator', actors: ['Russell Crowe', 'Joaquin Phoenix'], director: 'Ridley Scott', releaseYear: 2000, genre: 'Action' },
  { title: 'Jurassic Park', actors: ['Sam Neill', 'Laura Dern'], director: 'Steven Spielberg', releaseYear: 1993, genre: 'Adventure' },
  { title: 'Titanic', actors: ['Leonardo DiCaprio', 'Kate Winslet'], director: 'James Cameron', releaseYear: 1997, genre: 'Romance' },
  { title: 'The Lion King', actors: ['Matthew Broderick', 'Jeremy Irons'], director: 'Roger Allers, Rob Minkoff', releaseYear: 1994, genre: 'Animation' },
  { title: 'Avatar', actors: ['Sam Worthington', 'Zoe Saldana'], director: 'James Cameron', releaseYear: 2009, genre: 'Sci-Fi' },
  { title: 'The Silence of the Lambs', actors: ['Jodie Foster', 'Anthony Hopkins'], director: 'Jonathan Demme', releaseYear: 1991, genre: 'Thriller' },
  { title: 'Saving Private Ryan', actors: ['Tom Hanks', 'Matt Damon'], director: 'Steven Spielberg', releaseYear: 1998, genre: 'War' },
  { title: 'Schindler\'s List', actors: ['Liam Neeson', 'Ralph Fiennes'], director: 'Steven Spielberg', releaseYear: 1993, genre: 'Biography' }
]);
const visibleMovies = ref(movies.value.slice(0, 5));

const loadMoreMovies = () => {
  const currentLength = visibleMovies.value.length;
  const nextMovies = movies.value.slice(currentLength, currentLength + 10);
  visibleMovies.value = [...visibleMovies.value, ...nextMovies];
};

useInfiniteScroll(document, loadMoreMovies, { distance: 1 });
</script>
  
  <style scoped>
  .movies-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .movie-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color:#333333
  }
  
  .movie-card h2 {
    margin: 0 0 0.5rem;
  }
  
  .movie-card p {
    margin: 0.25rem 0;
  }
  </style>