const CLUSTER_TO_OUTPUT = {
  technology: {
    roles: ["Software Developer", "Data Analyst", "Cybersecurity Associate", "AI/ML Engineer (path)"],
    subjects: ["Mathematics", "Physics", "Computer Science"],
    stream: "Science (PCM) / Computer Science",
    courses: ["B.Tech (CSE/IT)", "BCA", "BS Computer Science", "Diploma in CS"],
    skills: ["Problem solving", "Programming fundamentals", "Git", "Communication", "System thinking"],
    backups: ["QA Engineer", "Technical Support Engineer", "Product Operations"],
  },
  creative: {
    roles: ["UI/UX Designer", "Graphic Designer", "Content Creator", "Animator (path)"],
    subjects: ["English", "Design / Arts", "Computer Applications (optional)"],
    stream: "Arts / Humanities (with Design) or any stream + portfolio",
    courses: ["B.Des", "BA (Design/Media)", "BFA", "Diploma in UI/UX"],
    skills: ["Visual design", "Storytelling", "User research", "Creativity", "Presentation"],
    backups: ["Social Media Executive", "Copywriter", "Marketing Coordinator"],
  },
  business: {
    roles: ["Business Analyst", "Digital Marketer", "Sales Associate", "Entrepreneur (path)"],
    subjects: ["Economics", "Business Studies", "Mathematics (helpful)"],
    stream: "Commerce (with Math preferred)",
    courses: ["BBA", "BBM", "B.Com", "MBA (later)"],
    skills: ["Communication", "Negotiation", "Finance basics", "Leadership", "Planning"],
    backups: ["Customer Success Associate", "Operations Associate", "HR Coordinator"],
  },
  healthcare: {
    roles: ["Clinical Psychologist (path)", "Nutritionist (path)", "Physiotherapist (path)", "Healthcare Admin"],
    subjects: ["Biology", "Psychology", "Chemistry"],
    stream: "Science (PCB) / Psychology track",
    courses: ["BSc Psychology", "BSc Nursing", "BPT", "BSc Nutrition"],
    skills: ["Empathy", "Observation", "Discipline", "Communication", "Ethics"],
    backups: ["Medical Lab Assistant (path)", "Healthcare Coordinator", "Counselor Assistant"],
  },
  education: {
    roles: ["Teacher/Educator", "Counselor (path)", "Social Worker", "Program Coordinator"],
    subjects: ["English", "Psychology", "Civics / Social Science"],
    stream: "Arts / Humanities",
    courses: ["BA", "B.Ed (later)", "BSW", "MA Psychology (later)"],
    skills: ["Communication", "Patience", "Coaching", "Planning", "Empathy"],
    backups: ["HR Associate", "Content Writer", "Community Manager"],
  },
};

function buildFiveYearPlan(clusterKey) {
  const base = [
    { year: 1, focus: "Self-discovery + foundations", actions: ["Complete assessment", "Explore 3 roles", "Start a learning plan"] },
    { year: 2, focus: "Skill building", actions: ["Do 2 courses", "Build 2 small projects", "Improve communication"] },
    { year: 3, focus: "Portfolio + experience", actions: ["Create portfolio", "Internship / volunteering", "Mentor feedback"] },
    { year: 4, focus: "Specialize", actions: ["Choose a specialization", "Advanced project", "Prepare for interviews/entrance"] },
    { year: 5, focus: "Launch", actions: ["Job/college path execution", "Networking", "Continuous learning roadmap"] },
  ];

  if (clusterKey === "technology") {
    base[1].actions.unshift("Learn programming + data structures");
    base[2].actions.unshift("Build a capstone app");
  }
  if (clusterKey === "creative") {
    base[1].actions.unshift("Daily design practice + critique");
    base[2].actions.unshift("Publish portfolio case studies");
  }
  if (clusterKey === "business") {
    base[1].actions.unshift("Learn finance + marketing basics");
    base[2].actions.unshift("Run a small project/business simulation");
  }
  if (clusterKey === "healthcare") {
    base[1].actions.unshift("Strengthen biology/psychology fundamentals");
    base[2].actions.unshift("Shadow/volunteer (if possible)");
  }
  if (clusterKey === "education") {
    base[1].actions.unshift("Practice teaching/explaining regularly");
    base[2].actions.unshift("Volunteer tutoring / community work");
  }

  return base;
}

export function buildDashboard({ rankedClusters, evidence, profile }) {
  const topMatches = rankedClusters.slice(0, 3).map((c) => {
    const meta = CLUSTER_TO_OUTPUT[c.key] || CLUSTER_TO_OUTPUT.technology;
    const why = [
      `Your responses leaned towards ${c.label} (${c.fitPercent}% fit).`,
      ...(evidence?.[c.key]?.slice(0, 2)?.map((q) => `You resonated with: "${q}"`) || []),
      profile?.academicStrengths?.length
        ? `You reported academic strengths in: ${profile.academicStrengths.join(", ")}.`
        : null,
    ].filter(Boolean);

    return {
      clusterKey: c.key,
      clusterLabel: c.label,
      fitPercent: c.fitPercent,
      topRoles: meta.roles.slice(0, 3),
      whyThisMatchesYou: why,
      subjectStreamRecommendation: meta.stream,
      requiredSubjects: meta.subjects,
      courseAndDegreePath: meta.courses,
      fiveYearActionPlan: buildFiveYearPlan(c.key),
      skillsToDevelop: meta.skills,
      alternateBackupCareers: meta.backups,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    profile: profile || null,
    topMatches,
  };
}

