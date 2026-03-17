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
  ChevronRight
} from 'lucide-react';

// Google Drive Image IDs provided by the user
const IMAGE_IDS = [
  '1oaglk7ZnnSn6nao3bgjdyioVsgxSCY85', // New Project 1
  '1Cynj6SV10utwm3ZfadnC6FRB9bH9nyE9', // New Project 2
  '1FXamc43tsiuBicprGbmNoTFrsw6OavNH', // New Project 3
  '1OT8BEuz5ZhTFT64m-T_RtPtvX7Dh0-n_', // Old Project 1
  '1ekhUWtmR4i4QsaDW3FwmolE05dAE5EA0', // Old Project 2
  '1Ip9LeUwwI4PFvraYfO-ZXOBtz7WzuNwy', // Old Project 3
  '1qYdrmwFKChGuSNSSNR4w3f-6kRruthtP',
  '1hc8z33L_FXsuvu5_iHcYrXKLbkofxD9R',
  '1rL-Oe4UBmgi_l2EG4_tgtnKCS5b7wyNv',
  '1j25QQj3pxZlgoihrkJe3-TJQlemhZ7Ta',
  '1xONmPhvg7H5FV1JBz5_2uNhL095wNx-W',
  '1zwbPIEYFh5zROuKAmwesC4j_UqcnnPIe',
  '1GxD6y0hEVEZpTYxMKbvXG_EM7OrrYlv_',
  '1wRmzAJoUs4UjlwI2io7ErrpgDmLQcTWk',
  '1LRWtwTjDZd6qs7fSq7ugo02Dg83lJd7E',
  '18_2Dl-ixGzJQX8MYyGCNM1Cu4nFgySW8',
  '1RgkpDXlenL4rTFAjHOSSug0y_Uo0VeDd',
  '16rUANTaUTrhY5EWVHQC6ULBkCjEB_XoW',
  '1nCMwk96LW9wMmt5R8kRtkM229MBYlu8V',
  '1c-HHmkvply73kvAeYhpwWEGWbh8fq2PF',
  '1t1OX5khpFnH6Q-s2H2inlVy21Mn4uBlL',
  '1W1-gZktUnHyoJgVknWM2sDuA5W-k5q2u'
];

const getImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const FEATURED_PROJECTS = [
  {
    id: IMAGE_IDS[0],
    title: 'Afriradar',
    subtitle: 'Carousel Design',
    description: 'A media publishing company dedicated to telling the most compelling stories of tech news and digital updates across the African continent.',
    tags: ['Carousel Design', 'Social Media', 'Tech News', 'Africa'],
    url: getImageUrl(IMAGE_IDS[0])
  },
  {
    id: IMAGE_IDS[1],
    title: 'Vectorise',
    subtitle: 'Product Interface & Visual System',
    description: 'Problem: A tech platform needed a clean interface and visual structure to help users navigate complex information easily. Solution: Created a UI structure using consistent typography, spacing systems, and clear visual hierarchy. Result: A structured interface that improves clarity and usability across the platform.',
    tags: ['Visual System', 'UI Design', 'Typography'],
    url: getImageUrl(IMAGE_IDS[1])
  },
  {
    id: IMAGE_IDS[2],
    title: 'Servifix',
    subtitle: 'Service Branding',
    description: 'A comprehensive branding and visual identity system for a construction and maintenance firm, emphasizing reliability, precision, and professional service delivery.',
    tags: ['Branding', 'Identity', 'Construction', 'Service'],
    url: getImageUrl(IMAGE_IDS[2])
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

const TOOLS = [
  'Canva', 'Figma', 'Illustrator', 'Coreldraw', 
  'Photoshop', 'InDesign', 'Pixellab'
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = CATALOGUE.findIndex(item => item.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % CATALOGUE.length;
    setSelectedProject(CATALOGUE[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = CATALOGUE.findIndex(item => item.id === selectedProject.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + CATALOGUE.length) % CATALOGUE.length;
    setSelectedProject(CATALOGUE[prevIndex]);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black tracking-tighter"
          >
            EMMANUEL IDOWU.
          </motion.div>
          
          <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">
            {['Work', 'Approach', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-100 transition-opacity hover:text-blue-500">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/+2348132531112" target="_blank" className="hidden md:flex text-[10px] font-bold tracking-widest uppercase bg-blue-600 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              Start a Conversation
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
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
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-3xl font-bold"
          >
            {['Work', 'Approach', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-blue-500 transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="https://wa.me/+2348132531112" className="text-sm bg-blue-600 px-8 py-4 rounded-full mt-8">
              WhatsApp Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-[7vw] font-black leading-[0.9] tracking-tighter uppercase mb-8">
                Design that helps <br />
                brands become <br />
                <span className="text-blue-600">impossible</span> <br />
                to ignore.
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-medium">
                Graphic, Brand & UI Designer with 8+ years designing brand systems and digital interfaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#work" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-sm font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
                  View Selected Work
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </a>
                <a 
                  href="https://drive.google.com/file/d/1kyqTdZ2_NcJkm4rdANurQxE3MjeS5zOQ/view?usp=drivesdk" 
                  target="_blank"
                  className="flex items-center gap-3 px-8 py-4 rounded-sm border border-white/10 font-bold hover:bg-white/5 transition-colors"
                >
                  Download CV <Download size={18} />
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
              className="w-full aspect-square border border-white/5 rounded-3xl flex items-center justify-center p-12 bg-zinc-900/50 backdrop-blur-sm"
            >
              <div className="w-full h-full border-2 border-blue-600/20 rounded-2xl flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-4 h-4 bg-blue-600 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 translate-x-1/2 translate-y-1/2" />
                <span className="text-8xl font-black text-white/10">B.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-600 mb-4 block">The Proof</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Selected Work</h2>
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
                  <div className="group relative aspect-[16/10] overflow-hidden bg-zinc-900 rounded-lg">
                    <img 
                      src={project.url} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">Project {index + 1}</span>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">{project.title} — {project.subtitle}</h3>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 border border-white/10 rounded-full">
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
      <section className="pb-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter">More Projects</h2>
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {CATALOGUE.map((item, index) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="break-inside-avoid relative group overflow-hidden rounded-lg cursor-pointer mb-3"
                onClick={() => setSelectedProject(item)}
              >
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
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-600 mb-4 block">Your Edge</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">My Approach to Design</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: 'Discover', desc: 'Understanding the business, audience, and problem.' },
              { icon: Layers, title: 'Structure', desc: 'Building a visual system that communicates clearly.' },
              { icon: PenTool, title: 'Design', desc: 'Crafting visuals that make the brand recognizable everywhere.' }
            ].map((item, i) => (
              <div key={i} className="p-12 border border-white/5 bg-zinc-900/30 rounded-2xl hover:border-blue-600/50 transition-colors group">
                <item.icon className="mb-8 text-blue-600 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Design Thinking Snapshot */}
          <div className="mt-32 p-12 border border-white/5 rounded-3xl bg-gradient-to-br from-zinc-900 to-black">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black uppercase">Design Thinking Snapshot</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center text-xl font-bold">The Pivot</div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Strategy</span>
              </div>
              <ArrowRight className="hidden md:block text-blue-600" size={32} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border-2 border-blue-600 flex items-center justify-center text-2xl font-black">Brand</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Identity</span>
              </div>
              <ArrowRight className="hidden md:block text-blue-600" size={32} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center text-xl font-bold">Comm.</div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Visuals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Tools */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl font-black uppercase mb-12">Design Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map(item => (
                <div key={item} className="flex items-center gap-4 p-6 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="font-bold text-sm uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-black uppercase mb-12">Tools of the Trade</h2>
            <div className="flex flex-wrap gap-4">
              {TOOLS.map(tool => (
                <span key={tool} className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-blue-600 transition-colors">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Background */}
      <section id="about" className="py-32 px-6 border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-blue-600 mb-8 block">Quick Background</span>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed italic">
            "I started in graphic design over eight years ago and later moved deeper into brand development. My focus today is helping organizations communicate their value through clear, structured visual identities."
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12">
            Let's build <br />
            something <span className="text-blue-600">meaningful.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-8 mb-20">
            <a 
              href="mailto:Oluwagbogoidowu@gmail.com" 
              className="text-2xl md:text-4xl font-bold hover:text-blue-500 transition-colors"
            >
              Oluwagbogoidowu@gmail.com
            </a>
            <div className="flex gap-6">
              <a href="https://wa.me/+2348132531112" target="_blank" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">
                <MessageSquare size={18} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://drive.google.com/file/d/1kyqTdZ2_NcJkm4rdANurQxE3MjeS5zOQ/view?usp=drivesdk" 
              target="_blank"
              className="bg-white text-black px-10 py-5 rounded-sm font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              Download CV
            </a>
            <a href="https://wa.me/+2348132531112" className="border border-white/10 px-10 py-5 rounded-sm font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter">EMMANUEL IDOWU.</div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
            © 2026 ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase opacity-30">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Behance</a>
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/20 rounded-full transition-colors z-10 hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/20 rounded-full transition-colors z-10 hidden md:block"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div 
              key={selectedProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) handleNext();
                if (info.offset.x > 100) handlePrev();
              }}
              className="max-w-4xl w-full cursor-grab active:cursor-grabbing"
            >
              <img 
                src={selectedProject.url} 
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-lg shadow-2xl pointer-events-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0A0A0A;
        }
        .font-black { font-weight: 900; }
      `}</style>
    </div>
  );
}
