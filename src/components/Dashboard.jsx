import React, { useState, useEffect } from 'react';
import { RiMapPin2Line } from 'react-icons/ri';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [jobListings, setJobListings] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to job listings
    const unsubscribeJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobListings(jobs);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    });

    // Subscribe to training programs
    const unsubscribeTraining = onSnapshot(collection(db, 'training'), (snapshot) => {
      const training = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTrainingPrograms(training);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching training programs:', error);
      setLoading(false);
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeJobs();
      unsubscribeTraining();
    };
  }, []);

  if (loading) {
    return (
      <div className="ml-64 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Lowongan Pekerjaan Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={job.image} 
                alt={job.company} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <RiMapPin2Line className="mr-1" />
                  <span>{job.location}</span>
                </div>
                <button className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Program Pelatihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={program.image} 
                alt={program.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
                <button className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;