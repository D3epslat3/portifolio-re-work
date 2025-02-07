// components/Navbar.tsx
'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Projetos', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contato', href: '#contact' },
    // { name: 'S', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-neutral-950/90 backdrop-blur-xl z-50 border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link href="#" className="group">
          <motion.span 
            className="text-xl font-medium bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Deepslate
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          
          <div className="h-6 w-px bg-neutral-800 mx-4" />
          
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/D3epslat3"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg hover:bg-neutral-800"
            >
              <Github className="w-5 h-5 text-neutral-300" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/miguel-sousa-708b27333/"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg hover:bg-neutral-800"
            >
              <Linkedin className="w-5 h-5 text-neutral-300" />
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-neutral-300" />
          ) : (
            <Menu className="w-6 h-6 text-neutral-300" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800"
            >
              <div className="px-4 py-6 space-y-6">
                {links.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-lg text-neutral-300 hover:text-purple-400"
                    onClick={() => setIsOpen(false)}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-6 border-t border-neutral-800 flex gap-4">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
