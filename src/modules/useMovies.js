import { ref, onMounted } from 'vue';
import { moviesCollection, moviesFirebaseCollectionRef, db } from './firebase';
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';

export const useMovies = () => {

  // Step 1: Create a new movie title and store it in a ref
  const newMovieTitle = ref('');

  // Step 2: Create a list of movies and store it in a ref
  const movies = ref([]);


  // Step 3: Create a function to retrieve a new movie to the list
  onMounted(() => {
    onSnapshot(moviesCollection, (snapshot) => {
      movies.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // spread operator
        /* title: doc.data().title,
        director: doc.data().director */
      }))
    })
  })

  // Step 4: Create a function to add a new movie to the list
  const addMovie = async () => {
    if(newMovieTitle.value.trim() === '') return; 
    // check if the input is empty, if input is empty, return (stop function)

    await addDoc(moviesCollection, {
      title: newMovieTitle.value
    })

    newMovieTitle.value = '';
  }

  // step 5: Create a function to delete a movie from the list
  const deleteMovie = async (id) => {
    console.log("deleting movie with id: ", id)
    await deleteDoc(doc(db, moviesFirebaseCollectionRef, id))
  } 

  return {
    movies,
    newMovieTitle,
    addMovie,
    deleteMovie
  }

}