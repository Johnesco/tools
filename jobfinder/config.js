// JobFinder board list.
// URL placeholders: {keyword}, {city}, {state}, {keyword-dash}
//   {keyword-dash} = keyword lowercased with spaces as dashes ("QA Engineer" -> "qa-engineer")
// A board with location: null is remote-only.
//
// Audited 2026-08:
//   - Indeed also covers Glassdoor (same job backend)
//   - Monster also covers CareerBuilder (companies merged 2024)
//   - Stack Overflow Jobs removed (shut down 2022; domain squatted)
//   - Remotive not includable (keyword search is client-side only; no URL can prefill it)
//   - Netflix/Big Tech/startup boards dropped 2026-08 in the simplification pass —
//     see git history if they need to come back

const CONFIG = {
  boards: [
    {
      name: "LinkedIn",
      urls: {
        location: "https://www.linkedin.com/jobs/search/?keywords={keyword}&location={city}%2C%20{state}",
        remote: "https://www.linkedin.com/jobs/search/?keywords={keyword}&f_WT=2"
      }
    },
    {
      name: "Indeed",
      urls: {
        location: "https://www.indeed.com/jobs?q={keyword}&l={city}%2C%20{state}",
        remote: "https://www.indeed.com/jobs?q={keyword}&l=remote"
      }
    },
    {
      name: "ZipRecruiter",
      urls: {
        location: "https://www.ziprecruiter.com/jobs-search?search={keyword}&location={city}%2C%20{state}",
        remote: "https://www.ziprecruiter.com/jobs-search?search={keyword}&location=Remote%20%28USA%29"
      }
    },
    {
      name: "Monster",
      urls: {
        location: "https://www.monster.com/jobs/search?q={keyword}&where={city}%2C%20{state}",
        remote: "https://www.monster.com/jobs/search?q={keyword}&where=remote"
      }
    },
    {
      name: "SimplyHired",
      urls: {
        location: "https://www.simplyhired.com/search?q={keyword}&l={city}%2C%20{state}",
        remote: "https://www.simplyhired.com/search?q={keyword}&l=remote"
      }
    },
    {
      name: "Dice",
      urls: {
        location: "https://www.dice.com/jobs?q={keyword}&location={city}%2C%20{state}",
        remote: "https://www.dice.com/jobs?q={keyword}&filters.workplaceTypes=Remote&filters.isRemote=true"
      }
    },
    {
      name: "Built In",
      urls: {
        location: "https://builtin.com/jobs/office?search={keyword}&city={city}&state={state}&country=USA&allLocations=true",
        remote: "https://builtin.com/jobs/remote?search={keyword}&allLocations=true"
      }
    },
    {
      name: "RemoteOK",
      urls: {
        location: null,
        remote: "https://remoteok.com/remote-{keyword-dash}-jobs"
      }
    },
    {
      name: "Himalayas",
      urls: {
        location: null,
        remote: "https://himalayas.app/jobs?query={keyword}"
      }
    },
    {
      name: "Jobicy",
      urls: {
        location: null,
        remote: "https://jobicy.com/?s={keyword}"
      }
    }
  ]
};
