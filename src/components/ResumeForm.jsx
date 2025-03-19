import { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const ResumeForm = () => {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedinUrl: '',
    photo: null,
    workExperience: '',
    education: '',
    skills: ''
  });

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleAutoFill = () => {
    if (profileData) {
      setFormData(prevData => ({
        ...prevData,
        name: profileData.fullName || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        address: profileData.address || '',
        photo: profileData.photoURL || null
      }));
    }
  };
  const [previewData, setPreviewData] = useState({
    name: 'Budi Santoso',
    title: 'Senior Software Engineer',
    email: 'budi.santoso@email.com',
    phone: '+62 812-3455-7890',
    address: 'Jakarta Selatan, Indonesia',
    company: 'PT Teknologi Maju Indonesia',
    position: 'Senior Software Engineer',
    period: 'Jan 2020 - Sekarang'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        photo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const resumeRef = collection(db, 'resumes');
      await addDoc(resumeRef, {
        ...formData,
        createdAt: new Date().toISOString()
      });

      setSubmitStatus({
        type: 'success',
        message: 'Resume berhasil disimpan!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan. Silakan coba lagi.'
      });
      console.error('Error saving resume:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembuatan Resume</h2>
      <p className="text-gray-600 mb-6">Buat resume profesional Anda dengan mudah</p>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTemplate('modern')}
          className={`px-4 py-2 rounded ${activeTemplate === 'modern' ? 'bg-gray-200' : ''}`}
        >
          Template Modern
        </button>
        <button
          onClick={() => setActiveTemplate('professional')}
          className={`px-4 py-2 rounded ${activeTemplate === 'professional' ? 'bg-gray-200' : ''}`}
        >
          Template Professional
        </button>
        <button
          onClick={() => setActiveTemplate('creative')}
          className={`px-4 py-2 rounded ${activeTemplate === 'creative' ? 'bg-gray-200' : ''}`}
        >
          Template Kreatif
        </button>
      </div>

      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Data Pribadi</h3>
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Isi dari Profil
              </button>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">Foto Profil</p>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  {formData.photo ? (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  )}
                </div>
                <button
                  onClick={() => document.getElementById('photo-upload').click()}
                  className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                  Unggah Foto
                </button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Masukkan URL LinkedIn"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Preview Resume</h3>
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{previewData.name}</h2>
                  <p className="text-gray-600">{previewData.title}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Kontak</h3>
                <p>{previewData.email}</p>
                <p>{previewData.phone}</p>
                <p>{previewData.address}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Pengalaman Kerja</h3>
                <div>
                  <h4 className="font-medium">{previewData.company}</h4>
                  <p className="text-gray-600">{previewData.position}</p>
                  <p className="text-sm text-gray-500">{previewData.period}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;