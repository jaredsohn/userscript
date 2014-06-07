// ==UserScript==
// @name           Ikariam Army Helper
// @version        0.31
// @namespace      Dino.pl
// @description    Ikariam Army Helper
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://newsmixer.googlecode.com/svn-history/r2/trunk/pie/public/jquery.color.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://s*.ikariam.*/index.php*militaryAdvisorDetailedReportView*

// @history        0.31 Added lithuanian translation
// @history        0.30 Added ukrainian translation
// @history        0.29 Added czech translation
// @history        0.28 Corrected the level of the city from which additional slots are added.
// @history        0.27 Correct distribution of air slots, flank and support
// @history        0.26 Correct distribution of air slots, flank and support
// @history        0.25 Corrected number of troops and aircraft in the slot
// @history        0.24 Relinked compromised PhasmaExMachina's library scripts to alternative copy
// @history        0.23 Updates due to server recent changes
// @history        0.22 Added italian translation
// @history        0.22 Updated latvian translation
// @history        0.21 Added "+" button to each preset to append stored amount of units to current battle set
// @history        0.21 Added option to hide row titles on battlefield preview (see Options page)
// @history        0.21 Updated polish translation
// @history        0.20 Added presets capability, so you can save/restore your favorite troops set
// @history        0.19 Added 'All' and 'None' buttons to select all units by single click
// @history        0.19 Added buttons to deployment pages as well
// @history        0.18 Added buttons to quick add/subtract units to/from single slot. Added button to fill out a single row by necessary amount of units.
// @history        0.18 Changed algorithm of gathering target city level. From clicking, which was required, to just island observing.
// @history        0.18 Corrected german translation
// @history        0.17 Corrected sea-battle fiels size. It seems it always has 5 slots in row regarddless of city level
// @history        0.16 Added hungarian translation
// @history        0.15 Added romanian translation
// @history        0.14 Added second air slot to support bombers and gyros simultaneously
// @history        0.13 Added croatian/bosnian, dutch and latvian translations
// @history        0.12 Added spanish and swedish translations; Updated greek translation
// @history        0.11 Added portuguese translation
// @history        0.10 Added arabic translation
// @history        0.9 Corrected garrison size calculation (as discovered, 1 unit takes 1 garrison place despite of its size)
// @history        0.9 Updated german translation
// @history        0.8 Added german translation
// @history        0.8 Updated polish translation
// @history        0.7 Added fleet overview to the garrison tooltip
// @history        0.7 Added fleet advisor
// @history        0.7 Corrected battlefield size for 10 level of town hall
// @history        0.7 Added polish translation
// @history        0.6 Added french and greek translations
// @history        0.5 Added tooltip to show current army when hovering garrison info on city view
// @history        0.4 Fixed bug in 3rd-party language detection procedure
// @history        0.3 Added turkish translation
// @history        0.2 Added gathering info from barracks page
// @history        0.2 Added army advisor on plunder page
// @history        0.1 Initial release
// ==/UserScript==

//-----------------------------------------------------------------------------
ScriptUpdater.check(94360, '0.31');

//-----------------------------------------------------------------------------
const languages = {
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "arabic":       { garrison: "القوات العسكرية", advisor: "المستشار", cityLevel: "مستوى دار البلدية", support: "مساعدة",
                    artillery: "المدافع", air: "طيران", line1: "الخط الأمامي", line2: "معركة طويلة المدى", 
                    flankLeft: "الجناح الأيسر", flankRight: "الجناح الأيمن", submarine: "غواصة", reserve: "احتياطي",    
                    phalanx: "كتيبة", steamgiant: "عملاق بخاري", spearman: "حامل الرمح", swordsman: "مبارز", slinger: "مقلاع حجارة",    
                    archer: "رامي سهام", marksman: "رماة", ram: "مدق", catapult: "منجنيق", mortar: "هاون",    
                    gyrocopter: "طائرة مروحية", bombardier: "قاصف", cook: "طباخ", medic: "طبيب",    
                    ship_ram: "سفينة مزودة بقوة دفع", ship_flamethrower: "قاذف اللهب", ship_steamboat: "قوة دفع الطارة",
                    ship_ballista: "سفينة حاملة لسلاح المرجام", ship_catapult: "سفينة مزودة بمنجنيق", ship_mortar: "سفينة هاون", 
                    ship_submarine: "غواصة",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "bosnian":      { garrison: "Garnizon", advisor: "Savjetnik", cityLevel: "Gradski Level", support: "Podrška", 
                    artillery: "Artiljerija", air: "Zračne jedinice", line1: "Prva borbena linija", line2: "Linija borbe sa distance", 
                    flankLeft: "Lijevi bok", flankRight: "Desni bok", submarine: "Pomorska", reserve: "Rezerva", 
                    phalanx: "Kopljanik", steamgiant: "Željezni div", spearman: "Bacač koplja", swordsman: "Mačevalac", slinger: "Praćkar",
                    archer: "Strijelac", marksman: "Sumforni Mušketar", ram: "Ovan", catapult: "Katapult", mortar: "Minobacač", 
                    gyrocopter: "Girokopter", bombardier: "Bombarder", cook: "Kuhar", medic: "Doktor", 
                    ship_ram: "Brod Ovan", ship_flamethrower: "Vatreni Brod", ship_steamboat: "Parni Ratni Brod", 
                    ship_ballista: "Brod Kopljar", ship_catapult: "Brod Katapult", ship_mortar: "Brod Minobacač", 
                    ship_submarine: "Podmornica",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "bulgarian":    { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "chinese":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "czech":        { garrison: "Posádka", advisor: "Poradce", cityLevel: "Úroveň radnice", support: "Podpora",
                    artillery: "Dělostřelectvo", air: "Letectvo", line1: "První linie", line2: "Druhá linie",
                    flankLeft: "Levé křídlo", flankRight: "Pravé křídlo", submarine: "Ponorka", reserve: "Rezerva",
                    phalanx: "Hoplit", steamgiant: "Parní obr", spearman: "Kopitník", swordsman: "Šermíř", slinger: "Střelec s prakem",
                    archer: "Lukostřelec", marksman: "Střelec", ram: "Beranidlo", catapult: "Katapult", mortar: "Dělo",
                    gyrocopter: "Gyrokoptéra", bombardier: "Balónový bombardér", cook: "Kuchař", medic: "Doktor",
                    ship_ram: "Beranidlová loď", ship_flamethrower: "Plamenometná loď", ship_steamboat: "Parní beranidlo",
                    ship_ballista: "Balistová loď", ship_catapult: "Katapultová loď", ship_mortar: "Dělová loď",
                    ship_submarine: "Ponorka",
                    addSlot: "Přidat jednotky do jednoho pole", removeSlot: "Odebrat jednotky z jednoho pole", fillRow: "Naplnit jednu linii jednotkami",
                    selectUnits: "Vybrat jednotky", assignNone: "Žádné", assignAll: "Všechny", assignField: "Naplnit bojiště",
                    presetsTitle: "Šablony", presetsAdd: "Přidat šablonu", presetsRemove: "Odebrat šablonu", presetsNewName: "Název šablony",
                    optShowTitles: "Zobrazit názvy linií" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "danish":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "dutch":        { garrison: "Garnizoen", advisor: "Adviseur", cityLevel: "Stadsgrootte", support: "Ondersteuning", 
                    artillery: "Artillerie", air: "Lucht", line1: "Front linie", line2: "Lange afstands gevechtslinie", 
                    flankLeft: "Linker flank", flankRight: "Rechter flank", submarine: "Duikboten", reserve: "Reserves", 
                    phalanx: "Hopliet", steamgiant: "Stoomreus", spearman: "Speerwerper", swordsman: "Zwaardvechter", slinger: "Steenslinger", 
                    archer: "Boogschutter", marksman: "Zwavel schutter", ram: "Ram", catapult: "Katapult", mortar: "Mortier", 
                    gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Kok", medic: "Dokter", 
                    ship_ram: "Ramschip", ship_flamethrower: "Vuurschip", ship_steamboat: "Schepradram", 
                    ship_ballista: "Ballista Schip", ship_catapult: "Katapult Schip", ship_mortar: "Mortier Schip", 
                    ship_submarine: "Onderzeeër",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "english":      { garrison: "Garrison", advisor: "Advisor", cityLevel: "Town level", support: "Support", 
                    artillery: "Artillery", air: "Air", line1: "Front line", line2: "Long-range battle line", 
                    flankLeft: "Left flank", flankRight: "Right flank", submarine: "Submarine", reserve: "Reserve",
                    phalanx: "Phalanx", steamgiant: "Steam giant", spearman: "Spearman", swordsman: "Swordsman", slinger: "Slinger",
                    archer: "Archer", marksman: "Marksman", ram: "Ram", catapult: "Catapult", mortar: "Mortar",
                    gyrocopter: "Gyrocopter", bombardier: "Bombardier", cook: "Cook", medic: "Medic",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "finish":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "french":       { garrison: "Garnison", advisor: "Conseiller", cityLevel: "Niveau ville ", support: "Support", 
                    artillery: "Artillerie", air: "Unité aérienne", line1: "Ligne de front ", line2: "Ligne de bataille de longue portée", 
                    flankLeft: "Flanc gauche", flankRight: "Flanc droit", submarine: "Submarine", reserve: "Réserve", 
                    phalanx: "Phalange", steamgiant: "Géant à vapeur", spearman: "Lancier", swordsman: "Épéiste", slinger: "Lance pierre",
                    archer: "Archer", marksman: "Tireur d'élite", ram: "Bélier", catapult: "Catapulte", mortar: "Mortier", 
                    gyrocopter: "Gyrocoptère", bombardier: "Bombardier", cook: "Cuisiner", medic: "Médecin",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "german":       { garrison: "Garnison", advisor: "Berater", cityLevel: "Stadtgröße", support: "Unterstützung",
                    artillery: "Artillerie", air: "Luft", line1: "Hauptkampflinie", line2: "Fernkampfreihe", 
                    flankLeft: "linke Flanke", flankRight: "rechte Flanke", submarine: "U-Boot", reserve: "Reserve",
                    phalanx: "Hoplit", steamgiant: "Dampfgigant", spearman: "Speerträger", swordsman: "Schwertkämpfer", slinger: "Steinschleuderer",
                    archer: "Bogenschütze", marksman: "Schwefelbüchsen-Schütze", ram: "Ramme", catapult: "Katapult", mortar: "Mörser",
                    gyrocopter: "Gyrokopter", bombardier: "Bombardier", cook: "Koch", medic: "Arzt",
                    ship_ram: "Rammschiff", ship_flamethrower: "Feuerschiff", ship_steamboat: "Schaufelradramme",
                    ship_ballista: "Ballistaschiff", ship_catapult: "Katapultschiff", ship_mortar: "Mörserschiff",
                    ship_submarine: "Tauchboot",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "greek":        { garrison: "Φρουρά", advisor: "Σύμβουλος", cityLevel: "Επίπεδο Πόλης", support: "Μονάδες Υποστήριξης",
                    artillery: "Μονάδες Πυροβολικού", air: "Εναέριες Μονάδες", line1: "Κύρια Γραμμή Μάχης", line2: "Γραμμή Μάχης Μεγάλης Εμβέλειας",
                    flankLeft: "Αριστερή Πλευρά", flankRight: "Δεξιά Πλευρά", submarine: "Υποβρύχιες Μονάδες", reserve: "Απόθεμα",
                    phalanx: "Οπλίτης", steamgiant: "Γίγαντας Ατμού", spearman: "Εκτοξευτής Δόρατος", swordsman: "Ξιφομάχος", slinger: "Εκτοξευτής",
                    archer: "Τοξότης", marksman: "Πυροβολητής Θείου", ram: "Κριός", catapult: "Καταπέλτης", mortar: "Κονίαμα",
                    gyrocopter: "Γυροκόπτερο", bombardier: "Βομβαρδιστικό", cook: "Μάγειρας", medic: "Γιατρός",
                    ship_ram: "Σκάφος(-η) Έμβολο", ship_flamethrower: "Φλογοβόλο(-α)", ship_steamboat: "Σκάφος(-η) Κουπί-Ρόδα-Κριός", 
                    ship_ballista: "Σκάφος(-η) Βαλλιστών", ship_catapult: "Σκάφος(-η) Καταπελτών", ship_mortar: "Σκάφος(-η) Κονιάματος", 
                    ship_submarine: "Βάρκα(-ες) Κατάδυσης",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "hebrew":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "hungarian":    { garrison: "Helyőrség", advisor: "Tanácsadó", cityLevel: "Város méret", support: "Támogatás",
                    artillery: "Tüzérségi", air: "Légi", line1: "Frontvonalban", line2: "Lövész vonalban",
                    flankLeft: "Bal szárnyon", flankRight: "Jobb szárnyon", submarine: "Búvárhajó", reserve: "Foglalt",
                    phalanx: "Hoplita", steamgiant: "Gőzóriás", spearman: "Lándzsás", swordsman: "Kardos", slinger: "Parittyás",
                    archer: "Íjász", marksman: "Lövész", ram: "Faltörőkos", catapult: "Katapult", mortar: "Ágyú",
                    gyrocopter: "Gyrocopter", bombardier: "Ballonos bombázó", cook: "Séf", medic: "Felcser",
                    ship_ram: "Törőhajó", ship_flamethrower: "Lánghajó", ship_steamboat: "Evezőkerék hajó",
                    ship_ballista: "Balliszta", ship_catapult: "Katapult hajó", ship_mortar: "Ágyúhajó",
                    ship_submarine: "Búvárhajó",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "italian":      { garrison: "Guarnigione", advisor: "Consulente", cityLevel: "Livello Municipio", support: "Supporto", 
                    artillery: "Artiglieria", air: "Aria", line1: "Prima linea", line2: "Armi a lungo raggio", 
                    flankLeft: "Fianco sinistro", flankRight: "Fianco destro", submarine: "Sottomarino", reserve: "Riserve",
                    phalanx: "Oplita", steamgiant: "Giganti a Vapore", spearman: "Giavellottiere", swordsman: "Spadaccino", slinger: "Fromboliere",
                    archer: "Arciere", marksman: "Tiratore fucile a zolfo", ram: "Ariete", catapult: "Catapulta", mortar: "Mortaio",
                    gyrocopter: "Girocottero", bombardier: "Pallone bombardiere", cook: "Cuoco", medic: "Guaritore",
                    ship_ram: "Nave con Ariete", ship_flamethrower: "Nave lanciafiamme", ship_steamboat: "Ariete su Nave a Vapore", 
                    ship_ballista: "Nave con Balestra", ship_catapult: "Nave con Catapulta", ship_mortar: "Nave con Mortaio", 
                    ship_submarine: "Sottomarino",
                    addSlot: "Aggiungi unità ad uno slot", removeSlot: "Rimuovi unità ad uno slot", fillRow: "Riempi una linea con le unità",
                    selectUnits: "Seleziona unità", assignNone: "Nessuna", assignAll: "Tutte", assignField: "Riempi campo di battaglia",
                    presetsTitle: "Battaglioni", presetsAdd: "Aggiungi nuovo battaglione", presetsRemove: "Elimina battaglione", presetsNewName: "Specifica il nome del battaglione che vuoi salvare",
                    optShowTitles: "Visualizza il titolo delle linee di battaglia" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "norwegian":    { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "korean":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "latvian":      { garrison: "Garnizons", advisor: "Konsultants", cityLevel: "Pilsētas līmenis", support: "Palīdzība",
                    artillery: "Artilērija", air: "Gaisa spēki", line1: "Priekšējā līnija", line2: "Tālās kaujas līnija",
                    flankLeft: "Kreisais flangs", flankRight: "Labais flangs", submarine: "Zemūdene", reserve: "Rezervē",
                    phalanx: "Šķēpnesis", steamgiant: "Tvaika milzis", spearman: "Pīķnesis", swordsman: "Paukotājs", slinger: "Metējs",
                    archer: "Lokšāvējs", marksman: "Šāvējs", ram: "Tarāns", catapult: "Katapulta", mortar: "Mīnmetējs",
                    gyrocopter: "Helikopters", bombardier: "Balons bombardieris", cook: "Pavārs", medic: "Ārsts",
                    ship_ram: "Tarāna kuģis", ship_flamethrower: "Ugunsmetējs", ship_steamboat: "Dzenrata kuģis",
                    ship_ballista: "Ballistiskais kuģis", ship_catapult: "Katapultas kuģis", ship_mortar: "Mīnmetēja kuģis",
                    ship_submarine: "Zemūdene",
                    addSlot: "Pievienot vienības uz vienu lauciņu", removeSlot: "Noņemt vienības no viena lauciņa", fillRow: "Aizpildīt vienu kaujas rindu ar vienībām",
                    selectUnits: "Izvēlies vienības", assignNone: "Nevienu", assignAll: "Sūtīt visu", assignField: "Aizpildīt kaujas lauku",
                    presetsTitle: "Iepriekšplānots sastāvs", presetsAdd: "Pievienot jaunu sastāvu", presetsRemove: "Dzēst sastāvu", presetsNewName: "Norādiet nosaukumu kaujas sastāvam lai to saglabātu",
                    optShowTitles: "Rādīt kaujas rindu virsrakstus" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "lithuanian":   { garrison: "Įgula", advisor: "Patarėjas", cityLevel: "Miesto lygis", support: "Palaikymas",
                    artillery: "Artilerija", air: "Oro gynyba", line1: "Priekinė mūšio linija", line2: "Ilgo-diapazono kariai",
                    flankLeft: "Kairysis flangas", flankRight: "Dešinysis flangas", submarine: "Povandeninis laivas", reserve: "Rezervas",
                    phalanx: "Falanga", steamgiant: "Garais varomas gigantas", spearman: "Ietininkas", swordsman: "Fechtuotojas", slinger: "Stropuotojas",
                    archer: "Lankininkas", marksman: "Sieros karabinieriai", ram: "Taranas", catapult: "Katapulta", mortar: "Mortyra",
                    gyrocopter: "Girokopteris", bombardier: "Balionas-Bombarduotojas", cook: "Kokas", medic: "Daktaras",
                    ship_ram: "Taranas", ship_flamethrower: "Ugninis laivas", ship_steamboat: "Garais varomas taranas",
                    ship_ballista: "Balistinis laivas", ship_catapult: "Laivas su katapulta", ship_mortar: "Mortyrinis laivas",
                    ship_submarine: "Krovininis laivas",
                    addSlot: "Užpildyti laukelius", removeSlot: "Pašalinti karinius vienetus iš laukelių", fillRow: "Užpildyti vieną eilutę kariniais vienetais",
                    selectUnits: "Pasirinkti vienetus", assignNone: "Nė vieno", assignAll: "Visi", assignField: "Užpildyti mūšio laukus",
                    presetsTitle: "Išankstinis nustatymas", presetsAdd: "Įvesti naują išankstinį nustatymą", presetsRemove: "Ištrinti išankstinį nustatymą", presetsNewName: "Nurodykite išankstinio nustatymo pavadinimą išsaugojimui",
                    optShowTitles: "Rodyti mūšio eilutėje pavadinimus" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "pinoy":        { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "polish":       { garrison: "Garnizon", advisor: "Pole bitwy", cityLevel: "Poziom ratusza", support: "Wsparcie",
                    artillery: "Artyleria", air: "Lotnictwo", line1: "Linia frontu", line2: "Linia walki na odległość",
                    flankLeft: "Lewa flanka", flankRight: "Prawa flanka", submarine: "Okręty podwodne", reserve: "Rezerwa",
                    phalanx: "Hoplita", steamgiant: "Gigant", spearman: "Włócznik", swordsman: "Wojownik", slinger: "Procarz",
                    archer: "Łucznik", marksman: "Strzelec", ram: "Taran", catapult: "Katapulta", mortar: "Moździerz",
                    gyrocopter: "Żyrokopter", bombardier: "Bombardier", cook: "Kucharz", medic: "Medyk",
                    ship_ram: "Okręt z taranem", ship_flamethrower: "Okręt z miotaczem ognia", ship_steamboat: "Okręt parowy z taranem",
                    ship_ballista: "Balista", ship_catapult: "Okręt z katapultą", ship_mortar: "Okręt z moździerzem",
                    ship_submarine: "Okręt podwodny",
                    addSlot: "Wypełnij jeden slot", removeSlot: "Opróżnij jeden slot", fillRow: "Wypełnij całą linię",
                    selectUnits: "Wybierz jednostki", assignNone: "Nic", assignAll: "Wszystko", assignField: "Wypełnij pole bitwy",
                    presetsTitle: "Ustawienia", presetsAdd: "Dodaj ustawienie", presetsRemove: "Usuń ustawienie", presetsNewName: "Podaj nazwę ustawienia",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "portuguese":   { garrison: "Guarnição", advisor: "Orientador", cityLevel: "Nível da Câmara", support: "Suporte",
                    artillery: "Artilharia", air: "Aéreo", line1: "Linha de Frente", line2: "Linha de longo alcance", 
                    flankLeft: "Flanco Esquerdo", flankRight: "Flanco Direito", submarine: "Submergível", reserve: "Reserva", 
                    phalanx: "Hoplita", steamgiant: "Gigantes a Vapor", spearman: "Lanceiro", swordsman: "Espadachim", slinger: "Fundeiro",
                    archer: "Arqueiro", marksman: "Fuzileiros", ram: "Aríete", catapult: "Catapulta", mortar: "Morteiro", 
                    gyrocopter: "Giro-cóptero", bombardier: "Balão-Bombardeiro", cook: "Cozinheiro", medic: "Médico", 
                    ship_ram: "Trireme", ship_flamethrower: "Lança-Chamas", ship_steamboat: "Abalroador a Vapor", 
                    ship_ballista: "Barco Balista", ship_catapult: "Barco Catapulta", ship_mortar: "Barco Morteiro", 
                    ship_submarine: "Submergível",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "romanian":     { garrison: "Cazarma", advisor: "Asezarea trupelor pe campul de lupta", cityLevel: "Nivel Oras", support: "Unitati Ajutoare",
                    artillery: "Artilerie", air: "Suport Aerian", line1: "Prima Linie", line2: "Unitati cu raza lunga de Atac",
                    flankLeft: "Flancul Stang", flankRight: "Flancul Drept", submarine: "Submersibile", reserve: "Rezerve",
                    phalanx: "Phalanx", steamgiant: "Gigant pe aburi", spearman: "Aruncator cu sulita", swordsman: "Spadasin", slinger: "Aruncator cu prastia",
                    archer: "Arcas", marksman: "Tragator", ram: "Berbec", catapult: "Catapulta", mortar: "Mortier",
                    gyrocopter: "Girocopter", bombardier: "Bombardier", cook: "Bucatar", medic: "Medic",
                    ship_ram: "Nava-Berbec", ship_flamethrower: "Nava cu Aruncator Flacari", ship_steamboat: "Berbec cu vasla circulara",
                    ship_ballista: "Nava balistica", ship_catapult: "Nava cu catapulta", ship_mortar: "Nava Mortier",
                    ship_submarine: "Submarin",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "russian":      { garrison: "Гарнизон", advisor: "Помощник", cityLevel: "Уровень города", support: "Поддержка", 
                    artillery: "Артиллерия", air: "Авиация", line1: "Линия фронта", line2: "Стрелковые подразделения", 
                    flankLeft: "Левый фланг", flankRight: "Правый фланг", submarine: "Подводные лодки", reserve: "Резерв",
                    phalanx: "Гоплит", steamgiant: "Паровой гигант", spearman: "Копейщик", swordsman: "Мечник", slinger: "Пращник",
                    archer: "Лучник", marksman: "Стрелок", ram: "Таран", catapult: "Катапульта", mortar: "Мортира",
                    gyrocopter: "Гирокоптер", bombardier: "Бомбардировщик", cook: "Повар", medic: "Доктор",
                    ship_ram: "Корабль с тараном", ship_flamethrower: "Огнемётный корабль", ship_steamboat: "Пароход с тараном", 
                    ship_ballista: "Корабль с баллистой", ship_catapult: "Корабль с катапультой", ship_mortar: "Корабль с мортирой", 
                    ship_submarine: "Подводная лодка",
                    addSlot: "Добавить войска в одну клетку", removeSlot: "Убрать войска из одной клетки", fillRow: "Заполнить войсками один ряд",
                    selectUnits: "Выбрать войска", assignNone: "Ничего", assignAll: "Все", assignField: "Заполнить поле боя",
                    presetsTitle: "Закладки", presetsAdd: "Добавить новую закладку", presetsRemove: "Удалить закладку", presetsNewName: "Укажите имя новой закладки для сохранения",
                    optShowTitles: "Отображать названия линий фронта" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "serbian":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "slovak":       { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "slovene":      { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "spanish":      { garrison: "Guarnicion", advisor: "Asesor", cityLevel: "Nivel de la ciudad", support: "Apoyo", 
                    artillery: "Artilleria", air: "Aire", line1: "Línea de combate principal", line2: "Línea de combate a larga distancia", 
                    flankLeft: "Flanco izquierdo", flankRight: "Flanco derecho", submarine: "Submarino", reserve: "Reserva", 
                    phalanx: "Hoplita", steamgiant: "Gigante a vapor", spearman: "Lancero", swordsman: "Espadachin", slinger: "Hondero",
                    archer: "Arquero", marksman: "Fusilero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", 
                    gyrocopter: "Girocoptero", bombardier: "Bombardero", cook: "Cocinero", medic: "Medico", 
                    ship_ram: "Barco-Espolon", ship_flamethrower: "Barco-Lanzallamas", ship_steamboat: "Barco-Espolon a vapor", 
                    ship_ballista: "Barco-Ballesta", ship_catapult: "Barco-Catapulta", ship_mortar: "Barco-Mortero", 
                    ship_submarine: "Submarino",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "swedish":      { garrison: "Garnison", advisor: "Rådgivare", cityLevel: "Stadsnivå", support: "Support",
                    artillery: "Artilleri", air: "Flyg", line1: "Frontlinje", line2: "Distanslinje",
                    flankLeft: "Vänster flank", flankRight: "Höger flank", submarine: "Ubåt", reserve: "Reserv",
                    phalanx: "Hoplit", steamgiant: "Ång-jätte", spearman: "Spjutkastare", swordsman: "Svärdsman", slinger: "Slungare",
                    archer: "Bågskytt", marksman: "Karabinjär", ram: "Murbräcka", catapult: "Katapult", mortar: "Mörsare",
                    gyrocopter: "Gyrokopter", bombardier: "Ballongbombare", cook: "Kock", medic: "Doktor",
                    ship_ram: "Rammskepp", ship_flamethrower: "Eldskepp", ship_steamboat: "Skovelramm",
                    ship_ballista: "Ballistskepp", ship_catapult: "Katapultskepp", ship_mortar: "Mörsarskepp",
                    ship_submarine: "Ubåt",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "turkish":      { garrison: "Garnizon", advisor: "Danışman", cityLevel: "Şehir Boyutu", support: "Destek",
                    artillery: "Topçu", air: "Hava", line1: "Ön Cephe", line2: "Uzun Menzilli Savaş Hattı",
                    flankLeft: "Sol Kanat", flankRight: "Sağ Kanat", submarine: "Submarine", reserve: "Rezerv",
                    phalanx: "Phalanx", steamgiant: "Buhar Devi", spearman: "Mızrakçı", swordsman: "Kılıç", slinger: "Taşçı",
                    archer: "Okçu", marksman: "Tüfekçi", ram: "Şahmerdan", catapult: "Mancınık", mortar: "Topçu",
                    gyrocopter: "Gyrokopter", bombardier: "Balon", cook: "Aşçı", medic: "Doktor",
                    ship_ram: "Ram-Ship", ship_flamethrower: "Fire Ship", ship_steamboat: "Paddle-Wheel-Ram", 
                    ship_ballista: "Ballista Ship", ship_catapult: "Catapult Ship", ship_mortar: "Mortar Ship", 
                    ship_submarine: "Diving Boat",
                    addSlot: "Add units to one slot", removeSlot: "Remove units from one slot", fillRow: "Fill out one row with units",
                    selectUnits: "Select units", assignNone: "None", assignAll: "All", assignField: "Fill battlefield",
                    presetsTitle: "Presets", presetsAdd: "Add new preset", presetsRemove: "Delete preset", presetsNewName: "Specify the name of preset to save",
                    optShowTitles: "Show battlefield row titles" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  "ukrainian":      { garrison: "Гарнізон", advisor: "Помічник", cityLevel: "Рівень міста", support: "Підтримка", 
                    artillery: "Артилерія", air: "Авіація", line1: "Лінія фронту", line2: "Стрілки", 
                    flankLeft: "Лівий фланг", flankRight: "Правий фланг", submarine: "Підводні човни", reserve: "Резерв",
                    phalanx: "Гопліт", steamgiant: "Паровий гігант", spearman: "Списоносець", swordsman: "Мечник", slinger: "Пращник",
                    archer: "Лучник", marksman: "Карабінер", ram: "Таран", catapult: "Катапульта", mortar: "Мортира",
                    gyrocopter: "Гірокоптер", bombardier: "Бомбардувальник", cook: "Повар", medic: "Лікар",
                    ship_ram: "Корабель з тараном", ship_flamethrower: "Вогнеметний корабель", ship_steamboat: "Пароплав з тараном", 
                    ship_ballista: "Корабель з балістою", ship_catapult: "Корабель з катапультою", ship_mortar: "Корабель з мортирою", 
                    ship_submarine: "Підводний човен",
                    addSlot: "Додати війська в одну клітинку", removeSlot: "Забрати війська з однієї клітинки", fillRow: "Заповнити військами один ряд",
                    selectUnits: "Вибрати війська", assignNone: "Нічого", assignAll: "Все", assignField: "Заповнити поле бою",
                    presetsTitle: "Закладки", presetsAdd: "Додати нову закладку", presetsRemove: "Видалити закладку", presetsNewName: "Вкажіть назву нової закладки для збереження",
                    optShowTitles: "Зображати назви ліній фронту" },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "urdu":         { },
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  "vietnamese":   { }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
};
var language = languages[getLanguage()];
if (typeof(language) == 'undefined') {
  language = languages.english;
}

//-----------------------------------------------------------------------------
const images = {
  hintTop           : "data:image/png;base64,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",
  hintLeft          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAABCAYAAADq6085AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAENJREFUeNoAMQDO/wH88+T/+OnMAOLRxQDi2t0AFhkBABIYCADGxwQAKjMxAA8PAQARJD0ACQgMAAMHBAAAAAD//wMAIsMOz9rXWIAAAAAASUVORK5CYII=",
  hintBottom        : "data:image/png;base64,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",
  hintRight         : "data:image/png;base64,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",
  square            : "data:image/gif;base64,R0lGODlhIwAjAMQXALKehsOsms62p+XKw72rk8uzo/HU0erOyfTW076olPDTz7umkMGrmMGvmOTJwtm/tLejjPfZ2NO6rbmljtvBt/ja2cy7o////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAjACMAAAV14FVRQmmeaKoKD3JF0yXPdG3fM2FIeO/bjMBv6AMIiciaMcmULZvJJ5Qonf6q1h42e9tylccvzit2hstgdPesNrfT7xm5PBfXv3duPru39qd/UIFNg0yFUWxth0gABXEzCQoNjxYDFwcLAJqbnJ2enwAQDhchADs=",
  empty             : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  phalanx           : "data:image/gif;base64,R0lGODlhKAAoAMQAABwNDtina2pHJZloUM9vKvjq42pWTa2in7ltLfrJVkEiC2g4NIpWKtKLNFQwIrCDb4owDm8wDP35gu+WNcy+uj8GA4FMGfipQNexOqtaKayDK+zKPZ5pJ7llFp9CHwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqu4sG+cAHP6SHTOEnd+bkEAc2pUHD1Sg4BY+FZmHbG40ghcACuJ4oU6VhcAb4tKeOwgk8V8SjDYWDRalFmMqGi0vHJJZGQSOBqFnp9fkIleGIWBBwaGAkYDiaIYgRuABwOHJJimh8eiwMPAw2bUg0JFw0WEAQDAwwdpUcbDRsXEwIRAgsOsYdSGrQbtg8RFgYCHQO/RxoEGMMbExwWSh0BDyMG2UcIBBnQ0g0NtwQLDwUUDw6u3eMEwxgTfLdXAgoKDgwGRwMeDQQaYMDQYEIDBB5ELOD3wUk/CBkyIBh4EAECCCYiSYHgAUGGcQDH+SKh8YgFBhwihP7LECGCgmUktxg46UGDTQv4BGgh4VCKA2OM2jw4QGHniJJHDOhDaWEABaJRFKopI8BChAdPD3Ab0XOLA3wODmhFhiSOCANLPhgAgLSh2Q8PPGhUUEEAz7cZIDAQ4aACQ6lmOUQYwRYm4DgL/IoAoOAq17cLFiggoeDvXzWvVFwWw2tLCAA7",
  steamgiant        : "data:image/gif;base64,R0lGODlhKAAoAMQAAJ13UWxKMbCMYUgoGg0IC3FbRcOdcEo4KYZMLi0YDvrw5DkuIzIjGuHOpmQ8JatqM140Gt61gFpGMr8AAPgCAYdiQnVBIkAfCIuLgYtLIZ5cONqPTfxPPh8YFCMkJQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOYkaeaKqmmYM8YhCtdP1BHaFDDtEoM5uQBLkYO54ORqGgUJgcCmy4ylggC4+HUChMnooolQaBjC46gicxwGQoY9VgcZiiLvHVAmOobDANKBZ5KgUNAIgECwUYGAAbJoQoXA8ZGRoFBB0DDB4AkZIkHhpllgYFCRUGBxWhJBkMCAOqBhoIER0VAAcCriIOwBAHBg0RAggbEgScAL4fFtADCBYIAn0apwepBnaE0GUAx4gByAAKGAfNrhBXtAAIBu8Phg0BBWMPGygZEAAG8RbGYXIU4ACJAAwcjNA344GGhxq6tRDwQIAABxUKOLDQZQC7CA1CAujAw0EAhAcG/ziA2O2ZA0QCAEDoggDLggQ4dQloIOBmhxwESLQc0Q6RBowFZCFh0IHBgQMLGKTpMIZfhasWJACoYIEBHW0HuhSQgCdPhgEWbA2Q0MVBgq8JJGTUGIoBO2ESJFgY4GGB3wQHTlZQKAmC1wN5A1jA+TMBAQYJLpgJtfewXgYjDH5o5ezGAI97c42QEMCBgc4fHPAYkMBDHRJQT6MegXBBANgMLM4WcYCBbxKcAiyY3TXBzxE4fmJGjYVAghMLCJSdXWE5CQnDd384MOiEB+2bv5/ADn4BYeRBtUs9gSP97KcLQD3wIEGAgs4IEOWOwB/A2A4FAPADEK6wUsACFoXEkw8E2x0AQV7ZdZbSBZF1FgIAOw==",
  spearman          : "data:image/gif;base64,R0lGODlhKAAoAOZ/APTHjOfk6M+tT8ViIrOvqXFIF8yPTNLNuq6Gbvrqx+LbxotnTuzn1V5USqGVLOvjyqtpPXyvb++XTLB5SsuXYPHs0tc1L/75afzz1IlHLvdoVs3IUf/SQvSLMMulPrKil/z22r2NVdCmbf/3Wt96JvzlafuzO/nHXdrPvubXubBSMNarj/zwhfrlp+i7iv3YaP/9dY2Gd5WVjaOglct0SNTClycPB/7lR8zKxvLduvZ3Z0gTCJdsE04qFMK+tAgDAZEHA/rEaJRWH28oEOPIqPXXrfy4deCjRn5nJPrXVsyYi/7rO/7NTFlDMfu0ave2UzAjDr8HAf/ldoo0GfaqabQ1DP/dPNeZHuK+Qy48P4hxZPykXfXw24lXSKp6JObIUvftXmcyHe3tV1oFBOW3Xd7b3uK0f/jv0/vfg93XSbaafONMOvFWN/HZnimjCEmbM2TVV//7T3xAHOfEYOLCd+K4IvueRaKcofu9RuCqc+G7b9bCIPeBWcbJ29HPzv322SH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjIJ+fgQHKAxniiAYGI2HDAEBBHefFSCGDytKSggomoUgDz6dAWU+o4QKXUBAUVEWOg+rhBU+fp1lClyDZwu5ulG4XRW/yAd3ONU4ZQ8gK0BjNjtj4Bkx0NGDDwogFSg+fURqPzYhFGYULjULvuWHZzgLPfAQMmSYAMFGE1X6EhH48QOCnB5dJlBQoyChQoZ5AAAwkgDACga0LBZa+COMCwNQmtgIk09kIQVQYmTZsaPHlDA2JrRxyYoBlw/wptBcEKOJgRwJMFnE0AIACwFyhjCEJ6IFkR47KBTJAfLXJQBPXpR4gaaNCyFQbKRhgUacFhtD/8KYyRGSEQYnHEZc4HMCBgw0LQTUgfFCjw0RNHZA8dFASIgimRgBsKIXxpYkcWBcOBFEzAUYXn4MGbJjBpcKOLQsgNAigaIzeEaMuNHBjokbcW4s6YBHDBgk8H40IPeHi4KiXgBUOlSEww0mazp0YMPGxBIrS+xscOBARgMZxwwpIFBARPhCRS6A0XDiBR+xGqTAGMHkCPdGDw4wONRCgpMtUuiggxFGOMEHC2DUQUIaDpy3SF3IPBEEFVJowIYFV9RRxRVVDEACGGls4JpFAuzBxxESWADEhgMcccQJVKjHwwrLlQMCCgV4MQUPQhyBxRVriPWFCkmckGMOSyHghdMHKrRIgwo+fmGABx0A4AECIyZ0BgI8eEABDQYIIIAHBtCAx5AD1ABhOWd8gISOBbwpRA9QyOGBG2+0JNIZCnyAwAJhQAFFBHC88QMSIhDHEwZnPCCHAE2IgsMPEqXAkyEhzIGAIBNAYUAIll46CAZkTBBCJinEKUKNogJABgUUVEKADRCIEKqofzxAhwA1CDIDrQhosR+uCkBgQBPHgCADFAsQkcKaFh0gUA8HDELAAiKo4SBPXQgxgRqEcOGDnjyB8MEEZmiBayIMxNBAtevGK0ggADs=",
  swordsman         : "data:image/gif;base64,R0lGODlhKAAoAMQAAMuKdJSLhf/8+21lYlY2L++ylK1qUc/GxfrMrVgnEaFcOxgLBwMAALB6Zm1KQIRZTIBAL00cBCUMAJhkVLirpvTu5sJySjkWBikZFDYhHd6gg0UqI243GiwRA+bd3AAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeZICubEsJbSyLAjzf51vhPOkJh56wIlAJGYzZoHZEOmMBYM9JTbJeR8wjwEUUMKyDR4gBaAoIb2PD2gkzDceCsGavBm4hAPAwACYFKw8aFEIigAVmDRooBhsTBoYiDQ8OEw4EJhoaDo+ZkhkOAAaXIxRefAsDDZIfEhkPBAsbiwUVFQhxGa0fDQ0JHBMbGBAGHAoADRMEYLwIABfHCtMQEQmyVrwABQ3RFgoGFhAJC7wlybIJ4NMJEebnDh8MFwn1Fx0S7yMNALsL+PQS3Cunb1O5BRfocWgXIZ8+AAjsdLgnoaIEgu8mIHggYkGVUPo+PPAigsuAkwE8chTSh0gDgQM1BHjwUCGIPgfKklGg6eGAzwNG3mXAgMHBgVs9fVIYEJLEAApiPAQYwLEpCQgO4n3YsKGD1REdPn3AsABjU4sjypoNWRHjggwQvn5A2EweAQORrBKAYKdjgm1WIfA1MawpAQ0PsskdwUxfCAA7",
  slinger           : "data:image/gif;base64,R0lGODlhKAAoAMQAANKZdRALB45QHVVjjSsYCeqsii4mJUpUdnBLOlItFEkxJvHKqHlSQzE2SZZkUD1GY05HUadzWjshC4ZcSf/vzox7cl49LamksG8+HbmDaBcXGiMoN71qIm56qWxaYAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZDlel6murAoAWdXOtIhxuFDvayL8mARvSCJIEhjMjzgzOJ2aEfI3WSyYJY1Bo9k0GpuSJVKgRLAj7WPQOUA8JQWCMZHo0IHGwcPIACwkCgwGIxIcaBoBCAgGGQ4IhQkWBCJCN1gBAQ4wBS8jGBmAlSJ3RJkML34ZIgRIQqwiEpiKDrUTEwALFgkJlGglmQR9GY5kBRG+v1kBFpsAcxEOCsomMA8MDnQKCoTUJbkFHgPEAAzeKgULABBsFRce3eciuAUZDWxsFgfyIwCdDhsODBhwIMEAfiI6ZVCwYc0BBRIONOBnAcORABoaPGhAQONEeRKSSIKwkYCBBxv5jREg4KAMBSsVND4IAzKAAQAv0y2A4EWlBALMFtSLwIDkgAfyAkhYSmBCBAQKHgg8sO9cACM/8+ihSvWgVawENEjl2pWfUgkBGpKViPDD1QAfNHqA4KRtiabSgNoNFGGCAgLT9opQEE2BhQUvBSuopYFABMQy7C52IFiMp8ojLBQoMAHziM0FPIvoc0ZZCAA7",
  archer            : "data:image/gif;base64,R0lGODlhKAAoAMQAAKiOd6uckGRGMyURDpFbNtCfWU07MRAFBOfe07yxpJlpRUcrHq97U/rscnZVQlhPS3A9KS8sK0oRDG9nZYx+dX1vXePTuP38l6mIQdbFq4VYPjkfFtPViffLiVwwIQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeKDolKQm18EgBLJu+cfskVPAElJLt48HlTr+AwbAaXZ5PDoZwTE0oj4ghICo0vg3Oc0qtliKTSQTd7XQw8AJ8UTaTHgat4SMo+BWABAoMHwMKdiUHHxEDBwR+cAoQCwIOIhBGiB8HnANwcA4aAgajIhuZmgMDC58Mrq+El5okGwsGghgKDoMEHhojHrMkAhsDpAsHAx4LyMDCIgwFAguiC40DErWmC88E0QwGDAQCHsUHGx0i1s8CGoPk4hryFBodXNwlCBZDLQICgwwUPAAAABBBCAU6OJAwQMSAAAgiRszAJYUGPwUYOKDAUYLHjxI8iPTA6UGFiDxi6Az4JmBCAB8bDFBQs6GdK34PzCxQYGCAlmkHKgSoYMpBwFjPYpIjJpOoCAGCDj37YMCDAwcQACwJMqKSgKl8imwcaqyEBLBUhRKcYeDABBISAIAF8ODBBKEVDDxAQGKBpWcJAmSgMKouAAt8uwZ79jKDBQsZEiRAnFiEA3zCBDvOsDlDxGENn1WYDPkxggQVuDoEu8zkZNTt5KoDa2DDBkUjDkBQUMAUWk64hwnKsAEthdsRTKiqVXxqhVWhEy0o1lwYAw3WopcYUBMstWYoFkD4i7YF9wWyy6NYBUFDBvUpHGWEH7+RnRAAOw==",
  marksman          : "data:image/gif;base64,R0lGODlhKAAoAMQAANugX/TWohMKDG5JMikYEVE1KsGObhwuT7F7Ut6wghEXJo9OMEkqHTguL5tvT/7932wvEzUhGW9SR65rL2Q7KYdFGK1/ZaJWHoJdSY5jOsdvTRchN6tdQcx2JUAeCwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZOkET1CubOsCTxxnbm2LFZCg/O2zl04HlnokfsiPZyIEBAIAy4SR9EEml8oCsdshqjcPpDLZBRIGCwVs83i0mQGjIGfbGB7BwIKwWAwOdjUeBAIMfzpRgiwGEYWPBQwUHAYNiyNPCBgIDgOFAqAEDFSXBgAICBkIpg4MEREFjhiXHwCdqBkZDg6RCxocHAlHghIWBQQDEhEDzMcUCxwaTmd2BhgMewYSA5EFsXPP0V1fFMISNwgLFScB2hQUAxkEn6IF4RkUv6E2AxAQBsKMzYtFoACGa/MIRBiVb94rGw0aLDNgrcExBRgVALSAIdYHhQMWvBuw5kcBB+86tQrIKMGBBHgjBNiDxqHkD2zcNihYqSDCRwIlFE7ikETAhog6N4DC6ELUgCTzeCrYoHMprRFupmbUiXHDgasi5ik4cIDrVLJfwX4w6hWt27Rq377doFZEA6pvG5yri8DTSq4nDdT94E+AzxEDVllQS6HCBVKI+dC4urBCB8hhGfijhUEgnhWGJoy5RMEABVAsPKirUIEWahf+IAxuQaCC7NkrJNHBHZQBhkC8SWDYsTf42tdJQgAAOw==",
  ram               : "data:image/gif;base64,R0lGODlhKAAoAMQAACkaEUo5KTQgF5BTNkIpHGpRO7RtS1pHM/jnqpJyTP786dyCUHtdPQYEBKuOYTgsIB8YFBoRDcJ/VBEMCvi1duiMXdawd5dZP2Q3JPTIj1kyD+eib2xEFNeVYKpkQAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vo2cMPs9ucAECDT6J5MIQ4hadiqSzUFo9iew0g5gtDBIDWNwJG7JZRuFQMFAUcPhqIPZIPEGfOJ0oACIABAQYCxQIcBkpCxsVixUdFBUVFB1nCQyYBBObgYMGFVwUTiUeF3hEHqgXGGsCD4IEfwCzgQIYHgsLFQMomhATEBCAwhBrmxMRwwLLnYMDzxgnGgGvAdbX1moNwRHAy8yuggEY5CIath/B1rKvsw8HmNu/3t8Ay7CCGiITAQcf1gceCPjzKkKDBvAKHJwFaKC9b/gI6EsnoAADBxQcBIggAJ4DBAgcdDxwsOSEbyjvusXi8EHNgYAFOlwKdCBAAQuHHHBENmwWuJQDRTDoV0BQgpo2AywrkKHpy0sF1mzsycxntA8k+wWsOTBqQAIOLFgYOpTaQE60/nAMkEBEAYAvAwZjE/eiAwYPqL0a2C2ZML8E2IjoR0BrAIIvtcJjENBarL5p/fpk+UHABw4CCHf7p/jaxBGAPmjg5heZZRGZP1Trq9oV4aApkm0KnSJWCaV5g51WoeFzDGqzeAgfTry48ePIkytfzrxGCAA7",
  catapult          : "data:image/gif;base64,R0lGODlhKAAoAMQAAG5ILZxhMg0FBY5sUEssD8aslCsqK6OLdy0dEzUnHVtKNVY7JkM2JXVxc1NJQm1YRWE1En9OGWJAJUQsHzc4O1o9L1QaG4o2Ikc9NMJ6RFAwIj5ARmJfYB4aGH9WNQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdD1nng17A1AtkoAuFalkMoNBhZMZnnyezONAbTpNgGzFwaEerthKRbLFUMCmoqaSBQjRJvLEDU8xJrl6XPOJogMFKQsATQNvLhoXJQIIJ2wAEhIbBwWUlS0WJAQCJQAig5ATFBscDR6UXysQiiICECgSCgAaBhsbBh0IHQYGmB8RBAkDGQx5EVkKDx4TCaMGCLq5IxgYDCPQER8PANAVAQEGUQoeChjJAAkiuAkd7a8iDgqcIh0POA8IAgIeAcQeHgwGPPjhgds1aAnSTWMw74OABBDIKRigz02HggImLJiwZgGCVxKYceQzQt8AEQE44XQ4icBBgQd4PFwMgEDDBAFrNHyEwK7DBGbvBpS6lGTAgQUdODwYQI4BAwAeFixIOKbCSKlAIvF7wKEABwdNHFCwJmBDAw4MLEDo4JQBNQVw4f5YA0CBhDYAKFAwMFFIgw0ObjZocIAihAklGCRoKzKCYwBOay7AtQRevHkbDHXQkGcEgVyLOwjoQCLXvFFmPyx4t0CdiAS63omApsFtAlckELB7pZiBAtUjJERI0Jp2pBI1nbIj4DnBBF0fEEc/gWBBVBUjn5MuwVw1HwKdaXRPMYF5gPB60qtfz769+/chAAA7",
  mortar            : "data:image/gif;base64,R0lGODlhKAAoAMQAAA4HBTgiGdu+mSUYEXBQN0IlGJFrTLCQcNWiZWhSS5dfMl1FL0c2JzotIVBLTIJZQ1Q5KLB+TkotIGdkZ2s2KVI/NKldS3NKH44+MUQ+PmE6EzA1PHxhRZJ6aC0gGAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3fuElAWs5KkgDBl7pAgkPbQaBaHAvJ1SKBsZgOiNOF4IR4EyyGZ0GhWFkLCeYILDRYAEmiwkFpqgpRI1NpFwIScAwGCQcoDB0HDyIDCxMVTx4QcAMMDQwoBBwIix8eBRIVonMTBiwBAAMDKH8FIhqfrQGzlymEHQ4DAIYoABQiBXELs8QDPSiEBwcZEwJZCEwfyh0JgwcVBh0IAQMe3sYfCFklHQYEFFUWGBTYHwoJe30SEAECBwYRtA2z9p0lFbpSBQQAQIQ3BwmeDEhgAB+BBxAjGnhgqkSCDRscTOjwwdUHDhcKXJhgqduABgQI+0Q4MJCgBANYSkyYmWAjiQuXZHHz0GCBPQUQUjHgkM2cShI0M2QAQ+JTt326eHoggA9BBIjDdEHAN4LATAdgHZTo9sebh6HmGDBY8CAoQYEMHhAY98GB0gwb6jRVxZNBhQUqERDoeYADhAVd1ALeJGLHBwmrSCyo0OCSX0sBFkSIwCBIAQPiQiMwwI1DhA+IPQUgUVnM0wYVLKGtAKgAhJS4d/yh+jjQAI8i1DYY2Ijy3wX7gHhQpYqgSQgXPkAPeXpEZV2S9yEPcD3yCA0CvfWQAHFAhTyvApJQ69cDAA8plsufwb0ywRXebEhocJ+I//8ABijggAQWGEMIADs=",
  gyrocopter        : "data:image/gif;base64,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",
  bombardier        : "data:image/gif;base64,R0lGODlhKAAoAMQAAI9pSmoND2xdSU8HB6yRaosyMPPbo4pFOnNKNSETD8uleQUGBXUwKFQ3Ktq4h4ZZRzcuK6RxTFVGNUwpHbGDVjIhGaBOQ6GKZXAeHYNyV4MYGZk9OZR+XrqYb39bOgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZClmGYeabOueRHQcHfFsEffurNNtwI5huClYOrzkx0EpbCwWx9DgAG4oOmWLWXAWIg6pNGIpUrSsjqJwYBcoYapBwShrImhSxjA7aBgFYWJDFkYPDwJ5Ih0cDIcIDBgKHR0OCgoGFI4PGAyKHwR+hQwIB5OVllQIGEUaCHkCDhoahRoBCAQEapMKFxgBXbd5HB0BGq0BGxcZugoEGQoHA8ABnmgXEQGsBbYWCsyUKQ4A0wzaeRcW2sjeFwIcHAIEDhEDAxgYA3kZ6hhdtgCcpVChi4M9bfrQCFBXrcCvgATiCWD2zN60TwACaHM4AKK7dxcIkDv4ScAvbfke/3S48JFDSA8WE+aREEljgAEPCLAUMDEkAoufREjAp3EAggvweGYIOcFegqAiKpwcwABpBqVI7U2ASuLXPXhXe/6cAIHrhwoJElgEoGIiB3IfJLzi6sHDiAQTeE5sMILCXKgSIlAAICJBBQkCtn7wQLisWREAKPjNmxiBh7+PSwhG0KBuZhcDGiBAMGFBggWfSTSAYLqCgLQJGlRAnXlAgggCWkuoAADABAYTMphtMKGC6OIVDr/mmQCQWQwHGsRuwKH4A9YQOjDY8Ph3aNESJuSdfZsB38d1fyavyxMCoASOzT6wvKpOhAxtPECAn7lzhP8AmMMAcLvB9xR6/wkWICMpFUCAVgWpLaYgffBBGOEIjFkmHQTxXSjCaGft5yELaaERAgA7",
  cook              : "data:image/gif;base64,R0lGODlhKAAoAMQAANGZa6l5VcSxqkxTsaSamykRBhAFAmxgYPr19JlfPjAtVlQ3KnVNNKir5l9q3PG2jVonEkIXCsi/w3MtFO7VzHeE9TEeFys0i/l/eT5HoYp9kUEuJJJDITs9cRkeRgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeO5ChRJ1KubFtKSCzHbm1/R64RxLHdwJbBssgdgsjVgSCQCJJQkabpjCYNDIAW8LAGDYbAY0yheG+WsDagdT0oT2vCkkhsDItFC0B5IMpRCxsBhAwBCS0cCGMYGGZQhmNbDCsFEQl9GH4AUBZZARsbFiwREQUTYmWUSAcLRKIMBaSmBZamSRkSALFpBi21wGC+SBUVTgcWHh0aLMC1YEnFDg4SFQMOFQ3NBcLDQQPFGRnZ0w47K91QAloaFxcDDAfYBAxdJGB6UGIACR4ZHaU0xFiQSsQBAz+iiJnjYUAHhBRiELAEgY0BWVa0HOigbEEBAjMMHmBAMOMDABoOwESYwAECyBiPRDCoI+cBKJZ1JjBIAeiDhgUMVunbZQBnggkTNJyo8qGWUCgECkHgkIDDBAgHJGglIMIAszMzCUFACqFA1q1nSsxM4LFUBAMHBMjlmpbEpUOmEDIRQOBrXYNhF4A5oKHwgAt/SWzIk0aBuAHiECc2KMxxhgGQ3U0W8faAgguXMV/eLCIAhMVFFKjOR1pEAUEHuBUYG6B1UwujPliotRIRaQulSuz2Oxl4BNa2R2yIAAF5chG4E/4NAQA7",
  medic             : "data:image/gif;base64,R0lGODlhKAAoAMQAAFcxJ6NqRt6XYfHr625ILwYEBnlubvnblmNPTZmLiz00M7KmpiUUD45cPUxAQKaYl6B8cAQCK8OzsS0CKyYVSH4JCT4mGcF9UWdfYXJeWrWpCB0eJ4V6etTJyOOzdgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZPl5x+GZbOuSTSofwWvbFuTt6IHcwFJhSBAIeKugclggXC5Go3I5fAYIAAKhMAUyGAUAAMz8bLq3AqMBKCgyCgs6CAhctA5CbX5jEBoBbFh8NhwNFlpabCMLA4QkDwMSAIiADSQUGJePdh0DDxYMiAAkERENGhpzUAIXEgMdEGKDIhEbZx8AqlNGFwEBDx0SsXZ7BRPIFBEiBEpWBBYWCRILHR2/AQcfDMjIy12BYGAGDw/DCWwBAm3ec79yDgwYCeYdCwRfbAWm310NF6QcYODAYRq1DBk+NBGTZc+Uf80UGOBgIMECCQ8SQHhEwskliQQfLFhQziFHJxdE2mCoKHJBggQYOI7QA0iBA3IiMyYwwDGBMER+bOJ0mYDDj0cWHEBAEEoOAwQZJiIAgMABRwVYM8iyUNXngAEJGBTkSQirGAQQIBhIWw0sAwcLYhJyUKEuAAdaESAI1gEUgKKPENStkNRBVQUWP1kA+ciBgsF3HUsc9uAtArJ8HA+u4MCxAw4SJMDEcJPjBgAVxBi2yWHkSwMSZW5YrLcqAno7jSrgIFMEVqiGB3JY6ThBbxEb8AodjgHDZEfHPwSn2Nw5AwMdoovIq0B7C6U7vbdI8FV8CwOY+YQAADs=",
  ship_ram          : "data:image/gif;base64,R0lGODlhKAAoANUAAPnu0KqMce6kXK6nk3NeT6h1SP///W4xEZFJHalZJpWIdYtrU8K1lrVjK8l5T5tSI+RmNqqbg+TculgqEot5Z2I6KP7+5LWvoIlLIVIxIHpGJuLbxXVIN7WEVpVNIJhbNP6NjJlmPsrApDEWC+DTt4tUOcK8qp2bjtTKqdh/fKNRHdTMtahgRM7Hs2JLPurhwPmGNoVaQ1gfCX1CGn9LNqN+Xm5ALNza0/16ftrRsOJ/W3xQMebi4IZQLcrUvu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqLT4UkynEpqkmMtdlaQDinRRmCOob3Igo0RuPIN8qya+IpRBXM43iKYiDAICLz85ChQmfYt+UywQMAIpMQs3jIw3Ux0qDiA4KT4Wl4x/UQydOJ4kFqyiowYtUwEgnp8AAK2ujBaFUCIqHCkgEDIit7etu15QAQgIGh8HFQEbJCQvL8i5rMtPNSMHCSozBzsrLejn18e32FEdIyPOEyMTJi0i+frpLSQDUgEeTJhgY+CBCyYSJrxwYcCAEyciMJDCIMGHDBoOyJjAsGNDiIgIZHgwMUqJBhoqTNBQo6HDhydCuoix48CDAAv+OVmgAkOH/w4FIoBUQMDFgqMFQnyYMeEADBYBnqD4II5FjQA1koaQMYLmjkENEjSA5EBHySYvSiD4EKLAzwIWP/T40CCsCrENbFSgQActgQoPEngI0aEGOQ91H8xYvDjDXl8E/hkOLFecBw3OPGj2MKOCjVJNBijYkoMAhR1hMQROLDaB65QlOqRZIiGCTgYE/rygAfgBht+bfSOwYSNDDAcdcvQtIiKREDO9FriIEML1g+sefi+uUIKGgwgLykYtgoc0gQhCshAYkiNQhBohgKuw8YEFi9csBDigUAN9APQ/MFABgCJUYEUSLzAQQAgalMDCbyEEqFR+ZtERgAtpkFBDDDo1UUMaBx7s0MsPLpRQggPjLbDeDyLooMN4UIi23AAc2MDBAj8kKEQEZQFYx44KMLBcADqwcNaPSdTAwmxINunkk1BG2WQQADs=",
  ship_flamethrower : "data:image/gif;base64,R0lGODlhKAAoANUAAHRELk0nE6mNceufWm9kWJhrTmcyFWc5KPsAAFxekKZaKCgSB/qMjLqskVgzIvlvcNLJq8lmKY1GHLhtU8SylnMJBK9cRZB7Y3g4FIiP255UJJROIbCfg9KckoRHKopjSIhKNBMJBZVYOHpYPrInETMdE8+ETI0DAqtOH+HYtpyVnrddK0E0KLIXBtx8NoZULn1BHEIeDOnhvv+dnsa9n/S7bf9/f5RKMRYQPnp6qyYhJcdnaWFNQLuyos5DOu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQalQlS1KptoMqpINmmq5MpJ3jgMBKSK2dyv4uOoFIbVe7EhcAqhXRYdkIyXTk4ISELCyUxDhQCAoIUBQkJJQYwHiAAAA4XCAgcdgIoHjwHJAAHBw4BMT8WCBajKBskoBUOBrsBNBc+s2ofMAcYoCQVJxUBASAWExOiYSIBu7fIyjExB6oA0g02HYFPKxIxGAYYGMm5nQGMND89DzM24R0NThcRGwYB6ihWYFDlqsSCCxToPWBg44GFHQzSLFGwQkSBARhFrHKgLQYBBvRsgJxxQgeLDzsiLSmgIMIAFy40ruIGooNIBgwXnghRwiAP/5VKGmxY4bLGAQOcQNwosGPHwoU2WrCY+e5CkxcaNLg0UeAoAE0BWBgo4ONBCx4jRrzgdGBEExobYEiQ4GJAjQK6VDlwcIAHjBdp9R7wMOKCDCYXmGFAocBFjQEfPGjYpIrbxgAHNABVImNPgwIwSsBYscGFCQUoUMDI5IEtZhE3VkhLwuGCNAFTN2wIIIGxgg2KYqQLsAiACBEWnuUzwuGD1R8QCDz/8M7Aiqwb1PnT5m8VgOQWQEiUF1nahQtpBPwcFkEBdt1yI6BgNtP4MwEcIFwYQeBHZ29C6GeYEL68sIF7WWUVgQT+YHbAVCBMwEpa8XBQAAD5pCDAB/EYQV7BBZG9J4F2GGwAwAhsjYAFBAU4J8QFIjynhIYjrCYXBszQZQIHp1AgxAcjxPOZi0+k8NkLcmkw1wom/DDOIBcUQMB4URi5oQci+GiEACNsJsiXYIYp5phklmkmEkEAADs=",
  ship_steamboat    : "data:image/gif;base64,R0lGODlhKAAoANUAAGdWSJVtT8Kykah3SjUtJldSUfmvd4RUM82OV66jiK2WddbNrGdIN2czE/nIdHlTOnZubKtaKraEVVQoDsxlLceiZ7tqK/rKh5yMc1dJQJVnQoFaRIt3YsCWYZdPIP/rjXFPPGthW0syIxgSEeWbWVQ6KzgcDIw3Fv+mTDw4NueCON/WtDklGGQ7I2ZHLnM9Gr6kelxAL+KoaHxGIREXHEItIuffvMF+RevjwMq/o5p/Z0dBQIRgPSUjI6CAVO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/QMHi9wusiMikcslk6gQcTsvWrFqZthwEdMJdv+Bf7jQMm5vPs1qJwawUnMTaLKBQOCmCfA5WTBouKT05ZitUZgomDSctIgJWCwIwCzAdhGY+ExMeDTQvA5dLFRcyPgEae2EzDSaMNJoNHh1HSRguIgw3DhcKYTkTLzOBPRkPGQyLEkk7JSAlDBcfBgKhVTAmBzcpGSEQEAUAHQMRMD82HDU86i4gMjIdqVUCMy0tBCk73RAbGdEyCit0sHjwQF2JGC54xGuyQIUDBwh4+MiQb0sNGNIk6EiXIQXBGhJI6PiyYJcDGRIGuDDBIkUBDgwwyDiwgcQFAxkItGARICKY/woIJGg4cACBjAEHXOR7AACABhkXLmgYwYJFCR+gvsB8MADBwwsObrwQUeBbgWYaQIBoxEKEgQ8VDjXBoRbEhmgnEdwIgQHCjr81RNRgwaCDjBgmFH5RsCEljwAGHsqAkcDv3zyCaxQIAeNChwBgbIBIOSDAjVJ2U9DA93cHN2/eOMC4caOMFQ4DeDzosCEGDwQDBPfAt1mftwIEeoyYgOBLgg1EA/jYoFcDCZX3uIXYDiFnDxojTMhC4mWJ6A0Hp0uQoPshAgb4MmzekbzHgbQTIkhQcKMcEw69xTDdBgNoUOBbDujWVE4EPEDCSRrM8IIGNwxAyxI5NNaBBGpB9e2BBg1IEJYFJJaoAm0FblAQCAsp8VwFHdjlQAWVAeNBBBHciGOOLjDAQF0xhPDDhf+tiFAMRAjgQjAz6IijB3WpVcIIOcAwjRUBqMWAgRggkcCSL4QpZo8+ljAQCQYYQIJcSySQwwIDkKCAbUQk8ECYDeTZgo8MxABZmiSg0IFz1SixQAB4tqBlDHYFoIIKKKDgHx9EHOrBDFr+CAIDEdCGwJWUIiGAblESFIEFEfwIWqi1qFjXAXZEoNYGrCqRoasPRECBrBtwUKsSK/CggQYAvKHiBr38qoQOXNYZQKHK/iAAZC1GqwQMMlh7RhAAOw==",
  ship_ballista     : "data:image/gif;base64,R0lGODlhKAAoANUAAP6OhqQKCnBFK/thYf/7+z5Fq9DGpvsBAdadYpuHb2xcXJJuT7mtlKZZJnA5GTEUCgAAgLZzTn2H/GI5KshwNYxIHa9gLFgqFPrIxp1UJb+4qayagYhhSs0CAlEvJVkIA4uRlH5GIt3UsvtCP4J0aZCIv83JzKp5ZoVWMo9RJrxXb6JQHphaN4JPPNM2N55wQZNGKujw88srZHkID6hYRSkeW5qpr+XdurXHzOriv389OPsbGZhZYFFAReLX2+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqFN4Xm6szVIAUGV2kgKWazQk2lEY2Fos3psMMQdqOYCpOzijQGBjR1BAAHB3Z4eltUJxYrFiUydASFlAQHAD48VSwVGSUSEocjlQMHA5aFN1M3GS+hopOIlYd2mRgGUyIICAoFEgUfpDExpwMxeLlTBr0oLyQ9IYcdGjhzLjguLhtuUgYoKBUvERMTHegbNjwBMDYBNCdUOc8VKCkOD+gdICA6ATpIzOAhr1W4CxNQ5EMXoB+aHj0+9NBFxEAfJp4uXBCA4sKHDgBBKPjwwYOCDaxEGJDTogXFJQsyrEAh4MKDGR1mKFDw4AWC/wwLNiQgBwABjQROGJCoQMHmgwcTHLR4EaInAg7kWlzQEeHFAicGWjDI8eKCgwYsFrxYKwCqjgksWDzwoPFCiBMINkRghaSFAG8JHKzI0GBtCx2IJ3iYQMMnzQgWLDTIwCLJhglihCQQ4MABjMOfaToI4cACiggUUlsgHWKDZaQ/VhpgIMCcYEiTG1CwUCHE4NwhBOyOgMCAiItE4hjf4JoE586/CUvv/Ym0ABYCQkROYeFE5hsMGBhIkCCHiAQWW0Sd/FtyhgrwYQiY/+OGG6UaKmlg0G0z+gRiKKXLBingM1p8pGnkAAocYLFBMT5U4sMfLXAw3gL7ceDaEDls8GtcZw7UNVpaQhhQCQExoLgFfwxoqEEELDBSRA4JpDBZgTg2YMFX9fnggwkmaAACIzQycAINC3hjGQvsRcfjDwzgYAMImRGxAQsbNsHAAvGlEAIgQmxAJXJjzLaBLuAZ98aabLbp5ptwxqlEEAA7",
  ship_catapult     : "data:image/gif;base64,R0lGODlhKAAoANUAAIlNKK6QdLShh8OylP379nBKNq5bJrlkKXJjUB4WD65yS5RtUkIyJ9NpTNTIqOLYuP6ZZ+h5NVVMOWA9LPaFOtOCUZ2IcJJ4YcVkJp4zJ9Slf41bQumTW7SEV9h+OnY7G65/Zt5sKlcxG65cQceXavB0T/28uMZ2NsZHL/asbMZrMalSGv9maNl0L8J4Xv+Lj9tEPZ1TJp1dOuvhwc1uLNJxM8vAotunYf9/hP+sSOC7ire9wXRCI+q8nv9XWe7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQ6DZwc1GinFchCAxiS9znAdB+Ox1g5U3UqEUpIvEYqKIpOhxap1I8XEwNCA3ccM39EeTgmLjY/JBViDwKDdQoaLCYwFkIPAQgTDAqIawKaPhkiIy4yDAyiBQJrNi8mLBkSryIbMiMVIwkbaxo4MAASBQUfPDwVENAFDJZUDjAoBRIfAAIBOgsiChApEL0dAwKPRTNqSQIGLQcSCBo6JBYXFhMTMgAjCws+xDigAMSQARRy3Gh3RMABDCduBMg3YIaDUK8mKNChQYYMFxUK2tgQIQQFOkg6hFjxkMQABK/mIZgp4QAEEzNmaKgAwiGF/xgxaigpE0PFwxMbGEhYKmHBhQ0BQPQgQDXAhg/wgspQ8qCZ0QMrVnhIocECgl+yCGjQ4MBCRhEfQkSgZkTABhsDDAjEcOBhCw4VmDFAIGBHgQSIEVxAYCDCAiQz8CECtYAGgA81aGAIa2AFjwUeYohIrCFFnAOzjNi4MOhBPiEbJgTFgEGzgYEPQ+iOw/sAACxEbIzYgGjAhUcznD6oHIGGAXgtThy4vS3GB4EAABQoEqAE8QcgOv1wsCD1jwEyWrQwquKrdmUTRPDQDnx8gwadBIy4IETAgvpDCDAQDS14YBQPExSA4AQ8DDNEAA2MgMUCMQwiQAOPJWFcLzIYAGDAPiACIJ4QCvAn3HY/uFCChE7k9MAAC4wQAwAy3FWEBSN0YkMDJSzAUBQOHeACBxzQFcAjEDbQxRgWyPAMBBwAaEGEdHkRQAEjQDPiDwJc8GMdxi1QSiJklmnmmWhmEQQAOw==",
  ship_mortar       : "data:image/gif;base64,R0lGODlhKAAoANUAAPv6+rqsj8W6m8/GqJVtUGY1F1IzJIpFG4pcR9/WtQoDAlsuF8Z2OKVVOqpvTCoZEJqJcc9pSvXMkIpUOWlKOGE6KbpcRL1lLJh8ZH1EI3RcSP/npqSOdnREMoZJH8uPZ9OndXo+FqOVfYdGM5lcMrFXIJpgP+maVYg9EplLHrB8YZdWJaqIbD8nHv/6u5VMNraMZo5RJmNCMObfw7eab//wrvbAfEMhDP3cnK+dgW8+H9B/PH5RPX1QMKmSaO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqFQYSEynBMHs+hwIRIGZlducAc4CclObAAzU6zS8OZHNmQEDRDgIvO9FGAYYGhQVBQYUImN3CTwUEwySFz0yFGksGHJqBBMICBQyFYcZPyIRDxN/XAMONx6HBQ8LBSE5PBO5q1OOEwoLBwU3Dw4FBTwdFS0tagIXGQ8GwpY9BR08Bi0PPJtTMyQXDBk3Nx82IBUdE8k8KgUkLCw5WA4pJQwgMHUdBhUG/S0QmNjxwQQCAruYECDRqcSOEApujFD24IECAw9kwJBQQ4BBByy2MGFx4IADBzEurKiw4N8/fwpiGpDggsDCHTtMcFAigFCK/xAkHBC4cEJDzIoxF1DwIQHHhg86OnTwMCDhkAQcdv5AUCCFBxMgbOAI0EImDacb0qb98CLDvCNYIbwRIFdACh0hVoCo4WIDjbAb+LqoQdgGia9HWr0I8APr2wAEEKRIUcAEgR4OTKC4sOOEDQk2TpRIseLtVRUWJggYoILDlgEYtGLIsMCrBw8hcodAMdlrbh1FOFhokCOBihc7Z2T60xNCjNEZSh6YjFuHsQI6uiGwgGFGjhEIZrRqIEKIcgxWZmCIwT5GhhDSPbTfQ8SPxw6MYURoQB+yaT4Y2JRDT3i9NwojQwgwAgY/BGBBBAgMMIMKEZhg1RECaDCKJSIRkT6AGA7sN4+DEVhwYRIcpNMBgkRsR4AYBDwYoRQDaDBBeRgyloMFFiBHhh9KYFDijIAcgYFORSap5JJMNplEEAA7",
  ship_submarine    : "data:image/gif;base64,R0lGODlhKAAoANUAAPOcbdXMrK2jiJJtTVU2KZWLdqySc3ZZR/ZzLMC3mQIDDLVdKIhcR8VkKjUxL1pSTm07GYxFG7FjNsGPXrl5V3hLNDI5QnhmVGI+LZhYPIlWOtFrK3pEK2tJOEwrF4t7aE5CO7drRYxJJKloSXZwb3hTPZpMI6R3Vsx2UN1zL6xYIoM/GZdTLq9xVEFCRWZRQc9aIXY+GoNONBoZHf+BL59eQiceIOXdum5AJcSpeKSDYItPKsFSHstqPDYnIu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrUYTglvx9hkZAtaiwKUdJkAhAGNWDv8Kj6LLodEoFGD37UEqCAM5Fg4HBAogbkNzAj8DFBMgLwkJBW1SAQIFmQYPDj8BDRwcFQQylZYlDAwlESIuF104NjsqHioJVgWpDCIwMD0UJQuFOAsxJicJeVIXJQcVCxspKBQWFi8ErBgrOwIfBbdRBR2rGw0tLRIsIC4uHTsMOjoTOpkf4E43GCUr5SctLAsaqGN3YcIEAznmCbhgKsmFF+I8RFigygaBBuUyvLDgakKOHAZOHDDgpECAABgIeIDQoYICHywwmEgxggEIjhd0DNBx4Zwy/yYBLhDAUWIUBwwKMFCgEKKBBhfVqoGoESLEoicCOnTAAEGEjKTnJGBsIAMDBxMqMrAYgUJHlJMCSkDgIINBjR0+OERDQAMBAAAUMtRAcaJhEwE4cHTQgNTDhmjS/gIQmGGa4SYFirKY4TjFBgkURgBIgQDBggwh3FIRwJWDiIAbQjgKQbq0CdT3LBmQG0PFghrnGqQYjoAHhxof3LxwILECgwyQHzeIoaFElQAGNiCQAMKH1h0NwnuenpLKBxIfQvQdUOBACQ4qGiyYryKGjBYGChgg+eRGgT4DgHPDAdqwEsEKEHhQwQiC/XXVE5MYEUAuMVQIQUoFEIDaX4gMESBAAh8ccMEtH1SwGAr8dXgEMyKmqOKLMMYo44w01khjEAA7",
  presetRemove      : "data:image/gif;base64,R0lGODlhSwBLALMAAOXMrt+3m+/nxsp0YqMEBJgVE8+QfMsWE6I2MLRLQLhANrIEBNBOQqcEBKcRD+7mwiH5BAEAAA8ALAAAAABLAEsAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu7zwmAIEAQAASBAwGIZH3MwwGSo/xyUgOd80BQwG9bqbaAyPovWUZh4XCuvQFqGkHNGo7pxuNNd0CRi/wcmRtMnZ/DQR5bHxvYYaIgXswhXgEiImRfXeWj3NlLpOblnpemY6VlJCeK6Chomylh5SVlqmDKaytp6OMfoe5p7WrAE69vqfGs2tOjbKzzZXBKLi/x2vM1MfQnbYi09inDL3f2QSpJ1Pi4+Sz7M7I7ZUDqt1vd77P8O75+fiVBQECuBUZpkBdu3771s0qYCCgwCI/ChqEhzDhKYYOH35wCKBgRYsT/9lhdHgrIIAEIfm92zcy4CqTKD+CVNdSIwmOElPuw1fzBU52Mmdu6ikJpkKhKonG4IjyKFKRDUnSYAp0JVKlU4EYcKAz34CMZnhx7dougZB5knhpcop0lE0VsNg+JeCWkNo/+ubmq+vzbrOgQi+hPee3ql5+iPjCLZz3MNBqim4xbuz4lDvFJWCtBDwTmeC3HApzBvmu3xoAgz28KWa4sjOKxhQABK2hninKla3KQjCEdgYgA8Z2LYCALAEEs337CBh8eJKmuPMhB5vZ4daUI0+m5E39XMDrBmtqN8hdakkB4L/VNOnR6qzp5uF+F/6r58+K5V1+mk9NKdV+8OnnE1V/VWH1AFUH5afcTQRSYqAECFKiYA3WCffgBD8hEuCC3qHH1YUUULVhDg4NAGIFHEHRHQ4crfhFRvGRCGMIMHK4n4A95Kjjjjz26OOPQAYp5JBEDhkBADs%3D",
  presetPlus        : "data:image/gif;base64,R0lGODlhDwAPAKIFAFeZVIbjfF6hWnrQcmOTUv///wAAAAAAACH5BAEAAAUALAAAAAAPAA8AAAMnWLrc/jA6AoRUIIBb8oYCQWlC6QDDEKzpxwCwEAiwe2qcl8Nc73MJADs="
}

//-----------------------------------------------------------------------------
const unitsList = {
  army:   [["phalanx", "steamgiant", "spearman", "swordsman" , "slinger"   , "archer", "marksman"],
           ["ram"    , "catapult"  , "mortar"  , "gyrocopter", "bombardier", "cook"  , "medic"   ]],
  fleet:  [["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista"],
           ["ship_catapult", "ship_mortar", "ship_submarine"]]
};

const unitsProperties = {
  army: {
    phalanx     : { garrison: 1 },
    steamgiant  : { garrison: 3 },
    spearman    : { garrison: 1 },
    swordsman   : { garrison: 1 },
    slinger     : { garrison: 1 },
    archer      : { garrison: 1 },
    marksman    : { garrison: 4 },
    ram         : { garrison: 5 },
    catapult    : { garrison: 5 },
    mortar      : { garrison: 5 },
    gyrocopter  : { garrison: 1 },
    bombardier  : { garrison: 2 },
    cook        : { garrison: 2 },
    medic       : { garrison: 1 }
  },
  fleet: {
    ship_ram          : { garrison: 3 },
    ship_flamethrower : { garrison: 3 },
    ship_steamboat    : { garrison: 3 },
    ship_ballista     : { garrison: 3 },
    ship_catapult     : { garrison: 3 },
    ship_mortar       : { garrison: 3 },
    ship_submarine    : { garrison: 1 }
  }
};

const battleProperties = {
  army: {
    line1     : ["phalanx", "steamgiant", "spearman", "swordsman"],
    line2     : ["marksman", "archer", "slinger"],
    artillery : ["mortar", "catapult" , "ram" ],
    flankLeft : ["swordsman", "spearman"],
    flankRight: ["swordsman", "spearman"],
    air1      : ["gyrocopter"],
    air2      : ["bombardier"],
    support1  : ["medic"],
	support2  : ["cook"]
  },
  fleet: {
    line1     : ["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista", "ship_catapult", "ship_mortar" ],
    line2     : ["ship_mortar", "ship_catapult", "ship_ballista" ],
    submarine : ["ship_submarine"],
  }
}

//For each equal townhall level or more: 
//   slots_type: [number_of_slots, slot_size]
const battlefieldProperties = {
  army: {
    1  : { line1: [3, 30], line2: [3, 30], artillery: [1, 30], flankLeft: [0, 30], flankRight: [0, 30], air1: [1, 10], air2: [1, 10], support1: [1, 0], support2: [1, 0]},
    5  : { line1: [5, 30], line2: [5, 30], artillery: [2, 30], flankLeft: [1, 30], flankRight: [1, 30], air1: [1, 20], air2: [1, 20], support1: [1, 0], support2: [1, 0]},
    10 : { line1: [7, 30], line2: [7, 30], artillery: [3, 30], flankLeft: [2, 30], flankRight: [2, 30], air1: [1, 30], air2: [1, 30], support1: [1, 0], support2: [1, 0]},
	17 : { line1: [7, 40], line2: [7, 40], artillery: [4, 30], flankLeft: [3, 30], flankRight: [3, 30], air1: [2, 20], air2: [2, 20], support1: [1, 0], support2: [1, 0]},
	26 : { line1: [7, 50], line2: [7, 50], artillery: [5, 30], flankLeft: [3, 40], flankRight: [3, 40], air1: [2, 30], air2: [2, 30], support1: [1, 0], support2: [1, 0]}
  },
  fleet: {
    1  : { line1: [5, 30], line2: [5, 30], submarine: [1, 30] }
  }
}

var view;
var city;

var data = {
  army: {
    phalanx           : 0,
    steamgiant        : 0,
    spearman          : 0,
    swordsman         : 0,
    slinger           : 0,
    archer            : 0,
    marksman          : 0,
    ram               : 0,
    catapult          : 0,
    mortar            : 0,
    gyrocopter        : 0,
    bombardier        : 0,
    cook              : 0,
    medic             : 0
  },
  fleet: {
    ship_ram          : 0,
    ship_flamethrower : 0,
    ship_steamboat    : 0,
    ship_ballista     : 0,
    ship_catapult     : 0,
    ship_mortar       : 0,
    ship_submarine    : 0
  }
};
var options = {
  signature         : 'ikaArmyHelper',
  showPreviewTitles : true
};

var update = true;
var presets = {army: {}, fleet: {}};
var placed = {};
var wallLevel = 0;
var cityLevel = 0;

//-----------------------------------------------------------------------------
function getLanguage() {
  var lang = 'english';
  $("script").each( function() {
    var langMatch = /LocalizationStrings\['language'\]\s+=\s+'([a-zA-Z]+)';/g.exec( this.innerHTML );
    if ( langMatch ) {
      lang = {
      ar:  "spanish",    by:  "russian",  br:  "portugese",  bg:  "bulgarian",
      cl:  "spanish",    cn:  "chinese",  co:  "spanish",    cz:  "czech",
      dk:  "danish",     en:  "english",  fi:  "finish",     fr:  "french",
      de:  "german",     gr:  "greek",    it:  "italian",    hk:  "chinese",
      hu:  "hungarian",  il:  "hebrew",   kr:  "korean",     lv:  "latvian",
      lt:  "lithuanian", mx:  "spanish",  nl:  "dutch",      no:  "norwegian",
      pk:  "urdu",       pe:  "spanish",  ph:  "pinoy",      pt:  "portuguese",
      pl:  "polish",     ro:  "romanian", ru:  "russian",    rs:  "serbian",
      sk:  "slovak",     si:  "slovene",  es:  "spanish",    se:  "swedish",
      tw:  "chinese",    tr:  "turkish",  ua:  "ukranian",   ae:  "arabic",
      us:  "english",    ve:  "spanish",  vn:  "vietnamese", ba:  "bosnian"
      }[langMatch[1]] || 'english';
    }
    delete langMatch;
  });
  return lang;
}

//-----------------------------------------------------------------------------
function oc(a) {
  var o = {};
  for (var i = 0; i < a.length; i++) {
    o[a[i]]=i;
  }
  return o;
}

//-----------------------------------------------------------------------------
function getUnitsFromMilitaryOverview(type) {
  var res = "";
  var rows = $("div.contentBox01h:first div.content table tr");
  for (var row = 0; row < rows.length; row+=2) {
    var values = $("td", rows[row+1]);
    for (var i = 0; i < values.length; i++) {
      var unit = unitsList[type][row / 2][i];
      var value = values[i].innerHTML;
      data[type][unit] = parseInt(value);
      if (isNaN(data[type][unit])) {
        data[type][unit] = 0;
      }
    }
  }
  IkaTools.setVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
}

//-----------------------------------------------------------------------------
function getUnitsFromBuilding(type) {
  var units = $("#units > li");
  units.each( function() {
    var unit = $(this).attr("class").replace(/^unit\s/,"");
    var value = $("div.unitinfo > div.unitcount", this).contents()[1].nodeValue;
    data[type][unit] = parseInt(value);
    if (isNaN(data[type][unit])) {
      data[type][unit] = 0;
    }
  });
  IkaTools.setVal("ikariamArmyHelper.units." + type + "." + city, data[type]);
}

//-----------------------------------------------------------------------------
function storeTargetCity() {
  $("ul#cities li.cityLocation.city").each(function() {
    var id = $("a:first", $(this)).attr('id');
    id = parseInt(id.substr(id.indexOf('_') + 1));
    if (isNaN(id)) {
      id = 0;
    }
    var level = parseInt($(this).find("ul.cityinfo li.citylevel").contents()[1].nodeValue);
    IkaTools.setVal("ikariamArmyHelper.targetCityLevel." + id, level);
  });
}

//-----------------------------------------------------------------------------
function getCityLevel() {
  var hall = IkaTools.cityGetBuildingByType("townHall");
  var level = (hall) ? hall.level : "0";
  IkaTools.setVal("ikariamArmyHelper.cityHallLevel." + city, level);
}

//-----------------------------------------------------------------------------
function getWallLevel() {
  var wall = IkaTools.cityGetBuildingByType("wall");
  var level = (wall) ? wall.level : "0";
  IkaTools.setVal("ikariamArmyHelper.cityWallLevel." + city, level);
}

//-----------------------------------------------------------------------------
function calcGarrison() {
  var garrison = 0;
  for (var key in data.army) {
    garrison += data.army[key]; // * unitsProperties.army[key].garrison;
  }
  var garrisonMaximum = 250 + 50 * (cityLevel + wallLevel);

  var style = "";
  if (garrison.current > garrison.maximum) {
    style = 'color: #f00; font-weight:bold;'
  } else if (garrison.current > 0.9 * garrison.maximum) {
    style = 'color: #c30;'
  }

  return { current: garrison, maximum: garrisonMaximum, style: style };
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo() {
  var garrison = calcGarrison();
  
  var entry = document.createElement('li');
  entry.setAttribute('class', 'citylevel');
  entry.setAttribute('id','garrisonInfo');
  var html = '<span class="textLabel">'+ language.garrison + ': </span>' + 
             '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span>';
  entry.innerHTML = html;
  
  var button = $("div#information div.centerButton");
  button.before(entry);

  html  = '<div id="armyPreview" style="top:180px; left:230px; width: 362px; height: 203px; z-index: 9999; position: absolute; text-align: justify; background-color: #FCF4DE; padding: 1px 5px 5px 5px; display: none;">';
  html += "<table>\n";
  
  for (row in unitsList.army) {
    html += '<tr align="center">\n';
    for (i in unitsList.army[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.army[unitsList.army[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.army[row][i]]+'" title="'+language[unitsList.army[row][i]]+'"><br><span>'+data.army[unitsList.army[row][i]]+'</span></div></td>\n'
    }
    html += '</tr>\n';
  }

  html += '<tr align="center">\n';
  for (row in unitsList.fleet) {
    for (i in unitsList.fleet[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.fleet[unitsList.fleet[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.fleet[row][i]]+'" title="'+language[unitsList.fleet[row][i]]+'"><br><span>'+data.fleet[unitsList.fleet[row][i]]+'</span></div></td>\n'
    }
  }
  html += '</tr>\n';

    html += "</table>";
  html += "<div style='position: absolute; top: -10px; left: -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintTop + "'/></div>" +
          "<div style='1000; position: absolute; top: 2px; left: -5px; width: 12px; height: 100%; background: transparent url(" + images.hintLeft + ") repeat-y scroll 0 0;'></div><div style='position: absolute; top: 2px; right: -5px; width: 12px; height: 100%; background: transparent url(" + images.hintRight + ") repeat-y scroll 0 0;'></div>" +
          "<div style='position: absolute; bottom: 2px; left: -5px; width: 384px; height: 5px;'><img width='100%' src='" + images.hintBottom + "'/></div>";
  html += '</div>';
  
  $("div#mainview").before(html);
  
  entry.setAttribute('style', "cursor: pointer");
  entry.setAttribute('onMouseOut' , "this.style.backgroundColor = null; document.getElementById('armyPreview').style.display = 'none'");
  entry.setAttribute('onMouseOver', "this.style.backgroundColor = '#deac63'; document.getElementById('armyPreview').style.display = 'inline'");
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo2TownHall() {
  var garrison = calcGarrison();
  
  var html = '<span class="value occupied">' + garrison.current + ' / </span>';
  var elem = $("li.garrisonLimit span.textLabel");
  elem.append(html);
  
  $("li.garrisonLimit span[class='value occupied']").each( function() {
    $(this).setAttribute('style', garrison.style);
  });
}

//-----------------------------------------------------------------------------
function appendGarrisonInfo2Wall() {
  var garrison = calcGarrison();
  
  var html = '<span style="' + garrison.style + '">' + garrison.current + " / " + garrison.maximum + '</span></li>';
  $("#wallInfoBox div.weapon ~ span.textLabel").eq(2).next().html(html);
}
//-----------------------------------------------------------------------------
function unitsPreviewUpdate(type, targetBattlefieldProperties, forces, draw) {
  for (key in battleProperties[type]) {
    for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
      var u = 0;
      for (; u < battleProperties[type][key].length; u++) {
        var unit = battleProperties[type][key][u];
        if (forces[unit] > 0) {
          var max = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
          if (max > forces[unit] || max == 0) {
            n = forces[unit];
          } else {
            n = max;
          }
          forces[unit] -= n;
          placed[key+i] = {unit: unit, num: n};
          if (draw) {
            $("span#"+key+i).text(n + ((max == 0)?'':(' / ' + max)));
            $("img#"+key+i).attr("src", images[unit]);
            $("img#"+key+i).attr("title", language[unit]);
          }
          break;
        }
      }
      if (u == battleProperties[type][key].length) {
        placed[key+i] = {unit: "", num: 0};
        if (draw) {
          $("span#"+key+i).text("0");
          $("img#"+key+i).attr("src", images.empty);
          $("img#"+key+i).attr("title", '');
        }
      }
    }
  }
  if (draw) {
    var html = "";
    for (key in forces) {
      if (forces[key] > 0) {
        html += '<td class="advisorSquare" style="padding-top: 3px;"><img class="advisorUnitIcon" src="'+images[key]+'" title="'+language[key]+'">';
        html += '<br><span>'+forces[key]+'</span></td>\n';
      }
    }
    if (html != "") {
      html = '<table style="width: 1%;" align=left><tr align="center">\n' + html;
      html += '</tr></table>\n'
    }
    $("span#armyReserve").html(html);
  }
}

//-----------------------------------------------------------------------------
function assignedUnits(type, newForces) {
  var units = $("ul.assignUnits > li");
  var forces = [];
  for (key in data[type]) {
    forces[key] = 0;
  }

  units.each( function() {
    var unit = $(this).attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
    var input = $("input.textfield", this);
    if (typeof(newForces) != 'undefined') {
      input.attr("value", newForces[unit]);
      var evt = document.createEvent("KeyEvents");
      evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
      input[0].dispatchEvent(evt);
    }
    var value = input.attr("value");
    forces[unit] = parseInt(value);
    if (isNaN(forces[unit])) {
      forces[unit] = 0;
    }
  });
  return forces;
}

//-----------------------------------------------------------------------------
function unitsChangeHandler(type, targetBattlefieldProperties, draw) {
  if (update) {
    unitsPreviewUpdate(type, targetBattlefieldProperties, assignedUnits(type), draw);
  }
}

//-----------------------------------------------------------------------------
function drawUnitsSquare(targetBattlefieldProperties, squareTypes, width) {
  if (squareTypes == '') {
    return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
  }
  var html = '';
  var title = squareTypes;
  if (squareTypes.length > 1) {
    title = squareTypes.shift();
  }
  $(squareTypes).each( function() {
    for (var i=0; i < targetBattlefieldProperties[this][0]; i++) {
      squareHtml  = '<td class="advisorSquare" style="padding-top: 3px;"><img id="'+this+i+'" class="advisorUnitIcon" src="'+images.empty+'">';
      squareHtml += '<br><span id="'+this+i+'">0</td>\n';
      if ( (i & 1) == ((this == 'flankRight')?1:0) || this == 'reserve' ) {
        html += squareHtml;
      } else {
        html = squareHtml + html;
      }
    }
  });
  if (html != '') {
    html = '<td width="'+width+'" style="padding-top: 3px;">' + ((options.showPreviewTitles)?(language[title] + ':<br>'):'') + '<table style="width: 1%;"><tr align=center>\n' + html;
    html += '</tr></table></td>\n';
  } else {
    return '<td width="'+width+'" style="padding-top: 3px;">&nbsp;</td>';
  }
  return html;
}

//-----------------------------------------------------------------------------
function drawUnitButtons(type, targetBattlefieldProperties, draw) {
  GM_addStyle(
    'input.fillRow { position: absolute; top: 10px; left: 630px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.fillRow:active { padding: 3px 0px 1px 0px; } ' +
    'input.addSlot { position: absolute; top: 10px; left: 613px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.addSlot:active { padding: 3px 0px 1px 0px; } ' +
    'input.removeSlot { position: absolute; top: 10px; left: 541px; width: 15px; margin: 0px; padding: 2px 0px; } ' +
    'input.removeSlot:active { padding: 3px 0px 1px 0px; } ' +
    'div.assignRightBlock { height: 45px; text-align: right; margin: -15px 24px -15px 5px;"}'
  );
  $("ul.assignUnits > li input.textfield").each( function() {
    var place = $(this).parent();
    place.append('<input type="button" value="-" class="button removeSlot" title="'+language.removeSlot+'">');
    place.append('<input type="button" value="+" class="button addSlot" title="'+language.addSlot+'">');
    if (draw) {
      place.append('<input type="button" value="#" class="button fillRow" title="'+language.fillRow+'">');
    }
    
    var unit = $(this).parents("li:last").attr("class").replace(/^\s*(.*?)\s*$/,"$1").replace(/\s+.*$/,"");
    var id = $(this).attr("id");
    $("input.removeSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(-1, type, targetBattlefieldProperties, unit, id); }, false);
    $("input.addSlot", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(+1, type, targetBattlefieldProperties, unit, id); }, false);
    if (draw) {
      $("input.fillRow", place)[0].addEventListener('click', function (){ this.blur(); unitChangeNumber(0, type, targetBattlefieldProperties, unit, id); }, false);
    }
  });
  
  var bottomButtons = '<hr> \
  <div class="assignRightBlock"> '+language.selectUnits+': \
  <!--input type="button" value="'+language.assignField+'" class="button" id="assignField"--> \
  <input type="button" value="'+language.assignAll+'" class="button" id="assignAll"> \
  <input type="button" value="'+language.assignNone+'" class="button" id="assignNone"> \
  </div>\n';
  $("ul.assignUnits").after(bottomButtons);
  
//  $("#assignField").click( function() { this.blur(); assignField(type, targetBattlefieldProperties); });
  $("#assignNone").click( function() { this.blur(); assignUnits("setMin", type, targetBattlefieldProperties, draw); });
  $("#assignAll").click( function() { this.blur(); assignUnits("setMax", type, targetBattlefieldProperties, draw); });
}

//-----------------------------------------------------------------------------
function assignUnits(what, type, targetBattlefieldProperties, draw) {
  update = false;
  $("ul.assignUnits > li > div.sliderinput a."+what).each( function() {
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent( 'click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null );
    this.dispatchEvent(event);
  });
  update = true;
  unitsChangeHandler(type, targetBattlefieldProperties, draw)
}

//-----------------------------------------------------------------------------
function assignField(type, targetBattlefieldProperties) {
  var preplaced = placed;
  for (key in battleProperties[type]) {
    for (unit in battleProperties[type][key]) {
      var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
      for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
        if (unit == preplaced[key+i].unit || preplaced[key+i].unit == "") {
        }
      }
    }
  }
}

//-----------------------------------------------------------------------------
function unitChangeNumber(inc, type, targetBattlefieldProperties, unit, id) {
  var input = $("#"+id);
  var value = parseInt(input.attr("value"));
  if (isNaN(value)) {
    value = 0;
  }
  
  if (inc == 0) {
    var unitsToPlace = 0;
    for (key in battleProperties[type]) {
      if (unit in oc(battleProperties[type][key])) {
        var unitsNum = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
        for (var i = 0; i < targetBattlefieldProperties[key][0]; i++) {
          if (unit == placed[key+i].unit || placed[key+i].unit == "" || 
              oc(battleProperties[type][key])[unit] < oc(battleProperties[type][key])[placed[key+i].unit]) {
            if (unitsNum == 0) {
              unitsToPlace = 99999;
              break;
            } else {
              unitsToPlace += unitsNum - ((unit == placed[key+i].unit)?placed[key+i].num:0);
            }
          }
        }
        if (unitsToPlace > 0 && key != "flankLeft") {
          break;
        }
      }
    }
    value += unitsToPlace;
  } else {
    var unitsPerSlot = 1;
    for (key in battleProperties[type]) {
      for (var u = 0; u < battleProperties[type][key].length; u++) {
        if (unit == battleProperties[type][key][u]) {
          unitsPerSlot = Math.floor(targetBattlefieldProperties[key][1] / unitsProperties[type][unit].garrison);
          if (unitsPerSlot == 0) {
            unitsPerSlot = Math.floor(30 / unitsProperties[type][unit].garrison);
          }
          break;
        }
      }
      if (unitsPerSlot != 1) {
        break;
      }
    }
    value = Math.floor((value+((inc<0)?unitsPerSlot-1:0))/unitsPerSlot)*unitsPerSlot + unitsPerSlot*inc;
  }
  input.attr("value", value);
	var evt = document.createEvent("KeyEvents");
	evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
	input[0].dispatchEvent(evt);
}

//-----------------------------------------------------------------------------
function drawAttackHelper(type, draw) {
  var targetId = parseInt($("form > input[name='destinationCityId']").attr("value"));
  var targetLevel = IkaTools.getVal("ikariamArmyHelper.targetCityLevel." + targetId);
  if (typeof(targetLevel) == 'object') {
    targetLevel = 10;
  }
  
  var targetBattlefieldProperties;
  for (var key in battlefieldProperties[type]) {
    if (targetLevel < key) break;
    targetBattlefieldProperties = battlefieldProperties[type][key];
  }

  GM_addStyle(
    '#container .assignUnits .weight {left: 88px; width: 24px; !important;}' +
    '#container .assignUnits .sliderinput {margin-left: 140px; !important;}' +
    '#container .assignUnits .textfield {left: 557px; !important;}'
  );

  if (draw) {
    var place = $("div#select" + type.slice(0,1).toUpperCase() + type.slice(1));
    
    GM_addStyle(
      'td.advisorSquare     { background:url(' + images.square + ') no-repeat top center; background-position: 6px 3px; } ' +
      'img.advisorUnitIcon  { width:36px; height:36px; padding: 0px 6px 0px 6px; cursor: pointer; !important; }' +
      '#missionSummary .targetName  {width: 400px; !important;}'
    );

    targetCityLevelText = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="textLabel1">' + language.cityLevel + ": " + targetLevel + '</span>';
    $("div#missionSummary div.plunderInfo div.targetName").append(targetCityLevelText);
    $("div#missionSummary div.journeyTarget").append(targetCityLevelText);

    const tableLayout = {
      army  : [ ["air", "air2"]	 	   , ["artillery"], ["air", "air1"]		   , "\n", 
               ["support", "support1"] , ["line2"]    , ["support", "support2"], "\n",
               ["flankLeft"] 		   , ["line1"]    , ["flankRight"]
              ],
      fleet : [ ""           		   , ["line2"]    , ["submarine"]          , "\n",
                ""         			   , ["line1"]    ,  ""
              ]
    };
    var entry = document.createElement('div');
    entry.setAttribute('id', 'plunderAdvisor');
    entry.setAttribute('class', 'contentBox01h');
    var html = '<h3 class="header">'+ language.advisor + '</h3>\n';
    html += '<div style="margin: -18px 10px 8px 5px; text-align: right;">By <a target="_blank" href="http://userscripts.org/scripts/show/94360">Ikariam Army Helper</a>.</div>\n';
    html += '<div class="content">\n';
    html += '<table border=0><tr align="center">\n';

    $(tableLayout[type]).each( function() {
      if (this == "\n") {
        html += '</tr><tr align="center">';
      } else {
        html += drawUnitsSquare(targetBattlefieldProperties, this, "33%");
      }
    });
    
    html += '</tr><tr>';

    html += '<td colspan=3 height="80" align="left" style="padding-top: 3px;"><p>'+language.reserve+':<br><span id="armyReserve"></span></p></td>';
    
    html += '</tr></table>\n';
    html += '</div>\n';
    html += '<div class="footer"></div>\n';
    entry.innerHTML = html;
    place.append(entry);
  }
 
  installHandlers(type, targetBattlefieldProperties, draw)  
  drawUnitButtons(type, targetBattlefieldProperties, draw);
  drawPresetsBox(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function installHandlers(type, targetBattlefieldProperties, draw) {
  $("ul.assignUnits > li > div.sliderinput > div.sliderbg > div.sliderthumb").each( function() {
    $(this)[0].addEventListener ("DOMAttrModified", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li > div.sliderinput a.setMin").each( function() {
    $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li > div.sliderinput a.setMax").each( function() {
    $(this)[0].addEventListener ("click", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  $("ul.assignUnits > li input.textfield").each( function() {
    $(this)[0].addEventListener ("keyup", function (){ unitsChangeHandler(type, targetBattlefieldProperties, draw); }, false);
  });
  unitsChangeHandler(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function drawPresetsBox(type, targetBattlefieldProperties, draw) {
  var presetsData = IkaTools.getVal("ikariamArmyHelper.presets");
  if (type in presetsData) {
    presets = presetsData;
  }
  
  var div = document.createElement('div');
  div.setAttribute('class', "content");
  var html = '<div id="ikaArmyPresets" style="overflow: auto; max-height: 350px; margin-left: 3px; margin-right: 3px;"></div>';
  html += '<div style="text-align: right; margin-right: 5px;"><a href="" clsss="" id="ikaArmyPresetsAddNew">'+language.presetsAdd+'</a></div>';
  div.innerHTML = html;
  IkaTools.addInfoBox(language.presetsTitle, div);
  presetsDraw(type, targetBattlefieldProperties, draw);
  $("#ikaArmyPresetsAddNew").click( function() { presetsAddNew(type, targetBattlefieldProperties, draw); return false; });
}

//-----------------------------------------------------------------------------
function presetsDraw(type, targetBattlefieldProperties, draw, animateName) {
  var html = '';
  for (name in presets[type]) {
    var tooltip = "";
    for (unit in presets[type][name]) {
      if (presets[type][name][unit] > 0) {
        tooltip += ((tooltip!='')?'  |  ':'') + language[unit] + ':&nbsp;' + presets[type][name][unit];
      }
    }
    html += '<div class="iakArmyPresetsRow" name="'+escape(name)+'"><table width="100%" border="0" style="font-size: 11px;"><tr>';
    html += '<td width="15"><a href="" class="iakArmyPresetsApplyPlus"><img width="15" src="'+images.presetPlus+'"></a></td>';
    html += '<td><a href="" class="iakArmyPresetsApply" title="'+tooltip+'">'+name+'</a></td>';
    html += '<td width="15"><a href="" class="iakArmyPresetsRemove"><img width="15" src="'+images.presetRemove+'" title="'+language.presetsRemove+'"></a></td>';
    html += '</tr></table></div>\n';
  }
  
  $("#ikaArmyPresets").html(html);
  if (typeof(animateName) != 'undefined') {
    $("#ikaArmyPresets div.iakArmyPresetsRow[name="+escape(animateName)+"]").hide().slideDown(750);
  }
  $("#ikaArmyPresets a.iakArmyPresetsApply").click( function() {
    $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
    presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"));
    return false;
  });
  $("#ikaArmyPresets a.iakArmyPresetsApplyPlus").click( function() {
    $(this).parents("div.iakArmyPresetsRow").animate( { backgroundColor: "#deac63" }, 300  ).animate( { backgroundColor: "#f6ebba" }, 300);
    presetsApply(type, targetBattlefieldProperties, draw, $(this).parents("div.iakArmyPresetsRow").attr("name"), true);
    return false;
  });
  $("#ikaArmyPresets a.iakArmyPresetsRemove").click( function() {
    $(this).parents("div.iakArmyPresetsRow").slideUp(750, function() { presetsRemove(type, targetBattlefieldProperties, draw, $(this).attr("name")); });
    return false;
  });
}

//-----------------------------------------------------------------------------
function presetsAddNew(type, targetBattlefieldProperties, draw) {
  var name = prompt(language.presetsNewName+":");
  if (name != null & name != "") {
    presets[type][name] = {};
    var forces = assignedUnits(type);
    for (unit in forces) {
      presets[type][name][unit] = forces[unit];
    }
    IkaTools.setVal("ikariamArmyHelper.presets", presets);
    presetsDraw(type, targetBattlefieldProperties, draw, name);
  }
}

//-----------------------------------------------------------------------------
function presetsApply(type, targetBattlefieldProperties, draw, name, plus) {
  name = unescape(name);
  var newForces = presets[type][name];
  if (typeof(plus) != 'undefined' && plus) {
    var forces = assignedUnits(type);
    for (unit in newForces) {
      newForces[unit] += forces[unit];
    }
  }
  update = false;
  assignedUnits(type, newForces);
  update = true;
  unitsChangeHandler(type, targetBattlefieldProperties, draw)
}

//-----------------------------------------------------------------------------
function presetsRemove(type, targetBattlefieldProperties, draw, name) {
  name = unescape(name);
  delete presets[type][name];
  IkaTools.setVal("ikariamArmyHelper.presets", presets);
  presetsDraw(type, targetBattlefieldProperties, draw);
}

//-----------------------------------------------------------------------------
function drawOptions() {
  var div = document.createElement('div');
  div.setAttribute('class', "content");
  var html = '<h3><a href="http://userscripts.org/scripts/show/94360" target="_blank">Ikariam Army Helper </a> <span style="font-weight: normal;"> by <a href="http://userscripts.org/users/273982" target="_blank">Dino.pl</a></span></h3>'
  html += '<table cellpadding="0" cellspacing="0">';
  html += '<tr><th>'+language.optShowTitles+'</th><td><input id="ikaArmy_showPreviewTitles" type="checkbox"'+ (options.showPreviewTitles ? ' checked' : '') +'></td></tr>'
  html += '</table>';
  div.innerHTML = html;
  IkaTools.addOptionBlock(div);
  
  $("#ikaArmy_showPreviewTitles").change( function() { optionSave(this.id.match(/_(.+)$/)[1], this.checked);});
}

//-----------------------------------------------------------------------------
function optionSave(option, value) {
  options[option] = value;
  IkaTools.setVal("ikariamArmyHelper.options", options);
}

//-----------------------------------------------------------------------------
function optionsLoad() {
  var newOptions = IkaTools.getVal("ikariamArmyHelper.options");
  if ("signature" in newOptions) {
    options = newOptions;
  }
}

//-----------------------------------------------------------------------------
function main() {
  IkaTools.init();

  view = IkaTools.getView();
  city = IkaTools.getCurrentCityId();
  
  optionsLoad();

  switch (view) {
    case "cityMilitary-army":
    case "cityMilitary-fleet":
      getUnitsFromMilitaryOverview(view.replace(/.*-/,""));
      break;
    case "barracks":
      getUnitsFromBuilding("army");
      break;
    case "shipyard":
      getUnitsFromBuilding("fleet");
      break;
    case "city":
      getCityLevel();
      getWallLevel();
      break;
    case "island":
      storeTargetCity();
      break;
  }

  $(["army", "fleet"]).each( function(i, type) {
    unitsStored = IkaTools.getVal("ikariamArmyHelper.units." + type + "." + city);
    for (unit in unitsStored) {
      if (typeof(unitsStored[unit]) != 'undefined') {
        data[type][unit] = unitsStored[unit];
      }
    }
  });
  wallLevel = parseInt(IkaTools.getVal("ikariamArmyHelper.cityWallLevel." + city));
  cityLevel = parseInt(IkaTools.getVal("ikariamArmyHelper.cityHallLevel." + city));

  switch (view) {
    case "city":
      appendGarrisonInfo();
      break;
    case "townHall":
      appendGarrisonInfo2TownHall();
      break;
    case "wall":
      appendGarrisonInfo2Wall();
      break;
    case "plunder":
    case "defendCity":
    case "occupy":
      drawAttackHelper("army", true);
      break;
    case "blockade":
    case "defendPort":
      drawAttackHelper("fleet", true);
      break;
    case "deployment":
      drawAttackHelper($("#deploymentForm :input[name=function]").attr("value").replace(/^deploy/,"").toLowerCase(), false);
      break;
    case "options":
      drawOptions();
      break;
  }
}


//-----------------------------------------------------------------------------
main();
//-----------------------------------------------------------------------------