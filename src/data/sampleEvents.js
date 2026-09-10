/**
 * Sample realistic events for Campus Events Hub.
 * Uses dynamic date offsets so sample deadlines are always realistic and predictable.
 */

function getDateOffsetString(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const CATEGORIES = [
  'All',
  'Arts',
  'Drama',
  'Singing',
  'Dancing',
  'Sports',
  'Yoga',
  'Hackathon',
  'Technical',
  'Cultural',
  'Workshop',
  'Competition',
  'Other'
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    name: 'HackPulse 2026: 36-Hour National Hackathon',
    description: 'A national-level inter-college hackathon focusing on AI agents, decentralized tech, and smart campus solutions. Teams of up to 4 can participate. Mentors from top tech firms will be present.',
    eventType: 'Inter-College',
    category: 'Hackathon',
    date: getDateOffsetString(6),
    time: '09:00 AM - 09:00 PM',
    venue: 'Tech Innovation Hub, Block C',
    college: 'Metropolitan Institute of Technology',
    registrationDeadline: getDateOffsetString(2) // 2 days away -> "Registration closes in 2 days."
  },
  {
    id: 'evt-2',
    name: 'Hamlet Redux: Annual College Play',
    description: 'An electrifying modern adaptation of Shakespeare\'s Hamlet performed by our very own Dramatics Club. Directed by Prof. Ramanathan with live orchestral background score.',
    eventType: 'My College',
    category: 'Drama',
    date: getDateOffsetString(4),
    time: '06:00 PM - 08:30 PM',
    venue: 'Main Auditorium, North Campus',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(1) // 1 day away -> "Registration closes in 1 day"
  },
  {
    id: 'evt-3',
    name: 'StepUp 2026: Inter-College Dance Championship',
    description: 'Solo, duet, and crew battles across Hip-Hop, Contemporary, and Classical Fusion. Huge cash prizes, celebrity judges, and participation trophies for all qualified finalists.',
    eventType: 'Inter-College',
    category: 'Dancing',
    date: getDateOffsetString(12),
    time: '11:00 AM - 05:00 PM',
    venue: 'Open Air Amphitheatre',
    college: 'St. Xavier\'s Arts & Science College',
    registrationDeadline: getDateOffsetString(7)
  },
  {
    id: 'evt-4',
    name: 'Campus Sunrise Yoga & Mindfulness Session',
    description: 'Start your weekend with certified yoga masters and breathing practitioners. Free organic smoothies and yoga mats provided for all registered campus students.',
    eventType: 'My College',
    category: 'Yoga',
    date: getDateOffsetString(3),
    time: '06:30 AM - 08:00 AM',
    venue: 'Sports Pavilion Green Lawns',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(2) // 2 days away -> "Registration closes in 2 days."
  },
  {
    id: 'evt-5',
    name: 'Voice of Campus: Solo & Duet Singing Idol',
    description: 'Western and Indian classical vocal showcase. Sing your heart out on the grand stage with professional acoustic setup and student band accompaniment.',
    eventType: 'Inter-College',
    category: 'Singing',
    date: getDateOffsetString(9),
    time: '03:00 PM - 07:00 PM',
    venue: 'Silver Jubilee Hall',
    college: 'City Engineering University',
    registrationDeadline: getDateOffsetString(5)
  },
  {
    id: 'evt-6',
    name: 'Inter-Department Football Premier League',
    description: 'The premier knockout football championship between all engineering and humanities branches. Come support your department players or participate in the squad.',
    eventType: 'My College',
    category: 'Sports',
    date: getDateOffsetString(8),
    time: '04:00 PM - 07:30 PM',
    venue: 'Central Sports Arena',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(4)
  },
  {
    id: 'evt-7',
    name: 'Modern Web Development with AI Agents Workshop',
    description: 'Hands-on workshop exploring prompt engineering, modern front-end tooling, and embedding intelligent agentic features into web products.',
    eventType: 'Inter-College',
    category: 'Workshop',
    date: getDateOffsetString(14),
    time: '10:00 AM - 02:00 PM',
    venue: 'Computing Lab 4, IT Wing',
    college: 'National University of Sciences',
    registrationDeadline: getDateOffsetString(10)
  },
  {
    id: 'evt-8',
    name: 'Sanskriti 2026: Grand Cultural Festival',
    description: 'Our flagship multi-day celebration featuring ethnic fashion parades, food stalls, acoustic nights, flash mobs, and art exhibitions celebrating regional traditions.',
    eventType: 'My College',
    category: 'Cultural',
    date: getDateOffsetString(18),
    time: '10:00 AM - 10:00 PM',
    venue: 'Campus Quadrangle & Lawns',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(14)
  },
  {
    id: 'evt-9',
    name: 'Canvas & Charcoal: Live Painting Competition',
    description: 'Theme will be revealed on the spot! Bring your own colors or use the acrylic and charcoal kits provided by the Fine Arts Council.',
    eventType: 'Inter-College',
    category: 'Arts',
    date: getDateOffsetString(7),
    time: '01:00 PM - 04:30 PM',
    venue: 'Design Studio Studio 2',
    college: 'Heritage College of Fine Arts',
    registrationDeadline: getDateOffsetString(3) // 3 days away -> "Registration closes in 3 days"
  },
  {
    id: 'evt-10',
    name: 'RoboWars & Line Follower Clash',
    description: 'Combat robotics arena tournament! Battle bot weight class up to 15kg. Autonomous line follower sprint track and obstacle arena included.',
    eventType: 'Inter-College',
    category: 'Competition',
    date: getDateOffsetString(15),
    time: '10:30 AM - 06:00 PM',
    venue: 'Indoor Sports Complex',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(8)
  },
  {
    id: 'evt-11',
    name: 'Cloud Computing & Kubernetes Hands-On Lab',
    description: 'Deep dive into microservices deployment, container orchestration, and real-world devops practices with certified cloud architects.',
    eventType: 'My College',
    category: 'Technical',
    date: getDateOffsetString(11),
    time: '02:00 PM - 05:00 PM',
    venue: 'Seminar Hall B',
    college: 'Apex Institute of Technology',
    registrationDeadline: ''
  },
  {
    id: 'evt-12',
    name: 'Campus Chess Grand Prix',
    description: 'FIDE-rated rapid chess tournament with 5 rounds of swiss system pairings. Open to all students and faculty.',
    eventType: 'My College',
    category: 'Other',
    date: getDateOffsetString(5),
    time: '02:00 PM - 06:00 PM',
    venue: 'Student Activity Center',
    college: 'Apex Institute of Technology',
    registrationDeadline: getDateOffsetString(2)
  }
];
