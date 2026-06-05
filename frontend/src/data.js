export const statsData = [
    { number: "250+", label: "Schools Supported" },
    { number: "15,000+", label: "Students Impacted" },
    { number: "₹2.5Cr+", label: "Funds Raised" },
    { number: "98%", label: "Donor Satisfaction" }
];

export const featuresData = [
    { icon: "🔍", title: "100% Transparent", description: "Every rupee is tracked with photo/video proof." },
    { icon: "🔒", title: "Secure Payments", description: "Payments fully encrypted and safe." },
    { icon: "✅", title: "Verified Schools", description: "Every school is physically verified." },
    { icon: "🧾", title: "Tax Benefits", description: "Instant 80G tax exemption receipt." },
    { icon: "📊", title: "Real-Time Dashboard", description: "Track your donations easily." },
    { icon: "🔄", title: "Recurring Donations", description: "Support monthly with as little as ₹200." }
];

export const testimonialsData = [
    { quote: "The transparency is amazing! I received photos of the books my donation bought.", name: "Priya Sharma", role: "Donor since 2024" },
    { quote: "I've donated to many platforms, but this one shows real impact.", name: "Rahul Verma", role: "Regular Donor" },
    { quote: "My company matched my donation. Together we helped build a library.", name: "Neha Gupta", role: "Corporate Donor" }
];

export const schoolsData = [
    {
        id: 1,
        name: "Government Primary School, Sarai Village",
        location: "Lucknow, Uttar Pradesh",
        students: 250,
        grades: "1-5",
        description: "Serves children from 15 nearby villages. Most students are first-generation learners.",
        needs: [
            { item: "Story Books", price: 500, raised: 150, donors: 3, urgent: false },
            { item: "Notebooks & Stationery", price: 2000, raised: 200, donors: 2, urgent: false },
            { item: "Benches & Desks", price: 15000, raised: 750, donors: 2, urgent: true }
        ],
        icon: "🏫"
    },
    {
        id: 2,
        name: "Kasturba Gandhi Balika Vidyalaya",
        location: "Aliganj, Lucknow",
        students: 180,
        grades: "6-12",
        description: "Residential school for girls from disadvantaged backgrounds.",
        needs: [
            { item: "Desktop Computers", price: 10000, raised: 10000, donors: 5, urgent: false },
            { item: "Printer & Scanner", price: 5000, raised: 2000, donors: 1, urgent: false },
            { item: "Internet Connection", price: 6000, raised: 0, donors: 0, urgent: false }
        ],
        icon: "💻"
    },
    {
        id: 3,
        name: "Middle School, Madhepura",
        location: "Madhepura, Bihar",
        students: 320,
        grades: "1-8",
        description: "Located in a drought-prone area, this school has no access to clean drinking water.",
        needs: [
            { item: "RO Water Purifier", price: 25000, raised: 2000, donors: 2, urgent: true },
            { item: "Water Storage Tank", price: 8000, raised: 0, donors: 0, urgent: false }
        ],
        icon: "💧"
    }
];

export const campaignsData = [
    { id: 1, title: "Library for 500 Children", description: "Help us build a library in Government Primary School.", target: 100000, raised: 65000, donors: 128, daysLeft: 15, icon: "📚", featured: true },
    { id: 2, title: "Clean Drinking Water", description: "Providing RO water purifiers to schools.", target: 80000, raised: 40000, donors: 67, daysLeft: 20, icon: "💧", featured: false },
    { id: 3, title: "Computer Lab Project", description: "Setting up computer labs in 10 government schools.", target: 500000, raised: 175000, donors: 89, daysLeft: 45, icon: "💻", featured: false },
    { id: 4, title: "Smart Class Initiative", description: "Bringing digital learning to rural classrooms.", target: 500000, raised: 200000, donors: 112, daysLeft: 30, icon: "📺", featured: false }
];

export const storiesData = [
    { id: 1, title: "How 500 Books Changed a Village School", category: "Library Project", description: "Government Primary School now has a library with 500+ books.", raised: 50000, donors: 45, studentsImpacted: 250, date: "Feb 2026", icon: "📚", featured: true, quote: "The children now spend their free time reading. Their curiosity has grown tremendously.", quoteAuthor: "School Principal" },
    { id: 2, title: "10 Computers Installed in Girls School", category: "Computer Lab", description: "School now has a fully functional computer lab.", raised: 50000, donors: 28, studentsImpacted: 180, date: "Feb 2026", icon: "💻", featured: false },
    { id: 3, title: "RO System Installed in Rajasthan", category: "Clean Water", description: "Clean drinking water now available for 320+ students.", raised: 25000, donors: 67, studentsImpacted: 320, date: "Mar 2026", icon: "💧", featured: false }
];