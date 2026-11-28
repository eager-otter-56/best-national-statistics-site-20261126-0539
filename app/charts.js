// charts.js — small builders that return inline SVG strings.
// Every chart is drawn from the numbers in data.js; nothing is an image
// and nothing is loaded from elsewhere.

const INK = '#232c47';
const FAINT = '#8a90a6';
const GRID = '#e3ddcf';
const INDIGO = '#2c4a8a';
const VERMILLION = '#e03a1e';

function escapeText(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function niceCeiling(value) {
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const power = 10 ** Math.floor(Math.log10(value));
  for (const step of steps) {
    if (value <= step * power) return step * power;
  }
  return 10 * power;
}

// A single-series line chart with a soft area fill, gridlines and the
// first, peak and last values labelled.
// points: [{ label, value }]; formatValue renders axis + label numbers.
export function lineChart({ points, width = 720, height = 300, color = INDIGO, formatValue = (v) => v }) {
  const padLeft = 52;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const maxY = niceCeiling(Math.max(...points.map((p) => p.value)) * 1.05);
  const minY = 0;
  const x = (i) => padLeft + (i / (points.length - 1)) * innerW;
  const y = (v) => padTop + innerH - ((v - minY) / (maxY - minY)) * innerH;

  let grid = '';
  for (let g = 0; g <= 4; g += 1) {
    const gv = minY + ((maxY - minY) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${padLeft}" y1="${gy}" x2="${width - padRight}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    grid += `<text x="${padLeft - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${escapeText(formatValue(gv))}</text>`;
  }

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;

  let dots = '';
  let labels = '';
  const peakIndex = points.reduce((best, p, i) => (p.value > points[best].value ? i : best), 0);
  const labelIndexes = new Set([0, peakIndex, points.length - 1]);
  points.forEach((p, i) => {
    dots += `<circle cx="${x(i)}" cy="${y(p.value)}" r="2.6" fill="${color}"/>`;
    if (labelIndexes.has(i)) {
      const anchor = i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle';
      labels += `<text x="${x(i)}" y="${y(p.value) - 9}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${INK}">${escapeText(formatValue(p.value))}</text>`;
    }
    if (i % Math.ceil(points.length / 6) === 0 || i === points.length - 1) {
      labels += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${FAINT}">${escapeText(p.label)}</text>`;
    }
  });

  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${grid}<path d="${area}" fill="${color}" opacity="0.12"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// Two-series line chart (used for men's and women's life expectancy,
// and for births against deaths). series: [{ name, color, values }],
// labels: [x labels]. yMin / yMax fix the axis when the caller wants a
// zero baseline or round bounds; left unset, the axis hugs the data.
export function dualLineChart({ labels, series, width = 720, height = 300, formatValue = (v) => v, yMin, yMax }) {
  const padLeft = 44;
  const padRight = 16;
  const padTop = 26;
  const padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const all = series.flatMap((s) => s.values);
  const rawMin = Math.min(...all);
  const rawMax = Math.max(...all);
  const minY = yMin ?? Math.floor((rawMin - 2) / 5) * 5;
  const maxY = yMax ?? Math.ceil((rawMax + 2) / 5) * 5;
  const x = (i) => padLeft + (i / (labels.length - 1)) * innerW;
  const y = (v) => padTop + innerH - ((v - minY) / (maxY - minY)) * innerH;

  let out = '';
  for (let g = 0; g <= 4; g += 1) {
    const gv = minY + ((maxY - minY) * g) / 4;
    const gy = y(gv);
    out += `<line x1="${padLeft}" y1="${gy}" x2="${width - padRight}" y2="${gy}" stroke="${GRID}"/>`;
    out += `<text x="${padLeft - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${FAINT}">${escapeText(formatValue(gv))}</text>`;
  }
  labels.forEach((label, i) => {
    out += `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${FAINT}">${escapeText(label)}</text>`;
  });
  series.forEach((s, si) => {
    const path = s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    out += `<path d="${path}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round"/>`;
    s.values.forEach((v, i) => {
      out += `<circle cx="${x(i)}" cy="${y(v)}" r="2.6" fill="${s.color}"/>`;
    });
    const last = s.values[s.values.length - 1];
    // The final value sits above its point, anchored to the right edge:
    // drawn to the right of the point it would spill past the viewBox.
    out += `<text x="${x(labels.length - 1)}" y="${y(last) - 9}" text-anchor="end" font-size="12" font-weight="700" fill="${s.color}">${escapeText(formatValue(last))}</text>`;
    out += `<circle cx="${padLeft + si * 130}" cy="${10}" r="5" fill="${s.color}"/>`;
    out += `<text x="${padLeft + si * 130 + 10}" y="${14}" font-size="12" fill="${INK}">${escapeText(s.name)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${out}</svg>`;
}

// Horizontal bars with the value printed at the end of each bar.
// items: [{ label, value, display }] — display is the printed number.
// valueW reserves room for the printed number; widen it for long displays.
export function horizontalBars({ items, width = 720, color = VERMILLION, rowHeight = 30, valueW = 108 }) {
  const labelW = 118;
  const barW = width - labelW - valueW;
  const height = items.length * rowHeight + 8;
  const max = Math.max(...items.map((item) => item.value));
  let out = '';
  items.forEach((item, i) => {
    const top = i * rowHeight + 4;
    const w = Math.max(2, (item.value / max) * barW);
    out += `<text x="${labelW - 10}" y="${top + rowHeight / 2 + 5}" text-anchor="end" font-size="14" fill="${INK}">${escapeText(item.label)}</text>`;
    out += `<rect x="${labelW}" y="${top + 4}" width="${w.toFixed(1)}" height="${rowHeight - 10}" rx="4" fill="${color}"/>`;
    out += `<text x="${labelW + w + 8}" y="${top + rowHeight / 2 + 5}" font-size="13.5" font-weight="700" fill="${INK}">${escapeText(item.display)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${out}</svg>`;
}

// One stacked horizontal bar showing percentage shares that sum to ~100.
// segments: [{ label, share, color }] — a legend is rendered by the caller.
export function shareBar({ segments, width = 720, height = 44 }) {
  let cursor = 0;
  let out = '';
  for (const segment of segments) {
    const w = (segment.share / 100) * width;
    out += `<rect x="${cursor.toFixed(1)}" y="4" width="${Math.max(0, w - 2).toFixed(1)}" height="${height - 8}" rx="5" fill="${segment.color}"/>`;
    out += `<text x="${(cursor + w / 2).toFixed(1)}" y="${height / 2 + 5}" text-anchor="middle" font-size="13.5" font-weight="700" fill="#ffffff">${segment.share}%</text>`;
    cursor += w;
  }
  return `<svg viewBox="0 0 ${width} ${height}" role="img" class="chart">${out}</svg>`;
}

// Population pyramid: men extend left (indigo), women right (vermillion).
// groups are ordered youngest first in data.js and drawn oldest at the top.
// Values are exact persons; the scale runs to exactly 5,000,000 and each
// bar end is labelled in millions so the headcount can be read off.
export function pyramidChart({ groups, width = 720 }) {
  const rowH = 19;
  const labelW = 52;
  const valueW = 46;
  const centre = width / 2;
  const halfBar = centre - labelW / 2 - valueW;
  const height = groups.length * rowH + 30;
  const max = 5_000_000;
  const millions = (n) => `${(n / 1_000_000).toFixed(2)}M`;
  const ordered = [...groups].reverse();
  let out = '';
  out += `<text x="${centre - labelW / 2 - halfBar}" y="15" font-size="14" font-weight="700" fill="${INDIGO}">Men</text>`;
  out += `<text x="${centre + labelW / 2 + halfBar}" y="15" text-anchor="end" font-size="14" font-weight="700" fill="${VERMILLION}">Women</text>`;
  ordered.forEach((group, i) => {
    const top = 24 + i * rowH;
    const maleW = (group.male / max) * halfBar;
    const femaleW = (group.female / max) * halfBar;
    const midY = top + rowH / 2 + 4;
    out += `<rect x="${(centre - labelW / 2 - maleW).toFixed(1)}" y="${top}" width="${maleW.toFixed(1)}" height="${rowH - 6}" rx="3" fill="${INDIGO}"/>`;
    out += `<rect x="${centre + labelW / 2}" y="${top}" width="${femaleW.toFixed(1)}" height="${rowH - 6}" rx="3" fill="${VERMILLION}"/>`;
    out += `<text x="${(centre - labelW / 2 - maleW - 5).toFixed(1)}" y="${midY}" text-anchor="end" font-size="12" fill="${INK}">${millions(group.male)}</text>`;
    out += `<text x="${(centre + labelW / 2 + femaleW + 5).toFixed(1)}" y="${midY}" font-size="12" fill="${INK}">${millions(group.female)}</text>`;
    out += `<text x="${centre}" y="${midY}" text-anchor="middle" font-size="13" fill="${INK}">${escapeText(group.label)}</text>`;
  });
  const axisY = 24 + groups.length * rowH + 2;
  out += `<text x="${centre - labelW / 2 - halfBar}" y="${axisY + 12}" font-size="11" fill="${FAINT}">5 million</text>`;
  out += `<text x="${centre + labelW / 2 + halfBar}" y="${axisY + 12}" text-anchor="end" font-size="11" fill="${FAINT}">5 million</text>`;
  return `<svg viewBox="0 0 ${width} ${height + 16}" role="img" class="chart">${out}</svg>`;
}
