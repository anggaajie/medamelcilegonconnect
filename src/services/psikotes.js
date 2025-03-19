import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Collection references
const psikotesCollection = collection(db, 'psikotes');
const userTestsCollection = collection(db, 'userTests');

// Get all available tests
export const getAvailableTests = async () => {
  try {
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    const testQuery = query(psikotesCollection, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(testQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching available tests:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check your Firebase permissions.');
    }
    if (error.code === 'not-found') {
      throw new Error('The requested test collection does not exist.');
    }
    throw new Error('Failed to fetch available tests. Please try again later.');
  }
};

// Get user's scheduled tests
export const getUserScheduledTests = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const scheduledQuery = query(
      userTestsCollection,
      where('userId', '==', userId),
      where('status', '==', 'scheduled'),
      orderBy('scheduledDate', 'asc')
    );
    const snapshot = await getDocs(scheduledQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user scheduled tests:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check your Firebase permissions.');
    }
    throw new Error('Failed to fetch scheduled tests. Please try again later.');
  }
};

// Get user's test results
export const getUserTestResults = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const resultsQuery = query(
      userTestsCollection,
      where('userId', '==', userId),
      where('status', '==', 'completed'),
      orderBy('completedDate', 'desc')
    );
    const snapshot = await getDocs(resultsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user test results:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check your Firebase permissions.');
    }
    throw new Error('Failed to fetch test results. Please try again later.');
  }
};

// Get test details by ID
export const getTestById = async (testId) => {
  try {
    if (!testId) {
      throw new Error('Test ID is required');
    }
    const testDoc = await getDoc(doc(db, 'psikotes', testId));
    if (testDoc.exists()) {
      return {
        id: testDoc.id,
        ...testDoc.data()
      };
    }
    throw new Error('Test not found');
  } catch (error) {
    console.error('Error fetching test details:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check your Firebase permissions.');
    }
    throw new Error('Failed to fetch test details. Please try again later.');
  }
};