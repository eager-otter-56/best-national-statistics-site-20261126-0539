// views.js — one render function per page of the atlas.
// Each function returns the HTML for its route; main.js drops it into
// the page and wires up any controls afterwards.

import {
  headlineIndicators,
  glanceFacts,
  censusTrend,
  censusTrendSource,
  ageShares2020,
  ageMilestones2020,
  ageSharesSource,
  pyramidGroups,
  pyramidAgeUnknown,
  pyramidSource,
  ageingTrend,
  ageingSource,
  vitalStats,
  vitalSource,
  birthsDeathsTrend,
  birthsDeathsSource,
  gdpTrend,
  gdpTrendSource,
  sectorShares,
  sectorSource,
  labourFacts,
  labourSource,
  priceFacts,
  priceSource,
  tradeFacts,
  prefectures,
  prefectureSource,
  prefectureTiles,
  lifeExpectancyTrend,
  lifeExpectancySource,
  healthFacts,
  healthSource,
  educationFacts,
  educationSource,
  householdFacts,
  householdSource,
  workFacts,
  workSource,
} from './data.js';
import { lineChart, dualLineChart, horizontalBars, shareBar, pyramidChart } from './charts.js';

const AGE_COLORS = ['#7fa3d9', '#2c4a8a', '#e03c31'];
const SECTOR_COLORS = ['#2c4a8a', '#e0a431', '#7fa3d9'];

function formatPersons(n) {
  return n.toLocaleString('en-US');
}

function kpiCard(item) {
  return `<article class="kpi-card">
    <p class="kpi-label">${item.label}</p>
    <p class="kpi-value">${item.value}</p>
    <p class="kpi-note">${item.note}</p>
    <p class="source">Source: ${item.source}</p>
  </article>`;
}

function factRows(facts) {
  return facts
    .map(
      (fact) => `<div class="fact-row">
        <div><p class="fact-label">${fact.label}</p><p class="fact-note">${fact.note ?? ''}</p></div>
        <p class="fact-value">${fact.value}</p>
      </div>`,
    )
    .join('');
}

function panel(title, bodyHtml, source) {
  return `<section class="panel">
    <h2>${title}</h2>
    ${bodyHtml}
    ${source ? `<p class="source">Source: ${source}</p>` : ''}
  </section>`;
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------
export function renderOverview() {
  const kpis = headlineIndicators.map(kpiCard).join('');
  const trend = lineChart({
    points: censusTrend.map((p) => ({ label: String(p.year), value: p.millions })),
    formatValue: (v) => `${Math.round(v)}M`,
    color: '#2c4a8a',
    height: 190,
  });
  const glance = glanceFacts
    .map(
      (fact) => `<div class="glance-row">
        <span class="glance-label">${fact.label}</span>
        <span class="glance-value">${fact.value}</span>
      </div>`,
    )
    .join('');

  return `
  <section class="hero">
    <p class="hero-kicker">Nippon Statistics Atlas</p>
    <h1>Japan in Numbers</h1>
    <p class="hero-lede">Japan’s people, economy and everyday life, told through official statistics.</p>
    <p class="hero-strip">
      <span class="hero-chip">2020 Census</span>
      <span class="hero-chip">47 prefectures</span>
      <span class="hero-chip">A source on every figure</span>
    </p>
  </section>

  <section class="kpi-grid" aria-label="Headline indicators">${kpis}</section>

  ${panel(
    'A century of population, 1920–2020',
    `<div class="trend-cols">
       <div>
         <p class="panel-intro">Japan counted 55.96 million people in its first modern census
          in 1920, peaked at 128.06 million in 2010, and has been shrinking since.</p>
         <p class="panel-intro">The 2020 Census found 126,146,099 people; the estimate for
          October 2024 is 123.8 million — some 4.3 million below the peak, with the fall
          steepening every year.</p>
       </div>
       <div>${trend}</div>
     </div>`,
    censusTrendSource,
  )}

  <div class="two-col">
    ${panel('Japan at a glance', `<div class="glance-list">${glance}</div>`)}
    <section class="panel">
      <h2>Explore the atlas</h2>
      <a class="explore-link" href="#/population"><strong>Population</strong><span>Pyramid, ageing and a century of censuses →</span></a>
      <a class="explore-link" href="#/economy"><strong>Economy</strong><span>GDP, jobs, prices and trade →</span></a>
      <a class="explore-link" href="#/prefectures"><strong>Prefectures</strong><span>All 47 prefectures — a tile map of where Japan lives, compare any two or three, search and sort the table →</span></a>
      <a class="explore-link" href="#/life"><strong>Life</strong><span>Health, school, households and working time →</span></a>
    </section>
  </div>`;
}

// ---------------------------------------------------------------------------
// Population
// ---------------------------------------------------------------------------
export function renderPopulation() {
  const pyramid = pyramidChart({ groups: pyramidGroups });
  const shares = shareBar({
    segments: ageShares2020.map((s, i) => ({ label: s.label, share: s.share, color: AGE_COLORS[i] })),
  });
  const legend = ageShares2020
    .map(
      (s, i) => `<p class="legend-row"><span class="legend-swatch" style="background:${AGE_COLORS[i]}"></span>
        <strong>${s.label}</strong> — ${s.persons} (${s.share}%)</p>`,
    )
    .join('');
  const ageing = lineChart({
    points: ageingTrend.map((p) => ({ label: String(p.year), value: p.share })),
    formatValue: (v) => `${Math.round(v)}%`,
    color: '#e03c31',
  });
  const birthsDeaths = dualLineChart({
    labels: birthsDeathsTrend.map((p) => String(p.year)),
    series: [
      { name: 'Births', color: '#2c4a8a', values: birthsDeathsTrend.map((p) => p.births / 1_000_000) },
      { name: 'Deaths', color: '#e03c31', values: birthsDeathsTrend.map((p) => p.deaths / 1_000_000) },
    ],
    formatValue: (v) => (v === 0 ? '0' : `${v.toFixed(1)}M`),
    yMin: 0,
    yMax: 2,
  });
  const censusRows = censusTrend
    .filter((p) => p.year % 10 === 0)
    .map((p) => `<tr><td>${p.year}</td><td>${p.millions.toFixed(2)} million</td></tr>`)
    .join('');

  const milestones = ageMilestones2020
    .map((m) => `<p class="legend-row"><strong>${m.label}</strong> — ${m.persons} people</p>`)
    .join('');
  const unknownNote = `<p class="panel-note">Age not reported: ${formatPersons(pyramidAgeUnknown.total)} people
    (${formatPersons(pyramidAgeUnknown.male)} men, ${formatPersons(pyramidAgeUnknown.female)} women) are counted
    in the totals but not in any age group.</p>`;

  return `
  <section class="page-head">
    <h1>Population</h1>
    <p>126,146,099 people were counted on 1 October 2020 — 61,349,581 men and 64,796,518
    women — in a pyramid wide at 45–49 and 70–74, narrow at the base.</p>
  </section>

  ${panel(
    'Population pyramid, 2020 Census',
    `<p class="panel-intro">Every bar is an exact headcount from Table 2-3 of the census — no rounding.</p>${pyramid}${unknownNote}`,
    pyramidSource,
  )}

  <div class="two-col">
    ${panel(
      'Three generations, 2020',
      `${shares}<div class="legend">${legend}${milestones}</div>
       <p class="panel-note">These shares use the census's imputed values, which distribute the
       ${formatPersons(pyramidAgeUnknown.total)} people of unreported age; the pyramid above
       shows the original values.</p>`,
      ageSharesSource,
    )}
    ${panel(
      'Census totals, every ten years',
      `<table class="mini-table"><thead><tr><th>Census</th><th>Population</th></tr></thead><tbody>${censusRows}</tbody></table>`,
      censusTrendSource,
    )}
  </div>

  ${panel(
    'The ageing society: share aged 65 and over',
    `<p class="panel-intro">In 1970 one Japanese person in fourteen was 65 or older. By 2023 it was
     nearly one in three (29.1%) — the highest share in the world.</p>${ageing}`,
    ageingSource,
  )}

  ${panel(
    'Births and deaths, 1970–2024',
    `<p class="panel-intro">In 1970 Japan recorded 1,934,239 births against 712,962 deaths.
     Deaths first drew ahead in 2005, and by 2024 there were 1,605,378 deaths to
     686,173 births — a natural decrease of 919,205 people in a single year, the
     largest on record.</p>${birthsDeaths}`,
    birthsDeathsSource,
  )}

  ${panel('Births, deaths and marriages, 2023', factRows(vitalStats), vitalSource)}`;
}

// ---------------------------------------------------------------------------
// Economy
// ---------------------------------------------------------------------------
export function renderEconomy() {
  const gdp = lineChart({
    points: gdpTrend.map((p) => ({ label: String(p.year), value: p.trillionYen })),
    formatValue: (v) => `¥${Math.round(v)}T`,
    color: '#2c4a8a',
  });
  const sectors = shareBar({
    segments: sectorShares.map((s, i) => ({ label: s.label, share: s.share, color: SECTOR_COLORS[i] })),
  });
  const sectorLegend = sectorShares
    .map(
      (s, i) => `<p class="legend-row"><span class="legend-swatch" style="background:${SECTOR_COLORS[i]}"></span>
        <strong>${s.label}</strong> — ${s.share}% of value added</p>`,
    )
    .join('');
  const partnerRows = tradeFacts.partners
    .map((p) => `<tr><td>${p.partner}</td><td>${p.role}</td></tr>`)
    .join('');

  return `
  <section class="page-head">
    <h1>Economy</h1>
    <p>Japan's nominal GDP reached a record ¥636.9 trillion in 2024 in the Cabinet Office's
    2020-benchmark National Accounts. Three workers in four are in services, unemployment
    is 2.5%, and prices rose 2.7% in 2024 — fast by Japan's recent standards.</p>
  </section>

  ${panel('Nominal GDP, 2014–2024', gdp, gdpTrendSource)}

  <div class="two-col">
    ${panel('What the economy makes', `${sectors}<div class="legend">${sectorLegend}</div>`, sectorSource)}
    ${panel('Prices, 2024', factRows(priceFacts), priceSource)}
  </div>

  ${panel('Work and jobs, 2024', factRows(labourFacts), labourSource)}

  ${panel(
    'Trade, 2024',
    `<div class="trade-strip">
       <div><p class="fact-label">Exports</p><p class="trade-value">${tradeFacts.exports}</p></div>
       <div><p class="fact-label">Imports</p><p class="trade-value">${tradeFacts.imports}</p></div>
       <div><p class="fact-label">Balance</p><p class="trade-value">${tradeFacts.balance}</p></div>
     </div>
     <table class="mini-table"><thead><tr><th>Partner</th><th>Role in Japan's trade</th></tr></thead>
     <tbody>${partnerRows}</tbody></table>`,
    tradeFacts.source,
  )}`;
}

// ---------------------------------------------------------------------------
// Prefectures
// ---------------------------------------------------------------------------
export function prefectureRowsHtml(list) {
  return list
    .map(
      (p, i) => `<tr>
        <td class="rank-cell">${i + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td class="num-cell">${formatPersons(p.population)}</td>
        <td>${p.capital}</td>
        <td>${p.region}</td>
      </tr>`,
    )
    .join('');
}

// The national total the prefecture shares are measured against: the
// 47 prefecture populations sum to the 2020 Census total.
export const NATIONAL_POPULATION_2020 = 126146099;

function prefectureRank(pref) {
  return [...prefectures].sort((a, b) => b.population - a.population).findIndex((p) => p.name === pref.name) + 1;
}

// Comparison result for the prefecture picker: bars scaled to the largest
// pick, each labelled with its exact population, its share of the national
// total and its rank among the 47. main.js re-renders this on every change.
export function compareResultHtml(names) {
  const seen = new Set();
  const picks = [];
  for (const name of names) {
    const pref = prefectures.find((p) => p.name === name);
    if (pref && !seen.has(pref.name)) {
      seen.add(pref.name);
      picks.push(pref);
    }
  }
  if (picks.length < 2) {
    return '<p class="panel-note">Pick at least two different prefectures to compare them.</p>';
  }
  const chart = horizontalBars({
    items: picks.map((p) => ({
      label: p.name,
      value: p.population,
      display: `${formatPersons(p.population)} · ${(100 * (p.population / NATIONAL_POPULATION_2020)).toFixed(1)}% · #${prefectureRank(p)}`,
    })),
    valueW: 218,
    rowHeight: 34,
  });
  const details = picks
    .map(
      (p) => `<p class="legend-row"><strong>${p.name}</strong> — ${formatPersons(p.population)} people,
        ${(100 * (p.population / NATIONAL_POPULATION_2020)).toFixed(1)}% of Japan's ${formatPersons(NATIONAL_POPULATION_2020)},
        rank ${prefectureRank(p)} of 47; capital ${p.capital}, ${p.region} region.</p>`,
    )
    .join('');
  return `${chart}<div class="legend">${details}</div>`;
}

// ---------------------------------------------------------------------------
// Prefecture tile map: one tile per prefecture on the 12 × 11 grid laid
// out in data.js, shaded by 2020 Census population on a six-step indigo
// scale. Every tile is labelled with its name and population in millions,
// and carries the exact headcount in its title and aria-label.
// ---------------------------------------------------------------------------
const TILE_SCALE = [
  { max: 1_000_000, color: '#dfe8f8', dark: false, legend: 'Under 1M' },
  { max: 2_000_000, color: '#b6c9ec', dark: false, legend: '1–2M' },
  { max: 4_000_000, color: '#7fa3d9', dark: false, legend: '2–4M' },
  { max: 7_000_000, color: '#5273b8', dark: true, legend: '4–7M' },
  { max: 10_000_000, color: '#2c4a8a', dark: true, legend: '7–10M' },
  { max: Infinity, color: '#16264e', dark: true, legend: 'Over 10M' },
];

function tileShade(population) {
  return TILE_SCALE.find((step) => population < step.max) ?? TILE_SCALE[TILE_SCALE.length - 1];
}

function tileMapHtml() {
  const tiles = prefectures
    .map((p) => {
      const [col, row] = prefectureTiles[p.name];
      const shade = tileShade(p.population);
      const label = `${p.name} — ${formatPersons(p.population)} people (2020 Census)`;
      return `<div class="tile${shade.dark ? ' tile-dark' : ''}" role="listitem" style="grid-column:${col + 1};grid-row:${row + 1};background:${shade.color}" title="${label}" aria-label="${label}"><span class="tile-name">${p.name}</span><span class="tile-pop">${(p.population / 1_000_000).toFixed(1)}M</span></div>`;
    })
    .join('');
  return `<div class="tile-grid" role="list" aria-label="Tile map of Japan's 47 prefectures, shaded by 2020 Census population">${tiles}</div>`;
}

function tileLegendHtml() {
  const items = TILE_SCALE.map(
    (step) => `<span class="map-legend-item"><span class="legend-swatch" style="background:${step.color}"></span>${step.legend}</span>`,
  ).join('');
  return `<p class="map-legend">People per prefecture&nbsp;&nbsp;${items}</p>`;
}

export function renderPrefectures() {
  const top10 = [...prefectures]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);
  const chart = horizontalBars({
    items: top10.map((p) => ({
      label: p.name,
      value: p.population,
      display: `${(p.population / 1_000_000).toFixed(2)}M`,
    })),
    width: 400,
    rowHeight: 30,
    valueW: 72,
  });
  const byPopulation = [...prefectures].sort((a, b) => b.population - a.population);
  const options = (selected, allowNone) =>
    `${allowNone ? '<option value="">— none —</option>' : ''}${byPopulation
      .map((p) => `<option value="${p.name}"${p.name === selected ? ' selected' : ''}>${p.name}</option>`)
      .join('')}`;

  return `
  <section class="page-head">
    <h1>Prefectures</h1>
    <p>All 47 prefectures from the 2020 Census — Tokyo holds 14,047,594 people,
    Tottori just 553,407.</p>
  </section>

  <section class="panel">
    <h2>Where Japan lives: the prefecture tile map</h2>
    <p class="panel-intro">One tile per prefecture, laid out the way Japan itself is —
    Hokkaido top right, Okinawa bottom left — and shaded by the people counted
    there in 2020. Tokyo's single tile holds more people than the 15 smallest
    prefectures combined.</p>
    <div class="map-row">
      <div class="map-main">
        ${tileMapHtml()}
        ${tileLegendHtml()}
      </div>
      <div class="map-side">
        <h3>The ten largest prefectures</h3>
        ${chart}
        <p class="panel-note">Tokyo, Kanagawa and Osaka together hold 32,122,616
        people — one resident in four.</p>
      </div>
    </div>
    <p class="source">Source: ${prefectureSource}</p>
  </section>

  <section class="panel">
    <h2>Compare prefectures</h2>
    <p class="panel-intro">Pick two or three prefectures and see them side by side —
    bars are scaled to the largest pick, with each one's share of Japan's
    126,146,099 people and its rank of 47.</p>
    <div class="pref-controls">
      <label>First prefecture
        <select id="compareA">${options('Tokyo', false)}</select>
      </label>
      <label>Second prefecture
        <select id="compareB">${options('Osaka', false)}</select>
      </label>
      <label>Third prefecture (optional)
        <select id="compareC">${options('Tottori', true)}</select>
      </label>
    </div>
    <div id="compareResult">${compareResultHtml(['Tokyo', 'Osaka', 'Tottori'])}</div>
    <p class="source">Source: ${prefectureSource}</p>
  </section>

  <section class="panel">
    <h2>All 47 prefectures</h2>
    <div class="pref-controls">
      <label class="pref-search">Search
        <input id="prefSearch" type="search" placeholder="Try “osaka”, “kyushu”, “naha”…" autocomplete="off">
      </label>
      <label class="pref-sort">Sort by
        <select id="prefSort">
          <option value="population-desc">Population, largest first</option>
          <option value="population-asc">Population, smallest first</option>
          <option value="name-asc">Name, A to Z</option>
          <option value="name-desc">Name, Z to A</option>
        </select>
      </label>
    </div>
    <p id="prefCount" class="pref-count" aria-live="polite"></p>
    <div class="table-wrap">
      <table class="pref-table">
        <thead><tr>
          <th>#</th>
          <th><button type="button" class="th-sort" data-sort-key="name">Prefecture</button></th>
          <th><button type="button" class="th-sort" data-sort-key="population">Population (2020)</button></th>
          <th><button type="button" class="th-sort" data-sort-key="capital">Capital</button></th>
          <th><button type="button" class="th-sort" data-sort-key="region">Region</button></th>
        </tr></thead>
        <tbody id="prefRows">${prefectureRowsHtml(byPopulation)}</tbody>
      </table>
    </div>
    <p class="source">Source: ${prefectureSource}</p>
  </section>`;
}

// ---------------------------------------------------------------------------
// Life
// ---------------------------------------------------------------------------
export function renderLife() {
  const expectancy = dualLineChart({
    labels: lifeExpectancyTrend.map((p) => String(p.year)),
    series: [
      { name: 'Women', color: '#e03c31', values: lifeExpectancyTrend.map((p) => p.women) },
      { name: 'Men', color: '#2c4a8a', values: lifeExpectancyTrend.map((p) => p.men) },
    ],
    formatValue: (v) => `${v.toFixed(1)}`,
  });

  return `
  <section class="page-head">
    <h1>Life</h1>
    <p>Japanese women live to 87.14 years on average and men to 81.09 — the longest lives
    in the world. Households are shrinking, most school leavers go on to university,
    and workers are finally taking more of their paid leave.</p>
  </section>

  ${panel(
    'Life expectancy at birth, 1990–2023',
    `<p class="panel-intro">Women gained about five years and men about five years between
     1990 and 2023 — then both lines dipped after 2020, the first sustained fall in decades.</p>${expectancy}`,
    lifeExpectancySource,
  )}

  <div class="two-col">
    ${panel('Health', factRows(healthFacts), healthSource)}
    ${panel('Education', factRows(educationFacts), educationSource)}
  </div>
  <div class="two-col">
    ${panel('Households', factRows(householdFacts), householdSource)}
    ${panel('Work and time', factRows(workFacts), workSource)}
  </div>`;
}
