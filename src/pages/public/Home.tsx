import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Tiny animation hook (IntersectionObserver, no framer dep) ── */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ── Mock data ── */
const features = [
  { icon: '🎯', title: 'Structured Learning', desc: 'Follow curated curricula designed by industry experts to achieve your goals faster.' },
  { icon: '⚡', title: 'Learn at Your Pace', desc: 'Access course materials anytime, anywhere. No deadlines, no pressure.' },
  { icon: '🏆', title: 'Earn Certificates', desc: 'Showcase verified credentials to employers and stand out in the job market.' },
  { icon: '🤝', title: 'Expert Instructors', desc: 'Learn from practitioners who have real-world experience in their fields.' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Our platform works seamlessly on all devices — desktop, tablet, and mobile.' },
  { icon: '🔄', title: 'Lifetime Access', desc: 'Once enrolled, keep access to course content including all future updates.' },
];

const popularCourses = [
  { id: 1, title: 'React & TypeScript Masterclass', category: 'Web Development', price: 49.99, lectures: 120, hours: 24, color: 'from-violet-500 to-indigo-600', emoji: '⚛️' },
  { id: 2, title: 'Python for Data Science', category: 'Data Science', price: 39.99, lectures: 90, hours: 18, color: 'from-emerald-500 to-teal-600', emoji: '🐍' },
  { id: 3, title: 'UI/UX Design with Figma', category: 'Design', price: 29.99, lectures: 48, hours: 10, color: 'from-pink-500 to-rose-600', emoji: '🎨' },
  { id: 4, title: 'Node.js Backend Development', category: 'Backend', price: 44.99, lectures: 100, hours: 20, color: 'from-amber-500 to-orange-600', emoji: '🟢' },
  { id: 5, title: 'Machine Learning A–Z', category: 'AI/ML', price: 59.99, lectures: 150, hours: 32, color: 'from-cyan-500 to-blue-600', emoji: '🤖' },
  { id: 6, title: 'PostgreSQL & Databases', category: 'Database', price: 34.99, lectures: 72, hours: 14, color: 'from-slate-500 to-slate-700', emoji: '🗄️' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Frontend Developer', avatar: 'SC', text: 'CourseMS helped me land my first dev job in just 4 months. The structured curriculum is phenomenal and the instructors are genuinely world-class.' },
  { name: 'Marcus Rivera', role: 'Data Analyst', avatar: 'MR', text: 'I went from zero Python knowledge to building machine learning models. The hands-on projects made all the difference in my learning journey.' },
  { name: 'Aisha Patel', role: 'Product Designer', avatar: 'AP', text: 'The UI/UX course was exactly what I needed. Clear, modern, and deeply practical. I use what I learned every single day at my current job.' },
];

const stats = [
  { value: '50K+', label: 'Students Enrolled' },
  { value: '200+', label: 'Expert Courses' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '80+', label: 'Countries Reached' },
];

export const Home: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 pt-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              New courses added every week
            </div>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-7 transition-all duration-1000 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Master new skills,<br />
            <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              shape your future.
            </span>
          </h1>

          <p className={`text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Access 200+ expert-led courses across web development, data science, design, and more. Learn at your own pace and level up your career.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 hover:shadow-brand-500/40 hover:scale-105 text-base">
              Browse Courses
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10 text-base">
              Learn More
            </Link>
          </div>

          {/* Stats Row */}
          <div className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-500 text-xs">Scroll</span>
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">Why CourseMS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">Everything you need to succeed</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We've built the platform that learners and instructors deserve — fast, intuitive, and powerful.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group p-6 rounded-2xl border border-surface-200 hover:border-brand-200 bg-white hover:bg-brand-50/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR COURSES ── */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">Popular</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">Top courses right now</h2>
            </div>
            <Link to="/courses" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0">
              View all courses →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, i) => (
              <Reveal key={course.id} delay={i * 70}>
                <div className="group bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  {/* Card image / gradient */}
                  <div className={`h-40 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                    <span className="text-5xl">{course.emoji}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">{course.category}</span>
                    <h3 className="font-semibold text-slate-900 mt-3 mb-1 group-hover:text-brand-700 transition-colors line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span>📖 {course.lectures} lectures</span>
                      <span>⏱ {course.hours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">${course.price}</span>
                      <Link to={`/courses/${course.id}`}
                        className="text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors">
                        View Course →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">Loved by learners worldwide</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Thousands of students have transformed their careers with CourseMS. Here's what they say.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="bg-surface-50 border border-surface-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-surface-200">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-brand-700 text-xs font-bold">{t.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 rounded-3xl px-8 sm:px-16 py-16 text-center">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                  Ready to start your<br className="hidden sm:block" /> learning journey?
                </h2>
                <p className="text-brand-200 text-lg max-w-xl mx-auto mb-10">
                  Join over 50,000 students already learning on CourseMS. Create your free account today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 hover:scale-105 shadow-xl text-base">
                    Start for Free
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link to="/courses"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 border border-white/20 text-base">
                    Browse Courses
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};