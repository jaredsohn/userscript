// ==UserScript==
// @name           איקרים למצביא
// @version        2.0.1
// @namespace      doctorlol_ikariam
// @description    כלי עזר למצביא הדגול - גנרל הברית

// @include        http://s*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include        http://s*.ikariam.*/?view=embassyGeneralAttacksToAlly*
// @include        http://s*.il.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include        http://s*.il.ikariam.*/?view=embassyGeneralAttacksToAlly*




// ==/UserScript==

// require        http://userscripts.org/scripts/source/57756.user.js
/*
TODO:
- dodać możliwość wyboru pokazywania raportu: tekst sformatowany/zwykły tekst
- zmienić sposób pokazywania zmian na stronie - szczegółowe zmiany
- wrzucić dźwięk na zewnętrzny serwer, a dźwięku nie puszczać za pomocą flasha
- przy testowaniu skryptu dodać napis "to jest tylko test"
- użyć jQuery:
    - ładne animacje przy rozwijaniu/zwijaniu obiektów,
    - przełączanie pozycji nad/pod z ładną animacją
    - ataki generowane własnoręcznie,
    - zapis czasu zrobiony przeze mnie (nie odczytywać napisu z czasem tylko liczbę milisekund ze skryptu),
- ?? zrobić force update ??

POPRAWIĆ BŁĘDY:
- zatrzymywanie odliczania czasu do nadejścia floty (zmienić sposób wrzucania okna),
- przy dodawaniu tytułu strony przy wyświetlaniu alarmu, nie psuć wszystkich timerów :)
- usunąć jedno niedociągnięcie w fukcji getAttackType...
*/


GM_registerMenuCommand('IGH::Delete settings',menu_delete_settings);

// zwiększane przy każdej zmianie wymagającej resetowania ustawień
const currversion = 16;

// rzeczywista wersja gry
//ScriptUpdater.check(66604, '0.40.11');
//ScriptUpdater.forceCheck(66604, '0.0.0');

/*
  thank to guy who wrote this :)
  http://joanpiedra.com/jquery/greasemonkey/
  I've changed function name a bit
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Wait until jQuery is loaded
GM_JQWait(onJQLoaded);

/*************************************************************************************************/
/******************************************* LANGUAGES *******************************************/
/*************************************************************************************************/

const LANGS =
{
  "pl": // krwq
   {
    /* Opcje - błędy dopuszczalne */
    options:               "Opcje",
    lastrefresh1:          "Ostatnio odświeżono",
    lastrefresh2:          "sekund temu",
    alarminlastingbattles: "Alarm w trwających bitwach",
    alarmonendofbattle:    "Alarm na zakończenie bitwy",
    alarmonabort:          "Alarm na cofnięcie ataku",
    optionpos:             "Pozycja opcji",
    refreshinterval:       "Odświeżaj co (0 - wyłączone)",
    testmode:              "Tryb testowania alarmu",
    testedalarmtype:       "Typ testowanego alarmu (1-5)",
    sound:                 "Dźwięk",
    on:                    "włączony",
    off:                   "wyłączony",
    top:                   "góra",
    bottom:                "dół",
    change:                "zmień",
    enterinterval:         "Podaj co jaki czas ma odświeżać stronę (w sekundach)",
    enteralarmtype:        "Podaj typ alarmu (1-5)",
    badvalue1:             "Zła wartość!",
    badvalue2:             "Zła wartość (1-5)!",

    /* Komunikaty ataków - błędy dopuszczalne */
    title:        "Generale! Otwórz zakładkę!",
    nochanges:    "Strona się nie zmieniła.",
    warning:      "UWAGA!",
    newattack:    "NOWY ATAK!",
    changes1:     "ZMIANA ATAKU!",
    changes2:     "Zmiana ataku!",
    abortattack:  "Atak cofnięty!",
    endofbattle:  "Koniec walki!",

    /* Raport */
    report:            "Raport",
    sumofenemiesunits: "Suma wrogich jednostek",
    nomembersattacked: "Aktualnie żaden z członków twojego sojuszu nie jest atakowany.",

    /* AKCJE - UWAGA! BŁĘDY NIEDOPUSZCZALNE! MUSI POKRYWAĆ SIĘ CO DO ZNAKU! */
    occupytown:    "Okupuj miasto!",
    pillage:       "Plądrowanie",
    ontheway:      "w drodze",
    blockharbour:  "Blokuj port!"
   },
  "org": // krwq
   {
    /* Options */
    options:               "Options",
    lastrefresh1:          "Last refresh",
    lastrefresh2:          "seconds ago",
    alarminlastingbattles: "Notify lasting battles",
    alarmonendofbattle:    "Notify end of battle",
    alarmonabort:          "Notify aborted attack",
    optionpos:             "Options position",
    refreshinterval:       "Refresh interval (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Tested alarm type (1-5)",
    sound:                 "Sound",
    on:                    "on",
    off:                   "off",
    top:                   "top",
    bottom:                "bottom",
    change:                "change",
    enterinterval:         "Enter refresh interval time (in seconds)",
    enteralarmtype:        "Enter type of attack (1-5)",
    badvalue1:             "Bad value!",
    badvalue2:             "Bad value (1-5)!",

    /* Attacks messages - errors in translating allowed */
    title:        "General! Open the tab!",
    nochanges:    "Site did not change.",
    warning:      "WARNING!",
    newattack:    "NEW ATTACK!",
    changes1:     "ATTACK CHANGED!",
    changes2:     "Attack changed!",
    abortattack:  "Attack aborted!",
    endofbattle:  "End of battle!",

    /* Report - errors in translating allowed */
    report:            "Report",
    sumofenemiesunits: "Sum of enemies' units",
    nomembersattacked: "No members of your alliance are being attacked at the moment.",

    /* ACTIONS - WARNING! ERRORS NOT ALLOWED! IT MUST BE TRANSLATED EXACTLY AS IT IS IN THIS LANGUAGE. CASE SENSITIVE */
    /* BAD TRANSLATION OF THIS CAUSE SCRIPT DOES NOT WORK */
    occupytown:    "Occupy town!",
    pillage:       "Pillage",
    ontheway:      "underway",
    blockharbour:  "Block port!"
   },
  "il": // Dannidin
   {
    /* Options */
    options:               "אפשרויות",
    lastrefresh1:          "רענון אחרון ",
    lastrefresh2:          "שניות עברו",
    alarminlastingbattles: "הודע קרבות שנותרו",
    alarmonendofbattle:    "הודע קרבות שהסתיימו",
    alarmonabort:          "הודע קרבות שנסוגו",
    optionpos:             "מיקום אפשרויות",
    refreshinterval:       "הפסקת רענונים (0=כבוי)",
    testmode:              "מצב בדיקה",
    testedalarmtype:       "סוג התראה לבדיקה (1-5)",
    sound:                 "קול",
    on:                    "דולק",
    off:                   "כבוי",
    top:                   "חלק עליון", 
    bottom:                "חלק תחתון",
    change:                "לשנות",
    enterinterval:         "הכנס זמן בין רענונים (בשניות)",
    enteralarmtype:        "הכנס סוג התקפה (1-5)",
    badvalue1:             "יא צולע! ערך לא נכון!",
    badvalue2:             "שרוט. בין (1-5)!",

    /* Attacks messages */
    title:                 "המפקד! חדשות מהקריה, המפקד!",
    nochanges:             "הכל ללא שינוי המפקד.",
    warning:               ". אזהרה! שחר אדום! אנחנו מותקפים",
    newattack:             "תוקפים אותנו המפקד!",
    changes1:              "ההתקפה שונתה!",
    changes2:              "התקפה אחרת?",
    abortattack:           "התקפה בוטלה!",
    endofbattle:           "נגמר הקרב!",

    /* Report */
    report:            "דו'ח משדה הקרב המפקד!",
    sumofenemiesunits: ":מס' יחידות האויב",
    nomembersattacked: ".תן לשים ת'ראש על דיונה... אין התקפות אצלנו, המפקד! צריך להגיד תודה לבורא עולם, וגם לדוקטור צחוק..",

    /* Actions */
    occupytown:   "עיר כבושה",
    pillage:      "בזיזה",
    ontheway:     "בדרך",
    blockharbour: "נמל חסום"
   },
  "gr": // vassilis
   {
    /* Options */
    options: "????????",
    lastrefresh1: "????????? ???µ?????",
    lastrefresh2: "???????????? ????",
    alarminlastingbattles: "???µ????? ???? ?? ???????",
    alarmonendofbattle: "???µ????? ????? µ????",
    alarmonabort: "???µ????? ?????µ??? ???????",
    optionpos: "??????? ????",
    refreshinterval: "???µ?? ????????? (0 - ???????)",
    testmode: "????µ?",
    testedalarmtype: "????? ???????µ?? ??? ????µ? (1-5)",
    sound: "????",
    on: "??????",
    off: "????????",
    top: "?????",
    bottom: "????",
    change: "??????",
    enterinterval: "??????? ???µ?? ????????? (?? ??????)",
    enteralarmtype: "??????? ?????? ???????? (1-5)",
    badvalue1: "????? ??µ?!",
    badvalue2: "????? ??µ? (1-5)!",

    /* Attacks messages */
    title: "?????????! ?????? ??? ???????!",
    nochanges: "??µ?? ??????.",
    warning: "?????????????!!!",
    newattack: "??? ???????!",
    changes1: "? ??????? ??????!",
    changes2: "? ??????? ??????!",
    abortattack: "? ??????? ?????????!",
    endofbattle: "????? µ????!",

    /* Report */
    report: "??????? µ????",
    sumofenemiesunits: "?????? ???????? ????µ???",
    nomembersattacked: "?????? µ???? ??? ??µµ????? ??? ??? ??????? ??????? ???? ??? ????µ?.",

    /* Actions */
    occupytown: "??????ß? ??? ????!",
    pillage: "????????",
    ontheway: "???`????",
    blockharbour: "????? ?? ??µ???!"
  },
  "fr": // randalph (Thanks To Anank for her help)
   {
    /* Options */
    options:               "Options",
    lastrefresh1:          "Derniere actualisation depuis: ",
    lastrefresh2:          "seconde(s)",
    alarminlastingbattles: "Indiquer la durée des attaques",
    alarmonendofbattle:    "Signaler la fin des attaques",
    alarmonabort:          "Signaler les attaques annulés",
    optionpos:             "Position du rapport",
    refreshinterval:       "Actualiser (0 - off)",
    testmode:              "Mode test",
    testedalarmtype:       "Tester les alarmes (1-5)",
    sound:                 "Alarme sonore",
    on:                    "on",
    off:                   "off",
    top:                   "Haut",
    bottom:                "Bas",
    change:                "Change",
    enterinterval:         "Entrez un intervalle (en secondes)",
    enteralarmtype:        "Choisir l'alarme (1-5)",
    badvalue1:             "Erreur de saisi!",
    badvalue2:             "Erreur de saisi (1-5)!",

    /* Attacks messages */
    title:        "General! Vous avez une alerte!",
    nochanges:    "Aucun changement.",
    warning:      "ATTENTION!",
    newattack:    "Nouvelle attaque!",
    changes1:     "Attaque(s) annulée(s), mais autre(s) attaque(s) lancée(s) ",
    changes2:     "Fin de toutes les attaques, l'ennemi abandonne le combat",
    abortattack:  "Attaque annulée!",
    endofbattle:  "Fin de l'affrontement!",

    /* Report */
    report:            "Rapport",
    sumofenemiesunits: "Nombre d'ennemi(s)' unité(s)",
    nomembersattacked: "Aucun membre de votre alliance n`est attaqué pour le moment..",

    /* Actions */
    occupytown:    "Occuper la ville !",
    pillage:       "Piller",
    ontheway:      "(en cours)",
    blockharbour:  "Bloquer le port"
   },
  "de": // Sacrifice, simon.thesorcerer
   {
    /* Options */
    options:               "Optionen",
    lastrefresh1:          "Letzte Aktualisierung",
    lastrefresh2:          "vor wenigen Sekunden",
    alarminlastingbattles: "Benachrichtige über laufende Schlachten",
    alarmonendofbattle:    "Benachrichtige über die Beendigung einer Schlacht",
    alarmonabort:          "Benachrichtige über abgebrochenen Angriff",
    optionpos:             "Position der Optionen",
    refreshinterval:       "Aktualisierungs Intervall (0 - off)",
    testmode:              "Test Modus",
    testedalarmtype:       "Getesteter Alarmtyp (1-5)",
    sound:                 "Sound",
    on:                    "an",
    off:                   "aus",
    top:                   "oben",
    bottom:                "unten",
    change:                "ändern",
    enterinterval:         "Aktualisierungsintervall eingeben(in Sekunden)",
    enteralarmtype:        "Eingabe Angriffsart (1-5)",
    badvalue1:             "Falscher Wert!",
    badvalue2:             "Falscher Wert (1-5)!",

    /* Attacks messages */
    title:       "General! Öffne einen Tab!",
    nochanges:   "Seite wurde nicht aktualisiert.",
    warning:     "WARNUNG!",
    newattack:   "NEUER ANGRIFF!",
    changes1:    "ANGRIFF GEÄNDERT!",
    changes2:    "Angriff geändert!",
    abortattack: "Angriff abgebrochen!",
    endofbattle: "Schlacht beendet!",

    /* Report */
    report:            "Report",
    sumofenemiesunits: "Summe gegnerischer Einheiten",
    nomembersattacked: "Kein Mitglied deiner Allianz wird zurzeit angegriffen.",

    /* Actions */
    occupytown:   "Stadt besetzen!",
    pillage:      "Plündern",
    ontheway:     "unterwegs",
    blockharbour: "Hafen blockieren!"
   },
  "dk": // MicCo
   {
    /* Options */
    options:               "Muligheder",
    lastrefresh1:          "Seneste genopfrisk",
    lastrefresh2:          "sekunder siden",
    alarminlastingbattles: "Advisér varig kampe",
    alarmonendofbattle:    "Advisér slutningen af kampen",
    alarmonabort:          "Advisér afbrudt angreb",
    optionpos:             "Mulig position",
    refreshinterval:       "Genopfrisk interval (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Testet alarm type (1-5)",
    sound:                 "Lyd",
    on:                    "on",
    off:                   "off",
    top:                   "top",
    bottom:                "bund",
    change:                "andre",
    enterinterval:         "Indtast genopfrisk interval tid (i sekunder)",
    enteralarmtype:        "Indtast type af angreb (1-5)",
    badvalue1:             "Darlig vardi!",
    badvalue2:             "Darlig vardi (1-5)!",

    /* Attacks messages */
    title:        "General! Abn fanen!",
    nochanges:    "Siden andrede sig ikke.",
    warning:      "ADVARSEL!",
    newattack:    "NYT ANGREB!",
    changes1:     "ANGREB ANDRET!",
    changes2:     "Angreb andret!",
    abortattack:  "Angreb afbrudt!",
    endofbattle:  "SLut pa kamp!",

    /* Report */
    report:            "Rapport",
    sumofenemiesunits: "Sum af fjender' enheder",
    nomembersattacked: "Ingen medlemmer af din alliance er under angreb.",

    /* Actions */
    occupytown:    "Besat by!",
    pillage:       "Plyndring",
    ontheway:      "undervejs",
    blockharbour:  "Bloker havn!"
   },
  "net": // ercy
   {
    /* Options */
    options:               "Secenekler",
    lastrefresh1:          "Son Yenileme",
    lastrefresh2:          "Saniye Once",
    alarminlastingbattles: "Süren Savasi Bildir",
    alarmonendofbattle:    "Savas Bitisini Bildir",
    alarmonabort:          "Iptal Edilmis Atagi Bildir",
    optionpos:             "IGH Pencere Pozisyonu",
    refreshinterval:       "Yenileme Araligi (0 - off)",
    testmode:              "Test mod",
    testedalarmtype:       "Test edilmis alarm tipi (1-5)",
    sound:                 "Ses",
    on:                    "Ac",
    off:                   "Kapa",
    top:                   "Ust",
    bottom:                "Alt",
    change:                "Degis",
    enterinterval:         "Yenileme Zaman Araligi Gir (saniyeler)",
    enteralarmtype:        "Atak tipini gir (1-5)",
    badvalue1:             "Yanlis Deger!",
    badvalue2:              "Yanlis Deger (1-5)!",

    /* Attacks messages */
    title:        "General! Sekmesini Ac!",
    nochanges:    "Alan degismedi.",
    warning:      "DiKKAT!",
    newattack:    "YENI SALDIRI!",
    changes1:     "ATAK DEGISTI!",
    changes2:     "Atak degisti!",
    abortattack:  "Atak iptal!",
    endofbattle:  "Savasin Sonu!",

    /* Report */
    report: "Rapor",
    sumofenemiesunits: "Dusman birimlerin toplami",
    nomembersattacked: "Su anda ittifakinin hic bir uyesi saldiri almiyor..",

    /* Actions */
    occupytown:   "isgal et",
    pillage:      "yagmala",
    ontheway:     "devam",
    blockharbour: "liman blokaji!"
   },
  "lt": // edita
   {
    /* Options */
    options:               "Nustatymai",
    lastrefresh1:          "Paskutinis atnaujinimas",
    lastrefresh2:          "prieš sekundžiu",
    alarminlastingbattles: "Ispeti apie vykstančius mušius",
    alarmonendofbattle:    "Ispeti apie mušio pabaigą",
    alarmonabort:          "Ispeti apie nutrauktą ataką",
    optionpos:             "IGH lango vieta",
    refreshinterval:       "Atnaujinimo intervalas (0 - išjungta)",
    testmode:              "Testavimo režimas",
    testedalarmtype:       "Testuojamas ispejimo signalas (1-5)",
    sound:                 "garsas",
    on:                    "ijungtas",
    off:                   "išjungtas",
    top:                   "viršus",
    bottom:                "apačia",
    change:                "keisti",
    enterinterval:         "Iveskite atnaujinimo intervalą (sekundemis)",
    enteralarmtype:        "Iveskite atakos tipą (1-5)",
    badvalue1:             "Blogas nustatymas!",
    badvalue2:             "Blogas nustatymas (1-5)!",

    /* Attacks messages */
    title:       "Pagrindinis! atidaryti naujoje korteleje!",
    nochanges:   "Puslapis nepasikeite",
    warning:     "ISPEJIMAS",
    newattack:   "NAUJAS PUOLIMAS!",
    changes1:    "PUOLIMAS PASIKEITE!",
    changes2:    "Puolimas pasikeite!",
    abortattack: "Puolimas atšauktas!",
    endofbattle: "Mušio pabaiga!",

    /* Report */
    report:            "Ataskaita",
    sumofenemiesunits: "Priešo vienetu kiekis",
    nomembersattacked: "Šiuo metu puolamu aljanso nariu nera.",

    /* Actions */
    occupytown:   "Okupuoti miestą!",
    pillage:      "Plešti",
    ontheway:     "pakeliui",
    blockharbour: "Blokuoti uostą!"
   },
  "rs": // general_rs
   {
    /* Options */
    options:               "Opcije",
    lastrefresh1:          "Poslednje osvezavanje",
    lastrefresh2:          "sekundi",
    alarminlastingbattles: "Obavesti o bitkama koje traju",
    alarmonendofbattle:    "Obavesti o zavrsetku bitke",
    alarmonabort:          "Obavesti o dolazecem napadu",
    optionpos:             "IGH pozicija prozora",
    refreshinterval:       "Interval osvezavanja (0 - iskljuceno)",
    testmode:              "Test mod",
    testedalarmtype:       "Tip testiranog alarma e (1-5)",
    sound:                 "Zvuk",
    on:                    "ukljucen",
    off:                   "iskljucen",
    top:                   "vrh",
    bottom:                "dno",
    change:                "promena",
    enterinterval:         "Unesite period osvezavanja (u sekundama)",
    enteralarmtype:        "Unesite tip napada (1-5)",
    badvalue1:             "Pogresna vrednost!",
    badvalue2:             "Pogresna vrednost (1-5)!",

    /* Attacks messages */
    title:        "Generale! Otvori tab!",
    nochanges:    "Nema promene.",
    warning:      "UPOZORENJE!",
    newattack:    "NOVI NAPAD!",
    changes1:     "PROMENA NAPADA!",
    changes2:     "PROMENA NAPADA!",
    abortattack:  "NAPAD PRISTIGAO!",
    endofbattle:  "KRAJ BITKE!",

    /* Report */
    report:            "Izvestaj",
    sumofenemiesunits: "Broj neprijateljskih jedinica",
    nomembersattacked: "Niko iz vaseg saveza nije napadnut momentalno.",

    /* Actions */
    occupytown:    "???????? ????!",
    pillage:       "??????",
    ontheway:      "?? ????",
    blockharbour:  "???????? ????!"
   },
  "ru": // Zeratull
   {
    /* Options */
    options:               "?????",
    lastrefresh1:          "????????? ??????????",
    lastrefresh2:          "?????? ?????",
    alarminlastingbattles: "?????????? ? ????????? ??????",
    alarmonendofbattle:    "?????????? ? ?????????? ?????",
    alarmonabort:          "?????????? ?? ?????? ?????",
    optionpos:             "??????? ?????",
    refreshinterval:       "???????? ?????????? (0 - ????)",
    testmode:              "????? ????????????",
    testedalarmtype:       "???????????????? ??? ?????? (1-5)",
    sound:                 "????",
    on:                    "???",
    off:                   "????",
    top:                   "????",
    bottom:                "???",
    change:                "????????",
    enterinterval:         "??????? ???????? ?????????? (? ????????)",
    enteralarmtype:        "??????? ??? ????? (1-5)",
    badvalue1:             "???????? ????????!",
    badvalue2:             "???????? ???????? (1-5)!",

    /* Attacks messages */
    title:       "?????! ???????? ???????!",
    nochanges:   "???? ?? ?????????",
    warning:     "????????!",
    newattack:   "????? ?????!",
    changes1:    "????? ??????????!",
    changes2:    "????? ??????????!",
    abortattack: "????? ????????!",
    endofbattle: "?????????? ?????!",

    /* Report */
    report:            "?????",
    sumofenemiesunits: "??????????? ??????????",
    nomembersattacked: "? ?????? ?????? ???? ???????? ? ????????????.",

    /* Actions */
    occupytown:   "?????? ?????!",
    pillage:      "?????",
    ontheway:     "?? ??????",
    blockharbour: "???????"
   },
  "hu": // Sracz66
   {
    /* Options */
    options:               "Beállítások",
    lastrefresh1:          "Utolsó frissítés",
    lastrefresh2:          "másodperce",
    alarminlastingbattles: "Értesítés folyó csatákról",
    alarmonendofbattle:    "Értesítés csata végéről",
    alarmonabort:          "Értesítés megszakadt támadásokról",
    optionpos:             "IGH pozíció",
    refreshinterval:       "Frissítési időköz (0 - off)",
    testmode:              "Teszt üzemmód",
    testedalarmtype:       "Tesztelt riasztás tipus (1-5)",
    sound:                 "Hang",
    on:                    "Be",
    off:                   "Ki",
    top:                   "Felül",
    bottom:                "Alul",
    change:                "Változtatás",
    enterinterval:         "Rögzíts frissítési időközt (másodpercben)",
    enteralarmtype:        "Rögzíts támadás tipust (1-5)",
    badvalue1:             "Hibás érték!",
    badvalue2:             "Hibás érték (1-5)!",

    /* Attacks messages */
    title:        "Tábornok! Nyisd meg a lapot!",
    nochanges:    "Az oldal nem változott.",
    warning:      "FIGYELEM!",
    newattack:    "ÚJ TÁMADÁS!",
    changes1:     "VÁLTOZTÁS A TÁMADÁSBAN!",
    changes2:     "A támadás megváltozott!",
    abortattack:  "A támadás megszűnt!",
    endofbattle:  "Csata vége!",

    /* Report */
    report:            "Jelentés",
    sumofenemiesunits: "Összes ellenséges egység",
    nomembersattacked: "No members of your alliance are being attacked at the moment.",

    /* Actions */
    occupytown:    "Megszállás!",
    pillage:       "Fosztás!",
    ontheway:      "Folyamatban",
    blockharbour:  "Blokád!"
   },
  "nl": // Darkgrumly and Traceshot
   {
    /* Options */
    options:               "opties",
    lastrefresh1:          "Laatste vernieuwing",
    lastrefresh2:          "seconden geleden",
    alarminlastingbattles: "Notificeer gevechten die nu bezig zijn",
    alarmonendofbattle:    "Notificeer einde van gevecht",
    alarmonabort:          "Notificeer geannuleerde aanval",
    optionpos:             "Positie van opties",
    refreshinterval:       "Vernieuwings interval (0 - uit)",
    testmode:              "Test modus",
    testedalarmtype:       "getest alarmtype (1-5)",
    sound:                 "geluid",
    on:                    "aan",
    off:                   "uit",
    top:                   "boven",
    bottom:                "beneden",
    change:                "verander",
    enterinterval:         "Voer vernieuwings interval in (in seconden)",
    enteralarmtype:        "Voer type aanval in (1-5)",
    badvalue1:             "Verkeerde invoer!",
    badvalue2:             "Verkeerde invoer (1-5)!",

    /* Attacks messages */
    title:        "Generaal! Open de tab!",
    nochanges:    "Site is niet veranderd.",
    warning:      "LET OP!!",
    newattack:    "NIEUWE AANVAL!",
    changes1:     "AANVAL VERANDERD!",
    changes2:     "Aanval veranderd!",
    abortattack:  "Aanval geannuleerd!",
    endofbattle:  "Einde gevecht!",

    /* Report */
    report:            "Rapporteer",
    sumofenemiesunits: "Aantal vijandige eenheden",
    nomembersattacked: "Er worden op dit moment geen leden van jouw alliantie aangevallen.",

    /* Actions */
    occupytown:    "Bezet stad",
    pillage:       "Plunderen",
    ontheway:      "onderweg",
    blockharbour:  "Blokkeer haven"
   },
  "es": // NemaN
   {
    /* Options */
    options:               "Opciones",
    lastrefresh1:          "Última Actualización",
    lastrefresh2:          "Hace Unos Segundos",
    alarminlastingbattles: "Notificar Ultimas Batallas",
    alarmonendofbattle:    "Notificar Batallas Finalizadas",
    alarmonabort:          "Notificar Ataques Abortados",
    optionpos:             "Posición De Las Opciones",
    refreshinterval:       "Intervalo De Actualización (0 - Apagar)",
    testmode:              "Modo De Prueba",
    testedalarmtype:       "Tipo De Alarma de Prueba (1-5)",
    sound:                 "Sonido",
    on:                    "Encender",
    off:                   "Apagar",
    top:                   "Arriba",
    bottom:                "Abajo",
    change:                "Cambio",
    enterinterval:         "Poner el tiempo del intervalo de actualización (en segundos)",
    enteralarmtype:        "Poner tipo de ataque (1-5)",
    badvalue1:             "!Valor erróneo!",
    badvalue2:             "!Valor erróneo (1-5)!",

    /* Attacks messages */
    title:        "!General! !Abre Tu Informe!",
    nochanges:    "Situación Sin Cambios.",
    warning:      "!ATENCIÓN!",
    newattack:    "!NUEVO ATAQUE!",
    changes1:     "!EL ATAQUE CAMBIO!",
    changes2:     "!El Ataque Cambio!",
    abortattack:  "!Ataque Abortado!",
    endofbattle:  "!Fin De La Batalla!",

    /* Report */
    report:            "Reporte",
    sumofenemiesunits: "Resumen de tropas enemigas",
    nomembersattacked: "Ningún miembro de tu alianza está siendo atacado en este momento.",

    /* Actions */
    occupytown:    "!Ciudad Ocupada!",
    pillage:       "Saquear",
    ontheway:      "En Marcha",
    blockharbour:  "!Bloquear Puerto!"
   },
 "ro": // fl0o
   {
    /* Options */
    options:               "Obtiuni",
    lastrefresh1:          "Ultimul refresh",
    lastrefresh2:          "secunde in urma",
    alarminlastingbattles: "Arata durata luptei",
    alarmonendofbattle:    "Arata sfarsitul luptei",
    alarmonabort:          "Arata atacuri abandonate",
    optionpos:             "IGH pozitie",
    refreshinterval:       "Interval de refresh (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Tipul alarmei (1-5)",
    sound:                 "sunet",
    on:                    "on",
    off:                   "off",
    top:                   "sus",
    bottom:                "jos",
    change:                "schimba",
    enterinterval:         "Introdu intervalul de refresh (in secunde)",
    enteralarmtype:        "Introdu tipul de atac (1-5)",
    badvalue1:             "Valoare necorespunzatoare !",
    badvalue2:             "Valoare necorespunzatoare (1-5)!",

    /* Attacks messages */
    title:        "General! Prima pagina!",
    nochanges:    "Nu s-a schimbat nimic.",
    warning:      "ATENTIE!",
    newattack:    "ATAC NOU!",
    changes1:     "ATAC SCHIMBAT!",
    changes2:     "ATAC SCHIMBAT!",
    abortattack:  "ATAC ANULAT!",
    endofbattle:  "Sfarsitul luptei!",

    /* Report */
    report:            "Raportare",
    sumofenemiesunits: "Suma dusmanilor' unitati",
    nomembersattacked: "Nici un membru al aliantei tale nu este atacat momentan.",

    /* Actions */
    occupytown:    "Ocupa orasul!",
    pillage:       "Jefuire",
    ontheway:      "pe drum",
    blockharbour:  "Blocheaza portul!"
   },
  "it": // mrmauz
   {
    /* Options */
    options:                "Opzioni",
    lastrefresh1:           "Ultimo Aggiornamento",
    lastrefresh2:           "Secondi Fa",
    alarminlastingbattles:  "Notifica Battaglia in via di Conclusione",
    alarmonendofbattle:     "Notifica Battaglia Finita",
    alarmonabort:           "Notifica Attacco Ritirato",
    optionpos:              "Posizione Finestra I.G.H.",
    refreshinterval:        "Intervallo di Agiornamento (0 - off)",
    testmode:               "Modalita Test",
    testedalarmtype:        "Tipo di Allarme Testato (1-5)",
    sound:                  "Suono",
    on:                     "on",
    off:                    "off",
    top:                    "Alto",
    bottom:                 "Basso",
    change:                 "Cambia",
    enterinterval:          "Inserisci Tempo di Intervallo Aggiornamento (in secondi)",
    enteralarmtype:         "Inserisci Tipo di Attacco (1-5)",
    badvalue1:              "Valore Errato!",
    badvalue2:              "Valore Errato (1-5)!",

    /* Attacks messages */
    title:       "Generale! Apri la Scheda!",
    nochanges:   "Nessun Cambiamento nel Sito.",
    warning:     "ATTENZIONE!",
    newattack:   "NUOVO ATTACCO!",
    changes1:    "ATTACCO MODIFICATO!",
    changes2:    "Attacco Modificato!",
    abortattack: "Attacco Annullato!",
    endofbattle: "Termine Della Battaglia!",

    /* Report */
    report:            "Rapporto",
    sumofenemiesunits: "Totale Unita Nemiche",
    nomembersattacked: "Nessun Membro della tua Alleanza e Sotto Attacco al momento.",

    /* Actions */
    occupytown:   "Occupa citta!",
    pillage:      "Saccheggia",
    ontheway:     "in corso",
    blockharbour: "Blocca porto!"
   },
"bg": // ??????? ??????
   {
    /* Options */
    options:               "?????",
    lastrefresh1:          "???????? ??????????",
    lastrefresh2:          "????? ??????? ???????",
    alarminlastingbattles: "?????? ?? ??????????? ?????",
    alarmonendofbattle:    "?????? ?? ???? ?? ???????",
    alarmonabort:          "?????? ?? ?????????? ?????",
    optionpos:             "IGH ??????? ?? ?????????",
    refreshinterval:       "???????? ?? ??????????? (0 - ?????????)",
    testmode:              "??????? ?????",
    testedalarmtype:       "?????????? ?? ???? ?????? (1-5)",
    sound:                 "????",
    on:                    "??????",
    off:                   "???????",
    top:                   "????",
    bottom:                "????",
    change:                "???????",
    enterinterval:         "???????? ???????? ?? ??????????? (? ???????)",
    enteralarmtype:        "???????? ??? ????? (1-5)",
    badvalue1:             "?????? ????????!",
    badvalue2:             "?????? ???????? (1-5)!",

    /* Attacks messages */
    title:       "???????! ?????? ?????????!",
    nochanges:   "?????? ?? ?? ? ????????.",
    warning:     "????????!",
    newattack:   "???? ?????!",
    changes1:    "??????? ? ?????????!",
    changes2:    "??????? ? ?????????!",
    abortattack: "??????? ? ??????????!",
    endofbattle: "???? ?? ???????!",

    /* Report */
    report:            "???????",
    sumofenemiesunits: "???????? ???????",
    nomembersattacked: "? ??????? ???? ????? ??? ??????? ?? ????? ??.",

    /* Actions */
    occupytown:   "???????? ?????!",
    pillage:      "??????",
    ontheway:     "?? ?????",
    blockharbour: "???????? ????????????!"
   },
  "ee": // nightwisher
   {
    /* Options */
    options:               "Valikud",
    lastrefresh1:          "Viimane värskendus",
    lastrefresh2:          "sekundit tagasi",
    alarminlastingbattles: "Teavita kestvatest lahingutest",
    alarmonendofbattle:    "Teavita lahingu lopust",
    alarmonabort:          "Teavita tühistatud lahingutest",
    optionpos:             "IGH akna asukoht",
    refreshinterval:       "Uuenduste intervall (0 - ei uuenda)",
    testmode:              "Testimis olek",
    testedalarmtype:       "Testitud alarmi tüüp (1-5)",
    sound:                 "Heli",
    on:                    "sees",
    off:                   "väljas",
    top:                   "pealmine",
    bottom:                "alumine",
    change:                "muuda",
    enterinterval:         "Sisesta uuenduste intervall (sekundites)",
    enteralarmtype:        "Sisesta tünnaku tüüp (1-5)",
    badvalue1:             "Halb väärtus!",
    badvalue2:             "Halb väärtus (1-5)!",

    /* Attacks messages */
    title:        "Kindral! Ava tabel!",
    nochanges:    "Leht ei muutunud.",
    warning:      "TÄHELEPANU!",
    newattack:    "UUS RÜNNAK!",
    changes1:     "RÜNNAK MUUTUS!",
    changes2:     "Rü nnak muutus!",
    abortattack:  "Rünnak tühistatud!",
    endofbattle:  "Lahingu lopp!",

    /* Report */
    report:            "Raport",
    sumofenemiesunits: "Vaenlaste üksuste arv",
    nomembersattacked: "Ühtegi liidu liiget ei ole hetkel rünnaku all.",

    /* Actions */
    occupytown:    "Okupeeri linn",
    pillage:       "Rüüsta",
    ontheway:      "Saada spioon retkele",
    blockharbour:  "Blokeeri sadamat"
   },
  "lv": // davispuh
   {
    /* Options */
    options:               "Opcijas",
    lastrefresh1:          "Pedejo reizi atjaunots pirms",
    lastrefresh2:          "sekundem",
    alarminlastingbattles: "Zinot par beigušajam kaujam",
    alarmonendofbattle:    "Zinot par kaujas beigam",
    alarmonabort:          "Zinot par atceltajiem uzbrukumiem",
    optionpos:             "IGH loga atrašanas vieta",
    refreshinterval:       "Atjaunošanas intervals (0 - izslegts)",
    testmode:              "Testa režims",
    testedalarmtype:       "Testa bridinajuma tips (1-5)",
    sound:                 "Skana",
    on:                    "ieslegts",
    off:                   "izslegts",
    top:                   "augša",
    bottom:                "apakša",
    change:                "mainit",
    enterinterval:         "Ievadi atjaunošanas intervalu (sekundes)",
    enteralarmtype:        "Ievadi uzbrukuma tipu (1-5)",
    badvalue1:             "Nepareiza vertiba!",
    badvalue2:             "Nepareiza vertiba (1-5)!",

    /* Attacks messages */
    title:        "Generali! Atver cilni!",
    nochanges:    "Nekas nav mainijies.",
    warning:      "BRIDINAJUMS!",
    newattack:    "JAUNS UZBRUKUMS!",
    changes1:     "UZBRUKUMS MAINIJIES!",
    changes2:     "Uzbrukums mainijies!",
    abortattack:  "Uzbrukums atcelts!",
    endofbattle:  "Kaujas beigas!",

    /* Report */
    report:            "Atskaite",
    sumofenemiesunits: "Pretinieka vienibu skaits",
    nomembersattacked: "Dotaja momenta nevienam no jusu alianses biedriem neuzbruk.",

    /* Actions */
    occupytown:    "Okupet pilsetu!",
    pillage:       "Izlaupit",
    ontheway:      "cela",
    blockharbour:  "Bloket ostu!"
   },
  "ae": // Samerramez
   {
    /* Options */
    options:               "??????",
    lastrefresh1:          "??? ?????",
    lastrefresh2:          "?? ?????",
    alarminlastingbattles: "??????? ??? ?????",
    alarmonendofbattle:    "??????? ?????? ???????",
    alarmonabort:          "??????? ????? ???????",
    optionpos:             "???? ????? ????????",
    refreshinterval:       "???? ??????? (0 - ?????)",
    testmode:              "????? ????????",
    testedalarmtype:       "????? ???????? (1-5)",
    sound:                 "?????",
    on:                    "?????",
    off:                   "?????",
    top:                   "??????",
    bottom:                "??????",
    change:                "?????",
    enterinterval:         "???? ???? ???????  (????????)",
    enteralarmtype:        "???? ????? ?????? (1-5)",
    badvalue1:             "??????? ?????!",
    badvalue2:             "???? ????? (1-5)!",

    /* Attacks messages */
    title:        "?????! ???? ???? ?????!",
    nochanges:    "?????? ?? ?????.",
    warning:      "???????!",
    newattack:    "???? ????!",
    changes1:     "?? ????? ??????!",
    changes2:     "?? ???? ??????!",
    abortattack:  "?? ????? ??????!",
    endofbattle:  "????? ???????!",

    /* Report */
    report:            "???????",
    sumofenemiesunits: "????? ???????' ???????",
    nomembersattacked: "?? ??? ?? ????? ???? ????? ?????? ???? .",

    /* Actions */
    occupytown:    "??????!",
    pillage:       "???",
    ontheway:      "?? ??????",
    blockharbour:  "?????? ??????!"
   },
  "mx2": // graco_slp // spanish?
   {
    /* Options - errors in translating allowed */
    options: "Opciones",
    lastrefresh1: "Ultima Actualizacion",
    lastrefresh2: "Segundos",
    alarminlastingbattles: "Notificar Batallas Actuales",
    alarmonendofbattle: "Notificar Fin de Batalla",
    alarmonabort: "Notificar Ataques Cancelados",
    optionpos: "IGH Posicion de la Ventana",
    refreshinterval: "Intervalo de refrescar (0 - Apagado)",
    testmode: "Modo de Prueba",
    testedalarmtype: "Tipo de Alarma Probado (1-5)",
    sound: "Sonido",
    on: "Encendido",
    off: "Apagado",
    top: "Arriba",
    bottom: "Abajo",
    change: "Cambiar",
    enterinterval: "Escriba intervalo para refrescar (en segundos)",
    enteralarmtype: "Escriba tipo de ataque (1-5)",
    badvalue1: "Valor Incorrecto!",
    badvalue2: "Valor Incorrecto (1-5)!",

    /* Attacks messages - errors in translating allowed */
    title: "General! Abre la pestana!",
    nochanges: "El sitio no ha cambiado.",
    warning: "PELIGRO!",
    newattack: "NUEVO ATAQUE!",
    changes1: "ATAQUE MODIFICADO!",
    changes2: "Attaque Modificado!",
    abortattack: "Ataque Cancelado!",
    endofbattle: "Fin de la Batalla!",

    /* Report - errors in translating allowed */
    report: "Reporte",
    sumofenemiesunits: "Total de unidades enemigas",
    nomembersattacked: "Ningun miembro de tu Alianza está siendo atacado.",

    /* ACTIONS - WARNING! ERRORS NOT ALLOWED! IT MUST BE TRANSLATED EXACTLY AS IT IS IN THIS LANGUAGE. CASE SENSITIVE */
    /* BAD TRANSLATION OF THIS CAUSE SCRIPT DOES NOT WORK */
    /* OPEN GENERAL ATTACKS TO ALLY TAB AND COPY AND PASTE MISSIONS (YOU NEED TO ASK SOMEONE TO ATTACK YOU */
    occupytown: "Ocupar Ciudad!",
    pillage: "Saquear",
    ontheway: "En proceso",
    blockharbour: "Bloquear Puerto!"
   },
  "tr": // jarasur
   {
    /* Options */
    options: "Opsiyonlar",
    lastrefresh1: "Son yenileme",
    lastrefresh2: "saniye önce",
    alarminlastingbattles: "Saldirilar sürdügünde uyar",
    alarmonendofbattle: "Saldiri bitince uyar",
    alarmonabort: "Saldiri iptal edildiginde uyar",
    optionpos: "IGH ekran pozisyonu",
    refreshinterval: "Yenileme süresi(sn) (0 - off)",
    testmode: "Test modu",
    testedalarmtype: "Test alarm tipi (1-5)",
    sound: "Sesli uyari",
    on: "açik",
    off: "kapali",
    top: "üst",
    bottom: "alt",
    change: "degiştir",
    enterinterval: "Yenileme süresi (saniye)",
    enteralarmtype: "Saldiri tipi (1-5)",
    badvalue1: "Yanliş deger!",
    badvalue2: "Yanliş deger (1-5)!",

    /* Attacks messages */
    title: "Genel! Sayfa aç!",
    nochanges: "Sayfa degiştirilemedi",
    warning: "UYARI!",
    newattack: "YENI SALDIRI!",
    changes1: "SALDIRI DEGIŞTI!",
    changes2: "Saldiri degişti!",
    abortattack: "Saldiri iptal edildi!",
    endofbattle: "Savaş sonu!",

    /* Report */
    report: "Rapor",
    sumofenemiesunits: "Toplam düşman, birimler",
    nomembersattacked: "Şu anda hiçbir ittifak üyeniz saldiri almiyor.",

    /* Actions */
    occupytown: "Işgal!",
    pillage: "Yagma",
    ontheway: "Underway ne",
    blockharbour: "Limani engelle!" 
   },
  "ir": // farhoud
   {
    /* Options */
    options: "???????",
    lastrefresh1: "????? ???????? ????",
    lastrefresh2: "????? ???",
    alarminlastingbattles: "????? ????? ??????",
    alarmonendofbattle: "????? ????? ??????",
    alarmonabort: "????? ???? ???? ???",
    optionpos: "????",
    refreshinterval: "???? ????? ???????? (? ?? ?????)",
    testmode: "???? ??????",
    testedalarmtype: "??? ????? (? ?? ?)",
    sound: "???",
    on: "????",
    off: "?????",
    top: "????",
    bottom: "?????",
    change: "?????",
    enterinterval: "???? ????? ???????? ?? ???? ????(?? ?????)",
    enteralarmtype: "??? ????? ?? ???? ?? ???? ???? ????(? ?? ?)",
    badvalue1: "????? ??????!",
    badvalue2: "????? ??????(? ?? ?)!",

    /* Attacks messages */
    title: "?????! ?? ?? ??? ??!",
    nochanges: "??? ?????? ?? ?????.",
    warning: "?????!",
    newattack: "???? ????!",
    changes1: "???? ????? ???!",
    changes2: "???? ????? ????!",
    abortattack: "???? ???? ???!",
    endofbattle: "????? ???!",

    /* Report */
    report: "???????",
    sumofenemiesunits: "????? ??????? ????.",
    nomembersattacked: "?? ??? ?? ?? ???? ????? ???? ????.",

    /* Actions */
    occupytown: "??? ?? ???? ??!",
    pillage: "????",
    ontheway: "?? ??? ????",
    blockharbour: "???? ????!"
   },
  "ua": // by feelimon
   {
    /* Options */
    options:               "?????",
    lastrefresh1:          "??????? ?????????",
    lastrefresh2:          "?????? ????",
    alarminlastingbattles: "??????????? ??? ?????? ?????",
    alarmonendofbattle:    "??????????? ??? ?????????? ?????",
    alarmonabort:          "??????????? ??? ??????? ?????",
    optionpos:             "??????? ?????",
    refreshinterval:       "???????? ????????? (0 - ????)",
    testmode:              "????? ??????????",
    testedalarmtype:       "????????????? ??? ?????? (1-5)",
    sound:                 "????",
    on:                    "?????",
    off:                   "?????",
    top:                   "????",
    bottom:                "???",
    change:                "???????",
    enterinterval:         "??????? ???????? ????????? (? ????????)",
    enteralarmtype:        "??????? ??? ????? (1-5)",
    badvalue1:             "??????? ????????!",
    badvalue2:             "??????? ???????? (1-5)!",

    /* Attacks messages */
    title:       "???????! ????????? ???????!",
    nochanges:   "???? ?? ????????",
    warning:     "?????!",
    newattack:   "???? ?????!",
    changes1:    "????? ?????????!",
    changes2:    "????? ?????????!",
    abortattack: "????? ?????????!",
    endofbattle: "?????????? ?????!",

    /* Report */
    report:            "????",
    sumofenemiesunits: "??????????? ??????",
    nomembersattacked: "?????? ?????? ?? ????????",

    /* Actions */
    occupytown:   "??????? ?????!",
    pillage:      "??????",
    ontheway:     "? ??????",
    blockharbour: "???? ?????"
   },
  "ph": // by sonihei
   {
    /* Options */
    options:               "Mga Opsyon",
    lastrefresh1:          "Huling Refresh",
    lastrefresh2:          "segundong nakalipas",
    alarminlastingbattles: "Ipaalam ang tagal ng labanan",
    alarmonendofbattle:    "Ipaalam kung tapos na ang labanan",
    alarmonabort:          "Ipaalam kung kinansela ang labanan",
    optionpos:             "Posisyon ng IGH",
    refreshinterval:       "Refresh interval (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Tested alarm type (1-5)",
    sound:                 "Tunog",
    on:                    "on",
    off:                   "off",
    top:                   "taas",
    bottom:                "baba",
    change:                "baguhin",
    enterinterval:         "Ilagay ang oras ng refresh interval(segundo)",
    enteralarmtype:        "Ilagay ang klase ng atake(1-5)",
    badvalue1:             "Bad value!",
    badvalue2:             "Bad value (1-5)!",

    /* Attacks messages */
    title:        "Heneral! Buksan mo ang tab!",
    nochanges:    "Hindi nagbago ang site.",
    warning:      "BABALA!",
    newattack:    "BAGONG ATAKE!",
    changes1:     "NAGBAGO ANG ATAKE!",
    changes2:     "Nagbago ang atake!",
    abortattack:  "Kinansel ang pag-atake!",
    endofbattle:  "Tapos na ang Labanan!",

    /* Report */
    report:            "Salaysay",
    sumofenemiesunits: "Bilang ng tauhan ng kalaban.",
    nomembersattacked: "Wala sa myembro ng iyong alayansa ang kasalukuyang inaatake ngayon.",

    /* Actions */
    occupytown:    "Sakupin ang Bayan!",
    pillage:       "Magnakaw",
    ontheway:      "Papunta",
    blockharbour:  "Harangan ang Pantalan!"
   },
  "ba":
   {
    /* Options - errors in translating allowed */
    options: "Opcije",
    lastrefresh1: "Zadnji refresh",
    lastrefresh2: "sekundi pre",
    alarminlastingbattles: "Obavesti o bitkama u toku",
    alarmonendofbattle: "Obavesti o kraju bitke",
    alarmonabort: "Obavesti o obustavljenim napadima",
    optionpos: "IGH pozicija prozora",
    refreshinterval: "Refresh interval (0 - off)",
    testmode: "Test mod",
    testedalarmtype: "Testirani zvuk alarma (1-5)",
    sound: "Zvuk",
    on: "on",
    off: "off",
    top: "vrh",
    bottom: "dno",
    change: "promeni",
    enterinterval: "Ukucaj trajanje refresh intervala (u sekundama)",
    enteralarmtype: "Ukucaj vrstu napada (1-5)",
    badvalue1: "Nispravan unos!",
    badvalue2: "Neispravan unos (1-5)!",

    /* Attacks messages */
    title: "General! Otvori novi tab!",
    nochanges: "Stanje se nije promenilo.",
    warning: "UPOZORENJE!",
    newattack: "NOVI NAPAD!",
    changes1: "NAPAD SE PROMENIO!",
    changes2: "NAPAD SE PROMENIO!",
    abortattack: "NAPAD JE OBUSTAVLJEN!",
    endofbattle: "KRAJ BITKE!",

    /* Report */
    report: "Izveštaj",
    sumofenemiesunits: "Zbir neprijateljskih' jedinica",
    nomembersattacked: "Niko od članova Vašeg saveza nije trenutno pod napadom.",

    /* Actions */
    occupytown: "Okupiraj grad!",
    pillage: "Pljačkaj",
    ontheway: "U tijeku",
    blockharbour: "Zarobi luku!"
   }
};
// aliasy
LANGS["com"] = LANGS["org"];
LANGS["us"]  = LANGS["org"];
LANGS["en"]  = LANGS["org"];
LANGS["ar"]  = LANGS["es"];
LANGS["mx"]  = LANGS["es"];

var LANG = LANGS[getLanguage()];
const LANGNOTSUPPORTED =  (typeof LANG)=='undefined';
if (LANGNOTSUPPORTED)
  LANG = LANGS["org"];

/*************************************************************************************************/

const igh_plus  = "http://img715.imageshack.us/img715/5381/plus.gif";
const igh_minus = "http://img64.imageshack.us/img64/1738/minusq.gif";
const flashurl  = "http://img534.imageshack.us/img534/6408/alarm.swf";

const IMG_BLOCKADE = '<img src="/skin/interface/mission_blockade.gif">';
const IMG_PLUNDER  = '<img src="/skin/interface/mission_plunder.gif">';
const IMG_OCCUPY   = '<img src="/skin/interface/mission_occupy.jpg">';
const IMG_TIME     = '<img src="/skin/resources/icon_time.gif">';
const IMG_ATTACK   = '<img src="/skin/unitdesc/unit_attack.gif">';

const LINK_CITY    = "/index.php?view=island&cityId=";

const IGH_ALARM_TITLE = LANG.title;

const HTML_FLASH =
'<br>\
<input type="button" id="igh_embassy_button" value="'+LANG.lastrefresh1+' 0 '+LANG.lastrefresh2+'" onclick="location.href= document.URL" width="200">\n<br>\
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="50" height="50" id="alarm" style="text-align: center">\n\
  <param name="allowScriptAccess" value="sameDomain" />\n\
  <param name="movie" value="'+flashurl+'" />\n\
  <param name="quality" value="high" />\n\
  <param name="bgcolor" value="#f6ebba" />\n\
  <embed src="'+flashurl+'" quality="high" bgcolor="#f6ebba" width="50" height="50" name="alarm" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n\
</object>';

const HTML_ADDCONTENT_1 =
'\n<div id="igh_embassy" style="display: none">\n\
<table style="table-layout: fixed" cellpadding="0" cellspacing="0" class="table01">\n\
  <thead>\n\
    <tr>\n\
      <th colspan="2">Ikariam General Helper <i>by krwq</i></th>\n\
    </tr>\n\
  </thead>\n\
  <tbody>\
  <tr>\n\
    <td colspan="2" style="text-align: center">';

const HTML_ADDCONTENT_2 =
'  </td>\n\
  </tr>\n\
  </tbody>\
  <tbody>\
  <tr>\n\
    <th colspan="2"><img id="igh_report_img" style="cursor: pointer"/> '+ LANG.report +'</th>\n\
  </tr>\n\
  </tbody>\n\
  <tbody id="igh_embassy_report_content">\
  <tr class="igh_embassy_report">\
    <td colspan="2">\
    <input id="igh_embassy_report_content_type" type="button" value="Text only">\
    <textarea style="overflow: scroll;" rows="3" cols="80" readonly="true" id="igh_report_textarea" onClick="this.focus(); this.select();"></textarea></td>\
  </tr>\n\
  </tbody>\
  <tbody>\
  <tr>\n\
    <th colspan="2"><img id="igh_option_img" style="cursor: pointer"/> '+ LANG.options +'</th>\n\
  </tr>\n\
  </tbody>\n\
  <tbody id="igh_embassy_options_content">';

const HTML_ADDCONTENT_3 =
'  <tr>\n\
    <td style="text-align: right"><b>';

const HTML_ADDCONTENT_4 =
'</b></td>\n\
    <td style="text-align: left"><text style="cursor: pointer" id="igh_option_';

const HTML_ADDCONTENT_5 =
'">';

const HTML_ADDCONTENT_6 =
'</text></td>\
  </tr>\n';

const HTML_LANGNOTSUPP =
'Language not supported! Unfortunately, script cannot work without it!<br>\<hr></td></tr>\n\
  <tr>\n\
    <td colspan="2">';


/*************************************************************************************************/
 
const settings_prefix = "IGH::" + location.hostname + "::";

/*************************************************************************************************/
/* Czyszczenie zmian po starej wersji */

var version = IGH_getValue("version", 0);
if (version!=currversion)
  delete_settings();
IGH_setValue("version", currversion);

/*************************************************************************************************/
/* stałe odpowiedzialne za opcje */

const opt_switch    = 1;
const opt_intval    = 2;
const opt_alarmtype = 3;

const op_name    = 0;
const op_type    = 1;
const op_value   = 2;
const op_label   = 3;
const op_text1   = 4;
const op_text2   = 5;

// pozycja danej opcji na liście opcji (igh_options)
const o_sound            = 0;
const o_onactbttlalarm   = 1;
const o_endbattlealarm   = 2;
const o_abortattackalarm = 3;
const o_positiontop      = 4;
const o_refreshtime      = 5;
const o_alarmtest        = 6;
const o_alarmtesttyp     = 7;

/*************************************************************************************************/

// stałe
const at_noattack    = 0;
const at_newattack   = 1;
const at_changes     = 2; // zmiany z dodatkowym atakiem
const at_battleend   = 3;
const at_abortattack = 4;
const at_changesnd   = 5; // zmiany: koniec bitwy i anulowany atak

/*************************************************************************************************/

// czy opcje są rozwinięte
var expanded_options = IGH_getValue('expanded_options', true);
var expanded_report  = IGH_getValue('expanded_report', true);

var igh_options =
  //nazwa               typ             value             label                       text1        text2
  [
   ["sound",            opt_switch,     true,             LANG.sound,                 LANG.on,     LANG.off],
   ["onactbttlalarm",   opt_switch,     false,            LANG.alarminlastingbattles, LANG.on,     LANG.off],
   ["endbattlealarm",   opt_switch,     false,            LANG.alarmonendofbattle,    LANG.on,     LANG.off],
   ["abortattackalarm", opt_switch,     false,            LANG.alarmonabort,          LANG.on,     LANG.off],
   ["positiontop",      opt_switch,     true,             LANG.optionpos,             LANG.top,    LANG.bottom],
   ["refreshtime",      opt_intval,     60,               LANG.refreshinterval,       LANG.change, LANG.enterinterval],
   ["alarmtest",        opt_switch,     LANGNOTSUPPORTED, LANG.testmode,              LANG.on,     LANG.off],
   ["alarmtesttyp",     opt_alarmtype,  1,                LANG.testedalarmtype,       LANG.change, LANG.enteralarmtype]
  ];

// zczytywanie zapisanych opcji
for (var i=0; i<igh_options.length; i++)
  igh_options[i][op_value] =  IGH_getValue(igh_options[i][op_name],igh_options[i][op_value]);

/*************************************************************************************************/
var sheetdebug;

function onJQLoaded() { /* część główna skryptu */

// możliwość rozwijania/zwijania opcji

sheetdebug = document.createElement('style');
sheetdebug.innerHTML = "div.igh_debug_window { display: none }";
document.body.appendChild(sheetdebug);

/*************************************************************************************************/

/* główna treść skryptu */

var content;

var attacks;
if (!LANGNOTSUPPORTED)
  attacks = getAttacks(document.getElementById("mainview").innerHTML); else
  attacks = [];

var lastattacks = IGH_getArray('attacks',attacks);
IGH_setArray('attacks',attacks);

var attack_type;

if (igh_options[o_alarmtest][op_value])
 {
  attack_type = igh_options[o_alarmtesttyp][op_value];
 } else
  attack_type = getAttackType(attacks, lastattacks);

if (((attack_type == at_changesnd) && !igh_options[o_endbattlealarm][op_value] && !igh_options[o_abortattackalarm][op_value]) ||
    ((attack_type == at_battleend) && (!igh_options[o_endbattlealarm][op_value])) ||
    ((attack_type == at_abortattack) && (!igh_options[o_abortattackalarm][op_value])))
  attack_type = at_noattack;

switch(attack_type)
 {
  case at_noattack:
   {
    content = LANG.nochanges;
    if (igh_options[o_refreshtime][op_value]>0)
      setTimeout("location.href= document.URL", igh_options[o_refreshtime][op_value]*1000);
    break;
   }
  case at_newattack:
   {
    content = '<font color="red" size="7"><b>'+LANG.warning+'<br>'+LANG.newattack+'</b></font>';
    break;
   }
  case at_changes:
   {
    content = '<font color="red" size="7"><b>'+LANG.warning+'<br>'+LANG.changes1+'</b></font>';
    break;
   }
  case at_battleend:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.endofbattle+'</b></font>';
    break;
   }
  case at_abortattack:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.abortattack+'</b></font>';
    break;
   }
  case at_changesnd:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.changes2+'</b></font>';
    break;
   }
 }

if (attack_type!=at_noattack)
 {
  if (igh_options[o_sound][op_value])
    content += HTML_FLASH;
   var timer = setTimeout(refreshButton, 1000);
  for (var i = 0; i<timer; i++)
    window.clearTimeout(i);
  setInterval("updateServerTime()", 500);
  top.document.title = IGH_ALARM_TITLE;
 }

AddContent(content);
$("#igh_report_textarea").text(AttacksToReport(attacks));
var button = $("#igh_embassy_report_content_type");
button.toggle(
  function()
   {
    button.val("Circular message");
    $("#igh_report_textarea").text(AttacksToTextReport(attacks));
   },
  function()
   {
     button.val("Text only");
     $("#igh_report_textarea").text(AttacksToReport(attacks));
   });
GM_registerMenuCommand('IGH::Debug',show_debug);

} /* koniec części głównej skryptu */

/*************************************************************************************************/

// TODO: generowanie tablicy zmian
function getChanges(att, lastatt)
{
  for (var i=0; i<att.length; i++)
   {

   }
}

/*************************************************************************************************/

// TODO: zamienic to na generowanie tablicy zmian
function getAttackType(att, lastatt)
{
  // wiecej atakow
  if (att.length>lastatt.length)
    return at_newattack;

  // sprawdzanie po kolei wszystkich
  if (att.length==lastatt.length)
   {
    for (var i=0; i<att.length; i++)
     {
      if ((att[i].cityid!=lastatt[i].cityid) || (att[i].land!=lastatt[i].land))
        return at_changes; // co najmniej 1 atak doszedl i tyle samo ataków cofniętych
     }
   }

  var aborted   = false;
  var endbattle = false;

  for (var i=0; i<att.length; i++)
   {
    var lastattid;
    if ((att[i].cityid==lastatt[i].cityid) && (att[i].land==lastatt[i].land))
      lastattid = i; else
      lastattid = attacksIndexOf(lastatt,att[i].cityid,att[i].land);

    //if (lastattid==-1)
      //console.log("ERROR: getAttackType, lastattid==-1");

    if (!igh_options[o_onactbttlalarm][op_value] && att[i].active)
      continue;

    if (att[i].attacks.length>lastatt[lastattid].attacks.length)
      return at_newattack;

    // mniej atakow na dane miasto - ktos anulowal // TODO: poprawić dokładność tego sprawdzenia
    if (att[i].attacks.length<lastatt[lastattid].attacks.length)
     {
      aborted = true;
      continue;
     }

    for (var j=0; j<att[i].attacks.length; j++)
     {
      if (att[i].attacks[j].cityid!=lastatt[lastattid].attacks[j].cityid)
        return at_newattack;
     }
   }

  // ocenianie brakujacych atakow
  for (var i=0; i<lastatt.length; i++)
   {
    attid = attacksIndexOf(att,lastatt[i].cityid,lastatt[i].land);
    if (attid==-1)
     {
      if (lastatt[i].active)
        endbattle = true; else
        aborted   = true;
     }
   }

  if (aborted && endbattle)
    return at_changesnd;

  if (aborted)
    return at_abortattack;

  if (endbattle)
    return at_battleend;

  return at_noattack;
}

/*************************************************************************************************/

function getAttacks(content)
{
  var attacks = new Array();
  var t = content;
  var p2=0;
  var n=0;
  do
   {
     n++;
     var p = posB(t,'<tr class="rowRanks">',p2);
     if (p!=-1)
      {
       var elem = new TCityAttack();
       elem.attacks.push(new TAttack());
       var at = elem.attacks[0];
       var a;

       // okres czasu
       a=getCol(t,p);
       if (a[0]=="")
        {
         p2=a[1];
         continue;
        }

       at.time=trim(getBetween('>','<',getBetween('<div class="time"','div>',a[0])));

       // aktywne akcje
       a=getCol(t,a[1]);
       at.type=deleteBetween(" (", ")",a[0]);
       elem.land = (a[0].indexOf(LANG.pillage)!=-1) || (a[0].indexOf(LANG.occupytown)!=-1);
       elem.active = (a[0].indexOf(LANG.ontheway)==-1);

       // liczba jednostek
       a=getCol(t,a[1]);
       at.units=parseInt(a[0]);

       // miasto atakujacego
       a=getCol(t,a[1]);
       at.cityid=parseInt(getBetween("cityId=","\">",a[0]));

       // atakujacy
       at.player=getBetween("\">","</a>",a[0]);

       // czlonkowie sojuszu
       a=getCol(t,a[1]);
       elem.cityid=parseInt(getBetween("cityId=","\">",a[0]));
       elem.player=getBetween("\">","</a>",a[0]);

       p2=a[1];
       if (!at.verify() || !elem.verify())
         continue;

       var pos = attacksIndexOf(attacks,elem.cityid,elem.land);
       if (pos==-1)
        {
         attacks.push(elem);
         attacks.sort(cityattackcompfunc); // TODO: nie sortowac co chwile - ?jakos inaczej wrzucac - cos w stylu funkcji insert?
        } else
        {
         attacks[pos].active=attacks[pos].active || elem.active;
         attacks[pos].attacks.push(at);
        }
      }
   } while (p!=-1);

  for (var i=0; i<attacks.length; i++)
    attacks[i].attacks.sort(attackcompfunc);

  return attacks;
}

/*************************************************************************************************/

function AttacksToString(att)
{
  var t = "[begin]\n";
  for (var i=0; i<att.length; i++)
   {
    t+="\t[attack -"+i+"-]\n";
    t+="\t\tcityid=\t\t"    +att[i].cityid  +"\n";
    t+="\t\tplayername=\t"  +att[i].player  +"\n";
    t+="\t\tland=\t\t"      +att[i].land    +"\n";
    t+="\t\tactive=\t\t"    +att[i].active  +"\n";
    t+="\t\t[from]\n";
    for (var j=0; j<att[i].attacks.length; j++)
     {
      t+="\t\t\t[attack -"+j+"-]\n";
      t+="\t\t\t\tcityid=\t\t"    +att[i].attacks[j].cityid  +"\n";
      t+="\t\t\t\tplayername=\t"  +att[i].attacks[j].player  +"\n";
      t+="\t\t\t\ttype=\t\t"      +att[i].attacks[j].type    +"\n";
      t+="\t\t\t\tunits=\t\t"     +att[i].attacks[j].units   +"\n";
      t+="\t\t\t\ttime=\t\t"      +att[i].attacks[j].time    +"\n";
      t+="\t\t\t[attack end]\n";
     }
    t+="\t\t[from end]\n";
    t+="\t[attack end]\n";
   }
  t+="[end]";
  return t;
}

/*************************************************************************************************/

function AttacksToTextReport(att)
{
  var t = "";
  if (att.length==0)
    t+=LANG.nomembersattacked; else
   {
    for (var i=0; i<att.length; i++)
     {
      if (att[i].active)
       {
        var suma = 0;
        var czas = "";
        for (var j=0; j<att[i].attacks.length; j++)
         {
          if (att[i].attacks[j].time!="-")
            czas = att[i].attacks[j].time;
          suma+=att[i].attacks[j].units;
         }
         
        if (czas!="")
         {
          t+=czas+" ";
          if (att[i].land)
            t+="(o|--<) "; else
            t+="(~~~) ";
         }

        t+=att[i].player+' ('+LINK_CITY+att[i].cityid+')\n'+LANG.sumofenemiesunits+": " + suma + "\n\n";
       } else
        for (var j=0; j<att[i].attacks.length; j++)
         {
          t+=att[i].attacks[j].time+" ("+att[i].attacks[j].type+") - ";
          t+=att[i].player+' ('+LINK_CITY+att[i].cityid+')\n';
          t+=att[i].attacks[j].player+' ('+LINK_CITY+att[i].attacks[j].cityid+') - '+att[i].attacks[j].units;
          t+="\n\n";
         }
     }
   }
  return t;
}

/*************************************************************************************************/

function AttacksToReport(att)
{
  var t = "";
  if (att.length==0)
    t+=LANG.nomembersattacked; else
   {
    t+='<MessageFormatter><table>';
    for (var i=0; i<att.length; i++)
     {
      if (att[i].active)
       {
        t+="<tr><td>"+IMG_ATTACK+"</td>";
        var suma = 0;
        for (var j=0; j<att[i].attacks.length; j++)
          suma+=att[i].attacks[j].units;
        t+="<td>"+LANG.sumofenemiesunits+": <b>" + suma + "</b></td>";
        t+='<td><a href="'+LINK_CITY+att[i].cityid+'"><b>'+att[i].player+' ('+att[i].cityid+')</b></a></td></tr>';
       } else
        for (var j=0; j<att[i].attacks.length; j++)
         {
          t+='<tr><td>';
          if (att[i].attacks[j].type==LANG.blockharbour)
            t+=IMG_BLOCKADE; else
          if (att[i].attacks[j].type==LANG.pillage)
            t+=IMG_PLUNDER; else
          if (att[i].attacks[j].type==LANG.occupytown)
            t+=IMG_OCCUPY; else // ???
          t+="</td>";
          t+='<td><a href="'+LINK_CITY+att[i].attacks[j].cityid+'"><b><u>'+att[i].attacks[j].player+'</u></b></a> ('+att[i].attacks[j].units+')</td>';
          t+='<td><a href="'+LINK_CITY+att[i].cityid+'"><b>'+att[i].player+' ('+att[i].cityid+')</b></a></td>';
          t+="<td>"+IMG_TIME+"</td>";
          t+="<td>"+att[i].attacks[j].time+"</td>";
          t+="</tr>";
         }
      if (i!=(att.length-1))
        t+='<tr><td colspan="5"><hr></td></tr>';
      //dark = !dark;
     }
    t+="</table></MessageFormatter>";
   }
  return t;
}

/*************************************************************************************************/

function deleteBetween(from, to, t)
{
  var p;
  do
   {
    p = t.indexOf(from);
    if (p!=-1)
     {
      var p2 = t.indexOf(to,p);
      if (p2!=-1)
        t=t.substr(0,p)+t.substr(p2+to.length); else
        return t;
     } else
      return t;
   } while (p!=-1);
  return t;
}

/*************************************************************************************************/

// zwraca tekst znajdujący się między from i to, z tekstu t
// działa tylko na pierwsze wystąpienie from/to
function getBetween(from, to, t)
{
  var p = t.indexOf(from);
  var p2 = t.indexOf(to,p);
  if ((p==-1) || (p2==-1))
    return "";
  p+=from.length;
  return t.substr(p,p2-p);
}

/*************************************************************************************************/

//dziala tak jak indexOf, z tym ze zwraca pozycje za tekstem jesli znaleziono
function posB(t,s,a)
{
  var p = t.indexOf(s,a);
  if (p==-1)
    return -1; else
    return p+s.length;
}

/*************************************************************************************************/

// zwraca zawartosc najblizszej kolumny w teksie t, zaczynajac wyszukiwanie od pos
function getCol(t,pos)
{
  var p = t.indexOf("<td>",pos);
  var p2;
  if (p!=-1)
   {
    p2 = t.indexOf("</td>",p);
    if (p2!=-1)
      return [t.substr(p+4,p2-p-4),p2+5]; else
      return ["",pos+4];
   } else
    return ["",pos];
}

/*************************************************************************************************/

// potrzebne do odliczania sekund w funkcji refreshButton
var n = 0;

function refreshButton()
{
  n++;
  document.getElementById("igh_embassy_button").value=LANG.lastrefresh1+" "+n+" "+LANG.lastrefresh2;
  setTimeout(refreshButton, 1000);
}

/*************************************************************************************************/

function toggleexpanded_options()
{
  expanded_options=!expanded_options;
  IGH_setValue('expanded_options', expanded_options);
  document.getElementById("igh_option_img").src=expanded_options?igh_minus:igh_plus;
  if (expanded_options)
//    $("#igh_embassy_options_content").slideDown("slow"); else
//    $("#igh_embassy_options_content").slideUp();
    $("#igh_embassy_options_content").fadeIn("slow"); else
    $("#igh_embassy_options_content").fadeOut("slow");
}

/*************************************************************************************************/

function toggleexpanded_report()
{
  expanded_report=!expanded_report;
  IGH_setValue('expanded_report', expanded_report);
  document.getElementById("igh_report_img").src=expanded_report?igh_minus:igh_plus;
  if (expanded_report)
    $("#igh_embassy_report_content").fadeIn("slow"); else
    $("#igh_embassy_report_content").fadeOut("slow");
}

/*************************************************************************************************/

function IGH_setValue(name, val)
{
  GM_setValue(settings_prefix+name,val);
}

/*************************************************************************************************/

function IGH_getValue(name, val)
{
  return GM_getValue(settings_prefix+name,val);
}

/*************************************************************************************************/

function IGH_setArray(name, val)
{
  GM_setValue(settings_prefix+name,uneval(val));
}

/*************************************************************************************************/

function IGH_getArray(name, val)
{
  return eval(GM_getValue(settings_prefix+name,uneval(val)));
}

/*************************************************************************************************/
// todo: zamienić na CreateContent, AddContent
function AddContent(content)
{
  var t;
  if (LANGNOTSUPPORTED)
    t = HTML_ADDCONTENT_1 + HTML_LANGNOTSUPP + content + HTML_ADDCONTENT_2; else
    t = HTML_ADDCONTENT_1 + content + HTML_ADDCONTENT_2;

  for (var i=0; i<igh_options.length; i++)
   {
    var val = "";
    if (igh_options[i][op_type]==opt_switch)
     {
      if (igh_options[i][op_value])
        val = "<b>"+ igh_options[i][op_text1] +"</b> | "+ igh_options[i][op_text2]; else
        val = igh_options[i][op_text1] +" | <b>"+ igh_options[i][op_text2] +"</b>";
     } else
    if (igh_options[i][op_type]==opt_intval)
     {
      val = "<b>"+igh_options[i][op_value]+"</b> - <b><i>"+igh_options[i][op_text1]+"</i></b>";
     } else
    if (igh_options[i][op_type]==opt_alarmtype) // TODO
     {
      val = "<b>"+igh_options[i][op_value]+"</b> - <b><i>"+igh_options[i][op_text1]+"</i></b>";
     }
    t+= HTML_ADDCONTENT_3 + igh_options[i][op_label] + HTML_ADDCONTENT_4 + i + HTML_ADDCONTENT_5 + val + HTML_ADDCONTENT_6;
   }

  /* przycisk debug */
  t+=
    "  <tr class=\"igh_embassy_options\">\n" +
    "    <td colspan=\"2\">" +
    "      <div id=\"igh_debug_window\" class=\"igh_debug_window\">\n" +
    "        <br><b><font color=\"red\">Debug data:</font></b><br>\n" +
    "        <textarea rows=\"10\" cols=\"80\" readonly=\"true\" id=\"igh_debug_textarea\" onClick=\"this.focus(); this.select();\"></textarea>\n" +
    "      </div>\n" +
    "    </td>\n" +
    "  </tr>\n";

  t+=
    "</tbody></table>\n" +
    "</div>\n";

  // miejsce wstawienia ramki
  if (igh_options[o_positiontop][op_value]) // nad atakami
    $("#mainview>.contentBox01h>.content>br").after(t); else
    $("#mainview>.contentBox01h>.content>table").after(t);

  if (!expanded_options)
    $("#igh_embassy_options_content").hide();

  if (!expanded_report)
    $("#igh_embassy_report_content").hide();

  $("#igh_embassy").fadeIn();

  for (var i=0; i<igh_options.length; i++)
   {
    document.getElementById("igh_option_"+i).addEventListener('click',changeOption, true);
   }

  document.getElementById("igh_option_img").addEventListener('click',toggleexpanded_options,true);
  document.getElementById("igh_option_img").src=expanded_options?igh_minus:igh_plus;
  
  document.getElementById("igh_report_img").addEventListener('click',toggleexpanded_report,true);
  document.getElementById("igh_report_img").src=expanded_report?igh_minus:igh_plus;
}

/*************************************************************************************************/

function show_debug()
{
  if (sheetdebug.innerHTML=="div.igh_debug_window { display: inline }")
    sheetdebug.innerHTML = "div.igh_debug_window { display: none }"; else
    sheetdebug.innerHTML = "div.igh_debug_window { display: inline }";
  document.getElementById("igh_debug_textarea").innerHTML = AttacksToString(attacks);
}
/*************************************************************************************************/

function delete_settings()
{
  var vals = GM_listValues();
  for (var i=0; i < vals.length; i++)
    GM_deleteValue(vals[i]);
}

/*************************************************************************************************/

function menu_delete_settings()
{
  delete_settings();
  location.href = document.URL;
}

/*************************************************************************************************/
// todo: dodac do opcji callbacki - dodatkowe wywolanie funkcji
function changeOption(event)
{
  var nr = parseInt(this.id.substring(11));

  if (igh_options[nr][op_type]==opt_switch)
   {
    igh_options[nr][op_value]=!igh_options[nr][op_value];
    IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
    if (nr==o_positiontop)
      moveIGHWindow(); else
      location.href = document.URL;
   }
  if (igh_options[nr][op_type]==opt_intval)
   {
    var value = prompt(igh_options[nr][op_text2],igh_options[nr][op_value]);
    if (value!=null)
     {
      value = parseInt(value);
      if (value>=0)
       {
        igh_options[nr][op_value]=value;
        IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
        location.href = document.URL;
       } else
        alert(LANG.badvalue1);
     }
   }
  if (igh_options[nr][op_type]==opt_alarmtype)
   {
    var value = prompt(igh_options[nr][op_text2],igh_options[nr][op_value]);
    if (value!=null)
     {
      value = parseInt(value);
      if ((value>=1) && (value<=5))
       {
        igh_options[nr][op_value]=value;
        IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
        location.href = document.URL;
       } else
        alert(LANG.badvalue2);
     }
   }
}

/*************************************************************************************************/

// stara wersja
/*function attacksIndexOf(att,elem,land)
{
  for (var i=0; i<att.length; i++)
   {
    if ((att[i].cityid==elem) && (att[i].land==land))
      return i;
   }
  return -1;
}*/


// wyszukiwanie binarne O(lgn)
function attacksIndexOf(att,cityid,land)
{
  var a = 0;
  var b = att.length-1;
 
  while (a<=b)
   {
     var c = Math.floor((a+b)/2); // todo: przesuniecie bitowe

     if (att[c].cityid == cityid)
      {
       if (att[c].land == land)
         return c; else
        {
         //if ()
         c=c+ (att[c].land?-1:1);
         if ((c<0) || (c>=att.length) || (att[c].cityid != cityid))
           return -1; else
           return c;
        }
      } else
      {
       if (cityid<att[c].cityid)
         b = c-1; else
         a = c+1;
      }
   }

  return -1;
}

/*************************************************************************************************/

function TCityAttack()
{
  this.cityid  = 0;
  this.player  = "";
  this.land    = false;
  this.active  = false;
  this.attacks = [];
  this.verify = function()
   {
    return !isNaN(this.cityid) && (this.player!="");
   }
}

/*************************************************************************************************/

function TAttack()
{
  this.cityid  = 0;
  this.player  = "";
  this.type    = "";
  this.units   = 0;
  this.time    = "";
  this.verify = function()
   {
    return !isNaN(this.cityid) && !isNaN(this.units) && (this.player!="");
   }
}

/*************************************************************************************************/

function cityattackcompfunc(a, b)
{
 if (a.cityid==b.cityid)
  {
   if (a.land)
     return 1; else
     return -1;
  } else
   return a.cityid-b.cityid; // rosnąco
}

/*************************************************************************************************/

function attackcompfunc(a, b)
{
  return a.cityid-b.cityid; // rosnąco
}

/*************************************************************************************************/

function getLanguage()
{
  var ikahost = location.host;
    
  var p = posB(ikahost,".ikariam.",0);
  if (p==-1)
   {
    // error
    return "";
   } else
   {
    var S = ikahost.substr(p);

    // sprawdzanie czy domena ma typ
    // s*.*.ikariam.com    
    if (S=="com")
     {
      var p1 = ikahost.indexOf(".ikariam.");
      var p2 = ikahost.indexOf(".");
      if (p1!=p2)
        S = ikahost.substr(p2+1,p1-p2-1);
     }
    return S;
   }
}

/*************************************************************************************************/

function moveIGHWindow()
{
  var obj = $("#igh_embassy");
  obj.slideUp("slow",
    function()
     {
      // miejsce wstawienia ramki - jQuery
      if (igh_options[o_positiontop][op_value]) // nad atakami
        $("#mainview>.contentBox01h>.content>br").after(obj); else
        $("#mainview>.contentBox01h>.content>table").after(obj);
      obj.slideDown("slow");
     });
}

/*************************************************************************************************/
/*                                           NIE MOJE                                            */
/*************************************************************************************************/

/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/
 
function trim(str, chars) {
  return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/*************************************************************************************************/

// Checks if jQuery's loaded - based on tutorial
function GM_JQWait(onjqloaded)
{
  if (typeof unsafeWindow.jQuery == 'undefined')
   { 
    window.setTimeout(function() { GM_JQWait(onjqloaded); },100);
   } else
   {
    $ = unsafeWindow.jQuery;
    onjqloaded();
   }
}

/*************************************************************************************************/