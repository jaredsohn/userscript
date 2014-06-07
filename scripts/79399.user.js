// ==UserScript==
// @name Casus Yazılım
// @version 26.1
// @namespace SpyDefHelper
// @description www.ikariam.forumm.biz
// @include http://s*.ikariam.*/index.php*
// @history 26.2 added ua-language
// @history 26.1 added rs-language
// @history 26.0 updater can handle downtimes of userscripts.org
// @history 25.4 modified ae-language
// @history 25.3 added cz-language
// @history 25.3 added ar-language
// @history 25.2 added bg-language
// @history 25.2 added sk-language
// @history 25.1 added ee-language
// @history 25.0 notify events
// @history 24.1 added mx-language
// @history 24.0 update number of defending spyies on "send spy"
// @history 22.0 displays "<=" or ">=" instead of "="
// @history 21.1 added il-language
// @history 21.0 fixed updatelink
// @history 2.1 added es-language
// @history 2.0 changed updater - no more nags for language-only updates
// @history 1.3 added nl-language
// @history 1.2 added lv-language
// @history 1.1 added it-language
// @history 1.0 overview info-box: added links to each city view
// @history 0.19 added ir-language
// @history 0.18 added se and dk-language
// @history 0.17 send spy: know more before you send your spy
// @history 0.17 overview info-box: separate own cities from occupied/allied cities
// @history 0.16 added net-language (Turkish)
// @history 0.15 added "Bhi"-language (not sure if this works)
// @history 0.15 supports sn.lang,ikariam.com
// @history 0.14 added fr and ae-language
// @history 0.13 added hu-language
// @history 0.12 added fi-language
// @history 0.11 added pl-language
// @history 0.10 added br-language
// @history 0.9 added pt-language
// @history 0.8 overview info-box for trade/city advisor
// @history 0.7 Info Box also displayed inside the hideout
// @history 0.6 added ru-language, fixed detecting hideout defending spies
// @history 0.5 added ScriptUpdater (57756)
// @history 0.4 added gr-language
// @history 0.3 broken - do not use
// @history 0.2 only own citys know defending spies
// @history 0.1 initial release
// ==/UserScript==

// update part 
var scriptName = "SpyDef Helper"
var scriptID = 63347;
var thisVersion="26.2";
var update = "system" // change this if minor updates should be notified

//-----------------------------------------------------------------------------
function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

//-----------------------------------------------------------------------------
var languages = {
	"net": {
"safehouse" : "Istihbarat",
"sendSpy" : "Casus gönderme",
"spyWares" : "Depo gözetleme",
"spyMil" : "garnizona bakma",
"spyOnline" : "Online durumu",
"spyProtect" : "Koruma seviyesi",
"homies" : "Savunan casus sayısı"
},
"org": {
		"safehouse"	: "Safehouse",
		"sendSpy"	: "Send out spy",
		"spyWares"	: "Inspect warehouse",
		"spyMil"	: "Spy out garrison",
		"spyOnline"	: "Online status",
		"spyProtect"	: "Protection against level ",
		"homies"	: "Spies in defence"
	},
	"ua": { // feelimon
		"safehouse" : "Схованка",
		"sendSpy"   : "Відправити шпигуна",
		"spyWares"  : "Інспектувати склад",
		"spyMil"    : "Інспектувати військо",
		"spyOnline" : "Онлайн статус",
		"spyProtect": "Захист проти Схованки ",
		"homies"    : "Шпигунів в обороні"
	},
	"rs": { // Duje
		"safehouse"	: "Скровиште",
		"sendSpy"	: "Слање шпијуна",
		"spyWares"	: "Шпијунирање складишта",
		"spyMil"	: "Шпијунирање гарнизона",
		"spyOnline"	: "Статус присуства",
		"spyProtect"	: "Заштита против нивоа ",
		"homies"	: "Шпијуни у одбрани" 
	},
	"cz": { // Revix
		"safehouse"	: "Úkryt",
		"sendSpy"	: "Vyslat špeha",
		"spyWares"	: "Prozkoumat skladiště",
		"spyMil"	: "Prozkoumat strážnici",
		"spyOnline"	: "Status připojení",
		"spyProtect"	: "Obrana proti levelu ",
		"homies"	: "Špehové v obraně"
	},
	"ar": { // same as "es"
		"safehouse"	: "Escondite",
		"sendSpy"	: "Riesgo de ser descubierto",
		"spyWares"	: "Inspeccionar depósito",
		"spyMil"	: "Espiar regimiento",
		"spyOnline"	: "Estado de conexión",
		"spyProtect"	: "Nivel de proteccion ",
		"homies"	: "Espias defendiendo"
	},
	"bg": { // samkijot
		"safehouse"	: "Скривалище",
		"sendSpy"	: "Изпрати шпионин",
		"spyWares"	: "Провери склада",
		"spyMil"	: "Шпионирай гарнизона",
		"spyOnline"	: "Онлайн статус",
		"spyProtect"	: "Ниво на скривалището ",
		"homies" 	: "Шпиони в защита"
	},
	"sk": { // TmsK
		"safehouse" : "Úkryt",
		"sendSpy" : "Vyslať špióna",
		"spyWares" : "Preveriť sklady",
		"spyMil" : "Špiónovať vojsko",
		"spyOnline" : "Zistiť online status",
		"spyProtect" : "Ochrana proti levelu",
		"homies" : "Špióni v obrane"
	},
	"ee": { // thx 2 nightwisher
		"safehouse" : "Peidupaik",
		"sendSpy" : "Saada spioon välja",
		"spyWares" : "Inspekteeri ladu",
		"spyMil" : "Luura vägede järgi",
		"spyOnline" : "Kasutaja võrgusolek",
		"spyProtect" : "Kaitsetase ",
		"homies" : "Spioone kaitses"
	},	
	"mx": { // thx 2 Tael
		"safehouse"	: "Escondite",
		"sendSpy"	: "Riesgo de ser descubierto",
		"spyWares"	: "Inspeccionar depósito",
		"spyMil"	: "Espiar regimiento",
		"spyOnline"	: "Estado de conexión",
		"spyProtect"	: "Nivel de proteccion ",
		"homies"	: "Espias defendiendo"
	}, 
	"il": { // thx 2 Mr. A.G
		"safehouse"	: "מקום מחבוא",
		"sendSpy"	: "שלח מרגל",
		"spyWares"	: "בדוק מחסן",
		"spyMil"	: "רגל על חיל המשמר",
		"spyOnline"	: "סטטוס מקוון",
		"spyProtect"	: "שלב מקום מחבוא",
		"homies"	: "מרגלים עובדים בהגנה"
	},
	"es": { // thx 2 Monkey DºLuffy
		"safehouse"	: "Escondite",
		"sendSpy"	: "Riesgo de ser descubierto",
		"spyWares"	: "Inspeccionar depósito",
		"spyMil"	: "Espiar regimiento",
		"spyOnline"	: "Estado de conexión",
		"spyProtect"	: "Nivel de proteccion ",
		"homies"	: "Espias defendiendo"
		},
	"nl": { // thx 2 julianboekhout
		"safehouse"	: "Schuilplaats",
		"sendSpy"	: "spion sturen",
		"spyWares"	: "onderzoek opslagplaats",
		"spyMil"	: "onderzoek garnizoen",
		"spyOnline"	: "Online status",
		"spyProtect"	: "bescherming tegen level ",
		"homies" 	: "spionnen in verdediging"
	},
	"lv": { // jasa2009
		"safehouse"	: "Paslēptuve",
		"sendSpy"	: "Izsūtīt spiegu",
		"spyWares"	: "Izpētīt noliktavu",
		"spyMil"	: "Izspiegot kazarmas",
		"spyOnline"	: "Online statuss",
		"spyProtect"	: "Pret-spiegošanas līmenis ",
		"homies"	: "Spiegi aizsardzībā"
	},
	"it": { // Thx 2 Phate72
		"safehouse"	: "Sicurezza della città",
		"sendSpy"	: "Invio spie",
		"spyWares"	: "Ispezione magazzino",
		"spyMil"	: "Ispezione guarnigione",
		"spyOnline"	: "Stato Online",
		"spyProtect"	: "Livello di protezione",
		"homies" 	: "Spie in difesa"
	},
	"ir": { // Thx 2 ftmhs
		"safehouse"	: "مخفیگاه",
		"sendSpy"	: "ارسال جاسوس",
		"spyWares"	: "تجسس وضعیت مخزن",
		"spyMil"	: "تجسس واحدهای نظامی ",
		"spyOnline"	: "وضعيت ااتصال",
		"spyProtect"	: "حمایت ضد جاسوس",
		"homies"	: "تعداد جاسوس در حال دفاع"
	},
	"se": { // Thx 2 Theo Gonks ll
		"safehouse"	: "Gömställe",
		"sendSpy"	: "Skicka spion",
		"spyWares"	: "Inspektera lagerlokal",
		"spyMil"	: "Spionera på garnisionen",
		"spyOnline"	: "Online status",
		"spyProtect"	: "Skydd mot nivå ",
		"homies"	: "Spionförsvar"
	},
	"dk": { // Thx 2 lovebug
		"safehouse"	: "skjulested",
		"sendSpy"	: "Send spion",
		"spyWares"	: "Inspicer varehus",
		"spyMil"	: "Spioner garnison",
		"spyOnline"	: "Online status",
		"spyProtect"	: "Beskyttet mod niveau ",
		"homies"	: "Spionforsvar"
	},
	"net": { // Thx 2 ercy
		"safehouse"	: "Istihbarat",
		"sendSpy"	: "Casus gönderme",
		"spyWares"	: "Depo gözetleme",
		"spyMil"	: "garnizona bakma",
		"spyOnline"	: "Online durumu",
		"spyProtect"	: "Koruma seviyesi",
		"homies"	: "Savunan casus sayısı"
	},
	"Bih": { // Thx 2 phntom
		"safehouse"	: "Skrivaliste",
		"sendSpy"	: "Poslati spijuna",
		"spyWares"	: "Pregledati skladiste",
		"spyMil"	: "Spijunirati garnizon",
		"spyOnline"	: "Status online",
		"spyProtect"	: "Zastita protiv stepen ",
		"homies"	: "Spijuni u odbrani"
	},
	"ae": { // Thx 2 Samerramez 
		"safehouse"	: "مدة تدريب الجاسوس",
		"sendSpy"	: "ارسال الجاسوس",
		"spyWares"	: "تفتيش وضع المخزن",
		"spyMil"	: "التجسس على الموقع العسكري",
		"spyOnline"	: "وضعية الإتصال",
		"spyProtect"	: "حماية ضد الجواسيس ",
		"homies"	: "عدد الجواسيس في الدفاع"
	},
	"fr": { // Thx 2 phntom
		"safehouse"	: "Cachette",
		"sendSpy"	: "Envoyer un espion",
		"spyWares"	: "Inspecter l'entrepôt",
		"spyMil"	: "Espionner la garnison",
		"spyOnline"	: "Statut en ligne",
		"spyProtect"	: "Protection contre niveau ",
		"homies"	: "Espions en défense"
	},
	"hu": { // Thx 2 lucsecs
		"safehouse"	: "Rejtekhely",
		"sendSpy"	: "Kém kiküldése",
		"spyWares"	: "Raktárépület átnézése",
		"spyMil"	: "Helyőrség kémlelése",
		"spyOnline"	: "Online státusz",
		"spyProtect"	: "Védelem ilyen szint ellen ",
		"homies"	: "Védelmen dolgozó kémek"
	},
	"fi": { // Thx 2 DeFe
		"safehouse"	: "Piilopaikka",
		"sendSpy"	: "Lähetä vakooja",
		"spyWares"	: "Tutki varastorakennus",
		"spyMil"	: "Vakoile kasarmia",
		"spyOnline"	: "Paikallaolotilanne",
		"spyProtect"	: "Suojaus tasolla ",
		"homies" 	: "Vakoojaa puolustuksessa"
	},
	"pl": { // Thx 2 vasquuez
		"safehouse"	: "Kryjówka",
		"sendSpy"	: "Wyślj szpiega",
		"spyWares"	: "Sprawdź magazyn",
		"spyMil"	: "Szpieguj garnizon",
		"spyOnline"	: "Status on-line",
		"spyProtect"	: "Ochrona dla poziomu ",
		"homies"	: "Szpiegów w obronie"
	},
	"br": { // Thx 2 pescossudo
		"safehouse"	: "Espionagem",
		"sendSpy"	: "Enviar espião",
		"spyWares"	: "Inspecionar armazém",
		"spyMil"	: "Espiar guarnição",
		"spyOnline"	: "Online-Status",
		"spyProtect"	: "Proteção contra nivel ",
		"homies"	: "Espiões na defesa"
	},
	"pt": { // Thx 2 yallow
		"safehouse"	: "Espionagem",
		"sendSpy"	: "Enviar Espião",
		"spyWares"	: "Inspecionar o armazém",
		"spyMil"	: "Descobrir guarnição militar",
		"spyOnline"	: "Ver estado",
		"spyProtect"	: "Proteção contra nível ",
		"homies" 	: "Espiões na defesa"
	},
	"gr": { // Thx 2 Napoleon I 
		"safehouse"	: "Κρυσφήγετο",
		"sendSpy" 	: "Αποστολή Κατασκόπου",
		"spyWares" 	: "Επιθεώρησε την αποθήκη εμπορευμάτων",
		"spyMil" 	: "Κατασκόπευσε τη φρουρά",
		"spyOnline"	: "Κατάσταση online",
		"spyProtect"	: "Προστασία έναντι επιπέδου ",
		"homies" 	: "Κατάσκοποι στην άμυνα"
	},
	"ru": { // Thx 2 GrAndAG
		"safehouse"	: "Укрытие",
		"sendSpy"	: "Отправить шпиона",
		"spyWares"	: "Осмотреть склад",
		"spyMil"	: "Шпионаж в гарнизоне",
		"spyOnline"	: "Онлайн статус",
		"spyProtect"	: "Защита против укрытия ",
		"homies"	: "Шпионов в обороне"
	},
	"de": {
		"safehouse"	: "Versteck",
		"sendSpy"	: "Spion senden",
		"spyWares"	: "Lagerstand inspizieren",
		"spyMil"	: "Garnison ausspähen",
		"spyOnline"	: "Online-Status",
		"spyProtect"	: "Schutz gegen Stufe ",
		"homies" 	: "Abwehr-Spione"
	}
};

var cache = {	};
var server = document.domain;
var parts=server.split(".");
var language = languages[parts[parts.length-1]];
if (typeof(language) == "undefined") { language = languages[parts[1]]; // for sn,lang.ikariam.com
	if (typeof(language) == "undefined") { update = "all"; language = languages["org"] }}

//-----------------------------------------------------------------------------
function spyAVKey(name, cityId) {
// one key to save or load a value
	return "SpyAdv@"+server+'_'+name+'_'+cityId
}

//-----------------------------------------------------------------------------
function spyAVsetInt(name, cityId, value) {
// store a value for a name in a city
	GM_setValue(spyAVKey(name, cityId), ''+value);
}

//-----------------------------------------------------------------------------
function spyAVgetInt(name, cityId, defaultValue) {
// load a value for name in a city, try to use the cache and use defaultValue if needed
	var value;
	value = cache[name+cityId];
	if (typeof(value) == "undefined") { value = GM_getValue(spyAVKey(name, cityId), defaultValue)}
	return	parseInt(value);
}

//-----------------------------------------------------------------------------
function spyAVbestTimeByScript(time, script) {
	var regex = /enddate\:\s*(\d+)\D*/.exec(script.text);
	if (!regex) { return time };
	var endDate = parseInt(regex[1]);
	if (time==0 || time>endDate) { return endDate }
	else { return time }
}

//-----------------------------------------------------------------------------
function spyAVgetSecondsNow() {
	return Math.floor( new Date().getTime() / 1000);
}

//-----------------------------------------------------------------------------
function spyAVgetInfosFromHideout(cityId) {
// parse and store the number of spies working in defence for the given cityId
// check the time of the next event (spy return, arrival or traning)
	var defenseInfo = document.getElementById("reportInboxLeft").getElementsByTagName("li");
	var homies = parseInt(/\d+/.exec(defenseInfo[1].firstChild.nodeValue));
	spyAVsetInt("homies", cityId, homies);
	var next=0;
	var countdown = document.getElementById("mainview").getElementsByTagName("script");
	for (var i=0; i < countdown.length; i++) {
		next=spyAVbestTimeByScript(next, (countdown[i]));
	}
	var buildCountDown=document.getElementById("buildCountDown");
	if (buildCountDown) {
		next=spyAVbestTimeByScript(next, (buildCountDown.parentNode.getElementsByTagName("script")[0]));
	}
	if (next==0) {
		var apply = parseInt(/\d+/.exec(defenseInfo[0].firstChild.nodeValue));
		if (apply>0) { next=spyAVgetSecondsNow() }; // spy to train? check NOW!
	};
	spyAVsetInt("next", cityId, next); // when to check next time
}

//-----------------------------------------------------------------------------
function spyAVisOwnCity(cityId) {
// check if the city in view is one of the own cities (including any city where troops are)
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	for (var i=0; i<cities.length; i++)
		{ if (cityId == cities[i].value) { return true }}
	return false;
}

//-----------------------------------------------------------------------------
function spyAVSaveFromBuilding(name, cityId, building) {
// parse the building level and cache the value, store those values of own cities
	if (building.className.toLowerCase() == name.toLowerCase()) //toLowerCase() since "townHall" and "townhall" may occur
	{	var substr = building.getElementsByTagName("a")[0].title.split(" ");
		var level = parseInt(substr[substr.length-1]);
		cache[name+cityId]=level;
	}
}

//-----------------------------------------------------------------------------
function spyAVgetInfosFromCity(cityId) {
// load building levels of relevant buildings
	cache["townHall"+cityId]=0;
	cache["safehouse"+cityId]=0;
	for (var i=0; i<=14; i++)
	{	var building = document.getElementById('position'+i);
		spyAVSaveFromBuilding("townHall", cityId, building);
		spyAVSaveFromBuilding("safehouse", cityId, building);
	};
	if (spyAVisOwnCity(cityId)) { 
		spyAVsetInt("townHall", cityId, cache["townHall"+cityId]);
		spyAVsetInt("safehouse", cityId, cache["safehouse"+cityId]);
	}
}

//-----------------------------------------------------------------------------
function spyAVPercentageAndPrefixString(prefix, value) {
// give a string as percentage of value
	var patch = value; //only values between 5% and 95% are returned
	if (patch <= 5) { if (prefix=="") { return "5%" } else { return " = 5%" }}
	else if (patch >= 95) { if (prefix=="") { return "95%" } else { return " = 95%" }}
	else return prefix + patch + "%"
}

//-----------------------------------------------------------------------------
function spyAVnotifyCity(cityId) {
	var time = spyAVgetInt("next", cityId, -1); // when to check next time
	if (time==0) { return "" };
	if (time==-1) { return " (?)" };
	var now = spyAVgetSecondsNow();
	if (time>now) { 
		var string= " (";
		var seconds = time-now;
		var minutes = Math.floor(seconds / 60);
		if (minutes > 60) {
			var hours = Math.floor(minutes / 60);
			minutes = minutes % 60;
			string += + hours + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'] + " ";
			
		};
		string += minutes + unsafeWindow.LocalizationStrings['timeunits']['short']['minute']+")";
		return string
	}
	else { return " (!)" };
}

//-----------------------------------------------------------------------------
function spyAVappendSpyInfoTo(elementId, cityId) {
// city-view: put a box under element with elementId, show all relevant values for cityId
	var element = document.getElementById(elementId);
	var box = document.createElement('div');
	var safehouse = spyAVgetInt('safehouse', cityId, 0);
	var townHall = spyAVgetInt('townHall', cityId, 1);
	var homies = spyAVgetInt('homies', cityId, -1);
	var hasSeenHideout = homies >= 0;
	if (homies == -1) { homies = safehouse};
	var hideoutAtt = parseInt((65+5*homies+2*(safehouse-townHall)) / 2); // the minimal level to get most informations from the town
	// var hideoutAtt = parseInt((5 + 5*homies+2*(safehouse-townHall) - 50) / 2); // alternative by GrAndAG
	if (hideoutAtt < 1) {hideoutAtt=1}
	if (hideoutAtt > 32) {hideoutAtt=32}
	var protection = 5+2*(safehouse-hideoutAtt-townHall)+5*homies;
	var innerHTML = '<div class="dynamic" id="SpyAdvisor">';
	innerHTML += '<h3 class="header">'+language["safehouse"]+spyAVnotifyCity(cityId)+'</h3>';
	innerHTML += '<div class="content">';
	if ( hasSeenHideout ) { innerHTML += '<p>'+language["homies"]+': '+homies+'/'+safehouse+'</p>';} 
	else { innerHTML += '<p>'+language["homies"]+': &le; '+homies+'</p>' };
	innerHTML += '<p>'+language["spyProtect"]+hideoutAtt+'</p>';
	innerHTML += '<p>'+spyAVPercentageAndPrefixString("",protection)+' '+language["sendSpy"]+'<br>';
	innerHTML += spyAVPercentageAndPrefixString("",protection+25)+' '+language["spyWares"]+'<br>';
	innerHTML += spyAVPercentageAndPrefixString("",protection+45)+' '+language["spyOnline"]+'<br>';
	innerHTML += spyAVPercentageAndPrefixString("",protection+65)+' '+language["spyMil"]+'<br>';
	innerHTML += '<br>'+linkForUpdate()+'</p>';
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
}

//-----------------------------------------------------------------------------
function spyAVappendSpyOverviewTo() {
// tradeAdvisor-view: show a box giving intruder values for all your cities
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	var element = document.getElementById("viewCityImperium");
	var box = document.createElement('div');
	var hideoutAtt = 32;
	var innerHTML = '<div class="dynamic" id="SpyAdvisor">';
	innerHTML += '<h3 class="header">'+language["safehouse"]+'</h3>';
	innerHTML += '<div class="content">';
	innerHTML += '<p>'+language["spyProtect"]+hideoutAtt+'<br>('+language["sendSpy"]+')</p>';
	innerHTML += '<p>';
	var isOwnCity = true;
	for (var i=0; i<cities.length; i++)
	{	
		var city = cities[i];
		var cityId=city.value;
		if ((isOwnCity == true) && !(city.className == "coords"))
		{	isOwnCity = false;
			innerHTML += "<br>";
		}
		innerHTML += '<a href="http://';
		innerHTML += server;
		innerHTML += "/index.php?view=city&id=";
		innerHTML += cityId;
		innerHTML += '">';
		innerHTML += city.innerHTML;
		var safehouse = spyAVgetInt('safehouse', cityId, -1);
		if (safehouse<0) { innerHTML += ': ??% <br>' }
		else {
			var townHall = spyAVgetInt('townHall', cityId, 1);
			var homies = spyAVgetInt('homies', cityId, -1);
			var hasSeenHideout = safehouse==0 || homies >= 0;
			if (homies == -1) { homies = safehouse};
			var protection = 5+2*(safehouse-hideoutAtt-townHall)+5*homies;
			innerHTML += ': ';
			if (!hasSeenHideout) {innerHTML += '&le; ' }
			innerHTML += spyAVPercentageAndPrefixString("", protection);
			if (isOwnCity) { innerHTML += spyAVnotifyCity(cityId) };
			innerHTML += '</a><br>';
		}
	}
	innerHTML += '<br>'+linkForUpdate()+'</p>';
	innerHTML += '</p>';
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
}

//-----------------------------------------------------------------------------
function spyAVsavehouseLevel(townHall, protection, hideoutAtt) {
// calculates a matching safehouse level with mininmal missing spies
	var safehouse;
	if (protection>5 && protection<95)
	{	for (var missingSpies = 0; missingSpies <= 32; missingSpies++)
		{	safehouse = (protection-5+2*townHall+2*hideoutAtt+5*missingSpies)/7;
			if (safehouse <= 32 && safehouse >= missingSpies && safehouse == parseInt(safehouse))
			{ return { "safehouse": safehouse , "missingSpies": missingSpies }}
		}
	}
	safehouse = (protection-5+2*townHall+2*hideoutAtt)/7;
	if ( safehouse > 32 ) { safehouse = 32 }
	else { if ( safehouse < 0 ) { safehouse =  0 }
	else { if (protection == 5) { safehouse = parseInt(safehouse) } 
	else { safehouse = parseInt(safehouse+0.9) }}};
	return { "safehouse": safehouse , "missingSpies": 0 }
}

//-----------------------------------------------------------------------------
function spyAVappendSpypPeviewTo(cityId) {
// sendSpy-view: show a box giving further infos about the victim
	var button = document.getElementById("mainview").getElementsByTagName("a")[0];
	var sendSpy = document.getElementById("mainview").getElementsByTagName("div")[1];
	var elem = sendSpy.getElementsByTagName("p")[0];
	var townHall = parseInt(/\d+/.exec(elem.innerHTML));
	var protection = parseInt(/\d+/.exec(sendSpy.getElementsByTagName("div")[2].innerHTML));
	var hideoutAtt = spyAVgetInt('safehouse', cityId, 0);
	if (hideoutAtt == 0) { return 0 };
	button.addEventListener('click', // add spy decrease on button click
		function () {
			spyAVsetInt('homies', cityId, spyAVgetInt('homies', cityId, 1)-1 );
			spyAVsetInt('next', cityId, -1 );
		},
		false );
	var result = spyAVsavehouseLevel(townHall, protection, hideoutAtt);
	var sep = " = ";
	if (protection == 5) {sep = " &le; " }
	else if (protection == 95) {sep = " &ge; " };
	var safehouse = result["safehouse"];
	var homies = safehouse-result["missingSpies"];
	var info = "<p>";
	protection = 5+2*(safehouse-hideoutAtt-townHall)+5*homies;
	info += linkForUpdate()+'<br>';
	info += language["safehouse"] + sep + safehouse + ", " + language["homies"] + sep + homies+"<br>";
	info += language["sendSpy"] + spyAVPercentageAndPrefixString(sep, protection) + '<br>';
	info += language["spyWares"] + spyAVPercentageAndPrefixString(sep, protection+25) + '<br>';
	info += language["spyOnline"] + spyAVPercentageAndPrefixString(sep, protection+45) + '<br>';
	info += language["spyMil"] + spyAVPercentageAndPrefixString(sep, protection+65) + '<br>';
	elem.innerHTML = elem.innerHTML + info;
}

//-----------------------------------------------------------------------------
function spyAVgetCityId() {
// find out the id of the current city
	var match = document.location.toString().match(/id=(\d+)/);
	if (match)	{ return match[1] };
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	for (var i=0; i<cities.length; i++)
		{ if (cities[i].selected  ) { return cities[i].value }}
	return 0;
}

//-----------------------------------------------------------------------------
function spyAVmain() {
// check which view - do what is needed
	var cityId 
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {

	case "tradeAdvisor":
		spyAVappendSpyOverviewTo();
		break;

	case "safehouse":
		cityId = spyAVgetCityId();
		spyAVgetInfosFromHideout(cityId);
		spyAVappendSpyInfoTo('reportInboxLeft', cityId); 
		break;

	case "city":
		cityId = spyAVgetCityId();
		spyAVgetInfosFromCity(cityId);
		spyAVappendSpyInfoTo('information', cityId);
		break;

	case "sendSpy":
		cityId = spyAVgetCityId();
		spyAVappendSpypPeviewTo(cityId);
		break;

	}
}

//-----------------------------------------------------------------------------
spyAVmain();