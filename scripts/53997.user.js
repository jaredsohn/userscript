// ==UserScript==
// @name           eRepublik na srpskom
// @description    Prevod eRepublik-a na srpski, baziran na hrvatskom prevodu od joza13
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Početna",
	"Donate" : "Donacije",
	"May" : "Maj",
	"June" : "Jun",
	"July" : "Jul",
	"Day" : "Dan",
	"of the New World" : " novog sveta",
	"Rank"   : "Rang",
	"Company" : "Firma", 
	"Profile":"Profil", 
	"Party" : "Stranka", 
	"Newspaper" :"Novine",
	"Army" : "Vojska",
	"Country administration" : "Državna administracija",
        "Organizations" : "Organizacije",
	"Market" : "Tržište",
	"Monetary market" : "Tržište novca",
	"Job market" : "Tržište rada",
        "Companies for sale" : "Firme na prodaju",
        "Get gold &amp; extras" : "Kupi zlato i ostalo",
	"Rankings" : "Poretci",
	"Social stats" : "Društvene statistike",
	"Economic stats" : "Ekonomske statistike",
	"Political stats" : "Političke statistike",
	"Military stats" : "Vojne statistike",
	"Tools" : "Alati",
	"Forum" : "Forum",
	"News" : "Vesti",
	"Invite friends" : "Pozovi prijatelja",
	"eRepublik Shop" : "eRepublik Shop",
	"Career path" : "Karijera",
	"Ok, thanks, next tip" : "U redu, hvala, sledeći savet ",
	"I have nothing more to say at the moment" : "Trenutno, nemam ništa pametno da kažem",
	"Select" : "Odaberi",
        "Latest events" : "Poslednji događaji",
		"News" : "Vesti",
        "More events" : "Ostali događaji",
        "More news" : "Ostale vesti",
		"more news" : "Još vesti",
	"Marketplace" : "Trgovina",
	"Wars" : "Ratovi",
        "My Places" : "Moj profil",
        "Info" : "Info",
        "Community" : "Društvo",
        "Day of the new world" : "Dan novog sveta",
        "National" : "Nacionalni",
        "International" : "Međunarodni",
		"Latest Events" : "Poslednji događaji",
        "Shouts" : "Izjave",
        "Shout something" : "Izjavi nešto",
        "Shout" : "Izjavi",
        "Official" : "Službeni",
        "Everyone" : "Svi",
        "Lates" : "Poslednji",
        "Search citizen" : "Traži",
	"Shout" : "Izjava",
	"Latest" : "Poslednji",
	"one minute ago" : "pre jednog minuta",
	"for 10 shouts/day and more" : "10 izjava na dan i više",
	"No more shouts for today" : "Nema više izjava za danas ",
	"Top Rated" : "Najbolji",

// country page
	"On the Map" : "Na mapi",
	"Total citizens" : "Broj stanovnika",
	"New citizens today" : "Novih stanovnika danas",
	"Average citizen level" : "Prosečni nivo stanovnika",
	"Online now": "Na mreži trenutno",
	"Citizens" : "Stanovnici",
	"Who" : "Ko",
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
	"Czech Republic" : "Češka republika",
	"Denmark" : "Danska",
	"Estonia" : "Estonia",
	"Finland" : "Finska",
	"France" : "Francuska",
	"Germany" : "Nemačka",
	"Greece" : "Grčka",
	"Hungary" : "Mađarska",
	"Indonesia" : "Indonezija",
	"Ireland" : "Irska",
	"Israel" : "Izrael",
	"Italy" : "Italija",
	"Iran" : "Iran",
	"Japan" : "Japan",
	"Latvia" : "Letonija",
	"Lithuania" : "Litvanija",
	"Malaysia" : "Malezija",
	"Mexico" : "Meksiko",
	"Moldavia" : "Moldavija",
	"Netherlands" : "Holandija",
	"Norway" : "Norveška",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filipini",
	"Poland" : "Poljska",
	"Portugal" : "Portugal",
	"Romania" : "Rumunija",
	"Serbia" : "Srbija",
	"Singapore" : "Singapur",
	"South Africa" : "Južnoafrička republika",
	"South Korea" : "Južna Koreja",
	"Slovakia" : "Slovačka",
	"Slovenia" : "Slovenija",
	"Switzerland" : "Teokratska Švajcarska",
	"Spain" : "Španija",
	"Sweden" : "Švedska",
	"Russia" : "Rusija",
	"Thailand" : "Thajland",
	"United Kingdom" : "Ujedinjeno kraljevstvo",
	"Ukraine" : "Ukraina",
	"USA" : "SAD",
	"Turkey" : "Turska",
	"World" : "Svet",
// economy
	"GOLD" : "ZLATO",
	"Gold" : "Zlato",
	"Treasury" : "Državna blagajna",
	"All accounts" : "Svi računi",
	"Country trading embargoes" : "Trgovinske sankcije",
	"Taxes" : "porezi",
	"food" : "hrana",
	"gift" : "pokloni",
	"weapon" : "oružje",
	"moving tickets" : "avionske karte",
	"grain" : "žitarice",
	"diamonds" : "dijamanti",
	"iron" : "gvožđe",
	"oil"  : "nafta",
	"wood" : "drvo",
	"house" : "kuća",
	"hospital" : "bolnica",
	"defense system" : "odbrambeni sistem",
	"Defense system" : "Odbrambeni sistem",


	"Salary" : "Plata",
	"Minimum" : "Minimum",
	"Average" : "Prosek",

	"Gross domestic product (GDP)" : "Bruto domaći proizvod(BDP)",
	"Monthly exports" : "Mesečni izvoz",
	"Monthly imports" : "Mesečni uvoz",
	"Inflation" : "Inflacija",
// company
	"Office" : "Kancelarija",
	"You have already worked today." : "Već si radio/la danas.",
	"Come back tomorrow." : "Vrati se sutra.",
	"Resign" : "Daj ostavku",
	"Employees" : "Zaposleni",
	"Raw materials" : "Sirovine",
	"Show all employees" : "Prikaži sve zaposlene",
	"Show all donations" : "Prikaži sve donacije",
	"Go to marketplace" : "Poseti trgovinu",
	"Products" : "Proizvodi",
	"Jobs available in this company" : "Slobodna radna mjesta u firmi",
	"You do not have any active job offers" : "Nemate ni jednu poslovnu ponudu",
	"The company offers no products in this market" : "nema ponude",
	"Amount" : "Količina",
	"Price" : "Cena",
	"Price with taxes" : "Cena s PDV-om",
	"Company Page" : "Firmina stranica",
	"Today" : "Danas",
	"Yesterday" : "Juče",
	"All employees" : "Svi zaposleni",
	"Skill" : "Umešnost",
	"Daily salary" : "Plata",
	"Last presence" : "Poslednja prisutnost",
	"Minimum country wage" : "Minimalac",

	"Grain" : "Žitarice",
	"Food" : "Hrana",
	"Gift" : "Pokloni",
	"Weapon" : "Oružje",
	"Moving Tickets" : "Avionske karte",
	"Diamonds" : "Dijamanti",
	"Iron" : "Gvožđe",
	"Oil"  : "Nafta",
	"Wood" : "Drvo",
	"House" : "Kuća",
	"Hospital" : "Bolnica",
	"Defense System" : "Odbrambeni sistem",
// market
	"Quality Level" : "Nivo kvaliteta",
	"All levels" : "Svi nivoi",
	"Level 1" : "Nivo 1",
	"Level 2" : "Nivo 2",
	"Level 3" : "Nivo 3",
	"Level 4" : "Nivo 4",
	"Level 5" : "Nivo 5",

	"Provider" : "Nabavljač",
	"Quality" : "Kvalitet",
	"Stock" : "Zaliha",
	"Buy" : "Kupi",
	"Market" : "Tržište",

	"Market offers" : "Ponude",
	"Amount" : "Količina",
	"Price" : "Cena",
	"Next" : "Sledeća",
	"Prev" : "Prethodna",
	"No products in this market" : "Nema ponude",
	"Go to marketplace" : "Poseti tržište",
	"Jobs available in this company" : "Slobodna radna mesta",
	"You don't have any active job offers" : "Nema slobodnih mesta",
	"You didn't specify the amount of products you wish to buy" : 
		"Niste naveli količinu proizvoda koji želite da kupite",
	"You cannot trade with this country as you are at war with it" :
		"Nemožete trgovati s državom s kojom ste u ratu",

// region
	"Citizens" : "Stanovnici",
	"Country - Society" : "Država - Društvo",
        "Heal" : "Izleči",
	"Constructions": "Građevine",
	"Population": "Populacija",
	"Productivity" : "Produktivnost",
	"Resistance War" : "Buna",
	"Resistance War Active" : "Aktivna buna",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Ne možeš da zapošneš bunu u ovoj regiji jer već pripada originalnoj državi",
	"Medium" : "Srednje",
	"High": "Visoko",
	"Neighbors" : "Komšije",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Izaberi tip industrije da bi video tržišne ponude",
	"Skill Level" : "Nivo umešnosti",
	"All skills" : "Sve umešnosti",
	"All" : "Svi",
// politics
	"Country Administration" : "Državna administracija",
	"Accepted" : "Prihvaćeno",
	"Rejected" : "Odbijeno",
  "Pending" : "Glasanje u toku",
	"Congress" : "Skupština",
	"Issue Money" : "Štampaj pare",
	"Law proposals" : "Predlozi zakona",
	"Minimum Wage" : "Minimalac",
	"Mutual Protection Pact" : "Pakt o međusobnoj zaštiti",
	"Peace Proposal" : "Predlog mirovnog sporazuma",
	"President" : "Predsednik",
	"Yes" : "Da",
	"No" : "Ne",
	"Show all law proposals" : "Prikaži sve predloge zakona",
	"The law voting process takes 24 hours." : "Glasanje traje 24 sata.",
	"Only congress members and country presidents have the right to vote." : "Samo poslanici i predsednici imaju pravo glasa.",
	"You are not a president or a congress member in this country." : "Niti si ni predsednik ni poslanik u ovoj državi.",
// wars
	"no allies" : "Bez saveznika",
	"All wars" : "Svi ratovi",
	"All resistance wars" : "Sve bune",
	"All Alliances" : "Svi saveznici",
	"Alliances" : "Saveznici",
	"Military force" : "Vojna sila",
	"Average strength" : "Prosečna snaga",
	"War > Battlefield" : "Rat > Ratište",
	"Basic damage" : "Osnovna šteta",
	"Weapon quality" : "Kvalitet oružja",
	"Wellness" : "Zdravlje",
	"Rank" : "Čin",
	"Total damage" : "Ukupna šteta",
	
// army
	"You have trained today. You can train again tomorrow." : "Trenirao si danas, vrati se sutra.",
	"Force" : "Snaga",
	"Military rank" : "Čin",
	"Military achievements" : "Vojni uspesi",
	"Active wars list" : "Lista aktivnih ratova",
	"Sergeant" : "Narednik",
	"Corporal" : "Kaplar",
	"Private" : "Redov",
	"Show active wars" : "Pokaži aktivne ratove",
	"Start a Resistance War" : "Započni bunu",
	"You do not have the necessary amount of Gold to start a resistance war." : "Nemaš dovoljno zlata da započneš bunu.",
	"You cannot join this fight because your country is not involved in the war" : "Nemožeš da se boriš jer tvoja zemlja nije umešana.",
	"There are no resistance wars in this country." : "Nema buna u Državi.",
	"until the region can be occupied or secured" : "Dok regija ne bude okupirana ili odbranjena",
	"Attackable on President's decision" : "Napad na predsednikovu odluku",
	"Defense Points" : "Odbrambeni poeni",
	"Go to Battlefield" : "Poseti ratište",
	"see finished battles" : "Pogledaj završene bitke",
	"Wars list" : "Lista ratova",
	"War" : "Rat",
	"Battle history" : "Istorija bitke",
	"Fight" : "Bori se",
	"Hero" : "Heroj",
	"Started by" : "Započeto od ",
	"started by" : "Započeto od ",
	"Fight for resistance" : "Bori se za otpor",
	"Fight for defenders" : "Bori se za odbranu",
// party
	"Get more" : "ostalo",
	"Country presidency" : "Predsednik",
	"Winner" : "Pobednik",
	"Next election in" : "Sledeći izbori ",
	"Next elections in" : "Sledeći izbori ",
	"No candidate proposed" : "Nema predloženih kandidata",
	"candidates" : "Kandidati",
	"Candidate" : "Kandidat",
	"days" : "dana",
	"GOLD" : "Zlato",
	"Show results" : "Prikaži rezultate",
	"Show candidate list" : "Prikaži listu kandidata",
	"Show candidates list" : "Prikaži listu kandidata",
	"You are not a member of a party" : "Nisi član stranke",
	"Join a party" : "Učlani se u stranku",
	"Create new" : "Osnuj novu",
	"congress members" : "poslanici",
	"of Congress" : "Skupštine",
	"Show proposed members of congress" : "Prikaži predložene kandidate za poslanike",
	"Run for congress" : "Kandiduj se za poslanika",
	"Join" : "Učlani se",
	"See all members" : "Prikaži sve članove",
	"Donate Gold" : "Doniraj zlato",
	"Members"  : "Članovi",
	"Orientation" : "Orjentacija",
	"Show all members" : "Prikaži sve članove",

	"Center" : "Centar",
	"Anarchist" : "Anarhisti",
	"Accounts" : "Računi",
	"Elections" : "Izbori",
	"Election results" : "Rezultati izbora",
	"Next elections" : "Sledeći izbori",

	"Country Presidency" : "Predsednik",
	"Party presidency" : "Predsednik stranke",
	"Party President" : "Predsednik stranke",
	"See results" : "Vidi rezultate",
	"Expires tomorrow" : "Ističe sutra",

// articles
	"Report abuse" : "Prijavi",
	"today" : "danas",
	"yesterday" : "juče",
	"one hour ago" : "pre sat vremena",
	"Unsubscribe" : "poništi pretplatu",
	"Subscribe" : "Pretplati se",
	"Article RSS" : "RSS članka",
	"Your comment" : "Tvoj komentar",
	"View all comments" : "Prikaži sve komentare",
	"Subscribe to comments" : "Pretplati se na komentare",
	"Unsubscribe to comments" : "Poništi pretplatu na komentare",
	"Post a comment" : "Ostavi komentar",
// news
	"You do not have a newspaper" : "Ne poseduješ novine",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Novine su efikasan način za komuniciranje vesti eRepublik svetu. Pročitaj više na eRepublik wikiju. Napravi svoje novine.",
// profiles
	"Friends" : "Prijatelji",
	"Fights" : "Borbe",
	"National Rank" : "Nacionalni rang",
	"Forfeit Points" : "Poeni varanja",
	"ShareThis" : "Podeli",
	"Shout something:" : "Izjavi nešto:",
	"Assets" : "Imovina",
	"Press director" : "Glavni urednik",
	"Inventory" : "Imovina",
	"Get Gold" : "Kupi zlato",
	"Career" : "Karijera",
	"Bio" : "Bio",
	"Employee" : "Zaposlen",
	"No political activity" : "Bez političke aktivnosti",
	"Wellness" : "Zdravlje",
	"Level" : "Nivo",
	"Strength" : "Snaga",
	"Experience" : "Iskustvo",
	"Skills:" : "Umeće",
	"Land" : "Zemlja",
	"Manufacturing" : "Manufaktura",
	"Erepublik Age" : "Rođendan",
	"Get Extra Storage" : "Kupi dodatna mesta za imovinu",
	"Party Member" : "Član stranke",
	"No activity" : "Bez aktivnosti",
	"Total damage:" : "Ukupna šteta:",
	"Hard Worker" : "Uzoran radnik",
	"Work for 30 days in a row" : "30 dana rada u nizu",
	"Congress Member" : "Poslanik",
	"Country President" : "Predsednik",
	"Win the Presidential elections" : "Pobedio na predsedničkim izborima",
	"Media Mogul" : "Medijski div",
	"Reach 1000 subscribers to your newspaper" : "Dosegni 1000 pretplatnika",
	"Battle Hero" : "Heroj",
	"Reach the highest total damage in one battle" : "Učini najveću štetu u bitci",
	"Resistance Hero" : "Heroj otpora",
	"Start a resistance war and liberate that region" : "Započni bunu i oslobodi regiju",
	"Super Soldier" : "Super vojnik",
	"Advanced 5 strength levels" : "Napredovao 5 nivoa snage",
	"Society Builder" : "Gradilac društva",
	"Invite 10 people to eRepublik and help them reach level 6" : "Pozovi 10 prijatelja i pomozi im da dosegnu razinu 6",
	"Check your unlocked features" : "Proveri otključane mogućnosti",
	"Achievements" : "Uspesi",
	"Edit profile" : "Uredi profil",
	"Edit Profile" : "Uredi profil",
	"Change residence" : "Promeni prebivalište",
	"Donations list" : "Lista donacija",
	
	"Your email here" : "Tvoj e-mail",
	"Your birthday" : "Rođendan",
	"Citizen Avatar" : "Avatar",
	"Change password" : "Promjeni šifru",


	"Worked 30 days in a row" : "30 dana rada u nizu",
	"Win the Congress elections": "Pobedi na izborima za skupštinu",
// fight
	"Back to battlefield" : "Vrati se na ratište",
	"Fight Again" : "Bori se ponovo",
	"Fight bonus" : "Bonus",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Da bi se ulogovao kao organizacija, moraš da se izloguješ iz svog profila i uloguješ sa organizacijinim korisničkim imenom i šifrom.",
	"My Organizations" : "Moje organizacije",
	"Logout" : "Odjavi se",
	"Organizations created by you:" : "Tvoje organizacije:",
	"You have not created any organization yet." : "Još nemaš organizaciju.",
// career-path
	"General manager" : "Menadžer",
	"Hard worker" : "Uzoran radnik",
// ranking
	"No." : "Broj",
	"Hard worker" : "Uzoran radnik",
// messages
        "Inbox" : "Primljeno",
	"Sent" : "Poslato",
	"Alerts" : "Obaveštenja",
	"Subscriptions" : "Pretplate",
	"new article" : "novi članak",
	"Write article" : "Napiši članak",
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
	"Find out more" : "Informiši se",
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
regexps["^(\\d*) hours ago$"] = "$1 sati ranije";
regexps["^(\\d*) minutes ago$"] = "$1 minuta ranije";
regexps["^(\\d*) days ago$"] = "$1 dana ranije";
regexps["^Regions \\((\\d*)\\)"] = "Regioni ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 meseci";
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
