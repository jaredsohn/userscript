// ==UserScript==
// @name           imperion helper
// @namespace      ru.adeliade
// @include        http://*.imperion.*/*
// @exlcude        http://forum.imperion.*/*
// ==/UserScript==

try {

// simple associative storage wrapper
// currently used only GM_* functions
function Storage(namespace) {
	function _load(var_name, default_value) {
		return GM_getValue(namespace+var_name, default_value);
	}
	function _store(var_name, value) {
		GM_setValue(namespace+var_name, value);
	}
	this.load = function(var_name, default_value) {
		try {
			return JSON.decode(_load(var_name, default_value));
		} catch(e) {
			return default_value;
		}
	};
	this.store = function(var_name, value) {
		_store(var_name, JSON.encode(value));
	}
}

// JSON encoder. BTW why Greasemonkey still have no such object?
var JSON = {
	decode: function(value) {
		return eval("(" + value + ")");
	},
	encode: function(value) {
		if(typeof value == "object") {
			if (typeof value.length != "undefined") { // array
				var a = [];
				for(var i = 0, l = value.length; i < l; i++) {
					a[i] = this.encode(value[i]);
				}
				return "[" + a + "]";
			} else { // object/hash
				var a = [];
				for(p in value) {
					a.push("'" + p + "':" + this.encode(value[p]));
				}
				return "{" + a + "}";
			}
		} else if (typeof value == "number") {
			return value.toString();
		} else if (typeof value == "undefined") {
			return "undefined";
		} else {
			return "'" + value.toString() + "'";
		}
	}
}

//var GAME_VERSION = $("serverTime") ? 0.91 : 0.9;

/* game data */
var ships = [
[	{cost: [865,	745,	790],			time:3000,		hp:320,	armor:0,	fire:1,	reload:1,	ec:4,		speed:200,fuel:1,	tank:15,	payload:0,		research:220,	type:'C'},
	{cost: [275,	230,	140],			time:1550,		hp:70,	armor:0,	fire:18,	reload:5,	ec:1,		speed:14,	fuel:1,	tank:4,		payload:60,	research:170,	type:'M'},
	{cost: [2225,	1940,	1535],	time:11400,	hp:595,	armor:5,	fire:22,	reload:40,	ec:19,	speed:15,	fuel:7,	tank:49,	payload:475,	research:500,	type:'M'},
	{cost: [3860,	3260,	1460],	time:21450,	hp:550,	armor:16,	fire:75,	reload:7,	ec:9,		speed:10,	fuel:20,	tank:200,	payload:330,	research:550,	type:'M'},
	{cost: [105000,67000,38000],	time:600000,	hp:7350,armor:25,	fire:160,reload:50,	ec:100,	speed:8,	fuel:400,tank:4000,payload:4000,research:8000,	type:'M'},
	{cost: [4080,	3000,	4920],	time:30000,	hp:1600,armor:0,	fire:1,	reload:1,	ec:20,	speed:4,	fuel:24,	tank:168,	payload:0,		research:7500,	type:'M'},
	{cost: [13500,13000,9360],		time:90000,	hp:4200,armor:6,	fire:1,	reload:1,	ec:60,	speed:3,	fuel:72,	tank:360,	payload:0,		research:5000,	type:'M'},
	{cost: [5280,	3600,	3120],	time:22500,	hp:1200,armor:3,	fire:1,	reload:1,	ec:15,	speed:9,	fuel:20,	tank:5000,	payload:0,		research:250,	type:'C'},
	{cost: [2735,	2880,	1585],	time:13500,	hp:720,	armor:5,	fire:1,	reload:1,	ec:9,		speed:9,	fuel:11,	tank:110,	payload:2000,research:120,	type:'C'},
	{cost: [25000,21000,15500],	time:167400,	hp:2000,armor:30,	fire:1,	reload:28,	ec:93,	speed:6,	fuel:180,tank:2160,payload:20000,research:1200,	type:'C'},
	{cost: [995,	845,	650],			time:6230,		hp:320,	armor:5,	fire:1,	reload:1,	ec:6,		speed:12,	fuel:20,	tank:100,	payload:500,	research:150,	type:'C'},
	{cost: [21000,17500,13000],	time:72000,	hp:4800,armor:10,	fire:1,	reload:1,	ec:30,	speed:6,	fuel:300,tank:3000,payload:2400,research:400,	type:'C'}
],
[	{cost: [575,	910,	915],			time:3000,		hp:320,	armor:0,	fire:1,	reload:1,	ec:4,		speed:160,fuel:1,	tank:20,	payload:0,		research:200,	type:'C'},
	{cost: [380,	495,	205],			time:3150,		hp:125,	armor:1,	fire:17,	reload:8,	ec:2,		speed:15,	fuel:2,	tank:12,	payload:0,		research:140,	type:'M'},
	{cost: [6215,	6720,	3865],	time:24000,	hp:1600,armor:10,	fire:18,	reload:76,	ec:18,	speed:20,	fuel:29,	tank:464,	payload:0,		research:400,	type:'M'},
	{cost: [4800,	11500,2880],		time:42000,	hp:1600,armor:4,	fire:45,	reload:24,	ec:16,	speed:12,	fuel:24,	tank:240,	payload:800,	research:1000,	type:'M'},
	{cost: [6720,	8065,	2015],	time:36000,	hp:1550,armor:6,	fire:200,reload:4,	ec:14,	speed:8,	fuel:29,	tank:290,	payload:0,		research:2500,	type:'M'},
	{cost: [103500,149000,71500],time:675000,	hp:18500,armor:5,	fire:20,	reload:1500,ec:120,speed:7,	fuel:500,tank:7000,payload:0,		research:8500,	type:'M'},
	{cost: [1440,	5160,	5400],	time:30000,	hp:1600,armor:25,	fire:1,	reload:1,	ec:20,	speed:5,	fuel:24,	tank:24,	payload:0,		research:8000,	type:'M'},
	{cost: [14000,19500,13000],	time:97500,	hp:4550,armor:5,	fire:1,	reload:1,	ec:65,	speed:4,	fuel:78,	tank:468,	payload:0,		research:6000,	type:'M'},
	{cost: [1025,	1570,	605],		time:6000,		hp:320,	armor:5,	fire:1,	reload:1,	ec:4,		speed:12,	fuel:6,	tank:48,	payload:800,	research:120,	type:'C'},
	{cost: [11000,16500,4800],		time:60000,	hp:2850,armor:5,	fire:1,	reload:1,	ec:24,	speed:10,	fuel:48,	tank:480,	payload:16000,research:800,	type:'C'},
	{cost: [1765,	2620,	1315],	time:12540,	hp:445,	armor:5,	fire:1,	reload:1,	ec:7,		speed:10,	fuel:45,	tank:450,	payload:1000,research:150,	type:'C'},
	{cost: [27000,32500,20000],	time:120000,	hp:6400,armor:5,	fire:1,	reload:1,	ec:40,	speed:4,	fuel:400,tank:6000,payload:3200,research:400,	type:'C'}
],
[	{cost: [145,	125,	90],			time:750,		hp:80,	armor:0,	fire:1,	reload:1,	ec:0,		speed:2,	fuel:0,	tank:0,		payload:0,		research:5,		type:'C'},
	{cost: [720,	720,	960],			time:300,		hp:320,	armor:0,	fire:1,	reload:1,	ec:1,		speed:2,	fuel:24,	tank:480,	payload:0,		research:270,	type:'C'},
	{cost: [1015,	725,	800],			time:3750,		hp:370,	armor:0,	fire:23,	reload:12,	ec:5,		speed:13,	fuel:3,	tank:15,	payload:285,	research:120,	type:'M'},
	{cost: [870,	750,	540],			time:4500,		hp:285,	armor:0,	fire:12,	reload:44,	ec:6,		speed:16,	fuel:4,	tank:48,	payload:225,	research:350,	type:'M'},
	{cost: [1585,	745,	1045],		time:3750,		hp:240,	armor:12,	fire:45,	reload:6,	ec:5,		speed:11,	fuel:5,	tank:60,	payload:330,	research:2000,	type:'M'},
	{cost: [47520,26400,31680],	time:108000,	hp:14800,armor:0,	fire:60,	reload:128,ec:144,	speed:9,	fuel:200,tank:3000,payload:6400,research:7000,	type:'M'},
	{cost: [870,	750,	640],			time:4500,		hp:80,	armor:0,	fire:300,reload:1,	ec:6,		speed:10,	fuel:3,	tank:15,	payload:0,		research:2200,	type:'M'},
	{cost: [725,	625,	1650],		time:3750,		hp:400,	armor:0,	fire:1,	reload:1,	ec:5,		speed:12,	fuel:6,	tank:48,	payload:0,		research:2500,	type:'M'},
	{cost: [2610,	4080,	3820],	time:13500,	hp:1400,armor:0,	fire:1,	reload:1,	ec:18,	speed:2,	fuel:21,	tank:63,	payload:0,		research:6000,	type:'M'},
	{cost: [11400,9900,	8700],	time:37500,	hp:3500,armor:6,	fire:1,	reload:1,	ec:50,	speed:5,	fuel:60,	tank:420,	payload:0,		research:4500,	type:'M'},
	{cost: [1720,	1320,	955],		time:6750,		hp:510,	armor:8,	fire:1,	reload:1,	ec:9,		speed:10,	fuel:30,	tank:270,	payload:800,	research:160,	type:'C'},
	{cost: [17010,15875,23815],	time:26250,	hp:5600,armor:10,	fire:1,	reload:1,	ec:35,	speed:5,	fuel:350,tank:7000,payload:2800,research:400,	type:'C'}
]
];

var traders_capacity = {
	terrans: 4000,
	titans: 3000,
	xen: 5000
}

var galaxyNr = 0;
/* game functions */
function id_from_xy(c) {
	return (400-c.y)*801 + (c.x+400) + 1 + (galaxyNr-1) * (801*801);
}

function xy_from_id(id) {
	id -= 1 + (galaxyNr-1) * (801*801);
	var x = (id % 801) - 400;
	var y = 400 - (id - x - 400) / 801;
	return {x:x, y:y};
}

function distance(c1, c2) {
	return Math.sqrt(
		Math.pow(c2.x - c1.x, 2) +
		Math.pow(c2.y - c1.y, 2)
	);
}

/*if (GAME_VERSION < 0.91) {
	CU2EP = function(CU) { return 3000*Math.pow(CU, 2.1); }
	EP2CU = function(EP) { return Math.pow(EP/3000, 1/2.1); }
} else {*/
	CU2EP = function(CU) { return 2500*Math.pow(CU, 2.3); }
	EP2CU = function(EP) { return Math.pow(EP/2500, 1/2.3); }
//}

// helper functions
if (typeof Array.prototype.each == "undefined") {
	Array.prototype.each = function(callback) {
		for (var i = 0, l = this.length; i < l; i++) {
			callback(this[i], i);
		}
	}	
}

Array.prototype.sortBy = function(fieldName, sign) {
	if (!sign) sign = 1;
	return this.sort(function(a, b){
		return sign * (a[fieldName] - b[fieldName]);
	});
}

Array.prototype.clone = function() {
	var a = [];
	for (var i = 0, l = this.length; i < l; i++) {
		a[i] = this[i];
	}
	return a;
}

String.prototype.to_i = function() {
	return parseInt(this.replace(/[.,']/g, ""), 10) || 0;
}

$ = function(id) {
	return document.getElementById(id);
}

// usage example: $$("tr[2n+3]/td[3]")
$$ = function(path, nodeList) {
	if (typeof nodeList == "undefined") {
		nodeList = [document];
	} else if (typeof nodeList.length == "undefined") {
		nodeList = [nodeList];
	}
	
	m = path.match(/^([^\/]+)(\/)?(.*)$/);
	var selector = m[1], remainderPath = m[3];
	m = selector.match(/([\w.]+)(\[([\w+]+)\])?/);
	var eltSelector = m[1], nodeIndexSelector = m[3];
	m = eltSelector.match(/(\w+)(\.(\w+))?/);
	var tag = m[1], className = m[3];
	
	if (nodeIndexSelector) {
		m = nodeIndexSelector.match(/(\d+)?(n)?(\+)?(\d+)?/);
		if (m[2]) {
			start = parseInt(m[4]) || 0;
			step = parseInt(m[1]) || 1;
		} else {
			start = parseInt(m[1]);
			step = Infinity;			
		}
	} else {
		start = 0;
		step = 1;
	}
	var newNodeList = [];
	nodeList.each(function(node){
		var elts = node.getElementsByTagName(tag);
		for (var i = start, l = elts.length; i < l; i += step) {
			var elt = elts[i];
			if (!className || elt.className.match(className)) {
				newNodeList.push(elt);
			}
		}
	});
	if (remainderPath && newNodeList.length) {
		return $$(remainderPath, newNodeList);
	} else {
		return newNodeList;
	}
}

function toggleActive(elt) {
	if (elt.className.match(/active/)) {
		elt.className = elt.className.replace(/active/, "");
	} else {
		elt.className += " active";
	}
}

function blinkTroopsMovement(elt) {
	toggleActive(elt);
	var next_time = $$('a/span[1]', $(elt.id+'Content'))[0].innerHTML;
	var dateObj = new Date();
	var seconds = next_time - dateObj.getTime() / 1000;
	if (seconds > 0) {
		var next_blink = Math.round(200+200*Math.log(seconds));
		setTimeout(blinkTroopsMovement, next_blink, elt);
	}
}

/* language part */
function latin_decline (n, key) {
	var forms = this[key];
	return n + " " + forms[n==1?0:1];
}

function rus_decline(n, key) {
	var forms = this[key];
	var s = forms[2];
	var L = n % 100;
	if ((L < 10) || (L > 20)) {
		var X = L % 10;
		if (X == 1) s = forms[0];
		if ((X >= 2) && (X <= 4)) s = forms[1];
	}
    return n + " " + s;
}

var translations = {
	'en':{
		'decline':latin_decline,
		'day':["day", "days"],
		'hour':["hour", "hours"],
		'less_than_hour': "less than hour",
		'next_planet_in': "Next planet available in:",
		'with_expansion_research': "With Expansion research:",
		'center_map': "Center Map",
		'recycle': "Recycle",
		'distance': "distance",
		'name': "Name",
		'action': "action",
		'debris': "Debris fields",
		'asteroid': "Asteroid"
	},
	'de':{
		'decline':latin_decline,
		'day':["Tag", "Tage"],
		'hour':["Stunde", "Stunden"],
		'less_than_hour': "Stunden weniger als",
		'next_planet_in': "Näschte Planeten in:",
		'with_expansion_research': "mit Expansionsforschung:",
		'center_map': "Karte zentrieren",
		'recycle': "Recycle",
		'distance': "Distanz",
		'name': "Name",
		'action': "Aktion",
		'debris': "Trümmerfeld",
		'asteroid': "Asteroid"
	},
	'ru':{
		'decline':rus_decline,
		'day':["день", "дня", "дней"],
		'hour':["час", "часа", "часов"],
		'less_than_hour': "меньше часа",
		'next_planet_in': "Следующая планета доступна через:",
		'with_expansion_research': "С исследованием экспансии:",
		'center_map': "Центрировать карту",
		'recycle': "Переработать",
		'distance': "расстояние",
		'name': "имя",
		'action': "действие",
		'debris': "Поля обломков",
		'asteroid': "Астероид"
	}
}

function showDays(days) {
	var fullHours = Math.round(24 * days);
	var hours = fullHours % 24;
	days = Math.floor(fullHours / 24);
	var a = [];
	if (days) {
		a.push(this.decline(days, "day"));
	}
	if (hours) {
		a.push(this.decline(hours, "hour"));
	}
	if (!a.length) a.push(this['less_than_hour']);
	return a.join(" ");
}

// domains and language processing
var m = location.host.match(/(\w+)\.imperion\.(\w+(\.\w+)*)$/);
var zone = m[2];
var server_id = zone + "-" + m[1];
// NOT: co.uk, ee, no, pl, com.ua, co.ee
domains = {
	'asia': 'en', 'at':'de', 'be':'en', 'bg':'en', 'cc':'en', 'cl':'en', 'cn':'en', 'com':'en', 'co.il':'en', 'cz':'en', 'de':'de', 'dk':'en', 'fi':'en', 'fr':'en', 'hk':'en', 'hu':'en',
	'in':'en', 'ir':'en', 'it':'en', 'jp':'en', 'lt':'en', 'lv':'en', 'mx':'en', 'net':'en', 'nl':'en', 'org':'en', 'pt':'en', 'ru':'ru', 'se':'en', 'sk':'en', 'si':'en', 'tw':'en', 'us':'en'
}
if (lang = domains[zone]) { // do not trust imperion.* sites not belonging to TravianGames

	// init language 
	lang = translations[lang];
	lang.showDays = showDays;
	
	// init player-related data
	var player_name = document.links[0].innerHTML;
	var storage = new Storage(server_id + "/" + player_name + "/");
	
	var Player = {
		research: storage.load("research", {
			levels:[], production:[], points:[]
		}),
		planets: {},
		race: document.styleSheets[2].href.match(/\/(\w+)[.]css/)[1],
	};
/*	var planetNavigationLinks = $$('a', $('navigation'));
	if (planetList = $('planetListContent')) {
		$$("ul/li/a", planetList).each(function(elt){
			if(m = elt.href.match(/\d+$/));
			Player.planets[m[0]] = {name: elt.innerHTML};
		});
	}
	var id = planetNavigationLinks[0].href.match(/\d+$/)[0];
	var name = planetNavigationLinks[1].innerHTML;
	Player.planets[id] = {name: name};
	var current_planet = Player.planets[id];*/
	var Planet = {
		resources: {
			current: [],
			income: [],
			capacity: []
		}
	}
	
try{
	
//	if (GAME_VERSION > 0.91) {
		var incomeData = $$("table[0]/tr[0]/div[2n]", $("planetResourcesContent"));
		var capacityData = $$("table[0]/tr[2]/td[2n]", $("planetResourcesContent"));
/*	} else {
		var incomeData = $$("table[0]/tr[0]/th[2n+1]", $("planetResourcesContent"));
		var capacityData = $$("table[0]/tr[1]/th[2n+1]", $("planetResourcesContent"));
	}*/

	for (var r = 0; r < 3; r++) {
		Planet.resources.current[r] = $("storageR"+(r+1)).innerHTML.to_i();
		Planet.resources.income[r] = incomeData[r].innerHTML.to_i();
		Planet.resources.capacity[r] = capacityData[r].innerHTML.to_i();
	}


/* buildingYard */

if (location.pathname.match(/\/buildingYard\//)) {
	var byTables = $$("table", $('buildingYard'));
	var EP = byTables[0].rows[0].cells[1].innerHTML.to_i();
	var EP_day = byTables[2].rows[2].cells[1].innerHTML.to_i();
	var CU = Math.ceil(EP2CU(EP||1));
	var next_EP = CU2EP(CU);
	var EP_by_research = 0;
	var phrase = lang['next_planet_in'];
	var expansion_research_level = Player.research.levels[15];
	var research_cost = 0;
	var last_row = 6;
	var days = (next_EP - EP) / EP_day;
	var i = 0;
	do {
		var base_days = days;
		var RP = Player.research;
		var days = Math.max(
			(next_EP - EP - EP_by_research) / EP_day,
			(research_cost - RP.points[3]) / RP.production[3]
		);
		if (days > base_days) break;
		var cell = byTables[0].insertRow(++last_row).insertCell(0);
		cell.colSpan = 2;
		cell.className = 'spacer';
		
		var row = byTables[0].insertRow(++last_row);
		var cell = row.insertCell(0);
		cell.className = "p13 fontBold borderNone";
		cell.innerHTML = phrase;
		var cell = row.insertCell(1);
		cell.className = "p13";
		cell.innerHTML = lang.showDays(days);
		
		++expansion_research_level;
		phrase = lang['with_expansion_research'] + " (" + expansion_research_level + ")";
		EP_by_research += expansion_research_level * 1250;
		research_cost += expansion_research_level * 250;
		if (i++ > 100) break;
	} while (true);
}


/* researchCenter */

if (location.pathname.match(/\/researchCenter\//)) {
	// just a "shortcut"
	var RP = Player.research;
	var productionTables = $$('table.toggleTable', $('researchCenter'));
	productionTables.shift();
	// collect current RP disposition
	for (var t = 0; t < productionTables.length; t++) {
		var table = productionTables[t];
		RP.points[t] = parseFloat($$('tr[0]/td[2]/div', table)[0].innerHTML.replace(/,/, '.'));
		RP.production[t] = parseFloat($$('tr[2]/td', table)[0].innerHTML.replace(/,/, '.').match(/\d+\.\d+/));
	}
	var researchTables = $$("div.extraTable/table[0]", $("researchCenter"));
	// replace "unavailable" text on buttons by cmount of remaining time;
	researchTables.each(function(table, idx) {
		$$("tr[2n+2]", table).each(function(row) {
			var button_link = $$("a[0]", row.cells[3])[0];
			if (button_link.className.match(/error/i)
			&& !button_link.className.match(/disable/i)) {
				var cost = parseInt(row.cells[2].innerHTML);
				var days = (cost - RP.points[idx]) / RP.production[idx];
				button_link.lastChild.nodeValue = lang.showDays(days); // lastChild is a DOM text node
			}
		});
	});
	
	// collect data about Research levels
	researchTables.each(function(table) {
		$$("tr[2n+2]", table).each(function(row) {
			var info_link = $$("a[0]", row.cells[0])[0];
			if (m = info_link.href.match(/research\/(\d+)/)) {
				RP.levels[m[1]] = $$("div.active", row.cells[1]).length;
			}
		});
	});
	storage.store("research", RP);
}

/* combat reports */

if (location.pathname.match(/^\/report\/show\/id\/combat\/hid\/\d+/)) {
	var RECYCLER_IDX = 10;
	
	var cap_eff = {
		'C': 1+0.05*(Player.research.levels[18]||0),
		'M': 1+0.05*(Player.research.levels[21]||0)
	}

	var combat = { 'off':{resources:[0,0,0]}, 'def':{} };

	var maindiv = $$("div.content")[0];
	var results = $$("h3", maindiv);
	var xh1 = $$("h1", maindiv)[0];
	
	var id = $$("a", xh1)[1].href.match(/(\d+)$/)[1];
	xh1.innerHTML += '<div id="informations" style="position:absolute; left:392px; top:10px;">' +
		'<a class="interface_informations_outgoing_attack" style="width:32px; background-position:-5px -56px; height:26px; border:4px solid #0C0D0D; border-right-width:0px; -moz-border-radius:11px 0px 0px 11px; cursor:pointer;" id="outgoingAttack" href="/fleetBase/mission/1/planetId/'+id+'/m/302"/>' +
		'<a class="interface_informations_outgoing_support" style="width:32px; background-position:-1px -56px; height:26px; border:4px solid #0C0D0D; border-left-width:0px; -moz-border-radius:0px 11px 11px 0px; cursor:pointer;" id="outgoingSupport" href="/fleetBase/mission/1/planetId/'+id+'/m/303"/>' +
	'</div>';
	var bounty = 0;
	var debris = 0;
	var bounty_idx = -1;
	var debris_idx = -1;
	results.each(function(r, i){
		var m = r.textContent.match(/\s(\d+)/g);
		if (m.length == 3) {
			bounty = eval(m.join("+"));
			bounty_idx = i;
		}
		if (m.length == 2) {
			debris = eval(m.join("+"));
			debris_idx = i;
		}		
	});
	var fleetTables = $$("div.fleetTable/table[0]", maindiv);
	var races = [];
	fleetTables.each(function(table, side) {
		var unit_img = $$("tr[0]/td[1]/img", table)[0];
		races[side] = unit_img.className.match(/fleet_(\d)/)[1] - 1;
	});
	
	var myFleet = fleetTables[0];
	var myRaceShips = ships[races[0]];
	
	var fleet = $$("tr[2]/td[n+1]", myFleet);
	var losses = $$("tr[4]/td[n+1]", myFleet);

	var capacity = 0;
	fleet.each(function(cell, u) {
		var ship = myRaceShips[u];
		var cap = ship.payload * cap_eff[ship.type];
		if (u != RECYCLER_IDX) {
			capacity += (cell.innerHTML - losses[u].innerHTML) * cap;
		}
	});
	if (bounty_idx > -1) {
		results[bounty_idx].innerHTML += " [ " +
			(100 * bounty / Math.round(capacity)).toFixed(1) +
			"% ]";
	}
	if (debris_idx > -1) {
		results[debris_idx].innerHTML += " [ " +
			Math.ceil(debris / myRaceShips[RECYCLER_IDX].payload / cap_eff['C']) +
			"×<span style='position:relative;top:7px;'>" +
			myFleet.rows[0].cells[RECYCLER_IDX+1].innerHTML
			+ "</span> ]";
	}
	
	losses.each(function(cell, u){
		var ship = myRaceShips[u];
		var amount = cell.innerHTML;
		for(var r = 0; r < 3; r++) {
			combat.off.resources[r] += ship.cost[r] * amount;
		}
	});
	
}


/* MAP */
if (location.pathname.match(/^\/map\//)) {
	var galaxyNr = document.getElementsByName('galaxyId')[0].value;
	
	function iterateMap(callbalck) {
		for (p in mapData) {
			if (p.match(/^\d+$/)) callbalck(mapData[p], p);
		}
	}
	
	function iteratePlanets(callback) {
		for (s in mapData) if (s.match(/^\d+$/)) {
			var pp = mapData[s].planets;
			for (p in pp) if (p.match(/^\d+$/)) {
				callback(pp[p]);
			}
		}
	}
/*	var a = [];
	function searchAll(planet) {
		if (planet.alliance_name == "ISP") {
			a.push(planet);
		}
	}
	iteratePlanets(searchAll);*/

	// reading page data through unsafeWindow object
	var mapData = unsafeWindow.mapData;	
	
	var coords = {
		min: {x: Infinity, y: Infinity},
		max: {x:-Infinity, y:-Infinity}
	};

	iterateMap(function(system, p){
		var c = xy_from_id(p);
		coords.min.x = Math.min(coords.min.x, c.x);
		coords.min.y = Math.min(coords.min.y, c.y);
		coords.max.x = Math.max(coords.max.x, c.x);
		coords.max.y = Math.max(coords.max.y, c.y);
	});
	coords.mid = {
		x: $('x4').innerHTML,
		y: $('y3').innerHTML
	}
	var recycleables = [];
	for (p in mapData) {
		if (p.match(/^\d+$/)) {
			var system = mapData[p];
			var c = xy_from_id(p);
			if (system.comets) {
				system.comets.each(function(comet) {
					comet.distance = distance(c, coords.mid);
					comet.x = c.x;
					comet.y = c.y;
					comet.link = "c" + comet.id;
					//comet.r0 = comet.r1 + comet.r2 + comet.r3;
					recycleables.push(comet);
				});
			}
			if (system.asteroids) {
				system.asteroids.each(function(asteroid) {
					asteroid.distance = distance(c, coords.mid);
					asteroid.x = c.x;
					asteroid.y = c.y;
					asteroid.link = "a" + asteroid.id;
					asteroid.name = lang['asteroid'];
					recycleables.push(asteroid);
				});
			}
			if (system.debris) {
				for (d in system.debris) if (d.match(/^\d+$/)) {
					field = system.debris[d];
					field.distance = distance(c, coords.mid);
					field.x = c.x;
					field.y = c.y;
					field.link = "d" + field.planet_id;
					field.name = lang['debris'];
					field.r3 = 0;
					recycleables.push(field);
				}
			}
		}
	}
	recycleables.sortBy('distance');
	
	var str =
		'<div class="tLeft interface_dialog_tLeft">' +
		'<div class="tRight bgNoRepeat interface_dialog_tRight" style="background-position: right center;">' +
		'<a href="#" style="padding: 13px 20px 0pt 0pt; float: right;">x</a></div></div>' +
		'<div class="mLeft bgYRepeat interface_dialog_mLeft"><div class="mRight bgCenterRight bgYRepeat interface_dialog_mRight">' +
		'<div class="content"><table style="text-align:right;width:500px;"><tr><td>#</td><td>'+lang['name']+'</td>'+
		'<td><img src="/img/interface/icon/metal.png"></td>' +
		'<td><img src="/img/interface/icon/crystal.png"></td>' +
		'<td><img src="/img/interface/icon/deuterium.png"></td>'+
		'<td>'+lang['distance']+'</td><td>X</td><td>Y</td><td>'+lang['action']+'</td></tr>';
	recycleables.splice(0, 20).each(function(comet, idx){
		str += '<tr>' +
			'<td>' + (idx+1) + '</td>' +
			'<td>' + comet.name + '</td>' +
			'<td>' + comet.r1 + '</td>' +
			'<td>' + comet.r2 + '</td>' +
			'<td>' + comet.r3 + '</td>' +
			'<td>' + comet.distance.toFixed(2) + '</td>' +
			'<td>' + comet.x + '</td><td>' + comet.y + '</td>' +
			'<td>' +
				'<a href="/fleetBase/mission/1/planetId/'+comet.link+'/m/301">'+lang['recycle']+'</a>' +
		//		' |	<a href="/map/index/comet/'+comet.id+'">'+lang['center_map']+'</a>' +
			'</td></tr>';
	});
	str +=
		'</table></div></div></div><div class="bLeft interface_dialog_bLeft">'+
		'<div class="bRight bgNoRepeat bgCenterRight interface_dialog_bRight"></div></div>';
	var div = document.createElement('div');
	div.id = "buildingQueue";
	div.className = "fontLeft dialog";
	div.style.display = "block";
	div.style.zIndex = 10000;
	div.style.top = "220px";
	div.innerHTML = str;
	$$("a", div)[0].addEventListener('click', function(){
		document.body.removeChild(div);
	}, false);
	
	function drawMapOverlay() {
		if (document.body.lastChild == div) {
			document.body.removeChild(div);
		} else {
			document.body.appendChild(div);
		}
	}
	
	var formTable = $$("table", $('mapToolbar'))[0];
	var colgroup = $$("colgroup", formTable)[0];
	formTable.style.marginLeft = "auto";
	
	colgroup.innerHTML = '<col/>' + colgroup.innerHTML;
	var cell = formTable.rows[0].insertCell(0);
	cell.style.paddingTop = "3px";
	cell.style.width = "80px";
	cell.innerHTML = '<a class="buttonStd interface_forms_buttons_standart" onclick="this.blur();" href="#"><span class="interface_forms_buttons_standart"></span>info</a>';
	$$("a", cell)[0].addEventListener('click', drawMapOverlay, false);
}

/* PLANET OVERVEIW */
if (location.pathname.match(/^\/planet\//)) {
	var a = $('incomingAttack');
	if (a.className.match(/active/)) {
		setTimeout(blinkTroopsMovement, 0, a);
	};
}

/* fleetBase */
if (location.pathname.match(/^\/fleetBase\//)) {
	var res = Planet.resources.current.clone();
	$$("div.fleetTable/table[0]/tr[6]/td[1]/ul", $("fleetBase")).each(function(elt){
		$$("li", elt).each(function(li, r){
			res[r] += li.innerHTML.to_i();
			if (res[r] >= Planet.resources.capacity[r]) {
				li.style.color = "red";
			}
		});
	});
}

/* marketplace */
if (location.pathname.match(/^\/market\//)) {
	//var description = $$("table[0]/tr[1]/td[0]", $('market'))[0].innerHTML;
	var capacity = traders_capacity[Player.race] * (1 + 0.2 * (Player.research.levels[61] || 0));
	
	for (var r = 1; r <= 3; r++) {
		var input = $("resourceInputR"+r);
		input.className = "textShort";
		var cell = input.parentNode;
		cell.innerHTML += " <a href='javascript:;' onclick='i=$(\"resourceInputR"+r+"\");i.value=-(-i.value-"+capacity+");'>[+]</a>";
	}
}

} catch(e) {
	window.status = 'IH error: ' + e;
}
} else {
	window.status = m;
}

var elt = $$("div.planet/a.icon", $("navigation"))[0];
elt.style.MozTransformOrigin = "48.5% 48.5%";
function rotatePlanet() {
	var d = new Date();
	var angle = (d.getTime() % 86400000) / 120000;
    elt.style.MozTransform = "rotate("+angle+"deg)";
}
//setInterval(rotatePlanet, 60000);

/* DIALOG WINDOW
<div id="buildingQueue" class="fontLeft dialog" style="display: block;">
<div class="tLeft interface_dialog_tLeft">
<div class="tRight bgNoRepeat interface_dialog_tRight" style="background-position: right center;"/>
</div>
<div class="mLeft bgYRepeat interface_dialog_mLeft">
<div class="mRight bgCenterRight bgYRepeat interface_dialog_mRight">
<div class="content">
</div>
</div>
</div>
<div class="bLeft interface_dialog_bLeft">
<div class="bRight bgNoRepeat bgCenterRight interface_dialog_bRight"/>
</div>
</div>
*/

} catch(e) {
	window.status = "IH: wrapper error";
}