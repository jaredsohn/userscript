// ==UserScript==
// @name           Ikariam Army Helper
// @version        0.38
// @namespace      Dino.pl
// @description    Ikariam Army Helper
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://newsmixer.googlecode.com/svn-history/r2/trunk/pie/public/jquery.color.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://s*.ikariam.*/index.php*militaryAdvisorDetailedReportView*

// @history        0.38 new images army
// @history        0.37 correct size slot battle sea
// @history        0.36 adapting the script for the version 4.5
// @history        0.35 Script fixes for version 4.4
// @history        0.34 Hide built-in Army Helper
// @history        0.33 Script fixes for version 4.3 
// @history        0.32 Corrected the level of the city
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
ScriptUpdater.check(94360, '0.38');

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
                    flankLeft: "Lewa flanka", flankRight: "Prawa flanka", reserve: "Rezerwa",
                    phalanx: "Hoplita", steamgiant: "Gigant", spearman: "Włócznik", swordsman: "Wojownik", slinger: "Procarz",
                    archer: "Łucznik", marksman: "Strzelec", ram: "Taran", catapult: "Katapulta", mortar: "Moździerz",
                    gyrocopter: "Żyrokopter", bombardier: "Bombardier", cook: "Kucharz", medic: "Medyk",
                    ship_ram: "Okręt z taranem", ship_flamethrower: "Okręt z miotaczem ognia", ship_steamboat: "Taran Parowy",
                    ship_ballista: "Balista", ship_catapult: "Okręt z katapultą", ship_mortar: "Okręt z moździerzem",
                    ship_submarine: "Okręt podwodny",
                    addSlot: "Wypełnij jeden slot", removeSlot: "Opróżnij jeden slot", fillRow: "Wypełnij całą linię",
                    selectUnits: "Wybierz jednostki", assignNone: "Nic", assignAll: "Wszystko", assignField: "Wypełnij pole bitwy",
                    presetsTitle: "Ustawienia", presetsAdd: "Dodaj ustawienie", presetsRemove: "Usuń ustawienie", presetsNewName: "Podaj nazwę ustawienia",
                    optShowTitles: "Show battlefield row titles", sea: "Marynarka",
					rocket_ship: "Krążownik Rakietowy", tender: "Statek Pomocniczy", paddle_speedboat:"Śmigacz z Napędem Kołowym", balloon_carrier:"Balonowiec"},
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
  hintLeft          : "data:image/png;base64,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",
  hintBottom        : "data:image/png;base64,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",
  hintRight         : "data:image/png;base64,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",
  square            : "data:image/gif;base64,R0lGODlhIwAjAMQXALKehsOsms62p+XKw72rk8uzo/HU0erOyfTW076olPDTz7umkMGrmMGvmOTJwtm/tLejjPfZ2NO6rbmljtvBt/ja2cy7o////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAjACMAAAV14FVRQmmeaKoKD3JF0yXPdG3fM2FIeO/bjMBv6AMIiciaMcmULZvJJ5Qonf6q1h42e9tylccvzit2hstgdPesNrfT7xm5PBfXv3duPru39qd/UIFNg0yFUWxth0gABXEzCQoNjxYDFwcLAJqbnJ2enwAQDhchADs=",
  empty             : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  phalanx           : "data:image/gif;base64,R0lGODlhIgAjAOZRAPTStLymjEQqJMytlPzmzPzy3PzevPHm1dSifLyKRNy2nOTCpPzyhNTSxLx6VIZYPHReTPv27LSurNTGrPry5MSOZL+unODItPzyzMySZMmihJRyVKyObOTm7OyyjO3dzLWllNzClBQODBwWFFRCNPbt3GNDLOTaxKeSdOzWxPrixMO2o3xTNJuLccikjOy+nJxiNOzizPHGrMi+rPHKq9DKrIR6bLiETPz+/PTGlJRuXOTg15yShIduVEY8NERKbHlLLJRePNbPzNTGxCQSDGxGNPTq1MyylJRWNLSahMy6pIQyHMRuLOzKTOSeNPz45Pz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAAAiACMAAAf/gFFRDUpHRxYDCgNKShIDR4WHhoeJR5WGSlE4gwgBiYkrCBwtISEDLhZHiparFoyuAwFJUScuCwYERkYHBC1FSAkPSA8OJwe6yEYfKR3MDQYASQoWJ0YFBU9PDSRLRUVES0sCSB9Q2edGMw0dDRcHJ6sE2FD0EuACS0REIkQkJeb0AnZQwg7bgQUglBx4AhDKBSICvIkYQWSEjYAAGUJpMIBhBCMLIBnRSA8AEhHh9Ok7kBEjlABL/lEoMSHACgIMNQphIgDfRCI/sgXMSS+AgBhQPi5QoJAklAlMkHhTqQCj05dLWD45ICOAEpwNATxY4oQnxSFD6RGVsASp0kXW/zAqeeCkbhEREBiUSxuQbbmtNRccKNDwRd26TW40YdCkg1WAIJakSAoSElh6EQ43Wcygc5MQfIsu+cs1YVyGRjRz7syYJMkjSxpQDqkkrjkCTGAwcbKZMYMEEIy4rBcbCgUjF7zipEDPCJPnPUkgacKEyAac5zTClr015IuFT3Akfc7kG0Qk+JqcaJmN7QVzB2p+fbKDhoEDOp47eQAhgYP+TgCgllBQwKbEbIuUoEBZvCGxBAu7VcABAhvs9h5RDLlnjhETgLAAALxtloATRYQTVREm/MJER9lQINQMSxz4BAETQKLAZrwhVmI4RUAggAlMCEgBBRG4WKAAMhLQlf8SmzGxBI5OVIDPL94UwYQC52DDnBIxQlEAjafguBmUCSyBBBI9oMiEBtY8cQ02FyDpJgE1BKBBEyOOCaWDRXDzABMZAJDCm09MsEAFLQxKwAsDIOCAMIqNWVeZupXFxAMVAIBBCQQAAAEEFWygAAYxvCBBBrs5QZaeMOCZY10ROQCAKOiNgwQPRhgQggUc5PlcEyEidhisEG1QRE8CALFBEDaooKudDjDBghPASJqjB4c9oFJFJPiwAQQmBECAAR7E4iRZuQHL227kObhCNEmAsII7NRSRBAEqAOABCAM4uMRzZOWYgLTDhMMBBgdgoLDCAJiAQAHQeHCEo+FAuESCAsBSl2pdTFQwrrMgA1CEuAbQ4IEECGjg4G5IMDGwEwMP/BwSDhhg880lF3EENDkg8AECLpzp8tD/WrrEn0twAMDSAOSw9AIQIADAAh5wMEgLDjiQAQpab12BBltr7cAGGWiAQMpnm43C2RWgIMggM8iShNxyJzG33XXbrffeAQgSCAA7",
  steamgiant        : "data:image/gif;base64,R0lGODlhIgAjAOZTAPTq1NSifPzyzIQyHKyObIR6bMy6pMytlL+unMmihGNDLMySZPTGlPHm1cikjBwWFJuLcezWxNzClO3dzLx6VNTSxNTGrODItJyShPbt3Oy+nMSOZNy2nOTaxOTCpLyKREY8NOzizPrixMRuLHlLLOyyjBQODGhNLLWllFpMNNK+n5RuXMi+rPHKq+Tg16eSdPv27KltSaicnMS2rINbNJR8Z/z+/Pry5NDKrIB0ZIZYPNzQrIduVOTm7KSelLSurLSWhKqNfM3EtMyylLymjPzevJRWNPTStPzy3FRCNGxGNHReTLSahPzmzJRyVCQSDPz45EQqJPz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAAiACMAAAf/gFNTFwYIBocGM4gGQ4YsjQcchUONlAhDBlM2UxYOAUMFTqEFoxCEARSRB40cqxwIqkNMUwCwRU0XoU5JvCBJHVIjAxtSMBsDC0gAy8shTUcOCERHDUhSGkZKCklRT09RS1EDAw3B41JQ6eoAIR5ERE1IUNdRUUAZROEP3vtJPgsDEkgZiG4gkgYThsCTJ6TAkyRBIqBLyARDqAdM0hGcNzAdgCPvmkhxEKUABGQYXBCUYs0CgZUFY97IECFkhiVOijjJsSHJEgwyLFhYoAIDjo4rOaZrANKBAIcQPigZ4eSJCW/dlhBgkjSm0gwdECBokuSJkXFGjAQoq8SJkihO/y4g3bgRSoOaTBwkORsl7QAnRJ5odRJlCEekSjsC6EDErYIBSQxIKOFk2Fsj4STA7IrObgQOTrLBJZDgwAIjTphgjSJhGYyu8+YdnNCY8ICzRiAQ4GFkgZMlCqJsHULAwuaNACagCE1CCYQNbZ2QUPBhSYUeIJQwQeKCiOHjyiIMcaJDCYUFRGKo/aBghJIfSAjsFSnlwhGNdRESIWCE+oIFKwywgluYFcDEEkmQUAFTFvy2BBMVWDDELUccgAIE5lHgxAaV/abEADQUEI4CTqhwhAQGFLCPEixmw40TxLVFAQUE7ILZCW/VE8UDwhEwRIXcRHGVNwQUcIADBDpBwf8HRkShwBJNfuPNNzpyww8JRDBhABRgIUAAlGk5oUBbRqRQlo4PLaHmjlEkUUAFGzXBGIZKYPaWmqLVY+UJwCEoARTydAboM/uF41ebOA5ApY5KLFGnEiHIhsSkkwIgHpJtDtAmi8Gt9gSPvqSwBKWkTvpMAF5202YSY9aDwRKCgSBYDUwwcQESAkAhgBQCVFoESAFI8NZDmz5BBBRNHGhAjQAAiisAAkAbrQAChMCAAw4UAUGVmpqwxASTHvDTEgHgmsG0yzRAbRNFaIBAAkW0YJum3SThRASTVlDAW0NAC20T0wLMLrBH3BJAAQQccEQB9SxBRAQCJFvPAgd40MSUxRhffIQG7xQsMMARw7qjEyJEXEFWSQwRcRMiYNzCtQEwUMQtLd9ygJWCUciwlEy0fPEtv3owxAseHFHwzDNXldWE7VoJQgBIR30EAyUAQEQAHjDAwNRH7KABASX9avSJu/w49tZolwDBFBUwsUAACcAN9xAJkCZ33HW/EIDcfO9NgCBTTMBCrYQTnmXhhiOOuCCBAAA7",
  spearman          : "data:image/gif;base64,R0lGODlhIgAjAOZoAL+unOSeNNSyRPSuTKySfOyyjPzy3MytlPzyhLyKRMy6pEQqJLx6VMySZMi+rPzevNK+n51jRNzClNTSxKeSdNKKVpRWNBwWFFRCNNSifGxGNIZYPKGVfLuulOTaxPTq1PzmzOSeZMyylMWEVuSedOTm7HReTODItBQODLSurHxTNPTGlOTCpKicnMmihJRyVPry5CweFOzizJSCdGNDLMSOZPzqzPz+/NTGrFwuFEY8NNzCpPbt3JRuXKSelMS2rNDKrOzWxPTStL+XfKyObJaOivv27N7Wwe3dzOjavIR6bLJ2TL97TJxiNJuLcfzyzOy+nO/VvHRkTINbNNyaZNTKtfrixNfPvO3CfMSeiDweDPzqTMRuLPzSbPSGVLymjOzKTCQSDLSahPz77oQyHPzyZPz45Pz23P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGgALAAAAAAiACMAAAf/gGg3OAAAB4aIHYeLiYwAHY+FEIJoAF8KEA4KDpmZCp+gn5qdmTudAGJoByJnra6vZmNjRmcGsmawr2dmJ18EKTJmuLljQTVcTVxLPzxjusOuXxQlJwat0LtZZDlk3dxcLMK6r74lJR7jYwDd7O1kNcPQuGPSJRMTHh/WZ2M87u5aTDgbt+vLDHxHgJyYEETGGAZkwoTRoqVdBAYErmlsRY/AB34fJqSYAAQKhQthFjBgEIIEAxIPapggeO3LEFfifhShoUHigghAR4SoYEGLDpr8vnB41mqCiTAXtGwgsyAMmaIRNFwZiLNgxl0aZfkIg0ILgwgWIlQoEOLBlxPx/17RW0rQTAuJWqgU2AuTRYEDCrjC8kVzjA+UFyLsZaCjB4YFGybIczV3Y7wUPsNoiBCjrJaJQmLlMkN43LAZGDxgmFixG0UNCR6Io6wUaSwkZijgXUAxDAExGmgkYPHgyUfSX8GOMWPAhhAEXXp0k0j9wgEEK1rQIFNhxQMQMGrjBAG9i/kyXYYwWE12gYAuCEYwiAqZQQMJDgjsM/OgC5gtZQRYBgIEYvGCBu5BhwBaB4ihRVkLcOEEBdaYEcUAAAboxQABloeAAAJsUd5jI1hAhhapiTCDfmOA8J+AZWwII3r+ZShAGDGQgcGJKchCGAwrgFHGFgASaaSAYAQgZP+ACUgUw2dSiEOYFRgSCYYXWGL5n5EDKAkGGC9UN9Mw0pzR3xZfahlAlhh+ucUAYCSQwAsdtKDEDqJ5ZWYXZVw5gHleBNCnF3wOCcYAAsiJwy3Y1JaEeV14MagXBaDHFoGDBpBoFYJFkxEIBVBKQhcDZLlhqRh2GYCSAoggyzPSGGCAf2CEUEaoXqjAxaq6BkDGFKv2CYYEuZzhizUSgLjhCF5wQcYGGyTABRcDjDDAXgEKwIUE2BhL4RgyTMuFrlxsMO2qMqK3Kpq6JvDBQLj4AkJBFkhrwbQCaDrtl2Bom28XAXDBhGyuGCDGIQYwR0QCAlTAQAUVNFABFwL0CwZBCRWUEUABXSRQgA1nwCCrBKl8IYYIEgDQQAMuZLDyyy1n0HIDALhcQAYQSKCzCL6g4bMDJosh9NBEF2100QD4HAgAOw==",
  swordsman         : "data:image/gif;base64,R0lGODlhIgAjAOZNALSahOyyjHReTMytlIQyHKyObNy2nNTSxPHm1WxGNLymjJuLcfrixFRCNJyShMySZL+unMmihOzizPry5KeSdMy6pLSurIR6bOTCpPTGlOy+nODItOTaxNTGrMSOZBQODPz23OTm7BwWFPzqzPbt3PHKq8ikjHxydGNDLOzWxIZYPMi+rMRuLKqNfIR7e0Y8NOTg19zClO7q5NzQrERKbHxTNLKceoNbNKSelPHGrFpMNMS2rO3dzHlLLPzyzPTStPzevLx6VJRWNJRyVMyylNSifPzy3PTq1PzmzCQSDEQqJPz45Pz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE0ALAAAAAAiACMAAAf/gE1NFUREEAOGiBCGhYgDi40GjIsVFYJNCkUGA5udnJ+ci5uhRJ+bRAADmEgcSAhHsLGwCCSytLKxCBJAPyYrCj8IRiBLxcbHyMnHCAccNgavxUzT1EvT1tdM2Nja0zIHKS1ESEbU5tXd3NvoEhwhDgNI3Of02fbbHSEIC9DbGw4nXDioYM7auntMmoUoMM6akRNJIkYUcYLEOXX2jDSbQAHCkXIXknwQEfFDxBcHLnZbyYRHPiP8kEywILGmxAYg0qEzx2HDhBQMETARIFEAjQYCLlhwoGSDSp1MJFRYckCcPKJDivxA4gOBDx9ACijYOU/bgQMTOiwgcmSJgAQP/4IEeRCg7pAGCTogNDgNhokQEn4UiMfEQYIFCUg2kJtEiQAJBetZsDBhw4EC/SooeTBEgJIEQYYoGRLAiMHT2qwh0aDAwoAfFMaRWHLhQZEHHopgKOIhAwahqKUt0SAga5EVKdbCsLYhSBG7uQUUKAI5dToJGYYkSVDcwA8HDbVdkCukhwAhCT4MKbdtQuAAQZSMFoLiwI+15KwdeItCRWghQjjAhBE+GHEEAj8EUEQQCSA1RIATCDZOOUwcccFoCw7RWVY/GOGhDwFwJkQDFlRggQAHIHFAbOQc4QAKjunQgBKNZVUXA1wBUcQQCSjhwBIdWHDAEkiUwOIMAcinhP8QRH2wpAdBEBCEgiEKId8FHhohwQRGqLjWDxoEQIASBNQAYAIEoEnAB0IwOKNjOJTj4YBdYiBWmAEIkQQBbaogBAsAjulYAxc40IEPE4AwTIEEIpHDAgrU5YGeSrAQBIDkrdkUEh8tAYIPR4BqIKhA2PncjjSSGQQL/glBAAFJrEdgqLB09VWoSJS6AAA7EtDAC3sCKMQNYzZWRKM+cJpssrgyAIQGBcTl2QEJNEamkkmQtIMPOI6AIxLghgvuDxhQEEF8FyDRQLY2SVRAuAyMgES888rrLJjT3RXDDzRGtOSr/Q4xLxADe0uws7kmCKkHLgBRQrXyCaqkEu8CYfFQxRhbXEIGRVCggG28eDbxyEP8kMEPKJ9scsrkBrBWEwUsUEQEBQRBQRA131yAhjJHMPPPPgd92wImXLICAAAokDTSTEegwNNMRy110pY0EQgAOw==",
  slinger           : "data:image/gif;base64,R0lGODlhIgAjAOZpAGRuvPzyzMytlPHm1YQyHMySZFRCNNSifLx6VMyylOyyjO3dzNy2nIR6bJuLcWxGNMSOZPry5My6pL+unOTaxNTSxJyShOzizOTCpMRuLPrixPbt3GNDLPTGlKeSdBwWFODItNTGrNWjfvzqzHlLLPz23MS2rKSelMmihLSurJRuXPzevUAuHIZYPPrixUY8NMqjhdWkf3RkTPHKq/zmzeSeNOy+nMikjHJdP62PbsO2o0ZMblwuFG5INs2zlcqkh/v27J2ThdDKrKWflci+rNK+n5SmtPTTtaiTduzWxBQODJyMc4R7e/THlXxydHZgTlZENuTg17SWhOTDpTQmG/zyzaqNfLWbhYduVJRWNPTStLymjJRyVPzevHReTKyObERKbPzmzLSahPTq1CQSDPzy3EQqJPz45Pz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGkALAAAAAAiACMAAAf/gGlpEhIJEwKGiBMJAgyKjo6GjIuUEoJpCWIJkI2dDIuRAgJEiJGcCVtbaY5aF2EDY7GysAMDFSYVKSELtRu0Y2EXXRNbDq1jZ8nKy2daNRAQDg0pzMrAWl9fFANnaN1o4N7gGxAZNRnoYuHf3RFjFGIOXWXs4uFoFFkt6FkEWRX32JUJI0bbAHDf7oFbQMBfPwJUsCxQCG7MiIK1Eia8d4NLw4/+DiTpNqAMmoHx5iWzt0FCAwsnLEgQEKLCFi8gM0A4oKXMhTFdCi4YA+TeFgNmyJhZmtQLuBJbZDQ0Q8AMBy1dFmgQyu3bgqQfyIhVSobFFnEXxHDxyMWLAi0Y/4oUfJVwy1gyBsAAAMMXDEB2C15wgVAAw5csDb4MjRDuRFi9ABo0eGHAixcTCu2SeWCAw00vDn4mPKGUr5e2BWy0MCPhHgUuJB6YoDD0C5cvXbiJaxCWTAukZgogMGNAHTgtXszI4BAF3AAVty/oPumFjBIzFriY4bIFepazaCo8YGpgIhoQXBpYoYCsXXWlBQRAQGHjQAEIrc9YIIOggBkvJXizRRYeyFNGBN2cUV1YXByAAQIHdNAfCOF5wcED/VhADxq2CYXMbmK9kAUCCHhBAnRc6FBGAkol9cAY4kgghIfJMLZFWP9lcRoEXGSRBQZhHDDeeGbAeEYEKCkWAP+CjFEwlgFZfIFAFredpoAC9v1HIYJoADNXGEeeYZJdFnDwnwIYKAABCVlAM2UDRh5ZRgBBObBNGWVs0E0IOIBhAIYjtkUAhl4YwMQFJ+GJ5wBB4RaGogEIoEABfJFQIgdZEFnZFkiWUYKic3YhhTFhBIBnmh0oYAEYXiDABYRcVJbCGJCeEQAaSIbRhQdfaKEBrRUcgKYCCOiVGIQWGCAAGgFsEMAYzwYgbQBhaFEQVmGMYd+VB3BBBgDgemEEAGbA2WwAAzw7RroahDEDr1gNQIEDBRxg3wMsRAYuuGaAEQK0I0hbqrO6WutAB12EAQKJBTScl16QJQfAEFW4EMa8xWGM0G7BDvTaRRfb2jdcv+DiQG6/DVQQBg0ujBDGxhp0gc0XHWixgLD2ImDABzzwtRdS+YIhQbtduEDDChfL3IEHHigwAwYQZGEGhkv1tVfVfIXw8dZdrLDCEVoo8IUEBSjAQKYXAmeAATs80QMUYDSglwRa1F2zFjU3MYUIYqRRTAGD8cqFA05Y0IADgucQBBI5wCCCCI7H8EMMPty3xCUgpLKFGChorrkYW9yAghigk076FaaTzoAggQAAOw==",
  archer            : "data:image/gif;base64,R0lGODlhIgAjAOZjAPTStPzevMy6pLyKRNSifPzy3PHm1fzyhMytlNTSxPzyzMySZJyShL+unMmihNy2nOzKTKyObIQyHPrixODItNzClPry5OTCpEY8NPTGlMikjOzWxBwWFMO2o+3dzGNDLLSurHxydOyyjIZYPNTGrM3EtOTaxNK+n8SOZPbt3KSelJuLcfz+/Mi+rKeSdPv27HlLLOSeNLSWhGhNLIduVOTm7KqNfBQODERKbO7q5Oy+nPz23JRuXJRePPHGrMrDrIR7e4B0ZIxrTMRuLNmkb9DKrOTg15yUlMS2rNzQrKltSZR8Z5B0TLWllINbNL97TPHKq/zqzOzizLx6VPTq1GxGNJRyVJRWNCQSDMyylIR6bFRCNPzmzHReTLymjLSahPz45EQqJPz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGMALAAAAAAiACMAAAf/gGNjCS0IDwhZDVmGiIlZWR0Pi46Uix1jLGMlX4+Khw+enoheooeMiw9eBINeOlwbKVRUBrK0BrQFCFYCt7OxsrJcXBdfXiQUJAkeYBZgzM/OYl4SXs7W1wVgBiZZGg1HXQwbYGJi5GIWHhblX2Ff5eXn8gVcCF4MDFtdCTkv5QYBDgikkkBDlSFc4ik0Z45KCy9acGzBYCMBOSMCMx5AcmCFhCkBFjIU84LLCS8ytqjUoiJHgQoQNFKoIPDLRwDwzpnTJqDJEi1hwmBgkKDDAAhIG0BYgRTplTBTcOaMx0WAlxBatoTRt8FFDAgZBsyAcaXslioLGHykshDMDipW/7VoYbA1jIAIMYjEGIBigJUrVqZMsVJAiwQC8BiCqeqlg5YvE1V0GUCZshYrVYKG+eBFTIIqVxImLgDXCwAK4TgAjTBAyIAIoK9ordLFgzkrEk4odMb4BxUNXcJgCTNAiWUryAELpiCGRbvOow1YpWAghXAsHwbw8Ot3Ct8pVwZUYBcmgjxzjC8YAAM0aBUYNLpcuQHaivAwWZpnCWPFWjnSD5FggBglnIXFcCodOFxdW0hBHgOK8WaVeh4sYGFQmG2BBQcbDoeFFf6IEQEW70RoQAVeULDBCk8MsEBmEYwg23UHckCAAmJQ8VQCO1nDRRbGEAAYD1MscBZ4VcyQ2f8HWmUAgAUJbJUYM7KUoIEAwcEgoxVdYAHYFSP89YUMI6BwgAIIhKHFTuuIsYEHVjmAWZGCWaFFCFl8UZYVDnTx0QIEdClBclpQYEICNVgVgRULOGDhFF3IpcVT9x14nQSa6aMFCF98UcNJ7dA5RRVMfAGCChgEFalWWFRRRWCBcQFGAaQlwKkXAoRwxRQ9fBAGDpEGh8UW93SRZ2a7DlbBrAXsoEAJQF4QQAddsMqgcMTKBUIBCWjxalkOkKYAFRP8+EUFASiQgAB0YVDtB1VoeKcWGtBaRH1XfKGAAeNyEQCQOgDAhQIF+BCGq124+kWXWnQhgCwKQFaFEwIUoMDNwFwAQIAXIgBQrgENBHVWpAIAtYUWAihQLhdaYNHFxcJMEEAADXCcRAADZ9UwDTZ8EcLCN3DAgDADA3BwAFQQHYDGX3SMMxdehNGFF8UGwUC1WHgRhcwyP1UBF1wvvTEBFwAQABRZYOlupBB1gYEGi808cwRheOHv0gBk4EACTTt5AQMCAOBFF4QTDsQJJpgAQN6Lt0PA4nlfQEAEY1AQQaMEOEB1FhU48IULBGQhgiIOZG76FKWbvoALggzCaaeww+5F7LR3OnvsXggSCAA7",
  marksman          : "data:image/gif;base64,R0lGODlhIgAjAOZcAHReTFRCNPHm1ZRyVMytlPTStNy2nMRuLPzy3LymjERKbIQyHMy6pL+unLx6VKyObBwWFMmihOTCpNTSxMySZIR6bPTGlPzyzPrixOzizPzqzOTaxNTGrPbt3PzyhOzKTOyyjOSeNEAuHJyShODItMi+rLyKRJuLcey+nMSOZHxydO3dzPry5EY8NBQODGNDLOzWxKqNfMO2o4R7e2RuvHlLLKeSdIZYPLSWhPz23INbNFpMNHxTNKltSeTg183EtJSmtKSelIduVGhNLHJdP8ikjNK+n7iETPz+/JR8Z/HGrJRePLSurPHKq9zClNzQrLSahNSifPzmzGxGNPTq1PzevJRWNMyylCQSDEQqJPz45Pz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFwALAAAAAAiACMAAAf/gFxcEwwNV4eHBAYNi1eGiokGjoeGVwxcSIMJUYmUDJ0Gio+hV6KKBIdQXBtFEhtSAh0CCDAFGVRUK1QCuL2xvb0rVQVQhq9aCFpaBQUIzltUFh0sytXW1gIbBqFSCFvfMiEeCFQeVVtVTt5a31vs3+/uUhxXJQLvAgcHRyHnUlVUPkho945dQXcCSFiS8g7HAn0HPlBB4EFLlQ8CCLZzR1AABwMyGG5BAMCKvhAfYEwgYGOAFSgbDcKDR0WCpXtbJizgoc+KlQEUGoSgECLKwZkcWVBRYqiDNwNZFkgd8EGDMw8TjFDIEFMjQgkGGGD4dgVLFpNFBwwAECAAgAkz/+PJTVhv1hYSWcxmmTIlwF6fCTZyPKisAz0CVFhs+bEgLxYHDihEoHDCwQMqSDNvUUoirMgJU7BAcLHkAQUKUaJQiME1rmstAlA0YCDgAowKD7DoNttiAd8UJwCsEByPJr0SUqIMmOIAwBTHol1EzcvAncxq1hOGiuCgB4ABkHWY3a07S4Ucg5UNdkeFXooBKUw4MDHgQRQrWfL7zB+FCvZr1QggAQEPAAAAfVaUtFx+U0DkwAdVZJBBQTIh9FEFWQTA114vTFFDXlNYcYMVDqQAggdS+OBfOwhkMEwGEjCxnBUPPNBCDc9lmAUEGUrlkwNRWGDBME9AcYIH9+Ewwf8VDtwQRQESRAFAh2dZQV5+vi1gknx8UWAFBFgEwAABaqEAQhQP5NhCX/m1uVubfp11wJsJXOFSFCA8MEAALoCZF5hCoMlWXoRmeEBobSbAAAAqPABFc/kFUJ5uAUQRg0tubZCApGf5NsUOVqCSQBV2shVAgqIRigUAROQIRQ5aUDGDCFm8YJIVFIDVQBUCAJDFEGw6lpcIMThXwRUaUHEBAhcAYJaWBxBg0xVVcMCgX7uBadYIHWRwgbIXSLEsA4RaEcUGKISyqbbj5acbmBVcEK4GGEhhrxRUQBHAAAxIUQAIdkKnbRYKjKfbCALYi4EGUix8r71UVNGETb6OJwJ3ebvRWkEVGFTRcBX0chzyP/8uWmjBBWchggIo0zBBFTDHLHPMBVgQxQpQ+IqyAgRjwfLPFVjATM3MCE10zWY+MMgJSagARAUqjEDDCCpUMEMFI9iwSQRRcO1112BHoLQgG5QARQIJBBEB2mwnAMXbcMct99mCBAIAOw==",
  ram               : "data:image/gif;base64,R0lGODlhIgAjAOZRAPTStJRWNGxGNPTq1BQODNSifOyyjMySZPHm1fTGlIQyHMi+rPzy3Oy+nKyObOTaxMyylOTCpIR6bMSOZKqNfNzClPzmzMmihKltSbSWhO3dzIZYPJuLccRuLGNDLPrixPzqzOSeNPbt3Pz+/L+XfPHKq5RuXPzyzKeSdMSeiEY8NNTGrMS2rPry5OzizPzyhEAuHNy2nNK+n+zWxLyKRPv27FpMNNfPvM3EtMytlJRePHxydOTg14duVPz23ODItIxrTOzKTLKcer+unLSahMy6pLx6VPzevFRCNJRyVHReTBwWFLymjPz45Pz77kQqJCQSDP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAAAiACMAAAf/gFEjTERMTAWGh4mIhogpio2JhIJRTDkAAA8PABqZnQ8znJ6cm6WfmBdRRUxHLggiCAMMCAwDsbCztQO7sr28CCWEDQgITU1OxsbIx8nNy85NAzwQRD/FTtjZ2tvZx93YxgMQTCsD3tsj3Mjr68zYLQNFRBEfsS5HMxEVFSkHRAUHGnA7Bw4ZghhMHJhIEgCJgg1PFChAIiCAxCQEC7ZDZkEeiiRGQhoBOOGCgQI0jCTBcAEBMgbnCDZBIA/ggQMhQRrpECBAEiBJgh44csSCD3dNaiBrIWKcyAAbjBzwqTLoQiUbAgioaCQBCAZO0jmpEY0aEQMXcE4oEBIDhwBK/5IoEUDgCZQneAOESHAkG4MjIFgktNhTB9QkJjAogSsAimPHeJ8EGJnghBMGQRrIOGsghIEEADEExTq3seMlkPEq6OA5QQIDI4lMCLlhq5LIuAmghqL7buTVIUPM5kDk9mMPt5dEfgz5bmoYEQPw5CmBiRIkkQUoIcActfLdT1DjjihRq4MUPZAgUYFksV0oS7indm5XeWQYDp94QGEdu/q49TH3WHh24eXbeEgUggR3+imhBHPhMdjcewSOp0IhDlz3RHtJ1CffgOApdyBuSBByBAMiJHGXDY/tBt+B9D3BoIhLKEFNBS/I8uB7LTrWG4UiFngXAQ5UwAQFrr0AAf9eWyHhgQAeUMQjfHU51xwSAKySRAEmVXDbSgKoN2VvAp6GlwNHDJFBEhJMcEABt4U5nosCesegAEkkMI4EStDgVgAb4uYcmYQO+B8ABqzpYFyNBYqEd2XyBqGIEhyx51zrKSEBERDIcIMELT6RBKQvQljBEQUQkYQABmZwwgcgnGDBEYQwUcQDoDLHXXxQlGgBABf0V2AFsxJ1BKwfWJAsEWVqKgQ5R5QAWhEdnkkUJkcAUEK22QJwRAw7yKUEK8Zmm0AEKCzQXxJFRGBAAw24G++777p2rrzzzmuAP1EsAIEDspFAwQEOHDBwBgYjTJwDGThQAAUTCBwxBRwwEcUaxQtkXEQRC6ywQBE4bPwxxxuzIPLJJC9wcSAAOw==",
  catapult          : "data:image/gif;base64,R0lGODlhIgAjAOZSAMyylPTq1PTStKyObGNDLPzmzJRWNNSifJyShLx6VMytlJuLceTaxPHm1dTGrEY8NKeSdOyyjIQyHMy6pL+unPbt3PzevMi+rPz23BwWFNzClOzWxO3dzLSurMikjERKbMmihGhNLMRuLOzizKqNfLSWhODItPzyzPrixEAuHNy2nIR7exQODNTSxMySZPry5IZYPJB0TNTGxPTGlNK+n97WwZx+dIduVPv27NDKrLKceryKRPHKq83EtOTm7OjavKyWbHlLLPz+/INbNJaOinxydIR6bPzy3LymjJRyVHReTCQSDGxGNLSahPz45FRCNEQqJPz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAiACMAAAf/gFJSTR4gAIcUh4oKiokKKoePjI4HUkJSSAIFAgdJSBoMHAENFQUNBQGoqqmsBSMWHACDExYBAwYGTExKSgNNDEdOwRjCxUcYw8IoAiUDAg0BTAYJuLpPUAYWTlFO3dzc3uGlSBAbFTlQTAkuIklJBE9GEVH09dv29kcNSAsMDU1QCKhLEKJDCSNNkgio963htntOCiBpIiBAgCQSdBmAogQBAh0rDmBwSO9eSW77BnBoEGVEEibwQjCBEs+Ikh74IDaMcqSAAgQ8Kmw7AmRmOiXXoCxRMpLhzocRkZDYEOBFPQBKoNCUpsQAgQMnTYrF4BNBRZNRAiAxkDSdgSZO/0kO3devwZGT9CoAGJAEqYQkEdDipdeTAgkBQgV/C4ZgSToNd+OWdDJCAQkGASIzRNvhCYKECh1o3izRbIBuThjMOAFxWwsjR47IgEBAiQaLCpDEPuKgAIUFVCNnRQLuIYIJDpQkGcDkiYGOTYwAnpCkSRNnAXBEMbEkQ42H9BiscHKAJoGM8KAYcUC9iQMKA4CfDvBgCVxw9BB0iILkSUZdWj3xxAcIGDHEAEhM9EwURiy1WRQbwBYFA80xEcITKXwwoFJacWQEBAxY0MQSSxhxgAYtHLAQAh6cUAEHStRmFE1akdgdR00oYESASogwkwQHbPBZbUh1NdOGbSn1gP8SCyRRozQJEMCRC0kU2JyASsAEBRITZNUdiVp1xEQGjnWVQFbqcOQOEw880VV9HTjhQ4OOgckkDCSy0Fc7ASWQwQMwCQgoUksMEEAUE9S41XILEKGUYwkoJQ2YSWHY1gmJdsjjADZEgMQST6S5hDpNJAWmUaACUCOYNDEpnQJK3NDVVgksQKNjWwUo5ROOXfNEbQUK6B+HNPnaprC/CtihQEHAtEt1NhWxREa9FotssqEWax4TKejCRJUDrMerBCRS4IAGExxiK41PPNChm+7sEMNRTSghrmMv9YaCBRagQAGuAZKYgYoCMFCAByxwZII7NCAV6hMaCCCxxANY21xUfVAAYIHEP5T6RAkX5HZAuO6YGMEBB5wMgXQLDACBy9KhfHIEfA1wgRQXXDARCNaB4EsTEFhn3URCNwGCB0IH3QQSJgiCc9FQE710glBXjcTNUgQCADs=",
  mortar            : "data:image/gif;base64,R0lGODlhIgAjAOZSAPzmzJuLccySZOTaxPHm1fry5IR6bEY8NGNDLO3dzBwWFKqNfPzy3NSifPbt3JyShOzWxNTGrHlLLMi+rJRWNKeSdOzizMS2rLyKRPTGlNTSxOyyjNy2nBQODPzevODItIQyHHJdP8SeiOy+nEAuHJRuXPzyzMytlLSurPz23L+unMyylOzKTOTCpNK+n7SWhNzClMikjPz+/OTg1797TJaOiqSyxNDKrNS6jMmihKltSZR8Z8O2o83EtMSOZPHKq1k9KnxydINbNJB0TLSahMy6pPTq1PTStGxGNKyObJRyVLymjPz45HReTFRCNCQSDPz77kQqJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAiACMAAAf/gFIyEURLSyKGiTGJjI2HjYJSH0sjR0calgOZm0cJnJqdRz9HESNShS0QDgRGra6vsEYOTAwFTLKrAB4rSUseBEzBUMLETMPGwRYPvUXAwQUWRxVLAAxQ18PYyNnG10tR4CRNCddMDhAB1LMA2e3Y71AFTVFO4FFH5QQQhQC3EeUAt72LIMEevRv5EvQCUCBBhG7d4L2rAK4ePXzDjEB4sARYERTWtLkzMqCACwT1SNjTcK0AyQXUCqCwYUIiNhMBohhAEAWJE589/w3Tx7HaAJY2oTAQ4oSCEnpRVEI1gIxAgnQAHAywEOxIpQLYiICTAAKqwScVqiaA2a8HhAIl/0CAoBAgBRQjPA1atPdkSTmNbAus0KChqRIBFFRASYHkSRMDBwwaPJGwKIMGDn8GUEKBA5QZTp78lNDEyc8nqKMssVbgHNYCSwYMaNIkCYcKPKAUifLEnpPSSGj/flCDAROrC00QsQBgHojgFqBw6C2Z+gHTSHYYJ4k1wXImTRTwXmLMAHXJURSgRh3EGEl+3q2JQN3EuIMmqcH13g9OfJF450wDAA4NuFDEA00cUNsRMOjnBAdD8MdfFB9AQUAGHhRyRBJJ0GaAAaE59lQFESShBAapSejYER4o0UA6LSgxD1Sm1ROaAUYoIYESSaznI2onNOCEEhxZgIR+OjmBwP+RvEVh4gYCbCCjElQqUYKMAfggQAwBEAEAEU8oSBuSTSKR15JORGbjdeAcQEESBqjw1BIPgEgPdeJFQVsJUSrxhHo/PiHBAibid1qTTaZmWgMmHhZoT0oQ8WIApd15Hm/q6afEEU8FB85jSWxWGgIPEDHPEx3kqR9qHejVRAYCZPCiEkeu14ETRBDRmGhNAtqbBEsCcR0C8/C0nnrISvBAAwYkul5FwWHAQof6UYCBn6j+eAAROTT7LD3DmtYEBgJgcGRwhTZBmplIBPeBqTVed91PafrUhAALhIAdOEg0sEEGLGSwAQwNTFBEh7Q1MaXCCYdwGL60OUxBEzTgG6o1DhgkIcUEE4RKRBIfv5DECxV8TOjHAhBhsckcrizFyxx/UEQRBtM88wU351wEzjvrPMHLgQAAOw==",
  gyrocopter        : "data:image/gif;base64,R0lGODlhIgAjAOZcAJRWNLymjPHm1bx6VPTq1OTm7LSurJSmtNy2nNSifPbt3OzizOTaxO3dzMySZPzyzMi+rGNDLPTStPry5IQyHPzmzNTGrODItL+unKSyxMO2o+zWxKeSdMRuLMmihLSWhHlLLMSOZMikjPTGlCQSDEY8NJuLcdzClNTGxKSelPz23OTCpJaOivzevERKbKqNfOyyjKicnPHGrIZYPPrixHxydIduVIR7e/zyhLWllOTg1+y+nO7q5MSeiNfPvLyKRPHKq1k9KrCko7yqhLKcetK+n5RuXEAuHLGrnPz+/Pv27NbPzJyShIR6bMytlKyObGxGNLSahMyylJRyVPzy3FRCNMy6pHReTPz45EQqJNTSxPz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFwALAAAAAAiACMAAAf/gFxcEBpWTghOUodSGIoIUpCQi42MlVZcSYMBOQEBhVagVo+Nh4mlUoiliFJRgzknCwwXWhIPDwRUCwJYAgoEvQS/CsACwRUNEgFWCRsVE1QEWhcnLTgNFwYNuFQTz8UCsQ0MFhdW5RBSCwoLVAVUVAwfADYdUFNPWhta+/zk/PvjnFx4tuWBAh4PqHCg0GGAgwEQLzDQ0mABAQUKVGDZuFGABFBY3k20YAEUExBZpowoEmDXli1YYMbc+HKCAhkQAlgoNIsilZdashyxwm6B0QkvZ76U6VEDggUNOC6NWQBKln07Eh77uRRmUgE+rEgRgBSLgSFctzSIAEXLFi0J/yS8M0ol5lQsCj5ieDDzyg27W6hAqdIAaJQTD1SoFfDT7gQCFqTkdKsDhJWuKgbTWKogQJQNVGz94srroxMAWTTIMIFlgt0CbAFvUWHFxAmNBB40YIyFwEcETapAYYFkiYZ8WwRAubIhaVIrTJxEhfmAAQMdQMTyMJDhyhUmL5g0YWIAxBUGXZcyMBAgRIITEghU0ILTSQUqwa8MvhIhi/8rCijh1UwKWDAFADMA0FAIDiSggRRUiJBFFS6UMOGEVWRRQntjbTEBA048EUUAHQAAAhQRUADAAAgcN+EVQVRxRQkkkDAhBSoCkMAETkwxhQEbFFCAAVP4R0FKy2wwxf8VJjzhXYYXZqHiAPcEoIUBIgRgAAoFTDAkEz5CMMUHVkDxxAcJZFhFCVBmYdUVBgiJwj4GiNdEBge88IEIVgBQBRNMPsGBf1VAWWMEAEwxpw8FaJGBEAccEMVy+GgB3RRQgBDCEyEQWsJgIJiA4xON4hkpnuIxQQAWFXxkBQMDNDFmmhjqN0ACLDCxj6kHMAEoBQHERMV8EGBQAaBXFPCBf2w2AUUIUzAhwgpOxHAAnilc4YIBDjjxTgUrKPIABhMiK+MVTWQBAgwJOPCEAx/E0MQBPTShBRZa3EoADeUgsMET/VWRgbNPTNFfSk/UUAUFU4S3pBUKiDSAfSdYgQH/EblWYQETLkTQBAsiXEFCDS80ccUMA9TSoz1avBPFFFqsYMUTy+nXgxYEG/GEDVlcMcUALSjwUAstSGBgBA1QYcEVTsjMxAEpjIeufgU/gZqMEXSQwAgO/EADDuBC0cQCWlQhggRSWKHFnFE34UKiPr7IlnADjODQCDAg8ERKB0AhxQhWxNkoCgfI20QNAFwtgAFwVkGCQwDAMIIT6UKBmhM7QBCFFkI2WgCeTQAABQVmMoFg5R1EYEICS2aBaAceJKB5CimwF4ADDnDwhKBMWBEFBQPIGAKVljcRBaA3hJ7oIBxM8cPuIzbiQSQe6D4ABw54kPsT0ycAiQf3CDKIEhWeeRDF+eij75ln6bPfviCBAAA7" ,
  bombardier        : "data:image/gif;base64,R0lGODlhIgAjAOZTAMyylJuLcdSifPTq1Pzy3PzmzBwWFLx6VNTSxPzevLSWhLyKRJRuXPzyzKqNfOzizNTGrBQODMmihEY8NNzClOTCpPHm1WNDLKeSdHxydMytlPbt3JyShPTGlKltSe3dzMSOZPry5MySZIxrTMi+rOy+nLSurMO2o9K+n+yyjIZYPPv27MRuLMikjOzWxOTaxDQmG/HKq83EtPrixNfPvODItIduVGhNLNy2nEAuHOTg13JdP1k9KpSMfNTKtfz+/HlLLERKbIB0ZPTStIR6bLymjMy6pGxGNPz45FRCNJRWNLSahKyObPz77nReTIQyHJRyVCQSDEQqJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAAiACMAAAf/gFNTEEaFhSckAIWKRidGjBqGhieKPlM/U0UMI0wMTDZMCgJLpEtMoQoKpQFQra0tGksAmUpPtrdPTEsKoUxETkSnvU9StlJHCAVDAiRQTzBS0dBRB0xQ1g5OTgweDqcMUlHhBiJNGx8lPc63xcRQS9cZHtqtI95K0U8RTwRNSANDHLSAki8HMSlKPmWA8svJvFMBjkR5MpFDE38WXGDgUKFWsWJRjvjy8OsCMCieCIaD4gTAxRAbXLDiMOBItInFiDAgwtLJESgjgjmJEiVhkhoX/w1hksFJBin7DkZhuLOptpTFbEYb8nIADQdQeERJsqQGk2gIrTUUcs1JEgUP/wawOvIiqYWlrlwiQZIinBRtTnYAc+sEQZMXAhYoOfIg6QAErKAEECGiCIQmH8JFSHJkgraQGwgscQKlCM/GGJf+AgBgwYEFTBAoIZqEcBIDFRBAUQKFAhIjRS42ITDAhQNSDwggAIDBNRSJf7VFa+WECWoAJvz5A8ikSBHD240EYLJA8ZEkN6L3Ft6kCArhISxA9i4jadIC1kAQnPCTCIIHEPSDxBIyIOEPEhsspUERRmi3lwlEqPDEEU4shk8UTUmhw0VLvGcgEhZ8hYNl2q3AAVEobmYTikQ5QQgRDR7InSLgfQDFBElAJc5YQ6F4jAFESfHBXkjENx8KEGwAgP9EuyVBlAHhDCVFK0lMUMtmS6CGhDJMAKAABweEMxUItwUpBRDTHaAEkEe401gIKzQwHxFiTpljkOJIEcRZQC4xmzhPKPHAXsQtpQA+UNyZYxJMSBldBERBoQGULCghwHAEEPDBEAFgYMuFxxwDxQVonRUFkBNQgNATUAyARKYEcKnBAcSIk8StSriVoxR0ouhEpeEsEVqmDRQAQXcV4ELqTVBGUxuKE4Q5VhENVDtAAwkEBIAAPz1H0Y5HiNATERNIQeu3fxWwwgADFJBACQFIAMFuR1ywGDEwKKEECAsQ0eYTJo0TzQvVFuBuBd0JoAKiB4zAQC344HMBO074JY6pEQ3MYPC7AQhgRI5KLOAKFOdSZAxap+ZpgsHuxoBwEUNQwBNvUHjAAMn42HLEbJwRBWkSMbg7Q7YIL5HCEDHDAwUL5DGhhAoULjbWBETc5gQFCWSdbQcCCCRBBx0M0QEAS4jMRAC86fucFLdeXUQJSIs9RAUpBDCLKQJIkDcAEjAhgQgYgBB4AAdIxgQGGuQtgOKLdyfIFCSUIjkpRZTiXeWTT14ECYIEAgA7",
  cook              : "data:image/gif;base64,R0lGODlhIgAjAOZeAPzmzMySZMytlPHm1eyyjL+unLx6VPry5JRyVNy2nERKbFRCNLSurGxGNHReTBwWFPzyzNTSxMy6pJyShNTGrOTaxOTm7JRWNO3dzPbt3OzizOTCpIQyHMmihIR6bPzevKSelKSyxBQODPz23Pv27Oy+nGNDLPTGlODItLyKRMSOZKyObKeSdPrixIR7e5SmtEY8NNzClIZYPJuLcUAuHMikjNK+n/HKq/HGrLWllNbPzOTg17+XfINbNLSWhHxydJRuXKqNfLCko8O2o/zqzOSeNOzWxMyidOzKTPzyhJB0THlLLKicnM3EtKltSZSCdMi+rPz+/PTStNSifLymjLSahPTq1Pzy3EQqJMyylGRuvCQSDPz45Pz77v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF4ALAAAAAAiACMAAAf/gF5eKBJZBVmGiAIJAoaLiYeIBY2REl5RXhRUU1mMnY2Jn1mLpKSMnllVXlZUGxoArxoDGhkkXF0HIwMZVr27vcADVhgfUjwFVFKzFgcHXCRd0dJcFVzW19jXAxgbVAmzDBIRFlbSXRYSDAwY5rdd7tMDJYgZGB4KDvgTIBMeWAsTKkyL5u6WQS4ZpFARAIDLjgkLtmzBAmOBAgVMBr7TGA8HFQkNo+lY4GDfCyoTKJjbyNIgQSsKGcLjp05CuggEW+bMecAKhQLfrkQbQYUBFAqEvA1ot5PluwEKs1gZ8W5CgwABpmDFKsXaRnjwXmpiKFSHRCxTCKhNa0XgSrDS/0hATSCVKgiJD1QUIXACyYkkUgBodHmlAoYKETwWACCUAZYtCwwYUDFlBlYDDHaCJUDByoABG3JIFZrFwJYLCBA0kGhCNc6m0bKslXIAwyjGXSQ4+IfgggMHWxosQPD1nVcrDaZkoLxhijcrQkeswNJAsgElCI6kCFDuGssCWzh8niJlSg6Zt1CY6GEgLYEAKQisGPLVaxcEEzlIkYIVUcguVyyABQIBEJCCgFg8kEVO7lyxWn4qbHBDDVk0dACAwDXg21n/dOfMAdCgkOBjEnEAxCGM+cTABY9RR91uVLzTjHdViHAWXg1QUWFhWjBQggEPPmDjFgJxcQUXFx5Jxf+ND0iUI0MavKCFFhFEYABwEm3hghVGXuGll10suYWQWZrQCQAhTDllBGlqocCUIUSww5dfcsHAmFmOucAUBRihhZRqWuCmmlrECUEXh0LgpQ15NrkFAjqCQOibIbRJqBBSWAEBBJpeQYFEQ27xQww1VPHRlApgMaWkhD4hQwCMDcApBAw4+oADIJVQQIFTTGEAFqqmyoEHUx4wAVoQALCpolVk6YGmH3STlq8K0PAmDBNhwcAtEdBwwXYEBGYFlhNcQUQLUpRARQcEGLDERG9m6cCHXbhwlgkXxICfCFsC0EIxBNQwRQcXIPjmYwtYgCQJB1xBhQcwPIDFdJDF0AJ9AAAAnEUHASDQRLVbKMABFh4MoLAzu3xQgg1ZIOAAAgb4IMUHN0hxwhSsGOAEBQs0IIMMBnCAQAQVKMyFBRXst18BqCHAwgn7bUDADF5EMEMQVRgwwVYsGEBFJIcM3GsHK1QRAAtja8WCIF7YZioVVcQNd9x012233VQIEggAOw==",
  medic             : "data:image/gif;base64,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",
  ship_ram          : "data:image/gif;base64,R0lGODlhKAAoANUAAPnu0KqMce6kXK6nk3NeT6h1SP///W4xEZFJHalZJpWIdYtrU8K1lrVjK8l5T5tSI+RmNqqbg+TculgqEot5Z2I6KP7+5LWvoIlLIVIxIHpGJuLbxXVIN7WEVpVNIJhbNP6NjJlmPsrApDEWC+DTt4tUOcK8qp2bjtTKqdh/fKNRHdTMtahgRM7Hs2JLPurhwPmGNoVaQ1gfCX1CGn9LNqN+Xm5ALNza0/16ftrRsOJ/W3xQMebi4IZQLcrUvu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqLT4UkynEpqkmMtdlaQDinRRmCOob3Igo0RuPIN8qya+IpRBXM43iKYiDAICLz85ChQmfYt+UywQMAIpMQs3jIw3Ux0qDiA4KT4Wl4x/UQydOJ4kFqyiowYtUwEgnp8AAK2ujBaFUCIqHCkgEDIit7etu15QAQgIGh8HFQEbJCQvL8i5rMtPNSMHCSozBzsrLejn18e32FEdIyPOEyMTJi0i+frpLSQDUgEeTJhgY+CBCyYSJrxwYcCAEyciMJDCIMGHDBoOyJjAsGNDiIgIZHgwMUqJBhoqTNBQo6HDhydCuoix48CDAAv+OVmgAkOH/w4FIoBUQMDFgqMFQnyYMeEADBYBnqD4II5FjQA1koaQMYLmjkENEjSA5EBHySYvSiD4EKLAzwIWP/T40CCsCrENbFSgQActgQoPEngI0aEGOQ91H8xYvDjDXl8E/hkOLFecBw3OPGj2MKOCjVJNBijYkoMAhR1hMQROLDaB65QlOqRZIiGCTgYE/rygAfgBht+bfSOwYSNDDAcdcvQtIiKREDO9FriIEML1g+sefi+uUIKGgwgLykYtgoc0gQhCshAYkiNQhBohgKuw8YEFi9csBDigUAN9APQ/MFABgCJUYEUSLzAQQAgalMDCbyEEqFR+ZtERgAtpkFBDDDo1UUMaBx7s0MsPLpRQggPjLbDeDyLooMN4UIi23AAc2MDBAj8kKEQEZQFYx44KMLBcADqwcNaPSdTAwmxINunkk1BG2WQQADs=",
  ship_flamethrower : "data:image/gif;base64,R0lGODlhKAAoANUAAHRELk0nE6mNceufWm9kWJhrTmcyFWc5KPsAAFxekKZaKCgSB/qMjLqskVgzIvlvcNLJq8lmKY1GHLhtU8SylnMJBK9cRZB7Y3g4FIiP255UJJROIbCfg9KckoRHKopjSIhKNBMJBZVYOHpYPrInETMdE8+ETI0DAqtOH+HYtpyVnrddK0E0KLIXBtx8NoZULn1BHEIeDOnhvv+dnsa9n/S7bf9/f5RKMRYQPnp6qyYhJcdnaWFNQLuyos5DOu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQalQlS1KptoMqpINmmq5MpJ3jgMBKSK2dyv4uOoFIbVe7EhcAqhXRYdkIyXTk4ISELCyUxDhQCAoIUBQkJJQYwHiAAAA4XCAgcdgIoHjwHJAAHBw4BMT8WCBajKBskoBUOBrsBNBc+s2ofMAcYoCQVJxUBASAWExOiYSIBu7fIyjExB6oA0g02HYFPKxIxGAYYGMm5nQGMND89DzM24R0NThcRGwYB6ihWYFDlqsSCCxToPWBg44GFHQzSLFGwQkSBARhFrHKgLQYBBvRsgJxxQgeLDzsiLSmgIMIAFy40ruIGooNIBgwXnghRwiAP/5VKGmxY4bLGAQOcQNwosGPHwoU2WrCY+e5CkxcaNLg0UeAoAE0BWBgo4ONBCx4jRrzgdGBEExobYEiQ4GJAjQK6VDlwcIAHjBdp9R7wMOKCDCYXmGFAocBFjQEfPGjYpIrbxgAHNABVImNPgwIwSsBYscGFCQUoUMDI5IEtZhE3VkhLwuGCNAFTN2wIIIGxgg2KYqQLsAiACBEWnuUzwuGD1R8QCDz/8M7Aiqwb1PnT5m8VgOQWQEiUF1nahQtpBPwcFkEBdt1yI6BgNtP4MwEcIFwYQeBHZ29C6GeYEL68sIF7WWUVgQT+YHbAVCBMwEpa8XBQAAD5pCDAB/EYQV7BBZG9J4F2GGwAwAhsjYAFBAU4J8QFIjynhIYjrCYXBszQZQIHp1AgxAcjxPOZi0+k8NkLcmkw1wom/DDOIBcUQMB4URi5oQci+GiEACNsJsiXYIYp5phklmkmEkEAADs=",
  ship_steamboat    : "data:image/gif;base64,R0lGODlhKAAoANUAAGdWSJVtT8Kykah3SjUtJldSUfmvd4RUM82OV66jiK2WddbNrGdIN2czE/nIdHlTOnZubKtaKraEVVQoDsxlLceiZ7tqK/rKh5yMc1dJQJVnQoFaRIt3YsCWYZdPIP/rjXFPPGthW0syIxgSEeWbWVQ6KzgcDIw3Fv+mTDw4NueCON/WtDklGGQ7I2ZHLnM9Gr6kelxAL+KoaHxGIREXHEItIuffvMF+RevjwMq/o5p/Z0dBQIRgPSUjI6CAVO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/QMHi9wusiMikcslk6gQcTsvWrFqZthwEdMJdv+Bf7jQMm5vPs1qJwawUnMTaLKBQOCmCfA5WTBouKT05ZitUZgomDSctIgJWCwIwCzAdhGY+ExMeDTQvA5dLFRcyPgEae2EzDSaMNJoNHh1HSRguIgw3DhcKYTkTLzOBPRkPGQyLEkk7JSAlDBcfBgKhVTAmBzcpGSEQEAUAHQMRMD82HDU86i4gMjIdqVUCMy0tBCk73RAbGdEyCit0sHjwQF2JGC54xGuyQIUDBwh4+MiQb0sNGNIk6EiXIQXBGhJI6PiyYJcDGRIGuDDBIkUBDgwwyDiwgcQFAxkItGARICKY/woIJGg4cACBjAEHXOR7AACABhkXLmgYwYJFCR+gvsB8MADBwwsObrwQUeBbgWYaQIBoxEKEgQ8VDjXBoRbEhmgnEdwIgQHCjr81RNRgwaCDjBgmFH5RsCEljwAGHsqAkcDv3zyCaxQIAeNChwBgbIBIOSDAjVJ2U9DA93cHN2/eOMC4caOMFQ4DeDzosCEGDwQDBPfAt1mftwIEeoyYgOBLgg1EA/jYoFcDCZX3uIXYDiFnDxojTMhC4mWJ6A0Hp0uQoPshAgb4MmzekbzHgbQTIkhQcKMcEw69xTDdBgNoUOBbDujWVE4EPEDCSRrM8IIGNwxAyxI5NNaBBGpB9e2BBg1IEJYFJJaoAm0FblAQCAsp8VwFHdjlQAWVAeNBBBHciGOOLjDAQF0xhPDDhf+tiFAMRAjgQjAz6IijB3WpVcIIOcAwjRUBqMWAgRggkcCSL4QpZo8+ljAQCQYYQIJcSySQwwIDkKCAbUQk8ECYDeTZgo8MxABZmiSg0IFz1SixQAB4tqBlDHYFoIIKKKDgHx9EHOrBDFr+CAIDEdCGwJWUIiGAblESFIEFEfwIWqi1qFjXAXZEoNYGrCqRoasPRECBrBtwUKsSK/CggQYAvKHiBr38qoQOXNYZQKHK/iAAZC1GqwQMMlh7RhAAOw==",
  ship_ballista     : "data:image/gif;base64,R0lGODlhKAAoANUAAP6OhqQKCnBFK/thYf/7+z5Fq9DGpvsBAdadYpuHb2xcXJJuT7mtlKZZJnA5GTEUCgAAgLZzTn2H/GI5KshwNYxIHa9gLFgqFPrIxp1UJb+4qayagYhhSs0CAlEvJVkIA4uRlH5GIt3UsvtCP4J0aZCIv83JzKp5ZoVWMo9RJrxXb6JQHphaN4JPPNM2N55wQZNGKujw88srZHkID6hYRSkeW5qpr+XdurXHzOriv389OPsbGZhZYFFAReLX2+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqFN4Xm6szVIAUGV2kgKWazQk2lEY2Fos3psMMQdqOYCpOzijQGBjR1BAAHB3Z4eltUJxYrFiUydASFlAQHAD48VSwVGSUSEocjlQMHA5aFN1M3GS+hopOIlYd2mRgGUyIICAoFEgUfpDExpwMxeLlTBr0oLyQ9IYcdGjhzLjguLhtuUgYoKBUvERMTHegbNjwBMDYBNCdUOc8VKCkOD+gdICA6ATpIzOAhr1W4CxNQ5EMXoB+aHj0+9NBFxEAfJp4uXBCA4sKHDgBBKPjwwYOCDaxEGJDTogXFJQsyrEAh4MKDGR1mKFDw4AWC/wwLNiQgBwABjQROGJCoQMHmgwcTHLR4EaInAg7kWlzQEeHFAicGWjDI8eKCgwYsFrxYKwCqjgksWDzwoPFCiBMINkRghaSFAG8JHKzI0GBtCx2IJ3iYQMMnzQgWLDTIwCLJhglihCQQ4MABjMOfaToI4cACiggUUlsgHWKDZaQ/VhpgIMCcYEiTG1CwUCHE4NwhBOyOgMCAiItE4hjf4JoE586/CUvv/Ym0ABYCQkROYeFE5hsMGBhIkCCHiAQWW0Sd/FtyhgrwYQiY/+OGG6UaKmlg0G0z+gRiKKXLBingM1p8pGnkAAocYLFBMT5U4sMfLXAw3gL7ceDaEDls8GtcZw7UNVpaQhhQCQExoLgFfwxoqEEELDBSRA4JpDBZgTg2YMFX9fnggwkmaAACIzQycAINC3hjGQvsRcfjDwzgYAMImRGxAQsbNsHAAvGlEAIgQmxAJXJjzLaBLuAZ98aabLbp5ptwxqlEEAA7",
  ship_catapult     : "data:image/gif;base64,R0lGODlhKAAoANUAAIlNKK6QdLShh8OylP379nBKNq5bJrlkKXJjUB4WD65yS5RtUkIyJ9NpTNTIqOLYuP6ZZ+h5NVVMOWA9LPaFOtOCUZ2IcJJ4YcVkJp4zJ9Slf41bQumTW7SEV9h+OnY7G65/Zt5sKlcxG65cQceXavB0T/28uMZ2NsZHL/asbMZrMalSGv9maNl0L8J4Xv+Lj9tEPZ1TJp1dOuvhwc1uLNJxM8vAotunYf9/hP+sSOC7ire9wXRCI+q8nv9XWe7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQ6DZwc1GinFchCAxiS9znAdB+Ox1g5U3UqEUpIvEYqKIpOhxap1I8XEwNCA3ccM39EeTgmLjY/JBViDwKDdQoaLCYwFkIPAQgTDAqIawKaPhkiIy4yDAyiBQJrNi8mLBkSryIbMiMVIwkbaxo4MAASBQUfPDwVENAFDJZUDjAoBRIfAAIBOgsiChApEL0dAwKPRTNqSQIGLQcSCBo6JBYXFhMTMgAjCws+xDigAMSQARRy3Gh3RMABDCduBMg3YIaDUK8mKNChQYYMFxUK2tgQIQQFOkg6hFjxkMQABK/mIZgp4QAEEzNmaKgAwiGF/xgxaigpE0PFwxMbGEhYKmHBhQ0BQPQgQDXAhg/wgspQ8qCZ0QMrVnhIocECgl+yCGjQ4MBCRhEfQkSgZkTABhsDDAjEcOBhCw4VmDFAIGBHgQSIEVxAYCDCAiQz8CECtYAGgA81aGAIa2AFjwUeYohIrCFFnAOzjNi4MOhBPiEbJgTFgEGzgYEPQ+iOw/sAACxEbIzYgGjAhUcznD6oHIGGAXgtThy4vS3GB4EAABQoEqAE8QcgOv1wsCD1jwEyWrQwquKrdmUTRPDQDnx8gwadBIy4IETAgvpDCDAQDS14YBQPExSA4AQ8DDNEAA2MgMUCMQwiQAOPJWFcLzIYAGDAPiACIJ4QCvAn3HY/uFCChE7k9MAAC4wQAwAy3FWEBSN0YkMDJSzAUBQOHeACBxzQFcAjEDbQxRgWyPAMBBwAaEGEdHkRQAEjQDPiDwJc8GMdxi1QSiJklmnmmWhmEQQAOw==",
  ship_mortar       : "data:image/gif;base64,R0lGODlhKAAoANUAAPv6+rqsj8W6m8/GqJVtUGY1F1IzJIpFG4pcR9/WtQoDAlsuF8Z2OKVVOqpvTCoZEJqJcc9pSvXMkIpUOWlKOGE6KbpcRL1lLJh8ZH1EI3RcSP/npqSOdnREMoZJH8uPZ9OndXo+FqOVfYdGM5lcMrFXIJpgP+maVYg9EplLHrB8YZdWJaqIbD8nHv/6u5VMNraMZo5RJmNCMObfw7eab//wrvbAfEMhDP3cnK+dgW8+H9B/PH5RPX1QMKmSaO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqFQYSEynBMHs+hwIRIGZlducAc4CclObAAzU6zS8OZHNmQEDRDgIvO9FGAYYGhQVBQYUImN3CTwUEwySFz0yFGksGHJqBBMICBQyFYcZPyIRDxN/XAMONx6HBQ8LBSE5PBO5q1OOEwoLBwU3Dw4FBTwdFS0tagIXGQ8GwpY9BR08Bi0PPJtTMyQXDBk3Nx82IBUdE8k8KgUkLCw5WA4pJQwgMHUdBhUG/S0QmNjxwQQCAruYECDRqcSOEApujFD24IECAw9kwJBQQ4BBByy2MGFx4IADBzEurKiw4N8/fwpiGpDggsDCHTtMcFAigFCK/xAkHBC4cEJDzIoxF1DwIQHHhg86OnTwMCDhkAQcdv5AUCCFBxMgbOAI0EImDacb0qb98CLDvCNYIbwRIFdACh0hVoCo4WIDjbAb+LqoQdgGia9HWr0I8APr2wAEEKRIUcAEgR4OTKC4sOOEDQk2TpRIseLtVRUWJggYoILDlgEYtGLIsMCrBw8hcodAMdlrbh1FOFhokCOBihc7Z2T60xNCjNEZSh6YjFuHsQI6uiGwgGFGjhEIZrRqIEKIcgxWZmCIwT5GhhDSPbTfQ8SPxw6MYURoQB+yaT4Y2JRDT3i9NwojQwgwAgY/BGBBBAgMMIMKEZhg1RECaDCKJSIRkT6AGA7sN4+DEVhwYRIcpNMBgkRsR4AYBDwYoRQDaDBBeRgyloMFFiBHhh9KYFDijIAcgYFORSap5JJMNplEEAA7",
  ship_submarine    : "data:image/gif;base64,R0lGODlhKAAoANUAAPOcbdXMrK2jiJJtTVU2KZWLdqySc3ZZR/ZzLMC3mQIDDLVdKIhcR8VkKjUxL1pSTm07GYxFG7FjNsGPXrl5V3hLNDI5QnhmVGI+LZhYPIlWOtFrK3pEK2tJOEwrF4t7aE5CO7drRYxJJKloSXZwb3hTPZpMI6R3Vsx2UN1zL6xYIoM/GZdTLq9xVEFCRWZRQc9aIXY+GoNONBoZHf+BL59eQiceIOXdum5AJcSpeKSDYItPKsFSHstqPDYnIu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrUYTglvx9hkZAtaiwKUdJkAhAGNWDv8Kj6LLodEoFGD37UEqCAM5Fg4HBAogbkNzAj8DFBMgLwkJBW1SAQIFmQYPDj8BDRwcFQQylZYlDAwlESIuF104NjsqHioJVgWpDCIwMD0UJQuFOAsxJicJeVIXJQcVCxspKBQWFi8ErBgrOwIfBbdRBR2rGw0tLRIsIC4uHTsMOjoTOpkf4E43GCUr5SctLAsaqGN3YcIEAznmCbhgKsmFF+I8RFigygaBBuUyvLDgakKOHAZOHDDgpECAABgIeIDQoYICHywwmEgxggEIjhd0DNBx4Zwy/yYBLhDAUWIUBwwKMFCgEKKBBhfVqoGoESLEoicCOnTAAEGEjKTnJGBsIAMDBxMqMrAYgUJHlJMCSkDgIINBjR0+OERDQAMBAAAUMtRAcaJhEwE4cHTQgNTDhmjS/gIQmGGa4SYFirKY4TjFBgkURgBIgQDBggwh3FIRwJWDiIAbQjgKQbq0CdT3LBmQG0PFghrnGqQYjoAHhxof3LxwILECgwyQHzeIoaFElQAGNiCQAMKH1h0NwnuenpLKBxIfQvQdUOBACQ4qGiyYryKGjBYGChgg+eRGgT4DgHPDAdqwEsEKEHhQwQiC/XXVE5MYEUAuMVQIQUoFEIDaX4gMESBAAh8ccMEtH1SwGAr8dXgEMyKmqOKLMMYo44w01khjEAA7",
  presetRemove      : "data:image/gif;base64,R0lGODlhSwBLALMAAOXMrt+3m+/nxsp0YqMEBJgVE8+QfMsWE6I2MLRLQLhANrIEBNBOQqcEBKcRD+7mwiH5BAEAAA8ALAAAAABLAEsAAAT/8MlJq7046827/2AojmRpnmiqrmzrvnAsz3Rt33iu7zwmAIEAQAASBAwGIZH3MwwGSo/xyUgOd80BQwG9bqbaAyPovWUZh4XCuvQFqGkHNGo7pxuNNd0CRi/wcmRtMnZ/DQR5bHxvYYaIgXswhXgEiImRfXeWj3NlLpOblnpemY6VlJCeK6Chomylh5SVlqmDKaytp6OMfoe5p7WrAE69vqfGs2tOjbKzzZXBKLi/x2vM1MfQnbYi09inDL3f2QSpJ1Pi4+Sz7M7I7ZUDqt1vd77P8O75+fiVBQECuBUZpkBdu3771s0qYCCgwCI/ChqEhzDhKYYOH35wCKBgRYsT/9lhdHgrIIAEIfm92zcy4CqTKD+CVNdSIwmOElPuw1fzBU52Mmdu6ikJpkKhKonG4IjyKFKRDUnSYAp0JVKlU4EYcKAz34CMZnhx7dougZB5knhpcop0lE0VsNg+JeCWkNo/+ubmq+vzbrOgQi+hPee3ql5+iPjCLZz3MNBqim4xbuz4lDvFJWCtBDwTmeC3HApzBvmu3xoAgz28KWa4sjOKxhQABK2hninKla3KQjCEdgYgA8Z2LYCALAEEs337CBh8eJKmuPMhB5vZ4daUI0+m5E39XMDrBmtqN8hdakkB4L/VNOnR6qzp5uF+F/6r58+K5V1+mk9NKdV+8OnnE1V/VWH1AFUH5afcTQRSYqAECFKiYA3WCffgBD8hEuCC3qHH1YUUULVhDg4NAGIFHEHRHQ4crfhFRvGRCGMIMHK4n4A95Kjjjjz26OOPQAYp5JBEDhkBADs%3D",
  presetPlus        : "data:image/gif;base64,R0lGODlhDwAPAKIFAFeZVIbjfF6hWnrQcmOTUv///wAAAAAAACH5BAEAAAUALAAAAAAPAA8AAAMnWLrc/jA6AoRUIIBb8oYCQWlC6QDDEKzpxwCwEAiwe2qcl8Nc73MJADs=",
  ship_rocketship       : "data:image/gif;base64,R0lGODlhKAAoAOZ/AM6TdtbEsEspGfbOj9OJWy0cE/Sjq4tJHf313Wc7KdBYTaWXi++Lk+6udGoy Eqh7ZM56Tah0Rui2hZhoRdaWl+bUu7ekk/fs03RXRYRGLZpdPopaPKNYJZdZLOp3hbeKZ+raws/R ypleTda0ltW8pLKvqJdfNFk4JeVZa/PlzuZreP79/rCGWnJJMf756adjRs+ef6lrVk40IsShja2K cLNoOXFCL+jgy3ZUONF/N/rs7ZVNIbmXglNJSM63oqhXQ6VpON9IV7uVZ5hnVuyZoax4UOu/qtyt mYlnUkU7N7+Oc+HMtLdpKJeDdbpzM6RbLlxDLIJMMpp2aKSCcG1EKLx9Q/TCw9OziffL0Pbax7RZ PnpAHb1jSoU/FpRxUsitkohSLKqOfvfX265bJMW8uMGed5eenLhqVqo4Qa6ZZ+iCf/jh5GBoYP/h oefl4+/z7r90VL/Dwc23l+yXS9Kri6BUIlxoZXxtUMtqaKF0UGg+LnxRMaJQO/7ilj4uI//33yH5 BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CGFT4IkZaCJDSVl5E+QykpIEs+AZuc iClhGBYlrWQ3p4cXJGEWZBQGBlgrKy6xhCA8YSVuOh4oHh5BKjq+v4IVFiG8KChrWFZiKiouposI 3oYXFy5EQWvmyGIoVuGJFUtfZSMkIDcWJBUXfxcIQURYgmDRwYABETXOvi2ZYqQMgQYAPmxAQgeG hSVZglgpGMJOCAYGPCRUdGEGEiRSWjyUICGPFwgEipAIYkSNgRIFzOTyoMPdoRs8Hpw4sSFDFDgT cEzAsIGAgiMUVNxgE8egB3CObvgI01SDVxkn9iTxk6BGgzJoPoww4uFgt0gV/75M0LDBjwAoGya0 iJJjDhwNUbQAwHMEK1wvGAoIuGuWVIYMEOBEeZEDAp0Al2A8odJCgIweJxxYWBGmgIwEeihXIfAi hSUSNZg8cZBk7IkAb3hkSJBgQ4caNapM+OJTEYg8GuowwZGkx4IbIZoISACGihMnEYREYDFi36ML QPI+YQIEQ4+xd4TgcMBkRwcTGyJE+ABhAAjXjFJMcMAhwoQnT8jgRxoDDNBHGovVsYcfMuBQRBRV PGDBIimQcJESDmxhQh5FECBBgSB2UEAHE5wgg0QJsABCcX+kAEAMPoSyVQddbMHCAG0M0MAVZZQB HxBOdBCBBAnsMUIiFxzBxe4QASxRBiUX8NBCFweAUcYHE0ygBw5eaLdhERqk6J0hJMDxwhcVKBFD ABcYMUIFIHywhQBddLEDBzscsAVnG3iVwQZyJCJCGCDMIAIPKSgpxT4pzDDFBHfuUMcYlNaxQ54J 2PABfrIEEIMUIFRAgBZTpJDFER9ghgAJLIBxwKsH5Klnb1csYkGMMGixZgowQPACCIQgsMQHHVwK 6xY25FEBIxW8wAeiAcDBxZqIgFAGpJMeoMcHYyayUAAu/sBHGJwiMksZQmBwghDdKrLEGVoM4UMk NzRBQ7mKzPADqJykwOIzAAcs8MAEF2ywJYEAADs= ",
  tender            : "data:image/gif;base64,R0lGODlhKAAoAOZ/AOfWtU04KWczFt+JOGZHNsmaboZEG/zz2qlZI8i6pOjbw3FWRI19bvXs1ZKE dtaqaU8rGbaolfXmy8J2RLCchpJkOnhlVYpkS8mzmdvNtum7hryNVaV5UnZQOrqWeah4RYZqU2o+ IfKpSaRkKOvhyppmRnBMOr6ui/bjtVtDM+qjW9nErKSJc5p2XSQXEaFuRPrFhaSEbOjFm/i5c4NZ O/vFb+Wzaum2cz4lGX10aHg/G5pXJbJqQcOEV7p5ORYKBPm2XpVZNL20o4VULcKnhmE/K/KoV9+o bTYtKMWGRdSLQcvFs+6iQqFRINe/oZpySMvArffSlblxKKpxMoBcR8yALpVuVNqfWdSJXMKslr9u Qp6ThNG3mJNKH+iYP+DTvOedasSXWt6mdbCgjO/n0WtQON+mYadnOrSOcoFJJ9SSSKeRfKd+YHlK LP7///Tbgo9xX3JWMalfQbmJX7GAQK1vK7ZsJvzvxequVrd0S9esitqzj+LZxPKtYfm2Yv/33yH5 BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj45rOBGQlYQRVidklpYHQjIJBwecj2QH Yxp8DaOkjCQNZGwyZJutiw0Nf0JYX7S2iKJLQoIxWBIktb+CElFHGifDf3wlYmTIvwcAGkdmNTdx RKwMWnoHqqQHMgUFZngiUy80GzMofyRUvNK5jwcSMkdX8DAxAkPClgAVHsAwcuOAEzliSOh7pGCC DRgivAyQ4cbNgQcBcDw54qWGhyJgNKxKxkgCjyp9YKhgIgLGjAFKrjyJI+IIgBwuOMyQsUdGBCiO MDQxcMVmxgFqAvoxY6RADBoQCIiBAQZLkSUkMjRy0qGLkhs3zNjAg+dDDywb/5Kk4aHlzIUoGqgs ULAFaSMJeRAoAQJExBMOHRITqDAkRIAXJeZEsZBiwRZWY7s08YEHSAUTRYoECIClh5Q2BDoUAUF5 9AkAmBUdYCNAhw81QwiIJlAmsRcmHwK4WBCDQYQlYzCIXUQiQg4LOnQ0GVEGSZk3NlJUECGiymgI FhKQAOAEjYcVGWILapABw5gIZPgswKEDwZAAceZwKKGGiRQaOSzwAxIOUBHEBFhg4QEX+whCAgYt xJABLBg4IEQWQ0BgwAh1JOEDXVpUQYcDHsDBwBoBmFACDTRc8EEUhJgo3gpEULDEKkJYQAAE0tkx QhtB8JAEDwswwAUKd1iAQ/8KLrgQABtX2HDHKEsoAKEFSEmwAgVbNEDCBTgI0AUCIwyRRgUlQDDC GmNQgMQPKThAQAAJABBDGg9EkYAVcISSARosZLEJCVtsgcELEGiIwA4CFEFHFS1QYIGTKQCAAggZ oMCFDjsU8AUUDayAxgVw8PHHARhQAMUBJDwXhAFiNoGAFBwm8QEdN4QRhgYfcPBBBS9wYOofFFzg wBd/NEBEC1mIUmF6GBQBQQgINKFZtQhkW20biZmQWhaDfGHqASu0cMGETqyRwKlZ5JAAFxycUW0X 9DZhr7UEEOAtAS1IUAgJMVgQAblWgKDAH19QMIZEp2ZABAevGhCdDiGEkC9tASl0AO6/FHxBggdU dAmABywsV0gDVsbQmAAsF7EvFcge8gWfqmRRAhwMJ8JqeRVQvG+/iJAA6gpsgDAwJGQQ8Zm3aKhX SAYXMDCsJV/E0IEJBThNSAN8aP1IAxF0kLUyjWThgb9kp6322o8EAgA7 ",
  ship_paddlespeedship : "data:image/gif;base64,R0lGODlhKAAoAOZ/AKxYJTIXDLNqM1JRUq2FU7anlg8ODlEoEcqbaKaaldOqaJNjO+bQtnlUNmVX TWhGK4ZFHf3JeUk0JYx4aIRdOsizmnRqaVVEOFg+KWJMOtbCppxVKHU8GM28o/Ply2g3FjUsKPft 1P303H1CGTsrHJGEd5JOI+a0h6WLdJtlQE0dB//ni6WHatbJt6Z6UsiVXYVrVaVPHKt1S4tLIdTI ntaYV4ZXLXFoW9bQ0bOVeEg5MPnZnOncw6yRd5xxSP71ofq6bj0xKP/ymJeLivjGh19FLkpCOue6 dO3Jevvdiv/ZeaVoP3ZEIf/olP32yZdHGYlyXufHmruVYu2xX8WIUm5ROerhydK8mLN/SL6jiZ1d LywoJf6/dJ1RIL5jJoJPMcSDR7eOcDQ0N29OL/Do0sKcfbWegeDRuBwZGR0fIrJ/WTtCSLiIYPz5 44FpS4pwQZE/FXtfS9W+fWU+JP/qf7Wxt14wEnEvDtq+ksjBstyrbO+6bfuqZ558YS8vMf/33yH5 BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXjh54PCIhZ2YwLGSYhlFa BFFEUDpBNyGkhWcKEXw1BRYGJZecgp4VBR16QDU+KCUGBX8iIpRLLK8dMBcYclJLLggKCHE0TjQe lDUuLh4eDmlbbhc6DghESU1yLlCjky8/CCkeHX5BOv9GLrBB8EYChmSUwkT4oSBFFgesMIzJIOEC BQw+TlR4NUkDGCRSLm5BE+BBlTEUMugo06RJlCz1IoVIAQDbCxAGJFQp8qABhQtxdjTZkQOKBmaQ QsjoUgOBDzQZduDBQAIDhQZBeuyIcMIBiD4tkqrp4uVLGgNx8KAgkXPMHAkZ/05wQZDBCIEFfXgc WlZIRJYuMTj4EXOhCgk0aDBIOCABBIwXWNgcibAHC4UcHAXxaBFzEI8lAGYYWWMkg4PTOEvqFMZl z5EVQpBY3lihh5k8SAtV0AIAQIMBAyxYMAIiQIAiGDIQeNHARxIhQlYk0ZMCRpwcWTpYaZN5UJbe XjYA1zEHgnE7QdCAkLAlwBc9SlaYuREHSo4SFhLQuBLWUI4NAHghwBcccMDEGDYwcUAAWxgRRAAq HCBADT8lgEMPDdhRBQtldDeICGbw5sUTHBCARAQ1yLAAEx9QFcABKqiQggYtFDBBBg1Q4cMGAoCD SAeg2dHFFCs0kQQSR+xBxdsXRWSQAQVZ4DBEER8YiMELXAjwjCJnyPABBDGA8dwKdCghBRR99AAM AxZAaEeVENiwRAp6LeIBCxt0AYcXUyiRxBUJ1IHCBDdU4AQKB7xZIBMQQFCBIyLsZgIcT2iAQwEJ DAFDAw9QwAIbalDAwQgQzJBCBbk1csaOXSxhwgIL2FAFjhQ8AAAVPGhghhkaeOhICD3wdocdDaRg wxhgKFADAD2kaokGMkAwwrRPxCCADAKkYAUsgljxXxddmGDCCBzM8Ci3g2jQxwwmzDCDD6iiK++8 9NZr7734BgIAOw== ",
  ship_ballooncarrier:"data:image/gif;base64,R0lGODlhKAAoAOZ/AHmTqci2jrWXZk44J5FOJvjXhPz02zozMOW1bpWBaXVkU1NMStanZufcqurYmHGgxHZXOYqst/jiirqiai1vqad0QpWXk3Vwaa+UaGdMNcaZYcamd82UVpCwwFtINk0wHNXKlribdVJwjvTpyaeDV6SKZbDI24ZmQNTGqnddRfbCc7SjhuTDevfoldm3dzmL1O/juOvhyruJVayZgripkWuGnYp7amt6gMupadisdIh1WOfLgefcw9zNs/7yltbFh556UeOtW+vilvXr05lzSWFYVJ1mReHSj0N4qx93xC0lHxBpt8u8o5x9XPzXfqaSd0ZZcbi5sezbjcnIu66ETtLj7pJ0U5yCWFaDqqaRX93Gd+/VhN7Uu7GKY7qcXkpBOtS3bWtFKKuljG1cS93ayd/SpVlAK2tVPOXUhevWiavLt+fcjJd5VI1wTZJ6XO7bhjs4QZNpUJuJdIhrT39iRvjvz8HIpMLRqziAvhoaHMGxmOXz+d7MnvHOg+3Tf//33yH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmHNB5imodDBoJMSgl1hqKUBmRTPRUbIwY9B3NlqQYjfCCnkKtkUTV4AEYERBsleWdXXCMNIEdCQkcNqY1TD3gPHVhLeDVuXid0GykzAkA7LdoSQmUw1YpRVQ/dEQAUSQ8XSmZWISQfMnhxYeeOEClStjSItShGhD0mKCx5YKEGEiRFlCjRMebDgAFWJEjYItLHmwm8FE2pYWIeBSwAamARUeQLnAMHIEBgQ0LLmx1+3pRAAcNBgzrwCsW48cCECSQioIi4oSMDzgNZcIRo0oYBAwEB+Bwp4MOHkIWH6sD4cQNKDQA0/z2YyXCCioYsV3TowODFig05ITR4keJjDRp2aAX1CHDkSIAxHuBcEPMEgpmdVjQ4KXBlgY4JGGjMyJDBSp8daKSoUbNmR4MYfyb8ALHGSxE4X7T4OMKASoq/GBAwYJFlQZEJLjBkMHMGAoYWLSI8OCLBwYY/KCbsSJNcQZY1CXdQAYIhBw4dKWQgyCJOQYk2pAfQOYz6II4VgrhgwCHtyBo/EvgwgQAq5FBCAjNwkUAGc/RRAk5FnPMFG0BcgcERaQigRzUG6CEACwUE6AMYE6DxAx8rpBCHHlVBQIIMQFxQxAJfHHDBDAqcgIMAKBzCQwgTSOBHFjagUAYfTgRxhuoAJKQg1wAecMAAGBvMmEIXTOjxBGyIGMAEBm7Q0IMDUmzWAhgMbABEGB5lkEIbFVRghBFEQCBHUojEoCcLZjrhBHcu/LDBCfI9YYENH3wQxhhjMIFnIgasgIAKKrDgQg6nqbBDDlR4YIMFejBBwxweKDBEJEPMwEEOIVBqwQsAeJVDE0/wMAJsBtCgAA2PKmLADBrksEEQM+CBBQMchLCBBkzEUA0XM/QgSaQydNEEBxzIIEAIXVBRAheojDBJrkAcKAAGTQDBxgpcftIhEE24wca6PHxiiB5ErNuuvfz26++/AAcs8MCIBAIAOw==",
  ship_tender: "data:image/gif;base64,R0lGODlhKAAoAOZ/AOfWtU04KWczFt+JOGZHNsmaboZEG/zz2qlZI8i6pOjbw3FWRI19bvXs1ZKEdtaqaU8rGbaolfXmy8J2RLCchpJkOnhlVYpkS8mzmdvNtum7hryNVaV5UnZQOrqWeah4RYZqU2o+IfKpSaRkKOvhyppmRnBMOr6ui/bjtVtDM+qjW9nErKSJc5p2XSQXEaFuRPrFhaSEbOjFm/i5c4NZO/vFb+Wzaum2cz4lGX10aHg/G5pXJbJqQcOEV7p5ORYKBPm2XpVZNL20o4VULcKnhmE/K/KoV9+obTYtKMWGRdSLQcvFs+6iQqFRINe/oZpySMvArffSlblxKKpxMoBcR8yALpVuVNqfWdSJXMKslr9uQp6ThNG3mJNKH+iYP+DTvOedasSXWt6mdbCgjO/n0WtQON+mYadnOrSOcoFJJ9SSSKeRfKd+YHlKLP7///Tbgo9xX3JWMalfQbmJX7GAQK1vK7ZsJvzvxequVrd0S9esitqzj+LZxPKtYfm2Yv/33yH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj45rOBGQlYQRVidklpYHQjIJBwecj2QHYxp8DaOkjCQNZGwyZJutiw0Nf0JYX7S2iKJLQoIxWBIktb+CElFHGifDf3wlYmTIvwcAGkdmNTdxRKwMWnoHqqQHMgUFZngiUy80GzMofyRUvNK5jwcSMkdX8DAxAkPClgAVHsAwcuOAEzliSOh7pGCCDRgivAyQ4cbNgQcBcDw54qWGhyJgNKxKxkgCjyp9YKhgIgLGjAFKrjyJI+IIgBwuOMyQsUdGBCiOMDQxcMVmxgFqAvoxY6RADBoQCIiBAQZLkSUkMjRy0qGLkhs3zNjAg+dDDywb/5Kk4aHlzIUoGqgsULAFaSMJeRAoAQJExBMOHRITqDAkRIAXJeZEsZBiwRZWY7s08YEHSAUTRYoECIClh5Q2BDoUAUF59AkAmBUdYCNAhw81QwiIJlAmsRcmHwK4WBCDQYQlYzCIXUQiQg4LOnQ0GVEGSZk3NlJUECGiymgIFhKQAOAEjYcVGWILapABw5gIZPgswKEDwZAAceZwKKGGiRQaOSzwAxIOUBHEBFhg4QEX+whCAgYtxJABLBg4IEQWQ0BgwAh1JOEDXVpUQYcDHsDBwBoBmFACDTRc8EEUhJgo3gpEULDEKkJYQAAE0tkxQhtB8JAEDwswwAUKd1iAQ/8KLrgQABtX2HDHKEsoAKEFSEmwAgVbNEDCBTgI0AUCIwyRRgUlQDDCGmNQgMQPKThAQAAJABBDGg9EkYAVcISSARosZLEJCVtsgcELEGiIwA4CFEFHFS1QYIGTKQCAAggZoMCFDjsU8AUUDayAxgVw8PHHARhQAMUBJDwXhAFiNoGAFBwm8QEdN4QRhgYfcPBBBS9wYOofFFzgwBd/NEBEC1mIUmF6GBQBQQgINKFZtQhkW20biZmQWhaDfGHqASu0cMGETqyRwKlZ5JAAFxycUW0X9DZhr7UEEOAtAS1IUAgJMVgQAblWgKDAH19QMIZEp2ZABAevGhCdDiGEkC9tASl0AO6/FHxBggdUdAmABywsV0gDVsbQmAAsF7EvFcge8gWfqmRRAhwMJ8JqeRVQvG+/iJAA6gpsgDAwJGQQ8Zm3aKhXSAYXMDCsJV/E0IEJBThNSAN8aP1IAxF0kLUyjWThgb9kp6322o8EAgA7"}

//-----------------------------------------------------------------------------
const unitsList = {
  army:   [["phalanx", "steamgiant", "spearman", "swordsman" , "slinger"   , "archer", "marksman"],
           ["ram"    , "catapult"  , "mortar"  , "gyrocopter", "bombardier", "cook"  , "medic"   ]],
  fleet:  [["ship_ram", "ship_flamethrower", "ship_steamboat", "ship_ballista", "ship_catapult", "ship_mortar"],
           [ "ship_submarine","ship_rocketship", "ship_tender", "ship_paddlespeedship", "ship_ballooncarrier"]]
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
    medic       : { garrison: 2 }
  },
  fleet: {
    ship_ram              : { garrison: 3 },
    ship_flamethrower     : { garrison: 2 },
    ship_steamboat        : { garrison: 5 },
    ship_ballista         : { garrison: 2 },
    ship_catapult         : { garrison: 3 },
    ship_mortar           : { garrison: 4 },
    ship_submarine        : { garrison: 3 },
	ship_rocketship       : { garrison: 4 },
	ship_tender           : { garrison: 1 },
	ship_paddlespeedship  : { garrison: 1 },
	ship_ballooncarrier   : { garrison: 4 }
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
    line1     : ["ship_flamethrower", "ship_steamboat", "ship_ram"],
    line2     : ["ship_ballista", "ship_catapult", "ship_mortar" ],
    artillery : ["ship_submarine", "ship_rocketship"],
    flankLeft : ["ship_ram"],
    flankRight: ["ship_ram"],
    support1  : ["ship_tender"],
    sea1      : ["ship_paddlespeedship"],
    sea2      : ["ship_ballooncarrier"]
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
    0  : { line1: [3, 15], line2: [3, 15], artillery: [1, 15], flankLeft: [0, 15], flankRight: [0, 15], sea1: [1, 10], sea2: [1, 10], support1: [1, 0]},
	8  : { line1: [5, 15], line2: [5, 15], artillery: [2, 15], flankLeft: [1, 15], flankRight: [1, 15], sea1: [1, 10], sea2: [1, 10], support1: [1, 0]},
	15 : { line1: [7, 15], line2: [7, 15], artillery: [3, 15], flankLeft: [2, 15], flankRight: [2, 15], sea1: [1, 15], sea2: [1, 15], support1: [1, 0]},
	22 : { line1: [7, 20], line2: [7, 20], artillery: [4, 15], flankLeft: [3, 15], flankRight: [3, 15], sea1: [2, 10], sea2: [2, 10], support1: [1, 0]},
	29 : { line1: [7, 25], line2: [7, 25], artillery: [5, 15], flankLeft: [3, 20], flankRight: [3, 20], sea1: [2, 15], sea2: [2, 15], support1: [1, 0]},
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
    ship_ram             : 0,
    ship_flamethrower    : 0,
    ship_steamboat       : 0,
    ship_ballista        : 0,
    ship_catapult        : 0,
    ship_mortar          : 0,
    ship_submarine       : 0,
	ship_rocketship      : 0,
	ship_tender          : 0,
	ship_paddlespeedship : 0,
	ship_ballooncarrier  : 0
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

  html  = '<div id="armyPreview" style="top:180px; left:230px; width: 362px; height: 273px; z-index: 9999; position: absolute; text-align: justify; background-color: #FCF4DE; padding: 1px 5px 5px 5px; display: none;">';
  html += "<table>\n";
  
  for (row in unitsList.army) {
    html += '<tr align="center">\n';
    for (i in unitsList.army[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.army[unitsList.army[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.army[row][i]]+'" title="'+language[unitsList.army[row][i]]+'"><br><span>'+data.army[unitsList.army[row][i]]+'</span></div></td>\n'
    }
    html += '</tr>\n';
  }
  
  for (row in unitsList.fleet) {
    html += '<tr align="center">\n';
    for (i in unitsList.fleet[row]) {
      html += '<td style="padding: 3px;"><div style="padding: 3px; background-color: #FAEAC6;'+((data.fleet[unitsList.fleet[row][i]]==0)?' opacity:0.5;':'')+'"><img class="advisorUnitIcon" src="'+images[unitsList.fleet[row][i]]+'" title="'+language[unitsList.fleet[row][i]]+'"><br><span>'+data.fleet[unitsList.fleet[row][i]]+'</span><br></div></td>\n'
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
    'input.fillRow {left: 615px; height:25px; width: 15px; margin-top:10px; } ' +
    'input.fillRow:active { padding: 3px 0px 1px 0px; } ' +
    'input.addSlot {left: 580px; height:25px; width: 15px; margin-top: 10px;} ' +
    'input.addSlot:active { padding: 3px 0px 1px 0px; } ' +
    'input.removeSlot {left: 490px; height:25px; width: 445px; margin-top: 10px;} ' +
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
  
  //var bottomButtons = '<hr> \
//  <div class="assignRightBlock"> '+language.selectUnits+': \
//  <!--input type="button" value="'+language.assignField+'" class="button" id="assignField"--> \
//  <input type="button" value="'+language.assignAll+'" class="button" id="assignAll"> \
//  <input type="button" value="'+language.assignNone+'" class="button" id="assignNone"> \
//  </div>\n';
//  $("ul.assignUnits").after(bottomButtons);
  
//  $("#assignField").click( function() { this.blur(); assignField(type, targetBattlefieldProperties); });
//  $("#assignNone").click( function() { this.blur(); assignUnits("setMin", type, targetBattlefieldProperties, draw); });
//  $("#assignAll").click( function() { this.blur(); assignUnits("setMax", type, targetBattlefieldProperties, draw); });
  
  var armyPreview=document.getElementById('armyPreview');
	 armyPreview.style.display = 'none';

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
              unitsToPlace = 15;
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
    '#container .assignUnits .textfield {left: 524px; height: 19px; margin-top:-2px}'
  );

  if (draw) {
    var place = $("div#select" + type.slice(0,1).toUpperCase() + type.slice(1));
    
    GM_addStyle(
      'td.advisorSquare     { background:url(' + images.square + ') no-repeat top center; background-position: 6px 3px; } ' +
      'img.advisorUnitIcon  { width:34px; height:35px; padding: 0px 6px 0px 6px; cursor: pointer; !important; }' +
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
      fleet : [["sea", "sea2"] 	       , ["artillery"], ["sea", "sea1"]		   , "\n",
			   ["support", "support1"] , ["line2"]    ,  ""          , "\n",
               ["flankLeft"]           , ["line1"]    , ["flankRight"]
              ]
    };
    var entry = document.createElement('div');
    entry.setAttribute('id', 'plunderAdvisor');
    entry.setAttribute('class', 'contentBox01h');
    var html = '<h3 class="header">'+ language.advisor + '</h3>\n';
    html += '<div style="margin: -18px 10px 8px 5px; text-align: right;">By <a target="_blank" href="http://userscripts.org/scripts/show/94360">Ikariam Army Helper v.0.38</a>.</div>\n';
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
  var html = '<h3><a href="http://userscripts.org/scripts/show/94360" target="_blank">Ikariam Army Helper </a> <span style="font-weight: normal;"> by <a href="http://userscripts.org/users/273982" target="_blank">Dino.pl</a></span> v.0.38</h3>'
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

