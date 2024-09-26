// import { ref, onMounted } from 'vue';
// import { moviesCollection, moviesFirebaseCollectionRef, db } from './firebase';
// import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';

// export const useMovies = () => {

//   // Step 1: Create a new movie title and store it in a ref
//   const newMovieTitle = ref('');
//   const newMovieDirector = ref('');

//   // Step 2: Create a list of movies and store it in a ref
//   const movies = ref([]);


//   // Step 3: Create a function to retrieve a new movie to the list
//   onMounted(() => {
//     onSnapshot(moviesCollection, (snapshot) => {
//       movies.value = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data() // spread operator
//         /* title: doc.data().title,
//         director: doc.data().director */
//       }))
//     })
//   })

//   // Step 4: Create a function to add a new movie to the list
//   const addMovie = async () => {
//     if(newMovieTitle.value.trim() === '' && newMovieDirector.value.trim() === '' ) return; 
//     // check if the input is empty, if input is empty, return (stop function)

//     await addDoc(moviesCollection, {
//       title: newMovieTitle.value,
//       director: newMovieDirector.value
//     })

//     newMovieTitle.value = '';
//     newMovieDirector.value = '';
//   }

//   // step 5: Create a function to delete a movie from the list
//   const deleteMovie = async (id) => {
//     console.log("deleting movie with id: ", id)
//     await deleteDoc(doc(db, moviesFirebaseCollectionRef, id))
//   } 

//   return {
//     movies,
//     newMovieTitle,
//     newMovieDirector,
//     addMovie,
//     deleteMovie
//   }

// }



/**
 * Using multiselect to add actors to movies - actors are retrieved from the actors collection on firebase
 */
import { ref, onMounted, computed } from 'vue';
import { moviesCollection, actorsCollection } from './firebase';
import { onSnapshot, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';

export const useMovies = () => {
  // Step 1: Create a new movie title and director and store them in refs
  const newMovieTitle = ref('');
  const newMovieDirector = ref('');

  // Step 2: Create a list of movies and store it in a ref
  const movies = ref([]);

  // Step 3: Create a list of actors and store it in a ref
  const actors = ref([]);
  const selectedActors = ref([]);

  // Fetch actors from Firebase
  const fetchActors = async () => {
    const actorDocs = await getDocs(actorsCollection);
    actors.value = actorDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("actors", actors.value);
  };

  // Step 4: Create a function to retrieve a new movie to the list
  onMounted(() => {
    onSnapshot(moviesCollection, (snapshot) => {
      movies.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // spread operator
      }));
    });
    fetchActors();
  });

  // Step 5: Create a function to add a new movie to the list
  const addMovie = async () => {
    if (newMovieTitle.value.trim() === '' || newMovieDirector.value.trim() === '') return;
    // check if the input is empty, if input is empty, return (stop function)

    await addDoc(moviesCollection, {
      title: newMovieTitle.value,
      director: newMovieDirector.value,
      actors: selectedActors.value.map(actor => actor.id) // Store actor IDs
    });

    newMovieTitle.value = '';
    newMovieDirector.value = '';
    selectedActors.value = [];
  };

  // Step 6: Create a function to delete a movie from the list
  const deleteMovie = async (id) => {
    console.log("deleting movie with id: ", id);
    await deleteDoc(doc(moviesCollection, id));
  };

    // Computed property to map actor IDs to names
    const moviesWithActorNames = computed(() => {
      return movies.value.map(movie => ({
        ...movie,
        actors: movie.actors.map(actorId => {
          const actor = actors.value.find(actor => actor.id === actorId);
          return actor ? actor.name : 'Unknown';
        })
      }));
    });

  return {
    newMovieTitle,
    newMovieDirector,
    movies: moviesWithActorNames,
    actors,
    selectedActors,
    addMovie,
    deleteMovie
  };
};