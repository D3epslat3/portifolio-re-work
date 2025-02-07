// components/Footer.tsx
'use client'

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Coluna 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-neutral-200">Deepslate</h3>
            <p className="text-neutral-400">
              Desenvolvendo experiências digitais excepcionais
            </p>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            <h4 className="text-neutral-200 font-medium mb-4">Navegação</h4>
            <ul className="space-y-2">
              {['Projetos', 'Skills', 'Contato'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-400 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="space-y-4">
            <h4 className="text-neutral-200 font-medium mb-4">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:miguem@miguelm.dev"
                  className="text-neutral-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  miguem@miguelm.dev
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 */}
          <div className="space-y-4">
            <h4 className="text-neutral-200 font-medium mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/D3epslat3"
                target="_blank"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/miguel-sousa-708b27333/"
                target="_blank"
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400"
        >
          <p>© {new Date().getFullYear()} Deepslate. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}