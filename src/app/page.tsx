// app/page.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { 
  Mail, 
  Code, 
  Paintbrush, 
  Smartphone,
  Code2,
  Database,
  Cpu,
  GitBranch,
  Moon,
  Atom
} from 'lucide-react';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const services = [
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description: "Sites performáticos com React e Next.js"
    },
    {
      icon: Paintbrush,
      title: "UI/UX Design",
      description: "Interfaces intuitivas e visualmente atraentes"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Experiências otimizadas para dispositivos móveis"
    }
  ];

  const projects = [
    {
      title: "Maze",
      description: "Jogo de labirinto feito em canvas",
      stack: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/D3epslat3/maze",
      hasLiveSite: true,
      externalUrl: "https://maze.miguelm.dev"
    },

        {
      title: "DeepNotes",
      description: "Site de notas inteligentes",
      stack: ["NextJS", "TypeScript", "Tailwindcss"],
      githubUrl: "https://github.com/D3epslat3/deep-notes",
      hasLiveSite: true,
      externalUrl: "https://dnotes.miguelm.dev/"
    },

       {
      title: "DeepShell",
      description: "Um Shell moderno e feito totalmente em Lua",
      stack: ["Lua"],
      githubUrl: "https://github.com/D3epslat3/DeepShell",
      externalUrl: "false"
    },
    
    {
      title: "Target",
      description: "Um jogo de tiro ao alvo feito em Lua",
      stack: ["Lua", "Lovë 2D"],
      githubUrl: "https://github.com/D3epslat3/Target",
      externalUrl: "false"
    },
    
  ];
  
  const skills = [
    { 
      name: "TypeScript", 
      icon: Code2 
    },
    { 
      name: "React/Next.js", 
      icon: Cpu 
    },
    { 
      name: "Node.js", 
      icon: Database 
    },
    { 
      name: "Git & CI/CD", 
      icon: GitBranch 
    },
    // Adicione mais habilidades conforme necessário
    { 
      name: "Lua", 
      icon: Moon // Você pode usar outro ícone ou substituir por imagem
    },
    { 
      name: "Docker", 
      icon: Cpu 
    },
    { 
      name: "React", 
      icon: Atom 
    },
    { 
      name: "UX/UI Designer", 
      icon: Paintbrush 
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-grid-1" />
        </motion.div>
      
        <div className="relative z-10 max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-center gap-8"
          >
            {/* Text Content */}
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold max-w-3xl leading-tight text-white">
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Desenvolvedor Criativo
                </span>{" "}
                focado em experiências digitais excepcionais
              </h1>
              
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href="#work"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center gap-2 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Ver Projetos
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-6 py-3 border border-purple-600 hover:bg-purple-900 rounded-lg flex items-center gap-2 text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Vamos conversar
                </motion.a>
              </motion.div>
            </div>
      
            {/* Image - Hidden on mobile */}
            <div className="hidden md:block flex-1">
              <Image
                src="/deep_logo.svg"
                alt="Deep Logo"
                className="updown rounded-full"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="skills" className="py-20 px-4 sm:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <service.icon className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
              <p className="text-neutral-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Skills Section */}
      <section  className="py-20 px-4 sm:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-16 text-center text-gray-50"
          >
            Habilidades Técnicas
          </motion.h2>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-xl bg-neutral-800 hover:bg-purple-900/20 transition-colors group"
              >
                <skill.icon className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-purple-400 mx-auto group-hover:text-purple-300 transition-colors" />
                <h3 className="text-lg sm:text-xl font-medium text-center text-white">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
  
          {/* Stack adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-4 text-neutral-400"
          >
            <span className="px-4 py-2 rounded-full bg-neutral-800/50">Lua</span>
            <span className="px-4 py-2 rounded-full bg-neutral-800/50">Docker</span>
            <span className="px-4 py-2 rounded-full bg-neutral-800/50">React</span>
            <span className="px-4 py-2 rounded-full bg-neutral-800/50">UI/UX Designer</span>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 px-4 sm:px-8 bg-grid-2">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl sm:text-5xl font-bold mb-16 text-center text-gray-50"
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Projetos Recentes
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 backdrop-blur-sm p-6 border border-purple-900/30 hover:border-purple-400/30 transition-colors text-white"
              >
                <div className="space-y-4">
                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-sm bg-purple-900/30 rounded-full text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
      
                  {/* Título e Descrição */}
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 mb-6">
                    {project.description}
                  </p>
      
                  {/* Botões */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    {/* Botão GitHub - Sempre Visível */}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium flex items-center gap-2 justify-center text-sm sm:text-base ${
                        !project.hasLiveSite ? 'w-full' : 'flex-1'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className="w-4 h-4" />
                      Código Fonte
                    </motion.a>
      
                    {/* Botão Site - Condicional */}
                    {project.hasLiveSite && (
                      <motion.a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-purple-600 hover:bg-purple-900/30 rounded-lg flex items-center gap-2 justify-center text-sm sm:text-base text-white flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                        >
                          <path 
                            fill="currentColor" 
                            d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19L5 17.59z"
                          />
                        </svg>
                        Ver Site
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl sm:text-5xl font-bold mb-8 text-gray-50"
          >
            Vamos trabalhar juntos
          </motion.h2>
          
          <motion.p
            className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Transforme suas ideias em realidade digital. Entre em contato para discutirmos seu projeto.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <motion.a
              href="mailto:miguelm@miguelm.dev"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium flex items-center gap-2 text-white"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-5 h-5" />
              Enviar Email
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
