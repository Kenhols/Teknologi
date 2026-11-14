/**
     * --------------------------------------------------------------------------
     * 1. DATA FOR PUSLESPILSMODELLEN (TEKNOLOGIBEGREBET - FIGUR 4 & 5)
     * --------------------------------------------------------------------------
     */
    const PUZZLE_DATA = {
      viden: {
        title: "🧩 Brik 1: VIDEN (Kunnen, faglig indsigt, erfaring & intuition)",
        color: "#2563eb",
        desc: "Viden er de menneskelige kvalifikationer, naturvidenskabelige teorier, beregninger, håndværksmæssige erfaringer og intuition, der kræves for at udvikle, fremstille og anvende teknologien.",
        inReport: [
          "I Produktudformning: Naturvidenskabelige beregninger (fysik, matematik, kemi) og kendskab til materialers egenskaber.",
          "I Produktionsforberedelse: Hvilke faglige kompetencer, maskinkørekort og oplæring kræves i værkstedet eller virksomheden?",
          "I Evaluering: Hvilken viden kræver det af slutbrugeren at betjene jeres produkt korrekt og sikkert?"
        ]
      },
      organisation: {
        title: "🧩 Brik 2: ORGANISATION (Ledelse, arbejdsdeling & procesrækkefølge)",
        color: "#7c3aed",
        desc: "Organisation handler om, hvordan arbejdet og processerne er struktureret, ledet og koordineret – både i fremstillingen af produktet og når produktet bagefter bruges i samfundet.",
        inReport: [
          "I Produktionsforberedelse (B & A): Proces-flowdiagram / rutekort, der viser rækkefølgen af delprocesser og kvalitetskontrol.",
          "Kun Teknologi A: Valg af produktionsform (enkeltstyk, serie, masse), produktionslayout (linje-, gruppe-, funktionslayout) og lagerstyring (MRP/JIT).",
          "I Projektstyring: Jeres egen gruppekontrakt, Belbin-roller og tidsplan med milepæle."
        ]
      },
      teknik: {
        title: "🧩 Brik 3: TEKNIK (Arbejdsmidler, råvarer/arbejdsgenstande & arbejdskraft)",
        color: "#0d9488",
        desc: "Teknik er alle de fysiske genstande (artefakter) og ressourcer, der indgår: Maskiner, værktøjer, 3D-printere, lasercuttere, råmaterialer, energi og den fysiske arbejdskraft.",
        inReport: [
          "I Produktudformning & Produktionsforberedelse: Hvilke konkrete maskiner, værktøjer, råmaterialer og komponenter bruges til at fremstille produktet?",
          "I Evaluering: Når jeres færdige produkt tages i brug af kunden, indgår selve jeres produkt som ny 'teknik' i brugerens hverdag!"
        ]
      },
      produkt: {
        title: "🧩 Brik 4: PRODUKT (Det færdige resultat og dets egenskaber)",
        color: "#ea580c",
        desc: "Produktet er resultatet af fremstillingsprocessen (enten et fysisk produkt eller et gennemført procesforløb), som mennesket anvender til at løse et problem og forbedre sine livsbetingelser.",
        inReport: [
          "I Produktprincip: Kravspecifikationen (SMART-krav) fastlægger, hvilke egenskaber produktet skal have.",
          "I Realisering & Evaluering: Det fysisk fremstillede produkt (udført med omhu!) testes op mod kravene, og dets samspil med samfundet vurderes."
        ]
      },
      ext_samfund: {
        title: "🌐 Den udvidede puslespilsmodel: De 12 samfundsbrikker (Teknologi A - Figur 5)",
        color: "#5b21b6",
        desc: "På Teknologi A bruges Jens Müllers udvidede puslespilsmodel til at analysere samspillet mellem virksomhedens teknologivalg, konkurrencestrategi og det omgivende samfund (regionalt, nationalt og internationalt).",
        inReport: [
          "Økologiske betingelser & Statslig regulering: Miljølovgivning, CO2-afgifter, CE-mærkning og adgang til råstoffer.",
          "Arbejdsmarkedsforhold & Human ressourcer: Lønniveau, uddannelsesniveau og adgang til faglærte/ingeniører (fx ved overvejelse om outsourcing).",
          "Økonomisk/social infrastruktur & Internationale relationer: Transportnet, forsyningssikkerhed samt handelsaftaler som EU, WTO og OECD."
        ]
      }
    };

    /**
     * --------------------------------------------------------------------------
     * 2. FAGDATA FOR FASER OG UNDEREMNER (Tilpasset AAU-modellen for Fase 0 og 1)
     * --------------------------------------------------------------------------
     */
    const FAG_DATA = {
      levels: {
        B: {
          name: "Teknologi B",
          defaultHours: 45,
          durationInfo: "Afsluttende projekt: ca. 45 timer over ca. 6 uger (sidste uge uden anden undervisning til værkstedsarbejde).",
          pageRule: (n) => `${15 + (n - 1) * 5} –${30 + (n - 1) * 5} sider`
        },
        A: {
          name: "Teknologi A",
          defaultHours: 70,
          durationInfo: "Afsluttende projekt: ca. 70 timers undervisningstid. Rapport afleveres normalt senest en uge før afslutning.",
          pageRule: (n) => `${15 + (n - 1) * 5} –${30 + (n - 1) * 15} sider (15-30 sider for 1 elev + 5-15 sider pr. ekstra elev)`
        }
      },

      phases: [
        {
          id: "problemet",
          num: "Fase 0",
          title: "Problemet",
          fullTitle: "Problemidentifikation (Initierende problem)",
          type: "sequential",
          color: "#ea580c",
          bgLight: "#ffedd5",
          weightPct: 7,
          purpose: "At åbne det overordnede tema op, identificere et initierende samfundsmæssigt problem og afgrænse hvilket problemfelt gruppen vil undersøge nærmere i problemanalysen.",
          theory: `
            <p>Vi arbejder ud fra <strong>AAU-modellen</strong> (jf. vejledningens afsnit 2.2.1): I <em>Fase 0 (Problemet)</em> tager I afsæt i det udleverede tema og indkredser et <strong>initierende samfundsmæssigt problem</strong> ved hjælp af brainstorm, mindmap og begrebskort.</p>
            <p style="margin-top:0.35rem;">Selve det kildebelagte <strong>problemtræ</strong> og den endelige <strong>problemformulering</strong> opstilles først i <em>Fase 1 (Problemanalysen)</em>, når I har undersøgt kilder og statistik!</p>
          `,
          ipuDepts: {
            salg: "Fastlæggelse af problem: Hvem i samfundet/markedet oplever problemet?",
            konstruktion: "Produkttypefastlæggelse: Hvilke typer tekniske løsninger er i spil?",
            produktion: "Procestypeovervejelse: Hvilke teknologier og værksteder kan blive relevante?"
          },
          questions: [
            "Hvem rammes af det initierende problem, og hvorfor er det vigtigt for samfundet?",
            "Hvilke spørgsmål og årsager skal vi have undersøgt og dokumenteret med kilder i Problemanalysen?"
          ],
          expectedOutput: [
            "Indledning der motiverer det udleverede tema og præsenterer det initierende problem.",
            "Mindmap eller begrebskort der åbner problemfeltet op."
          ],
          methods: [
            {
              id: "prob_brainstorm",
              title: "Brainstorm, Mindmap & Initierende problem",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Kreative værktøjer til at åbne temaet op og vælge det initierende samfundsmæssige problemfelt.",
              subTheory: "I starten af projektet skal I åbne det udleverede tema bredt op. En <strong>mindmap</strong> eller et <strong>begrebskort</strong> hjælper jer med at se sammenhænge mellem samfundsgrupper, miljø, økonomi og teknologi, før I går i gang med selve problemanalysen.",
              subTemplate: "1. Skriv hovedtemaet i midten.\n2. Forgren ud i: Hvem påvirkes? Hvor sker det? Hvilke skader/udgifter giver det?\n3. Beskriv kort det initierende problem, som I nu vil undersøge i Problemanalysen."
            },
            {
              id: "prob_projektbeskrivelse",
              title: "Projektbeskrivelse (Kun afsluttende B-projekt)",
              level: "B",
              core: true,
              defaultHours: 1.5,
              desc: "Obligatorisk godkendelsesdokument ved eksamensprojektet på Teknologi B (vedlægges som bilag).",
              subTheory: "Ved det afsluttende projekt på Teknologi B skal I udarbejde en <strong>projektbeskrivelse</strong>, som læreren/skolen godkender og underskriver før start. Bemærk: Vejledningen fraråder at bruge den i almindelige undervisningsforløb, fordi den låser produktidéen for tidligt.",
              subTemplate: "Skal indeholde 3 punkter (brug generatoren med underskriftsfelter på Side 7):\n1. Beskrivelse af problemet, dets årsager og virkninger.\n2. Forslag til produkt samt valg af værksted/laboratorium.\n3. Tidsplan for projektarbejdet og fremstillingen."
            }
          ]
        },
        {
          id: "problemanalyse",
          num: "Fase 1",
          title: "Problemanalyse",
          fullTitle: "Problemanalyse (AAU-model: Kilder -> Problemtræ -> Problemformulering)",
          type: "sequential",
          color: "#d97706",
          bgLight: "#fef3c7",
          weightPct: 15,
          purpose: "At analysere og dokumentere problemets omfang, årsager og virkninger med solide kilder/empiri, samle dem i et kildebelagt problemtræ og udlede jeres problemformulering.",
          theory: `
            <p>Efter <strong>AAU-modellen</strong> bruger I problemanalysen til at undersøge problemet i dybden og opbygge jeres <strong>problemtræ</strong>:</p>
            <ol style="margin-left:1.2rem; margin-top:0.3rem;">
              <li><strong>Kilder til alle kasser i problemtræet:</strong> Hver eneste årsag (rod), kerneproblem (stamme) og virkning/konsekvens (krone) i problemtræet skal dokumenteres med konkrete kilder (statistik, artikler, rapporter eller egne undersøgelser).</li>
              <li><strong>Udvælgelse af problemstilling:</strong> Ud fra problemtræet udvælger I den specifikke årsag, jeres projekt skal angribe.</li>
              <li><strong>Problemformulering:</strong> Problemanalysen afsluttes med jeres skarpe <strong>problemformulering</strong>.</li>
            </ol>
          `,
          ipuDepts: {
            salg: "Afdækning af markedsbehov, problemets omfang og hvem der er berørt.",
            konstruktion: "Teknisk og naturvidenskabelig analyse af de fysiske/kemiske årsager til problemet.",
            produktion: "Indledende overblik over ressourcer og teknologiske rammer i problemfeltet."
          },
          questions: [
            "Har I angivet konkrete kilder (fra statistik, artikler, rapporter eller egne undersøgelser) til samtlige årsager og virkninger i jeres problemtræ?",
            "Hvilken specifik årsag (rod) i problemtræet har I valgt at afgrænse jeres problemstilling til?",
            "Hvordan lyder jeres endelige problemformulering ved afslutningen af problemanalysen?"
          ],
          expectedOutput: [
            "Kildeunderbygget analyse af problemets omfang, årsager og virkninger.",
            "Problemtræ (årsag-virkningsanalyse) hvor alle kasser har tydelige kildehenvisninger.",
            "Dokumentation af egne kvantitative/kvalitative eller naturvidenskabelige undersøgelser.",
            "Begrundet udvælgelse af problemstilling fra problemtræet efterfulgt af rapportens Problemformulering."
          ],
          methods: [
            {
              id: "ana_infosogning",
              title: "Systematisk informationssøgning & Kildekritik",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Søgning med søgeord (AND/OR) i fagdatabaser (fx Infomedia, Bibliotek.dk, styrelser) samt kildekritisk vurdering.",
              subTheory: "Gode teknologirapporter bygger på mere end tilfældige Google-søgninger. Brug <strong>systematisk søgning</strong> med nøgleord og boolske operatorer (<code>AND</code> / <code>OR</code>) i fx Bibliotek.dk, Infomedia, Danmarks Statistik, Miljøstyrelsen eller Arbejdstilsynet. Brug <strong>Side 5 (Kildeliste & Kildekritik)</strong> til at holde styr på kilderne!",
              subTemplate: "Tjekliste til kildekritik (Side 5):\n- Hvem er afsenderen, og hvilken interesse har de?\n- Hvor nye er tallene/dataene?\n- Hvilken kasse i problemtræet dokumenterer kilden?"
            },
            {
              id: "ana_kvantitativ",
              title: "Kvantitativ undersøgelse (Spørgeskema)",
              level: "AB",
              core: false,
              defaultHours: 2.5,
              desc: "Egen indsamling af tal og hyppigheder fra en relevant målgruppe til at belyse omfang og vaner.",
              subTheory: "En <strong>kvantitativ undersøgelse</strong> giver målbare data (procenter, antal, hyppighed) fra mange respondenter. Samarbejd gerne med metoderne fra Samfundsfag: Vær skarp på <em>udvælgelse af stikprøve</em> (repræsentativitet), undgå ledende spørgsmål, og diskutér altid <em>fejlkilder og svarprocent</em>.",
              subTemplate: "I rapporten beskrives:\n1. Formål: Hvad vil vi have tal på?\n2. Stikprøve: Hvem og hvor mange har svaret?\n3. Resultater (diagrammer) + fejlkilder."
            },
            {
              id: "ana_kvalitativ",
              title: "Kvalitativ undersøgelse (Interview / Observation)",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Semistruktureret interview med eksperter eller berørte brugere – eller observation i praksis.",
              subTheory: "En <strong>kvalitativ undersøgelse</strong> går i dybden med <em>hvorfor</em> og <em>hvordan</em> problemet opleves. Et ekspertinterview eller en observation af brugerne i den virkelige situation afslører ofte praktiske årsager, man ikke kan læse sig til på nettet. Lav altid en <strong>spørgeramme/interviewguide</strong> på forhånd (vedlægges som bilag).",
              subTemplate: "Opbygning i rapporten:\n1. Hvorfor er netop denne ekspert/bruger relevant?\n2. Hovedpointer fra interviewet/observationen.\n3. Hvilke årsager i problemtræet og krav i Produktprincip bidrager det med?"
            },
            {
              id: "ana_natvid",
              title: "Naturvidenskabelige undersøgelser & Forsøg",
              level: "AB",
              core: false,
              defaultHours: 3,
              desc: "Egne målinger og forsøg (hypotese, forsøgsdesign, databehandling, fejlkilder) til at belyse problemet.",
              subTheory: "Naturvidenskabelig metode bruges både til at dokumentere fysiske/kemiske/biologiske årsager i problemanalysen og senere til materialetest. Følg strukturen fra fysik/kemi/biologi: <strong>Hypotese &rarr; Teori &rarr; Forsøgsopstilling &rarr; Dataopsamling &rarr; Databehandling &rarr; Fejlkilder &rarr; Delkonklusion</strong>.",
              subTemplate: "Husk i beskrivelsen:\n- Hvilken variabel ændrer vi, og hvilke holder vi konstante?\n- Skitse/foto af forsøgsopstilling.\n- Vurdering af måleusikkerhed og fejlkilder."
            },
            {
              id: "prob_problemtrae",
              title: "Kildebelagt Problemtræ (Årsag-virkningsanalyse)",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Opstilling af problemtræ hvor alle årsager (rødder) og virkninger (krone) dokumenteres med kilder.",
              subTheory: "Efter <strong>AAU-modellen</strong> samler I hele problemanalysen i et <strong>problemtræ</strong>: <em>Stammen</em> er kerneproblemet, <em>rødderne</em> er de bagvedliggende årsager, og <em>kronen</em> er virkningerne/konsekvenserne. Husk: Der skal være konkrete kildehenvisninger til samtlige kasser i problemtræet!",
              subTemplate: "Brug det interaktive Problemtræ-værktøj på '💡 3. Problemtræ, Skydeskive & Idé-ark' i topmenuen!"
            },
            {
              id: "prob_formulering",
              title: "Afgrænsning & Problemformulering (AAU-model)",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Udvælgelse af specifik årsag i problemtræet og opstilling af den endelige problemformulering.",
              subTheory: "Når problemtræet er dokumenteret med kilder, udvælger og begrunder I, hvilken specifik årsag (rod) I vil løse, og afslutter problemanalysen med jeres <strong>problemformulering</strong>. Den bør rumme: <strong>1) Målgruppen/problemet</strong>, <strong>2) Den udvalgte årsag fra problemtræet</strong> og <strong>3) Ambitionen om en teknisk løsning</strong>.",
              subTemplate: "Skabelon-eksempel:\n'Hvordan kan man udvikle en teknologisk løsning til [målgruppe], der angriber årsagen [udvalgt årsag fra problemtræet], så virkningen [konsekvens fra problemtræet] reduceres?'"
            }
          ]
        },
        {
          id: "produktprincip",
          num: "Fase 2",
          title: "Produktprincip",
          fullTitle: "Produktprincip",
          type: "sequential",
          color: "#2563eb",
          bgLight: "#dbeafe",
          weightPct: 16,
          purpose: "At undersøge eksisterende produkter (skydeskivemodel), brugerbehov og lovkrav, opstille en målbar SMART-kravspecifikation, idégenerere systematisk og vælge løsningsprincip.",
          theory: `
            <p>I Produktprincip bevæger I jer fra problemformuleringen til valg af løsningskoncept. Kravene til produktet skal udledes direkte af <strong>problemanalysen, konkurrentanalysen, brugsundersøgelsen og myndighedskravene</strong>.</p>
            <p style="margin-top:0.35rem;">Brug <strong>Side 3 (Skydeskivemodel & Idé-arbejdsark)</strong> og <strong>Side 4 (SMART-krav & PV-skema)</strong> i topmenuen til arbejdet i denne fase!</p>
          `,
          ipuDepts: {
            salg: "Brugsundersøgelse: Analyse af konkurrenter på markedet og inddragelse af brugernes behov.",
            konstruktion: "Principkonstruktion: Opstilling af målbare SMART-krav, idégenerering, modelbygning og konceptvalg.",
            produktion: "Produktionstypeovervejelse: Vurdering af om idéerne teknisk og praktisk kan fremstilles."
          },
          questions: [
            "Hvilke fordele og ulemper har de vigtigste konkurrerende produkter på jeres skydeskivemodel?",
            "Hvilke interessenter stiller krav til løsningen, og er alle krav formuleret målbart (SMART) med en plan for test?",
            "Har I begrundet både vægtningen af de bløde krav og pointtildelingen i jeres PV-skema/kravmatrix med faglige argumenter?"
          ],
          expectedOutput: [
            "Konkurrentanalyse med Skydeskivemodel (pris, materialer, funktion, fordele/ulemper).",
            "Brugsundersøgelse (brugssituation, interessenter, ergonomi) samt myndighedskrav/standarder.",
            "Kravspecifikation opdelt i hårde skal-krav og vægtede bløde kan-krav inkl. testmetode.",
            "Systematisk idégenerering, evt. modelbygning (krav på A) og begrundet valg af løsning via PV-skema."
          ],
          methods: [
            {
              id: "prin_konkurrent",
              title: "Konkurrentanalyse & Skydeskivemodel",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Kortlægning af direkte og indirekte konkurrenter på skydeskivemodellen samt analyse af fordele/ulemper.",
              subTheory: "En <strong>konkurrentanalyse</strong> undersøger eksisterende løsninger på markedet. Med <strong>Skydeskivemodellen</strong> (på Side 3) indplacerer I produkterne i <em>inderste ring (direkte konkurrenter)</em>, <em>mellemste ring (substitutionsprodukter)</em> og <em>yderste ring (alternative løsninger)</em> og sammenligner pris, materialer, funktion, fordele og ulemper.",
              subTemplate: "Åbn '💡 3. Problemtræ, Skydeskive & Idé-ark' i topmenuen for at plotte jeres konkurrenter direkte ind på skydeskiven!"
            },
            {
              id: "prin_brugs",
              title: "Brugsundersøgelse & Interessentanalyse",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Redegørelse for hvem der bruger/berøres af produktet, samt i hvilket miljø og hvordan det bruges.",
              subTheory: "I <strong>brugsundersøgelsen</strong> kortlægger I alle relevante interessenter (primære brugere, sekundære brugere som fx montører/rengøring, købere osv.) samt selve brugssituationen: Foregår det udendørs i frost og regn? Skal det betjenes i mørke? Hvilke ergonomiske mål (antropometri) gælder?",
              subTemplate: "Beskriv konkret:\n1. Hvem er brugeren og øvrige interessenter (brug Side 4)?\n2. Hvor og hvornår bruges produktet (miljø, fugt, temperatur, plads)?\n3. Hvordan interagerer brugeren med produktet før, under og efter brug?"
            },
            {
              id: "prin_myndighed",
              title: "Myndighedskrav, Lovgivning & Standarder",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Undersøgelse af lovkrav (fx CE-mærkning, færdselslov, fødevarekontakt, maskindirektiv, IP-tæthed).",
              subTheory: "Tekniske produkter skal overholde gældende lovgivning og standarder. Undersøg fx <strong>CE-mærkning</strong>, lavspændingsdirektivet, maskindirektivet, Fødevarestyrelsens krav til fødevarekontaktmaterialer, Færdselsloven eller DS/ISO-standarder. Myndighedskrav bliver altid til <strong>hårde krav (skal-krav)</strong> i kravspecifikationen.",
              subTemplate: "Tjekliste:\n- Hvilken lovgivning eller DS/EN/ISO-standard gælder for produkttypen?\n- Hvilke grænseværdier (fx max spænding, støj, mål eller sikkerhedsafstand) giver det?"
            },
            {
              id: "prin_kravspec",
              title: "Kravspecifikation efter SMART-modellen (Hårde/bløde krav)",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Opstilling af målbare skal-krav og vægtede kan-krav med kilde/begrundelse og plan for test.",
              subTheory: "Kravspecifikationen samler trådene fra problemanalyse, konkurrentanalyse, brugsundersøgelse og myndighedskrav. Opdel i <strong>hårde krav (skal-krav)</strong>, som er ufravigelige, og <strong>bløde krav (kan-krav)</strong>, som kan opfyldes i større eller mindre grad og derfor gives en vægt (fx 1-5). Brug <strong>SMART-modellen</strong> så hvert krav er <em>Specifikt, Målbart, Attraktivt (begrundet), Realistisk og Testbart</em>.",
              subTemplate: "Brug det interaktive SMART-kravværktøj på Side 4 i topmenuen!\nHusk for hvert krav:\n- Kilde/Interessent\n- Præcist mål med enhed\n- Begrundelse for krav og vægt\n- Hvordan kravet skal testes i Evaluering."
            },
            {
              id: "prin_idegen",
              title: "Systematisk idégenerering (Morfologisk skema, De Bono, Omvendt brainstorm, CIS)",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Udvikling af forskellige løsningsidéer ved hjælp af de interaktive arbejdsark og skitser.",
              subTheory: "I stedet for at tage den første idé, skal I bruge systematiske metoder til at tænke bredt (divergent) og derefter kombinere løsninger (konvergent). Brug de 4 digitale arbejdsark på <strong>Side 3</strong>: <strong>Morfologisk skema</strong>, <strong>De Bonos 6 tænkehatte</strong>, <strong>Omvendt brainstorm</strong> og <strong>Cirkelmetode/CIS</strong>. Husk at visualisere idéerne med håndskitser!",
              subTemplate: "Åbn '💡 3. Problemtræ, Skydeskive & Idé-ark' i topmenuen for at udfylde arbejdsarkene!"
            },
            {
              id: "prin_modelbygning",
              title: "Modelbygning (Funktions- og visualiseringsmodeller)",
              level: "A",
              core: true,
              defaultHours: 3,
              desc: "Bygning af hurtige mock-ups eller funktionsmodeller til at afprøve principper før endeligt valg.",
              subTheory: "På <strong>Teknologi A</strong> er modelbygning i Produktprincip en del af kernestoffet. Formålet er <em>ikke</em> at bygge den færdige prototype endnu, men at lave hurtige, simple modeller (i pap, skum, LEGO, hurtigt 3D-print eller forsøgsopstilling på breadboard) for at teste, om et mekanisk eller teknisk princip overhovedet fungerer, før man vælger løsning.",
              subTemplate: "Dokumentér i rapporten:\n- Hvad ville vi undersøge med modellen?\n- Foto af modellen i brug.\n- Hvilken erfaring gav modellen til valget af løsningsprincip?"
            },
            {
              id: "prin_pvskema",
              title: "Kravmatrix / PV-skema & Begrundet valg af løsning",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Vurdering af idéer op mod hårde og vægtede bløde krav efterfulgt af skriftlig argumentation.",
              subTheory: "I en <strong>kravmatrix / et PV-skema</strong> sorteres idéerne først mod de <em>hårde skal-krav</em> (opfyldt / ikke opfyldt). De idéer, der overlever, vurderes på de <em>bløde krav</em> med point (fx 1-5), som ganges med kravets vægt. <strong>Meget vigtigt fra vejledningen:</strong> Skemaet i sig selv er aldrig nok! I skal skrive en grundig faglig begrundelse for vægtninger, pointtildelinger og det endelige valg.",
              subTemplate: "Brug PV-skema-beregneren på Side 4!\nSørg for at teksten under skemaet forklarer:\n1. Hvorfor blev evt. idéer frasorteret på hårde krav?\n2. Hvorfor fik vinder-idéen højere point på de tungtvejende krav?"
            }
          ]
        },
        {
          id: "produktudformning",
          num: "Fase 3",
          title: "Produktudformning",
          fullTitle: "Produktudformning",
          type: "sequential",
          color: "#0d9488",
          bgLight: "#ccfbf1",
          weightPct: 22,
          purpose: "At konstruere og dimensionere produktet i detaljer med viden fra andre fag, vælge materialer/komponenter, vurdere miljø og sikkerhed og udarbejde komplet teknisk dokumentation.",
          theory: `
            <p>I Produktudformning fastlægger I produktets præcise geometri, materialer, elektronik/software og fremstillingsmetoder, så det opfylder kravspecifikationen.</p>
            <p style="margin-top:0.35rem;">På <strong>Teknologi A</strong> indgår desuden <em>fremstilling af prototype</em>, <em>produktions-, montage- og distributionsrigtig konstruktion</em> samt <em>markeds- og prisovervejelser</em> i denne fase.</p>
          `,
          ipuDepts: {
            salg: "Markedsfastlæggelse: Markeds- og prisovervejelser i forhold til målgruppe og konkurrenter.",
            konstruktion: "Produktudformning: CAD-tegninger, el-/kodedokumentation, beregninger, materialevalg, miljø og prototype (A).",
            produktion: "Produktionsprincip-fastlæggelse: Produktions-, montage- og distributionsrigtig konstruktion."
          },
          questions: [
            "Hvilke beregninger eller forsøg fra fysik, matematik eller kemi har I brugt til at dimensionere produktet?",
            "Hvordan har I begrundet jeres valg af materialer og komponenter ud fra både funktionelle egenskaber og miljøvurdering (fx MEKA)?",
            "Overholder jeres arbejdstegninger, samlingstegning, stykliste, el-diagrammer og programkode de tekniske standarder?"
          ],
          expectedOutput: [
            "Målsatte arbejdstegninger, samlingstegning med positionsnumre og komplet stykliste.",
            "Ved el/software: Blokdiagram, kredsløbsdiagram, evt. PCB-layout, flowdiagram/pseudokode og kommenteret kode.",
            "Begrundet valg af materialer, komponenter og bearbejdnings-/sammenføjningsmetoder.",
            "Miljøvurdering (MEKA, LCA, Carbon Footprint eller C2C) samt arbejdsmiljø og sikkerhed.",
            "Kun A: Produktions-, montage- og distributionsrigtig konstruktion, markeds-/prisovervejelser samt fremstilling af prototype."
          ],
          methods: [
            {
              id: "udf_cad",
              title: "Tekniske tegninger (CAD: Arbejds-, samlingstegning & stykliste)",
              level: "AB",
              core: true,
              defaultHours: 4,
              desc: "Retvinklet projektion med ramme/tegningshoved (Inventor/FreeCAD), samlingstegning og stykliste.",
              subTheory: "Tekniske tegninger er jeres entydige kommunikation til værkstedet. De udføres efter gældende standarder i CAD (fx Autodesk Inventor eller FreeCAD):<br>1) <strong>Arbejdstegning:</strong> Tegning af én enkelt selvfremstillet del i retvinklet projektion med alle nødvendige mål, tolerancer, ramme og tegningshoved.<br>2) <strong>Samlingstegning:</strong> Viser hvordan alle enkeltdele samles, forsynet med positionsnumre.<br>3) <strong>Stykliste:</strong> Oversigt over samtlige dele (både indkøbte og selvfremstillede) med pos.nr., antal, materiale og tegningsnummer.",
              subTemplate: "Tjekliste før I går i værkstedet:\n- Har hver enkelt selvfremstillet del sin egen målsatte arbejdstegning?\n- Matcher positionsnumrene på samlingstegningen 100 % med styklisten?\n- Er der tegningshoved med målestoksforhold, dato og tegningsnummer?"
            },
            {
              id: "udf_el_kode",
              title: "El-diagrammer, PCB & Software-dokumentation (Arduino/Python)",
              level: "AB",
              core: false,
              defaultHours: 4,
              desc: "Blokdiagram, kredsløbsdiagram, evt. PCB-udlægning samt flowdiagram/pseudokode og kommenteret kode.",
              subTheory: "Indgår der elektronik eller programmering (fx Arduino, Raspberry Pi eller Python), kræver vejledningen specifik teknisk dokumentation:<br>- <strong>Elektronik:</strong> Overordnet blokdiagram + præcist <em>kredsløbsdiagram</em> med standardsymboler, komponentværdier og stykliste (samt printlayout ved PCB).<br>- <strong>Software:</strong> Blokdiagram, <em>flowdiagram (flowsheet)</em>, use-case eller pseudokode i selve rapporten til at forklare programmets logik, mens den fulde, <em>kommenterede programkode</em> lægges i bilag.",
              subTemplate: "I rapportens hovedtekst:\n1. Blokdiagram over systemets input -> controller -> output.\n2. Kredsløbsdiagram + beregning af fx formodstande/strømforbrug.\n3. Flowdiagram over kodelogikken + gennemgang af centrale kodestumper."
            },
            {
              id: "udf_materialer",
              title: "Materiale- & Komponentvalg + Naturvidenskabelige beregninger",
              level: "AB",
              core: true,
              defaultHours: 3,
              desc: "Begrundet valg af materialer/processer samt tværfaglige beregninger (fysik, kemi, matematik).",
              subTheory: "Her viser I <strong>samspillet med andre fag</strong>! Brug fysik, matematik og kemi til at beregne fx kraft, moment, styrke, varmeoverførsel, elektrisk effekt eller kemiske blandingsforhold. Opstil forskellige materialealternativer (træ, metaller, polymerer som PLA/ABS/PETG, kompositter) og sammenlign deres <em>fysiske, kemiske, funktionelle og subjektive egenskaber</em> samt bearbejdnings- og sammenføjningsmetoder.",
              subTemplate: "For hver hoveddel i produktet:\n1. Hvilke belastninger/krav udsættes delen for?\n2. Sammenligning af 2-3 mulige materialer (densitet, styrke, pris, bearbejdning).\n3. Konkret beregning eller materialetest som belæg for valget."
            },
            {
              id: "udf_miljo",
              title: "Miljøvurdering (MEKA, LCA, Carbon Footprint, Cradle-to-Cradle)",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Vurdering af materialers og produktets miljøpåvirkning gennem hele livscyklussen.",
              subTheory: "Miljømæssige overvejelser er et fast bedømmelseskriterium på både A og B. Vurdér produktet gennem hele dets <strong>livscyklus</strong>: <em>Råvareudvinding &rarr; Produktion &rarr; Transport &rarr; Brugsfase &rarr; Bortskaffelse/Genanvendelse</em>. Brug anerkendte værktøjer som <strong>MEKA-skema</strong> (Materialer, Energi, Kemikalier, Andet), <strong>Carbon Footprint ($\text{CO}_2$-ækvivalenter)</strong> eller <strong>Cradle-to-Cradle</strong>, og kobl til konkrete miljøeffekter (fx drivhuseffekt, toksicitet, affaldsophobning).",
              subTemplate: "Gennemgå i rapporten:\n1. Sammenligning af miljøbelastning ved jeres materialevalg (fx via MEKA eller CO2-aftryk).\n2. Energiforbrug i brugsfasen.\n3. Hvordan kan produktet skilles ad i rene fraktioner ved bortskaffelse?"
            },
            {
              id: "udf_sikkerhed",
              title: "Sikkerhed, Sundhed & Arbejdsmiljø",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Sikkerhed ved fremstilling i værksted/laboratorium (Arbejdstilsynet) samt sikkerhed for slutbrugeren.",
              subTheory: "Arbejdsmiljø og sikkerhed har to sider i rapporten:<br>1) <strong>Sikkerhed i værkstedet/laboratoriet:</strong> Hvilke værnemidler, udsugning og maskinsikkerhedsregler (jf. Arbejdstilsynets regler for gymnasieelever) skal følges under fremstillingen?<br>2) <strong>Produktsikkerhed for brugeren:</strong> Hvordan undgås klemningsfare, skarpe kanter, elektrisk stød eller kemisk eksponering under brug?",
              subTemplate: "Lav en kort risikovurdering:\n- Risiko ved fremstilling -> Forebyggelse/værnemiddel.\n- Risiko ved brug af produktet -> Konstruktionsmæssig sikring."
            },
            {
              id: "udf_dfma",
              title: "Produktions-, montage- og distributionsrigtig konstruktion",
              level: "A",
              core: true,
              defaultHours: 2.5,
              desc: "Optimering af konstruktionen til industriel fremstilling, nem montering og standardtransport (EUR-palle).",
              subTheory: "På <strong>Teknologi A</strong> skal produktionsafdelingens perspektiv tænkes ind i selve konstruktionen:<br>- <strong>Produktionsrigtigt:</strong> Færrest mulige emner, brug af standardkomponenter, kort gennemløbstid og lav kostpris.<br>- <strong>Montagerigtigt:</strong> Nem og fejlfri samling (og adskillelse ved reparation).<br>- <strong>Distributionsrigtigt:</strong> Dimensioner og emballage tilpasset modulmål på fx <strong>EUR-paller ($1200 \\times 800\\text{ mm}$)</strong> og containere, evt. flat-pack.",
              subTemplate: "Redegør konkret for:\n1. Hvilke ændringer i designet gør delene hurtigere/billigere at fremstille?\n2. Hvordan minimeres antallet af skruer/samlinger ved montage?\n3. Mål på emballage og hvor mange enheder der kan være på en EUR-palle."
            },
            {
              id: "udf_marked_pris",
              title: "Markeds- og prisovervejelser i konstruktionsfasen",
              level: "A",
              core: true,
              defaultHours: 2,
              desc: "Integration af salgsafdelingen: Sammenhæng mellem design, kvalitetsniveau, målgruppe og pris.",
              subTheory: "På <strong>Teknologi A</strong> inddrages salgsafdelingen i Produktudformning: Ud fra konkurrentanalysen vurderer I, hvilket prisleje og kvalitetsniveau målgruppen efterspørger, så I ikke vælger materialer eller komponenter, der gør produktet usælgeligt dyrt.",
              subTemplate: "- Hvad koster konkurrenterne, og hvor placerer vores produkt sig?\n- Hvordan afspejler materialevalg og design målgruppens betalingsvilje?"
            },
            {
              id: "udf_prototype_a",
              title: "Fremstilling af Prototype (Teknologi A)",
              level: "A",
              core: true,
              defaultHours: 10,
              desc: "På Teknologi A fremstilles og testes prototypen under Produktudformning (mens Realisering er produktion).",
              subTheory: "Bemærk den vigtige forskel mellem A og B i vejledningen: På <strong>Teknologi A</strong> ligger fremstillingen af selve <em>prototypen</em> i fasen <strong>Produktudformning</strong> (ligesom i en rigtig virksomhed, hvor konstruktionsafdelingen bygger og tester prototyper, før produktionsafdelingen sætter en serieproduktion op). Husk at afsætte en væsentlig del af tiden til at bygge prototypen med omhu!",
              subTemplate: "Dokumentér fremstillingen af prototypen med:\n- Fotos af de centrale bearbejdnings- og samleprocesser.\n- Præcise procesparametre (fx skærehastighed, 3D-print indstillinger, lodning).\n- Hvilke erfaringer og korrektioner gav prototypen anledning til?"
            }
          ]
        },
        {
          id: "produktionsforberedelse",
          num: "Fase 4",
          title: "Produktionsforberedelse",
          fullTitle: "Produktionsforberedelse",
          type: "sequential",
          color: "#7c3aed",
          bgLight: "#ede9fe",
          weightPct: 12,
          purpose: "At planlægge fremstillingsprocessen struktureret efter Teknologibegrebet (Teknik, Viden, Organisation, Produkt) – og på A-niveau planlægge produktionsform, layout, ISO-styring, økonomi og markedsføring.",
          theory: `
            <p>Inden fremstillingen sættes i gang, skal processen planlægges. Her anvendes Jens Müllers <strong>teknologibegreb</strong> (se puslespillet på Side 1): <em>Teknik, Viden, Organisation og Produkt</em>.</p>
            <p style="margin-top:0.35rem;">For <strong>Teknologi B</strong> er teknologianalysen af jeres værkstedsfremstilling + flowdiagram tilstrækkeligt. På <strong>Teknologi A</strong> planlægges desuden en virksomhedsproduktion med produktionsform, layout, kvalitets-/miljøledelse, omkostningsberegning og markedsføring.</p>
          `,
          ipuDepts: {
            salg: "Salgsforberedelse: Markedsføringsplan, målgruppe, distributionskanaler, salgsmateriale og prisstrategi.",
            konstruktion: "Produktmodning: Klargøring af endelige tegninger, styklister og specifikationer til produktion.",
            produktion: "Produktionsforberedelse: Valg af produktionsform, planlægning, fabrikslayout samt kvalitets- og miljøledelse."
          },
          questions: [
            "Hvordan beskrives jeres fremstillingsproces konkret gennem de fire brikker: Teknik, Viden, Organisation og Produkt?",
            "Kun A: Hvilken produktionsform (enkeltstyk, serie, masse) og hvilket produktionslayout (positions-, funktions-, gruppe- eller linjelayout) passer til jeres produkt?",
            "Kun A: Hvad er produktets foreløbige fremstillingspris, og hvordan ser jeres markedsføringsplan og kvalitets-/miljøstyring ud?"
          ],
          expectedOutput: [
            "Planlægning af fremstillingsprocessen struktureret efter Teknik, Viden, Organisation og Produkt.",
            "Proces-flowdiagram / rutekort over alle delprocesser og tilførte materialer.",
            "Kun A: Valg af produktionsform, produktionsplanlægning (Gantt/MRP/JIT) og tegning af produktionslayout.",
            "Kun A: Kvalitets- og miljøledelse (ISO 9001/14001), omkostningsberegning samt markedsføringsplan."
          ],
          methods: [
            {
              id: "forb_tvo",
              title: "Teknologianalyse af fremstillingen (Teknik, Viden, Organisation, Produkt)",
              level: "AB",
              core: true,
              defaultHours: 2.5,
              desc: "Strukturering af fremstillingsprocessen efter Jens Müllers 4 puslespilsbrikker.",
              subTheory: "I <strong>Produktionsforberedelse</strong> bruges de 4 teknologibrikker helt konkret på jeres egen fremstillingsproces:<br>- <strong>Teknik:</strong> Maskiner, værktøjer, råvarer/materialer, energi og fysisk arbejdskraft.<br>- <strong>Viden:</strong> Den faglige kunnen, maskinkørekort, beregninger og erfaring, der kræves for at betjene udstyret.<br>- <strong>Organisation:</strong> Arbejdsdelingen, rækkefølgen af arbejdsoperationer (vis gerne med et flowdiagram) og tidsstyring.<br>- <strong>Produkt:</strong> Det færdige produkts specifikke funktionelle og kvalitetsmæssige egenskaber.",
              subTemplate: "Lav 4 tydelige underoverskrifter (eller en 4-feltstabel) i rapporten:\n1. Teknik i vores fremstilling\n2. Viden i vores fremstilling\n3. Organisation (inkl. proces-flowdiagram)\n4. Produktet"
            },
            {
              id: "forb_flow",
              title: "Proces-flowdiagram / Rutekort for fremstillingen",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Grafisk procesoversigt over delprocesser i kronologisk rækkefølge med materialetilførsel og kontrol.",
              subTheory: "Et <strong>proces-flowdiagram</strong> (sommetider kaldet et rutekort) viser trin for trin, hvordan råmaterialer og indkøbte komponenter bearbejdes, kontrolleres og samles til det færdige produkt. Angiv gerne estimerede operationstider og kvalitetskontrolpunkter ved de kritiske trin.",
              subTemplate: "Råvare/Emne -> [Bearbejdning 1 + Maskine + Tid] -> [Kvalitetskontrol af mål] -> [Sammenføjning/Montage] -> Færdigt produkt."
            },
            {
              id: "forb_prodform",
              title: "Produktionsformer, Planlægning (MRP/JIT/Gantt) & Produktionslayout",
              level: "A",
              core: true,
              defaultHours: 3.5,
              desc: "Valg af enkeltstyks-, serie- eller masseproduktion, lager-/ordrestyring samt indretning af fabrikslayout.",
              subTheory: "På <strong>Teknologi A</strong> planlægger I, hvordan produktet skal produceres i en virksomhed:<br>1) <strong>Produktionsform:</strong> Enkeltstyks-, serie- (batch) eller masseproduktion (kontinuert).<br>2) <strong>Produktionsplanlægning:</strong> Ordrestyret vs. lagerstyret (prognose) produktion samt værktøjer som <em>MRP (Material Resource Planning), JIT (Just In Time), netværksplan eller Gantt-kort</em> ud fra styklister og operationstider.<br>3) <strong>Produktionslayout:</strong> Tegn en hal-plan med <em>positions-, funktions-, gruppe- eller linjelayout</em>, der matcher produktionsformen.",
              subTemplate: "Husk i rapporten:\n- Begrund valget af produktionsform ud fra styktal og variation.\n- Vis en konkret skitse/plantegning af virksomhedens produktionslayout med vareflow fra råvarelager til færdigvarelager."
            },
            {
              id: "forb_iso",
              title: "Kvalitets- og Miljøledelse (ISO 9001 & ISO 14001)",
              level: "A",
              core: true,
              defaultHours: 2,
              desc: "Systematisk sikring af ensartet produktkvalitet samt styring af virksomhedens ressourceforbrug og miljø.",
              subTheory: "Hvordan sikrer virksomheden, at produkt nr. 1.000 er lige så godt som produkt nr. 1? Redegør for <strong>kvalitetsledelse (ISO 9001)</strong> – fx modtagekontrol af råvarer, proceskontrol af kritiske tolerancer og slutkontrol. Redegør desuden for <strong>miljøledelse (ISO 14001)</strong> – hvordan virksomheden løbende kortlægger og reducerer sit spild, energiforbrug og miljøaftryk i produktionen.",
              subTemplate: "- Hvilke 2-3 konkrete kontrolmålinger indfører vi på produktionslinjen (ISO 9001)?\n- Hvordan håndteres spildmateriale, kemikalier og energiforbrug på fabrikken (ISO 14001)?"
            },
            {
              id: "forb_omkostning",
              title: "Omkostningsberegning & Markedsføringsplan",
              level: "A",
              core: true,
              defaultHours: 3,
              desc: "Foreløbig kalkulation af kost- og salgspris samt plan for målgruppe, distribution og promotion.",
              subTheory: "1) <strong>Omkostningsberegning:</strong> Opstil et realistisk regnestykke for produktets foreløbige fremstillingspris baseret på <em>råvareomkostninger (fra styklisten), arbejdsløn (ud fra operationstider), maskinafskrivninger, husleje/lokaler, emballage, fragt og avance</em>.<br>2) <strong>Markedsføring:</strong> Fastlæg B2B (producentmarked) eller B2C (konsumentmarked), målgruppe og købsadfærd, distributionsform, prisstrategi samt konkret markedsføringsmateriale (fx emballage, brochure, hjemmeside eller brugsanvisning).",
              subTemplate: "Opstil en kalkulationstabel pr. enhed (eller pr. serie på fx 1.000 stk.):\n+ Materialer og komponenter\n+ Arbejdsløn (operationstid × timeløn)\n+ Faste kapacitetsomkostninger pr. stk.\n= Kostpris + Avance = Salgspris ekskl./inkl. moms."
            },
            {
              id: "forb_udvidet_muller",
              title: "Virksomhedens samspil med samfundet (Udvidet puslespilsmodel)",
              level: "A",
              core: false,
              defaultHours: 2,
              desc: "Analyse af konkurrencestrategi og eksterne vilkår regionalt, nationalt og internationalt (Figur 5).",
              subTheory: "Med Jens Müllers <strong>udvidede puslespilsmodel</strong> (Figur 5 på Side 1) analyserer I, hvordan virksomhedens teknologivalg hænger sammen med de 12 omgivende samfundsbrikker (fx <em>arbejdsmarkedsforhold, økologiske betingelser, statslig regulering, økonomisk/fysisk infrastruktur og internationale relationer som EU/WTO</em>) samt om innovationen er <strong>inkrementel</strong> (skridtvis) eller <strong>radikal</strong>.",
              subTemplate: "Vælg de 3-4 vigtigste ydre brikker fra Figur 5 for jeres virksomhed og forklar, hvordan de påvirker jeres valg af produktionssted og teknologi."
            }
          ]
        },
        {
          id: "realisering",
          num: "Fase 5",
          title: "Realisering",
          fullTitle: "Realisering",
          type: "sequential",
          color: "#16a34a",
          bgLight: "#dcfce7",
          weightPct: 20,
          purpose: "At fremstille produktet i værkstedet med omhu og faglig professionalisme (B) – eller gennemføre/dokumentere selve produktionen samt inddrage valgtemaet (A).",
          theory: `
            <p>En væsentlig del af projektperioden skal bruges på det praktiske arbejde i skolens værksteder og laboratorier, og produktet skal udføres med <strong>omhu og professionalisme</strong>.</p>
            <p style="margin-top:0.35rem;">På <strong>Teknologi B</strong> fremstilles selve jeres produkt (prototype/procesforløb) her. På <strong>Teknologi A</strong> skal I under Realisering enten <em>1) gennemføre en produktion</em> (fx en mindre serie i værkstedet) eller <em>2) dokumentere en mulig produktion</em>.</p>
          `,
          ipuDepts: {
            salg: "Salg: Færdiggørelse af salgsmateriale, emballage, brugsanvisning og lancering.",
            konstruktion: "Produkttilpasning: Løbende opdatering af tegninger og specifikationer ved afvigelser.",
            produktion: "Produktion: Gennemførelse af serieproduktion i værkstedet ELLER fuld dokumentation af produktionsapparat."
          },
          questions: [
            "Hvordan dokumenterer I, at fremstillingen i værkstedet/laboratoriet er udført efter professionelle faglige metoder og med omhu?",
            "Hvilke afvigelser eller udfordringer opstod undervejs i fremstillingen, og hvordan løste I dem?",
            "Kun A: Gennemfører I en mindre serieproduktion i værkstedet, eller udarbejder I en samlet dokumentation for produktionsopstart?"
          ],
          expectedOutput: [
            "Et fysisk fremstillet produkt eller procesforløb udført med omhu.",
            "Procesdokumentation fra værkstedet/laboratoriet med fotos og faglige beskrivelser.",
            "Dokumentation af eventuelle ændringer/iterationer i forhold til arbejdstegningerne.",
            "Kun A: Gennemført mindre serieproduktion ELLER fuld dokumentation af mulig produktion (lokaler, maskinindkøb, leverandører, medarbejdere, finansiering)."
          ],
          methods: [
            {
              id: "real_vaerksted_b",
              title: "Praktisk fremstilling i værksted / laboratorium med omhu",
              level: "AB",
              core: true,
              defaultHours: 10,
              desc: "Fremstilling af produktet/procesforløbet under brug af relevante maskiner, værktøjer og sikkerhedsregler.",
              subTheory: "I eksamensbedømmelsen vægtes <strong>omhu og professionalisme ved fremstilling</strong> samt <strong>produktets idé og kvalitet i forhold til de opstillede krav</strong>. Sørg for at bruge maskiner, værktøj og måleudstyr korrekt i samarbejde med værkstedslæreren, så finish, tolerancer og samlinger bliver så præcise som muligt.",
              subTemplate: "Husk mens I er i værkstedet:\n- Tag skarpe billeder af hver vigtig delproces (med figurtekst i rapporten).\n- Notér konkrete maskinindstillinger og målte tolerancer undervejs."
            },
            {
              id: "real_procesdok",
              title: "Procesdokumentation & Håndtering af afvigelser (Iteration)",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Beskrivelse af fremstillingsforløbet og faglig begrundelse for eventuelle ændringer undervejs.",
              subTheory: "Det sker næsten altid i praksis, at et mål driller, et materiale opfører sig uventet, eller en samling må ændres i værkstedet. Skjul det ikke! Dokumentér afvigelsen sagligt: Hvad viste arbejdstegningen oprindeligt, hvorfor måtte vi ændre det i værkstedet, og hvordan påvirker det produktets funktion?",
              subTemplate: "Skabelon ved ændringer i værkstedet:\n1. Oprindelig plan (henvis til tegningsnr.).\n2. Praktisk udfordring i værkstedet.\n3. Gennemført tilpasning og opdateret tegning."
            },
            {
              id: "real_produktion_a",
              title: "Gennemførelse ELLER dokumentation af produktion (Teknologi A)",
              level: "A",
              core: true,
              defaultHours: 5,
              desc: "Enten fremstilling af en mindre serie i værkstedet eller samlet dokumentation af en industriel produktion.",
              subTheory: "På <strong>Teknologi A</strong> giver læreplanen (afsnit 2.2.6) to muligheder under Realisering:<br><strong>Mulighed 1 (Gennemføre produktion):</strong> I opstiller og gennemfører en mindre serieproduktion i skolens værksted/laboratorium (fx med jigs/skabeloner, arbejdsdeling og tidtagning).<br><strong>Mulighed 2 (Dokumentere mulig produktion):</strong> I samler op på alt vedrørende opstart af industriel produktion: konkrete lokaler, maskinindkøb (med priser/kapacitet), produktionslayout, underleverandører, medarbejderbehov, finansiering og globale relationer.",
              subTemplate: "Vælg tydeligt spor 1 eller 2:\n- Ved spor 1: Vis serie-emnerne, målte operationstider og kvalitetsafvigelser mellem emnerne.\n- Ved spor 2: Lav et samlet investerings-, maskin-, leverandør- og bemandingsoverblik."
            },
            {
              id: "real_valgtema_a",
              title: "Fordybelse i Valgtema (Innovation / Naturvidenskab / International)",
              level: "A",
              core: true,
              defaultHours: 3,
              desc: "Inddragelse af skolens valgtema i udvikling, produktion og markedsføring.",
              subTheory: "På <strong>Teknologi A</strong> skal skolens valgte valgtema (afsnit 2.2.11) tydeligt fremgå i rapporten:<br>- <strong>Teknologi og innovation:</strong> Entreprenørskab, forretningsmodel (fx Business Model Canvas) og udarbejdelse af forretningsplan.<br>- <strong>Teknologi og naturvidenskab:</strong> Matematiske modeller og dybdegående naturvidenskabelig teori anvendt på produkt og proces.<br>- <strong>International teknologi:</strong> Globalisering, outsourcing, løn-/arbejdsforhold i andre lande, international markedsføring samt samarbejde som EU/WTO.",
              subTemplate: "Tjek at valgtemaet ikke blot er et løst bilag, men bruges aktivt til at begrunde valg omkring jeres produkt og produktion!"
            }
          ]
        },
        {
          id: "evaluering",
          num: "Fase 6",
          title: "Evaluering",
          fullTitle: "Evaluering",
          type: "sequential",
          color: "#be123c",
          bgLight: "#ffe4e6",
          weightPct: 10,
          purpose: "At teste produktet systematisk op mod samtlige opstillede SMART-krav, beregne produktets endelige pris (A) og vurdere produktets samspil med brugeren og samfundet.",
          theory: `
            <p>Evalueringen binder sløjfen tilbage til både <em>Produktprincip</em> og <em>Problemanalysen</em>. Den består af:</p>
            <ol style="margin-left:1.2rem; margin-top:0.3rem;">
              <li><strong>Snæver teknisk evaluering:</strong> Test af produktet op mod hvert eneste krav i kravspecifikationen.</li>
              <li><strong>Endelig prisberegning (Kun A):</strong> Efterkalkulation af prisen ud fra den gennemførte/dokumenterede produktion.</li>
              <li><strong>Bred samfundsmæssig vurdering:</strong> Hvordan indgår produktet i brugerens teknologi, og løser det problemet fra fase 1, hvis det udbredes i stor skala?</li>
            </ol>
          `,
          ipuDepts: {
            salg: "Vurdering af om produktet opfylder brugerens behov og kan sælges til den beregnede pris.",
            konstruktion: "Verifikation og test af prototypen op mod alle tekniske krav samt forslag til re-design.",
            produktion: "Endelig efterkalkulation af produktets pris baseret på produktionen."
          },
          questions: [
            "Har I gennemført og dokumenteret konkrete tests for hvert enkelt krav i kravspecifikationen?",
            "Hvilke konkrete konstruktionsmæssige ændringer vil I foreslå til næste iteration på de punkter, hvor kravene kun blev delvist opfyldt?",
            "Hvordan påvirker produktet brugerens viden og organisation – og hvilke samfundsmæssige effekter (også uforudsete) får det ved opskalering?"
          ],
          expectedOutput: [
            "Systematisk testdokumentation sammenholdt med kravspecifikationen (inkl. forsøgsbeskrivelse, måledata og fejlkilder).",
            "Konkrete forslag til tekniske forbedringer (næste iteration).",
            "Kun A: Endelig beregning af produktets pris.",
            "Vurdering af produktets samspil med samfundet og brugerens teknologi samt samlet konklusion."
          ],
          methods: [
            {
              id: "eval_kravtest",
              title: "Systematisk test af produkt mod opstillede SMART-krav",
              level: "AB",
              core: true,
              defaultHours: 3,
              desc: "Praktiske forsøg og målinger der verificerer hvert enkelt krav fra kravspecifikationen.",
              subTheory: "I må aldrig nøjes med at skrive <em>'vi synes produktet virker fint'</em>. Hvert krav fra jeres kravspecifikation i Produktprincip skal nu testes med de testmetoder, I planlagde. Beskriv testopstillingen, vis måleresultaterne, vurdér fejlkilder og sammenfat gerne i et <strong>evalueringsskema</strong> (Krav &rarr; Målt værdi &rarr; Opfyldt Ja/Delvist/Nej &rarr; Forslag til forbedring).",
              subTemplate: "For hver test:\n1. Hvilket krav (fx K1, K2) testes?\n2. Forsøgsopstilling og målemetode.\n3. Resultat sammenlignet med kravets grænseværdi.\n4. Konkret forslag til re-design hvis kravet ikke blev opfyldt 100 %."
            },
            {
              id: "eval_pris_a",
              title: "Endelig beregning af produktets pris (Efterkalkulation - A)",
              level: "A",
              core: true,
              defaultHours: 1.5,
              desc: "Beregning af produktets endelige pris på baggrund af den gennemførte/dokumenterede produktion.",
              subTheory: "På <strong>Teknologi A</strong> skal I i Evalueringsfasen beregne produktets endelige pris på baggrund af erfaringerne fra den gennemførte eller dokumenterede produktion (tidsforbrug, reelt materialeforbrug, investeringer i maskiner/lokaler) og vurdere, om prisen stadig matcher målgruppen og konkurrentanalysen.",
              subTemplate: "- Sammenlign foreløbig kalkulation (Fase 4) med endelig efterkalkulation (Fase 6).\n- Er salgsprisen konkurrencedygtig på markedet?"
            },
            {
              id: "eval_samfund",
              title: "Vurdering af produktets samspil med brugeren og samfundet",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Analyse af brugerens teknologi (teknik, viden, organisation) samt effekten på samfundsproblemet ved opskalering.",
              subTheory: "Jeres færdige produkt indgår nu som ny <strong>teknik</strong> hos brugeren. Brug teknologibegrebet igen:<br>1) Hvilken <em>viden</em> kræver det af brugeren at betjene det?<br>2) Hvordan ændrer det brugerens <em>organisation</em>/hverdag?<br>3) Gå tilbage til tallene i jeres <strong>problemanalyse og problemtræ</strong>: Hvis 10.000 eller 100.000 bruger jeres produkt (opskalering), hvor meget reduceres det samfundsmæssige problem så – og kan teknologien skabe nye, uforudsete problemer?",
              subTemplate: "1. Produktet i brugerens teknologi (Teknik, Viden, Organisation).\n2. Beregning/vurdering af effekt ved opskalering (kobl til Problemanalysen).\n3. Kritisk refleksion over eventuelle utilsigtede bivirkninger ved teknologien."
            },
            {
              id: "eval_konklusion",
              title: "Samlet Konklusion",
              level: "AB",
              core: true,
              defaultHours: 1,
              desc: "Direkte og præcis besvarelse af rapportens problemformulering.",
              subTheory: "I <strong>konklusionen</strong> må der ikke introduceres nyt stof eller nye kilder. Her samler I hovedresultaterne fra problemanalysen, det udviklede produkt/produktionskoncept og evalueringen for at svare direkte på jeres <strong>problemformulering</strong>.",
              subTemplate: "1. Kort opsummering af den udvalgte årsag fra problemtræet.\n2. Hvordan det udviklede produkt (og produktionen på A) teknisk løser dette.\n3. Hvor godt produktet klarede testene mod kravspecifikationen og dets samfundsmæssige effekt."
            }
          ]
        },

        /* DE 3 LØBENDE TVÆRGÅENDE SPOR */
        {
          id: "projektstyring",
          num: "Løbende spor 1",
          title: "Projektstyring",
          fullTitle: "Projektstyring (Gennem hele forløbet)",
          type: "cross",
          color: "#0f4c81",
          bgLight: "#e6f0fa",
          weightPct: 5,
          purpose: "At planlægge og styre projektets tid, milepæle, værkstedstider og buffer, så gruppen kommer sikkert i mål.",
          theory: `<p>Dokumentation for projektgruppens planlægning og samarbejde er et særskilt <strong>bedømmelseskriterium</strong>. Brug <strong>Side 6 (Tidsplan)</strong> i topmenuen til at opbygge jeres tidsplan baglæns fra afleveringsdatoen.</p>`,
          questions: [
            "Har I indlagt tydelige milepæle for, hvornår arbejdstegninger og produktionsforberedelse skal være klar, så I kan komme i værkstedet i god tid?",
            "Hvordan dokumenterer I løbende justeringer af tidsplanen?"
          ],
          expectedOutput: [
            "Detaljeret tidsplan med faser, milepæle og værkstedstider (vedlægges som bilag).",
            "Refleksion over projektstyringen til eksamen."
          ],
          methods: [
            {
              id: "styr_tidsplan",
              title: "Tidsplanlægning med Milepæle / Gantt-kort",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Baglæns tidsplanlægning fra afleveringsdato med milepæle, værkstedstider og buffer.",
              subTheory: "En god tidsplan laves <strong>baglæns fra afleveringsdatoen</strong>. Sæt først tid af til rapportfærdiggørelse og evaluering, derefter en væsentlig blok til værkstedsarbejde (Realisering/Prototype) samt en buffer til iterationer, og fordel så analyse- og konstruktionsfaserne.",
              subTemplate: "Brug den separate side '📅 6. Tidsplan' i topmenuen!"
            },
            {
              id: "styr_logbog",
              title: "Projektlogbog & Statusmøder (Scrum/Kanban)",
              level: "AB",
              core: false,
              defaultHours: 1,
              desc: "Korte statusmøder ved starten af hvert modul for at holde styr på fremdrift og flaskehalse.",
              subTheory: "Ved at føre en kort logbog eller et Kanban-board (To-do / Igang / Færdig) kan I til den mundtlige eksamen præcist redegøre for, hvordan I har styret projektet og håndteret uforudsete forhindringer.",
              subTemplate: "3 spørgsmål ved starten af hvert modul:\n1. Hvad blev færdigt sidst?\n2. Hvad skal vi nå i dag?\n3. Er der noget, vi mangler vejledning eller materialer til?"
            }
          ]
        },
        {
          id: "samarbejde",
          num: "Løbende spor 2",
          title: "Samarbejde",
          fullTitle: "Samarbejde (Gennem hele forløbet)",
          type: "cross",
          color: "#334155",
          bgLight: "#f1f5f9",
          weightPct: 5,
          purpose: "At arbejde professionelt i gruppen med vidensdeling, gruppekontrakt, roller og kollaborativ skrivning.",
          theory: `<p>Vejledningen fremhæver, at formålet med gruppearbejdet <strong>ikke er arbejdsdeling, men vidensdeling og fælles produktion af ny viden</strong> gennem kollaborativ skrivning.</p>`,
          questions: [
            "Hvordan sikrer I, at alle i gruppen har læst, forstået og bidraget til samtlige kapitler i rapporten?",
            "Hvordan forbereder I professionel kontakt med virksomheder, eksperter eller værkstedsvejledere?"
          ],
          expectedOutput: [
            "Gruppekontrakt med aftaler om vidensdeling og godkendelsesprocedurer.",
            "Sammenhængende rapport skrevet gennem kollaborativ skrivning."
          ],
          methods: [
            {
              id: "sam_kontrakt",
              title: "Gruppekontrakt & Teamroller (Belbin / Adizes)",
              level: "AB",
              core: true,
              defaultHours: 1,
              desc: "Klar forventningsafstemning om mål, arbejdsformer, rollefordeling og deadlines.",
              subTheory: "En <strong>gruppekontrakt</strong> kombineret med bevidsthed om hinandens teamroller (fx Belbin eller Adizes) forebygger konflikter og sikrer, at gruppens forskellige kompetencer (teoretiske, praktiske, kreative, strukturerende) udnyttes optimalt.",
              subTemplate: "Punkter i gruppekontrakten:\n- Ambitionsniveau og mål for projektet.\n- Regler for mødetid, forberedelse og sygdom.\n- Hvordan vi giver hinanden konstruktiv feedback."
            },
            {
              id: "sam_kollaborativ",
              title: "Kollaborativ skrivning & Intern Peer-review",
              level: "AB",
              core: true,
              defaultHours: 1.5,
              desc: "Fælles skriveproces i delt dokument (fx Overleaf/Docs/Word) med rundeskrivning og peer-review.",
              subTheory: "Ved eksamen har alle <strong>fælles ansvar for hele rapporten</strong>. Brug <em>kollaborativ skrivning</em>: Skriv i et fælles digitalt dokument, brug rundeskrivning eller faste peer-review-runder, hvor et andet gruppemedlem gennemlæser og stiller kritiske spørgsmål til kilder og rød tråd i hvert afsnit.",
              subTemplate: "Regel i gruppen: Intet afsnit er færdigt, før mindst ét andet gruppemedlem har lavet peer-review på kilder, argumentation og figurhenvisninger!"
            }
          ]
        },
        {
          id: "formidling",
          num: "Løbende spor 3",
          title: "Formidling og dokumentation",
          fullTitle: "Formidling og dokumentation (Gennem hele forløbet)",
          type: "cross",
          color: "#4338ca",
          bgLight: "#e0e7ff",
          weightPct: 8,
          purpose: "At opbygge en teknisk rapport med høj dokumentations- og kommunikationsværdi, saglig argumentation og en skarp mundtlig præsentation.",
          theory: `<p>Rapporten skal følge vejledningens opbygning (afsnit 2.2.9) med tydelige kildehenvisninger, figurtekster og saglig teknisk dokumentation.</p>`,
          questions: [
            "Har alle jeres figurer, skitser og tabeller nummer og figurtekst, og henvises der aktivt til dem i brødteksten?",
            "Er jeres mundtlige præsentation tilpasset, så den højst varer halvdelen af eksaminationstiden?"
          ],
          expectedOutput: [
            "Komplet teknisk rapport med resumé, faseopdelte kapitler, figurtekster, kildeliste og bilag.",
            "Visuel præsentation til den mundtlige gruppeprøve."
          ],
          methods: [
            {
              id: "form_rapport",
              title: "Rapportstruktur, Figurhenvisninger & Bilag",
              level: "AB",
              core: true,
              defaultHours: 4,
              desc: "Opsætning af teknisk rapport med høj kommunikationsværdi, figurtekster og korrekt bilagsopdeling.",
              subTheory: "En høj <strong>dokumentations- og kommunikationsværdi</strong> kræver, at rapporten er let at orientere sig i. Alle illustrationer, tabeller og grafer skal have <em>nummer og forklarende figurtekst</em>, og de skal omtales i brødteksten (fx <em>'Figur 3 viser...'</em>). Store arbejdstegninger (A3/A4 med mål), rådata og fuld programkode placeres i bilag, mens udsnit og hovedresultater vises i rapporten.",
              subTemplate: "Se og eksportér jeres fulde rapportdisposition (eller LaTeX-skabelon til Overleaf) på Side 7!"
            },
            {
              id: "form_argumentation",
              title: "Faglig argumentation & Kildehåndtering",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Sikring af at alle kasser i problemtræet, opstillede krav og tekniske valg er kildebelagte og begrundede.",
              subTheory: "I teknologi bedømmes I på <em>fagligt begrundede argumentationer for opstillede krav og foretagne valg</em>. Sørg for at henvise tydeligt til jeres kilder (fra <strong>Side 5: Kildeliste & Kildekritik</strong>), beregninger og forsøg gennem hele rapporten.",
              subTemplate: "Tjek hver gang I skriver 'Vi har valgt...': Har vi et konkret 'fordi...' med tal, kilde eller forsøg lige bagefter?"
            },
            {
              id: "form_mundtlig",
              title: "Mundtlig fremlæggelse & Visuel præsentation (Eksamen)",
              level: "AB",
              core: true,
              defaultHours: 2,
              desc: "Forberedelse af gruppeprøven (ca. 30 min. pr. elev, fremlæggelse maks. halvdelen af tiden).",
              subTheory: "Til den mundtlige prøve (ca. 30 minutter pr. elev, ingen forberedelsestid) må jeres fælles præsentation <strong>højst fylde halvdelen af tiden</strong>. Brug præsentationen på at vise den røde tråd, fremvise og demonstrere det fysiske produkt/prototypen og reflektere kritisk over jeres tests og mulige forbedringer.",
              subTemplate: "Gode råd til fremlæggelsen:\n1. Brug det fysiske produkt og jeres prototyper aktivt!\n2. Undgå at læse op fra slides – vis figurer, testdata og beregninger.\n3. Vær klar til individuelle spørgsmål i alle rapportens faser."
            }
          ]
        }
      ]
    };

    /**
     * --------------------------------------------------------------------------
     * 3. APPLIKATIONENS TILSTAND (STATE) & LOCALSTORAGE
     * --------------------------------------------------------------------------
     */
