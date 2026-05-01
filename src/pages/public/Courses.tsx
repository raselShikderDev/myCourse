import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const allCourses = [
  { id: 1, title: 'React & TypeScript Masterclass', category: 'Web Development', price: 49.99, lectures: 120, hours: 24, desc: 'Build production-grade apps with React 18 and TypeScript from scratch to deployment.', color: 'from-violet-500 to-indigo-600', emoji: '⚛️' },
  { id: 2, title: 'Python for Data Science', category: 'Data Science', price: 39.99, lectures: 90, hours: 18, desc: 'Master pandas, numpy, matplotlib and scikit-learn with real-world datasets.', color: 'from-emerald-500 to-teal-600', emoji: '🐍' },
  { id: 3, title: 'UI/UX Design with Figma', category: 'Design', price: 29.99, lectures: 48, hours: 10, desc: 'Learn design thinking, wireframing, prototyping and handoff using Figma.', color: 'from-pink-500 to-rose-600', emoji: '🎨' },
  { id: 4, title: 'Node.js Backend Development', category: 'Web Development', price: 44.99, lectures: 100, hours: 20, desc: 'Build scalable REST APIs and microservices using Node.js, Express and PostgreSQL.', color: 'from-amber-500 to-orange-600', emoji: '🟢' },
  { id: 5, title: 'Machine Learning A–Z', category: 'Data Science', price: 59.99, lectures: 150, hours: 32, desc: 'Comprehensive ML course covering supervised, unsupervised and reinforcement learning.', color: 'from-cyan-500 to-blue-600', emoji: '🤖' },
  { id: 6, title: 'PostgreSQL & Databases', category: 'Database', price: 34.99, lectures: 72, hours: 14, desc: 'Deep-dive into relational databases, query optimization, indexing and schema design.', color: 'from-slate-500 to-slate-700', emoji: '🗄️' },
  { id: 7, title: 'DevOps & CI/CD Pipelines', category: 'DevOps', price: 54.99, lectures: 88, hours: 22, desc: 'Docker, Kubernetes, GitHub Actions and deploying to AWS and cloud providers.', color: 'from-rose-500 to-red-600', emoji: '🚀' },
  { id: 8, title: 'Advanced CSS & Animations', category: 'Design', price: 24.99, lectures: 60, hours: 12, desc: 'Modern CSS techniques including Grid, Flexbox, custom properties, and keyframe animations.', color: 'from-fuchsia-500 to-purple-600', emoji: '✨' },
  { id: 9, title: 'AWS Cloud Practitioner', category: 'Cloud', price: 64.99, lectures: 110, hours: 28, desc: 'Prepare for the AWS Cloud Practitioner exam and learn core cloud services.', color: 'from-orange-500 to-yellow-600', emoji: '☁️' },
];

const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Database', 'DevOps', 'Cloud'];
const priceRanges = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under $30', min: 0, max: 30 },
  { label: '$30 – $50', min: 30, max: 50 },
  { label: 'Over $50', min: 50, max: Infinity },
];

export const Courses: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceIdx, setPriceIdx] = useState(0);

  const range = priceRanges[priceIdx];
  const filtered = allCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchPrice = c.price >= range.min && c.price < range.max;
    return matchSearch && matchCat && matchPrice;
  });

  return (
    <div className="pt-16 min-h-screen bg-surface-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Explore All Courses</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Browse our library of expert-led courses and start learning today.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-5 mb-8 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-surface-100 text-slate-600 hover:bg-surface-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <select
            value={priceIdx}
            onChange={e => setPriceIdx(Number(e.target.value))}
            className="text-sm border border-surface-300 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
          >
            {priceRanges.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="font-semibold text-slate-700 mb-2">No courses found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course.id}
                className="group bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className={`h-44 bg-gradient-to-br ${course.color} flex items-center justify-center relative`}>
                  <span className="text-5xl">{course.emoji}</span>
                  <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{course.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span>📖 {course.lectures} lectures</span>
                    <span>·</span>
                    <span>⏱ {course.hours}h</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                    <span className="text-xl font-bold text-slate-900">${course.price}</span>
                    <Link to={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Details
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};