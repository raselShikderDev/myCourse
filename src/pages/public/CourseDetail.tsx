import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const allCourses = [
  { id: 1, title: 'React & TypeScript Masterclass', category: 'Web Development', price: 49.99, lectures: 120, hours: 24, color: 'from-violet-500 to-indigo-600', emoji: '⚛️',
    desc: 'Build production-grade React applications with full TypeScript integration. You\'ll learn component architecture, state management with Redux Toolkit, custom hooks, React Router, API integration, and best practices used at top companies.',
    instructor: 'Jordan Lee', instructorRole: 'Senior Frontend Engineer',
    outcomes: ['Build complex SPAs with React 18', 'Type everything with TypeScript', 'Manage state with Redux Toolkit', 'Write clean, testable components', 'Deploy apps to production', 'Work with REST APIs'],
    curriculum: ['Getting Started with React 18', 'TypeScript Fundamentals', 'Component Patterns', 'State Management Deep Dive', 'Routing & Navigation', 'API Integration', 'Performance Optimization', 'Testing & Deployment'],
  },
  { id: 2, title: 'Python for Data Science', category: 'Data Science', price: 39.99, lectures: 90, hours: 18, color: 'from-emerald-500 to-teal-600', emoji: '🐍',
    desc: 'Master data analysis and visualization with Python. Covers NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn through real-world projects and Kaggle datasets.',
    instructor: 'Priya Nair', instructorRole: 'Lead Data Scientist',
    outcomes: ['Analyze data with Pandas', 'Visualize insights with Matplotlib', 'Apply machine learning models', 'Work with real-world datasets', 'Build predictive models', 'Communicate findings effectively'],
    curriculum: ['Python Basics Refresher', 'NumPy Arrays', 'Pandas DataFrames', 'Data Cleaning', 'Visualization', 'Statistics', 'Intro to ML', 'Capstone Project'],
  },
  { id: 3, title: 'UI/UX Design with Figma', category: 'Design', price: 29.99, lectures: 48, hours: 10, color: 'from-pink-500 to-rose-600', emoji: '🎨',
    desc: 'Learn design thinking, wireframing, prototyping and handoff with Figma. Build real projects from scratch and create a portfolio that gets you hired.',
    instructor: 'Sofia M.', instructorRole: 'Product Design Lead',
    outcomes: ['Master Figma tools', 'Create wireframes and prototypes', 'Apply design systems', 'Conduct user research', 'Build a design portfolio', 'Prepare for handoff'],
    curriculum: ['Design Thinking', 'Figma Basics', 'Wireframing', 'Prototyping', 'Design Systems', 'User Testing', 'Case Studies', 'Portfolio Project'],
  },
  { id: 4, title: 'Node.js Backend Development', category: 'Web Development', price: 44.99, lectures: 100, hours: 20, color: 'from-amber-500 to-orange-600', emoji: '🟢',
    desc: 'Build scalable REST APIs with Node.js, Express and PostgreSQL. Learn authentication, middleware, error handling, and deploy to the cloud.',
    instructor: 'Marcus T.', instructorRole: 'Backend Architect',
    outcomes: ['Build REST APIs from scratch', 'Implement JWT authentication', 'Work with PostgreSQL', 'Write middleware and guards', 'Handle errors gracefully', 'Deploy to cloud platforms'],
    curriculum: ['Node.js Fundamentals', 'Express Framework', 'REST API Design', 'Authentication', 'Database Integration', 'Error Handling', 'Testing', 'Cloud Deployment'],
  },
  { id: 5, title: 'Machine Learning A–Z', category: 'Data Science', price: 59.99, lectures: 150, hours: 32, color: 'from-cyan-500 to-blue-600', emoji: '🤖',
    desc: 'A comprehensive machine learning course covering supervised, unsupervised, and reinforcement learning with Python and scikit-learn.',
    instructor: 'Dr. Aiden K.', instructorRole: 'ML Research Engineer',
    outcomes: ['Understand ML algorithms', 'Build classification models', 'Apply clustering techniques', 'Work with neural networks', 'Evaluate model performance', 'Deploy ML pipelines'],
    curriculum: ['ML Foundations', 'Linear Regression', 'Classification', 'Decision Trees', 'Clustering', 'Dimensionality Reduction', 'Neural Nets', 'Real Projects'],
  },
  { id: 6, title: 'PostgreSQL & Databases', category: 'Database', price: 34.99, lectures: 72, hours: 14, color: 'from-slate-500 to-slate-700', emoji: '🗄️',
    desc: 'Deep dive into relational databases with PostgreSQL. Learn query optimization, indexing strategies, transactions, and schema design for production systems.',
    instructor: 'Elena V.', instructorRole: 'Database Engineer',
    outcomes: ['Write complex SQL queries', 'Design normalized schemas', 'Optimize query performance', 'Work with indexes', 'Handle transactions', 'Backup and restore databases'],
    curriculum: ['SQL Basics', 'Advanced Queries', 'Schema Design', 'Indexes', 'Transactions', 'Performance Tuning', 'Backup & Recovery', 'Capstone'],
  },
];

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const course = allCourses.find(c => c.id === Number(id));

  if (!course) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">🔍</p>
        <h2 className="text-xl font-bold text-slate-900">Course not found</h2>
        <Link to="/courses" className="text-brand-600 hover:underline text-sm">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-surface-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${course.color} py-16 px-4`}>
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </button>
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <div className="flex-1">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {course.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-white/80 text-base leading-relaxed max-w-2xl">{course.desc}</p>
              <div className="flex flex-wrap items-center gap-5 mt-6 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">📖 {course.lectures} lectures</span>
                <span className="flex items-center gap-1.5">⏱ {course.hours} hours</span>
                <span className="flex items-center gap-1.5">🏆 Certificate included</span>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{course.instructor[0]}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor}</p>
                  <p className="text-white/60 text-xs">{course.instructorRole}</p>
                </div>
              </div>
            </div>

            {/* Enroll Card */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="text-4xl text-center mb-2">{course.emoji}</div>
                <p className="text-3xl font-bold text-slate-900 text-center mb-1">${course.price}</p>
                <p className="text-xs text-slate-400 text-center mb-5">One-time payment · Lifetime access</p>
                <Link to="/register"
                  className="block w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-600/20 mb-3">
                  Enroll Now
                </Link>
                <Link to="/login"
                  className="block w-full text-center border border-surface-300 hover:border-brand-300 text-slate-700 font-medium py-3 rounded-xl transition-colors text-sm">
                  Sign In to Enroll
                </Link>
                <div className="mt-5 space-y-2.5">
                  {['Lifetime access', 'Certificate of completion', 'All future updates', '30-day money-back guarantee'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* What you'll learn */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.outcomes.map(o => (
                <div key={o} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {o}
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Course Curriculum</h2>
            <div className="space-y-2">
              {course.curriculum.map((section, i) => (
                <div key={section} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group">
                  <div className="w-7 h-7 bg-brand-50 group-hover:bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{section}</span>
                  <svg className="w-4 h-4 text-slate-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5 lg:col-span-1">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-5">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">Course Includes</h3>
            <div className="space-y-3">
              {[
                { icon: '📖', text: `${course.lectures} on-demand lectures` },
                { icon: '⏱', text: `${course.hours} hours of content` },
                { icon: '📱', text: 'Access on all devices' },
                { icon: '🏆', text: 'Certificate of completion' },
                { icon: '♾️', text: 'Lifetime access' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 text-center">
            <p className="text-brand-700 font-semibold text-sm mb-1">Not sure yet?</p>
            <p className="text-brand-600 text-xs mb-4">30-day money-back guarantee. No questions asked.</p>
            <Link to="/courses" className="text-xs text-brand-600 font-semibold hover:underline">← Browse other courses</Link>
          </div>
        </div>
      </div>
    </div>
  );
};