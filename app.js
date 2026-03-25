/* ─────────────────────────────────────────────────────────────
   SinapsisICU AI — App Logic
   Search + Category filter · Card renderer
   ───────────────────────────────────────────────────────────── */

// ── GPT DATA ─────────────────────────────────────────────────
const GPTS = [
  {
    id: "sepsis-evidence-ai",
    name: "Sepsis Evidence AI",
    category: "sepsis",
    categoryLabel: "Sepsis e Infecciones",
    categoryEmoji: "🦠",
    description: "Síntesis crítica de evidencia y guías actualizadas en sepsis con enfoque académico y razonamiento clínico estructurado.",
    url: "https://chatgpt.com/g/g-69971e4e32408191a796bdaa03e256f1-sepsis-evidence-ai",
    logo: "Sepsis_Evidence_AI.png",
    logoFallback: "🦠",
  },
  {
    id: "infectoicu-ai-edu",
    name: "InfectoICU AI EDU",
    category: "sepsis",
    categoryLabel: "Sepsis e Infecciones",
    categoryEmoji: "🦠",
    description: "Simulación clínica y razonamiento diagnóstico en infecciones graves en el paciente crítico. Educación basada en casos.",
    url: "https://chatgpt.com/g/g-68f59f9c84bc81918e014507fa4cfcb9-infectoicu-ai-edu-2026",
    logo: "InfectoICU AI.png",
    logoFallback: "🦠",
  },
  {
    id: "ventrix-ai",
    name: "Ventrix AI",
    category: "ventilacion",
    categoryLabel: "Ventilación Mecánica",
    categoryEmoji: "🫁",
    description: "Simulación y análisis del soporte ventilatorio en pacientes adultos y gestantes en UCI. Protección pulmonar y weaning.",
    url: "https://chatgpt.com/g/g-68b0b05737888191a043ca5757127612-ventrix-ai-vm-adultos-y-gestantes",
    logo: "Ventrix AI.png",
    logoFallback: "🫁",
  },
  {
    id: "ventrixped-ai",
    name: "VentrixPed AI",
    category: "ventilacion",
    categoryLabel: "Ventilación Mecánica",
    categoryEmoji: "🫁",
    description: "Entrenamiento fisiológico y toma de decisiones en ventilación mecánica pediátrica con enfoque académico avanzado.",
    url: "https://chatgpt.com/g/g-68b0d6e344388191840e545b79df7c24-ventrixped-ai-simulador-academico-vm-en-ucip",
    logo: "VentrixPedAI 6.png",
    logoFallback: "🫁",
  },
  {
    id: "hemodynai-edu",
    name: "HemodynAI EDU",
    category: "hemodinamia",
    categoryLabel: "Hemodinamia y Perfusión",
    categoryEmoji: "❤️",
    description: "Interpretación avanzada de la fisiología cardiovascular y la perfusión en el paciente crítico. Monitoreo hemodinámico.",
    url: "https://chatgpt.com/g/g-68f5623d25f4819183e4137028a8b3ac-hemodynai-edu",
    logo: "HemodynAI.png",
    logoFallback: "❤️",
  },
     {
    id: "cardiofailure-ai",
    name: "CardioFailure AI",
    category: "hemodinamia",
    categoryLabel: "Hemodinamia y Perfusión",
    categoryEmoji: "❤️",
    description: "Simulación y razonamiento clínico en insuficiencia cardíaca basado en guías y evidencia actual.",
    url: "https://chatgpt.com/g/g-697ffa7a15988191aae725ae2958379f-cardiofailure-aitm",
    logo: "CardioFailure AI.png",
    logoFallback: "❤️",
  },
  {
    id: "hematicu-pro",
    name: "HematICU Pro",
    category: "coagulacion",
    categoryLabel: "Coagulación y Trombosis",
    categoryEmoji: "🩸",
    description: "Análisis académico de coagulopatías y pruebas viscoelásticas en cuidados intensivos. ROTEM, TEG y manejo del sangrado.",
    url: "https://chatgpt.com/g/g-68f7fe00f660819195a08babe4574636-hematicu-pro-simulador-academico-avanzado",
    logo: "HematICU Pro.png",
    logoFallback: "🩸",
  },
  {
    id: "pe-code-edu",
    name: "PE-CODE-EDU",
    category: "coagulacion",
    categoryLabel: "Coagulación y Trombosis",
    categoryEmoji: "🩸",
    description: "Entrenamiento estructurado en diagnóstico y estratificación del tromboembolismo pulmonar. Algoritmos Wells, PESI y terapia.",
    url: "https://chatgpt.com/g/g-69315f24400881919f58c8cc655982da-pe-code-edu-pulmonary-embolism-code-educac-v-2-0",
    logo: "PE CODE EDU.png",
    logoFallback: "🩸",
  },
  {
    id: "neuroicu-ai",
    name: "NeuroICU AI",
    category: "neuro",
    categoryLabel: "Neurocrítico",
    categoryEmoji: "🧠",
    description: "Simulación y razonamiento en neuromonitoreo y manejo del paciente crítico neurológico. Hipertensión endocraneana y neuroprotección.",
    url: "https://chatgpt.com/g/g-6913790f7a6881919ed9dd1ab4ac7726-neuroicu-ai",
    logo: "NeuroICU AI.png",
    logoFallback: "🧠",
  },
  {
    id: "nephroicu-edu",
    name: "NephroICU EDU",
    category: "renal",
    categoryLabel: "Renal y Metabolismo",
    categoryEmoji: "🧬",
    description: "Fisiopatología renal y toma de decisiones en terapia de reemplazo renal en UCI. CRRT, SLED y manejo hidroelectrolítico.",
    url: "https://chatgpt.com/g/g-690fa83f7010819193dca5c145bbb237-nephroicu-edu-v2-0",
    logo: "NephroICU.png",
    logoFallback: "🧬",
  },
  {
    id: "nutriicu-ai",
    name: "NutriICU AI",
    category: "renal",
    categoryLabel: "Renal y Metabolismo",
    categoryEmoji: "🧬",
    description: "Evaluación y planificación nutricional del paciente crítico con enfoque académico. Nutrición enteral, parenteral y requerimientos.",
    url: "https://chatgpt.com/g/g-68a1e52845088191a1f2c50dc838b70e-nutricu-ai",
    logo: "NutriICU AI.png",
    logoFallback: "🧬",
  },
  {
    id: "riskicu-ai",
    name: "RiskICU AI",
    category: "riesgo",
    categoryLabel: "Riesgo y Pronóstico",
    categoryEmoji: "⚖️",
    description: "Aplicación académica de escalas clínicas y evaluación de riesgo en medicina crítica. SOFA, APACHE, SAPS y más.",
    url: "https://chatgpt.com/g/g-6882d195ebc08191a1a2ef4efbd4cf48-riskicu-ia-de-simulacion-en-medicina-critica",
    logo: "RiskICU.png",
    logoFallback: "⚖️",
  },
  {
    id: "ecmoicu-ai",
    name: "ECMOICU AI",
    category: "ecmo",
    categoryLabel: "Soporte Extracorpóreo",
    categoryEmoji: "🫀",
    description: "Formación y análisis clínico en soporte extracorpóreo y pacientes en ECMO. Indicaciones, configuración y gestión de complicaciones.",
    url: "https://chatgpt.com/g/g-692059a52fe88191a5e2040dd75e8313-ecmoicu-ai",
    logo: "ECMOICU.png",
    logoFallback: "🫀",
  },
];

// ── CATEGORY COLOR MAP ────────────────────────────────────────
const CATEGORY_COLORS = {
  sepsis:      { hex: "#ef4444", rgb: "239,68,68"   },
  ventilacion: { hex: "#3b82f6", rgb: "59,130,246"  },
  hemodinamia: { hex: "#f43f5e", rgb: "244,63,94"   },
  coagulacion: { hex: "#dc2626", rgb: "220,38,38"   },
  neuro:       { hex: "#8b5cf6", rgb: "139,92,246"  },
  renal:       { hex: "#14b8a6", rgb: "20,184,166"  },
  riesgo:      { hex: "#f59e0b", rgb: "245,158,11"  },
  ecmo:        { hex: "#ec4899", rgb: "236,72,153"  },
};

// ── STATE ─────────────────────────────────────────────────────
let activeCategory = "all";
let searchQuery    = "";

// ── DOM REFS ──────────────────────────────────────────────────
const grid        = document.getElementById("gpt-grid");
const noResults   = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const countBadge  = document.getElementById("visible-count");
const catButtons  = document.querySelectorAll(".cat-btn");

// ── RENDER ────────────────────────────────────────────────────
function renderCards() {
  const query = searchQuery.toLowerCase().trim();

  const filtered = GPTS.filter((gpt) => {
    const matchCat  = activeCategory === "all" || gpt.category === activeCategory;
    const matchText = !query ||
      gpt.name.toLowerCase().includes(query) ||
      gpt.description.toLowerCase().includes(query) ||
      gpt.categoryLabel.toLowerCase().includes(query);
    return matchCat && matchText;
  });

  // Update counter badge
  const total = filtered.length;
  countBadge.textContent = total === GPTS.length
    ? `${total} asistentes`
    : `${total} de ${GPTS.length} asistentes`;

  // Clear grid
  grid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  filtered.forEach((gpt, i) => {
    const color = CATEGORY_COLORS[gpt.category] || { hex: "#3b82f6", rgb: "59,130,246" };
    const card  = document.createElement("article");
    card.className = "gpt-card";
    card.style.setProperty("--cat-color", color.hex);
    card.style.setProperty("--cat-rgb",   color.rgb);
    card.style.animationDelay = `${i * 40}ms`;

    card.innerHTML = `
      <div class="card-logo-wrap">
        <div class="card-logo">
          <img
            src="${gpt.logo}"
            alt="${gpt.name}"
            onerror="this.parentElement.textContent='${gpt.logoFallback}'"
          />
        </div>
        <span class="card-category-badge">
          ${gpt.categoryEmoji} ${gpt.categoryLabel}
        </span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${gpt.name}</h2>
        <p class="card-desc">${highlightMatch(gpt.description, query)}</p>
        <a
          href="${gpt.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="card-open-btn"
          aria-label="Abrir ${gpt.name} en ChatGPT"
        >
          Abrir en ChatGPT
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ── HIGHLIGHT SEARCH MATCHES ──────────────────────────────────
function highlightMatch(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark>$1</mark>"
  );
}

// ── EVENTS ────────────────────────────────────────────────────
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  searchClear.style.display = searchQuery ? "flex" : "none";
  renderCards();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  searchClear.style.display = "none";
  searchInput.focus();
  renderCards();
});

catButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.cat;
    catButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards();
  });
});

// ── KEYBOARD SHORTCUT: "/" focuses search ────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === "Escape" && document.activeElement === searchInput) {
    searchInput.blur();
  }
});

// ── HIGHLIGHT STYLE ───────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  mark {
    background: rgba(59,130,246,.25);
    color: #93c5fd;
    border-radius: 2px;
    padding: 0 2px;
  }
`;
document.head.appendChild(style);

// ── INIT ──────────────────────────────────────────────────────
renderCards();
