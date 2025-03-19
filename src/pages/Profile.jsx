import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { RiImageAddLine } from 'react-icons/ri';

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [diseaseHistory, setDiseaseHistory] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleAddDiseaseHistory = () => {
    setDiseaseHistory([...diseaseHistory, {
      disease: '',
      diagnosisDate: '',
      treatment: '',
      status: ''
    }]);
  };

  const handlePhotoChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!photo) return;
    
    try {
      setUploading(true);
      const storageRef = ref(storage, `profile-photos/${Date.now()}-${photo.name}`);
      await uploadBytes(storageRef, photo);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Profil Saya</h1>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative">
            <div className="w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <RiImageAddLine className="text-3xl md:text-4xl text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-orange-500 p-1.5 md:p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
              <input
                type="file"
                onChange={handlePhotoChange}
                className="hidden"
                accept="image/*"
              />
              <RiImageAddLine className="text-white text-lg md:text-xl" />
            </label>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan NIK"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KTP</label>
              <input
                type="file"
                accept=".pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Paspor</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nomor paspor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIM</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nomor SIM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor NPWP</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nomor NPWP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nomor WhatsApp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usia</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan usia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan tempat lahir"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu Kandung</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nama ibu kandung"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Akun Media Sosial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan username Instagram"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan username Facebook"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan username TikTok"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan username X"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Alamat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan alamat lengkap"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan kelurahan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan kecamatan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan kota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan kode pos"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Pernikahan</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Pilih status</option>
                <option value="Lajang">Lajang</option>
                <option value="Menikah">Menikah</option>
                <option value="Cerai">Cerai</option>
              </select>
            </div>
            {maritalStatus && maritalStatus !== 'Lajang' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pasangan</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan nama pasangan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tanggungan</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan jumlah tanggungan"
                    min="0"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Riwayat Bekerja</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Terakhir</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan pekerjaan terakhir"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lama Bekerja</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan lama bekerja (contoh: 2 tahun)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan Terakhir</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan jabatan terakhir"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan Terakhir</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan penghasilan terakhir"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Riwayat Penyakit</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
                  onClick={handleAddDiseaseHistory}
                >
                  <span>+ Tambah Riwayat Penyakit</span>
                </button>
              </div>
              {diseaseHistory.map((history, index) => (
                <div key={index} className="md:col-span-2 p-4 border rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penyakit</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Masukkan nama penyakit"
                        value={history.disease}
                        onChange={(e) => {
                          const newHistory = [...diseaseHistory];
                          newHistory[index].disease = e.target.value;
                          setDiseaseHistory(newHistory);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Diagnosis</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        value={history.diagnosisDate}
                        onChange={(e) => {
                          const newHistory = [...diseaseHistory];
                          newHistory[index].diagnosisDate = e.target.value;
                          setDiseaseHistory(newHistory);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pengobatan</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Masukkan jenis pengobatan"
                        value={history.treatment}
                        onChange={(e) => {
                          const newHistory = [...diseaseHistory];
                          newHistory[index].treatment = e.target.value;
                          setDiseaseHistory(newHistory);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        value={history.status}
                        onChange={(e) => {
                          const newHistory = [...diseaseHistory];
                          newHistory[index].status = e.target.value;
                          setDiseaseHistory(newHistory);
                        }}
                      >
                        <option value="">Pilih status</option>
                        <option value="Sembuh">Sembuh</option>
                        <option value="Dalam Pengobatan">Dalam Pengobatan</option>
                        <option value="Kronis">Kronis</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Riwayat Pendidikan</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Instansi</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan nama instansi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang Pendidikan</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="">Pilih jenjang pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D1/D2">D1/D2</option>
                  <option value="D3">D3</option>
                  <option value="STRATA 1">STRATA 1</option>
                  <option value="STRATA 2">STRATA 2</option>
                  <option value="STRATA 3">STRATA 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan/Fakultas</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan jurusan/fakultas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Ijazah</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan nomor ijazah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ijazah</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Skill dan Kemampuan</h2>
          
          {/* Sertifikasi dan Pelatihan */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-4">Sertifikasi dan Pelatihan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelatihan dan Keahlian</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan nama pelatihan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Sertifikat</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan nomor sertifikat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instansi Penyelenggara</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Masukkan instansi penyelenggara"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sertifikat (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Organisasi */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-4">Organisasi</h3>
            <button
              onClick={() => setOrganizations([...organizations, { name: '', role: '', period: '' }])}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2 mb-4"
            >
              <span>+ Tambah Pengalaman Organisasi</span>
            </button>
            {organizations.map((org, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Organisasi</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan nama organisasi"
                    value={org.name}
                    onChange={(e) => {
                      const newOrgs = [...organizations];
                      newOrgs[index].name = e.target.value;
                      setOrganizations(newOrgs);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan jabatan"
                    value={org.role}
                    onChange={(e) => {
                      const newOrgs = [...organizations];
                      newOrgs[index].role = e.target.value;
                      setOrganizations(newOrgs);
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan periode (contoh: 2019-2020)"
                    value={org.period}
                    onChange={(e) => {
                      const newOrgs = [...organizations];
                      newOrgs[index].period = e.target.value;
                      setOrganizations(newOrgs);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bahasa */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-4">Bahasa yang Dikuasai</h3>
            <button
              onClick={() => setLanguages([...languages, { name: '', proficiency: '' }])}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2 mb-4"
            >
              <span>+ Tambah Bahasa</span>
            </button>
            {languages.map((lang, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bahasa</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Masukkan nama bahasa"
                    value={lang.name}
                    onChange={(e) => {
                      const newLangs = [...languages];
                      newLangs[index].name = e.target.value;
                      setLanguages(newLangs);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Kemampuan</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newLangs = [...languages];
                      newLangs[index].proficiency = e.target.value;
                      setLanguages(newLangs);
                    }}
                  >
                    <option value="">Pilih tingkat kemampuan</option>
                    <option value="Pemula">Pemula</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Mahir">Mahir</option>
                    <option value="Sangat Mahir">Sangat Mahir</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;