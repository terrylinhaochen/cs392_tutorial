// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtoH0wRQ5BZ7fT6DFm-SpDw4YUEW5Iid0",
  authDomain: "cs392tutorial.firebaseapp.com",
  databaseURL: "https://cs392tutorial-default-rtdb.firebaseio.com",
  projectId: "cs392tutorial",
  storageBucket: "cs392tutorial.appspot.com",
  messagingSenderId: "605522652540",
  appId: "1:605522652540:web:98f9a16abf5ebd0e1cc8f9",
  measurementId: "G-BCS4P6YHCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);

// Authentication functions
export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

export { signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(app), setUser)
  ), []);

  return [user];
};

// Database hook
const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        setData(snapshot.val());
        setError(null);
      },
      (error) => setError(error)
    );

    return unsubscribe;
  }, [path]);

  return [data, error];
};

// New hook for updates
export const useDbUpdate = (path) => {
  const [result, setResult] = useState(null);
  
  const update = async (values) => {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, values);
      setResult({ message: 'Success!' });
    } catch (error) {
      setResult({ message: error.message });
    }
  };

  return [update, result];
};

// Make sure we're explicitly exporting useCourses
export const useCourses = () => {
  const [data, error] = useDbData('/');
  
  return {
    data,
    error,
    isLoading: data === undefined
  };
};

// Migration utility
export const migrateCourseData = async () => {
  try {
    const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
    if (!response.ok) throw new Error('Failed to fetch course data');
    const courseData = await response.json();
    
    await set(ref(database, '/'), courseData);
    console.log('Data successfully migrated to Firebase');
    return true;
  } catch (error) {
    console.error('Error migrating data:', error);
    return false;
  }
};

// Export everything that needs to be used elsewhere
export { useDbData };