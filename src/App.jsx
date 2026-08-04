import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  FileText,
  Download,
  School,
  Sparkles,
  ShieldCheck,
  Send,
  X,
  ChevronRight,
  Code,
  Laptop,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Filter,
  Check,
  BookMarked
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const CATALOG_BOOKS = [
  {
    id: 'k1',
    title: 'Growing Up With Computers - Level A',
    series: 'Pre-Primary',
    grade: 'Kindergarten / LKG',
    category: 'primary',
    code: 'PP-01',
    software: 'Tux Paint, Scratch Jr',
    description: 'A visual, activity-based introduction to digital literacy, mouse control, and basic computing concepts designed for early learners.',
    nepCompliant: true,
    badges: ['Interactive Visuals', 'Activity-Based'],
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'k2',
    title: 'Growing Up With Computers - Level B',
    series: 'Pre-Primary',
    grade: 'UKG',
    category: 'primary',
    code: 'PP-02',
    software: 'Paint 3D, Kid Pix',
    description: 'Expands digital foundation with simple typing games, safety rules, logical sequencing, and foundational digital art tools.',
    nepCompliant: true,
    badges: ['Logic Building', 'Digital Art'],
    gradient: 'from-amber-500 to-rose-500'
  },
  {
    id: 'p1',
    title: 'Cyber World with Python - Book 3',
    series: 'Cyber World',
    grade: 'Class III',
    category: 'primary',
    code: 'CW-03',
    software: 'Windows 11, MS Office 2021',
    description: 'Introduces core computer operations, MS Paint, fundamental internet ethics, and block-based coding foundations.',
    nepCompliant: true,
    badges: ['MS Office 2021', 'Windows 11'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'p2',
    title: 'Learning AI & Robotics - Book 5',
    series: 'Learning AI',
    grade: 'Class V',
    category: 'primary',
    code: 'AI-05',
    software: 'Scratch 3.0, Teachable Machine',
    description: 'Conceptual jump start into Artificial Intelligence, computer vision basics, and logical block programming via Scratch.',
    nepCompliant: true,
    badges: ['AI Concepts', 'Scratch 3.0'],
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'm1',
    title: 'IT Secrets & Coding Foundations - Book 6',
    series: 'IT Secrets',
    grade: 'Class VI',
    category: 'middle',
    code: 'ITS-06',
    software: 'Python 3.11, HTML5, CSS3',
    description: 'Comprehensive transition from visual block coding to text-based syntax with Python, web structuring, and cyber safety.',
    nepCompliant: true,
    badges: ['Python 3.11', 'HTML5 & CSS'],
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'm2',
    title: 'Concept IT & Modern AI - Book 8',
    series: 'Concept IT',
    grade: 'Class VIII',
    category: 'middle',
    code: 'CIT-08',
    software: 'Python 3.11, MySQL, App Inventor',
    description: 'Advanced middle-school curriculum covering relational databases, Python data types, mobile app logic, and machine learning basics.',
    nepCompliant: true,
    badges: ['Python Data', 'MySQL', 'App Logic'],
    gradient: 'from-teal-500 to-cyan-700'
  },
  {
    id: 'b1',
    title: 'Information Technology (Subject Code 402)',
    series: 'Secondary Board Series',
    grade: 'Class IX & X',
    category: 'board',
    code: 'CBSE 402',
    software: 'LibreOffice / MS Office, Python',
    description: 'Strictly aligned with CBSE 402 Skill Course curriculum. Covers Employability Skills and Subject Specific Skills with extensive practice sets.',
    nepCompliant: true,
    badges: ['CBSE Code 402', 'Board Exam Ready', 'Skill Course'],
    gradient: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'b2',
    title: 'Artificial Intelligence Skill Course (Subject Code 417)',
    series: 'Secondary Board Series',
    grade: 'Class IX & X',
    category: 'board',
    code: 'CBSE 417',
    software: 'Python 3.11, Jupyter Notebooks, OpenCV',
    description: 'Flagship AI textbook for CBSE Code 417. Features hands-on Python projects, computer vision, natural language processing, and AI ethics.',
    nepCompliant: true,
    badges: ['CBSE Code 417', 'Jupyter Lab', 'AI Ethics'],
    gradient: 'from-purple-600 to-pink-700'
  },
  {
    id: 'b3',
    title: 'Computer Applications (Subject Code 165)',
    series: 'Secondary Board Series',
    grade: 'Class IX & X',
    category: 'board',
    code: 'CBSE 165',
    software: 'HTML5, CSS, Cyber Ethics, Python',
    description: 'Complete coverage for CBSE Code 165 including web designing with HTML/CSS, cyber safety regulations, and practical exam blueprints.',
    nepCompliant: true,
    badges: ['CBSE Code 165', 'Web Design', 'Cyber Laws'],
    gradient: 'from-slate-700 to-slate-900'
  }
];

const TEACHER_RESOURCES = [
  {
    title: 'CBSE Code 417 AI - Python Code Repository',
    category: 'Code Samples',
    format: 'ZIP / .PY',
    size: '14.2 MB',
    grade: 'Class IX-X',
    downloads: '3,420+'
  },
  {
    title: 'IT Subject Code 402 Complete Solution Key & Answer Book',
    category: 'Answer Keys',
    format: 'PDF',
    size: '8.5 MB',
    grade: 'Class X',
    downloads: '5,100+'
  },
  {
    title: 'NEP 2020 Aligned K-8 Lesson Plans & Activity Sheets',
    category: 'Pedagogy',
    format: 'DOCX / PDF',
    size: '22.0 MB',
    grade: 'Class I-VIII',
    downloads: '2,890+'
  },
  {
    title: 'Computer Applications Code 165 Practical Lab Manual',
    category: 'Lab Manuals',
    format: 'PDF',
    size: '6.1 MB',
    grade: 'Class IX-X',
    downloads: '4,150+'
  }
];

export default function App() {
  // State management
  const [selectedAudience, setSelectedAudience] = useState('schools'); // 'schools' | 'teachers' | 'students'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState(false);
  const [selectedBookForSpecimen, setSelectedBookForSpecimen] = useState(null);
  const [previewBookModal, setPreviewBookModal] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: 'Teacher',
    schoolName: '',
    cityState: '',
    selectedBooks: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered books logic
  const filteredBooks = useMemo(() => {
    return CATALOG_BOOKS.filter((book) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'primary' && (book.category === 'primary' || book.series === 'Pre-Primary')) ||
        (activeCategory === 'middle' && book.category === 'middle') ||
        (activeCategory === 'board' && book.category === 'board');

      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.software.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handlers
  const handleOpenSpecimenModal = (book = null) => {
    if (book) {
      setFormData((prev) => ({
        ...prev,
        selectedBooks: prev.selectedBooks.includes(book.id) ? prev.selectedBooks : [...prev.selectedBooks, book.id]
      }));
    }
    setIsSpecimenModalOpen(true);
  };

  const toggleBookSelection = (bookId) => {
    setFormData((prev) => {
      const current = prev.selectedBooks;
      if (current.includes(bookId)) {
        return { ...prev, selectedBooks: current.filter((id) => id !== bookId) };
      } else {
        return { ...prev, selectedBooks: [...current, bookId] };
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setIsSpecimenModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      designation: 'Teacher',
      schoolName: '',
      cityState: '',
      selectedBooks: []
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* ---------------- HEADER & NAVIGATION ---------------- */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-gradient-to-tr from-blue-600 to-emerald-400 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">MyEducare</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  NEP 2020
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Educare Knowledge India Pvt. Ltd.</p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, CBSE codes (402, 417), topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 text-xs text-slate-200 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Audience Switcher & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex bg-slate-800 p-1 rounded-lg border border-slate-700/60 text-xs font-medium">
              {['schools', 'teachers', 'students'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedAudience(type)}
                  className={`px-3 py-1.5 rounded-md capitalize transition ${
                    selectedAudience === type
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  For {type}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenSpecimenModal()}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md shadow-blue-500/20 transition flex items-center gap-2"
            >
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline">Request Specimen Copy</span>
              <span className="sm:hidden">Specimen</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-24 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Next-Gen CS, IT & Artificial Intelligence Curriculum
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Empowering Next-Gen Innovators with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
                  AI, Coding & IT Textbooks
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
                Educare Knowledge India Pvt. Ltd. publishes benchmark K-10 computer science textbooks fully compliant with **NEP 2020** principles. Designed with hands-on lab exercises, experiential learning, and futuristic AI skill modules.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#catalog"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Explore K-10 Catalog
                </a>
                <button
                  onClick={() => handleOpenSpecimenModal()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <BookMarked className="w-4 h-4 text-emerald-400" />
                  Request Free School Specimen
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> 100% NEP 2020 Framework
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Windows 11 & Office 2021
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Python 3.11 Ready
                </span>
              </div>
            </div>

            {/* Visual Hero Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-tr from-slate-800 to-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-md">
                  Flagship Board Editions
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-4">
                    <div className="bg-blue-500/20 text-blue-400 p-3 rounded-lg font-black text-lg">
                      402
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CBSE Code 402 - Information Tech</h4>
                      <p className="text-xs text-slate-400">Class IX & X Skill Subject Textbook</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-4">
                    <div className="bg-purple-500/20 text-purple-400 p-3 rounded-lg font-black text-lg">
                      417
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CBSE Code 417 - Artificial Intelligence</h4>
                      <p className="text-xs text-slate-400">Computer Vision, NLP & Python Projects</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-4">
                    <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-lg font-black text-lg">
                      165
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CBSE Code 165 - Computer Applications</h4>
                      <p className="text-xs text-slate-400">Web Design, HTML5, Cyber Ethics</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-xs font-semibold text-emerald-300">
                    Free Complimentary Teacher Kits & Digital Support for Partner Schools
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- STATS BANNER ---------------- */}
      <section className="bg-slate-900/90 text-white border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">1,500+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Partner Schools Covered</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">NEP 2020 Compliant</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-black text-teal-400">K-10</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Complete Grade Span</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-black text-purple-400">300k+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Students Learning Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TARGET BOARD FOCUS BAR ---------------- */}
      <section className="py-10 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Board Specialization</h2>
            <p className="text-xl font-extrabold text-slate-900 mt-1">Dedicated Secondary CBSE Subject Modules</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                402
              </div>
              <h3 className="font-bold text-slate-900 text-base">CBSE IT Code 402</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Structured into Employability Skills & Subject Specific Skills. Features real-world documentation, spreadsheets, and database practicals.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <span>Class IX & X Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                417
              </div>
              <h3 className="font-bold text-slate-900 text-base">CBSE AI Code 417</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Focuses on AI Project Cycle, Python for Data Science, Computer Vision, and NLP. Includes downloadable Jupyter Notebook exercises.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-600">
                <span>Class IX & X Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                165
              </div>
              <h3 className="font-bold text-slate-900 text-base">CBSE Comp. App Code 165</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Hands-on training in HTML5 tag structures, CSS styling, web protocols, cyber safety laws, and basic programming concepts.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <span>Class IX & X Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- INTERACTIVE CATALOG SECTION ---------------- */}
      <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Textbook Library</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Interactive K-10 Publication Catalog
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Browse our complete lineup of computer science, IT, and AI textbooks.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Publications' },
              { id: 'primary', label: 'Primary (K-5)' },
              { id: 'middle', label: 'Middle (6-8)' },
              { id: 'board', label: 'CBSE Boards (9-10)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No matching publications found</h4>
            <p className="text-xs text-slate-500 mt-1">Try resetting your search query or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-xs font-semibold text-blue-600 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between group"
              >
                <div>
                  {/* Book Visual Header / Cover Placeholder */}
                  <div className={`h-40 bg-gradient-to-br ${book.gradient} p-5 text-white flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-black/30 backdrop-blur text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {book.grade}
                      </span>
                      {book.nepCompliant && (
                        <span className="bg-emerald-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                          NEP 2020
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] font-medium opacity-90 block">{book.series}</span>
                      <h4 className="font-extrabold text-lg leading-snug line-clamp-2">{book.title}</h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {book.description}
                    </p>

                    {/* Software / Tech Badges */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Covered Tools & Software</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200">
                          {book.software}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {book.badges.map((b, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewBookModal(book)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    Preview Sample
                  </button>

                  <button
                    onClick={() => handleOpenSpecimenModal(book)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <BookMarked className="w-3.5 h-3.5" />
                    Get Specimen
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- TEACHER RESOURCE HUB ---------------- */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <GraduationCap className="w-4 h-4" />
                Teacher Support Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Educator Resource Hub
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We empower teachers with ready-to-use digital assets, Python code solutions, question bank generators, and NEP-oriented lesson plans.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert("Teacher Portal Login: Please request school specimen credentials via the form above.")}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Access Complete Teacher Portal
                </button>
              </div>
            </div>

            {/* Downloadable Item Cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {TEACHER_RESOURCES.map((res, idx) => (
                <div key={idx} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="font-semibold text-blue-400">{res.category}</span>
                      <span>{res.grade}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{res.title}</h4>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Format: <strong className="text-slate-200">{res.format}</strong></span>
                      <span>Size: <strong className="text-slate-200">{res.size}</strong></span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{res.downloads} downloads</span>
                    <button
                      onClick={() => alert(`Downloading ${res.title}...`)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SAMPLE PREVIEW MODAL ---------------- */}
      {previewBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className={`p-6 bg-gradient-to-r ${previewBookModal.gradient} text-white relative`}>
              <button
                onClick={() => setPreviewBookModal(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
                {previewBookModal.grade}
              </span>
              <h3 className="text-xl font-black mt-2">{previewBookModal.title}</h3>
              <p className="text-xs text-white/90 mt-1">{previewBookModal.series}</p>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div>
                <h5 className="font-bold text-slate-900 text-sm mb-1">Sample Chapter Syllabus Preview</h5>
                <p className="leading-relaxed text-slate-600">{previewBookModal.description}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900">Inside Chapter 1: Foundations & Lab Activity</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Theoretical Concepts with Diagrams</li>
                  <li>Step-by-Step Hands-On Practical Lab Guidelines</li>
                  <li>NEP 2020 Experiential Learning Exercises</li>
                  <li>CBSE Pattern Board-style Questions & MCQs</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setPreviewBookModal(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const book = previewBookModal;
                    setPreviewBookModal(null);
                    handleOpenSpecimenModal(book);
                  }}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow"
                >
                  Request Full Specimen Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- INTERACTIVE SPECIMEN REQUEST MODAL ---------------- */}
      {isSpecimenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Institutional Request</span>
                <h3 className="text-xl font-extrabold text-white">Free Specimen Copy Request Form</h3>
                <p className="text-xs text-slate-400 mt-1">Exclusively for Principals, School HODs & Computer Teachers.</p>
              </div>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {formSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Specimen Request Submitted!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our regional educational representative for <strong className="text-slate-900">{formData.schoolName}</strong> will review your request and dispatch the requested specimen copies shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition"
                  >
                    Back to Catalog
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5 text-xs">
                
                {/* Contact Information */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Designation *</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Principal">Principal</option>
                      <option value="Vice Principal">Vice Principal</option>
                      <option value="HOD Computer Science">HOD Computer Science</option>
                      <option value="Computer Teacher">Computer Teacher</option>
                      <option value="Trustee / School Management">Trustee / School Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., rajesh@dpsdelhi.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* School Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">School Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., St. Xavier Senior Secondary"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City & State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., New Delhi, Delhi"
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Book Selection Checkboxes */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    Select Specimen Titles Required (Select multiple):
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl p-3 space-y-2 bg-slate-50">
                    {CATALOG_BOOKS.map((b) => {
                      const isChecked = formData.selectedBooks.includes(b.id);
                      return (
                        <label
                          key={b.id}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition ${
                            isChecked ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleBookSelection(b.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-semibold text-slate-800">{b.title}</span>
                          </div>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                            {b.code}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {formData.selectedBooks.length} book(s) selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Request
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Publisher info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>MyEducare</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Educare Knowledge India Pvt. Ltd. is a premier educational publisher dedicated to advancing Computer Science, Artificial Intelligence, and Information Technology literacy across K-10 schools.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-white font-bold mb-3 uppercase text-[11px] tracking-wider">Publications</h5>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#catalog" className="hover:text-white transition">Pre-Primary Computer Series</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Primary Coding & Cyber World</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Middle School Python & AI</a></li>
                <li><a href="#catalog" className="hover:text-white transition">CBSE Board Subject Codes (402, 417, 165)</a></li>
              </ul>
            </div>

            {/* Teacher Resources */}
            <div>
              <h5 className="text-white font-bold mb-3 uppercase text-[11px] tracking-wider">Teacher Support</h5>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#catalog" className="hover:text-white transition">Download Python Code Bundles</a></li>
                <li><a href="#catalog" className="hover:text-white transition">Request Answer Keys & Solutions</a></li>
                <li><a href="#catalog" className="hover:text-white transition">NEP 2020 Pedagogical Frameworks</a></li>
                <li><a href="#catalog" className="hover:text-white transition">School Specimen Dispatch Desk</a></li>
              </ul>
            </div>

            {/* Institutional Contact */}
            <div>
              <h5 className="text-white font-bold mb-3 uppercase text-[11px] tracking-wider">Institutional Desk</h5>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>Educare Knowledge India Pvt. Ltd., Educational Publishing House, New Delhi, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>specimen@myeducare.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>+91 11 2700 0000 / 1800-EDUCARE</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Educare Knowledge India Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Supply</a>
              <a href="#" className="hover:text-slate-400">CBSE Curriculum Compliance</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}