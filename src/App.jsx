import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Sparkles, Code, Palette, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const projects = [
    {
      title: "Emovia - Mental Wellness Platform",
      category: "Web Development",
      description: "Emovia is a modern mental wellness platform focused on promoting emotional balance, self-care, and mental well-being.",
      tech: ["React", "TailWind CSS", "JavaScript"],
      image: "/emovia.jpg"
    },
   {
  title: "RideShield",
  category: "Hardware & IoT",
  description:
    "RideShield is a smart helmet system designed to detect accidents in real time and automatically trigger emergency alerts using motion sensors and location tracking for faster assistance.",
  tech: ["MPU6050", "ESP32", "GSM Module", "GPS"],
  image: "/ride.jpg" // replace with your image path
},
{
  title: "Samarth",
  category: "AI, ML & Web Development",
  description:
    "Samarth is an intelligent public complaint management platform that categorizes, prioritizes, and resolves of civic issues like water supply, electricity, and sanitation using AI-driven insights.",
  tech: ["React", "Node.js", "Express", "MongoDB", "Machine Learning", "NLP"],
  image: "/samrath.webp" // replace with your image path
},
{
  title: "SkyGlimpse",
  category: "Web Development",
  description:
    "SkyGlimpse is a sleek weather application that provides real-time weather updates and forecasts through a clean, responsive, and user-friendly interface.",
  tech: ["React", "HTML", "CSS"],
  image: "/weather.webp" // replace with your image path
}

  ];

  return (
<div className="min-h-screen text-[#e8e8e8] bg-gradient-to-b from-[#09090f] via-[#1c1c1d] to-[#090909]">
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700;800;900&family=Newsreader:ital,wght@0,300;0,400;1,300&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Darker Grotesque', -apple-system, sans-serif;
          overflow-x: hidden;
          background: #0a0a0a;
        }

        .serif {
          font-family: 'Newsreader', Georgia, serif;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animated-gradient {
          background: linear-gradient(-45deg, #0a0a0a, #1a1a1a, #0f0f0f, #151515);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .glow-effect {
          box-shadow: 0 0 60px rgba(255, 255, 255, 0.1);
        }

        .text-glow {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .cursor-glow {
          pointer-events: none;
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        .fade-up {
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        .project-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          transform: translateY(-8px);
        }

        .project-card img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover img {
          transform: scale(1.1);
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .parallax-slow {
          transform: translateY(var(--scroll-y, 0));
        }
      `}</style> */}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Cursor Glow Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black tracking-tight cursor-pointer text-white" onClick={() => scrollToSection('home')}>
              Vanshika's Vault
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {['Home', 'Work', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link text-sm uppercase tracking-wider font-bold text-white ${
                    activeSection === item.toLowerCase() ? 'active' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-6 pb-6 flex flex-col gap-4">
              {['Home', 'Work', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-lg uppercase tracking-wider font-bold text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-14 relative overflow-hidden">
        {/* Tech Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70 z-10" />
          <img 
            src="/tech.jpg" 
            //https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop
            alt="Tech background"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 z-20 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl z-5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl z-5"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating tech icons */}
        <motion.div
          className="absolute top-1/4 left-10 text-white/5 z-5"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Code size={80} strokeWidth={1} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-20 text-white/5 z-5"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={60} strokeWidth={1} />
        </motion.div>

        <div className="max-w-6xl w-full relative z-10">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                Creative Developer & Designer
              </p>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter text-glow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, rotateZ: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                CRAFTING
              </motion.span>
              <br />
              <span className="gradient-text font-black">DIGITAL</span>
              <br />
              <span className="serif italic font-light">experiences</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I transform ideas into <span className="font-bold text-white">elegant</span>, user-centered digital products that make an <span className="font-bold text-white">impact</span>.
            </motion.p>

            <motion.div 
              className="pt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('work')}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-base font-bold uppercase tracking-wider transition-all duration-300 glow-effect"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-base font-bold uppercase tracking-wider transition-all duration-300"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="pt-10 grid grid-cols-3 gap-6 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { number: '200+', label: 'Hours of Coding Practice' },
{ number: '8+', label: 'Tech Stacks Used' },
{ number: '6+', label: 'Major Projects Built' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl md:text-5xl font-black gradient-text">{stat.number}</div>
                  <div className="text-sm text-gray-400 mt-2 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}


        
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 relative">
        {/* Background decoration */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0.2, 0.5], [0, 200])
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-2 font-bold">
              <Code size={16} />
              Selected Projects
            </p>
            <h2 className="text-6xl md:text-6xl font-black tracking-tighter text-white">
              RECENT WORK
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, index) => {
              const CardContent = () => {

                return (
                 <motion.div
  className="project-card group cursor-pointer"
  initial={false}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, delay: index * 0.15 }}
>

                  <motion.div 
  className="relative overflow-hidden bg-gray-900 aspect-[3/2] mb-6 rounded-lg"
  initial={false}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  whileHover={{ scale: 1.03 }}
>
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.9 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                      />
                      
                     <motion.div 
    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  />
                    </motion.div>
                    
                    <div className="space-y-4">
                      <motion.p 
                        className="text-sm uppercase tracking-widest text-gray-300 flex items-center gap-2 font-bold"
                        whileHover={{ x: 5 }}
                      >
                        <Palette size={14} />
                        {project.category}
                      </motion.p>
                      <motion.h3 
                        className="text-3xl md:text-4xl font-black text-white"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-gray-200 leading-relaxed font-semibold text-lg">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {project.tech.map((tech, i) => (
                          <motion.span 
                            key={i}
                            className="text-sm px-4 py-2 bg-white/10 border border-white/30 uppercase tracking-wider font-bold text-white rounded"
                            whileHover={{ 
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              scale: 1.05,
                              borderColor: '#ffffff'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              };

              return <CardContent key={index} />;
            })}
          </div>

          {/* View All Projects Button */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group inline-flex items-center gap-3 px-12 py-6 border-2 border-white text-white text-lg font-bold uppercase tracking-wider"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 0 40px rgba(255,255,255,0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 border-t border-white/10 relative overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute -left-40 top-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-widest text-white mb-8 flex items-center gap-2 font-bold">
                <Zap size={16} className="animate-pulse" />
                About Me
              </p>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight text-white">
                BUILDING AT THE
                <br />
                <span className="text-white">INTERSECTION</span>
                <br />
                <span className="serif italic font-light text-white">of design & code</span>
              </h2>

              {/* Image placeholder */}
              <motion.div 
                className="mt-12 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden glow-effect">
                  <img 
                    src="/daddy.jpeg" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white text-black px-8 py-4 font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  1+ Years of Coding Background
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-2xl text-gray-200 leading-relaxed font-semibold">
                I'm a <span className="text-white font-bold">frontend developer</span> and <span className="text-white font-bold">designer</span> with a passion for creating thoughtful digital experiences.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                With 1+ years of experience, I've worked with organizations and established myself as a confident bieng who bring their visions to life through <span className="font-bold text-white">clean code</span> and <span className="font-bold text-white">intentional design</span>.
              </p>

              {/* Expertise Cards */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: Code, title: 'Development', desc: 'Frontend expertise' },
                  { icon: Palette, title: 'Design', desc: 'UI/UX mastery' },
                  { icon: Sparkles, title: 'Strategy', desc: 'Product thinking' },
                  { icon: Zap, title: 'Performance', desc: 'Optimized code' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="border-2 border-white/30 bg-white/5 p-6 hover:border-white transition-colors"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <item.icon size={32} className="mb-3 text-white" strokeWidth={2.5} />
                    <h3 className="font-black text-xl mb-1 text-white">{item.title}</h3>
                    <p className="text-base text-white font-semibold">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-white mb-4 font-black">SKILLS & TECHNOLOGIES</h3>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Javascript', 'HTML & CSS', 'Java', 'Python', 'Figma', 'UI/UX Design', 'MySQL'].map((skill, i) => (
                      <motion.span 
                        key={skill} 
                        className="px-5 py-3 border-2 border-white/30 bg-white/5 text-base font-black text-white hover:border-white transition-colors"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: 'rgba(255,255,255,0.15)'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
        
        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-sm uppercase tracking-widest text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          
          <motion.h2 
            className="text-6xl md:text-6xl font-black leading-tight mb-12 tracking-tighter text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LET'S WORK
            <br />
            <motion.span 
              className="serif italic text-white"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-block' }}
            >
              together
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: Mail, label: 'Email', href: 'mailto:vanshika.2327it1005@kiet.edu' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vanshikag411/' },
              { icon: Github, label: 'GitHub', href: 'https://github.com/Vanshikag411/Vanshikag411' }
            ].map((item, i) => (
              <motion.a 
                key={i}
                href={item.href}
                className="group flex items-center gap-3 px-8 py-4 border-2 border-white/30 bg-white/5 text-lg font-black text-white hover:border-white transition-all"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={24} strokeWidth={2.5} />
                {item.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.p 
            className="text-gray-300 text-xl font-semibold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Available for <span className="text-white font-bold">freelance projects</span> and <span className="text-white font-bold">full-time opportunities</span>
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="inline-flex items-center gap-3 px-16 py-6 bg-white text-black text-xl font-black uppercase tracking-wider glow-effect"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 60px rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Start A Project
            <ArrowUpRight size={28} />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-white/10 py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p 
            className="text-sm text-gray-400 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            © 2024 Portfolio. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-sm text-gray-400 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Designed & built with <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ display: 'inline-block' }}
            >❤️</motion.span>
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
