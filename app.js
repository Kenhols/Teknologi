const STORAGE_KEY = "htx_teknologi_vejleder_v7";

    let appState = {
      level: "B",
      valgtema: "innovation",
      activePage: "home",          // 'home' | 'phases' | 'ideation' | 'requirements' | 'sources' | 'schedule' | 'report'
      activePuzzlePiece: "viden",
      activePhaseId: "problemet",
      activeSubtopicId: "prob_brainstorm",
      activeIdeationSheet: "morph",
      openAccordions: ["problemet"],
      projectTitle: "",
      startDate: "",
      endDate: "",
      totalHours: 45,
      members: ["Elev 1", "Elev 2", "Elev 3"],
      workshops: ["3D-print / CAD", "El / Arduino", "Træ / Metal"],
      redThread: { cause: "", req: "", test: "" },
      pbProblem: "",
      pbProduct: "",
      searchLog: "",
      sources: [],
      problemTree: [
        {
          id: "pt_1",
          type: "effect",
          statement: "Alvorlige personskader og utryghed blandt cyklister i bykryds",
          source: "Vejdirektoratet (2024) – Ulykkesanalyse for cyklister",
          selected: false
        },
        {
          id: "pt_2",
          type: "core",
          statement: "Højt antal kollisioner mellem svingende biler og cyklister i mørke",
          source: "Danmarks Statistik & Havarikommissionen (2023)",
          selected: false
        },
        {
          id: "pt_3",
          type: "cause",
          statement: "Traditionelle cykellygter udsender kun lys fremad/bagud og ikke 180° til siden",
          source: "Eget måleforsøg + Bekendtgørelse om cykellygter",
          selected: true
        }
      ],
      aauProblemFormulation: "",
      competitors: [
        { id: "c_1", name: "Eksisterende markedsleder", ring: 1, priceMat: "399 kr. – ABS-plast & alu", pros: "Kendt mærke, god batteritid", cons: "Dyr, løser ikke synlighed fra siden" },
        { id: "c_2", name: "Lavpris-alternativ", ring: 2, priceMat: "79 kr. – Silikone & knapcelle", pros: "Lav pris, nem at montere", cons: "For svag lysstyrke, kort levetid" }
      ],
      ideation: {
        morphRows: [
          { func: "1. Energikilde / Forsyning", optA: "Genopladeligt Li-ion (USB-C)", optB: "Dynamo / Bevægelsesenergi", optC: "Solcelle + bufferbatteri" },
          { func: "2. Aktivering / Sensor", optA: "Automatisk lyssensor (LDR)", optB: "Accelerometer ved opbremsning", optC: "Manuel trykknap på styr" },
          { func: "3. Fastgørelse / Hus", optA: "3D-printet klik-beslag (PETG)", optB: "Magnetisk snap-lås", optC: "Fleksibel silikonerem" }
        ],
        hats: { white: "", red: "", black: "", yellow: "", green: "", blue: "" },
        reverseRows: [
          { worse: "Sørge for at produktet er helt usynligt og går i stykker i regnvejr", flip: "Gøre produktet 360° synligt og fuldt vandtæt", idea: "Vandtæt (IP65) akryl-lysring med 180° side-LED'er" },
          { worse: "Gøre det så besværligt at montere, at brugeren glemmer det hjemme", flip: "Produktet sidder fastmonteret og tænder helt automatisk", idea: "Fastmonteret modul med bevægelses- og mørkesensor" }
        ],
        cis: { perspective: "", randomWord: "", circleIdeas: "", selectedConcept: "" }
      },
      stakeholders: [
        { id: "sh_1", group: "Primær bruger (Slutbruger)", category: "Brugsundersøgelse (Bruger)", need: "Sikker, intuitiv betjening og høj driftssikkerhed i hverdagen" },
        { id: "sh_2", group: "Myndigheder & Lovgivning", category: "Myndighedskrav & Standarder", need: "Overholdelse af sikkerhedsregler (fx CE-mærkning, Arbejdstilsynet)" },
        { id: "sh_3", group: "Samfund & Miljø", category: "Problemanalyse (Samfund/Miljø)", need: "Dokumenteret reduktion af hovedproblemet og lav miljøbelastning (MEKA)" }
      ],
      requirements: [],
      ideas: ["Idé 1", "Idé 2", "Idé 3"],
      pvScores: {},
      pvArgumentation: "",
      selectedMethods: {}
    };

    window.addEventListener("DOMContentLoaded", () => {
      const today = new Date();
      const sixWeeksLater = new Date();
      sixWeeksLater.setDate(today.getDate() + 42);

      appState.startDate = today.toISOString().split("T")[0];
      appState.endDate = sixWeeksLater.toISOString().split("T")[0];

      loadFromStorage();

      if (Object.keys(appState.selectedMethods).length === 0) {
        preselectCoreMethods(appState.level);
      }

      ensureValidSubtopic();
      syncUIFromState();
      renderAll();
    });

    function saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (e) {
        console.warn("Kunne ikke gemme i localStorage:", e);
      }
    }

    function loadFromStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          appState = { ...appState, ...parsed };
          if (!appState.redThread) appState.redThread = { cause: "", req: "", test: "" };
          if (!appState.stakeholders) appState.stakeholders = [];
          if (!appState.requirements) appState.requirements = [];
          if (!appState.sources) appState.sources = [];
          if (!Array.isArray(appState.problemTree)) appState.problemTree = [];
          if (!appState.competitors) appState.competitors = [];
          if (!appState.ideation) {
            appState.ideation = { morphRows: [], hats: {}, reverseRows: [], cis: {} };
          }
          if (!Array.isArray(appState.openAccordions)) appState.openAccordions = [appState.activePhaseId || "problemet"];
          if (!appState.ideas || appState.ideas.length === 0) appState.ideas = ["Idé 1", "Idé 2", "Idé 3"];
          if (!appState.pvScores) appState.pvScores = {};
        }
      } catch (e) {
        console.warn("Kunne ikke indlæse fra localStorage:", e);
      }
    }

    function preselectCoreMethods(level) {
      FAG_DATA.phases.forEach(phase => {
        phase.methods.forEach(m => {
          const matchesLevel = m.level === "AB" || m.level === level;
          if (matchesLevel && m.core && !appState.selectedMethods[m.id]) {
            appState.selectedMethods[m.id] = {
              hours: m.defaultHours,
              startDate: "",
              endDate: "",
              workshop: "",
              assignee: "Hele gruppen"
            };
          }
        });
      });
    }

    function ensureValidSubtopic() {
      const phase = FAG_DATA.phases.find(p => p.id === appState.activePhaseId) || FAG_DATA.phases[0];
      const visible = phase.methods.filter(m => m.level === "AB" || m.level === appState.level);
      if (!visible.some(m => m.id === appState.activeSubtopicId) && visible.length > 0) {
        appState.activeSubtopicId = visible[0].id;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * 4. NAVIGATION MELLEM DE 7 SIDER & INTERAKTIVT PUSLESPIL (FORSIDE)
     * --------------------------------------------------------------------------
     */
    function switchPage(pageName) {
      appState.activePage = pageName;
      const pages = ["home", "phases", "ideation", "requirements", "sources", "schedule", "report"];
      pages.forEach(p => {
        const cap = p.charAt(0).toUpperCase() + p.slice(1);
        document.getElementById("navPage" + cap)?.classList.toggle("active", pageName === p);
        document.getElementById("page" + cap)?.classList.toggle("hidden", pageName !== p);
      });
      saveToStorage();
    }

    function selectPuzzlePiece(pieceKey) {
      appState.activePuzzlePiece = pieceKey;
      ["viden", "organisation", "teknik", "produkt"].forEach(k => {
        document.getElementById("piece_" + k)?.classList.toggle("active-piece", pieceKey === k);
      });

      const data = PUZZLE_DATA[pieceKey] || PUZZLE_DATA.viden;
      const card = document.getElementById("puzzleDetailCard");
      if (card) {
        card.style.borderLeftColor = data.color;
        card.innerHTML = `
          <h4 style="color:${data.color}; font-size:1.05rem; margin-bottom:0.4rem;">${data.title}</h4>
          <p style="font-size:0.9rem; margin-bottom:0.75rem;">${data.desc}</p>
          <strong style="font-size:0.82rem; color:var(--text); display:block; margin-bottom:0.3rem;">📌 Sådan bruger I denne brik i jeres teknologirapport:</strong>
          <ul style="padding-left:1.2rem; font-size:0.84rem; line-height:1.6;">
            ${data.inReport.map(item => `<li style="margin-bottom:0.25rem;">${item}</li>`).join("")}
          </ul>
        `;
      }
    }

    function renderExtendedPuzzleToggle() {
      const checked = document.getElementById("toggleExtendedPuzzle")?.checked;
      document.getElementById("extendedPuzzleRing")?.classList.toggle("hidden", !checked);
      if (checked) {
        selectPuzzlePiece("ext_samfund");
      } else {
        selectPuzzlePiece("viden");
      }
    }

    /**
     * --------------------------------------------------------------------------
     * 5. VENSTRE SIDEBAR DROPDOWNS & FASE-VISNING (SIDE 2)
     * --------------------------------------------------------------------------
     */
    function togglePhaseAccordion(phaseId, event) {
      if (event) event.stopPropagation();
      const idx = appState.openAccordions.indexOf(phaseId);
      if (idx >= 0) {
        appState.openAccordions.splice(idx, 1);
      } else {
        appState.openAccordions.push(phaseId);
        appState.activePhaseId = phaseId;
        ensureValidSubtopic();
      }
      saveToStorage();
      renderSidebarAndMiniIpu();
      renderMainTheoryPanel();
    }

    function selectPhaseFromMiniBar(phaseId) {
      appState.activePhaseId = phaseId;
      if (!appState.openAccordions.includes(phaseId)) {
        appState.openAccordions.push(phaseId);
      }
      ensureValidSubtopic();
      saveToStorage();
      renderSidebarAndMiniIpu();
      renderMainTheoryPanel();
    }

    function expandAllAccordions() {
      const allIds = FAG_DATA.phases.map(p => p.id);
      if (appState.openAccordions.length === allIds.length) {
        appState.openAccordions = [];
      } else {
        appState.openAccordions = allIds;
      }
      saveToStorage();
      renderSidebarAndMiniIpu();
    }

    function selectSubtopic(phaseId, subtopicId) {
      appState.activePhaseId = phaseId;
      appState.activeSubtopicId = subtopicId;
      if (!appState.openAccordions.includes(phaseId)) {
        appState.openAccordions.push(phaseId);
      }
      saveToStorage();
      renderSidebarAndMiniIpu();
      renderMainTheoryPanel();
    }

    function setLevel(newLevel) {
      const prevLevel = appState.level;
      appState.level = newLevel;

      if (newLevel === "A" && appState.totalHours === 45) {
        appState.totalHours = 70;
      } else if (newLevel === "B" && appState.totalHours === 70) {
        appState.totalHours = 45;
      }

      if (newLevel === "A") {
        const extChk = document.getElementById("toggleExtendedPuzzle");
        if (extChk) { extChk.checked = true; renderExtendedPuzzleToggle(); }
      }

      FAG_DATA.phases.forEach(phase => {
        phase.methods.forEach(m => {
          if (newLevel === "B" && m.level === "A") {
            delete appState.selectedMethods[m.id];
          } else if (newLevel === "A" && m.level === "B") {
            delete appState.selectedMethods[m.id];
          } else if (newLevel === "A" && m.level === "A" && m.core && prevLevel === "B") {
            appState.selectedMethods[m.id] = { hours: m.defaultHours, startDate: "", endDate: "", workshop: "", assignee: "Hele gruppen" };
          } else if (newLevel === "B" && m.level === "B" && m.core && prevLevel === "A") {
            appState.selectedMethods[m.id] = { hours: m.defaultHours, startDate: "", endDate: "", workshop: "", assignee: "Hele gruppen" };
          }
        });
      });

      ensureValidSubtopic();
      syncUIFromState();
      saveToStorage();
      renderAll();
    }

    function syncUIFromState() {
      document.getElementById("btnLevelB").classList.toggle("active", appState.level === "B");
      document.getElementById("btnLevelA").classList.toggle("active", appState.level === "A");
      document.getElementById("valgtemaSelect").classList.toggle("hidden", appState.level !== "A");
      document.getElementById("ipuToggleWrap").classList.toggle("hidden", appState.level !== "A");
      document.getElementById("bProjectDescCard").classList.toggle("hidden", appState.level !== "B");

      document.getElementById("valgtemaSelect").value = appState.valgtema || "innovation";
      document.getElementById("projectTitle").value = appState.projectTitle || "";
      document.getElementById("startDate").value = appState.startDate || "";
      document.getElementById("endDate").value = appState.endDate || "";
      document.getElementById("totalHours").value = appState.totalHours || 45;

      document.getElementById("rtCause").value = appState.redThread?.cause || "";
      document.getElementById("rtReq").value = appState.redThread?.req || "";
      document.getElementById("rtTest").value = appState.redThread?.test || "";

      document.getElementById("pbProblem").value = appState.pbProblem || "";
      document.getElementById("pbProduct").value = appState.pbProduct || "";
      document.getElementById("pvArgumentation").value = appState.pvArgumentation || "";
      document.getElementById("searchLogInput").value = appState.searchLog || "";
      document.getElementById("aauProblemFormulation").value = appState.aauProblemFormulation || "";

      switchPage(appState.activePage || "home");
    }

    function renderAll() {
      selectPuzzlePiece(appState.activePuzzlePiece || "viden");
      renderLevelSummary();
      renderTags();
      renderSidebarAndMiniIpu();
      renderMainTheoryPanel();
      renderProblemTree();
      renderIdeationAndBullseyeView();
      renderRequirementsView();
      renderSourcesView();
      renderScheduleView();
      renderReportView();
      updateBadges();
    }

    function renderLevelSummary() {
      const lvlData = FAG_DATA.levels[appState.level];
      const memberCount = Math.max(1, appState.members.length);
      const pageSpan = lvlData.pageRule(memberCount);

      document.getElementById("levelSummaryText").innerHTML = `
        <strong>Valgt niveau: ${lvlData.name}</strong> (${memberCount}${memberCount === 1 ? "elev" : "elever"}) &bull;
        <strong>Rapportomfang (afsluttende projekt):</strong> ${pageSpan} &bull;
        <span>${lvlData.durationInfo}</span>
      `;
    }

    function countSelectedInPhase(phase) {
      return phase.methods.filter(m => {
        const visible = m.level === "AB" || m.level === appState.level;
        return visible && Boolean(appState.selectedMethods[m.id]);
      }).length;
    }

    function renderSidebarAndMiniIpu() {
      const seqContainer = document.getElementById("sidebarSeqAccordions");
      const crossContainer = document.getElementById("sidebarCrossAccordions");
      const miniIpuRow = document.getElementById("miniIpuRow");
      const toggleBtn = document.getElementById("btnToggleAllAcc");

      const allIds = FAG_DATA.phases.map(p => p.id);
      if (toggleBtn) {
        toggleBtn.textContent = appState.openAccordions.length === allIds.length ? "Fold alle ind" : "Fold alle ud";
      }

      const seqPhases = FAG_DATA.phases.filter(p => p.type === "sequential");
      const crossPhases = FAG_DATA.phases.filter(p => p.type === "cross");

      const buildAccordionHtml = (p) => {
        const visibleMethods = p.methods.filter(m => m.level === "AB" || m.level === appState.level);
        const selectedCount = countSelectedInPhase(p);
        const isOpen = appState.openAccordions.includes(p.id);

        const subItemsHtml = visibleMethods.map(m => {
          const isChecked = Boolean(appState.selectedMethods[m.id]);
          const isActiveSub = appState.activeSubtopicId === m.id && appState.activePhaseId === p.id;
          return `
            <div class="subtopic-nav-item ${isActiveSub ? 'active-sub' : ''}"
                 style="--phase-color:${p.color}; --phase-bg-light:${p.bgLight};"
                 onclick="selectSubtopic('${p.id}', '${m.id}')">
              <input type="checkbox" ${isChecked ? 'checked' : ''}
                     title="Tilføj/fjern fra projekt og tidsplan"
                     onclick="event.stopPropagation()"
                     onchange="toggleMethod('${p.id}', '${m.id}',${m.defaultHours})">
              <span class="subtopic-nav-label">${m.title}</span>${m.level === 'A' ? '<span class="badge-level badge-a" style="font-size:0.6rem; padding:0.05rem 0.3rem;">A</span>' : ''}
            </div>
          `;
        }).join("");

        return `
          <div class="phase-accordion ${isOpen ? 'open' : ''}"
               style="--phase-color:${p.color}; --phase-bg-light:${p.bgLight};">
            <button type="button" class="phase-acc-header"
                    aria-expanded="${isOpen}"
                    onclick="togglePhaseAccordion('${p.id}', event)">
              <div class="acc-title-wrap">
                <span class="acc-color-dot"></span>
                <span>${p.type === 'sequential' ? p.num + ': ' : ''}${p.title}</span>
              </div>
              <div class="acc-meta">
                <span class="acc-count-pill">${selectedCount}/${visibleMethods.length}</span>
                <span class="acc-chevron-btn" title="${isOpen ? 'Klik for at folde menuen ind' : 'Klik for at folde menuen ud'}">▶</span>
              </div>
            </button>
            <div class="phase-acc-body">
              ${subItemsHtml}
            </div>
          </div>
        `;
      };

      seqContainer.innerHTML = seqPhases.map(buildAccordionHtml).join("");
      crossContainer.innerHTML = crossPhases.map(buildAccordionHtml).join("");

      miniIpuRow.innerHTML = seqPhases.map(p => {
        const isActive = appState.activePhaseId === p.id;
        return `
          <button type="button" class="mini-phase-btn ${isActive ? 'active' : ''}"
                  style="--phase-color:${p.color}; --phase-bg-light:${p.bgLight};"
                  onclick="selectPhaseFromMiniBar('${p.id}')">
            ${p.title}
          </button>
        `;
      }).join("");
    }

    function renderMainTheoryPanel() {
      const phase = FAG_DATA.phases.find(p => p.id === appState.activePhaseId) || FAG_DATA.phases[0];
      const visibleMethods = phase.methods.filter(m => m.level === "AB" || m.level === appState.level);
      const activeSub = visibleMethods.find(m => m.id === appState.activeSubtopicId) || visibleMethods[0];

      const showDepts = appState.level === "A" && document.getElementById("showIpuDepts")?.checked;
      let deptHtml = "";
      if (showDepts && phase.ipuDepts) {
        deptHtml = `
          <div class="ipu-departments">
            <div class="ipu-dept-card"><strong>📈 Salgsafdeling</strong>${phase.ipuDepts.salg}</div>
            <div class="ipu-dept-card"><strong>📐 Konstruktionsafdeling</strong>${phase.ipuDepts.konstruktion}</div>
            <div class="ipu-dept-card"><strong>🏭 Produktionsafdeling</strong>${phase.ipuDepts.produktion}</div>
          </div>
        `;
      }

      let subBannerHtml = "";
      if (activeSub) {
        const selectedObj = appState.selectedMethods[activeSub.id];
        const isChecked = Boolean(selectedObj);

        const workshopOptions = [`<option value="">Ingen / Klasselokale</option>`]
          .concat(appState.workshops.map(w => `<option value="${escapeHtml(w)}" ${selectedObj?.workshop === w ? 'selected' : ''}>${escapeHtml(w)}</option>`))
          .join("");

        const memberOptions = [`<option value="Hele gruppen">Hele gruppen</option>`]
          .concat(appState.members.map(mem => `<option value="${escapeHtml(mem)}" ${selectedObj?.assignee === mem ? 'selected' : ''}>${escapeHtml(mem)}</option>`))
          .join("");

        let toolShortcutHtml = "";
        if (activeSub.id === "prob_problemtrae" || activeSub.id === "prob_formulering" || activeSub.id === "prin_konkurrent" || activeSub.id === "prin_idegen") {
          toolShortcutHtml = `<button type="button" class="btn btn-secondary btn-sm" onclick="switchPage('ideation')">💡 Åbn Problemtræ, Skydeskivemodel & Idé-arbejdsark &rarr;</button>`;
        } else if (activeSub.id === "prin_kravspec" || activeSub.id === "prin_pvskema" || activeSub.id === "prin_brugs") {
          toolShortcutHtml = `<button type="button" class="btn btn-secondary btn-sm" onclick="switchPage('requirements')">🎯 Åbn værktøjet til Interessenter, SMART-krav & PV-skema &rarr;</button>`;
        } else if (activeSub.id === "ana_infosogning" || activeSub.id === "form_argumentation") {
          toolShortcutHtml = `<button type="button" class="btn btn-secondary btn-sm" onclick="switchPage('sources')">📚 Åbn værktøjet til Kildeliste & Kildekritik &rarr;</button>`;
        } else if (activeSub.id === "styr_tidsplan") {
          toolShortcutHtml = `<button type="button" class="btn btn-secondary btn-sm" onclick="switchPage('schedule')">📅 Åbn Tidsplansgeneratoren &rarr;</button>`;
        } else if (activeSub.id === "prob_projektbeskrivelse") {
          toolShortcutHtml = `<button type="button" class="btn btn-secondary btn-sm" onclick="switchPage('report')">✍️ Åbn Projektbeskrivelse med underskriftsfelter &rarr;</button>`;
        }

        subBannerHtml = `
          <div class="active-subtopic-banner" style="--phase-color:${phase.color}; --phase-bg-light:${phase.bgLight};">
            <div class="active-subtopic-header">
              <div>
                <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap;">
                  <span class="phase-color-tag" style="background:${phase.color};">${phase.num}: ${phase.title}</span>
                  <span class="badge-level ${activeSub.level === 'A' ? 'badge-a' : 'badge-ab'}">${activeSub.level === 'A' ? 'Kun Teknologi A' : 'Teknologi A & B'}</span>
                  ${activeSub.core ? '<span class="badge-level badge-core">Kernestof</span>' : ''}
                </div>
                <h3 style="margin-top:0.35rem; margin-bottom:0; font-size:1.2rem; color:${phase.color};">📖 ${activeSub.title}</h3>
              </div>

              <label class="no-print" style="display:inline-flex; align-items:center; gap:0.45rem; background:white; padding:0.45rem 0.8rem; border-radius:6px; border:2px solid ${isChecked ? 'var(--success)' : 'var(--border-strong)'}; cursor:pointer; font-weight:700; font-size:0.85rem;">
                <input type="checkbox" style="width:17px; height:17px; accent-color:var(--success);" ${isChecked ? 'checked' : ''}
                       onchange="toggleMethod('${phase.id}', '${activeSub.id}', ${activeSub.defaultHours})">
                <span>${isChecked ? '✔ Valgt til vores projekt' : 'Tilføj til projekt & tidsplan'}</span>
              </label>
            </div>

            <p style="font-size:0.93rem; line-height:1.65;">${activeSub.subTheory || activeSub.desc}</p>

            ${activeSub.subTemplate ? `
              <div class="template-box">
                <strong style="color:${phase.color}; display:block; margin-bottom:0.3rem;">💡 Skabelon / Huskeliste til rapporten:</strong>
                <div style="white-space:pre-line;">${activeSub.subTemplate}</div>
              </div>
            ` : ''}

            ${toolShortcutHtml ? `<div class="no-print" style="margin-top:0.85rem;">${toolShortcutHtml}</div>` : ''}

            ${isChecked ? `
              <div class="no-print" style="margin-top:0.9rem; padding-top:0.75rem; border-top:1px dashed rgba(15, 23, 42, 0.2); display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:0.65rem; font-size:0.8rem;">
                <div>
                  <label style="font-weight:700; color:${phase.color}; display:block; margin-bottom:0.15rem;">⏱️ Timer afsat i tidsplan</label>
                  <input type="number" step="0.5" min="0" class="table-input" style="background:white;" value="${selectedObj.hours}"
                         onchange="updateMethodField('${activeSub.id}', 'hours', parseFloat(this.value)||0)">
                </div>
                <div>
                  <label style="font-weight:700; color:${phase.color}; display:block; margin-bottom:0.15rem;">🛠️ Værksted / Ressource</label>
                  <select class="table-input" style="background:white;" onchange="updateMethodField('${activeSub.id}', 'workshop', this.value)">
                    ${workshopOptions}
                  </select>
                </div>
                <div>
                  <label style="font-weight:700; color:${phase.color}; display:block; margin-bottom:0.15rem;">👤 Tovholder (intern)</label>
                  <select class="table-input" style="background:white;" onchange="updateMethodField('${activeSub.id}', 'assignee', this.value)">
                    ${memberOptions}
                  </select>
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }

      const siblingButtonsHtml = visibleMethods.map(m => {
        const isCurrent = activeSub && activeSub.id === m.id;
        const isChecked = Boolean(appState.selectedMethods[m.id]);
        return `
          <button type="button" class="btn ${isCurrent ? '' : 'btn-outline'} btn-sm"
                  style="${isCurrent ? `background:${phase.color}; border-color:${phase.color};` : `color:${phase.color}; border-color:${phase.color};`}"
                  onclick="selectSubtopic('${phase.id}', '${m.id}')">
            ${isChecked ? '✔ ' : ''}${m.title.split('(')[0].trim()}
          </button>
        `;
      }).join("");

      document.getElementById("mainTheoryPanel").innerHTML = `
        ${subBannerHtml}

        <div style="border-top: 2px solid var(--border); padding-top: 1rem; margin-top: 0.5rem; --phase-color:${phase.color};">
          <h2 style="color:${phase.color};">
            <span>📘 Overblik over hele fasen: ${phase.num} – ${phase.fullTitle}</span>
            <button type="button" class="btn btn-outline btn-sm no-print" style="color:${phase.color}; border-color:${phase.color};" onclick="selectCoreMethodsInPhase()">+ Vælg alt kernestof i fasen</button>
          </h2>
          <p style="font-size:0.9rem;"><strong>Formål med fasen:</strong> ${phase.purpose}</p>

          ${deptHtml}

          <div class="theory-box">
            <h4>Sammenhæng i ${phase.title}</h4>
            ${phase.theory}
          </div>

          <div class="workspace-split" style="margin-top:0.9rem;">
            <div>
              <h4 style="color: ${phase.color}; font-size:0.94rem; margin-bottom:0.35rem;">💬 Spørgsmål til refleksion i gruppen</h4>
              <ul style="padding-left:1.2rem; font-size:0.87rem;">
                ${phase.questions.map(q => `<li style="margin-bottom:0.35rem;">${q}</li>`).join("")}
              </ul>
            </div>
            <div>
              <h4 style="color: ${phase.color}; font-size:0.94rem; margin-bottom:0.35rem;">📄 Forventet output i rapporten</h4>
              <ul style="padding-left:1.2rem; font-size:0.87rem;">
                ${phase.expectedOutput.map(o => `<li style="margin-bottom:0.35rem;">${o}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="no-print" style="margin-top:1rem; padding-top:0.85rem; border-top:1px dashed var(--border);">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">Skift hurtigt til et andet underemne i ${phase.title}:</span>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
              ${siblingButtonsHtml}
            </div>
          </div>
        </div>
      `;
    }

    function toggleMethod(phaseId, methodId, defaultHours) {
      appState.activePhaseId = phaseId;
      appState.activeSubtopicId = methodId;
      if (appState.selectedMethods[methodId]) {
        delete appState.selectedMethods[methodId];
      } else {
        appState.selectedMethods[methodId] = {
          hours: defaultHours,
          startDate: "",
          endDate: "",
          workshop: "",
          assignee: "Hele gruppen"
        };
      }
      saveToStorage();
      renderSidebarAndMiniIpu();
      renderMainTheoryPanel();
      renderScheduleView();
      renderReportView();
      updateBadges();
    }

    function selectCoreMethodsInPhase() {
      const phase = FAG_DATA.phases.find(p => p.id === appState.activePhaseId);
      if (!phase) return;
      phase.methods.forEach(m => {
        if ((m.level === "AB" || m.level === appState.level) && m.core && !appState.selectedMethods[m.id]) {
          appState.selectedMethods[m.id] = {
            hours: m.defaultHours,
            startDate: "",
            endDate: "",
            workshop: "",
            assignee: "Hele gruppen"
          };
        }
      });
      saveToStorage();
      renderAll();
    }

    function updateMethodField(methodId, field, value) {
      if (!appState.selectedMethods[methodId]) return;
      appState.selectedMethods[methodId][field] = value;
      saveToStorage();
      renderScheduleView();
      renderReportView();
    }

    function updateBadges() {
      document.getElementById("selectedCountBadge").textContent = Object.keys(appState.selectedMethods).length;
      document.getElementById("reqCountBadge").textContent = appState.requirements.length;
      document.getElementById("sourceCountBadge").textContent = appState.sources.length;
    }

    /**
     * --------------------------------------------------------------------------
     * 6. FORENKLET AAU-PROBLEMTRÆ (ÅRSAG / VIRKNING + KILDE) (SIDE 3, DEL 0)
     * --------------------------------------------------------------------------
     */
    function addProblemTreeNode() {
      const type = document.getElementById("ptNodeType").value;
      const statement = document.getElementById("ptStatement").value.trim();
      const source = document.getElementById("ptSource").value.trim();

      if (!statement || !source) {
        alert("Udfyld venligst både årsag/virkning og hvilken kilde (eller kilder), der dokumenterer kassen!");
        return;
      }

      appState.problemTree.push({
        id: "pt_" + Date.now(),
        type,
        statement,
        source,
        selected: false
      });

      document.getElementById("ptStatement").value = "";
      document.getElementById("ptSource").value = "";

      saveToStorage();
      renderProblemTree();
      renderReportView();
    }

    function removeProblemTreeNode(id) {
      appState.problemTree = appState.problemTree.filter(n => n.id !== id);
      saveToStorage();
      renderProblemTree();
      renderReportView();
    }

    function selectCauseForProblemFormulation(id) {
      appState.problemTree.forEach(n => {
        if (n.type === "cause") n.selected = (n.id === id);
      });
      const chosen = appState.problemTree.find(n => n.id === id);
      if (chosen) {
        const text = chosen.statement || chosen.claim || "";
        appState.redThread.cause = `${text} (Kilde: ${chosen.source})`;
        const rtInput = document.getElementById("rtCause");
        if (rtInput) rtInput.value = appState.redThread.cause;
      }
      saveToStorage();
      renderProblemTree();
      renderReportView();
    }

    function updateAauProblemFormulation() {
      appState.aauProblemFormulation = document.getElementById("aauProblemFormulation").value;
      saveToStorage();
      renderReportView();
    }

    function renderProblemTree() {
      const effGrid = document.getElementById("ptreeEffectsGrid");
      const coreGrid = document.getElementById("ptreeCoreGrid");
      const causeGrid = document.getElementById("ptreeCausesGrid");
      const datalist = document.getElementById("ptSourceSuggestions");
      const pfInput = document.getElementById("aauProblemFormulation");

      if (!effGrid || !coreGrid || !causeGrid) return;
      if (pfInput && document.activeElement !== pfInput) {
        pfInput.value = appState.aauProblemFormulation || "";
      }

      if (datalist) {
        datalist.innerHTML = appState.sources.map(s =>
          `<option value="${escapeHtml(s.author)} (${escapeHtml(s.year)}): ${escapeHtml(s.title)}">`
        ).join("");
      }

      const renderNodeCard = (n) => {
        const text = n.statement || n.claim || "";
        return `
          <div class="ptree-box-card ${n.selected ? 'selected-cause' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.4rem;">
              <div class="box-statement">${escapeHtml(text)}</div>
              <button type="button" class="btn btn-outline btn-sm no-print" style="padding:0.1rem 0.4rem;" onclick="removeProblemTreeNode('${n.id}')" title="Slet kasse">✕</button>
            </div>
            <div class="box-source"><strong>📚 Kilde(r):</strong> ${escapeHtml(n.source)}</div>
            ${n.type === 'cause' ? `
              <div class="no-print" style="margin-top:0.5rem; text-align:right;">
                <button type="button" class="btn ${n.selected ? 'btn-success' : 'btn-outline'} btn-sm"
                        onclick="selectCauseForProblemFormulation('${n.id}')">
                  ${n.selected ? '✔ Udvalgt til Problemformulering' : '🎯 Udvælg denne årsag'}
                </button>
              </div>
            ` : ''}
          </div>
        `;
      };

      const effects = appState.problemTree.filter(n => n.type === "effect");
      const cores = appState.problemTree.filter(n => n.type === "core");
      const causes = appState.problemTree.filter(n => n.type === "cause");

      effGrid.innerHTML = effects.length ? effects.map(renderNodeCard).join("") : `<p style="font-size:0.8rem; color:var(--text-muted);">Ingen virkninger tilføjet endnu.</p>`;
      coreGrid.innerHTML = cores.length ? cores.map(renderNodeCard).join("") : `<p style="font-size:0.8rem; color:var(--text-muted);">Intet kerneproblem tilføjet endnu.</p>`;
      causeGrid.innerHTML = causes.length ? causes.map(renderNodeCard).join("") : `<p style="font-size:0.8rem; color:var(--text-muted);">Ingen årsager tilføjet endnu.</p>`;
    }

    /**
     * --------------------------------------------------------------------------
     * 7. SKYDESKIVEMODEL (KONKURRENTANALYSE) & IDÉGENERERINGS-ARK (SIDE 3, DEL 1 & 2)
     * --------------------------------------------------------------------------
     */
    function addCompetitor() {
      const name = document.getElementById("compName").value.trim();
      const ring = parseInt(document.getElementById("compRing").value, 10) || 1;
      const priceMat = document.getElementById("compPriceMat").value.trim();
      const pros = document.getElementById("compPros").value.trim();
      const cons = document.getElementById("compCons").value.trim();

      if (!name) {
        alert("Angiv venligst produktnavn på konkurrenten.");
        return;
      }

      appState.competitors.push({
        id: "c_" + Date.now(),
        name,
        ring,
        priceMat,
        pros,
        cons
      });

      document.getElementById("compName").value = "";
      document.getElementById("compPriceMat").value = "";
      document.getElementById("compPros").value = "";
      document.getElementById("compCons").value = "";

      saveToStorage();
      renderIdeationAndBullseyeView();
      renderReportView();
    }

    function addSampleCompetitors() {
      const samples = [
        { name: "Direkte konkurrent A", ring: 1, priceMat: "349 kr. – Aluminium & ABS", pros: "Høj styrke, kendt design", cons: "Høj pris, mangler automatisk sensor" },
        { name: "Substitutionsprodukt B", ring: 2, priceMat: "129 kr. – Genbrugsplast", pros: "Lav miljøbelastning (MEKA)", cons: "Kort levetid i fugtigt miljø" },
        { name: "Alternativ løsning C", ring: 3, priceMat: "Gratis app-løsning", pros: "Kræver ingen fysisk montage", cons: "Løser ikke det fysiske problem i praksis" }
      ];
      samples.forEach(s => {
        if (!appState.competitors.some(c => c.name === s.name)) {
          appState.competitors.push({ id: "c_" + Math.random().toString(36).slice(2, 7), ...s });
        }
      });
      saveToStorage();
      renderIdeationAndBullseyeView();
    }

    function removeCompetitor(id) {
      appState.competitors = appState.competitors.filter(c => c.id !== id);
      saveToStorage();
      renderIdeationAndBullseyeView();
    }

    function renderBullseyeSvg() {
      const svg = document.getElementById("bullseyeSvg");
      if (!svg) return;

      const cx = 160, cy = 160;
      const radii = { 3: 142, 2: 96, 1: 50 };
      const ringColors = { 1: "#dc2626", 2: "#d97706", 3: "#2563eb" };

      let html = `
        <circle cx="${cx}" cy="${cy}" r="${radii[3]}" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>
        <text x="${cx}" y="32" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1e40af">3. Alternativ løsning</text>

        <circle cx="${cx}" cy="${cy}" r="${radii[2]}" fill="#fef3c7" stroke="#fcd34d" stroke-width="2"/>
        <text x="${cx}" y="78" text-anchor="middle" font-size="9.5" font-weight="700" fill="#92400e">2. Substitutionsprodukt</text>

        <circle cx="${cx}" cy="${cy}" r="${radii[1]}" fill="#fee2e2" stroke="#fca5a5" stroke-width="2"/>
        <text x="${cx}" y="125" text-anchor="middle" font-size="9.5" font-weight="800" fill="#991b1b">1. Direkte</text>

        <line x1="${cx - 148}" y1="${cy}" x2="${cx + 148}" y2="${cy}" stroke="#cbd5e1" stroke-dasharray="3,3"/>
        <line x1="${cx}" y1="${cy - 148}" x2="${cx}" y2="${cy + 148}" stroke="#cbd5e1" stroke-dasharray="3,3"/>
      `;

      appState.competitors.forEach((comp, idx) => {
        const rBase = comp.ring === 1 ? 26 : (comp.ring === 2 ? 74 : 120);
        const angle = (idx * 137.5) * (Math.PI / 180);
        const px = Math.round(cx + rBase * Math.cos(angle));
        const py = Math.round(cy + rBase * Math.sin(angle));
        const col = ringColors[comp.ring] || "#dc2626";

        html += `
          <g>
            <circle cx="${px}" cy="${py}" r="12" fill="${col}" stroke="#ffffff" stroke-width="2">
              <title>K${idx + 1}: ${escapeHtml(comp.name)} (${escapeHtml(comp.priceMat)})</title>
            </circle>
            <text x="${px}" y="${py + 4}" text-anchor="middle" font-size="10" font-weight="800" fill="#ffffff">K${idx + 1}</text>
          </g>
        `;
      });

      svg.innerHTML = html;
    }

    function switchIdeationSheet(sheetName) {
      appState.activeIdeationSheet = sheetName;
      ["morph", "hats", "reverse", "cis"].forEach(s => {
        const cap = s.charAt(0).toUpperCase() + s.slice(1);
        document.getElementById("btnSheet" + cap)?.classList.toggle("active", sheetName === s);
        document.getElementById("sheet" + cap)?.classList.toggle("hidden", sheetName !== s);
      });
      saveToStorage();
    }

    function addMorphRow() {
      appState.ideation.morphRows.push({ func: `${appState.ideation.morphRows.length + 1}. Ny delfunktion`, optA: "", optB: "", optC: "" });
      saveToStorage();
      renderIdeationAndBullseyeView();
    }

    function updateMorphCell(rowIdx, field, val) {
      if (appState.ideation.morphRows[rowIdx]) {
        appState.ideation.morphRows[rowIdx][field] = val;
        saveToStorage();
      }
    }

    function updateHatNote(hatKey, val) {
      appState.ideation.hats[hatKey] = val;
      saveToStorage();
    }

    function addReverseRow() {
      appState.ideation.reverseRows.push({ worse: "", flip: "", idea: "" });
      saveToStorage();
      renderIdeationAndBullseyeView();
    }

    function updateReverseCell(rowIdx, field, val) {
      if (appState.ideation.reverseRows[rowIdx]) {
        appState.ideation.reverseRows[rowIdx][field] = val;
        saveToStorage();
      }
    }

    function updateCisField(field, val) {
      appState.ideation.cis[field] = val;
      saveToStorage();
    }

    function renderIdeationAndBullseyeView() {
      renderBullseyeSvg();

      const compBody = document.getElementById("competitorsTableBody");
      if (compBody) {
        if (appState.competitors.length === 0) {
          compBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">Ingen konkurrenter tilføjet endnu.</td></tr>`;
        } else {
          const ringLabels = { 1: "🎯 1. Direkte konkurrent", 2: "⭕ 2. Substitutionsprodukt", 3: "🔵 3. Alternativ løsning" };
          compBody.innerHTML = appState.competitors.map((c, i) => `
            <tr>
              <td><strong>K${i + 1}</strong></td>
              <td><strong>${escapeHtml(c.name)}</strong></td>
              <td><span class="badge-level badge-ab">${ringLabels[c.ring] || ringLabels[1]}</span></td>
              <td>${escapeHtml(c.priceMat)}</td>
              <td style="color:var(--success);">${escapeHtml(c.pros)}</td>
              <td style="color:var(--danger);">${escapeHtml(c.cons)}</td>
              <td class="no-print"><button type="button" class="btn btn-outline btn-sm" onclick="removeCompetitor('${c.id}')">✕</button></td>
            </tr>
          `).join("");
        }
      }

      const morphBody = document.getElementById("morphTableBody");
      if (morphBody) {
        morphBody.innerHTML = appState.ideation.morphRows.map((r, idx) => `
          <tr>
            <td><input type="text" class="table-input" style="font-weight:700;" value="${escapeHtml(r.func)}" oninput="updateMorphCell(${idx}, 'func', this.value)"></td>
            <td><input type="text" class="table-input" placeholder="Løsning A..." value="${escapeHtml(r.optA)}" oninput="updateMorphCell(${idx}, 'optA', this.value)"></td>
            <td><input type="text" class="table-input" placeholder="Løsning B..." value="${escapeHtml(r.optB)}" oninput="updateMorphCell(${idx}, 'optB', this.value)"></td>
            <td><input type="text" class="table-input" placeholder="Løsning C..." value="${escapeHtml(r.optC)}" oninput="updateMorphCell(${idx}, 'optC', this.value)"></td>
          </tr>
        `).join("");
      }

      const hatsMeta = [
        { key: "white", title: "⚪ Hvid hat (Fakta & Viden)", color: "#64748b", prompt: "Hvilke objektive data, mål og fakta fra problemanalysen og brugsundersøgelsen kender vi?" },
        { key: "green", title: "🟢 Grøn hat (Kreativitet & Nye idéer)", color: "#16a34a", prompt: "Hvilke nye, vilde eller alternative løsningsprincipper kan vi finde på uden at kritisere dem endnu?" },
        { key: "yellow", title: "🟡 Gul hat (Fordele & Optimisme)", color: "#eab308", prompt: "Hvad er de største styrker, værdier og fordele ved idéerne for brugeren og samfundet?" },
        { key: "black", title: "⚫ Sort hat (Risici & Kritik)", color: "#0f172a", prompt: "Hvad kan gå galt teknisk, sikkerhedsmæssigt eller økonomisk? Hvor er flaskehalsene i værkstedet?" },
        { key: "red", title: "🔴 Rød hat (Følelser & Intuition)", color: "#dc2626", prompt: "Hvad siger vores mavefornemmelse om designet, æstetikken og brugeroplevelsen?" },
        { key: "blue", title: "🔵 Blå hat (Overblik & Processtyring)", color: "#2563eb", prompt: "Hvad konkluderer vi på idégenereringen, og hvilke 3 idéer tager vi med videre i PV-skemaet?" }
      ];
      const hatsContainer = document.getElementById("hatsGridContainer");
      if (hatsContainer) {
        hatsContainer.innerHTML = hatsMeta.map(h => `
          <div class="hat-card" style="--hat-color:${h.color};">
            <h4>${h.title}</h4>
            <p>${h.prompt}</p>
            <textarea class="table-input" rows="3" placeholder="Skriv gruppens noter under ${h.title.split('(')[0].trim()}..."
                      oninput="updateHatNote('${h.key}', this.value)">${escapeHtml(appState.ideation.hats[h.key] || "")}</textarea>
          </div>
        `).join("");
      }

      const revBody = document.getElementById("reverseTableBody");
      if (revBody) {
        revBody.innerHTML = appState.ideation.reverseRows.map((r, idx) => `
          <tr>
            <td><input type="text" class="table-input" value="${escapeHtml(r.worse)}" placeholder="Hvordan gør vi problemet værre?..." oninput="updateReverseCell(${idx}, 'worse', this.value)"></td>
            <td><input type="text" class="table-input" value="${escapeHtml(r.flip)}" placeholder="Vend udsagnet 180 grader..." oninput="updateReverseCell(${idx}, 'flip', this.value)"></td>
            <td><input type="text" class="table-input" value="${escapeHtml(r.idea)}" placeholder="Konkret teknisk idé..." oninput="updateReverseCell(${idx}, 'idea', this.value)"></td>
          </tr>
        `).join("");
      }

      const cisContainer = document.getElementById("cisFieldsContainer");
      if (cisContainer) {
        cisContainer.innerHTML = `
          <div class="form-group">
            <label>1. Rolleperspektivskifte (Hvordan ville fx NASA, LEGO, en kirurg eller naturen/biomimikri løse problemet?)</label>
            <textarea rows="3" placeholder="Notér idéer fra andre perspektiver..." oninput="updateCisField('perspective', this.value)">${escapeHtml(appState.ideation.cis.perspective || "")}</textarea>
          </div>
          <div class="form-group">
            <label>2. Associationsteknik / Tilfældige ord (Kombinér jeres problem med et tilfældigt objekt)</label>
            <textarea rows="3" placeholder="Fx: Paraply / Magnet / Termokande -> Hvilke mekanismer kan vi låne?" oninput="updateCisField('randomWord', this.value)">${escapeHtml(appState.ideation.cis.randomWord || "")}</textarea>
          </div>
          <div class="form-group">
            <label>3. Cirkelmetode (Idéer der bygges videre på fra gruppemedlem til gruppemedlem)</label>
            <textarea rows="3" placeholder="Person 1 starter en skitse/idé -> Person 2 videreudvikler -> Person 3 tilføjer teknik..." oninput="updateCisField('circleIdeas', this.value)">${escapeHtml(appState.ideation.cis.circleIdeas || "")}</textarea>
          </div>
          <div class="form-group">
            <label>4. Udvalgte koncepter der sendes videre til Kravmatrix / PV-skema</label>
            <textarea rows="3" placeholder="Opsummér de 3 bedste helhedsidéer her..." oninput="updateCisField('selectedConcept', this.value)">${escapeHtml(appState.ideation.cis.selectedConcept || "")}</textarea>
          </div>
        `;
      }
    }

    /**
     * --------------------------------------------------------------------------
     * 8. PROJEKTRAMMER, INTERESSENTER, SMART-KRAV & PV-SKEMA (SIDE 4)
     * --------------------------------------------------------------------------
     */
    function updateProjectMeta() {
      appState.projectTitle = document.getElementById("projectTitle").value;
      appState.startDate = document.getElementById("startDate").value;
      appState.endDate = document.getElementById("endDate").value;
      appState.totalHours = parseFloat(document.getElementById("totalHours").value) || 45;
      appState.valgtema = document.getElementById("valgtemaSelect").value;

      saveToStorage();
      renderLevelSummary();
      renderScheduleView();
      renderReportView();
    }

    function updateRedThread() {
      appState.redThread.cause = document.getElementById("rtCause").value;
      appState.redThread.req = document.getElementById("rtReq").value;
      appState.redThread.test = document.getElementById("rtTest").value;
      saveToStorage();
      renderReportView();
    }

    function updatePbFields() {
      appState.pbProblem = document.getElementById("pbProblem").value;
      appState.pbProduct = document.getElementById("pbProduct").value;
      saveToStorage();
    }

    function addMember() {
      const input = document.getElementById("newMemberInput");
      const val = input.value.trim();
      if (val && !appState.members.includes(val)) {
        appState.members.push(val);
        input.value = "";
        saveToStorage();
        renderAll();
      }
    }

    function removeMember(index) {
      appState.members.splice(index, 1);
      saveToStorage();
      renderAll();
    }

    function addWorkshop() {
      const input = document.getElementById("newWorkshopInput");
      const val = input.value.trim();
      if (val && !appState.workshops.includes(val)) {
        appState.workshops.push(val);
        input.value = "";
        saveToStorage();
        renderAll();
      }
    }

    function removeWorkshop(index) {
      appState.workshops.splice(index, 1);
      saveToStorage();
      renderAll();
    }

    function renderTags() {
      document.getElementById("memberTags").innerHTML = appState.members.map((m, i) => `
        <span class="tag">${escapeHtml(m)} <button type="button" class="no-print" onclick="removeMember(${i})">×</button></span>
      `).join("");

      document.getElementById("workshopTags").innerHTML = appState.workshops.map((w, i) => `
        <span class="tag">${escapeHtml(w)} <button type="button" class="no-print" onclick="removeWorkshop(${i})">×</button></span>
      `).join("");
    }

    function addStakeholder() {
      const groupInput = document.getElementById("shGroup");
      const categorySelect = document.getElementById("shCategory");
      const needInput = document.getElementById("shNeed");

      const group = groupInput.value.trim();
      const need = needInput.value.trim();

      if (!group || !need) {
        alert("Udfyld venligst både interessent/gruppe og deres konkrete behov.");
        return;
      }

      appState.stakeholders.push({
        id: "sh_" + Date.now(),
        group,
        category: categorySelect.value,
        need
      });

      groupInput.value = "";
      needInput.value = "";
      saveToStorage();
      renderRequirementsView();
      renderReportView();
    }

    function addDefaultStakeholders() {
      const defaults = [
        { group: "Primær bruger (Slutbruger)", category: "Brugsundersøgelse (Bruger)", need: "Nem og ergonomisk betjening, lav vægt og høj driftssikkerhed" },
        { group: "Sekundær bruger (Vedligehold / Montør)", category: "Produktion & Værksted", need: "Let adskillelse ved reparation og udskiftning af sliddele" },
        { group: "Myndigheder & Lovgivning", category: "Myndighedskrav & Standarder", need: "Overholdelse af CE-krav, maskindirektiv og grænseværdier" },
        { group: "Samfund & Miljø", category: "Problemanalyse (Samfund/Miljø)", need: "Bæredygtigt materialevalg (MEKA) og reel reduktion af problemet" },
        { group: "Køber / Afsætningsmarked", category: "Konkurrentanalyse (Marked)", need: "Konkurrencedygtig salgspris sammenlignet med eksisterende produkter" }
      ];

      defaults.forEach(d => {
        if (!appState.stakeholders.some(s => s.group === d.group)) {
          appState.stakeholders.push({ id: "sh_" + Math.random().toString(36).slice(2, 8), ...d });
        }
      });

      saveToStorage();
      renderRequirementsView();
      renderReportView();
    }

    function removeStakeholder(id) {
      appState.stakeholders = appState.stakeholders.filter(s => s.id !== id);
      saveToStorage();
      renderRequirementsView();
      renderReportView();
    }

    function toggleWeightInput() {
      const type = document.getElementById("reqType").value;
      document.getElementById("reqWeightWrap").style.opacity = type === "hard" ? "0.4" : "1";
    }

    function addRequirement() {
      const title = document.getElementById("reqTitle").value.trim();
      const stakeholder = document.getElementById("reqStakeholder").value;
      const type = document.getElementById("reqType").value;
      const weight = type === "hard" ? 5 : (parseInt(document.getElementById("reqWeight").value, 10) || 3);
      const smartText = document.getElementById("reqSmartText").value.trim();
      const justification = document.getElementById("reqJustification").value.trim();
      const testMethod = document.getElementById("reqTestMethod").value.trim();

      const smartFlags = {
        S: document.getElementById("chkS").checked,
        M: document.getElementById("chkM").checked,
        A: document.getElementById("chkA").checked,
        R: document.getElementById("chkR").checked,
        T: document.getElementById("chkT").checked
      };

      if (!title || !smartText || !justification || !testMethod) {
        alert("Udfyld venligst både overskrift, det målbare SMART-krav, faglig begrundelse og testmetode.");
        return;
      }

      appState.requirements.push({
        id: "req_" + Date.now(),
        title,
        stakeholder,
        type,
        weight,
        smartText,
        justification,
        testMethod,
        smartFlags
      });

      if (!appState.redThread.req) {
        appState.redThread.req = `${title}: ${smartText}`;
        document.getElementById("rtReq").value = appState.redThread.req;
      }
      if (!appState.redThread.test) {
        appState.redThread.test = testMethod;
        document.getElementById("rtTest").value = appState.redThread.test;
      }

      document.getElementById("reqTitle").value = "";
      document.getElementById("reqSmartText").value = "";
      document.getElementById("reqJustification").value = "";
      document.getElementById("reqTestMethod").value = "";

      saveToStorage();
      renderRequirementsView();
      renderReportView();
      updateBadges();
    }

    function removeRequirement(id) {
      appState.requirements = appState.requirements.filter(r => r.id !== id);
      saveToStorage();
      renderRequirementsView();
      renderReportView();
      updateBadges();
    }

    function addIdea() {
      const input = document.getElementById("newIdeaInput");
      const val = input.value.trim();
      if (val) {
        appState.ideas.push(val);
        input.value = "";
        saveToStorage();
        renderRequirementsView();
      }
    }

    function removeIdea(idx) {
      if (appState.ideas.length <= 1) return;
      appState.ideas.splice(idx, 1);
      saveToStorage();
      renderRequirementsView();
    }

    function updatePvScore(reqId, ideaIdx, val) {
      appState.pvScores[`${reqId}_${ideaIdx}`] = val;
      saveToStorage();
      renderPvMatrix();
    }

    function updatePvArgumentation() {
      appState.pvArgumentation = document.getElementById("pvArgumentation").value;
      saveToStorage();
      renderReportView();
    }

    function renderRequirementsView() {
      const shBody = document.getElementById("stakeholdersTableBody");
      if (appState.stakeholders.length === 0) {
        shBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Ingen interessenter tilføjet endnu.</td></tr>`;
      } else {
        shBody.innerHTML = appState.stakeholders.map(s => `
          <tr>
            <td><strong>${escapeHtml(s.group)}</strong></td>
            <td><span class="badge-level badge-ab">${escapeHtml(s.category)}</span></td>
            <td>${escapeHtml(s.need)}</td>
            <td class="no-print"><button type="button" class="btn btn-outline btn-sm" onclick="removeStakeholder('${s.id}')">Slet</button></td>
          </tr>
        `).join("");
      }

      const shSelect = document.getElementById("reqStakeholder");
      const shOptions = appState.stakeholders.map(s => `<option value="${escapeHtml(s.group)} (${escapeHtml(s.category)})">${escapeHtml(s.group)} — ${escapeHtml(s.category)}</option>`);
      shOptions.push(`<option value="Problemanalyse / Problemtræ">Problemanalyse / Problemtræ</option>`);
      shSelect.innerHTML = shOptions.join("");

      const reqBody = document.getElementById("requirementsTableBody");
      if (appState.requirements.length === 0) {
        reqBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.2rem; color:var(--text-muted);">Ingen SMART-krav oprettet endnu. Udfyld formularen ovenfor.</td></tr>`;
      } else {
        reqBody.innerHTML = appState.requirements.map((r, idx) => {
          const badge = r.type === "hard"
            ? `<span class="badge-level badge-hard">Hårdt (Skal)</span>`
            : `<span class="badge-level badge-soft">Blødt (Vægt: ${r.weight})</span>`;
          const smartLetters = ["S", "M", "A", "R", "T"].filter(k => r.smartFlags && r.smartFlags[k]).join("");
          return `
            <tr>
              <td><strong>K${idx + 1}</strong><br><small style="color:var(--success); font-weight:700;">${smartLetters}</small></td>
              <td>${escapeHtml(r.stakeholder)}</td>
              <td>${badge}</td>
              <td><strong>${escapeHtml(r.title)}:</strong><br>${escapeHtml(r.smartText)}</td>
              <td>${escapeHtml(r.justification)}</td>
              <td>${escapeHtml(r.testMethod)}</td>
              <td class="no-print"><button type="button" class="btn btn-outline btn-sm" onclick="removeRequirement('${r.id}')">✕</button></td>
            </tr>
          `;
        }).join("");
      }

      renderPvMatrix();
    }

    function renderPvMatrix() {
      const table = document.getElementById("pvMatrixTable");
      if (appState.requirements.length === 0) {
        table.innerHTML = `<tbody><tr><td style="text-align:center; padding:1.2rem; color:var(--text-muted);">Tilføj først mindst ét krav i Trin 2 ovenfor for at aktivere PV-skemaet.</td></tr></tbody>`;
        return;
      }

      const hardReqs = appState.requirements.filter(r => r.type === "hard");
      const softReqs = appState.requirements.filter(r => r.type === "soft");

      const ideaFailedHard = appState.ideas.map((_, ideaIdx) =>
        hardReqs.some(r => appState.pvScores[`${r.id}_${ideaIdx}`] === "no")
      );

      let html = `
        <thead>
          <tr>
            <th style="width:28%;">Krav fra Kravspecifikationen</th>
            <th style="width:10%;">Type / Vægt</th>
            ${appState.ideas.map((idea, idx) => `
              <th>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>${escapeHtml(idea)}</span>
                  <button type="button" class="no-print" style="background:none; border:none; cursor:pointer; font-weight:bold;" onclick="removeIdea(${idx})">×</button>
                </div>
              </th>
            `).join("")}
          </tr>
        </thead>
        <tbody>
      `;

      if (hardReqs.length > 0) {
        html += `<tr class="phase-group-row"><td colspan="${2 + appState.ideas.length}" style="background:#991b1b;">1. Frasortering med Hårde krav (Skal-krav)</td></tr>`;
        hardReqs.forEach(r => {
          html += `
            <tr>
              <td><strong>${escapeHtml(r.title)}</strong><br><small style="color:var(--text-muted);">${escapeHtml(r.smartText)}</small></td>
              <td><span class="badge-level badge-hard">Skal-krav</span></td>
              ${appState.ideas.map((_, ideaIdx) => {
                const val = appState.pvScores[`${r.id}_${ideaIdx}`] || "yes";
                return `
                  <td>
                    <select class="table-input" onchange="updatePvScore('${r.id}', ${ideaIdx}, this.value)"
                            style="font-weight:600; color:${val === 'yes' ? 'var(--success)' : 'var(--danger)'};">
                      <option value="yes" ${val === 'yes' ? 'selected' : ''}>✔ Opfyldt</option>
                      <option value="no" ${val === 'no' ? 'selected' : ''}>✖ Ikke opfyldt</option>
                    </select>
                  </td>
                `;
              }).join("")}
            </tr>
          `;
        });
      }

      if (softReqs.length > 0) {
        html += `<tr class="phase-group-row"><td colspan="${2 + appState.ideas.length}" style="background:#2563eb;">2. Vurdering af Bløde krav (Point 1-5 × Vægt)</td></tr>`;
        softReqs.forEach(r => {
          html += `
            <tr>
              <td><strong>${escapeHtml(r.title)}</strong><br><small style="color:var(--text-muted);">${escapeHtml(r.smartText)}</small></td>
              <td><span class="badge-level badge-soft">Vægt: ${r.weight}</span></td>
              ${appState.ideas.map((_, ideaIdx) => {
                const rawScore = parseInt(appState.pvScores[`${r.id}_${ideaIdx}`] ?? 3, 10);
                const weighted = rawScore * r.weight;
                return `
                  <td style="${ideaFailedHard[ideaIdx] ? 'opacity:0.45;' : ''}">
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                      <select class="table-input" style="width:72px;" onchange="updatePvScore('${r.id}', ${ideaIdx}, parseInt(this.value,10))">
                        ${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${rawScore === n ? 'selected' : ''}>${n} p.</option>`).join("")}
                      </select>
                      <span style="font-size:0.8rem; font-weight:700; color:var(--primary-accent);">= ${weighted}</span>
                    </div>
                  </td>
                `;
              }).join("")}
            </tr>
          `;
        });
      }

      const totals = appState.ideas.map((_, ideaIdx) => {
        if (ideaFailedHard[ideaIdx]) return -1;
        return softReqs.reduce((acc, r) => acc + ((parseInt(appState.pvScores[`${r.id}_${ideaIdx}`] ?? 3, 10)) * r.weight), 0);
      });
      const maxScore = Math.max(...totals);

      html += `
        <tr style="background:#f1f5f9; font-weight:700;">
          <td colspan="2">Samlet vægtet score</td>
          ${appState.ideas.map((_, ideaIdx) => {
            if (ideaFailedHard[ideaIdx]) return `<td style="color:var(--danger);">Frasorteret (dumpet skal-krav)</td>`;
            const isWinner = totals[ideaIdx] === maxScore && maxScore > 0;
            return `<td style="color:${isWinner ? 'var(--success)' : 'var(--text)'};">${totals[ideaIdx]} point ${isWinner ? '🏆' : ''}</td>`;
          }).join("")}
        </tr>
        </tbody>
      `;
      table.innerHTML = html;
    }

    /**
     * --------------------------------------------------------------------------
     * 9. KILDELISTE & KILDEKRITIK MED FASE-FARVEKODNING (SIDE 5)
     * --------------------------------------------------------------------------
     */
    function updateSearchLog() {
      appState.searchLog = document.getElementById("searchLogInput").value;
      saveToStorage();
    }

    function addSource() {
      const author = document.getElementById("srcAuthor").value.trim();
      const year = document.getElementById("srcYear").value.trim() || "u.å.";
      const title = document.getElementById("srcTitle").value.trim();
      const type = document.getElementById("srcType").value;
      const phaseId = document.getElementById("srcPhase").value;
      const url = document.getElementById("srcUrl").value.trim();
      const reliability = document.getElementById("srcReliability").value;
      const claim = document.getElementById("srcClaim").value.trim();
      const critique = document.getElementById("srcCritique").value.trim();

      if (!author || !title) {
        alert("Udfyld venligst mindst Forfatter/Afsender og Kildens titel.");
        return;
      }

      appState.sources.push({
        id: "src_" + Date.now(),
        author,
        year,
        title,
        type,
        phaseId,
        url,
        reliability,
        claim,
        critique
      });

      document.getElementById("srcAuthor").value = "";
      document.getElementById("srcYear").value = "";
      document.getElementById("srcTitle").value = "";
      document.getElementById("srcUrl").value = "";
      document.getElementById("srcClaim").value = "";
      document.getElementById("srcCritique").value = "";

      saveToStorage();
      renderSourcesView();
      renderProblemTree();
      renderReportView();
      updateBadges();
    }

    function removeSource(id) {
      appState.sources = appState.sources.filter(s => s.id !== id);
      saveToStorage();
      renderSourcesView();
      renderProblemTree();
      renderReportView();
      updateBadges();
    }

    function renderSourcesView() {
      const tbody = document.getElementById("sourcesTableBody");
      if (appState.sources.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Ingen kilder registreret endnu. Brug formularen ovenfor til at gemme jeres kilder og kildekritik.</td></tr>`;
        return;
      }

      tbody.innerHTML = appState.sources.map((s, idx) => {
        const phaseObj = FAG_DATA.phases.find(p => p.id === s.phaseId || p.title === s.phase) || FAG_DATA.phases[1];
        const relBadgeClass = s.reliability === "Høj troværdighed"
          ? "badge-core"
          : (s.reliability === "Middel troværdighed" ? "badge-warn" : "badge-hard");

        return `
          <tr>
            <td><strong>[${idx + 1}]</strong></td>
            <td>
              <strong>${escapeHtml(s.author)} (${escapeHtml(s.year)})</strong>: <em>${escapeHtml(s.title)}</em><br>
              <span class="badge-level badge-ab" style="margin-top:0.2rem; display:inline-block;">${escapeHtml(s.type)}</span>
              ${s.url ? `<br><small style="color:var(--primary-accent); word-break:break-all;">${escapeHtml(s.url)}</small>` : ''}
            </td>
            <td>
              <span class="phase-color-tag" style="background:${phaseObj.color};">${escapeHtml(phaseObj.title)}</span><br>
              <span class="badge-level ${relBadgeClass}" style="margin-top:0.25rem; display:inline-block;">${escapeHtml(s.reliability)}</span>
            </td>
            <td>${escapeHtml(s.claim || "-")}</td>
            <td>${escapeHtml(s.critique || "-")}</td>
            <td class="no-print"><button type="button" class="btn btn-outline btn-sm" onclick="removeSource('${s.id}')">✕</button></td>
          </tr>
        `;
      }).join("");
    }

    /**
     * --------------------------------------------------------------------------
     * 10. FARVEKODET TIDSPLANSGENERATOR (SIDE 6)
     * --------------------------------------------------------------------------
     */
    function autoDistributeSchedule() {
      const startStr = appState.startDate;
      const endStr = appState.endDate;
      if (!startStr || !endStr) {
        alert("Angiv venligst både startdato og afleveringsdato i Trin 1.");
        return;
      }

      const startMs = new Date(startStr).getTime();
      const endMs = new Date(endStr).getTime();
      if (endMs <= startMs) {
        alert("Afleveringsdatoen skal ligge efter startdatoen.");
        return;
      }

      const totalMs = endMs - startMs;
      const targetHours = appState.totalHours || 45;

      let rawSumHours = 0;
      FAG_DATA.phases.forEach(p => {
        p.methods.forEach(m => {
          if (appState.selectedMethods[m.id]) rawSumHours += (m.defaultHours || 2);
        });
      });

      if (rawSumHours === 0) return;
      const scaleFactor = targetHours / rawSumHours;

      const seqPhases = FAG_DATA.phases.filter(p => p.type === "sequential");
      const activeSeqPhases = seqPhases.filter(p => countSelectedInPhase(p) > 0);
      const totalSeqWeight = activeSeqPhases.reduce((acc, p) => acc + p.weightPct, 0) || 100;

      let cursorEndMs = endMs;

      for (let i = activeSeqPhases.length - 1; i >= 0; i--) {
        const phase = activeSeqPhases[i];
        const phaseFraction = phase.weightPct / totalSeqWeight;
        const phaseDurationMs = totalMs * phaseFraction;
        const phaseStartMs = (i === 0) ? startMs : Math.max(startMs, cursorEndMs - phaseDurationMs);

        const pStartStr = new Date(phaseStartMs).toISOString().split("T")[0];
        const pEndStr = new Date(cursorEndMs).toISOString().split("T")[0];

        phase.methods.forEach(m => {
          if (appState.selectedMethods[m.id]) {
            appState.selectedMethods[m.id].hours = Math.round((m.defaultHours * scaleFactor) * 2) / 2;
            appState.selectedMethods[m.id].startDate = pStartStr;
            appState.selectedMethods[m.id].endDate = pEndStr;
            if ((phase.id === "realisering" || m.id === "udf_prototype_a") && !appState.selectedMethods[m.id].workshop && appState.workshops.length > 0) {
              appState.selectedMethods[m.id].workshop = appState.workshops[0];
            }
          }
        });
        cursorEndMs = phaseStartMs;
      }

      FAG_DATA.phases.filter(p => p.type === "cross").forEach(phase => {
        phase.methods.forEach(m => {
          if (appState.selectedMethods[m.id]) {
            appState.selectedMethods[m.id].hours = Math.round((m.defaultHours * scaleFactor) * 2) / 2;
            appState.selectedMethods[m.id].startDate = startStr;
            appState.selectedMethods[m.id].endDate = endStr;
          }
        });
      });

      saveToStorage();
      renderMainTheoryPanel();
      renderScheduleView();
    }

    function renderScheduleView() {
      const tbody = document.getElementById("scheduleTableBody");
      let rowsHtml = "";
      let totalPlannedHours = 0;
      const phaseHoursMap = [];

      FAG_DATA.phases.forEach(phase => {
        const selectedInPhase = phase.methods.filter(m =>
          (m.level === "AB" || m.level === appState.level) && appState.selectedMethods[m.id]
        );
        if (selectedInPhase.length === 0) return;

        let phaseSum = 0;
        selectedInPhase.forEach(m => { phaseSum += Number(appState.selectedMethods[m.id].hours) || 0; });
        totalPlannedHours += phaseSum;
        phaseHoursMap.push({ title: phase.title, hours: phaseSum, color: phase.color });

        rowsHtml += `
          <tr class="phase-group-row">
            <td colspan="7" style="background:${phase.color};">${phase.num}: ${phase.fullTitle} — Samlet i fasen: ${phaseSum} timer</td>
          </tr>
        `;

        selectedInPhase.forEach(m => {
          const item = appState.selectedMethods[m.id];
          const workshopOptions = [`<option value="">Ingen / Klasselokale</option>`]
            .concat(appState.workshops.map(w => `<option value="${escapeHtml(w)}" ${item.workshop === w ? 'selected' : ''}>${escapeHtml(w)}</option>`))
            .join("");

          const memberOptions = [`<option value="Hele gruppen">Hele gruppen</option>`]
            .concat(appState.members.map(mem => `<option value="${escapeHtml(mem)}" ${item.assignee === mem ? 'selected' : ''}>${escapeHtml(mem)}</option>`))
            .join("");

          rowsHtml += `
            <tr>
              <td><span class="phase-color-tag" style="background:${phase.color};">${phase.title}</span></td>
              <td><strong>${m.title}</strong></td>
              <td>
                <input type="number" step="0.5" min="0" class="table-input hours-input" value="${item.hours}"
                       onchange="updateMethodField('${m.id}', 'hours', parseFloat(this.value)||0)">
              </td>
              <td>
                <input type="date" class="table-input" value="${item.startDate || ''}"
                       onchange="updateMethodField('${m.id}', 'startDate', this.value)">
              </td>
              <td>
                <input type="date" class="table-input" value="${item.endDate || ''}"
                       onchange="updateMethodField('${m.id}', 'endDate', this.value)">
              </td>
              <td>
                <select class="table-input" onchange="updateMethodField('${m.id}', 'workshop', this.value)">
                  ${workshopOptions}
                </select>
              </td>
              <td>
                <select class="table-input" onchange="updateMethodField('${m.id}', 'assignee', this.value)">
                  ${memberOptions}
                </select>
              </td>
            </tr>
          `;
        });
      });

      tbody.innerHTML = rowsHtml || `<tr><td colspan="7" style="text-align:center; padding:2rem;">Ingen underemner valgt endnu. Brug venstremenuen på Side 2 til at krydse metoder af.</td></tr>`;

      const daysDiff = (appState.startDate && appState.endDate)
        ? Math.max(0, Math.round((new Date(appState.endDate) - new Date(appState.startDate)) / (1000 * 60 * 60 * 24)))
        : 0;

      document.getElementById("scheduleDateSpan").textContent =
        `Projektperiode: ${appState.startDate || "?"} til ${appState.endDate || "?"} (${daysDiff} kalenderdage)`;

      const diffHours = Math.round((totalPlannedHours - appState.totalHours) * 10) / 10;
      const statusColor = Math.abs(diffHours) <= 2 ? "var(--success)" : "var(--warning)";

      document.getElementById("scheduleHoursSummary").innerHTML =
        `Planlagte timer (FORSLAG): <span style="color:${statusColor}">${totalPlannedHours} / ${appState.totalHours} timer</span>`;

      const barContainer = document.getElementById("scheduleVisualBar");
      const legendContainer = document.getElementById("scheduleLegend");

      if (totalPlannedHours > 0) {
        barContainer.innerHTML = phaseHoursMap.map(ph => {
          const pct = Math.round((ph.hours / totalPlannedHours) * 1000) / 10;
          return `<div class="gantt-segment" style="width:${pct}%; background:${ph.color};" title="${ph.title}: ${ph.hours} t. (${pct}%)">${pct >= 7 ? Math.round(pct) + '%' : ''}</div>`;
        }).join("");

        legendContainer.innerHTML = phaseHoursMap.map(ph => `
          <span><strong style="color:${ph.color};">■</strong> ${ph.title}: ${ph.hours} t.</span>
        `).join("");
      } else {
        barContainer.innerHTML = "";
        legendContainer.innerHTML = "";
      }
    }

    /**
     * --------------------------------------------------------------------------
     * 11. RAPPORTDISPOSITION, UNDERSKRIFTSFELTER & OVERLEAF LATEX (SIDE 7)
     * --------------------------------------------------------------------------
     */
    function renderSignatureGrid() {
      const sigContainer = document.getElementById("pbSignatureContainer");
      if (!sigContainer) return;

      const membersList = appState.members.length > 0 ? appState.members : ["Elev 1"];

      const memberBoxesHtml = membersList.map((m) => `
        <div class="signature-box">
          <div class="signature-line"></div>
          <div class="signature-label">
            <span>Underskrift: ${escapeHtml(m)}</span>
            <span style="color:var(--text-muted); font-weight:normal;">Dato: ________</span>
          </div>
        </div>
      `).join("");

      const teacherBoxHtml = `
        <div class="signature-box teacher-box">
          <div class="signature-line"></div>
          <div class="signature-label">
            <span style="color:var(--secondary);">Godkendt af lærer / vejleder</span>
            <span style="color:var(--text-muted); font-weight:normal;">Dato: ________</span>
          </div>
        </div>
      `;

      sigContainer.innerHTML = memberBoxesHtml + teacherBoxHtml;
    }

    function renderReportView() {
      renderSignatureGrid();

      const outlineEl = document.getElementById("reportOutlineContainer");
      const criteriaEl = document.getElementById("examCriteriaContainer");
      const lvlData = FAG_DATA.levels[appState.level];
      const memberCount = Math.max(1, appState.members.length);

      const getPhaseObj = (phaseId) => FAG_DATA.phases.find(p => p.id === phaseId);

      const renderSubpoints = (phaseId) => {
        const ph = getPhaseObj(phaseId);
        if (!ph) return "";
        const items = ph.methods.filter(m => (m.level === "AB" || m.level === appState.level) && appState.selectedMethods[m.id]);
        if (items.length === 0) return `<li style="color:var(--text-muted); font-style:italic;">(Ingen underemner valgt i denne fase)</li>`;
        return items.map(m => `<li>${m.title} <em>(${appState.selectedMethods[m.id].hours} t.)</em></li>`).join("");
      };

      const renderColoredHeading = (phaseId, label) => {
        const ph = getPhaseObj(phaseId);
        return `<span class="phase-color-tag" style="background:${ph.color}; margin-right:0.35rem;">${ph.num}</span><strong style="color:${ph.color};">${label}</strong>`;
      };

      const ptreeSummaryHtml = appState.problemTree.length > 0
        ? `<div style="margin-top:0.35rem; font-size:0.82rem; background:#fff7ed; padding:0.5rem 0.75rem; border-left:3px solid #d97706;">
             <strong>Problemtræ (${appState.problemTree.length} kasser med kilder):</strong>
             <ul style="padding-left:1.1rem; margin-top:0.2rem;">
               ${appState.problemTree.map(n => `<li><strong>${n.type === 'cause' ? 'Årsag' : (n.type === 'effect' ? 'Virkning' : 'Kerneproblem')}:</strong> ${escapeHtml(n.statement || n.claim)} <em>(Kilde: ${escapeHtml(n.source)})</em></li>`).join("")}
             </ul>
             ${appState.aauProblemFormulation ? `<div style="margin-top:0.3rem;"><strong>Problemformulering:</strong> <em>${escapeHtml(appState.aauProblemFormulation)}</em></div>` : ''}
           </div>`
        : "";

      const reqSummaryHtml = appState.requirements.length > 0
        ? `<div style="margin-top:0.35rem; font-size:0.82rem; background:#f8fafc; padding:0.5rem 0.75rem; border-left:3px solid #2563eb;">
             <strong>Opstillede SMART-krav (${appState.requirements.length} stk.):</strong>
             <ul style="padding-left:1.1rem; margin-top:0.2rem;">
               ${appState.requirements.map((r, i) => `<li><strong>K${i + 1} (${r.type === 'hard' ? 'Skal' : 'Vægt ' + r.weight}):</strong> ${escapeHtml(r.title)} – ${escapeHtml(r.smartText)}</li>`).join("")}
             </ul>
           </div>`
        : "";

      const sourcesSummaryHtml = appState.sources.length > 0
        ? `<ul style="padding-left:1.2rem; font-size:0.84rem;">
             ${appState.sources.map((s, i) => `<li><strong>[${i + 1}] ${escapeHtml(s.author)} (${escapeHtml(s.year)}):</strong> <em>${escapeHtml(s.title)}</em> (${escapeHtml(s.type)} – ${escapeHtml(s.reliability)})</li>`).join("")}
           </ul>`
        : `<p style="font-size:0.82rem; color:var(--text-muted); font-style:italic; margin-left:1.2rem;">(Ingen kilder tilføjet på Side 5 endnu)</p>`;

      outlineEl.innerHTML = `
        <div style="background:var(--primary-light); padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; font-size:0.88rem;">
          <strong>Projekt:</strong> ${escapeHtml(appState.projectTitle || "Ikke navngivet endnu")}<br>
          <strong>Niveau:</strong> ${lvlData.name} &bull; <strong>Forventet sidetal:</strong> ${lvlData.pageRule(memberCount)}<br>
          <strong>Den Røde Tråd:</strong> Årsag: <em>${escapeHtml(appState.redThread.cause || "?")}</em> &rarr; Krav: <em>${escapeHtml(appState.redThread.req || "?")}</em> &rarr; Test: <em>${escapeHtml(appState.redThread.test || "?")}</em>
        </div>

        <ol style="padding-left:1.3rem; line-height:1.8; font-size:0.9rem;">
          <li><strong>Forside</strong> (Titel, gruppemedlemmer, skole og dato)</li>
          <li><strong>Titelblad med resumé</strong></li>
          <li><strong>Indholdsfortegnelse & Forord</strong></li>
          <li>${renderColoredHeading("problemet", "Indledning & Initierende problem")}<ul style="padding-left:1.2rem;">${renderSubpoints("problemet")}</ul></li>
          <li>${renderColoredHeading("problemanalyse", "Problemanalyse, Problemtræ & Problemformulering")}<ul style="padding-left:1.2rem;">${renderSubpoints("problemanalyse")}</ul>${ptreeSummaryHtml}</li>
          <li>${renderColoredHeading("produktprincip", "Produktprincip")}<ul style="padding-left:1.2rem;">${renderSubpoints("produktprincip")}</ul>${reqSummaryHtml}</li>
          <li>${renderColoredHeading("produktudformning", "Produktudformning")}<ul style="padding-left:1.2rem;">${renderSubpoints("produktudformning")}</ul></li>
          <li>${renderColoredHeading("produktionsforberedelse", "Produktionsforberedelse")}<ul style="padding-left:1.2rem;">${renderSubpoints("produktionsforberedelse")}</ul></li>
          <li>${renderColoredHeading("realisering", "Realisering")}<ul style="padding-left:1.2rem;">${renderSubpoints("realisering")}</ul></li>
          <li>${renderColoredHeading("evaluering", "Evaluering")}<ul style="padding-left:1.2rem;">${renderSubpoints("evaluering")}</ul></li>
          <li><strong>Konklusion</strong></li>
          <li><strong>Kildeliste (${appState.sources.length} kilder)</strong>${sourcesSummaryHtml}</li>
          <li><strong>Bilag</strong> (Tidsplan, arbejdstegninger, samlingstegning, stykliste, el-diagrammer, kode${appState.level === 'B' ? ', underskrevet projektbeskrivelse med alle gruppemedlemmer' : ''})</li>
        </ol>
      `;

      criteriaEl.innerHTML = `
        <div class="theory-box" style="margin-top:0;">
          <h4>Bedømmelseskriterier (Læreplanens afsnit 4.3)</h4>
          <ul style="padding-left:1.2rem; margin-top:0.35rem; font-size:0.86rem;">
            <li><strong>Dokumentations- og kommunikationsværdi:</strong> Overskuelighed, sammenhæng, kildehenvisninger, figurtekster og teknisk dokumentation.</li>
            <li><strong>Argumentation & Kildekritik:</strong> Saglig bearbejdning af problemstillingen med kilder til alle dele af problemtræet.</li>
            <li><strong>Begrundede krav og valg:</strong> Fagligt begrundede argumenter for opstillede SMART-krav og foretagne valg fra idé til produkt${appState.level === 'A' ? 'ion' : ''}.</li>
            <li><strong>Inddragelse af andre fag:</strong> Relevant viden og beregninger fra fx matematik, fysik, kemi og samfundsfag.</li>
            <li><strong>Miljø og samfund:</strong> Miljømæssige overvejelser samt samspillet mellem produkt${appState.level === 'A' ? ', produktion' : ''} og samfund.</li>
            <li><strong>Omhu og test:</strong> Omhu og professionalisme i værkstedet samt systematisk test op mod opstillede krav.</li>
            <li><strong>Projektstyring:</strong> Dokumentation for planlægning og samarbejde.</li>
          </ul>
        </div>
        <div class="theory-box" style="border-left-color: var(--secondary); background: var(--secondary-light);">
          <h4 style="color: var(--secondary);">Mundtlig eksamen (Afsnit 4.2)</h4>
          <p style="font-size:0.85rem;">Gruppeprøve, ca. 30 min. pr. eksaminand, ingen forberedelsestid. Præsentationen må <strong>højst udgøre halvdelen af tiden</strong>. Der gives én individuel helhedskarakter ud fra rapport, produkt/procesforløb og mundtlig prøve.</p>
        </div>
      `;
    }

    function openLatexModal() {
      const lvlData = FAG_DATA.levels[appState.level];
      const title = appState.projectTitle || "Teknologiprojekt";
      const authors = appState.members.join(" \\and ");

      const getLatexMethods = (phaseId) => {
        const ph = FAG_DATA.phases.find(p => p.id === phaseId);
        if (!ph) return "";
        const items = ph.methods.filter(m => (m.level === "AB" || m.level === appState.level) && appState.selectedMethods[m.id]);
        if (items.length === 0) return "% Ingen underemner valgt i denne fase\n";
        return items.map(m => `\\subsection{${m.title}}\n% Vejledning: ${m.desc}\n`).join("\n");
      };

      const ptreeRowsLatex = appState.problemTree.length > 0
        ? appState.problemTree.map(n => {
            const typeLabel = n.type === 'cause' ? 'Årsag (Rod)' : (n.type === 'effect' ? 'Virkning (Krone)' : 'Kerneproblem');
            return `${typeLabel} & ${n.statement || n.claim} & ${n.source} \\\\ \\hline`;
          }).join("\n")
        : "Årsag (Rod) & [Beskriv årsag] & [Angiv kilde] \\\\ \\hline";

      const compRowsLatex = appState.competitors.length > 0
        ? appState.competitors.map((c, i) =>
            `K${i + 1} & ${c.name} & Zone ${c.ring} & ${c.priceMat} & ${c.pros} & ${c.cons} \\\\ \\hline`
          ).join("\n")
        : "K1 & Produkt A & Zone 1 & [Pris/Mat] & [Fordele] & [Ulemper] \\\\ \\hline";

      const reqRowsLatex = appState.requirements.length > 0
        ? appState.requirements.map((r, i) =>
            `K${i + 1} & ${r.stakeholder} & ${r.type === 'hard' ? 'Skal-krav' : 'Vægt ' + r.weight} & ${r.title}: ${r.smartText} & ${r.justification} & ${r.testMethod} \\\\ \\hline`
          ).join("\n")
        : "K1 & Bruger & Skal-krav & [Indsæt SMART-krav] & [Begrundelse] & [Testmetode] \\\\ \\hline";

      const bibItemsLatex = appState.sources.length > 0
        ? appState.sources.map((s, i) =>
            `\\bibitem{kilde${i + 1}} ${s.author} (${s.year}): \\textit{${s.title}}. (${s.type}). ${s.url ? `\\url{${s.url}}` : ''}\n% Dokumenterer: ${s.claim || '-'}\n% Kildekritik (${s.reliability}): ${s.critique || '-'}`
          ).join("\n\n")
        : `\\bibitem{kilde1} Forfatter (År): \\textit{Titel på kilde}. \\url{https://eksempel.dk}`;

      const latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[danish]{babel}
\\usepackage[T1]{fontenc}
\\usepackage{graphicx}
\\usepackage{tabularx}
\\usepackage{geometry}
\\usepackage{hyperref}
\\geometry{margin=2.5cm}

\\title{\\textbf{${title}}\\\\ \\large ${lvlData.name} -- HTX Projekt}
\\author{${authors}}
\\date{Afleveringsdato: ${appState.endDate || "\\today"}}

\\begin{document}
\\maketitle
\\begin{abstract}
% Kort resumé af problem, metode, produkt og konklusion.
\\end{abstract}
\\newpage
\\tableofcontents
\\newpage

\\section{Indledning og Initierende problem}
${getLatexMethods("problemet")}

\\section{Problemanalyse (AAU-model)}
% Søgeprotokol: ${appState.searchLog || "Husk at beskrive søgeord og databaser"}
${getLatexMethods("problemanalyse")}

\\subsection*{Kildebelagt Problemtræ (Årsager og Virkninger)}
\\begin{table}[htbp]
\\centering
\\small
\\begin{tabularx}{\\textwidth}{|l|X|X|}
\\hline
\\textbf{Placering i træ} & \\textbf{Årsag / Kerneproblem / Virkning} & \\textbf{Kildehenvisning} \\\\ \\hline
${ptreeRowsLatex}
\\end{tabularx}
\\caption{Dokumentation af kasserne i gruppens problemtræ.}
\\end{table}

\\subsection*{Problemformulering}
\\textbf{${appState.aauProblemFormulation || "Indsæt gruppens endelige problemformulering her."}}

\\section{Produktprincip}
${getLatexMethods("produktprincip")}

\\subsection*{Oversigt fra Skydeskivemodel (Konkurrentanalyse)}
\\begin{table}[htbp]
\\centering
\\small
\\begin{tabularx}{\\textwidth}{|l|l|l|X|X|X|}
\\hline
\\textbf{Nr.} & \\textbf{Produkt} & \\textbf{Zone} & \\textbf{Pris/Materialer} & \\textbf{Fordele} & \\textbf{Ulemper} \\\\ \\hline
${compRowsLatex}
\\end{tabularx}
\\caption{Konkurrentanalyse inddelt efter skydeskivemodellens tre zoner.}
\\end{table}

\\subsection*{Kravspecifikation (SMART-krav)}
\\begin{table}[htbp]
\\centering
\\small
\\begin{tabularx}{\\textwidth}{|l|l|l|X|X|X|}
\\hline
\\textbf{Nr.} & \\textbf{Interessent} & \\textbf{Type/Vægt} & \\textbf{SMART-krav} & \\textbf{Begrundelse} & \\textbf{Testmetode} \\\\ \\hline
${reqRowsLatex}
\\end{tabularx}
\\caption{Kravspecifikation opstillet efter SMART-modellen.}
\\label{tab:kravspec}
\\end{table}

\\section{Produktudformning}
${getLatexMethods("produktudformning")}

\\section{Produktionsforberedelse}
${getLatexMethods("produktionsforberedelse")}

\\section{Realisering}
${getLatexMethods("realisering")}

\\section{Evaluering}
${getLatexMethods("evaluering")}

\\section{Konklusion}

\\begin{thebibliography}{99}
${bibItemsLatex}
\\end{thebibliography}

\\appendix
\\section{Bilag}
\\end{document}`;

      document.getElementById("latexCodeOutput").value = latex;
      document.getElementById("latexModal").classList.remove("hidden");
    }

    function closeLatexModal() {
      document.getElementById("latexModal").classList.add("hidden");
    }

    function copyLatexCode() {
      const el = document.getElementById("latexCodeOutput");
      el.select();
      navigator.clipboard.writeText(el.value);
      alert("LaTeX-koden er kopieret til udklipsholderen!");
    }

    function toggleIterationModal(show) {
      document.getElementById("iterationModal").classList.toggle("hidden", !show);
    }

    function exportProjectJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
      const dlAnchor = document.createElement("a");
      const safeTitle = (appState.projectTitle || "teknologiprojekt").toLowerCase().replace(/[^a-z0-9æøå]+/g, "-");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `${safeTitle}-plan.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
    }

    function importProjectJSON(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          appState = { ...appState, ...imported };
          ensureValidSubtopic();
          syncUIFromState();
          saveToStorage();
          renderAll();
        } catch (err) {
          alert("Filen kunne ikke indlæses. Kontroller at det er en gyldig JSON-projektfil.");
        }
      };
      reader.readAsText(file);
    }

    function resetProject() {
      if (!confirm("Er du sikker på, at du vil nulstille projektplanen til standardindstillinger?")) return;
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }

    function escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
