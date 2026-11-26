// data.js — every figure shown by the Nippon Statistics Atlas lives here,
// each with the source and year it was published. No figure is fetched:
// the whole atlas works offline from this file.

// ---------------------------------------------------------------------------
// Headline indicators for the overview KPI grid.
// ---------------------------------------------------------------------------
export const headlineIndicators = [
  {
    label: 'Population',
    value: '123.8 million',
    note: 'Estimate for 1 Oct 2024; the 2020 Census counted 126,146,099.',
    source: 'Statistics Bureau, 2024',
  },
  {
    label: 'GDP (nominal)',
    value: '¥636.9 trillion',
    note: 'Calendar 2024 — a record high in yen terms.',
    source: 'Cabinet Office, National Accounts, 2024',
  },
  {
    label: 'GDP per capita',
    value: 'US$33,767',
    note: 'Current US dollars, 2023.',
    source: 'World Bank, WDI, 2023',
  },
  {
    label: 'Life expectancy',
    value: '84.0 years',
    note: 'At birth, 2023: men 81.09, women 87.14 years.',
    source: 'MHLW, Abridged Life Table, 2023',
  },
  {
    label: 'Median age',
    value: '49.5 years',
    note: 'Half of all Japanese are older — among the world’s highest.',
    source: 'UN World Population Prospects, 2023',
  },
  {
    label: 'Fertility rate',
    value: '1.20',
    note: 'Children per woman, 2023 — a record low.',
    source: 'MHLW, Vital Statistics, 2023',
  },
  {
    label: 'Unemployment rate',
    value: '2.5%',
    note: 'Annual average for 2024.',
    source: 'Statistics Bureau, Labour Force Survey',
  },
  {
    label: 'Households',
    value: '55.71 million',
    note: 'Average household size is 2.21 people.',
    source: 'Statistics Bureau, 2020 Census',
  },
];

// ---------------------------------------------------------------------------
// "Japan at a glance" facts for the overview page.
// ---------------------------------------------------------------------------
export const glanceFacts = [
  { label: 'Land area', value: '377,975 km²', source: 'Geospatial Information Authority of Japan' },
  { label: 'Prefectures', value: '47', source: 'Statistics Bureau of Japan' },
  { label: 'Capital', value: 'Tokyo', source: 'Seat of government' },
  { label: 'Population density', value: '334 people per km²', source: '2020 Census, Statistics Bureau' },
  { label: 'Forest cover', value: 'About 67% of the land', source: 'Forestry Agency of Japan' },
  { label: 'Currency', value: 'Japanese yen (¥)', source: 'Bank of Japan' },
];

// ---------------------------------------------------------------------------
// Census population, 1920–2020 (millions of people, rounded to 2 decimals).
// Source: Statistics Bureau of Japan, Population Census, each census year.
// ---------------------------------------------------------------------------
export const censusTrend = [
  { year: 1920, millions: 55.96 },
  { year: 1925, millions: 59.74 },
  { year: 1930, millions: 64.45 },
  { year: 1935, millions: 69.25 },
  { year: 1940, millions: 73.11 },
  { year: 1945, millions: 72.00 },
  { year: 1950, millions: 83.20 },
  { year: 1955, millions: 89.28 },
  { year: 1960, millions: 93.42 },
  { year: 1965, millions: 98.27 },
  { year: 1970, millions: 103.72 },
  { year: 1975, millions: 111.94 },
  { year: 1980, millions: 117.06 },
  { year: 1985, millions: 121.05 },
  { year: 1990, millions: 123.61 },
  { year: 1995, millions: 125.57 },
  { year: 2000, millions: 126.93 },
  { year: 2005, millions: 127.77 },
  { year: 2010, millions: 128.06 },
  { year: 2015, millions: 127.09 },
  { year: 2020, millions: 126.15 },
];
export const censusTrendSource = 'Statistics Bureau of Japan, Population Census 1920–2020';

// Broad age groups from the 2020 Census. These are the census's published
// IMPUTED values: the 2,931,838 people whose age was not reported are
// distributed across the groups, so the three groups sum to the census
// total of 126,146,099. The pyramid below uses the original values instead.
export const ageShares2020 = [
  { label: 'Aged 0–14', persons: '15,031,602', share: 11.9 },
  { label: 'Aged 15–64', persons: '75,087,865', share: 59.5 },
  { label: 'Aged 65 and over', persons: '36,026,632', share: 28.6 },
];
export const ageMilestones2020 = [
  { label: 'Aged 75 and over', persons: '18,601,808' },
  { label: 'Aged 85 and over', persons: '6,133,398' },
];
export const ageSharesSource = 'Statistics Bureau of Japan, 2020 Census (imputed values)';

// Population pyramid: five-year age groups by sex, EXACT persons from
// Table 2-3 of the 2020 Census (original values — no rounding, no
// estimates). The oldest five groups of the table are combined into 85+.
// Census totals: 61,349,581 men and 64,796,518 women.
export const pyramidGroups = [
  { label: '0–4', male: 2311189, female: 2204893 },
  { label: '5–9', male: 2606651, female: 2482442 },
  { label: '10–14', male: 2742131, female: 2608386 },
  { label: '15–19', male: 2880029, female: 2737411 },
  { label: '20–24', male: 3017869, female: 2913437 },
  { label: '25–29', male: 3074087, female: 2957877 },
  { label: '30–34', male: 3297031, female: 3187563 },
  { label: '35–39', male: 3696855, female: 3614712 },
  { label: '40–44', male: 4189446, female: 4101631 },
  { label: '45–49', male: 4862990, female: 4787303 },
  { label: '50–54', male: 4277003, female: 4262848 },
  { label: '55–59', male: 3865303, female: 3902179 },
  { label: '60–64', male: 3592903, female: 3704287 },
  { label: '65–69', male: 3910060, female: 4165208 },
  { label: '70–74', male: 4249286, female: 4762509 },
  { label: '75–79', male: 3092860, female: 3838068 },
  { label: '80–84', male: 2196093, female: 3100635 },
  { label: '85+', male: 1896652, female: 4124434 },
];
// People counted in the census totals whose age was not reported: they
// appear in no age group, so the pyramid bars sum to 123,214,261.
export const pyramidAgeUnknown = {
  total: 2931838,
  male: 1591143,
  female: 1340695,
};
export const pyramidSource = 'Population Census 2020, Table 2-3 (original values), Statistics Bureau of Japan';

// Share of the population aged 65 and over, census years plus 2023 estimate.
export const ageingTrend = [
  { year: 1970, share: 7.1 },
  { year: 1990, share: 12.1 },
  { year: 2010, share: 23.0 },
  { year: 2020, share: 28.6 },
  { year: 2023, share: 29.1 },
];
export const ageingSource = 'Statistics Bureau of Japan, Population Census and Population Estimates';

// Vital statistics for 2023.
export const vitalStats = [
  { label: 'Births', value: '727,277', note: 'The fewest since records began in 1899.' },
  { label: 'Deaths', value: '1,575,936', note: 'Natural decrease of about 849,000 people in one year.' },
  { label: 'Marriages', value: '489,281', note: 'Fewer than half a million couples for the first time in about 90 years.' },
  { label: 'Fertility rate', value: '1.20', note: 'Children per woman; Tokyo is lowest at 0.99.' },
];
export const vitalSource = 'Ministry of Health, Labour and Welfare, Vital Statistics, 2023';

// ---------------------------------------------------------------------------
// Economy.
// ---------------------------------------------------------------------------
// Nominal GDP, trillion yen, calendar years — the Cabinet Office's
// current 2020-benchmark series (the older 2015-benchmark series, which
// put 2024 at ¥609.3 trillion, is superseded and not used here).
export const gdpTrend = [
  { year: 2014, trillionYen: 528.2 },
  { year: 2015, trillionYen: 548.9 },
  { year: 2016, trillionYen: 556.0 },
  { year: 2017, trillionYen: 565.1 },
  { year: 2018, trillionYen: 569.2 },
  { year: 2019, trillionYen: 571.8 },
  { year: 2020, trillionYen: 554.1 },
  { year: 2021, trillionYen: 573.7 },
  { year: 2022, trillionYen: 584.5 },
  { year: 2023, trillionYen: 616.7 },
  { year: 2024, trillionYen: 636.9 },
];
export const gdpTrendSource = 'Cabinet Office, National Accounts (2020 benchmark) — nominal GDP, ¥ trillion';

// Shares of value added by broad sector, percent.
export const sectorShares = [
  { label: 'Services', share: 73 },
  { label: 'Industry (incl. manufacturing & construction)', share: 26 },
  { label: 'Agriculture, forestry & fisheries', share: 1 },
];
export const sectorSource = 'World Bank, World Development Indicators, 2023 (rounded)';

export const labourFacts = [
  { label: 'Labour force', value: '69.57 million', note: 'Annual average 2024 — a record high.' },
  { label: 'People in work', value: '67.81 million', note: 'Annual average 2024.' },
  { label: 'Unemployment rate', value: '2.5%', note: 'Annual average 2024.' },
  { label: 'Women in the labour force', value: 'About 31.7 million', note: 'More than 45% of all workers, 2024.' },
];
export const labourSource = 'Statistics Bureau of Japan, Labour Force Survey, 2024';

export const priceFacts = [
  { label: 'Consumer prices, all items', value: '+2.7%', note: 'Change on the year before, 2024 average.' },
  { label: 'Prices excluding fresh food', value: '+2.7%', note: 'The Bank of Japan watches this measure closely.' },
  { label: 'Prices excluding fresh food & energy', value: '+2.4%', note: '2024 average.' },
];
export const priceSource = 'Statistics Bureau of Japan, Consumer Price Index, 2024';

export const tradeFacts = {
  exports: '¥107.09 trillion',
  imports: '¥112.72 trillion',
  balance: '−¥5.63 trillion',
  source: 'Ministry of Finance, Trade Statistics of Japan, 2024 (final values)',
  partners: [
    { partner: 'United States', role: 'Largest export market; second-largest source of imports' },
    { partner: 'China', role: 'Largest source of imports; second-largest export market' },
    { partner: 'South Korea', role: 'Third-largest export market' },
    { partner: 'Taiwan', role: 'Major market for semiconductor equipment' },
    { partner: 'Australia', role: 'Key supplier of energy and minerals' },
  ],
};

// ---------------------------------------------------------------------------
// All 47 prefectures: 2020 Census population, capital city, region.
// Source: Statistics Bureau of Japan, 2020 Census.
// ---------------------------------------------------------------------------
export const prefectures = [
  { name: 'Hokkaido', population: 5224614, capital: 'Sapporo', region: 'Hokkaido' },
  { name: 'Aomori', population: 1237984, capital: 'Aomori', region: 'Tohoku' },
  { name: 'Iwate', population: 1210534, capital: 'Morioka', region: 'Tohoku' },
  { name: 'Miyagi', population: 2301996, capital: 'Sendai', region: 'Tohoku' },
  { name: 'Akita', population: 959502, capital: 'Akita', region: 'Tohoku' },
  { name: 'Yamagata', population: 1068027, capital: 'Yamagata', region: 'Tohoku' },
  { name: 'Fukushima', population: 1833152, capital: 'Fukushima', region: 'Tohoku' },
  { name: 'Ibaraki', population: 2867009, capital: 'Mito', region: 'Kanto' },
  { name: 'Tochigi', population: 1933146, capital: 'Utsunomiya', region: 'Kanto' },
  { name: 'Gunma', population: 1939110, capital: 'Maebashi', region: 'Kanto' },
  { name: 'Saitama', population: 7344765, capital: 'Saitama', region: 'Kanto' },
  { name: 'Chiba', population: 6284480, capital: 'Chiba', region: 'Kanto' },
  { name: 'Tokyo', population: 14047594, capital: 'Tokyo', region: 'Kanto' },
  { name: 'Kanagawa', population: 9237337, capital: 'Yokohama', region: 'Kanto' },
  { name: 'Niigata', population: 2201272, capital: 'Niigata', region: 'Chubu' },
  { name: 'Toyama', population: 1034814, capital: 'Toyama', region: 'Chubu' },
  { name: 'Ishikawa', population: 1132497, capital: 'Kanazawa', region: 'Chubu' },
  { name: 'Fukui', population: 766863, capital: 'Fukui', region: 'Chubu' },
  { name: 'Yamanashi', population: 809974, capital: 'Kofu', region: 'Chubu' },
  { name: 'Nagano', population: 2048011, capital: 'Nagano', region: 'Chubu' },
  { name: 'Gifu', population: 1978742, capital: 'Gifu', region: 'Chubu' },
  { name: 'Shizuoka', population: 3633202, capital: 'Shizuoka', region: 'Chubu' },
  { name: 'Aichi', population: 7542415, capital: 'Nagoya', region: 'Chubu' },
  { name: 'Mie', population: 1770632, capital: 'Tsu', region: 'Kansai' },
  { name: 'Shiga', population: 1413610, capital: 'Otsu', region: 'Kansai' },
  { name: 'Kyoto', population: 2578087, capital: 'Kyoto', region: 'Kansai' },
  { name: 'Osaka', population: 8837685, capital: 'Osaka', region: 'Kansai' },
  { name: 'Hyogo', population: 5465002, capital: 'Kobe', region: 'Kansai' },
  { name: 'Nara', population: 1324473, capital: 'Nara', region: 'Kansai' },
  { name: 'Wakayama', population: 922584, capital: 'Wakayama', region: 'Kansai' },
  { name: 'Tottori', population: 553407, capital: 'Tottori', region: 'Chugoku' },
  { name: 'Shimane', population: 671126, capital: 'Matsue', region: 'Chugoku' },
  { name: 'Okayama', population: 1888432, capital: 'Okayama', region: 'Chugoku' },
  { name: 'Hiroshima', population: 2799702, capital: 'Hiroshima', region: 'Chugoku' },
  { name: 'Yamaguchi', population: 1342059, capital: 'Yamaguchi', region: 'Chugoku' },
  { name: 'Tokushima', population: 719559, capital: 'Tokushima', region: 'Shikoku' },
  { name: 'Kagawa', population: 950244, capital: 'Takamatsu', region: 'Shikoku' },
  { name: 'Ehime', population: 1334841, capital: 'Matsuyama', region: 'Shikoku' },
  { name: 'Kochi', population: 691527, capital: 'Kochi', region: 'Shikoku' },
  { name: 'Fukuoka', population: 5135214, capital: 'Fukuoka', region: 'Kyushu' },
  { name: 'Saga', population: 811442, capital: 'Saga', region: 'Kyushu' },
  { name: 'Nagasaki', population: 1312317, capital: 'Nagasaki', region: 'Kyushu' },
  { name: 'Kumamoto', population: 1738301, capital: 'Kumamoto', region: 'Kyushu' },
  { name: 'Oita', population: 1123852, capital: 'Oita', region: 'Kyushu' },
  { name: 'Miyazaki', population: 1069576, capital: 'Miyazaki', region: 'Kyushu' },
  { name: 'Kagoshima', population: 1588256, capital: 'Kagoshima', region: 'Kyushu' },
  { name: 'Okinawa', population: 1467480, capital: 'Naha', region: 'Kyushu' },
];
export const prefectureSource = 'Statistics Bureau of Japan, 2020 Census';

// ---------------------------------------------------------------------------
// Life: health, education, households, work and time.
// ---------------------------------------------------------------------------
export const lifeExpectancyTrend = [
  { year: 1990, men: 75.92, women: 81.90 },
  { year: 2000, men: 77.72, women: 84.60 },
  { year: 2010, men: 79.55, women: 86.30 },
  { year: 2020, men: 81.56, women: 87.71 },
  { year: 2023, men: 81.09, women: 87.14 },
];
export const lifeExpectancySource = 'MHLW life tables (complete tables to 2020; abridged table 2023)';

export const healthFacts = [
  { label: 'Doctors', value: '2.6 per 1,000 people', note: 'Practising physicians, OECD comparison, 2022.' },
  { label: 'Infant mortality', value: '1.7 per 1,000 births', note: 'Among the lowest rates in the world, 2023.' },
  { label: 'Share aged 65+', value: '29.1%', note: 'The highest share of older people of any country, 2023.' },
];
export const healthSource = 'OECD Health Statistics, 2022; MHLW Vital Statistics, 2023';

export const educationFacts = [
  { label: 'To university or junior college', value: '60.8%', note: 'Share of high-school graduates continuing, 2023.' },
  { label: 'To upper-secondary school', value: 'About 99%', note: 'Nearly every child continues past compulsory schooling.' },
  { label: 'Compulsory education', value: '9 years', note: 'Six years of elementary school plus three of junior high.' },
];
export const educationSource = 'Ministry of Education, Culture, Sports, Science and Technology, School Basic Survey, 2023';

export const householdFacts = [
  { label: 'Households', value: '55.71 million', note: 'General households counted in the 2020 Census.' },
  { label: 'Average household size', value: '2.21 people', note: 'Down from 3.41 people in 1970.' },
  { label: 'Living alone', value: '38.1%', note: 'Share of households with a single member, 2020.' },
  { label: 'Average household income', value: 'About ¥5.36 million', note: 'Mean annual income per household, 2023 survey.' },
];
export const householdSource = 'Statistics Bureau, 2020 Census; MHLW Comprehensive Survey of Living Conditions, 2023';

export const workFacts = [
  { label: 'Hours actually worked', value: 'About 137 a month', note: 'Average per worker, all industries, 2023.' },
  { label: 'Paid leave taken', value: '62.1%', note: 'Share of annual paid leave actually used, 2023 — a record high.' },
  { label: 'Average monthly pay', value: 'About ¥330,000', note: 'Total cash earnings per worker, 2023.' },
];
export const workSource = 'Ministry of Health, Labour and Welfare, Monthly Labour Survey, 2023';
