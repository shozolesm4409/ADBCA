import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project } from '@/types';
import { Globe, Image as ImageIcon } from 'lucide-react';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: Requires composite index on 'isVisible' and 'timestamp'
    // If index is missing, it might fail or require creating index in Firebase console.
    // Fallback: fetch all and filter client side if needed, but query is better.
    // For now, let's try simple query. If it fails due to index, I'll remove orderBy or create index.
    // Actually, simple queries don't need index. Compound queries do.
    // where + orderBy usually needs index.
    // Let's try just fetching all and filtering in memory for safety in this environment.
    
    const q = query(collection(db, 'projects'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(data.filter(p => p.isVisible));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center p-12 text-slate-500">
        No projects available at the moment.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="aspect-video bg-slate-100 relative overflow-hidden group">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.heading} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              {project.isLive && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.heading}</h3>
              <p className="text-slate-600 mb-6 flex-1 line-clamp-3">{project.description}</p>
              
              {project.webLink && (
                <a 
                  href={project.webLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md active:transform active:scale-95"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
