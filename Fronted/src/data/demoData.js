export const DEMO_SKILLS = [
  { id:1, title:"Spring Boot API Development", cat:"Development", level:"Expert",       rate:800, years:4, desc:"Build secure, scalable REST APIs with JWT, RBAC, and optimistic locking.",                provider:"Amit K.",    avatar:"AK", verified:true  },
  { id:2, title:"React.js & Next.js",          cat:"Development", level:"Advanced",     rate:650, years:3, desc:"Modern frontend development with hooks, context, SSR and performance optimizations.",    provider:"Priya S.",   avatar:"PS", verified:true  },
  { id:3, title:"UI/UX Design",                cat:"Design",      level:"Advanced",     rate:700, years:4, desc:"User research, wireframing, Figma prototypes, and design systems that delight.",         provider:"Meera V.",   avatar:"MV", verified:true  },
  { id:4, title:"Machine Learning & AI",       cat:"Data Science",level:"Expert",       rate:950, years:5, desc:"End-to-end ML pipelines, model training, feature engineering and deployment.",           provider:"Karan P.",   avatar:"KP", verified:true  },
  { id:5, title:"Docker & Kubernetes",         cat:"Development", level:"Advanced",     rate:750, years:3, desc:"Containerization, CI/CD pipelines, Helm charts and cloud-native deployments.",           provider:"Suresh A.",  avatar:"SA", verified:false },
  { id:6, title:"Data Analysis with Python",   cat:"Data Science",level:"Intermediate", rate:550, years:2, desc:"Pandas, NumPy, Matplotlib visualizations and business insights from raw data.",          provider:"Lakshmi K.", avatar:"LK", verified:true  },
  { id:7, title:"Content Writing & SEO",       cat:"Writing",     level:"Advanced",     rate:400, years:5, desc:"SEO-optimized content, blog posts, product descriptions that rank and convert.",         provider:"Nisha R.",   avatar:"NR", verified:true  },
  { id:8, title:"Digital Marketing",           cat:"Marketing",   level:"Advanced",     rate:600, years:4, desc:"Google Ads, Meta campaigns, funnel optimization and analytics-driven growth.",           provider:"Vishal R.",  avatar:"VR", verified:false },
  { id:9, title:"MySQL & Database Design",     cat:"Development", level:"Expert",       rate:700, years:6, desc:"3NF normalization, complex queries, indexing strategies and performance tuning.",        provider:"Rohit K.",   avatar:"RK", verified:true  },
];

export const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#5b7cfa,#a78bfa)",
  "linear-gradient(135deg,#22d3a0,#0ea5e9)",
  "linear-gradient(135deg,#f472b6,#a78bfa)",
  "linear-gradient(135deg,#f5a623,#fb7185)",
  "linear-gradient(135deg,#a78bfa,#5b7cfa)",
];

export const DEMO_REQUESTS = [
  { id:1, name:"Suresh Anand",  email:"suresh@email.com",  avatar:"SA", gradient:"linear-gradient(135deg,#22d3a0,#0ea5e9)", skill:"React Development",  rate:600, message:"Need help with React hooks and state management",   date:"Jun 18, 2025", status:"pending"  },
  { id:2, name:"Lakshmi Kaur",  email:"lakshmi@email.com", avatar:"LK", gradient:"linear-gradient(135deg,#f472b6,#a78bfa)", skill:"Machine Learning",    rate:850, message:"Need ML model for fraud detection",                date:"Jun 19, 2025", status:"pending"  },
  { id:3, name:"Vishal Rao",    email:"vishal@email.com",  avatar:"VR", gradient:"linear-gradient(135deg,#22d3a0,#0ea5e9)", skill:"UI/UX Design",        rate:700, message:"Design a mobile app for healthcare",               date:"Jun 17, 2025", status:"accepted" },
];

export const DEMO_BOOKINGS = [
  { id:"BK-0041", service:"React Development",  date:"Jun 15, 10:00 AM", provider:"Rohit K.",  providerAvatar:"RK", providerGradient:"",                                                      duration:"2 hrs", total:1200, escrow:"Released", status:"completed" },
  { id:"BK-0042", service:"UI/UX Design",       date:"Jun 18, 2:00 PM",  provider:"Priya S.",  providerAvatar:"PS", providerGradient:"linear-gradient(135deg,var(--color-green),var(--color-accent))", duration:"4 hrs", total:2400, escrow:"Locked",   status:"in-progress" },
  { id:"BK-0043", service:"Data Analysis",      date:"Jun 20, 9:00 AM",  provider:"Meera V.",  providerAvatar:"MV", providerGradient:"linear-gradient(135deg,var(--color-purple),var(--color-coral))", duration:"3 hrs", total:1900, escrow:"Pending",  status:"pending" },
];

export const DEMO_TRANSACTIONS = [
  { ref:"TXN-1001", type:"Release", booking:"#BK-0041", amount:"+₹1,200", fee:"₹60",  net:"₹1,140",  date:"Jun 16", status:"success" },
  { ref:"TXN-1000", type:"Lock",    booking:"#BK-0042", amount:"-₹2,400", fee:"—",    net:"-₹2,400", date:"Jun 18", status:"locked"  },
  { ref:"TXN-0999", type:"Top Up",  booking:"—",        amount:"+₹5,000", fee:"—",    net:"₹5,000",  date:"Jun 14", status:"success" },
  { ref:"TXN-0998", type:"Lock",    booking:"#BK-0041", amount:"-₹1,200", fee:"—",    net:"-₹1,200", date:"Jun 15", status:"locked"  },
  { ref:"TXN-0997", type:"Refund",  booking:"#BK-0040", amount:"+₹800",   fee:"—",    net:"₹800",    date:"Jun 12", status:"success" },
];
