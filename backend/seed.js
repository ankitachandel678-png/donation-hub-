const mongoose = require('mongoose');
const dotenv = require('dotenv');
const School = require('./models/School');
const Campaign = require('./models/Campaign');
const Story = require('./models/Story');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const schoolsData = [
    {
        name: "Government Primary School, Sarai Village",
        location: "Lucknow, Uttar Pradesh",
        students: 250,
        grades: "1-5",
        description: "Serves children from 15 nearby villages.",
        needs: [
            { item: "Story Books", price: 500, raised: 150, donors: 3, urgent: false },
            { item: "Notebooks & Stationery", price: 2000, raised: 200, donors: 2, urgent: false },
            { item: "Benches & Desks", price: 15000, raised: 750, donors: 2, urgent: true }
        ],
        icon: "🏫",
        city: "Lucknow",
        state: "Uttar Pradesh"
    },
    {
        name: "Kasturba Gandhi Balika Vidyalaya",
        location: "Aliganj, Lucknow",
        students: 180,
        grades: "6-12",
        description: "Residential school for girls.",
        needs: [
            { item: "Desktop Computers", price: 10000, raised: 10000, donors: 5, urgent: false },
            { item: "Printer & Scanner", price: 5000, raised: 2000, donors: 1, urgent: false }
        ],
        icon: "💻",
        city: "Lucknow",
        state: "Uttar Pradesh"
    },
    {
        name: "Middle School, Madhepura",
        location: "Madhepura, Bihar",
        students: 320,
        grades: "1-8",
        description: "School in drought-prone area.",
        needs: [
            { item: "RO Water Purifier", price: 25000, raised: 2000, donors: 2, urgent: true },
            { item: "Water Storage Tank", price: 8000, raised: 0, donors: 0, urgent: false }
        ],
        icon: "💧",
        city: "Madhepura",
        state: "Bihar"
    }
];

const campaignsData = [
    { title: "Library for 500 Children", description: "Help us build a library.", target: 100000, raised: 65000, donors: 128, daysLeft: 15, icon: "📚", featured: true },
    { title: "Clean Drinking Water", description: "Providing RO water purifiers.", target: 80000, raised: 40000, donors: 67, daysLeft: 20, icon: "💧", featured: false, urgent: true },
    { title: "Computer Lab Project", description: "Setting up computer labs.", target: 500000, raised: 175000, donors: 89, daysLeft: 45, icon: "💻", featured: false }
];

const storiesData = [
    { title: "How 500 Books Changed a Village School", category: "Library Project", description: "School now has a library.", raised: 50000, donors: 45, studentsImpacted: 250, date: "Feb 2026", icon: "📚", featured: true, quote: "Children now love reading!", quoteAuthor: "Principal" }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await School.deleteMany();
        await Campaign.deleteMany();
        await Story.deleteMany();
        
        await School.insertMany(schoolsData);
        await Campaign.insertMany(campaignsData);
        await Story.insertMany(storiesData);
        
        console.log('✅ Data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();