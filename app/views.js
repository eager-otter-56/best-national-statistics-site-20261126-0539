// views.js — one render function per page of the atlas.
// Each function returns the HTML for its route; main.js drops it into
// the page and wires up any controls afterwards.

import {
  headlineIndicators,
  glanceFacts,
  censusTrend,
  censusTrendSource,
  ageShares2020,
  ageSharesSource,
  pyramidGroups,
  pyramidSource,
  ageingTrend,
  ageingSource,
  vitalStats,
  vitalSource,
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
    <p class="hero-lede">The people, economy and everyday life of Japan, told through the
    official statistics — every figure with its source and year, nothing fetched, nothing guessed.</p>
  </section>

  <section class="kpi-grid" aria-label="Headline indicators">${kpis}</section>

  ${panel(
    'A century of population, 1920–2020',
    `<p class="panel-intro">Japan counted 55.96 million people in its first modern census in 1920,
     peaked at 128.06 million in 2010, and has been shrinking since — the 2020 Census found
     126,146,099 people, and the 2024 estimate is 123.8 million.</p>${trend}`,
    censusTrendSource,
  )}

  <div class="two-col">
    ${panel('Japan at a glance', `<div class="glance-list">${glance}</div>`)}
    <section class="panel">
      <h2>Explore the atlas</h2>
      <a class="explore-link" href="#/population"><strong>Population</strong><span>Pyramid, ageing and a century of censuses →</span></a>
      <a class="explore-link" href="#/economy"><strong>Economy</strong><span>GDP, jobs, prices and trade →</span></a>
      <a class="explore-link" href="#/prefectures"><strong>Prefectures</strong><span>All 47 prefectures — search and sort the table →</span></a>
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
  const censusRows = censusTrend
    .filter((p) => p.year % 10 === 0)
    .map((p) => `<tr><td>${p.year}</td><td>${p.millions.toFixed(2)} million</td></tr>`)
    .join('');

  return `
  <section class="page-head">
    <h1>Population</h1>
    <p>126,146,099 people were counted on 1 October 2020: 61.35 million men and 64.80 million women.
    The shape of the pyramid — wide at 45–49 and 70–74, narrow at the base — is the story of
    post-war Japan: two baby booms, then decades of few births.</p>
  </section>

  ${panel('Population pyramid, 2020', pyramid, pyramidSource)}

  <div class="two-col">
    ${panel('Three generations, 2020', `${shares}<div class="legend">${legend}</div>`, ageSharesSource)}
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
    <p>Japan's nominal GDP reached a record ¥609.3 trillion in 2024. Three workers in four
    are in services, unemployment is 2.5%, and prices rose 2.7% in 2024 — fast by Japan's
    recent standards.</p>
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
  });
  const byPopulation = [...prefectures].sort((a, b) => b.population - a.population);

  return `
  <section class="page-head">
    <h1>Prefectures</h1>
    <p>All 47 prefectures from the 2020 Census. Tokyo alone holds 14,047,594 people —
    more than one in nine Japanese — while Tottori, the smallest, holds 553,407.
    Search the table or change the sort order: both controls work on the full list.</p>
  </section>

  ${panel('The ten largest prefectures', chart, prefectureSource)}

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

  ${panel('Life expectancy at birth, 1990–2023', expectancy, lifeExpectancySource)}

  <div class="two-col">
    ${panel('Health', factRows(healthFacts), healthSource)}
    ${panel('Education', factRows(educationFacts), educationSource)}
  </div>
  <div class="two-col">
    ${panel('Households', factRows(householdFacts), householdSource)}
    ${panel('Work and time', factRows(workFacts), workSource)}
  </div>`;
}
