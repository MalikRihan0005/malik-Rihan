export const personalInfo = {
  name: "Malik Rihan",
  shortName: "RIHAN",
  title: "Software Engineer & DevOps Enthusiast",
  headline: "Building ideas with intention.",
  kicker: "Software Engineer · ISE Student · DevOps Enthusiast",
  status: "AVAILABLE FOR OPPORTUNITIES",
  location: "Davangere, Karnataka, India",
  timezone: "India · GMT+5:30",
  email: "malikrehandafedar911@gmail.com",
  phone: "+91 9110604110",
  bio: "I’m Malik Rihan, a third-year Information Science Engineering student at BIET Davangere. I enjoy building web applications, learning data structures, and exploring Python-based technologies—always looking for the elegant solution behind a difficult problem.",
  bioSecondary: "From architecting high-availability CI/CD pipelines to building computer-vision IoT devices and full-stack web platforms, I focus on dependable systems built with a builder's mindset.",
  openTo: "Internships, DevOps & Software Engineering roles",
  github: "https://github.com/malikrihan",
  githubProfile: "https://github.com/MalikRihan0005",
  linkedin: "https://www.linkedin.com/in/malik-rihan-926a28262",
  resumeUrl: "/Malik_Rihan_Resume.pdf",
  avatarUrl: "/images/malik-avatar.png",
  year: "2026",
};

export const heroDisciplines = [
  { label: "AI / ML", corner: "top-left" },
  { label: "DevOps & Cloud", corner: "top-right" },
  { label: "Full-Stack", corner: "bottom-left" },
  { label: "Systems & IoT", corner: "bottom-right" },
];

export const marqueeItems = [
  "AWS Cloud Infrastructure",
  "DevOps & CI/CD Pipelines",
  "Information Science & Engineering",
  "Full-Stack Web Development",
  "Docker & Kubernetes",
  "IoT & Embedded Hardware",
  "Machine Learning & Edge AI",
  "MongoDB Atlas & Supabase",
  "Python · Java · C++ · C",
  "Microservices Architecture",
];

export const aboutFacts = [
  { label: "Based in", value: "Davangere, Karnataka, India" },
  { label: "Current Role", value: "DevOps Engineer Intern · ZeTheta Algorithms" },
  { label: "College", value: "BIET Davangere (ISE, 2025–2028)" },
  { label: "Open to", value: "Internships, full-time engineering & collaborations" },
];

export const capabilitiesDeck = [
  {
    number: "01",
    title: "DevOps & Cloud Architecture",
    description: "Production-grade CI/CD pipelines, containerization, Kubernetes orchestrations, and security-hardened AWS infrastructure for zero-downtime releases.",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "IaC"],
  },
  {
    number: "02",
    title: "Full-Stack Engineering",
    description: "End-to-end web applications with modern frontend frameworks, RESTful APIs, JWT authentication, and cloud-hosted relational and NoSQL databases.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"],
  },
  {
    number: "03",
    title: "Systems & IoT Engineering",
    description: "Hardware-software integration using microcontroller architectures, ESP32-CAM video pipelines, real-time sensor streams, and custom PCB designs.",
    tags: ["Arduino", "ESP32-CAM", "PCB Design", "C/C++", "Sensors"],
  },
  {
    number: "04",
    title: "AI & Machine Learning",
    description: "Deep learning inference on edge computing platforms, Flask model serving, RAG agent workflows, and practical Generative AI application engineering.",
    tags: ["Jetson Nano", "Flask ML", "GenAI", "Prompt Eng", "Python"],
  },
  {
    number: "05",
    title: "Core CS & Problem Solving",
    description: "Strong theoretical foundations in Data Structures & Algorithms, Object-Oriented Design, Operating Systems, and scalable distributed system design.",
    tags: ["DSA", "OOP", "System Design", "OS", "Java"],
  },
  {
    number: "06",
    title: "Tooling & Delivery Quality",
    description: "Strict quality gates including static code analysis with SonarQube, Open Policy Agent (OPA) compliance, Git collaborative workflows, and Vercel hosting.",
    tags: ["Git / GitHub", "SonarQube", "OPA", "VS Code", "Vercel"],
  },
];

export const experiences = [
  {
    period: "AUG 2026 — PRESENT",
    role: "DevOps Engineer Intern",
    company: "ZeTheta Algorithms Pvt. Ltd.",
    location: "Mumbai · Remote",
    highlights: [
      "Architect and deploy security-hardened AWS cloud infrastructure for BFSI clients, using compliance-aligned configurations for high-stakes financial systems.",
      "Implement CI/CD pipelines and infrastructure-as-code to automate deployments, reduce manual intervention, and accelerate release cycles.",
      "Collaborate in an agile team to design scalable, fault-tolerant distributed systems that meet enterprise reliability standards.",
    ],
  },
  {
    period: "DEC 2024 — MAR 2025",
    role: "Internet of Things Intern",
    company: "Athreya Technologies Pvt. Ltd.",
    location: "Hubballi · On-site",
    highlights: [
      "Developed and optimized software modules in C, C++, Python, and Java within an agile environment, contributing to production-grade codebases.",
      "Participated in structured code reviews and used Git for collaborative, version-controlled development across team branches.",
      "Integrated IoT hardware components with software layers to enable real-time embedded data communication.",
    ],
  },
];

export const projects = [
  {
    id: "01",
    title: "PaySecure Multi-Region DR",
    subtitle: "Enterprise Disaster Recovery & Compliance",
    year: "2026",
    description: "Architected an enterprise multi-region disaster recovery framework across AWS ap-south-1 (Mumbai) and ap-south-2 (Hyderabad) for PaySecure Gateway (3.2M daily txns, ₹500 Cr/day). Engineered Active-Passive and Active-Active failover with Route 53 health checking, Aurora global replication, and RBI 2024 / PCI-DSS v4.0 compliance (<1m RPO, <5m RTO).",
    tags: ["AWS", "Disaster Recovery", "Route 53", "Aurora Global DB", "IaC", "PCI-DSS"],
    image: "/images/project-multiregion.jpg",
    github: "https://github.com/MalikRihan0005/multi-region",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #00b4d8 150%)",
  },
  {
    id: "02",
    title: "LendFlow FinOps & Cost Optimisation",
    subtitle: "Cloud Cost Remediation & Governance",
    year: "2026",
    description: "Engineered an enterprise AWS FinOps framework cutting monthly infrastructure spend from $180,000/mo to $115,750/mo (35.7% net savings, $771K/yr) for LendFlow fintech (500K+ monthly loan applications). Architected Compute Savings Plans, Spot Fleets, Terraform cost governance modules with Infracost CI/CD gates, and AWS SCP policy guardrails.",
    tags: ["AWS", "FinOps", "Terraform", "Infracost", "Policy-as-Code", "Cost Optimization"],
    image: "/images/project-costopt.jpg",
    github: "https://github.com/MalikRihan0005/Infrastructure-Cost-Optimisation",
    gradient: "linear-gradient(135deg, #0f241a 0%, #10b981 150%)",
  },
  {
    id: "03",
    title: "FinServ Security-Hardened Kubernetes",
    subtitle: "Zero-Trust Financial Microservices Platform",
    year: "2026",
    description: "Architected a zero-trust, security-hardened Kubernetes v1.29 container platform for FinServ Digital across 20 financial microservices. Implemented Istio STRICT mTLS, Pod Security Standards (PSS Restricted), HashiCorp Vault dynamic ephemeral secrets leasing, Kyverno declarative admission control, and Falco eBPF runtime threat detection under RBI & PCI-DSS v4.0 Level 1 compliance.",
    tags: ["Kubernetes", "Istio mTLS", "HashiCorp Vault", "Kyverno", "Falco eBPF", "PCI-DSS"],
    image: "/images/project-k8ssecurity.jpg",
    github: "https://github.com/MalikRihan0005/Security-Hardened-Kubernetes-Platform",
    gradient: "linear-gradient(135deg, #1f102e 0%, #a855f7 150%)",
  },
  {
    id: "04",
    title: "NovaPay Digital Bank",
    subtitle: "Zero-downtime CI/CD pipeline",
    year: "2026",
    description: "Architected a production-grade 8-stage CI/CD pipeline for a fictional RBI-licensed bank, cutting commit-to-production time from a fortnightly manual cycle to under 2 hours. Implemented blue-green and canary deployments with automated rollback triggers on Kubernetes, targeting 99.999% availability.",
    tags: ["GitHub Actions", "Docker", "SonarQube", "OPA", "Kubernetes"],
    image: "/images/project-novapay.jpg",
    github: "https://github.com/MalikRihan0005/Nova-Pay",
    gradient: "linear-gradient(135deg, #131d27 0%, #00bb7f 150%)",
  },
  {
    id: "05",
    title: "AI Job Application (JobAgent)",
    subtitle: "Personal AI Job Application Agent",
    year: "2026",
    description: "Built JobAgent, an AI-powered internship application agent loaded with personal profile data (CGPA, projects, history). Features natural command execution (e.g. APPLY [Mindtickle]), automated eligibility checking, match scoring, tailored resume bullet generation, and full pipeline stage tracking.",
    tags: ["React.js", "Supabase", "Vercel", "PostgreSQL", "AI"],
    image: "/images/project-jobagent.jpg",
    github: "https://github.com/MalikRihan0005/AI-job-Application-Agent",
    gradient: "linear-gradient(135deg, #241929 0%, #e3a874 150%)",
  },
  {
    id: "06",
    title: "IoT Camera Security System",
    subtitle: "Intelligent monitoring · IoT & computer vision",
    year: "2025",
    description: "Engineered a smart surveillance system using IoT motion sensors and computer vision; automated real-time alerts delivered to a mobile UI, reducing manual monitoring overhead with ESP32-CAM and custom PCB hardware.",
    tags: ["Python", "Arduino", "IoT Sensors", "ESP32-CAM", "PCB Design"],
    image: "/images/project-iotsecurity.jpg",
    github: "https://github.com/MalikRihan0005",
    gradient: "linear-gradient(135deg, #18221b 0%, #34d399 150%)",
  },
  {
    id: "07",
    title: "SpendWise",
    subtitle: "Personal expense intelligence",
    year: "2025",
    description: "Designed a MERN-stack finance application with JWT authentication, granular expense categorization, and interactive Recharts dashboards for spending trend analysis. Leveraged MongoDB Atlas for scalable cloud persistence with zero-cost deployment on Render and Vercel.",
    tags: ["MongoDB Atlas", "Express.js", "React.js", "Node.js", "JWT", "Recharts"],
    image: "/images/project-spendwise.jpg",
    github: "https://github.com/MalikRihan0005/-SpendWise-AI-Personal-Finance-Advisor",
    gradient: "linear-gradient(135deg, #261b17 0%, #f97316 150%)",
  },
];

export const education = [
  {
    period: "2025 — 2028",
    degree: "Bachelor of Engineering in Information Science Engineering",
    institution: "Bapuji Institute of Engineering & Technology (BIET)",
    location: "Davangere, Karnataka",
    grade: "CGPA: 7.6 / 10.0",
    details: "Lateral entry program focusing on advanced algorithms, software engineering, cloud computing, and intelligent systems.",
  },
  {
    period: "2022 — 2025",
    degree: "Diploma in Electronics and Communications Engineering",
    institution: "JSS KH Kabbur Institute of Engineering",
    location: "Dharwad, Karnataka",
    details: "Foundation in microcontrollers, digital electronics, embedded systems programming, and hardware-software interfacing.",
  },
];

export const certifications = [
  {
    id: "01",
    issuer: "NVIDIA",
    title: "Getting Started with AI on Jetson Nano",
    description: "Hands-on training on deep learning inference and edge AI development using the NVIDIA Jetson Nano platform.",
    link: "/images/cert-nvidia.pdf",
  },
  {
    id: "02",
    issuer: "IIT Delhi",
    title: "Artificial Intelligence",
    description: "Structured programme covering AI foundations, machine learning techniques, and applied problem solving.",
    link: null,
  },
  {
    id: "03",
    issuer: "Anthropic",
    title: "Claude Code 101",
    description: "Foundational training on using Claude Code for AI-assisted software development and developer workflows.",
    link: "/images/cert-claude-101.pdf",
  },
  {
    id: "04",
    issuer: "Anthropic",
    title: "Claude Code in Action",
    description: "Advanced hands-on training applying Claude Code to real-world engineering workflows and codebase navigation.",
    link: "/images/cert-claude-in-action.pdf",
  },
  {
    id: "05",
    issuer: "MongoDB University",
    title: "Relational Model (SQL) to MongoDB",
    description: "Data modelling certification covering schema design transition from relational schemas to document databases.",
    link: "/images/cert-mongodb.pdf",
  },
  {
    id: "06",
    issuer: "NxtWave",
    title: "AI for Students: Build Generative AI Models",
    description: "Comprehensive AI/ML course with hands-on generative model implementation and practical architectures.",
    link: null,
  },
  {
    id: "07",
    issuer: "NxtWave",
    title: "ML Model Deployment using Flask",
    description: "End-to-end ML deployment expertise utilizing Flask, API routing, and production serving practices.",
    link: null,
  },
  {
    id: "08",
    issuer: "NASSCOM",
    title: "GEN AI: Acquiring Data",
    description: "Certification in Generative AI data acquisition techniques, data pipelines, and curation methodologies.",
    link: "/images/cert-genai.pdf",
  },
];

export const proofMetrics = [
  {
    num: "4",
    suffix: "+",
    label: "Languages Built With",
    note: "Python, C++, Java, C, and SQL applied across real production and embedded codebases.",
  },
  {
    num: "8",
    suffix: "+",
    label: "Certifications",
    note: "NVIDIA, IIT Delhi, Anthropic, MongoDB University, and NASSCOM verified specializations.",
  },
  {
    num: "2",
    suffix: "",
    label: "Industry Internships",
    note: "Hands-on experience in DevOps cloud automation and IoT embedded software engineering.",
  },
  {
    num: "100",
    suffix: "%",
    label: "Delivery Commitment",
    note: "Engineered for high availability, zero downtime, clean code, and security compliance.",
  },
];

export const spokenLanguages = [
  { language: "English", proficiency: "Professional" },
  { language: "Hindi", proficiency: "Fluent" },
  { language: "Kannada", proficiency: "Fluent" },
  { language: "Italian", proficiency: "Beginner" },
];

export const chatResponses = [
  {
    keywords: ["food", "eat", "eating", "pizza", "favorite food", "dish", "cuisine", "snack", "dinner", "lunch"],
    response: "Malik's absolute favorite food is Pizza! 🍕 Especially wood-fired artisan pizza with a thin crispy crust, rich tomato sauce, and plenty of mozzarella cheese. When coding late into the night, pizza is his ultimate fuel!",
  },
  {
    keywords: ["sport", "sports", "badminton", "play", "game", "fitness", "outdoor", "athletic"],
    response: "Malik is an avid Badminton player! 🏸 He loves the lightning-fast rallies, agile footwork, and precise overhead smashes. Whenever he takes a break from computers, you'll find him on the badminton court!",
  },
  {
    keywords: ["hobby", "hobbies", "free time", "fun", "interest", "interests", "passions", "relax", "weekend"],
    response: "When he's not architecting cloud systems or writing code, Malik loves playing badminton 🏸, listening to music 🎧, exploring generative AI models, following DevOps innovations, and building IoT gadgets.",
  },
  {
    keywords: ["music", "song", "songs", "listen", "playlist", "band", "artist"],
    response: "Malik loves chill lofi beats while coding and debugging, energetic EDM and pop during workouts, and soulful ambient melodies when relaxing.",
  },
  {
    keywords: ["movie", "movies", "film", "series", "anime", "show", "watch"],
    response: "Malik loves mind-bending sci-fi films (Interstellar and Inception are favorites!) and engaging anime series with great tactical storylines.",
  },
  {
    keywords: ["coffee", "tea", "drink", "beverage", "chai"],
    response: "Coffee all the way! ☕ A fresh brew keeps the code flowing and helps him power through complex system deployments.",
  },
  {
    keywords: ["location", "city", "where", "live", "davangere", "karnataka", "india", "relocate"],
    response: "Malik is based in Davangere, Karnataka, India (GMT+5:30). He is open to remote engineering roles worldwide, as well as on-site relocation for exciting full-time or internship opportunities!",
  },
  {
    keywords: ["devops", "cloud", "aws", "kubernetes", "k8s", "docker", "ci/cd"],
    response: "Malik is currently a DevOps Engineer Intern at ZeTheta Algorithms, where he architects security-hardened AWS cloud infrastructure for BFSI clients. He built NovaPay, an 8-stage CI/CD pipeline cutting release times to under 2 hours with blue-green deployments on Kubernetes.",
  },
  {
    keywords: ["experience", "internship", "intern", "zetheta", "athreya", "job"],
    response: "Malik has 2 industry internships: DevOps Engineer Intern at ZeTheta Algorithms (AWS cloud infrastructure & BFSI compliance) and Internet of Things Intern at Athreya Technologies (C/C++, Python & embedded hardware integration).",
  },
  {
    keywords: ["education", "college", "biet", "degree", "cgpa", "study"],
    response: "Malik is pursuing his Bachelor of Engineering in Information Science at Bapuji Institute of Engineering & Technology (BIET) in Davangere, Karnataka (CGPA: 7.6 / 10.0), following a Diploma in Electronics & Communication at JSS KH Kabbur.",
  },
  {
    keywords: ["project", "projects", "work", "novapay", "jobagent", "spendwise", "iot", "multi-region", "disaster recovery", "finops", "cost", "kubernetes"],
    response: "Malik has 7 flagship production builds: 1) PaySecure Multi-Region DR (AWS Mumbai/Hyderabad zero-loss failover with Route 53 & Aurora Global DB), 2) LendFlow FinOps (AWS cloud cost reduction of 35.7% saving $771K/yr with Infracost & Terraform), 3) FinServ Security-Hardened Kubernetes (Zero-trust k8s with Istio mTLS, HashiCorp Vault & Falco eBPF), 4) NovaPay (8-stage CI/CD pipeline on K8s), 5) JobAgent (AI job application agent with Supabase), 6) IoT Camera Security System (ESP32-CAM & CV), and 7) SpendWise (MERN personal finance intelligence).",
  },
  {
    keywords: ["multi-region", "disaster recovery", "paysecure", "rpo", "rto", "dr"],
    response: "PaySecure Multi-Region DR is an enterprise AWS disaster recovery framework across Mumbai (ap-south-1) and Hyderabad (ap-south-2) designed for 3.2M daily transactions. It achieves <1m RPO and <5m RTO with Route 53 health checking, Aurora Global Database replication, and RBI/PCI-DSS compliance. Check it out: https://github.com/MalikRihan0005/multi-region",
  },
  {
    keywords: ["finops", "cost optimization", "cost", "lendflow", "infracost", "savings"],
    response: "LendFlow FinOps & Cost Optimisation achieved a 35.7% net cloud cost reduction ($64,250/month savings, $771K/year) for LendFlow fintech processing 500K+ loan apps. It features Compute Savings Plans, Spot Fleets, Terraform Infracost budget gates, and AWS SCP policy guardrails. Check it out: https://github.com/MalikRihan0005/Infrastructure-Cost-Optimisation",
  },
  {
    keywords: ["security-hardened kubernetes", "finserv", "istio", "vault", "kyverno", "falco", "zero trust"],
    response: "FinServ Security-Hardened Kubernetes is a zero-trust container platform for 20 financial microservices. It features Istio STRICT mTLS, Pod Security Standards (PSS Restricted), HashiCorp Vault dynamic ephemeral secrets leasing, Kyverno declarative admission control, and Falco eBPF runtime threat detection under RBI & PCI-DSS v4.0 Level 1 compliance. Check it out: https://github.com/MalikRihan0005/Security-Hardened-Kubernetes-Platform",
  },
  {
    keywords: ["skills", "stack", "tech", "technologies", "languages"],
    response: "Malik's technical stack includes Python, Java, C++, C, React.js, Node.js, Express, MongoDB Atlas, PostgreSQL/Supabase, AWS (Lambda, DynamoDB), Docker, Kubernetes, CI/CD, Arduino, and Git.",
  },
  {
    keywords: ["cert", "certification", "certifications", "nvidia", "claude", "anthropic", "mongodb", "nasscom"],
    response: "Malik holds 8+ verified engineering certifications from NVIDIA (Jetson Nano Edge AI), Anthropic (Claude Code 101 & In Action), MongoDB University (Relational SQL to NoSQL), IIT Delhi (AI), and NASSCOM (Gen AI).",
  },
  {
    keywords: ["contact", "email", "hire", "phone", "resume", "reach"],
    response: "You can reach Malik directly at malikrehandafedar911@gmail.com or +91 9110604110. His resume is available for download on this site, and he is actively open to internships and software engineering opportunities!",
  },
  {
    keywords: ["hi", "hello", "hey", "sup", "greetings", "good morning", "good evening"],
    response: "Hello! 👋 I'm Malik's interactive AI assistant, cloud DevOps work at ZeTheta, or his project builds!",
  },
];
