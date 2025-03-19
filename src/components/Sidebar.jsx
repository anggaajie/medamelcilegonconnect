import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardLine, RiUserLine, RiBriefcaseLine, RiBookReadLine, RiBrainLine, RiFileTextLine, RiTeamLine } from 'react-icons/ri';

const Sidebar = () => {
  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: RiDashboardLine },
    { path: '/profile', name: 'Profil', icon: RiUserLine },
    { path: '/jobs', name: 'Lowongan Pekerjaan', icon: RiBriefcaseLine },
    { path: '/training', name: 'Jadwal Pelatihan', icon: RiBookReadLine },
    { path: '/psychotest', name: 'Psikotes', icon: RiBrainLine },
    { path: '/resume', name: 'Pembuatan Resume', icon: RiFileTextLine },
    { path: '/workforce', name: 'Daftar Tenaga Kerja', icon: RiTeamLine },
  ];

  return (
    <div className="h-screen w-64 bg-[#E9F1FF] text-primary-600 shadow-lg fixed left-0 top-0 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23A6C5F7' fill-opacity='0.4'/%3E%3C/svg%3E")`
        }}
      />
      <div className="p-4 relative z-10">
        <h1 className="text-2xl font-bold text-[#6DA5FF] mb-8 transition-all duration-300 hover:scale-105">Medamel lur</h1>
      </div>
      <nav className="px-4 relative z-10">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                  ? 'bg-white text-primary-600 shadow-[0_4px_12px_#6DA5FF] transform scale-105'
                  : 'text-primary-600 hover:bg-white hover:text-primary-600 hover:shadow-[0_4px_12px_#6DA5FF] hover:scale-105'}`
              }
            >
              <Icon className="text-xl transition-transform duration-300 group-hover:rotate-12" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;