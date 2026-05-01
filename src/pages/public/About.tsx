import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  );
};

const team = [
  { name: 'Alex Morgan', role: 'Founder & CEO', avatar: 'AM', bg: 'bg-brand-100', text: 'text-brand-700', bio: 'Ex-Google engineer with 10+ years in edtech. Passionate about democratizing education.' },
  { name: 'Priya Nair', role: 'Head of Curriculum', avatar: 'PN', bg: 'bg-emerald-100', text: 'text-emerald-700', bio: 'Former university lecturer. Designed courses taken by 200K+ students worldwide.' },
  { name: 'Sam Park', role: 'CTO', avatar: 'SP', bg: 'bg-violet-100', text: 'text-violet-700', bio: 'Full-stack engineer who built and scaled the platform from 0 to 50K users.' },
];

const values = [
  { icon: '🎯', title: 'Outcome-driven', desc: 'Every course is designed with measurable results in mind. We care about what you can do, not just what you know.' },
  { icon: '🌍', title: 'Accessible to all', desc: 'Quality education should not be a privilege. Our pricing is fair and our content is always improving.' },
  { icon: '🔬', title: 'Evidence-based', desc: 'Our curriculum is informed by industry needs, learning science, and continuous student feedback.' },
  { icon: '🤝', title: 'Community first', desc: 'Learning is better together. We build tools for collaboration, peer feedback, and mentorship.' },
];

export const About: React.FC = () => (
  <div className="pt-16 min-h-screen">
    {/* Hero */}
    <section className="bg-gradient-to-br from-slate-900 to-brand-950 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs font-semibold text-brand-300 uppercase tracking-widest bg-brand-600/20 border border-brand-500/30 px-4 py-2 rounded-full mb-6">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          We're on a mission to<br />
          <span className="bg-gradient-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
            make learning work.
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          CourseMS was built by learners, for learners. We believe that the right knowledge, delivered the right way, can change careers and lives.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-brand-600 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {[
          { value: '50K+', label: 'Students' },
          { value: '200+', label: 'Courses' },
          { value: '80+', label: 'Countries' },
          { value: '98%', label: 'Satisfaction' },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl sm:text-4xl font-bold text-white">{value}</p>
            <p className="text-brand-200 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Story */}
    <section className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">How it started</h2>
          <div className="prose prose-slate max-w-none space-y-5 text-slate-600 leading-relaxed">
            <p>CourseMS started in 2022 when our founder Alex Morgan realized that most online learning platforms were cluttered, expensive, or poorly designed. There had to be a better way.</p>
            <p>We spent a year talking to learners, instructors, and employers to understand what truly makes education effective. The answer was consistent: clear structure, real-world application, and a platform that gets out of your way.</p>
            <p>Today, CourseMS is a modern course management platform used by individual instructors and enterprises alike. We're proud of the 50,000+ students who have trusted us to help them grow.</p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 px-4 bg-surface-50">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What we believe</h2>
          <p className="text-slate-500 max-w-xl mx-auto">These principles guide every decision we make at CourseMS.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-surface-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Meet the team</h2>
          <p className="text-slate-500">Small team, big impact.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <div className="text-center bg-surface-50 rounded-2xl border border-surface-200 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 ${member.bg} ${member.text} rounded-2xl flex items-center justify-center mx-auto mb-4 text-lg font-bold`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5">{member.name}</h3>
                <p className="text-xs text-brand-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-4 bg-surface-50">
      <Reveal>
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-brand-600 to-violet-700 rounded-3xl px-8 py-14">
          <h2 className="text-3xl font-bold text-white mb-4">Join us on this mission</h2>
          <p className="text-brand-200 mb-8">Start learning today and join 50,000+ students already transforming their careers.</p>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all hover:scale-105 shadow-xl">
            Get Started Free →
          </Link>
        </div>
      </Reveal>
    </section>
  </div>
);