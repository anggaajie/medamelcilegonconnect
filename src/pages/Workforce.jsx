import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Workforce = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersCollection = collection(db, 'users');
        const workersSnapshot = await getDocs(workersCollection);
        const workersData = workersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWorkers(workersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workers:', error);
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter(worker =>
    worker.nik?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A6C5F7]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Daftar Tenaga Kerja</h1>
      
      <div className="mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Cari tenaga kerja..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6C5F7] focus:border-transparent text-sm md:text-base"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredWorkers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-[#A6C5F7] rounded-full flex items-center justify-center text-white text-base md:text-xl font-semibold">
                {worker.name?.[0] || '?'}
              </div>
              <div className="ml-3 md:ml-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{worker.name || 'Nama tidak tersedia'}</h3>
                <p className="text-sm md:text-base text-gray-600">{worker.email || 'Email tidak tersedia'}</p>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-semibold">NIK:</span> {worker.nik || 'Tidak tersedia'}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-semibold">No. Telepon:</span> {worker.phone || 'Tidak tersedia'}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-semibold">Alamat:</span> {worker.address || 'Tidak tersedia'}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                <span className="font-semibold">Keahlian:</span> {worker.skills?.join(', ') || 'Tidak tersedia'}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWorkers.length === 0 && (
        <div className="text-center py-6 md:py-8">
          <p className="text-gray-600 text-base md:text-lg">Tidak ada tenaga kerja yang ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default Workforce;