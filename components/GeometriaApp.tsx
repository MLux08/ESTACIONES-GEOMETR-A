'use client';

import React, { useState } from 'react';
import { AppState } from '@/lib/types';
import { Book, Star, Map, GraduationCap, Compass, Circle, Square, Triangle, Hexagon, Save, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Calculator from './Calculator';
import Cover from './Cover';
import Passport from './Passport';
import Station1 from './stations/Station1';
import Station2 from './stations/Station2';
import Station3 from './stations/Station3';
import Station4 from './stations/Station4';
import Station5 from './stations/Station5';
import Station6 from './stations/Station6';
import Station7 from './stations/Station7';

const STATIONS = [
  { id: 0, title: 'Portada', icon: Book },
  { id: 99, title: 'Pasaporte', icon: Map },
  { id: 1, title: 'Estación 1: Base y Altura', icon: Triangle },
  { id: 2, title: 'Estación 2: El Misterioso π', icon: Circle },
  { id: 3, title: 'Estación 3: La Fórmula', icon: Compass },
  { id: 4, title: 'Estación 4: Paralelogramos', icon: Square },
  { id: 5, title: 'Estación 5: Área del Círculo', icon: Circle },
  { id: 6, title: 'Estación 6: El Triángulo', icon: Triangle },
  { id: 7, title: 'Estación 7: Figuras Compuestas', icon: Hexagon },
];

export default function GeometriaApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [state, setState] = useState<AppState>({
    profile: { name: '', course: '', date: '' },
    stations: {
      1: { id: 1, completed: false, rating: 0 },
      2: { id: 2, completed: false, rating: 0 },
      3: { id: 3, completed: false, rating: 0 },
      4: { id: 4, completed: false, rating: 0 },
      5: { id: 5, completed: false, rating: 0 },
      6: { id: 6, completed: false, rating: 0 },
      7: { id: 7, completed: false, rating: 0 },
    }
  });

  const updateProfile = (field: keyof AppState['profile'], value: string) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const markCompleted = (id: number) => {
    setState(prev => ({
      ...prev,
      stations: {
        ...prev.stations,
        [id]: { ...prev.stations[id], completed: true }
      }
    }));
  };

  const rateStation = (id: number, rating: number) => {
    setState(prev => ({
      ...prev,
      stations: {
        ...prev.stations,
        [id]: { ...prev.stations[id], rating }
      }
    }));
  };

  const totalStations = 7;
  const completedStationsCount = Object.values(state.stations).filter(s => s.completed).length;
  const progressPercentage = Math.round((completedStationsCount / totalStations) * 100);

  const renderContent = () => {
    switch (activeTab) {
      case 0: return <Cover profile={state.profile} updateProfile={updateProfile} onNext={() => setActiveTab(99)} />;
      case 99: return <Passport state={state} onNav={setActiveTab} />;
      case 1: return <Station1 onComplete={() => markCompleted(1)} onRate={(r: number) => rateStation(1, r)} rating={state.stations[1].rating} completed={state.stations[1].completed} onNext={() => setActiveTab(2)} />;
      case 2: return <Station2 onComplete={() => markCompleted(2)} onRate={(r: number) => rateStation(2, r)} rating={state.stations[2].rating} completed={state.stations[2].completed} onNext={() => setActiveTab(3)} />;
      case 3: return <Station3 onComplete={() => markCompleted(3)} onRate={(r: number) => rateStation(3, r)} rating={state.stations[3].rating} completed={state.stations[3].completed} onNext={() => setActiveTab(4)} />;
      case 4: return <Station4 onComplete={() => markCompleted(4)} onRate={(r: number) => rateStation(4, r)} rating={state.stations[4].rating} completed={state.stations[4].completed} onNext={() => setActiveTab(5)} />;
      case 5: return <Station5 onComplete={() => markCompleted(5)} onRate={(r: number) => rateStation(5, r)} rating={state.stations[5].rating} completed={state.stations[5].completed} onNext={() => setActiveTab(6)} />;
      case 6: return <Station6 onComplete={() => markCompleted(6)} onRate={(r: number) => rateStation(6, r)} rating={state.stations[6].rating} completed={state.stations[6].completed} onNext={() => setActiveTab(7)} />;
      case 7: return <Station7 onComplete={() => markCompleted(7)} onRate={(r: number) => rateStation(7, r)} rating={state.stations[7].rating} completed={state.stations[7].completed} onNext={() => setActiveTab(99)} />;
      default: return <div>Not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 shadow-xl z-10 transition-all duration-300">
        <div className="p-6 bg-slate-950 flex flex-col items-center gap-2 border-b border-slate-800">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="font-bold text-white text-center mt-2 leading-tight">Mundo Geométrico</h1>
          <p className="text-xs text-slate-500">5º Primaria</p>
        </div>
        
        <div className="p-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progreso de actividades</span>
            <span className="text-xs font-bold text-blue-400">{progressPercentage}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {STATIONS.map((station) => {
              const Icon = station.icon;
              const isActive = activeTab === station.id;
              const isStation = station.id >= 1 && station.id <= 7;
              const isComp = isStation && state.stations[station.id].completed;
              return (
                <button
                  key={station.id}
                  onClick={() => setActiveTab(station.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-all duration-200 group text-left",
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                      : "hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-blue-200" : "text-slate-500 group-hover:text-slate-400")} />
                    <span className="truncate">{station.title}</span>
                  </div>
                  {isComp && <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-white" : "text-green-500")} />}
                </button>
              );
            })}
          </nav>
        </div>
        
        {state.profile.name && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Explorador/a</div>
            <div className="font-medium text-white truncate">{state.profile.name}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div 
        className="flex-1 overflow-auto relative"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.25 }}
            className="min-h-full p-4 md:p-8 flex justify-center items-start relative z-10"
          >
            <div className="w-full max-w-4xl pt-4 pb-20">
              {renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Calculator />
    </div>
  );
}
