"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TIPAGEM PARA CALAR O ESLINT ---
// Isso diz ao TS que o VFS pode ser uma string ou outra pasta infinitamente
interface VFSNode {
  [key: string]: string | VFSNode;
}

// --- VIRTUAL FILE SYSTEM (VFS) ---
const fileSystem: VFSNode = {
  bin: { bash: "binary", zsh: "binary", ls: "binary", cat: "binary", cd: "binary" },
  etc: {
    "os-release": 'NAME="Deepslate OS"\nVERSION="1.0.0"\nPRETTY_NAME="Deepslate OS (Custom Linux)"',
    "passwd": "root:x:0:0:root:/root:/bin/bash\nmiguel:x:1000:1000:miguel:/home/miguel:/usr/bin/zsh",
  },
  var: {
    log: {
      "syslog": "Feb 16 10:47:21 deepslate kernel: [ 0.000000] Booting Linux on physical node...\nFeb 16 10:47:21 deepslate systemd[1]: Started Deepslate Labs Web Interface."
    }
  },
  root: {
    "flag.txt": "Acesso negado. root privileges required."
  },
  home: {
    miguel: {
      "about.txt": "Desenvolvedor focado em Web e Design de Interfaces (UI/UX).\nNas horas vagas, exploro o ecossistema Linux e desenvolvo projetos e jogos usando Lua.",
      "skills.txt": "=> React, Next.js, TypeScript, UI/UX, Lua, Linux, Docker",
      "contact.sh": 'echo "Email: miguelm@miguelm.dev"\necho "GitHub: github.com/D3epslat3"',
      projects: {
        "maze.exe": "__EXEC_MAZE__",
        "deepnotes.app": "__EXEC_DEEPNOTES__",
        "deepcalc.app": "__EXEC_DEEPCALC__",
        "pz-lore.app": "__EXEC_PZLORE__",
        "deepshell.lua": "__EXEC_DEEPSHELL__",
        "target.lua": "__EXEC_TARGET__",
      }
    }
  }
};

export default function TerminalEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/miguel"); 
  
  const [history, setHistory] = useState<string[]>([
    "Deepslate_Labs OS v1.0.0 (x86_64)",
    "Login: miguel",
    "Digite 'help' para ver os comandos disponíveis."
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;
      buffer += e.key.toLowerCase();
      if (buffer.length > 4) buffer = buffer.slice(1);
      
      if (buffer === "sudo") {
        setIsOpen(true);
        buffer = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const resolvePath = (currentPath: string, targetPath: string) => {
      if (!targetPath) return currentPath;
      if (targetPath === "~") return "/home/miguel";
      
      // Mudamos de 'let' para 'const' aqui!
      const parts = targetPath.startsWith("/") ? [] : currentPath.split("/").filter(Boolean);
      const targetParts = targetPath.split("/").filter(Boolean);
      
      for (const p of targetParts) {
        if (p === ".") continue;
        if (p === "..") parts.pop();
        else parts.push(p);
      }
      return "/" + parts.join("/");
    };

  const getNode = (pathStr: string): string | VFSNode | null => {
    if (pathStr === "/") return fileSystem;
    const parts = pathStr.split("/").filter(Boolean);
    let current: string | VFSNode | undefined = fileSystem;
    
    for (const p of parts) {
      if (typeof current !== "object" || current === null || current[p] === undefined) {
        return null;
      }
      current = current[p];
    }
    // Assegurando que não retorna undefined
    return current !== undefined ? current : null;
  };

  const displayCwd = cwd.startsWith("/home/miguel") ? cwd.replace("/home/miguel", "~") : cwd;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCmd = input.trim();
    if (!fullCmd) return;

    const args = fullCmd.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();
    
    const newHistory = [...history, `miguel@deepslate:${displayCwd}$ ${fullCmd}`];

    if (cmd.startsWith("./") || cmd.startsWith("/")) {
      const targetPath = resolvePath(cwd, cmd.startsWith("./") ? cmd.substring(2) : cmd);
      const node = getNode(targetPath);

      if (!node) {
        newHistory.push(`bash: ${cmd}: No such file or directory`);
      } else if (typeof node === "object") {
        newHistory.push(`bash: ${cmd}: Is a directory`);
      } else if (typeof node === "string" && node.startsWith("__EXEC_")) {
        switch (node) {
          case "__EXEC_MAZE__":
            newHistory.push("Abrindo Maze no navegador...");
            window.open("https://maze.miguelm.dev", "_blank");
            break;
          case "__EXEC_DEEPNOTES__":
            newHistory.push("Abrindo DeepNotes no navegador...");
            window.open("https://dnotes.miguelm.dev/", "_blank");
            break;
          case "__EXEC_DEEPCALC__":
            newHistory.push("Abrindo DeepCalc no navegador...");
            window.open("https://dcalc.miguelm.dev/", "_blank");
            break;
          case "__EXEC_PZLORE__":
            newHistory.push("Abrindo S.O.L.A.R.A Terminal no navegador...");
            window.open("https://pz.miguelm.dev/", "_blank");
            break;
          case "__EXEC_DEEPSHELL__":
          case "__EXEC_TARGET__":
            newHistory.push("Abrindo repositório do projeto no GitHub...");
            const url = node === "__EXEC_DEEPSHELL__" ? "DeepShell" : "Target";
            window.open(`https://github.com/D3epslat3/${url}`, "_blank");
            break;
        }
      } else {
        newHistory.push(`bash: ${cmd}: Permission denied`);
      }
      setHistory(newHistory);
      setInput("");
      return;
    }

    switch (cmd) {
      case "help":
        newHistory.push("Comandos: help, whoami, clear, exit, ls, cd, cat, pwd, date, echo, neofetch");
        newHistory.push("Extras: ping, weather, coffee, uptime, matrix");
        newHistory.push("Navegação: O terminal suporta caminhos absolutos (/) e relativos (../)");
        newHistory.push("Dica: Use './arquivo' em ~/projects para testar aplicações.");
        break;
      
      case "whoami":
        newHistory.push("Miguel M. - Desenvolvedor Web e UI/UX Designer focado em criar experiências excepcionais.");
        break;
      
      case "pwd":
        newHistory.push(cwd);
        break;
      
      case "ls":
        const lsTarget = resolvePath(cwd, args[1] || ".");
        const lsNode = getNode(lsTarget);
        if (!lsNode) {
          newHistory.push(`ls: cannot access '${args[1]}': No such file or directory`);
        } else if (typeof lsNode !== "object") {
          newHistory.push(args[1]); 
        } else {
          const files = Object.keys(lsNode).join("   ");
          newHistory.push(files || "(diretório vazio)");
        }
        break;
      
      case "cd":
        const cdTarget = resolvePath(cwd, args[1] || "~");
        const cdNode = getNode(cdTarget);
        if (!cdNode) {
          newHistory.push(`bash: cd: ${args[1]}: No such file or directory`);
        } else if (typeof cdNode !== "object") {
          newHistory.push(`bash: cd: ${args[1]}: Not a directory`);
        } else if (cdTarget.startsWith("/root") && cdTarget !== "/") {
          newHistory.push(`bash: cd: ${args[1]}: Permission denied`);
        } else {
          setCwd(cdTarget);
        }
        break;
      
      case "cat":
        const catTarget = resolvePath(cwd, args[1]);
        const catNode = getNode(catTarget);
        if (!args[1]) {
          newHistory.push("cat: missing file operand");
        } else if (!catNode) {
          newHistory.push(`cat: ${args[1]}: No such file or directory`);
        } else if (typeof catNode === "object") {
          newHistory.push(`cat: ${args[1]}: Is a directory`);
        } else if (typeof catNode === "string" && (catNode.startsWith("__EXEC_") || catNode === "binary")) {
          newHistory.push(`cat: ${args[1]}: cannot display binary executable`);
        } else if (typeof catNode === "string") {
          catNode.split("\n").forEach((line: string) => newHistory.push(line));
        }
        break;

      case "rm":
        if (args.includes("-rf") && args.includes("/")) {
          if (args.includes("--no-preserve-root")) {
            newHistory.push("rm: cannot remove '/': Permission denied");
          } else {
            newHistory.push("rm: it is dangerous to operate recursively on '/'");
            newHistory.push("rm: use --no-preserve-root to override this failsafe");
          }
        } else {
          newHistory.push(`rm: cannot remove '${args[1] || ""}': Permission denied`);
        }
        break;

      case "sudo":
        if (args.includes("rm") && args.includes("-rf") && args.includes("/")) {
          newHistory.push("[sudo] password for miguel: *********");
          
          if (args.includes("--no-preserve-root")) {
            newHistory.push("miguel is not in the sudoers file. This incident will be reported.");
            newHistory.push("");
            newHistory.push("CRITICAL THREAT DETECTED: Unauthorized root wipe attempt.");
            newHistory.push("Initiating emergency lockdown...");
            newHistory.push("Kernel panic - not syncing: Fatal exception in VFS");
            newHistory.push("System halted.");
            setHistory(newHistory);
            
            setTimeout(() => {
              window.close();
              window.location.href = "about:blank"; 
            }, 3000);
            return; 
          } else {
            newHistory.push("rm: it is dangerous to operate recursively on '/'");
            newHistory.push("rm: use --no-preserve-root to override this failsafe");
          }
        } else {
          newHistory.push("[sudo] password for miguel: *********");
          newHistory.push("miguel is not in the sudoers file. This incident will be reported.");
        }
        break;

      case "date":
        newHistory.push(new Date().toString());
        break;
      
      case "echo":
        newHistory.push(args.slice(1).join(" "));
        break;
      
      case "ping":
        const targetHost = args[1] || "miguelm.dev";
        newHistory.push(`PING ${targetHost} (127.0.0.1): 56 data bytes`);
        newHistory.push(`64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms`);
        newHistory.push(`64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.039 ms`);
        newHistory.push(`--- ${targetHost} ping statistics ---`);
        newHistory.push(`3 packets transmitted, 3 packets received, 0.0% packet loss`);
        break;
      
      case "weather":
        newHistory.push("Localização: SP, Brasil | Condição: Ideal para codar.");
        break;
      
      case "coffee":
        newHistory.push(
          "  (  )   (   )",
          "   ) (   )  (",
          " (_______)___)",
          " |       |   |",
          " |       |__/ ",
          " |_______|",
          "Café servido. Bora codar."
        );
        break;

      case "uptime":
        newHistory.push("up 42 days, 13:37, 1 user, load averages: 3.14, 2.71, 1.61");
        break;
      
      case "matrix":
        newHistory.push("Wake up, Miguel...", "The Matrix has you...", "Follow the white rabbit.");
        break;

      case "neofetch":
        newHistory.push(
          "       /\\        OS: Deepslate OS x86_64",
          "      /  \\       Host: Deepslate Labs Custom",
          "     /____\\      Kernel: 6.9.0-zen1-1-zen",
          "    /      \\     Uptime: 42 days, 13 hours",
          "   /________\\    Packages: 1337 (pacman)",
          "                 Shell: DeepShell (Lua)",
          "                 DE: Hyprland",
          "                 Terminal: Alacritty"
        );
        break;
      
      case "clear":
        setHistory([]);
        setInput("");
        return;
      
      case "exit":
        setIsOpen(false);
        setHistory(["Deepslate_Labs OS v1.0.0 (x86_64)", "Login: miguel", "Digite 'help' para ver os comandos disponíveis."]);
        setCwd("/home/miguel");
        setInput("");
        return;

      default:
        newHistory.push(`bash: ${cmd}: command not found`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-[#0f0f15]/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden font-mono text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-[#1a1b26] border-b border-gray-800 select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-gray-400 text-xs font-semibold tracking-wider">miguel@deepslate:{displayCwd}</div>
            </div>
            
            {/* Corpo */}
            <div 
              ref={containerRef}
              className="p-5 h-[450px] overflow-y-auto text-gray-300 custom-scrollbar whitespace-pre-wrap" 
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className={`${line.startsWith('miguel@') ? 'mt-3 text-purple-300' : 'ml-2'} leading-relaxed`}>
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex mt-3">
                <span className="text-purple-400 font-bold mr-2 whitespace-nowrap">
                  miguel@deepslate:{displayCwd}$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-100 font-bold"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
