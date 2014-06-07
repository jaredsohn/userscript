// ==UserScript==
// @name          Hattrick PsicoTSI
// @description   The PsicoTSI Project consists of predicting TSI using the player's skills; and back, predicting skills using TSI.
// @version       0.99.5
// @copyright     2011, Re4Ver (http://www.aldeaglobal.net/psicotsi/)
// @namespace     http://www.aldeaglobal.net/psicotsi/
// @include       http://*.hattrick.org/Club/Players/*
// @include       http://*.hattrick.ws/Club/Players/*
// @include       http://*.hattrick.uol.com.br/Club/Players/*
// @include       http://*.hattrick.interia.pl/Club/Players/*

// @include       http://*.hattrick.org/Club/NationalTeam/NTPlayers.aspx*
// @include       http://*.hattrick.ws/Club/NationalTeam/NTPlayers.aspx*
// @include       http://*.hattrick.uol.com.br/Club/NationalTeam/NTPlayers.aspx*
// @include       http://*.hattrick.interia.pl/Club/NationalTeam/NTPlayers.aspx*

// @include       http://*.hattrick.org/World/Transfers/TransfersSearchResult.aspx*
// @include       http://*.hattrick.ws/World/Transfers/TransfersSearchResult.aspx*
// @include       http://*.hattrick.uol.com.br/World/Transfers/TransfersSearchResult.aspx*
// @include       http://*.hattrick.interia.pl/World/Transfers/TransfersSearchResult.aspx*
// ==/UserScript==
if (!org) var org = {};
if (!org.hattrick) org.hattrick = {};
org.hattrick.PsicoTSI = function () {
   var pub = {};

   /************ 
    * SETTINGS *
    ************/
   const SETT_HIDE_UNDER_SKILLS = false; //hides PsicoTSI under skills
   const SETT_SHOW_WAGE = true; //enables wage prediction
   const SHOW_PSICOTSI_IN_SEARCH_PAGE = true; //shows PsicoTSI in search page
   const SHOW_PSICOTSI_IN_SEARCH_PAGE_AS_LINK = false; //shows PsicoTSI in search page as link (like players' page)
   const SHOW_PSICOTSI_IN_PLAYERS_PAGE = true; //shows PsicoTSI in players page
   const SETT_PREF_LEFT = false; //shows PsicoTSI on the left side menu
   const isAlertBoxStyle = false; //shows PsicoTSI in an alertbox
   const SETT_USE_OLDINTERFACE = false; //shows the old interface of PsicoTSI on Player's page
   const CURRENCY = "EUR";
   const LANGUAGE = "en-US";
   const SHOW_CURRENCIES = false; //shows an alert with all available currencies
   const SHOW_LANGUAGES = false; //shows an alert with all available languages

   //DO NOT EDIT BELOW THIS LINE!

   const VERSION = "0.99.5";
   
   const HATTRICK_CURRENCIES = {
      "CZK": {
         "shortname": "Kč",
         "name": "Kč (Česká koruna)",
         "eurorate": "0.025"
      },
      "GBP": {
         "shortname": "£",
         "name": "£ (British pound sterling)",
         "eurorate": "1.5"
      },
      "EUR": {
         "shortname": "€",
         "name": "€ (Euro)",
         "eurorate": "1.0"
      },
      "SEK": {
         "shortname": "kr",
         "name": "kr (Swedish krona)",
         "eurorate": "0.1"
      },
      "RUB": {
         "shortname": "Roubel",
         "name": "рубли (Russian ruble)",
         "eurorate": "0.025"
      },
      "SKK": {
         "shortname": "Sk",
         "name": "Sk (Slovenská koruna)",
         "eurorate": "0.02"
      },
      "USD": {
         "shortname": "$",
         "name": "$ (US dollar)",
         "eurorate": "1.0"
      },
      "CHF": {
         "shortname": "CHF",
         "name": "CHF (Swiss franc)",
         "eurorate": "0.5"
      },
      "NIS": {
         "shortname": "₪",
         "name": "₪ (Israeli new sheqel)",
         "eurorate": "0.2"
      },
      "CAD": {
         "shortname": "C$",
         "name": "C$ (Canadian dollar)",
         "eurorate": "0.5"
      },
      "RON": {
         "shortname": "Lei",
         "name": "Lei (Romanian leu)",
         "eurorate": "0.05"
      },
      "JPY": {
         "shortname": "¥",
         "name": "¥ (Japanese yen)",
         "eurorate": "0.01"
      },
      "BRL": {
         "shortname": "reais",
         "name": "R$ (Reais)",
         "eurorate": "0.5"
      },
      "DZD": {
         "shortname": "Dinar",
         "name": "Dinar (Algerian dinar)",
         "eurorate": "0.01"
      },
      "MAD": {
         "shortname": "Dirhams",
         "name": "Dirhams (Moroccan dirham)",
         "eurorate": "0.1"
      },
      "JOD": {
         "shortname": "Dinar",
         "name": "Dinar (Jordanian dinar)",
         "eurorate": "0.5"
      },
      "ARS": {
         "shortname": "Pesos",
         "name": "Pesos (Argentine peso)",
         "eurorate": "1"
      },
      "BHD": {
         "shortname": "Dinar",
         "name": "Dinar (Bahraini dinar)",
         "eurorate": "2"
      },
      "BBD": {
         "shortname": "Bds$",
         "name": "Bds$ (Barbados dollar)",
         "eurorate": "0.5"
      },
      "BOB": {
         "shortname": "Bs",
         "name": "Bs (Bolivian boliviano)",
         "eurorate": "0.1"
      },
      "BAM": {
         "shortname": "Marka",
         "name": "Marka (Bosnia and Herzegovina mark)",
         "eurorate": "0.5"
      },
      "BGN": {
         "shortname": "лв",
         "name": "лв (Bulgarian lev)",
         "eurorate": "0.5"
      },
      "BYR": {
         "shortname": "Br",
         "name": "Br (Belarusian ruble)",
         "eurorate": "0.5"
      },
      "CVE": {
         "shortname": "Escudos",
         "name": "Escudos (Cape Verdean escudo)",
         "eurorate": "0.01"
      },
      "CLP": {
         "shortname": "Pesos",
         "name": "Pesos (Chilean peso)",
         "eurorate": "5"
      },
      "CNY": {
         "shortname": "CN$",
         "name": "CN$ (Chinese yuan)",
         "eurorate": "0.1"
      },
      "TWD": {
         "shortname": "NT$",
         "name": "NT$ (New Taiwan dollar)",
         "eurorate": "1"
      },
      "CRC": {
         "shortname": "Colón",
         "name": "Colón (Costa Rican colón)",
         "eurorate": "0.4"
      },
      "CYP": {
         "shortname": "CYP",
         "name": "CYP (Cypriot pound)",
         "eurorate": "0.5"
      },
      "DKK": {
         "shortname": "Kroner",
         "name": "Krone (Danish krone)",
         "eurorate": "0.1"
      },
      "EEK": {
         "shortname": "Kroon",
         "name": "Kroon (Estonian kroon)",
         "eurorate": "0.05"
      },
      "FDKK": {
         "shortname": "Króna",
         "name": "Króna (Faroese króna)",
         "eurorate": "0.1"
      },
      "MKD": {
         "shortname": "MKD",
         "name": "MKD (Macedonian denar)",
         "eurorate": "0.05"
      },
      "KRW": {
         "shortname": "₩",
         "name": "₩ (South Korean won)",
         "eurorate": "1"
      },
      "AMD": {
         "shortname": "Dram",
         "name": "Dram (Armenian dram)",
         "eurorate": "2"
      },
      "HNL": {
         "shortname": "Lempira",
         "name": "Lempira (Honduras)",
         "eurorate": "0.5"
      },
      "KHD": {
         "shortname": "HKD",
         "name": "HKD (Hong Kong dollar)",
         "eurorate": "0.1"
      },
      "HRK": {
         "shortname": "Kn",
         "name": "Kn (Croatian kuna)",
         "eurorate": "0.1"
      },
      "INR": {
         "shortname": "₨",
         "name": "₨ (Indian rupee)",
         "eurorate": "0.025"
      },
      "IDR": {
         "shortname": "Rp",
         "name": "Rp (Indonesian rupiah)",
         "eurorate": "0.1"
      },
      "IRR": {
         "shortname": "Rial",
         "name": "Rial (Iranian rial)",
         "eurorate": "0.1"
      },
      "ISK": {
         "shortname": "Ikr",
         "name": "Ikr (Icelandic króna)",
         "eurorate": "0.01"
      },
      "JMD": {
         "shortname": "JMD",
         "name": "JMD (Jamaican dollar)",
         "eurorate": "0.05"
      },
      "KZT": {
         "shortname": "Tenge",
         "name": "Tenge (Kazakhstan)",
         "eurorate": "0.01"
      },
      "KES": {
         "shortname": "KES",
         "name": "KES (Kenyan shilling)",
         "eurorate": "0.05"
      },
      "KWD": {
         "shortname": "Dinar",
         "name": "Dinar (Kuwaiti dinar)",
         "eurorate": "2.5"
      },
      "KGS": {
         "shortname": "Som",
         "name": "Som (Kyrgyzstani som)",
         "eurorate": "0.02"
      },
      "LVL": {
         "shortname": "Lats",
         "name": "Lats (Latvian lat)",
         "eurorate": "2"
      },
      "LTL": {
         "shortname": "Lt",
         "name": "Lt (Lithuanian litas)",
         "eurorate": "0.25"
      },
      "LBP": {
         "shortname": "LL",
         "name": "LL (Lebanese pound)",
         "eurorate": "0.5"
      },
      "HUF": {
         "shortname": "Ft",
         "name": "Ft (Hungarian forint)",
         "eurorate": "5"
      },
      "MYR": {
         "shortname": "RM",
         "name": "RM (Malaysian ringgit)",
         "eurorate": "0.25"
      },
      "MTL": {
         "shortname": "MTL",
         "name": "LM (Maltese pound)",
         "eurorate": "2"
      },
      "MXN": {
         "shortname": "Pesos",
         "name": "Pesos (Mexican peso)",
         "eurorate": "0.1"
      },
      "EGP": {
         "shortname": "E£",
         "name": "E£ (Egyptian pound)",
         "eurorate": "0.25"
      },
      "MNT": {
         "shortname": "төгрөк",
         "name": "төгрөк (Mongolian tugrug)",
         "eurorate": "0.5"
      },
      "MZM": {
         "shortname": "metical",
         "name": "metical (Moçambique metical)",
         "eurorate": "0.04"
      },
      "NIO": {
         "shortname": "Córdoba",
         "name": "Córdoba (Nicaraguan córdoba)",
         "eurorate": "0.05"
      },
      "NGN": {
         "shortname": "₦",
         "name": "₦ (Nigerian naira)",
         "eurorate": "0.01"
      },
      "NOK": {
         "shortname": "kr",
         "name": "Krone (Norwegian krone)",
         "eurorate": "0.1"
      },
      "AUD": {
         "shortname": "AU$",
         "name": "AU$ (Australian dollar)",
         "eurorate": "0.5"
      },
      "PKR": {
         "shortname": "rupee",
         "name": "Rupee (Pakistani rupee)",
         "eurorate": "0.02"
      },
      "PYG": {
         "shortname": "PYG",
         "name": "Guaraníes (Paraguayan guaraní)",
         "eurorate": "0.2"
      },
      "PHP": {
         "shortname": "Piso",
         "name": "Piso (Philippine peso)",
         "eurorate": "0.025"
      },
      "PLN": {
         "shortname": "zł",
         "name": "zł (Polish złoty)",
         "eurorate": "0.25"
      },
      "THB": {
         "shortname": "฿",
         "name": "฿ (Thai baht)",
         "eurorate": "0.025"
      },
      "DOP": {
         "shortname": "RD$",
         "name": "RD$ (Dominican peso)",
         "eurorate": "0.05"
      },
      "GEL": {
         "shortname": "ლარი",
         "name": "ლარი (Georgian lari)",
         "eurorate": "0.5"
      },
      "SAR": {
         "shortname": "Riyal",
         "name": "Riyal (Saudi riyal)",
         "eurorate": "0.25"
      },
      "XOF": {
         "shortname": "XOF",
         "name": "XOF (CFA franc)",
         "eurorate": "2"
      },
      "ALL": {
         "shortname": "Lek",
         "name": "Lek (Albanian lek)",
         "eurorate": "5"
      },
      "SGD": {
         "shortname": "SG$",
         "name": "SG$ (Singapore dollar)",
         "eurorate": "0.5"
      },
      "ZAR": {
         "shortname": "Rand",
         "name": "Rand (South Africa)",
         "eurorate": "0.125"
      },
      "CSD": {
         "shortname": "dinar",
         "name": "Dinar (Serbian dinar)",
         "eurorate": "0.1"
      },
      "SRD": {
         "shortname": "SRD",
         "name": "SRD (Surinam dollar)",
         "eurorate": "0.5"
      },
      "TND": {
         "shortname": "Dinar",
         "name": "Dinar (Tunisian Dinar)",
         "eurorate": "0.8"
      },
      "TTD": {
         "shortname": "TT$",
         "name": "TT$ (Trinidad and Tobago dollar)",
         "eurorate": "0.1"
      },
      "TRY": {
         "shortname": "YTL",
         "name": "YTL (Turkish new lira)",
         "eurorate": "1"
      },
      "UAH": {
         "shortname": "hryvnia",
         "name": "грн. (Ukrainian hryvnia)",
         "eurorate": "0.2"
      },
      "AED": {
         "shortname": "د.إ",
         "name": "د.إ (United Arab Emirates dirham)",
         "eurorate": "0.4"
      },
      "UYU": {
         "shortname": "Pesos",
         "name": "Pesos (Uruguayan peso)",
         "eurorate": "0.1"
      },
      "VEB": {
         "shortname": "Bs",
         "name": "Bs (Venezuelan bolívar)",
         "eurorate": "1"
      },
      "VND": {
         "shortname": "₫",
         "name": "₫ (Vietnamese dong)",
         "eurorate": "0.1"
      },
      "BND": {
         "shortname": "B$",
         "name": "BDN (Bruneian dollar)",
         "eurorate": "0.5"
      },
      "GHS": {
         "shortname": "¢",
         "name": "¢ (Ghanese cedis)",
         "eurorate": "1"
      },
      "OMR": {
         "shortname": "ر.ع.",
         "name": "ر.ع. (Omani Rial)",
         "eurorate": "2"
      },
      "KHR": {
         "shortname": "riel",
         "name": "riel (Cambodian riel)",
         "eurorate": ".25"
      },
      "MVR": {
         "shortname": "MRf",
         "name": "MRf (Maldivian rufiyaa)",
         "eurorate": "0.05"
      },
      "UGX": {
         "shortname": "USh",
         "name": "USh (Ugandan shilling)",
         "eurorate": ".5"
      },
      "BDT": {
         "shortname": "Tk",
         "name": "Tk (Bangladeshi taka)",
         "eurorate": "0.01"
      }
   };
   const LOCALIZATION = {
      "en-US": {
         "name": "English (US)",
         "twoMainSkills": "WARNING: This player has 2 main skills: The error of the prediction may be very high",
         "injuredPlayer": "WARNING: Injured player, the main skill is underestimated",
         "oldPlayer": "WARNING: This player is older than 27 years, the main skill is underestimated",
         "isGoalkeeper": "PsicoTSI does not predict goaltending skill sub-level",
         "skillsNotAvailable": "The skills of this player are not available",
         "form": "Form",
         "wage": "Wage",
         "high": "High",
         "average": "Average",
         "low": "Low",
         "skillPlaymaking": "Playmaking",
         "skillWinger": "Winger",
         "skillScoring": "Scoring",
         "skillPassing": "Passing",
         "skillDefending": "Defending",
         "skillKeeper": "Keeper",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "This player has recently skilled up or his secondary skills and/or form have a very low sublevel",
         "limitHigh": "This player is close to skill up or his secondary skills and/or form have a very high sublevel"
      },
      "bg": {
         "name": "български",
         "twoMainSkills": "ВНИМАНИЕ: Този играч има две основни умения - резултатът е неточен",
         "injuredPlayer": "ВНИМАНИЕ: Контузен играч, основното умение е подценено",
         "oldPlayer": "ВНИМАНИЕ: Играчът е над 27 годишен, основното умение е подценено",
         "isGoalkeeper": "PsicoTSI не предсказва нивото на умението пазене",
         "skillsNotAvailable": "Уменията на играча не са достъпни",
         "form": "Форма",
         "wage": "Заплата",
         "high": "висока",
         "average": "средна",
         "low": "ниска",
         "skillPlaymaking": "Разиграване",
         "skillWinger": "Крило",
         "skillScoring": "Голов нюх",
         "skillPassing": "Подаване",
         "skillDefending": "Защита",
         "skillKeeper": "Пазене",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Играчът е вдигнал умение скоро или вторичните му умения имат ниско ниво",
         "limitHigh": "Играчът е близо до вдигане или вторичните му умения имат високо ниво"
      },
      "bs-BA": {
         "name": "Bosanski",
         "twoMainSkills": "UPOZORENJE: Ovaj igrač ima dve glavne vještine: Greška u predviđanju može biti veoma velika",
         "injuredPlayer": "UPOZORENJE: Igrač je povređen, glavna vještina je podcenjena",
         "oldPlayer": "UPOZORENJE: Igrač ima više od 27 godina, pa je njegova glavna vještina podcenjena",
         "isGoalkeeper": "PsicoTSI ne predviđa podnivoe za golmane",
         "skillsNotAvailable": "Vještine ovog igrača nisu dostupne",
         "form": "Forma",
         "wage": "Plata",
         "high": "Visoka",
         "average": "Prosječna",
         "low": "Niska",
         "skillPlaymaking": "Veza",
         "skillWinger": "Krilo",
         "skillScoring": "Napad",
         "skillPassing": "Dodavanje",
         "skillDefending": "Odbrana",
         "skillKeeper": "Golman",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Ovom igraču je nedavno porastao nivo vještine ili su njegove sekundarne vještine i/ili forma veoma niske",
         "limitHigh": "Ovaj igrač je blizu rasta nivoa vještine ili su njegove sekundarne vještine i/ili forma veoma visoke"
      },
      "cz": {
         "name": "Čeština",
         "twoMainSkills": "UPOZORNĚNÍ: Tento hráč má 2 hlavní dovednosti, nepřesnost předpovědi může být velmi vysoká.",
         "injuredPlayer": "UPOZORNĚNÍ: Zraněný hráč, hlavní dovednost podceněna.",
         "oldPlayer": "UPOZORNĚNÍ: Tento hráč je starší 27 let, hlavní dovednost podceněna.",
         "isGoalkeeper": "PsicoTSI nepředpovídá hlavní dovednost Chytání.",
         "skillsNotAvailable": "Dovednosti hráče nejsou dostupné.",
         "form": "Forma",
         "wage": "Plat",
         "high": "Vysoká",
         "average": "Průměrná",
         "low": "Nízká",
         "skillPlaymaking": "Tvorba hry",
         "skillWinger": "Křídlo",
         "skillScoring": "Zakončování",
         "skillPassing": "Přihrávky",
         "skillDefending": "Bránění",
         "skillKeeper": "Chytání",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Tento hráč se nedávno zlepšil nebo jeho sekundární vlastnost a/nebo forma má velmi nízkou úroveň.",
         "limitHigh": "Tento hráč je blízko k zlepšení v hlavní dovednosti nebo jeho sekundární vlastnost a/nebo forma mají velmi vysokou úroveň."
      },
      "de-DE": {
         "name": "Deutsch",
         "twoMainSkills": "ACHTUNG: Dieser Spieler hat 2 Hauptskills: Der Fehler der Vorhersage ist unter Umständen sehr groß",
         "injuredPlayer": "ACHTUNG: Verletzter Spieler: Der Hauptskill wird unterschätzt",
         "oldPlayer": "ACHTUNG: Dieser Spieler ist älter als 27 Jahre: Der Hauptskill wird unterschätzt",
         "isGoalkeeper": "PsicoTSI kann keine Aussage über Torwarte machen",
         "skillsNotAvailable": "Die Werte für diesen Spieler sind nicht verfügbar",
         "form": "Form",
         "wage": "Gehalt",
         "high": "Hoch",
         "average": "Durchschnitt",
         "low": "Niedrig",
         "skillPlaymaking": "Spielaufbau",
         "skillWinger": "Flügel",
         "skillScoring": "Torschuss",
         "skillPassing": "Passspiel",
         "skillDefending": "Verteidigung",
         "skillKeeper": "Torwart",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Dieser Spieler ist vor kurzem im Hauptskill gestiegen oder seine B-Skills und/oder seine Form haben einen sehr niedrigen Sublevel",
         "limitHigh": "Dieser Spieler ist kurz vor einem Anstieg in seinem Hauptskill oder seine B-Skills und/oder seine Form haben einen sehr hohen Sublevel"
      },
      "dk": {
         "name": "Dansk",
         "twoMainSkills": "To main skills ADVARSEL: Spilleren har 2 main skills: Fejlen ved bedømmelsen er meget høj.",
         "injuredPlayer": "Skadet spiller ADVARSEL: Skadet spiller, main skillset er undervurderet",
         "oldPlayer": "Gammel spiller ADVARSEL: Spilleren er ældre end 27 år, main skillset er derfor undervurderet",
         "isGoalkeeper": "Er målmand. PsicoTSI vurdere ikke målmandsspil",
         "skillsNotAvailable": "Skills ikke tilgængelig. Skillsene for denne spiller, er ikke tilgængelig",
         "form": "form",
         "wage": "Løn",
         "high": "høj",
         "average": "gennemsnit",
         "low": "lav",
         "skillPlaymaking": "Playmaking",
         "skillWinger": "Skill fløj",
         "skillScoring": "Skill målscore",
         "skillPassing": "Skill pasning",
         "skillDefending": "Skill forsvarsspil",
         "skillKeeper": "Skill målmanden",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Stigning lav. Denne spiller er fornyligt steget i skills eller hans sekundære skills og/eller form har et meget lavt underniveau",
         "limitHigh": "Stigning høj. Denne spiller er tæt på at stige i skills eller hans sekundære skills og/eller form har et meget højt bundniveau"
      },
      "es": {
         "name": "Español",
         "twoMainSkills": "ATENCIÓN: Este jugador tiene 2 habilidades principales, el error de la predicción puede ser muy alto",
         "injuredPlayer": "ATENCIÓN: Jugador lesionado, la habilidad principal se subestima",
         "oldPlayer": "ATENCIÓN: Este jugador tiene más de 27 anos, la habilidad principal se subestima",
         "isGoalkeeper": "PsicoTSI no predice el subnivel de portería",
         "skillsNotAvailable": "Las habilidades de este jugador no están disponibles",
         "form": "Forma",
         "wage": "Sueldo",
         "high": "Alta",
         "average": "Media",
         "low": "Baja",
         "skillPlaymaking": "Jugadas",
         "skillWinger": "Lateral",
         "skillScoring": "Anotación",
         "skillPassing": "Pases",
         "skillDefending": "Defensa",
         "skillKeeper": "Portería",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Este jugador acaba de subir de nivel o su forma y/o habilidades secundarias son muy bajas",
         "limitHigh": "Este jugador está a punto de subir o su forma y/o habilidades secundarias son muy altas"
      },
      "es-CA": {
         "name": "Español, Centroamericano",
         "twoMainSkills": "ADVERTENCIA: Este jugador tiene 2 habilidades principales: El error en la predicción puede ser muy alto",
         "injuredPlayer": "ADVERTENCIA: Jugador lesionado, la habilidad principal esta menospreciada",
         "oldPlayer": "ADVERTENCIA: Este jugador es mayor de 27 años, su habilidad principal esta menospreciada",
         "isGoalkeeper": "PsicoTSI no predice el subnivel de la habilidad de portería",
         "skillsNotAvailable": "Las habilidades de este jugador no están disponibles",
         "form": "Forma",
         "wage": "Salario",
         "high": "Alta",
         "average": "Media",
         "low": "Baja",
         "skillPlaymaking": "Jugadas",
         "skillWinger": "Lateral",
         "skillScoring": "Anotación",
         "skillPassing": "Pases",
         "skillDefending": "Defensa",
         "skillKeeper": "Portería",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Este jugador ha subido de habilidad recientemente o su habilidad secundaria y/o forma tienen un subnivel muy bajo",
         "limitHigh": "Este jugador está cercano a subir en habilidad o su habilidad secundaria y/o forma tienen un subnivel muy alto"
      },
      "eu": {
         "name": "Basque",
         "twoMainSkills":"OHARRA: Jokalari honek bi dohain nagusi ditu, igarpenaren akatsa altuegia izan daiteke",
         "injuredPlayer":"OHARRA: Jokalari zauritua, dohain nagusia gutxiesten da",
         "oldPlayer":"OHARRA: Jokalari honek 27 urte baino gehiago ditu, dohain nagusia gutxiesten da",
         "isGoalkeeper":"PsicoTSI-k ez du iragartzen atezaintza dohainaren azpimaila",
         "skillsNotAvailable":"Jokalari honen dohainak ez daude eskuragarri",
         "form":"Sasoi",
         "wage":"Soldata",
         "high":"Altua",
         "average":"Ertaina",
         "low":"Baxua",
         "skillPlaymaking":"Sortze-lana",
         "skillWinger":"Hegalekoa",
         "skillScoring":"Errematea",
         "skillPassing":"Paseak",
         "skillDefending":"Defentsa",
         "skillKeeper":"Atezaintza",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow":"Jokalari honek mailaz igo berria da edo bere sasoia edota bere bigarren dohainak oso baxuak dira",
         "limitHigh":"Jokalari honek mailaz igotzear dago edo bere sasoia edota bere bigarren dohainak oso altuak dira"
      },
      "fa": {
         "twoMainSkills":"هشدار : اين بازيکن دو مهارت اصلي دارد و ممکن است خطاي پيش بيني بالا باشد",
         "injuredPlayer":"هشدار : اين بازيکن مصدوم است و مهارت اصلي دست کم گرفته ميشود",
         "oldPlayer":"هشدار : اين بازيکن بيشتر از 27 سال سن دارد مهارت اصلي دست کم گرفته ميشود",
         "isGoalkeeper":"پيسيکو ساب اسکيل دروازه باني را پيشگويي نميکند !",
         "skillsNotAvailable":"اسکيل اين بازيکن موجود نميباشد ",
         "form":"فرم",
         "wage":"دستمزد",
         "high":"زياد",
         "average":"متوسط",
         "low":"کم",
         "skillPlaymaking":"بازي سازي",
         "skillWinger":"بازي در کنار",
         "skillScoring":"گلزني",
         "skillPassing":"پاس",
         "skillDefending":"دفاع",
         "skillKeeper":"دروازه بان",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow":"اين بازيکن تازه لول اپ شده يا مهارت دوم ان يا/و فرم ان خيلي پايين است",
         "limitHigh":"اين بازيکن به لول اپ بسيار نزديک است يا مهارت دوم ان يا/و فرم خيلي بالايي دارد"
      },
      "fi": {
         "name": "Suomi",
         "twoMainSkills": "VAROITUS: Pelaajalla on 2 päätaitoa: Arvion virheellisyys saattaa olla erittäin korkea",
         "injuredPlayer": "VAROITUS: Loukkaantunut pelaaja, päätaito on aliarvioitu",
         "oldPlayer": "VAROITUS: Pelaaja on yli 27 vuotta, päätaito on aliarvioitu",
         "isGoalkeeper": "PsicoTSI ei arvioi maalivahti taidon alatasoja",
         "skillsNotAvailable": "Pelaajan taidot eivät ole saatavilla",
         "form": "Kunto",
         "wage": "Palkka",
         "high": "Korkea",
         "average": "Keskiverto",
         "low": "Matala",
         "skillPlaymaking": "Pelinrakennus",
         "skillWinger": "Laituri",
         "skillScoring": "Maalinteko",
         "skillPassing": "Syöttäminen",
         "skillDefending": "Puolustus",
         "skillKeeper": "Maalivahti",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Pelaaja on juuri nostanut tasoaan tai hänen toissijaisilla taidoilla ja/tai kunnolla on erittäin matala alataso",
         "limitHigh": "Pelaaja on lähellä nostaa tasoaan tai hänen toissijaisilla taidoilla ja/tai kunnolla on erittäin korkea alataso"
      },
      "fr": {
         "name": "Français",
         "twoMainSkills": "ATTENTION : ce joueur a deux caractéristiques principales, l'erreur de prédiction peut être importante.",
         "injuredPlayer": "ATTENTION : ce joueur est blessé, la caractéristique principale est sous-estimée.",
         "oldPlayer": "ATTENTION : ce joueur a plus de 27 ans, la caractéristique principale est sous-estimée.",
         "isGoalkeeper": "PsicoTSI ne prédit pas le niveau des gardiens.",
         "skillsNotAvailable": "Les caractéristiques de ce joueur ne sont pas disponibles.",
         "form": "Forme",
         "wage": "Salaire",
         "high": "Haute",
         "average": "Moyenne",
         "low": "Basse",
         "skillPlaymaking": "Construction",
         "skillWinger": "Ailier",
         "skillScoring": "Buteur",
         "skillPassing": "Passe",
         "skillDefending": "Défense",
         "skillKeeper": "Gardien",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Ce joueur vient juste de progresser ou ses caractéristiques secondaires et/ou sa forme ont un sous-niveau faible.",
         "limitHigh": "Ce joueur est proche de progresser ou ses caractéristiques secondaires et/ou sa forme ont un sous-niveau haut."
      },
      "gr": {
         "name": "Ελληνικά",
         "twoMainSkills": "ΠΡΟΣΟΧΗ: Αυτός ο πάικτης έχει 2 κύριες ικανότητες: Η απόκλιση της πρόβλεψης μπορεί να είναι πολύ μεγάλη",
         "injuredPlayer": "ΠΡΟΣΟΧΗ: Τραυματισμένος παίκτης, η κύρια ικανότητα είναι υποτιμημένη",
         "oldPlayer": "ΠΡΟΣΟΧΗ: Αυτός ο παίκτης είναι μεγαλύτερος από 27 χρονών, η κύρια ικανότητα είναι υποτιμημένη",
         "isGoalkeeper": "Το PsicoTSI δεν προβλέπει το υποεπίπεδο της ικανότητας του τέρματος",
         "skillsNotAvailable": "Οι ικανότητες αυτού του παίκτη δεν είναι διαθέσιμες",
         "form": "Φόρμα",
         "wage": "Μισθός",
         "high": "Υψηλή",
         "average": "Μέτρια",
         "low": "Χαμηλή",
         "skillPlaymaking": "Οργάνωση",
         "skillWinger": "Πλάγια",
         "skillScoring": "Σκοράρισμα",
         "skillPassing": "Πάσα",
         "skillDefending": "Άμυνα",
         "skillKeeper": "Τέρμα",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Αυτός ο παίκτης ανέβασε πρόσφατα επίπεδο ικανότητας ή οι δευτερεύουσες ικανότητές του ή/και η φόρμα του έχουν πολύ χαμηλό υποεπίπεδο",
         "limitHigh": "Αυτός ο παίκτης είναι κοντά στο να ανεβάσει επίπεδο ικανότητας ή οι δευτερεύουσες ικανότητές του ή/και η φόρμα του έχουν πολύ υψηλό υποεπίπεδο"
      },
      "hr": {
         "name": "Hrvatski",
         "twoMainSkills": "WARNING: Ovaj igrač ima 2 glavne vještine: Greška u predviđanju može biti vrlo velika",
         "injuredPlayer": "WARNING: Ozlijeđen igrač, glavna vještina je podcijenjena",
         "oldPlayer": "WARNING: Ovaj igrač je stariji od 27 godina, glavna vještina je podcijenjena",
         "isGoalkeeper": "PsicoTSI ne predviđa podrazine vještine za golmane",
         "skillsNotAvailable": "Vještine ovog igrača nisu dostupne",
         "form": "Forma",
         "wage": "Plaća",
         "high": "Visoka",
         "average": "Prosječna",
         "low": "Niska",
         "skillPlaymaking": "Kreiranje igre",
         "skillWinger": "Na krilu",
         "skillScoring": "U napadu",
         "skillPassing": "Proigravanje",
         "skillDefending": "U obrani",
         "skillKeeper": "Na vratima",
         "mainSkill": "Glavna vještina",
         "formSublevels": "Podrazine forme",
         "secondarySkillsSublevels": "Podrazine sporednih vještina",
         "prediction": "Predviðanje",
         "tsiPrediction": "Predviðanje na osnovu TSI",
         "wagePrediction": "Predviðanje na osnovu plaæe",
         "highDecimals": "Visoka",
         "avgDecimals": "Prosjeèna",
         "lowDecimals": "Niska",
         "wagePredictionNotAvailable": "VAŽNO: Predviðanje uz pomoæ plaæe nije dostupno za golmane, igraèe koji primaju osnovnu plaæu i u sluèajevima kada se glavna komponenta plaæe ne može otkriti",
         "limitLow": "Ovaj igrač je nedavno napredovao ili su njegove sporedne vještine i/ili forma na vrlo niskoj podrazini",
         "limitHigh": "Ovaj igrač je blizu napretka u glavnoj vještini ili su njegove sporedne vještine i/ili forma na vrlo visokoj podrazini"
      },
      "hu": {
         "name": "Magyar",
         "twoMainSkills": "WARNING: Ennek a játékosnak 2 fő képessége van: A becsült érték így nagyon magas lehet",
         "injuredPlayer": "WARNING: Sérült játékos, a fő képesség becslése alacsonyabb",
         "oldPlayer": "WARNING: Ez a játékos 27 éves elmúlt, a fő képesség becslése alacsonyabb",
         "isGoalkeeper": "A PsicoTSI a védés képesség szintjét nem képes megbecsülni",
         "skillsNotAvailable": "A játékos képességei nem elérhetőek",
         "form": "Forma",
         "wage": "Fizetés",
         "high": "Magas",
         "average": "Átlagos",
         "low": "alacsony",
         "skillPlaymaking": "Játékszervezés",
         "skillWinger": "Szélső",
         "skillScoring": "Gólszerzés",
         "skillPassing": "Átadás",
         "skillDefending": "Védekezés",
         "skillKeeper": "Védés",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Ez a játékos nemrég szintet lépett vagy a másodlagos képességei és/vagy a formája a szinten belül nagyon alacsony",
         "limitHigh": "Ez a játékos közel van a szintlépéshez vagy a másodlagos képességei és/vagy a formája a szinten belül nagyon magas"
      },
      "it-IT": {
         "name": "Italiano",
         "twoMainSkills": "ATTENZIONE: Questo giocatore ha 2 skill principali: l'errore di calcolo può essere molto alto",
         "injuredPlayer": "ATTENZIONE: Giocatore infortunato, la skill principale è sotto stimata",
         "oldPlayer": "ATTENZIONE: Questo giocatore ha più di 27 anni, la skill principale è sotto stimata",
         "isGoalkeeper": "PsicoTSI non calcola i sottolivelli dei portieri",
         "skillsNotAvailable": "Le skill del giocatore non sono disponibili",
         "form": "Forma",
         "wage": "Ingaggio",
         "high": "Alta",
         "average": "Media",
         "low": "Bassa",
         "skillPlaymaking": "Regia",
         "skillWinger": "Cross",
         "skillScoring": "Attacco",
         "skillPassing": "Passaggi",
         "skillDefending": "Difesa",
         "skillKeeper": "Parate",
         "mainSkill": "Abilità primaria",
         "formSublevels": "Decimali forma",
         "secondarySkillsSublevels": "Decimali abilità secondarie",
         "prediction": "Predizione",
         "tsiPrediction": "Predizione basata sul TSI",
         "wagePrediction": "Predizione basata sullo stipendio",
         "highDecimals": "Alti",
         "avgDecimals": "Medi",
         "lowDecimals": "Bassi",
         "wagePredictionNotAvailable": "ATTENZIONE: La predizione basata sullo stipendio non è disponibile per i portieri, per i giocatori che guadagnano il salario base e quando la componente principale dello stipendio non può essere determinata",
         "limitLow": "Questo giocatore è scattato da poco oppure le sue skill secondarie e/o la sua forma sono molto basse",
         "limitHigh": "Questo giocatore è vicino allo scatto oppure le sue skill secondarie e/o la sua forma sono molto alte"
      },
      "ka": {
         "name": "Georgian",
         "twoMainSkills": "გაფრთხილება: ამ ფეხბურთელს 2 მთავარი უნარი აქვს: შეცდომა შეიძლება ძალიან დიდი იყოს",
         "injuredPlayer": "გაფრთხილება: ფეხბურთელი ტრავმირებულია, მისი მთავარი უნარი შეუფასებელია",
         "oldPlayer": "გაფრთხილება: ეს ფეხბურთელი 27 წელზე მეტისაა, მისი მთავარი უნარი შეუფასებელია",
         "isGoalkeeper": "PsicoTSI არ ითვლის მეკარეობის უნარის ქვე–დონეს",
         "skillsNotAvailable": "ამ ფეხბურთელის უნარები ცნობილი არ არის",
         "form": "ფორმა",
         "wage": "ხელფასი",
         "high": "მაღალი",
         "average": "საშუალო",
         "low": "დაბალი",
         "skillPlaymaking": "ნახევარდაცვა",
         "skillWinger": "ფლანგი",
         "skillScoring": "თავდასხმა",
         "skillPassing": "პასი",
         "skillDefending": "დაცვა",
         "skillKeeper": "მეკარეობა",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "ამ ფეხბურთელმა ან ახლახან გაიუმჯობესა უნარი, ან მის მეორად უნარებს და/ან ფორმას ძალიან დაბალი ქვე–დონე აქვთ",
         "limitHigh": "ეს ფეხბურთელი მალე გაიუმჯობესებს უნარს, ან მის მეორად უნარებს და/ან ფორმას ძალიან მაღალი ქვე–დონე აქვთ"
      },
      "lv": {
         "name": "Latviešu",
         "twoMainSkills": "WARNING: Spēlētājam ir 2 galvenās prasmes: Pareģojuma kļūda var būt ļoti liela",
         "injuredPlayer": "WARNING: Traumēts spēlētājs, galvenā prasme nav pienācīgi novērtēta",
         "oldPlayer": "WARNING: Spēlētājs ir vecāks par 27 gadiem, galvenā prasme nav pienācīgi novērtēta",
         "isGoalkeeper": "PsicoTSI nepareģo prasmju apakšlīmei vārtu sargiem",
         "skillsNotAvailable": "Spēlētāja prasmes nav pieejamas",
         "form": "Gatavība spēlei",
         "wage": "Alga",
         "high": "Augsts apakšlīmenis",
         "average": "Vidējais apakšlīmenis",
         "low": "Zems apakšlīmenis",
         "skillPlaymaking": "Saspēle",
         "skillWinger": "Flangos",
         "skillScoring": "Realizācija",
         "skillPassing": "Piespēles",
         "skillDefending": "Aizsardzība",
         "skillKeeper": "Vārtos",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Spēlētājs nesen uzlaboja pamatprasmi, vai sekundāra prasme un/vai gatavība spēlei ir ar ļoti zemu apakšlīmeni",
         "limitHigh": "Spēlētājs drīz uzlabos pamatprasmi, vai sekundāra prasme un/vai gatavība spēlei ir ar ļoti augstu apakšlīmeni"
      },
      "nl-BE": {
         "name": "Vlaams",
         "twoMainSkills": "WAARSCHUWING: deze speler heeft 2 hoofdskills: de afwijking op de voorspelling kan zeer hoog zijn",
         "injuredPlayer": "WAARSCHUWING: geblesseerde speler, de hoofdskill wordt onderschat",
         "oldPlayer": "WAARSCHUWING: deze speler is ouder dan 27, de hoofdskill wordt onderschat",
         "isGoalkeeper": "PsicoTSI maakt geen voorspellingen voor het sublevel van keepen",
         "skillsNotAvailable": "De skills van deze speler zijn niet beschikbaar",
         "form": "Vorm",
         "wage": "Loon",
         "high": "Hoog",
         "average": "Gemiddeld",
         "low": "Laag",
         "skillPlaymaking": "Spelmaken",
         "skillWinger": "Vleugelspel",
         "skillScoring": "Scoren",
         "skillPassing": "Passen",
         "skillDefending": "Verdedigen",
         "skillKeeper": "Keepen",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Deze speler is net gestegen of zijn bijskills en/of vorm hebben een heel laag sublevel",
         "limitHigh": "Deze speler zit dicht bij het volgende level of zijn bijskills en/of vorm hebben een heel hoog sublevel"
      },
      "nl-NL": {
         "name": "Nederlands",
         "twoMainSkills": "LET OP: Deze speler heeft twee hoofdvaardigheden, de afwijking op de voorspelling kan zeer hoog zijn",
         "injuredPlayer": "LET OP: Geblesseerde speler, de hoofdvaardigheid wordt onderschat",
         "oldPlayer": "LET OP: Deze speler is ouder dan 27 jaar, de hoofdvaardigheid wordt onderschat",
         "isGoalkeeper": "PsicoTSI voorspelt geen subniveaus van de vaardigheid Keepen",
         "skillsNotAvailable": "De vaardigheden van deze speler zijn niet beschikbaar",
         "form": "Vorm",
         "wage": "Loon",
         "high": "Hoog",
         "average": "Gemiddeld",
         "low": "Laag",
         "skillPlaymaking": "Positiespel",
         "skillWinger": "Vleugelspel",
         "skillScoring": "Scoren",
         "skillPassing": "Passen",
         "skillDefending": "Verdedigen",
         "skillKeeper": "Keepen",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Deze speler is onlangs omhoog gegaan in hoofdvaardigheid of zijn andere vaardigheden en/of vorm hebben een zeer laag subniveau",
         "limitHigh": "Deze speler staat op het punt om in hoofdvaardigheid omhoog te gaan of zijn andere vaardigheden en/of vorm hebben een zeer hoog subniveau"
      },
      "no-NB": {
         "name": "Norsk, bokmål",
         "twoMainSkills": "ADVARSEL: Denne spilleren har to hovedferdigheter! Dette gjør at forutsigelsen kan være veldig feil!",
         "injuredPlayer": "ADVARSEL: Skadet spiller, hovedferdigheten er undervurdert!",
         "oldPlayer": "ADVARSEL: Denne spilleren er eldre enn 27 år, hovedferdigheten er undervurdert!",
         "isGoalkeeper": "PsicoTSI kan ikke forutse under-nivået på målvaktsferdihet!",
         "skillsNotAvailable": "Denne spillerens ferdigheter er ikke tilgjengelige",
         "form": "Form",
         "wage": "Lønn",
         "high": "Høy",
         "average": "Gjennomsnittlig",
         "low": "Lav",
         "skillPlaymaking": "Ballfordeling",
         "skillWinger": "Ving",
         "skillScoring": "Målskåring",
         "skillPassing": "Pasninger",
         "skillDefending": "Forsvar",
         "skillKeeper": "Målvakt",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Denne spilleren har akkurat steget et hakk, eller så er sekundærferdighetene og/eller formen hans på et lavt under-nivå",
         "limitHigh": "Denne spilleren er nær ved å stige ett hakk, eller så er sekundærferdighetene og/eller formen hans på et høyt under-nivå"
      },  
      "pl": {
         "name": "Polski",
         "twoMainSkills":"UWAGA: Ten gracz ma dwie równorzedne umiejetnosci. Blad oszacowania moze byc bardzo duzy",
         "injuredPlayer":"UWAGA: Gracz kontuzjowany, glówna umiejetnosc jest niedowartosciowana",
         "oldPlayer":"UWAGA: Gracz ma wiecej niz 27 lat, glówna umiejetnosc jest niedowartosciowana",
         "isGoalkeeper":"PsicoTSI nie szacuje podpoziomu umiejetnosci bramkarskich",
         "skillsNotAvailable":"Sprawdzenie umiejetnosci tego gracza jest niemozliwe",
         "form":"Forma",
         "wage":"Pensja",
         "high":"Wysoka",
         "average":"Srednia",
         "low":"Niska",
         "skillPlaymaking":"Rozgrywanie",
         "skillWinger":"Skrzydlowy",
         "skillScoring":"Skutecznosc",
         "skillPassing":"Podania",
         "skillDefending":"Defensywa",
         "skillKeeper":"Bramkarz",
         "mainSkill": "Główna umiejętność",
         "formSublevels": "Podpoziom formy",
         "secondarySkillsSublevels": "Podpoziomy pozostałych umiejętności",
         "prediction": "Oszacowanie",
         "tsiPrediction": "Oszacowanie na podstawie TSI",
         "wagePrediction": "Oszacowanie na podstawie pensji",
         "highDecimals": "Wysokie",
         "avgDecimals": "Średnie",
         "lowDecimals": "Niskie",
         "wagePredictionNotAvailable": "UWAGA: Oszacowanie na podstawie pensji nie jest możliwe dla bramkarzy, zawodników z niską pensją oraz w przypadku, gdy nie udało się ustalić głównego składnika pensji",
         "limitLow":"Ten gracz poprawil ostatnio glówna umiejetnosc albo jego drugorzedne umiejetnosci i/lub forma maja bardzo niski podpoziom",
         "limitHigh":"Ten gracz jest bardzo blisko poprawienia glównej umiejetnosci albo jego drugorzedne umiejetnosci i/lub forma maja bardzo wysoki podpoziom"
      },
      "pt-BR": {
         "name": "Português (Brasil)",
         "twoMainSkills": "ATENÇÃO: Este jogador tem 2 habilidades primarias: O erro pode ser muito alto",
         "injuredPlayer": "ATENÇÃO: Jogador machucado, a habilidade principal pode não ser estimada corretamente",
         "oldPlayer": "ATENÇÃO: Este jogador é mais velho do que 27 anos, sua principal habilidade pode não ser estimada corretamente",
         "isGoalkeeper": "PsicoTSI não faz previsões para sub-niveis dos goleiros",
         "skillsNotAvailable": "A habilidade para esse jogador nao esta liberada",
         "form": "Forma",
         "wage": "Salario",
         "high": "Alta",
         "average": "Media",
         "low": "Baixa",
         "skillPlaymaking": "Armação",
         "skillWinger": "Ala",
         "skillScoring": "Finalização",
         "skillPassing": "Assistencia",
         "skillDefending": "Defesa",
         "skillKeeper": "Goleiro",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Este jogador subiu recentemente de habilidade ou sua habilidade secundaria e/ou forma esta em um subnivel muito baixo.",
         "limitHigh": "Este jogador esta perto de subir sua habilidade ou sua habilidade secundaria e/ou forma estão em um subnivel muito alto."
      },
      "pt-PT": {
         "name": "Português",
         "twoMainSkills": "AVISO: Jogador tem duas características principais, o erro da previsão pode ser elevado",
         "injuredPlayer": "AVISO: Jogador lesionado, a característica principal está subavaliada",
         "oldPlayer": "AVISO: Jogador tem mais de 27 anos, a característica principal está subavaliada",
         "isGoalkeeper": "PsicoTSI não faz previsões na característica de Guarda-Redes",
         "skillsNotAvailable": "As características deste jogador não estão disponíveis",
         "form": "Forma",
         "wage": "Salário",
         "high": "Alta",
         "average": "Média",
         "low": "Baixa",
         "skillPlaymaking": "Criatividade",
         "skillWinger": "Ala",
         "skillScoring": "Finalização",
         "skillPassing": "Assistências",
         "skillDefending": "Defesa",
         "skillKeeper": "Guarda-Redes",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Jogador subiu recentemente de nível ou as suas características secundárias e/ou forma têm um sub-nível muito baixo",
         "limitHigh": "Jogador perto de subir de nível ou as suas características secundárias e/ou forma têm um sub-nível muito alto"
      },
      "ro": {
         "name": "Română",
         "twoMainSkills": "ATENTIE: Acest jucator are 2 skilluri principale: eroarea calculelor poate˛ fi foarte mare",
         "injuredPlayer": "ATENTIE: Jucator accidentat, skilul principal este subestimat",
         "oldPlayer": "ATENTIE: Acest jucator are mai mult de 27 de ani, skilul principal este subestimat",
         "isGoalkeeper": "PsicoTSI nu calculeaza subnivelele portarilor",
         "skillsNotAvailable": "skilurile jucatorului nu sunt disponibile",
         "form": "Formă",
         "wage": "Salariu",
         "high": "Mare",
         "average": "Medie",
         "low": "Mică",
         "skillPlaymaking": "Construcție",
         "skillWinger": "Extremă",
         "skillScoring": "Atac",
         "skillPassing": "Pase",
         "skillDefending": "Apărare",
         "skillKeeper": "Portar",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Acest jucator a sarit de mult sau skilurile sale secundare sau forma este scazuta",
         "limitHigh": "Acest jucator este aproate de salt sau skilurile sale secundare sau forma sa sunt/este foarte ridicata"
      },
      "ru": {
         "name": "Русский",
         "twoMainSkills": "ПРЕДУПРЕЖДЕНИЕ: У этого игрока есть 2 главных навыка: ошибка предсказания может быть очень высокой",
         "injuredPlayer": "ПРЕДУПРЕЖДЕНИЕ: Травмированный игрок, главный навык недооценен",
         "oldPlayer": "ПРЕДУПРЕЖДЕНИЕ: Этот игрок старше чем 27 лет, главный навык недооценен",
         "isGoalkeeper": "PsicoTSI не предсказывает подуровень навыка вратарей",
         "skillsNotAvailable": "Навыки этого игрока не доступны",
         "form": "Форма",
         "wage": "Зарплата",
         "high": "Высокий",
         "average": "Средний",
         "low": "Низкий",
         "skillPlaymaking": "Полузщита",
         "skillWinger": "Фланг",
         "skillScoring": "Нападение",
         "skillPassing": "Пас",
         "skillDefending": "Защита",
         "skillKeeper": "Вратарь",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Этот игрок недавно апнулся, или у его вторичных навыков и/или формы очень низкий подуровень",
         "limitHigh": "Этот игрок близок к апу, или у его вторичных навыков и/или формы очень высокий подуровень"
      },
      "sk": {
         "name": "Slovenčina",
         "twoMainSkills": "POZOR: Tento hráč má dve primárne schopnosti - Riziko chybného odhadu je veľmi vysoké",
         "injuredPlayer": "POZOR: Zranený hráč, jeho primárna schopnosť je podhodnotená",
         "oldPlayer": "POZOR: Tento hráč je starší ako 27 rokov, jeho primárna schopnosť je podhodnotená",
         "isGoalkeeper": "PsicoTSI neodhaduje úroveň schopnosti chytania",
         "skillsNotAvailable": "Schopnosti tohto hráča nie sú k dispozícii",
         "form": "Forma",
         "wage": "Plat",
         "high": "Vysoká",
         "average": "Priemerná",
         "low": "Nízka",
         "skillPlaymaking": "Tvorba hry",
         "skillWinger": "Krídelná hra",
         "skillScoring": "Zakončovanie",
         "skillPassing": "Prihrávky",
         "skillDefending": "Bránenie",
         "skillKeeper": "Chytanie",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Schopnosť tohto hráča sa v nedávnej dobe zlepšila alebo jeho sekundárne schopnosti a/alebo forma majú veľmi nízku podúroveň",
         "limitHigh": "Tento hráč je veľmi blízko k zlepšeniu svojej schopnosti alebo jeho sekundárne schopnosti a/alebo forma majú veľmi vysokú podúroveň"
      },
      "sr": {
         "name": "Српски",
         "twoMainSkills": "УПОЗОРЕЊЕ: Овај играч има две главне вештине: Грешка у предвиђању може бити веома велика",
         "injuredPlayer": "УПОЗОРЕЊЕ: Играч је повређен, главна вештина је подцењена",
         "oldPlayer": "УПОЗОРЕЊЕ: Играч има више од 27 година, па је његова главна вештина подцењена",
         "isGoalkeeper": "PsicoTSI не предвиђа поднивое за голмане",
         "skillsNotAvailable": "Вештине овог играча нису доступне",
         "form": "Форма",
         "wage": "Плата",
         "high": "Висока",
         "average": "Просечна",
         "low": "Ниска",
         "skillPlaymaking": "Плејмејкинг",
         "skillWinger": "Крило",
         "skillScoring": "Напад",
         "skillPassing": "Додавање",
         "skillDefending": "Одбрана",
         "skillKeeper": "На голу",
         "mainSkill": "Главна вештина",
         "formSublevels": "Поднивои форме",
         "secondarySkillsSublevels": "Поднивои секундарне вештине",
         "prediction": "Предвиђање",
         "tsiPrediction": "Предвиђање на основу TSI",
         "wagePrediction": "Предвиђање на основу плате",
         "highDecimals": "Висока",
         "avgDecimals": "Просечна",
         "lowDecimals": "Ниска",
         "wagePredictionNotAvailable": "УПОЗОРЕЊЕ: Предвиђање на основу плате није доступно за голмане, за минималну плату и када главне компоненте за плату нису препознате.",
         "limitLow": "Овом играчу је недавно порастао ниво вештине или су његове секундарне вештине и/или форма веома ниске",
         "limitHigh": "Овај играч је близу раста нивоа вештине или су његове секундарне вештине и/или форма веома високе"
      },
      "sv": {
         "name": "Svenska",
         "twoMainSkills": "VARNING: Denna spelare har 2 huvudförmågor! Felmarginalen av prognosen kan vara stor",
         "injuredPlayer": "VARNING: Skadad spelare! Huvudförmågan är undervärderad",
         "oldPlayer": "WARNING: Spelaren är över 27 år! Huvudförmågan är undervärderad",
         "isGoalkeeper": "PsicoTSI ger ej prognos av målvaktsförmågans sub-nivåer",
         "skillsNotAvailable": "Denne spelares förmågor är inte tillgängliga",
         "form": "Form",
         "wage": "Lön",
         "high": "Hög",
         "average": "Medel",
         "low": "Låg",
         "skillPlaymaking": "Spelupplägg",
         "skillWinger": "Ytter",
         "skillScoring": "Målgörare",
         "skillPassing": "Framspel",
         "skillDefending": "Försvar",
         "skillKeeper": "Målvakt",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Denne spelare har nyligen stigit en nivå i huvudförmåga eller så är hans biförmåga och/eller form väldigt låg inom sitt steg",
         "limitHigh": "Denne spelare är mkt nära att stiga en nivå i huvudförmåga eller så är hans biförmåga och/eller form väldigt hög inom sitt steg"
      },
      "tr": {
         "name": "Türkçe",
         "twoMainSkills": "DİKKAT: Oyuncunun 2 ana yeteneği var. Hata payı çok yüksek olabilir.",
         "injuredPlayer": "DİKKAT: Oyuncu sakat, ana yeteneği düşük hesaplanmıştır.",
         "oldPlayer": "DİKKAT: Oyuncu 27 yaşını geçmiş, ana yeteneği düşük hesaplanmaştır.",
         "isGoalkeeper": "PsicoTSI kaleciler için yetenek tahmini yapmaz.",
         "skillsNotAvailable": "Oyuncunun yetenekleri görünmüyor.",
         "form": "Form",
         "wage": "Maaş",
         "high": "Yüksek",
         "average": "Ortalama",
         "low": "Düşük",
         "skillPlaymaking": "Oyunkuruculuk",
         "skillWinger": "Kanat",
         "skillScoring": "Golcülük",
         "skillPassing": "Pas",
         "skillDefending": "Defans",
         "skillKeeper": "Kaleci",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Oyuncu yeni seviye atlamış veya yan yetenek ve/veya form ara değerleri çok düşük.",
         "limitHigh": "Oyuncu seviye atlamak üzere veya yan yetenek ve/veya form ara değerleri çok yüksek."
      },
      "ua": {
         "name": "Українська",
         "twoMainSkills": "УВАГА: Цей гравець має 2 основні навички: похибка прогнозування може бути дуже великою",
         "injuredPlayer": "УВАГА: Гравець травмований, тому навичка може бути недооцінена",
         "oldPlayer": "УВАГА: Гравцю більше 27 років, тому навичка може бути недооцінена",
         "isGoalkeeper": "PsicoTSI не прогнозує підрівень навички воротарства",
         "skillsNotAvailable": "Навики гравця недоступні",
         "form": "Стан",
         "wage": "Зарплата",
         "high": "Високий",
         "average": "Середній",
         "low": "Низький",
         "skillPlaymaking": "Створення гри",
         "skillWinger": "Гра на краю",
         "skillScoring": "Напад",
         "skillPassing": "Пасінг",
         "skillDefending": "Захист",
         "skillKeeper": "Воротар",
         "mainSkill": "Main skill",
         "formSublevels": "Form sublevels",
         "secondarySkillsSublevels": "Secondary skills sublevels",
         "prediction": "Prediction",
         "tsiPrediction": "TSI-based prediction",
         "wagePrediction": "Wage-based prediction",
         "highDecimals": "High",
         "avgDecimals": "Average",
         "lowDecimals": "Low",
         "wagePredictionNotAvailable": "WARNING: Wage prediction is not available for keepers, base salary and when the main wage component cannot be detected",
         "limitLow": "Цей гравець нещодавно підвищив навичку або його вторинні навички і/або стан дуже низького підрівня",
         "limitHigh": "Цей гравець близький до підвищення навички або його вторинні навички і/або стан дуже високого підрівня"
      }
   };
   if (SHOW_CURRENCIES) {
      var elem_per_page = 15;
      var total = 0;
      for (var i in HATTRICK_CURRENCIES) {
        ++total;
      }
      var current = 1;
      var text = "Available currencies (Page 1 of " + Math.ceil(total / elem_per_page) + ")\n";
      for (var i in HATTRICK_CURRENCIES) {
         text += i + ": " + HATTRICK_CURRENCIES[i].name + "\n";
         if (current % elem_per_page == 0) {
            alert(text);
            text = "Available currencies (Page " + (Math.ceil(current / elem_per_page) + 1) + " of " + Math.ceil(total / elem_per_page) + ")\n";
         }++current;
      }
      if (/.*\n.*\n/.test(text)) alert(text);
   }
   if (SHOW_LANGUAGES) {
      var elem_per_page = 15;
      var total = 0;
      for (var i in LOCALIZATION) {
        ++total;
      }
      var current = 1;
      var text = "Available languages (Page 1 of " + Math.ceil(total / elem_per_page) + ")\n";
      for (var i in LOCALIZATION) {
         text += i + ": " + LOCALIZATION[i].name + "\n";
         if (current % elem_per_page == 0) {
            alert(text);
            text = "Available languages (Page " + (Math.ceil(current / elem_per_page) + 1) + " of " + Math.ceil(total / elem_per_page) + ")\n";
         }++current;
      }
      if (/.*\n.*\n/.test(text)) alert(text);
   }
   //free some memory
   for (var i in HATTRICK_CURRENCIES) {
      if (i != CURRENCY) HATTRICK_CURRENCIES[i] = {};
   }
   for (var i in LOCALIZATION) {
      if (i != LANGUAGE) LOCALIZATION[i] = {};
   }
   const STR_S_PM = LOCALIZATION[LANGUAGE].skillPlaymaking;
   const STR_S_WG = LOCALIZATION[LANGUAGE].skillWinger;
   const STR_S_SC = LOCALIZATION[LANGUAGE].skillScoring;
   const STR_S_PS = LOCALIZATION[LANGUAGE].skillPassing;
   const STR_S_DF = LOCALIZATION[LANGUAGE].skillDefending;
   const STR_S_GK = LOCALIZATION[LANGUAGE].skillKeeper;
   const STR_FORM = LOCALIZATION[LANGUAGE].form;
   const STR_WAGE = LOCALIZATION[LANGUAGE].wage;
   const STR_F_HIGH = LOCALIZATION[LANGUAGE].high;
   const STR_F_AVG = LOCALIZATION[LANGUAGE].average;
   const STR_F_LOW = LOCALIZATION[LANGUAGE].low;
   const STR_UNDEF_MAINSKILL = LOCALIZATION[LANGUAGE].twoMainSkills;
   const STR_INJURED = LOCALIZATION[LANGUAGE].injuredPlayer;
   const STR_OLD = LOCALIZATION[LANGUAGE].oldPlayer;
   const STR_SKILL_NOT_AVAIL = LOCALIZATION[LANGUAGE].skillsNotAvailable;
   const STR_L_LOW = LOCALIZATION[LANGUAGE].limitLow;
   const STR_L_HIGH = LOCALIZATION[LANGUAGE].limitHigh;
   const STR_MAINSKILL = LOCALIZATION[LANGUAGE].mainSkill;
   const STR_FORM_SUBLEVELS = LOCALIZATION[LANGUAGE].formSublevels;
   const STR_SECONDARIES_SUBLEVELS = LOCALIZATION[LANGUAGE].secondarySkillsSublevels;
   const STR_PREDICTION = LOCALIZATION[LANGUAGE].prediction;
   const STR_TSI_PREDICTION = LOCALIZATION[LANGUAGE].tsiPrediction;
   const STR_WAGE_PREDICTION = LOCALIZATION[LANGUAGE].wagePrediction;
   const STR_DECIMALS_HIGH = LOCALIZATION[LANGUAGE].highDecimals;
   const STR_DECIMALS_AVG = LOCALIZATION[LANGUAGE].avgDecimals;
   const STR_DECIMALS_LOW = LOCALIZATION[LANGUAGE].lowDecimals;
   const STR_WAGE_PREDICTION_NA = LOCALIZATION[LANGUAGE].wagePredictionNotAvailable;
   
   const IMAGE_LOGO = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAC50lEQVR4nH1US0hUYRT+TtyJghDsrZEaQi2SFhVCWGlkmslUs+gBvaSiwoVWtrJg7qxaWeNGMLCgB7RxEkXwkZSjRGSLqClqKFLBoqCEtuL8ff99zNx56IFzzz3nfOf85/HfayilIBKqVCo4asCi3lLJM1sdZbJM/VO1hoZpMkRkCZWEtiSorDLoqBfgBr1xciEdfh08Q56mclnH2UgnCc+b4nnFVkJqQwz301kMhwwoVUPHNyLjRNZJSKLGc5E3dE7QcFKjVFDtNaqVKifyBZFtdLRY4e5BLomc/Q2UriFAvHZ9+BfKzbQeoNzNwLWpIOnTvbgFbXGsb2ncKXKF/RUUAuZFWnvkggyjCNU6408a1pOX2Xk6ixgwDwStIagu1eVmLLC6SFZjjrKJCl0jA/4ka8xuJjRNcZrAaHozaSA5zIwbgblmqhlAkdhBoG0QWEe93x2LVZ/3aPLWeuDOgFL5dNZQ/2DVTJAXrJuRJpFx8kfqS1njV8pmZo5b4FsSgQ933RobnRFNkT8Ds93MFraHgACf23WNkU3AyHeghhmO6PLs2LC9maASt8bAfa6iSqlddIwRvCdzfckaq5KjQb9IYzfweAVBtTnnSEcvRS+b4QZa0maYczOZxMBxigpHjXIalYvhjVxGp9xrZO5rJb+AE7+4t0nur0zETFtYdsLUbcRL4PU+oCrVlowBf6l3zNvwoHtgH0VDrsS6wjqyOQJsOAcM8/0TA3yU793JZ5K7hVyJ9VbeUR7dz8eMyDaKQ+RWgoYYwGvaEAFKltvw2RjQHvbk7sF5POXfodrRpzJn2EEuJ08w2SnKBPCDN6zkqu3O5xVVcW+A5MlxNOEZr+tqqjeT/wjtfALEmKWUQTuY0KTplVKDQ7CWk06edrPu13Vym+74IW8g5T2CdYLb+iC+d7r/zYxEfuQgPcN+Ss0YsG0PPMH8jM4EeBcv2Za5yEKJvBUuSPr6MNkxvj6C9fvytS+G1/QfkFZQ3LcTs5kAAAAASUVORK5CYII=';
   const IMAGE_LOW_SUBLEVELS = 'data:image/png;base64,' + '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';
   const IMAGE_HIGH_SUBLEVELS = 'data:image/png;base64,' + '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';
   const IMAGE_INJURED = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAA3ElEQVR4nGP5//8/AzqQcJX5z8zMiiL29+9vhhe7nzCiq2XB0A0FhyVN4Oxfv/4xOLw6iVUdVgPQbf/z4zcue3C7gFhAuQHSHor/QQGE7mwYAPn/x09IQIPUIsuB9LF8+fSJ4aSiAwMbGxOGRhD4+ucX2IA1DAZAHaiGe389TsUwgNkIAiDXgGyGgZ8MkOhnZ8BMMwRd8P8rA07Nfz7+YGABEcYXdmBIHlR0AtOQAGRkcH+2H9Vmfg4I/fXqV4zkya3NDbcO5nwQwKZ2ECQkXBKwxMNOrgHogYYLAADK7lfqqy1vowAAAABJRU5ErkJggg==';
   const IMAGE_UNDEF_MAINSKILL = 'data:image/png;base64,' + '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';
   const IMAGE_UNKNOWN = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRUlEQVQ4jW2T3W8UZRjFz/POdHb2q90tU7btFitVU4JoQhWsJhDXqDUak4YEjSbQXkDDjR+Y4B9A4pU3aGLgghZC0gSNVyYGotKESEAB+WrBttAtFqh2v9rt7O7MvjPzPt5Q0ojn+pxfTvI8h5gZq3WEyGzSxRtr21vfjFnWkwCjki9kc/MLP5UD9cs+5vpqP60GHNVEZnPvi18/09e3Kb6+CxSLAwRwpYLlmTuYPnX6+vWLf3y0R/GvjwGGTWN3pv/dkXVbtmq+EMgtlpArFqCYYSWbkWpKwNA03Ltw3hv74cfde6V/8hHgK6JXMn2ZM23dG0zbrWNi/EZ5dnzie6fqXqgz/GhzY+at/v4BS9egh0K4d3Oienbs3KufMl/WASDdmT4YagiZ2Zkssrf+nMrPzn3wCfPVlZpT6XQv53IoehIeCYTDkWhb+9qDAN6mLwgvbO3uulQlnWTgO/ens6/tZ/4NAG4TiXBzcrjQ0TooZR1zqZSbdxzqXCyHoAL/2sxcj64b+st2Lk8PFMNQOLUSPqORaI6GR/7RggF1N4tsMiEvXruyx5PBDinEjtYGXRcNWq+oEaXnXIkFKWG79csAcMggUTYbRnKaGnArNm6bhn92qbTv8JI72hDwxAIr2HUJn9Chu4BnC8KslOhWwgSAmk7DNVID5PmomqZ/1XGGji97xwBA6np0XiMYvg8H8EQ9UHfadA0tAQOJeOZAInw0qXgQQQBPaP6SI/d+8zD8MZGmxSLbE0qhUQjIgKd1xwvOKSHKz2tosnXa1hXQtigAC8JT9WDoPU8dX7mGDJtDT5mhLVZ5CVUjVHQDdV4cYc5OOfWTT8ejSBcWEatLWG1psNI/2/4wvJPI3B+NHHipI3VoY6mIdaaBu9IfPcx8n5gZg0RtzyWiY+/otCHn+5BrWpB3vclSzb0V1jSRaIz1NBraE+FSHjHfx2nJ45MV9/VjzLlHr7yLaNPmROzbvnhkY8QMIWytQawpAaFpqFUqqC4sYNG28fOyc2Pcrr1/gnnysTF9SNSSChmf91rJXc+2t6asFgsAIZ8vYOLB/N+/F0on8tL/cpS5+L9rXNFOolQE6IkJ0QkwVxX/VQOufMec+6/3X4cun33W+923AAAAAElFTkSuQmCC';
   const IMAGE_OLD = 'data:image/png;base64,' + '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';
   
   //Utility function number_format
  number_format = function (number, decimals, dec_point, thousands_sep) {
      // Formats a number with grouped thousands  
      // 
      // version: 1103.1210
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
              var k = Math.pow(10, prec);
              return '' + Math.round(n * k) / k;
          };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');    }
      return s.join(dec);
  };   
   // CHECKS IF AN URL IS A HATTRICK'S PLAYER PAGE
   isHattrickPlayerPage = function (href) {
      var regexp = /^http:\/\/([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl)|hattrick\.(org|ws|uol\.com\.br|interia\.pl))\/Club\/Players\/Player.aspx/i;
      return regexp.test(href);
   };
   // CHECKS IF AN URL IS A HATTRICK'S PLAYERS PAGE
   isHattrickPlayersPage = function (href) {
      var regexp = /^http:\/\/([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl)|hattrick\.(org|ws|uol\.com\.br|interia\.pl))\/Club\/Players\/(Default\.aspx)?(\?.*)?$/i;
      return regexp.test(href);
   };
   // CHECKS IF AN URL IS A HATTRICK'S NT PLAYERS PAGE
   isHattrickNTPlayersPage = function (href) {
      var regexp = /^http:\/\/([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl)|hattrick\.(org|ws|uol\.com\.br|interia\.pl))\/Club\/NationalTeam\/NTPlayers.aspx(\?.*)?$/i;
      return regexp.test(href);
   };
   // CHECKS IF AN URL IS A HATTRICK'S SEARCH PAGE
   isHattrickSearchPage = function (href) {
      var regexp = /^http:\/\/([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl)|hattrick\.(org|ws|uol\.com\.br|interia\.pl))\/World\/Transfers\/TransfersSearchResult.aspx/i;
      return regexp.test(href);
   };
   // GETS A NUMERIC VALUE FROM A SKILL LINK
   getValueFromLink = function (link) {
      var skill = -1;
      try {
         skill = link.replace(/.+ll=/i, "").match(/^\d+/);
         if (skill < 0 || skill > 20) throw "Skill (" + skill + ") out of bounds";
      } catch (e) {
         //GM_log("In function getValueFromLink()\n - " + e);
      }
      return parseInt(skill);
   };
   getSkillLevelFromLink = function (link) {
      return link.href.replace(/.+(ll|labellevel)=/i, "").match(/^\d+/);
   };
   trim = function (text) {
      return text.replace(/^\s+/, "").replace(/\s+$/, '').replace(/&nbsp;/g, "");
   };
   // GETS THE INFOTABLE
   getInfoTable = function (HTMLDocument) {
      var infoTable = null;
      try {
         var infoDiv = HTMLDocument.getElementById("ctl00_ctl00_CPContent_CPMain_pnlplayerInfo");
         var tableElements = HTMLDocument.evaluate(".//table[@class='thin']", infoDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
         if (!tableElements.snapshotItem.length === 0) throw ("Unable to find Player's Info Table");
         infoTable = tableElements.snapshotItem(0);
      } catch (e) {
         //GM_log("In function getInfoTable()\n - " + e);
      }
      return infoTable;
   };
   // GETS THE TSI OF A PLAYER
   getTSI = function (infoTable) {
      var tsi = -1;
      try {
         tsi = parseInt(infoTable.rows[1].cells[1].textContent.replace(/\D/gi, ""));
         if (tsi < 0) throw "Negative TSI (" + tsi + ").";
      } catch (e) {
         //GM_log("In function getTSI()\n - " + e);
      }
      return parseInt(tsi);
   };
   // GETS THE WAGE OF A PLAYER
   getWage = function (infoTable) {
      var wage = -1;
      try {
         wage = parseFloat(infoTable.rows[2].cells[1].textContent.replace(/[\s]*/gi, ""));
         
         wage = wage * parseFloat(HATTRICK_CURRENCIES[CURRENCY].eurorate);
         if (wage < 0) throw "Negative wage (" + wage + ").";
         if (infoTable.rows[2].cells[1].textContent.match(/\%/i)) {
            wage = wage / 1.2;
         }
      } catch (e) {
         //GM_log("In function getWage()\n - " + e);
      }
      return parseInt(wage);
   };
   // CHECKS IF A PLAYER IS INJURED
   getInjuries = function (infoTable) {
      try {
         var container = infoTable.rows[4].cells[1];
         if (container.textContent.search(/\d+/) > -1) return true;
      } catch (e) {
         //GM_log("In function getInjuries()\n - " + e);
      }
      return false;
   };
   tableExists = function (HTMLDocument) {
      try {
         var links = HTMLDocument.evaluate("//a[@class='skill']", HTMLDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
         return (links.snapshotLength > 13)
      } catch (e) {
         throw ("In function getTableExist()\n - " + e);
      }
      return false;
   };
   TLTableExists = function (inte, HTMLDocument) {
      return HTMLDocument.getElementById('ctl00_ctl00_CPContent_CPMain_dl_ctrl' + inte + '_TransferPlayer_r1');
   };
   // GETS THE AGE OF A PLAYER
   getAge = function (HTMLDocument) {
      var age = -1;
      try {
         var ageDiv = HTMLDocument.evaluate(".//div[@class='byline']", HTMLDocument.getElementById("mainBody"), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
         if (ageDiv.snapshotLength > 0) {
          age = parseInt(ageDiv.snapshotItem(0).textContent.match(/\d+/g)[0]);
         }
         if (age < 17) throw "Age (" + age + ") out of bounds";
      } catch (e) {
         //GM_log("In function getAge()\n - " + e);
         age = -1;
      }
      return age;
   };
   // GETS THE DAYS OF A PLAYER
   getDays = function (HTMLDocument) {
      var days = -1;
      try {
         var ageDiv = HTMLDocument.evaluate(".//div[@class='byline']", HTMLDocument.getElementById("mainBody"), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
         if (ageDiv.snapshotLength > 0) {
          days = parseInt(ageDiv.snapshotItem(0).textContent.match(/\d+/g)[1]);
         }
         if (days < 0 || days > 111) throw "Days (" + days + ") out of bounds";
      } catch (e) {
         //GM_log("In function getDays()\n - " + e);
         days = -1;
      }
      return days;
   };
   playerPagePsicoTSI = function (HTMLDocument) { /* GETTING SKILLS */
      var links = HTMLDocument.evaluate("//a[@class='skill']", HTMLDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      
      var goa = -1;
      var def = -1;
      var pla = -1;
      var win = -1;
      var pas = -1;
      var sco = -1;
      var sp = -1;
      
      if (links.snapshotLength == 15) {
         //New Table
         goa = getValueFromLink(links.snapshotItem(8).href);
         def = getValueFromLink(links.snapshotItem(9).href);
         pla = getValueFromLink(links.snapshotItem(10).href);
         win = getValueFromLink(links.snapshotItem(11).href);
         pas = getValueFromLink(links.snapshotItem(12).href);
         sco = getValueFromLink(links.snapshotItem(13).href);
         sp = getValueFromLink(links.snapshotItem(14).href);
         entryPoint = links.snapshotItem(8).parentNode.parentNode.parentNode.parentNode.parentNode;
      } else if (links.snapshotLength == 16) {
         //Old Table
         goa = getValueFromLink(links.snapshotItem(9).href);
         def = getValueFromLink(links.snapshotItem(13).href);
         pla = getValueFromLink(links.snapshotItem(10).href);
         win = getValueFromLink(links.snapshotItem(12).href);
         pas = getValueFromLink(links.snapshotItem(11).href);
         sco = getValueFromLink(links.snapshotItem(14).href);
         sp = getValueFromLink(links.snapshotItem(15).href);
         entryPoint = links.snapshotItem(9).parentNode.parentNode.parentNode.parentNode.parentNode;
      } else if (links.snapshotLength == 17) {
         //Old Table
         goa = getValueFromLink(links.snapshotItem(10).href);
         def = getValueFromLink(links.snapshotItem(14).href);
         pla = getValueFromLink(links.snapshotItem(11).href);
         win = getValueFromLink(links.snapshotItem(13).href);
         pas = getValueFromLink(links.snapshotItem(12).href);
         sco = getValueFromLink(links.snapshotItem(15).href);
         sp = getValueFromLink(links.snapshotItem(16).href);
         entryPoint = links.snapshotItem(10).parentNode.parentNode.parentNode.parentNode.parentNode;
      } else {
         //Page changed, PsicoTSI will not work or skills not available
         entryPoint = HTMLDocument.getElementById('ctl00_ctl00_CPContent_CPMain_updBestLatest');
         drawMessage(HTMLDocument, entryPoint)
         return;
      }
      
      var frm = getValueFromLink(links.snapshotItem(0).href);
      var sta = getValueFromLink(links.snapshotItem(1).href);
      var exp = getValueFromLink(links.snapshotItem(5).href);
      var lea = getValueFromLink(links.snapshotItem(6).href);
      var age = getAge(HTMLDocument);
      var days = getDays(HTMLDocument);
      var infoTable = getInfoTable(HTMLDocument);
      var currTSI = getTSI(infoTable);
      var currWAGE = getWage(infoTable);
      var injured = getInjuries(infoTable);
      
      //debug SKILLS
      //alert("Age: " + age + "\nTSI: " + currTSI + "\nWage: " + currWAGE + "\nInjured: " + injured + "\nForm: " + frm + "\nStamina: " + sta + "\nKeeper: " + goa + "\nPlaymaking: " + pla + "\nPassing: " + pas + "\nWinger: " + win + "\nDefending: " + def + "\nScoring: " + sco + "\nSet Pieces: " + sp);
      var playerskills = new Array(frm, sta, pla, win, sco, goa, pas, def, sp);
      var maxSkill = getMaxSkill(playerskills);
      //halt if player is a Divine or Non - existent
      if ((playerskills[maxSkill] == 20) || (maxSkill == 0)) {
         return;
      }
      var valMaxSkillAvg = 0;
      var valMaxSkillLow = 0;
      var valMaxSkillHigh = 0;

      var valMaxSkillWageLow = "N/A";
      var valMaxSkillWageAvg = "N/A";
      var valMaxSkillWageHigh = "N/A";

      var undef = undefinedMainSkill(playerskills);
      var limit = "Medium";
      var isGK = isGoalkeeper(maxSkill);
      if (!isGK) {
         valMaxSkillAvg = calcMaxSkill(playerskills, currTSI, "Avg");
         valMaxSkillLow = calcMaxSkill(playerskills, currTSI, "Low");
         valMaxSkillHigh = calcMaxSkill(playerskills, currTSI, "High");
      } else {
         valMaxSkillAvg = calcMaxSkillGK(currTSI, frm, "Avg");
         valMaxSkillLow = calcMaxSkillGK(currTSI, frm, "Low");
         valMaxSkillHigh = calcMaxSkillGK(currTSI, frm, "High");
      }

      if (SETT_SHOW_WAGE && currWAGE >= 270 && !isGK) {
        valMaxSkillWageLow = simWage(playerskills, currWAGE, age, "Low", entryPoint);
        valMaxSkillWageAvg = simWage(playerskills, currWAGE, age, "Avg", entryPoint);
        valMaxSkillWageHigh = simWage(playerskills, currWAGE, age, "High", entryPoint);
      }

      if ((valMaxSkillLow - playerskills[maxSkill] <= 0.1)) {
        limit = "Low";
      }
      if ((valMaxSkillHigh - playerskills[maxSkill] >= 0.8) || (valMaxSkillWageHigh - playerskills[maxSkill] >= 0.8)) {
        limit = "High";
      }

      drawMessage(HTMLDocument, entryPoint, isGK, undef, injured, age > 27, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWageLow, valMaxSkillWageAvg, valMaxSkillWageHigh, limit)

   };
   searchPagePsicoTSI = function (HTMLDocument) {
      var playerInfoDivs = HTMLDocument.evaluate("//div[@class='transferPlayerInfo']", HTMLDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      
      for (var i = 0, l = playerInfoDivs.snapshotLength; i < l; ++i) {
        var contextNode = playerInfoDivs.snapshotItem(i);
        var links = HTMLDocument.evaluate(".//a[@class='skill']", contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        
        if (links.snapshotLength != 11) continue;
        var sta = getValueFromLink(links.snapshotItem(3).href);
        var frm = getValueFromLink(links.snapshotItem(2).href);
        var goa = getValueFromLink(links.snapshotItem(4).href);
        var def = getValueFromLink(links.snapshotItem(8).href);
        var pla = getValueFromLink(links.snapshotItem(5).href);
        var win = getValueFromLink(links.snapshotItem(7).href);
        var pas = getValueFromLink(links.snapshotItem(6).href);
        var sco = getValueFromLink(links.snapshotItem(9).href);
        var sp = getValueFromLink(links.snapshotItem(10).href);
        
        var dataTable = contextNode.getElementsByTagName("table")[0];
        var ageCell = dataTable.rows[1].cells[1];
        var tsiCell = dataTable.rows[2].cells[1];
        var age = parseInt(ageCell.textContent.match(/\d+/gi, ""));
        var currTSI = parseInt(tsiCell.textContent.replace(/\D/gi, ""));
        var wage = 0;
        var injured = HTMLDocument.evaluate(".//img[contains(@class,'injuryInjured')]", contextNode, null, XPathResult.BOOLEAN_TYPE , null).booleanValue;
        var playerskills = new Array(frm, sta, pla, win, sco, goa, pas, def, sp);
        var maxSkill = getMaxSkill(playerskills);
        //skip player if main skill is "divine" or "non-existent"
        if ((playerskills[maxSkill] == 20) || (maxSkill == 0)) {
           continue;
        }
        var valMaxSkillAvg = 0;
        var valMaxSkillLow = 0;
        var valMaxSkillHigh = 0;
        var valMaxSkillWage = 0;
        var undef = undefinedMainSkill(playerskills);
        var limit = "Medium";
        var isGK = isGoalkeeper(maxSkill);
        if (!isGK) {
           valMaxSkillAvg = calcMaxSkill(playerskills, currTSI, "Avg");
           valMaxSkillLow = calcMaxSkill(playerskills, currTSI, "Low");
           valMaxSkillHigh = calcMaxSkill(playerskills, currTSI, "High");
        } else {
          valMaxSkillAvg = calcMaxSkillGK(currTSI, frm, "Avg");
          valMaxSkillLow = calcMaxSkillGK(currTSI, frm, "Low");
          valMaxSkillHigh = calcMaxSkillGK(currTSI, frm, "High");
        }
        
        if (valMaxSkillLow - playerskills[maxSkill] <= 0.1) {
          limit = "Low";
        }
        if (valMaxSkillHigh - playerskills[maxSkill] >= 0.8) {
          limit = "High";
        }
        //debug SKILLS
        //alert("Age: " + age + "\nTSI: " + currTSI + "\nWage: " + wage + "\nInjured: " + injured + "\nForm: " + frm + "\nStamina: " + sta + "\nKeeper: " + goa + "\nPlaymaking: " + pla + "\nPassing: " + pas + "\nWinger: " + win + "\nDefending: " + def + "\nScoring: " + sco + "\nSet Pieces: " + sp);
        //var entryPoint = node.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
        drawMessageInSearchPage(HTMLDocument, i, contextNode.lastChild, isGK, undef, injured, age > 27, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWage, limit);
      }
   };
   playersPagePsicoTSI = function (HTMLDocument, isNTPlayersPage) {
      var playerInfoDivs = HTMLDocument.evaluate("//div[@class='playerInfo']", HTMLDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      
      for (var i = 0, l = playerInfoDivs.snapshotLength; i < l; ++i) {
        var contextNode = playerInfoDivs.snapshotItem(i);
        var links = HTMLDocument.evaluate(".//a[@class='skill']", contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (links.snapshotLength > 4) try {
         
            var sta = getValueFromLink(links.snapshotItem(1).href);
            var frm = getValueFromLink(links.snapshotItem(0).href);
            
            var goa, def, pla, win, pas, sco, sp;
            if (!isNTPlayersPage) {
              if (links.snapshotLength === 12) {     
                goa = getValueFromLink(links.snapshotItem(5).href);
                def = getValueFromLink(links.snapshotItem(6).href);
                pla = getValueFromLink(links.snapshotItem(7).href);
                win = getValueFromLink(links.snapshotItem(8).href);
                pas = getValueFromLink(links.snapshotItem(9).href);
                sco = getValueFromLink(links.snapshotItem(10).href);
                sp = getValueFromLink(links.snapshotItem(11).href);
              } else if (links.snapshotLength === 13) {
                goa = getValueFromLink(links.snapshotItem(6).href);
                def = getValueFromLink(links.snapshotItem(10).href);
                pla = getValueFromLink(links.snapshotItem(7).href);
                win = getValueFromLink(links.snapshotItem(9).href);
                pas = getValueFromLink(links.snapshotItem(8).href);
                sco = getValueFromLink(links.snapshotItem(11).href);
                sp = getValueFromLink(links.snapshotItem(12).href);
              } else {
                continue;
              }
            }
            else { 

              //NT Players Page (no loyalty link)
              if (links.snapshotLength === 11) {     
                goa = getValueFromLink(links.snapshotItem(4).href);
                def = getValueFromLink(links.snapshotItem(5).href);
                pla = getValueFromLink(links.snapshotItem(6).href);
                win = getValueFromLink(links.snapshotItem(7).href);
                pas = getValueFromLink(links.snapshotItem(8).href);
                sco = getValueFromLink(links.snapshotItem(9).href);
                sp = getValueFromLink(links.snapshotItem(10).href);
              } else if (links.snapshotLength === 12) {
                goa = getValueFromLink(links.snapshotItem(5).href);
                def = getValueFromLink(links.snapshotItem(9).href);
                pla = getValueFromLink(links.snapshotItem(6).href);
                win = getValueFromLink(links.snapshotItem(8).href);
                pas = getValueFromLink(links.snapshotItem(7).href);
                sco = getValueFromLink(links.snapshotItem(10).href);
                sp = getValueFromLink(links.snapshotItem(11).href);
              } else {
                continue;
              }
            }
            
            var ageAndTSIText = contextNode.getElementsByTagName("p")[0].textContent.match(/.*$/gi)[0];
            var age = parseInt(ageAndTSIText.match(/[0-9]+/gi)[0]);           
            var currTSI = parseInt(ageAndTSIText.match(/[0-9]+/gi).slice(2).toString().replace(/[^\d]*/gi, ""));
            
            var currWAGE = 0;
            var injured = HTMLDocument.evaluate(".//img[contains(@class,'injuryInjured')]", contextNode, null, XPathResult.BOOLEAN_TYPE , null).booleanValue;
            var playerskills = new Array(frm, sta, pla, win, sco, goa, pas, def, sp);
            var maxSkill = getMaxSkill(playerskills);
            //halt if player is a Divine or Non - existent
            if ((playerskills[maxSkill] == 20) || (maxSkill == 0)) {
               continue;
            }
            var valMaxSkillAvg = 0;
            var valMaxSkillLow = 0;
            var valMaxSkillHigh = 0;
            var valMaxSkillWage = 0;
            var undef = undefinedMainSkill(playerskills);
            var limit = "Medium";
            var isGK = isGoalkeeper(maxSkill);
            if (!isGK) {
               valMaxSkillAvg = calcMaxSkill(playerskills, currTSI, "Avg");
               valMaxSkillLow = calcMaxSkill(playerskills, currTSI, "Low");
               valMaxSkillHigh = calcMaxSkill(playerskills, currTSI, "High");
               valMaxSkillWage = 0;
            } else {
                valMaxSkillAvg = calcMaxSkillGK(currTSI, frm, "Avg");
                valMaxSkillLow = calcMaxSkillGK(currTSI, frm, "Low");
                valMaxSkillHigh = calcMaxSkillGK(currTSI, frm, "High");
                valMaxSkillWage = 0;
            }
            
           if (valMaxSkillLow - playerskills[maxSkill] <= 0.1) {
              limit = "Low";
           }
           if (valMaxSkillHigh - playerskills[maxSkill] >= 0.8) {
              limit = "High";
           }
            //debug SKILLS
            //alert("Age: " + age + "\nTSI: " + currTSI + "\nWage: " + currWAGE + "\nInjured: " + injured + "\nForm: " + frm + "\nStamina: " + sta + "\nKeeper: " + goa + "\nPlaymaking: " + pla + "\nPassing: " + pas + "\nWinger: " + win + "\nDefending: " + def + "\nScoring: " + sco + "\nSet Pieces: " + sp);
            drawMessageInPlayersPage(HTMLDocument, i, contextNode, isGK, undef, injured, age > 27, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWage, limit);
         }
         catch (e) {
            //GM_log("In function playersPagePsicoTSI\n" + e);
         }
      }
   };
   drawMessage = function (HTMLDocument, entryPoint, isGK, isUndefinedMainskill, isInjured, isOld, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWageLow, valMaxSkillWageAvg, valMaxSkillWageHigh, limit) {
   
      var table = HTMLDocument.createElement("table");
      var messagesDiv = HTMLDocument.createElement("div");

      if (!tableExists(HTMLDocument)) {
          // Skills not available
          var messageP = HTMLDocument.createElement("p");
          var img = HTMLDocument.createElement("img");
          img.src = IMAGE_UNKNOWN;
          img.setAttribute("alt", "");
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
          messageP.appendChild(img);
          messageP.appendChild(HTMLDocument.createTextNode(STR_SKILL_NOT_AVAIL));
          messagesDiv.appendChild(messageP);
      }
      else {
         var mainSkillText = "";
         switch (maxSkill) {
         case 2:
            mainSkillText = STR_S_PM;
            break;
         case 3:
            mainSkillText = STR_S_WG;
            break;
         case 4:
            mainSkillText = STR_S_SC;
            break;
         case 5:
            mainSkillText = STR_S_GK;
            break;
         case 6:
            mainSkillText = STR_S_PS;
            break;
         case 7:
            mainSkillText = STR_S_DF;
            break;
         }
         
         var isWagePredictionAvailable = !(valMaxSkillWageLow == "N/A");
         
         if (SETT_USE_OLDINTERFACE) {
            if (isUndefinedMainskill) {
                // Player has more than one mainskill
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_UNDEF_MAINSKILL;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_UNDEF_MAINSKILL));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             }
             if (isInjured) {
                // Player is injured
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_INJURED;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_INJURED));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             }
             if (isOld) {
                // Player is old
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_OLD;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_OLD));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             }
             var tr = HTMLDocument.createElement("tr");
             var td1 = HTMLDocument.createElement("td");
             var td2 = HTMLDocument.createElement("td");
             var img = HTMLDocument.createElement("img");
             var link = HTMLDocument.createElement("a");
             img.src = IMAGE_LOGO;
             img.setAttribute("alt", "");
             img.setAttribute("border", "0");
             img.setAttribute("width", "20");
             img.setAttribute("height", "20");
             link.setAttribute("target", "_blank");
             link.setAttribute("href", "http://www.psicotsi.com");
             link.appendChild(img);
             td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
             td1.appendChild(link);
             td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_HIGH + "]=" + valMaxSkillHigh));
             td2.appendChild(HTMLDocument.createElement("br"));
             td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
             td2.appendChild(HTMLDocument.createElement("br"));
             td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_LOW + "]=" + valMaxSkillLow));
             td2.appendChild(HTMLDocument.createElement("br"));
             if (SETT_SHOW_WAGE) {
               td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_WAGE + "=+" + HATTRICK_CURRENCIES[CURRENCY].shortname + "]=" + valMaxSkillWageHigh));
               td2.appendChild(HTMLDocument.createElement("br"));
               td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_WAGE + "=~" + HATTRICK_CURRENCIES[CURRENCY].shortname + "]=" + valMaxSkillWageAvg));
               td2.appendChild(HTMLDocument.createElement("br"));
               td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_WAGE + "=-" + HATTRICK_CURRENCIES[CURRENCY].shortname + "]=" + valMaxSkillWageLow));
               td2.appendChild(HTMLDocument.createElement("br"));
             }
             tr.appendChild(td1);
             tr.appendChild(td2);
             table.appendChild(tr);
             if (!isWagePredictionAvailable && SETT_SHOW_WAGE) {
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_UNDEF_MAINSKILL;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_WAGE_PREDICTION_NA));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             }
             if (limit == "Low") {
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_LOW_SUBLEVELS;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_L_LOW));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             } else if (limit == "High") {
                var tr = HTMLDocument.createElement("tr");
                var td1 = HTMLDocument.createElement("td");
                var td2 = HTMLDocument.createElement("td");
                var img = HTMLDocument.createElement("img");
                img.src = IMAGE_HIGH_SUBLEVELS;
                img.setAttribute("alt", "");
                img.setAttribute("width", "16");
                img.setAttribute("height", "16");
                td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
                td1.appendChild(img);
                td2.appendChild(HTMLDocument.createTextNode(STR_L_HIGH));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
             }           
         }
         else {
           table.setAttribute("class","nowrap alltidMatches")
           
           if (isUndefinedMainskill) {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_UNDEF_MAINSKILL;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_UNDEF_MAINSKILL));
            messagesDiv.appendChild(messageP);
           }
           if (isInjured) {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_INJURED;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_INJURED));
            messagesDiv.appendChild(messageP);
           }
           if (isOld) {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_OLD;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_OLD));
            messagesDiv.appendChild(messageP);
           }
           if (!isWagePredictionAvailable && SETT_SHOW_WAGE) {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_UNDEF_MAINSKILL;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_WAGE_PREDICTION_NA));
            messagesDiv.appendChild(messageP);
           }
           
           if (limit == "Low") {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_LOW_SUBLEVELS;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_L_LOW));
            messagesDiv.appendChild(messageP);
           }

           if (limit == "High") {
            var messageP = HTMLDocument.createElement("p");
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_HIGH_SUBLEVELS;
            img.setAttribute("alt", "");
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "text-align: center; vertical-align: middle; padding-right: 3px;");
            messageP.appendChild(img);
            messageP.appendChild(HTMLDocument.createTextNode(STR_L_HIGH));
            messagesDiv.appendChild(messageP);
           }
           
           // BOOKMARK
           
           table.innerHTML= '<tr><th colspan="' + (SETT_SHOW_WAGE?'4':'2') + '" class="center"><b>' + mainSkillText.toUpperCase() + '</tr>' +
                            '<tr><th colspan="2" class="center"><b>' + STR_TSI_PREDICTION + '</b></th>' + (SETT_SHOW_WAGE?'<th colspan="2" class="center endColumn1"><b>' + STR_WAGE_PREDICTION + ' (' + HATTRICK_CURRENCIES[CURRENCY].shortname + ')</b></th>':'') + '</tr>' +
                            '<tr><td><b>' + STR_FORM_SUBLEVELS + '</b></td><td><b>' + STR_PREDICTION + '</td>' + (SETT_SHOW_WAGE?'<td class="endColumn1"><b>' + STR_SECONDARIES_SUBLEVELS + '</b></td><td><b>' + STR_PREDICTION + '</td>':'') + '</tr>' +
                            '<tr><td>' + STR_DECIMALS_HIGH + '</td><td>' + valMaxSkillHigh + '</td>' + (SETT_SHOW_WAGE?'<td class="endColumn1">' + STR_DECIMALS_HIGH + '</td><td' + (!isWagePredictionAvailable?" class=shy":"") + '>' + valMaxSkillWageHigh + '</td>':'') + '</tr>' +
                            '<tr><td>' + STR_DECIMALS_AVG + '</td><td>' + valMaxSkillAvg + '</td>' + (SETT_SHOW_WAGE?'<td class="endColumn1">' + STR_DECIMALS_AVG + '</td><td' + (!isWagePredictionAvailable?" class=shy":"") + '>' + valMaxSkillWageAvg + '</td>':'') + '</tr>' +
                            '<tr><td>' + STR_DECIMALS_LOW + '</td><td>' + valMaxSkillLow + '</td>' + (SETT_SHOW_WAGE?'<td class="endColumn1">' + STR_DECIMALS_LOW + '</td><td' + (!isWagePredictionAvailable?" class=shy":"") + '>' + valMaxSkillWageLow + '</td>':'') + '</tr>'
        }
      }
      
      if (!SETT_HIDE_UNDER_SKILLS) {
         // mainBox is the default style
         var classTypeBox = "mainBox";

         if (isAlertBoxStyle) {
            var title = HTMLDocument.createElement("strong");
            title.appendChild(HTMLDocument.createTextNode("PSICOTSI UBIQUITOUS EDITION " + VERSION));
            title.appendChild(HTMLDocument.createElement("br"));
            title.appendChild(HTMLDocument.createElement("br"));
            classTypeBox = "alert";
         }
         else {
            var title = HTMLDocument.createElement("h2");
            title.appendChild(HTMLDocument.createTextNode("PsicoTSI Ubiquitous Edition " + VERSION));
         }
         var divobj = HTMLDocument.createElement("div");
         divobj.setAttribute("class", classTypeBox);
             
         divobj.appendChild(title);
         divobj.appendChild(table);
         divobj.appendChild(messagesDiv);
        
         entryPoint.parentNode.insertBefore(divobj, entryPoint.nextSibling);
              
      }
      
      if (SETT_PREF_LEFT) {
      
         var messagePTSI = HTMLDocument.createElement("div");
         
         if (isAlertBoxStyle) {
            messagePTSI.setAttribute("class", "alert");
         }
         else {
            messagePTSI.setAttribute("class", "psico_alert");
            messagePTSI.setAttribute("style", "padding: 5px 5px 5px 5px;");
         }
        var divB = HTMLDocument.createElement("div");
        divB.setAttribute("class", "boxBody");
        if (!tableExists(HTMLDocument)) {
          var img = HTMLDocument.createElement("img");
          img.src = IMAGE_UNKNOWN;
          img.setAttribute("alt", STR_SKILL_NOT_AVAIL);
          img.setAttribute("title", STR_SKILL_NOT_AVAIL);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          messagePTSI.appendChild(img);
        }
       
        else {
         if (limit == "Low") {
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_LOW_SUBLEVELS;
            img.setAttribute("alt", STR_L_LOW);
            img.setAttribute("title", STR_L_LOW);
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "padding-right: 3px;");
            messagePTSI.appendChild(img);
         } else if (limit == "High") {
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_HIGH_SUBLEVELS;
            img.setAttribute("alt", STR_L_HIGH);
            img.setAttribute("title", STR_L_HIGH);
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "padding-right: 3px;");
            messagePTSI.appendChild(img);
         }
         if (isUndefinedMainskill) {
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_UNDEF_MAINSKILL;
            img.setAttribute("alt", STR_UNDEF_MAINSKILL);
            img.setAttribute("title", STR_UNDEF_MAINSKILL);
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "padding-right: 3px;");
            messagePTSI.appendChild(img);
         }
         if (isInjured) {
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_INJURED;
            img.setAttribute("alt", STR_INJURED);
            img.setAttribute("title", STR_INJURED);
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "padding-right: 3px;");
            messagePTSI.appendChild(img);
         }
         if (isOld) {
            var img = HTMLDocument.createElement("img");
            img.src = IMAGE_OLD;
            img.setAttribute("alt", STR_OLD);
            img.setAttribute("title", STR_OLD);
            img.setAttribute("width", "16");
            img.setAttribute("height", "16");
            img.setAttribute("style", "padding-right: 3px;");
            messagePTSI.appendChild(img);
         }
         var formH = "[" + STR_FORM + "+]=" + valMaxSkillHigh + "<br>";
         var formA = "[" + STR_FORM + "~]=" + valMaxSkillAvg + "<br>";
         var formL = "[" + STR_FORM + "-]=" + valMaxSkillLow + "<br>";
         if (SETT_SHOW_WAGE) {
           var wageH = " [" + HATTRICK_CURRENCIES[CURRENCY].shortname + "+]=" + valMaxSkillWageHigh + "<br>";
           var wageA = " [" + HATTRICK_CURRENCIES[CURRENCY].shortname + "~]=" + valMaxSkillWageAvg + "<br>";
           var wageL = " [" + HATTRICK_CURRENCIES[CURRENCY].shortname + "-]=" + valMaxSkillWageLow + "<br>";
         }
         divB.innerHTML = "<br><b>" + mainSkillText + ":</b><br>" + formH + formA + formL + (SETT_SHOW_WAGE?wageH + wageA + wageL:"");
      }
     var h3Tag = HTMLDocument.getElementsByTagName("h3")[0];
     var divobj = HTMLDocument.createElement("div");
     divobj.setAttribute("class", "subMenuBox");
     var divH = HTMLDocument.createElement("div");
     divH.setAttribute("class", "boxHead");
     var divF = HTMLDocument.createElement("div");
     divF.setAttribute("class", "boxFooter");
     var divFL = HTMLDocument.createElement("div");
     divFL.setAttribute("class", "boxLeft");
     divFL.innerHTML = "&nbsp;";
     var divL = HTMLDocument.createElement("div");
     divL.setAttribute("class", "boxLeft");
     var h2 = HTMLDocument.createElement("h2");
     h2.setAttribute("class", "psicoFeat");
     h2.innerHTML = "PsicoTSI";
     divL.appendChild(h2);
     divH.appendChild(divL);
     divobj.appendChild(divH);
     divobj.appendChild(divB);
     divF.appendChild(divFL);
     divobj.appendChild(divF);
     divB.appendChild(messagePTSI);
     var entryPoint = h3Tag.parentNode;
     entryPoint.parentNode.parentNode.insertBefore(divobj, entryPoint.nextSibling.NextSibling);
     }
   };
   drawMessageInSearchPage = function (HTMLDocument, id, entryPoint, isGK, isUndefinedMainskill, isInjured, isOld, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWage, limit) {
      if (SHOW_PSICOTSI_IN_SEARCH_PAGE_AS_LINK) {
        var al_div = HTMLDocument.createElement("div");
        al_div.setAttribute("style","clear : both;");
        var psicotsi_info_div = HTMLDocument.createElement("div");
        psicotsi_info_div.setAttribute("style","display: none");
        psicotsi_info_div.setAttribute("id","psico_info_div_" + id);
        
        var classTypeBox = "alert";
        var headerText = "PsicoTSI Ubiquitous Edition";
        var brElement = HTMLDocument.createElement("br");
        if (isAlertBoxStyle) {
           al_div.setAttribute("class", "alert");
           headerText = "PSICOTSI UBIQUITOUS EDITION";
        }
        else {
          al_div.appendChild(brElement.cloneNode(true));
        }
       var logo_img = HTMLDocument.createElement("img");
       logo_img.src = IMAGE_LOGO;
       logo_img.setAttribute("alt", "");
       logo_img.setAttribute("border", "0");
       logo_img.setAttribute("width", "16");
       logo_img.setAttribute("height", "16");
       logo_img.setAttribute("style", "vertical-align: middle; padding-right: 5px;");
       var psicotsi_hide_div = HTMLDocument.createElement("div");
       var psicotsi_hide_link = HTMLDocument.createElement("a");
       psicotsi_hide_div.appendChild(logo_img.cloneNode(true));
       psicotsi_hide_link.appendChild(HTMLDocument.createTextNode(headerText + " " + VERSION));
       psicotsi_hide_link.setAttribute("href", "javascript:{}");
       psicotsi_hide_link.setAttribute("show", "psico_show_div_" + id);
       psicotsi_hide_link.setAttribute("hide", "psico_info_div_" + id);
       // Register event handler as anonymous function
       psicotsi_hide_link.addEventListener("click", function() { HTMLDocument.getElementById(this.getAttribute("hide")).style.display = "none"; HTMLDocument.getElementById(this.getAttribute("show")).style.display = "block"; }, true);
       psicotsi_hide_div.appendChild(psicotsi_hide_link);
       psicotsi_info_div.appendChild(psicotsi_hide_div);
        var mainSkillText = "";
        switch (maxSkill) {
        case 2:
           mainSkillText = STR_S_PM;
           break;
        case 3:
           mainSkillText = STR_S_WG;
           break;
        case 4:
           mainSkillText = STR_S_SC;
           break;
        case 5:
           mainSkillText = STR_S_GK;
           break;
        case 6:
           mainSkillText = STR_S_PS;
           break;
        case 7:
           mainSkillText = STR_S_DF;
           break;
        }
        psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_HIGH + "]=" + valMaxSkillHigh));
        psicotsi_info_div.appendChild(brElement.cloneNode(true));
        psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
        psicotsi_info_div.appendChild(brElement.cloneNode(true));
        psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_LOW + "]=" + valMaxSkillLow));
        psicotsi_info_div.appendChild(brElement.cloneNode(true));
        
       if (limit == "Low") {
          var img = document.createElement("img");
          img.src = IMAGE_LOW_SUBLEVELS;
          img.setAttribute("alt", STR_L_LOW);
          img.setAttribute("title", STR_L_LOW);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          psicotsi_info_div.appendChild(img);
       }
       else if (limit == "High") {
          var img = document.createElement("img");
          img.src = IMAGE_HIGH_SUBLEVELS;
          img.setAttribute("alt", STR_L_HIGH);
          img.setAttribute("title", STR_L_HIGH);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          psicotsi_info_div.appendChild(img);
       }
       if (isUndefinedMainskill) {
          var img = document.createElement("img");
          img.src = IMAGE_UNDEF_MAINSKILL;
          img.setAttribute("alt", STR_UNDEF_MAINSKILL);
          img.setAttribute("title", STR_UNDEF_MAINSKILL);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          psicotsi_info_div.appendChild(img);
       }
       if (isInjured) {
          var img = document.createElement("img");
          img.src = IMAGE_INJURED;
          img.setAttribute("alt", STR_INJURED);
          img.setAttribute("title", STR_INJURED);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          psicotsi_info_div.appendChild(img);
       }
       if (isOld) {
          var img = document.createElement("img");
          img.src = IMAGE_OLD;
          img.setAttribute("alt", STR_OLD);
          img.setAttribute("title", STR_OLD);
          img.setAttribute("width", "16");
          img.setAttribute("height", "16");
          img.setAttribute("style", "padding-right: 3px;");
          psicotsi_info_div.appendChild(img);
       }
       
       var psicotsi_show_div = document.createElement("div");
       psicotsi_show_div.setAttribute("id","psico_show_div_" + id);
       
       var psicotsi_show_link = HTMLDocument.createElement("a");
       psicotsi_show_div.appendChild(logo_img);
       psicotsi_show_link.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
       psicotsi_show_link.setAttribute("href", "javascript:{}");
       psicotsi_show_link.setAttribute("show", "psico_info_div_" + id);
       psicotsi_show_link.setAttribute("hide", "psico_show_div_" + id);
        
       // Register event handler as anonymous function
       psicotsi_show_link.addEventListener("click", function() { HTMLDocument.getElementById(this.getAttribute("hide")).style.display = "none"; HTMLDocument.getElementById(this.getAttribute("show")).style.display = "block"; }, true);
        
       psicotsi_show_div.appendChild(psicotsi_show_link);
       al_div.appendChild(psicotsi_show_div);
       al_div.appendChild(psicotsi_info_div);
        entryPoint.parentNode.insertBefore(al_div, entryPoint.previousSibling);
      }
      else {
        var al_div = HTMLDocument.createElement("div");
        var table = HTMLDocument.createElement("table");
        var classTypeBox = "alert";
        var headerText = "PsicoTSI Ubiquitous Edition";
        if (isAlertBoxStyle) {
           al_div.setAttribute("class", "alert");
           headerText = "PSICOTSI UBIQUITOUS EDITION";
        }
        else {
           al_div.setAttribute("style", "padding: 5px 5px 5px 5px;");
        }
        al_div.setAttribute("style", "width: 60%; clear: both;");
        var tr = HTMLDocument.createElement("tr");
        var td1 = HTMLDocument.createElement("td");
        var td2 = HTMLDocument.createElement("td");
        var strong = HTMLDocument.createElement("strong");
        strong.appendChild(HTMLDocument.createTextNode(headerText + " " + VERSION));
        al_div.appendChild(strong);
        //td2.appendChild(HTMLDocument.createElement("br"));
        //td2.appendChild(HTMLDocument.createElement("br"));
        tr.appendChild(td1);
        //tr.appendChild(td2);
        table.appendChild(tr);
        if (isUndefinedMainskill) {
           // Player has more than one mainskill
           var tr = HTMLDocument.createElement("tr");
           var td1 = HTMLDocument.createElement("td");
           var td2 = HTMLDocument.createElement("td");
           var img = HTMLDocument.createElement("img");
           img.src = IMAGE_UNDEF_MAINSKILL;
           img.setAttribute("alt", "");
           img.setAttribute("width", "16");
           img.setAttribute("height", "16");
           td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
           td1.appendChild(img);
           td2.appendChild(HTMLDocument.createTextNode(STR_UNDEF_MAINSKILL));
           tr.appendChild(td1);
           tr.appendChild(td2);
           table.appendChild(tr);
        }
        if (isInjured) {
           // Player is injured
           var tr = HTMLDocument.createElement("tr");
           var td1 = HTMLDocument.createElement("td");
           var td2 = HTMLDocument.createElement("td");
           var img = HTMLDocument.createElement("img");
           img.src = IMAGE_INJURED;
           img.setAttribute("alt", "");
           img.setAttribute("width", "16");
           img.setAttribute("height", "16");
           td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
           td1.appendChild(img);
           td2.appendChild(HTMLDocument.createTextNode(STR_INJURED));
           tr.appendChild(td1);
           tr.appendChild(td2);
           table.appendChild(tr);
        }
        if (isOld) {
           // Player is old
           var tr = HTMLDocument.createElement("tr");
           var td1 = HTMLDocument.createElement("td");
           var td2 = HTMLDocument.createElement("td");
           var img = HTMLDocument.createElement("img");
           img.src = IMAGE_OLD;
           img.setAttribute("alt", "");
           img.setAttribute("width", "16");
           img.setAttribute("height", "16");
           td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
           td1.appendChild(img);
           td2.appendChild(HTMLDocument.createTextNode(STR_OLD));
           tr.appendChild(td1);
           tr.appendChild(td2);
           table.appendChild(tr);
        }
        var mainSkillText = "";
        switch (maxSkill) {
        case 2:
           mainSkillText = STR_S_PM;
           break;
        case 3:
           mainSkillText = STR_S_WG;
           break;
        case 4:
           mainSkillText = STR_S_SC;
           break;
        case 5:
           mainSkillText = STR_S_GK;
           break;
        case 6:
           mainSkillText = STR_S_PS;
           break;
        case 7:
           mainSkillText = STR_S_DF;
           break;
        }
        var tr = HTMLDocument.createElement("tr");
        var td1 = HTMLDocument.createElement("td");
        var td2 = HTMLDocument.createElement("td");
        var img = HTMLDocument.createElement("img");
        var link = HTMLDocument.createElement("a");
        img.src = IMAGE_LOGO;
        img.setAttribute("alt", "");
        img.setAttribute("border", "0");
        img.setAttribute("width", "20");
        img.setAttribute("height", "20");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", "http://www.psicotsi.com");
        link.appendChild(img);
        td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
        td1.appendChild(link);
        td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_HIGH + "]=" + valMaxSkillHigh));
        td2.appendChild(HTMLDocument.createElement("br"));
        td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
        td2.appendChild(HTMLDocument.createElement("br"));
        td2.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_LOW + "]=" + valMaxSkillLow));
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        if (limit == "Low") {
           var tr = HTMLDocument.createElement("tr");
           var td1 = HTMLDocument.createElement("td");
           var td2 = HTMLDocument.createElement("td");
           var img = HTMLDocument.createElement("img");
           img.src = IMAGE_LOW_SUBLEVELS
           img.setAttribute("alt", "");
           img.setAttribute("width", "16");
           img.setAttribute("height", "16");
           td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
           td1.appendChild(img);
           td2.appendChild(HTMLDocument.createTextNode(STR_L_LOW));
           tr.appendChild(td1);
           tr.appendChild(td2);
           table.appendChild(tr);
        } else if (limit == "High") {
           var tr = HTMLDocument.createElement("tr");
           var td1 = HTMLDocument.createElement("td");
           var td2 = HTMLDocument.createElement("td");
           var img = HTMLDocument.createElement("img");
           img.src = IMAGE_HIGH_SUBLEVELS
           img.setAttribute("alt", "");
           img.setAttribute("width", "16");
           img.setAttribute("height", "16");
           td1.setAttribute("style", "text-align: center; vertical-align: middle; width: 30px;");
           td1.appendChild(img);
           td2.appendChild(HTMLDocument.createTextNode(STR_L_HIGH));
           tr.appendChild(td1);
           tr.appendChild(td2);
           table.appendChild(tr);
        }
        al_div.appendChild(table);
        entryPoint.parentNode.insertBefore(al_div, entryPoint.previousSibling);
      }
   };
   drawMessageInPlayersPage = function (HTMLDocument, id, entryPoint, isGK, isUndefinedMainskill, isInjured, isOld, maxSkill, valMaxSkillHigh, valMaxSkillAvg, valMaxSkillLow, valMaxSkillWage, limit) {
      var al_div = HTMLDocument.createElement("div");
      var psicotsi_info_div = HTMLDocument.createElement("div");
      psicotsi_info_div.setAttribute("style","display: none");
      psicotsi_info_div.setAttribute("id","psico_info_div_" + id);
      
      var classTypeBox = "alert";
      var headerText = "PsicoTSI Ubiquitous Edition";
      var brElement = HTMLDocument.createElement("br");
      if (isAlertBoxStyle) {
         al_div.setAttribute("class", "alert");
         headerText = "PSICOTSI UBIQUITOUS EDITION";
      }
      else {
        al_div.appendChild(brElement.cloneNode(true));
      }
     var logo_img = HTMLDocument.createElement("img");
     logo_img.src = IMAGE_LOGO;
     logo_img.setAttribute("alt", "");
     logo_img.setAttribute("border", "0");
     logo_img.setAttribute("width", "16");
     logo_img.setAttribute("height", "16");
     logo_img.setAttribute("style", "vertical-align: middle; padding-right: 5px;");
     var psicotsi_hide_div = HTMLDocument.createElement("div");
     var psicotsi_hide_link = HTMLDocument.createElement("a");
     psicotsi_hide_div.appendChild(logo_img.cloneNode(true));
     psicotsi_hide_link.appendChild(HTMLDocument.createTextNode(headerText + " " + VERSION));
     psicotsi_hide_link.setAttribute("href", "javascript:{}");
     psicotsi_hide_link.setAttribute("show", "psico_show_div_" + id);
     psicotsi_hide_link.setAttribute("hide", "psico_info_div_" + id);
     // Register event handler as anonymous function
     psicotsi_hide_link.addEventListener("click", function() { HTMLDocument.getElementById(this.getAttribute("hide")).style.display = "none"; HTMLDocument.getElementById(this.getAttribute("show")).style.display = "block"; }, true);
     psicotsi_hide_div.appendChild(psicotsi_hide_link);
     psicotsi_info_div.appendChild(psicotsi_hide_div);
      var mainSkillText = "";
      switch (maxSkill) {
      case 2:
         mainSkillText = STR_S_PM;
         break;
      case 3:
         mainSkillText = STR_S_WG;
         break;
      case 4:
         mainSkillText = STR_S_SC;
         break;
      case 5:
         mainSkillText = STR_S_GK;
         break;
      case 6:
         mainSkillText = STR_S_PS;
         break;
      case 7:
         mainSkillText = STR_S_DF;
         break;
      }
      psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_HIGH + "]=" + valMaxSkillHigh));
      psicotsi_info_div.appendChild(brElement.cloneNode(true));
      psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
      psicotsi_info_div.appendChild(brElement.cloneNode(true));
      psicotsi_info_div.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_LOW + "]=" + valMaxSkillLow));
      psicotsi_info_div.appendChild(brElement.cloneNode(true));
      
     if (limit == "Low") {
        var img = document.createElement("img");
        img.src = IMAGE_LOW_SUBLEVELS;
        img.setAttribute("alt", STR_L_LOW);
        img.setAttribute("title", STR_L_LOW);
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");
        img.setAttribute("style", "padding-right: 3px;");
        psicotsi_info_div.appendChild(img);
     }
     else if (limit == "High") {
        var img = document.createElement("img");
        img.src = IMAGE_HIGH_SUBLEVELS;
        img.setAttribute("alt", STR_L_HIGH);
        img.setAttribute("title", STR_L_HIGH);
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");
        img.setAttribute("style", "padding-right: 3px;");
        psicotsi_info_div.appendChild(img);
     }
     if (isUndefinedMainskill) {
        var img = document.createElement("img");
        img.src = IMAGE_UNDEF_MAINSKILL;
        img.setAttribute("alt", STR_UNDEF_MAINSKILL);
        img.setAttribute("title", STR_UNDEF_MAINSKILL);
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");
        img.setAttribute("style", "padding-right: 3px;");
        psicotsi_info_div.appendChild(img);
     }
     if (isInjured) {
        var img = document.createElement("img");
        img.src = IMAGE_INJURED;
        img.setAttribute("alt", STR_INJURED);
        img.setAttribute("title", STR_INJURED);
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");
        img.setAttribute("style", "padding-right: 3px;");
        psicotsi_info_div.appendChild(img);
     }
     if (isOld) {
        var img = document.createElement("img");
        img.src = IMAGE_OLD;
        img.setAttribute("alt", STR_OLD);
        img.setAttribute("title", STR_OLD);
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");
        img.setAttribute("style", "padding-right: 3px;");
        psicotsi_info_div.appendChild(img);
     }
     
     var psicotsi_show_div = document.createElement("div");
     psicotsi_show_div.setAttribute("id","psico_show_div_" + id);
     
     var psicotsi_show_link = HTMLDocument.createElement("a");
     psicotsi_show_div.appendChild(logo_img);
     psicotsi_show_link.appendChild(HTMLDocument.createTextNode(mainSkillText + " [" + STR_FORM + "=" + STR_F_AVG + "]=" + valMaxSkillAvg));
     psicotsi_show_link.setAttribute("href", "javascript:{}");
     psicotsi_show_link.setAttribute("show", "psico_info_div_" + id);
     psicotsi_show_link.setAttribute("hide", "psico_show_div_" + id);
      
     // Register event handler as anonymous function
     psicotsi_show_link.addEventListener("click", function() { HTMLDocument.getElementById(this.getAttribute("hide")).style.display = "none"; HTMLDocument.getElementById(this.getAttribute("show")).style.display = "block"; }, true);
      
     psicotsi_show_div.appendChild(psicotsi_show_link);
     al_div.appendChild(psicotsi_show_div);
     al_div.appendChild(psicotsi_info_div);
     entryPoint.appendChild(al_div);
   };
   // GETS PLAYER'S MAIN SKILL
   getMaxSkill = function (vector) {
      var vmax = 0;
      var pmax = 0;
      for (var i = 2; i < vector.length - 1; i++) {
         if (vector[i] - vmax > 0) {
            vmax = vector[i];
            pmax = i;
         };
      };
      return pmax;
   };
   // CHECKS IF A PLAYER HAS MORE THAN ONE MAIN SKILL
   undefinedMainSkill = function (vector) {
      var vmax = 0;
      var pmax = 0;
      for (var i = 2; i < vector.length - 1; i++) {
         if (vector[i] - vmax > 0) {
            vmax = vector[i];
            pmax = i;
         };
      };
      for (var i = 2; i < vector.length - 1; i++) {
         if (vector[i] - vector[pmax] == 0 && i != pmax) {
            return true;
         };
      };
      return false;
   };
   // CHECKS IF PLAYER IS A GOALKEEPER
   isGoalkeeper = function (maxSkill) {
      return (maxSkill == 5);
   };
   // FOR DEBUG PURPOSES ONLY
   debugalert = function (text) {
      //GM_log(text); //log to GM console
      //dump(text + "\n"); //dump to console
      //alert(text); //dump to alert box - wrong practice
   };
   // ---------------------------------------------------------------------------
   calcMaxSkillGK = function (TSI, form, formSubLevel) {
      //tnx to phinetom (8430364)
      var form_factor = (form * 0.025) + 0.110655;
      var level = (Math.pow((100.5 * TSI) / (form_factor), 1 / 3.4)) / 10 + 1;
      
      //form sublevel adjustment
      if (formSubLevel == "Low") {
         level = level * 1.00854;
      } else if (formSubLevel == "High") {
         level = level * 0.99179;
      }
      
      //form adjustment
      switch (form) {
        case 4:
          level = level * 0.99941;
          break;
        case 5:
          level = level * 0.99964;
          break;
        case 6:
          level = level * 0.99984;
          break;
        case 7:
          level = level * 1;
          break;
        case 8:
          level = level * 1.00013;
          break;
        default:
          break;
      }
      
      return number_format(level, 2);
   };
   // Calculates the MaxSkill value for a player with "WAGE"
   calcMaxSkill = function (playerskills, TSI, formSubLevel) {
      var pinput = new Array(1, 0, 0, 0, 0, 0, 0, 0);
      // Neural Network Input values 
      // Form
      if (formSubLevel == "Low") {
         pinput[1] = playerskills[0] + 0.01;
      };
      if (formSubLevel == "Avg") {
         pinput[1] = playerskills[0] + 0.5;
      };
      if (formSubLevel == "High") {
         pinput[1] = playerskills[0] + 0.99;
      };
      if (pinput[1] > 8) {
         pinput[1] = 8;
      };
      // Stamina
      if (playerskills[1] < 9) {
         pinput[2] = playerskills[1] + 0.25;
      } else {
         pinput[2] = playerskills[1];
      };
      pinput[3] = playerskills[2] + 0.25;
      pinput[4] = playerskills[3] + 0.25;
      pinput[5] = playerskills[4] + 0.25;
      pinput[6] = playerskills[6] + 0.25;
      pinput[7] = playerskills[7] + 0.25;
      // Main skill
      var pskillMax = getMaxSkill(playerskills);
      if (pskillMax > 5) {
         pskillMax = pskillMax - 1;
      };
      pskillMax = pskillMax + 1;
      if (pinput[pskillMax] > 7) {
         pinput[pskillMax] = pinput[pskillMax] - 0.2;
      } else {
         pinput[pskillMax] = pinput[pskillMax] - 0.1;
      }
      // Recognising mainSkill
      switch (pskillMax) {
      case 3:
         mainSkill = "PM";
         break;
      case 4:
         mainSkill = "WG";
         break;
      case 5:
         mainSkill = "SC";
         break;
      case 6:
         mainSkill = "PS";
         break;
      case 7:
         mainSkill = "DF";
         break;
      };
      // Starting approximation
      var level = pinput[pskillMax];
      var sublevel = 0;
      var err = 10000;
      var newTSI = sim(pinput, mainSkill);
      var cont = 0;
      while (err > 1 && cont < 100) {
         if (newTSI > TSI) {
            sublevel = sublevel - Math.pow(0.5, cont);
         }
         if (newTSI < TSI) {
            sublevel = sublevel + Math.pow(0.5, cont);
         }
         pinput[pskillMax] = level + sublevel;
         newTSI = sim(pinput, mainSkill);
         err = Math.abs(newTSI - TSI);
         cont++;
      };
      // Extreme values correction
      if (sublevel < 0) {
         sublevel = sublevel / 8;
      };
      if (sublevel > 1) {
         sublevel = 1 + (sublevel - 1) / 8;
      };
      // Output
      return number_format(level + sublevel, 2);
   };
   
   simWage = function (playerskills, wage, age, predictionType, debugEntryPoint) {
      //                             0    1    2    3    4    5    6    7    8
      //var playerskills = new Array(frm, sta, pla, win, sco, goa, pas, def, sp);
      var magicNumbers = [ "", "", "Playmaking", "Winger", "Scoring", "Keeper", "Passing", "Defending" ];
      
      var comparing_wage = wage;
      //DEBUG
      var debug= "\n";
      debug += "WAGE (without 20%): " + number_format(wage, 0, "", "") + "\n";

      //removing base salary from wage
      wage -= 250;

      //removing set pieces from wage
      wage = wage / (1 + (0.0025 * Math.max(0,playerskills[8]))); 
      debug += "WAGE (without SP and base salary): " + number_format(wage, 0, "", "") + "\n";
      
      if (age >= 29 && age <= 37) {
        wage = wage / (1 - ((age - 28) / 10))
        debug += "WAGE (without AGE impact): " + number_format(wage, 0, "", "") + "\n";
        comparing_wage = wage * (1 + (0.0025 * Math.max(0, playerskills[8]))) + 250;
      }
                 
      var coefficients = { // wage = (a * (skill ^ b)) [* c, if secondary skill] [* d, if wage > 20000]
                          //sk    a             b             c     d
                          "2" : [ 0.0010521344, 6.4942886699, 0.50, 0.7610 ], //playmaking [FINE_<_19]
                          "3" : [ 0.0004944616, 6.5213669538, 0.50, 0.7536 ], //winger     [FINE_<_14]
                          "4" : [ 0.0010592649, 6.4474853149, 0.50, 0.7894 ], //scoring    [FINE_<_17]
                          "5" : [ 0.0005010000, 6.4000000000, 0.50, 1      ], //keeping    [PLACEHOLDER]
                          "6" : [ 0.0005181863, 6.5616611725, 0.50, 0.7494 ], //passing    [FINE_<_11]
                          "7" : [ 0.0008697870, 6.4795864072, 0.50, 0.7815 ]  //defending  [FINE_<_18]
                          };
      
      var subtractFromSkill = 1; //default low prediction
      
      switch (predictionType) {
        case "High":
          subtractFromSkill = 0.01;
          break;
        case "Avg":
          subtractFromSkill = 0.5;
          break;
        default: //Low or invalid parameter
          subtractFromSkill = 1;
          predictionType = "Low";
      };

      //calculating mainSkill basing on wage
      var mainSkill = 0;
      var max_low = 0;
      var max_high = 0;
      var detectable = false;
            
      for (loop = 2; loop <= 7; ++loop) {
        var skill = playerskills[loop];
        if (skill < 1) {
          continue;
        }
        var wage_component_low = coefficients[loop.toString()][0] * Math.pow(skill - 1, coefficients[loop.toString()][1]);
        var wage_component_high = coefficients[loop.toString()][0] * Math.pow(skill - 0.01, coefficients[loop.toString()][1]);

        // > 20000 discount
        if (wage_component_low > 20000) wage_component_low = 20000 + ((wage_component_low - 20000) * coefficients[loop.toString()][3]);
        if (wage_component_high > 20000) wage_component_high = 20000 + ((wage_component_high - 20000) * coefficients[loop.toString()][3]);
        //GM_log("Testing skill: " + magicNumbers[loop] + "\nwage_component_low: " + wage_component_low + "\nwage_component_high: " + wage_component_high +"\n");

        if ((wage_component_low > max_low)) {
          mainSkill = loop;
          max_low = wage_component_low;
          if (wage_component_low > max_high) {
            detectable = true;
            max_high = wage_component_high;
          }
          else {
            detectable = false;
          }
        }
      }
      
      if (!detectable) {
        return "N/A";
      }
      
      debug += "MAIN SKILL: " + magicNumbers[mainSkill] + "\n";
      
      
      var simskill = 0;
      var simwage = 0;
      //removing secondary skills from wage
      for (loop = 2; loop <= 7; ++loop) {
        if (loop == mainSkill) continue;
        var subskill = playerskills[loop] - subtractFromSkill;
        var wage_sub_component = coefficients[loop.toString()][0] * Math.pow(subskill, coefficients[loop.toString()][1]);

        // > 20000 discount
        if (wage_sub_component > 20000) wage_sub_component = 20000 + ((wage_sub_component - 20000) * coefficients[loop.toString()][3]);
        
        //secondary skill 50% discount 
        wage_sub_component = wage_sub_component * coefficients[loop.toString()][2]
        
        if (isNaN(wage_sub_component) || wage_sub_component < 0) {
          wage_sub_component = 0;
        }
        //high skill discount
        debug += "WAGE_SECONDARY_COMPONENT (" + magicNumbers[loop] + "): " + number_format(wage_sub_component, 0, "", "") + " (" + subskill + ")\n";
        wage -= wage_sub_component;
        simwage += wage_sub_component;
      }
        
      var wage_main_component = 0;
      wage_main_component = coefficients[mainSkill.toString()][0] * Math.pow((playerskills[mainSkill] - 1), coefficients[mainSkill.toString()][1]);

      // > 20000 discount on main component
      if (wage_main_component > 20000) wage_main_component = 20000 + ((wage_main_component - 20000) * coefficients[mainSkill.toString()][3]);
      
      if (mainSkill == 5) {
        wage_main_component = wage_main_component * keeping_adj;
      }

      // remove > 20000 discount on wage to get proper skill prediction
      if (wage > 20000) wage = 20000 + ((wage - 20000) / coefficients[mainSkill.toString()][3]);
      
      simwage += wage_main_component;
      simwage = simwage * (1 + (0.0025 * Math.max(0, playerskills[8]))) + 250;
      debug += "EST. WAGE WITHOUT SECONDARIES: " + number_format(wage, 0, "", "") + "\n";
      debug += "SIM_MAIN_SKILL_WAGE (0 decimals): " + number_format(wage_main_component,0, "", "") + "\n";   
      debug += "SIM_WAGE (main skill + secondaries + sp + base salary): " + number_format(simwage, 0, "", "") + "\n";
      debug += "DIFFERENCE RATIO (WAGE / SIM_WAGE): " + number_format((1 - (comparing_wage / simwage)) * 100, 2) + "%" + "\n";
      
      //make prediction           
      simskill = Math.pow(wage/coefficients[mainSkill.toString()][0], 1/coefficients[mainSkill.toString()][1]);
      
      debug += "SIM_MAIN_SKILL: " + number_format(simskill + 1, 2) + "\n";
      if (debugEntryPoint) {
         var debugDiv = document.createElement("div");
         debugDiv.setAttribute("class","shy");
         debugDiv.innerHTML = "<br/><b>PsicoTSI DEBUG</b><br/>";
         debugDiv.innerHTML += "New wage prediction - Type: <b>" + predictionType + "</b><br/>";
         debugDiv.innerHTML += debug.replace(/\n/ig,"<br/>");
         //debugEntryPoint.parentNode.insertBefore(debugDiv, entryPoint.nextSibling);
      } else {
        if (typeof(GM_log) == "function") {
          GM_log(debug);
        } else {
          alert(debug);
        }
      }
      return number_format(simskill + 1, 2);
   };
   
   // Math Functions
   log10 = function (x) {
      return Math.log(x) / Math.log(10);
   };
   tanh = function (x) {
      var res;
      res = (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
      return res;
   };
   // Neural Network simulation
   // ---------------------------------------------------------------------------
   sim = function (pinput, mainSkill) {
      // PlayMaking
      if (mainSkill == "PM") {
         var meanp = new Array(0, 6.37560321715818, 6.8295799821269, 9.18572832886573, 3.82265415549598, 3.80478105451296, 3.97028596961573, 3.7316800714924);
         var stdp = new Array(1, 1.27931620538792, 2.068121874063, 2.64814773627783, 1.25944526479215, 1.23643585187472, 1.41074883966057, 1.200261576732);
         var meant = 3.44951885218574;
         var stdt = 0.69620243901134;
         var IW = new Array(new Array(-0.978045139728464, 0.00301687457750677, -0.048841998968147, -0.404735131313642, -0.0362317679661696, 0.0379976393063689, 0.010290023976103, -0.0147760361492318), new Array(0.177344012094537, -0.0314455259871624, -0.013402962769724, -0.0892159635787965, 0.149684600060107, 0.0129173095791169, -0.0627676826414977, -0.0140624018719683), new Array(1.36521889783453, -0.00637939702956546, 0.0153705440757856, 0.556447703939989, -0.0241943951441762, -0.0493823748265197, -0.21427629169483, -0.00101793041393101), new Array(0.196053426793117, -0.02079754895227, 0.00105220616818506, -0.0444692661662335, -0.125304863742313, 0.000952177286031863, 0.0555651518906449, -0.0497925245034302), new Array(0.692342189504846, -0.651215170938504, -0.0773280848125734, -0.0299899107255201, 0.0102778174399698, -0.00729484262085779, 0.019086283284809, -0.0704572408040264), new Array(1.58818822767738, -0.00884634038142363, 0.0255779210123106, 0.487506584936556, 0.0814314344175245, -0.251017981688899, 0.0901880561018751, -0.0166380710765307), new Array(-0.349984574105507, -0.00620252485894222, 0.0100312003087919, 0.23260892557538, 0.0260982230419322, 0.111026396362525, 0.037817626462384, -0.319122796193367));
         var LW = new Array(1.45005860984466, -5.08419804987079, -3.09594267675791, -2.19350882485451, -3.55681002955351, 0.212673777310428, -2.17305546140852, 0.669079546193561);
         var phidden = new Array(1, 0, 0, 0, 0, 0, 0, 0);
         for (var i = 1; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
               phidden[i] = phidden[i] + ((pinput[j] - meanp[j]) / stdp[j]) * IW[i - 1][j];
            };
            phidden[i] = tanh(phidden[i]);
         };
         var poutput = 0;
         for (var k = 0; k < 8; k++) {
            poutput = poutput + phidden[k] * LW[k];
         };
         return Math.pow(10, poutput * stdt + meant);
      };
      // Winger
      if (mainSkill == "WG") {
         var meanp = new Array(0, 6.11559888579387, 6.38544568245125, 4.19986072423398, 9.07820334261824, 3.78899721448468, 4.09261838440111, 3.94707520891365);
         var stdp = new Array(1, 1.35219800030418, 1.87676157709407, 1.60495529959243, 1.92480738248487, 1.23672495343354, 1.35904038569407, 1.42286644873124);
         var meant = 3.34828115361494;
         var stdt = 0.50248598993484;
         var IW = new Array(new Array(-0.660772073958308, -0.01833440065284, -0.0878004061319683, 0.00014551774875378, -0.09581305124871, -0.018902774261109, -0.0267581613703629, -0.0533105102621847), new Array(0.512421132362667, 0.0382337124466166, 0.0773884058542099, -0.0478971000074065, -0.227090911654096, 0.0749380149540642, -0.0192496230658901, 0.591939574122913), new Array(-1.37612347434054, -0.0172255940860493, 0.0372075456228269, 0.732664914012482, -0.636332206449557, 0.0660828680402308, -0.13569710277901, -0.0969683305370428), new Array(-0.767604389511557, 0.0164740614163994, 0.0996416926112712, 0.0574768132107605, 0.406081043832447, -0.0338799984024221, -0.755504987651843, 0.0404297482763663), new Array(0.51444631220829, 0.0227910340702376, -0.194434226880239, 0.0157033323422596, 0.145696031716467, 0.0280447811851727, 0.0997626514667552, 0.0600548994144656));
         var LW = new Array(-4.87066368568217, -8.12793906828807, -0.56007809906691, 0.451613517207488, 0.354350670244603, 2.07516604461788);
         var phidden = new Array(1, 0, 0, 0, 0, 0);
         for (var i = 1; i < 6; i++) {
            for (var j = 0; j < 8; j++) {
               phidden[i] = phidden[i] + ((pinput[j] - meanp[j]) / stdp[j]) * IW[i - 1][j];
            };
            phidden[i] = tanh(phidden[i]);
         };
         var poutput = 0;
         for (var k = 0; k < 6; k++) {
            poutput = poutput + phidden[k] * LW[k];
         };
         return Math.pow(10, poutput * stdt + meant);
      };
      // Scoring
      if (mainSkill == "SC") {
         var meanp = new Array(0, 6.21562558619396, 5.79731757643969, 3.79764584505721, 3.78432751828925, 9.20751266179118, 4.23921403113862, 3.88655974488839);
         var stdp = new Array(1, 1.45803238481507, 1.84919443347091, 1.29668412881596, 1.21518918313263, 1.71476790521195, 1.54547609249067, 1.29572069955967);
         var meant = 3.45478105603469;
         var stdt = 0.44019807215147;
         var IW = new Array(new Array(1.40301200769146, -0.0193144940635949, 0.0212311747405729, -0.175540588154821, -0.0221115046234967, 0.214900394271821, 0.0193996813745877, -0.0481966024580163), new Array(-1.30320677336796, -0.00823005974306588, -0.0639798654429837, -0.0548890263553145, -0.000909477091528763, -0.439094120327123, 0.616393481014018, -0.00643510347147235), new Array(0.622274133245999, 0.0155796819413849, 0.231654894650702, -0.0891031925337777, -0.157262349055432, -0.589802519029839, -0.143798421154869, -0.187230559566363), new Array(-0.634112378069713, -0.000944335329076177, -0.0544022297082993, 0.0193751289262962, -0.0100586795623683, -0.106747528361095, 9.52666848716332e-005, -0.035002277549141), new Array(-0.760416443748201, -0.00710422254483257, -0.0438615652834481, 0.102521784762147, -0.0281872796781719, -0.0687360185898756, 0.0163874310887414, -0.228778191132918), new Array(-2.04885929453845, -0.320961567561186, 0.000944441355045404, -0.0305253294471756, -0.00788624645149755, 0.0126358849478757, 0.00808561844967016, -0.00871625102475451), new Array(0.283890100480124, 0.0136008146777745, -0.362135507458957, -0.00175774533580776, 0.0181290187333429, 0.220512760178359, 0.044816292969784, 0.032774317851683));
         var LW = new Array(-7.7074616828558, -4.81464556813888, 0.640026643980887, 0.221373217042846, -17.1398121382442, 2.59419730774328, -4.26616397837132, 1.10880653486695);
         var phidden = new Array(1, 0, 0, 0, 0, 0, 0, 0);
         for (var i = 1; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
               phidden[i] = phidden[i] + ((pinput[j] - meanp[j]) / stdp[j]) * IW[i - 1][j];
            };
            phidden[i] = tanh(phidden[i]);
         };
         var poutput = 0;
         for (var k = 0; k < 8; k++) {
            poutput = poutput + phidden[k] * LW[k];
         };
         return Math.pow(10, poutput * stdt + meant);
      };
      // Passing
      if (mainSkill == "PS") {
         var meanp = new Array(0, 5.9037558685446, 6.04694835680751, 4.12323943661972, 4.09976525821596, 4.21713615023474, 7.21807511737088, 4.38615023474178);
         var stdp = new Array(1, 1.52228260105579, 1.95290122400408, 1.29144037033675, 1.29438644360604, 1.49333417169661, 0.961187627213399, 1.67817798097032);
         var meant = 3.06630240883934;
         var stdt = 0.42308172264001;
         var IW = new Array(new Array(-11.8900701342496, -0.024750835138891, -0.965752396040145, -2.09746089518353, -0.321967528454612, -2.38676435871213, -5.1471801821007, 7.79174276667143), new Array(0.529380858245977, 0.0291519802983588, 0.0369583467350457, 0.032424613698893, 0.0329191863310305, 0.0396041328798249, 0.0930316090276224, 0.0356752670740693), new Array(2.33113350771975, 3.74579049731695, 7.11876326800507, -7.91110226838671, 3.6497359930875, -3.87258670301254, -3.046829371455, 5.84457458310682));
         var LW = new Array(-3.83433618763949, 0.297797052746795, 8.55140826231407, -0.0817402547000788);
         var phidden = new Array(1, 0, 0, 0);
         for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
               phidden[i] = phidden[i] + ((pinput[j] - meanp[j]) / stdp[j]) * IW[i - 1][j];
            };
            phidden[i] = tanh(phidden[i]);
         };
         var poutput = 0;
         for (var k = 0; k < 4; k++) {
            poutput = poutput + phidden[k] * LW[k];
         };
         return Math.pow(10, poutput * stdt + meant);
      };
      // Defending
      if (mainSkill == "DF") {
         var meanp = new Array(0, 6.71400113830393, 5.55150825270347, 3.49132043255549, 3.53173022196927, 3.54083665338645, 3.75028457598179, 8.03890153670999);
         var stdp = new Array(1, 1.48828675945146, 1.84177487301679, 1.14089446002011, 1.1547523721879, 1.09262970647274, 1.27111995210437, 1.91951279588256);
         var meant = 3.07079169070856;
         var stdt = 0.54669631751747;
         var IW = new Array(new Array(0.6857172999329, 0.144851901928772, 0.00732053581209846, 0.142004608852104, 0.322390526898797, 0.541747526748434, 0.00470511682361453, -0.352618377429687), new Array(0.620509248945402, -0.0126640050506412, -0.0313294540757459, 0.0726382032031436, -0.0658046623810817, -0.0531578337102174, 0.14309876313257, -0.262817885221702), new Array(0.361958560232547, 0.0191873845346643, 0.0940541699357571, -0.042618354807883, 0.123768814062805, 0.178214776227766, 0.0870625029013581, 0.545801377669313), new Array(0.807238317377399, 0.050804039114291, 0.0338844355782919, 0.246852103250382, -0.0694942575939604, -0.10098194009457, -0.354751810513075, -0.124777986713548), new Array(-0.341621423026568, 0.000309270803772757, 0.00956076398728777, 0.175139999720122, -0.0332175436812512, -0.0333469154384476, 0.0646493157528646, -0.0239336387359904), new Array(2.76039548716256, -0.00904355194026333, 1.64943269580411, -0.0338036046909946, -0.198593977982261, -0.109517200651956, -0.167444994960601, -0.230909331468331), new Array(1.58875346153719, 0.293418924006587, 0.0211646546315773, 0.0824895902178759, 0.0040093750686147, 0.0394329201279045, 0.020570514119798, -0.0305463551011085));
         var LW = new Array(0.140377452993393, -0.339571400603176, -2.30959398112466, 0.985381658295128, -0.767870805617256, 2.35039694690841, 0.215556071649187, 2.22390988552588);
         var phidden = new Array(1, 0, 0, 0, 0, 0, 0, 0);
         for (var i = 1; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
               phidden[i] = phidden[i] + ((pinput[j] - meanp[j]) / stdp[j]) * IW[i - 1][j];
            };
            phidden[i] = tanh(phidden[i]);
         };
         var poutput = 0;
         for (var k = 0; k < 8; k++) {
            poutput = poutput + phidden[k] * LW[k];
         };
         return Math.pow(10, poutput * stdt + meant);
      };
   };
   // MAIN FUNCTION
   pub.main = function () {
      var HTMLDocument = document;
      var href = HTMLDocument.location.href;
      try {
         if (isHattrickPlayerPage(href)) playerPagePsicoTSI(HTMLDocument);
         else if (SHOW_PSICOTSI_IN_SEARCH_PAGE && isHattrickSearchPage(href)) searchPagePsicoTSI(HTMLDocument);
         else if (SHOW_PSICOTSI_IN_PLAYERS_PAGE && (isHattrickPlayersPage(href) || isHattrickNTPlayersPage(href))) playersPagePsicoTSI(HTMLDocument, isHattrickNTPlayersPage(href));
      } catch(e) { 
        //GM_log(e)
      }
   };
   return pub;
}();
org.hattrick.PsicoTSI.main();