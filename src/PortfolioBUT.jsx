import React, { useState, useMemo, useEffect } from "react";
import {
 Search, Github, Mail, Phone, MapPin, ExternalLink, Code2, Brain,
 Smartphone, Database, Wrench, Filter, X, ArrowRight, Sparkles,
 Star, Zap, Rocket, ChevronDown, Menu, Download, BookOpen,
 Trophy, Users, Target, Calendar, Award, TrendingUp, Lightbulb, CheckCircle
} from "lucide-react";

// Composants UI
const Card = ({ children, className = "" }) => (
 <div className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 hover:bg-white/15 hover:shadow-2xl transition-all duration-500 ${className}`}>
   {children}
 </div>
);

const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }) => {
 const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
 const variants = {
   default: "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
   outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
   ghost: "hover:bg-gray-100 dark:hover:bg-gray-800"
 };
 const sizes = { default: "h-10 py-2 px-4", sm: "h-9 px-3 text-sm", lg: "h-11 px-8 text-base" };
 
 return (
   <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
     {children}
   </button>
 );
};

const Badge = ({ children, className = "", variant = "default" }) => {
 const variants = {
   default: "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
   secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
   outline: "text-foreground border-gray-300 dark:border-gray-600"
 };
 
 return (
   <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
     {children}
   </div>
 );
};

// Données
const owner = {
 name: "Samba SORBO",
 role: "Étudiant BUT3 Informatique en Alternance",
 specialization: "Développement Informatique & Technologies Web",
 city: "Paris, France",
 email: "sorbosamba@gmail.com",
 phone: "+33 6 16 47 91 03",
 about: "Passionné par le développement informatique et les nouvelles technologies, je combine expertise technique et vision pratique pour créer des solutions utiles. Mon parcours en alternance m'a permis d'acquérir une solide expérience professionnelle.",
 links: { github: "https://github.com/samba187", linkedin: "https://linkedin.com/in/samba-sorbo-15092b1a9" }
};

const CATEGORIES = [
 { key: "web", label: "Web", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "🌐" },
 { key: "mobile", label: "Mobile", color: "bg-green-100 text-green-700 border-green-200", icon: "📱" },
 { key: "ia", label: "IA/ML", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "🤖" },
 { key: "system", label: "Système", color: "bg-orange-100 text-orange-700 border-orange-200", icon: "⚙️" },
 { key: "data", label: "Data", color: "bg-cyan-100 text-cyan-700 border-cyan-200", icon: "📊" },
];

const projects = [
 {
   id: 1, title: "ChatBot Automobile RAG", period: "2024-2025", category: "ia", featured: true,
   description: "Assistant virtuel spécialisé automobile utilisant RAG avec Flask, MongoDB et Mistral 7B.",
   tech: ["Python", "Flask", "MongoDB", "Mistral 7B", "Angular", "RAG", "HuggingFace"],
   highlights: ["Pipeline RAG complet", "Interface Angular Material", "Architecture microservices"],
   links: { repo: "https://github.com/samba187/chatbot-auto" },
   competences: ["Réaliser", "Optimiser", "Collaborer"],
   context: "Projet de groupe BUT3 - 4 étudiants"
 },
 {
   id: 2, title: "Détection Âge & Genre par CNN", period: "2024", category: "ia", featured: true,
   description: "Système de reconnaissance faciale multi-tâches avec transfer learning MobileNetV2.",
   tech: ["TensorFlow", "Keras", "Python", "Streamlit", "OpenCV", "MobileNetV2"],
   highlights: ["92% accuracy genre", "MAE âge: 5,0 ans", "Transfer learning", "Interface Streamlit"],
   links: { repo: "https://github.com/samba187/SmartFace" },
   competences: ["Réaliser", "Optimiser"],
   context: "SAE S5 - Projet Universitaire"
 },
 {
   id: 3, title: "Simulateur EuroMillions", period: "2024-2025", category: "data", featured: true,
   description: "Application Python pour simulation de tirages avec analyses statistiques complètes.",
   tech: ["Python", "Tkinter", "Pandas", "Matplotlib", "NumPy", "Seaborn"],
   highlights: ["Millions de tirages simulés", "Analyses statistiques", "Visualisations interactives"],
   links: { repo: "https://github.com/samba187/Loto_app" },
   competences: ["Réaliser", "Optimiser"],
   context: "Projet personnel"
 },
 {
   id: 4, title: "Application IMDB", period: "2023-2024", category: "web",
   description: "Application collaborative de recherche de films avec système d'avis utilisateurs.",
   tech: ["Python", "Flask", "PostgreSQL", "JavaScript", "HTML/CSS", "Bootstrap"],
   highlights: ["API RESTful", "Authentification sécurisée", "Base de données optimisée"],
   links: { repo: "https://github.com/samba187/cinefilm" },
   competences: ["Réaliser", "Administrer", "Gérer"],
   context: "SAE S3-S4 - Groupe de 3"
 },
 {
   id: 5, title: "Jeu Mobile Android", period: "2024", category: "mobile",
   description: "Jeu multi-niveaux avec sauvegarde locale et architecture MVC.",
   tech: ["Java", "Android Studio", "SQLite", "XML", "Git"],
   highlights: ["Architecture MVC", "Persistance SQLite", "Développement collaboratif"],
   links: { repo: "https://github.com/samba187/android_app" },
   competences: ["Réaliser", "Collaborer"],
   context: "SAE S4 - Équipe de 4"
 },
 // À ajouter dans l'array projects
{
  id: 6, 
  title: "Travel Tracker PWA (CartoTrip)", 
  period: "2024", 
  category: "web",
  description: "Progressive Web App pour planifier, suivre et partager ses voyages avec cartes interactives et gestion complète des itinéraires.",
  tech: ["React", "PWA", "MapTiler", "Node.js", "MongoDB", "JWT", "Service Workers"],
  highlights: [
    "Cartes interactives avec marqueurs GPS", 
    "Mode offline avec Service Workers",
    "Gestion complète voyages/villes/photos", 
    "Statistiques personnelles de voyage",
    "Authentification JWT sécurisée"
  ],
  links: { repo: "https://github.com/samba187/CartoTrip" },
  competences: ["Réaliser", "Optimiser", "Administrer"],
  context: "Projet personnel - PWA avancée"
},
{
  id: 7, 
  title: "QariApp - Évaluation Récitation Coran", 
  period: "2024", 
  category: "ia", 
  featured: true,
  description: "PWA d'évaluation automatique de récitations coraniques utilisant Whisper d'OpenAI pour la transcription et scoring de précision.",
  tech: ["React", "PWA", "Python", "Flask", "Whisper", "MongoDB", "OpenAI API"],
  highlights: [
    "Transcription automatique avec Whisper",
    "Système de scoring par distance Levenshtein", 
    "Reconnaissance automatique des sourates",
    "Tableau de bord progrès utilisateur",
    "API REST complète"
  ],
  links: { repo: "https://github.com/samba187/qariapp" },
  competences: ["Réaliser", "Optimiser", "Conduire"],
  context: "Projet innovant - IA pour l'éducation religieuse"
}
];

const competences = {
 "Réaliser": {
   description: "Développer des solutions informatiques",
   skills: ["React", "Angular", "Python", "Java", "JavaScript", "Node.js"],
   icon: Code2, color: "from-blue-500 to-cyan-500", niveau: "Avancé - BUT3",
   experiences: ["Développement full-stack", "Architecture microservices", "APIs REST"]
 },
 "Optimiser": {
   description: "Analyser et améliorer les performances",
   skills: ["TensorFlow", "Algorithmes", "Profiling", "Cache Redis"],
   icon: TrendingUp, color: "from-green-500 to-emerald-500", niveau: "Intermédiaire - BUT3",
   experiences: ["Optimisation ML", "Performance tuning", "Monitoring"]
 },
 "Administrer": {
   description: "Gérer l'infrastructure",
   skills: ["Linux", "Docker", "AWS", "MongoDB", "PostgreSQL"],
   icon: Wrench, color: "from-orange-500 to-red-500", niveau: "Intermédiaire - BUT3",
   experiences: ["Administration serveurs", "Containerisation", "Cloud"]
 },
 "Gérer": {
   description: "Planifier et coordonner",
   skills: ["Scrum", "Git Flow", "Documentation", "Jira"],
   icon: Target, color: "from-purple-500 to-pink-500", niveau: "Avancé - BUT3",
   experiences: ["Gestion Agile", "Coordination équipes", "Documentation"]
 },
 "Conduire": {
   description: "Mener l'innovation",
   skills: ["Innovation", "R&D", "Architecture", "Leadership"],
   icon: Rocket, color: "from-indigo-500 to-purple-500", niveau: "Intermédiaire - BUT3",
   experiences: ["Projets innovants", "Veille technologique", "Architecture"]
 },
 "Collaborer": {
   description: "Travailler en équipe",
   skills: ["Communication", "Git", "Code Review", "Mentoring"],
   icon: Users, color: "from-teal-500 to-cyan-500", niveau: "Avancé - BUT3",
   experiences: ["Équipes multidisciplinaires", "Open source", "Formations"]
 }
};

// Hooks
function useInView() {
 const [inView, setInView] = useState(false);
 const [ref, setRef] = useState(null);
 
 useEffect(() => {
   if (!ref) return;
   const observer = new IntersectionObserver(([entry]) => {
     if (entry.isIntersecting) setInView(true);
   }, { threshold: 0.1 });
   observer.observe(ref);
   return () => observer.disconnect();
 }, [ref]);
 
 return [setRef, inView];
}

function AnimatedCounter({ end, suffix = "" }) {
 const [count, setCount] = useState(0);
 const [ref, inView] = useInView();
 
 useEffect(() => {
   if (!inView) return;
   let start = 0;
   const increment = end / 50;
   const timer = setInterval(() => {
     start += increment;
     if (start >= end) {
       setCount(end);
       clearInterval(timer);
     } else {
       setCount(Math.floor(start));
     }
   }, 40);
   return () => clearInterval(timer);
 }, [inView, end]);
 
 return <span ref={ref}>{count}{suffix}</span>;
}

// Composants spécialisés
function CompetenceCard({ title, data, index }) {
 const [ref, inView] = useInView();
 const Icon = data.icon;
 
 return (
   <div ref={ref} className={`transform transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        style={{ transitionDelay: `${index * 150}ms` }}>
     <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1 h-full">
       <div className="p-6 space-y-4 h-full flex flex-col">
         <div className="flex items-center gap-4">
           <div className={`p-3 rounded-xl bg-gradient-to-br ${data.color} text-white transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
             <Icon className="h-6 w-6" />
           </div>
           <div className="flex-1">
             <h3 className="font-bold text-lg text-gray-900">{title}</h3>
             <p className="text-sm text-gray-600">{data.description}</p>
           </div>
         </div>
         
         <div className="space-y-4 flex-1">
           <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
             <span className="text-sm font-semibold text-gray-700">Niveau:</span>
             <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{data.niveau}</span>
           </div>
           
           <div>
             <h4 className="text-sm font-semibold mb-3 text-gray-800">Technologies:</h4>
             <div className="flex flex-wrap gap-2">
               {data.skills.slice(0, 4).map(skill => (
                 <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border">
                   {skill}
                 </span>
               ))}
             </div>
           </div>
           
           <div className="flex-1">
             <h4 className="text-sm font-semibold mb-3 text-gray-800">Expériences:</h4>
             <ul className="space-y-2">
               {data.experiences.slice(0, 3).map((exp, idx) => (
                 <li key={idx} className="flex items-start gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                   <span className="text-xs text-gray-700 leading-relaxed">{exp}</span>
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

function ProjectCard({ project, isExpanded, onToggle, index }) {
 const [ref, inView] = useInView();
 const categoryData = CATEGORIES.find(c => c.key === project.category);
 
 return (
   <div ref={ref} className={`transform transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        style={{ transitionDelay: `${index * 100}ms` }}>
     <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden transform hover:-translate-y-1 group">
       {project.featured && (
         <div className="absolute -top-1 -right-1 z-10">
           <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center gap-1">
             <Star className="h-3 w-3" />Phare
           </div>
         </div>
       )}
       
       <div className="p-6 space-y-4">
         <div className="flex items-start justify-between">
           <div className="space-y-3 flex-1">
             <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
               {project.title}
             </h3>
             <div className="flex flex-wrap items-center gap-3">
               <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${categoryData?.color}`}>
                 <span>{categoryData?.icon}</span>
                 {categoryData?.label}
               </div>
               <span className="text-sm text-gray-500 font-medium">{project.period}</span>
             </div>
           </div>
         </div>
         
         {project.competences && (
           <div>
             <h4 className="text-sm font-semibold mb-2 text-gray-700">Compétences BUT:</h4>
             <div className="flex flex-wrap gap-2">
               {project.competences.map(comp => (
                 <span key={comp} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-md">
                   {comp}
                 </span>
               ))}
             </div>
           </div>
         )}
         
         <p className="text-gray-700 leading-relaxed">
           {project.description}
         </p>
         
         {isExpanded && (
           <div className="space-y-4 pt-2 border-t border-gray-100">
             <div>
               <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800">
                 <Zap className="h-4 w-4 text-yellow-500" />Points clés:
               </h4>
               <ul className="space-y-2">
                 {project.highlights.map((highlight, idx) => (
                   <li key={idx} className="flex items-start gap-2">
                     <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                     <span className="text-sm text-gray-700">{highlight}</span>
                   </li>
                 ))}
               </ul>
             </div>
             
             {project.context && (
               <div>
                 <h4 className="text-sm font-semibold mb-2 text-gray-800">Contexte:</h4>
                 <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200">
                   {project.context}
                 </p>
               </div>
             )}
           </div>
         )}
         
         <div className="flex flex-wrap gap-2 pt-2">
           {project.tech.map(tech => (
             <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-purple-100 hover:text-purple-700 transition-all cursor-default">
               {tech}
             </span>
           ))}
         </div>
         
         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
           <div className="flex gap-3">
             {project.links?.repo && (
               <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium transition-all hover:underline">
                 <Github className="h-4 w-4" />Code
               </a>
             )}
           </div>
           <button onClick={() => onToggle(project.id)}
                   className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 font-medium transition-all">
             {isExpanded ? 'Voir moins' : 'Voir plus'}
             <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

// Composant principal
export default function PortfolioBUT() {
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCategories, setSelectedCategories] = useState([]);
 const [expandedProjects, setExpandedProjects] = useState([]);
 const [scrollY, setScrollY] = useState(0);

 useEffect(() => {
   const handleScroll = () => setScrollY(window.scrollY);
   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const filteredProjects = useMemo(() => {
   return projects.filter(project => {
     const matchesSearch = !searchTerm || 
       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
     
     const matchesCategory = selectedCategories.length === 0 || 
       selectedCategories.includes(project.category);
     
     return matchesSearch && matchesCategory;
   });
 }, [searchTerm, selectedCategories]);

 const toggleCategory = (category) => {
   setSelectedCategories(prev => 
     prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
   );
 };

 const toggleProjectExpansion = (projectId) => {
   setExpandedProjects(prev => 
     prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
   );
 };

 const scrollToSection = (sectionId) => {
   document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
 };

 return (
   <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-x-hidden">
     
     {/* Styles CSS */}
     <style jsx>{`
       @keyframes float {
         0%, 100% { transform: translateY(0px); }
         50% { transform: translateY(-8px); }
       }
       @keyframes fade-in {
         from { opacity: 0; transform: translateY(20px); }
         to { opacity: 1; transform: translateY(0); }
       }
       .animate-float { animation: float 4s ease-in-out infinite; }
       .animate-fade-in { animation: fade-in 0.6s ease-out; }
     `}</style>

     {/* Background */}
     <div className="fixed inset-0 pointer-events-none z-0">
       {[...Array(6)].map((_, i) => (
         <div key={i} className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />
       ))}
     </div>

         {/* Header */}
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
       <div className="max-w-6xl mx-auto px-6 py-4">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Rocket className="h-8 w-8 text-purple-600" />
             <div>
               <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                 {owner.name}
               </h1>
               <p className="text-sm text-gray-600">Portfolio BUT</p>
             </div>
           </div>
           
           <nav className="hidden md:flex space-x-8">
             {[
               { label: 'À propos', id: 'about' },
               { label: 'Projets', id: 'projects' },
               { label: 'Compétences', id: 'competences' },
               { label: 'Contact', id: 'contact' }
             ].map(item => (
               <button key={item.label} onClick={() => scrollToSection(item.id)}
                       className="text-gray-600 hover:text-purple-600 transition-all duration-300 relative group font-medium">
                 {item.label}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
               </button>
             ))}
           </nav>
         </div>
       </div>
     </header>

     {/* Hero Section */}
     <section id="about" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
       <div className="max-w-6xl mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="space-y-8">
             <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 rounded-full text-sm font-medium text-purple-700 backdrop-blur-sm">
                 <Star className="h-4 w-4" />
                 {owner.role}
                 <Sparkles className="h-4 w-4" />
               </div>
               
               <h1 className="text-5xl md:text-6xl font-bold animate-fade-in">
                 <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                   {owner.name}
                 </span>
               </h1>
               
               <p className="text-xl md:text-2xl text-purple-400 font-medium animate-fade-in">
                 {owner.specialization}
               </p>
               
               <p className="text-lg text-gray-300 leading-relaxed max-w-xl animate-fade-in">
                 {owner.about}
               </p>
             </div>
             
             <div className="flex flex-wrap gap-4">
               <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                       onClick={() => scrollToSection('projects')}>
                 <span className="flex items-center gap-2">
                   Découvrir mes projets
                   <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                 </span>
               </Button>
               <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                       onClick={() => {
                         // Créer un lien de téléchargement pour le CV
                         const link = document.createElement('a');
                         link.href = '/cv-samba-sorbo.pdf';
                         link.download = 'CV-Samba-SORBO.pdf';
                         link.click();
                       }}>
                 <Download className="h-4 w-4 mr-2" />CV Détaillé
               </Button>
             </div>

             {/* Stats */}
             <div className="grid grid-cols-4 gap-6 pt-6">
               <div className="text-center">
                 <div className="text-3xl font-bold text-purple-600">
                   <AnimatedCounter end={8} />
                 </div>
                 <div className="text-sm text-gray-500">Projets</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-purple-600">
                   <AnimatedCounter end={30} suffix="+" />
                 </div>
                 <div className="text-sm text-gray-500">Technologies</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-purple-600">3</div>
                 <div className="text-sm text-gray-500">Années</div>
               </div>
              {/*<div className="text-center">
                 <div className="text-3xl font-bold text-purple-600">
                   <AnimatedCounter end={5} />
                 </div>
                 <div className="text-sm text-gray-500">Certifications</div>
               </div>*/}
             </div>
           </div>

                     {/* Contact Card */}
          <Card className="p-8 bg-gray-50/90 backdrop-blur-xl border-purple-200/50 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-2 group">
             <div className="space-y-6">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                   <Mail className="h-6 w-6 text-white" />
                 </div>
                 <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                   Contact
                 </h3>
               </div>
               
               <div className="space-y-4">
                 {[
                   { icon: MapPin, text: owner.city, color: "text-blue-500" },
                   { icon: Mail, text: owner.email, color: "text-green-500" },
                   { icon: Phone, text: owner.phone, color: "text-purple-500" }
                 ].map(({ icon: Icon, text, color }) => (
                   <div key={text} className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer group/item">
                     <Icon className={`h-5 w-5 ${color} group-hover/item:scale-110 transition-transform duration-300`} />
                     <span className="group-hover/item:translate-x-1 transition-transform duration-300">{text}</span>
                   </div>
                 ))}
               </div>
               
               <div className="flex gap-3 pt-4">
                 <Button size="sm" variant="outline" 
                         className="hover:bg-gradient-to-r hover:text-white border-purple-200 hover:border-transparent transition-all duration-300 transform hover:scale-110"
                         onClick={() => window.open(owner.links.github, '_blank')}>
                   <Github className="h-4 w-4 mr-2" />GitHub
                 </Button>
                 <Button size="sm" variant="outline"
                         className="hover:bg-gradient-to-r hover:text-white border-purple-200 hover:border-transparent transition-all duration-300 transform hover:scale-110"
                         onClick={() => window.open(owner.links.linkedin, '_blank')}>
                   <ExternalLink className="h-4 w-4 mr-2" />LinkedIn
                 </Button>
               </div>
             </div>
           </Card>
         </div>
       </div>
     </section>

     {/* Projects Section */}
     <section id="projects" className="py-20 relative z-10">
       <div className="max-w-6xl mx-auto px-6">
         <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 backdrop-blur-sm mb-4">
             <Code2 className="h-4 w-4" />
             Portfolio Projets
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
             <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Réalisations & Projets
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une sélection de mes meilleurs projets, des SAÉ académiques aux développements en alternance, 
              illustrant ma progression et mes compétences techniques
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, technologie ou compétence..."
                className="w-full pl-12 pr-6 py-4 border border-white/30 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 bg-white/10 backdrop-blur-lg text-gray-100 placeholder-gray-400 text-lg shadow-lg transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Filter className="h-4 w-4" />
                Filtrer par domaine :
              </div>
              {CATEGORIES.map((category, idx) => (
                <Button
                  key={category.key}
                  size="sm"
                  variant={selectedCategories.includes(category.key) ? "default" : "outline"}
                  onClick={() => toggleCategory(category.key)}
                  className={`transition-all duration-300 transform hover:scale-110 border-2 ${
                    selectedCategories.includes(category.key) 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-lg' 
                      : 'border-purple-200/50 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
              {selectedCategories.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedCategories([])}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                >
                  <X className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedProjects.includes(project.id)}
                onToggle={toggleProjectExpansion}
                index={index}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou filtres
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Competences Section */}
      <section id="competences" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 rounded-full text-sm font-medium text-purple-700 backdrop-blur-sm mb-4">
              <Brain className="h-4 w-4" />
              Compétences BUT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
                Les 6 Compétences du BUT Informatique
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Maîtrise progressive des compétences transversales et techniques, avec une approche réflexive sur mon apprentissage et mes axes d'amélioration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(competences).map(([title, data], index) => (
              <CompetenceCard key={title} title={title} data={data} index={index} />
            ))}
          </div>

          {/* Synthèse des compétences */}
          <div className="mt-16">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-800">
                Bilan critique et perspectives d'évolution
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Points forts identifiés
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Expertise technique solide (Développement, Bases de données)</li>
                    <li>• Capacité d'apprentissage rapide</li>
                    <li>• Vision architecturale des projets</li>
                    <li>• Collaboration efficace en équipe</li>
                    <li>• Approche pragmatique des problèmes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Axes d'amélioration
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Gestion de projet à grande échelle</li>
                    <li>• Leadership d'équipes techniques</li>
                    <li>• Architecture microservices complexes</li>
                    <li>• Optimisation performance avancée</li>
                    <li>• Communication client/stakeholders</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Objectifs futurs
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Montée en compétences techniques</li>
                    <li>• Développement de l'autonomie</li>
                    <li>• Amélioration continue des process</li>
                    <li>• Collaboration efficace en équipe</li>
                    <li>• Contribution aux projets d'entreprise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Parcours et Alternance */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 rounded-full text-sm font-medium text-indigo-700 backdrop-blur-sm mb-4">
              <BookOpen className="h-4 w-4" />
              Parcours & Alternance
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                Mon Parcours BUT Informatique
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Parcours académique */}
            <Card className="p-8 bg-gradient-to-br from-gray-50/90 to-indigo-50/50 border border-indigo-200/50">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-800">Logique de parcours</h3>
                </div>
                
                <div className="prose text-sm text-gray-700 space-y-4">
                  <p>
                    Mon parcours s'inscrit dans une démarche de montée en compétences progressive, 
                    de l'apprentissage des fondamentaux aux technologies actuelles de développement.
                  </p>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Ambitions professionnelles</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Court terme :</strong> CDI chez EDVANCE post-BUT</li>
                      <li><strong>Moyen terme :</strong> Évolution vers des responsabilités techniques</li>
                      <li><strong>Long terme :</strong> Expert technique ou management d'équipe</li>
                    </ul>
                  </div>
                  
                  <p>
                    <strong>Suite du parcours :</strong> Continuation en CDI chez EDVANCE pour consolider 
                    l'expérience professionnelle et évoluer dans un environnement industriel stimulant.
                  </p>
                </div>
              </div>
            </Card>

            {/* Alternance */}
<Card className="p-8 bg-gradient-to-br from-gray-50/90 to-purple-50/50 border border-purple-200/50">
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
        <Trophy className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-purple-800">Expérience en alternance</h3>
    </div>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">EDVANCE - Ingénierie Nucléaire</h4>
        <p className="text-sm text-gray-600 mb-3">Développeur Logiciel • Pôle Outils - Service CTR • Sep 2023 - Août 2025</p>
        
                    <div className="space-y-3">
              <div>
                <h5 className="font-medium text-sm mb-2">Missions principales :</h5>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Développement d'applications métiers</li>
                  <li>• Maintenance et évolution des outils existants</li>
                  <li>• Conception de bases de données</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-sm mb-2">Technologies utilisées :</h5>
                <div className="flex flex-wrap gap-1">
                  {["Python", "C#", "Angular", "PostgreSQL", "SQLite"].map(tech => (
                    <Badge key={tech} className="text-xs bg-purple-100 text-purple-800">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Environnement :</h5>
                <p className="text-xs text-gray-700">
                  Développement d'outils pour l'ingénierie nucléaire dans un contexte industriel.
                  <br/><strong>Suite prévue :</strong> Continuation en CDI chez EDVANCE après le BUT.
                </p>
              </div>
            </div>
      </div>
    </div>
  </div>
</Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="p-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl border-0 relative overflow-hidden">
<div
  className="absolute inset-0 opacity-30"
  style={{
    backgroundImage:
      "url(data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
    backgroundRepeat: "repeat"
  }}
/>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Intéressé par mon profil ?
                </h2>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                  Je suis ouvert aux opportunités de stage, alternance, CDI ou collaboration sur des projets innovants. 
                  N'hésitez pas à me contacter pour échanger !
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in max-w-md mx-auto">
                <button
                        className="w-full px-8 py-4 bg-white text-purple-700 hover:bg-gray-100 border-2 border-white shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 font-bold rounded-xl flex items-center justify-center gap-3 relative z-10"
                        onClick={() => window.location.href = `mailto:${owner.email}`}>
                  <Mail className="h-5 w-5" />
                  <span>Me contacter</span>
                </button>
                <button
                        className="w-full px-8 py-4 bg-gray-800 text-white hover:bg-gray-700 border-2 border-gray-800 shadow-2xl hover:shadow-gray-800/25 transition-all duration-300 transform hover:scale-105 font-bold rounded-xl flex items-center justify-center gap-3 relative z-10"
                        onClick={() => window.open(owner.links.github, '_blank')}>
                  <Github className="h-5 w-5" />
                  <span>Voir mon GitHub</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{owner.name}</h3>
              </div>
              <p className="text-gray-400">
                {owner.role} - Spécialisé en développement informatique, 
                toujours prêt à relever de nouveaux défis technologiques.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Navigation</h4>
              <div className="space-y-2">
                {[
                  { label: 'À propos', id: 'about' },
                  { label: 'Projets', id: 'projects' },
                  { label: 'Compétences', id: 'competences' }
                ].map(link => (
                  <button key={link.label} onClick={() => scrollToSection(link.id)}
                          className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-left">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact</h4>
              <div className="space-y-3">
                <button onClick={() => window.location.href = `mailto:${owner.email}`}
                        className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Mail className="h-4 w-4" />{owner.email}
                </button>
                <button onClick={() => window.open(owner.links.github, '_blank')}
                        className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <Github className="h-4 w-4" />GitHub Portfolio
                </button>
                <button onClick={() => window.open(owner.links.linkedin, '_blank')}
                        className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <ExternalLink className="h-4 w-4" />LinkedIn
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 {owner.name} - Portfolio BUT Informatique</p>
            <p className="text-sm text-gray-500 mt-2">
              Développé avec React, Tailwind CSS et beaucoup de passion pour l'innovation
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <Button
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 transform ${scrollY > 500 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} hover:scale-110`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowRight className="h-5 w-5 transform -rotate-90" />
      </Button>
    </div>
  );
}
