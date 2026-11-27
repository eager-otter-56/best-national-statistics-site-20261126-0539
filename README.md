[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/eager-otter-56/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/eager-otter-56/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Japan in Numbers — Nippon Statistics Atlas

An original, fully offline national statistics site for Japan, built for the
make.fun bounty **best-national-statistics-site-20261126-0539**
(https://make.fun/bounty/best-national-statistics-site-20261126-0539).

The atlas tells the story of Japan through its official statistics: a shrinking,
ageing population of 123.8 million, a record ¥636.9 trillion economy, all 47
prefectures, and the everyday numbers of health, school, households and work.
Every figure on every page carries its source and year. The site is plain static
files with no build step and no network requests — open `app/index.html` and it
works, on a desktop or a phone.

## The five sections

- **Overview** (`#/`) — eight headline indicators (population, GDP, GDP per
  capita, life expectancy, median age, fertility, unemployment, households),
  a line chart of a century of census population (1920–2020), and Japan at a glance.
- **Population** (`#/population`) — the 2020 Census population pyramid with the
  exact five-year age-group headcounts by sex from Table 2-3 of the census
  (original values, including the 2,931,838 people whose age was not reported),
  the three-generation split (0–14 / 15–64 / 65+) on the census's imputed
  values, census totals by decade, the rise of the 65+ share to 29.1%, a
  births-and-deaths series 1970–2024 (the two lines cross in 2005; the
  2024 gap is a record 919,205), and 2023 births, deaths and marriages.
- **Economy** (`#/economy`) — nominal GDP 2014–2024 on the Cabinet Office's
  2020-benchmark National Accounts, sector shares, consumer prices, the labour
  market in 2024, and trade (2024 final values) with its largest partners.
- **Prefectures** (`#/prefectures`) — all 47 prefectures with 2020 Census
  populations, capitals and regions, opened by a tile-grid map of Japan:
  one tile per prefecture in its geographic position (Hokkaido top right,
  Okinawa bottom left), shaded by population with a legend and the exact
  headcount on every tile. Beside it a top-ten chart, then a comparison
  tool that puts any two or three prefectures side by side with their
  shares of the national population and ranks, and a table with a working
  text search and working sort (menu or clickable column headers).
- **Life** (`#/life`) — life expectancy for men and women 1990–2023, doctors
  and infant mortality, school continuation, household size and single-person
  households, working hours and paid-leave uptake.

## Sources

The headline series come from these exact publications:

- **Population Census 2020, Table 2-3 (original values)**, Statistics Bureau
  of Japan — every bar of the population pyramid is an exact headcount from
  this table; the broad age shares use the same census's imputed values.
- **National Accounts (2020 benchmark)**, Cabinet Office — the nominal GDP
  series 2014–2024 (the superseded 2015-benchmark series is not used).
- **Life tables**, Ministry of Health, Labour and Welfare — complete life
  tables to 2020 and the abridged life table for 2023 (life expectancy).
- **Vital Statistics (final figures), 2024, Table 2**, Ministry of Health,
  Labour and Welfare — the births-and-deaths annual series 1970–2024,
  exact counts (2024: 686,173 births, 1,605,378 deaths).
- **Trade Statistics of Japan, 2024 (final values)**, Ministry of Finance —
  exports ¥107.09 trillion, imports ¥112.72 trillion, balance −¥5.63 trillion.

Also used: Statistics Bureau (Labour Force Survey, Consumer Price Index,
Population Estimates), MHLW (Vital Statistics, Monthly Labour Survey),
MEXT (School Basic Survey), the World Bank (World Development Indicators,
for the US-dollar GDP-per-capita series) and the OECD (Health Statistics).
Each panel on the site names its own source and year.

## Layout of this repository

- `main.ts` — the hand-in program (Node 22, standard library only). It copies
  `app/` and `screenshots/` into the output directory and writes
  `dossier.json` with the vendored library.
- `app/` — the site itself: `index.html`, `style.css`, and ES modules split
  by job — `data.js` (every figure, with its source), `charts.js` (SVG chart
  builders), `views.js` (one render function per section), `main.js` (the
  hash router and the prefecture table controls).
- `screenshots/` — four real renders of the site (desktop overview, the
  population pyramid, the prefectures section with its tile map and top-ten
  chart, and a phone-size overview); `shots.json` records the route and
  viewport of each.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## Run it locally

Serve the `app/` folder with any static file server and open it in a browser, e.g.:

```
cd app && python3 -m http.server 8080
```

To produce the hand-in output:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
