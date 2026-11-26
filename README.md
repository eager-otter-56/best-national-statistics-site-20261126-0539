[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/eager-otter-56/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/eager-otter-56/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Japan in Numbers — Nippon Statistics Atlas

An original, fully offline national statistics site for Japan, built for the
make.fun bounty **best-national-statistics-site-20261126-0539**
(https://make.fun/bounty/best-national-statistics-site-20261126-0539).

The atlas tells the story of Japan through its official statistics: a shrinking,
ageing population of 123.8 million, a record ¥609.3 trillion economy, all 47
prefectures, and the everyday numbers of health, school, households and work.
Every figure on every page carries its source and year. The site is plain static
files with no build step and no network requests — open `app/index.html` and it
works, on a desktop or a phone.

## The five sections

- **Overview** (`#/`) — eight headline indicators (population, GDP, GDP per
  capita, life expectancy, median age, fertility, unemployment, households),
  a line chart of a century of census population (1920–2020), and Japan at a glance.
- **Population** (`#/population`) — the 2020 Census population pyramid by
  five-year age group and sex, the three-generation split (0–14 / 15–64 / 65+),
  census totals by decade, the rise of the 65+ share to 29.1%, and 2023 births,
  deaths and marriages.
- **Economy** (`#/economy`) — nominal GDP 2014–2024, sector shares, consumer
  prices, the labour market in 2024, and trade with its largest partners.
- **Prefectures** (`#/prefectures`) — all 47 prefectures with 2020 Census
  populations, capitals and regions, a top-ten chart, and a table with a
  working text search and working sort (menu or clickable column headers).
- **Life** (`#/life`) — life expectancy for men and women 1990–2023, doctors
  and infant mortality, school continuation, household size and single-person
  households, working hours and paid-leave uptake.

## Sources

Statistics Bureau of Japan (Population Census, Labour Force Survey, Consumer
Price Index, Population Estimates), Cabinet Office (National Accounts),
Ministry of Health, Labour and Welfare (Vital Statistics, Abridged Life
Tables, Monthly Labour Survey), Ministry of Finance (Trade Statistics),
MEXT (School Basic Survey), the World Bank (World Development Indicators)
and the OECD (Health Statistics). Each panel on the site names its own
source and year.

## Layout of this repository

- `main.ts` — the hand-in program (Node 22, standard library only). It copies
  `app/` and `screenshots/` into the output directory and writes
  `dossier.json` with the vendored library.
- `app/` — the site itself: `index.html`, `style.css`, and ES modules split
  by job — `data.js` (every figure, with its source), `charts.js` (SVG chart
  builders), `views.js` (one render function per section), `main.js` (the
  hash router and the prefecture table controls).
- `screenshots/` — four real renders of the site (desktop overview,
  prefectures, economy, and a phone-size overview); `shots.json` records
  the route and viewport of each.
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
