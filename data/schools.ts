export interface School {
  slug: string
  name: string
  shortName: string
  grades: string
  fraserRating?: number         // out of 10, undefined = not ranked
  frenchImmersion: boolean
  address: string
  phone: string
  website: string
  description: string
  programs: string[]
  catchmentNeighbourhoods: string[]  // neighbourhood slugs
  principalNote?: string
  type: 'elementary' | 'middle' | 'secondary'
}

export const schools: School[] = [
  {
    slug: 'garibaldi-highlands-elementary',
    name: 'Garibaldi Highlands Elementary',
    shortName: 'GHE',
    grades: 'K–6',
    fraserRating: 6.1,
    frenchImmersion: false,
    address: '40303 Plateau Dr, Squamish, BC V8B 0B7',
    phone: '604-898-3491',
    website: 'https://ghe.sd48seatosky.org',
    description:
      'The highest-rated elementary school in Squamish by Fraser Institute (6.1/10). Garibaldi Highlands Elementary serves the most sought-after family catchment in the city — families routinely factor this school into their home purchase decision. Mature neighbourhood, strong parent community, excellent results.',
    programs: ['Strong Academics', 'Active Parent Community', 'Arts Programs', 'Outdoor Education'],
    catchmentNeighbourhoods: ['garibaldi-highlands', 'garibaldi-estates'],
    principalNote:
      'Families consistently report this school as a key reason they chose Garibaldi Highlands. The Fraser 6.1/10 rating is the highest in the district — and the catchment commands a measurable price premium.',
    type: 'elementary',
  },
  {
    slug: 'squamish-elementary',
    name: 'Squamish Elementary',
    shortName: 'SE',
    grades: 'K–6',
    fraserRating: 5.7,
    frenchImmersion: true,
    address: '1025 Thunderbird Rd, Squamish, BC V8B 0C7',
    phone: '604-898-3488',
    website: 'https://se.sd48seatosky.org',
    description:
      'Squamish Elementary serves the downtown core and surrounding neighbourhoods. Home to the district\'s French Immersion program for the Howe Sound feeder area — a key draw for families wanting a bilingual education pathway from Kindergarten through secondary school.',
    programs: ['French Immersion (K–6)', 'Arts Integration', 'Outdoor Learning', 'Community Partnerships'],
    catchmentNeighbourhoods: ['downtown-squamish', 'sea-and-sky', 'oceanfront-squamish'],
    type: 'elementary',
  },
  {
    slug: 'valleycliffe-elementary',
    name: 'Valleycliffe Elementary',
    shortName: 'VE',
    grades: 'K–6',
    fraserRating: 5.5,
    frenchImmersion: false,
    address: '38625 Buckley Ave, Squamish, BC V8B 0B1',
    phone: '604-898-3492',
    website: 'https://ve.sd48seatosky.org',
    description:
      'Serving Squamish\'s original residential neighbourhood, Valleycliffe Elementary is a well-established community school with strong parent engagement. Located in one of Squamish\'s best-value SFH neighbourhoods — families get excellent school access at lower entry price points than Garibaldi Highlands.',
    programs: ['Place-Based Learning', 'Outdoor Education', 'Arts Programs', 'Strong PAC'],
    catchmentNeighbourhoods: ['valleycliffe', 'hospital-hill', 'crumpit-woods', 'dentville', 'northyards'],
    type: 'elementary',
  },
  {
    slug: 'brackendale-elementary',
    name: 'Brackendale Elementary',
    shortName: 'BE',
    grades: 'K–6',
    fraserRating: 5.2,
    frenchImmersion: false,
    address: '41717 Government Rd, Squamish, BC V0N 1H0',
    phone: '604-898-3484',
    website: 'https://be.sd48seatosky.org',
    description:
      'Serving Squamish\'s northernmost community, Brackendale Elementary is a small, tight-knit school with a strong nature-based education philosophy. Surrounded by the Squamish River estuary and Eagle Run — the school community reflects the village atmosphere Brackendale is known for.',
    programs: ['Nature-Based Learning', 'Eagle Festival Involvement', 'Arts', 'Small Class Sizes'],
    catchmentNeighbourhoods: ['brackendale', 'tantalus'],
    type: 'elementary',
  },
  {
    slug: 'mamquam-elementary',
    name: 'Mamquam Elementary',
    shortName: 'ME',
    grades: 'K–6',
    fraserRating: 5.2,
    frenchImmersion: false,
    address: '40351 Tantalus Rd, Squamish, BC V8B 0B8',
    phone: '604-898-3490',
    website: 'https://me.sd48seatosky.org',
    description:
      'Mamquam Elementary serves the Garibaldi Estates and University Heights communities. A solid neighbourhood school with good community engagement — families who can\'t access the Garibaldi Highlands catchment often find excellent value purchasing in Garibaldi Estates for similar school-district access.',
    programs: ['Strong Academics', 'Outdoor Education', 'Music Programs', 'Community Involvement'],
    catchmentNeighbourhoods: ['garibaldi-estates', 'university-heights'],
    type: 'elementary',
  },
  {
    slug: 'britannia-beach-elementary',
    name: 'Britannia Beach Elementary',
    shortName: 'BBE',
    grades: 'K–6',
    fraserRating: undefined,
    frenchImmersion: false,
    address: 'Britannia Beach, BC V0N 1J0',
    phone: '604-896-2220',
    website: 'https://www.sd48seatosky.org',
    description:
      'One of BC\'s smallest and most unique schools, Britannia Beach Elementary serves the historic mining village community south of Squamish. Small class sizes, multi-grade classrooms, and an intimate community feel. For families buying in Britannia Beach, this is a charming local school — older students typically travel north for middle and secondary.',
    programs: ['Multi-Grade Classrooms', 'Heritage Learning', 'Small Class Sizes', 'Outdoor Coastal Education'],
    catchmentNeighbourhoods: ['britannia-beach'],
    type: 'elementary',
  },
  {
    slug: 'don-ross-middle',
    name: 'Don Ross Middle School',
    shortName: 'DRMS',
    grades: '7–9',
    fraserRating: undefined,
    frenchImmersion: true,
    address: '38175 Chestnut Ave, Squamish, BC V8B 0G3',
    phone: '604-898-3487',
    website: 'https://drms.sd48seatosky.org',
    description:
      'Don Ross Middle School serves all of Squamish for grades 7–9, making it the central transition school for every neighbourhood. Home to the French Immersion continuation program — students from Squamish Elementary\'s FI stream continue here seamlessly. Strong electives program and a well-regarded sports program.',
    programs: [
      'French Immersion (7–9)',
      'Expanded Electives',
      'Sports Programs',
      'Leadership Programs',
      'Arts & Music',
    ],
    catchmentNeighbourhoods: [
      'downtown-squamish', 'valleycliffe', 'hospital-hill', 'garibaldi-highlands',
      'garibaldi-estates', 'brackendale', 'tantalus', 'university-heights',
      'dentville', 'northyards', 'sea-and-sky', 'britannia-beach', 'oceanfront-squamish',
    ],
    type: 'middle',
  },
  {
    slug: 'howe-sound-secondary',
    name: 'Howe Sound Secondary',
    shortName: 'HSS',
    grades: '10–12',
    fraserRating: undefined,
    frenchImmersion: true,
    address: '1375 Highway 99, Squamish, BC V8B 0G6',
    phone: '604-898-3486',
    website: 'https://hss.sd48seatosky.org',
    description:
      'Howe Sound Secondary is Squamish\'s only high school, serving the entire community for grades 10–12. Offers the French Immersion graduation pathway, a robust trades and career program, advanced academic courses, and one of the best school-based outdoor education programs in BC. Graduates have strong post-secondary acceptance rates.',
    programs: [
      'French Immersion Graduation',
      'IB Preparation Courses',
      'Trades & Career Education',
      'Outdoor Education',
      'Sports Excellence',
      'Arts & Theatre',
      'AP Courses',
    ],
    catchmentNeighbourhoods: [
      'downtown-squamish', 'valleycliffe', 'hospital-hill', 'garibaldi-highlands',
      'garibaldi-estates', 'brackendale', 'tantalus', 'university-heights',
      'dentville', 'northyards', 'sea-and-sky', 'britannia-beach', 'oceanfront-squamish',
    ],
    type: 'secondary',
  },
]

export function getSchool(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug)
}

export function getSchoolsForNeighbourhood(neighbourhoodSlug: string): School[] {
  return schools.filter((s) => s.catchmentNeighbourhoods.includes(neighbourhoodSlug))
}
