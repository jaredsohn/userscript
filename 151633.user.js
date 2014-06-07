// ==UserScript==
// @name DS-Farmmanager
// @namespace FileFace
// @description Assistiert unter anderem beim Farmen
// @version 4.19
// @author gobi
// @copyright 2012 gobi - http://userscripts.org/users/gobi
// @license http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include http://de*.die-staemme.de/game.php?*
// @include http://des*.ds.ignames.net/game.php?*
// @include http://ch*.staemme.ch/game.php?*
// @include http://en*.tribalwars.net/game.php?*
// @include http://uk*.tribalwars.co.uk/game.php?*
// @include http://us*.tribalwars.us/game.php?*
// @updateURL https://userscripts.org/scripts/source/134048.meta.js
// ==/UserScript==
var version = "8.8-3.8-5.18",
win = typeof (unsafeWindow) != 'undefined' ? unsafeWindow : window,
$ = jQuery = win.jQuery;

try {
(function() {
var image_base = win.image_base,
texts = {
unitImgPath: image_base +"unit/unit_$.png",
buildingImgPath: image_base +"buildings/$.png",

unit: {
spear: "Speerträger",
sword: "Schwertkämpfer",
axe: "Axtkämpfer",
archer: "Bogenschütze",
spy: "Späher",
light: "Leichte Kavallerie",
marcher: "Berittener Bogenschütze",
heavy: "Schwere Kavallerie",
ram: "Rammbock",
catapult: "Katapult",
knight: "Paladin",
snob: "Adelsgeschlecht",
militia: "Miliz"
},
units: {
spear: "Speerträger",
sword: "Schwertkämpfer",
axe: "Axtkämpfer",
archer: "Bogenschützen",
spy: "Späher",
light: "Leichte Kavallerie",
marcher: "Berittene Bogenschützen",
heavy: "Schwere Kavallerie",
ram: "Rammböcke",
catapult: "Katapulte",
knight: "Paladine",
snob: "Adelsgeschlechter",
militia: "Milizen"
},
buildings: {
main: "Hauptgebäude",
barracks: "Kaserne",
stable: "Stall",
garage: "Werkstatt",
church: "Kirche",
church_f: "Erste Kirche",
snob: "Adelshof",
smith: "Schmiede",
place: "Versammlungsplatz",
statue: "Statue",
market: "Marktplatz",
wood: "Holzfäller",
stone: "Lehmgrube",
iron: "Eisenmine",
farm: "Bauernhof",
storage: "Speicher",
hide: "Versteck",
wall: "Wall"
},
resources: {
wood: "Holz",
stone: "Lehm",
iron: "Eisen",
sum: "Gesamt"
},
reports: {
subject: "Betreff",
'delete': "Löschen",
move: "Verschieben",
},
gui: {
title: "DS-Farmassistent",
dsVersion: "DS-Version",
dataVersion: "Datenversion",
update: "Update von Datenversion $1 auf $2 war erfolgreich!",
readAttacksFail: "Es wurden einige Angriffe umbenannt, deshalb konnten nicht alle eingelesen werden!",
FA: "FA",
reportReadSuccess: "Der Bericht wurde erfolgreich eingelesen!",
reportReadUpToDate: "Dieser Bericht ist aktuell!",
reportReadOutOfDate: "Der Bericht ist veraltet!",
farmlist: "Farmliste",
noUnitsCol: "Keine Truppen in der Farm?",
distance: "Entfernung",
age: "Alter",
noUnits: "Keine Truppen!",
yesUnits: "Achtung: Truppen!",
newReport: "Es gibt min. einen neuen Bericht!",
noCoords: "Du musst die x und y Koordinaten des Ziels angeben.",
noUnitsSelected: "Keine Einheiten ausgewählt",

readReports: "Berichte einlesen",
delOldReports: "Veraltete Berichte löschen",
effectiveStorage: "offener Speicher (farmbare Größe)",
buildUps2: "Mögliche Ausbauten errechnen",
buildUps2Warning: "ACHTUNG!\nDieser Vorgang kann den Browser für einige Minuten vollständig auslasten!\n\nSollen trotzdem bis zu 10000 Ausbaumöglichkeiten errechnet werden?\nDie Ergebnisse sind in der Konsole des Browser einzusehen.",
lockFarm: "Farm sperren",
contingentRes: "Jetzt möglich",
mood: "Zustimmung",
buildings: "Gebäude",
units: "Truppen",
todayBooty: "Heute erfarmte Rohstoffe",
yesterdayBooty: "Gestern erfarmte Rohstoffe",
booty: "Beute",
confirmDeleteReport: "Soll der Bericht wirklich gelöscht werden?",
spyReport: "Spähbericht",
markOldReports: "Veraltete Berichte markieren",
delData: "Daten löschen",
delConfirm: "Sollen wirklich alle Daten dieses Dorfes gelöscht werden?",
resetEQ: "Erfolgsquotienten zurücksetzen",
population: "BH-Plätze",
name: "Name",

buildVariantHeader: "Gebäudevarianten",
addBuildVariant: "Gebäudevariante hinzufügen",
buildReady: "Gebäude vollständig ausgebaut",
buildOver: "Gebäude zu weit ausgebaut!",
tearDownLevel: "Abriss um eine Stufe",
tearDown: "Abriss:",
points: "Punkte",

unitVariantHeader: "Einheitenvarianten",
addUnitVariant: "Einheitenvariante hinzufügen",
units_title: "Einheiten",
freePopuplation: "Frei",
unitsTitle: "da/Aktuell/Gesamt",
fillIn: "Ausfüllen",
troopsNumReached: "Truppenanzahl erreicht",
farmToLow: "Zu wenig Bauernhöfe um zusätzliche Soldaten zu versorgen.",
farmReached: "Der Bauernhof kann keine weiteren Einheiten versorgen.",
unitNotReseached: "Einheit noch nicht erforscht",
'delete': "Löschen",
resources: "Rohstoffe",

village_overview: "Übersichten",

loadingInfos: "Lade Informationen ...",
loadServerCfg: "Serverkonfiguration wird ermittelt...",
serverCfgKnown: "Serverkonfiguration wurde ermittelt",
loadUnitInfo: "Einheiten werden ermittelt...",
unitInfoKnown: "Einheiten wurden ermittelt",
loadBuildingInfo: "Gebäude werden ermittelt...",
buildingInfoKnown: "Gebäude wurden ermittelt",
error: "Fehler",
ok: "Ok",
close: "Schließen",
valueError: "Fehlerhafter Wert, verwendete Default-Einstellungen",

percentage: "Prozent",
changeColor: "Farbe ändern",
colorCode: "Farbcode",
change: "Ändern",
settings: {
settings: "Einstellungen",
titles: {
general: "Allgemein",
place: "Platz",
map: "Karte",
reports: "Berichte",
autoFarm: "Autofarmen",
paFeatures: "PA-Features",
registerReport: "Bericht eintragen",
hotkeys: "Hotkeys",
misc: "Sonstiges"
},
general: {
considerEQ: ["Den Erfolgsquotienten berücksichtigen:"],
enableAtUV: ["Den Farmassistenten in UV-Accounts aktivieren:"],
dummy1: '<tr><th colspan="2"></th></tr>',
enableStorageColorAt: ["Speicherstände farbig hinterlegen:", {
all: "Alle auswählen",
infobar: "Infoleiste",
production: "Produktionsübersicht",
market: "Marktplatz",
place: "Versammlungsplatz (Farmliste)",
map: "Karte (Popup)",
info_village: "Dorfinformationen",
coin_mint: "Goldmünzen prägen"
}],
storageColorBar: ["", {}],
},
place: {
farmlistOpt: ["Die Farmliste darstellen:", ["gar nicht", "Popup", "integriert"]],
minRes: ["min. Rohstoffe:", ""],
maxDistance: ["maximale Entfernung:", " Felder"],
maxAge: ["maximales Alter:", " Stunden"],
attackedFarms: ["Farmen, die angegriffen werden", ["so lassen", "ausgrauen", "ausgrauen und an das Ende der Liste verschieben", "nicht mehr anzeigen"]],
farmSpys: ["Späher pro Farmangriff mitschicken:", " Späher"],
spyOnlyWithUnits: ["Späher nur mit Einheiten zusammen schicken:"],
sendRams: ["Rammen mitschicken ab Walllevel:", ""],
checksActive: ["Einheitenauswahl im Versammlungsplatz:"],
unitPreferences: ["Prioritäten der Einheiten:", {}]
},
map: {
integrateInfos: ["Dorfinformationen in das Popup integrieren:"],
overlaysActive: ["Overlays aktivieren:"]
},
reports: {
showSearchInput: ["Ein Eingabefeld zum Suchen einfügen:"],
changeLinkStyle: ["Berichtelinks in der Berichteübersicht ändern:"],
newReport: ["Neuer Bericht:", {}],
readReport: ["Eingelesener Bericht:", {}],
spyReport: ["Eingelesener Spähbericht:", {}],
oldReport: ["Veralteter Bericht:", {}],
colors: {
blue: "blau",
green: "grün",
yellow: "gelb",
red: "rot",
red_blue: "rot-blau",
red_yellow: "rot-gelb"
},
},
autoFarm: {
active: ["Autofarmen aktivieren:"],
farmOver: ["Farmen über:", ["die Karte", "den Versammlungsplatz", "den Farm-Assistent"]],
farm_Assistent_click: ["Farm-Assistent klicken:", ["A", "B", "C"]],
minRes: ["min. Rohstoffe:", ""],
maxDistance: ["Farmen im Umkreis von:", " Feldern"],
farmSpys: ["Späher pro Farmangriff mitschicken:", " Späher"],
sendRams: ["Rammen mitschicken ab Walllevel:", ""],
farmWith: ["Farmen mit:", ["den für die Rohstoffe benötigten Truppen", "fest eingestellten Truppen", "mindestens den eingestellten Truppen"]],
units: ["Einheiten:", {}],
},
paFeatures: {
freePA: ["Free-PA aktivieren:"],
dummy: '<tr><th colspan="2"></th></tr>',
farmAssistent: ["Zusätze für den Farm-Assistent aktivieren:"],
farmAssistent_minRes: ["min. Rohstoffe:", ""]
},
registerReport: {
coords: ["&nbsp;", {
x: "x:",
y: "y:"
}],
villageName: ["Dorf-Name:", {}],
villageID: ["Dorf-ID:", {}],
ownerID: ["Besitzer-ID:", {}],
spyDate: ["Späh-Datum:", { format: "am $day$.$month$.$year$<br>um $hour$:$minute$ Uhr" }],
units: ["Einheiten:", {}],
res: ["Rohstoffe:", {}],
buildings: ["Gebäude:", {}],
mood: ["Zustimmung:", {}],
bonus: ["Bonus:", {
bonus: [
'-',
'100 % mehr Holzproduktion',
'100 % mehr Lehmproduktion',
'100 % mehr Eisenproduktion',
'10 % mehr Bevölkerung',
'33 % schnellere Produktion in der Kaserne',
'33 % schnellere Produktion im Stall',
'50 % schnellere Produktion in der Werkstatt',
'30 % mehr Rohstoffproduktion aller Produktionsgebäude',
'50 % mehr Speicherkapazität und Händler'
]
}],
save: ["Eintragen", {}]
},
hotkeys: {
active: ["Hotkeys aktivieren:"],
note: ["Visuell darstellen:"],
},
misc: {
overview_showBooty: ["Die Beute in der Dorfübersicht anzeigen:"],
dummy1: '<tr><th colspan="2"></th></tr>',
recruitVariantActive: ["Einheitenvarianten aktivieren:"],
buildVariantActive: ["Gebäudevarianten aktivieren:"],
queueOpt: ["Produktionsschleifen verkürzen:", ["Gar nicht", "Leicht", "Stark"]],
prodRecruit: ["Rekrutierung in der Produktionsübersicht kürzen:"],
cutProd: ["Spalten <i>Bauauftrag</i> und <i>Forschung</i> in der Produktionsübersicht entfernen:"],
dummy2: '<tr><th colspan="2"></th></tr>',
prodFilterActive: ["Filter in der Produktionsansicht aktivieren:"],
dummy3: '<tr><th colspan="2"></th></tr>',
fixQuickbar: ["Die Schnellleiste fixieren:"],
fixInfobar: ["Die Infoleiste fixieren:"]
},
standard: "Standard",
disable: "Deaktivieren",
save: "Speichern",
port: {
config: "Einstellungen",
variants: "Varianten",
reports: "Berichte",
villages: "Dörfer",
coords: "Koordinaten",
commands: "Befehle",
booty: "Beute",
},
export: {
button: "Exportieren",
title: "Daten exportieren:",
all: "Alles auswählen",
code: "Code:",
error: "Export fehlgeschlagen!",
success: "Export erfolgreich abgeschlossen!",
},
import: {
button: "Importieren",
title: "Daten importieren:",
code: "Code:",
error: "Import fehlgeschlagen!",
success: "Import erfolgreich abgeschlossen!"
},
reset: {
button: "Zurücksetzen",
title: "Daten zurücksetzen:",
complete: "Die Daten wurden zurückgesetzt!",
},
},
autoFarm: {
title: 'Autofarmen',
start: 'Autofarmen starten',
stop: 'Autofarmen stoppen'
},
up: String.fromCharCode(9650),
down: String.fromCharCode(9660)
},
regex: {
reportTitle: /<[Hh]3>Der Angreifer|Verteidiger hat gewonnen<\/[Hh]3>/,
reportSupport: /unterstützt/,
villageCoords: /\((\d{1,3})\|(\d{1,3})\) K(\d+)\s*/,
villageName: />\s*(.*)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)\s*/,
send: /^\s*Gesendet\s*$/,
sendDate: /Gesendet<\/td><td>\s*0?(\d+)\.0?(\d+)\.(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
sendDateStr: /Gesendet<\/td><td>\s*([\d\. :]+)\s*<\/td>/,
attack: /Angriff/,
spy: /Spionage/,
spyres: /Ersp.{1,2}hte Rohstoffe/,
building: /Geb.{1,2}ude/,
visit: /<h3>Besuch<\/h3>/i,
playerLink: /<a href="[^"]*id=(\d+)[^>]*>\s*([^<]+)/,
attacker: /Angreifer:<\/th>\s*<th>([^<]+)/,
attackerVillage: /Herkunft:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
defender: /Verteidiger:<\/th>\s*<th>(.+)/,
defenderVillage: /Ziel:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
unitImg: /<img[^>]*src="http:\/\/[a-zA-Z\.\d]+\/graphic\/unit\/unit_([a-zA-Z]+)\.png[^"]*"[^>]*>/,
buildingLevel: /\s*(.+)\s+<b>\(Stufe (\d+)/,
buildingLevels: /\s*(.+)\s+<b>\(Stufe (\d+)/g,
mainQueue: /\s*(.+)\s+\(Stufe (\d+)\)|\s*(.+)\s+\(Stufe abrei.{1,2}en\)/,
unitQueue: /\s*(-?\d+)\s+(.+)\s*/,
mainLevel: />\s*\(Stufe (\d+)\)\s*</,
booty: /Beute:/,
bootyGes: /(\d+)\/(\d+)/,
wood: /<img src="[^"]+holz[^"]+"[^>]*>\s*(\d+)/,
wood2: /<span class="icon header wood"> <\/span>\s*(\d+)/,
stone: /<img src="[^"]+lehm[^"]+"[^>]*>\s*(\d+)/,
stone2: /<span class="icon header stone"> <\/span>\s*(\d+)/,
iron: /<img src="[^"]+eisen[^"]+"[^>]*>\s*(\d+)/,
iron2: /<span class="icon header iron"> <\/span>\s*(\d+)/,
deftroopsout: /Einheiten au.{1,2}erhalb:/,
damage: /[^>]+>(.+) besch.{1,2}digt von Level <[Bb]>\d+<\/[Bb]> auf Level <[Bb]>(\d+)/,
loyaltyChange: /esunken von <[Bb]>\d+<\/[Bb]> auf <[Bb]>(-?\d+)/,

loyalty: /Zustimmung/,
commands: {
attacked: /greift (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2}) an/,
conquer: /erobert (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
attack: /Angriff auf (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
comeback: /R.{1,2}ckkehr von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
abort: /Abgebrochener Befehl nach (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
support: /Unterst.{1,2}tzung für (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
callback: /R.{1,2}ckzug von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
sentback: /Zur.{1,2}ckgeschickt von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
cancel: /<a[^>]+>abbrechen<\/a>/
},
ownCommands: /^\s*Eigene Befehle[^<>]*$/,
commandLink: /<a[^>]*href="[^"]*id=(\d+)[^"]*"/,
attackImg: /<img[^>]*src="[^"]+command\/attack\.png/,

reportSubject: /^\s*Betreff\s*$/,
moveReport: /Verschieben/,

coordsText: /^\s*Koordinaten:\s*$/,
pointsText: /^\s*Punkte:\s*$/,
homeCoords: /<b class="nowrap">\((\d{1,3})\|(\d{1,3})\) K(\d+)<\/b>/,

lowPointsError: /Das Ziel kann bis zum (\d+)\.(\d+)\. (\d+):(\d+) nur angreifen und angegriffen werden, wenn das Punkte-Verh.{1,2}ltnis zwischen Angreifer und Verteidiger h.{1,2}chstens (\d+) : (\d+) ist\./,
lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./,
settings: /Einstellungen/,
arrivalTitle: /Ankunft/,
durationTitle: /Dauer:/,
reserved: /Achtung.+reserviert!$/,

unitNotResearched: /Einheit noch nicht erforscht/,

village: /Dorf/,
points: /Punkte/,
resources: /Rohstoffe/,
ownVill: /<span id="label_text_(\d+)">(.+) \((\d{1,3})\|(\d{1,3})\) K(\d+)<\/span>/,

build_contract: /Bauauftrag/,
research: /Forschung/,

botProtect: /<[Hh]2>\s*Botschutz\s*<\/[Hh]2>/,
captcha: /\/game\.php\?captcha/,
},
locale: {
nrgroupsign: ".",
nrgroupsign2: ",",
timeStr1: /(am (\d{2})\.(\d{2})\.(\d{2})?|morgen|heute) um (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
timeStr2: /(0?(\d{1,2})\.0?(\d{1,2})\.0?(\d{1,2})?) 0?(\d{1,2}):0?(\d{1,2}):?0?(\d{1,2})?:?0?(\d{2,3})?/,
tomorrow: "morgen",
timeStr2Sec: function(str) {
var res = str.match( new RegExp(texts.locale.timeStr1) );
if ( !res )
res = str.match( new RegExp(texts.locale.timeStr2) );
sec = 0;
if ( res ) {
if ( isNaN(res[7]) )
res[7] = 0;
if ( typeof(res[3]) == "undefined" ) {
var today = lib.getTime();
today = today - today % 86400;
sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7]);
if ( res[1] == texts.locale.tomorrow )
sec += 86400;
} else {
res[3] = parseInt(res[3]);
res[4] = parseInt(res[4]);
res[5] = parseInt(res[5]);
res[6] = parseInt(res[6]);
res[7] = parseInt(res[7]);
if ( isNaN(res[4]) )
res[4] = lib.serverTime.getUTCFullYear();
if ( res[4] < 100 )
res[4] += 2000;
var dt = new Date();
dt.setUTCFullYear(res[4]);
dt.setUTCMonth(res[3] - 1);
dt.setUTCDate(res[2]);
dt.setUTCHours(res[5]);
dt.setUTCMinutes(res[6]);
dt.setUTCSeconds(res[7]);
sec = Math.floor(dt.getTime() / 1000);
}
}
return sec;
},
},
ch: {
unit: {
sword: "Schwärtkämpfer",
archer: "Bogeschütz",
light: "Liechti Kavallerie",
marcher: "Berittnig Bogenschütz",
heavy: "Schwäri Kavallerie",
snob: "Adusgschlächt",
militia: "Miliz"
},
units: {
sword: "Schwärtkämpfer",
archer: "Bogenschütz",
light: "Liechti Kavallerie",
marcher: "Berittnig Bogenschütz",
heavy: "Schwäri Kavallerie",
ram: "Rammböck",
catapult: "Katapult",
snob: "Adelsgeschlechter",
militia: "Milize"
},
buildings: {
main: "Houptgeböide",
barracks: "Kasärne",
stable: "Stau",
garage: "Wärkstatt",
church: "Chiuche",
church_f: "Erschti Chiuche",
snob: "Adushof",
smith: "Schmied",
place: "Platz",
statue: "Statue",
market: "Markt",
wood: "Houzfäuer",
stone: "Lehmgruebe",
iron: "Isemine",
farm: "Burehof",
storage: "Spicher",
hide: "Vrsteck",
wall: "Wall"
},
resources: {
wood: "Houz",
stone: "Lehm",
iron: "Isä",
sum: "Gsamt"
},
reports: {
subject: "Beträff",
'delete': "Lösche",
move: "Verschieben" //?
},
gui: {
noCoords: "Du muesch di x und y Koordinate vom Ziu agä",
noUnitsSelected: "Ke Einheite usgwäut",

buildings: "Geböide",
booty: "Büti",

buildVariantHeader: "Geböidevarianten", //?
addBuildVariant: "Geböidevariante hinzufügen", //?
buildReady: "Geböide vollständig usbout",
buildOver: "Geböide zu weit usbout!", //?
points: "Pünkt",

farmToLow: "Z weni Burehöf um zuesätzlechi Soudate z vrsorge.",
unitNotReseached: "Einheite no nid erforscht",
'delete': "Lösche",
resources: "Rohstoff",

village_overview: "Übersichte",

close: "schliesse",

settings: {
settings: "Istellige",
save: "Spichäre",
},
},
regex: {
reportTitle: /<[Hh]3>Dr Agrifer|Vrteidiger het gwunne<\/[Hh]3>/,
reportSupport: /unterstützt/, //?
send: /^\s*Gsändet\s*$/,
sendDate: /Gsändet<\/td><td>\s*0?(\d+)\.0?(\d+)\.(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
sendDateStr: /Gsändet<\/td><td>\s*([\d\. :]+)\s*<\/td>/,
attack: /An?griff/,
spyres: /Ersp.{1,2}hti Rohstoff/,
building: /Geböide/,
attacker: /Angrifer:<\/th>\s*<th>([^<]+)/,
attackerVillage: /Härkunft:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
defender: /Vrteidiger:<\/th>\s*<th>(.+)/,
defenderVillage: /Ziu:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
mainQueue: /\s*(.+)\s+\(Stuefe (\d+)\)|\s*([^><\s]+)\s+\(Stuefe abrisse\)/, //?
booty: /Büti:/,
deftroopsout: /Einheite au.{1,2}erhalb:/, //?
damage: /[^>]+>(.+) besch.{1,2}diget vo Level <[Bb]>\d+<\/[Bb]> uf Level <[Bb]>(\d+)/, //?
loyaltyChange: /Zuestimmig gsunke vo <[Bb]>\d+<\/[Bb]> uf <[Bb]>(-?\d+)/,

loyalty: /Zuestimmig/,
commands: {
attacked: /grift (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2}) a/,
attack: /Agriff uf (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
comeback: /R.{1,2}ckkehr vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
callback: /R.{1,2}ckzug vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
sentback: /Zur.{1,2}ckgeschickt vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
cancel: /<a[^>]+>abbräche<\/a>/,
},
ownCommands: /^\s*Eigeni Befäu[^<>]*$/,

reportSubject: /^\s*Beträff\s*$/,
moveReport: /Verschieben/, //?

coordsText: /^\s*Koordinate:\s*$/,
pointsText: /^\s*Pünkt:\s*$/,

lowPointsError: /Das Ziel kann bis zum (\d+)\.(\d+)\. (\d+):(\d+) nur angreifen und angegriffen werden, wenn das Punkte-Verh.{1,2}ltnis zwischen Angreifer und Verteidiger h.{1,2}chstens (\d+) : (\d+) ist\./, //?
lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./, //?
settings: /Istellige/,
arrivalTitle: /Akunft/,
durationTitle: /Dur:/,

unitNotResearched: /Einheite no nid erforscht/,

village: /Dorf/,
points: /Pünkt/,
resources: /Rohstoffe/,

botProtect: /<[Hh]2>\s*Botschutz\s*<\/[Hh]2>/, //?
},
locale: {
timeStr1: /(am (\d{2})\.(\d{2})\.(\d{2})?|morn|hüt) um (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
tomorrow: "morn"
}
},
en: {
unit: {
spear: "Spear fighter",
sword: "Swordsman",
axe: "Axeman",
archer: "Archer",
spy: "Scout",
light: "Light cavalry",
marcher: "Mounted archer",
heavy: "Heavy cavalry",
ram: "Ram",
catapult: "Catapult",
knight: "Paladin",
snob: "Nobleman",
militia: "Militia"
},
units: {
spear: "Spear fighters",
sword: "Swordsmen",
axe: "Axemen",
archer: "Archer",
spy: "Scouts",
light: "Light cavalry",
marcher: "Mounted archer",
heavy: "Heavy cavalry",
ram: "Rams",
catapult: "Catapults",
knight: "Paladins",
snob: "Noblemen",
militia: "Militias"
},
buildings: {
main: "Village Headquarters",
barracks: "Barracks",
stable: "Stable",
garage: "Workshop",
church: "Church",
church_f: "First church",
snob: "Academy",
smith: "Smithy",
place: "Rally point",
statue: "Statue",
market: "Market",
wood: "Timber camp",
stone: "Clay pit",
iron: "Iron mine",
farm: "Farm",
storage: "Warehouse",
hide: "Hiding place",
wall: "Wall"
},
resources: {
wood: "Wood",
stone: "Clay",
iron: "Iron",
sum: "Total"
},
reports: {
subject: "Subject",
'delete': "Delete",
move: "Move" //?
},
gui: {
dsVersion: "TW-Version",
dataVersion: "Dataversion",
update: "Updating database version $1 to $2 successfully!",
readAttacksFail: "Some attacks have been renamed, so this script was not able to read alle commands!",
reportReadSuccess: "The report has been successfully recorded!",
reportReadUpToDate: "This report is up to date!",
reportReadOutOfDate: "The report is out of date!",
farmlist: "Farm list",
noUnitsCol: "No troops in the farm?",
distance: "Distance",
age: "Age",
noUnits: "No troops!",
yesUnits: "Note: Troops!",
newReport: "There are at least one new report!",
noCoords: "You need to enter the x and y coordinates of the destination",
noUnitsSelected: "No units selected",

readReports: "Read reports",
delOldReports: "Delete outdated Reports",
effectiveStorage: "open storage (farmable size)", //?
buildUps2: "Compute possible upgrades",
buildUps2Warning: "Attention!\nThe process can utilize the browser for a few minutes completely\n\nDo you still be calculated up to 10000 possibilities for expansion?\nThe results are available in the console of the browser.", //?
lockFarm: "Lock the Farm",
contingentRes: "Now possible",
mood: "Loyalty",
buildings: "Buildings",
units: "Units",
todayBooty: "Today captured commodities",
yesterdayBooty: "Yesterday captured commodities",
booty: "Booty",
confirmDeleteReport: "Should this report really be deleted?",
spyReport: "Spy report",
markOldReports: "Mark outdated reports",
delData: "Delete data",
delConfirm: "All data will be deleted in this village, are you sure?",
resetEQ: "Reset the success quotient", //?

buildVariantHeader: "Building variants",
addBuildVariant: "Add building variant",
buildReady: "Building fully constructed",
buildOver: "Building constructed too far!",
tearDownLevel: "Demolition by one level",
tearDown: "Demolish:",

unitVariantHeader: "Unit variants",
addUnitVariant: "Add unit variant",
unitsTitle: "in/Current/Total",
fillIn: "Fill",
troopsNumReached: "Troop numbers reached",
farmToLow: "To provide little additional farms to soldiers.", //?
farmReached: "The farm can provide no further units.",
unitNotReseached: "Unit not yet explored",
'delete': "Delete",
resources: "Resources",

village_overview: "Overviews",

loadingInfos: "Loading Information ...",
loadServerCfg: "Server configuration is determined...",
serverCfgKnown: "Server configuration was determined",
loadUnitInfo: "Units are determined...",
unitInfoKnown: "Units were determined",
loadBuildingInfo: "Buildings are determined...",
buildingInfoKnown: "Buildings were determined",
error: "Error",
ok: "Ok",
close: "Close",
valueError: "Incorrect value, using default settings",

percentage: "Percent",
changeColor: "Change color",
colorCode: "Colorcode",
change: "Change",
settings: {
settings: "Settings",
titles: {
general: "General",
place: "Rally point",
map: "Map",
reports: "Reports",
autoFarm: "Autofarming",
paFeatures: "PA-Features",
registerReport: "Register report",
hotkeys: "Hotkeys",
misc: "Miscellaneous"
},
general: {
considerEQ: ["Consider the success quotient:"],
enableAtUV: ["activate the „Farmassistent“ in sitting accounts:"],
enableStorageColorAt: ["Color the storage:", {
all: "Select all",
infobar: "Infobar",
production: "Production Summary",
market: "Market",
place: "Rally point (Farm list)",
map: "Map (Popup)",
info_village: "Villageinformation",
coin_mint: "Gold coins minting"
}],
},
place: {
farmlistOpt: ["Display the farmlist:", ["No", "As popup", "integrated"]],
minRes: ["min. resources:", ""],
maxDistance: ["max. Distance:", " fields<span class=\"grey\">?</span>"], //?
maxAge: ["max. Age:", " Hours"],
attackedFarms: ["Farmen, die angegriffen werden", ["so lassen", "ausgrauen", "ausgrauen und an das Ende der Liste verschieben", "nicht mehr anzeigen"]],
farmSpys: ["Späher pro Farmangriff mitschicken:", " Späher"],
sendRams: ["Send rams for wall upwards level:", ""],
checksActive: ["Select units at the Rally point:"],
unitPreferences: ["Priorities of the units:", {}]
},
map: {
integrateInfos: ["Integrate Infos into Popup:"],
overlaysActive: ["Activate Overlays:"]
},
reports: {
showSearchInput: ["Insert Search-input:"],
newReport: ["New Report:", {}],
readReport: ["Read Report:", {}],
spyReport: ["Read Spyreport:", {}],
oldReport: ["Old Report:", {}],
colors: {
blue: "blue",
green: "green",
yellow: "yellow",
red: "red",
red_blue: "red-blue",
red_yellow: "red-yellow"
},
},
autoFarm: {
active: ["Activate Autofarmen:"],
minRes: ["min. ressources:", ""],
maxDistance: ["Farmen im Umkreis von:", " Feldern"],
farmSpys: ["Send Scouts per Farmattack:", " Scouts"],
sendRams: ["Send rams for wall upwards level:", ""],
farmWith: ["Farmen mit:", ["den für die Rohstoffe benötigten Truppen", "fest eingestellten Truppen", "mindestens den eingestellten Truppen"]],
units: ["Units:", {}],
},
paFeatures: {
freePA: ["Activate Free-PA:"],
farmAssistent: ["Activate additional Features for Farm-Assistent:"],
},
registerReport: {
villageName: ["Villagename:", {}],
villageID: ["Village-ID:", {}],
ownerID: ["Owner-ID:", {}],
spyDate: ["Spydate:", { format: "$month$/$day$/$year$<br>at $hour$:$minute$" }],
units: ["Units:", {}],
res: ["Ressources:", {}],
buildings: ["Buildings:", {}],
mood: ["Mood:", {}],
bonus: ["Bonus:", {
bonus: [
'-',
'100 % mehr Holzproduktion',
'100 % mehr Lehmproduktion',
'100 % mehr Eisenproduktion',
'10 % mehr Bevölkerung',
'33 % schnellere Produktion in der Kaserne',
'33 % schnellere Produktion im Stall',
'50 % schnellere Produktion in der Werkstatt',
'30 % mehr Rohstoffproduktion aller Produktionsgebäude',
'50 % mehr Speicherkapazität und Händler'
]
}],
save: ["Register", {}]
},
hotkeys: {
active: ["Activate Hotkeys:"],
},
misc: {
overview_showBooty: ["Show the booty in Villageoverview:"],
recruitVariantActive: ["Activate Unit variants:"],
buildVariantActive: ["Activate Building variants:"],
queueOpt: ["Shorten the production queue:", ["not at all", "small", "excessive"]],
prodFilterActive: ["Activate filter in the production overview:"],
fixQuickbar: ["Fix the quickbar:"],
fixInfobar: ["Fix the infobar:"]
},
standard: "Standard",
disable: "Disable",
save: "Save",
port: {
config: "Settings",
variants: "Variants",
reports: "Reports",
villages: "Villages",
coords: "Coordinates",
commands: "Commands",
booty: "Booty",
},
export: {
button: "Export",
title: "Export Data:",
all: "Select all",
code: "Code:",
error: "Export failed!",
success: "Export successful!",
},
import: {
button: "Import",
title: "Import Data:",
code: "Code:",
error: "Import failed!",
success: "Import successful!"
},
reset: {
button: "Reset",
title: "Resete Data:",
complete: "Data reset complete!",
},
},
autoFarm: {
title: 'Autofarming',
start: 'Start Autofarming',
stop: 'Stop Autofarming'
},
},
regex: {
reportTitle: /<[Hh]3>The attacker|defender has won<\/[Hh]3>/,
reportSupport: /supports/, //?
send: /^\s*Sent\s*$/,
sendDate: /Sent<\/td><td>\s*(\w+)\s+0?(\d+),\s+(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
sendDateStr: /Sent<\/td><td>\s*(.+)\s*<\/td>/,
attack: /Attack/, //?
spy: /Espionage/,
spyres: /Resources scouted/,
building: /Buildings/, //?
visit: /<h3>Visit<\/h3>/i, //?
attacker: /Attacker:<\/th>\s*<th>([^<]+)/,
attackerVillage: /Origin:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
defender: /Defender:<\/th>\s*<th>(.+)/,
defenderVillage: /Destination:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
buildingLevel: /\s*(.+)\s+<b>\(Level (\d+)/,
buildingLevels: /\s*(.+)\s+<b>\(Level (\d+)/g,
mainQueue: /\s*(.+)\s+\(Level (\d+)\)|\s*(.+)\s+\(demolish level\)/,
mainLevel: />\s*\(Level (\d+)\)\s*</,
booty: /Haul:/,
deftroopsout: /Units outside/, //?
damage: /[^>]+>(.+) has been damaged and downgraded from level <[Bb]>\d+<\/[Bb]> to level <[Bb]>(\d+)/,
loyaltyChange: /esunken von <[Bb]>\d+<\/[Bb]> auf <[Bb]>(-?\d+)/, //?

loyalty: /Loyalty/,
commands: {
attacked: /attacks (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
conquer: /erobert (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/, //?
attack: /Attack on (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
comeback: /Return from (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
abort: /Cancelled command after (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
support: /Unterst.{1,2}tzung für (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/, //?
callback: /R.{1,2}ckzug von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/, //?
sentback: /Zur.{1,2}ckgeschickt von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/, //?
cancel: /<a[^>]+>cancel<\/a>/
},
ownCommands: /^\s*Own commands[^<>]*$/,

reportSubject: /^\s*Subject\s*$/,
moveReport: /Move/, //?

coordsText: /^\s*Coordinates:\s*$/,
pointsText: /^\s*Points:\s*$/,

lowPointsError: /Das Ziel kann bis zum (\d+)\.(\d+)\. (\d+):(\d+) nur angreifen und angegriffen werden, wenn das Punkte-Verh.{1,2}ltnis zwischen Angreifer und Verteidiger h.{1,2}chstens (\d+) : (\d+) ist\./, //?
lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./, //?
settings: /Settings/,
arrivalTitle: /Ankunft/, //?
durationTitle: /Dauer:/, //?
reserved: /Achtung.+reserviert!$/, //?

unitNotResearched: /Einheit noch nicht erforscht/, //?

village: /Village/,
points: /Points/,
resources: /Resources/,

botProtect: /<[Hh]2>\s*Bot protection\s*<\/[Hh]2>/,
},
locale: {
timeStr1: /(on (\d{2})\.(\d{2})\.(\d{2})?|tomorrow|today) at (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
timeStr2: /((\w{3,4}) (\d{2}), (\d{2,4})?)\s+(\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
months: {
"Jan": 1,
"Feb": 2,
"Mar": 3,
"Apr": 4,
"May": 5,
"Jun": 6,
"Jul": 7,
"Aug": 8,
"Sep": 9,
"Oct": 10,
"Nov": 11,
"Dec": 12
},
tomorrow: "tomorrow",
timeStr2Sec: function(str) {
var res = str.match( new RegExp(texts.locale.timeStr1) );
if ( !res )
res = str.match( new RegExp(texts.locale.timeStr2) );
sec = 0;
if ( res ) {
if ( isNaN(res[7]) )
res[7] = 0;
if ( isNaN(res[2]) ) {
var tmp = res[3];
res[3] = texts.locale.months[res[2]];
res[2] = tmp;
}
if ( typeof(res[3]) == "undefined" ) {
var today = lib.getTime();
today = today - today % 86400;
sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7]);
if ( res[1] == texts.locale.tomorrow )
sec += 86400;
} else {
res[3] = parseInt(res[3]);
res[4] = parseInt(res[4]);
res[5] = parseInt(res[5]);
res[6] = parseInt(res[6]);
res[7] = parseInt(res[7]);
if ( isNaN(res[4]) )
res[4] = lib.serverTime.getUTCFullYear();
if ( res[4] < 100 )
res[4] += 2000;
var dt = new Date();
dt.setUTCFullYear(res[4]);
dt.setUTCMonth(res[3] - 1);
dt.setUTCDate(res[2]);
dt.setUTCHours(res[5]);
dt.setUTCMinutes(res[6]);
dt.setUTCSeconds(res[7]);
sec = Math.floor(dt.getTime() / 1000);
}
}
return sec;
},
},
},
us: 'en',
uk: 'en'
},
lib = new HypixDSLib('dsfa', true, false);
if ( !lib.game_data ) {
return;
}
var game_data = lib.game_data,
alert = lib.alert,
UI = win.UI,
UVActive = location.href.match(/[&\?]t=\d+/),
pID = game_data.player.id,
hCoords = false,
vCoords = false;
// Standard ist deutsch
if ( typeof(texts[lib.lang]) == 'string' )
texts = $.extend(true, texts, texts[texts[lib.lang]]);
else if ( texts[lib.lang] )
texts = $.extend(true, texts, texts[lib.lang]);


/*
* getCursorPosition()
* setCursorPosition(pos)
*/
(function($) {
$.fn.getCursorPosition = function() {
var el = $(this).get(0),
pos = 0;
if ( 'selectionStart' in el ) {
pos = el.selectionStart;
} else if ( 'selection' in document ) {
el.focus();
var Sel = document.selection.createRange(),
SelLength = document.selection.createRange().text.length;
Sel.moveStart('character', -el.value.length);
pos = Sel.text.length - SelLength;
}
return pos;
};
$.fn.setCursorPosition = function(pos) {
if ( $(this).get(0).setSelectionRange ) {
$(this).get(0).setSelectionRange(pos, pos);
} else if ( $(this).get(0).createTextRange ) {
var range = $(this).get(0).createTextRange();
range.collapse(true);
range.moveEnd('character', pos);
range.moveStart('character', pos);
range.select();
}
}
})(jQuery);


/*
* Color
*/
var Color = function() {
this.r = 0;
this.g = 0;
this.b = 0;
this.fromString = function(str) {
str = str.replace(/\s*/g,'');
var res = str.match(/^rgb[a]?\((\d+),(\d+),(\d+)\)$/i);
if ( res ) {
this.r = res[1];
this.g = res[2];
this.b = res[3];
} else {
res = str.match(/^#?([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})$/i);
this.r = parseInt(res[1],16);
this.g = parseInt(res[2],16);
this.b = parseInt(res[3],16);
}
return this;
};
this.toString = function(rgb,a) {
if ( rgb ) {
if ( a === undefined )
return "rgb("+ this.r +", "+ this.g +", "+ this.b +")";
else
return "rgba("+ this.r +", "+ this.g +", "+ this.b +", "+ a +")";
} else {
return "#" + (0x100 | this.r).toString(16).substr(1) + (0x100 | this.g).toString(16).substr(1) + (0x100 | this.b).toString(16).substr(1);
}
};
this.invert = function() {
this.r = Math.abs(255-this.r);
this.g = Math.abs(255-this.g);
this.b = Math.abs(255-this.b);
return this;
};
this.getContrastColor = function() {
return 0.213 * this.r + 0.715 * this.g + 0.072 * this.b < 128 ? new Color(255,255,255) : new Color(0,0,0);
};
this.fadeTo = function(p,color) {
if ( p < 0 )
p = 0;
if ( p > 100 )
p = 100;
return new Color( Math.round(this.r + (color.r - this.r)*p), Math.round(this.g + (color.g - this.g)*p), Math.round(this.b + (color.b - this.b)*p) );
};
switch( arguments.length ) {
case 0:
break;
case 1:
this.fromString(arguments[0]);
break;
case 3:
this.r = arguments[0];
this.g = arguments[1];
this.b = arguments[2];
break;
default:
throw( "Color: invalid parameters" );
}
};


/*
* ColorBar
*/
var ColorBar = {
bars: {},
reloadColors: function(id, colors) {
id = '#dsfa_'+ id +'ColorBar_color';
var diff = 1,
num1 = 0,
num2 = 0,
line2 = '';
for ( var i = 0; i < 101; ++i ) {
var color = [
colors[num1][0] + Math.round( (colors[num2][0] - colors[num1][0]) / diff * (i - num1) ),
colors[num1][1] + Math.round( (colors[num2][1] - colors[num1][1]) / diff * (i - num1) ),
colors[num1][2] + Math.round( (colors[num2][2] - colors[num1][2]) / diff * (i - num1) )
];
$(id + i).css('background-color', 'rgb('+ color.toString() +')');
if ( colors ) {
num1 = i;
for ( var j = i+1; j < 101 && !colors[j]; ++j ) ;
num2 = j;
diff = num2-num1;
}
}
},
addColorRow: function(id, p, color) {
var insertAfter = $('#dsfa_'+ id +'ColorBar_colorTable tr:eq(0)'),
color = new Color('rgb('+ color.toString() +')');
$('#dsfa_'+ id +'ColorBar_colorTable tr:gt(0)').each(function() {
var tmp = parseInt($(this).find('td:first a').html());
if ( tmp == p ) {
$(this).find('td:eq(1)').html( color.toString().toUpperCase() ).css('background-color', color.toString());
insertAfter = null;
} else if ( tmp < p )
insertAfter = $(this);
});
if ( insertAfter != null ) {
$('<tr><td style="text-align: right;"><a href="javascript:(function() { $(\'#dsfa_'+ id +'ColorBar_percentage\').val('+ p +').keyup(); })();">'+ p +'</a></td><td style="background-color: '+ color.toString() +'">'+ color.toString().toUpperCase() +'</td><td><a class="cancel-icon solo tooltip" title="'+ texts.gui.delete +'" href="javascript:;"></a></td></tr>')
.insertAfter(insertAfter)
.find('a:last')[0].addEventListener('click', function() {
ColorBar.deleteColorRow(
$(this).parents('tbody:first').attr('id').replace(/dsfa_(.+)ColorBar_colorTable/,'$1'),
parseInt($(this).parents('tr:first').find('td:first a').html())
);
});
}

recreateToolTip();
this.reloadColors(id, this.bars[id].colors);
},
deleteColorRow: function(id, p) {
if ( p == 0 || p == 100 ) {
this.bars[id].colors[p] = this.bars[id].std[p];
this.addColorRow(id, p, this.bars[id].colors[p]);
} else {
delete this.bars[id].colors[p];
$('#dsfa_'+ id +'ColorBar_colorTable tr:gt(0)').each(function() {
if ( parseInt($(this).find('td:first a').html()) == p )
$(this).remove();
});
}

this.reloadColors(id, this.bars[id].colors);
},
colorRow: function(id, p) {
$('#dsfa_'+ id +'ColorBar_colorTable tr:gt(0)').each(function() {

});
},
init: function() {
$('<style type="text/css">' +
'.colorBar { height: 20px; width: 707px; border: 1px solid black; }' +
'.colorBar > div { width: 7px; height: 20px; float: left; }' +
'.arrowBar { height: 20px; width: 707px; }' +
'.arrow { width: 7px; height: 20px; float: left; visibility: hidden; }' +
'.arrow.show { visibility: visible !important; }' +
'</style>').appendTo('head');
},
create: function(id, el, colors, std) {
HTML = '<div id="dsfa_'+ id +'ColorBar" class="colorBar">',
line2 = rows = '';
for ( var i = 0; i < 101; ++i ) {
HTML += '<div id="dsfa_'+ id +'ColorBar_color'+ i +'"></div>';
line2 += '<div id="dsfa_'+ id +'ColorBar_color'+ i +'_arrow" class="arrow">&#8593;</div>';
}
HTML += '</div><div class="arrowBar">' + line2 +'</div>' +
'<table style="width: 100%; text-align: center;"><tr><td style="width: 50%;"><table style="margin: 0 auto;">' +
'<tr><td style="text-align: right;">'+ texts.gui.percentage +':</td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_percentage" type="text" size="7" style="border: 1px solid grey;"> %</td></tr>' +
'<tr><td style="text-align: right;">'+ texts.gui.changeColor +':</td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_colorInput" type="text" size="7" style="border: 1px solid grey;"></td></tr>' +
'<tr><td></td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_colorButton" type="button" value="'+ texts.gui.change +'"></td></tr>' +
'</table></td><th></th><td style="width: 50%;">' +
'<table class="vis" style="margin: 0 auto;"><tbody id="dsfa_'+ id +'ColorBar_colorTable"><tr><th>%</th><th>'+ texts.gui.colorCode +'</th><th>&nbsp;</th></tr></tbody></table></td></tr></table>';
if ( el instanceof HTMLElement )
el = $(el);
if ( el instanceof jQuery )
el.append(HTML);

this.bars[id] = {
html: HTML,
colors: colors,
std: std
};
for ( var key in colors ) {
this.addColorRow(id, parseInt(key), colors[key]);
}

// Farb-Bereiche ; Klick
$('#dsfa_'+ id +'ColorBar>div').click(function() {
var ID = $(this).parent().attr('id').replace(/^dsfa_(.+)ColorBar$/, '$1'),
color = new Color($(this).css('background-color'));
$('#dsfa_'+ ID +'ColorBar_colorInput').val( color.toString().toUpperCase() );
$('.arrow.show').removeClass('show');
$('#'+ $(this).attr('id') +'_arrow').addClass('show');
$('#dsfa_'+ ID +'ColorBar_percentage').val( $(this).attr('id').replace(/color(\d+)/, '$1') ).keyup();
});

// Prozent-Eingabefeld ; Taste losgelassen
$('#dsfa_'+ id +'ColorBar_percentage').keyup(function() {
var ID = $(this).attr('id').replace(/^dsfa_(.+)ColorBar_percentage$/, '$1');
if ( $(this).val().match(/[^\d]/) ) {
var pos = $(this).getCursorPosition(),
count = $(this).val().substr(0,pos).match(/[^\d]/g);
if ( count )
count = count.length;
else
count = 0;
$(this).val( $(this).val().replace(/[^\d]/g, '') ).setCursorPosition(pos-count);
}
if ( $(this).val() == '' )
$(this).val(0).focus().select();

var p = parseInt($(this).val());
if ( p > 100 ) {
p = 100;
$(this).val(100);
}
var color = new Color($('#dsfa_'+ ID +'ColorBar_color'+ p).css('background-color'));
$('#dsfa_'+ ID +'ColorBar_colorInput').val( color.toString().toUpperCase() ).keyup();
$('.arrow.show').removeClass('show');
$('#dsfa_'+ ID +'ColorBar_color'+ p +'_arrow').addClass('show');
});

// Farbeingabefeld ; Taste losgelassen
$('#dsfa_'+ id +'ColorBar_colorInput').keyup(function() {
if ( $(this).val().match(/[a-z]/) ) {
var pos = $(this).getCursorPosition();
$(this).val( $(this).val().toUpperCase() ).setCursorPosition(pos);
}
var val = $(this).val().replace(/\s*/g,''),
match_hex = val.match(/^#?[0-9a-f]{3,6}$/i),
match_rgb = val.match(/^rgb\(\d+,\d+,\d+\)$/i),
match_rgba = val.match(/^rgba\(\d+,\d+,\d+,\d+\)$/i);
if ( match_hex || match_rgb || match_rgba )
$(this).css({
'background-color': (new Color(val)).toString(),
'color': (new Color(val)).getContrastColor()
});
else
$(this).css({
'background-color': '',
'color': ''
});
});

// Ändern-Button ; Klick
$('#dsfa_'+ id +'ColorBar_colorButton')[0].addEventListener('click', function() {
var ID = $(this).attr('id').match(/^dsfa_(.+)ColorBar_colorButton$/)[1],
val = $('#dsfa_'+ ID +'ColorBar_colorInput').val().replace(/\s*/g,''),
p = parseInt($('#dsfa_'+ ID +'ColorBar_percentage').val()),
match_hex = val.match(/^#?[0-9a-f]{3,6}$/i),
match_rgb = val.match(/^rgb\(\d+,\d+,\d+\)$/i),
match_rgba = val.match(/^rgba\(\d+,\d+,\d+,\d+\)$/i);
if ( match_hex || match_rgb || match_rgba ) {
var color = new Color(val);
ColorBar.bars[ID].colors[p] = [color.r, color.g, color.b];
ColorBar.addColorRow(ID, p, ColorBar.bars[ID].colors[p]);
} else {
ColorBar.deleteColorRow(ID, p);
}
}, true);
},
};


/*
* Queue
*/
var Queue = {
_hide: {
'buildqueue_wrap': lib.storage.getValue(game_data.village.id +'_queue_buildqueue_wrap', true),
'trainqueue_wrap_barracks': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_barracks', true),
'trainqueue_wrap_stable': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_stable', true),
'trainqueue_wrap_garage': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_garage', true)
},
init: function() {
if ( Settings.get('misc_prodRecruit') && $('#production_table').length ) {
$('#production_table tr td:last-child .order_queue').each(function() {
var units = {},
HTML = '';
$(this).find('img').each(function() {
var match = $(this).attr('src').match(/unit\/unit_(.+)\.png/);
if ( !match )
return;

var unit = match[1];
match = $(this).attr('title').match(/(\d+) - (.+)/);
if ( !match )
return;
// rgb(0, 128, 0) = grün
// rgb(255, 0, 0) = rot
var red = $(this).parents('li:first').find('.order-status-light').css('background-color') == 'rgb(255, 0, 0)',
key = unit + (red ? '_decom' : '');

if ( units[key] ) {
units[key][0] += parseInt(match[1]);
units[key][1]++;
} else {
units[key] = [parseInt(match[1]), 1];
HTML += '<li class="order">' +
'<div style="background-color: '+ (red ? 'red' : 'green') +';" class="order-status-light"></div>' +
'<div class="queue_icon"><img src="'+ image_base +'unit/unit_'+ unit +'.png" class="'+ key +'" alt=""></div>' +
'<li>';
}
units[key][2] = match[2];
});
$(this).find('*').hide();
$(this).prepend(HTML);
for ( var key in units )
$(this).find('img.'+ key +':first').attr('title', units[key][0] +' ('+ units[key][1] +') - '+ units[key][2]);
});
} else if ( Settings.get('misc_queueOpt') && (
game_data.screen == 'main' ||
game_data.screen == 'barracks' ||
game_data.screen == 'stable' ||
game_data.screen == 'garage' ||
game_data.screen == 'train'
) ) {
this.addTable('buildqueue_wrap');
this.addTable('trainqueue_wrap_barracks');
this.addTable('trainqueue_wrap_stable');
this.addTable('trainqueue_wrap_garage');
this.refresh();

$('#pop_current_label')[0].addEventListener('DOMNodeInserted', function(e) {
Queue.addTable('buildqueue_wrap');
Queue.addTable('trainqueue_wrap_barracks');
Queue.addTable('trainqueue_wrap_stable');
Queue.addTable('trainqueue_wrap_garage');
Queue.refresh();
}, false);
}
},
addTable: function(id) {
var el = $('#'+ id +' tbody:first');
if ( !el.length )
return;

if ( !el.find('.dsfa_queue_hide').length ) {
var HTML = '',
regex = id.match(/build/) ? texts.regex.mainQueue : texts.regex.unitQueue,
list = [],
isBuild = id.match(/build/),
extra = 0;

$('#'+ id +' tr:gt(0)').each(function() {
if ( $(this).find('td').length == 1 ) {
var match = $(this).find('td').html().match(/<b>(\d+)%<\/b>/);
if ( !extra && match )
extra = parseInt(match[1]);
return;
}
var match = $(this).find('td:first').html().match( new RegExp(regex) );
if ( !match )
return;

if ( isBuild ) {
var down = match[1] ? false : true,
build = match[1] ? trim(match[1]) : trim(match[3]);
for ( var key in lib.buildingInfo )
if ( build == texts.buildings[key] )
list.push({
obj: this,
key: key,
img: 'buildings/'+ key,
name: build,
number: match[2],
// $n = Anzahl, $w = Bezeichnung, $d = Dauer, $l = Fertigstellung (Uhrzeit)
titleFormat: (down ? texts.gui.tearDown +' $w<br>$d<br>$l' : '$w (Stufe $n)<br>$d<br>$l'),
duration: $(this).find('td:eq(1) span:first').html(),
lastReady: $(this).find('td:eq(2)').html(),
onclick: $(this).find('a:last').attr('onclick'),
down: down,
count: 1
});
} else {
var unit = trim(match[2]);
for ( var key in lib.unitInfo )
if ( unit == texts.unit[key] || unit == texts.units[key] )
list.push({
obj: this,
key: key,
img: 'unit/unit_'+ key,
name: unit,
number: parseInt(match[1]),
titleFormat: '$n $w<br>$d<br>$l', // $n = Anzahl, $w = Bezeichnung, $d = Dauer, $l = letzte Fertigstellung (Uhrzeit)
duration: ($(this).find('.timer').length ? $(this).find('.timer').html() : $(this).find('td:eq(1)').html()),
lastReady: $(this).find('td:eq(2)').html(),
onclick: $(this).find('a:last').attr('onclick'),
count: 1 // 8: Anzahl der Einträge (für stark verkürzte Schleifen)
});
}
});

// Fertigstellung der letzten Position der Produktionsschleife
if ( list.length ) {
var lastReadyQueue = list[list.length-1].lastReady;
} else {
var lastReadyQueue = '<i>?</i>';
}

// Stark verkürzen (wenn eingestellt):
if ( !isBuild && Settings.get('misc_queueOpt') == 2 ) {
for ( var i = 0, max = list.length; i < max; ++i ) {
for ( var j = i+1; j < max; ++j ) {
if ( list.key == list[j].key ) {
list.count++;
list.number += list[j].number;
list.titleFormat = '$n $w ($c)<br>$l'; // $c = Anzahl der Positionen
list.lastReady = list[j].lastReady;
list.splice(j, 1);
j--;
max--;
}
}
}
}

// $('#'+ id).prev().find('.timer').html() // Restzeit der nächsten Einheit
// $(list[0]).find('.timer').html() // gesamte Restzeit der Position
for ( var i = 0, max = list.length; i < max; ++i )
HTML += '<td class="nowrap" style="'+ (i < max-1 ? 'width: 1px; ' : '') +'padding: 3px 5px;">' +
'<a href="javascript:;" onclick="'+ (list.count == 1 ? list.onclick : '') +'">' +
(list.down ? '<img src="'+ image_base +'overview/down.png" alt="'+ texts.gui.tearDown +'">' : '') +
'<img src="'+ image_base + list.img +'.png" alt="'+ list.name +'" title="' +
list.titleFormat
.replace('$w', list.name)
.replace('$n', list.number)
.replace('$c', list.count)
.replace('$d', list.duration)
.replace('$l', list.lastReady)
+'" class="tooltip">' +
'</a>' +
(i == 0 ? '&nbsp;<span class="dsfa_timer" style="font-size: x-small; font-weight: bold;">'+ (isBuild ? $(list.obj).find('.timer').html() : $('#'+ id).prev().find('.timer').html()) +'</span>' : '') +
'</td>';

var cancelAll = $('#'+ id +' tr:last a.evt-confirm');
el.parents('div:last').prepend(
'<table class="vis" style="display: none;"><tbody class="'+ $(el).parents('div:first').attr('id') +'">' +
'<tr>' +
'<th class="nowrap" colspan="'+ max +'">'+ (game_data.screen == 'main' ? 'Bauaufträge' : 'Ausbildung') +' &minus; '+ lastReadyQueue +'</th>' +
'<th style="text-align: center;"><a href="javascript:;" class="dsfa_queue_show">'+ texts.gui.down +'</a></th></tr>' +
'<tr>'+ HTML +
'<td>'+ (isBuild ? (extra ? '<img src="'+ image_base +'/gold.png" alt="" title="Zusatzkosten: '+ extra +'%" class="tooltip">' : '') : (cancelAll.length ? '<a href="'+ cancelAll.attr('href') +'"><img src="'+ image_base +'delete.png" alt="x" title=""></a>' : '')) +'</td>' +
'</tr>' +
'</tbody></table>'
).find('a.dsfa_queue_show')[0].addEventListener('click', function() {
$(this).parents('div:last').find('table').toggle();
var key = $(this).parents('tbody:first').attr('class');
if ( key ) {
lib.storage.setValue(game_data.village.id +'_queue_'+ key, false);
Queue._hide[key] = false;
}
}, true);

el.find('th:first').append(' <a href="javascript:;" class="dsfa_queue_hide">'+ texts.gui.up +'</a>')
.find('.dsfa_queue_hide')[0].addEventListener('click', function() {
$(this).parents('div:last').find('table').toggle();
var key = $(this).parents('div:first').attr('id');
if ( key ) {
lib.storage.setValue(game_data.village.id +'_queue_'+ key, true);
Queue._hide[key] = true;
}
}, true);
}
var hide = this.check_status(el);
},
check_status: function(el) {
var key = el.parents('div:first').attr('id'),
hide = (key ? this._hide[key] : false);
if ( hide && el.find('th:first .dsfa_queue_hide').length )
el.find('th:first .dsfa_queue_hide')[0].click();
return hide;
},
refresh: function() {
window.setTimeout(function() {
recreateToolTip();
}, 600);

var serverTime = win.getTime($("#serverTime"));
timeDiff = serverTime - win.getLocalTime();
timeStart = serverTime;
$('.dsfa_timer').each(function() {
startTime = win.getTime($(this));
if ( startTime != -1 )
win.addTimer($(this), serverTime + startTime, false);
});
}
};


/*
* Filter
*/
var Filter = {
enabled: lib.storage.getValue('filter_enabled', false),
filter: ["points", "freeFarm"],
points: {
enabled: lib.storage.getValue('filter_points_enabled', true),
inverted: lib.storage.getValue('filter_points_inverted', false),
val: lib.storage.getValue('filter_points_val', 9000)
},
freeFarm: {
enabled: lib.storage.getValue('filter_freeFarm_enabled', true),
inverted: lib.storage.getValue('filter_freeFarm_inverted', false),
val: lib.storage.getValue('filter_freeFarm_val', 0)
},
init: function() {
if ( game_data.screen == 'overview_villages' && Settings.get('misc_prodFilterActive') ) {
var el = $('#production_table').length ? '#production_table' : ($('#buildings_table').length ? '#buildings_table' : false);
if ( !el )
return;

$('<div class="vis_item" style="clear: both;"><input type="checkbox" id="dsfa_filter"'+ (Filter.enabled ? ' checked' : '') +'> <a href="javascript:;">Filter</a></div>').insertBefore(el).find('a:first')[0].addEventListener('click', function(e) {
var pos = [$(e.target).offset().left+20, $(e.target).offset().top+20],
HTML = '<h3>Filtereigenschaften</h3>' +
'<table>' +
'<tr>' +
'<td class="nowrap">Dörfer filtern mit '+ (Filter.points.inverted ? '&gt;' : '&lt;=') +' Punktezahl:</td>' +
'<td class="nowrap"><input type="text" id="dsfa_pointsFilter" value="'+ Filter.points.val +'"><input type="checkbox" id="dsfa_disablepointsFilter" style="margin-left:2em;"'+ (Filter.points.enabled ? '' : ' checked') +'><span>Deaktivieren</span><input type="checkbox" id="dsfa_invertpointsFilter" style="margin-left:2em;"'+ (Filter.points.inverted ? ' checked' : '') +'><span>Punktefilter umkehren</span></td>' +
'</tr>' +
'<tr'+ ($('#buildings_table').length ? ' style="display:none"' : '') +'>' +
'<td class="nowrap">Dörfer filtern mit '+ (Filter.freeFarm.inverted ? '&gt;' : '&lt;=') +' freiem BH-Platz:</td>' +
'<td class="nowrap"><input type="text" id="dsfa_freeFarmFilter" value="'+ Filter.freeFarm.val +'"><input type="checkbox" id="dsfa_disablefreeFarmFilter" style="margin-left:2em;"'+ (Filter.freeFarm.enabled ? '' : ' checked') +'><span>Deaktivieren</span><input type="checkbox" id="dsfa_invertfreeFarmFilter" style="margin-left:2em;"'+ (Filter.freeFarm.inverted ? ' checked' : '') +'><span>BH-Filter umkehren</span></td>' +
'</tr>' +
'<tr>' +
'<td colspan="2">&nbsp;</td>' +
'</tr>' +
'<tr>' +
'<td class="nowrap" colspan="2" style="padding-left: 10px;">' +
'<i>Filtern ab einer Zahl bedeutet, dass alle Dörfer, die mindestens die Eigenschaft (einschließlich) erfüllen, <br>ausgeblendet werden. Sind beide Dörfer aktiv, werden Dörfer gefiltert, für die eine der Eigenschaften zutrifft.</i>' +
'</td>' +
'</tr>' +
'</table>';
lib.inlinePopup('filter_settings', pos[0], pos[1], HTML, true, 750, 200 );

$('#dsfa_pointsFilter')[0].addEventListener('keyup', function() {
Filter.points.val = parseInt($(this).val());
lib.storage.setValue('filter_points_val', Filter.points.val);
Filter.apply();
}, false);
$('#dsfa_disablepointsFilter')[0].addEventListener('change', function() {
Filter.points.enabled = !$(this).is(':checked');
lib.storage.setValue('filter_points_enabled', Filter.points.enabled);
Filter.apply();
}, false);
$('#dsfa_invertpointsFilter')[0].addEventListener('change', function() {
Filter.points.inverted = $(this).is(':checked');
lib.storage.setValue('filter_points_inverted', Filter.points.inverted);
Filter.apply();

$(this).parents('td:first').prev().html('Dörfer filtern mit '+ (Filter.points.inverted ? '&gt;' : '&lt;=') +' Punktezahl:');
}, false);

$('#dsfa_freeFarmFilter')[0].addEventListener('keyup', function() {
Filter.freeFarm.val = parseInt($(this).val());
lib.storage.setValue('filter_freeFarm_val', Filter.freeFarm.val);
Filter.apply();
}, false);
$('#dsfa_disablefreeFarmFilter')[0].addEventListener('change', function() {
Filter.freeFarm.enabled = !$(this).is(':checked');
lib.storage.setValue('filter_freeFarm_enabled', Filter.freeFarm.enabled);
Filter.apply();
}, false);
$('#dsfa_invertfreeFarmFilter')[0].addEventListener('change', function() {
Filter.freeFarm.inverted = $(this).is(':checked');
lib.storage.setValue('filter_freeFarm_inverted', Filter.freeFarm.inverted);
Filter.apply();

$(this).parents('td:first').prev().html('Dörfer filtern mit '+ (Filter.freeFarm.inverted ? '&gt;' : '&lt;=') +' freiem BH-Platz:');
}, false);
});

$('#dsfa_filter')[0].addEventListener('change', function() {
Filter.enabled = $(this).is(':checked');
lib.storage.setValue('filter_enabled', Filter.enabled);
Filter.apply();
}, false);

this.apply(1);
}
},
apply: function() {
var el = $('#production_table').length ? '#production_table' : ($('#buildings_table').length ? '#buildings_table' : false),
pointsIdx = -1,
farmIdx = $('#buildings_table').length ? -2 : -1;
if ( !el )
return;

$(el +' tr:first th').each(function(i) {
if ( $(this).html().match(/order=points/) )
pointsIdx = i;
if ( $(this).html().match(/order=pop/) )
farmIdx = i;
});
if ( pointsIdx == -1 || farmIdx == -1 )
return;

$(el +' tr:gt(0)').each(function() {
if ( !$(this).find('td').length )
return;
$(this).show();
if ( Filter.enabled ) {
if ( Filter.points.enabled ) {
if ( !$(this).find('td:eq('+ pointsIdx +')').length )
return;
var val = parseInt($(this).find('td:eq('+ pointsIdx +')').html().replace(/(<[^>]*>)|\.|\s/g,''), 10);
if ( !Filter.points.inverted && val > Filter.points.val || Filter.points.inverted && val <= Filter.points.val )
$(this).hide();
}
if ( Filter.freeFarm.enabled ) {
if ( !$(this).find('td:eq('+ farmIdx +')').length )
return;
var vals = $(this).find('td:eq('+ farmIdx +')').html().replace(/(<[^>]*>)|\.|\s/g,'').split('/'),
val1 = parseInt(vals[0]),
val2 = parseInt(vals[1]),
val = val2 - val1;
if ( !Filter.freeFarm.inverted && val > Filter.freeFarm.val || Filter.freeFarm.inverted && val <= Filter.freeFarm.val )
$(this).hide();
}
}
});

if ( $('#buildings_table').length && Settings.get('misc_buildVariantActive') && !arguments.length ) {
Variant.doVariant('build');
}
},
};


/*
* Update
*/
var Update = {
dsVersion: version.split('-')[0],
dsVersionNum: version.split('-')[0].replace(/[^\d]/g,''),
dataVersion: version.split('-')[1],
dataVersionNum: version.split('-')[1].replace(/[^\d]/g,''),
scriptVersion: version.split('-')[2],
scriptVersionNum: version.split('-')[2].replace(/[^\d]/g,''),
hideScriptWarnings: lib.storage.getValue('hideScriptWarnings', false),
init: function() {
if ( $('#script_warning').length ) {
$('#script_warning').prepend('<a style="float: right; margin-top: -3px; display: '+ (this.hideScriptWarnings ? 'none' : 'block') +';" href="javascript:;">Einklappen</a><a style="float: right; margin-top: -3px; display: '+ (this.hideScriptWarnings ? 'block' : 'none') +';" href="javascript:;">Ausklappen</a>')
.find('a')[0].addEventListener('click', function() {
$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });
$('#script_warning a:lt(2)').toggle();
Update.hideScriptWarnings = true;
lib.storage.setValue('hideScriptWarnings', Update.hideScriptWarnings);
}, true);
$('#script_warning').find('a')[1].addEventListener('click', function() {
$('#script_warning').css({ 'height': '', 'overflow': '' });
$('#script_warning a:lt(2)').toggle();
Update.hideScriptWarnings = false;
lib.storage.setValue('hideScriptWarnings', Update.hideScriptWarnings);
}, true);
if ( this.hideScriptWarnings )
$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });

if ( parseInt(game_data.majorVersion.replace(/[^\d]/g,'')) > Update.dsVersionNum ) {
$('#script_list').append('<li>DS-Farmassistent '+ Update.scriptVersion +' <a href="mailto:zorbing@gmx.net">(Autor: Zorbing)</a></li>');
$('#script_warning').show();
}
}

var data_version = lib.storage.getValue('data_version', '0'),
data_versionNum = parseInt(data_version.replace(/\./,''));

// Update der Daten
if ( data_version != Update.dataVersion ) {
alert( texts.gui.update.replace('$1', data_version).replace('$2', Update.dataVersion) );

// allgemeine Updates
if ( data_versionNum < 32 ) {
var sortCol = lib.storage.getValue('FarmSort', '4-0').split('-');
lib.storage.setValue('FarmSortKey', ['wood', 