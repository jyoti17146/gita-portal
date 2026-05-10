//FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAco7hVGeZXXNCEM0Rawvi0m5I0ObWyrEo",
  authDomain: "gita-portal.firebaseapp.com",
  projectId: "gita-portal",
  storageBucket: "gita-portal.firebasestorage.app",
  messagingSenderId: "393859484462",
  appId: "1:393859484462:web:4282f4389321db2949c8bf",
  measurementId: "G-18CFS6Q3KX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// AUTH STATE LOGIC
auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById('auth-container');
    const mainWebsite = document.getElementById('main-website-content'); // Wrap your current site in this ID

    if (user) {
        // Logged In: Show website, Hide login
        authContainer.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        console.log("Welcome:", user.displayName || user.email);
    } else {
        // Logged Out: Show login, Hide website
        authContainer.classList.remove('hidden');
        mainWebsite.classList.add('hidden');
        
        // Reset to Landing Page view
        document.getElementById('landing-page').classList.remove('hidden');
        document.getElementById('login-page').classList.add('hidden');
    }
});

// AUTH UI FUNCTIONS 
function goToLoginPage() {
    const landing = document.getElementById('landing-page');
    const login = document.getElementById('login-page');

    if (landing && login) {
        landing.classList.add('hidden');
        login.classList.remove('hidden');
    }
}

// Google Authentication Logic

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google Login Success:", result.user.displayName);
        })
        .catch((error) => {
            console.error("Google Auth Error:", error.code);
            
            
            if (error.code === 'auth/popup-closed-by-user') {
                console.log("User closed the popup before finishing.");
            } else if (error.code === 'auth/cancelled-popup-request') {
                console.log("Only one popup can be opened at a time.");
            } else {
                alert("Google Sign-In Error: " + error.message);
            }
        });
}

function logout() {
    auth.signOut();
}

function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function setActive(element) {
    document.querySelectorAll('#sideMenu a').forEach(link => {
        link.classList.remove('active');
    });

    element.classList.add('active');
}

document.querySelectorAll('#sideMenu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('#sideMenu a').forEach(l => l.classList.remove('active-link'));
        this.classList.add('active-link');
    });
});



document.addEventListener("click", function (e) {
    const menu = document.getElementById("sideMenu");
    const button = document.querySelector(".menu-btn");

    // if click is NOT inside menu AND NOT on button
    if (!menu.contains(e.target) && !button.contains(e.target)) {
        menu.classList.remove("active");
    }
});

//theme dark mode light mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const btn = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "☀️ Light";
    } else {
        btn.innerHTML = "🌙 Dark";
    }
}

// Load saved theme
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeToggle").innerText = "☀️";
    }
});

const gitaVerses = [
    {
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
        translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
        reference: "BG 2.47",
        chapter: 2,
        verse: 47
    },
    {
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत | अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||",
        translation: "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharat, then I manifest Myself.",
        reference: "BG 4.7",
        chapter: 4,
        verse: 7
    },
    {
        sanskrit: "न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूय: |",
        translation: "The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be.",
        reference: "BG 2.20",
        chapter: 2,
        verse: 20
    },
    {
        sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम् | धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ||",
        translation: "To protect the righteous, to annihilate the wicked, and to reestablish the principles of dharma, I appear millennium after millennium.",
        reference: "BG 4.8",
        chapter: 4,
        verse: 8
    },
    {
        sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति | तदहं भक्त्युपहृतमश्नामि प्रयतात्मन: ||",
        translation: "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
        reference: "BG 9.26",
        chapter: 9,
        verse: 26
    },
    {
        sanskrit: "मन्मना भव मद्‍भक्तो मद्याजी मां नमस्कुरु | मामेवैष्यसि युक्त्वैवमात्मानं मत्परायण: ||",
        translation: "Always think of Me, become My devotee, worship Me and offer your homage unto Me.",
        reference: "BG 9.34",
        chapter: 9,
        verse: 34
    },
    {
        sanskrit: "योगस्थ: कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय | सिद्ध्यसिद्ध्यो: समो भूत्वा समत्वं योग उच्यते ||",
        translation: "Be steadfast in yoga, O Arjuna. Perform your duty and abandon all attachment to success or failure.",
        reference: "BG 2.48",
        chapter: 2,
        verse: 48
    },
    {
        sanskrit: "क्रोधाद्भवति सम्मोह: सम्मोहात्स्मृतिविभ्रम: | स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ||",
        translation: "From anger comes delusion; from delusion loss of memory; from loss of memory the destruction of discrimination.",
        reference: "BG 2.63",
        chapter: 2,
        verse: 63
    },
    {
        sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुच: ||",
        translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions.",
        reference: "BG 18.66",
        chapter: 18,
        verse: 66
    },
    {
        sanskrit: "यत्र योगेश्वर: कृष्णो यत्र पार्थो धनुर्धर: | तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ||",
        translation: "Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality.",
        reference: "BG 18.78",
        chapter: 18,
        verse: 78
    }
];

function updateVOTD() {
    // Logic: Get a number based on the current date
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    
    // Use modulo to pick a verse from the array (rotates through the 10 verses)
    const verseIndex = dayOfYear % gitaVerses.length;
    const todayVerse = gitaVerses[verseIndex];

    // Inject into HTML
    document.getElementById('dailySanskrit').innerText = todayVerse.sanskrit;
    document.getElementById('dailyTranslation').innerText = todayVerse.translation;
    document.getElementById('dailyReference').innerText = todayVerse.reference;

    // Store chapter and verse for the click event
    document.getElementById('votdContainer').setAttribute('data-ch', todayVerse.chapter);
    document.getElementById('votdContainer').setAttribute('data-vs', todayVerse.verse);
}

function openDailyVerse() {
    const container = document.getElementById('votdContainer');
    const ch = container.getAttribute('data-ch');
    const vs = container.getAttribute('data-vs');
    
    // Call your existing portal function
    if (typeof openVersePortal === "function") {
        openVersePortal(parseInt(ch), parseInt(vs));
    } else{
        console.log(`Opening Chapter ${ch}, Verse ${vs}`);
    }
}
//verse of the day upto this


//AUTHOR SECTION
// Intersection Observer for scroll reveal animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.author-card').forEach(card => {
    // Initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    
    observer.observe(card);
});
//AUTHOR SECTION TILL THIS

//WHO IS THIS GITA FOR(BENEFIT SECTION)
function sideScroll(direction) {
    const grid = document.querySelector('.benefit-grid');
    const scrollAmount = 330; // Card width + gap

    if (direction === 'left') {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
// Update the Progress Fill Bar
const benefitGrid = document.querySelector('.benefit-grid');
const progressFill = document.getElementById('scrollBar');

if (benefitGrid && progressFill) {
    benefitGrid.addEventListener('scroll', () => {
        const scrollTotal = benefitGrid.scrollWidth - benefitGrid.clientWidth;
        const scrollPosition = benefitGrid.scrollLeft;
        const scrollPercentage = (scrollPosition / scrollTotal) * 100;
        
        progressFill.style.width = scrollPercentage + "%";
    });
}


// 3. Initialize both sections
window.onload = () => {
    updateVOTD();
    loadChapterList();
};

//LEGENDS OF MAHABHARAT
const mahabharatLegends = [
  {
    name: "Krishna",
    desc: `Shri Krishna, revered as the eighth incarnation of <em>Lord Vishnu</em>, was born to Devaki and Vasudeva in the kingdom of Mathura during a time when <em>adharma</em> was rapidly spreading across Bharat. He was the cousin, guide, protector, and spiritual anchor of the Pandavas, especially Arjuna. Although Krishna vowed not to directly wield weapons in the Kurukshetra war, his wisdom, diplomacy, and divine strategy shaped the entire destiny of the Mahabharata. As Arjuna’s charioteer, Krishna delivered the eternal teachings of the <em>Bhagavad Gita</em>, explaining concepts such as <em>dharma</em>, <em>karma</em>, detachment, devotion, and self-realization. His role was not merely that of a warrior or king, but of a divine force restoring cosmic balance. Krishna constantly protected the Pandavas from destruction, whether through defeating tyrants like Kansa, guiding Draupadi during her humiliation, or revealing his terrifying <em>Vishvarūpa</em> to Arjuna on the battlefield.`,
    img: "images/krishna.jpg"
  },

  {
    name: "Arjuna",
    desc: `Arjuna, the third son of Kunti and spiritually fathered by <em>Indra</em>, was one of the greatest archers and warriors in the Mahabharata. He was the beloved disciple and closest companion of Krishna, sharing a bond that transcended ordinary friendship. Arjuna trained under <em>Dronacharya</em> and mastered divine weapons known as <em>astras</em>. His life was marked by discipline, courage, and devotion toward righteousness. Before the Kurukshetra war began, Arjuna became emotionally shattered upon seeing his own relatives, teachers, and loved ones standing on the battlefield. This moment of moral crisis became the foundation of the <em>Bhagavad Gita</em>, where Krishna guided him toward understanding his duty as a <em>kṣatriya</em>. Throughout the war, Arjuna played a decisive role by defeating mighty warriors such as Karna, Jayadratha, and countless others. His unwavering trust in Krishna symbolized the ideal relationship between the human soul and the divine.`,
    img: "images/arjuna.jpg"
  },

  {
    name: "Bheema",
    desc: `Bheema, the second Pandava and son of the wind god <em>Vayu</em>, was known for his unmatched physical strength, fierce loyalty, and fearless spirit. Among the Pandavas, Bheema represented raw power and determination. From childhood, he constantly protected his brothers from the schemes of the Kauravas, especially Duryodhana. During the exile of the Pandavas, Bheema defeated numerous demons and powerful enemies, proving himself to be a mighty warrior. In the Kurukshetra war, he fulfilled several important vows, including killing Dushasana for insulting Draupadi and ultimately defeating Duryodhana in the final mace battle. Though often seen as aggressive, Bheema possessed a deep sense of justice and immense love for his family. His contribution to the Mahabharata symbolized the force required to destroy evil when diplomacy and patience fail.`,
    img: "images/bheema.jpg"
  },

  {
    name: "Yudhisthira",
    desc: `Yudhisthira, the eldest of the Pandavas and son of <em>Dharma</em>, was widely respected as the embodiment of truth, morality, and righteousness. He was often addressed as <em>Dharmarāja</em> because of his unwavering commitment to honesty and ethical conduct. As the rightful heir to the throne of Hastinapura, Yudhisthira constantly faced political manipulation, betrayal, and emotional suffering at the hands of the Kauravas. His weakness for gambling led to the infamous dice game where the Pandavas lost their kingdom and Draupadi was humiliated in the royal court. Despite enduring exile and hardship, Yudhisthira never abandoned the path of <em>dharma</em>. During the Kurukshetra war, he remained the moral center of the Pandava army. After the war, he became the <em>rājā</em> of Hastinapura and ruled with wisdom, compassion, and justice.`,
    img: "images/yudhisthira.jpg"
  },

  {
  name: "Nakula",
  desc: `Nakula, the fourth of the five Pandavas, was the son of Madri and the divine twin physician <em>Ashwini Kumaras</em>. Renowned for his extraordinary beauty, elegance, and mastery in swordsmanship, Nakula was often considered the most graceful warrior among the Pandavas. Beyond his skills in battle, he possessed deep knowledge of horse training, medicine, and animal care, making him invaluable during both peace and war. Though quieter and less celebrated compared to Arjuna or Bheema, Nakula remained fiercely loyal to his brothers and devoted himself completely to the path of <em>dharma</em>. During the exile of the Pandavas, he endured hardship with dignity and continued serving his family with humility. In the Kurukshetra war, Nakula fought bravely against numerous warriors, contributing silently yet significantly to the Pandava victory.`,
  img: "images/nakula.jpg"
  },

  {
  name: "Sahadeva",
  desc: `Sahadeva, the youngest of the Pandavas and twin brother of Nakula, was also born through the blessings of the divine <em>Ashwini Kumaras</em>. He was known for his immense wisdom, intelligence, and mastery of astrology and strategy. Sahadeva possessed the rare ability to foresee future events, yet he remained bound by destiny and silence. Calm, disciplined, and deeply thoughtful, he often represented the intellectual strength of the Pandavas. Despite being soft-spoken, Sahadeva was a skilled warrior who fought fearlessly during the Kurukshetra war. He fulfilled his vow by killing Shakuni, the mastermind behind the deceitful dice game that ruined the Pandavas’ lives. Sahadeva’s character symbolized wisdom guided by patience, humility, and unwavering loyalty toward truth and family.`,
  img: "images/sahadeva.jpg"
  },

  {
  name: "Draupadi",
  desc: `Draupadi, born from the sacred fire of King Drupada’s yajña, was one of the most powerful and influential women in the Mahabharata. She became the wife of all five Pandavas due to divine destiny and played a central role in shaping the events of the epic. Draupadi was admired for her beauty, intelligence, courage, and fierce sense of dignity. Her humiliation in the Kaurava court after the dice game became one of the greatest turning points of the Mahabharata, exposing the moral downfall of the kingdom. During her darkest moment, she surrendered herself completely to <em>Shri Krishna</em>, who protected her honor miraculously. Draupadi’s pain, resilience, and unbreakable spirit became one of the strongest motivations behind the Kurukshetra war. She symbolized feminine strength, devotion, and the burning demand for justice against <em>adharma</em>.`,
  img: "images/draupadi.jpg"
  },

  {
  name: "Kunti",
  desc: `Kunti, the mother of the Pandavas, was one of the most resilient and spiritually strong women in the Mahabharata. Blessed with a divine mantra by sage <em>Durvasa</em>, she possessed the power to invoke celestial gods and bear children through their blessings. Before her marriage, she unknowingly gave birth to Karna through the grace of <em>Surya</em>, a secret that later became one of the greatest tragedies of the epic. After marrying King Pandu, Kunti became the mother of Yudhisthira, Bheema, and Arjuna through the blessings of Dharma, Vayu, and Indra. Throughout the countless struggles faced by the Pandavas, Kunti remained their emotional and moral pillar. She endured exile, political conspiracies, and immense personal suffering with patience and faith. Her life symbolized sacrifice, motherhood, endurance, and unwavering devotion toward righteousness.`,
  img: "images/kunti.jpg"
  },
{
  name: "Pandu",
  desc: `King Pandu, the father of the Pandavas, was the younger son of Vichitravirya and became the ruler of Hastinapura due to the blindness of his elder brother <em>Dhritarashtra</em>. He was known as a courageous warrior and capable king who expanded the glory of the Kuru dynasty through his victories and leadership. However, Pandu’s life took a tragic turn when he was cursed by sage Kindama after accidentally killing him while hunting. The curse declared that Pandu would die the moment he approached his wives with desire. Devastated, Pandu renounced royal life and retired to the forest with Kunti and Madri. Through divine blessings granted by sacred mantras, the Pandavas were born during this exile. Though Pandu did not directly participate in the events of the Mahabharata, his fate shaped the entire future of the Kuru dynasty and the eventual Kurukshetra war.`,
  img: "images/pandu.jpg"
},

{
  name: "Duryodhana",
  desc: `Duryodhana, the eldest of the Kauravas and son of <em>Dhritarashtra</em> and Gandhari, was one of the central antagonists of the Mahabharata. From childhood, he harbored deep jealousy and hatred toward the Pandavas, especially Bheema. Ambitious, proud, and power-hungry, Duryodhana refused to accept the Pandavas as rightful heirs to the throne of Hastinapura. Under the influence of his uncle Shakuni, he constantly plotted against them through conspiracies, manipulation, and deceit. His actions led to the infamous dice game where Draupadi was humiliated in the royal court, an event that ultimately paved the way for the Kurukshetra war. Despite his flaws, Duryodhana was also a fearless warrior and fiercely loyal friend to Karna. His refusal to abandon arrogance and greed symbolized the destructive consequences of ego and <em>adharma</em>.`,
  img: "images/duryodhana.jpg"
},

{
  name: "Kauravas",
  desc: `The Kauravas were the hundred sons of King <em>Dhritarashtra</em> and Queen Gandhari, led by their eldest brother Duryodhana. Raised in the royal palace of Hastinapura alongside the Pandavas, the Kauravas gradually developed rivalry, jealousy, and hatred toward their cousins. Influenced heavily by Shakuni’s manipulative guidance, they repeatedly attempted to destroy the Pandavas through conspiracies such as poisoning Bheema, the Lakshagriha incident, and the deceitful dice game. The Kauravas represented the growing dominance of greed, pride, and <em>adharma</em> within the Kuru dynasty. Though many among them were powerful warriors trained under Dronacharya, their loyalty to Duryodhana ultimately led them toward destruction. In the Kurukshetra war, nearly all the Kauravas perished, symbolizing the inevitable downfall of unrighteousness and arrogance.`,
  img: "images/kauravas.jpg"
},

{
  name: "Dhritarashtra",
  desc: `Dhritarashtra, the blind king of Hastinapura and father of the Kauravas, was a deeply tragic figure in the Mahabharata. Though physically powerful and knowledgeable, his blindness prevented him from becoming king initially, allowing his younger brother Pandu to ascend the throne. After Pandu’s retirement, Dhritarashtra ruled Hastinapura but struggled constantly between justice and his attachment toward his son Duryodhana. Despite understanding the righteousness of the Pandavas, he repeatedly failed to stop the growing injustice committed by the Kauravas. His emotional weakness, silence, and inability to punish wrongdoing played a major role in the destruction of the Kuru dynasty. Throughout the Mahabharata, Dhritarashtra symbolized the dangers of blind attachment and the consequences of failing to uphold <em>dharma</em> even when truth is clearly visible.`,
  img: "images/dhritarashtra.jpg"
},

{
  name: "Gandhari",
  desc: `Gandhari, the queen of Hastinapura and wife of <em>Dhritarashtra</em>, was admired for her devotion, sacrifice, and spiritual strength. After marrying the blind king, Gandhari voluntarily blindfolded herself for life to share her husband’s darkness and suffering. She became the mother of the hundred Kauravas, including Duryodhana. Despite her deep love for her sons, Gandhari understood the destructive path they were following and repeatedly advised Duryodhana to choose peace and righteousness. However, her warnings went unheard. After the devastating Kurukshetra war destroyed her entire family, Gandhari’s grief and anger became immeasurable. Her life represented sacrifice, motherhood, inner strength, and the painful consequences of unchecked ambition within a family divided by greed and ego.`,
  img: "images/gandhari.jpg"
},
{
  name: "Karna",
  desc: `Karna, one of the most tragic and powerful characters in the Mahabharata, was the secret son of <em>Kunti</em> and the sun god <em>Surya</em>. Born before Kunti’s marriage, he was abandoned at birth and raised by a humble charioteer family, causing him to face lifelong humiliation despite his extraordinary talents. Karna grew into a fearless warrior and unmatched archer whose skill rivaled even Arjuna. Denied recognition because of his social status, he found acceptance and friendship in Duryodhana, to whom he remained fiercely loyal throughout his life. Karna trained under <em>Parashurama</em> and possessed divine weapons and immense generosity, earning the title of one of the greatest donors in history. Though noble at heart, his loyalty toward Duryodhana placed him on the side of <em>adharma</em> during the Kurukshetra war. Karna’s life symbolized sacrifice, loyalty, pride, and the painful conflict between destiny and righteousness.`,
  img: "images/karna.jpg"
},

{
  name: "Bhishma",
  desc: `Bhishma, originally named Devavrata, was one of the greatest warriors and most respected elders in the Mahabharata. He was the son of King Shantanu and the river goddess <em>Ganga</em>. Bhishma became famous for his terrifying vow of lifelong celibacy and renunciation of the throne so that his father could marry Satyavati. This unimaginable sacrifice earned him the name “Bhishma,” meaning the one who takes a dreadful vow. A master of warfare, politics, and wisdom, Bhishma became the protector and pillar of the Kuru dynasty for generations. Though he deeply loved the Pandavas and understood the righteousness of their cause, he remained bound by his duty toward Hastinapura and fought for the Kauravas in the Kurukshetra war. Bhishma possessed the boon of choosing the moment of his own death and finally fell upon a bed of arrows created by Arjuna. His life symbolized sacrifice, duty, discipline, and the painful burden of loyalty.`,
  img: "images/bhishma.jpg"
},

{
  name: "Dronacharya",
  desc: `Dronacharya, the royal guru of both the Pandavas and Kauravas, was one of the greatest teachers of warfare and divine weapons in the Mahabharata. Born to sage Bharadwaja, Drona possessed immense knowledge of military science, archery, and celestial <em>astras</em>. He trained the princes of Hastinapura and played a crucial role in shaping warriors such as Arjuna, whom he considered his most talented disciple. Though respected for his wisdom and mastery, Dronacharya’s life was also marked by pride, revenge, and emotional conflict. His desire to avenge his humiliation by King Drupada influenced many events within the epic. During the Kurukshetra war, Drona fought on the side of the Kauravas due to his loyalty toward the throne of Hastinapura. He became nearly invincible on the battlefield until he was emotionally broken by the false news of his son Ashwatthama’s death. Dronacharya symbolized knowledge, discipline, and the tragic consequences of attachment and ambition.`,
  img: "images/dronacharya.jpg"
},

{
  name: "Ashwatthama",
  desc: `Ashwatthama, the son of <em>Dronacharya</em>, was a fierce warrior and one of the most feared fighters in the Mahabharata. Born with a divine gem on his forehead that granted him power and protection, Ashwatthama was considered an incarnation of destructive energy. He was deeply attached to his father and carried immense pride in his lineage and warrior abilities. During the Kurukshetra war, Ashwatthama fought alongside the Kauravas and became consumed by rage after Dronacharya’s death. Blinded by revenge, he committed one of the darkest acts of the epic by attacking the sleeping sons of the Pandavas during the night. His uncontrolled anger and violence led to Lord Krishna cursing him with immortality filled with suffering and isolation. Ashwatthama’s story symbolized the devastating consequences of vengeance, uncontrolled wrath, and the misuse of power.`,
  img: "images/ashwatthama.jpg"
},
{
  name: "Vidura",
  desc: `Vidura, the wise minister of Hastinapura, was one of the most righteous and intellectually gifted figures in the Mahabharata. Born through sage <em>Vyasa</em> and a maidservant of the palace, Vidura was the half-brother of Dhritarashtra and Pandu. Though denied the throne because of his birth status, he became the moral compass of the Kuru kingdom through his wisdom, honesty, and deep understanding of <em>dharma</em>. Vidura repeatedly warned Dhritarashtra against Duryodhana’s jealousy and the growing injustice toward the Pandavas, but his advice was often ignored. He openly opposed the humiliation of Draupadi during the dice game and constantly attempted to prevent the destruction of the Kuru dynasty. Detached from greed and power, Vidura symbolized truth, wisdom, and fearless righteousness in a kingdom consumed by ambition and ego.`,
  img: "images/vidura.jpg"
},

{
  name: "Sanjaya",
  desc: `Sanjaya was the loyal advisor and charioteer of King <em>Dhritarashtra</em> in the Mahabharata. Blessed with divine vision by sage Vyasa, Sanjaya possessed the extraordinary ability to witness and narrate the events of the Kurukshetra war in real time despite being far away from the battlefield. Through his narration, the blind king Dhritarashtra was able to hear every detail of the war, including the sacred conversation between Krishna and Arjuna that became the <em>Bhagavad Gita</em>. Calm, wise, and deeply observant, Sanjaya often spoke with honesty and compassion while describing the tragic destruction caused by greed and pride. His role in the Mahabharata symbolized truth, awareness, and the responsibility of witnessing history with clarity and sincerity.`,
  img: "images/sanjaya.jpg"
},

{
  name: "Abhimanyu",
  desc: `Abhimanyu, the courageous son of <em>Arjuna</em> and Subhadra, was one of the brightest young warriors in the Mahabharata. From childhood, he inherited extraordinary valor, skill, and warrior spirit from his father and the Yadava lineage of Krishna. Abhimanyu became famous for his knowledge of entering the deadly <em>Chakravyuha</em> battle formation, which he had learned while still in his mother’s womb. During the Kurukshetra war, when the Pandava army faced immense danger, Abhimanyu fearlessly entered the Chakravyuha despite knowing only how to break into it and not escape from it. Surrounded unfairly by multiple powerful warriors, he fought with unmatched bravery until his final breath. His heroic sacrifice became one of the most emotional moments of the Mahabharata and ignited intense fury within the Pandavas. Abhimanyu symbolized youthful courage, sacrifice, and unwavering devotion toward duty and honor.`,
  img: "images/abhimanyu.jpg"
},
];


function openPersona() {
    document.getElementById('personaPortal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    const menu = document.getElementById('personaMenuList');
    menu.innerHTML = mahabharatLegends.map((c, i) => 
        `<div class="menu-item" onclick="showCharacter(${i})">${i+1}. ${c.name}</div>`
    ).join('');
}

function closePersona() {
    document.getElementById('personaPortal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showCharacter(index) {
    const char = mahabharatLegends[index];
    document.getElementById('grandEntry').style.display = 'none';
    document.getElementById('characterDetailView').style.display = 'block';
    
    document.getElementById('charImg').src = char.img;
    document.getElementById('charName').innerText = char.name;
    document.getElementById('charDesc').innerHTML = char.desc;

    // Active State Styling
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.menu-item')[index].classList.add('active');
}

function resetPersonaDisplay() {
    document.getElementById('grandEntry').style.display = 'block';
    document.getElementById('characterDetailView').style.display = 'none';
}

//18 SPIRITUAL CHAPTERS
const gitaChapters = [
    { num: 1, name: "Arjuna Vishada Yoga", subtitle: "The Yoga of Arjuna's Dejection", verses: 47 },
    { num: 2, name: "Sankhya Yoga", subtitle: "The Yoga of Knowledge", verses: 72 },
    { num: 3, name: "Karma Yoga", subtitle: "The Yoga of Action", verses: 43 },
    { num: 4, name: "Jnana Karma Sanyasa Yoga", subtitle: "The Yoga of Knowledge and the Disciplines of Action", verses: 42 },
    { num: 5, name: "Karma Sanyasa Yoga", subtitle: "The Yoga of Renunciation", verses: 29 },
    { num: 6, name: "Dhyana Yoga", subtitle: "The Yoga of Meditation", verses: 47 },
    { num: 7, name: "Jnana Vijnana Yoga", subtitle: "The Yoga of Knowledge and Wisdom", verses: 30 },
    { num: 8, name: "Akshara Brahma Yoga", subtitle: "The Yoga of the Imperishable Brahman", verses: 28 },
    { num: 9, name: "Raja Vidya Raja Guhya Yoga", subtitle: "The Yoga of the Sovereign Science and the Sovereign Secret", verses: 34 },
    { num: 10, name: "Vibhuti Yoga", subtitle: "The Yoga of Divine Splendour", verses: 42 },
    { num: 11, name: "Vishwarupa Darshana Yoga", subtitle: "The Yoga of the Vision of the Universal Form", verses: 55 },
    { num: 12, name: "Bhakti Yoga", subtitle: "The Yoga of Devotion", verses: 20 },
    { num: 13, name: "Kshetra Kshetrajna Vibhaga Yoga", subtitle: "The Yoga of Discrimination between the Field and the Knower of the Field", verses: 35 },
    { num: 14, name: "Gunatraya Vibhaga Yoga", subtitle: "The Yoga of Differentiation of the Three Gunas", verses: 27 },
    { num: 15, name: "Purushottama Yoga", subtitle: "The Yoga of the Supreme Person", verses: 20 },
    { num: 16, name: "Daivasura Sampad Vibhaga Yoga", subtitle: "The Yoga of Discrimination between the Divine and the Demonic", verses: 24 },
    { num: 17, name: "Shraddhatraya Vibhaga Yoga", subtitle: "The Yoga of the Threefold Division of Faith", verses: 28 },
    { num: 18, name: "Moksha Sanyasa Yoga", subtitle: "The Yoga of Liberation and Renunciation", verses: 78 }
];

let currentChapterData = [];
let currentVerseIndex = 0;

// 2. Load the 18 Chapters on Main Page
function loadChapterList() {
    const list = document.getElementById('chapterListContainer');
    list.innerHTML = gitaChapters.map(chap => `
        <div class="chapter-box" onclick="openChapter(${chap.num})">
            <div class="chapter-meta">
                <span class="chap-num">Chapter ${chap.num}</span>
                <span class="verse-count">${chap.verses} Verses</span>
            </div>
            <h3 class="chap-name">${chap.name}</h3>
            <p class="chap-subtitle">${chap.subtitle}</p>
        </div>
    `).join('');
}

//search bar
function handleVerseSearch() {
    const input = document.getElementById('chapterSearch').value.trim();

    // Check empty input
    if (input === "") {
        alert("Please enter chapter.verse (e.g. 2.47)");
        return;
    }

    // Check correct format
    if (!input.includes(".")) {
        alert("Format should be: chapter.verse (e.g. 2.47)");
        return;
    }

    const parts = input.split(".");

    // Ensure only 2 parts (avoid 2.4.5 type mistakes)
    if (parts.length !== 2) {
        alert("Invalid format. Use only one dot like 2.47");
        return;
    }

    const chapterNum = parseInt(parts[0]);
    const verseNum = parseInt(parts[1]);

    // Validate numbers
    if (isNaN(chapterNum) || isNaN(verseNum)) {
        alert("Only numbers allowed. Example: 2.47");
        return;
    }

    // Open verse
    openVersePortal(chapterNum, verseNum);
}

document.getElementById('chapterSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleVerseSearch();
    }
});



// 3. Open Verse Portal
// Variable to track current state

function openChapter(num) {
    const portal = document.getElementById('versePortal');
    portal.style.display = 'block';
    
    const dataName = `chapter${num}Data`;
    
    // This will print to your console (F12)
    console.log("Attempting to load:", dataName);
    console.log("Is it available in window?", window[dataName] !== undefined);

    if (window[dataName]) {
        currentChapterData = window[dataName];
        currentVerseIndex = 0;
        displayVerse(0);
    } else {
        // If this runs, the variable 'chapterXData' was not found
        document.getElementById('topHeaderTitle').innerText = "Data Missing";
        console.error("Variable not found. Ensure var " + dataName + " is defined in your ch.js file.");
    }
}
function displayVerse(index) {
    if (!currentChapterData || currentChapterData.length === 0) return;
    const v = currentChapterData[index];

    // Get the Portal Elements
    const portalSanskrit = document.getElementById('portalSanskrit');
    const portalTranslit = document.getElementById('portalTransliteration');
    const portalTranslation = document.getElementById('portalTranslation');
    const portalPurport = document.getElementById('portalPurport');
    const portalHeader = document.getElementById('portalHeader');
    const verseCounter = document.getElementById('verseCounter');

    // Update simple text fields
    if (portalHeader) portalHeader.innerText = `Chapter ${v.chapter || 1} | Verse ${v.verse}`;
    if (portalSanskrit) portalSanskrit.innerText = v.sanskrit;
    if (portalTranslit) portalTranslit.innerText = v.transliteration;
    if (portalTranslation) portalTranslation.innerText = v.translation;

    // --- THE ABSOLUTE FIX ---
    // We MUST use innerHTML here. If you use innerText, the <p> tags show up as text.
    if (portalPurport) {
        portalPurport.innerHTML = v.purport;
    }

    if (verseCounter) {
        verseCounter.innerText = `Verse ${index + 1} of ${currentChapterData.length}`;
    }
}



function closeVersePortal() {
    document.getElementById('versePortal').style.display = 'none';
    document.body.style.overflow = 'auto';
}


//FAMOUS VERSES


function openVersePortal(chapterNum, verseNum) {
    // 1. Identify which data to use based on the chapter number
    const dataName = `chapter${chapterNum}Data`;
    const data = window[dataName];

    // Check if the chapter data file is actually loaded
    if (!data) {
        console.error(`${dataName} not found. Make sure data/ch${chapterNum}.js is linked in your HTML.`);
        alert(`Data for Chapter ${chapterNum} is not loaded yet.`);
        return;
    }

    // 2. Find the index of the specific verse number
    // We use .findIndex because verse 47 might be at index 46, but it's safer to check
    const verseIndex = data.findIndex(v => v.verse === verseNum);

    if (verseIndex !== -1) {
        // 3. Set your global variables (the ones your portal uses to track current state)
        currentChapterData = data;
        currentVerseIndex = verseIndex;
        
        // 4. Show the portal UI
        const portal = document.getElementById('versePortal');
        if (portal) {
            portal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Stop background scrolling
            
            // 5. Call your existing function that fills the portal with text
            displayVerse(verseIndex);
        }
    } else {
        alert("Verse " + verseNum + " not found in the Chapter " + chapterNum + " data.");
    }
}

function nextVerse() {
    if (currentVerseIndex < currentChapterData.length - 1) {
        currentVerseIndex++;
        displayVerse(currentVerseIndex);
        // Reset scroll position to top when changing verses
        document.querySelector('.portal-scroll-area').scrollTop = 0;
    }
}

function prevVerse() {
    if (currentVerseIndex > 0) {
        currentVerseIndex--;
        displayVerse(currentVerseIndex);
        document.querySelector('.portal-scroll-area').scrollTop = 0;
    }
}


//FAQ
/**
 * Toggles the FAQ accordion items
 * @param {HTMLElement} element - The question div that was clicked
 */
function toggleFAQ(element) {
    const currentItem = element.parentElement; // The .faq-item
    const allItems = document.querySelectorAll('.faq-item');

    // 1. Loop through all items to close others (Optional: Accordion mode)
    allItems.forEach(item => {
        if (item !== currentItem) {
            item.classList.remove('active');
        }
    });
    currentItem.classList.toggle('active');
}