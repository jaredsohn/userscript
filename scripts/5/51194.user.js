// ==UserScript==
// @name           Deutsche Übersetzung von eRepublik
// @namespace      deutsche uebersetzung erepublik
// @description    Das ist die deutsche Übersetzung von eRepublik
// @include        http://www.erepublik.com/*
// @version	   0.2
// @autor          Script by renszarv, translation by c4s3
// ==/UserScript==

var strings = {
// Menü-Seite
	"Home" : "Startseite",
	"Donate" : "Spenden",
	"May" : "Mai",
	"June" : "Juni",
	"July" : "Juli",
	"Day" : "tag ",
	"of the New World" : " der neuen Welt",
	"Rank"   : "Rank",
	"Company" : "Unternehmen", 
	"Profile":"Profil", 
	"Party" : "Partei", 
	"Newspaper" :"Zeitung",
	"Army" : "Militär",
	"Country administration" : "Staat Verwaltung",
    "Organizations" : "Organisationen",
	"Market" : "Markt",
	"Monetary market" : "Geldmarkt",
	"Rec exchange rate" : "Wiki Wechselkurs",
	"Exchange rate" : "Wechselkurs",
	"Amount to buy" : "Kaufbetrag",
	"Show my offers" : "Meine Angebote",
	"Post new offer" : "Neues Angebot",
	"Job market" : "Arbeitsmarkt",
    "Companies for sale" : "Unternehmen zum Verkauf",
    "Get gold &amp; extras" : "Erwirb Gold &amp; Extras",
	"Rankings" : "Rankings",
	"Social stats" : "Soziales Statistiken",
	"Economic stats" : "Wirtschaftliche Statistiken",
	"Political stats" : "Politikstatistiken",
	"Military stats" : "Militärstatistiken",
	"Tools" : "Tools",
	"Forum" : "Forum",
	"News" : "Nachrichten",
	"Invite friends" : "Freunde einladen",
	"eRepublik Shop" : "eRepublik Shop",
	"Career path" : "Karriere",
	"Ok, thanks, next tip" : "OK, danke, nächsten Tipp",
	"I have nothing more to say at the moment" : "Ich habe zur Zeit nix mehr zu sagen.",
	"Select" : "Auswahl",
    "Latest events" : "Letztes Ereignis",
	"News" : "Nachrichten",
    "More events" : "Mehr Ereignisse",
    "More news" : "Mehr Nachrichten",
	"more news" : "mehr Nachrichten",
	"Marketplace" : "Marktplatz",
	"Wars" : "kriege",
    "My Places" : "Mein Platz",
    "Info" : "Info",
    "Community" : "Community",
    "Day of the new world" : "Tag in der neuen Welt",
    "National" : "National",
    "International" : "International",
    "Latest Events" : "Letzte Ereignisse",
    "Shouts" : "Shoutbox",
    "Shout something" : "Schreib was",
    "Shout" : "Shout",
    "Official" : "Offiziell",
    "Everyone" : "Jedermann",
    "Lates" : "Aktuelles",
    "Search citizen" : "Bürger suchen",
	"eRepublik Birthday" : "eRepublik Geburtstag",
	"Shout" : "Mitteilungen",
	"Latest" : "Aktuelles",
	"one minute ago" : "vor einer Minute",
	"for 10 shouts/day and more" : "für 10 shouts/Tag und mehr",
	"No more shouts for today" : "Keine Schreie mehr verfügbar ",
	"Top Rated" : "Beste Bewertung",

// Staatsseite
	"On the Map" : "Landkarte",
	"Total citizens" : "Insgesamte Bürger",
	"New citizens today" : "Neue Bürger heute",
	"Average citizen level" : "Durchschnittliche Bürger-Level",
	"Online now": "Jetzt online",
	"Citizen fee" : "Bürger Gebühr",
	"Citizens" : "Staatsbürger",
	"Who" : "Wer",
	"details" : "Details",
	"Society" : "Gesellschaft",
	"Economy" : "Wirtschaft",
	"Politics" : "Politik",
	"Military" : "Militär",
	"Administration" : "Administration",
	
// Länder
	"Argentina" : "Argentinien",
	"Australia" : "Australien",
	"Austria" : "Österreich",
	"Bosnia and Herzegovina" : "Bosnien und Herzegowina",
	"Brazil" : "Brasilien",
	"Bulgaria" : "Bulgarien",
	"China" : "China",
	"Croatia" : "Kroatien",
	"Canada" : "Kanada",
	"Czech Republic" : "Tschechische Republik",
	"Denmark" : "Dänemark",
	"Estonia" : "Estland",
	"Finland" : "Finnland",
	"France" : "Frankreich",
	"Germany" : "Deutschland",
	"Greece" : "Griechenland",
	"Hungary" : "Ungarn",
	"Indonesia" : "Indonesien",
	"Ireland" : "Irland",
	"Israel" : "Israel",
	"Italy" : "Italien",
	"Iran" : "Iran",
	"Japan" : "Japan",
	"Latvia" : "Lettland",
	"Lithuania" : "Litauen",
	"Malaysia" : "Malaysia",
	"Mexico" : "Mexiko",
	"Moldavia" : "Moldawien",
	"Netherlands" : "Niederlande",
	"Norway" : "Norwegen",
	"Pakistan" : "Pakistan",
	"Philippines" : "Philippinen",
	"Poland" : "Polen",
	"Portugal" : "Portugal",
	"Romania" : "Rumänien",
	"Serbia" : "Serbien",
	"Singapore" : "Singapur",
	"South Africa" : "Südafrika",
	"South Korea" : "South Korea",
	"Slovakia" : "Slowakei",
	"Slovenia" : "Slowenien",
	"Switzerland" : "Schweiz",
	"Spain" : "Spanien",
	"Sweden" : "Schweden",
	"Russia" : "Russland",
	"Thailand" : "Thailand",
	"United Kingdom" : "Großbritannien",
	"Ukraine" : "Ukraine",
	"USA" : "USA",
	"Turkey" : "Türkei",
	"World" : "Welt",
	
// Wirtschaftsseite
	"GOLD" : "GOLD",
	"Gold" : "Gold",
	"Treasury" : "Staatskasse",
	"All accounts" : "Alle Accounts",
	"Country trading embargoes" : "Handelsembargos",
	"Taxes" : "Steuern",
	"food" : "Essen",
	"gift" : "Geschenke",
	"weapon" : "Waffen",
	"moving tickets" : "Flugtickets",
	"grain" : "Korn",
	"diamonds" : "Diamanten",
	"iron" : "Eisen",
	"oil"  : "Oil",
	"wood" : "Holz",
	"house" : "Haus",
	"hospital" : "Krankenhaus",
	"defense system" : "Abwehrsystem",
	"Defense system" : "Abwehrsystem",
	"Salary" : "Gehalt",
	"Minimum" : "Minimum",
	"Average" : "Durschnitt",
	"Gross domestic product (GDP)" : "Bruttoinlandsprodukt (BIP)",
	"Monthly exports" : "Monatliche Exports",
	"Monthly imports" : "Monatliche Imports",
	"Inflation" : "Inflation",
	
// Unternehmensseite
	"Office" : "Büro",
	"You have already worked today." : "Du hast heute schon gearbeitet.",
	"Come back tomorrow." : "Komm morgen zurück.",
	"Resign" : "Kündigen",
	"Employees" : "Arbeitnehmer",
	"Raw materials" : "Rohmaterialien",
	"Show all employees" : "Zeige alle Arbeitnehmer",
	"Show all donations" : "Zeige alle Spenden",
	"Go to marketplace" : "Gehe zum Marktplatz",
	"Products" : "Produkte",
	"You do not have any active job offers" : "Keine aktiven Job Angebote",
	"The company offers no products in this market" : "Das Unternehmen bietet keine Produkte auf diesem Markt an",
	"Amount" : "Betrag",
	"Price" : "Preis",
	"Price with taxes" : "Preis inkl. Steuern",
	"Company Page" : "Unternehmensseite",
	"Today" : "Heute",
	"Yesterday" : "Gestern",
	"All employees" : "Alle Arbeitnehmer",
	"Skill" : "Abilità",
	"Daily salary" : "Tägliches Gehalt",
	"Last presence" : "Letzte Anwesenheit",
	"Minimum country wage" : "Mindestlohn",

	"Grain" : "Korn",
	"Food" : "Essen",
	"Gift" : "Geschenke",
	"Weapon" : "Waffen",
	"Moving Tickets" : "Flugtickets",
	"Diamonds" : "Diamanten",
	"Iron" : "Eisen",
	"Oil"  : "Öl",
	"Wood" : "Holz",
	"House" : "Haus",
	"Hospital" : "Krankenhaus",
	"Defense System" : "Abwehrsystem",
	
// Marktplatz
	"Quality Level" : "Qualitätslevel",
	"All levels" : "Alle levels",
	"Level 1" : "Level 1",
	"Level 2" : "Level 2",
	"Level 3" : "Level 3",
	"Level 4" : "Level 4",
	"Level 5" : "Level 5",

	"Provider" : "Anbieter ",
	"Quality" : "Qualität",
	"Stock" : "Lager",
	"Buy" : "Kaufen",
	"Sell" : "Verkaufen",
	"Market" : "Markt",
	"Market offers" : "Markt Angebote",
	"Amount" : "Betrag",
	"Price" : "Preis",
	"buy" : "kaufen",
	"Next" : "Nächste",
	"Prev" : "Zurück",
	"No products in this market" : "Keine Produkte verfügbar",
	"Go to marketplace" : "Gehe zum Marktplatz",
	"Jobs available in this company" : "Freie Arbeitsplätze in diesem Unternehmen",
	"You don't have any active job offers" : "Keine aktiven Job Angebote",
	"You didn't specify the amount of products you wish to buy" : "Keine Betragsangabe",
	"You cannot trade with this country as you are at war with it" : "Du kannst nicht mit diesem Land handeln, da du dich im Krieg mit diesem befindest",

// Regionsseite
	"Citizens" : "Bürger",
	"Country - Society" : "Gesellschaft",
    "Heal" : "Heilung",
	"Constructions": "Bauten",
	"Population": "Population",
	"Productivity" : "Produktivität ",
	"Resistance War" : "Widerstandskampf",
	"Resistance War Active" : "Aktive Widerstandskämpfe",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Du kannst keinen Widerstandskampf starten, weil es schon zum Ursprungsland gehört",
	"Medium" : "Mittel",
	"High": "Hoch",
	"Neighbors" : "Nachbarn",
	
// Marktplatz
	"Please select an Industry to see the marketplace offers" : "Bitte wähle eine Industrie aus um die Marktangebote anzuschauen",
	"Skill Level" : "Skill Level",
	"All skills" : "Alle Skills",
	"All" : "Alle",
	
// Politikseiten
	"Country Administration" : "Statsführung",
	"Accepted" : "Akzeptiert",
	"Rejected" : "Abgelehnt",
  	"Pending" : "Ausstehend",
	"Congress" : "Kongress",
	"Issue Money" : "Geld verteilen",
	"Law proposals" : "Gesetzesvorschläge",
	"Minimum Wage" : "Mindestlohn",
	"Mutual Protection Pact" : "Verteidigungsbündnis",
	"Peace Proposal" : "Friedensvorschlag",
	"President" : "President",
	"Yes" : "Ja",
	"No" : "Nein",
	"Show all law proposals" : "Zeige alle Gesetzesvorschläge",
	"The law voting process takes 24 hours." : "Der Gesetzes-Abstimmungs-Prozess dauert 24 Stunden",
	"Only congress members and country presidents have the right to vote." : "Nur Kongressmitglieder und Präsidenten haben das Recht abzustimmen",
	"You are not a president or a congress member in this country." : "Du bist kein Präsident oder ein Kongressmitglied in diesem Land",
	
// Kriege
	"no allies" : "keine Verbündete",
	"All wars" : "Alle Kriege",
	"All resistance wars" : "Alle Widerstandskämpfe",
	"All Alliances" : "Alle Bündnisse",
	"Alliances" : "Bündnisse ",
	"Military force" : "Militärstärke",
	"Average strength" : "Durchschnittliche Stärke",
	"War > Battlefield" : "Krieg > Kriegsschauplatz",
	"Basic damage" : "Grundschaden",
	"Weapon quality" : "Waffen Qualität",
	"Wellness" : "Gesundheit",
	"Rank" : "Rank",
	"Total damage" : "Total Schaden",
	
// Millitär
	"You have trained today. You can train again tomorrow." : "Du hast heute schon trainiert. Komm morgen wieder",
	"Force" : "Kraft",
	"Military rank" : "Militärischer Rank",
	"Military achievements" : "Militär-Auszeichnungen",
	"Active wars list" : "Liste aktiver Kriege",
	"Sergeant" : "Feldwebel",
	"Corporal" : "Unteroffizier",
	"Private" : "Soldat",
	"Show active wars" : "Zeige aktive Kriege",
	"Start a Resistance War" : "Widerstandskampf starten",
	"You do not have the necessary amount of Gold to start a resistance war." : "Du hast nicht genügend Gold um einen Widerstands kampf zu starten.",
	"You cannot join this fight because your country is not involved in the war" : "Du kannst nicht am Krieg teilnehmen, weil dein Land am Krieg teilnimmmt.",
	"There are no resistance wars in this country." : "Es gibt keine Widerstandskämpfe in diesem Land.",
	"until the region can be occupied or secured" : "Die Region kann besetzt oder gesichert werden",
	"Attackable on President's decision" : " Präsidenten Entscheidungen anzweifeln",
	"Defense Points" : "Abwehrpunkte",
	"Go to Battlefield" : "Zum Schlachtfeld",
	"see finished battles" : "Sieh die fertigen Kämpfe",
	"Wars list" : "Kriegsliste",
	"War" : "Krieg",
	"Battle history" : "Kriegsgeschichte",
	"Fight" : "Kämpfen",
	"Hero" : "Held",
	"Started by" : "Gestartet von",
	"started by" : "Gestartet von",
	"Fight for resistance" : "Kämpfe für den Widerstand",
	"Fight for defenders" : "Kämpfe als Verteidiger",
	
// Partei
	"Get more" : "Hol mehr",
	"Country presidency" : "Präsidentschaft",
	"Winner" : "Gewinner",
	"Next election in" : "Nächste Wahl in",
	"Next elections in" : "Nächste Wahlen in ",
	"No candidate proposed" : "Keine Kandidatenvorschläge",
	"candidates" : "Kandidaten",
	"Candidate" : "Kandidat",
	"days" : "Tage",
	"GOLD" : "GOLD",
	"Show results" : "Zeige Ergebnisse",
	"Show candidate list" : "Kandidatenliste",
	"Show candidates list" : "Kandidatenliste",
	"You are not a member of a party" : "Du bist in keiner Partei",
	"Join a party" : "Patei beitreten",
	"Create new" : "Neu Erstellen",
	"congress members" : " Kongressteilnehmer",
	"of Congress" : " von Kongress",
	"Show proposed members of congress" : "Zeige alle vorgeschlagenen Kongressteilnehmer",
	"Run for congress" : "Kandidiere für den Kongress",
	"Join" : "Beitreten",
	"See all members" : "Mitgliederliste",
	"Donate Gold" : "Spende Gold",
	"Members"  : "Mitglieder",
	"Orientation" : "Orientierung",
	"Show all members" : "Mitgliederliste",

	"Center" : "Venter",
	"Anarchist" : "Anarchist ",
	"Accounts" : "Konto",
	"Elections" : "Wahlen",
	"Election results" : "Wahlergebnisse",
	"Next elections" : "Nächste Wahl",

	"Country Presidency" : "Präsident",
	"Party presidency" : "Parteivorsitz",
	"Party President" : "Parteivorsitz",
	"See results" : "Ergebnisse anzeigen",
	"Expires tomorrow" : "läuft aus Morgen aus",

// Artikel
	"Report abuse" : "Verstöße melden",
	"today" : "heute",
	"yesterday" : "gestern",
	"one hour ago" : "vor einer stunde",
	"Unsubscribe" : "Abbestellen",
	"Subscribe" : "Abonnieren",
	"Article RSS" : "Artikel RSS",
	"Your comment" : "Dein Kommentar",
	"View all comments" : "Alle Kommentare anschauen",
	"Subscribe to comments" : "Abo alle Kommentare ",
	"Unsubscribe to comments" : "Alle Kommentare abbestellen",
	"Post a comment" : "Kommentar schreiben",
	
// News
	"You do not have a newspaper" : "Du besitzt keine Zeitung",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Eine Zeitung ist der einfachste Weg, um deine Nachrichten in der eRepublik Welt weiterzugeben. Mehr dazu findest du in der eRepublik Wiki unter dem Punkt - Deine eigene Zeitung gründen.",
	
// Profile
	"Friends" : "Freunde",
	"Fights" : "Kämpfe",
	"National Rank" : "Nationaler Rank",
	"Forfeit Points" : "Strafpunkte",
	"ShareThis" : "Empfehlen",
	"Shout something:" : "Shout irgendwas:",
	"Assets" : "Guthaben",
	"Press director" : "Verlagsleiter",
	"Inventory" : "Inventar",
	"Get Gold" : "Gold holen",
	"Career" : "Karriere",
	"Bio" : "Bio",
	"Employee" : "Arbeitnehmer",
	"No political activity" : "Keine politische Tätigkeit",
	"Wellness" : "Gesundheit",
	"Level" : "Level",
	"Strength" : "Stärke",
	"Experience" : "Erfahrungen",
	"Skills:" : "Skills",
	"Land" : "Land",
	"Manufacturing" : "Herstellung",
	"Erepublik Age" : "eRepublik-Alter",
	"Get Extra Storage" : "Lager erweitern",
	"Party Member" : "Parteimitglied",
	"No activity" : "Keine Tätigkeit",
	"Total damage:" : "Totaler Schaden",
	"Hard Worker" : "Schwerarbeiter",
	"Work for 30 days in a row" : "Hat 30 Tag in Folge gearbeitet",
	"Congress Member" : "Kongressmitglied",
	"Country President" : "Präsident",
	"Win the Presidential elections" : "Präsidentenwahl gewonnen",
	"Media Mogul" : "Medienmogul",
	"Reach 1000 subscribers to your newspaper" : "Hat 1000 Abonnenten für seine Zeitung",
	"Battle Hero" : "Schlachtfeld-Held",
	"Reach the highest total damage in one battle" : "Erreichte den höchsten totalen Schaden in einem Kampf",
	"Resistance Hero" : "Widerstandsheld",
	"Start a resistance war and liberate that region" : "Starte ein Widerstandskampf und liberalisere die Region",
	"Super Soldier" : "Super Soldat",
	"Advanced 5 strength levels" : "Mehr als 5 Sterne Level",
	"Society Builder" : "Gesellschaften Bauer",
	"Invite 10 people to eRepublik and help them reach level 6" : "Lade 10 Leute in die eRepublik welt ein und hilf ihnen dabei, das Level 6 zuerreichen.",
	"Achievements" : "Auszeichnung",
	"Edit profile" : "Profil bearbeiten",
	"Edit Profile" : "Profil bearbeiten",
	"Change residence" : "Wohnort wechseln",
	"Donations list" : "Spendenliste",
	
	"Your email here" : "Deine E-Mail-Adresse",
	"Your birthday" : "Dein Geburtstag",
	"Citizen Avatar" : "Bürger Avatar",
	"Change password" : "Passwort ändern",


	"Worked 30 days in a row" : "30 Tage in Folge gearbeitet",
	"Win the Congress elections": "Kongresswahl gewonnen",
	
// Kampf
	"Back to battlefield" : "Zurück zum Schlachtfeld",
	"Fight Again" : "Nochmal kämpfen",
	"Fight bonus" : "Kampfbonus",
	
// Organisationen
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Um sich in den Account einer Organisation einzuloggen, muss du dich aus deinem eigenen Büger-Account auslogen, um dann sich mit dem Username und Passwort der Organisation wiedereinloggen zukönnen.",
	"My Organizations" : "Meine Organisationen",
	"Logout" : "Logout",
	"Organizations created by you:" : "Organisation ist von dir erstellt",
	"You have not created any organization yet." : "Du hast bis jetzt noch keine Organisation erstellt",
	
// career-path
	"General manager" : "Geschäftsführer",
	"Hard Worker" : "Schwerarbeiter",
	
// ranking
	"No." : "Nr.",
	"Hard Worker" : "Schwerarbeiter",

// messages
    "Inbox" : "Inbox",
	"Sent" : "Senden",
	"Alerts" : "Alarm",
	"Subscriptions" : "Abonnements",
	"new article" : "Neuer Artikel",
	"Write article" : "Artikel schreiben",
	"Edit newspaper details" : "Zeitungsdetails bearbeiten",
	"Edit" : "Bearbeiten",
	"Delete" : "Löschen",
	"Read Message" : "Nachrichten lesen",
	"Reply" : "Antworten",
	"From" : "Von",
	"Back" : "Zurück",
	"Picture" : "Bild",
	"only JPG files allowed" : "Nur JPG Files erlaubt",
	"Publish" : "Veröffentlichen",
// Nachrichten
	"Your account" : "Dein Account",
	"Newspaper details" : "Zeitungsdetails",
	"Create newspaper" : "Zeitung erstellen",
	"Cost" : "Kosten",
	"Newspaper name" : "Zeitungsname",
	"Newspaper Avatar" : "Zeitungsbild",
	"Requirements" : "Anforderungen",
	"Create" : "Erstellen",
	
// flash menu
	"My places > Army" : "Armee",
	"My places > Newspaper" : "Zeitung",
	"My places > Organizations" : "Organisationen",

// menu	
	"Find out more" : "Finde mehr heraus",
	"logout" : "Logout",
	"Top Citizens" : "Top-Bürger",
	"Sales" : "Verkäufe",
	"Top Companies" : "Top-Unternehmen",
	"Experience points" : "Erfahrungspunkte",
	"Country" : "Land"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 Verbündete";
regexps["^Active wars in (.*)$"] = "Aktive Kriege gegen";
regexps["(\\s*)Expires in (\\d*) days"] = "Endet in $2 Tagen";
regexps["^(\\d*) comments$"] = "$1 Kommentare";
regexps["^(\\d*) hours ago$"] = "vor $1 Stunden";
regexps["^(\\d*) minutes ago$"] = "vor $1 Minuten";
regexps["^(\\d*) days ago$"] = "vor $1 Tagen";
regexps["^Regions \\((\\d*)\\)"] = "Regionen ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Freunde ($1)";
regexps["^(\\d*) months"] = "$1 Monate";
regexps["^Comments(.*)"] = "Kommentare $1";



matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}


window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);