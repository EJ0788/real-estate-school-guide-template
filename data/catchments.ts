// Which elementary school serves each neighbourhood,
// plus middle and secondary (same for all of Squamish)

export interface CatchmentEntry {
  neighbourhoodSlug: string
  neighbourhoodName: string
  elementarySlug: string
  elementaryName: string
  fraserRating?: number
  frenchImmersionAvailable: boolean
  notes?: string
}

export const catchments: CatchmentEntry[] = [
  {
    neighbourhoodSlug: 'garibaldi-highlands',
    neighbourhoodName: 'Garibaldi Highlands',
    elementarySlug: 'garibaldi-highlands-elementary',
    elementaryName: 'Garibaldi Highlands Elementary',
    fraserRating: 6.1,
    frenchImmersionAvailable: false,
    notes: 'Highest-rated school in Squamish. Families pay a measurable premium to be in this catchment.',
  },
  {
    neighbourhoodSlug: 'garibaldi-estates',
    neighbourhoodName: 'Garibaldi Estates',
    elementarySlug: 'mamquam-elementary',
    elementaryName: 'Mamquam Elementary',
    fraserRating: 5.2,
    frenchImmersionAvailable: false,
    notes: 'Also within reach of Garibaldi Highlands Elementary boundary depending on exact address — confirm with SD48.',
  },
  {
    neighbourhoodSlug: 'valleycliffe',
    neighbourhoodName: 'Valleycliffe',
    elementarySlug: 'valleycliffe-elementary',
    elementaryName: 'Valleycliffe Elementary',
    fraserRating: 5.5,
    frenchImmersionAvailable: false,
    notes: 'Best SFH value in Squamish with solid school access.',
  },
  {
    neighbourhoodSlug: 'hospital-hill',
    neighbourhoodName: 'Hospital Hill',
    elementarySlug: 'valleycliffe-elementary',
    elementaryName: 'Valleycliffe Elementary',
    fraserRating: 5.5,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'crumpit-woods',
    neighbourhoodName: 'Crumpit Woods',
    elementarySlug: 'valleycliffe-elementary',
    elementaryName: 'Valleycliffe Elementary',
    fraserRating: 5.5,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'dentville',
    neighbourhoodName: 'Dentville',
    elementarySlug: 'valleycliffe-elementary',
    elementaryName: 'Valleycliffe Elementary',
    fraserRating: 5.5,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'northyards',
    neighbourhoodName: 'Northyards',
    elementarySlug: 'valleycliffe-elementary',
    elementaryName: 'Valleycliffe Elementary',
    fraserRating: 5.5,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'downtown-squamish',
    neighbourhoodName: 'Downtown Squamish',
    elementarySlug: 'squamish-elementary',
    elementaryName: 'Squamish Elementary',
    fraserRating: 5.7,
    frenchImmersionAvailable: true,
    notes: 'Home of Squamish\'s French Immersion program. Fastest-selling neighbourhood in Squamish.',
  },
  {
    neighbourhoodSlug: 'sea-and-sky',
    neighbourhoodName: 'Sea + Sky',
    elementarySlug: 'squamish-elementary',
    elementaryName: 'Squamish Elementary',
    fraserRating: 5.7,
    frenchImmersionAvailable: true,
  },
  {
    neighbourhoodSlug: 'oceanfront-squamish',
    neighbourhoodName: 'Oceanfront Squamish',
    elementarySlug: 'squamish-elementary',
    elementaryName: 'Squamish Elementary',
    fraserRating: 5.7,
    frenchImmersionAvailable: true,
    notes: 'Pre-sale community launching 2026. School catchment confirmed for Squamish Elementary.',
  },
  {
    neighbourhoodSlug: 'brackendale',
    neighbourhoodName: 'Brackendale',
    elementarySlug: 'brackendale-elementary',
    elementaryName: 'Brackendale Elementary',
    fraserRating: 5.2,
    frenchImmersionAvailable: false,
    notes: 'Village school with small class sizes and nature-based ethos.',
  },
  {
    neighbourhoodSlug: 'tantalus',
    neighbourhoodName: 'Tantalus',
    elementarySlug: 'brackendale-elementary',
    elementaryName: 'Brackendale Elementary',
    fraserRating: 5.2,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'university-heights',
    neighbourhoodName: 'University Heights',
    elementarySlug: 'mamquam-elementary',
    elementaryName: 'Mamquam Elementary',
    fraserRating: 5.2,
    frenchImmersionAvailable: false,
  },
  {
    neighbourhoodSlug: 'britannia-beach',
    neighbourhoodName: 'Britannia Beach',
    elementarySlug: 'britannia-beach-elementary',
    elementaryName: 'Britannia Beach Elementary',
    fraserRating: undefined,
    frenchImmersionAvailable: false,
    notes: 'One of BC\'s smallest schools. Intimate community feel. Older students travel north for DRMS and HSS.',
  },
]
