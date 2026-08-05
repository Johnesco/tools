# JobFinder

Type your job titles once. Get one-click search links across 10 job boards, each opening in a new tab, with a note of when you last ran each search — green check for today, amber when it's gone stale.

**Live:** https://johnesco.github.io/tools/jobfinder/

## Privacy

Everything is saved only in your browser (localStorage). No server, no account, no analytics, no tracking. JobFinder never fetches or scrapes anything — the links just open each board's own search page.

## Boards

LinkedIn, Indeed (covers Glassdoor), ZipRecruiter, Monster (covers CareerBuilder), SimplyHired, Dice, Built In, RemoteOK, Himalayas, Jobicy.

Each board row has a **Location** link (uses your city/state) and a **Remote** link. The last three boards are remote-only.

One button flips the grouping — cards per job title or cards per job board — and the rows animate to their new spots so you can follow the rearrangement.

## Files

```
index.html   # The app — all HTML, CSS, and JS
config.js    # Board URL templates — edit to add or change boards
```

No build, no dependencies. Edit, refresh, done.

Board templates use `{keyword}`, `{city}`, `{state}`, and `{keyword-dash}` ("QA Engineer" → "qa-engineer") placeholders. A board with `location: null` is remote-only.
