import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, doc, getDoc, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Collection references
const jobsCollection = collection(db, 'jobs');
const trainingCollection = collection(db, 'trainings');

// Training-related functions
export const addTraining = async (trainingData) => {
  try {
    const docRef = await addDoc(trainingCollection, trainingData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding training:', error);
    throw error;
  }
};

// Job-related functions
export const addJob = async (jobData) => {
  try {
    const docRef = await addDoc(jobsCollection, jobData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

export const getJobs = async (filters = {}) => {
  try {
    let jobQuery = jobsCollection;
    
    // Apply filters
    if (filters.searchQuery) {
      jobQuery = query(jobQuery, 
        where('title', '>=', filters.searchQuery),
        where('title', '<=', filters.searchQuery + '\uf8ff')
      );
    }
    
    if (filters.location && filters.location !== 'Semua Lokasi') {
      jobQuery = query(jobQuery, where('location', '==', filters.location));
    }
    
    if (filters.category && filters.category !== 'Semua Kategori') {
      jobQuery = query(jobQuery, where('category', '==', filters.category));
    }
    
    if (filters.salaryRange) {
      jobQuery = query(jobQuery,
        where('salary.min', '>=', filters.salaryRange[0] * 1000000),
        where('salary.max', '<=', filters.salaryRange[1] * 1000000)
      );
    }
    
    // Order by posted date
    jobQuery = query(jobQuery, orderBy('postedDate', 'desc'));
    
    const snapshot = await getDocs(jobQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));
    if (jobDoc.exists()) {
      return {
        id: jobDoc.id,
        ...jobDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};