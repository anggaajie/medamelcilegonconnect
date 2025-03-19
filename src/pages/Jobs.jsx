import React from 'react';
import { useState } from 'react';
import { addJob } from '../services/firebase';

const Jobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    position: '',
    department: '',
    skills: '',
    languages: '',
    description: ''
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

      const jobData = {
        ...formData,
        createdAt: new Date().toISOString()
      };

      await addJob(jobData);
      setSuccess(true);
      setFormData({
        title: '',
        company: '',
        position: '',
        department: '',
        skills: '',
        languages: '',
        description: ''
      });
    } catch (err) {
      setError('Failed to post job. Please try again later.');
      console.error('Error posting job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-8 md:ml-64 animate-fadeIn min-h-screen bg-white">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Buat Lowongan Pekerjaan</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Pekerjaan</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
              required
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Nama Perusahaan</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Jabatan</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Departemen</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Keahlian yang Dibutuhkan</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
              placeholder="Contoh: Microsoft Office, Adobe Photoshop, Programming"
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Bahasa yang Dikuasai</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
              placeholder="Contoh: Indonesia, Inggris, Mandarin"
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">Deskripsi Pekerjaan</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-4 sm:p-2 md:p-3 border rounded-lg shadow-sm transition-all duration-300 focus:shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg sm:text-base"
              required
            ></textarea>
          </div>

          {error && (
            <div className="text-red-600 animate-fadeIn text-base sm:text-sm">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="text-green-600 animate-fadeIn text-base sm:text-sm">
              <p>Lowongan pekerjaan berhasil dibuat!</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 sm:py-3 bg-blue-600 text-white text-lg sm:text-base rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Buat Lowongan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Jobs;