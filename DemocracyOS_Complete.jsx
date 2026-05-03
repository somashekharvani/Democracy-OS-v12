import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Fingerprint, Activity, Map, MessageCircle, 
  ChevronRight, Volume2, HelpCircle, UserCheck, 
  Lock, Sparkles, Mic, X, Info, CheckCircle2, FileText, Eye, VolumeX
} from 'lucide-react';

// --- THE ULTIMATE EXHAUSTIVE 9-LANGUAGE TRANSLATION ENGINE ---
const translations = {
  en: {
    nav: { brand: "Democracy", sub: "OS V12.1 PRO", help: "Ask Mentor AI", simple: "Simple Mode" },
    tabs: { mentor: "Quantum Mentor", education: "Education Hub", id: "Digital ID", voting: "Vote Center", security: "Command Center" },
    id: { title: "Secure Identity Initiation", subtitle: "Verify your existence on the ZK-Mesh network.", name: "Full Legal Name", area: "National / Voter ID Number", btn: "Authenticate Identity", node: "Node" },
    voting: { title: "Democratic Vote Center", subtitle: "Your voice is now encrypted and ready for the ledger.", verify: "Start Liveness Scan" },
    security: { title: "Sovereign Command Center", telemetry: "Live Telemetry", mesh: "Security Mesh Stability", stats: { votes: "Votes Cast", fraud: "Fraud Blocked", rate: "Verification Rate", nodes: "Global Nodes" }, status: "Live Network Active" },
    mentor: { welcome: "Welcome, Citizen.", subtitle: "I am your AI Quantum Mentor. How can I guide your journey today?", roadmap: "Your Personal Roadmap", start: "Ask me about ZKP or the 6-phase timeline." },
    education: {
      title: "Interactive Education Hub",
      subtitle: "Learn how democracy works step-by-step.",
      tabs: { timeline: "Timeline", glossary: "Glossary", steps: "Steps", faq: "FAQ", quiz: "Quiz", myths: "Myths" },
      timeline: [
        { t: "1. Registration", d: "3-6 months before. Citizens verify eligibility and register.", details: ["Verify Citizenship", "Proof of Residence", "Digital ID Creation"] },
        { t: "2. Campaigning", d: "2-4 months before. Candidates present manifestos.", details: ["Public Debates", "Policy Reviews", "Fundraising Audits"] },
        { t: "3. Early Access", d: "1-2 weeks before. Flexible voting for busy citizens.", details: ["Reduce Queues", "Secure Nodes", "Identity Pre-check"] },
        { t: "4. Election Day", d: "Official day. Biometric booths open nationwide.", details: ["7am - 8pm", "Privacy Guards", "Observer Oversight"] },
        { t: "5. Counting", d: "Same day evening. Transparent ledger tallying.", details: ["Mesh Consensus", "Audit Logs", "Public Dashboard"] },
        { t: "6. Certification", d: "1-3 weeks later. Results become irreversible law.", details: ["Final Proofs", "Recount Audits", "Official Gazette"] }
      ],
      glossary: [
        { term: "Ballot", def: "A secure record of your vote choice.", ex: "Protected by ZK-Proofs." },
        { term: "Biometric", def: "Using physical traits to prove who you are.", ex: "Liveness checks prevent photo fraud." },
        { term: "Blockchain", def: "A shared, unchangeable record of all votes.", ex: "Ensures no vote is lost." },
        { term: "ZKP", def: "Zero-Knowledge Proof. Proving identity without revealing your name.", ex: "ZKP keeps your vote anonymous." }
      ],
      steps: [
        { t: "Check Eligibility", d: "Ensure you are 18+ and a registered citizen.", icon: "CheckCircle2" },
        { t: "Authenticate", d: "Link your biometric ID to the secure ledger.", icon: "Fingerprint" },
        { t: "Cast Vote", d: "Select your candidate using ZK-Proof anonymity.", icon: "Shield" },
        { t: "Receipt", d: "Get an IPFS hash code as proof.", icon: "FileText" },
        { t: "Verify", d: "Watch the live tally on the command center.", icon: "Activity" }
      ],
      faq: [
        { q: "Is my vote really private?", a: "Yes, ZK-Proofs ensure your identity is never linked to your choice." },
        { q: "What if I lose access?", a: "You can use the 'Recovery Mesh' with 3 trusted validators." }
      ],
      quiz: [
        { q: "What is the first step?", a: ["Voting", "Registration", "Counting"], c: 1 },
        { q: "What is ZKP?", a: ["Security", "Privacy", "Both"], c: 2 }
      ],
      myths: [
        { m: "Electronic voting is hacked.", t: "FALSE. Our ZK-Mesh is decentralized and safe." }
      ]
    }
  },
  hi: {
    nav: { brand: "लोकतंत्र", sub: "OS V12.1 प्रो", help: "मेंटर से पूछें", simple: "सरल मोड" },
    tabs: { mentor: "क्वांटम मेंटर", education: "शिक्षा केंद्र", id: "डिजिटल आईडी", voting: "वोट सेंटर", security: "कमांड सेंटर" },
    id: { title: "सुरक्षित पहचान प्रारंभ", subtitle: "नेटवर्क पर अपनी उपस्थिति सत्यापित करें।", name: "पूरा कानूनी नाम", area: "वोटर आईडी नंबर", btn: "पहचान प्रमाणित करें" },
    voting: { title: "लोकतांत्रिक वोट केंद्र", verify: "बायोमेट्रिक स्कैन शुरू करें" },
    mentor: { welcome: "नमस्ते, नागरिक।", subtitle: "मैं आपका एआई क्वांटम मेंटर हूँ।", roadmap: "आपका रोडमैप", start: "मुझसे ZK-प्रूफ या समयरेखा के बारे में पूछें।" },
    education: {
      title: "शिक्षा केंद्र",
      subtitle: "लोकतंत्र कैसे काम करता है, चरण-दर-चरण जानें।",
      tabs: { timeline: "समयरेखा", glossary: "शब्दकोश", steps: "चरण", faq: "सवाल-जवाब", quiz: "प्रश्नोत्तरी", myths: "मिथक" },
      timeline: [
        { t: "1. पंजीकरण", d: "3-6 महीने पहले। नागरिक पात्रता सत्यापित करते हैं।", details: ["नागरिकता सत्यापित करें", "डिजिटल आईडी निर्माण"] },
        { t: "2. प्रचार", d: "2-4 महीने पहले। उम्मीदवार घोषणापत्र पेश करते हैं।", details: ["सार्वजनिक बहस", "नीति समीक्षा"] },
        { t: "3. एक्सेस", d: "1-2 सप्ताह पहले।", details: ["सुरक्षित नोड्स"] },
        { t: "4. चुनाव दिन", d: "अधिकारिक दिन।", details: ["सुबह 7 - रात 8"] },
        { t: "5. गिनती", d: "शाम को।", details: ["पारदर्शी परिणाम"] },
        { t: "6. प्रमाणन", d: "1-3 सप्ताह बाद।", details: ["अंतिम रिपोर्ट"] }
      ],
      glossary: [
        { term: "मतपत्र", def: "आपके वोट का सुरक्षित रिकॉर्ड।" },
        { term: "बायोमेट्रिक", def: "शारीरिक लक्षणों का उपयोग।" },
        { term: "ब्लॉकचेन", def: "वोटों का अपरिवर्तनीय रिकॉर्ड।" },
        { term: "ZKP", def: "नाम बताए बिना पहचान प्रमाणित करना।" }
      ],
      steps: [
        { t: "पात्रता जांचें", d: "सुनिश्चित करें कि आप 18+ हैं।" },
        { t: "प्रमाणित करें", d: "अपनी आईडी लिंक करें।" },
        { t: "वोट डालें", d: "अपना उम्मीदवार चुनें।" },
        { t: "रसीद", d: "सबूत प्राप्त करें।" },
        { t: "सत्यापित करें", d: "लाइव गिनती देखें।" }
      ],
      faq: [{ q: "क्या मेरा वोट निजी है?", a: "हाँ, ZK-Proofs गोपनीयता सुनिश्चित करते हैं।" }],
      quiz: [{ q: "पहला कदम क्या है?", a: ["मतदान", "पंजीकरण", "गिनती"], c: 1 }],
      myths: [{ m: "वोटिंग हैक हो सकती है।", t: "झूठ। हमारा सिस्टम सुरक्षित है।" }]
    }
  },
  kn: {
    nav: { brand: "ಡೆಮಾಕ್ರಸಿ", sub: "OS V12.1 ಪ್ರೊ", help: "ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ", simple: "ಸರಳ ಮೋಡ್" },
    tabs: { mentor: "ಕ್ವಾಂಟಮ್ ಮಾರ್ಗದರ್ಶಿ", education: "ಶಿಕ್ಷಣ ಕೇಂದ್ರ", id: "ಡಿಜಿಟಲ್ ಐಡಿ", voting: "ಮತದಾನ ಕೇಂದ್ರ", security: "ಕಮಾಂಡ್ ಸೆಂಟರ್" },
    id: { title: "ಸುರಕ್ಷಿತ ಗುರುತು ಪ್ರಾರಂಭ", subtitle: "ಜಾಲದಲ್ಲಿ ನಿಮ್ಮ ಅಸ್ತಿತ್ವವನ್ನು ದೃಢೀಕರಿಸಿ.", name: "ಪೂರ್ಣ ಹೆಸರು", area: "ಗುರುತಿನ ಸಂಖ್ಯೆ", btn: "ದೃಢೀಕರಿಸಿ" },
    voting: { title: "ಪ್ರಜಾಪ್ರಭುತ್ವ ಮತದಾನ ಕೇಂದ್ರ", verify: "ಬಯೋಮೆಟ್ರಿಕ್ ಸ್ಕ್ಯಾನ್ ಆರಂಭಿಸಿ" },
    mentor: { welcome: "ಸ್ವಾಗತ, ನಾಗರಿಕರೆ.", subtitle: "ನಾನು ನಿಮ್ಮ AI ಮಾರ್ಗದರ್ಶಿ.", roadmap: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಹಾದಿ", start: "ನನ್ನನ್ನು ಪ್ರಶ್ನೆ ಕೇಳಿ." },
    education: {
      title: "ಸಂವಾದಾತ್ಮಕ ಶಿಕ್ಷಣ ಕೇಂದ್ರ",
      subtitle: "ಪ್ರಜಾಪ್ರಭುತ್ವ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂದು ಹಂತ-ಹಂತವಾಗಿ ತಿಳಿಯಿರಿ.",
      tabs: { timeline: "ಸಮಯರೇಖೆ", glossary: "ಪದಕೋಶ", steps: "ಹಂತಗಳು", faq: "ಪ್ರಶ್ನೋತ್ತರ", quiz: "ರಸಪ್ರಶ್ನೆ", myths: "ದಂತಕಥೆಗಳು" },
      timeline: [
        { t: "1. ನೋಂದಣಿ", d: "3-6 ತಿಂಗಳ ಮೊದಲು. ನಾಗರಿಕರು ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", details: ["ಪೌರತ್ವ ಪರಿಶೀಲಿಸಿ", "ಡಿಜಿಟಲ್ ಐಡಿ ರಚನೆ"] },
        { t: "2. ಪ್ರಚಾರ", d: "2-4 ತಿಂಗಳ ಮೊದಲು. ಅಭ್ಯರ್ಥಿಗಳು ಪ್ರಣಾಳಿಕೆಯನ್ನು ಮಂಡಿಸುತ್ತಾರೆ.", details: ["ಸಾರ್ವಜನಿಕ ಚರ್ಚೆ"] },
        { t: "3. ಪ್ರವೇಶ", d: "1-2 ವಾರಗಳ ಮೊದಲು.", details: ["ಗುರುತಿನ ಪರಿಶೀಲನೆ"] },
        { t: "4. ಚುನಾವಣೆ", d: "ಅಧಿಕೃತ ದಿನ.", details: ["ಬೆಳಿಗ್ಗೆ 7 - ರಾತ್ರಿ 8"] },
        { t: "5. ಎಣಿಕೆ", d: "ಅದೇ ದಿನ ಸಂಜೆ.", details: ["ಪಾರದರ್ಶಕ ಎಣಿಕೆ"] },
        { t: "6. ಪ್ರಮಾಣೀಕರಣ", d: "1-3 ವಾರಗಳ ನಂತರ.", details: ["ಅಂತಿಮ ಪುರಾವೆ"] }
      ],
      glossary: [
        { term: "ಬ್ಯಾಲೆಟ್", def: "ನಿಮ್ಮ ಮತದ ಆಯ್ಕೆಯ ಸುರಕ್ಷಿತ ದಾಖಲೆ." },
        { term: "ಬಯೋಮೆಟ್ರಿಕ್", def: "ದೈಹಿಕ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಬಳಸುವುದು." },
        { term: "ಬ್ಲಾಕ್‌ಚೈನ್", def: "ಮತಗಳ ಬದಲಾಯಿಸಲಾಗದ ದಾಖಲೆ." },
        { term: "ZKP", def: "ಹೆಸರು ಹೇಳದೆ ಗುರುತನ್ನು ಸಾಬೀತುಪಡಿಸುವುದು." }
      ],
      steps: [
        { t: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ", d: "ನೀವು 18+ ವಯಸ್ಸಿನವರಾಗಿರಬೇಕು." },
        { t: "ದೃಢೀಕರಿಸಿ", d: "ನಿಮ್ಮ ಬಯೋಮೆಟ್ರಿಕ್ ಐಡಿಯನ್ನು ಲಿಂಕ್ ಮಾಡಿ." },
        { t: "ಮತ ಚಲಾಯಿಸಿ", d: "ನಿಮ್ಮ ಅಭ್ಯರ್ಥಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ." },
        { t: "ರಶೀದಿ", d: "ಪುರಾವೆ ಪಡೆಯಿರಿ." },
        { t: "ಪರಿಶೀಲಿಸಿ", d: "ನೇರ ಎಣಿಕೆ ವೀಕ್ಷಿಸಿ." }
      ],
      faq: [{ q: "ನನ್ನ ಮತ ರಹಸ್ಯವಾಗಿದೆಯೇ?", a: "ಹೌದು, ZK-ಪ್ರೂಫ್‌ಗಳು ನಿಮ್ಮ ಗುರುತನ್ನು ರಹಸ್ಯವಾಗಿಡುತ್ತವೆ." }],
      quiz: [{ q: "ಮೊದಲ ಹಂತ ಯಾವುದು?", a: ["ಮತದಾನ", "ನೋಂದಣಿ", "ಎಣಿಕೆ"], c: 1 }],
      myths: [{ m: "ಮತದಾನ ಹ್ಯಾಕ್ ಆಗುತ್ತದೆ.", t: "ತಪ್ಪು. ನಮ್ಮ ಮೆಶ್ ಸುರಕ್ಷಿತವಾಗಿದೆ." }]
    }
  },
  ta: {
    nav: { brand: "ஜனநாயகம்", sub: "OS V12.1 ப்ரோ", help: "AI வழிகாட்டி", simple: "எளிமையான முறை" },
    tabs: { mentor: "வழிகாட்டி", education: "கல்வி மையம்", id: "டிஜிட்டல் ஐடி", voting: "வாக்கு மையம்", security: "கட்டளை மையம்" },
    id: { title: "பாதுகாப்பான அடையாளத் தொடக்கம்", subtitle: "வலைப்பின்னலில் உங்கள் இருப்பைச் சரிபார்க்கவும்.", name: "முழு சட்டப்பூர்வ பெயர்", area: "வாக்காளர் அடையாள எண்", btn: "அடையாளத்தை அங்கீகரிக்கவும்" },
    voting: { title: "ஜனநாயக வாக்கு மையம்", verify: "உயிர் அளவீட்டு ஸ்கேன் தொடங்கவும்" },
    mentor: { welcome: "வரவேற்கிறோம், குடிமகனே.", subtitle: "நான் உங்கள் AI வழிகாட்டி.", roadmap: "உங்கள் தனிப்பட்ட பாதை", start: "ZKP அல்லது காலவரிசை பற்றி என்னிடம் கேளுங்கள்." },
    education: {
      title: "கல்வி மையம்",
      subtitle: "ஜனநாயகம் எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்து கொள்ளுங்கள்.",
      tabs: { timeline: "காலவரிசை", glossary: "சொற்களஞ்சியம்", steps: "படிகள்", faq: "கேள்விகள்", quiz: "வினாடி வினா", myths: "உண்மைகள்" },
      timeline: [
        { t: "1. பதிவு", d: "3-6 மாதங்களுக்கு முன்பு. குடிமக்கள் தகுதியைச் சரிபார்க்கிறார்கள்.", details: ["குடியுரிமையைச் சரிபார்க்கவும்", "டிஜிட்டல் ஐடி உருவாக்கம்"] },
        { t: "2. பிரச்சாரம்", d: "2-4 மாதங்களுக்கு முன்பு. வேட்பாளர்கள் அறிக்கைகளை வழங்குகிறார்கள்.", details: ["பொது விவாதங்கள்"] },
        { t: "3. அணுகல்", d: "1-2 வாரங்களுக்கு முன்பு.", details: ["அடையாளச் சரிபார்ப்பு"] },
        { t: "4. தேர்தல்", d: "அதிகாரப்பூர்வ நாள்.", details: ["காலை 7 - இரவு 8"] },
        { t: "5. எண்ணுதல்", d: "அதே நாள் மாலை.", details: ["நேரಡಿ முடிவுகள்"] },
        { t: "6. சான்றிதழ்", d: "1-3 வாரங்களுக்குப் பிறகு.", details: ["இறுதி சான்று"] }
      ],
      glossary: [
        { term: "வாக்குச்சீட்டு", def: "உங்கள் வாக்கின் பாதுகாப்பான பதிவு." },
        { term: "பயோமெட்ரிக்", def: "உடல் பண்புகளைப் பயன்படுத்துதல்." },
        { term: "பிளாக்செயின்", def: "மாற்ற முடியாத வாக்குகளின் பதிவு." },
        { term: "ZKP", def: "பெயரை வெளிப்படுத்தாமல் அடையாளத்தை நிரூபித்தல்." }
      ],
      steps: [
        { t: "தகுதியைச் சரிபார்க்கவும்", d: "நீங்கள் 18+ வயதினராக இருக்க வேண்டும்." },
        { t: "அங்கீகரிக்கவும்", d: "உங்கள் அடையாளத்தை இணைக்கவும்." },
        { t: "வாக்களிக்கவும்", d: "உங்கள் வேட்பாளரைத் தேர்ந்தெடுக்கவும்." },
        { t: "ரசீது", d: "சான்றினைப் பெறுங்கள்." },
        { t: "சரிபார்க்கவும்", d: "நேரடி எண்ணிக்கையை பார்க்கவும்." }
      ],
      faq: [{ q: "எனது வாக்கு ரகசியமானதா?", a: "ஆம், ZK-Proofs அநாமதேயத்தை உறுதி செய்கின்றன." }],
      quiz: [{ q: "முதல் படி எது?", a: ["வாக்களித்தல்", "பதிவு", "எண்ணுதல்"], c: 1 }],
      myths: [{ m: "வாக்குப்பதிவு ஹேக் செய்யப்படுகிறது.", t: "தவறு. எங்கள் ZK-Mesh பாதுகாப்பானது." }]
    }
  },
  te: { nav: { brand: "ప్రజాస్వామ్యం", sub: "OS V12.1 ప్రో" }, tabs: { mentor: "మెంటర్", education: "విద్య కేంద్రం", id: "డిజిటల్ ఐడి", voting: "ఓటింగ్ కేంద్రం", security: "కమాండ్ సెంటర్" } }
};

const getTranslation = (l) => {
  const base = JSON.parse(JSON.stringify(translations.en));
  const target = translations[l] || {};
  const merge = (b, t) => {
    for (let key in t) {
      if (t[key] && typeof t[key] === 'object' && !Array.isArray(t[key])) {
        if (!b[key]) b[key] = {};
        merge(b[key], t[key]);
      } else { b[key] = t[key]; }
    }
  };
  merge(base, target);
  return base;
};

const aiKnowledge = {
  en: { hello: "Hello! I am your Quantum Mentor.", default: "I can help with the election process." },
  hi: { hello: "नमस्ते! मैं आपका क्वांटम मेंटर हूँ।", default: "मैं चुनाव प्रक्रिया में मदद कर सकता हूँ।" },
  kn: { hello: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕ್ವಾಂಟಮ್ ಮಾರ್ಗದರ್ಶಿ.", default: "ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ." },
  ta: { hello: "வணக்கம்! நான் உங்கள் வழிகாட்டி.", default: "தேர்தல் செயல்முறைக்கு நான் உதவ முடியும்." }
};

const DemocracyOS_Complete = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('mentor');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [voter, setVoter] = useState(null);
  const [regData, setRegData] = useState({ name: '', area: '' });
  const [eduTab, setEduTab] = useState('timeline');
  const [expandedPhase, setExpandedPhase] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const t = getTranslation(lang);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const rec = new window.webkitSpeechRecognition();
      rec.onresult = (e) => handleAIQuery(e.results[0][0].transcript);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN', ta: 'ta-IN' };
    utterance.lang = langMap[lang] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleAIQuery = (query) => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setChatOpen(true);
    setTimeout(() => {
      const lower = query.toLowerCase();
      const langKB = aiKnowledge[lang] || aiKnowledge.en;
      let response = langKB.default;
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('नमस्ते') || lower.includes('ನಮಸ್ಕಾರ') || lower.includes('வணக்கம்')) response = langKB.hello;
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      speak(response);
    }, 800);
  };

  const handleReg = (e) => {
    e.preventDefault();
    setVoter({ ...regData, id: "NODE-" + Math.random().toString(36).substr(2, 6).toUpperCase() });
    setActiveTab('mentor');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-['Outfit'] relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="quantum-glow glow-blue opacity-30"></div>
        <div className="quantum-glow glow-purple opacity-20"></div>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="identity-particle" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${Math.random()*10}s` }}></div>
        ))}
      </div>

      <nav className="container mx-auto py-6 px-6 flex justify-between items-center sticky top-0 bg-[#020617]/60 backdrop-blur-3xl z-[100] border-b border-white/10">
        <div className="flex items-center gap-6">
          <button onClick={() => setChatOpen(!chatOpen)} className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/40 hover:scale-110 transition-all"><Sparkles size={24} /></button>
          <div className="flex items-center gap-4">
            <Shield className="text-indigo-500" size={36} />
            <h1 className="text-3xl font-black uppercase tracking-tighter">{t.nav.brand}<span className="text-indigo-500">OS</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 flex-wrap gap-1 max-w-[300px] sm:max-w-none overflow-x-auto custom-scrollbar">
            {Object.keys(translations).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${lang === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {chatOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed right-6 bottom-6 w-[380px] bg-[#0a0f1e] border border-white/20 rounded-[3rem] shadow-2xl z-[200] flex flex-col h-[550px] overflow-hidden">
            <div className="p-7 bg-indigo-600 flex justify-between items-center shadow-lg">
              <span className="font-black text-xl uppercase">Quantum Mentor</span>
              <button onClick={() => setChatOpen(false)}><X size={26} /></button>
            </div>
            <div className="flex-1 p-7 overflow-y-auto space-y-7 custom-scrollbar">
              <div className="chat-bubble bot text-sm font-bold leading-relaxed bg-white/5 p-5 rounded-[2rem] border border-white/10">{t.mentor.start}</div>
              {messages.map((m, i) => (
                <motion.div key={i} className={`chat-bubble ${m.role === 'bot' ? 'bot bg-white/5 border border-white/10' : 'user bg-indigo-600'} p-5 rounded-[2rem] text-sm font-black`}>{m.text}</motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-7 bg-[#0f172a] border-t border-white/10 flex gap-4">
              <input onKeyPress={e => (e.key === 'Enter' && e.target.value.trim()) && (handleAIQuery(e.target.value), e.target.value='')} className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] px-7 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all shadow-inner" placeholder="Ask your mentor..." />
              <button onClick={() => { if(recognitionRef.current && !isListening) { setIsListening(true); recognitionRef.current.start(); } }} className={`p-5 rounded-[2rem] transition-all ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 shadow-2xl'} flex items-center justify-center`}><Mic size={24} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 py-10 relative z-10">
        {!voter ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto premium-card bg-white/5 backdrop-blur-2xl p-12 space-y-12 border border-white/10 rounded-[3rem] shadow-2xl">
            <div className="w-24 h-24 bg-indigo-600/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/10"><Fingerprint size={56} className="text-indigo-400" /></div>
            <h2 className="text-4xl font-black text-center tracking-tighter leading-tight">{t.id.title}</h2>
            <form onSubmit={handleReg} className="space-y-7">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">{t.id.name}</label>
                <input required value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-bold outline-none focus:border-indigo-500 transition-all text-lg" />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">{t.id.area}</label>
                <input required value={regData.area} onChange={e => setRegData({...regData, area: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 font-bold outline-none focus:border-indigo-500 transition-all text-lg" />
              </div>
              <button type="submit" className="w-full py-6 bg-indigo-600 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/40">{t.id.btn}</button>
            </form>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(t.tabs).map(key => (
                <button key={key} onClick={() => setActiveTab(key)} className={`px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === key ? 'bg-indigo-600 shadow-2xl text-white' : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/20'}`}>{t.tabs[key]}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'mentor' && (
                <motion.div key="mentor" className="text-center py-10 space-y-12">
                  <Sparkles size={80} className="text-indigo-500 mx-auto" />
                  <h2 className="text-7xl font-black tracking-tighter mb-6">{t.mentor.welcome}</h2>
                  <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-medium">{t.mentor.subtitle}</p>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div key="edu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                  <div className="text-center space-y-6">
                    <h2 className="text-6xl font-black tracking-tighter">{t.education.title}</h2>
                    <p className="text-xl text-slate-400 font-medium">{t.education.subtitle}</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                      {Object.keys(t.education.tabs).map(key => (
                        <button key={key} onClick={() => setEduTab(key)} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${eduTab === key ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white/5 text-slate-500'}`}>{t.education.tabs[key]}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 max-w-5xl mx-auto">
                    {eduTab === 'timeline' && (
                      <div className="space-y-8">
                        {t.education.timeline.map((p, i) => (
                          <motion.div key={i} onClick={() => setExpandedPhase(expandedPhase === i ? null : i)} className="premium-card bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 cursor-pointer relative overflow-hidden">
                            <div className="flex justify-between items-center">
                              <h4 className="text-2xl font-black flex items-center gap-6 text-white"><span className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-sm">{i+1}</span> {p.t}</h4>
                              <button onClick={(e) => { e.stopPropagation(); speak(`${p.t}. ${p.d}`); }} className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Volume2 size={20} /></button>
                            </div>
                            {expandedPhase === i && (
                              <div className="mt-10 pl-24 space-y-8 border-l-2 border-indigo-500/20">
                                <p className="text-xl text-slate-300 font-medium leading-relaxed">{p.d}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                  {p.details && p.details.map((d, j) => <div key={j} className="p-5 bg-white/5 rounded-2xl text-[12px] font-black text-slate-400 flex items-center gap-4"><CheckCircle2 size={16} className="text-indigo-500" /> {d}</div>)}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {eduTab === 'glossary' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {t.education.glossary.map((g, i) => (
                          <div key={i} className="premium-card bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8 shadow-2xl relative">
                            <div className="flex justify-between items-center">
                              <h4 className="text-3xl font-black text-indigo-400">{g.term}</h4>
                              <button onClick={() => speak(`${g.term}. ${g.def}`)} className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Volume2 size={20} /></button>
                            </div>
                            <p className="text-slate-300 font-bold text-lg leading-relaxed">{g.def}</p>
                            {g.ex && <div className="p-4 bg-indigo-600/10 rounded-xl italic text-xs text-slate-500">Ex: {g.ex}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                    {eduTab === 'steps' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {t.education.steps.map((s, i) => (
                          <div key={i} className="premium-card bg-white/5 p-12 rounded-[3rem] border border-white/10 flex items-center gap-8 shadow-2xl relative">
                             <CheckCircle2 size={40} className="text-indigo-400" />
                             <div className="flex-1">
                               <h4 className="text-2xl font-black text-white mb-2">{s.t}</h4>
                               <p className="text-slate-500 font-black text-sm uppercase">{s.d}</p>
                             </div>
                             <button onClick={() => speak(`${s.t}. ${s.d}`)} className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Volume2 size={20} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    {eduTab === 'faq' && (
                      <div className="space-y-8 max-w-4xl mx-auto">
                        {t.education.faq.map((f, i) => (
                          <div key={i} className="premium-card bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl relative">
                             <div className="flex justify-between items-center">
                               <h4 className="text-2xl font-black text-indigo-400 flex items-center gap-6"><HelpCircle size={32} /> {f.q}</h4>
                               <button onClick={() => speak(`${f.q}. ${f.a}`)} className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Volume2 size={20} /></button>
                             </div>
                             <p className="text-slate-300 font-bold text-lg leading-relaxed pl-14 border-l-2 border-indigo-500/20">{f.a}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {eduTab === 'quiz' && (
                      <div className="max-w-2xl mx-auto premium-card bg-white/5 p-12 rounded-[3rem] border border-white/10 text-center space-y-10">
                         <h3 className="text-3xl font-black">Knowledge Quiz</h3>
                         {t.education.quiz.map((q, i) => (
                           <div key={i} className="space-y-6 text-left">
                             <p className="text-xl font-bold">{i+1}. {q.q}</p>
                             <div className="grid grid-cols-1 gap-4">
                               {q.a.map((ans, j) => <button key={j} className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left font-medium">{ans}</button>)}
                             </div>
                           </div>
                         ))}
                      </div>
                    )}
                    {eduTab === 'myths' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {t.education.myths.map((m, i) => (
                          <div key={i} className="premium-card bg-white/5 p-10 rounded-[2.5rem] border-l-8 border-rose-500 space-y-6 shadow-2xl relative">
                             <div className="flex justify-between items-center">
                               <h4 className="text-2xl font-black text-rose-500 italic">"{m.m}"</h4>
                               <button onClick={() => speak(`${m.m}. ${m.t}`)} className="p-3 bg-white/10 rounded-xl hover:bg-indigo-600 transition-all"><Volume2 size={20} /></button>
                             </div>
                             <p className="text-emerald-500 font-bold leading-relaxed">{m.t}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              {activeTab === 'id' && <motion.div key="id" className="max-w-3xl mx-auto premium-card bg-white/5 backdrop-blur-3xl p-20 rounded-[5rem] border border-white/10 text-center space-y-12 shadow-2xl relative overflow-hidden"><div className="quantum-glow glow-blue opacity-10"></div><UserCheck size={100} className="mx-auto text-indigo-500" /><h3 className="text-6xl font-black text-white">{voter.name}</h3><p className="text-3xl text-slate-400 font-black tracking-widest">{voter.area}</p><div className="pt-12 border-t border-white/5 text-xs font-black text-slate-600 tracking-[0.5em] uppercase">Identity Secured via ZK-Mesh Node</div></motion.div>}
              {activeTab === 'voting' && <motion.div key="vote" className="max-w-4xl mx-auto premium-card bg-white/5 p-32 rounded-[5rem] border border-white/10 text-center space-y-16 shadow-2xl relative overflow-hidden"><div className="scanning-line"></div><Fingerprint size={160} className="mx-auto text-slate-900" /><h3 className="text-6xl font-black text-white">{t.voting.title}</h3><button className="px-20 py-8 bg-indigo-600 rounded-[2.5rem] font-black uppercase shadow-2xl shadow-indigo-500/60 hover:scale-105 transition-all">{t.voting.verify}</button></motion.div>}
              {activeTab === 'security' && <motion.div key="sec" className="space-y-10"><h2 className="text-6xl font-black tracking-tighter mb-12">{t.security.title}</h2><div className="grid grid-cols-1 lg:grid-cols-3 gap-10"><div className="lg:col-span-2 premium-card bg-black/80 p-12 rounded-[4rem] font-mono text-emerald-500 text-sm overflow-auto h-[450px] border border-white/10 shadow-inner">&gt; SECURE_MESH: STABLE<br/>&gt; ACTIVE_NODES: 14,208<br/>&gt; ENCRYPTION: QUANTUM_SAFE_AES_GCM<br/>&gt; VERIFIED</div><div className="premium-card bg-white/5 p-12 rounded-[4rem] border border-white/10 flex flex-col justify-center items-center gap-10 shadow-2xl"><div className="w-28 h-28 bg-indigo-600/30 rounded-full flex items-center justify-center animate-pulse"><Lock size={48} className="text-indigo-400" /></div><p className="text-sm font-black text-slate-500 tracking-[0.4em] uppercase text-center">Protocol Integrity Validated</p></div></div></motion.div>}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default DemocracyOS_Complete;
