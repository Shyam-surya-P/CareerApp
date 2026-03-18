export interface Option {
    text: string;
    type: string;
  }
  
  export interface Question {
    _id?: string;
    id?: string;
    questionText: string;
    category: string;
    options: Option[];
  }
  
  export interface Result {
    userId?: string;
    scores?: Record<string, number>;
    dimensionScores?: Record<string, number>;
    topCluster?: string;
    dashboard?: Dashboard;
    // legacy
    topCareer?: string;
  }

  export interface FiveYearPlanItem {
    year: number;
    focus: string;
    actions: string[];
  }

  export interface CareerMatch {
    clusterKey: string;
    clusterLabel: string;
    fitPercent: number;
    topRoles: string[];
    whyThisMatchesYou: string[];
    subjectStreamRecommendation: string;
    requiredSubjects: string[];
    courseAndDegreePath: string[];
    fiveYearActionPlan: FiveYearPlanItem[];
    skillsToDevelop: string[];
    alternateBackupCareers: string[];
  }

  export interface StudentProfile {
    fullName?: string;
    grade?: string;
    academicStrengths?: string[];
    interests?: string[];
    preferredWorkStyle?: string;
    futureGoal?: string;
  }

  export interface Dashboard {
    generatedAt: string;
    profile: StudentProfile | null;
    topMatches: CareerMatch[];
  }