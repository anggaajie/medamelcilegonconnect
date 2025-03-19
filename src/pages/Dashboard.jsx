import React from 'react';
import Carousel from '../components/Carousel';

const Dashboard = () => {
  const jobCards = [
    {
      title: "Software Engineer",
      description: "Develop and maintain web applications using React and Node.js",
      company: "Tech Solutions Inc.",
      location: "Cilegon, Banten"
    },
    {
      title: "UI/UX Designer",
      description: "Create user-friendly interfaces and improve user experience",
      company: "Creative Studio",
      location: "Cilegon, Banten"
    },
    {
      title: "Project Manager",
      description: "Lead and coordinate development teams for successful project delivery",
      company: "Innovation Labs",
      location: "Cilegon, Banten"
    }
  ];

  const trainingPrograms = [
    {
      title: "Web Development Bootcamp",
      description: "Learn modern web development technologies and best practices",
      duration: "12 weeks",
      startDate: "1 September 2023"
    },
    {
      title: "Digital Marketing",
      description: "Master social media marketing and SEO strategies",
      duration: "8 weeks",
      startDate: "15 September 2023"
    },
    {
      title: "Leadership Skills",
      description: "Develop essential leadership and management skills",
      duration: "4 weeks",
      startDate: "5 September 2023"
    }
  ];

  const psychTests = [
    {
      title: "Personality Assessment",
      description: "Discover your personality type and career compatibility",
      duration: "45 minutes",
      type: "Online Test"
    },
    {
      title: "Aptitude Test",
      description: "Evaluate your skills and potential in various fields",
      duration: "60 minutes",
      type: "Online Test"
    },
    {
      title: "IQ Test",
      description: "Measure your problem-solving and analytical abilities",
      duration: "30 minutes",
      type: "Online Test"
    }
  ];

  return (
    <div className="min-h-screen bg-[#97c4e8] dark:bg-dark-bg flex items-center justify-center py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white dark:text-dark-text mb-4 relative top-6 animate-fade-in">
            Selamat Datang di Medamel
          </h1>
          <p className="text-xl sm:text-2xl text-white dark:text-dark-text-secondary max-w-2xl mx-auto relative top-6 animate-slide-in opacity-90">
            Portal Assessment dan Pendataan Tenaga Kerja dan Minat Warga Cilegon
          </p>
        </header>

        <div className="space-y-16">
          <section className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-6 sm:p-8 transition-all hover:shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Lowongan Pekerjaan
            </h2>
            <Carousel>
              {jobCards.map((job, index) => (
                <div key={index} className="bg-gray-50 dark:bg-dark-border p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-all duration-300 cursor-pointer animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">{job.title}</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-4">{job.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary">
                    <span className="mr-4">{job.company}</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-6 sm:p-8 transition-all hover:shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Program Pelatihan
            </h2>
            <Carousel>
              {trainingPrograms.map((program, index) => (
                <div key={index} className="bg-gray-50 dark:bg-dark-border p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-all duration-300 cursor-pointer animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">{program.title}</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-4">{program.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Durasi: {program.duration}</span>
                    <span>Mulai: {program.startDate}</span>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>

          <section className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-6 sm:p-8 transition-all hover:shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Tes Psikologi
            </h2>
            <Carousel>
              {psychTests.map((test, index) => (
                <div key={index} className="bg-gray-50 dark:bg-dark-border p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border/80 transition-all duration-300 cursor-pointer animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">{test.title}</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-4">{test.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Durasi: {test.duration}</span>
                    <span>{test.type}</span>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;