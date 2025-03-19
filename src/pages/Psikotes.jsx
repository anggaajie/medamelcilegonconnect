import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { getAvailableTests, getUserScheduledTests, getUserTestResults } from '../services/psikotes';

const Psikotes = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [availableTests, setAvailableTests] = useState([]);
  const [scheduledTests, setScheduledTests] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { name: 'Tes Tersedia', component: 'TestersediaTab' },
    { name: 'Jadwal Saya', component: 'JadwalSayaTab' },
    { name: 'Hasil Tes', component: 'HasilTesTab' },
    { name: 'Tutorial', component: 'TutorialTab' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // For now using a dummy userId, in real app this should come from auth context
        const userId = 'dummyUserId';
        
        const [tests, scheduled, results] = await Promise.all([
          getAvailableTests(),
          getUserScheduledTests(userId),
          getUserTestResults(userId)
        ]);

        setAvailableTests(tests);
        setScheduledTests(scheduled);
        setTestResults(results);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading psikotes data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Psikotes</h1>
        <p className="text-gray-600">Persiapkan diri Anda untuk tes psikologi</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#A6C5F7] to-[#E4DFDF] text-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-opacity-90">
          <h3 className="font-semibold mb-1">Jadwal Tes Saya</h3>
          <p className="text-sm">{scheduledTests.length} tes akan datang</p>
        </div>
        <div className="bg-gradient-to-br from-[#A6C5F7] to-[#E4DFDF] text-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-opacity-90">
          <h3 className="font-semibold mb-1">Hasil Tes</h3>
          <p className="text-sm">{testResults.length} tes selesai</p>
        </div>
        <div className="bg-gradient-to-br from-[#A6C5F7] to-[#E4DFDF] text-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-opacity-90">
          <h3 className="font-semibold mb-1">Tutorial</h3>
          <p className="text-sm">Panduan persiapan</p>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 border-b">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `py-2 px-4 text-sm font-medium border-b-2 ${selected
                  ? 'border-[#A6C5F7] text-gray-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Tes Tersedia Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availableTests.map((test) => (
                <div key={test.id} className="bg-[#E4DFDF] rounded-lg shadow-md overflow-hidden backdrop-blur-sm bg-opacity-90">
                  <img src={test.imageUrl} alt={test.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{test.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${test.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {test.status === 'active' ? 'Tersedia' : 'Penuh'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>⏱ {test.duration} menit</p>
                      <p>📝 {test.questionCount} Soal</p>
                      <p>✍️ {test.type}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Lihat Detail
                      </button>
                      <button 
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm hover:shadow transition-all duration-300 ${test.status === 'active' ? 'bg-[#FEA64A] hover:bg-[#FEA64A]/80' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={test.status !== 'active'}
                      >
                        Daftar Tes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Jadwal Saya Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              {scheduledTests.map((test) => (
                <div key={test.id} className="bg-[#E4DFDF] p-4 rounded-lg shadow-md hover:shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-semibold">{test.testName}</h3>
                  <p className="text-sm text-gray-600">Dijadwalkan: {new Date(test.scheduledDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Hasil Tes Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              {testResults.map((result) => (
                <div key={result.id} className="bg-[#E4DFDF] p-4 rounded-lg shadow-md hover:shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02]">
                  <h3 className="font-semibold">{result.testName}</h3>
                  <p className="text-sm text-gray-600">Selesai: {new Date(result.completedDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Skor: {result.score}</p>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Tutorial Panel */}
          <Tab.Panel>
            <div className="prose max-w-none">
              <h2>Panduan Persiapan Psikotes</h2>
              <p>Ikuti panduan ini untuk mempersiapkan diri Anda menghadapi tes psikologi:</p>
              <ul>
                <li>Pastikan Anda berada di tempat yang tenang dan nyaman</li>
                <li>Siapkan koneksi internet yang stabil</li>
                <li>Baca instruksi dengan teliti sebelum memulai tes</li>
                <li>Jawab setiap pertanyaan dengan jujur dan sesuai dengan diri Anda</li>
              </ul>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Psikotes;