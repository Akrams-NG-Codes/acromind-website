export const SITE_URL = 'https://acromind.org'

export const ORGANIZATION = {
  name: 'AcroMind Initiative',
  legalName: 'AcroMind Initiative Limited',
  location: 'Kampala, Uganda',
  founded: 2023,
  address: 'P.O. Box 182433, Kampala, Uganda',
  email: 'olangoacrobat@gmail.com',
  phone: '+256 781 461 282',
  whatsapp: '+256 781 461 282',
  mission: 'To empower children and youth through circus arts, acrobatics, creative expression, and community engagement, fostering confidence, wellbeing, discipline, and positive life choices.',
  vision: 'A world where every child and young person has access to safe, creative spaces that nurture their talents, dignity, and future potential — with a long-term vision of establishing a permanent Circus Center in Uganda.',
  coreValues: ['Safety', 'Creativity', 'Inclusion', 'Empowerment', 'Community'],
}

export const IMPACT_STATS = [
  { number: '500+', label: 'Children & Youth Reached' },
  { number: '12+', label: 'Workshops Delivered' },
  { number: '100+', label: 'Artists & Volunteers Trained' },
  { number: '5+', label: 'Communities Served' },
]

export const PROGRAMS = [
  {
    id: 1,
    title: 'ACROMIND Community Workshops',
    icon: 'Users',
    description: 'Multi-day intensive circus and acrobatics activities bringing together children and youth. Provides a structured yet joyful learning environment where participants develop physical skills, teamwork, and self-confidence.',
    highlights: ['Multi-day intensive sessions', 'Physical skill development', 'Team building and cooperation'],
  },
  {
    id: 2,
    title: 'Youth Empowerment through Circus Arts',
    icon: 'Sparkles',
    description: 'Uses circus arts as a vehicle for personal development and positive life choices. Young people learn discipline, resilience, and creative expression while discovering talents they never knew they had.',
    highlights: ['Mentorship programs', 'Creative skill development', 'Performance opportunities'],
  },
  {
    id: 3,
    title: 'Safeguarding & Safe Spaces',
    icon: 'Shield',
    description: 'Provides safeguarding orientation and training for all artists and volunteers, ensuring every interaction is safe, respectful, and empowering. Programs are designed with child protection at their core.',
    highlights: ['Safeguarding training', 'Child protection policies', 'Safe creative environments'],
  },
  {
    id: 4,
    title: 'Community Performances & Outreach',
    icon: 'Star',
    description: 'Public performances, holiday celebrations, and community shows that bring joy to neighborhoods while showcasing the incredible talents of young artists. These events build community pride and visibility.',
    highlights: ['Public performances', 'Holiday celebrations', 'Community engagement'],
  },
]

export const IMPACT_AREAS = [
  {
    title: 'Physical Development',
    description: 'Strength, flexibility, coordination, and body awareness through circus training.',
  },
  {
    title: 'Psychosocial Wellbeing',
    description: 'Self-confidence, emotional resilience, and positive peer relationships.',
  },
  {
    title: 'Community Cohesion',
    description: 'Bringing neighborhoods together through performances and shared creative experiences.',
  },
  {
    title: 'Child Protection',
    description: 'Safeguarding training ensures all activities are safe, inclusive, and protective.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'Before AcroMind, I spent my days on the streets. Now I have something I love, friends who support me, and a dream to become a professional performer.',
    role: 'Community Workshop Graduate',
  },
  {
    quote: 'The safeguarding training completely changed how I work with children. I now understand how to create truly safe environments for creativity.',
    role: 'Trained Facilitator',
  },
  {
    quote: 'My children come home excited after every session. The confidence I see in them now — it\'s something I never imagined possible.',
    role: 'Kampala Community',
  },
]

export const HERO_IMAGE_URL =
  '/images/WhatsApp%20Image%202026-05-09%20at%207.28.33%20AM.jpeg'

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'Impact', href: '/impact' },
  { name: 'Contact', href: '/contact' },
  { name: 'Donate', href: '/donate' },
]

export const DEFAULT_EVENTS = [
  {
    id: 'event-1',
    title: 'Community Circus Showcase',
    description: 'A family-friendly performance featuring acrobatics, juggling, and dance by our talented youth performers.',
    date: '2026-06-20',
    time: '4:00 PM',
    location: 'Kampala Community Park',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.28%20AM.jpeg',
    event_type: 'Performance',
    status: 'upcoming',
    is_featured: true,
  },
  {
    id: 'event-2',
    title: 'Youth Acrobatics Workshop',
    description: 'A hands-on workshop for children and young people to learn balance, strength, and teamwork through circus arts.',
    date: '2026-07-05',
    time: '10:00 AM',
    location: 'AcroMind Training Center',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.29%20AM.jpeg',
    event_type: 'Workshop',
    status: 'upcoming',
    is_featured: false,
  },
  {
    id: 'event-3',
    title: 'Holiday Performance & Outreach',
    description: 'Join us for a holiday outreach event celebrating community, creativity, and youth empowerment through circus arts.',
    date: '2026-08-12',
    time: '3:00 PM',
    location: 'Central Community Hall',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.32%20AM.jpeg',
    event_type: 'Outreach',
    status: 'upcoming',
    is_featured: false,
  },
]

export const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'gallery-1',
    title: 'Rehearsal in Progress',
    description: 'Young performers train together, building strength and confidence.',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.32%20AM%20(1).jpeg',
    category: 'Workshop',
    order_index: 1,
    is_featured: true,
  },
  {
    id: 'gallery-2',
    title: 'Circus Arts Performance',
    description: 'A dynamic showcase filled with acrobatics, juggling, and smiles.',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.32%20AM%20(2).jpeg',
    category: 'Performance',
    order_index: 2,
    is_featured: true,
  },
  {
    id: 'gallery-3',
    title: 'Creative Movement',
    description: 'Children practicing together in a beautifully lit training space.',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.32%20AM%20(3).jpeg',
    category: 'Training',
    order_index: 3,
    is_featured: false,
  },
  {
    id: 'gallery-4',
    title: 'Community Celebration',
    description: 'A joyful moment at a community circus festival.',
    image_url: '/images/WhatsApp%20Image%202026-05-09%20at%207.28.33%20AM%20(1).jpeg',
    category: 'Festival',
    order_index: 4,
    is_featured: false,
  },
]
