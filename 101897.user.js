// ==UserScript==
// @name 		Fixed stnkvcmls Ikariam CR Converter
// @namespace	CRConverter
// @version		1.0.1
// @icon		http://img710.imageshack.us/img710/6600/ikariamgeneralicon.png
// @description	Converts Ikariam combat reports. This is fixed and imrpoved "stnkvcmls Ikariam CR Converter" with additional options and statistics. Original script at http://userscripts.org/scripts/show/58998
// @author		bluesman
// @author		stnkvcmls
// @license		GNU GPL v3 http://www.gnu.org/copyleft/gpl.html
// @include		http://*.ikariam.*/index.php?view=militaryAdvisorReportView&combatId*
// @include		http://*.ikariam.*/index.php?view=militaryAdvisorReportView&reportId*
// @include		http://*.ikariam.*/index.php?view=militaryAdvisorDetailedReportView&*
// @include		http://*.ikariam.*/index.php?*view=militaryAdvisorDetailedReportView&*
// @require		http://code.jquery.com/jquery-1.3.2.min.js
// @require		http://threedubmedia.googlecode.com/files/jquery.event.drag-1.5.min.js
//
// @history		1.0.1 few small fixes and improvements
// @history		1.0 changes for ikariam v0.4.5
// @history		0.1.0 Fixed original stnkvcmls Ikariam CR Converter
// ==/UserScript==

Ika = {
	server: 	'',		// current server name
	serverUrl:	'',		// current server url
	view : 		'',		// current view
	position :	'',		// current building position
	cityLevel : 0,		// currentu city level
	language : 	'en',	// selected language
	lang: 		'',		// language

	id:			101897,			// script id
	title : 	"Fixed stnkvcmls' Ikariam CR Converter",
	version: 	"1.0.1",

	res : {
		general : '/skin/relatedCities/general.gif',
		population : '/skin/resources/icon_citizen.gif',
		gold : '/skin/resources/icon_upkeep.gif',
		time : '/skin/resources/icon_time.gif',
		wood : '/skin/resources/icon_wood.gif',
		wine : '/skin/resources/icon_wine.gif',
		marble : '/skin/resources/icon_marble.gif',
		glass : '/skin/resources/icon_glass.gif',
		sulfur : '/skin/resources/icon_sulfur.gif',

		showIcons : false,	// show resource icons next to resource name

		icon : function (resName)
		{
			return this.showIcons ? '<img src="' + Ika.serverUrl + resName + '" height="16" /> ' : '';
		}

	},

	getServer : function ()
	{
		this.server		= window.location.host;
		this.serverUrl	= window.location.protocol + '//' + window.location.host;
		var temp = this.server.split('.');
		temp = temp[1];
	},

	// Find current city level
	getCityLevel : function ()
	{
		if (document.getElementById('position0'))
		{
			this.cityLevel = document.getElementById('position0').getElementsByTagName('a')[0].title;
			this.cityLevel = parseInt (this.cityLevel.substr(this.cityLevel.length - 2));

			if (this.cityLevel > 26)
			{
				this.cityLevel = 26;
			}
		}
	},

	// get current city view name
	getView : function ()
	{
		this.view = $('BODY').attr('id');

		if (this.view == 'buildingGround')
		{
			var regExp = new RegExp("position\=([a-zA-Z0-9]+)", "ig");
			var RegExpRes = regExp.exec(document.location.href);
			this.position = (RegExpRes == null) ? '' : RegExpRes[1];
		}
	},

	getLang : function()
	{
		var url = document.URL.replace("http://","");
		url = url.substring(0,url.indexOf("/")).split('.');
		var length = url.length;

		if (url[3] == "co")	{ return (url[length-1] == "uk") ? "en" : url[length-1]; }
		if (length == 3) 	{ return (url[length-1] == "com" || url[length-1] == "org") ? "en" : url[length-1]; }
		if (url[1] == "us") { return "en"; }

		return url[1];
	},

	// ormat number to group thousands digits, eg: 12,345,678
	formatNumber : function (n, c)
	{
		if (typeof c == 'undefined')
		{
			c = ',';
		}

		tmpN = '';
		n = n + '';
		i = 0;
		j = n.length % 3;

		while (i < n.length)
		{
			if (i > 0)
			{
				if ((i-j) % 3 == 0)
				{
					tmpN += c;
				}
			}

			tmpN += n[i];
			i++;
		}
		return tmpN;
	},

	// initialize
	init : function()
	{
		this.getServer();
		this.getView();
		this.lang = this.getLang();
	}
};

//ScriptUpdater.check(Ika.id, Ika.version);
Ika.init();

const lang = Ika.lang;

CR = {
	report_stats : '',
	report_headr : '',
	report_footer : '',

	report_width : 50,
	report_font: 'Courier New, Courier, mono',
	preview_font: 'Consolas, Courier New, Courier, monospace',
	report_font_size: 10,
	report_font_size_title: 12,

	settings : '',
	
	dot : '.',
	dot_preview : ' ',

	reports : {
		preview: '',	// full preview including statistics
		preview_damage: '',	// full preview with units damage
		bbcode: '',		// bbcode for forum
		plaintext: '',	// plain text
		htmlcode: '',	// html code
	},

	options : {
		en: { cities: true,	loot: true, align: "center", damage: "GeneralsA" },
		ba: { cities: true,	loot: true, align: "center", damage: "GeneralsA" },
		rs: { cities: false,loot: true, align: "center", damage: "GeneralsA" },
		ph: { cities: true, loot: true, align: "center", damage: "GeneralsA" },
		de: { cities: true, loot: true, align: "center", damage: "GeneralsA" },
		si: { cities: true, loot: true, align: "center", damage: "GeneralsA" },
		dk: { cities: true, loot: true, align: "center", damage: "GeneralsA" },
		id: { cities: true, loot: true, align: "center", damage: "GeneralsA" },
	},

	// output string (cached for selected language)
	str : { },

	// language strings
	text : {
		en: {
			totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units',
			battleLand: "Battle", forCity: "for", battleSea: "Sea battle", nearCity: "near", from: " from ",
			attacker: "Attacker", attackers: "Attackers", defence: "Defence", defender: "Defender", defenders: "Defenders", winner: "Winner",
			winners: "Winners", loser: "Loser", losers: "Losers", loot: "Loot", wood: "Building material",
			wine: "Wine", marble: "Marble", glass: "Crystal glass", sulphur: "Sulphur", damageR: "Damage received",
			created: "Created with", show: "Show", cities: "Cities", align: "Align", left: "Left",
			center: "Center", right: "Right", damage: "Damage", generals: "Generals", resources: "Resources",
			preview: "Preview", bbcode: "Ikariam forum", plaintext: "Plain text", htmlcode: "HTML", damageT: "Damage total",
			unknownCity: "<unknown city>", version: "version", army: "Army", armyLoot: "Army + loot", alliedTroops: "Allied Troops",
			finishedBattle: "Battle still in progress", colors: "Colors", round: "Round", total: "Total", title: "Title",
			text: "Text", attackerUnits: "Attackers units",	defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers",
			save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"
			},

		ba: {totalArmy: "Ukupno vojske", unitsDamage : 'Šteta u jedinicama', stats: "Statistika", auxiliary: "Pomoćne jedinice", reserve: "Rezerva", gold: "Zlato", population: "Populacija", remaining: 'Preostala vojska', battleLand: "Borba", forCity: "za", battleSea: "Morska bitka", nearCity: "kod", from: " iz ",
			attacker: "Napadač", attackers: "Napadači", defence: "Branioci", defender: "Obranioc", defenders: "Obranioci", winner: "Pobjednik",
			winners: "Pobjednici", loser: "Gubitnik", losers: "Gubitnici", loot: "Plijen", wood: "Građevinski materijal",
			wine: "Vino", marble: "Mramor", glass: "Kristal", sulphur: "Summpor", damageR: "Pretrpljena šteta", created: "Napravljeno sa",
			show: "Prikaži", cities: "Gradovi", align: "Poravnaj", left: "Levo", center: "Sredina", right: "Desno",
			damage: "Šteta", generals: "Generali", resources: "Resursi", preview: "Pregled", bbcode: "Ikariam forum",
			plaintext: "Samo tekst", htmlcode: "HTML", damageT: "Ukupna šteta", unknownCity: "<nepoznat grad>", version: "verzija",
			army: "Vojska", armyLoot: "Vojska + plijen", alliedTroops: "Prijateljska vojska", finishedBattle: "Bitka je još uvek u toku",
			colors: "Boje", round: "Runda", total: "Ukupno", title: "Naslov", text: "Tekst", attackerUnits: "Jedinice napadača",
			defenderUnits: "Jedinice odbranioca", deadUnits: "Poginule jedinice", otherNumbers: "Ostali brojevi", save: "Sačuvaj", cancel: "Otkaži", settings: "Settings", update: "Ažuriraj"},

		rs: {totalArmy: "Укупно војске", unitsDamage : 'Штета у јединицама', stats: "Статистика", auxiliary: "Кувари и доктори", reserve: "Резерва", gold: "Злато", population: "Популација", remaining: 'Преостала војска', battleLand: "Борба", forCity: "за", battleSea: "Поморска битка", nearCity: "поред", from: " из ",
			attacker: "Нападач", attackers: "Нападачи", defence: "Браниоци", defender: "Одбраниоц", defenders: "Одбраниоци", winner: "Победник",
			winners: "Победници", loser: "Губитник", losers: "Губитници", loot: "Плен", wood: "Грађевински материјал",
			wine: "Вино", marble: "Мермер", glass: "Кристал", sulphur: "Сумпор", damageR: "Претрпљена штета", created: "Направљено са",
			show: "Прикажи", cities: "Градови", align: "Поравнај", left: "Лево", center: "Средина", right: "Десно",
			damage: "Штета", generals: "Генерали", resources: "Ресурси", preview: "Преглед", bbcode: "Икариам форум",
			plaintext: "Само текст", htmlcode: "HTML", damageT: "Укупна штета", unknownCity: "<непознат град>", version: "верзија",
			army: "Војска", armyLoot: "Војска + плен", alliedTroops: "Савезничке трупе", finishedBattle: "Битка је још увек у току",
			colors: "Боје", round: "Рунда", total: "Укупно", title: "Наслов", text: "Текст", attackerUnits: "Јединице нападача",
			defenderUnits: "Јединице одбраниоца", deadUnits: "Погинуле јединице", otherNumbers: "Остали бројеви", save: "Сачувај", cancel: "Откажи", settings: "Подешавања", update: "Ажурирај"},

		ph: {totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units', battleLand: "Digmaan", forCity: "ng", battleSea: "Digmaan Pangkaragatan", nearCity: "ng", from: " ng ",
			attacker: "Umatake", attackers: "Mga Umatake", defence: "Defence", defender: "Dumipensa", defenders: "Mga Dumipensa", winner: "Nanalo",
			winners: "Mga Nanalo", loser: "Natalo", losers: "Mga Natalo", loot: "Nakuha", wood: "Kahoy",
			wine: "Alak", marble: "Bato", glass: "Kristal", sulphur: "Asupre", damageR: "Pinsala", created: "Created with ",
			show: "Ipakita", cities: "Bayan", align: "Ilinya", left: "Pakaliwa", center: "Igitna", right: "Pakanan",
			damage: "Pinsala", generals: "Heneral", resources: "Yaman", preview: "Tingnan", bbcode: "Ikariam board",
			plaintext: "Simple", htmlcode: "HTML", damageT: "Damage total", unknownCity: "<unknown city>", version: "version",
			army: "Army", armyLoot: "Army + loot", alliedTroops: "Allied Troops", finishedBattle: "Battle still in progress",
			colors: "Colors", round: "Round", total: "Total", title: "Title", text: "Text", attackerUnits: "Attackers units",
			defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers", save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"},

		de: {totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units', battleLand: "Schlacht", forCity: "um", battleSea: "Seeschlacht", nearCity: "nahe", from: " aus ",
			attacker: "Angreifer", attackers: "Angreifer", defence: "Defence", defender: "Verteidiger", defenders: "Verteidiger", winner: "Gewinner",
			winners: "Gewinner", loser: "Verlieren", losers: "Verlierer", loot: "Beute", wood: "Baumaterial",
			wine: "Wein", marble: "Marmor", glass: "Kristallglas", sulphur: "Schwefel", damageR: "verursachter Schaden", created: "verursacht durch",
			show: "Anzeigen", cities: "Stätte", align: "Anpassen", left: "Links", center: "Mittig", right: "Rechts",
			damage: "Schaden", generals: "General", resources: "Resourcen", preview: "Vorschau", bbcode: "Ikariam board",
			plaintext: "Klartext", htmlcode: "HTML", damageT: "Gesammtschaden", unknownCity: "<Unbekante Stadt>", version: "version",
			army: "Armee", armyLoot: "Armee + Beute", alliedTroops: "Verbündete Truppen", finishedBattle: "Schlacht im gange",
			colors: "Colors", round: "Round", total: "Total", title: "Title", text: "Text", attackerUnits: "Attackers units",
			defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers", save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"},

		si: {totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units', battleLand: "Bitka", forCity: "za", battleSea: "Morska bitka", nearCity: "pri", from: " od ",
			attacker: "Napadalec", attackers: "Napadalci", defence: "Defence", defender: "Branilec", defenders: "Branilci", winner: "Zmagovalec",
			winners: "Zmagovalci", loser: "Poraženec", losers: "Poraženci", loot: "Plen", wood: "Gradbeni material",
			wine: "Vino", marble: "Mramor", glass: "Kristal", sulphur: "Žveplo", damageR: "Pretrpljena škoda", created: "Napravljeno z",
			show: "Pokaži", cities: "Mesta", align: "Uskladitev", left: "Levo", center: "V sredi", right: "Desno",
			damage: "Škoda", generals: "Generali", resources: "Sredstva", preview: "Pregled", bbcode: "Ikariam board",
			plaintext: "Navaden tekst", htmlcode: "HTML", damageT: "Skupna škoda", unknownCity: "<neimenovano mesto>", version: "različica",
			army: "Vojska", armyLoot: "Vojska + plen", alliedTroops: "Zavezniške enote", finishedBattle: "Bitka še vedno poteka",
			colors: "Colors", round: "Round", total: "Total", title: "Title", text: "Text", attackerUnits: "Attackers units",
			defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers", save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"},

		dk: {totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units', battleLand: "Kamp", forCity: "for", battleSea: "Hav kamp", nearCity: "nær ", from: " fra ",
			attacker: "Angriber", attackers: "Angribere", defence: "Defence", defender: "Forsvare", defenders: "Forsvarer", winner: "Vinder",
			winners: "Vindere", loser: "Taber", losers: "Tabere", loot: "Bytte", wood: "Træ",
			wine: "Vin", marble: "Marmor", glass: "Krystal glas", sulphur: "Svovl", damageR: "Skader sket", created: "Skabt med",
			show: "Vis", cities: "Byer", align: "Juster", left: "Venstre", center: "Center", right: "Højre",
			damage: "Skader", generals: "Generelt", resources: "Ressourcer", preview: "Prøvese", bbcode: "Ikariam forum",
			plaintext: "Almindelig tekst", htmlcode: "HTML", damageT: "Skader samlede", unknownCity: "<Ukendt by>", version: "version",
			army: "Hær", armyLoot: "Hær + plyndre", alliedTroops: "Allierede tropper", finishedBattle: "Kamp er stadig i gang",
			colors: "Colors", round: "Round", total: "Total", title: "Title", text: "Text", attackerUnits: "Attackers units",
			defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers", save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"},

		id: {totalArmy: "Total army", unitsDamage : 'Units Damage', stats: "Statistics", auxiliary: "Auxiliary units", reserve: "Reserve", gold: "Gold", population: "Population", remaining: 'Remaining units', battleLand: "Pertempuran", forCity: "untuk", battleSea: "Pertempuran laut", nearCity: "dekat", from: " dari ",
			attacker: "Penyerang", attackers: "Kelompok penyerang", defence: "Defence", defender: "Yang bertahan", defenders: "Yang bertahan", winner: "Pemenang",
			winners: "Para pemenang", loser: "Yang kalah", losers: "Kelompok kalah", loot: "Jarahan", wood: "Kayu",
			wine: "Anggur", marble: "Mammer", glass: "Kristal", sulphur: "Sulfur", damageR: "Kerusakan yang diderita", created: "Dibuat oleh",
			show: "Perlihatkan", cities: "Kota-kota", align: "Rata", left: "Kiri", center: "Tengah", right: "Kanan",
			damage: "Kerusakan", generals: "Jendral ", resources: "Sumber daya", preview: "Pratinjau", bbcode: "Papan Ikariam",
			plaintext: "Teks biasa", htmlcode: "HTML", damageT: "Kerusakan total", unknownCity: "<Kota tak dikenal>", version: "versi",
			army: "Pasukan", armyLoot: "Pasukan dan jarahan", alliedTroops: "Pasukan aliansi", finishedBattle: "Pertempuran masih berlangsung",
			colors: "Colors", round: "Round", total: "Total", title: "Title", text: "Text", attackerUnits: "Attackers units",
			defenderUnits: "Defenders units", deadUnits: "Dead units", otherNumbers: "Other Nnumbers", save: "Save", cancel: "Cancel", settings: "Settings", update: "Update"},
	},

	// all unit names
	units : {
		en: {slinger: "Slinger", swordsman: "Swordsman", phalanx: "Hoplite", marksman: "Sulphur Carabineers", mortar: "Mortar",
			catapult: "Catapult", ram: "Battering Ram", steamGiant: "Steam Giant", balloonBombardier: "Balloon-Bombardier", cook: "Cook",
			medic: "Doctor", gyrocopter: "Gyrocopter", archer: "Archer", wall: "Wall", spearman: "Spearmen", barbarianAxeSwinger: "Barbarian-Axe Swinger",
			ramShip: "Ram-Ship", lightvessel: "Fire Ship", divingBoat: "Diving Boat", ballistaShip: "Ballista Ship",
			catapultShip: "Catapult Ship", mortarShip: "Mortar Ship", paddleWheelRam: "Steam Ram",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"
		},

		ba: {slinger: "Praćkar", swordsman: "Mačevalac", phalanx: "Kopljanik", marksman: "Sumforni Mušketar", mortar: "Minobacač",
			catapult: "Katapult", ram: "Ovan", steamGiant: "Željezni div", balloonBombardier: "Balon Bombarder", cook: "Kuhar",
			medic: "Doktor", gyrocopter: "Girokopter", archer: "Strijelac", wall: "Zid", spearman: "Bacač Koplja", barbarianAxeSwinger: "Barbarski Bacač Sjekire",
			ramShip: "Brod Ovan", lightvessel: "Vatreni Brod", divingBoat: "Podmornica", ballistaShip: "Brod kopljar",
			catapultShip: "Brod katapult", mortarShip: "Brod minobacač", paddleWheelRam: "Parni ovan",
			rocketShip : "Raketni Brod", paddleSpeedShip : "Bagi-pedalina", "balloonCarrier" : "Nosač balona", tender : "Tender"},

		rs: {slinger: "Праћкар", swordsman: "Мачевалац", phalanx: "Копљаник", marksman: "Сумпорни Мускетар", mortar: "Минобацач",
			catapult: "Катапулт", ram: "Ован", steamGiant: "Челични див", balloonBombardier: "Балон Бомбардер", cook: "Кувар",
			medic: "Доктор", gyrocopter: "Гирокоптер", archer: "Стрелац", wall: "Зид", spearman: "Бацач копља", barbarianAxeSwinger: "Варварски бацач секире",
			ramShip: "Брод ован", lightvessel: "Пламени брод", divingBoat: "Подморница", ballistaShip: "Брод копљар",
			catapultShip: "Брод катапулт", mortarShip: "Брод минобацач", paddleWheelRam: "Парни ован",
			rocketShip : "Ракетни брод", paddleSpeedShip : "Баги-педалина", "balloonCarrier" : "Носач балона", tender : "Тендер"},

		ph: {slinger: "Tagahagis", swordsman: "Mananabas", phalanx: "Sundalo", marksman: "Mamamaril", mortar: "Kanyon",
			catapult: "Katapult", ram: "Ram", steamGiant: "Higanteng demakina", balloonBombardier: "Lobong Tagabomba", cook: "Kusinero",
			medic: "Manggagamot", gyrocopter: "Salipawpaw", archer: "Tagapana", wall: "Wall", spearman: "Tagasibat", barbarianAxeSwinger: "Barbarian-Axe Swinger",
			ramShip: "Barkong Tagabundol", lightvessel: "Barkong Bumubuga ng Apoy", divingBoat: "Sabmarino", ballistaShip: "Barkong may Ballista",
			catapultShip: "Barkong may Katapult", mortarShip: "Barkong may Kanyon", paddleWheelRam: "Barkong demakina",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"},

		de: {slinger: "Steinschleuderer", swordsman: "Schwertkämpfer", phalanx: "Hoplit", marksman: "Schwefelbüchsen-Schützen", mortar: "Mörser",
			catapult: "Katapult", ram: "Rammbock", steamGiant: "Dampfgigant", balloonBombardier: "Ballon-Bombardier", cook: "Koch",
			medic: "Arzt", gyrocopter: "Gyrokopter", archer: "Bogenschütze", wall: "Stadtmauer", spearman: "Speerträger", barbarianAxeSwinger: "Barbaren-Axtschwinger",
			ramShip: "Rammschiff", lightvessel: "Feuerschiff", divingBoat: "Tauchboot", ballistaShip: "Ballistaschiff",
			catapultShip: "Katapultschiff", mortarShip: "Mörserschiff", paddleWheelRam: "Schaufelradramme",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"},

		si: {slinger: "Pračar", swordsman: "Mečevalec", phalanx: "Suličar", marksman: "Mušketir", mortar: "Minometalec",
			catapult: "Katapult", ram: "Oven", steamGiant: "Parni velikan", balloonBombardier: "Balon Bombardir", cook: "Kuhar",
			medic: "Zdravnik", gyrocopter: "Girokopter", archer: "Lokostrelec", wall: "Zid", spearman: "Metalec kopja", barbarianAxeSwinger: "Barbarski metalec sekire",
			ramShip: "Ladja ram", lightvessel: "Metalec plamena", divingBoat: "Podmornica", ballistaShip: "Ladja Ballista",
			catapultShip: "Ladja katapult", mortarShip: "Ladja Minometalec", paddleWheelRam: "Parni ram",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"},

		dk: {slinger: "Stenslynger", swordsman: "Sværdkriger", phalanx: "Hoplit", marksman: "Svovl Karabiner", mortar: "Morter",
			catapult: "Katapult", ram: "Rambuk", steamGiant: "Damp-kæmper", balloonBombardier: "Ballon Bombardier", cook: "Kok",
			medic: "Læge", gyrocopter: "Gyrokopter", archer: "Bueskytter", wall: "Mur ", spearman: "Spydmænd", barbarianAxeSwinger: "Barbare",
			ramShip: "Vædre skib", lightvessel: "Flamme skib", divingBoat: "U-båd", ballistaShip: "Bue skib",
			catapultShip: "Katapult skib", mortarShip: "Morter skib", paddleWheelRam: "Hjuldamper væder",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"},

		id: {slinger: "Pelempar Batu", swordsman: "Pasukan Berpedang", phalanx: "Pasukan Bertombak", marksman: "Pasukan Senapan", mortar: "Meriam",
			catapult: "Ketapel", ram: "Alat Pelantak", steamGiant: "Robot Uap", balloonBombardier: "Balon Pengebom", cook: "Koki",
			medic: "Dokter", gyrocopter: "Girokopter", archer: "Pemanah", wall: "Tembok", spearman: "Pejuang Bertombak", barbarianAxeSwinger: "Orang Barbar Berkapak",
			ramShip: "Kapal Pelantak", lightvessel: "Kapal Pembakar", divingBoat: "Kapal Selam", ballistaShip: "Kapal Pemanah",
			catapultShip: "Kapal Berketapel", mortarShip: "Kapal Meriam", paddleWheelRam: "Kapal Pelantak Uap",
			rocketShip : "Rocket Ship", paddleSpeedShip : "Paddle Speedboat", "balloonCarrier" : "Balloon Carrier", tender : "Tender"},

		codeToName : function(code)
		{
			switch(code){
				case 301: return "slinger";
				case 302: return "swordsman";
				case 303: return "phalanx";
				case 304: return "marksman";
				case 305: return "mortar";
				case 306: return "catapult";
				case 307: return "ram";
				case 308: return "steamGiant";
				case 309: return "balloonBombardier";
				case 310: return "cook";
				case 311: return "medic";
				case 312: return "gyrocopter";
				case 313: return "archer";
				case 314: return "wall";
				case 315: return "spearman";
				case 316: return "barbarianAxeSwinger";
				case 210: return "ramShip";
				case 211: return "lightvessel";
				case 212: return "divingBoat";
				case 213: return "ballistaShip";
				case 214: return "catapultShip";
				case 215: return "mortarShip";
				case 216: return "paddleWheelRam";
				case 217: return "rocketShip";
				case 218: return "paddleSpeedShip";
				case 219: return "balloonCarrier";
				case 220: return "tender";
			}
			return 0;
		}

	},

	unitsCost : {
		slinger: 			{ wood:  20, luxuryGoods:    0, generals:  0.4, population: 1, sulphur:    0, glass:   0, wine: 0, gold:   2, time: 1.5, speed: 60, img : '/skin/characters/military/x40_y40/y40_slinger_faceright.gif' },
		spearman: 			{ wood:  30, luxuryGoods:    0, generals:  0.6, population: 1, sulphur:    0, glass:   0, wine: 0, gold:   1, time:  1, speed: 60, img : '/skin/characters/military/x40_y40/y40_spearman_faceright.gif' },
		swordsman: 			{ wood:  30, luxuryGoods:   30, generals:  1.2, population: 1, sulphur:   30, glass:   0, wine: 0, gold:   4, time:  3, speed: 60, img : '/skin/characters/military/x40_y40/y40_swordsman_faceright.gif' },
		phalanx: 			{ wood:  40, luxuryGoods:   30, generals:  1.4, population: 1, sulphur:   30, glass:   0, wine: 0, gold:   3, time:  5, speed: 60, img : '/skin/characters/military/x40_y40/y40_phalanx_faceright.gif' },
		archer: 			{ wood:  30, luxuryGoods:   25, generals:  1.1, population: 1, sulphur:  240, glass:   0, wine: 0, gold:   4, time:  4, speed: 60, img : '/skin/characters/military/x40_y40/y40_archer_faceright.gif' },
		marksman: 			{ wood:  50, luxuryGoods:  150, generals:  4.0, population: 1, sulphur:  150, glass:   0, wine: 0, gold:   3, time: 10, speed: 60, img : '/skin/characters/military/x40_y40/y40_marksman_faceright.gif' },
		steamGiant: 		{ wood: 130, luxuryGoods:  180, generals:  6.2, population: 2, sulphur:  180, glass:   0, wine: 0, gold:  12, time: 15, speed: 40, img : '/skin/characters/military/x40_y40/y40_steamgiant_faceright.gif' },
		ram: 				{ wood: 220, luxuryGoods:    0, generals:  4.4, population: 5, sulphur:    0, glass:   0, wine: 0, gold:  15, time: 10, speed: 40, img : '/skin/characters/military/x40_y40/y40_ram_faceright.gif' },
		catapult: 			{ wood: 260, luxuryGoods:  300, generals: 11.2, population: 5, sulphur:  300, glass:   0, wine: 0, gold:  25, time: 30, speed: 40, img : '/skin/characters/military/x40_y40/y40_catapult_faceright.gif' },
		mortar: 			{ wood: 300, luxuryGoods: 1250, generals: 31.0, population: 5, sulphur: 1250, glass:   0, wine: 0, gold:  30, time: 40, speed: 40, img : '/skin/characters/military/x40_y40/y40_mortar_faceright.gif' },
		gyrocopter: 		{ wood:  25, luxuryGoods:  100, generals:  2.5, population: 3, sulphur:  100, glass:   0, wine: 0, gold:  15, time: 15, speed: 80, img : '/skin/characters/military/x40_y40/y40_gyrocopter_faceright.gif' },
		balloonBombardier:	{ wood:  40, luxuryGoods:  250, generals:  5.8, population: 5, sulphur:  250, glass:   0, wine: 0, gold:  45, time: 30, speed: 20, img : '/skin/characters/military/x40_y40/y40_bombardier_faceright.gif' },
		cook: 				{ wood:  50, luxuryGoods:  150, generals:  4.0, population: 1, sulphur:    0, glass:   0, wine: 150, gold: 10, time:20, speed: 40, img : '/skin/characters/military/x40_y40/y40_cook_faceright.gif' },
		medic: 				{ wood: 350, luxuryGoods:  450, generals: 10.0, population: 1, sulphur:    0, glass: 450, wine: 0, gold:  20, time: 20, speed: 60, img : '/skin/characters/military/x40_y40/y40_medic_faceright.gif' },
		wall: 				{ wood:   0, luxuryGoods:    0, generals:  0.0, population: 0, sulphur:    0, glass:   0, wine: 0, gold:   0, time:  0, speed:  0, img : '/skin/layout/stadtmauer_icon.gif' },
		barbarianAxeSwinger:{ wood:   0, luxuryGoods:    0, generals:  1.2, population: 1, sulphur:    0, glass:   0, wine: 0, gold:   0, time:  1, speed:  0, img : '/skin/characters/military/x40_y40/y40_barbarian_faceright.gif' },
		ramShip: 			{ wood: 250, luxuryGoods:    0, generals:  5.0, population: 3, sulphur:    0, glass:   0, wine: 0, gold:  15, time: 40, speed: 40, img : '/skin/characters/fleet/60x60/ship_ram_faceright.gif' },
		lightvessel:		{ wood:  80, luxuryGoods:  230, generals:  5.6, population: 4, sulphur:  230, glass:   0, wine: 0, gold:  25, time: 30, speed: 40, img : '/skin/characters/fleet/60x60/ship_flamethrower_faceright.gif' },
		divingBoat:			{ wood: 160, luxuryGoods:  850, generals: 20.2, population: 3, sulphur:  100, glass: 750, wine: 0, gold:  50, time: 60, speed: 40, img : '/skin/characters/fleet/60x60/ship_submarine_faceright.gif' },
		ballistaShip:		{ wood: 180, luxuryGoods:  160, generals:  6.8, population: 6, sulphur:  160, glass:   0, wine: 0, gold:  29, time: 50, speed: 40, img : '/skin/characters/fleet/60x60/ship_ballista_faceright.gif' },
		catapultShip:		{ wood: 180, luxuryGoods:  140, generals:  6.4, population: 5, sulphur:  140, glass:   0, wine: 0, gold:  35, time: 50, speed: 40, img : '/skin/characters/fleet/60x60/ship_catapult_faceright.gif' },
		mortarShip:			{ wood: 220, luxuryGoods:  900, generals: 22.4, population: 5, sulphur:  900, glass:   0, wine: 0, gold:  50, time: 50, speed: 30, img : '/skin/characters/fleet/60x60/ship_mortar_faceright.gif' },
		paddleWheelRam:		{ wood: 400, luxuryGoods:  800, generals: 24.0, population: 2, sulphur:  800, glass:   0, wine: 0, gold:  45, time: 40, speed: 40, img : '/skin/characters/fleet/60x60/ship_steamboat_faceright.gif' },
		rocketShip:			{ wood: 200, luxuryGoods: 1200, generals: 28.0, population: 2, sulphur: 1200, glass:   0, wine: 0, gold:  55, time: 60, speed: 30, img : '/skin/characters/fleet/60x60/ship_rocketship_faceright.gif' },
		paddleSpeedShip:	{ wood:  40, luxuryGoods:  280, generals:  6.4, population: 1, sulphur:  280, glass:   0, wine: 0, gold:   5, time: 30, speed: 60, img : '/skin/characters/fleet/60x60/ship_paddlespeedship_faceright.gif' },
		balloonCarrier:		{ wood: 700, luxuryGoods:  700, generals: 28.0, population: 8, sulphur:  700, glass:   0, wine: 0, gold: 100, time: 66, speed: 20, img : '/skin/characters/fleet/60x60/ship_ballooncarrier_faceright.gif' },
		tender:				{ wood: 300, luxuryGoods:  500, generals: 16.0, population: 7, sulphur:  250, glass: 250, wine: 0, gold: 100, time: 40, speed: 30, img : '/skin/characters/fleet/60x60/ship_tender_faceright.gif' },
	},

	colors : {
		winners:		"#1D6E22",
		losers:			"#1D6E22",
		attacker:		"#182BE8",
		defender:		"#CF15E4",
		attackerUnits:	"#23AAAB",
		defenderUnits:	"#DF24D0",
		deadUnits:		"#FF0000",
		otherNumbers:	"#D0A025",
		text:			"#342626",
		title: 			"#1D6E22",
		titleWinners:	"#1D6E22",
		titleLosers:	"#1D6E22",
		dots:			"#F6EBBD",
	},

	setLanguage : function ()
	{
		this.str = this.text[lang];
		this.str.units = this.units[lang];
	},

	generals : function (units, generals)
	{
		return Math.round (Math.round (units * generals * 100) / 100);
	},

	rightAlignString : function (n, w, c)
	{
		if (typeof c == 'undefined') { c = '.'; }
		n = n + '';
		while (n.length < w)
		{
			n = c + n;
		}
		return n;
	},

	leftAlignString : function (n, w, c)
	{
		if (typeof c == 'undefined') { c = '.'; }
		n = n + '';
		while (n.length < w)
		{
			n = n + c;
		}
		return n;
	},

	setGMValues : function()
	{
		if( GM_getValue("options_en", null) == null ) { GM_setValue("options_en",CR.options['en'].toSource()); }
		if( GM_getValue("options_ba", null) == null ) { GM_setValue("options_ba",CR.options['ba'].toSource()); }
		if( GM_getValue("options_rs", null) == null ) { GM_setValue("options_rs",CR.options['rs'].toSource()); }
		if( GM_getValue("options_ph", null) == null ) { GM_setValue("options_ph",CR.options['ph'].toSource()); }
		if( GM_getValue("options_de", null) == null ) { GM_setValue("options_de",CR.options['de'].toSource()); }
		if( GM_getValue("options_si", null) == null ) { GM_setValue("options_si",CR.options['si'].toSource()); }
		if( GM_getValue("options_dk", null) == null ) { GM_setValue("options_dk",CR.options['dk'].toSource()); }
		if( GM_getValue("options_id", null) == null ) { GM_setValue("options_id",CR.options['id'].toSource()); }

		if( GM_getValue("colors_en", null) == null ) { GM_setValue("colors_en",CR.colors.toSource()); }
		if( GM_getValue("colors_ba", null) == null ) { GM_setValue("colors_ba",CR.colors.toSource()); }
		if( GM_getValue("colors_rs", null) == null ) { GM_setValue("colors_rs",CR.colors.toSource()); }
		if( GM_getValue("colors_ph", null) == null ) { GM_setValue("colors_ph",CR.colors.toSource()); }
		if( GM_getValue("colors_de", null) == null ) { GM_setValue("colors_de",CR.colors.toSource()); }
		if( GM_getValue("colors_si", null) == null ) { GM_setValue("colors_si",CR.colors.toSource()); }
		if( GM_getValue("colors_dk", null) == null ) { GM_setValue("colors_dk",CR.colors.toSource()); }
		if( GM_getValue("colors_id", null) == null ) { GM_setValue("colors_id",CR.colors.toSource()); }

		if(GM_getValue("damageDetail", null) == null) { GM_setValue("damageDetail", damageDetail.toSource()); }
	},

	update : function()
	{
		ScriptUpdater.forceNotice(Ika.id, Ika.version);
	},

	preview : function()
	{
		$("div#preview").html(CR.reports.preview);
	},

	previewDamage : function()
	{
		$("div#previewDamage").html(CR.reports.preview_damage);
	},


/** Settings dialog */

	Settings : function ()
	{
		var popupStatus = 0;
		var tab_ids = new Array("#tab1","#tab2");
		var form_ids = { "tab1": "#form1", "tab2": "#form2"};
		var selCol = 0;
		var colorR = new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255);
		var colorG = new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255);
		var colorB = new Array(255, 255, 255, 255, 255, 255, 255, 255, 255, 255);
		var l;
		var opt;
		var col;

		setTabSetEvents = function(){
			$("div.tab_set_inactive").click(function (){
				$('div.tab_set_active').removeClass('tab_set_active').addClass('tab_set_inactive');
				$(this).removeClass('tab_set_inactive').addClass('tab_set_active');
				setTabSetEvents();
			});
		}

		setOtherSetEvents = function(arg){
			$('#red').css('top',33);
			$('#green').css('top',59);
			$('#blue').css('top',85);
			$('#red').css('left',((width-76)/2)+2);
			$('#green').css('left',((width-76)/2)+2);
			$('#blue').css('left',((width-76)/2)+2);

			$("input").each(function(){
				if($(this).attr("id") == "checkbox1"){
					$(this).click(function(){
						if(opt.cities == null) opt.cities = $(this).attr("checked");
						else if(opt.cities == false) opt.cities = true;
						else opt.cities = false;
					});
				}
				if($(this).attr("id") == "checkbox2"){
					$(this).click(function(){
						if(opt.loot == null) opt.loot = $(this).attr("checked");
						else if(opt.loot == false) opt.loot = true;
						else opt.loot = false;
					});
				}
				if($(this).attr("name") == "radio1"){
					$(this).click(function(){
						if($(this).attr("checked") == true) opt.align = $(this).attr("value");
					});
				}
				if($(this).attr("name") == "radio2"){
					$(this).click(function(){
						if($(this).attr("checked") == true) opt.damage = $(this).attr("value");
					});
				}
			});

			$('.el').click(function(event){
				if(selCol==0) selCol = 9;
				if($(this).attr('id') == 'el0'){
					colorR[selCol] = parseInt($(this).css('background-color').replace("rgb(","").replace(")","").split(",")[0]);
					$('#red').css({left: event.pageX - l});
				}
				if($(this).attr('id') == 'el1'){
					colorG[selCol] = parseInt($(this).css('background-color').replace("rgb(","").replace(")","").split(",")[1]);
					$('#green').css({left: event.pageX - l});
				}
				if($(this).attr('id') == 'el2'){
					colorB[selCol] = parseInt($(this).css('background-color').replace("rgb(","").replace(")","").split(",")[2]);
					$('#blue').css({left: event.pageX - l});
				}
				$('#col'+selCol).css('background-color','rgb('+colorR[selCol]+','+colorG[selCol]+','+colorB[selCol]+')');
				var elem = '0123456789ABCDEF';
				var hex = '#'+elem.charAt((colorR[selCol] - colorR[selCol]%16)/16)+elem.charAt(colorR[selCol]%16)+
							elem.charAt((colorG[selCol] - colorG[selCol]%16)/16)+elem.charAt(colorG[selCol]%16)+
							elem.charAt((colorB[selCol] - colorB[selCol]%16)/16)+elem.charAt(colorB[selCol]%16)
				$('#col'+selCol).html(hex);
				setColor(selCol);
			});

			$('#red').bind('drag',function( event ){
				if(selCol==0) selCol = 9;
				var off = event.offsetX - l;
				if(off < ((width-76)/2)+2) off = ((width-76)/2)+2;
				else if(off> ((width-76)/2)+7+250) off = ((width-76)/2)+7+250;
				$(this).css({left: off});
				colorR[selCol] = parseInt($('.el1'+parseInt((off-((width-76)/2)-2))).css('background-color').replace("rgb(","").replace(")","").split(",")[0]);
				$('#col'+selCol).css('background-color','rgb('+colorR[selCol]+','+colorG[selCol]+','+colorB[selCol]+')');
				var elem = '0123456789ABCDEF';
				var hex = '#'+elem.charAt((colorR[selCol] - colorR[selCol]%16)/16)+elem.charAt(colorR[selCol]%16)+
							elem.charAt((colorG[selCol] - colorG[selCol]%16)/16)+elem.charAt(colorG[selCol]%16)+
							elem.charAt((colorB[selCol] - colorB[selCol]%16)/16)+elem.charAt(colorB[selCol]%16);
				$('#col'+selCol).html(hex);
				setColor(selCol);
			});

			$('#green').bind('drag',function( event ){
				if(selCol==0) selCol = 9;
				var off = event.offsetX - l;
				if(off < ((width-76)/2)+2) off = ((width-76)/2)+2;
				else if(off> ((width-76)/2)+7+250) off = ((width-76)/2)+7+250;
				$(this).css({left: off});
				colorG[selCol] = parseInt($('.el2'+parseInt((off-((width-76)/2)-2))).css('background-color').replace("rgb(","").replace(")","").split(",")[1]);
				$('#col'+selCol).css('background-color','rgb('+colorR[selCol]+','+colorG[selCol]+','+colorB[selCol]+')');
				var elem = '0123456789ABCDEF';
				var hex = '#'+elem.charAt((colorR[selCol] - colorR[selCol]%16)/16)+elem.charAt(colorR[selCol]%16)+
							elem.charAt((colorG[selCol] - colorG[selCol]%16)/16)+elem.charAt(colorG[selCol]%16)+
							elem.charAt((colorB[selCol] - colorB[selCol]%16)/16)+elem.charAt(colorB[selCol]%16)
				$('#col'+selCol).html(hex);
				setColor(selCol);
			});

			$('#blue').bind('drag',function( event ){
				if(selCol==0) selCol = 9;
				var off = event.offsetX - l;
				if(off < ((width-76)/2)+2) off = ((width-76)/2)+2;
				else if(off> ((width-76)/2)+7+250) off = ((width-76)/2)+7+250;
				$(this).css({left: off});
				colorB[selCol] = parseInt($('.el3'+parseInt((off-((width-76)/2)-2))).css('background-color').replace("rgb(","").replace(")","").split(",")[2]);
				$('#col'+selCol).css('background-color','rgb('+colorR[selCol]+','+colorG[selCol]+','+colorB[selCol]+')');
				var elem = '0123456789ABCDEF';
				var hex = '#'+elem.charAt((colorR[selCol] - colorR[selCol]%16)/16)+elem.charAt(colorR[selCol]%16)+
							elem.charAt((colorG[selCol] - colorG[selCol]%16)/16)+elem.charAt(colorG[selCol]%16)+
							elem.charAt((colorB[selCol] - colorB[selCol]%16)/16)+elem.charAt(colorB[selCol]%16)
				$('#col'+selCol).html(hex);
				setColor(selCol);
			});

			$('.color').each(function(){
				$(this).click(function(){
					$('#col'+selCol).animate({width: '60px', left: '0px', top: '0px', padding: '0px' },100);
					preCol = selCol;
					selCol = parseInt($(this).attr('id').substring(3));
					if(preCol == selCol){
						$(this).animate({width: '60px', left: '0px', top: '0px', padding: '0px' },100);
						selCol = 0;
					}else{
						$('#red').css('left',((width-76)/2)+2+255-colorR[selCol]);
						$('#green').css('left',((width-76)/2)+2+255-colorG[selCol]);
						$('#blue').css('left',((width-76)/2)+2+255-colorB[selCol]);
						$(this).animate({width: '64px', left: '-5px', top: '-3px', padding: '3px' },100);
					}
					var elem = '0123456789ABCDEF';
					var hex = '#'+elem.charAt((colorR[selCol] - colorR[selCol]%16)/16)+elem.charAt(colorR[selCol]%16)+
								elem.charAt((colorG[selCol] - colorG[selCol]%16)/16)+elem.charAt(colorG[selCol]%16)+
								elem.charAt((colorB[selCol] - colorB[selCol]%16)/16)+elem.charAt(colorB[selCol]%16)
					$('#col'+selCol).html(hex);
				});
			});

			for(var tab in tab_ids)
			{
				$(tab_ids[tab]).click(function()
				{
					var form = $('.form_active');
					if(form.attr('id') != form_ids[$(this).attr('id')])
					{
						form.removeClass('form_active').addClass('form_inactive');
						$(form_ids[$(this).attr('id')]).removeClass('form_inactive').addClass('form_active');
					}
				});
			}

			$('#save').click(function()
			{
				GM_setValue("options_"+lang,opt.toSource());
				GM_setValue("colors_"+lang,col.toSource());
				CR.options[lang] = opt;
				arg();
				disablePopup();
			});

			$('#save').hover(function(){ $(this).css('color','#FF9933');}, function(){ $(this).css('color','#542c0f'); });
			$('#cancel').click(function(){ 	disablePopup(); });
			$('#cancel').hover(function(){ 	$(this).css('color','#FF9933'); },function(){ $(this).css('color','#542c0f'); });

		}

		makeColorPalete = function()
		{
			var div = "<br>";//= '<table id=colorPalete  cellspacing=1 cellpadding=0 style="width:'+255+'px; background: #000000; margin: auto;"><tbody>';
			var for1 = new Array(3, 5, 6);
			var for2 = new Array(1, 2, 4);
			for(i = 0; i < 3; i++){
				div += '<table class=colorPalete  cellspacing=1 cellpadding=0 style="width:'+256+'px; background: #000000; margin: auto;"><tbody>';
				div += '<tr>';
				/*for(j = 0; j < 255; j+=2){
					div += '<td id=el'+i+' class=el style="width: 1px; height: 10px; background: rgb('+(255-((for1[i])&4)/4*j)+', '+(255-((for1[i])&2)/2*j)+', '+(255-((for1[i])&1)*j)+');"></td>';
				}*/
				for(j = 255; j >= 0; j--){
					div += '<td id=el'+i+' class="el el'+(i+1)+''+(255-j)+'" style="width: 1px; height: 10px; background: rgb('+(j*(for2[i]&1))+', '+(j*(for2[i]&2)/2)+', '+(j*(for2[i]&4)/4)+');"></td>';
				}
				div += '</tr>';
				div += '</tbody></table><br>';
			}
			return div;
		}

		this.init = function(arg)
		{
			width = $('#reportDiv').width() - 6;
			left = $('#reportDiv').offset().left;
			top = $('#reportDiv').offset().top;
	//		w = $(window).width()+unsafeWindow.scrollMaxX;
			w = $(document).width();
			windowHeight = $(document).height();
			l = left + 30;

			$(window).bind("resize", function resizeWindow(e){
				$('#backgroundPopup').css('width',0);
				wid = $(window).width();
				$('#backgroundPopup').css('width', wid+'px');
				$('#popup').css('left', $('#reportDiv').offset().left);
			});

			GM_addStyle('#popup{display: none; position: absolute; top: '+top+'px; left: '+left+'px; background: #FDF7DD; z-index: 90001; width: '+width+'px; border: solid 3px #FEDC9C; }'+
					'#backgroundPopup{display: none; position: absolute; top: 0; left: 0; background: #000000; z-index: 90000; opacity: 0.7; width: '+w+'px; height: '+windowHeight+'px}'+
					'.tab_set{ padding: 4px 10px; background-color: #FDF7DD; height: 14px; /*width: 80px;*/ text-align: center; cursor: pointer; font-weight: bold; }' +
					'.tab_set_inactive{ background-color: #FDF7DD; float: left; }' +
					'.tab_set_active{ background-color: #FEDC9C; float: left; }' +
					'.form{ width: '+(width-44)+'px; border: solid 2px #FEDC9C; background-color:#FDF7DD; margin-left: 20px; margin-top: 32px; margin-bottom: 10px; text-align: left;}' +
					'.form_active{ display: block; }' +
					'.form_inactive{ display: none; }' +
					'.frame{ border-bottom: dashed 1px #000000; width: '+(width-66)+'px; margin: 5px; padding: 5px;  text-align: center; }'+
					'.color{ position: absolute; margin-left: 5px; margin-top: 2px; border: solid 1px #000000; width: 60px; height: 14px; background: #FFFFFF; cursor: pointer; text-align: center; }'+
					'.selectedColor{ position: absolute; background: #FEDC9C; width: 3px; height: 12px; border: solid 1px #000000; cursor: pointer;}'+
					'#red{ left: 0px; }'+
					'#green{left: 0px; }'+
					'#blue{left: 0px; }'+
					'.colorPalete{ border: solid 1px #000000; }'+
					'.cText{ position: absolute; left: 0px; top: 20px; width: '+((width-76)/4)+'px; text-align: right; padding-top: 3px; }'+
					'.cColor{ position: absolute; left: '+((width-76)/4)+'px; width: '+((width-76)/4)+'px; text-align: left; }'+
					'#save{ float: right; margin-right: 10px; background-color: #FEDC9C; font-weight: bold;}'+
					'#cancel{ float: left; margin-left: 10px; background-color: #FEDC9C; font-weight: bold;}'
			);

			colorPalete = makeColorPalete();

			$("body").append(
				'<div>' +
					'<div id="popup">'+
						'<div style="width: '+(width-44)+'px; height: 18px; position: absolute; top: 10px; left: 20px; background: #FDF7DD;">'+
							'<div class="tab_set tab_set_active" id="tab1"> '+CR.str.settings+' </div>'+
						'</div>'+
						'<div class="form form_active" id="form1">'+
							'<div class=frame>'+
								'<span style="margin: 5px;"><b>'+CR.str.show+'</b></span><br>'+
								'<input id=checkbox1 type=checkbox style="margin-left: 10px; margin-top: 5px;"> '+CR.str.cities+' </input>'+
								'<input id=checkbox2 type=checkbox style="margin-left: 10px; margin-top: 5px;"> '+CR.str.resources+' </input>'+
							'</div>'+
							'<div class=frame>'+
								'<span style="margin: 5px;"><b>'+CR.str.align+'</b></span><br>'+
								'<input id=radio11 type=radio name=radio1 style="margin-left: 10px; margin-top: 5px;" value="left"> ' + CR.str.left + ' </input>'+
								'<input id=radio12 type=radio name=radio1 style="margin-left: 10px; margin-top: 5px;" value="center"> ' + CR.str.center + ' </input>'+
								'<input id=radio13 type=radio name=radio1 style="margin-left: 10px; margin-top: 5px;" value="right"> ' + CR.str.right + ' </input>'+
							'</div>'+
							'<div class=frame>'+
								'<span style="margin: 5px;"><b>'+CR.str.damage+'</b></span><br>'+
								'<input id=radio21 type=radio name=radio2 style="margin-left: 10px; margin-top: 5px;" value=GeneralsA> ' + CR.str.generals + ': ' + CR.str.army +' </input>'+
								'<input id=radio22 type=radio name=radio2 style="margin-left: 10px; margin-top: 5px;" value=GeneralsAL>  ' + CR.str.generals + ': ' + CR.str.armyLoot +' </input>'+
								'<input id=radio23 type=radio name=radio2 style="margin-left: 10px; margin-top: 5px;" value=ResourcesA> ' + CR.str.resources + ': ' + CR.str.army +' </input>'+
								'<input id=radio24 type=radio name=radio2 style="margin-left: 10px; margin-top: 5px;" value=ResourcesAL> ' + CR.str.resources + ': ' + CR.str.armyLoot +' </input>'+
							'</div>'+
							'<div id=color class=frame style="position: relative;">'+
								'<span style="margin: 5px;"><b>'+CR.str.colors+'</b></span><br>'+
								'<div style="float: left; width: '+((width-76)/2)+'px; height: 170px;">'+
									'<div class=cText style="top: 20px;"> '+CR.str.title+' </div>'+
									'<div class=cColor style="top: 20px;"><div class=color id="col1"></div></div>'+
									'<div class=cText style="top: 40px;"> '+CR.str.text+' </div>'+
									'<div class=cColor style="top: 40px;"><div class=color id="col2"></div></div>'+
									'<div class=cText style="top: 60px;"> '+CR.str.attacker+' </div>'+
									'<div class=cColor style="top: 60px;"><div class=color id="col3"></div></div>'+
									'<div class=cText style="top: 80px;"> '+CR.str.defender+' </div>'+
									'<div class=cColor style="top: 80px;"><div class=color id="col4"></div></div>'+
									'<div class=cText style="top: 100px;"> '+CR.str.attackerUnits+' </div>'+
									'<div class=cColor style="top: 100px;"><div class=color id="col5"></div></div>'+
									'<div class=cText style="top: 120px;"> '+CR.str.defenderUnits+' </div>'+
									'<div class=cColor style="top: 120px;"><div class=color id="col6"></div></div>'+
									'<div class=cText style="top: 140px;"> '+CR.str.deadUnits+' </div>'+
									'<div class=cColor style="top: 140px;"><div class=color id="col7"></div></div>'+
									'<div class=cText style="top: 160px;"> '+CR.str.otherNumbers+' </div>'+
									'<div class=cColor style="top: 160px;"><div class=color id="col8"></div></div>'+
								'</div>'+
								'<div style="float: left;">'+
									colorPalete+
								'</div>'+
								'<div style="clear: both;"></div>'+
								'<div id=red class=selectedColor></div>'+
								'<div id=green class=selectedColor></div>'+
								'<div id=blue class=selectedColor></div>'+
							'</div>'+
						'</div>'+
						'<div id=form2 class="form form_inactive" style="height: 200px; "></div>'+
						'<div>'+
							'<div style="width: 50%; height: 30px; float: left; text-align: right;"><div id=save class=tab_set> '+CR.str.save+' </div></div>'+
							'<div style="width: 50%; height: 30px; float: left; text-align: left;"><div id=cancel class=tab_set> '+CR.str.cancel+' </div></div>'+
						'</div>'+
					'</div>' +
					'<div id="backgroundPopup"></div>' +
				'</div>'
			);

			setTabSetEvents();
			setOtherSetEvents(arg);
		};

		setColor = function(ind)
		{
			if(ind == 1) col.title = $('#col1').html();
			else if(ind == 2) col.text = $('#col2').html();
			else if(ind == 3) col.attacker = $('#col3').html();
			else if(ind == 4) col.defender = $('#col4').html();
			else if(ind == 5) col.attackerUnits = $('#col5').html();
			else if(ind == 6) col.defenderUnits = $('#col6').html();
			else if(ind == 7) col.deadUnits = $('#col7').html();
			else if(ind == 8) col.otherNumbers = $('#col8').html();
		};

		loadPopup = function()
		{
			if(popupStatus==0){
				$("#backgroundPopup").show();
				$("#popup").show();
				popupStatus = 1;
			}
		};

		disablePopup = function()
		{
			if(popupStatus==1){
				$("#backgroundPopup").hide();
				$("#popup").hide();
				popupStatus = 0;
			}
		};

		this.show = function()
		{
			opt = eval(GM_getValue('options_'+lang,null));
			col = eval(GM_getValue('colors_'+lang,null));
			if(opt == null ) opt = CR.options[lang];
			$("input#checkbox1").attr("checked",opt.cities);
			$("input#checkbox2").attr("checked",opt.loot);
			if(opt.align == 'Left') $('#radio11').attr("checked",true);
			else if(opt.align == 'Center') $('#radio12').attr("checked",true);
			else if(opt.align == 'Right') $('#radio13').attr("checked",true);
			if(opt.damage == 'GeneralsA') $('#radio21').attr("checked",true);
			else if(opt.damage == 'GeneralsAL') $('#radio22').attr("checked",true);
			else if(opt.damage == 'ResourcesA') $('#radio23').attr("checked",true);
			else if(opt.damage == 'ResourcesAL') $('#radio24').attr("checked",true);
			$('#col1').html(col.title); $('#col1').css('background-color',col.title); colorR[1] = parseInt(col.title.substring(1,3),16); colorG[1] = parseInt(col.title.substring(3,5),16); colorB[1] = parseInt(col.title.substring(5,7),16);
			$('#col2').html(col.text); $('#col2').css('background-color',col.text); colorR[2] = parseInt(col.text.substring(1,3),16); colorG[2] = parseInt(col.text.substring(3,5),16); colorB[2] = parseInt(col.text.substring(5,7),16);
			$('#col3').html(col.attacker); $('#col3').css('background-color',col.attacker); colorR[3] = parseInt(col.attacker.substring(1,3),16); colorG[3] = parseInt(col.attacker.substring(3,5),16); colorB[3] = parseInt(col.attacker.substring(5,7),16);
			$('#col4').html(col.defender); $('#col4').css('background-color',col.defender); colorR[4] = parseInt(col.defender.substring(1,3),16); colorG[4] = parseInt(col.defender.substring(3,5),16); colorB[4] = parseInt(col.defender.substring(5,7),16);
			$('#col5').html(col.attackerUnits); $('#col5').css('background-color',col.attackerUnits); colorR[6] = parseInt(col.attackerUnits.substring(1,3),16); colorG[5] = parseInt(col.attackerUnits.substring(3,5),16); colorB[5] = parseInt(col.attackerUnits.substring(5,7),16);
			$('#col6').html(col.defenderUnits); $('#col6').css('background-color',col.defenderUnits); colorR[6] = parseInt(col.defenderUnits.substring(1,3),16); colorG[6] = parseInt(col.defenderUnits.substring(3,5),16); colorB[6] = parseInt(col.defenderUnits.substring(5,7),16);
			$('#col7').html(col.deadUnits); $('#col7').css('background-color',col.deadUnits); colorR[7] = parseInt(col.deadUnits.substring(1,3),16); colorG[7] = parseInt(col.deadUnits.substring(3,5),16); colorB[7] = parseInt(col.deadUnits.substring(5,7),16);
			$('#col8').html(col.otherNumbers); $('#col8').css('background-color',col.otherNumbers); colorR[8] = parseInt(col.otherNumbers.substring(1,3),16); colorG[8] = parseInt(col.otherNumbers.substring(3,5),16); colorB[8] = parseInt(col.otherNumbers.substring(5,7),16);
			loadPopup();
		}
	},

/* Main init function */
	init : function ()
	{
		this.setLanguage ();
		this.report_header = "[align=" + this.options[lang].align + "][font='" + this.report_font + "']";
		this.report_footer = "\n\n\n[color=#999999][b][i]" + this.str.created + " stnkvcmls' Ikariam CR Converter\n" + this.str.version + " 0.85[/i][/b][/color][/font][/align]";
		this.report_footer_generals = "\n[size=10][color=#a0a0a0]" + this.str.created + " " + Ika.title + " v" + Ika.version + "\n [url]http://userscripts.org/scripts/show/" + Ika.id + "[/url][/color][/size][/font][/align]";

		this.settings = new this.Settings();

		this.setGMValues();
	}

};

reportElements = {
	type: null,
	for_near: null,
	place: null,
	time: null,
	attackers: [],
	defenders: [],
	cities: { attackers: [], defenders: [] },
	units: {codes: [], attackers: [], defenders: []},
	winners: [],
	losers: [],
	loot: [],
	lootTotal: 0,
	isThereLoot: false
}

damageDetail = {
	attacker: [],
	defender: []
}

CR.init ();
var textArea;

setTabEvents = function(){
	$("div.tab_inactive").click(function ()
	{
		if($(this).attr('class') != 'tab tab_active')
		{
			$('div.tab_active').removeClass('tab_active').addClass('tab_inactive');
			$(this).removeClass('tab_inactive').addClass('tab_active').css('color','#542c0f');
			setTabEvents();
		}
	})
}

setOtherEvents = function()
{
	$('div#bbcode').click(function (){
		$('.tabContainer').hide();
		$('#cbbcode').show();
		$('#cbbcode TEXTAREA').val(CR.reports.bbcode);
	});

	$('div#plaintext').click(function (){
		$('.tabContainer').hide();
		$('#cplaintext').show();
		$('#cplaintext TEXTAREA').val(CR.reports.plaintext);
	});

	$('div#htmlcode').click(function (){
		$('.tabContainer').hide();
		$('#chtmlcode').show();
		$('#chtmlcode TEXTAREA').val(CR.reports.htmlcode);
	});

	$('div#tabPreviewBasic').click(function (){
		$('.preview').hide();
		$('#preview').show();
	});

	$('div#tabPreviewDamage').click(function (){
		$('.preview').hide();
		$('#previewDamage').show();
	});

	$('.tabContainer TEXTAREA').click(function (){ 	$(this).select(); });

	$('div#bbcode').hover(function(){
		if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933');
	},function(){ $(this).css('color','#542c0f'); });

	$('div#plaintext').hover(function(){ if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933'); },function(){ $(this).css('color','#542c0f'); });

	$('div#htmlcode').hover(function(){ if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933'); },function(){ $(this).css('color','#542c0f'); });

	$('#settings').click(function (){ CR.settings.show(this); });

	$('#settings').hover(function (){ $(this).css('color','#FF9933'); },function (){ $(this).css('color','#542c0f'); });

	$('#update').click(CR.update);
	$('#update').hover(function (){ $(this).css('color','#FF9933'); },function (){ $(this).css('color','#542c0f'); });
}


createTextArea = function()
{
	if( CR.str == null ){
		alert("Language is not suported. Visit http://userscripts.org/scripts/show/" + Ika.id + " .");
		return 0;
	}

	GM_addStyle(
		'.buttons {	width: 656px; height: 22px; background-color: #FDF7DD; margin-left: 9px; padding-top: 10px; }' +
		'#reportDiv p{ font-size: 14px; font-weight: bold; color: #542C32; background-color: #FDF7DD; }' +
		'.tab { padding: 4px 10px; background-color: #FDF7DD; height: 14px; /*width: 80px;*/ text-align: center; cursor: pointer; font-weight: bold;}' +
		'.tab_inactive{ background-color: #FDF7DD; float: left; }' +
		'.tab_active{ background-color: #FEDC9C; float: left; }' +
		'.tabContainer { display: none; }' +
		'.tabContainer.active { display: block; }' +
		'.tabContainer TEXTAREA { border: solid 2px #FEDC9C; width: 648px; height: 150px; overflow: auto; background-color:#FDF7DD; display: block; margin: 0 auto; }' +
		'.preview { border: solid 2px #FEDC9C; width: 642px; margin: 0 auto; padding: 5px; font-size:1.2em;}'+
		'#preview { display: block }'+
		'#previewDamage{ display: none; }'+
		'#update{ float: right; cursor: pointer; }'
	);

	$("div#mainview").append(
		'<div id="reportDiv" class=contentBox01h>' +
			'<h3 class=header>' + Ika.title + ', ' + CR.str.version + ' '  + Ika.version + '</h3>'+
			'<div class=content>'+
				'<div id="buttons" class="buttons"> '+
					'<div class="tab tab_active" id=bbcode> ' + CR.str.bbcode + ' </div>'+
					'<div class="tab tab_inactive" id=plaintext> ' + CR.str.plaintext + ' </div>'+
					'<div class="tab tab_inactive" id=htmlcode> ' + CR.str.htmlcode + ' </div>'+
					'<div class="tab" style="float: right;" id="settings"> ' + CR.str.settings + ' </div>' +
				'</div>	'+
				'<div style="position: relative; margin-left: 9px; height: 170px;">'+
					'<div id=cbbcode class="tabContainer active"><textarea name="text2"></textarea><br></div>'+
					'<div id=cplaintext class="tabContainer"><textarea name="text2"></textarea><br></div>'+
					'<div id=chtmlcode class="tabContainer"><textarea name="text2"></textarea><br></div>'+
				'</div>'+
			'</div>'+
			'<div id="previewTabs" class="buttons">' +
				'<div class="tab tab_active" id="tabPreviewBasic">' + CR.str.damage + '</div>' +
				'<div class="tab tab_inactive" id="tabPreviewDamage">' + CR.str.generals + '</a></div>' +
			'</div>' +
			'<div id="preview" class="preview"></div><div id="previewDamage" class="preview"></div><br />'+
			'<div class=footer></div>'+
		'</div>'
	);

	setTabEvents();
	setOtherEvents();
	textArea = $('#chtmlcode > TEXTAREA');
	parseReport();
	CR.settings.init(convertReport);
	$('#cbbcode').show();
	$('#cbbcode TEXTAREA').val(CR.reports.bbcode);
}

parseReport = function()
{
	textArea.val("");
	var tmp = $("#troopsReport h3.header")[0];

	/* battle type */
	tmp2 = tmp.childNodes[0].nodeValue;
	if( tmp2.indexOf(CR.str.battleSea) != -1) reportElements.type = CR.str.battleSea;
	else reportElements.type = CR.str.battleLand;

	/* for_near / place */
	if( (i = tmp2.indexOf(CR.str.forCity)) != -1) reportElements.for_near = CR.str.forCity;
	else{
	  reportElements.for_near = CR.str.nearCity;
	  i = tmp2.indexOf(CR.str.nearCity);
	}
	reportElements.place = tmp2.substring( i + reportElements.for_near.length + 1, tmp2.length - 1);

	/* time */
	reportElements.time = "[" + $('span.date').html().substring( 1, $('span.date').html().length - 1) + "]";

	tmp = $("div.attacker")
	if( tmp.html() == $("div.textgreen").html()) attackersReport = 1;
	else attackersReport = 0;

	/* attacker */
	tmp = $('div.attacker span').text().split(',');
	i = 0;
	for(var el in tmp){
		if(( k = tmp[el].indexOf(CR.str.from)) != -1){
			reportElements.attackers.push(tmp[el].substring(0,k));
			if(reportElements.cities.attackers[i] == null) reportElements.cities.attackers[i] = new Array();
			reportElements.cities.attackers[i].push(tmp[el].substring(k+CR.str.from.length));
			i++;
		}
		else{
			reportElements.cities.attackers[i-1].push(tmp[el]);
		}
	}

	/* defender */
	tmp = $('div.defender span').text().split(',');
	i = 0;
	for(var el in tmp){
		if(( k = tmp[el].indexOf(CR.str.from)) != -1){
			reportElements.defenders.push(tmp[el].substring(0,k));
			if(reportElements.cities.defenders[i] == null) reportElements.cities.defenders[i] = new Array();
			reportElements.cities.defenders[i].push(tmp[el].substring(k+CR.str.from.length));
			i++;
		}
		else{
			reportElements.cities.defenders[i-1].push(tmp[el]);
		}
	}

	/* units */
//	var unitCodes = $("th.col1");
	var unitCodes = $("TABLE.overview td.col1");

	k = 0;
	for( i = 0; i < unitCodes.length; i++ ){
		var next = unitCodes[i].nextSibling;
		while( next != null ){
			if( next.nodeName != "#text" ){
				if( next.childNodes.length != 0 ){
					reportElements.units.codes[k] = next.childNodes[0].className.substring(next.childNodes[0].className.indexOf("s") + 1);
					k++;
				}
			}
			next = next.nextSibling;
		}
	}

	/* attacker */
	var units1 = $("tr.textgreen");
	var units2 = $("tr.textred");
	var uNum = 0;

	textArea.value = "";
	k = 0;
	var no_def = 1;
	for( i = 0; i < units1.length; i++ )
	{
		var tr = units1[i];
		if( tr.childNodes[1].childNodes[0].nodeValue != CR.str.alliedTroops) no_def = 0;
	}

	for( i = 0; i < units1.length; i++ )
	{
		var tr = units1[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == CR.str.alliedTroops && no_def == 0) k = uNum;

		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2)
		{
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;

			if(td.childNodes.length != 0 )
			{
				if( reportElements.units.attackers[k] == null )		{ reportElements.units.attackers[k] = { left: 0, lost: 0 }; }
				if( reportElements.units.defenders[k] == null )		{ reportElements.units.defenders[k] = { left: 0, lost: 0 }; }
				if (td.childNodes.length == 1)
				{
					tmp2 = td.childNodes[0].nodeValue.replace( /\s/g, "" );
				}
				else
				{
					tmp2 = td.childNodes[1].childNodes[0].nodeValue.replace( /\s/g, "" );
				}
				if( tmp2 != "-" )
				{
					left = parseFloat(tmp2.substring(0,tmp2.indexOf("(")));
					if( left < 0 )
					{
						left = 0;
						tmp2 = tmp2.substring(1);
					}
					lost = parseFloat(tmp2.substring(tmp2.indexOf("-")+1,tmp2.indexOf(")")));
				}

				textArea.value += i + "  " + reportElements.units.codes[k] + ": " + left + "(-" + lost + ")\n";

				if( attackersReport == 1 )
				{
					reportElements.units.attackers[k].left += left;
					reportElements.units.attackers[k].lost += lost;
				}
				else
				{
					reportElements.units.defenders[k].left += left;
					reportElements.units.defenders[k].lost += lost;
				}
				k++;
			}

		}
	}


	/* if there's no units (eaven -) in all but last row */
	k = 0;
	var line = $("tr.line");
	var n = 0;
	for( i = 0; i < line.length; i++ )
	{
		var tmp = line[i].previousSibling.previousSibling.className;
		if( tmp != "textgreen" && tmp != "textred" )
		{
			for( k = 0; k < 7; k++ )
			{
				if( reportElements.units.defenders[k] == null ) reportElements.units.defenders[k] = { left: 0, lost: 0 };
			}
			n = k;
		}
	}

	/* defender */
	no_def = 1;
	for( i = 0; i < units2.length; i++ )
	{
		var tr = units2[i];
		if( tr.childNodes[1].childNodes[0].nodeValue != CR.str.alliedTroops) { no_def = 0; }
	}

	for( i = 0; i < units2.length; i++ )
	{
		var tr = units2[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == CR.str.alliedTroops && no_def == 0) { k = uNum; }

		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2)
		{
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;
			if(td.childNodes.length != 0 )
			{
				if( reportElements.units.attackers[k] == null ) { reportElements.units.attackers[k] = { left: 0, lost: 0 }; }
				if( reportElements.units.defenders[k] == null ) { reportElements.units.defenders[k] = { left: 0, lost: 0 }; }
				tmp2 = (td.childNodes.length == 1)
					? td.childNodes[0].nodeValue.replace( /\s/g, "" )
					: td.childNodes[1].childNodes[0].nodeValue.replace( /\s/g, "" );

				if( tmp2 != "-" )
				{
					left = parseFloat(tmp2.substring(0,tmp2.indexOf("(")));
					if( left < 0 )
					{
						left = 0;
						tmp2 = tmp2.substring(1);
					}
					lost = parseFloat(tmp2.substring(tmp2.indexOf("-")+1,tmp2.indexOf(")")));
				}

				textArea.value += i + "  " + reportElements.units.codes[k] + ": " + left + "(-" + lost + ")\n";

				if( attackersReport == 0 )
				{
					reportElements.units.attackers[k].left += left;
					reportElements.units.attackers[k].lost += lost;
				}
				else
				{
					reportElements.units.defenders[k].left += left;
					reportElements.units.defenders[k].lost += lost;
				}
				k++;
			}
		}
	}


	/*$("#troopsReport table.overview tr").each(function() {
		if ($(this).find("th div").size() > 0) {
			unitSide = reportElements.units.attackers;
			unitCountStart = reportElements.units.codes.length;
			$(this).find("th div").each(function() { reportElements.units.codes.push($(this).attr('class').substring($(this).attr('class').indexOf('s')+1)); });
		}
		else if ($(this).find("td[colspan='8'][class^='col1 nobg']").size() == 1) unitSide = reportElements.units.defenders;
		else if ($(this).find("td.numbers").size() == reportElements.units.codes.length) {
			unitCount = unitCountStart;
			$(this).find("td.numbers").each(function() {
				var details = $(this).text();
				if (details.indexOf("(") != -1) {
					if (unitSide[unitCount] == null) { unitSide[unitCount] = { left: 0, lost: 0 } }
					unitSide[unitCount].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
					unitSide[unitCount].lost += parseInt(details.substr(details.indexOf('(') + 2).replace(/\s+/, '').replace(/\)/, ''));
				}
				else if (unitSide[unitCount] == null) unitSide[unitCount] = { left: 0, lost: 0 };
				unitCount++
			});
		}
	}); */

	/* winners */
	tmp = $("div.winners");
	if( tmp[0] != null ){
		tmp2 = tmp[0].childNodes[2].nodeValue;
		reportElements.winners = tmp2.replace(/^\s+/, '').replace(/\s+$/, '').split(", ");
	}

	/* losers */
	tmp = $("div.losers");
	if( tmp[0] != null ){
		tmp2 = tmp[0].childNodes[2].nodeValue;
		reportElements.losers = tmp2.split(", ");
	}

	/* loot */
	isThereLoot = false;
	$("ul.resources").each(function(){
		if( $(this).parent().attr("id") != "cityResources" ){
			isThereLoot = true;
			var length = $(this).contents().length;

			 var par = $(this).parent();
			 var length2 = par.contents().length;

			 var index;

			 if( length2 == 2 ) index = findInArray(reportElements.winners, par.contents()[0].nodeValue);
			 else if( length2 == 4 ) index = findInArray(reportElements.winners, par.contents()[2].nodeValue);
			 else if( length2 == 6 ) index = findInArray(reportElements.winners, par.contents()[3].childNodes[0].nodeValue);

			var res = 0;
			for( var i = 0; i < length; i++ ){
				if( $(this).contents()[i].className == "wood" ) res = 0;
				else if( $(this).contents()[i].className == "wine" ) res = 1;
				else if( $(this).contents()[i].className == "marble" ) res = 2;
				else if( $(this).contents()[i].className == "glass" ) res = 3;
				else if( $(this).contents()[i].className == "sulfur" ) res = 4;

				if(reportElements.loot[index] == null) reportElements.loot[index] = new Array();
				reportElements.loot[index][res] = $(this).contents()[i].childNodes[1].nodeValue;
				reportElements.lootTotal += parseInt($(this).contents()[i].childNodes[1].nodeValue);
			}
		}
	});

	convertReport();
}

convertReport = function ()
{
	var line = "";
	var i;
	var font = "[font='" + CR.report_font + "']";

	CR.options[lang] = eval(GM_getValue("options_"+lang, null));
	colors = eval(GM_getValue("colors_"+lang,null));

	for(i = 0; i < CR.report_width; i++) { line += "-" };

	if (reportElements.units.defenders == "")
	{
		for(i = 0; i < reportElements.units.codes.length; i++)
		{
			reportElements.units.defenders[i] = {left: 0, lost: 0 };
		}
	}

	/* battle for - city */
	var textBattleFor = "[size=" + CR.report_font_size + "][color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";
	if (CR.options[lang].cities == true)
	{
		textBattleFor += "[size=" + CR.report_font_size_title + "][color=" + CR.colors.title + "][b]" + reportElements.type + " " + reportElements.for_near + " " + reportElements.place + "[/b][/color][/size]";
	}
	else
	{
		textBattleFor += "[size=" + CR.report_font_size_title + "][color=" + CR.colors.title + "][b]" + reportElements.type + "[/b][/color][/size]";
	}
	textBattleFor += "\n";

	/* battle for - time/date */
	textBattleFor += "[size=" + CR.report_font_size_title + "][color=" + CR.colors.otherNumbers + "][b]" + reportElements.time + "[/b][/color][/size]\n";
	textBattleFor += "[size=" + CR.report_font_size + "][color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";

	/* attacker */
	var counter = 0;
	var attacker = CR.str.attacker;
	if(reportElements.attackers.length > 1)
	{
		attacker = CR.str.attackers;
	}

	var textAttacker = "[size=" + CR.report_font_size + "][color=" + CR.colors.title + "]" + attacker + ":[/color]" + "\n";

	for(i = 0; i < reportElements.attackers.length; i++)
	{
		var length = reportElements.cities.attackers[i].length;
		counter += reportElements.attackers[i].length;
		if(counter > 45) { textAttacker += "\n"; counter -= 45; }
		textAttacker += "[color=" + CR.colors.attacker + "]" +  reportElements.attackers[i];

		if(CR.options[lang].cities == true)
		{
			counter += CR.str.from.length;
			if(counter > 45)
			{
				textAttacker += "\n"; counter -= 45;
			}
			textAttacker += CR.str.from;
			for(j = 0; j < length; j++)
			{
				counter += reportElements.cities.attackers[i][j].length;
				if(counter > 45)
				{
					textAttacker += "\n"; counter -= 45;
				}
				textAttacker += reportElements.cities.attackers[i][j];
				if(j != length-1)
				{
					textAttacker += ", "; counter += 2;
				}
			}
		}
		if (i < reportElements.attackers.length-1)
		{
			textAttacker += "; "; counter += 2;
		}
		textAttacker += "[/color]";
	}
	textAttacker += "\n[color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";

	/* defender */
	counter = 0;
	var defender = CR.str.defender;
	if (reportElements.defenders.length > 1)
	{
		defender = CR.str.defenders;
	}
	var textDefender = "[size=" + CR.report_font_size + "][color=" + CR.colors.title + "]" + defender + ":[/color]" + "\n";

	for(i = 0; i < reportElements.defenders.length; i++)
	{
		var length = reportElements.cities.defenders[i].length;
		counter += reportElements.defenders[i].length;
		if(counter > 45)
		{
			textDefender += "\n"; counter -= 45;
		}
		textDefender += "[color=" + CR.colors.defender + "]" +  reportElements.defenders[i];
		if(CR.options[lang].cities == true)
		{
			counter += CR.str.from.length;
			if(counter > 45)
			{
				textDefender += "\n"; counter -= 45;
			}
			textDefender += CR.str.from;
			for(j = 0; j < length; j++)
			{
				counter += reportElements.cities.defenders[i][j].length;
				if(counter > 45)
				{
					textDefender += "\n"; counter -= 45;
				}
				textDefender += reportElements.cities.defenders[i][j];
				if(j != length-1)
				{
					textDefender += ", "; counter += 2;
				}
			}
		}
		if (i < reportElements.defenders.length-1)
		{
			textDefender += "; "; counter += 2;
		}
		textDefender += "[/color]";
	}
	textDefender += "\n[color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";


	/* attacker.........defender */
	var dots = "";
	while (CR.report_width - attacker.length - dots.length > defender.length) { dots += CR.dot; }

	var textUnits = "[size=" + CR.report_font_size + "][color=" + CR.colors.attacker + "]" + attacker + "[/color]" +
				"[color=" + CR.colors.dots + "]" + dots +"[/color]" +
				"[color=" + CR.colors.defender + "]" + defender + "[/color]" + "\n";

	/* units */
	var units = new Array();
	var textUnitsTmp = new Array();
	units[0] = new Array(); units[1] = new Array();
	textUnitsTmp[0] = new Array(); textUnitsTmp[1] = new Array();
	var unitsTmp = "";
	for (i = 0; i < reportElements.units.codes.length; i++)
	{
		units[0][i] = reportElements.units.attackers[i].left + " [-" + reportElements.units.attackers[i].lost + "]";
		textUnitsTmp[0][i] = "[color=" + CR.colors.attackerUnits + "]" + reportElements.units.attackers[i].left + "[/color][color=" + CR.colors.deadUnits + "] [-"  + reportElements.units.attackers[i].lost + "][/color]";

		if(units[0][i] == "0 [-0]")
		{
			units[0][i] = ""; textUnitsTmp[0][i] = "";
		}
		units[1][i] = reportElements.units.defenders[i].left + " [-" + reportElements.units.defenders[i].lost + "]";
		textUnitsTmp[1][i] = "[color=" + CR.colors.defenderUnits + "]" + reportElements.units.defenders[i].left + "[/color][color=" + CR.colors.deadUnits + "] [-"  + reportElements.units.defenders[i].lost + "][/color]";

		if(units[1][i] == "0 [-0]")
		{
			units[1][i] = ""; textUnitsTmp[1][i] = "";
		}
	}

	for (i = 0; i < reportElements.units.codes.length; i++)
	{
		unitsTmp = CR.str.units[CR.units.codeToName(parseInt(reportElements.units.codes[i]))];
		var l = unitsTmp.length;
		dots = "";
		while (25 - l/2 - units[0][i].length - dots.length > 0) { dots += CR.dot; }

		unitsTmp = units[0][i] + dots + unitsTmp;
		textUnits += textUnitsTmp[0][i] + "[color=" + CR.colors.dots + "]" + dots +"[/color][color=" + CR.colors.text + "]" + CR.str.units[CR.units.codeToName(parseInt(reportElements.units.codes[i]))] + "[/color]";

		dots = "";
		while (unitsTmp.length + units[1][i].length + dots.length < CR.report_width) { dots += CR.dot; }
		unitsTmp += dots + units[1][i];
		textUnits += "[color=" + CR.colors.dots + "]" + dots +"[/color]" + textUnitsTmp[1][i] + "\n";
	}
	textUnits += "[color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";

	/* units damage */
	var dots = "";
	while(CR.report_width - attacker.length - dots.length > defender.length) { dots += CR.dot; }
	var textUnitsDamage = "[size=" + CR.report_font_size + "][color=" + CR.colors.attacker + "]" + attacker + "[/color]" +
				"[color=" + CR.colors.dots + "]" + dots +"[/color]" +
				"[color=" + CR.colors.defender + "]" + defender + "[/color]" + "\n";

	var units = new Array();
	var textUnitsTmp = new Array();

	units[0] = new Array();
	units[1] = new Array();
	
	textUnitsTmp[0] = new Array();
	textUnitsTmp[1] = new Array();

	var unitsTmp = "";
	var unitsName = "";

	for (i = 0; i < reportElements.units.codes.length; i++)
	{
		unitName = CR.units.codeToName(parseInt(reportElements.units.codes[i]));

		units[0][i] = CR.generals(reportElements.units.attackers[i].left, CR.unitsCost[unitName].generals)
			+ " (-" + CR.generals(reportElements.units.attackers[i].lost, CR.unitsCost[unitName].generals) + ")";
		textUnitsTmp[0][i] = "[color=" + CR.colors.attackerUnits + "]"
			+ CR.generals(reportElements.units.attackers[i].left, CR.unitsCost[unitName].generals)
			+ "[/color][color=" + CR.colors.deadUnits + "] (-"
			+ CR.generals(reportElements.units.attackers[i].lost, CR.unitsCost[unitName].generals) + ")[/color]";

		if(units[0][i] == "0 [-0]"){ units[0][i] = ""; textUnitsTmp[0][i] = "";}

		units[1][i] = CR.generals(reportElements.units.defenders[i].left, CR.unitsCost[unitName].generals)
			+ " (-" + CR.generals(reportElements.units.defenders[i].lost, CR.unitsCost[unitName].generals) + ")";
		textUnitsTmp[1][i] = "[color=" + CR.colors.defenderUnits + "]"
			+ CR.generals(reportElements.units.defenders[i].left, CR.unitsCost[unitName].generals)
			+ "[/color][color=" + CR.colors.deadUnits + "] (-" 
			+ CR.generals(reportElements.units.defenders[i].lost, CR.unitsCost[unitName].generals) + ")[/color]";

		if (units[1][i] == "0 [-0]") { units[1][i] = ""; textUnitsTmp[1][i] = "";}
	}

	for (i = 0; i < reportElements.units.codes.length; i++)
	{
		unitName = CR.units.codeToName(parseInt(reportElements.units.codes[i]));

		unitsTmp = CR.str.units[unitName];
		var l = unitsTmp.length;
		dots = "";
		while (20 - l/2 - units[0][i].length - dots.length > 0) { dots += CR.dot; }

		unitsTmp = unitsTmp + dots + units[0][i];

		textUnitsDamage += ''
			+ ' [img]' + CR.unitsCost[unitName].img + '[/img] '
			+ textUnitsTmp[0][i]
			+ "[color=" + CR.colors.dots + "]" + dots + '[/color]'
			+ "[color=" + CR.colors.text + "]" + CR.str.units[unitName] + "[/color]"
			;
		dots = "";
		while (unitsTmp.length + units[1][i].length + 6 + dots.length < CR.report_width) { dots += CR.dot; }

		unitsTmp += dots + units[1][i];
		textUnitsDamage += "[color=" + CR.colors.dots + "]" + dots +"[/color]" + textUnitsTmp[1][i];
		textUnitsDamage += "\n"; 
		
	}

	textUnitsDamage += "[color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";

	/* winners */
	var textWinner = "";
	var textLoser = "";
	if (reportElements.winners[0] != null)
	{
		var winColor = CR.colors.defender;
		if (findInArray(reportElements.attackers, reportElements.winners[0]) != -1 )
		{
			winColor = CR.colors.attacker;
		}
		//winColor = CR.colors.winners;

		counter = 0;
		textWinner = "[size=" + CR.report_font_size + "][color=" + CR.colors.titleWinners + "]";
		if( reportElements.winners.length > 1 ) { textWinner += CR.str.winners; }
		else 									{ textWinner += CR.str.winner; }
		textWinner += "[/color][color=" + winColor + "]\n";
		for(i = 0; i < reportElements.winners.length; i++)
		{
			counter += reportElements.winners[i].length;
			if( counter > 45 )
			{
				textWinner += "\n"; counter -= 45;
			}
			textWinner += reportElements.winners[i].trim();

			if (i < reportElements.winners.length-1)
			{
				textWinner += ", "; counter += 2;
			}
		}
		
		textWinner += "\n[/color][/size]\n";
	}

	/* losers */
	if (reportElements.losers[0] != null)
	{
		var loseColor = CR.colors.defender; 
		if( findInArray(reportElements.attackers, reportElements.losers[0]) != -1 )
		{
			loseColor = CR.colors.attacker;
		}
//		loseColor = CR.colors.losers;

		counter = 0;
		textLoser = "[size=" + CR.report_font_size + "][color=" + CR.colors.titleLosers + "]";
		if( reportElements.losers.length > 1 ) { textLoser +=  CR.str.losers; }
		else { textLoser += CR.str.loser; }

		textLoser += "[/color][color=" + loseColor + "]\n";
		for(i = 0; i < reportElements.losers.length; i++)
		{
			counter += reportElements.losers[i].length;
			if( counter > 45 )
			{
				textLoser += "\n"; counter -= 45;
			}
			textLoser += reportElements.losers[i].trim();

			if(i < reportElements.losers.length-1) 
			{
				textLoser += ", "; counter += 2;
			}
		}
		textLoser += "[/color]\n[color=" + CR.colors.text + "]" + line + "[/color][/size]\n";
   }

	/* loot */
	var textLoot = ""
	if( CR.options[lang].loot == true && isThereLoot == true )
	{
		textLoot = "[size=" + CR.report_font_size + "][color=" + CR.colors.title + "]" + CR.str.loot + "[/color]\n";
		var lootTmp = "";
		var lootImg = "";
		var lootNumTmp = 0;

		for(i = 0; i < reportElements.attackers.length; i++)
		{
			for( j = 0; j < 5; j++)
			{
				if( reportElements.loot[i] != null ) { break; }
			}
			if( j != 5 )
			{
				textLoot += "[color=" + CR.colors.attacker + "]" + reportElements.attackers[i] + "[/color]\n";
				for (j = 0; j < 5; j++)
				{
					if (reportElements.loot[i][j] != null)
					{
						if( j == 0 ) 	  { lootTmp = CR.str.wood; 		lootImg = Ika.res.wood; }
						else if( j == 1 ) { lootTmp = CR.str.wine; 		lootImg = Ika.res.wine; }
						else if( j == 2 ) { lootTmp = CR.str.marble; 	lootImg = Ika.res.marble; }
						else if( j == 3 ) { lootTmp = CR.str.glass; 	lootImg = Ika.res.glass; }
						else if( j == 4 ) { lootTmp = CR.str.sulphur; 	lootImg = Ika.res.sulfur; }

						lootNumTmp = reportElements.loot[i][j];
						dots = "";
						while ( CR.report_width - lootTmp.length - dots.length > lootNumTmp.length ) { dots += CR.dot; }

						textLoot += "[color=" + CR.colors.text + "]"
							+ '[img]' + lootImg + '[/img] '
							+ lootTmp
							+ "[/color][color=" + CR.colors.dots + "]"
							+ dots
							+ "[/color][color=" + CR.colors.otherNumbers + "]" + lootNumTmp + "[/color]\n";
					}
				}
			}
		}

		textLoot += "[color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";
	}


	/* calculate damage */
	var attacker = {remaining : 0, cooks : 0, damage : 0, population : 0, wood : 0, sulphur : 0, glass : 0, gold : 0, time: 0 };
	var defender = {remaining : 0, cooks : 0, damage : 0, population : 0, wood : 0, sulphur : 0, glass : 0, gold : 0, time: 0 };

	var unitName = "";
	var unitName2 = 0;

	for (i = 0; i < 22; i++)
	{
		if(reportElements.units.codes[i] != null)
		{
			unitName = CR.units.codeToName(parseInt(reportElements.units.codes[i]));

			unitName2 = (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * reportElements.units.attackers[i].lost;
			attacker.damage += unitName2;

			unitName2 = (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * reportElements.units.defenders[i].lost;
			defender.damage += unitName2;

			/* remaining units */
			if (unitName != 'cook' && unitName != 'medic')
			{
				unitName2 = CR.unitsCost[unitName].generals * reportElements.units.attackers[i].left;
				attacker.remaining += unitName2;
				unitName2 = CR.unitsCost[unitName].generals * reportElements.units.defenders[i].left;
				defender.remaining += unitName2;
			}
			else
			{
				unitName2 = CR.unitsCost[unitName].generals * reportElements.units.attackers[i].left;
				attacker.cooks += unitName2;
				unitName2 = CR.unitsCost[unitName].generals * reportElements.units.defenders[i].left;
				defender.cooks += unitName2;
			}

			unitName2 = CR.unitsCost[unitName].population * reportElements.units.attackers[i].lost;
			attacker.population += unitName2;
			
			unitName2 = CR.unitsCost[unitName].wood * reportElements.units.attackers[i].lost;
			attacker.wood += unitName2;
			
			unitName2 = CR.unitsCost[unitName].sulphur * reportElements.units.attackers[i].lost;
			attacker.sulphur += unitName2;
			
			unitName2 = CR.unitsCost[unitName].glass * reportElements.units.attackers[i].lost;
			attacker.glass += unitName2;
			
			unitName2 = CR.unitsCost[unitName].gold * reportElements.units.attackers[i].lost;
			attacker.gold += unitName2;

			unitName2 = CR.unitsCost[unitName].time * reportElements.units.attackers[i].lost;
			attacker.time += unitName2;

			
			unitName2 = CR.unitsCost[unitName].population * reportElements.units.defenders[i].lost;
			defender.population += unitName2;
			
			unitName2 = CR.unitsCost[unitName].wood * reportElements.units.defenders[i].lost;
			defender.wood += unitName2;
			
			unitName2 = CR.unitsCost[unitName].sulphur * reportElements.units.defenders[i].lost;
			defender.sulphur += unitName2;
			
			unitName2 = CR.unitsCost[unitName].glass * reportElements.units.defenders[i].lost;
			defender.glass += unitName2;
			
			unitName2 = CR.unitsCost[unitName].gold * reportElements.units.defenders[i].lost;
			defender.gold += unitName2;

			unitName2 = CR.unitsCost[unitName].time * reportElements.units.defenders[i].lost;
			defender.time += unitName2;

		}
	}
	if (CR.options[lang].damage == "GeneralsA" )
	{
		attacker.damage /= 50;
		defender.damage /= 50;
	}
	else if (CR.options[lang].damage == "GeneralsAL")
	{
		attacker.damage = (attacker.damage - reportElements.lootTotal) / 50;
		defender.damage = (defender.damage + reportElements.lootTotal) / 50;
	}
	else if (CR.options[lang].damage == "ResourcesAL")
	{
		attacker.damage -= reportElements.lootTotal;
		defender.damage += reportElements.lootTotal;
	}
	attacker.damage = parseInt(attacker.damage);
	defender.damage = parseInt(defender.damage);

	var totalAttacker = Math.round(attacker.remaining + attacker.cooks + attacker.damage);
	var totalDefender = Math.round(defender.remaining + defender.cooks + defender.damage);

	var damageTotal = attacker.damage + defender.damage;

	attacker.remaining = Math.round(attacker.remaining);
	defender.remaining = Math.round(defender.remaining);

	attacker.damage += '';
	defender.damage += '';
	damageTotal 	+= '';

	/* damage */
	var textDamage = "[size=" + CR.report_font_size + "][color=" + CR.colors.title + "]" + CR.str.damageR + "[/color][/size]\n";
	var tmp = "";
	if(reportElements.attackers.length > 1) { tmp = CR.str.attackers; }
	else { tmp = CR.str.attacker; }
	dots = "";

	var outStr = attacker.damage;
	while(CR.report_width - tmp.length - dots.length > outStr.length) { dots += CR.dot; }
	textDamage += "[color=" + CR.colors.text + "]" + tmp + "[/color][color=" + CR.colors.dots + "]" + dots + "[/color][color=" + CR.colors.otherNumbers + "]" + outStr + "[/color]\n";

	if (reportElements.defenders.length > 1) { tmp = CR.str.defenders; }
	else { tmp = CR.str.defender; }
	dots = "";

	var outStr = defender.damage;
	while(CR.report_width - tmp.length - dots.length > outStr.length) { dots += CR.dot; }
	textDamage += "[color=" + CR.colors.text + "]" + tmp + "[/color][color=" + CR.colors.dots + "]" + dots + "[/color][color=" + CR.colors.otherNumbers + "]" + outStr + "[/color]\n";
	textDamage += "[color=" + CR.colors.title + "]" + CR.str.damageT + "[/color]\n" + "[color=" + CR.colors.otherNumbers + "]" + damageTotal + "[/color]\n";
	textDamage += "[color=" + CR.colors.text + "]" + line + "[/color]" + "\n";

/** custom statistics */
	CR.report_stats += "\n[size=" + CR.report_font_size_title + "][color=" + CR.colors.title + "]" + CR.str.stats + "[/color][/size]\n" +
		"[color=" + CR.colors.text + "]";

	tmp =  CR.leftAlignString(CR.str.resources,23) + "[color=" + CR.colors.attacker + "]" + CR.rightAlignString(CR.str.attackers,13) + '[/color] [color=' + CR.colors.defenderUnits + ']' + CR.rightAlignString(CR.str.defenders,13) + '[/color]';
	CR.report_stats += CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = CR.leftAlignString(CR.str.totalArmy,23) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(totalAttacker),13) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(totalDefender),13) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.general) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = CR.leftAlignString(CR.str.units.cook + '/' + CR.str.units.medic,23) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.cooks),13) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.cooks),13) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.general) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = CR.leftAlignString(CR.str.remaining,23) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.remaining),13) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.remaining),13) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.general) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = CR.leftAlignString(CR.str.damage,23) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString('-' + Ika.formatNumber(attacker.damage),13) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString('-' + Ika.formatNumber(defender.damage),13) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.general) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	CR.report_stats += "\n\n[size=" + CR.report_font_size_title + "][color=" + CR.colors.title + "]" + CR.str.damage + "[/color][/size]\n";

	tmp = '[img]' + Ika.res.population + '[/img] '
		+ CR.leftAlignString(CR.str.population,21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.population),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.population),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.population) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = '[img]' + Ika.res.gold + '[/img] '
		+ CR.leftAlignString(CR.str.gold,21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.gold),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.gold),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.gold) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = '[img]' + Ika.res.time + '[/img] '
		+ CR.leftAlignString('Time (minutes)',21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.time),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.time),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.time) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = '[img]' + Ika.res.wood + '[/img] '
		+ CR.leftAlignString(CR.str.wood,21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.wood),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.wood),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.wood) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = '[img]' + Ika.res.sulfur + '[/img] '
		+ CR.leftAlignString(CR.str.sulphur,21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.sulphur),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.sulphur),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.sulfur) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	tmp = '[img]' + Ika.res.glass + '[/img] '
		+ CR.leftAlignString(CR.str.glass,21) + "[color=" + CR.colors.attackerUnits + "]" + CR.rightAlignString(Ika.formatNumber(attacker.glass),12) + '[/color] ' +
		"[color=" + CR.colors.defenderUnits + "]" + CR.rightAlignString(Ika.formatNumber(defender.glass),12) + '[/color]';
	CR.report_stats += Ika.res.icon(Ika.res.glass) + CR.rightAlignString(tmp,CR.report_width) + "\n";

	CR.report_stats += "[/color][color=" + CR.colors.text + "]" + line + "[/color][/size]" + "\n";

	var bbCodeText = "";
	var plainTextText = "";
	var htmlCodeText = "";

	var finishedBattle = "";
	if( reportElements.winners[0] == null && reportElements.losers[0] == null ) { finishedBattle = "\n" + CR.str.finishedBattle + "\n"; }

	bbCodeText =
		CR.report_header +
		textBattleFor +
		textAttacker +
		textDefender +
		textUnits +
		textLoot +
		textWinner +
		textLoser +
		textDamage +
		finishedBattle +
		CR.report_footer;

	plainTextText = bbCodeText;

	var k = 0;
	do {
		i = plainTextText.indexOf("]", k);
		if(i != -1)
		{
			j = plainTextText.indexOf("[", k);
			if((plainTextText[j+1] < '0' || plainTextText[j+1] > '9') && plainTextText[j+1] != '-')
			{
				plainTextText = plainTextText.substring(0, j) + plainTextText.substring(i+1);
			}
			else
			{
				k = i + 1;
			}
		}
	} while(i != -1);

	bbCodeTextDamage =
		CR.report_header +
		"[size=" + CR.report_font_size_title + "][color=" + CR.colors.title + "]" + CR.str.generals + "[/color][/size]\n" +
		textBattleFor +
		textAttacker +
		textDefender +
		textUnitsDamage +
		textLoot +
		textWinner +
		textLoser +
		textDamage +
		"[align=" + CR.options[lang].align + "][font='" + CR.report_font + "']" + CR.report_stats + "\n[/font][/align]" +
		finishedBattle +
		CR.report_footer_generals;

	CR.reports.preview		= bbcode2html(bbCodeText);
	CR.reports.preview_damage= bbcode2html(bbCodeTextDamage);
	CR.reports.bbcode 		= bbCodeText;
	CR.reports.plaintext	= plainTextText;
	CR.reports.htmlcode		= bbcode2html(bbCodeText);

	textArea.val(bbCodeText);
	CR.preview();
	CR.previewDamage();
}


findInArray = function(array, item){
	if( item != null)
		for( var i = 0; i < array.length; i++){
			if( item.indexOf(array[i]) != -1 ) return i;
		}
	return -1;
}

bbcode2html = function(text)
{
	var i;
	var j;

	text = text.replace(CR.dot, CR.dot_preview);
	text = text.replace(/\[img\](.*)\[\/img\]/ig, "<img src='$1' align='absmiddle' alt='' style='max-width:40px; max-height:40px;'>");
	text = text.replace(/\[url\](.*)\[\/url\]/ig, "<a href='$1' target='_blank'>$1</a>");

	while (text.indexOf("[font") != -1)
	{
		i = text.indexOf("[font='" + CR.report_font + "']");
		if(i != -1) { text = text.replace("[font='" + CR.report_font + "']", "<span style='font-family: " + CR.preview_font + "'>"); }
		else 		{ text = text.replace(/\[font=[^\]]+\][^\[]+\[\/font\]/,""); }
	}
	text = text.replace(/\[\/font\]/g,"</span>");

	while (text.indexOf("[size=") != -1)
	{
		i = text.indexOf("[size=" + CR.report_font_size + "]");
		j = text.indexOf("[size=" + CR.report_font_size_title + "]");
		if (i != -1)		{ text = text.replace("[size=" + CR.report_font_size + "]", "<span style='font-size: " + (CR.report_font_size/10) + "em'>"); }
		else if (j != -1)	{ text = text.replace("[size=" + CR.report_font_size_title + "]","<span style='font-size: " + (CR.report_font_size_title/10) + "em'>"); } 
		else 				{ text = text.replace(/\[size=[^\]]+\][^\[]+\[\/size\]/, ""); }
	}
	text = text.replace(/\[\/size\]/g,"</span>");

	while (text.indexOf("[color=") != -1)
	{
		i = text.search(/\[color=#([0-9A-Fa-f]{6})\]/ig);
		if (i != -1)
		{
			var tmp = text.substring(i,i+15);
			tmp = tmp.replace("[color=", "<span style='color:").replace("]","'>");
			text = text.replace(/\[color=#([0-9A-Fa-f]{6})\]/, tmp);
		}
		else
		{
			text = text.replace(/\[color=[^\]]+\][^\[]+\[\/color\]/, "<span>");
		}
	}

	text = text.replace(/\[\/color\]/ig,"</span>");
	text = text.replace(/\[align=(left|right|center)\]/ig,"<div style='text-align: $1'>");
	text = text.replace(/\[align=[^\]]+\][^\[]+\[\/align\]/ig,"");

	var br = "<br>";
	if ($("body").attr("id") == "militaryAdvisorReportView" ) { br = ""; }

	text = text.replace("" + Ika.title + br + "\n" +
		CR.str.version + ' ' + Ika.version + '[/url]', "<a href='http://userscripts.org/scripts/show/" + Ika.id + "'>" + Ika.title + "\n" +
		CR.str.version + ' ' + Ika.version + '</a>');
	text = text.replace(/\[url=[^\]]+\][^\[]+\[\/url\]/g,"");

	text = text.replace (/\n/gi, "<br>");
	text = text.replace (/\[(b|i)\]/gi, "<$1>");
	text = text.replace (/\[\/(b|i)\]/gi, "</$1>");
	text = text.replace(/\[[^0-9-][^\]]+\]/g, "");

	return text;
}

detailedReportDamage = function()
{
	var damageAtt = 0.0;
	var damageDef = 0.0;
	var fieldAttacker = 0;
	var fieldDefender = 0;
	var reserveAttacker = 0;
	var reserveDefender = 0;
	var cooksAttacker = 0;
	var cooksDefender = 0;

	var ulClassArray = new Array("special", "airfighter", "air", "flankLeft", "flankRight", "main", "longRange", "artillery");

	damageDetail = eval(GM_getValue("damageDetail", null));

	var rnd = $(".roundNo").html();
	i = 0;
	while(isNaN(rnd[i])) i++;
	j = i;
	while(!isNaN(rnd[j])) j++;
	rnd = parseInt(rnd.substring(i, j+1));
	damageDetail['attacker'][rnd-1] = 0;
	damageDetail['defender'][rnd-1] = 0;

	for(i = 0; i < 8; i++)
	{
		var tmp = $("div#fieldAttacker > ul." + ulClassArray[i] + " > li");
		for(j = 0; j < tmp.length; j++)
		{
			if(tmp[j].innerHTML.indexOf("<div") != -1)
			{
				if(tmp[j].childNodes[0].className != "empty")
				{
					var tmp2 = tmp[j].childNodes[1].innerHTML;
					var lost = parseInt(tmp2.substring(tmp2.indexOf("-")+1, tmp2.indexOf(")")));
					var left = parseInt(tmp2.substring(0, tmp2.indexOf(" ")));
					var unit = CR.units.codeToName(parseInt(tmp[j].childNodes[0].className.substring(1)));
					damageDetail.attacker[rnd-1] += (CR.unitsCost[unit].wood + CR.unitsCost[unit].luxuryGoods) * lost;
					fieldAttacker += (CR.unitsCost[unit].wood + CR.unitsCost[unit].luxuryGoods) * left;
				}
			}
		}
	}

	for(i = 0; i < 8; i++)
	{
		var tmp = $("div#fieldDefender > ul." + ulClassArray[i] + " > li");
		for(j = 0; j < tmp.length; j++)
		{
			if(tmp[j].innerHTML.indexOf("<div") != -1)
			{
				if(tmp[j].childNodes[0].className != "empty")
				{
					var tmp2 = tmp[j].childNodes[1].innerHTML;
					var lost = parseInt(tmp2.substring(tmp2.indexOf("-")+1, tmp2.indexOf(")")));
					var left = parseInt(tmp2.substring(0, tmp2.indexOf(" ")));
					var unit = CR.units.codeToName(parseInt(tmp[j].childNodes[0].className.substring(1)));
					damageDetail.defender[rnd-1] += (CR.unitsCost[unit].wood + CR.unitsCost[unit].luxuryGoods) * lost;
					fieldDefender += (CR.unitsCost[unit].wood + CR.unitsCost[unit].luxuryGoods) * left;
				}
			}
		}
	}

	$("#resAttacker .units UL LI").each ( function (i, item) {
		var unitCode = parseInt($('div', item).attr('class').replace('s',''));
		var unitName = CR.units.codeToName(unitCode);
		var unitLeft = parseInt($(item).text());

		if (unitName == 'cook' || unitName == 'medic' || unitName == 'tender')
		{
			cooksAttacker += (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * unitLeft;
		}
		else
		{
			reserveAttacker += (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * unitLeft;
		}
	});
	$("#resDefender .units UL LI").each ( function (i, item) {
		var unitCode = parseInt($('div', item).attr('class').replace('s',''));
		var unitName = CR.units.codeToName(unitCode);
		var unitLeft = parseInt($(item).text());

		if (unitName == 'cook' || unitName == 'medic' || unitName == 'tender')
		{
			cooksDefender += (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * unitLeft;
		}
		else
		{
			reserveDefender += (CR.unitsCost[unitName].wood + CR.unitsCost[unitName].luxuryGoods) * unitLeft;
		}
	});

	if(CR.options[lang].damage == "GeneralsA" )
	{
		fieldAttacker = Math.round (fieldAttacker / 50);
		fieldDefender = Math.round (fieldDefender / 50);
		reserveAttacker = Math.round (reserveAttacker / 50);
		reserveDefender = Math.round (reserveDefender / 50);
		cooksAttacker = Math.round (cooksAttacker / 50);
		cooksDefender = Math.round (cooksDefender / 50);
	}

	CR.options[lang] = eval(GM_getValue("options_"+lang, null));

	if(CR.options[lang].damage == "GeneralsA" )
	{
		damageDetail.attacker[rnd-1] = damageDetail.attacker[rnd-1] / 50;
		damageDetail.defender[rnd-1] = damageDetail.defender[rnd-1] / 50;
	}

	var totalAtt = 0;
	var totalDef = 0;

	for(i = 0; i < rnd; i++)
	{
		if (!isNaN(damageDetail.attacker[i])) totalAtt += damageDetail.attacker[i];
		if (!isNaN(damageDetail.attacker[i])) totalDef += damageDetail.defender[i];
	}

	GM_setValue("damageDetail", damageDetail.toSource());

	var s = '';

	s += '<table class="table01"><tbody><tr><th>' + CR.str.generals + '</th><th>' + CR.str.attackers + '</th><th>' + CR.str.auxiliary + '</th><th>' + CR.str.defence + '</th><th>' + CR.str.auxiliary + '</th></tr>' +
		'<tr><td>' +
		CR.str.damage + ' (' + CR.str.round + ')</td><td>-' +
		Ika.formatNumber(parseInt(damageDetail.attacker[rnd-1])) + '</td><td></td><td>-' + Ika.formatNumber(parseInt(damageDetail.defender[rnd-1])) +
		'</td><td></td></tr>' +
		'<tr><td>' + CR.str.battleLand + '</td>' +
		'<td>+' + Ika.formatNumber(fieldAttacker) + '</td><td></td>' +
		'<td>+' + Ika.formatNumber(fieldDefender) + '</td><td></td></tr>' +
		'<tr><td>' + CR.str.reserve + '</td>' +
		'<td>+' + Ika.formatNumber(reserveAttacker) + '</td><td>' + Ika.formatNumber(cooksAttacker) + '</td>' +
		'<td>+' + Ika.formatNumber(reserveDefender) + '</td><td>' + Ika.formatNumber(cooksDefender) + '</td></tr>' +
		'<tr><td>' + CR.str.remaining + '</td>' +
		'<td><b>' + Ika.formatNumber(fieldAttacker + reserveAttacker) + '</b></td><td></td>' +
		'<td><b>' + Ika.formatNumber(fieldDefender + reserveDefender) + '</b></td><td></td></tr>' +
		'</tbody></table>';

	$('span#rndAtt').html(parseInt(damageDetail.attacker[rnd-1]));
	$('span#ttlAtt').html(parseInt(totalAtt));
	$('span#rndDef').html(parseInt(damageDetail.defender[rnd-1]));
	$('span#ttlDef').html(parseInt(totalDef));
	$(s).prependTo ('#morale');
}



if($("body").attr("id") == "militaryAdvisorReportView" ){
	createTextArea();
}
else if( $("body").attr("id") == "diplomacyAdvisor" || $("body").attr("id") == "diplomacyAdvisorOutBox"){
	$("td.msgText div").each(function() {
		$(this).html(bbcode2html($(this).html()));
	});
}
else if($("body").attr("id") == "militaryAdvisorDetailedReportView")
{
	var att = $('ul.special')[0];
	var top = 85;
	if(att == null) { att = $('ul.air')[0]; top = 150; }
	var divAtt = document.createElement("div");
	divAtt.innerHTML = CR.str.damage + ": <span style='position: absolute; top: 18px; left: 3px; width: 95%'>" + CR.str.round +
					": <span id='rndAtt'> </span></span> <span style='position:absolute; left: 3px; top: 33px; width: 95%;'>" + CR.str.total + ": <span id='ttlAtt'></span></span>";
	divAtt.style.cssText = "position: absolute; top: "+top+"px; left: 170px; width: 154px; height: 45px; background: #FFF3DB; opacity: 0.7; padding: 3px;";
	att.parentNode.insertBefore(divAtt,att);

	var def = $('ul.special')[0];
	top = 340;
	if(def == null){ def = $('ul.air')[0]; top = 350; }
	var divDef = document.createElement("div");
	divDef.innerHTML = CR.str.damage + ": <span style='position: absolute; top: 18px; left: 3px; width: 95%'>" + CR.str.round +
					": <span id='rndDef'> </span></span> <span style='position:absolute; left: 3px; top: 33px; width: 95%;'>" + CR.str.total + ": <span id='ttlDef'></span></span>";
	divDef.style.cssText = "position: absolute; top: "+top+"px; left: 170px; width: 154px; height: 45px; background: #FFF3DB; opacity: 0.7; padding: 3px;";
	def.parentNode.insertBefore(divDef,def);

	detailedReportDamage();
}
else if($("body").attr("id") != "militaryAdvisorDetailedReportView")
{
	if(GM_getValue("damageDetail", null) != null)
	{
		GM_setValue("damageDetail", damageDetail.toSource());
	}
}
