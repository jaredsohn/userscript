// ==UserScript==
// @name           slovenský preklad eRepublik
// @namespace      slovensky preklad erepublik
// @description    Toto je len preklad eRepublik ovládania do slovenčiny
// @include        http://www.erepublik.com/*
// @version	   0.2
// @autor          Script by renszarv, translation by Andrejko
// ==/UserScript==

var strings = {
// Menu
	"Home" : "Domov",
	"Donate" : "Dar",
	"May" : "Máj",
	"June" : "Jún",
	"July" : "Júl",
	"Day" : "deň ",
	"of the New World" : " nového letopočtu",
	"Rank"   : "umiestnenie",
	"Company" : "firma", 
	"Profile":"profil", 
	"Party" : "strana", 
	"Newspaper" :"osobné noviny",
	"Army" : "armáda",
	"Country administration" : "štátna správa",
    "Organizations" : "organizácie",
	"Market" : "tržnica",
	"Monetary market" : "zmenáreň",
	"Rec exchange rate" : "určený kurz",
	"Exchange rate" : "výmenný kurz",
	"Amount to buy" : "ponúkané množstvo",
	"Show my offers" : "moje ponuky",
	"Post new offer" : "moja nová ponuka",
	"Job market" : "pracovné ponuky",
    "Companies for sale" : "firmy na prevzatie",
    "Get gold &amp; extras" : "možnosti ako si kúpiť zlato; bonusy",
	"Rankings" : "rebríčky",
	"Social stats" : "sociálne štatistiky",
	"Economic stats" : "ekonomické štatistiky",
	"Political stats" : "politické štatistiky",
	"Military stats" : "vojenské štatistiky",
	"Tools" : "nástroje",
	"Forum" : "fórum",
	"News" : "správy",
	"Invite friends" : "pozvánky",
	"eRepublik Shop" : "eRepublik obchod",
	"Career path" : "kariéra",
	"Ok, thanks, next tip" : "OK, vďaka, ďaľší tip",
	"I have nothing more to say at the moment" : "V tejto chvíli už nemám čo dodať.",
	"Select" : "výber",
    "Latest events" : "posledné udalosti",
	"News" : "správy",
    "More events" : "viac udalostí",
    "More news" : "viac správ",
	"more news" : "viac správ2",
	"Marketplace" : "tržnica",
	"Wars" : "vojny",
    "My Places" : "moje miesto",
    "Info" : "informácia",
    "Community" : "spoločnosť",
    "Day of the new world" : "deň nového letopočtu",
    "National" : "národný",
    "International" : "medzinárodný",
    "Latest Events" : "posledné udalosti",
    "Shouts" : "Výkriky do tmy",
    "Shout something" : "Zakrič si",
    "Shout" : "výkrik",
    "Official" : "oficiálny",
    "Everyone" : "všeobecný",
    "Lates" : "posledné",
    "Search citizen" : "hľadaj občana",
	"eRepublik Birthday" : "eRepublik narodeniny",
	"Shout" : "Výkriky zo tmy",
	"Latest" : "aktuálne",
	"one minute ago" : "pred minútou",
	"for 10 shouts/day and more" : "pre 10 výkrikov/deň a viac",
	"No more shouts for today" : "Žiadne ďaľšie výkriky pre dnešok.",
	"Top Rated" : "najlepšie ohodnotený",

// Štát
	"On the Map" : "na mape",
	"Total citizens" : "počet obyvateľov",
	"New citizens today" : "noví občania dnes",
	"Average citizen level" : "priemerná skúsenosť občanov",
	"Online now": "práve hrajúci",
	"Citizen fee" : "občianska daň",
	"Citizens" : "občania",
	"Who" : "kto",
	"details" : "detaily",
	"Society" : "spoločnsoť",
	"Economy" : "hospodárstvo",
	"Politics" : "politika",
	"Military" : "armáda",
	"Administration" : "štátna správa",
	
// Štáty
	"Argentina" : "Argentínia",
	"Australia" : "Austrália",
	"Austria" : "Rakúsko",
	"Bosnia and Herzegovina" : "Bosna a Herzegovina",
	"Brazil" : "Brazília",
	"Bulgaria" : "Bulharsko",
	"China" : "Čína",
	"Croatia" : "Chorvátsko",
	"Canada" : "Kanada",
	"Czech Republic" : "Česko",
	"Denmark" : "Dánsko",
	"Estonia" : "Estónsko",
	"Finland" : "Fínsko",
	"France" : "Francúzsko",
	"Germany" : "Nemecko",
	"Greece" : "Grécko",
	"Hungary" : "Maďarsko",
	"Indonesia" : "Indonézia",
	"Ireland" : "Írsko",
	"Israel" : "Izrael",
	"Italy" : "Taliansko",
	"Iran" : "Irán",
	"Japan" : "Japonsko",
	"Latvia" : "Lotyšsko",
	"Lithuania" : "Litva",
	"Malaysia" : "Malajzia",
	"Mexico" : "Mexiko",
	"Moldavia" : "Moldavsko",
	"Netherlands" : "Holandsko",
	"Norway" : "Nórsko",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filipíny",
	"Poland" : "Poľsko",
	"Portugal" : "Portugalsko",
	"Romania" : "Rumunsko",
	"Serbia" : "Srbsko",
	"Singapore" : "Singapúr",
	"South Africa" : "Južná Afrika",
	"South Korea" : "Južná Kórea",
	"Slovakia" : "Slovensko",
	"Slovenia" : "Slovinsko",
	"Switzerland" : "Švajčiarsko",
	"Spain" : "Španielsko",
	"Sweden" : "Švédsko",
	"Russia" : "Rusko",
	"Thailand" : "Thajsko",
	"United Kingdom" : "Veľká Británia",
	"Ukraine" : "Ukrajina",
	"USA" : "SŠA",
	"Turkey" : "Turecko",
	"World" : "svet",
	
// Ekonomické stránky
	"GOLD" : "zlatoB",
	"Gold" : "zlato",
	"Treasury" : "pokladnica",
	"All accounts" : "všetky kontá",
	"Country trading embargoes" : "obchodné embargá",
	"Taxes" : "dane",
	"food" : "jedlo",
	"gift" : "dary",
	"weapon" : "zbrane",
	"moving tickets" : "cestovné lístky",
	"grain" : "obilie",
	"diamonds" : "diamanty",
	"iron" : "železo",
	"oil"  : "ropa",
	"wood" : "drevo",
	"house" : "dom",
	"hospital" : "nemocnica",
	"defense system" : "obranný systém",
	"Defense system" : "obranný systém2",
	"Salary" : "čistý plat",
	"Minimum" : "minimum",
	"Average" : "priemer",
	"Gross domestic product (GDP)" : "hrubý domáci produkt (HDP)",
	"Monthly exports" : "mesačný vývoz",
	"Monthly imports" : "mesačný dovoz",
	"Inflation" : "inflácia",
	
// Firemné stránky
	"Office" : "kancelária",
	"You have already worked today." : "Dnes si si to už odmakal.",
	"Come back tomorrow." : "Prídi opäť zajtra.",
	"Resign" : "dávam výpoveď",
	"Employees" : "zamestnanec",
	"Raw materials" : "suroviny",
	"Show all employees" : "ukáž všetkých zamestnancov",
	"Show all donations" : "ukáž všetky dary",
	"Go to marketplace" : "vchod do tržnice",
	"Products" : "výrobky",
	"You do not have any active job offers" : "žiadne ponuky práce",
	"The company offers no products in this market" : "Firma na tomto trhu neponúka žiadne svoje produkty.",
	"Amount" : "množstvo",
	"Price" : "cena",
	"Price with taxes" : "cena aj s daňou",
	"Company Page" : "stránka spoločnsoti",
	"Today" : "dnes",
	"Yesterday" : "včera",
	"All employees" : "všetci zamestnanci",
	"Skill" : "zručnosť",
	"Daily salary" : "denná mzda",
	"Last presence" : "posledná prítomnosť",
	"Minimum country wage" : "minimálna mzda",

	"Grain" : "obilie",
	"Food" : "jedlo",
	"Gift" : "dary",
	"Weapon" : "zbrane",
	"Moving Tickets" : "cestovné lístky",
	"Diamonds" : "diamanty",
	"Iron" : "železo",
	"Oil"  : "ropa",
	"Wood" : "drevo",
	"House" : "domy",
	"Hospital" : "nemocnica",
	"Defense System" : "obranný systém",
	
// Tržnica
	"Quality Level" : "kvalita",
	"All levels" : "všetky stupne kvality",
	"Level 1" : "Kvalita 1",
	"Level 2" : "Kvalita 2",
	"Level 3" : "Kvalita 3",
	"Level 4" : "Kvalita 4",
	"Level 5" : "Kvalita 5",

	"Provider" : "ponúka: ",
	"Quality" : "kvalita",
	"Stock" : "množstvo",
	"Buy" : "kúp",
	"Sell" : "predaj",
	"Market" : "tržnica",
	"Market offers" : "ponuky v tržnici",
	"Amount" : "množstvo",
	"Price" : "cena",
	"buy" : "kúp",
	"Next" : "ďaľšie",
	"Prev" : "predošlé",
	"No products in this market" : "Nie sú k dispozícii žiadne produkty.",
	"Go to marketplace" : "Choď do tržnice",
	"Jobs available in this company" : "Firma ponúka tieto pracovné miesta:",
	"You don't have any active job offers" : "Nie sú k dispozícii žiadne pracovné ponuky.",
	"You didn't specify the amount of products you wish to buy" : "Neuviedol si počet",
	"You cannot trade with this country as you are at war with it" : "Nemôžete obchodovať so štátom, s ktorým ste vo vojne.",

// Stránka kraja
	"Citizens" : "občania",
	"Country - Society" : "spoločnosť",
    "Heal" : "liečenie",
	"Constructions": "výstavba",
	"Population": "obyvateľstvo",
	"Productivity" : "produktivita",
	"Resistance War" : "odboj",
	"Resistance War Active" : "prebieha oslobodzovací boj/odboj",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Nemôžeš podnietiť odboj, pretože tento kraj patrí k pôvodnému štátu.",
	"Medium" : "stredný",
	"High": "vysoký",
	"Neighbors" : "susedia",
	
// Tržnica
	"Please select an Industry to see the marketplace offers" : "Zvoľte si odvetvie na výber ponúk.",
	"Skill Level" : "stupeň zručnosti",
	"All skills" : "všetky zručnosti",
	"All" : "všetko",
	
// Politika
	"Country Administration" : "štátna správa",
	"Accepted" : "súhlasím",
	"Rejected" : "odmietam",
  	"Pending" : "prebieha",
	"Congress" : "parlament",
	"Issue Money" : "presun peňazí",
	"Law proposals" : "návrhy zákonov",
	"Minimum Wage" : "minimálna mzda",
	"Mutual Protection Pact" : "ochranná zmluva",
	"Peace Proposal" : "návrh na uzavretie mieru",
	"President" : "prezident",
	"Yes" : "áno",
	"No" : "nie",
	"Show all law proposals" : "Ukáž mi všetky návrhy zákonov.",
	"The law voting process takes 24 hours." : "Hlasovanie trvá 24 hodín.",
	"Only congress members and country presidents have the right to vote." : "Iba členovia parlamentu a prezident majú právo hlasovať.",
	"You are not a president or a congress member in this country." : "Nie si ani prezident a ani člen parlamentu.",
	
// Vojna
	"no allies" : "žiadni spojenci",
	"All wars" : "všetky vojny",
	"All resistance wars" : "všetky odboje",
	"All Alliances" : "všetky aliancie",
	"Alliances" : "aliancie",
	"Military force" : "vojenská sila",
	"Average strength" : "priemerná sila",
	"War > Battlefield" : "Vojna > miesto bojov",
	"Basic damage" : "možná škoda",
	"Weapon quality" : "kvalita zbrane",
	"Wellness" : "zdravie",
	"Rank" : "hodnosť",
	"Total damage" : "celková škoda",
	
// Armáda
	"You have trained today. You can train again tomorrow." : "Dnes si už cvičil, ale zajtra môžeš opäť.",
	"Force" : "sila",
	"Military rank" : "vojenská hodnosť",
	"Military achievements" : "vojenské úspechy",
	"Active wars list" : "zoznam aktívnych vojen",
	"Sergeant" : "seržant",
	"Corporal" : "poručík",
	"Private" : "vojak",
	"Show active wars" : "ukáž aktívne vojny",
	"Start a Resistance War" : "podnieť odboj",
	"You do not have the necessary amount of Gold to start a resistance war." : "Nemáš dostatok financií na zaplatenie odboja.",
	"You cannot join this fight because your country is not involved in the war" : "Nemôžeš sa zúčastniť bojov, pretože Tvoj štát nie je vo vojne.",
	"There are no resistance wars in this country." : "V tomto štáte niet odboja.",
	"until the region can be occupied or secured" : "Kraj môže byť obsadený alebo ubránený.",
	"Attackable on President's decision" : "vyslovenie nedôvery prezidentovi",
	"Defense Points" : "sila obrany",
	"Go to Battlefield" : "choď na miesto bojov",
	"see finished battles" : "pozri skončené boje",
	"Wars list" : "zoznam vojen",
	"War" : "vojna",
	"Battle history" : "priebeh bojov",
	"Fight" : "boje",
	"Hero" : "hrdina",
	"Started by" : "podnietená",
	"started by" : "podnietená",
	"Fight for resistance" : "bojuj za odboj",
	"Fight for defenders" : "bojuj proti odboju",
	
// Strana
	"Get more" : "získaj viec",
	"Country presidency" : "prezident",
	"Winner" : "víťaz",
	"Next election in" : "nasledujúci volebný deň",
	"Next elections in" : "nasledujúce voľby ",
	"No candidate proposed" : "žiaden kandidát nie je navrhnutý",
	"candidates" : "kandidáti",
	"Candidate" : "kandiduj",
	"days" : "dni",
	"GOLD" : "zlato",
	"Show results" : "ukáž výsledky",
	"Show candidate list" : "ukáž kandidátnu listinu",
	"Show candidates list" : "kandidátna listina",
	"You are not a member of a party" : "Nie si členom žiadnej strany",
	"Join a party" : "vstúp do strany",
	"Create new" : "založ novú stranu",
	"congress members" : "člen parlamentu",
	"of Congress" : "z parlamentu",
	"Show proposed members of congress" : "ukáž parlamentných kandidátov",
	"Run for congress" : "kandiduj do parlamentu",
	"Join" : "vstúp",
	"See all members" : "pozri členov",
	"Donate Gold" : "daruj zlatky",
	"Members"  : "členská listina",
	"Orientation" : "smerovanie",
	"Show all members" : "ukáž všetkch členov",

	"Center" : "stredová",
	"Anarchist" : "anarchistická",
	"Accounts" : "konto",
	"Elections" : "voľby",
	"Election results" : "výsledky volieb",
	"Next elections" : "nasledujúce voľby",

	"Country Presidency" : "prezident",
	"Party presidency" : "predseda strany",
	"Party President" : "predseda strany",
	"See results" : "pozri výsledky",
	"Expires tomorrow" : "skončí zajtra",

// Články
	"Report abuse" : "nahlás porušenie pravidiel",
	"today" : "dnes",
	"yesterday" : "včera",
	"one hour ago" : "pred hodinou",
	"Unsubscribe" : "odhlás odoberanie",
	"Subscribe" : "začni odoberať",
	"Article RSS" : "RSS príspevku",
	"Your comment" : "komentár",
	"View all comments" : "pozri všetky komentáre",
	"Subscribe to comments" : "Začni odoberať komentáre",
	"Unsubscribe to comments" : "Odhlás odber komentárov",
	"Post a comment" : "napíš komentár",
	
// Novinky
	"You do not have a newspaper" : "Nevlastníš žiadne noviny.",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Noviny sú najjednoduchším spôsobom oznamovania osobných názorov. Viac sa dozvieš v eRepublik wiki.",
	
// Profil
	"Friends" : "priatelia",
	"Fights" : "boje",
	"National Rank" : "národné hodnotenie",
	"Forfeit Points" : "trestné body",
	"ShareThis" : "odporúčanie",
	"Shout something:" : "Vykrič hocičo:",
	"Assets" : "dobré body",
	"Press director" : "vydavateľ",
	"Inventory" : "inventár",
	"Get Gold" : "získaj zlato",
	"Career" : "kariéra",
	"Bio" : "životopis",
	"Employee" : "zamestnanec",
	"No political activity" : "žiadna politcká aktivita",
	"Wellness" : "zdravie",
	"Level" : "stupeň",
	"Strength" : "sila",
	"Experience" : "skúsenosť",
	"Skills:" : "zručnosť",
	"Land" : "štát",
	"Manufacturing" : "výroba",
	"Erepublik Age" : "eRepublik-vek",
	"Get Extra Storage" : "rozšírenie skladiska",
	"Party Member" : "člen strany",
	"No activity" : "žiadna aktivita",
	"Total damage:" : "celková škoda",
	"Hard Worker" : "ťažko pracujúci",
	"Work for 30 days in a row" : "pracoval v jednom kuse 30 dní",
	"Congress Member" : "člen parlamentu",
	"Country President" : "prezident",
	"Win the Presidential elections" : "vyhral prezidentské voľby",
	"Media Mogul" : "vadavateľský gigant",
	"Reach 1000 subscribers to your newspaper" : "získaj 1000 predplatiteľov",
	"Battle Hero" : "vojenský hrdina",
	"Reach the highest total damage in one battle" : "spôsobil najväčšie škody v jednom boji",
	"Resistance Hero" : "hrdina odboja",
	"Start a resistance war and liberate that region" : "podnieť odboj a osloboď daný kraj",
	"Super Soldier" : "super vojak",
	"Advanced 5 strength levels" : "dosiahol viac ako 5 stupeň sily",
	"Society Builder" : "budovateľ spoločnosti",
	"Invite 10 people to eRepublik and help them reach level 6" : "Pozvi 10 hráčov do eRepublik, ktorí neskôr dosiahnu 6 úroveň.",
	"Achievements" : "vyznamenanie",
	"Edit profile" : "spracuj profil",
	"Edit Profile" : "spracuj profil",
	"Change residence" : "zmeň bydlisko",
	"Donations list" : "zoznam darov",
	
	"Your email here" : "elektronická adresa",
	"Your birthday" : "narodeniny",
	"Citizen Avatar" : "fotografia",
	"Change password" : "zmena hesla",


	"Worked 30 days in a row" : "pracoval 30 dní v kuse",
	"Win the Congress elections": "vyhral poslanecké voľby",
	
// Boj
	"Back to battlefield" : "naspäť na bojisko",
	"Fight Again" : "opäť bojuj",
	"Fight bonus" : "bojový bonus",
	
// organizácia
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Ak sa chceš prihlásiť ak oorganizácia, tak sa musíš nasjkôr odhlásiť zo svojho konta občana.",
	"My Organizations" : "moje organizácie",
	"Logout" : "odhlásenie",
	"Organizations created by you:" : "moje organizácie",
	"You have not created any organization yet." : "Zatiaľ si nezaloži lžiadnu organizáciu.",
	
// kariéra
	"General manager" : "generálny riaditeľ",
	"Hard Worker" : "ťažko pracujúci",
	
// hodnotenie
	"No." : "Č.",
	"Hard Worker" : "hrdina práce",

// messages
    "Inbox" : "schránka",
	"Sent" : "pošli",
	"Alerts" : "upozornenie",
	"Subscriptions" : "počet odberateľov",
	"new article" : "nový článok",
	"Write article" : "napíš článok",
	"Edit newspaper details" : "uprav detaily novín",
	"Edit" : "spracuj",
	"Delete" : "vymaž",
	"Read Message" : "čítaj správu",
	"Reply" : "odpoveď",
	"From" : "z",
	"Back" : "naspäť",
	"Picture" : "obrázok",
	"only JPG files allowed" : "povolené sú len JPG súbory",
	"Publish" : "zverejni",
// Noviny
	"Your account" : "Tvoje konto",
	"Newspaper details" : "detaily novín",
	"Create newspaper" : "vytvor noviny",
	"Cost" : "náklady",
	"Newspaper name" : "meno novín",
	"Newspaper Avatar" : "obrázok novín",
	"Requirements" : "požiadavky",
	"Create" : "vytvor",
	
// Flash menu
	"My places > Army" : "Moje miesta > armáda",
	"My places > Newspaper" : "Moje miesta > noviny",
	"My places > Organizations" : "MOje miesta > organizácie",

// Menu	
	"Find out more" : "Dozveď sa viac",
	"logout" : "odhlásenie",
	"Top Citizens" : "Top-občania",
	"Sales" : "predaje",
	"Top Companies" : "Top-firmy",
	"Experience points" : "bodové ohodnotenie",
	"Country" : "štát"
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

Because it's your web

Support userscripts.org by donating

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
