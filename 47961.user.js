// ==UserScript==
// @name           eRepublik magyar fordítás
// @description    eRepublik magyar fordítás
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Otthon",
	"Donate" : "Adományozás",
	"Rank"   : "Helyezés",
	"Company" : "Munkahely", 
	"Profile":"Profil", 
	"Party" : "Pártok", 
	"Newspaper" :"Újságok",
	"Army" : "Hadsereg",
	"Country administration" : "Ország irányítás",
        "Organizations" : "Szervezetek",
	"Market place" : "Piac",
	"Monetary market" : "Valuta piac",
	"Job market" : "Állásajánlatok",
        "Companies for sale" : "Eladó cégek",
        "Get gold &amp; extras" : "Arany &amp; extrák",
	"Rankings" : "Rangsor",
	"Social stats" : "Szociális statisztikák",
	"Economic stats" : "Gazdasági statisztikák",
	"Political stats" : "Politikai adatok",
	"Military stats" : "Katonai adatok",
	"Tools" : "Eszközök",
	"Forum" : "Fórum",
	"News" : "Újság",
	"Invite friends" : "Barátok meghívása",
	"eRepublik Shop" : "eRepublik Bolt",
	"Career path" : "Karrier útvonal",
	"Ok, thanks, next tip" : "Köszi, kérem a következő tippet",
	"I have nothing more to say at the moment" : "Nincs semmi mondanivalóm jelenleg",
	"Select" : "Válassz",

	"Marketplace" : "Piac",
	"Wars" : "Háborúk",

// country page
	"On the Map" : "Térképen",
	"Total citizens" : "Teljes népesség",
	"New citizens today" : "Új lakók ma",
	"Average citizen level" : "Lakók átlag szintje",
	"Online now": "Jelenleg belépve",
	"Citizens" : "Lakosság",
	"Who" : "Kik",
	"details" : "részletek",
	"Society" : "Társadalom",
	"Economy" : "Gazdaság",
	"Politics" : "Politika",
	"Military" : "Katonaság",
	"Administration" : "Adminisztráció",
	
// countries
	"Argentina" : "Argentína",
	"Australia" : "Ausztrália",
	"Austria" : "Ausztria",
	"Bosnia and Herzegovina" : "Bosznia-Hercegovina",
	"Brazil" : "Brazília",
	"Bulgaria" : "Bulgária",
	"China" : "Kína",
	"Croatia" : "Horvátország",
	"Canada" : "Kanada",
	"Czech Republic" : "Cseh Köztársaság",
	"Denmark" : "Dánia",
	"Estonia" : "Észtország",
	"Finland" : "Finnország",
	"France" : "Franciaország",
	"Germany" : "Németország",
	"Greece" : "Görögország",
	"Hungary" : "Magyarország",
	"Indonesia" : "Indonézia",
	"Ireland" : "Írország",
	"Israel" : "Izrael",
	"Italy" : "Olaszország",
	"Iran" : "Irán",
	"Japan" : "Japán",
	"Latvia" : "Lettország",
	"Lithuania" : "Litvánia",
	"Malaysia" : "Malajzia",
	"Mexico" : "Mexikó",
	"Moldavia" : "Moldova",
	"Netherlands" : "Hollandia",
	"Norway" : "Norvégia",
	"Pakistan" : "Pakisztán",
	"Philippines" : "Fülöp-szigetek",
	"Poland" : "Lengyelország",
	"Portugal" : "Portugália",
	"Romania" : "Románia",
	"Serbia" : "Szerbia",
	"Singapore" : "Szingapúr",
	"South Africa" : "Dél-Afrika",
	"South Korea" : "Dél-Korea",
	"Slovakia" : "Szlovákia",
	"Slovenia" : "Szlovénia",
	"Switzerland" : "Svájc",
	"Spain" : "Spanyolország",
	"Sweden" : "Svédország",
	"Russia" : "Oroszország",
	"Thailand" : "Thaiföld",
	"United Kingdom" : "Egyesült Királyság",
	"Ukraine" : "Ukrajna",
	"USA" : "Amerikai Egyesült Államok",
	"Turkey" : "Törökország",
	"World" : "Világ",
// economy
	"GOLD" : "Arany",
	"Gold" : "Arany",
	"Treasury" : "Kincstár",
	"All accounts" : "Az összes számla",
	"Country trading embargoes" : "Kereskedelmi embargók",
	"Taxes" : "Adók",
	"food" : "élelmiszer",
	"gift" : "ajándék",
	"weapon" : "fegyver",
	"moving tickets" : "repülőjegyek",
	"grain" : "búza",
	"diamonds" : "gyémántok",
	"iron" : "vas",
	"oil"  : "olaj",
	"wood" : "fa",
	"house" : "ház",
	"hospital" : "kórház",
	"defense system" : "védelmi rendszer",

	"Salary" : "Bérek",
	"Minimum" : "Minimum",
	"Average" : "Átlag",

	"Gross domestic product (GDP)" : "Bruttó hazai termék (GDP)",
	"Monthly exports" : "Havi export",
	"Monthly imports" : "Havi import",
	"Inflation" : "Infláció",
// company
	"Office" : "Iroda",
	"You have already worked today." : "Ma már dolgoztál.",
	"Come back tomorrow." : "Gyere vissza holnap.",
	"Resign" : "Kilépés",
	"Employees" : "Munkások",
	"Raw materials" : "Nyersanyagok",
	"Show all employees" : "Az összes munkás megtekintése",
	"Show all donations" : "Az összes adomány megtekintése",
	"Go to marketplace" : "Piac megtekintése",
	"Products" : "Termékek",

	"Grain" : "Búza",
	"Food" : "Élelmiszer",
	"Gift" : "Ajándék",
	"Weapon" : "Fegyver",
	"Moving Tickets" : "Repülőjegyek",
	"Diamonds" : "Gyémántok",
	"Iron" : "Vas",
	"Oil"  : "Olaj",
	"Wood" : "Fa",
	"House" : "Ház",
	"Hospital" : "Kórház",
	"Defense System" : "Védelmi Rendszer",
// market
	"Quality Level" : "Minőségi szint",
	"All levels" : "Minden szintüt",
	"Level 1" : "1-es szintü",
	"Level 2" : "2-es szintü",
	"Level 3" : "3-as szintü",
	"Level 4" : "4-es szintü",
	"Level 5" : "5-ös szintü",

	"Provider" : "Eladó",
	"Quality" : "Minőség",
	"Stock" : "Készlet",
	"Buy" : "Vétel",
	"Market" : "Piac",

	"Market offers" : "Piaci ajánlatok",
	"Amount" : "Mennyiség",
	"Price" : "Ár",
	"Next" : "Következő",
	"Prev" : "Előző",
	"No products in this market" : "Nincs termék a piacon",
	"Go to marketplace" : "A piac megtekintése",
	"Jobs available in this company" : "Munkahely ajánlatok ennél a cégnél",
	"You don't have any active job offers" : "Nincsen aktív ajánlat",
	"You didn't specify the amount of products you wish to buy" : 
		"Nem adtad meg, hogy mennyit akarsz vásárolni",
	"You cannot trade with this country as you are at war with it" :
		"Nem kereskedhetsz ezzel az országgal, amíg háborúban álltok vele",

// region
        "Heal" : "Gyógyulás",
	"Constructions": "Építmények",
	"Population": "Lakosság",
	"Productivity" : "Termelés",
	"Resistance War" : "Forradalom",
	"Resistance War Active" : "Forradalom zajlik",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Itt nem tudsz forradalmat kezdeni, mivel ez a terület az eredeti tulajdonosához tartozik",
	"Medium" : "Közepes",
	"High": "Magas",
	"Neighbors" : "Szomszédok",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Válassz egy iparágat, hogy láthasd a piaci ajánlatokat",
	"Skill Level" : "Tudás szint",
	"All skills" : "Minden szinten",
	"All" : "Mindet",
// politics
	"Country Administration" : "Ország adminisztráció",
	"Accepted" : "Elfogadva",
	"Rejected" : "Elutasítva",
  "Pending" : "Függőben",
	"Congress" : "Parlament",
	"Issue Money" : "Pénzkibocsátás",
	"Law proposals" : "Törvényjavaslatok",
	"Minimum Wage" : "Minimálbér",
	"Mutual Protection Pact" : "Kölcsönös védelmi megállapodás",
	"Peace Proposal" : "Békejavaslat",
	"President" : "Elnök",
	"Yes" : "Igen",
	"No" : "Nem",
	"Show all law proposals" : "Az összes törvényjavaslat mutatása",
	"The law voting process takes 24 hours." : "A szavazás 24 óráig tart.",
	"Only congress members and country presidents have the right to vote." : "Csak kongresszusi tag vagy az ország elnöke szavazhat.",
	"You are not a president or a congress member in this country." : "Te nem vagy elnök vagy kongresszusi tag ebben az országban.",
// wars
	"no allies" : "nincs szöv.",
	"All wars" : "Az összes háború",
	"All resistance wars" : "Az összes forradalom",
	"All Alliances" : "Összes Szövetséges",
	"Alliances" : "Szövetségesek",
	"Military force" : "Katonai erő",
	"Average strength" : "Átlagos erő",
// army
	"You have trained today. You can train again tomorrow." : "Ma már edzettél. Holnap újra gyakorolhatsz.",
	"Force" : "Erő",
	"Military rank" : "Katonai rang",
	"Military achievements" : "Katonai eredmények",
	"Active wars list" : "Aktív háborúk listája",
	"Sergeant" : "Őrmester",
	"Corporal" : "Tizedes",
	"Private" : "Közlegény",
	"Show active wars" : "Aktív háborúk megtekintése",
	"Start a resistance war" : "Forradalom indítása",

	"You cannot join this fight because your country is not involved in the war" : "Nem harcolhatsz, mert az országod nem vesz részt a háborúban",
	"There are no resistance wars in this country." : "Nincs forradalom ebben az országban.",
	"until the region can be occupied or secured" : "amíg a régiót elfoglalják, vagy megvédik",
	"Attackable on President's decision" : "Támadható az Elnök döntése alapján",
	"Defense Points" : "Védelmi Pontok",
	"Go to Battlefield" : "Irány a csatatér",
	"see finished battles" : "befejezett csaták",
	"Wars list" : "Háborúk listája",
	"War" : "Háború",
	"Battle history" : "Csata történet",
	"Fight" : "Harc!",
	"Hero" : "Hős",
	"Started by" : "Indította",
// party
	"You are not a member of a party" : "Nem vagy párttag",
	"Join a party" : "Belépni egy pártba...",
	"Create new" : "Új létrehozása",
	"Join" : "Csatlakozás",
	"See all members" : "Tagok listája",
	"Donate Gold" : "Arany adományozása",
	"Members"  : "Tagok",
	"Orientation" : "Orientáció",
	"Show all members" : "Az összes tag megtekintése",

	"Center" : "Közép",
	"Anarchist" : "Anarchista",
	"Accounts" : "Számlák",
	"Elections" : "Választások",
	"Election results" : "Választási eredmények",
	"Next elections" : "Következő választás",

	"Country Presidency" : "Ország elnökség",
	"Party Presidency" : "Pártelnökség",
	"Party President" : "Párt elnök",
	"See results" : "Eredmények",
	"Expires tomorrow" : "Lejár holnap",

// articles
	"Report abuse" : "Visszaélés jelentése",
	"today" : "ma",
	"yesterday" : "tegnap",
	"one hour ago" : "egy órája",
	"Unsubscribe" : "Leiratkozás",
	"Subscribe" : "Feliratkozás",
	"Article RSS" : "Cikk RSS-e",
	"Your comment" : "Megjegyzésed",
	"View all comments" : "Az összes megjegyzés",
	"Subscribe to comments" : "Feliratkozás a megjegyzésekre",
	"Unsubscribe to comments" : "Leiratkozás a megjegyzésekről",
	"Post a comment" : "Megjegyzés küldése",
// news
	"You do not have a newspaper" : "Nem rendelkezel újsággal",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Az újság a leghatékonyabb mód, hogy közöld a híreidet az eRepublik világával. Erről többet olvashatsz az eRepublik Wikin. Hozd létre saját újságodat.",
// profiles
	"Friends" : "Barátok",
	"Assets" : "Vagyon",
	"Press director" : "Újság főszerkesztő",
	"Inventory" : "Felszerelés",
	"Get Gold" : "Arany szerzése",
	"Career" : "Karrier",
	"Bio" : "Egészség",
	"Employee" : "Dolgozó",
	"No political activity" : "Nem párt tag",
	"Wellness" : "Egészség",
	"Level" : "Szint",
	"Strength" : "Erő",
	"Experience" : "Tapasztalat",
	"Skills:" : "Képességek",
	"Land" : "Mezőgazdasági",
	"Manufacturing" : "Ipari",
	"Erepublik Age" : "Erepublikbeli kora",
	"Get Extra Storage" : "Extra hely szerzése",
	"Party Member" : "Párttag",
	"No activity" : "Nincs aktivitás",
	"Total damage:" : "Összes sebzés:",
	"Hard Worker" : "Szorgalmas dolgozó",
	"Work for 30 days in a row" : "Egyhuzamban dolgozott 30 napon keresztül",
	"Congress Member" : "Kongresszustag",
	"Country President" : "Miniszterelnök",
	"Win the Presidential elections" : "Megnyerte a miniszterelnök választást",
	"Media Mogul" : "Médiamogul",
	"Reach 1000 subscribers to your newspaper" : "Elérte az 1000 újságelőfizetőt",
	"Battle Hero" : "Csatahős",
	"Reach the highest total damage in one battle" : "A legtöbb kárt okozta egy csatában",
	"Resistance Hero" : "Forradalom hős",
	"Start a resistance war and liberate that region" : "Forradalmat indított és felszabadította a régiót",
	"Super Soldier" : "Szuper katona",
	"Advance 5 strength levels" : "Elérte az 5-ös erőt",
	"Society Builder" : "Társaság építő",
	"Invite 10 people to eRepublik and help them reach level 6" : "Meghívott 10 embert az eRepublikra és segített nekik elérni a 6-os szintet",
	"Check your unlocked features" : "Nézd meg az elérhető funkcióidat",
	"Achievements" : "Eredmények",
	"Edit profile" : "Profil szerkesztése",
	"Edit Profile" : "Profil Szerkesztése",
	"Change residence" : "Lakóhelyváltás",
	"Donations list" : "Adomány lista",
	
	"Your email here" : "Email címed",
	"Your birthday" : "Születésnapod",
	"Citizen Avatar" : "Avatárod",
	"Change password" : "Jelszó változtatás",


	"Worked 30 days in a row" : "30 napig dolgozott egyfolytában",
	"Win the Congress elections": "Képviselő választást nyert",
// fight
	"Back to battlefield" : "Vissza a csatatérre",
	"Fight Again" : "Újra Harcolni",
	"Fight bonus" : "Harci bónusz",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "A szervezethez való bejelentkezéshez ki kell lépned a polgárod fiókjából és be kell jelentkezned a szervezet nevével és jelszavával.",
	"My Organizations" : "Szervezeteim",
	"Logout" : "Kilépés",
	"Organizations created by you:" : "Általad létrehozott szervezetek:",
// career-path
	"General manager" : "Vezérigazgató",
	"Hard worker" : "Szorgalmas dolgozó",
// ranking
	"No." : "Helyezés",
	"Hard worker" : "Szorgalmas dolgozó",
// messages
        "Inbox" : "Bejövő",
	"Sent" : "Elküldött",
	"Alerts" : "Figyelmeztetések",
	"Subscriptions" : "Feliratkozások",
	"new article" : "új cikk",
	"Delete" : "Töröld",
	"Read Message" : "Üzenet olvasása",
	"Reply" : "Válasz",
	"From" : "Feladó",
// flash menu
	"My places > Army" : "Katonaság",
	"My places > Newspaper" : "Újságok",
	"My places > Organizations" : "Szervezetek",

// menu	
	"Find out more" : "Több erről",
	"logout" : "kilépés"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 szövetséges";
regexps["^Active wars in (.*)$"] = "Aktív háborúk $1-ban";
regexps["(\\s*)Expires in (\\d*) days"] = "Lejár $2 napon belül";
regexps["^(\\d*) comments$"] = "$1 megjegyzés";
regexps["^(\\d*) hours ago$"] = "$1 órája";
regexps["^(\\d*) minutes ago$"] = "$1 perce";
regexps["^(\\d*) days ago$"] = "$1 napja";
regexps["^Regions \\((\\d*)\\)"] = "Régiók ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Barátok ($1)";
regexps["^(\\d*) months"] = "$1 hónap";
regexps["^Comments(.*)"] = "Megjegyzés$1";


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




