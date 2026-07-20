/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Mail, 
  Menu, 
  X, 
  ExternalLink,
  Download,
  MessageSquare,
  Search,
  Layers,
  PenTool,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2
} from 'lucide-react';

import metadata from '../metadata.json';

// Google Drive Image IDs provided by the user
const IMAGE_IDS = [
  '1oaglk7ZnnSn6nao3bgjdyioVsgxSCY85', // New Project 1
  '1kVJ_5XJrdujAhPUF2oGTTl9bKJ-le_8r', // New Project 2
  '1ENHWE5EojetEK2Fh1o1Vsf5jZzy0DkPi', // New Project 3
  '1zbQvw5PJXB4BiqbsOArqvYj1AI-fCIx-', // Old Project 1
  '1Oofcu-8Gr4SToeZWHhOj6lJAxFHOC7ZA', // Old Project 2
  '1hc8z33L_FXsuvu5_iHcYrXKLbkofxD9R',
  '1LRWtwTjDZd6qs7fSq7ugo02Dg83lJd7E',
  '1RgkpDXlenL4rTFAjHOSSug0y_Uo0VeDd',
  '1j25QQj3pxZlgoihrkJe3-TJQlemhZ7Ta',
  '1GxD6y0hEVEZpTYxMKbvXG_EM7OrrYlv_',
  '1wRmzAJoUs4UjlwI2io7ErrpgDmLQcTWk',
  '1rL-Oe4UBmgi_l2EG4_tgtnKCS5b7wyNv',
  '1daJ0HBXm_CYnvOWd-PtOS2Ul61YYT8NM',
  '18iuKDoqJgoi2Qf-oDnMH_4UDxyqyVz9K',
  '1_ol1xYyrl5U9GJwthTLXm6g-THiIA4_j',
  '1m-IYiA6qA2sKUEO82PCC4AMdL0_832o1',
  '1t1OX5khpFnH6Q-s2H2inlVy21Mn4uBlL',
  '1W1-gZktUnHyoJgVknWM2sDuA5W-k5q2u'
];

const getImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const FEATURED_PROJECTS = [
  {
    id: IMAGE_IDS[1],
    title: 'Vectorise',
    subtitle: 'Product Interface & Visual System',
    description: 'A product-focused project designed to simplify how users navigate complex personal growth systems.\n\nProblem: Users needed a clearer way to navigate layered personal growth content without confusion.\nApproach: Designed a structured UI system using consistent hierarchy, spacing, and visual cues.\nOutcome: Created a clean, intuitive interface that improves clarity and user flow across the platform.',
    tags: ['Visual System', 'UI Design', 'Typography'],
    url: getImageUrl(IMAGE_IDS[1])
  },
  {
    id: IMAGE_IDS[2],
    title: 'Servifix',
    subtitle: 'Brand Identity',
    description: 'A brand identity project focused on creating a clear and trustworthy visual presence for a service-based platform.\n\nProblem: The brand needed a clear identity that communicates trust and professionalism in a crowded service market.\nApproach: Developed a visual system centered on simplicity, consistency, and recognizability across touchpoints.\nOutcome: Delivered a cohesive identity that strengthens brand perception and improves visual consistency.',
    tags: ['Branding', 'Identity', 'Construction', 'Service'],
    url: getImageUrl(IMAGE_IDS[2])
  },
  {
    id: IMAGE_IDS[0],
    title: 'Afriradar',
    subtitle: 'Content & Visual Design',
    description: 'Designed engaging visual content to communicate fast-paced tech stories clearly and consistently across social media platforms, maintaining a modern and recognizable visual style.\n\nProblem: Tech updates in Africa were happening fast, but the visuals were often dry or lacked consistency.\nApproach: Created an eye-catching visual language with high contrast, crisp layouts, and clear typographic hierarchy for snackable content.\nOutcome: Established a dynamic, highly recognizable identity that kept viewers engaged on social channels.',
    tags: ['Content Design', 'Social Media', 'Tech', 'Africa'],
    url: getImageUrl(IMAGE_IDS[0])
  }
];

const CATALOGUE = IMAGE_IDS.slice(3).map((id) => ({
  id,
  title: '',
  url: getImageUrl(id)
}));

const CAPABILITIES = [
  'Brand Identity', 'Logo Design', 'Visual Systems', 
  'Social Media Graphics', 'Marketing Design', 'Presentation Design'
];

const DESIGN_TOOLS = [
  'Figma', 'Illustrator', 'Coreldraw', 'Photoshop'
];

const SUPPORT_TOOLS = [
  'Canva', 'InDesign', 'Pixellab'
];

const parseDescription = (desc: string) => {
  const hasDetails = desc.includes('Problem:') || desc.includes('Approach:') || desc.includes('Outcome:');
  
  if (!hasDetails) {
    return { intro: desc, details: null };
  }
  
  const parts = desc.split('\n\n');
  const intro = parts[0];
  const detailsParts = parts.slice(1);
  
  const details = detailsParts.map(part => {
    const colonIndex = part.indexOf(':');
    if (colonIndex !== -1) {
      const label = part.substring(0, colonIndex).trim();
      const text = part.substring(colonIndex + 1).trim();
      return { label, text };
    }
    return { label: '', text: part };
  });
  
  return { intro, details };
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    if (!selectedProject) return;
    const allItems = [...FEATURED_PROJECTS, ...CATALOGUE];
    const currentIndex = allItems.findIndex(item => item.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % allItems.length;
    setSelectedProject(allItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const allItems = [...FEATURED_PROJECTS, ...CATALOGUE];
    const currentIndex = allItems.findIndex(item => item.id === selectedProject.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    setSelectedProject(allItems[prevIndex]);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-zinc-200/50' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-xl font-black tracking-tighter text-zinc-900"
          >
            <img 
              src={getImageUrl(metadata.logo)}
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover border border-zinc-200 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span>OLUWAGBOGO IDOWU.</span>
          </motion.div>
          
          <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
            {['Work', 'Approach', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/+2348132531112" target="_blank" className="hidden md:flex text-[10px] font-bold tracking-widest uppercase bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-zinc-900 transition-all">
              Start a Conversation
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white text-zinc-900 flex flex-col items-center justify-center gap-8 text-3xl font-bold"
          >
            {['Work', 'Approach', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-800 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="https://wa.me/+2348132531112" className="text-sm bg-blue-600 text-white px-8 py-4 rounded-full mt-8 hover:bg-zinc-900 transition-colors">
              WhatsApp Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-[7vw] font-black leading-[0.9] tracking-tighter uppercase mb-8 text-zinc-900">
                I create <br />
                Design that brings <br />
                <span className="text-blue-600">clarity</span> to <br />
                complex ideas
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-zinc-600 mb-10 leading-relaxed font-medium">
                I focus on turning unclear ideas into structured visual systems people can understand and act on. I’m a graphic, brand, and UI designer focused on building clear, structured visual systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#work" className="group flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-sm font-bold hover:bg-blue-600 transition-all duration-300">
                  View Selected Work
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:col-span-4 relative">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full aspect-square border border-zinc-200 rounded-3xl flex items-center justify-center p-12 bg-white/70 shadow-sm backdrop-blur-sm"
            >
              <div className="w-full h-full border-2 border-blue-600/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 bg-blue-600 -translate-x-1/2 -translate-y-1/2 z-10" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 translate-x-1/2 translate-y-1/2 z-10" />
                <img 
                  src={getImageUrl(metadata.logo)}
                  alt="Oluwagbogo Idowu Logo"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-zinc-900">Selected Work</h2>
          </div>

          <div className="space-y-32">
            {FEATURED_PROJECTS.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="group relative aspect-[16/10] overflow-hidden bg-zinc-100 border border-zinc-200/50 rounded-lg cursor-pointer shadow-sm"
                  >
                    <img 
                      src={project.url} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-4 bg-white/95 backdrop-blur-md rounded-full border border-zinc-200 text-blue-600 scale-90 group-hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                        <Maximize2 size={20} />
                        <span className="text-[10px] font-bold tracking-widest uppercase pr-1">Full Screen</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">Project {index + 1}</span>
                  
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900">{project.title}</h3>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="group/btn p-3 bg-white border border-zinc-200 rounded-full hover:border-blue-600 text-zinc-500 hover:text-blue-600 shadow-sm transition-all cursor-pointer flex items-center justify-center"
                      title="View Full Screen (Full Bleed)"
                    >
                      <Maximize2 size={18} className="group-hover/btn:scale-110 transition-transform text-blue-500" />
                    </button>
                  </div>
                  
                  {(() => {
                    const parsed = parseDescription(project.description);
                    return (
                      <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                        {parsed.intro}
                      </p>
                    );
                  })()}

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-zinc-200 bg-white text-zinc-600 rounded-full shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Picture Catalogue */}
      <section className="pb-32 px-6 bg-[#FAFAFA] border-t border-zinc-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">More Projects</h2>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {CATALOGUE.map((item, index) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="break-inside-avoid relative group overflow-hidden rounded-lg cursor-pointer mb-3 shadow-xs border border-zinc-200/30 bg-zinc-100"
                onClick={() => setSelectedProject(item)}
              >
                {/* Very small project label */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[7.5px] font-bold text-blue-600 uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[2px] border border-zinc-200/80 z-10 transition-colors group-hover:border-blue-600/50">
                  Project {index + 4}
                </div>
                <img 
                  src={item.url} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-auto object-cover transition-all duration-500 block ${
                    index % 4 === 0 ? 'aspect-[4/5]' : 
                    index % 4 === 1 ? 'aspect-[3/2]' : 
                    index % 4 === 2 ? 'aspect-square' : 
                    'aspect-[2/3]'
                  }`}
                />
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-[10px] font-bold text-zinc-900 bg-white uppercase tracking-widest border border-zinc-200 px-3 py-1.5 rounded-sm hover:bg-blue-600 hover:text-white transition-all shadow-md">
                    View Project
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-32 px-6 bg-zinc-100/50 border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-600 mb-4 block">Your Edge</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-zinc-900">My Approach to Design</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: 'Discover', desc: 'Understanding the business, audience, and problem.' },
              { icon: Layers, title: 'Structure', desc: 'Building a visual system that communicates clearly.' },
              { icon: PenTool, title: 'Design', desc: 'Crafting visuals that make the brand recognizable everywhere.' }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-zinc-200 bg-white rounded-2xl hover:border-blue-600/40 hover:shadow-md transition-all group">
                <item.icon className="mb-8 text-blue-600 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-black uppercase mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Design Thinking Snapshot */}
          <div className="mt-32 p-12 border border-zinc-200 rounded-3xl bg-white shadow-sm">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black uppercase text-zinc-900">Design Thinking Snapshot</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-zinc-200 text-zinc-800 bg-zinc-50 flex items-center justify-center text-xl font-bold">The Pivot</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Strategy</span>
              </div>
              <ArrowRight className="hidden md:block text-blue-600" size={32} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border-2 border-blue-600 text-zinc-900 bg-blue-50/50 flex items-center justify-center text-2xl font-black">Brand</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Identity</span>
              </div>
              <ArrowRight className="hidden md:block text-blue-600" size={32} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-zinc-200 text-zinc-800 bg-zinc-50 flex items-center justify-center text-xl font-bold">Comm.</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Visuals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Tools */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl font-black uppercase mb-12 text-zinc-900">Design Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map(item => (
                <div key={item} className="flex items-center gap-4 p-6 border border-zinc-200 bg-white rounded-lg hover:bg-zinc-50 shadow-sm transition-colors">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="font-bold text-sm uppercase tracking-wider text-zinc-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="mb-12">
              <h2 className="text-4xl font-black uppercase mb-6 text-zinc-900">Design Tools</h2>
              <div className="flex flex-wrap gap-3">
                {DESIGN_TOOLS.map(tool => (
                  <span key={tool} className="px-6 py-3 bg-white border border-zinc-200 rounded-sm text-xs font-bold uppercase tracking-widest text-zinc-800 hover:border-blue-600 shadow-sm transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase mb-6 text-zinc-900">Support Tools</h2>
              <div className="flex flex-wrap gap-3">
                {SUPPORT_TOOLS.map(tool => (
                  <span key={tool} className="px-6 py-3 bg-white border border-zinc-200 rounded-sm text-xs font-bold uppercase tracking-widest text-zinc-800 hover:border-blue-600 shadow-sm transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Background */}
      <section id="about" className="py-32 px-6 border-y border-zinc-200 bg-zinc-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-600 mb-8 block">Quick Background</span>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-zinc-800">
            "My background spans graphic design and brand development, with a focus today on helping organizations communicate clearly through structured visual systems”
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 text-zinc-900">
            Let's build <br />
            something <span className="text-blue-600">clear and effective.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-8 mb-20">
            <a 
              href="mailto:Oluwagbogoidowu@gmail.com" 
              className="text-2xl md:text-4xl font-bold text-zinc-900 hover:text-blue-600 transition-colors"
            >
              Oluwagbogoidowu@gmail.com
            </a>
            <div className="flex gap-6">
              <a href="https://wa.me/+2348132531112" target="_blank" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-blue-600 transition-colors">
                <MessageSquare size={18} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://wa.me/+2348132531112" className="border border-zinc-300 px-10 py-5 bg-white text-zinc-900 rounded-sm font-black uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter text-zinc-900">OLUWAGBOGO IDOWU.</div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">
            © 2026 ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Behance</a>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center p-0"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 p-3 bg-white/90 hover:bg-blue-600 hover:text-white rounded-full border border-zinc-200 transition-colors z-50 cursor-pointer text-zinc-500 shadow-md backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <motion.div 
              key={selectedProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-zinc-950 flex flex-col lg:flex-row overflow-hidden relative"
            >
              {(() => {
                const allItems = [...FEATURED_PROJECTS, ...CATALOGUE];
                const projectIndex = allItems.findIndex(item => item.id === selectedProject.id);
                const totalProjects = allItems.length;
                const hasFullContent = !!selectedProject.description;
                const parsed = hasFullContent ? parseDescription(selectedProject.description) : null;
                
                return (
                  <>
                    {/* Full Bleed Ambient Color Underlay */}
                    <img 
                      src={selectedProject.url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover blur-[100px] opacity-[0.22] scale-105 pointer-events-none select-none z-0"
                    />

                    {/* Left Side: Contained Image */}
                    <div className="flex-1 bg-transparent flex items-center justify-center relative overflow-hidden h-[50%] lg:h-full z-10">
                      {/* Floating Navigation Buttons Inside Image Viewport */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-white/80 hover:bg-blue-600 hover:text-white rounded-full border border-zinc-200/50 transition-colors z-40 cursor-pointer text-zinc-600 shadow-md flex items-center justify-center backdrop-blur-md"
                      >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-white/80 hover:bg-blue-600 hover:text-white rounded-full border border-zinc-200/50 transition-colors z-40 cursor-pointer text-zinc-600 shadow-md flex items-center justify-center backdrop-blur-md"
                      >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                      </button>

                      <img 
                        src={selectedProject.url} 
                        alt={selectedProject.title || `Project ${projectIndex + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain max-h-[85%] max-w-[90%] drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                      />
                      
                      {/* Floating Navigation Controls on Image */}
                      <div className="absolute bottom-4 left-4 bg-white/85 backdrop-blur-md text-[9px] font-bold text-zinc-600 uppercase tracking-widest px-3 py-1.5 rounded-sm border border-zinc-200/50 shadow-sm">
                        Project {projectIndex + 1} of {totalProjects}
                      </div>
                    </div>
                    
                    {/* Right Side: Full Content Pane (only if featured / hasFullContent) */}
                    {hasFullContent ? (
                      <div className="w-full lg:w-[460px] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-zinc-200/30 bg-white/85 backdrop-blur-xl h-[50%] lg:h-full relative z-10 shadow-2xl">
                        <div>
                          <div className="mb-6">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                              Project {projectIndex + 1}
                            </span>
                            <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-zinc-900">
                              {selectedProject.title}
                            </h3>
                            {selectedProject.subtitle && (
                              <p className="text-xs font-bold text-zinc-500 tracking-wider uppercase mt-1">
                                {selectedProject.subtitle}
                              </p>
                            )}
                          </div>
                          
                          <div className="w-12 h-[2px] bg-blue-600 mb-6" />
                          
                          {/* Parsed description details */}
                          <div className="space-y-5 text-zinc-600 text-sm leading-relaxed mb-6">
                            <p className="text-zinc-700 text-base font-medium leading-relaxed">
                              {parsed?.intro}
                            </p>
                            
                            {parsed?.details && (
                              <div className="space-y-4 pt-1">
                                {parsed.details.map((detail, idx) => {
                                  const isProblem = detail.label.toLowerCase().includes('problem');
                                  const isApproach = detail.label.toLowerCase().includes('approach');
                                  const isOutcome = detail.label.toLowerCase().includes('outcome');

                                  let tagStyles = 'bg-zinc-100 text-zinc-800 border-zinc-200/60';
                                  if (isProblem) {
                                    tagStyles = 'bg-rose-50 text-rose-800 border-rose-200/50';
                                  } else if (isApproach) {
                                    tagStyles = 'bg-blue-50 text-blue-800 border-blue-200/50';
                                  } else if (isOutcome) {
                                    tagStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
                                  }

                                  return (
                                    <div key={idx} className="space-y-2 p-4 rounded-lg border border-zinc-200/40 bg-zinc-50/50 backdrop-blur-xs shadow-xs">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${tagStyles}`}>
                                        {detail.label}
                                      </span>
                                      <p className="text-zinc-600 text-sm leading-relaxed pl-0.5">
                                        {detail.text}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {selectedProject.tags && (
                            <div className="flex flex-wrap gap-2 mb-8">
                              {selectedProject.tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 bg-zinc-200/50 border border-zinc-300/40 rounded-sm text-zinc-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Action WhatsApp Button */}
                        <div className="pt-4 border-t border-zinc-200/20 flex gap-3">
                          <a 
                            href={`https://wa.me/+2348132531112?text=Hello%20Oluwagbogo,%20I'm%20interested%20in%20your%20project%20${selectedProject.title}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all text-center shadow-md"
                          >
                            <MessageSquare size={16} /> WhatsApp Me
                          </a>
                        </div>
                      </div>
                    ) : (
                      // Lightbox details for other projects
                      <div className="w-full lg:w-[380px] p-6 lg:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-200/30 bg-white/85 backdrop-blur-xl h-[50%] lg:h-full relative z-10 shadow-2xl">
                        <div>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                            Project {projectIndex + 1}
                          </span>
                          <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-2">
                            More Work
                          </h3>
                          <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                            Part of Oluwagbogo's extensive creative catalog representing diverse styles and design executions.
                          </p>
                          <div className="w-12 h-[2px] bg-blue-600 mb-6" />
                        </div>
                        
                        <div className="pt-4 border-t border-zinc-200/20 flex gap-3">
                          <a 
                            href={`https://wa.me/+2348132531112?text=Hello%20Oluwagbogo,%20I'm%20interested%20in%20your%20project%20%23${projectIndex + 1}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 border border-zinc-300 hover:border-blue-600 hover:bg-blue-50 text-zinc-800 py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all text-center shadow-sm"
                          >
                            <MessageSquare size={16} /> Enquire About This
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #FAFAFA;
        }
        .font-black { font-weight: 900; }
      `}</style>
    </div>
  );
}
