// ==UserScript==
// @name           Replace Text On Webpages, deutsche Übersetzung von Soccerstats.com (JoeSimmons)
// @namespace      http://userscripts.org/users/23652
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://soccerstats.com*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.51
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"home" : "Heim",
"away" : "Auswärts",
"tables":"Tabellen",
"table":"Tabelle",
"matches":"Spiele",
"by":"in",
"month":"Monaten",
"record":"Rekorde",
"game":"Spiel",
"view all league spiele":"Alle Ligaspiele ansehen",
"View all match details":"Alle Spieldetails ansehen",
"points":"Punkte",
"Avg Goals For":"Duchschn. Tore für",
"Avg Goals against":"Duchschn. Tore gegen",
"munich":"München",
"team":"Mannschaft",
"Form table (last 8 matches)":"",
"per":"pro",
"points":"Punkte",
"League":"Liga",
"summary":"Überblick",
"match":"Spiel",
"Goal":"Tor",
"goals":"Tore",
"Played Spiele":"Ausgetragene Spiele",
"wins":"Siege",
"draws":"Unentschieden",
"lose":"Niederlagen",
"over":"Über",
"under":"Unter",
"last":"letzten",
"overall":"Gesamt",
"W":"S",
"D":"U",
"L":"N",
"at heim":"Heim",
"Round":"Spieltag",
"Sankt":"St.",
"score":"Ergebnis",
"scores":"Ergebnisse",
"Frequent":"Häufige",
"other":"Andere",
"for":"für",
"against":"gegen",
"analysis":"Analyse",
"involving":"mit",
"clean sheets":"Saubere Weste",
"Fail to Ergebnis":"Nicht Getroffen",
"penalties":"Elfmeter",
"pg":"ET",
"Scoring averages":"Tore Durchschnitt",
"teams":"Mannschaften",
"scoring":"Tore",
"pld":"Sp.",
"pts":"Pkt",
"Streaks":"Serien",
"Consecutive":"Aufeinanderfolgende",
"without":"ohne",
"Losses":"Niederlagen",
"win":"Sieg",
"draw":"Unentsch.",
"loss":"Niederl.",
"GF":"Tore",
"GA":"Gegent.",
"current sequences":"Aktuelle Serie",
"Sequences":"Lauf",
"and":"und",
"include":"beinhaltet",
"added time":"Nachspielzeit",
"also":"",
"times":"Zeit",
"Offense":"Offensive",
"Defense":"Deffensive",
"scored":"Getroffen",
"conceded":"Kassiert",
"Avg":"Durchschn",
"No":"Kein",
"opponent":"Gegner",
"Who Getroffen first":"Wer traf zuerst",
"When Mannschaft Getroffen first":"Wenn die Mannschaft zuerst traf",
"Perc":"Proz",
"When Gegner Getroffen first":"Wenn der Gegner zuerst traf",
"When Mannschaft was winning at half-time":"Wenn die Mannschaft zur Halbeit führte",
"When Mannschaft was losing at half-time":"Wenn die Mannschaft zur Halbzeit zurück lag",
"half-time":"Halbzeit",
"outcomes":"Ergebnisse",
"full-time":"Vollzeit",
"Opp":"Gegn",
"Tore Zeit in Mannschaft":"Tore Zeit der Mannschaft",
"timing":"Zeiten",
"scorers":"Schützen",
"attendance":"Zuschauer",
"Attend":"Zusch",
"Average":"Durchschnitt",
"Capacity":"Kapazität",
"Full":"Ausv.",
"select":"Wähle",
"p":"Sp.",
"ranking":"Platz",
"ADVANTAGE":"Vorteil",
"1st half":"1. Halbzeit",
"2nd half":"2. Halbzeit",
"Mannschaft Ergebnisse first":"Mannschaft trifft zuerst",
"Gegner Ergebnisse first":"Gegner trifft zuerst",
"Mannschaft leads at Halbzeit":"Mannschaft führt zur Halbzeit",
"Gegner leads at Halbzeit":"Gegner führt zur Halbzeit",
"opening tore":"Ersten Tore",
"pen":"Elf",
"Failed to Ergebnis":"Keine Tore erziehlt",
"kein defeat":"Keine Niederlage",
"Current winning streak":"Aktuelle Sieges Serie",
"Current drawing streak":"Aktuelle Unentsch. Serie",
"Current losing streak":"Aktuelle Niederl. Serie",
"defeats":"Niederlagen",
"winning":"Siege",
"drawing":"Unentsch.",
"losing":"Verloren",
"":"",
"":"",
///////////////////////////////////////////////////////
"":""};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}