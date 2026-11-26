// main.js — hash router for the atlas, plus the wiring that makes the
// prefecture search box, sort menu and column headers actually work.

import { prefectures } from './data.js';
import {
  renderOverview,
  renderPopulation,
  renderEconomy,
  renderPrefectures,
  renderLife,
  prefectureRowsHtml,
} from './views.js';

const routes = {
  '/': { name: 'overview', render: renderOverview, title: 'Japan in Numbers — Nippon Statistics Atlas' },
  '/population': { name: 'population', render: renderPopulation, title: 'Population — Japan in Numbers' },
  '/economy': { name: 'economy', render: renderEconomy, title: 'Economy — Japan in Numbers' },
  '/prefectures': { name: 'prefectures', render: renderPrefectures, title: 'Prefectures — Japan in Numbers' },
  '/life': { name: 'life', render: renderLife, title: 'Life — Japan in Numbers' },
};

const app = document.getElementById('app');

function currentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return routes[hash] ? hash : '/';
}

function markActiveNav(routeName) {
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === routeName);
  });
}

function renderRoute() {
  const route = routes[currentPath()];
  app.innerHTML = route.render();
  document.title = route.title;
  markActiveNav(route.name);
  // A route change is a page change: start at the top and move focus to
  // the new heading so keyboard and screen-reader users land with the content.
  window.scrollTo(0, 0);
  const heading = app.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
  if (route.name === 'prefectures') wirePrefectureTools();
}

// --- Prefecture table tools -------------------------------------------------
// State lives here; every control re-renders the rows from the full list.
const prefState = { query: '', sortKey: 'population', sortDir: -1 };

function visiblePrefectures() {
  const q = prefState.query.trim().toLowerCase();
  const filtered = prefectures.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.capital.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    );
  });
  const key = prefState.sortKey;
  const dir = prefState.sortDir;
  return filtered.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

function paintPrefectureRows() {
  const rowsEl = document.getElementById('prefRows');
  const countEl = document.getElementById('prefCount');
  if (!rowsEl) return;
  const list = visiblePrefectures();
  rowsEl.innerHTML =
    list.length > 0
      ? prefectureRowsHtml(list)
      : '<tr><td colspan="5">No prefecture matches that search. Try a name, a capital city or a region.</td></tr>';
  if (countEl) {
    countEl.textContent =
      list.length === prefectures.length
        ? `Showing all ${prefectures.length} prefectures.`
        : `Showing ${list.length} of ${prefectures.length} prefectures.`;
  }
}

function applySortSelection(value) {
  if (value === 'population-desc') Object.assign(prefState, { sortKey: 'population', sortDir: -1 });
  if (value === 'population-asc') Object.assign(prefState, { sortKey: 'population', sortDir: 1 });
  if (value === 'name-asc') Object.assign(prefState, { sortKey: 'name', sortDir: 1 });
  if (value === 'name-desc') Object.assign(prefState, { sortKey: 'name', sortDir: -1 });
}

function wirePrefectureTools() {
  prefState.query = '';
  prefState.sortKey = 'population';
  prefState.sortDir = -1;

  const search = document.getElementById('prefSearch');
  const sortSelect = document.getElementById('prefSort');
  if (search) {
    search.addEventListener('input', () => {
      prefState.query = search.value;
      paintPrefectureRows();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applySortSelection(sortSelect.value);
      paintPrefectureRows();
    });
  }
  document.querySelectorAll('.th-sort').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.sortKey;
      if (prefState.sortKey === key) {
        prefState.sortDir *= -1;
      } else {
        prefState.sortKey = key;
        prefState.sortDir = key === 'population' ? -1 : 1;
      }
      paintPrefectureRows();
    });
  });
  paintPrefectureRows();
}

window.addEventListener('hashchange', renderRoute);
renderRoute();
