/* import { ref, onMounted } from 'vue';
import {  actorsCollection } from './firebase';
import { onSnapshot } from 'firebase/firestore';

export const useActors = () => {

  const actors = ref([]);

  // Step 3: Create a function to retrieve a new movie to the list
  onMounted(() => {
    onSnapshot(actorsCollection, (snapshot) => {
      actors.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // spread operator
      }))
      console.log("test", actors.value)
    })
  })


  return {
    actors,
  }

} */

 


// No promise.All()
import { ref, onMounted } from 'vue';
import { actorsCollection, moviesCollection } from './firebase';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';

export const useActors = () => {
  const actors = ref([]);

  const fetchMovies = async (movieIds) => {
    const movies = [];
    for (const movieId of movieIds) {
      if (!movieId) {
        console.error('Invalid movieId:', movieId);
        continue;
      }
      const movieDoc = await getDoc(doc(moviesCollection, movieId));
      if (movieDoc.exists()) {
        movies.push({ id: movieDoc.id, ...movieDoc.data() });
      }
    }
    return movies;
  };

  onMounted(() => {
    onSnapshot(actorsCollection, async (snapshot) => {
      const actorsData = [];
      for (const doc of snapshot.docs) {
        const actorData = doc.data();
        if (!actorData.movies || !Array.isArray(actorData.movies)) {
          console.error('Actor data missing or invalid movies field:', actorData);
          continue;
        }
        const movies = await fetchMovies(actorData.movies);
        actorsData.push({
          id: doc.id,
          ...actorData,
          movies
        });
      }
      actors.value = actorsData;
     // console.log("test", actors.value);
    });
  });

  return {
    actors,
  };
};


// with promise.All()
/* import { ref, onMounted } from 'vue';
import { actorsCollection, moviesCollection } from './firebase';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';

export const useActors = () => {
  const actors = ref([]);

  const fetchMovies = async (movieIds) => {
    const moviePromises = movieIds.map(movieId => getDoc(doc(moviesCollection, movieId)));
    const movieSnapshots = await Promise.all(moviePromises);
    return movieSnapshots.map(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
  };

  onMounted(() => {
    onSnapshot(actorsCollection, async (snapshot) => {
      const actorsData = await Promise.all(snapshot.docs.map(async (doc) => {
        const actorData = doc.data();
        const movies = await fetchMovies(actorData.movies);
        return {
          id: doc.id,
          ...actorData,
          movies
        };
      }));
      actors.value = actorsData;
      console.log("test", actors.value);
    });
  });

  return {
    actors,
  };
}; */