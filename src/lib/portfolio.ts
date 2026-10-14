const WORLDQUANT_START_TIME = new Date("2026-09-07T09:00:00+07:00").getTime();
interface Experience {
    title: string;
    period: string;
    organization: string;
    organizationUrl?: string;
    description?: string;
    highlights?: string[];
    products?: {
        name: string;
        url: string;
    }[];
    skills: string[];
    type: "work" | "research" | "teaching";
    featured?: boolean;
    startsAt?: number;
    currentPeriod?: string;
    currentDescription?: string;
}
export const experiences: Experience[] = [
    {
        title: "Front-end Engineer",
        period: "Starting September 7, 2026 at 9:00 AM GMT+7",
        currentPeriod: "September 2026 - now",
        organization: "WorldQuant",
        description: "Joining WorldQuant as a Front-end Engineer.",
        currentDescription: "Working at WorldQuant as a Front-end Engineer.",
        skills: ["Front-end Engineering"],
        type: "work",
        featured: true,
        startsAt: WORLDQUANT_START_TIME,
    },
    {
        title: "Co-founder",
        period: "November 2025 - Present",
        organization: "Wins Residence",
        organizationUrl: "https://www.winsresidence.com/",
        description: "Building and growing a business beyond the software industry, with hands-on involvement in operations, digital presence, and market-facing execution.",
        highlights: [
            "Expanded my perspective beyond engineering into business thinking, execution, and long-term product positioning.",
        ],
        skills: ["Business Development", "Digital Presence", "Operations"],
        type: "work",
    },
    {
        title: "Software Engineer",
        period: "November 2022 - June 2026",
        organization: "Teko Solution",
        description: "Led front-end and product engineering delivery across multiple applications, with responsibilities spanning system design, integration strategy, and release execution.",
        products: [
            { name: "Nio App", url: "https://nioapp.io/" },
            { name: "Tempi", url: "http://tempi.vn" },
        ],
        highlights: [
            "Owned front-end architecture and implementation for complex user flows, application integrations, data aggregation, Kotlin/UI integration, and production-ready user experiences.",
            "Served as the main engineer for integrating NIO products with Tempi micro-frontend infrastructure, resolving difficult compatibility issues across products and repositories.",
            "Delivered medium- and high-complexity epics spanning data-intensive user workflows, admin interfaces, multi-language support, browser embedding, and release coordination.",
            "Designed technical solutions where common React state patterns were insufficient, including cross-application integration and shared-state flows across micro-frontends and multi-package UI systems.",
            "Built a real-time alerting solution that made incident alerts directly actionable for on-call engineers.",
        ],
        skills: [
            "React",
            "TypeScript",
            "Kotlin",
            "Micro-frontends",
            "SPA/MPA",
            "Node.js",
            "CI/CD",
            "System Design",
        ],
        type: "work",
    },
    {
        title: "Data Mining & Analysis in DeFi",
        period: "April 2022 - Apr 2026",
        organization: "Faculty of Finance & Banking - UEB - VNU",
        description: "Research work centered on DAO, governance, lending, and protocol data analysis for decentralized finance.",
        highlights: [
            "Built research tooling and data pipelines to collect, normalize, and analyze governance and lending data from sources such as Snapshot and Aave.",
            "Designed GraphQL-based collection flows and structured datasets for proposal analysis, voting behavior analysis, coalition detection, and lending market observation.",
        ],
        skills: ["Python", "GraphQL", "Data Analysis", "DeFi Research"],
        type: "research",
    },
    {
        title: "DApp Developer / Solution Architect",
        period: "October 2021 - October 2022",
        organization: "TVM Digital",
        description: "Worked on blockchain application architecture and implementation across Terra and Polygon ecosystems.",
        products: [{ name: "OODLZ", url: "https://www.oodlz.io/" }],
        highlights: [
            "Contributed to solution architecture and system design for OODLZ, a cashback platform with web/mobile user journeys and financial product flows.",
            "Built DApp features using Solidity, Rust, Angular, and Node.js while strengthening end-to-end product delivery across front-end, integration, and architecture.",
        ],
        skills: ["Angular", "Node.js", "Solidity", "Rust", "Terra", "Polygon"],
        type: "work",
    },
    {
        title: "Blockchain Researcher",
        period: "September 2021 - June 2022",
        organization: "Blockchain Research Lab - UET",
        description: "Academic and applied blockchain research focused on real prototypes and decentralized application design.",
        highlights: [
            "Built hands-on prototypes in supply-chain traceability, anti-counterfeiting, and decentralized application research.",
            "Strengthened my foundation in distributed systems thinking, blockchain architecture, and smart-contract-oriented product design.",
        ],
        skills: ["Solidity", "Rust", "Ethereum", "Avalanche", "Terra"],
        type: "research",
    },
    {
        title: "Machine Learning / Computer Vision Researcher & Teaching Assistant",
        period: "2019 - June 2022",
        organization: "UET",
        description: "Worked on robotics-focused machine learning and computer vision while also supporting teaching activities.",
        highlights: [
            "Used ROS/ROS 2 with Turtlebot3, Raspberry Pi, lidar, cameras, and Arduino-based motor control to prototype robotics systems.",
            "Focused on computer vision for autonomous navigation and robotics, while helping students understand ROS-based workflows and engineering fundamentals.",
        ],
        skills: ["ROS", "ROS 2", "Python", "TensorFlow", "OpenCV", "C++"],
        type: "teaching",
    },
    {
        title: "Evolutionary Computation Research",
        period: "2020 - June 2022",
        organization: "Computer Science Laboratory - UET",
        description: "Research in evolutionary approaches for deep learning and neural-network optimization.",
        highlights: [
            "Implemented research code combining deep learning with search and optimization techniques, especially for CNN-related experimentation.",
        ],
        skills: ["Python", "TensorFlow", "Deep Learning"],
        type: "research",
    },
];
interface Achievement {
    title: string;
    year: string;
    description: string;
    skills?: string[];
    link?: string;
    type: "competition" | "certificate" | "award";
}
export const achievements: Achievement[] = [
    {
        title: "TOEIC",
        year: "Dec 2025",
        description: "980/990 - English proficiency certification",
        type: "certificate",
    },
    {
        title: "VMO Hackathon DApp Creator 2021",
        year: "2021",
        description: "Second Prize - Educational platform using Ethereum blockchain",
        skills: ["Angular", "Node.js", "Solidity", "Ethereum"],
        type: "award",
    },
    {
        title: "Blockchain Specialization",
        year: "2021",
        description: "Coursera certification",
        link: "https://coursera.org/verify/specialization/9EP3RFKY8QEZ",
        type: "certificate",
    },
    {
        title: "Deep Learning Specialization",
        year: "2020",
        description: "Coursera certification",
        link: "https://coursera.org/verify/specialization/KBWPAFP973NV",
        type: "certificate",
    },
    {
        title: "Youth IT Competition",
        year: "2017",
        description: "Second Prize - Creative Software for Cau Giay District's High School Students",
        type: "award",
    },
    {
        title: "Youth IT Competition",
        year: "2017",
        description: "Third Prize - Creative Software for Hanoi's High School Students",
        type: "award",
    },
    {
        title: "IT Competition for Gifted Students",
        year: "2015",
        description: "First Prize - Cau Giay District's Competition for Secondary School Students",
        type: "award",
    },
    {
        title: "IT Competition for Gifted Students",
        year: "2015",
        description: "Third Prize - Hanoi's Competition for Secondary School Students",
        type: "award",
    },
    {
        title: "Hanoi Youth IT Competitive Programming",
        year: "2015",
        description: "Third Prize",
        skills: ["Competitive Programming"],
        type: "competition",
    },
];
interface Laptop {
    name: string;
    os: string;
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
}
interface KeyboardItem {
    name: string;
    details?: string;
}
interface IoTItem {
    name: string;
    description: string;
}
export const laptops: Laptop[] = [
    {
        name: "Acer Nitro V",
        os: "CachyOS",
        cpu: "13th Gen Intel Core i7-13620H (16 threads)",
        ram: "16.0 GiB",
        storage: "512GB + 1TB SSD",
        gpu: "NVIDIA GeForce RTX 2050",
    },
    {
        name: "Dell Vostro 3405",
        os: "OpenSUSE Leap",
        cpu: "AMD Ryzen 7 3700U",
        ram: "13.5 GiB",
        storage: "640.1GB SSD",
        gpu: "Radeon Vega 10 Mobile Gfx",
    },
];
export const keyboards: KeyboardItem[] = [
    {
        name: "Sofle V2",
        details: "Akko Cream V3 Pro Fairy Silent • Linear / Pre-lubed / 55g • Minimalist Black PBT Keycaps",
    },
    { name: "Leopold FC660M BT" },
    { name: "AKKO 3098 RF Dracula Castle" },
    { name: "AKKO 3108 RF White on Black" },
    { name: "Corsair K63 Wireless Blue" },
    { name: "Logitech Wave Keys" },
    { name: "Dareu EK807G" },
];
export const iotItems: IoTItem[] = [
    { name: "Zoom:Bit Robot", description: "Reka:Bit + Micro:bit V2" },
    { name: "Wear:Bit Watch", description: "Micro:bit V2" },
];
export const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/vietanhrs",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tva2710",
    },
    {
        name: "Email",
        url: "mailto:vietanhtran.uet@gmail.com",
    },
    {
        name: "Phone",
        url: "tel:+84988582914",
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/tv.anh2k/",
    },
    {
        name: "Twitter",
        url: "https://x.com/tr_vietanh",
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/println_anh.tv/",
    },
    {
        name: "CodeForces",
        url: "https://codeforces.com/profile/anhtv2710",
    },
    {
        name: "LeetCode",
        url: "https://leetcode.com/u/vietanhtranuet/",
    },
];
export const CV_URL = "/Tran_Viet_Anh_CV___Fullstack_Software_Engineer.pdf";
export const roleIds = ["worldquant", "wins-residence", "teko", "defi-research", "tvm", "blockchain-lab", "robotics", "evolutionary-research"];
