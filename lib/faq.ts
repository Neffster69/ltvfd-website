// Fireman Fred FAQ Knowledge Base
export interface FAQ {
  id: string
  question: string
  keywords: string[]
  answer: string
  links?: { text: string; href: string }[]
}

export const faqs: FAQ[] = [
  {
    id: "hours",
    question: "What are your hours?",
    keywords: ["hours", "open", "when", "available", "office"],
    answer: "We have office hours from 8:00 AM to 5:00 PM on weekdays. However, we provide 24/7 emergency response services. For emergencies, always call 911.",
    links: [{ text: "Contact Us", href: "/contact" }],
  },
  {
    id: "emergency",
    question: "What should I do in an emergency?",
    keywords: ["emergency", "911", "help", "fire", "accident", "injured"],
    answer: "If you're in an emergency situation, ALWAYS call 911 immediately. Do not wait. Our trained professionals will respond as quickly as possible. In Lafayette Township, we are available 24/7 for emergency response.",
  },
  {
    id: "non-emergency",
    question: "How do I reach you for non-emergency situations?",
    keywords: ["non-emergency", "phone", "contact", "question", "call"],
    answer: "For non-emergency situations, you can reach us at (765) 393-0249. You can also visit us in person at our station located at 3235 N 100 W, Anderson, IN 46011.",
    links: [{ text: "Contact Form", href: "/contact" }],
  },
  {
    id: "location",
    question: "Where is your fire station located?",
    keywords: ["location", "address", "where", "station", "find"],
    answer: "We are located at 3235 N 100 W, Anderson, IN 46011. We'd love to see you visit! Feel free to stop by during office hours or contact us for more information.",
    links: [{ text: "Contact Us", href: "/contact" }],
  },
  {
    id: "services",
    question: "What services do you provide?",
    keywords: ["services", "provide", "do", "what", "offer"],
    answer: "We provide professional emergency response including fire suppression, emergency medical services, rescue operations, and community education. We're dedicated to serving our community with courage and compassion.",
    links: [
      { text: "Learn More About Us", href: "/about" },
      { text: "Staffing Info", href: "/staffing" },
    ],
  },
  {
    id: "mission",
    question: "What is your mission?",
    keywords: ["mission", "purpose", "goal", "why", "values"],
    answer: "Our mission is to serve the Lafayette Township community with courage and compassion. We provide professional emergency response and community education. We are committed to being there for our community when they need us most.",
    links: [{ text: "About Us", href: "/about" }],
  },
  {
    id: "events",
    question: "What events do you have coming up?",
    keywords: ["events", "coming", "scheduled", "what's happening", "fire safety"],
    answer: "We participate in many community events throughout the year. Check our Events page for the latest schedule and information about public events, fire safety training, and community activities.",
    links: [{ text: "View Events", href: "/events" }],
  },
  {
    id: "become-volunteer",
    question: "How can I become a volunteer firefighter?",
    keywords: ["volunteer", "join", "become", "firefighter", "apply"],
    answer: "We're always looking for dedicated volunteers to join our team! If you're interested in becoming part of our family, please contact us or stop by the station. We'd love to tell you more about the opportunity.",
    links: [
      { text: "Contact Us", href: "/contact" },
      { text: "Staffing Info", href: "/staffing" },
    ],
  },
  {
    id: "employee-portal",
    question: "How do I access the employee dashboard?",
    keywords: ["dashboard", "employee", "login", "schedule", "access"],
    answer: "Employees can log in to their dashboard to view schedules, employee events, and submit requests. Use the Employee Login button in the header.",
    links: [{ text: "Employee Login", href: "/login" }],
  },
  {
    id: "contact-us",
    question: "How can I contact you?",
    keywords: ["contact", "email", "reach", "get in touch", "facebook"],
    answer: "You can reach us in several ways: Call us at (765) 393-0249 for non-emergency situations, email us at oic@lafeyttetownshipfire.org, visit us in person at 3235 N 100 W Anderson, IN, or follow us on Facebook at facebook.com/lafayettetownshipfire.",
    links: [{ text: "Contact Form", href: "/contact" }],
  },
  {
    id: "request-form",
    question: "How do I submit a request or fill out a form?",
    keywords: ["request", "form", "submit", "fill out", "application"],
    answer: "You can submit requests and forms through our Contact page. For specific employee-related requests, use your employee dashboard.",
    links: [
      { text: "Contact Form", href: "/contact" },
      { text: "Employee Dashboard", href: "/dashboard" },
    ],
  },
]

// Simple FAQ matching function
export function findMatchingFAQ(userInput: string): FAQ | null {
  const lowerInput = userInput.toLowerCase()
  
  // Exact match first
  const exactMatch = faqs.find(faq =>
    faq.keywords.some(keyword => lowerInput.includes(keyword))
  )
  
  if (exactMatch) return exactMatch
  
  // Partial match
  const partialMatch = faqs.find(faq =>
    faq.question.toLowerCase().includes(lowerInput) ||
    faq.answer.toLowerCase().includes(lowerInput)
  )
  
  return partialMatch || null
}
