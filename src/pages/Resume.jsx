import React from 'react';

const Resume = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pembuatan Resume</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Pengalaman Kerja</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan nama perusahaan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posisi</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan posisi"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pekerjaan</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                rows="4"
                placeholder="Deskripsikan tanggung jawab dan pencapaian Anda"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Keahlian</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daftar Keahlian</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              rows="3"
              placeholder="Masukkan keahlian Anda (pisahkan dengan koma)"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Preview Resume
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Simpan Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;