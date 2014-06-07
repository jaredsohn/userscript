// ==UserScript==
// @name	eToolkit
// @version	0.2.2
// @description	eRepublik Toolkit/Srpska verzija
// @author	eToolkit
// @namespace	eToolkit
// @include	http://*.erepublik.com/*
// @include	http://erepublik.com/*
// @exclude	http://ads*.erepublik.com/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require	http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var version = '0.2.0';

var TICKET = 'moving ticket';
var WEAPON = 'weapon';
var FOOD   = 'food';
var GIFT   = 'gift';
var HOUSE  = 'house';
//
var WOOD   = 'wood';
var GRAIN  = 'grain';
var IRON   = 'iron';
var OIL    = 'oil';
var DIAMONDS = 'diamonds';

var itemList = [FOOD, GIFT, WEAPON, TICKET, HOUSE, GRAIN, DIAMONDS, IRON, OIL, WOOD ]; 
var rawList = [WOOD, GRAIN, IRON, OIL, DIAMONDS];
var industries = {'gift':DIAMONDS,'weapon':IRON,'house':WOOD,'hospital':WOOD,'food':GRAIN,'movingticket':OIL, 'defense system':WOOD};

var rawRegions = {"Dobrogea":{"grain":"1.00"},"Muntenia":{"grain":"2.00"},"Oltenia":{"grain":"1.00"},"Banat":{"grain":"1.00"},"Moldova":{"grain":"1.00"},"Crisana":{"grain":"1.00"},"Madrid":{"grain":"2.00"},"Galicia":{"grain":"1.00"},"Valencian Community":{"grain":"1.00"},"Balearic Islands":{"grain":"1.00"},"Alsace":{"grain":"1.00"},"Auvergne":{"grain":"1.00"},"Maramures":{"wood":"1.00"},"Bucovina":{"grain":"1.00","iron":"1.00"},"Brittany":{"grain":"1.00"},"Burgundy":{"grain":"1.00"},"Loire Valley":{"grain":"1.00"},"Franche-comte":{"grain":"1.00"},"Languedoc Roussillon":{"grain":"1.00"},"Midi-Pyrenees":{"grain":"1.00"},"Paris Isle of France":{"grain":"1.00"},"Limousin":{"grain":"2.00"},"Pays de la Loire":{"grain":"2.00"},"Lower Normandy":{"iron":"1.00"},"Picardy":{"grain":"1.00"},"Poitou Charentes":{"grain":"1.00"},"Provence Alpes Azur":{"grain":"1.00"},"Rhone Alps":{"wood":"2.00"},"Upper Normandy":{"grain":"1.00"},"North Calais":{"grain":"1.00"},"Bavaria":{"grain":"2.00","iron":"1.00","wood":"1.00"},"Saarland":{"grain":"1.00"},"Montana":{"grain":"2.00"},"Washington":{"grain":"2.00"},"Saskatchewan":{"grain":"2.00","wood":"1.00"},"Manitoba":{"grain":"2.00","wood":"2.00"},"Western Transdanubia":{"grain":"1.00"},"Southern Transdanubia":{"grain":"1.00"},"Central Transdanubia":{"grain":"1.00"},"Nunavut":{"diamonds":"2.00"},"Northern Hungary":{"wood":"1.00"},"Northern Great Plain":{"grain":"1.00"},"Southern Great Plain":{"grain":"2.00"},"Dnipro":{"grain":"1.00"},"Nordjylland":{"grain":"1.00","oil":"1.00"},"Syddanmark":{"grain":"1.00"},"Southern Bohemia":{"grain":"1.00"},"Northern Bohemia":{"grain":"1.00","wood":"1.00"},"Alaska":{"oil":"2.00"},"Lorraine":{"iron":"1.00"},"Saxony":{"grain":"1.00"},"North Dakota":{"grain":"2.00"},"Brandenburg and Berlin":{"grain":"2.00"},"North Rhine-Westphalia":{"grain":"1.00","wood":"1.00"},"Rhineland-Palatinate":{"grain":"1.00"},"Saxony-Anhalt":{"grain":"1.00"},"Schleswig-Holstein and Hamburg":{"grain":"2.00"},"Thuringia":{"grain":"1.00"},"Deutschschweiz":{"grain":"1.00","wood":"1.00"},"Romandie":{"grain":"1.00"},"Baden-Wurttemberg":{"grain":"1.00"},"Svizzera italiana":{"grain":"1.00"},"Heilongjiang":{"grain":"1.00","iron":"2.00"},"Burgenland":{"wood":"1.00"},"Lower Saxony and Bremen":{"grain":"1.00"},"Hamgyong":{"iron":"1.00"},"North Caucasus":{"oil":"2.00","wood":"1.00"},"Aragon":{"grain":"1.00"},"Asturias":{"grain":"1.00","iron":"2.00"},"Basque Country":{"grain":"1.00"},"Castilla y Leon":{"grain":"1.00"},"Cantabria":{"grain":"1.00"},"Catalonia":{"grain":"2.00","iron":"1.00"},"Murcia":{"grain":"1.00"},"London":{"grain":"2.00"},"Wales":{"grain":"1.00","oil":"1.00"},"Scotland":{"grain":"1.00"},"Northern Ireland":{"oil":"1.00"},"South East of England":{"grain":"1.00"},"South West of England":{"grain":"1.00"},"East Midlands":{"grain":"1.00"},"West Midlands":{"grain":"1.00","oil":"1.00"},"East of England":{"grain":"1.00"},"Yorkshire & Humberside":{"grain":"1.00"},"North West of England":{"grain":"1.00","wood":"1.00"},"Midtjylland":{"grain":"1.00"},"Basilicata":{"grain":"1.00"},"Liguria":{"grain":"1.00"},"Molise":{"grain":"1.00"},"Marche":{"grain":"1.00"},"Calabria":{"grain":"1.00"},"Emilia-Romagna":{"grain":"1.00"},"Piedmont":{"grain":"1.00"},"Friuli-Venezia Giulia":{"grain":"1.00"},"Apulia":{"grain":"1.00"},"Lombardy":{"grain":"2.00","wood":"1.00"},"Campania":{"grain":"1.00"},"Trentino-South Tyrol":{"grain":"1.00"},"Brussels":{"grain":"1.00"},"Lazio":{"grain":"2.00","wood":"1.00"},"Sicily":{"grain":"1.00"},"Flanders":{"grain":"1.00"},"Sardinia":{"grain":"1.00"},"Tuscany":{"grain":"1.00"},"Western Netherlands":{"grain":"2.00"},"Southern Netherlands":{"grain":"1.00"},"Wallonia":{"grain":"1.00"},"Veneto":{"grain":"1.00"},"Southern Finland":{"grain":"1.00"},"Northern Netherlands":{"grain":"1.00"},"Oulu":{"grain":"1.00","wood":"1.00"},"Western Finland":{"grain":"1.00"},"Eastern Finland":{"grain":"1.00","wood":"1.00"},"Lapland":{"wood":"1.00"},"Eastern Netherlands":{"grain":"1.00"},"Umbria":{"grain":"1.00"},"Bratislava":{"grain":"1.00"},"Western Slovakia":{"grain":"1.00"},"Central Slovakia":{"wood":"1.00"},"Northeast of Ireland":{"iron":"1.00"},"Northwest of Ireland":{"grain":"1.00"},"Cork and Kerry":{"grain":"1.00"},"Eastern Slovakia":{"grain":"1.00"},"Shannon":{"grain":"1.00"},"Southeast of Ireland":{"grain":"1.00"},"Lisboa":{"grain":"2.00"},"Maryland":{"grain":"1.00","wood":"1.00"},"Aquitaine":{"wood":"2.00"},"Dublin":{"grain":"1.00"},"Norte":{"grain":"1.00","iron":"1.00","wood":"1.00"},"Nord-Norge":{"wood":"1.00"},"Centro":{"grain":"1.00","wood":"1.00"},"Pomerania":{"grain":"1.00"},"Norrland and Sameland":{"iron":"1.00","wood":"1.00"},"Jamtland Harjedalen":{"wood":"1.00"},"Great Poland":{"grain":"1.00"},"Scania":{"grain":"1.00"},"Mazovia":{"grain":"1.00"},"Little Poland":{"wood":"1.00"},"Bohus":{"grain":"1.00","wood":"1.00"},"Gotaland":{"grain":"1.00"},"Silesia":{"grain":"1.00","iron":"1.00"},"Sorlandet":{"grain":"1.00"},"Mazuria":{"grain":"1.00"},"Vestlandet":{"oil":"2.00"},"Svealand":{"grain":"1.00","wood":"1.00"},"Ostlandet":{"grain":"1.00"},"Slavonia":{"grain":"2.00"},"Central Croatia":{"grain":"1.00"},"Upper Carniola":{"grain":"1.00"},"Lower Carniola":{"grain":"1.00"},"Hovedstaden":{"grain":"1.00"},"Slovenian Littoral":{"grain":"1.00"},"Trondelag":{"oil":"1.00"},"Lika and Gorski Kotar":{"wood":"1.00"},"Prekmurje":{"grain":"1.00"},"Inner Carniola":{"grain":"1.00"},"Styria and Carinthia":{"grain":"1.00"},"South Dalmatia":{"grain":"1.00"},"Sumadija":{"wood":"1.00"},"Eastern Serbia":{"iron":"1.00"},"Southern Serbia":{"grain":"1.00"},"Vojvodina":{"grain":"2.00"},"Federation of Bosnia and Herze":{"grain":"2.00"},"Zemgale":{"grain":"2.00"},"Kurzeme":{"wood":"1.00"},"Anhui":{"grain":"1.00","oil":"1.00"},"Gansu":{"grain":"1.00","wood":"1.00"},"Hubei":{"grain":"1.00","iron":"1.00"},"Hunan":{"grain":"1.00"},"Jiangsu":{"grain":"1.00"},"Vidzeme":{"grain":"1.00"},"Jiangxi":{"grain":"1.00"},"Shandong":{"grain":"1.00"},"Sichuan":{"grain":"1.00"},"Guizhou":{"grain":"1.00"},"Hainan":{"grain":"1.00"},"Henan":{"grain":"1.00","iron":"1.00"},"Inner Mongolia":{"grain":"1.00","wood":"1.00"},"Ningxia":{"grain":"1.00"},"Tibet":{"grain":"1.00","wood":"1.00"},"Beijing":{"grain":"2.00","oil":"2.00","iron":"1.00"},"Chongqing":{"grain":"1.00"},"Yunnan":{"grain":"1.00"},"Shanghai":{"grain":"1.00"},"Colorado":{"grain":"1.00"},"Idaho":{"grain":"1.00"},"Iowa":{"wood":"1.00"},"Indiana":{"grain":"1.00","wood":"1.00"},"Connecticut":{"wood":"1.00"},"Massachusetts":{"wood":"1.00"},"Kansas":{"grain":"2.00"},"Maine":{"wood":"1.00"},"Minnesota":{"grain":"1.00","wood":"1.00"},"Missouri":{"grain":"1.00","wood":"1.00"},"Nebraska":{"grain":"1.00"},"New Hampshire":{"wood":"1.00"},"New York":{"wood":"1.00"},"Ohio":{"wood":"1.00"},"Oklahoma":{"grain":"1.00","oil":"2.00"},"Illinois":{"oil":"2.00"},"Pennsylvania":{"grain":"1.00","wood":"2.00"},"Utah":{"iron":"1.00"},"Michigan":{"grain":"1.00","wood":"1.00"},"Wisconsin":{"wood":"1.00"},"Wyoming":{"grain":"1.00"},"New Jersey":{"iron":"1.00"},"Moscow and Central Russia":{"grain":"2.00"},"Central Black Earth":{"grain":"2.00"},"Leningrad Oblast":{"grain":"1.00"},"Vermont":{"wood":"1.00"},"Far Eastern Russia":{"oil":"1.00","diamonds":"2.00","wood":"2.00"},"South Dakota":{"grain":"2.00"},"Urals":{"oil":"1.00","iron":"2.00"},"Eastern Siberia":{"oil":"2.00","diamonds":"2.00","iron":"1.00","wood":"2.00"},"Volga":{"grain":"2.00"},"Volga Vyatka":{"grain":"2.00","iron":"1.00","wood":"1.00"},"Aegean Coast of Turkey":{"grain":"1.00"},"Black Sea Coast of Turkey":{"grain":"1.00","wood":"1.00"},"Central Anatolia":{"grain":"1.00"},"Eastern Anatolia":{"grain":"1.00"},"Marmara":{"grain":"1.00"},"Mediterranean Coast of Turkey":{"grain":"2.00"},"Northern Basarabia":{"grain":"1.00"},"Transnistria":{"grain":"1.00"},"Subcarpathia":{"grain":"1.00"},"Chisinau":{"grain":"1.00"},"Southern Basarabia":{"grain":"1.00"},"Galicia and Lodomeria":{"grain":"1.00"},"Volhynia":{"grain":"2.00"},"Pyongan":{"grain":"1.00"},"Podolia":{"grain":"1.00","iron":"2.00"},"Polisia":{"grain":"1.00"},"Bassarabia":{"grain":"1.00"},"Bukovina":{"wood":"1.00"},"Zaporozhia":{"grain":"1.00"},"Southeastern Anatolia":{"grain":"1.00"},"Sloboda":{"grain":"1.00"},"Taurida":{"iron":"1.00"},"Western Australia":{"grain":"2.00","oil":"1.00","diamonds":"2.00","iron":"1.00","wood":"1.00"},"Fujian":{"grain":"1.00"},"Guangdong":{"grain":"1.00"},"California":{"grain":"2.00","oil":"2.00"},"Shanxi":{"grain":"1.00"},"Shaanxi":{"grain":"1.00","iron":"1.00","wood":"1.00"},"Qinghai":{"grain":"1.00","wood":"1.00"},"Zhejiang":{"grain":"1.00"},"Karnataka":{"iron":"2.00","wood":"1.00"},"Sumatra":{"oil":"2.00"},"Guangxi":{"grain":"1.00","wood":"1.00"},"Lesser Sunda Islands":{"grain":"1.00"},"Madhya Pradesh":{"grain":"2.00","diamonds":"1.00"},"Xinjiang":{"grain":"1.00","wood":"1.00"},"Kalimantan":{"diamonds":"1.00","wood":"1.00"},"Sulawesi":{"grain":"1.00","wood":"1.00"},"Maluku islands":{"wood":"1.00"},"Sindh":{"grain":"1.00"},"KwaZulu Natal":{"grain":"1.00"},"Northern Cape":{"diamonds":"2.00","iron":"1.00"},"Western Cape":{"grain":"1.00","wood":"1.00"},"Western Siberia":{"oil":"2.00","iron":"2.00","wood":"2.00"},"Papua":{"wood":"1.00"},"Chubu":{"grain":"1.00"},"Hokkaido":{"grain":"1.00"},"Tohoku":{"grain":"1.00"},"Gyeonggi-do":{"grain":"2.00"},"Kyushu":{"grain":"2.00"},"Kinki":{"grain":"2.00"},"Kanto":{"grain":"2.00","wood":"1.00"},"Gangwon-do":{"grain":"1.00"},"Chugoku":{"grain":"1.00"},"Shikoku":{"grain":"1.00"},"Nazareth North District":{"grain":"1.00"},"Haifa district":{"grain":"1.00"},"Tel Aviv Center District":{"grain":"1.00"},"Jeju":{"grain":"1.00"},"Chungcheongbuk-do":{"grain":"1.00"},"Beersheba South District":{"grain":"1.00"},"Chungcheongnam-do":{"grain":"1.00"},"Gyeongsangnam-do":{"grain":"1.00"},"Jerusalem district":{"grain":"1.00"},"Carinthia":{"grain":"1.00"},"Upper Austria":{"grain":"1.00"},"Northwest Territories":{"diamonds":"2.00"},"Jeollabuk-do":{"grain":"1.00"},"Gyeongsangbuk-do":{"grain":"1.00"},"Lower Austria":{"grain":"2.00"},"Salzburg":{"grain":"1.00"},"Jilin":{"grain":"1.00"},"Liaoning":{"grain":"1.00","iron":"2.00","wood":"1.00"},"Jeollanam-do":{"grain":"1.00"},"Yukon":{"wood":"1.00"},"West Bengal":{"oil":"1.00"},"Jharkhand":{"wood":"2.00"},"Vorarlberg":{"grain":"1.00"},"Northern India":{"grain":"2.00"},"Uttar Pradesh":{"grain":"2.00"},"Bihar":{"grain":"1.00"},"Styria":{"grain":"1.00"},"Sistan and Baluchistan":{"oil":"2.00"},"Kerman Province":{"iron":"1.00"},"South Khorasan":{"grain":"2.00"},"Razavi Khorasan":{"grain":"2.00"},"Yazd":{"iron":"1.00"},"Fars":{"oil":"2.00"},"Balochistan":{"grain":"1.00","wood":"1.00"},"North-West Frontier Province":{"grain":"1.00"},"Southwestern Iran":{"grain":"1.00","oil":"2.00"},"Luzon":{"grain":"1.00"},"Mazandaran and Golistan":{"grain":"1.00"},"Palawan":{"oil":"2.00"},"Limpopo":{"diamonds":"2.00"},"Northwestern Iran":{"grain":"2.00"},"Ontario":{"grain":"1.00","wood":"2.00"},"Mindanao":{"iron":"1.00"},"Alberta":{"grain":"2.00","wood":"2.00"},"Prince Edward Island":{"grain":"1.00"},"Nova Scotia":{"wood":"2.00"},"Newfoundland and Labrador":{"oil":"2.00","wood":"1.00"},"Delaware":{"grain":"1.00"},"Arkansas":{"grain":"1.00","diamonds":"1.00","wood":"1.00"},"Alabama":{"wood":"1.00"},"Georgia":{"grain":"1.00"},"Quebec":{"grain":"1.00","iron":"1.00","wood":"2.00"},"Arizona":{"iron":"1.00"},"New Brunswick":{"wood":"2.00"},"Kentucky":{"grain":"1.00","wood":"1.00"},"British Columbia":{"wood":"2.00"},"Louisiana":{"oil":"2.00","wood":"1.00"},"Mississippi":{"grain":"1.00","wood":"1.00"},"Nevada":{"iron":"1.00"},"New Mexico":{"grain":"1.00"},"North Carolina":{"grain":"1.00","wood":"1.00"},"Oregon":{"grain":"1.00"},"South Carolina":{"grain":"1.00","wood":"1.00"},"Tennessee":{"grain":"1.00","wood":"2.00"},"Texas":{"grain":"1.00","oil":"2.00"},"Virginia":{"grain":"1.00","wood":"1.00"},"West Virginia":{"wood":"1.00"},"Central Venezuela":{"wood":"1.00"},"Venezuelan Capital":{"oil":"2.00"},"Guayana":{"grain":"1.00"},"Central Western Venezuela":{"iron":"1.00"},"Zulian":{"grain":"1.00","oil":"2.00"},"Llanos":{"grain":"1.00"},"North Eastern Venezuela":{"grain":"1.00"},"Pando":{"wood":"1.00"},"Bolivian Altiplano":{"wood":"2.00"},"Louna-Eesti":{"wood":"1.00"},"Mid Andes":{"iron":"1.00","wood":"1.00"},"Low Andes":{"iron":"1.00","wood":"1.00"},"Chuquisaca and Tarija":{"oil":"1.00","wood":"1.00","grain":"1.00"},"Kaliningrad":{"grain":"2.00"},"Beni and Cochabamba":{"wood":"1.00","grain":"2.00"},"Chimor":{"grain":"1.00"},"Santa Cruz":{"wood":"1.00","grain":"1.00"},"Amazonica":{"wood":"2.00"},"Java":{"grain":"1.00","wood":"1.00"},"Andina":{"iron":"1.00","wood":"1.00"},"Northern Low Amazon":{"oil":"1.00","wood":"1.00","grain":"2.00"},"Pohja-Eesti":{"grain":"2.00"},"Caribe e Insular":{"oil":"2.00","grain":"1.00"},"Orinoquia":{"oil":"1.00","grain":"2.00"},"Great Andes":{"iron":"2.00","wood":"2.00"},"Cundiboyacense":{"iron":"1.00","wood":"1.00"},"Southern Low Amazon":{"wood":"1.00","grain":"1.00"},"Tasmania":{"iron":"1.00"},"South Australia":{"grain":"2.00","iron":"1.00"},"Northern Territory":{"diamonds":"2.00","iron":"1.00"},"Charrua":{"grain":"2.00"},"Punjab":{"grain":"1.00"},"Central Thailand":{"grain":"1.00","wood":"1.00"},"Northern Thailand":{"grain":"1.00","iron":"1.00"},"Southern Thailand":{"oil":"1.00","wood":"1.00"},"Singapore City":{"wood":"1.00","oil":"1.00","grain":"1.00"},"Sarawak":{"wood":"2.00","oil":"1.00"},"Victoria":{"grain":"1.00","wood":"1.00"},"Central East Chaco":{"wood":"2.00","grain":"1.00"},"Paranena":{"grain":"2.00"},"Queensland":{"grain":"1.00"},"Sudovia":{"grain":"2.00"},"Gujarat":{"grain":"1.00"},"Sabah":{"wood":"1.00","oil":"1.00"},"North-Eastern Thailand":{"grain":"1.00"},"Maharashtra":{"grain":"1.00"},"Peninsular Malaysia ":{"oil":"2.00","grain":"1.00"},"Rajasthan":{"grain":"1.00"},"Dainava":{"wood":"1.00"},"Kerala":{"wood":"1.00"},"Chhattisgarh":{"wood":"1.00"},"Jammu and Kashmir":{"grain":"1.00","wood":"1.00"},"Northwest of Mexico":{"grain":"1.00"},"New South Wales":{"grain":"2.00","iron":"1.00","wood":"1.00"},"Orissa":{"iron":"1.00","wood":"1.00"},"Southeast of Mexico":{"oil":"2.00","wood":"1.00"},"Oaxaca":{"wood":"1.00"},"Baja":{"grain":"1.00"},"Pacific Coast of Mexico":{"wood":"1.00"},"Valley of Mexico":{"grain":"1.00","oil":"2.00"},"Northeast of Mexico":{"grain":"1.00"},"Gulf of Mexico":{"wood":"1.00"},"Florida":{"grain":"1.00"},"Andhra Pradesh":{"iron":"1.00","wood":"1.00"},"South East Chaco":{"grain":"1.00"},"Norte Chico":{"iron":"1.00"},"Mesopotamia":{"grain":"1.00"},"Zona Sur":{"wood":"1.00"},"Cuyo":{"iron":"1.00"},"Argentine Northwest":{"grain":"2.00"},"Burgas":{"grain":"1.00"},"Vidin":{"grain":"1.00"},"Thrace":{"grain":"1.00"},"Zona Central":{"grain":"1.00"},"Ruse":{"grain":"1.00"},"Patagonia":{"grain":"1.00","oil":"1.00","iron":"1.00"},"Macedonia":{"grain":"1.00","iron":"1.00"},"Plovdiv":{"grain":"1.00"},"Sofia":{"grain":"1.00"},"Varna":{"grain":"1.00"},"Peloponnese":{"grain":"1.00"},"Crete":{"grain":"1.00"},"Attica":{"grain":"1.00","iron":"1.00"},"Pampas":{"grain":"2.00","wood":"1.00"},"Parana and Santa Catarina":{"grain":"0.01","iron":"1.00"},"Central Greece":{"grain":"1.00","iron":"2.00","wood":"1.00"},"Center West of Brazil":{"grain":"1.00","diamonds":"1.00","wood":"2.00"},"Southeast of Brazil":{"grain":"2.00"},"Gauteng":{"grain":"1.00","diamonds":"2.00"},"Northeast of Brazil":{"grain":"1.00","oil":"2.00","diamonds":"1.00","iron":"2.00","wood":"1.00"},"Andalucia":{"grain":"1.00","wood":"1.00"},"Canary Islands":{"grain":"1.00"},"North of Brazil":{"grain":"1.00","diamonds":"1.00","iron":"2.00","wood":"2.00"},"Rio Grande do Sul":{"grain":"1.00"}};

var PRODUCTS = {
	"food"				:	{"raw_type"		:	"grain",
							 "raw_needed"	:	"1",
							 "rec_employee"	:	"10",
							 "id"			:	"1"},
	"gift"				:	{"raw_type"		:	"diamonds",
							 "raw_needed"	:	"2",
							 "rec_employee"	:	"10",
							 "id"			:	"2"},
	"weapon"			:	{"raw_type"		:	"iron",
							 "raw_needed"	:	"5",
							 "rec_employee"	:	"10",
							 "id"			:	"3"},
	"moving tickets"	:	{"raw_type"		:	"oil",
							 "raw_needed"	:	"10",
							 "rec_employee"	:	"10",
							 "id"			:	"4"},
	"house"				:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"200",
							 "rec_employee"	:	"20",
							 "id"			:	"10"},
	"hospital"			:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"2000",
							 "rec_employee"	:	"20",
							 "id"			:	"11"},
	"defense system"	:	{"raw_type"		:	"wood",
							 "raw_needed"	:	"2000",
							 "rec_employee"	:	"20",
							 "id"			:	"12"},
	"grain"				:	{"rec_employee"	:	"10",
							 "id"			:	"5"},
	"diamonds"			:	{"rec_employee"	:	"10",
							 "id"			:	"6"},
	"iron"				:	{"rec_employee"	:	"10",
							 "id"			:	"7"},
	"oil"				:	{"rec_employee"	:	"10",
							 "id"			:	"8"},
	"wood"				:	{"rec_employee"	:	"10",
							 "id"			:	"9"}
};


var pagesFunctions = [];

var BASE_URL = 'http://www.erepublik.com/';
var LANG = 'en';
var isCompany = false;
var isCitizen = false;
var companyType = null;
var companyID = 0;
var LOCATION = "";
var cID = 0;
var orgAccount = false;
var HIDE_IN_SHADOWS = true;
var CURR_IN_GOLD = true;
var PAGE = new Array();

var etoptions = {
	lang: 'hu',
	CoMa: 'off',
	bw: 'off'
};

var texts = {
	
	hu: {
		lang: '<img src="http://www.erepublik.com/images/flags/M/Serbia.gif" />',
		opfg: 'Puno giftanje',
		opdo: 'Donator',
		opbw: 'Pracenje bitki',
		opac: 'Svi komentari',
		opma: 'Vojni savetnik',
		optc: 'Bez Tweetera',
		opbf: 'Bolji fajt',
		opCoMa: 'Trziste kompanija',
		opRegI: 'Region-informator',
		doEmpty: 'Prazan inventar',
		donate: 'Donator',
		doAdd: 'Dodaj',
		doNotFound: "Tvoj inventar ne sadrzi",
		food: "Lebac",
		gift: "Poklon",
		weapon: "Oruzje",
		"moving tickets": "Karte",
		house: "Kuce",
		hospital: "Bolnice",
		"defense system": "Odbrambeni sistemi",
		grain: "Zito",
		diamonds: "Dijamanti",
		iron: "Gvozdje",
		oil: "Nafta",
		wood: "Drvo",
	},
	en: {
		lang: '<img src="http://www.erepublik.com/images/flags/M/United-Kingdom.gif" />',
		opfg: 'Full Gifter',
		opdo: 'Donater',
		opbw: 'Battle Watch',
		opac: 'All Comment',
		opma: 'Military Adv',
		optc: 'Tweet Clean',
		opbf: 'Better Fight',
		opCoMa: 'Company Market',
		opCMPro: 'Company MarketPro',
		doEmpty: 'Empty Inventory',
		donate: 'Donate',
		doAdd: 'Add',
		doNotFound: "Your Inventory doesn't contain",
		opRegI: 'Region Info',
		opPrIt: 'ProfIT!'
	},
}

function isRaw(type) {
	for(var key in rawList) {
		if (rawList[key]==type) {
			return true;
		}
	}
	return false;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var options = {};
	
function Main(e) {
	try {
		cID = $("div.core div.avatarholder a").attr("href").split('/')[4];
	} catch (er) {
		return;
	}
	
	readSettings();

	orgAccount = $("div.xprank").text() == 'Or';
	
	PAGE = location.href.split("/");
	var HREF = location.href;
	if (HREF.indexOf("http://")==0 || HREF.indexOf("https://")==0) {
		var parts = HREF.split('/');
		BASE_URL = parts[0]+'//'+parts[2]+'/';
		LANG = parts[3];
	}

	if (!orgAccount && GetErepDay() != GM_getValue('ma_savedday'+cID, 0))
	{
	        profileupdelayed = true;
	        DamageUpdate();
	}

	if (HREF.indexOf(BASE_URL)==0) {
		LOCATION = HREF.substring(BASE_URL.length+3);
		pagesFunctions.forEach(function(v) {
			if ((v.p=="all" || LOCATION.indexOf(v.p)>=0) && enabled(v.c, v.t) && !shadow(v.s)) {
				 v.f();
			}
			if (typeOk(v.t) && !shadow(v.s)) {
				options[v.c] = 'op'+v.c;
			}
		});
		
	}
	
	$('#sidebar').append(
	'<table width="93" cellpadding="0" cellspacing="0" style="margin-top: 10px"><tr height="20"><td id="eToolkitSwitch" valign="middle" align="center" style="background-color: #f8f8f8; font-weight: bold; color:#3C8FA7; cursor:pointer;">eToolkit</td></tr><tr height="20"><td id="eToolkitLanguage" valign="middle" align="center" style="background-color: #f8f8f8;">'+i18n('lang')+'</td></tr><tr style="display:none" id="eToolkitOptions"><td style="background-color: #f8f8f8;"><table id="eToolkitOptionsTable" width="93" cellpadding="0" cellspacing="0"></table></td></tr></table>');
	addGlobalStyle('td.etop.on {font-size:12px; padding-top: 5px; color:green;}');
	addGlobalStyle('td.etop.off {font-size:12px; padding-top: 5px; color:red; }');
	
	$('#eToolkitSwitch').click(function() { 
		$('#eToolkitOptions').css('display',$('#eToolkitOptions').css('display')=='none'?'block':'none');
	});
	
	$('#eToolkitLanguage').click(function() {
		var first = undefined;
		var last = undefined;
		var found = false;
		for(var lang in texts) {
			if (first == undefined) {
				first = lang;
			}
			if (last == etoptions.lang) {
				etoptions.lang = lang;
				found = true;
				break;
			} else {
				last = lang;
			}
		}		
		if (!found) {
			etoptions.lang = first;
		}
		writeSettings();
		var elang = i18n('lang');
		$('#eToolkitLanguage').html(elang);
		fillOptions();
	});
	
	fillOptions();
}	

function i18n(txt) {
	var result = undefined;
	if (texts[etoptions.lang]!=undefined) {
		result = texts[etoptions.lang][txt];
	}
	if (result==undefined) {
		result = texts['en'][txt];
	}
	if (result==undefined) {
		result = txt;
	}
	return result;
}
function fillOptions() {
	$('#eToolkitOptionsTable').html('');
	for(var op in options) {
		$('#eToolkitOptionsTable').append('<tr><td align="center" class="etop '+(etoptions[op]=='off'?'off':'on')+'" id="eto'+op+'">'+i18n(options[op])+'</td></tr>');
		$('#eto'+op).click(function() { switchETO(this.id.substring(3)) });
	}
}

function enabled(op, type) {
	return typeOk(type) && etoptions[op]!='off';
}

function shadow(shadow) {
	return HIDE_IN_SHADOWS && shadow;
}

function typeOk(type) {
	return type=='b' || type == (orgAccount?'o':'c');
}

function readSettings() {
	var optionString = GM_getValue('etoptions');
	if (optionString != null) {
		var options = eval('('+optionString+')');
		for(var op in options) {
			etoptions[op] = options[op];
		}
	} else {
		etoptions.lang = LANG;
	}
}

function writeSettings() {
	GM_setValue('etoptions',$.toJSON(etoptions));
}

function switchETO(op) {
	if (etoptions[op]=='off') {
		GM_log('set on '+op);
		$('#eto'+op).addClass("on").removeClass('off');
		etoptions[op]='on';
	} else {
		GM_log('set off '+op);
		$('#eto'+op).addClass("off").removeClass('on');
		etoptions[op]='off';
	}
	writeSettings();
}

window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		Main();
	}
},100);}, false);

// BETTER FIGHT BEGIN //

pagesFunctions.push({p: 'battles/fight/',		c:'bf',	t:'c', 	f: StartBetterFight});
function StartBetterFight() {
	$('#buy_wellness_link').insertAfter('div.warholder');
	$('#buy_wellness_div').insertAfter('div.warholder');
	$('#fight_form').insertAfter('div.warholder');
	$('#buy_wellness_info_div').insertAfter('div.warholder');
}
/*
function buy_wellness() {
	var url_from_form = $j('a#ajax_action_hidden_link').attr('href');
	var _token = $j('#_token').val();
	
	$j.ajax({
		type: 'POST',
		url: url_from_form,
		dataType: 'html',
		data: { _token: _token },
		beforeSend: function() {
			$j('#buy_wellness_link').hide();
			$j('div#buy_wellness_div').show();
		},
		success: function(html) {
			$j('div#buy_wellness_info_div').replaceWith(html);
			$j('div#wellnessvalue').html($j('#bought_wellness').html());
		},
		error: function() {
			// jalert("An error has occurred. Please try again.");
		},
		complete: function() {	
			if ($j('#bought_wellness').html() != null) {
				$j('div#side_bar_gold_account_value').html($j('div#side_bar_gold_account_value').html() - 2);
			}
			$j('#buy_wellness_link').show();
			$j('div#buy_wellness_div').hide();
		}
	});
} 
 */
// BETTER FIGHT END //

// BATTLEWATCH BEGIN //
pagesFunctions.push({p: 'all',		c:'bw',	t:'b', 	f: StartBattleWatch});

var bw_contenttext ="";
var walls = new Array();
var prevwalls = new Array();
var oldbi;
var lastrefresh ="";
var timer_is_on; 
var change = new Array();  

function bw_on(){
    GM_setValue("battlewatch","1");
    bwGetBattleList();
    lastrefresh="";

}
function bw_off(){
    GM_setValue("battlewatch","0");
    regenerateContent();
    clearTimeout(t);
    lastrefresh="";
    timer_is_on=0;
}

function getVal(){
    runthis = GM_getValue("battlewatch","1");
    eadslink = GM_getValue("eadslink"); 
}

function bwSetBattle(battle){
	if (battle!=null) {
		battle.nextRefresh = battle.lastRefresh + battle.next;
		GM_setValue('bw_battle_'+battle['bid'], $.toJSON(battle));
	}
}

var defaultRefresh = 10000;

function bwGetBattle(bid, time){
	var text = GM_getValue('bw_battle_'+bid);
	var battle = null;
	if (text==null) {
		battle = { };
		battle['bid'] = bid;
		battle['lastRefresh'] = time;
		battle['nextRefresh'] = time;
		battle['wall'] = 0;
		battle['last'] = 0;
		battle['next'] = defaultRefresh;
	} else {
		battle = eval('('+text+')');
		if (battle['nextRefresh']==undefined) {
			battle = { };
			battle.bid = bid;
			battle['lastRefresh'] = time;
			battle['nextRefresh'] = time;
			battle['wall'] = 0;
			battle['last'] = 0;
			battle['next'] = defaultRefresh;
		}
	}
	battle.bid = bid;
	return battle;
}

function  bwGetActualWall(bid) {
    var time = new Date().getTime();
	var battle = bwGetBattle(bid, time);
	if (battle.nextRefresh <= time) {
		//GM_log('refresh :'+battle.lastRefresh+","+battle.nextRefresh+","+time+","+battle.next+","+$.toJSON(battle));
		battle.lastRefresh = time;
		bwSetBattle(battle);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.erepublik.com/en/battles/log/"+bid+"?how_many=1",
			onload: function(resp){
				var actual = eval('('+resp.responseText+')');
				var battle = bwGetBattle(bid, time);
				battle.last = battle.wall;
				if(actual["current_dp"] != 'undefined' && actual["current_dp"] != null){
					battle.wall = actual["current_dp"];
				}else{
					battle.wall = 0;
				}
				bwSetBattle(battle);
				//GM_log('bwGetActualWall set :'+$.toJSON(battle));
			}
		}); 
	}
	return battle;
}

function bwSetBattles(battles){
	if (battles!=null) {
		battles.lastRefresh = new Date().getTime();
		GM_setValue('bw_battleList', $.toJSON(battles));
	}
}

function bwGetBattles(time) {
	var text = GM_getValue('bw_battleList');
	var battles = null;
	if (text==null) {
		battles = { };
		battles.lastRefresh = 0;
		battles.data = null;
	} else {
		battles = eval('('+text+')');
		if (battles.lastRefresh==undefined) {
			battles = { };
			battles.lastRefresh = 0;
			battles.data = null;
		}
	}
	return battles;
}

function bwGetBattleList() {
    if(!timer_is_on){
        createtimer();
    }
    time = new Date().getTime();
	var battleList = bwGetBattles(time);
	if (battleList.lastRefresh == undefined || battleList.lastRefresh+600000 <= time) {
		bwSetBattles(battleList);
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://erepmarket.co.cc/temp/getbattles.php",
            onload: function(response) { 
            	var newBattleList = eval('('+response.responseText+')');
				battleList = bwGetBattles(time);
            	battleList.data = newBattleList;
				bwSetBattles(battleList);
				bwRefreshBattles(battleList);
			}
		});
	}
	bwRefreshBattles(battleList);
}

function bwRefreshBattles(battleList) {
	if (battleList != null && battleList.data != null) {
		bw_contenttext = "<br><b>Active battles:</b><br>";
		for(i in battleList.data){
			var elem = battleList.data[i];
			var bid = elem[0];
			var aperma = elem[1];
			var dperma = elem[2];
			var wall = elem[3];
			
            var battle = bwGetActualWall(bid);
			
            if(aperma == dperma){
                 battlelink = "Resistance War "+'<img src="http://www.erepublik.com/images/flags/M/'+aperma+'.gif">';
            } else {
                 battlelink = '<img src="http://www.erepublik.com/images/flags/M/'+aperma+'.gif">'+
                 ' vs. <img src="http://www.erepublik.com/images/flags/M/'+dperma+'.gif">';
            }

            if(battle['wall'] > battle['last']){
                 change[bid] = '<img src="http://erepmarket.co.cc/up.gif">';
            } else if(battle['wall'] < battle['last']) {
                 change[bid] = '<img src="http://erepmarket.co.cc/down.gif">';  
            } else {
                 change[bid] = change[bid];
            }
			
            if(change[bid] == null){
                 change[bid] = " ";
            }
			
            bw_contenttext += '<table border="0" cellspacing="0" cellpadding="0" style="border: 1px thin #f2f2f2;" width="120"><a href="http://www.erepublik.com/en/battles/show/'+bid+
            '" target="_blank">'+battlelink+'</a><br>in '+elem[4]+'<br><img src="http://erepmarket.co.cc/wall.png" width="18" height="14"> '+battle['wall']+'/'+wall+' '+change[bid]+'</table><br>';
                    
            battlelink="";
            awall="";
		}
        regenerateContent();
	}
}

function regenerateContent(){
    getVal();
    
    if(runthis == 1){
        eads = document.getElementById("eads");
        if (eads){
            GM_setValue("eadslink", eads.src);
            document.getElementById("promo").removeChild(eads);
        }
        bw_content = document.getElementById("bw_content");
        if(bw_content == null){
            latest = document.getElementById("bw_buttons");
            bw_content = document.createElement("div");
            bw_content.innerHTML = bw_contenttext;
            bw_content.id = "bw_content";
            bw_content.style.textAlign = "center";
            latest.parentNode.appendChild(bw_content);
        }else{
            bw_content.innerHTML = bw_contenttext;
        }
    }else{
        bw_content = document.getElementById("bw_content");
        if(bw_content){
            document.getElementById("promo").removeChild(bw_content);
            latest = document.getElementById("bw_buttons");
            if(eadslink != null || eadslink != 'undefined'){
                eads = document.createElement("iframe");
                eads.src = eadslink;
                eads.id = "eads";
                eads.width = "120";
                eads.height = "1000";
                eads.frameborder = 0;
                eads.scrolling = "no";
                eads.style.border = "0";
                latest.parentNode.appendChild(eads);
            }
        }
    }
}

function timerstart(){
    bwGetBattleList();
    t=setTimeout(timerstart,5000);
}

function createtimer(){
    getVal();
    if (!timer_is_on && runthis==1 ){
        timer_is_on=1;
        timerstart();
    }
}

function StartBattleWatch() {
	newcss ='a.f_red_small_bw {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll right -154px;color:#000;font-size:11px;font-weight:normal;height:20px;line-height:20px;}';
	newcss +='a.f_red_small_bw span {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2url(/images/parts/fluids_map.jpg) no-repeat scroll left -154px;color:#000;cursor:pointer;height:20px;line-height:20px;margin-right:15px;padding-left:15px;text-align:center;text-shadow:0 1px 0 #aaa;}';
	newcss += 'a.f_red_small_bw:hover {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll right -174px;color:#f2f2f2;}';
	newcss += 'a.f_red_small_bw:hover span {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll left -174px;color:#f2f2f2;}';
	addGlobalStyle(newcss);

	newcss ='a.f_blue_small_bw {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll right -98px;color:#000;font-size:11px;font-weight:normal;height:20px;line-height:20px;}';
	newcss +='a.f_blue_small_bw span {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll left -98px;color:#000;cursor:pointer;height:20px;line-height:20px;margin-right:15px;padding-left:15px;text-align:center;text-shadow:0 1px 0 #aaa;}';
	newcss += 'a.f_blue_small_bw:hover {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll right -98px;color:#f2f2f2;}';
	newcss += 'a.f_blue_small_bw:hover span {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#f2f2f2 url(/images/parts/fluids_map.jpg) no-repeat scroll left -98px;color:#f2f2f2;}';
	addGlobalStyle(newcss);

	latest = document.getElementById("eads");
	gombok = document.createElement("div");
	gombok.id = "bw_buttons";
	gombok.style.textAlign ="center";
	gombok.style.width="120px";
	gombok.align="center";
	gombok.innerHTML = '<span style="background-color: #68e; width: 120px; display: block; border: 0; padding: 0;"><a href="http://erepmarket.co.cc" target="_blank" style="color: white">battleWatch</a></span>'+
	'<a class="f_blue_small_bw" href="#" id="bw_on_btn"><span>On</span></a><a class="f_red_small_bw" href="#" id="bw_off_btn"><span>Off</span></a>';
	latest.parentNode.insertBefore(gombok, latest);

	document.getElementById("bw_on_btn").addEventListener('click',bw_on, false);
	document.getElementById("bw_off_btn").addEventListener('click', bw_off, false);
	createtimer();
}
// BATTLEWATCH END //

// DONATER BEGIN //

pagesFunctions.push({p: 'donate/items',	c:'do',	t:'b', 	f: StartDonater});

function getButton(num) {
	return '<span style="font-size: 12px; font-weight: bold; border: 1px solid #f2f2f2;\
 padding: 5px 10px; cursor: pointer" class="rightpadded padded" id="add_'+num+'">'+i18n('doAdd')+' '+num+'</span>';
}

function getDonateButton() {
	return '<span style="font-size: 12px; font-weight: bold; border: 1px solid #f2f2f2;\
 padding: 5px 10px; cursor: pointer" class="rightpadded padded" id="specDonate">'+i18n('donate')+'</span>';
}
function getType(html) {
		var type = 'U';
		if (html.indexOf('_industry_movingtickets.gif')>0) {
			type = TICKET;
		} else if (html.indexOf('_industry_weapon.gif')>0) {
			type = WEAPON;
		} else if (html.indexOf('_industry_food.gif')>0) {
			type = FOOD;
		} else if (html.indexOf('_industry_gift.gif')>0) {
			type = GIFT;
		} else if (html.indexOf('_industry_house.gif')>0) {
			type = HOUSE;
		} else if (html.indexOf('_industry_wood.gif')>0) {
			type = WOOD;
		} else if (html.indexOf('_industry_grain.gif')>0) {
			type = GRAIN;
		} else if (html.indexOf('_industry_iron.gif')>0) {
			type = IRON;
		} else if (html.indexOf('_industry_oil.gif')>0) {
			type = OIL;
		} else if (html.indexOf('_industry_diamonds.gif')>0) {
			type = DIAMONDS;
		}
		return type;
}

function getQuality(html) {
		var quality = 'Q1';
		
		var isHouse = html.indexOf('_industry_house.gif')>0;
		if (html.indexOf('20%')>0) {
			quality = 'Q1';
		} else if (html.indexOf('40%')>0) {
			quality = 'Q2';
		} else if (html.indexOf('60%')>0) {
			quality = 'Q3';
		} else if (html.indexOf('80%')>0) {
			quality = 'Q4';
		} else if (html.indexOf('100%')>0) {
			quality = 'Q5';
		}
		return quality;
}

function getInventory() {
	var result = new Array();
	$("#small li").each(function (i) {
		var type = getType(this.innerHTML);
		var qArray;
		if (result[type]) {
			qArray = result[type];
		} else {
			qArray = new Array();
			result[type]=qArray;
		}
		var quality = getQuality(this.innerHTML)
		if (qArray[quality]) {
			qArray[quality] += 1;
		} else {
			qArray[quality] = 1;
		}
	}
	);
	return result;
}

function forbidden(key) {
	var gmkey = "forb"+cID+"_"+key;
	var forb = GM_getValue(gmkey);
	if (forb == null || forb == undefined) {
		forb = false;
	}
	return forb;
}

function selected(key) {
	var gmkey = "forb"+cID+"_"+key;
	var forb = GM_getValue(gmkey);
	if (forb == null || forb == undefined) {
		forb = false;
	}
	if (forb) {
		$('#sp'+key).removeClass('cbforfidden').addClass('cbenabled');
	} else {
		$('#sp'+key).addClass('cbforfidden').removeClass('cbenabled');
	}
	GM_setValue(gmkey,!forb);
}

function getKey(q, t) {
	return q+"_"+t.substring(0,2);
}

function filter(arr, raw) {
	$('#myInventory').html('<form><table id ="inventoryTable" class="inventoryTable" width="400" border="2" cellspacing="5" cellpadding="5"><tr style="font-weight:bold;"><th>Type</th><th width="40">Q1</th><th width="40">Q2</th><th width="40">Q3</th width="40"><th width="40">Q4</th><th width="40">Q5</th></tr></table></form>');
	var foundSome = false;
	var foundProper = false;
	for ( var key in itemList) {
		var elem = itemList[key];
		if (!arr[elem]) {
			continue;
		}
		foundSome = true;
		var trkey =  elem.substring(0,2);
		$('#inventoryTable').append('<tr id="tr'+trkey+'"><th>'+elem + "</th></tr>");
		if (raw!=null) {
			if ( raw==elem ) {
				foundProper = true;
			}  else {
				$('#tr'+trkey).css('background-color','blue');
			} 
		}
		if (isCitizen && isRaw(elem)) {
			$('#tr'+trkey).css('background-color','blue');
		}
		for(var i = 1; i<=5; i++) {
			if (arr[elem]['Q'+i]) {
				var key = getKey('Q'+i,elem);
				$('#tr'+trkey).append('<td><span id="sp'+key+'">'
					+arr[elem]['Q'+i]+ '</span></td>');
				$('#sp'+key).addClass(forbidden(key)?'cbforfidden':'cbenabled');
				$('#sp'+key).click(function() { selected(this.id.substring(2)) });
			} else {
				$('#tr'+trkey).append('<td>--</td>');
			}
		}
	}
	if (!foundSome) {
		$('#myInventory').html("<span style='color: red; font-weight: bold;'>"+i18n('doEmpty')+"</span>");
	} else if (raw!=null && !foundProper) {
		$('#myInventory').html("<span style='color: red; font-weight: bold;'>"+i18n('doNotFound')+" "+i18n(raw)+"</span>");
	}
}

function addSome(num) {
	var width = $('#big').css('width');
	if (width.indexOf('px')>0) {
		max= width.substring(0,width.indexOf('px'))/57;
	}
	max -= $('#big li').length;
	if (num>max) {
		num = max;
	}
	$("#small li").each(function (i) {
		if (num>0) {
			var type = getType(this.innerHTML);
			if ((!isCompany || companyType==type) && (!isCitizen || !isRaw(type))) { 
				var key = getKey(getQuality(this.innerHTML),type);
				if (!forbidden(key)) {
					num -= 1;
					$(this).appendTo("#big");
				}
			}
		}
	});
}

function StartDonater(){
	GM_log('StartDonater');
	isCitizen = LOCATION.indexOf("citizen")==0;
	var info = $("#items1").css('display','none');
	$("ul.tabs").after('<br/><table width="100%"><tr><td align="center"><div id="myInventory"></div></td></tr><tr><td align="center"><div id="myButtons" style="vertical-align:middle; height:20px; padding-top:8px;"></div></td></tr></table>');
	var inventory = getInventory(); 
	filter(inventory);
	$("#myButtons").append(getButton(1)+getButton(2)+getButton(3)+getButton(4)+getButton(5)+getButton(10)+getDonateButton());
	$("#add_1").click(function() { addSome(1) });
	$("#add_2").click(function() { addSome(2) });
	$("#add_3").click(function() { addSome(3) });
	$("#add_4").click(function() { addSome(4) });
	$("#add_5").click(function() { addSome(5) });
	$("#add_10").click(function() { addSome(10) });
	$("#specDonate").click(function() { 
		$("input.vround-btn-core").click();
	});
	addGlobalStyle(
'.inventoryTable th {font-weight:bold;text-align:center;}\
.inventoryTable td {text-align:center;}\
.cbforfidden {color:red;text-align:center;}\
.cbenabled {color:green;text-align:center;}\
');

	if (LOCATION.indexOf("company")==0) {
		companyID = LOCATION.split('/')[1];
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://api.erepublik.com/v1/feeds/companies/"+companyID+".json",
			onload:function(responseDetails){
				var companyObject = eval('(' + responseDetails.responseText + ')');
				var cType = companyObject.industry;

				try {
					companyType = PRODUCTS[cType].raw_type;
					isCompany = companyType != null; 
					filter(inventory, companyType);
				} catch (e) {
				} 
			}	
		});
	}

}

// DONATER END //

// GIFTER BEGIN //
pagesFunctions.push({p: 'citizen/profile', 	c:'fg', t:'b', 	f: StartFullGifter, s:true});

function fullgift(id){
	jQuery.post(
	'/citizen/offergift/'+id,
	{
		_token: $("#_token").val(),
		id:     id
	},
		function (data, textStatus) {
			var pp = 1;
			if (data.donated.status == "false"){
				$("#messagealert").css('display','block');
				$("#messagealert").attr("class","invalidicon");
			}else if(data.donated.status == "true"){
				$("#messagealert").css('display','none').fadeIn('fast');
				$("#messagealert").css('display','block');
				$("#messagealert").attr("class","validicon success_message");
				fullgift(id);
			}else if(data.donated.status == "captcha"){
				document.location = data.donated.back_url;
				pp = 0;
			}
			
			$("#messagealert").children("p").html(data.donated.message);
		},
	"json"
	);
}

function StartFullGifter(){
	var targetID = LOCATION.split('/')[2];
	if ($("#owninv").size() == 0) {
		$('#user_menu').append('<li><a id="full_gifter" href="javascript:void(0)">'+i18n('opfg')+'</a></li>');
		$('#full_gifter').click(function () {fullgift(targetID) });
	}
}

// GIFTER END //

// ALLCOMMENT BEGIN //
pagesFunctions.push({p: 'all',		c:'ac',	t:'b', 	f: StartAllComment});

allCommentNode = function (e) {
	changeAllComment();
};

function changeAllComment(){
	$("a[href$='/20'][href*='/article/']").each(function (i) {
		var href = $(this).attr("href");
		href = href.substr(0,href.length-3)+"/all";
		$(this).attr("href",href);
	});
};

function StartAllComment(){
	changeAllComment();
	document.addEventListener("DOMNodeInserted", allCommentNode, false);
}
// ALLCOMMENT END //

// MILITARY ADVISER BEGIN //
pagesFunctions.push({p: 'my-places/army',	c:'ma',	t:'c', 	f: StartDamageCalculator});
pagesFunctions.push({p: 'citizen/profile',	c:'ma',	t:'c', 	f: StartProfileUpdate});
pagesFunctions.push({p: 'battles/fight',	c:'ma',	t:'c', 	f: StartBattleUpdate});

var RANKS = ['Private', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Colonel', 'General', 'Field Marshal'];

function DamageCalculator() {
    GM_addStyle('ul.weaponsel {-moz-background-clip:border; -moz-background-inline-policy:continuous;\
-moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; border:1px solid #f2f2f2;\
display:block; float:left; margin-bottom:1px; margin-right:1px; overflow:hidden; } ');
    GM_addStyle('ul.weaponsel li { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; \
background:#FFFFFF none repeat scroll 0 0; border:1px solid #f2f2f2; display:block; float:left; height:16px; margin-bottom:0px;\
overflow:hidden; width:15px; text-align:center;}');
GM_addStyle('input.weaponcount {width: 15px; padding-left: 5px; margin-left: 11px;}');
  
    //bal oldal
    var dt = '<tr><td valign="middle" nowrap="nowrap">'; 
    dt += '<table id="dcselect"><thead>Damage Calculator (Select Weapons)</thead><tbody>';
    for (i = 5; i >= 0; i--) {
        dt += '<tr><td style="border-bottom: 0px none; padding: 1px 15px 1px 72px;">'

        if (i>0)
            dt+= '<a onclick="location.href = this.href;" style="background-color: red" alt="Weapon Quality Level ' + i + '" title="Weapon Quality Level ' + i + '" href="/' + LANG + '/market/country-0-industry-3-quality-' + i + '">';
        else
            dt += '<a alt="Empty handed" title="Empty handed" href="/' + LANG + '/market/country-0-industry-3-quality-0">'

        dt += '<span class="qlsmallmeter" style="float: left; height: 15px; line-height: 15px; vertical-align: middle; margin-right: 14px">';
        dt += '<span class="qlsmalllevel" style="width: ' + (i * 2) + '0%">';
        dt += '<img style="padding-bottom: 1px" src="/images/parts/qlsmall-indicator_full.gif" />';
        dt += '</span></span></a>  <ul id="WQul'+i+'" class="weaponsel">';
        for (j = 0; j <= 5 ; j++)
            dt += '<li id="wpli'+i+'C'+j+'" class="weaponselem" style="-moz-user-select: none;">'+j+'</li>';
        dt += '</ul><input id="iweapon'+i+'" class="weaponcount" type="text" value="0" maxlength="2"></td><td id="wpdm'+i+'" align="left" style="padding: 0px; border-bottom:0px none;"> </td></tr>'; 
    }

    dt += '<tr><td style="border-bottom: 0px none; padding: 1px 10px 1px 180px;">Total Damage</td><td id="dcres" style="border-bottom: 0px none; padding: 0px 0px 0px 0px;"></td></tr></tbody></table>';
    dt += '</td><td id="calcDmg" width="166px" valign="middle"><span>&nbsp;</span></td></tr>'
    $('.offers tbody tr:first').next().next().after( dt );

    $('.weaponsel li:nth-child(1)').css('background' , '#AAD85B');
    $('.weaponsel li').live("click",function () {
        var weaponindex = $(this).attr('id')[4];
        var weaponcount = $(this).attr('id')[6];
        var iinput = $('#iweapon'+ weaponindex);
        if (iinput.val() == weaponcount){
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#FFFFFF'); 
            iinput.val(0);
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#AAD85B'); 
            }
        else {
            $('#wpli'+weaponindex+'C'+iinput.val()).css('background','#FFFFFF'); 
            iinput.val(weaponcount);
            $(this).css('background','#AAD85B');
        }
        calcDmg();
    });
    $('.weaponcount').live("change",function () {
        var weaponcount = $(this).val();
        var weaponindex = $(this).attr('id')[7];
        for(i=0;i<=5; i++){
            if (i==weaponcount)
                $('#wpli'+weaponindex+'C'+weaponcount).css('background','#AAD85B');
            else
                $('#wpli'+weaponindex+'C'+i).css('background','#FFFFFF');
        }
        calcDmg();
        });
    $('.weaponcount').live("keypress", function (event) {
        var e = event.which; var noStart = 48; var noEnd = 59; var jokerKey = 0;
        if ( e == 8 || e == 9 || e == 37 || e == 39 || ( noStart <= e && e < noEnd ) || jokerKey == e) return true;
    	else return false;
        });
}

function calcDmg() {
    var cWellness = parseFloat($('#wellnessvalue').text());
  	var strenght = parseFloat($("#content table td:eq(1)").text());
	var rankBonus = (RANKS.indexOf($("#content table td:eq(3) img").attr("alt")) + 1) * 0.2 + 1;
	var ConstDamage = 2 *  strenght * rankBonus;
    var totalDamage = 0;
    for(var i=5; i>=0; i--)
    {
       var db = $('#iweapon'+i).val();
       var qdam = ' [';
       var qtdmg = 0;
       for(j=0; j<db; j++) {
           if (cWellness >= 40)
           {
                var ctDamage = ConstDamage * (1 + (cWellness - 25) / 100);
                if (i>0) 
                    ctDamage = Math.ceil(ctDamage * (1+i/5));
                else    
                    ctDamage = Math.ceil(ctDamage * (1/2));

                cWellness -= 10;
                totalDamage += ctDamage;
                qtdmg += ctDamage;
                if (qdam.length<16){ 
                    if (j < 5 ) qdam += ctDamage;
                    if (qdam.length>14 && j<db-1) qdam += '..';
                    else if (j<db-1 && cWellness>=40) qdam +=' ';
                }
            }         
        }
        qdam += ']'
        if (db <2 || qtdmg == 0) qdam = ' ';
        if (db >0) $('#wpdm'+i).html('<strong>'+qtdmg+'</strong>'+qdam);
        else $('#wpdm'+i).html(' ');
   }
   $('#dcres').html('<strong>'+totalDamage+'</strong>');
}

function GetErepDay() { 
 	var date = 0;
    date = parseInt($("#clock .eday strong").text() ,10);
	return date;
}

function damageSort(a, b) { return (b.day - a.day);}

function DamageUpdate() {
	var sReq = "http://api.erepublik.com/v1/feeds/citizens/";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq + cID + '.json',
		onload: function (json) {
			eval('prof = '+ json.responseText);
            var today = GetErepDay();
            GM_setValue('ma_savedday'+cID, today);

            var lastdamages = eval(GM_getValue('ma_zerodamages'+cID,undefined));
            if (lastdamages == undefined)
            {
                lastdamages = [{day: today, dam:(prof["damage"])}];
            }
            else
            {
                lastdamages.push({day: today, dam:(prof["damage"])});
                lastdamages.sort(damageSort);                
                while (lastdamages.length > 6)
                    lastdamages.pop();
            }                 
            GM_setValue('ma_zerodamages'+cID, uneval(lastdamages));
            
            if ($("#owninv").size() != 0)
                ProfileUpdate();
		},
	});
}

function ProfileUpdate () {
    var zdmg = eval(GM_getValue('ma_zerodamages'+cID));
    if (zdmg != undefined){
        var current = zdmg[0].dam;
        $('span.goright.special').each(function(i) {//p.padded 
            if ($(this).text().indexOf('/') != -1)
                current = parseInt($(this).text(),10);
        });
        var deltadm = current-zdmg[0].dam;
        var todaydm = '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  Today Damage:</span>';
        todaydm += '<span class="goright special">&nbsp;&nbsp;&nbsp;'+deltadm+'&nbsp;</span>';
        
            todaydm += '<p class="padded"><span class="goleft"><img class="iconsoft" src="/images/parts/icon-hero.gif" alt="Hero Fights"/>  Latest Damages:</span>';
            for(var i=1; i<zdmg.length;i++)
            {
                todaydm += '<span class="goright special">'+zdmg[i].day+'&nbsp;Day:&nbsp;'+(zdmg[i-1].dam-zdmg[i].dam)+'&nbsp;</span>';//
            }
        
        $('div.quarter:last-child').append(todaydm);//div.holder.iep
    }
}

function BattleUpdate() {
    var today = GetErepDay();
    var inHTML = '<span class="double">Damages <br/>';//<div class="ls-half last">
    var damage = parseInt($('.lsvalue span').text(), 10);
    var ctotaldamage = ($('em.double:has(img[alt=Trivia-arrow-up])').text().match(/(\d+).\/.\d/)[1]);
    var lsdamage = eval(GM_getValue('lsdamage', undefined));  //[{ day: 650, dmg: [12340, 12367, 12410]}];  
    if (lsdamage == undefined) {
        lsdamage = [{ day: today, dmg: [(ctotaldamage - damage), ctotaldamage]}];
    }
    else {
        if (lsdamage[0].day != today) {
            lsdamage.push({ day: today, dmg: [(ctotaldamage - damage), ctotaldamage] })
     } else {
        lsdamage[0].dmg.push(ctotaldamage);
     }

     lsdamage.sort(damageSort);
     while (lsdamage.length > 6)
         lsdamage.pop();
    }
    
    GM_setValue('ma_lsdamage'+cID, uneval(lsdamage));

    var sum = 0;
    for (var i = 1; i < lsdamage[0].dmg.length; i++) {
        inHTML += (lsdamage[0].dmg[i] - lsdamage[0].dmg[i - 1]) + ' ';
        sum += (lsdamage[0].dmg[i] - lsdamage[0].dmg[i - 1]);
    }
    
    inHTML += '</span><em><span><strong>' + sum +' </strong></span></em>';
    $('.ls-half:eq(7)').html(inHTML);
}

var profileupdelayed = false;

function StartDamageCalculator() {
	DamageCalculator();
}

function StartProfileUpdate() {
	if (!profileupdelayed && $("#owninv").size() != 0) {
		ProfileUpdate();
	}
}

function StartBattleUpdate() {
	BattleUpdate();
}
// MILITARY ADVISER END //

// TweetClean BEGIN //
pagesFunctions.push({p: 'article/',		c:'tc',	t:'b', 	f: StartTweetClean});
function StartTweetClean() {
	$('#tweeter_button').css('display','none');
	$('#facebook_button').css('display','none');
}
// TweetClean END //

// COMPANY MARKET BEGIN //
pagesFunctions.push({p: 'companies-for-sale/',		c:'CoMa',	t:'b', 	f: StartCompanyMarket});
var industryColor = {'food':'green', 'weapon':'green', 'gift':'blue', 'moving tickets':'blue','house':'blue','hospital':'red','defense system':'red', 'grain':'blue', 'diamonds':'blue',
'iron':'green', 'oil':'blue', 'wood':'blue' };

var bigIndustries = {'house':20,'hospital':20,'defense system':20};

var industries = {'food':'grain', 'weapon':'iron', 'gift':'diamonds', 'moving tickets':'oil','house':'wood','hospital':'wood','defense system':'wood' };

var creation = [0,20,40,90,190,390];
var priceArray = 
{'food':[0,0.015,0.032,0.058,0.1,0.175],
 'gift':[0,0.045,0.09,0.145,0.27,0.56],
 'weapon':[0,0.125,0.25,0.45,0.65,1],
 'moving tickets':[0,0.213,0.6,1,1,1],

 'house':[0,3.5,8,15,24,35],
 'hospital':[0,35,80,120,180,300],
 'defense system':[0,35,80,120,180,300]
}

function Company(dom, price) {
	
	this.price = price;
	this.id = $(dom).find("company > id").text();
	this.emp = $(dom).find("company > employees employee").size();
	this.country = $(dom).find("company > country").text();
	this.quality = $(dom).find("company > quality").text();
	this.region = $(dom).find("company > region").text();
	this.industry = $(dom).find("company > industry").text();
	this.domain = $(dom).find("company > domain").text();
	this.raw = $(dom).find("raw-materials-in-stock").text();
	
	this.estimatedPrice = creation[this.quality]-5;
	this.hasOrigLic = false;
	this.licences = new Array();
	var c = this;
	$(dom).find("export-licences export-licence").each(function (i) {
		var licCountry = $(this).find("country").text();
		if (!c.hasOrigLic && c.country==licCountry) {
			c.hasOrigLic = true;
			c.estimatedPrice += 5;
		}
		var older = false;
		for(var i = 0; i<c.licences.length; i++) {
			older |= licCountry==c.licences[i];
		}
		if (!older) {
			c.licences.push(licCountry);
		}
	});
	this.stock = $(dom).find("company > stock").text()*1;
	$(dom).find("marketplace-offers marketplace-offer").each(function (i) {
		c.stock += $(this).find("quantity").text()*1;
	});
	this.stock_price = 0;
	this.raw_price = 0;
	this.color='gray';
	if (this.domain=='land') {
		this.stock_price = this.stock * this.quality * 0.006;
		this.raws = rawRegions[this.region];
		if (this.raws==null) {
			this.color = 'red';
			this.estimatedPrice = 0;
		} else {
			var level =  this.raws[this.industry];
			if (level=='2.00') {
				this.color = 'green';
			} else if (level=='1.00') {
				this.color = 'blue';
				this.estimatedPrice = this.estimatedPrice / 2;
			} else {
				this.color = 'red';
				this.estimatedPrice = 0;
			}
		}
	} else {
		this.stock_price = this.stock * priceArray[this.industry][this.quality];
		this.raw_price = this.raw * 0.006;
	}
	
	this.inv = (Math.floor((this.stock_price + this.raw_price)*10+0.5)/10);

	this.estimatedPrice += this.inv;

	this.optimalEmpl = PRODUCTS[this.industry].rec_employee;

	this.minEmpl = this.optimalEmpl * 0.8;
	this.maxEmpl = this.optimalEmpl * 1.2;
	
	this.emplColor = 'gray';
	
	if (this.optimalEmpl==this.emp) {
		this.emplColor = 'green';
		this.estimatedPrice += 3*this.quality;
	} else if (this.minEmpl<=this.emp && this.emp <= this.maxEmpl) {
		this.emplColor = 'blue';
		this.estimatedPrice += 2*this.quality;
	}

	this.iColor = industryColor[this.industry];
}

function getCompanyInfo(compID, price) {
	var compurl = "http://api.erepublik.com/v1/feeds/companies/"+compID;
	GM_xmlhttpRequest({
		method: 'GET',
		url: compurl,
		onload: function (resp) {
			var dom = new DOMParser().parseFromString(resp.responseText, "text/xml");
			var company = new Company(dom);
			$("#coin_info_" + compID).html(
'<table width="100%"><tr><td><span style="color:'+company.iColor +'">Industry:&nbsp;'+company.industry
+' Q'+company.quality+'</span>'
+', <span style="color:'+(company.hasOrigLic?(company.licences.length>1?'blue':'gray'):'red')+'">Lic:&nbsp;'+company.licences.length+'</span>'
+'<br/>Country:&nbsp;'+company.country
+'<br/>' 
+'<span style="color:'+company.color+'">Region:&nbsp;'+company.region+'</span>'
+'<br/>' 
+'<span style="color:'+company.emplColor+'">Employees:&nbsp;'+company.emp+'</span>'
+', Stock:&nbsp;'+company.stock
+(company.domain!='land'?', Raw:&nbsp;'+company.raw:'')
+'<br/>' 
+'</td><td style="font-size:large" vertical="middle" width="100"><span style="color:' +(company.estimatedPrice>price && company.iColor!='red'?
((company.estimatedPrice>price*1.1)?'green':'blue')
:'gray')
+'">'+company.estimatedPrice +' <br/>' + price+'</span></td></tr></table>'

);

		},

	});

}

function StartCompanyMarket() {
	var companies = new Array();
//	document.domain = "erepublik.com";

	$('table.offers tr').each(function(i) {
		if (i==0) {
			$(this).find('td:eq(3)').remove();
			$(this).find('th:eq(2)').remove();
			$(this).find('th:eq(1)').attr('width','400');
		} else {
			var price = $(this).find('td:eq(3) span').html();
			price += ''+$(this).find('td:eq(3) sup').html();
			$(this).find('td:eq(3)').remove();
			$(this).find('td:eq(2)').remove();
			var comp = $(this).find('td div.entity a.avatarholder').attr('href').match(/.*-(\d+)/)[1];
			$(this).find('td:eq(1)').html("<div id='coin_info_"+comp+"' style='font-size:small'>"+comp+"</div>");
			getCompanyInfo(comp, price);
		};
	});
}
// COMPANY MARKET END //

// COMPANY MARKET Pro BEGIN //
pagesFunctions.push({p: 'companies-for-sale/',		c:'CMPro',	t:'b', 	f: StartCompanyMarketPro, s:true});

function StartCompanyMarketPro() {


	var html = '<div class="holder" id="companyPro">\
		<h2 class="section"  style="cursor:pointer">Company Market Pro (click to view)</h2>\
		<div class="indent">\
			<div class="infoholder" id="companyProMenu" style="width:540px;display:none;">\
				<div class="left">\
					<table id="companyProTable" width="540">\
						<tr><th><b>Company</b></th><th><b>Industry</b></th><th><b>Price</b></th><th><b>Estimated</b></th><th><b>Dif</b></th><th><b>Perc</b></th></tr>\
					</table>\
				</div>\
				<div class="left">\
					<p class="goleft"><button id="cmpCrawl">Crawl</button></p>\
				</div>\
				<div class="left">\
					<p class="goleft regular">Filter</p>\
					<p class="goleft"><table>\
						<tr><th><b>Industry</b></th><th><b>Q1</b></th><th><b>Q2</b></th><th><b>Q3</b></th><th><b>Q4</b></th><th><b>Q5</b></th><th><b>Industry</th><td>Q1</td><td>Q2</td><td>Q3</td><td>Q4</td><td>Q5</td><th>Industry</th><td>Q1</td><td>Q2</td><td>Q3</td><td>Q4</td><td>Q5</td>';

var count = 0;
for(var key in PRODUCTS) {
	if((count++ % 3) == 0) {
		html += '</tr><tr>';
	}
	html += '<th>'+key+'</th>';
	for(var q = 1; q<=5; q++) {
		html += '<td align="center"><input type="checkbox" checked="checked" id="cmpFilter'+key+'q'+q+'" name="cmpFilter'+key+'q'+q+'"/></td>'
	}
};
	


html += '					</tr></table>\
					</p>\
				</div>\
				<div class="left">\
					<p class="goleft regular">Max price</p>\
					<p class="goleft"><input onkeyup="upkey(event, this);" onkeypress="return checkNumber(\'float\', event);" id="cmpMaxPrice" class="ammount" value="0"></p>\
				</div>\
			</div>\
		</div>\
	</div>\
	';
	$("#content div.holder:first").before(html);
	$("#companyPro h2:first").click(function() {
		$("#companyProMenu").slideToggle("slow");
	});
	$("#cmpCrawl").click(function() {
		clearCompanyProTable();
		var last = $('ul.pager li:last a').attr('href');
		var parts = last.split('/');
		var url = BASE_URL+parts[1]+'/'+parts[2]+'/'+parts[3]+'/';
		GM_log('url:'+url+','+parts[4]);
		cmpCompanies = new Array();
		for(var p=1; p<=parts[4]; p++) {
			var purl = url+p;
	
			GM_xmlhttpRequest({
				method: 'GET',
				url: purl,
				onload: function (resp) {
					var html = resp.responseText;
					var sorok = $(html).find('table.offers tr:gt(0)');
					sorok.each(function(i) {
						var price = $(this).find('td:eq(3) span').html();
						price += ''+$(this).find('td:eq(3) sup').html();
						var cid = $(this).find('td div.entity a.avatarholder').attr('href').match(/.*-(\d+)/)[1];
						var cname = $(this).find('td div.entity a.avatarholder').text();
						getCompanyInfoPro(cid, cname, price);
					});
				}
			});
		}
	});
	
	
}

var cmpCompanies = new Array();

function clearCompanyProTable() {
	$("#companyProTable tr:gt(0)").remove();
}

function getCompanyInfoPro(compID, cname, price) {
	var compurl = "http://api.erepublik.com/v1/feeds/companies/"+compID;
	GM_xmlhttpRequest({
		method: 'GET',
		url: compurl,
		onload: function (resp) {
			var dom = new DOMParser().parseFromString(resp.responseText, "text/xml");
			var company = new Company(dom, price);
			cmpCompanies.push(company);
			if (company.estimatedPrice>price*1.1 && $('#cmpFilter'+company.industry+'q'+company.quality).attr('checked')) {
				cmpShowCompany(company);
			}
		},

	});

}

function cmpShowCompany(company) {
	$("#companyProTable").append(
		'<tr><th>'+company.id+'</th><td>Q'
		+company.quality+' '
		+company.industry+'</td><td>'
		+company.price+'</td><td>'
		+company.estimatedPrice+'</td><td>'
		+Math.floor((company.estimatedPrice-company.price)*10)/10+'</td><td>'
		+(Math.floor(((company.estimatedPrice/company.price)-1)*1000+0,5)/10)+'</td></tr>');
}

// COMPANY MARKET Pro BEGIN //

// REGIONS BEGIN //

pagesFunctions.push({p: 'country/',		c:'RegI',	t:'b', 	f: StartRegions});
function StartRegions() {
	//if(PAGE.length != 6) return;
	th = '<th width="235px"></th><th width="75px">Population</th><th width="44px">H</th><th width="44px">DS</th><th width="132px"">High resources</th><th width="65px"></th>';
	$("table.regions tr:first").html(th);
	$("table.regions th").css({"text-align":"center","font-weight":"bold"});
	$("table.regions tr:gt(0)").each(function() {
		$("td:first",this).after('<td><img src="/images/parts/ajax-loader.gif" /></td><td></td><td></td><td></td>');
	});
	country_id = $("#countries_selector a[href$='"+PAGE[5].replace(/#/,"")+"']").attr("id");
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.erepublik.com/v1/feeds/countries/"+country_id,
		onload: function(response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$("table.regions tr:gt(0)").each(function(i,data) {
				region_id = $("name",response.responseXML).filter(function() {
					return $(this).text() == $("a:first",data).text();
				}).parent().find("id").text();
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://api.erepublik.com/v1/feeds/regions/"+region_id,
					onload: function(response) {
						response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
						$("region",response.responseXML).each(function() {
							region_name = $(this).children("name").text();
							population = $(this).children("population").text();
							$("table.regions tr:gt(0)").eq(i).find("td:eq(1)").html('<strong>'+population+'</strong>');
							$("construction",this).each(function() {
								if($("name",this).text() == "hospital") {
									td_id = 2;
									img_name = "hospital";
								}
								else {
									td_id = 3;
									img_name = "defensesystem";
								}
								td = $("table.regions tr:gt(0)").eq(i).find("td").eq(td_id);
								td.html('<img src="/images/parts/icon_industry_'+img_name+'.gif" width="44">');
								qlmeter = '<div style="width:33px;margin:0 auto;"><span class="qllevel" style="width: '+$("quality",this).text()*20+'%;margin-top:-15px;"><img width="33" src="/images/parts/ql-indicator_full.gif" alt="Quality Level" title="Quality"></span></div>';
								td.append(qlmeter);
							});
							$("raw-material",this).each(function() {
								if($("value",this).text() == "2.00") {
									img = '<img src="/images/parts/icon_industry_'+$("name",this).text()+'.gif" width="44">';
									$("table.regions tr:gt(0)").eq(i).find("td").eq(4).append(img);
								}
							});
						});
					}
				});
			});
		}
	});

}

// REGIONS END //

// ProfIt BEGIN //
pagesFunctions.push({p: 'company-employees/',		c:'PrIt',	t:'b', 	f: StartProfIT});
pagesFunctions.push({p: 'company/',					c:'PrIt',	t:'b', 	f: StartProfIT});

function StartProfIT() {
	profIT();
}


var COMPANY = {
	"country"		:	null,
	"domain"		:	null,
	"industry"		:	null,
	"quality"		:	null,
	"id"			:	null,
	"employees"		:	0,
	"productivity"	:	0,
	"salary"		:	0
}





function output() {
	html = new Array();
	html["holder"] = '\
	<div class="holder" id="statsholder">\
		<h2 class="section">Daily productivity (click to view)</h2>\
		<div class="indent">\
			<div class="infoholder" id="stats" style="width:540px;display:none;">\
			</div>\
		</div>\
	</div>\
	';
	html["product_price"] = '\
		<div class="left">\
			<p class="goleft regular">Product price</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="product_price" class="ammount" value="0"></p>\
		</div>\
	';
	html["raw_price"] = '\
		<div class="left">\
			<p class="goleft regular">Raw price</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="raw_price" class="ammount" value="0"></p>\
		</div>\
	';
	html["salary_cost"] = '\
		<div class="left">\
			<p class="goleft regular">Salary cost</p>\
			<p class="goleft"><input onkeyup="upkey(event, this);calculateProfit()" onkeypress="return checkNumber(\'float\', event);" id="salary_cost" class="ammount" value="0"></p>\
		</div>\
	';
	html["total_productivity"] = '\
		<div class="left">\
			<p class="goleft regular">Total productivity</p>\
			<p class="goleft special"><span id="total_productivity">0</span></p>\
			<p class="goleft currency"><span id="products">0</span><span> products</span></p>\
		</div>\
	';
	html["raw_cost"] = '\
		<div class="left">\
			<p class="goleft regular">Raw cost</p>\
			<p class="goleft special"><span id="raw_cost">0</span></p>\
			<p class="goleft currency"><span id="raw_needed">0</span><span> raw needed</span></p>\
		</div>\
	';
	html["profit"] = '\
		<div class="left">\
			<p class="goleft regular">Daily profit</p>\
			<p class="goleft special"><span id="profit">0</span></p>\
			<p class="goleft currency"><span id="per_product">0</span> per product</p>\
		</div>\
	';
	html_output = "";
	for(i=0;i<arguments.length;i++) {
		html_output += html[arguments[i]] || "";
	}
	return html_output;
}

function EmployeeProductivity() {
	if($("#is_manager").val() != "1") return;
	raw_price = 1*GM_getValue("raw_price-"+COMPANY["id"],0);
	product_price = 1*GM_getValue("product_price-"+COMPANY["id"],0);
	employees_nr = 1*GM_getValue("employees-"+COMPANY["id"],0);
	$("h2.biggersection").append(" ("+employees_nr+')<br />Product price: <span id="product_price">'+product_price+'</span>');
	if(COMPANY["domain"] != "land") $("h2.biggersection").append(' Raw price: <span id="raw_price">'+raw_price+'</span>');
	$("table.employees_details th.e_wellness").css("text-align","center").append(" Productivity Profit");
	$.each($("table.employees_details tbody tr"),function() {
		$(this).find("strong:eq(1)").after("<strong>0</strong><strong>0</strong>");
		$(this).find("strong").css("margin-bottom","2px");
		skill = 1*$("strong:eq(0)",this).html();
		wellness = 1*$("strong:eq(1)",this).html();
		productivity = getProductivity(employees_nr,skill,wellness);
		$("strong:eq(2)",this).html(Math.round(productivity*100)/100);
		salary = 1*$("input:first",this).val();
		profit = Math.round((productivity*(product_price/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1) - raw_price*COMPANY["quality"])-salary)*100)/100;
		$("strong:eq(3)",this).html(profit).css("color","green");
		if(profit<0) $("strong:eq(3)",this).css("color","red");
	});
}

function CompanyStats() {
	js="<script>\
			function addTitle(el,val){\
				val = Math.round(val*curr_in_gold*10000)/10000 + ' GOLD (1'+curr+' = '+curr_in_gold+'GOLD)';\
				jQuery(el).attr('title',val);\
			}\
			function calculateProfit(input){\
				products = 1*jQuery('#products').html();\
				if(!products) return;\
				product_price = 1*jQuery('#product_price').val();\
				raw_price = 1*jQuery('#raw_price').val() || 0;\
				salary_cost = 1*jQuery('#salary_cost').val();\
				raw_cost = raw_price*jQuery('#raw_needed').html();\
				jQuery('#raw_cost').html((Math.round(raw_cost*100)/100).toString());\
				profit = products*product_price-raw_cost-salary_cost;\
				jQuery('#profit').html((Math.round(profit*100)/100).toString());\
				per_product = profit/products;\
				jQuery('#per_product').html((Math.round(per_product*100)/100).toString());\
				if(jQuery('#curr_in_gold')) {\
					curr = jQuery('#curr').val();\
					curr_in_gold = jQuery('#curr_in_gold').val();\
					addTitle('#product_price',jQuery('#product_price').val());\
					addTitle('#raw_price',jQuery('#raw_price').val());\
					addTitle('#salary_cost',jQuery('#salary_cost').val());\
					addTitle('#raw_cost',jQuery('#raw_cost').text());\
					addTitle('#profit',jQuery('#profit').text());\
					addTitle('#per_product',jQuery('#per_product').text());\
				}\
			}\
		</script>";
	$("head").append(js);

	$("#content div.holder:eq(2)").before(output("holder"));
	$("#statsholder h2:first").mouseover(function() {
		$(this).css("cursor","pointer");
	});
	$("#statsholder h2:first").click(function() {
		$("#stats").slideToggle("slow");
	});
	if(COMPANY["domain"] == "land") {
		$("#stats").append(output("product_price","salary_cost","total_productivity","profit"));
		$("#stats").css("width","360px");
	}
	else {
		$("#stats").append(output("product_price","raw_price","salary_cost","total_productivity","raw_cost","profit"));
		$("#raw_price").keyup(function() {
			GM_setValue('raw_price-'+COMPANY["id"],$("#raw_price").val());
		});
	}
	$("#stats div,#stats p").css("width","180px");
	$("#product_price").keyup(function() {
		GM_setValue('product_price-'+COMPANY["id"],$("#product_price").val());
	});
	currency = $(".accountdisplay:eq(1) img").attr("title");
	$("#stats").prepend('<input type="hidden" id="curr" value="'+currency+'" />');
	if(CURR_IN_GOLD) {
		$("#stats").prepend('<input type="hidden" id="curr_in_gold" value="0" />');
		currInGold(currency);
	}

	employees_nr = $("#content div.holder:eq(3) span:first").html();
	GM_setValue("employees-"+COMPANY["id"],employees_nr);
	pages = Math.ceil(employees_nr/10);
	employees_url = $("#content div.holder:eq(3) a:first").attr("href");
	for(i=1;i<=pages;i++) {
		$.get(employees_url.replace(/.$/,i), function(data){
			$.each($("table.employees_details tbody tr",data),function() {
				wellness = 1*$("strong:eq(1)",this).html();
				skill = 1*$("strong:eq(0)",this).html();
				productivity = getProductivity(employees_nr,skill,wellness);
				salary = 1*$("input:first",this).val();
				COMPANY["salary"] += salary;
				COMPANY["productivity"] += productivity;
			});
			$("#salary_cost").val(round(COMPANY["salary"],2));
			$("#total_productivity").html(round(COMPANY["productivity"],2));
			products = COMPANY["productivity"]/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1);
			products_decimals = Math.ceil(2-Math.log(products)/Math.log(10));
			$("#products").html(round(products,products_decimals));
			raw_needed = COMPANY["productivity"]*COMPANY["quality"];
			$("#raw_needed").html(round(raw_needed,1));
			unsafeWindow.calculateProfit();
		});
	}
	var sReq = "http://api.erepublik.com/v1/feeds/market/";
	GM_xmlhttpRequest({ //------------------------ product price ----------------------------------
		method: 'GET',
		url: (sReq + COMPANY["industry"].replace(/ /g, "-")+'/'+COMPANY["quality"]+'/'+COMPANY["country"].replace(/ /g, "-")).toLowerCase(),
		onload: function (response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("records").each(function() {
				var vat = 0;
				if(COMPANY["domain"] != "land") $("#market_offers tr:gt(0)").each(function() {
					if($("img",this).attr("title") == COMPANY["country"]) vat = parseFloat($("input:first",this).val());
				});
				product_price = Math.round(parseFloat($(this).find("price:first").text())/(1+vat)*100)/100;
				$("#product_price").val(product_price);
				GM_setValue("product_price-"+COMPANY["id"],product_price.toString());
			});
			//if($("#product_price").val() == "0") $("#product_price").val(GM_getValue("product_price-"+COMPANY["id"],0));
			unsafeWindow.calculateProfit();
		}
	});
	if(COMPANY["domain"] == "land") return;
	for(q=1;q<=5;q++) {
		GM_xmlhttpRequest({ //----------------------------- raw price ---------------------------------
			method: 'GET',
			url: (sReq + PRODUCTS[COMPANY["industry"]]["raw_type"]+'/'+q+'/'+COMPANY["country"].replace(/ /g, "-")).toLowerCase(),
			onload: function (response) {
				url = response.finalUrl.split('/');
				quality = url[url.length-2];
				response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				$(response.responseXML).find("records").each(function() {
					raw_price = Math.round(parseFloat($(this).find("price:first").text())/quality*100)/100;
					if($("#raw_price").val()=="0" || raw_price < 1*$("#raw_price").val()) {
						$("#raw_price").val(raw_price);
						//change raw link
						raw_url = $("#content div.holder:eq(5) a:first").attr("href").replace(/quality-./,"quality-"+quality);
						$("#content div.holder:eq(5) a:first").attr("href",raw_url);
						$("#content div.holder:eq(5) a:first").html("Buy raw materials (Q"+quality+")");
					}
					GM_setValue("raw_price-"+COMPANY["id"],$("#raw_price").val());
				});
				//if($("#raw_price").val() == "0") $("#raw_price").val(GM_getValue("raw_price-"+COMPANY["id"],0));
				unsafeWindow.calculateProfit();
			}
		});
	}
}

function CompanyProductivity() {
	htm='\
	<div class="holder" id="statsholder">\
		<h2 class="section">Daily productivity (click to view)</h2>\
		<div class="indent">\
			<div class="infoholder" id="stats" style="width:540px;display:none;">\
				<div class="left" id="productivity">\
					<p class="goleft regular">Total productivity</p>\
					<p class="goleft"><span class="special" id="total_productivity">0</span></p>\
					<p class="goleft"><span class="currency" id="products">0</span><span class="currency"> products</span></p>\
				</div>\
			</div>\
		</div>\
	</div>\
	';
	$("#content div.holder.largepadded:first").after(htm);
	$("#statsholder h2:first").mouseover(function() {
		$(this).css("cursor","pointer");
	});
	$("#statsholder h2:first").click(function() {
		$("#stats").slideToggle("slow");
	});
	$("#stats div,#stats p").css("width","180px");

	employees_nr = $("#content div.holder.largepadded:first span:first").html();
	//GM_setValue("employees-"+COMPANY["id"],employees_nr);
	pages = Math.ceil(employees_nr/10);
	employees_url = $("#content div.holder.largepadded:first a:first").attr("href");
	for(i=1;i<=pages;i++) {
		$.get(employees_url.replace(/.$/,i), function(data){
			$.each($("table.employees_details tbody tr",data),function() {
				wellness = 1*$("strong:eq(1)",this).html();
				skill = 1*$("strong:eq(0)",this).html();
				productivity = getProductivity(employees_nr,skill,wellness);
				COMPANY["productivity"] += productivity;
			});
			$("#total_productivity").html(Math.round(COMPANY["productivity"]*100)/100);
			products = COMPANY["productivity"]/(PRODUCTS[COMPANY["industry"]]["raw_needed"] || 1);
			products_decimals = Math.ceil(2-Math.log(products)/Math.log(10));
			$("#products").html(round(products,products_decimals));
		});
	}
}

function addMarketLinks(e) {
	if(e && e.target.tagName != "H2") return;
	setTimeout(function() { //hack
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.erepublik.com/v1/feeds/countries",
		onload: function(response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$("#market_offers tr:gt(0)").each(function(i,licence) {
				$(response.responseXML).find("country").each(function() {
					if($("img",licence).attr("title") == $("name",this).text()) country_id = $("id",this).text();
				});
				$("td:last",licence).append('<span class="vround-btn-start goright"><span class="vround-btn-end">\
					<a class="vround-btn-core" title="" href="/en/market/country-'+country_id+'-industry-'+PRODUCTS[COMPANY["industry"]]["id"]+'-quality-'+COMPANY["quality"]+'/1">Go to marketplace</a></span></span>');
			});
		}
	});
	},10);
}

function currInGold(currency) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://api.erepublik.com/v1/feeds/exchange/"+currency+"/GOLD",
		onload: function(response) {
 			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("records").each(function() {
				curr_in_gold = $("record:first for",this).text();
				$("#curr_in_gold").val(curr_in_gold);
				unsafeWindow.calculateProfit();
			});
		}
	});
}

function profIT () {
	COMPANY["id"] = $("#company_id").val();
	var sReq = "http://api.erepublik.com/v1/feeds/companies/";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq + COMPANY["id"],
		onload: function (response) {
			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			$(response.responseXML).find("company").each(function() {
				COMPANY["country"] = $(response.responseXML).find("company > country").text();
				COMPANY["domain"] = $(response.responseXML).find("company > domain").text();
				COMPANY["industry"] = $(response.responseXML).find("company > industry").text();
				COMPANY["quality"] = $(response.responseXML).find("company > quality").text();
				var pages = [
					{p:"company-employees",	f:EmployeeProductivity},
					{p:"company",			f:waitMarketOffers}
				];
				$.each(pages, function() {
					if(PAGE[4] == this.p) this.f();
				});
			});
		}
	});
}

function waitMarketOffers() {
	if($("#is_manager").val() != "1") CompanyProductivity();
	else if(!$("#market_offers tr:gt(0)")) setTimeout(waitMarketOffers,50);
	else {
		addMarketLinks();
		$("#market_offers").bind("DOMNodeInserted",addMarketLinks);
		CompanyStats();
	}
}

function getProductivity(employees_nr,skill,wellness) {
	if(!wellness) return 0;
	if(employees_nr <= PRODUCTS[COMPANY["industry"]]["rec_employee"]) e_m = 1+employees_nr/PRODUCTS[COMPANY["industry"]]["rec_employee"];
	else e_m = 3-employees_nr/PRODUCTS[COMPANY["industry"]]["rec_employee"];
	if(e_m<1) e_m=1;
	if(!skill) skill = 0.1;
	if(COMPANY["domain"] == "land") productivity = 0.25*e_m*skill*(1+2*wellness/100)*2*1.5*(11-COMPANY["quality"])/10;
	else productivity = 0.5*e_m*skill*(1+2*wellness/100)*1.5/COMPANY["quality"];
	return productivity;
}

function round(fl,dc) {
	dc = dc || 0;
	dc = Math.floor(dc);
	if(dc<0) dc = 0;
	m = Math.pow(10,dc);
	return Math.round(fl*m)/m;
}

// ProfIt END //

// DUMMY BEGIN //
/*
pagesFunctions.push({p: 'article/',		c:'tc',	t:'b', 	f: StartTweetClean});
function StartTweetClean() {
	$('#tweeter_button').css('display','none');
	$('#facebook_button').css('display','none');
}
*/
// DUMMY END //
