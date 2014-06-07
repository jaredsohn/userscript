// ==UserScript==
// @name           hjfh
// @description    sdfsdf
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Početna",
	"Donate" : "Daruj",
	"May" : "Maj",
	"June" : "Juni",
	"July" : "Juli",
	"Day" : "Dan ",
	"of the New World" : " novog Svijeta",
	"Rank"   : "Poredak",
	"Company" : "Kompanija", 
	"Profile":"Profil", 
	"Party" : "Stranka", 
	"Newspaper" :"Novine",
	"Army" : "Vojska",
	"Country administration" : "Državna administracija",
        "Organizations" : "Organizacije",
	"Market" : "Market",
	"Monetary market" : "Monetarni market",
	"Job market" : "Nađi posao",
        "Companies for sale" : "Kompanije na prodaju",
        "Get gold &amp; extras" : "Dobi zlato&well.extra",
	"Rankings" : "Poredak",
	"Social stats" : "Socijalni status",
	"Economic stats" : "Ekonomski status",
	"Political stats" : "Politički status",
	"Military stats" : "Vojni status",
	"Tools" : "Alati",
	"Forum" : "Forum",
	"News" : "Novosti",
	"Invite friends" : "Pozovi prijatelja",
	"eRepublik Shop" : "eRepublik prodaja",
	"Career path" : "Karijera",
	"Ok, thanks, next tip" : "Ok,hvala,sljedeći savjet",
	"I have nothing more to say at the moment" : "Nemam više ništa da ti kažem",
	"Select" : "Odaberi",
        "Latest events" : "Posljednji događaji",
		"News" : "Novosti",
        "More events" : "Više događaja",
        "More news" : "Više novosti",
		"more news" : "više novosti",
	"Marketplace" : "Pijaca",
	"Wars" : "Ratovi",
        "My Places" : "Moja mjesta",
        "Info" : "Info",
        "Community" : "Zajednica",
        "Day of the new world" : "Dan novog svijeta",
        "National" : "Nacionalno",	
        "International" : "Internacionalno",
		"Latest Events" : "Zadnji događaji",
        "Shouts" : "Oglasi se",
        "Shout something" : "Oglasi se",
        "Shout" : "Oglasi se",
        "Official" : "Zvanično",
        "Everyone" : "Svi",
        "Lates" : "Kasnije",
        "Search citizen" : "Traži građanina",
	"Shout" : "Oglasi se",
	"Latest" : "Zadnje izdane",
	"one minute ago" : "minutu prije",
	"for 10 shouts/day and more" : "za 10 oglašavanja/dnevno i više",
	"No more shouts for today" : "Nema više oglašavanja za danas ",
	"Top Rated" : "Najbolje ocijenjene",

// country page

            "On the Map" : "Na karti",

            "Total citizens" : "Ukupno građana",

            "New citizens today" : "Novih građana danas",

            "Average citizen level" : "prosječan level građanina",

            "Online now": "trenutno online",

            "Citizens" : "Građani",

            "Who" : "Tko",

            "details" : "detalji",

            "Society" : "Društvo",

            "Economy" : "Ekonomija",

            "Politics" : "Politika",

            "Military" : "Vojska",

            "Administration" : "Administracija",

           

// countries

            "Argentina" : "Argentina",

            "Australia" : "Australija",

            "Austria" : "Austrija",

            "Bosnia and Herzegovina" : "Bosna i Hercegovina",

            "Brazil" : "Brazil",

            "Bulgaria" : "Bugarska",

            "China" : "Kina",

            "Croatia" : "Hrvatska",

            "Canada" : "Kanada",

            "Czech Republic" : "Češka Republika",

            "Denmark" : "Danska",

            "Estonia" : "Estonija",

            "Finland" : "Finska",

            "France" : "Francuska",

            "Germany" : "Njemačka",

            "Greece" : "Grčka",

            "Hungary" : "Mađarska",

            "Indonesia" : "Indonesija",

            "Ireland" : "Irska",

            "Israel" : "Izrael",

            "Italy" : "Italija",

            "Iran" : "Iran",

            "Japan" : "Japan",

            "Latvia" : "Latvija",

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

            "South Africa" : "Južna Afrika",

            "South Korea" : "Južna Koreja",

            "Slovakia" : "Slovačka",

            "Slovenia" : "Slovenija",

            "Switzerland" : "Švicarska",

            "Spain" : "Španija",

            "Sweden" : "Švedska",

            "Russia" : "Rusija",

            "Thailand" : "Tajland",

            "United Kingdom" : "Velika Britanija",

            "Ukraine" : "Ukrajina",

            "USA" : "SAD",

            "Turkey" : "Turska",

            "World" : "Svijet",

// economy

            "GOLD" : "ZLATO",

            "Gold" : "Zlato",

            "Treasury" : "Blagajna",

            "All accounts" : "Svi računi",

            "Country trading embargoes" : "Međudržavni prekid trgovine",

            "Taxes" : "Porezi",

            "food" : "hrana",

            "gift" : "pokloni",

            "weapon" : "oružje",

            "moving tickets" : "putne karte",

            "grain" : "kukuruz",

            "diamonds" : "dijamanti",

            "iron" : "željezo",

            "oil"  : "nafta",

            "wood" : "drvo",

            "house" : "kuća",

            "hospital" : "bolnica",

            "defense system" : "odbrambeni sistem",

            "Defense system" : "Odbrambeni sistem",

 

 

            "Salary" : "Plata",

            "Minimum" : "Minimalna",

            "Average" : "Prosječna",

 

            "Gross domestic product (GDP)" : "Bruto dobit proizvoda (BDP)",

            "Monthly exports" : "Mjesečni izvoz",

            "Monthly imports" : "Mjesečni uvoz",

            "Inflation" : "Inflacija"


// company
            "Office" : "Ured",
            "You have already worked today." : "Vi ste već radili danas",
            "Come back tomorrow." : "Dođite sutra ponovo.",
            "Resign" : "Otkaz",
            "Employees" : "Radnici",
            "Raw materials" : "Sirovine",
            "Show all employees" : "Pokaži zaposlene",
            "Show all donations" : "Pokaži donacije",
            "Go to marketplace" : "Pijaca",
            "Products" : "Proizvodi",
            "Jobs available in this company" : "Dostupni poslovi",
            "You do not have any active job offers" : "Nemate otvorenih radnih mjesta",
            "The company offers no products in this market" : "Kompanija nema ponuda na pijaci",
            "Amount" : "Količina",
            "Price" : "Cijena",
            "Price with taxes" : "Cijena sa porezom",
            "Company Page" : "Stranica kompanije",
            "Today" : "Danas",
            "Yesterday" : "Jučer",
            "All employees" : "Svi zaposlenici",
            "Skill" : "Vještina",
            "Daily salary" : "Dnevna plata",
            "Last presence" : "Zadnja prisutnost",
            "Minimum country wage" : "Minimalna državna plata",
 
            "Grain" : "Žito",
            "Food" : "Hrana",
            "Gift" : "Poklon",
            "Weapon" : "Oružje",
            "Moving Tickets" : "Prevozna karta",
            "Diamonds" : "Dijamanti",
            "Iron" : "Željezo",
            "Oil"  : "Nafta",
            "Wood" : "Drvo",
            "House" : "Kuća",
            "Hospital" : "Bolnica",
            "Defense System" : "Odbranbeni sistem",
// market
            "Quality Level" : "Nivo kvalitete",
            "All levels" : "Svi nivoi",
            "Level 1" : "Nivo 1",
            "Level 2" : "Nivo 2",
            "Level 3" : "Nivo 3",
            "Level 4" : "Nivo 4",
            "Level 5" : "Nivo 5",
 
            "Provider" : "Ponuđivač",
            "Quality" : "Kvaliteta",
            "Stock" : "Zalihe",
            "Buy" : "Kupiti",
            "Market" : "Pijaca",
 
            "Market offers" : "Ponuda na pijaci",
            "Amount" : "Količina",
            "Price" : "Cijena",
            "Next" : "Sljedeće",
            "Prev" : "Prethodno",
            "No products in this market" : "Nema ponuda na ovoj pijaci",
            "Go to marketplace" : "Otići na pijacu",
            "Jobs available in this company" : "Poslovi dostupni u ovoj kompaniji",
            "You don't have any active job offers" : "Nemate aktivnih ponuda za posao",
            "You didn't specify the amount of products you wish to buy" :
                        "Niste napisali količinu koju želite kupiti",
            "You cannot trade with this country as you are at war with it" :
                        "Ne možete trgovati sa ovom državom zbog ratnog stanja",
 
// region
            "Citizens" : "Građani",
            "Country - Society" : "Država - Društvo",
        "Heal" : "Liječenje",
            "Constructions": "Zgrade",
            "Population": "Populacija",
            "Productivity" : "Produkcija",
            "Resistance War" : "Ustanak",
            "Resistance War Active" : "Ustanak je aktivan",
            "You can't start a resistance war in this region because it already belongs to its original owner country" : "Ne možete podići ustanak u ovoj regiji jer ona već pripada državi čije je vlasništvo",
            "Medium" : "Srednje",
            "High": "Visoko",
            "Neighbors" : "Komšije",


// Marketplace
            "Please Select An Industry To See The Marketplace Offers" : "Molimo Izaberite Industriju Da Vidite Ponudu",
            "Skill Level" : "Level Skilla ", 
            "All Skills" : " Svi Skillovi",       
     "All" : " Sve",
 // Politics
            "Country Administration" : "Državna Administracija",
            "Accepted" : "Prihvaćeno",
            "Rejected" : " Odbijeno ",
  "Pending" : " Odlučuje Se",
            "Congress" : " Kongres",
            "Issue Money" : " Izdavanje Novca",
            "Law Proposals" : " Prijedlog Zakona"           ,
 "Minimum Wage" : " Minimalna Plata ",
            "Mutual Protection Pact" : " Pakt O Međusobnoj Zaštiti" ,      
     "Peace Proposal" : " Prijedlog Primirja"   ,  
       "President" : " Predsjednik",
            "Yes" : "Da",
            "No" : "Ne",
            "Show All Law Proposals" : "Prikaži Sve Zakonske Prijedloge",
            "The Law Voting Process Takes 24 Hours." : " Izglasavanje Zakona Traje 24 Sata",
            "Only Congress Members And Country Presidents Have The Right To Vote." : "Samo Kongresmeni I Predsjednik Države Imaju Pravo Glasati",

            "You Are Not A President Or A Congress Member In This Country." : "Vi Niste Predsjednik Niti Član Kongresa U Ovoj Državi",
// Wars
            "No Allies" : "Nema Saveznika",
            "All Wars" : "Svi Ratovi",
            "All Resistance Wars" : " Svi Oslobodilački  Ratovi",
            "All Alliances" : "Svi Savezi",
            "Alliances" : "Savezi",
            "Military Force" : "Vojna",
            "Average Strength" : "Prosječna Snaga",
            "War > Battlefield" : "Rat>Bojište",
            "Basic Damage" : "Osnovna Šteta",
            "Weapon Quality" : "Kvaliteta Oružja",
            "Wellness" : "Wellness",
            "Rank" : "Čin",
            "Total Damage" : "Ukupna Šteta",
           

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 alleato\\i";
regexps["^Active wars in (.*)$"] = "Guerre attive in $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Scade tra $2 giorni";
regexps["^(\\d*) comments$"] = "$1 commenti";
regexps["^(\\d*) hours ago$"] = "$1 ore fa";
regexps["^(\\d*) minutes ago$"] = "$1 minuti fa";
regexps["^(\\d*) days ago$"] = "$1 giorni fa";
regexps["^Regions \\((\\d*)\\)"] = "Regioni ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Amici ($1)";
regexps["^(\\d*) months"] = "$1 mesi";
regexps["^Comments(.*)"] = "Commenti $1";


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





