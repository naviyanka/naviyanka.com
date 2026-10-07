/* ===========================================================
   naviyanka.com — site script
   Edit PROJECTS below to update the board and the terminal.
   status: "building" | "planning" | "concept"
   =========================================================== */
const GITHUB_USER = "naviyanka";

const PROJECTS = [
  {
    group: "Infrastructure",
    items: [
      {
        id: "nexus", name: "NEXUS", status: "building",
        line: "Agentless Windows Server management",
        body: "Manages a fleet of Windows servers over WinRM and CIM with nothing installed on the targets. V2 is a ground-up rebuild after a security audit: credentials in a DPAPI vault, scheduled jobs on Quartz.NET, live updates over SignalR, and an AI assistant wired in through Azure AI Foundry.",
        tags: ["ASP.NET Core 8", "SignalR", "EF Core", "SQLite", "React", "TypeScript", "WinRM"],
        repo: null
      }
    ]
  },
  {
    group: "Security",
    items: [
      {
        id: "lleo", name: "LLEO Framework", status: "building",
        line: "Modular recon suite for bug bounty",
        body: "Subdomain enumeration, web probing, fuzzing and vulnerability scanning, all running in parallel. v2 adds a planner, executor and critic loop across multiple models, attack-graph memory, human approvals for anything risky, and a strict scope and ethics engine.",
        tags: ["Python", "Kali Linux", "PyQt6", "Multi-model agents"],
        repo: null
      },
      {
        id: "shield", name: "S.H.I.E.L.D.", status: "concept",
        line: "Personal AI assistant that watches my systems",
        body: "System Hacking Intelligence & Endpoint Learning Daemon. A project-aware assistant that monitors my machines and knows what I'm building, running on a small local model or in the cloud.",
        tags: ["AI assistant", "Monitoring", "Local LLM"],
        repo: null
      }
    ]
  },
  {
    group: "AI systems",
    items: [
      {
        id: "nvlabs", name: "NVLabs AI Company", status: "planning",
        line: "A company where every employee is an agent",
        body: "Thirteen LangGraph agents in two waves, each sandboxed in its own Docker Compose service with shared memory in pgvector and a kill switch from day one. Next up: a Teams interface on an M365 E5 tenant and a Hindi voice line to the CEO agent.",
        tags: ["LangGraph", "pgvector", "Docker Compose", "Microsoft Graph"],
        repo: null
      },
      {
        id: "bitoffice", name: "BitOffice", status: "building",
        line: "A virtual office you can watch the agents work in",
        body: "An isometric office where AI agents with personalities and memory go about their day. Ships with a rate-limited REST API, webhooks, a Telegram bot, a pipeline builder and per-agent cost estimates. Currently moving from PixiJS to React Three Fiber for real 3D.",
        tags: ["Three.js", "React Three Fiber", "PixiJS", "REST API", "Telegram"],
        repo: "https://github.com/naviyanka/NvLabsOrg"
      },
      {
        id: "directorbyte", name: "DirectorByte V2", status: "planning",
        line: "AI film generation studio",
        body: "A monorepo for generating films with AI, with a browser-based installer in the spirit of WordPress and Nextcloud. The build plan runs 18 phases, from the studio pipeline to subscriptions and a support center.",
        tags: ["Monorepo", "Generative video", "Web installer"],
        repo: "https://github.com/naviyanka/Project-DirectorByte-V2"
      }
    ]
  },
  {
    group: "Products",
    items: [
      {
        id: "chaihub", name: "ChaiHub", status: "concept",
        line: "A PWA for your neighbourhood chaiwala",
        body: "Hyper-local app for tea stalls: a running udhar (credit) book per shop, delivery to your room or desk, and discovery of stalls nearby. Planned as a pilot-first SaaS.",
        tags: ["PWA", "Hyper-local", "SaaS"],
        repo: null
      }
    ]
  }
];

const STATUS_LABEL = { building: "In progress", planning: "Planning", concept: "Concept" };
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- project board ---------- */
function renderBoard() {
  const board = $("#board");
  board.innerHTML = PROJECTS.map((g) => `
    <div class="group">
      <h3>${esc(g.group)}</h3>
      <div class="rows">
        ${g.items.map((p) => `
          <details class="row" id="p-${p.id}">
            <summary>
              <span class="status s-${p.status}">${STATUS_LABEL[p.status]}</span>
              <span class="row-name">${esc(p.name)}</span>
              <span class="row-line">${esc(p.line)}</span>
              <span class="row-toggle" aria-hidden="true">+</span>
            </summary>
            <div class="row-body"><div>
              <p>${esc(p.body)}</p>
              <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              ${p.repo
                ? `<a class="repo-link" href="${p.repo}">View the repository</a>`
                : `<a class="repo-link" href="https://github.com/${GITHUB_USER}">More on GitHub</a>`}
            </div></div>
          </details>`).join("")}
      </div>
    </div>`).join("");
}

/* ---------- hero console ---------- */
const HERO_SCRIPT = [
  ["cmd", "whoami"],
  ["out", 'navi <span class="dim">(naviyanka)</span>'],
  ["out", "support engineer, builder, bug hunter"],
  ["cmd", "cat ./day-job"],
  ["out", "Microsoft OneDrive &amp; SharePoint, Online + on-prem"],
  ["out", "2016 / 2019 / Subscription Edition farms"],
  ["cmd", "ls ~/projects"],
  ["out", '<span class="k">nexus/  lleo/  bitoffice/  directorbyte/</span>'],
  ["out", '<span class="k">nvlabs-company/  shield/  chaihub/</span>'],
  ["cmd", "uptime"],
  ["out", '<span class="ok">building since forever, 0 incidents unresolved</span>']
];

async function typeHero() {
  const el = $("#hero-console");
  if (!el) return;
  const prompt = '<span class="p">$</span> ';
  let html = "";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  if (reduceMotion) {
    html = HERO_SCRIPT.map(([t, s]) => (t === "cmd" ? prompt + s : s)).join("\n");
    el.innerHTML = html + "\n" + prompt + '<span class="caret"></span>';
    return;
  }
  for (const [type, text] of HERO_SCRIPT) {
    if (type === "cmd") {
      html += (html ? "\n" : "") + prompt;
      for (const ch of text) {
        html += ch;
        el.innerHTML = html + '<span class="caret"></span>';
        await sleep(38 + Math.random() * 45);
      }
      await sleep(220);
    } else {
      html += "\n" + text;
      el.innerHTML = html + '<span class="caret"></span>';
      await sleep(90);
    }
  }
  el.innerHTML = html + "\n" + prompt + '<span class="caret"></span>';
}

/* ---------- live GitHub strip ---------- */
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
function ago(iso) {
  const sec = (new Date(iso) - Date.now()) / 1000;
  const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [u, s] of units) if (Math.abs(sec) >= s) return rtf.format(Math.round(sec / s), u);
  return "just now";
}

let ghCache = null;
async function loadGitHub() {
  const led = $("#gh-led");
  try {
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => { if (!r.ok) throw r; return r.json(); }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=5`).then((r) => { if (!r.ok) throw r; return r.json(); })
    ]);
    ghCache = { user, repos };
    $("#gh-repos").textContent = user.public_repos;
    $("#gh-followers").textContent = user.followers;
    const last = repos[0];
    if (last) {
      const a = $("#gh-last");
      a.textContent = `${last.name}, ${ago(last.pushed_at)}`;
      a.href = last.html_url;
    }
    led.classList.add("live");
    led.title = "Live from the GitHub API";
  } catch {
    $("#gh-last").textContent = "Couldn't reach GitHub just now. Open the profile instead.";
    led.classList.add("down");
  }
}

/* ---------- terminal ---------- */
const term = $("#terminal");
const out = $("#term-out");
const input = $("#term-input");
const history = [];
let hIdx = 0;

function print(html, cls = "") {
  const div = document.createElement("div");
  if (cls) div.className = cls;
  div.innerHTML = html;
  out.append(div);
  out.scrollTop = out.scrollHeight;
}

const allProjects = () => PROJECTS.flatMap((g) => g.items);

const COMMANDS = {
  help: () => print(
`<span class="k">help</span>        this list
<span class="k">whoami</span>      who's behind the keyboard
<span class="k">ls</span>          list projects
<span class="k">open</span> &lt;id&gt;   show a project, e.g. open nexus
<span class="k">notes</span>       SharePoint field notes
<span class="k">lab</span>         what's running in the homelab
<span class="k">github</span>      live GitHub stats
<span class="k">contact</span>     how to reach me
<span class="k">clear</span>       clear the screen
<span class="k">exit</span>        close the terminal`),
  whoami: () => print("navi (naviyanka)\nSenior support engineer on Microsoft OneDrive & SharePoint.\nBuilds AI systems, security tooling and infra. Hunts bugs. Heading for DevOps."),
  ls: () => print(PROJECTS.map((g) => `<span class="dim">${esc(g.group)}</span>\n` +
      g.items.map((p) => `  <span class="k">${p.id.padEnd(14)}</span>${esc(STATUS_LABEL[p.status]).padEnd(13)}${esc(p.line)}`).join("\n")).join("\n")),
  open: (arg) => {
    const p = allProjects().find((x) => x.id === (arg || "").toLowerCase());
    if (!p) return print(`open: no project called "${esc(arg || "")}". Try <span class="k">ls</span>.`, "err");
    print(`<span class="p">${esc(p.name)}</span> [${STATUS_LABEL[p.status]}]\n${esc(p.body)}\nstack: ${p.tags.map(esc).join(", ")}` +
      (p.repo ? `\nrepo: <a href="${p.repo}">${p.repo.replace("https://", "")}</a>` : ""));
    const row = document.getElementById(`p-${p.id}`);
    if (row) row.open = true;
  },
  notes: () => print(
`[sev 1] Recovering a SharePoint SE farm with no backup
[sev 2] PSConfig dies on the 2019 June CU
[sev 3] Sharing links quietly vanishing (MC1242772)
[sev 3] A news widget broken by an orphaned taxonomy field
<span class="dim">write-ups in progress</span>`),
  lab: () => print("9 Windows Servers, managed agentlessly\nM365 E5 tenant for Graph and Teams experiments\nDocker Compose sandboxes for the agent swarm\nlearning: ansible, prometheus, grafana, elk"),
  github: () => {
    if (!ghCache) return print("GitHub stats not loaded yet (or rate-limited). Try again in a moment.", "err");
    const { user, repos } = ghCache;
    print(`repos: ${user.public_repos}   followers: ${user.followers}\nrecently pushed:\n` +
      repos.map((r) => `  <a href="${r.html_url}">${esc(r.name)}</a> <span class="dim">${ago(r.pushed_at)}</span>`).join("\n"));
  },
  contact: () => print('email: <a href="mailto:hello@naviyanka.com">hello@naviyanka.com</a>\ngithub: <a href="https://github.com/naviyanka">github.com/naviyanka</a>'),
  clear: () => { out.innerHTML = ""; },
  exit: () => term.close(),
  sudo: () => print("Nice try. This incident has been logged. 🫖", "err"),
  chai: () => print("Brewing… ☕ adrak, elaichi, extra patti. Ready in 4 minutes.")
};

function run(raw) {
  const line = raw.trim();
  print(`<span class="p">$</span> ${esc(line)}`);
  if (!line) return;
  history.push(line); hIdx = history.length;
  const [cmd, ...args] = line.split(/\s+/);
  const fn = COMMANDS[cmd.toLowerCase()];
  fn ? fn(args.join(" ")) : print(`${esc(cmd)}: command not found. Type <span class="k">help</span>.`, "err");
}

function openTerminal() {
  if (term.open) return;
  term.showModal();
  if (!out.childElementCount) print('Welcome to the NVLabs shell. Type <span class="k">help</span> to see what I can do.');
  input.focus();
}

function initTerminal() {
  document.querySelectorAll("[data-open-terminal]").forEach((b) => b.addEventListener("click", openTerminal));
  document.querySelectorAll("[data-close-terminal]").forEach((b) => b.addEventListener("click", () => term.close()));

  $("#term-form").addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hIdx > 0) { input.value = history[--hIdx]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ""; e.preventDefault(); }
  });

  document.addEventListener("keydown", (e) => {
    const typing = e.target.closest("input, textarea, [contenteditable]");
    if (!typing && (e.key === "`" || e.key === "~")) { e.preventDefault(); openTerminal(); }
  });

  // Light-dismiss fallback for browsers without <dialog closedby> (Safari)
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    term.addEventListener("click", (e) => {
      if (e.target !== term) return;
      const r = term.getBoundingClientRect();
      const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
      if (!inside) term.close();
    });
  }
}

/* ---------- boot ---------- */
$("#year").textContent = new Date().getFullYear();
renderBoard();
initTerminal();
typeHero();
loadGitHub();
