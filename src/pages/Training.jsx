import React from 'react';
import { useState } from 'react';
import { addTraining } from '../services/firebase';

const Training = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duration: '',
    instructor: '',
    capacity: '',
    description: '',
    status: 'Pendaftaran Dibuka'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const trainingData = {
        ...formData,
        createdAt: new Date().toISOString()
      };

      await addTraining(trainingData);
      setSuccess(true);
      setFormData({
        title: '',
        date: '',
        duration: '',
        instructor: '',
        capacity: '',
        description: '',
        status: 'Pendaftaran Dibuka'
      });
    } catch (err) {
      setError('Failed to create training schedule. Please try again later.');
      console.error('Error creating training:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 ml-64 animate-fadeIn">
      <h1 className="text-2xl font-bold mb-6">Buat Jadwal Pelatihan</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Pelatihan</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              placeholder="Contoh: 3 bulan, 2 minggu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instruktur</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Peserta</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pelatihan</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-2 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {error && (
            <div className="text-red-600 animate-fadeIn">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="text-green-600 animate-fadeIn">
              <p>Jadwal pelatihan berhasil dibuat!</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Buat Jadwal'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Training;