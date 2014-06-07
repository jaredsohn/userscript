// ==UserScript==
// @name eRepublik hrvatski prijevod
// @namespace inchy
// @description eRepublik croatian
// @include http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Pocetna stranica",
	"Donate" : "Doniraj",
	"May" : "Svibanj",
	"June" : "Lipanj",
	"July" : "Srpanj",
	"Day" : "Dan ",
	"of the New World" : " Novog Svijeta",
	"Rank"   : "Pozicija",
	"Company" : "Tvrtka", 
	"Profile":"Profil", 
	"Party" : "Politicka stranka", 
	"Newspaper" :"Novine",
	"Army" : "Vojska",
	"Country administration" : "Drzavna administracija",
        "Organizations" : "Organizacija",
	"Market" : "Trgovina",
	"Monetary market" : "Monetarno trziste",
	"Job market" : "Ponude za posao",
        "Companies for sale" : "Tvrtke na prodaji",
        "Get gold &amp; extras" : "Kupi zlato",
	"Rankings" : "Statistike",
	"Social stats" : "Socijalni status",
	"Economic stats" : "Ekonomski status",
	"Political stats" : "Politicki status",
	"Military stats" : "Vojni status",
	"Tools" : "Alati",
	"Forum" : "Forum",
	"News" : "Novosti",
	"Invite friends" : "Pozovi prijatelja",
	"eRepublik Shop" : "eRepublik Trgovina",
	"Career path" : "Put kroz karijeru",
	"Ok, thanks, next tip" : "Dobro, hvala, sljedeci savjet",
	"I have nothing more to say at the moment" : "Nemam nista za reci ti vise ovog trenutka",
	"Select" : "Oznaci",
        "Latest events" : "Zadnji dogadjaji",
		"News" : "Novosti",
        "More events" : "Vise dogadjanja",
        "More news" : "Vise novosti",
		"more news" : "Vise novosti",
	"Marketplace" : "Trgovina",
	"Wars" : "Ratovi",
        "My Places" : "Moja odredista",
        "Info" : "Info",
        "Community" : "Zajednica",
        "Day of the new world" : "Dan Novog Svijeta",
        "National" : "Nacijonalni",
        "International" : "Internacijonalni",
		"Latest Events" : "Zadnji dogadjaji",
        "Shouts" : "Povici",
        "Shout something" : "Povikni nesto",
        "Shout" : "Povik",
        "Official" : "Sluzbeni",
        "Everyone" : "Svatko",
        "Lates" : "Kasni",
        "Search citizen" : "Potrazi egradjana",
	"Shout" : "Povik",
	"Latest" : "Najsvjezije",
	"one minute ago" : "prije minutu",
	"for 10 shouts/day and more" : "za 10 povika po danu dodaj",
	"No more shouts for today" : "Nemate vise povika za danas ",
	"Top Rated" : "Top clanci",

// country page
	"On the Map" : "Na karti",
	"Total citizens" : "Ukupno stanovnika",
	"New citizens today" : "Novih stanovnika danas",
	"Average citizen level" : "Prosjecni level stanovnistva",
	"Online now": "Na mrezi sada",
	"Citizens" : "Stanovnici",
	"Who" : "Tko",
	"details" : "Detalji",
	"Society" : "Drustvo",
	"Economy" : "Ekonomija",
	"Politics" : "Politika",
	"Military" : "Vojska",
	"Administration" : "Administracija",
	
// countries
	"Argentina" : "Argentina",
	"Australia" : "Australija",
	"Austria" : "Austria",
	"Bosnia and Herzegovina" : "Bosna i Hercegovina",
	"Brazil" : "Brazil",
	"Bulgaria" : "Bugarska",
	"China" : "Kina",
	"Croatia" : "Hrvatska",
	"Canada" : "Kanada",
	"Czech Republic" : "Ceska Republika",
	"Denmark" : "Danska",
	"Estonia" : "Estonija",
	"Finland" : "Finska",
	"France" : "Francuska",
	"Germany" : "Njemacka",
	"Greece" : "Grcka",
	"Hungary" : "Madjarska",
	"Indonesia" : "Indonezija",
	"Ireland" : "Irska",
	"Israel" : "Izrael",
	"Italy" : "Italija",
	"Iran" : "Iran",
	"Japan" : "Japan",
	"Latvia" : "Latvija",
	"Lithuania" : "Litva",
	"Malaysia" : "Malezija",
	"Mexico" : "Meksiko",
	"Moldavia" : "Moldavija",
	"Netherlands" : "Nizozemska",
	"Norway" : "Norveska",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filipini",
	"Poland" : "Poljska",
	"Portugal" : "Portugal",
	"Romania" : "Romunjska",
	"Serbia" : "Srbija",
	"Singapore" : "Singapur",
	"South Africa" : "Juznoafricka Republika",
	"South Korea" : "Juzna Koreja",
	"Slovakia" : "Slovacka",
	"Slovenia" : "Slovenija",
	"Switzerland" : "Svicarska",
	"Spain" : "Spanjolska",
	"Sweden" : "Svedska",
	"Russia" : "Rusija",
	"Thailand" : "Tajland",
	"United Kingdom" : "Ujedinjeno Kraljevstvo",
	"Ukraine" : "Ukrajina",
	"USA" : "SAD",
	"Turkey" : "Turska",
	"World" : "Svijet",
// economy
	"GOLD" : "ZLATO",
	"Gold" : "Zlato",
	"Treasury" : "Blagajna",
	"All accounts" : "Svi racuni",
	"Country trading embargoes" : "Embargo",
	"Taxes" : "Porezi",
	"food" : "hrana",
	"gift" : "poklon",
	"weapon" : "oruzje",
	"moving tickets" : "karte za prijevoz",
	"grain" : "zito",
	"diamonds" : "dijamanti",
	"iron" : "zeljezo",
	"oil"  : "nafta",
	"wood" : "drvo",
	"house" : "kuce",
	"hospital" : "bolnice",
	"defense system" : "obrambeni sistemi",
	"Defense system" : "Obrambeni sistemi",


	"Salary" : "Placa",
	"Minimum" : "Minimalac",
	"Average" : "Prosijecna",

	"Gross domestic product (GDP)" : "Bruto domaci proizvod (BDP)",
	"Monthly exports" : "Mjesecni izvoz",
	"Monthly imports" : "Mjesecni uvoz",
	"Inflation" : "Inflacija",
// company
	"Office" : "Ured",
	"You have already worked today." : "Vec ste radili danas.",
	"Come back tomorrow." : "Dodite sutra.",
	"Resign" : "Daj otkaz",
	"Employees" : "Zaposlenici",
	"Raw materials" : "Sirovine",
	"Show all employees" : "Pokazi sve zaposlenike",
	"Show all donations" : "Pokazi sve donacije",
	"Go to marketplace" : "Trgovina",
	"Products" : "Proizvodi",
	"Jobs available in this company" : "Dostupna poslovna mjesta u tvrtci",
	"You do not have any active job offers" : "Nema dostupnih poslovnih mjesta",
	"The company offers no products in this market" : "Tvrtka nema proizvoda na prodaji",
	"Amount" : "Kolicina",
	"Price" : "Cijena",
	"Price with taxes" : "Cijena sa porezom",
	"Company Page" : "Stranica tvrtke",
	"Today" : "Danas",
	"Yesterday" : "Jucer",
	"All employees" : "Svi zaposlenici",
	"Skill" : "Vjestina",
	"Daily salary" : "Dnevna placa",
	"Last presence" : "Poslijednja prisutnost",
	"Minimum country wage" : "Minimalac u drzavi",

	"Grain" : "Zito",
	"Food" : "Hrana",
	"Gift" : "Pokloni",
	"Weapon" : "Oruzje",
	"Moving Tickets" : "Karte za prijevoz",
	"Diamonds" : "Dijamanti",
	"Iron" : "Zeljezo",
	"Oil"  : "Nafta",
	"Wood" : "Drvo",
	"House" : "Kuce",
	"Hospital" : "Bolnice",
	"Defense System" : "Obrambeni sistemi",
// market
	"Quality Level" : "Kvaliteta",
	"All levels" : "Sve razine",
	"Level 1" : "Razina 1",
	"Level 2" : "Razina 2",
	"Level 3" : "Razina 3",
	"Level 4" : "Razina 4",
	"Level 5" : "Razina 5",

	"Provider" : "Proizvodjac",
	"Quality" : "Kvaliteta",
	"Stock" : "Zalihe",
	"Buy" : "Kupi",
	"Market" : "Trgovina",

	"Market offers" : "Ponude u trgovini",
	"Amount" : "Kolicina",
	"Price" : "Cijena",
	"Next" : "Sljedeca",
	"Prev" : "Poslijednja",
	"No products in this market" : "Nema proizvoda u trgovini",
	"Go to marketplace" : "Idi u trgovinu",
	"Jobs available in this company" : "Dostupna poslovna mjesta u tvrtci",
	"You don't have any active job offers" : "Nemate niti jedan dostupan posao u tvrtci",
	"You didn't specify the amount of products you wish to buy" : 
		"Niste odredili kolicinu proizvoda koju zelite kupiti",
	"You cannot trade with this country as you are at war with it" :
		"Ne mozete trgovati sa ovom drzavom jer ste u ratu sa njom",

// region
	"Citizens" : "Stanovnici",
	"Country - Society" : "Drzava - Drustvo",
        "Heal" : "Izlijeci",
	"Constructions": "Objekti",
	"Population": "Populacija",
	"Productivity" : "Proizvodnja",
	"Resistance War" : "Oslobodilacki rat",
	"Resistance War Active" : "Aktivni oslobodilacki rat",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Ne mozete zapoceti oslobodilacki rat na ovim prostorima, jer to vec spada u svoju prvobitnu drzavu",
	"Medium" : "Srednje",
	"High": "Visoko",
	"Neighbors" : "Susjedi",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Molimo odaberite industriju za koju zelite vidjeti ponude",
	"Skill Level" : "Razina vjestine",
	"All skills" : "Sve vjestine",
	"All" : "Sve",
// politics
	"Country Administration" : "Drzavna administracija",
	"Accepted" : "Prihvati",
	"Rejected" : "Odbij",
  "Pending" : "Na cekanju",
	"Congress" : "Sabor",
	"Issue Money" : "Tiskanje novca",
	"Law proposals" : "Novi zakon",
	"Minimum Wage" : "Minimalac",
	"Mutual Protection Pact" : "Saveznistvo",
	"Peace Proposal" : "Prijedlog za mir",
	"President" : "Predsjednik",
	"Yes" : "Da",
	"No" : "Ne",
	"Show all law proposals" : "Pokazi sve prijedloge zakona",
	"The law voting process takes 24 hours." : "Izglasavanje zakona traje 24 sata.",
	"Only congress members and country presidents have the right to vote." : "Samo saborni zastupnici i predsjednici drzave imaju pravo glasati.",
	"You are not a president or a congress member in this country." : "Nisi saborni zastupnik ili predsjednik ove drzave.",
// wars
	"no allies" : "bez saveznika",
	"All wars" : "Svi ratovi",
	"All resistance wars" : "Svi oslobodilacki ratovi",
	"All Alliances" : "Sva saveznistva",
	"Alliances" : "Saveznistva",
	"Military force" : "Vojna sila",
	"Average strength" : "Prosjecna snaga",
	"War > Battlefield" : "Rat > Bojiste",
	"Basic damage" : "Osnovna steta",
	"Weapon quality" : "Kvaliteta oruzija",
	"Wellness" : "Zivotna snaga",
	"Rank" : "Cin",
	"Total damage" : "Ukupna steta",
	
// army
	"You have trained today. You can train again tomorrow." : "Danas ste vec trenirali. Dodjite sutra.",
	"Force" : "Snaga",
	"Military rank" : "Vojni cin",
	"Military achievements" : "Vojna postignuca",
	"Active wars list" : "Lista aktivnih ratova",
	"Sergeant" : "Narednik",
	"Corporal" : "Kaplar",
	"Private" : "Vojnik",
	"Show active wars" : "Pokazi aktivne ratove",
	"Start a Resistance War" : "Pokreni oslobodilacki rat",
	"You do not have the necessary amount of Gold to start a resistance war." : "Nemate dovoljnu kolicinu zlata za pokretanje oslobodilackog rata",
	"You cannot join this fight because your country is not involved in the war" : "Ne mozete se borit jer vasa drzava nije ukljucena u ovaj rat",
	"There are no resistance wars in this country." : "U ovoj drzavi nema aktivnih oslobodilackih ratova.",
	"until the region can be occupied or secured" : "dok regija nije okupirana ili zadrzana",
	"Attackable on President's decision" : "Moguce napasati preko predsjednikove odluke",
	"Defense Points" : "Obrambeni bodovi",
	"Go to Battlefield" : "Idi na bojiste",
	"see finished battles" : "pogledaj zavrsene bitke",
	"Wars list" : "Lista ratova",
	"War" : "Rat",
	"Battle history" : "Povijest bitke",
	"Fight" : "Bori se",
	"Hero" : "Heroj",
	"Started by" : "Zapoceo ",
	"started by" : "Zapoceo ",
	"Fight for resistance" : "Bori se za pobunjenike",
	"Fight for defenders" : "Bori se za obranioce",
// party
	"Get more" : "Dobiti vise",
	"Country presidency" : "Predsjednik drzave",
	"Winner" : "Pobjednik",
	"Next election in" : "Sljedeci izbori za ",
	"Next elections in" : "Sljedeci izbori za ",
	"No candidate proposed" : "Nema predlozenih kandidata",
	"candidates" : "kandidati",
	"Candidate" : "Kandidati",
	"days" : "dani",
	"GOLD" : "ZLATO",
	"Show results" : "Pokazi rezultate",
	"Show candidate list" : "Pokazi listu kandidata",
	"Show candidates list" : "Pokazi listu kandidata",
	"You are not a member of a party" : "Nisi clan politicke stranke",
	"Join a party" : "Pridruzi se stranci",
	"Create new" : "Napravi novu stranku",
	"congress members" : " clanovi",
	"of Congress" : " Sabora",
	"Show proposed members of congress" : "Kandidati za sabor",
	"Run for congress" : "Kandidiraj se za sabor",
	"Join" : "Pridruzi se",
	"See all members" : "Pogledaj sve clanove",
	"Donate Gold" : "Doniraj zlato",
	"Members"  : "Clanovi",
	"Orientation" : "Orijentacija",
	"Show all members" : "Prikazi sve clanove",

	"Center" : "Centralisti",
	"Anarchist" : "Anarhist",
	"Accounts" : "Racuni",
	"Elections" : "Izbori",
	"Election results" : "Rezultati izbora",
	"Next elections" : "Sljedeci izbori",

	"Country Presidency" : "Predsjednik drzave",
	"Party presidency" : "Predsjednik stranke",
	"Party President" : "Predsjednik stranke",
	"See results" : "Pogledaj rezultate",
	"Expires tomorrow" : "Istice sutra",

// articles
	"Report abuse" : "Prijavi vrijedanje",
	"today" : "danas",
	"yesterday" : "jucer",
	"one hour ago" : "prije sat vremena",
	"Unsubscribe" : "Otkazi pretplatu",
	"Subscribe" : "Pretplati se",
	"Article RSS" : "Clanak RSS",
	"Your comment" : "Tvoj komentar",
	"View all comments" : "Vidi sve komentare",
	"Subscribe to comments" : "Prati komentare",
	"Unsubscribe to comments" : "Ne zelim pratiti komentare",
	"Post a comment" : "Ostavi komentar",
// news
	"You do not have a newspaper" : "Vi nemate novine",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "	
Novine su efikasan nacin za objavljivanje vasih vijesti u eRepublik svijetu. Procitajte vise na eRepublik Wiki. Kreirati vlastite novine.",
// profiles
	"Friends" : "Prijatelji",
	"Fights" : "Borbe",
	"National Rank" : "Pozicija u drzavi",
	"Forfeit Points" : "Kazneni bodovi",
	"ShareThis" : "Podijeli ovo",
	"Shout something:" : "Vikni nesto:",
	"Assets" : "Imovina",
	"Press director" : "Vlasnik novina",
	"Inventory" : "Inventar",
	"Get Gold" : "Dobavi gold",
	"Career" : "Karijera",
	"Bio" : "O vama",
	"Employee" : "Zaposlenik",
	"No political activity" : "Bez politicke aktivnosti",
	"Wellness" : "Zivotna snaga",
	"Level" : "Razina",
	"Strength" : "Snaga",
	"Experience" : "Iskustvo",
	"Skills:" : "Vjestina",
	"Land" : "Agrarna vjestina",
	"Manufacturing" : "Proizvodjacka vjestina",
	"Erepublik Age" : "Starost u eRepublik-u",
	"Get Extra Storage" : "Kupi dodatni prostor",
	"Party Member" : "Clan politicke stranke",
	"No activity" : "Bez aktivnosti",
	"Total damage:" : "Ukupna steta:",
	"Hard Worker" : "Marljiv radnik",
	"Work for 30 days in a row" : "Radili ste 30 dana zaredom",
	"Congress Member" : "Clan sabora",
	"Country President" : "Predsjednik drzave",
	"Win the Presidential elections" : "Pobijedio/la na predsjednicikm izborima",
	"Media Mogul" : "Medijski mogul",
	"Reach 1000 subscribers to your newspaper" : "Sakupi 1000 pretplatnika na svoje novine",
	"Battle Hero" : "Heroj u borbi",
	"Reach the highest total damage in one battle" : "Dosegni najvecu stetu u jednoj borbi",
	"Resistance Hero" : "Oslobodilacki heroj",
	"Start a resistance war and liberate that region" : "Pokreni oslobodilacki rat i oslobodi pokrajinu",
	"Super Soldier" : "Super Vojnik",
	"Advanced 5 strength levels" : "Dosegli ste snagu razine 5",
	"Society Builder" : "Graditelj drustva",
	"Invite 10 people to eRepublik and help them reach level 6" : "Pozovi 10 ljudi na eRepublik i pomogni im da dodju do razine 6",
	"Check your unlocked features" : "Provjeri svoje otkljucane mogucnosti",
	"Achievements" : "Postignuca",
	"Edit profile" : "Izmjeni svoj profil",
	"Edit Profile" : "Izmjeni svoj profil",
	"Change residence" : "Promijeni prebivaliste",
	"Donations list" : "Lista donacija",
	
	"Your email here" : "Vas e-mail",
	"Your birthday" : "Vas datum rodjenja",
	"Citizen Avatar" : "Slika vaseg gradjana",
	"Change password" : "Promijeni sifru",


	"Worked 30 days in a row" : "Radili ste 30 dana zaredom",
	"Win the Congress elections": "Pobijedi na izborima za sabor",
// fight
	"Back to battlefield" : "Vrati se na bojiste",
	"Fight Again" : "Ponovno se boriti",
	"Fight bonus" : "Bonus za borbu",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Kako bi ste se prijavili na racun organizacije morate se prvo odjaviti sa svojeg glavnog racuna i prijaviti se ponovno sa imenom i sifrom vase organizacije.",
	"My Organizations" : "Moje organizacije",
	"Logout" : "Odjava",
	"Organizations created by you:" : "Organizacije napravljene od strane Vas:",
	"You have not created any organization yet." : "Niste napravili niti jednu organizaciju.",
// career-path
	"General manager" : "Vlasnik tvrtke",
	"Hard worker" : "Marljiv radnik",
// ranking
	"No." : "Br.",
	"Hard worker" : "Marljiv radnike",
// messages
        "Inbox" : "Primljenje",
	"Sent" : "Poslane",
	"Alerts" : "Obavijesti",
	"Subscriptions" : "Pretplate",
	"new article" : "novi clanci",
	"Write article" : "Napisi clanak",
	"Edit newspaper details" : "Izmijeni detalje svojih novina",
	"Edit" : "Izmijeni",
	"Delete" : "Obrisi",
	"Read Message" : "Procitaj poruku",
	"Reply" : "Odgovori",
	"From" : "Od",
	"Back" : "Natrag",
	"Picture" : "Slika",
	"only JPG files allowed" : "samo JPG format je dozvoljen",
	"Publish" : "Objavi",
// flash menu
	"My places > Army" : "Vojska",
	"My places > Newspaper" : "Novine",
	"My places > Organizations" : "Organizacije",

// menu	
	"Find out more" : "Potrazi vise",
	"logout" : "Odjava"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 saveznika\\i";
regexps["^Active wars in (.*)$"] = "Aktivni ratovi u $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Istice za $2 dana";
regexps["^(\\d*) comments$"] = "$1 komentara";
regexps["^(\\d*) hours ago$"] = "prije $1 sati";
regexps["^(\\d*) minutes ago$"] = "prije $1 minuta";
regexps["^(\\d*) days ago$"] = "prije $1 dana";
regexps["^Regions \\((\\d*)\\)"] = "Regije ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 mjeseci";
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