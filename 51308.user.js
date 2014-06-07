// ==UserScript==
// @name           13 prijevođenje v0.5
// @description    a nije lose
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Početna",
	"Donate" : "Donacije",
	"May" : "Svibanj",
	"June" : "Lipanj",
	"July" : "Srpanj",
	"Day" : "Dan",
	"of the New World" : " novog svijeta",
	"Rank"   : "Rank",
	"Company" : "Tvrtka", 
	"Profile":"Profil", 
	"Party" : "Stranka", 
	"Newspaper" :"Novine",
	"Army" : "Vojska",
	"Country administration" : "Državna Administracija",
        "Organizations" : "Organizacije",
	"Market" : "Market",
	"Monetary market" : "Novčano Tržište",
	"Job market" : "Burza rada",
        "Companies for sale" : "Tvrtke na prodaju",
        "Get gold &amp; extras" : "Kupi zlato i ostalo",
	"Rankings" : "Poredci",
	"Social stats" : "Društvene statistike",
	"Economic stats" : "Ekonomske statistike",
	"Political stats" : "Počitičke statistike",
	"Military stats" : "Vojne statistike",
	"Tools" : "Alati",
	"Forum" : "Forum",
	"News" : "Vijesti",
	"Invite friends" : "Pozovi prijatelja",
	"eRepublik Shop" : "eRepublik Shop",
	"Career path" : "Karijera",
	"Ok, thanks, next tip" : "Uredu, hvala,sljedeći savjet ",
	"I have nothing more to say at the moment" : "Trenutno, nemam ništa pametno za reći",
	"Select" : "Odaberi",
        "Latest events" : "Noviji događaji",
		"News" : "Vijesti",
        "More events" : "Stariji događaji",
        "More news" : "Starije vijesti",
		"more news" : "Još vijesti",
	"Marketplace" : "Trgovina",
	"Wars" : "Ratovi",
        "My Places" : "Moj Profil",
        "Info" : "Info",
        "Community" : "Community",
        "Day of the new world" : "Dan novog svijeta",
        "National" : "Nacionalni",
        "International" : "Internacionalni",
		"Latest Events" : "Noviji događaji",
        "Shouts" : "Izjave",
        "Shout something" : "Izjavi nešto",
        "Shout" : "Izjavi",
        "Official" : "Službeni",
        "Everyone" : "Svi",
        "Lates" : "Posljednji",
        "Search citizen" : "Traži",
	"Shout" : "Izjava",
	"Latest" : "Posljednji",
	"one minute ago" : "minutu prije",
	"for 10 shouts/day and more" : "10 izjava na dan i više",
	"No more shouts for today" : "Nema više izjava za danas ",
	"Top Rated" : "Najbolji",

// country page
	"On the Map" : "Na mapi",
	"Total citizens" : "Broj stanovnika",
	"New citizens today" : "Novih stanovnika danas",
	"Average citizen level" : "Prosječna razina stanovnika",
	"Online now": "Na mreži trenutno",
	"Citizens" : "Stanovnici",
	"Who" : "Tko",
	"details" : "Detalji",
	"Society" : "Društvo",
	"Economy" : "Ekonomija",
	"Politics" : "Politika",
	"Military" : "Vojska",
	"Administration" : "Administracija",
	
// countries
	"Argentina" : "Argentina",
	"Australia" : "Australia",
	"Austria" : "Austria",
	"Bosnia and Herzegovina" : "Bosna i Hercegovina",
	"Brazil" : "Brazil",
	"Bulgaria" : "Bugarska",
	"China" : "Kina",
	"Croatia" : "Hrvatska",
	"Canada" : "Kanada",
	"Czech Republic" : "Republika Češka",
	"Denmark" : "Danska",
	"Estonia" : "Estonia",
	"Finland" : "Finska",
	"France" : "Francuska",
	"Germany" : "Njemačka",
	"Greece" : "Grčka",
	"Hungary" : "Mađarska",
	"Indonesia" : "Indonesia",
	"Ireland" : "Irska",
	"Israel" : "Izrael",
	"Italy" : "Italia",
	"Iran" : "Iran",
	"Japan" : "Japan",
	"Latvia" : "Latvia",
	"Lithuania" : "Litva",
	"Malaysia" : "Malesia",
	"Mexico" : "Meksiko",
	"Moldavia" : "Moldavia",
	"Netherlands" : "Nizozemska",
	"Norway" : "Norveška",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filipini",
	"Poland" : "Poljska",
	"Portugal" : "Portugal",
	"Romania" : "Rumunjska",
	"Serbia" : "Srbija",
	"Singapore" : "Singapur",
	"South Africa" : "Južno Afrička Republika",
	"South Korea" : "Južna Koreja",
	"Slovakia" : "Slovačka",
	"Slovenia" : "Slovenija",
	"Switzerland" : "Švicarska",
	"Spain" : "Španjolska",
	"Sweden" : "Švedska",
	"Russia" : "Rusija",
	"Thailand" : "Thailand",
	"United Kingdom" : "UK",
	"Ukraine" : "Ukraina",
	"USA" : "SAD",
	"Turkey" : "Turska",
	"World" : "Svijet",
// economy
	"GOLD" : "ZLATO",
	"Gold" : "Zlato",
	"Treasury" : "Državna blagajna",
	"All accounts" : "Svi računi",
	"Country trading embargoes" : "Embargo",
	"Taxes" : "porezi",
	"food" : "hrana",
	"gift" : "darovi",
	"weapon" : "oružje",
	"moving tickets" : "avionske karte",
	"grain" : "žitarice",
	"diamonds" : "dijamanti",
	"iron" : "željezo",
	"oil"  : "nafta",
	"wood" : "drvo",
	"house" : "kuća",
	"hospital" : "bolnica",
	"defense system" : "obrambeni sistem",
	"Defense system" : "Obrambeni sistem",


	"Salary" : "Plaća",
	"Minimum" : "Minimum",
	"Average" : "Prosjek",

	"Gross domestic product (GDP)" : "Bruto Domaći proizvod(BDP)",
	"Monthly exports" : "Mjesečni izvoz",
	"Monthly imports" : "Mjesečni uvoz",
	"Inflation" : "Inflacija",
// company
	"Office" : "Ured",
	"You have already worked today." : "Već si radio/la danas.",
	"Come back tomorrow." : "Vrati se sutra.",
	"Resign" : "Daj ostavku",
	"Employees" : "Zaposlenici",
	"Raw materials" : "Sirovine",
	"Show all employees" : "Prikaži sve zaposlenike",
	"Show all donations" : "Peikaži sve donacije",
	"Go to marketplace" : "Posjeti trgovinu",
	"Products" : "Proizvodi",
	"Jobs available in this company" : "Slobodni radno mjesto u tvrtki",
	"You do not have any active job offers" : "Nemate ni jednu poslovnu ponudu",
	"The company offers no products in this market" : "nema ponude",
	"Amount" : "Količina",
	"Price" : "Cijena",
	"Price with taxes" : "Cijena s PDV-om",
	"Company Page" : "Tvrtkina stranica",
	"Today" : "Danas",
	"Yesterday" : "Jučer",
	"All employees" : "Svi zaposlenici",
	"Skill" : "Skill",
	"Daily salary" : "Plaća",
	"Last presence" : "Posljednja prisutnost",
	"Minimum country wage" : "Minimalac",

	"Grain" : "Žitarice",
	"Food" : "Hrana",
	"Gift" : "Darovi",
	"Weapon" : "Oružje",
	"Moving Tickets" : "Avionske karte",
	"Diamonds" : "Dijamanti",
	"Iron" : "Željezo",
	"Oil"  : "Nafta",
	"Wood" : "Drvo",
	"House" : "Kuća",
	"Hospital" : "Bolnica",
	"Defense System" : "Obrambeni sistem",
// market
	"Quality Level" : "Razina kvalitete",
	"All levels" : "Sve razine",
	"Level 1" : "Razina 1",
	"Level 2" : "Razina 2",
	"Level 3" : "Razina 3",
	"Level 4" : "Razina 4",
	"Level 5" : "Razina 5",

	"Provider" : "Nabavljač",
	"Quality" : "Kvaliteta",
	"Stock" : "Zaliha",
	"Buy" : "Kupi",
	"Market" : "Kerum",

	"Market offers" : "Ponude",
	"Amount" : "Količina",
	"Price" : "Cijena",
	"Next" : "Sljedeća",
	"Prev" : "Prethodna",
	"No products in this market" : "Nema ponude",
	"Go to marketplace" : "Posjeti Keruma",
	"Jobs available in this company" : "Slobodna radna mjesta",
	"You don't have any active job offers" : "Nema slobodnih mjesta",
	"You didn't specify the amount of products you wish to buy" : 
		"Niste naveli količinu proizvoda kojeg želite kupiti",
	"You cannot trade with this country as you are at war with it" :
		"Nemožete trgovati s državom s kojom ste u ratu",

// region
	"Citizens" : "Stanovnici",
	"Country - Society" : "Država - Društvo",
        "Heal" : "Izlječi",
	"Constructions": "Konstrukcije",
	"Population": "Populacija",
	"Productivity" : "Produktivnost",
	"Resistance War" : "Seljačka buna",
	"Resistance War Active" : "Aktivna seljačka buna",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "jebiga kume, nemožeš",
	"Medium" : "Srednje Bogato",
	"High": "Bogato",
	"Neighbors" : "Komšije",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Izaberi artikle",
	"Skill Level" : "Skill Level",
	"All skills" : "All skills",
	"All" : "Svi",
// politics
	"Country Administration" : "Državna administracija",
	"Accepted" : "Prihvaćeno",
	"Rejected" : "Odjebano",
  "Pending" : "Glasovanje u tijeku",
	"Congress" : "Sabor",
	"Issue Money" : "Krivotvori pare",
	"Law proposals" : "Prijedlog zakona",
	"Minimum Wage" : "Minimalac",
	"Mutual Protection Pact" : "Pakt o međusobnoj zaštiti",
	"Peace Proposal" : "Prijedlog mirovnog sporazuma",
	"President" : "mr. President",
	"Yes" : "DA",
	"No" : "Ne",
	"Show all law proposals" : "Prikaži sve prijedloge zakona",
	"The law voting process takes 24 hours." : "Glasanje traje 24 sata.",
	"Only congress members and country presidents have the right to vote." : "Samo zastupnik i mr. president imaju pravo glasa.",
	"You are not a president or a congress member in this country." : "Niti si mr. president niti zastupnik ove države.",
// wars
	"no allies" : "Bez saveznika",
	"All wars" : "Svi ratovi",
	"All resistance wars" : "Sve seljačke bune",
	"All Alliances" : "Svi saveznici",
	"Alliances" : "Saveznici",
	"Military force" : "Vojna sila",
	"Average strength" : "Prosječna snaga",
	"War > Battlefield" : "Rat > Bojište",
	"Basic damage" : "Osnovna šteta",
	"Weapon quality" : "Kvaliteta oružja",
	"Wellness" : "Zdravlje",
	"Rank" : "Čin",
	"Total damage" : "Ukupna šteta",
	
// army
	"You have trained today. You can train again tomorrow." : "Trenirao si danas, vrati se sutra.",
	"Force" : "snaga",
	"Military rank" : "Čin",
	"Military achievements" : "Vojni uspjesi",
	"Active wars list" : "Lista aktivnih ratova",
	"Sergeant" : "Narednik",
	"Corporal" : "Corporal",
	"Private" : "Niko i ništa",
	"Show active wars" : "Pokaži aktivne ratove",
	"Start a Resistance War" : "Započni seljačku bunu",
	"You do not have the necessary amount of Gold to start a resistance war." : "Nemaš dovoljno para da započneš seljačku bunu, da možda prodaš traktor",
	"You cannot join this fight because your country is not involved in the war" : "Nemožeš se boriti jer tvoja zemlja nije umješana.",
	"There are no resistance wars in this country." : "Nema buna u Državi.",
	"until the region can be occupied or secured" : "Dok regija ne bude okupirana ili obranjena",
	"Attackable on President's decision" : "Napad na presjednikovu odluku",
	"Defense Points" : "Obrambeni poeni",
	"Go to Battlefield" : "Posjeti bojište",
	"see finished battles" : "Pogledaj završene bitke",
	"Wars list" : "Lista ratova",
	"War" : "Rat",
	"Battle history" : "Povijest bitke",
	"Fight" : "Bori se",
	"Hero" : "Heroj",
	"Started by" : "Započeto od ",
	"started by" : "Započeto od ",
	"Fight for resistance" : "Bori se za seljake",
	"Fight for defenders" : "Bori se za gospodu",
// party
	"Get more" : "ostalo",
	"Country presidency" : "Presjednik",
	"Winner" : "Pobjednik",
	"Next election in" : "Idući izbori ",
	"Next elections in" : "Idući izbori ",
	"No candidate proposed" : "Nema predloženih kandidata",
	"candidates" : "Kandidati",
	"Candidate" : "Kandidat",
	"days" : "Dani",
	"GOLD" : "Zlato",
	"Show results" : "Prikaži rezultate",
	"Show candidate list" : "Prikaži listu kandidata",
	"Show candidates list" : "Prikaži listu kandidata",
	"You are not a member of a party" : "Nisi član stranke",
	"Join a party" : "Učlani se u stranku",
	"Create new" : "Osnuj novu",
	"congress members" : " Zastupnik",
	"of Congress" : " sabora",
	"Show proposed members of congress" : "Prikaži predložene kandidate za sabor",
	"Run for congress" : "Kandididraj se za sabor",
	"Join" : "Učlani se",
	"See all members" : "Prikaži sve članove",
	"Donate Gold" : "Doniraj zlato",
	"Members"  : "Članovi",
	"Orientation" : "Orjentacija",
	"Show all members" : "Prikaži sve članove",

	"Center" : "Centro",
	"Anarchist" : "pristalica bezvlašća",
	"Accounts" : "Računi",
	"Elections" : "Izbori",
	"Election results" : "Rezultati izbora",
	"Next elections" : "Sljedeći izbori",

	"Country Presidency" : "Presjednik",
	"Party presidency" : "Stranački presjednik",
	"Party President" : "Stranački presjednik",
	"See results" : "Vidi rezultate",
	"Expires tomorrow" : "Ističe sutra",

// articles
	"Report abuse" : "Prijavi",
	"today" : "danas",
	"yesterday" : "jučer",
	"one hour ago" : "prije sat vremena",
	"Unsubscribe" : "poništi pretplatu",
	"Subscribe" : "Preplati se",
	"Article RSS" : "Article RSS",
	"Your comment" : "tvoj komentar",
	"View all comments" : "Prikaži sve komentare",
	"Subscribe to comments" : "Pretplati se na komentare",
	"Unsubscribe to comments" : "suprotno",
	"Post a comment" : "Komentiraj",
// news
	"You do not have a newspaper" : "Ne posjeduješ novine",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Uglavnom nisam ima volje prevest.",
// profiles
	"Friends" : "Prijatelji",
	"Fights" : "Borbe",
	"National Rank" : "Nacionalni rank",
	"Forfeit Points" : "Forfeit Points",
	"ShareThis" : "pdjeli",
	"Shout something:" : "izjavi nešto:",
	"Assets" : "Imovina",
	"Press director" : "Glavni urednik",
	"Inventory" : "Inventorij",
	"Get Gold" : "Kupi zlato",
	"Career" : "Karijera",
	"Bio" : "Bio",
	"Employee" : "zaposlenik",
	"No political activity" : "Bez političke aktivnosti",
	"Wellness" : "Zdravlje",
	"Level" : "Razina",
	"Strength" : "Snaga",
	"Experience" : "Iskustvo",
	"Skills:" : "Skillovi",
	"Land" : "Rudar",
	"Manufacturing" : "Pekar",
	"Erepublik Age" : "Rođendan",
	"Get Extra Storage" : "Kupi dodatni inventorij",
	"Party Member" : "Član Stranke",
	"No activity" : "Bez aktivnosti",
	"Total damage:" : "Šteta:",
	"Hard Worker" : "Uzoran radnik",
	"Work for 30 days in a row" : "30 dana rada u nizu",
	"Congress Member" : "Zastupnik",
	"Country President" : "Presjednik",
	"Win the Presidential elections" : "Pobijedi na presjedničkim izborima",
	"Media Mogul" : "Medijski div",
	"Reach 1000 subscribers to your newspaper" : "Dosegni 1000 pretplatnika",
	"Battle Hero" : "Heroj",
	"Reach the highest total damage in one battle" : "Učini najveću štetu u bitci",
	"Resistance Hero" : "Seljački heroj",
	"Start a resistance war and liberate that region" : "Započni seljačku bunu i oslobodi regiju",
	"Super Soldier" : "Super vojnik",
	"Advanced 5 strength levels" : "Advanced 5 strength levels",
	"Society Builder" : "Pozivatelj iliti varalica",
	"Invite 10 people to eRepublik and help them reach level 6" : "Pozovi 10 prijatelja i pomozi im da dosegnu razinu 6",
	"Check your unlocked features" : "Provjeri otključane mogućnosti",
	"Achievements" : "Uspjesi",
	"Edit profile" : "Uredi profil",
	"Edit Profile" : "Uredi profil",
	"Change residence" : "Promjeni prebivalište",
	"Donations list" : "Lista donacija",
	
	"Your email here" : "tvoj e-mail",
	"Your birthday" : "Rođendan",
	"Citizen Avatar" : "Avatar",
	"Change password" : "Promjeni zaporku",


	"Worked 30 days in a row" : "30 dana rada u nizu",
	"Win the Congress elections": "Pobjedi na zastupničkim izborima",
// fight
	"Back to battlefield" : "Vrati se na bojište",
	"Fight Again" : "Udri bre",
	"Fight bonus" : "Bonus",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Per effettuare il login come Organizzazione devi prima sloggarti con il tuo account da cittadino e rifare il login con gli username e password della tua Organizzazione.",
	"My Organizations" : "Moje organizacije",
	"Logout" : "odjavi se",
	"Organizations created by you:" : "Tvoje organizacije:",
	"You have not created any organization yet." : "Još nemaš organizaciju.",
// career-path
	"General manager" : "Vlasnik i Direktor",
	"Hard worker" : "Crnogorac nisi",
// ranking
	"No." : "Broj",
	"Hard worker" : "Mrav",
// messages
        "Inbox" : "Primljena",
	"Sent" : "Poslano",
	"Alerts" : "Napomene",
	"Subscriptions" : "Pretplate",
	"new article" : "novi članak",
	"Write article" : "napiši članak",
	"Edit newspaper details" : "Uredi detalje novina",
	"Edit" : "Uredi",
	"Delete" : "Izbriši",
	"Read Message" : "Pročitaj",
	"Reply" : "Odgovori",
	"From" : "Od",
	"Back" : "Vrati se",
	"Picture" : "Slika",
	"only JPG files allowed" : "samo .jpg tip je dopušten",
	"Publish" : "Objavi",
// flash menu
	"My places > Army" : "Vojska",
	"My places > Newspaper" : "Novine",
	"My places > Organizations" : "Organizacije",

// menu	
	"Find out more" : "Informiraj se",
	"logout" : "Odjavi se"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 saveznici\\i";
regexps["^Active wars in (.*)$"] = "Aktivni ratovi $1";
regexps["(\\s*)Expires in (\\d*) days"] = "ističe $2 dana";
regexps["^(\\d*) comments$"] = "$1 komentari";
regexps["^(\\d*) hours ago$"] = "$1 prije sat vremena";
regexps["^(\\d*) minutes ago$"] = "$1 prije minut";
regexps["^(\\d*) days ago$"] = "$1 giorni fa";
regexps["^Regions \\((\\d*)\\)"] = "Regioni ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Amici ($1)";
regexps["^(\\d*) months"] = "$1 mesi";
regexps["^Comments(.*)"] = "Komentari $1";


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