// ==UserScript==
// @name					Sangu Package 2.0.1
// @author				Grote Smurf / De Goede Fee
// @namespace			
// @description			
// @include		 	http://nl*.tribalwars.nl/game.php?*
// @include			http://nl*.tribalwars.nl/game.php?*screen=overview*
// @include			http://nl*.tribalwars.nl/game.php?*screen=overview_villages*
// @include			http://nl*.tribalwars.nl/game.php?*screen=report&mode=publish*
// @include 		http://nl*.tribalwars.nl/game.php*screen=place*
// @include			http://nl*.tribalwars.nl/game.php?*screen=snob*
// @include			http://nl*.tribalwars.nl/game.php?*screen=main*
// @include			http://nl*.tribalwars.nl/game.php?*screen=commands*
// @include			http://nl*.tribalwars.nl/game.php?*screen=incomings*
// @include			http://nl*.tribalwars.nl/game.php?*screen=place&mode=sim*
// @include			http://nl*.tribalwars.nl/game.php?*screen=info_player*
// @include			http://nl*.tribalwars.nl/game.php?*screen=info_ally*
// @include			http://nl*.tribalwars.nl/game.php?*screen=info_village*
// @include			http://nl*.tribalwars.nl/game.php?*screen=info_command*
// @include			http://nl*.tribalwars.nl/game.php?*screen=settings*
// @include			http://nl*.tribalwars.nl/game.php?*screen=smith*
// @include			http://nl*.tribalwars.nl/game.php?*screen=market*
// @include			http://nl*.tribalwars.nl/game.php?*screen=map*
// ==/UserScript==

function sangu_ready($j) {
var sangu_versie = "2.0.1";
var DEBUG = false;

/*
Boodschap aan Credo:
Nothing is so common as to imitate one's enemies, and to use their weapons. � Voltaire	   

performantie:
--> de code voor elke pagina in zijn eigen closure zodat niet steeds het volledige script geladen wordt

genereer bb codes in maintagger
manier om makkelijk aanvallen x tot y te selecteren - 2de rij checkboxen (default niet actief) 1ste checkbox aanvinken, 2de checkbox aanvinken = alles ertussen aanvinken

edgile: in overizchtslijsten: "ga naar huidig dorp"
*/

// User config
var user_data = {};
// Instellingen specifiek gaan instellen per wereld
switch ($j.game_data.world)
{
	case 'nl10':
		// Hieronder de settings die enkel op w10 gelden
		user_data.worldSpecific = {
			villageName: [], // dorpsnamen instellen
			favs: [ // favoriete locaties op de kaart
						{active: false, name: "fixedPosition1", x: 462, y: 647},
						{active: false, name: "fixedPosition2", x: 492, y: 652}
						],
			aanvalCustom: // Welke invulmogelijkheden in de verzamelplaats:
					[
						{active: true, type:'def', name: 'AlleDef', spear: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
						{active: true, type:'def', name: 'HelftZc', spear: 4000, heavy: 1000, sendAlong: 500},
						{active: true, type:'off', name: 'Smart', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, ram: 5000, catapult: 5000, sendAlong: 0},
						{active: true, type:'off', name: 'Bijl', spear: 25000, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0},
						{active: true, type:'off', name: 'Zwaard', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0, required: ['sword', 1]},
						
						{active: false, type:'def', name: 'AlleDef', spear: 25000, sword: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
						{active: false, type:'def', name: '3deZc', spear: 2500, heavy: 650, sendAlong: 0},
						{active: false, type:'def', name: '4deZc', spear: 2000, heavy: 500, sendAlong: 0},
						{active: false, type:'def', name: 'HelftZw', spear: 5000, sword: 5000, sendAlong: 500},
						{active: false, type:'def', name: '3deZw', spear: 3300, sword: 3300, sendAlong: 0},
						{active: false, type:'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0}
							// negatief voor x aantal units thuis te laten
					]
			};
			break;
			
			
	case 'nl2':
		// Deze enkel op w21
		user_data.worldSpecific = {
				showPlayerProfileOnVillage: true,
				villageName: []
		};
		break;
			
			
}

// De overige settings en de settings voor alle andere werelden:
$j.extend(user_data, {
	gsStorageShow: true,
	gsStorageBackground: ['Greenyellow', 'Chartreuse', 'Limegreen', 'Mediumseagreen', 'Forestgreen', 'Orange', 'Coral', 'Tomato', 'Orangered', 'Red'],
	overviewBlinkResources: true,
	editAttackLink: true,
	colorOs: 'rgb(255, 245, 218)' /*'rgb(240, 226, 190)'*/,
	villageName: [], // Set to [] or null to disable
	villageNameClick: true,
	calculateSnob: false,
	reportPublish: ["own_units", "own_losses", "opp_units", "opp_losses", "carry"],
	calculateBoerderijLimiet: true,
	acceptableOverstack: 1.2,
	commandSommatie: true,
	
	filterMinPopulation: 18000,
	filterMinDefaultType: 'axe',
	filterMinDefault: 7000,
	filterMin: {axe: 7000, spear: 3000, heavy: 500, catapult: 500, spy: 50, light: 2000, ram: 200, snob: 2},
	filterMinOther: 5000,
	filterAutoSort: true,
	displayDays: false,
		
	incoming:
		{
			sorteerOpLooptijd: true,
			autoOpenTagger: true,
			hernoemInputTexbox: "{unit} ({xy}) {player} F{fields}", // Mogelijkheden: {id}:aanvalsid {unit}: afkorting {xy}: coordinaten {player} {dorp}: volledige dorpsnaam {c}. Zet op "" om uit te schakelen.
			villageBoxSize: 600
		},
			
	mainTagger:
		{
			active: true,
			inputBoxWidth: 400,
			standaardOmschrijving: "DONE",
			andereOmschrijvingen: 
				[
				{name: "DODGED", prefix: false}, 
				{name: "BLOCKED", prefix: false}, 
				{name: "REVIEW", prefix: false}, 
				{name: "DODGE EDELS", prefix: true}, 
				{name: "DODGE", prefix: true}, 
				{name: "CHECK STACK", prefix: true}
				],
			prefix: "-----------------------------------------",
			autoOpenCommands: true
		},
		
	resources:
		{
			requiredResDefault: 250000,
			requiredHandelaar: 50,
			filterHandelaar: true,
			filterRows: false,
			bbcodeMinimumDiff: 50000
		},
			
	jumper:
		{
			enabled: true,
			favs: [],
			left: 880,
			top: 196,
			daysActive: 100,
			width: 200,
			addDoel: true,
			addLaatste: true
		},
	
	proStyle: true,
	marketResizeImage: true,
	autoMarketFocus: true,

	snellijstGrootte: 700,
  snellijstScriptRijen: 12,
	
	aanvalAutoRename: true,
	rallyPointAttackBoxWidth: 600,
	autoAttackFocus: true,
	replaceNachtbonus: true,
	replaceStamClaim: true,
		
	scoutVillage: 100,
	aanvalScout: [5, 100, 500], 
	aanvalEdel: true,
	aanvalEdelTreinAltijdTonen: true,
	snobSupport: [{Population: 200, Unit: 'light', VillageType: 'off'}, {Population: 600, Unit: 'heavy', VillageType: 'def'}],
	attackLinkNames: {fake: 'Fake', verkenner: 'Ver', edelMax: 'EdelEerst', edelMin: 'EdelTrein'},

	aanvalCustom: // Welke invulmogelijkheden in de verzamelplaats:
			[
				{active: false, type:'def', name: 'AlleDef', spear: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
				{active: false, type:'def', name: 'HelftZc', spear: 4000, heavy: 1000, sendAlong: 500},
				{active: true, type:'off', name: 'Smart', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, ram: 5000, catapult: 5000, sendAlong: 0},
				{active: true, type:'off', name: 'Bijl', spear: 25000, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0},
				{active: true, type:'off', name: 'Zwaard', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0, required: ['sword', 1]},
				
				{active: true, type:'def', name: 'AlleDef', spear: 25000, sword: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
				{active: false, type:'def', name: '3deZc', spear: 2500, heavy: 650, sendAlong: 0},
				{active: false, type:'def', name: '4deZc', spear: 2000, heavy: 500, sendAlong: 0},
				{active: true, type:'def', name: 'HelftZw', spear: 5000, sword: 5000, archer: 5000, sendAlong: 500},
				{active: false, type:'def', name: '3deZw', spear: 3300, sword: 3300, sendAlong: 0},
				{active: false, type:'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0}
					// negatief voor x aantal units thuis te laten
			],
	alternativeLastPosition: false,
		
	restack: {
		to: 72000,
		requiredDifference: 1000
		},
	
	showPlayerProfileOnVillage: false,
	profile: {
		show: true,
		moveClaim: true,
		mapLink: {show: true, fill: '000000', zoom: '200', grid: true, playerColor: 'ffff00', tribeColor: '0000FF', centreX: 500, centreY: 500, ownColor: 'FFFFFF', markedOnly: true, yourTribeColor: "FF0000"},
		spelerGrafiek: [["points", 'big', true], ["villages", 'big'], ["od", 'big'], ["oda", false], ["odd", false], ["rank", false]], // small / big / false
		stamGrafiek: [["points", false], ["villages", 'big'], ["od", false], ["oda", false], ["odd", false], ["rank", false], ["members", 'big', true]],
		popup: {show: true, width: 900, height: 865}
		},
	smithy:
		[
		['offense', {spear: [3,3], sword: [1,1], axe: [3,3], spy: [0,0], light: [3,3], heavy: [3,3], ram: [2,2], catapult: [0,0]}],
		['defense', {spear: [3,3], sword: [1,3], axe: [0,3], spy: [0,3], light: [0,3], heavy: [3,3], ram: [1,2], catapult: [0,0]}],
		['catapult', {spear: [2,2], sword: [1,1], axe: [3,3], spy: [3,3], light: [0,0], heavy: [3,3], ram: [0,0], catapult: [3,3]}]
		],
	buildings:
		{
		main: [20, 20],
		barracks: [25, 25],
		stable: [20, 20],
		garage: [1, 5],
		church: [0, 1], //
		church_f: [0, 1], //
		snob: [1, 3],
		smith: [20, 20], 
		place: [1, 1],
		statue: [0, 1], // 				
		market: [10, 20], 
		wood: [30, 30], 
		stone: [30, 30], 
		iron: [30, 30], 
		farm: [30, 30], 
		storage: [30, 30], 
		hide: [0, 10], 
		wall: [20, 20],
		}
	});

if (user_data.worldSpecific != undefined)
{
	$j.extend(user_data, user_data.worldSpecific);
	user_data.worldSpecific = null;
}

function getCookie(name)
{
	if(document.cookie.match(/;/))
	{
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++)
		{
			var cookie = cooks[x];
			if(cookie.match(name + "="))
				return cookie.replace(name + "=", "");
		}
	}
	else 
	{
		if(document.cookie.match(name + "="))
			return document.cookie.replace(name + "=", "");
	}
	
	return '';
}

function setCookie(name, value, expireMinutes)
{
	var date_obj = new Date();
	time = date_obj.getTime();
	if (expireMinutes == undefined)
	{
		time += 1*60*1000*24*356;
	}
	else
	{
		time += expireMinutes * 1000 * 60;
	}
	date_obj.setTime(time);
	
	var expires = "expires=" + date_obj.toGMTString() + ";";

	document.cookie = name + "=" + value + ";" + expires;
}

// Activeren / deactiveren van de tool
var isSanguActive = getCookie("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1)
{
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	setCookie("sanguActive", isSanguActive);
}

$j("#storage").parent().after("<td class='icon-box'><a href="+location.href.replace("&changeStatus="+isSanguActive, "")+"&changeStatus="+(!isSanguActive)+"><img src='graphic/dots/"+(isSanguActive ? 'green' : 'red')+".png' title='Sangu package "+(!isSanguActive ? 'activeren' : 'deactiveren')+" (v"+sangu_versie+")' /></a>&nbsp;</td>");
if (isSanguActive) {
// Config
var world_data = {};
world_data.resources = ['holz', 'lehm', 'eisen'];
world_data.buildingsSize = 
	[
	["main", [5, 6, 7, 8, 9, 11, 13, 15, 18, 21, 24, 28, 33, 38, 45, 53, 62, 72, 84, 99, 116, 135, 158, 185, 216, 253, 296, 347, 406, 475]],
	["barracks", [7, 8, 10, 11, 13, 15, 18, 21, 25, 29, 34, 39, 46, 54, 63, 74, 86, 101, 118, 138, 162, 189, 221, 259, 303]],
	["stable", [8, 9, 11, 13, 15, 18, 21, 24, 28, 33, 38, 45, 53, 62, 72, 84, 99, 115, 135, 158]],
	["garage", [8, 9, 11, 13, 15, 18, 21, 24, 28, 33, 38, 45, 53, 62, 72]],
	["snob", [80, 94, 110]],
	["smith", [20, 23, 27, 32, 37, 44, 51, 60, 70, 82, 96, 112, 132, 154, 180, 211, 247, 289, 338, 395]], 
	["place", [0]],						
	["market", [20, 23, 27, 32, 37, 44, 51, 60, 70, 82, 96, 112, 132, 154, 180, 211, 247, 289, 338, 395, 462, 541, 633, 740, 866]], 
	["wood", [5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 21, 24, 28, 33, 38, 43, 50, 58, 67, 77, 89, 103, 119, 138, 159, 183, 212, 245, 283, 326]], 
	["stone", [10, 11, 13, 15, 17, 19, 22, 25, 29, 33, 37, 42, 48, 55, 63, 71, 81, 93, 106, 121, 137, 157, 179, 204, 232, 265, 302, 344, 392, 447]], 
	["iron", [10, 12, 14, 16, 19, 22, 26, 30, 35, 41, 48, 56, 66, 77, 90, 105, 123, 144, 169, 197, 231, 270, 316, 370, 433, 507, 593, 696, 811, 949]], 
	["farm", [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], 
	["storage", [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], 
	["hide", [2, 2, 3, 3, 4, 4, 5, 6, 7, 8]], 
	["wall", [5, 6, 7, 8, 9, 11, 13, 15, 18, 21, 24, 28, 33, 38, 45, 53, 62, 72, 84, 99]]
	];
	
world_data.buildingsPoints = 
	[
	["main", [10, 12, 14, 17, 21, 25, 30, 36, 43, 52, 62, 74, 89, 107, 128, 145, 185, 222, 266, 319, 383, 460, 552, 662, 795, 954, 1145, 1648, 1978]],
	["barracks", [16, 19, 23, 28, 33, 40, 48, 57, 69, 83, 99, 119, 143, 171, 205, 247, 296, 355, 426, 511, 613, 736, 883, 1060, 1272]],
	["stable", [20, 24, 29, 35, 41, 50, 60, 72, 86, 103, 124, 149, 178, 214, 257, 308, 370, 444, 532, 639]],
	["garage", [24, 29, 35, 41, 50, 60, 72, 86, 103, 124, 149, 178, 214, 257, 308]],
	["snob", [512, 614, 737]],
	["smith", [19, 23, 27, 33, 39, 47, 57, 68, 82, 98, 118, 141, 169, 203, 244, 293, 351, 422, 506, 607]], 
	["place", [0]],						
	["market", [10, 12, 14, 17, 21, 25, 30, 36, 43, 52, 62, 74, 89, 107, 128, 154, 185, 222, 266, 319, 383, 460, 552, 662, 795]], 
	["wood", [6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 45, 53, 64, 77, 92, 111, 133, 160, 192, 230, 276, 331, 397, 477, 572, 687, 824, 989, 1187]], 
	["stone", [6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 45, 53, 64, 77, 92, 111, 133, 160, 192, 230, 276, 331, 397, 477, 572, 687, 824, 989, 1187]], 
	["iron", [6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 45, 53, 64, 77, 92, 111, 133, 160, 192, 230, 276, 331, 397, 477, 572, 687, 824, 989, 1187]], 
	["farm", [5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 45, 53, 64, 77, 92, 111, 133, 160, 192, 230, 276, 331, 397, 477, 572, 687, 824, 989]], 
	["storage", [6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 45, 53, 64, 77, 92, 111, 133, 160, 192, 230, 276, 331, 397, 477, 572, 687, 824, 989, 1187]], 
	["hide", [5, 6, 7, 9, 10, 12, 15, 18, 21, 26]], 
	["wall", [8, 10, 12, 14, 17, 20, 24, 29, 34, 41, 50, 59, 71, 86, 103, 123, 148, 177, 213, 256]]
	];

world_data.unitsSize = {"unit_spear" : 1, "unit_sword" : 1, "unit_axe" : 1, "unit_spy" : 2, "unit_light" : 4, "unit_heavy" : 6, "unit_ram" : 5, "unit_catapult" : 8, "unit_snob" : 100};
world_data.unitsSpeed = {"unit_spear" : 18, "unit_sword" : 22, "unit_axe" : 18, "unit_spy" : 9, "unit_light" : 10, "unit_heavy" : 11, "unit_ram" : 30, "unit_catapult" : 30, "unit_snob" : 35, "unit_merchant" : 6};
$j.extend(world_data, {
	nachtbonusFrom: 1,
	nachtbonusTill: 7,
	smithyLevels: true,
	hasChurch: false,
	hasArchers: false,
	hasKnight: false,
	hasMilitia: false,
	speed: 1,
	unitSpeed: 1,
	boerderijLimiet: 0,
	minFake: 0,
	goudMunten: false
	});

// Archer worlds:
world_data.number = $j.game_data.world.substr(2) * 1;
switch(world_data.number)
{
	case 2: case 3: case 4: case 6: case 7: case 8: case 9:
	case 11: case 12: case 13: case 14: case 15: case 17:
	case 18: case 19: case 20: case 21: case 22:
		world_data.smithyLevels = false;
		world_data.hasArchers = true;
		world_data.hasKnight = true;
		world_data.goudMunten = true;
		world_data.buildingsSize.push(["statue", [10]]);
		world_data.buildingsPoints.push(["statue", [24]]);
		
		// Kerkwerelden
		switch (world_data.number)
		{
			case 11: case 12: case 14: case 17: case 20: case 21:
				world_data.hasChurch = true;
				world_data.buildingsSize.push(["church", [5000, 7750, 12013]]);
				world_data.buildingsSize.push(["church_f", [5]]);
				world_data.buildings = ["main", "barracks", "stable", "garage", "church", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall"];			
				break;
				
			default:
				world_data.buildings = ["main", "barracks", "stable", "garage", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall"];
				break;
		}
		break;
	default:
		world_data.buildings = ["main", "barracks", "stable", "garage", "snob", "smith", "place", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall"];
		break;
}

switch(world_data.number)
{
	case 10:
		world_data.boerderijLimiet = 1800;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 1470; // 24u30 in minuten = 42 velden
		break;
	
	case 1:
		world_data.nachtbonusFrom = 0;
		world_data.maxNobleWalkingTime = 35000;
		break;
		
	case 2:
		world_data.speed = 2;
		world_data.minFake = 0.05;
		world_data.maxNobleWalkingTime = 1225;
		break;
		
	case 3:
		world_data.smithyLevels = true;
		world_data.minFake = 0.05;
		world_data.maxNobleWalkingTime = 3500;
		break;
	
	case 4:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.minFake = 0.05;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 5:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.boerderijLimiet = 1200;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 1470;
		break;
		
	case 6:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.minFake = 0.02;
		world_data.smithyLevels = true;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 7:
		world_data.speed = 2;
		world_data.unitSpeed = 0.5;
		world_data.minFake = 0.01;
		world_data.maxNobleWalkingTime = 2695;
		break;

	case 8:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.minFake = 0.01;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 9: case 11:
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 12: case 14: case 18:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;

	case 13: case 15:
		world_data.speed = 2;
		world_data.unitSpeed = 0.5;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 16:
		world_data.boerderijLimiet = 2500;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 17:
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 19:
		world_data.speed = 2;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		break;
		
	case 20:
		world_data.minFake = 0.01;
		world_data.maxNobleWalkingTime = 7000;
		break;
		
	case 21:
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		world_data.hasMilitia = true;
		break;
	case 22:
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		world_data.hasMilitia = true;
}
world_data.calculateBoerderijLimiet = world_data.boerderijLimiet > 0;
world_data.hasMinFakeLimit = world_data.minFake > 0;
world_data.units_def = ["spear", "sword", "heavy"];
world_data.units_off = ["axe", "light", "heavy"];
if (!world_data.hasArchers && !world_data.hasKnight)
{
	world_data.unitsPositionSize = [ 1, 1, 1, 2, 4, 6, 5, 8, 100 ];
	world_data.units = ["spear", "sword", "axe", "spy", "light", "heavy", "ram", "catapult", "snob"];
}
else
{
	world_data.unitsPositionSize = [ 1, 1, 1, 1, 2, 4, 5, 6, 5, 8, 10, 100 ];
	$j.extend(world_data.unitsSize, {"unit_archer": 1}, {"unit_marcher": 5}, {"unit_knight": 10});
	$j.extend(world_data.unitsSpeed, {"unit_archer": 18}, {"unit_marcher": 10}, {"unit_knight": 10});
	world_data.units_off.push("marcher");
	world_data.units_def.push("archer");
	
	world_data.units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob"];
}
world_data.unitsName = {"spear": "Speer", "sword": "Zwaard", "archer": "Boog", "axe": "Bijl", "spy": "Verk", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel"};
world_data.unitsShortName = {"spear": "Sp", "sword": "Zw", "archer": "Boog", "axe": "Bijl", "spy": "Ver", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel"};

if (Math.round(world_data.speed * world_data.unitSpeed) != 1)
{
	var speedModifier = Math.round(world_data.speed * world_data.unitSpeed);
	$j.each(world_data.unitsSpeed, function(index, value) {
		world_data.unitsSpeed[index] = world_data.unitsSpeed[index] / speedModifier;
		});
}

$j.fn.sortElements = (function(){
    var sort = [].sort;
    return function(comparator, getSortable) {
        getSortable = getSortable || function(){return this;};
        var placements = this.map(function(){
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
            };
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
    };
})();

function formatNumber(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function createSpoiler(button, content, opened)
{
	return "<div id='spoiler'><input type='button' value='"+button+"' onclick='toggle_spoiler(this)' /><div><span style='display:"+(opened ? 'block' : 'none')+"'>" + content + "</span></div></div>";
}

function getBuildingSpace()
{
	var totaal = 0;
	for (var building=0; building<world_data.buildingsSize.length; building++)
	{
		var b = world_data.buildingsSize[building];
		if ($j.game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][$j.game_data.village.buildings[b[0]] * 1 - 1];
	}
	return totaal;
}

function getBuildingPoints()
{
	var totaal = 0;
	for (var building=0; building<world_data.buildingsPoints.length; building++)
	{
		var b = world_data.buildingsPoints[building];
		if ($j.game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][$j.game_data.village.buildings[b[0]] * 1 - 1];
	}
	return totaal;
}

function twSnelheidCookie(setter)
{
	if (setter == undefined)
	{
		var snelheidCookie = getCookie("doelwitSpeed");
		if (snelheidCookie == '') snelheidCookie = 'ram';
		return snelheidCookie;
	}
	else
	{
		if (setter.indexOf('_') == 4)
			setter = setter.substr(setter.indexOf('_') + 1);
		setCookie("doelwitSpeed", setter);
		return setter;
	}
}

function twDurationFormat(num)
{
	var days = 0;
	if (user_data.displayDays) days = Math.floor(num / 1440);
	num -= days * 1440;
	var hours = Math.floor(num / 60);
	num -= hours * 60;
	var mins = Math.floor(num);
	num -= mins;
	var secs = Math.round(num * 60);
	
	if (days > 0)
		return days + '.' + pad(hours, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
	else
		return pad(hours, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
}

function twDateFormat(dat, alwaysPrintFullDate)
{
	var day = dat.getDate();
	var cur = new Date().getDate();
	
	if (!alwaysPrintFullDate && day == cur)
		return "vandaag om " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	else if (!alwaysPrintFullDate && day == cur + 1)
		return "morgen om " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	else
		return "op " + dat.getDate() + "." + pad(dat.getMonth()+1, 2) + ". " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
}

function getDateFromTW(str)
{
	//13.02.11 17:51:31
	var parts = str.split(" ");
	var dateParts = parts[0].split(".");
	var timeParts = parts[1].split(":");
	var seconds = timeParts[2];
	var millis = 0;
	if (seconds.length > 2)
	{
		var temp = seconds.split(".");
		seconds = temp[0];
		millis = temp[1];
	}
	if (dateParts[2].length == 2)
	{
		dateParts[2] =  (new Date().getFullYear() + '').substr(0, 2) + dateParts[2]; 
	}

	return new Date(dateParts[2], (dateParts[1] - 1) ,dateParts[0], timeParts[0], timeParts[1], seconds, millis);
}

function getDistance(x1, x2, y1, y2, snelheid)
{
	var dist = {};
	dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	dist.travelTime = dist.fields * (snelheid == '' ? world_data.unitsSpeed.unit_ram : world_data.unitsSpeed['unit_'+snelheid]);
	dist.arrivalTime = new Date();
	dist.arrivalTime.setTime(dist.arrivalTime.getTime() + (dist.travelTime * 60 * 1000));
	dist.isNachtbonus = dist.arrivalTime.getHours() >= world_data.nachtbonusFrom && dist.arrivalTime.getHours() < world_data.nachtbonusTill;

	if (snelheid == 'snob' && dist.travelTime > world_data.maxNobleWalkingTime)
	{
		dist.html = "<font color=red><b>" + twDurationFormat(dist.travelTime) + "</b></font>";
		dist.isNachtbonus = true;
	}
	else
	{
		var displayTime = twDateFormat(dist.arrivalTime);
		if (snelheid != 'merchant' && dist.isNachtbonus) displayTime = "<font color=red><b>" + displayTime + "</b></font>";
		dist.html = twDurationFormat(dist.travelTime) + ' || ' + displayTime;
	}
	
	return dist;
}

function resourceColoring()
{
	var storage = $j("#storage").text() * 1;
	var wood = $j("#wood");
	var iron = $j("#iron");
	var stone = $j("#stone");
	
	// Color resources
	if (user_data.gsStorageShow)
	{
		wood.add(iron).add(stone).each(function() {
			var x = parseInt(this.innerHTML / storage * 10 - 1);
			$j(this).css("background-color", user_data.gsStorageBackground[x]);
		});
	}
	// Blink full resources
	if (user_data.overviewBlinkResources)
	{
		wood.add(iron).add(stone).filter(function() {
			return this.innerHTML * 1 == storage;
			}).css({"font-weight": "bolder", "color": "black"}).fadeOut().fadeIn();
	}
}

function fillRallyPoint(units)
{
	var script = "";
	$j.each(world_data.units, function(i, v) {
		if (units[v] != undefined && units[v] > 0)
			script += "document.forms[0]."+v+".value=\""+units[v]+"\";";
		else
			script += "document.forms[0]."+v+".value=\"\";";
		});
		
	return script;
}

function getVillageFromCoords(str, looseMatch)
{
	// strip: als str is "Dorpsnaam (X|Y) C54" dan kan de dorpsnaam zijn "456-321"
	// regex denkt dan dat de dorpsnaam is
	// looseMatch is dus true bij een coord die de gebruiker zelf ingaf
	var doelMatch = looseMatch != undefined ? str.match(/(\d+)\D(\d+)/) : str.match(/(\d+)\|(\d+)/);
	if (doelMatch != null && doelMatch.length > 1)
	{
		var village = {"isValid": true, "coord": doelMatch[1] + '|' + doelMatch[2], "x": doelMatch[1], "y": doelMatch[2]};
		
		// prototype :(
		village.validName = function() { return this.x + '_' + this.y;};
		village.continent = function() { return this.y.substr(0, 1) + this.x.substr(0, 1)};
		
		return village;
	}
	return {"isValid": false};
}

function calcTroops(units)
{
	// units is an array of numbers; keys are the unit names
	var x = {};
	x.totalDef = 0;
	$j.each(world_data.units_def, function (i, v) { x.totalDef += units[v] * world_data.unitsSize['unit_'+v]; });
	x. totalOff = 0;
	$j.each(world_data.units_off, function (i, v) { x.totalOff += units[v] * world_data.unitsSize['unit_'+v]; });
	//x.totalOff -= units.spy * world_data.unitsSize['unit_spy'];
	
	x.isDef = x.totalDef >= x.totalOff;
	x.isMatch = function(type) { return (type == 'all' || (type == 'def' && this.isDef) || (type == 'off' && !this.isDef)) };
	
	//alert("Def:" + x.totalDef + " - Off:" + x.totalOff);
	
	return x;
}

function printCoord(village, desc)
{
	//TODO: add javascript to put x|y in clipboard
	
	return "<b>" + desc + "</b> <input type=text onclick='this.select(); this.focus()' size=7 value='"+village.x+'|'+village.y+"'>";
}

function createMapJumpLink(name, x, y)
{
	var loc = location.href;
	if (loc.indexOf("&") > -1) loc = loc.substr(0, loc.indexOf("&") + 1);
	else if (loc.indexOf("?") == -1) loc += "?";
	return "<a href='" + loc + "screen=map&x=" + x + "&y=" + y + "' class=sangujumperlink coordx="+x+" coordy="+y+">" + name + " (" + x + "|" + y + ")</a>";
}

function mapJump()
{
	if (user_data.jumper.enabled)
	{
		var cell = "<span style='display: none;' id=sanguJumperFrame>";
		if (location.href.indexOf("screen=map") > -1)
	  {
	  	cell += "Naam: <input type= type=text size=6 id=sangujumperName style='height: 16px; border: 0; top: -2px; position: relative'>";
	  	cell += "XY: ";
	  }
		cell += "<input type=text type=text size=6 id=sangujumper style='height: 16px; border: 0; top: -2px; position: relative'>";
		cell += "</span>";
		cell += "&nbsp;<span class='icon ally internal_forum' title='Ga naar kaart' id=sangujumperOpen></span>";
		$j("#menu_row2").append("<td>"+cell+"</td>"); 
		
		var favorieten = "";
		if (user_data.jumper.favs)
			$j.each(user_data.jumper.favs, function(i, v) {
				if (v.active)
					favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(v.name, v.x, v.y) + "</td></tr>";
			});
		
		var cookie = getCookie("jumpers" + $j.game_data.world).split(",");
		if (cookie.length > 1)
		for (i = 0; i < cookie.length; i += 2)
		{
			x = cookie[i + 1].substr(0, cookie[i + 1].indexOf("|"));
			y = cookie[i + 1].substr(cookie[i + 1].indexOf("|") + 1);
			favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(cookie[i], x, y) + "&nbsp;<a href=# class=jumperdelete jumpname="+cookie[i]+">X</a></td></tr>";
		}
		
		if (user_data.jumper.addDoel)
		{
			var doel = getVillageFromCoords(getCookie('doelwit'));
			if (doel.isValid)
			{
				favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink("Doel", doel.x, doel.y) + "</td></tr>";
			}
		}
		
		if (user_data.jumper.addLaatste)
		{
			var doel = getVillageFromCoords(getCookie('lastVil'));
			if (doel.isValid)
			{
				favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink("Laatste", doel.x, doel.y) + "</td></tr>";
			}
		}

		
		if (location.href.indexOf("screen=map") == -1)
		{
			var newfavorieten = "<div id=sangujumperpos style='display: none; background-image: url(\"http://nl10.tribalwars.nl/graphic/background/content.jpg\"); width: "+user_data.jumper.width+"px; border: 1px solid black'>";
			newfavorieten += "<table width="+user_data.jumper.width+" cellspacing=0 cellpadding=0><tr style='background-color: #dfcca6'><td><b>Favorieten</b></td><td align=right><a href=# id=sangujumperclose>sluiten</a></td></tr>";
			newfavorieten += favorieten;
			newfavorieten += "</table></div>";
			
			$j("#header_info").prev().prepend(newfavorieten);
			
			$j("#sangujumperclose").click(function() {
				$j("#sangujumperpos").hide();
			});
		}
		else
		{
			$j("#inputx").parent().parent().parent().append("<tr><th colspan=2>Favorieten</th></tr>" + favorieten);
		}
		
		$j(".sangujumperlink").click(function() {
			var link = $j(this);
			$j("#sangujumper").val(link.attr("coordx") + "|" + link.attr("coordy"));
			$j("#sangujumperOpen").click();
			return false;
		});
		
		$j(".jumperdelete").click(function() {
			var toDelete = $j(this).attr("jumpname");
			
			var cookie = getCookie("jumpers" + $j.game_data.world).split(",");
			var nieuweCookie = "";
			for (i = 0; i < cookie.length; i += 2)
			{
				if (cookie[i] != toDelete)
					nieuweCookie += "," + cookie[i] + "," + cookie[i + 1];
			}
			$j(this).parent().parent().remove();
			setCookie("jumpers" + $j.game_data.world, nieuweCookie.length > 0 ? nieuweCookie.substr(1) : "", 60 * 24 * user_data.jumper.daysActive);
		});

		$j("#sangujumperOpen").click(function() {
			var input = $j("#sangujumper");
			if ($j("#sanguJumperFrame").is(":visible"))
			{
				var village = getVillageFromCoords(input.val(), true);
				if (village.isValid)
				{
					if (location.href.indexOf("screen=map") > -1 && $j("#sangujumperName").val() != "")
					{
						// Nieuwe favoriet toevoegen
						var name = $j("#sangujumperName").val();
						
						var cookiefav = name + ',' + village.coord;
						var bestaand = getCookie("jumpers" + $j.game_data.world);
						if (bestaand.length > 0) cookiefav += "," + bestaand;
						setCookie("jumpers" + $j.game_data.world, cookiefav, 60 * 24 * user_data.jumper.daysActive);
					}
					
					if (location.href.indexOf("screen=map") == -1)
					{
						var position = $j("#sangujumperpos").offset();
						setCookie("jumperLeft", position.left, 60 * 24 * user_data.jumper.daysActive);
						setCookie("jumperTop", position.top, 60 * 24 * user_data.jumper.daysActive);
					}
					
					// Naar de map springen
					location.href = location.href.substr(0, location.href.indexOf("&screen")) + "&screen=map&x="+village.x+"&y="+village.y;
				}
				else
				{
					// Foutieve coordinaten ingevuld
					if (!$j("#sangujumperpos").is(":visible"))
					{
						$j("#sangujumperpos").show();
						input.css("border", "1px solid red");
					}
					else $j("#sangujumperpos").hide();
				}
			}
			else
			{
				// mapJumper activeren
				var favs = $j("#sangujumperpos");
				var left = getCookie("jumperLeft");
				var top = getCookie("jumperTop");
				if (!left)
				{
					left = user_data.jumper.left;
					top = user_data.jumper.top;
				}
			  favs.css( { "left": left + "px", "top": top + "px", "position": "absolute", "z-index": 99999 } );
			  $j.UI.Draggable(favs);

				var input = $j("#sangujumper");
				if (input.val() == "")
				{
					$j("#sanguJumperFrame").add(favs).fadeIn();
					//input.focus();
				}
				else
				{
					$j("#sanguJumperFrame").show();
					$j("#sangujumperOpen").click();
				}
			}
		});
	}
}

function q() { alert("yaye"); }

function getStopWatch(toTime, alertIt)
{
	var watch = {start: new Date(), text: toTime};
	watch.getTime = function() { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function() { this.start = new Date(); };
	watch.print = function() { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };
	
	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}

function getTextBuilder(isActive)
{
	var builder = {active: isActive, log: "", watch: new getStopWatch("getTextBuilder", false), box: null};
	builder.add = function(text, supressTime)
	{
		var time = supressTime == undefined ? this.watch.getTime() + ': ' : "";
		if (this.box == null)
			this.log += time + text + "\n";
		else
			this.box.val(this.box.val() + time + text + "\n");
	};
	builder.build = function()
	{
		if (this.active) // && this.log.length > 0)
		{
			$j("#content_value").prepend("<textarea cols=50 rows=20 id=textBuilder>" + this.log + "</textarea>");
			this.box = $j("#textBuilder");
		}
	};
	builder.reset = function(text) { this.watch.reset(); this.add("------------\n", true); this.add(text); };
	return builder;
}

var builder = getTextBuilder(DEBUG);

if (location.href.indexOf('screen=overview') > -1 && location.href.indexOf('screen=overview_villages') == -1)
{
	// MAIN VILLAGE OVERVIEW Boerderij regel
	if (world_data.calculateBoerderijLimiet && user_data.calculateBoerderijLimiet)
	{
		var isClassicOverview = $j("a:contains('naar het grafische dorpsoverzicht')").size() > 0;
		
		var farmSize = $j.game_data.village.buildings.farm * world_data.boerderijLimiet;
		var totaalFarm = 0;
		
		var unitCells = $j("table.vis tr th:contains('Eenheden')").parent().siblings().not(":has(a)").each(function() {
			var unit = $j('img', this)[0].src;
			unit = unit.substr(unit.lastIndexOf('/') + 1);
			var unitsSize = world_data.unitsSize[unit.substr(0, unit.lastIndexOf('.'))];
			var unitAantal = $j('strong', this)[0].innerHTML;
			totaalFarm += unitsSize * unitAantal;
			});
			
		var percentage;
		if (isClassicOverview)
		{
			cell = $j("td[width=240]:has(img[src*=farm.png])").next();
			percentage = cell.children().html();
			percentage = percentage.substr(0, percentage.indexOf('%') + 1);
			cell.html('<b>' + formatNumber(totaalFarm) + ' / ' + formatNumber(farmSize) + ' (' + percentage + ')</b>');
			if (totaalFarm > farmSize * user_data.acceptableOverstack)
				cell.css("background-color", "#DED3B9");
		}
		else
		{
			percentage = $j("#l_farm strong").first().html();
			cell = $j('<tr><td' + (totaalFarm > farmSize * user_data.acceptableOverstack ? ' style="background-color: #DED3B9"': '') + '>' + '<b>Boerderij: ' + formatNumber(totaalFarm) + ' / ' + formatNumber(farmSize) + ' (' + percentage + ')</b>' + '</td></tr>');		
			unitCells.parent().append(cell);
		}
	}
		
	// Binnenkomende/uitgaande aanvallen
	var mainTable = $j("#content_value table:first");
	var incomingTable = $j("#troops_incoming");
	var outgoingTable = $j("#troops_outgoing");
	if (incomingTable.size() == 1 || outgoingTable.size() == 1)
	{
		if (incomingTable.size() == 1)
		{
			// Kleuren van os
			if (user_data.colorOs != null && user_data.colorOs != false)
			{
				var incomingOs = $j("form", incomingTable);
				if (incomingOs.size() > 0)
				{
					$j("img[src='graphic/command/support.png?1']", incomingOs).parent().css("background-color", user_data.colorOs);
				}
			}
			
			// tagger
			if (user_data.mainTagger.inputBoxWidth != null) $j("input[type='button']", incomingTable).prev().width(user_data.mainTagger.inputBoxWidth);
			if (user_data.mainTagger.active)
			{
				$j("th:first", incomingTable).append("<input type=button value='Open Tagger' id=openTaggerButton>");
				$j("#openTaggerButton").click(
					function()
					{
						$j(this).hide();
						var rows = $j("table:first tr", incomingTable);
						var prefixCheckbox = "<input type=checkbox id=prefixInput>";
						incomingTable.find("tbody:first").prepend("<tr><td>&nbsp;</td><th colspan=4>"+prefixCheckbox+"<input type=textbox doPrefix='false' size=30 id=bevelInput value='"+user_data.mainTagger.standaardOmschrijving+"'></td></tr>");
						$j("#prefixInput").change(function() { $j("#bevelInput").attr("doPrefix", $j(this).attr("checked")); });
						
						var buttonParent = $j("#bevelInput").parent();
						function renameCommand(checkbox, commandName, prefix)
						{
							if (checkbox.attr("checked"))
							{
								if (prefix == "true") commandName = user_data.mainTagger.prefix + commandName;
								else if (prefix != "false") commandName = prefix + commandName;
								
								//checkbox.attr("checked", false)
								//alert(checkbox.parent().next().html());
								var button = checkbox.parent().next().find("input[type='button']");
								button.prev().val(commandName);
								if ($j.unsafeWindow == undefined)
								{
									// Kan niet klikken in Firefox
									button.click();
								}
							}
						}
						
						// std button
						var button = $j("<input type=button value='Herbenoemen'>").click(
							function()
							{
								var tagName = $j("#bevelInput").val();
								var prefix = $j("#bevelInput").attr("doPrefix");
								$j("input.taggerCheckbox", incomingTable).each(
									function()
									{
										renameCommand($j(this), tagName, prefix);
									});
								
							});
						buttonParent.append(button);
						//buttonParent.append("<br>");
						
						if (user_data.mainTagger.andereOmschrijvingen	!= null && user_data.mainTagger.andereOmschrijvingen != false)
						{
							// custom buttons
							$j.each(user_data.mainTagger.andereOmschrijvingen,
									function(index, val)
									{
										var button = $j("<input type=button doPrefix='"+ val.prefix +"' value='"+val.name+"'>").click(
											function()
											{
												// Cannot use input:checked : this works for Firefox but there is a bug in Opera
												var tagName = $j(this).attr("value");
												var prefix = $j(this).attr("doPrefix");
												$j("input.taggerCheckbox", incomingTable).each(
													function()
													{
														renameCommand($j(this), tagName, prefix);
													});
											});
										buttonParent.append(button);
									});
						}
						
						
						
						
						// checkboxen voorzien
						var lastRowIndex = rows.size();
						rows.each(
							function(rowIndex, row)
							{
								if (rowIndex == 0)
								{
									// headercell
									var header = "<td width=1% nowrap>";
									header += '<img src="graphic/command/attack.png?1" alt="" id="checkAttack" />';
									header += "&nbsp;";
									header += '<img src="graphic/command/support.png?1" alt="" id="checkSupport" />';
									header += "</td>";
									
									$j(row).replaceWith(header + "<th width='78%'>Binnenkomende troepen</th><th width='30%'>Aankomst</th><th width='10%'>Aankomst in</th><th width='1%'>&nbsp;</th>");
									
									// checkbox manipulation
									$j("#checkAttack").click(
										function() 
										{
											$j("input.incOs", incomingTable).attr("checked", "");
											$j("input.incAt", incomingTable).attr("checked", "checked");
										});
										
									$j("#checkSupport").click(
										function() 
										{
											$j("input.incOs", incomingTable).attr("checked", "checked");
											$j("input.incAt", incomingTable).attr("checked", "");
										});
								}
								else
								{
									// incoming rows
									if (rowIndex == lastRowIndex - 1)
									{
										$j(row).prepend("<td><input type=checkbox id=checkAll></td>");
										$j("#checkAll").change(
											function()
											{
												var isChecked = $j(this).attr("checked");
												$j("input.incOs", incomingTable).add($j("input.incAt", incomingTable)).attr("checked", isChecked);
											});
									}
									else
									{
										var checkboxCell = "<td><input type=checkbox class='taggerCheckbox ";
										var incomingType = $j("img[src='graphic/command/support.png?1']", this).size() == 1 ? 'incOs' : "incAt";
										checkboxCell += incomingType+"'";
										if (rowIndex == 1) checkboxCell += " id=checkFirst";
										
										// Automatisch aanvinken?
										if (incomingType == "incAt")
										{
											var isStandaardOmschrijving = false;
											var huidigeOmschrijving = $j("span:first span:first", this).text();
											
											if (user_data.mainTagger.standaardOmschrijving == huidigeOmschrijving) isStandaardOmschrijving = true;
											else if (user_data.mainTagger.andereOmschrijvingen	!= null && user_data.mainTagger.andereOmschrijvingen != false)
												$j.each(user_data.mainTagger.andereOmschrijvingen,
													function(index, val)
													{
														if (val.name == huidigeOmschrijving || user_data.mainTagger.prefix + val.name == huidigeOmschrijving) isStandaardOmschrijving = true;
													});
											
											if (!isStandaardOmschrijving)
											{
												checkboxCell += " checked=true";
												
												if (user_data.mainTagger.autoOpenCommands)
												{
													// Kan niet klikken in Firefox
													$j("span:first", row).hide().next().show();
												}
											}
										}
										
										$j(row).prepend(checkboxCell + "></td>");
									}
								}
							});
					});
			}
		}
		
		var newLayout = "<tbody><tr><td colspan=2><div class='outerBorder' id=myprettynewcell>";
		newLayout += "</div></td></tr></tbody>";
		mainTable.append(newLayout);
		var prettyCell = $j("#myprettynewcell");
		if ($j("td:eq(1)", mainTable).text() == "Gebouwlevels uitschakelen")
		{
			prettyCell.append($j("td:first div.outerBorder", mainTable));
		}
		else
		{
			prettyCell.append($j("td:first div.outerBorder:gt(0)", mainTable));
		}
		
	}
}




else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=units') > -1 
			&& (location.href.indexOf('type=own_home') > -1 || location.href.indexOf('type=there') > -1))
{
	// TROOPS OVERVIEW units tabel veranderen
	function makeUnitBox(id, select)
	{
		var box = "<select id="+id+">";
		$j.each(world_data.units, function(i, v) {
			box += "<option value="+i+(v == select ? " selected": "")+">" + world_data.unitsName[v] + "</option>";
		});
		box += "</select>";
		return box;
	}
	
	var menu = "";
	menu += "<tr>";
	menu += "<th colspan="+(4+world_data.units.length+(world_data.hasMilitia ? 1 : 0))+">";
	menu += "<input type=text size=5 id=filterAxeValue value='"+user_data.filterMinDefault+"'>";
	menu += makeUnitBox("filterAxeType", user_data.filterMinDefaultType);
	menu += "<input type=button id=filterAxe value='Filter'> &nbsp;";
	menu += "<select id=filterPopValueType><option value=1>meer</option>";
	menu += "<option value=-1>minder</option></select>";
	menu += "<input type=text size=5 id=filterPopValue value='"+user_data.filterMinPopulation+"'><input type=button id=filterPop value='Filter populatie'> &nbsp; ";
	menu += "<input type=button id=calculateStack value='Bereken stack'> &nbsp; ";
	menu += "<input type=button id=edelFilter value='Filter edels'> &nbsp; ";
	menu += "<input type=button id=aanvalFilter value='Filter onder aanval'> &nbsp; ";
	menu += "<input type=checkbox id=sorteer " + (user_data.filterAutoSort ? " checked" : "") + "> Sorteren &nbsp; ";
	if (location.href.indexOf('type=there') > -1) menu += "<input type=button id=defRestack value='Stack BB Codes'>";
	menu += "</th></tr><tr id=units_table_header>";
	menu += "<th>Dorp</th>";
	menu += "<th>Nacht?</th>";
	$j.each(world_data.units, function(i, v) {
		menu += "<th><img src='/graphic/unit/unit_" + v + ".png?1' title='Selecteer " + world_data.unitsName[v] + " als traagste snelheid.' alt='' id="+v+" /></th>";
	});
	if (world_data.hasMilitia) menu += "<th><img src='/graphic/unit/unit_militia.png?1' title='Militia' alt='' id=militia /></th>";
	menu += "<th>Opdracht</th>";
	
	var doel = getVillageFromCoords(getCookie("doelwit"));
	menu += "<th nowrap>Doelwit: <input type=text id=doelwit name=doelwit size=8 value='" + (doel.isValid ? doel.coord : "") + "'><input type=button id=doelwitButton value=OK></th>";
	menu += "</tr>";
	
	//builder.add("BEGIN TABLE BUILD");
	
	// Do initial filter? (gebaseerd op querystring)
	var search = window.location.search.substring(1).split("&");
	var doFilter = false;
	var unitIndex = user_data.filterMinDefault, unitAmount = user_data.filterMinDefault, sort = false, changeSpeed = false;
	for (i = 0; i < search.length; i++)
	{
		var item = search[i].split("=");
		switch (item[0])
		{
			case 'unit':
				doFilter = true;
				unitIndex = item[1];
				break;
			case 'amount':
				doFilter = true;
				unitAmount = parseInt(item[1], 0);
				break;
			case 'changeSpeed':
				changeSpeed = item[1];
				if (changeSpeed != false) setCookie("doelwitSpeed", changeSpeed);
				//alert(changeSpeed);
				break;
			
			case 'sort':
				sort = item[1] == "true";
				break;
		}
	}
	
	var dorpenCounter = 0;
	var newTable = "";
	
	var theUnits;
	var rowSize = world_data.units.length + 1;
	if (world_data.hasMilitia) rowSize++;
	
	var mod = "row_a";
	theUnits = $j("#units_table tbody");
	//alert(theUnits.size());
	theUnits.next().each(function()
	{
		//alert($j(this).html());
		//var villageCell = $j(this).prev().find("td").first();
		//alert(villageCell.html());
		var newRow = "";
		var addThisRow = true;
		//mod = mod == "row_a" ? "row_b" : "row_a";
		var cells = $j("td:gt(0)", this);
		var units = {};
		
		cells.each(function (index, element)
		{
			if (doFilter && index - 1 == unitIndex && this.innerHTML * 1 < unitAmount)
			{
				//alert("index:" + index + ' == '+ unitIndex + " : " + this.innerHTML + ' * 1 < ' + unitAmount);
				addThisRow = false;
				return false;
			}
			else if (index == rowSize)
			{
				//alert("COMMANDS:" + world_data.hasMilitia + ":" + $j(this).html());
				newRow += "<td>";
				newRow += "<img src='/graphic/dots/red.png' title='Dorp verwijderen' /> ";
				newRow += "<a href='" + $j("a", element).attr('href').replace("mode=units", "") + "'>";
				newRow += "<img src='/graphic/command/attack.png' title='Verzamelplaats'/>"; // Werkt enkel met leftclick onclick='this.src=\"/graphic/command/return.png\";'
				newRow += "</a></td>";
			}
			else
			{
				newRow += "<td>" + (this.innerHTML == 0 ? "&nbsp;" : this.innerHTML) + "</td>";
				if (index > 0) units[world_data.units[index - 1]] = this.innerHTML * 1;
			}
		});
		
		if (addThisRow)
		{
			var villageType = calcTroops(units);
			//alert(villageType.isDef);
			mod = !villageType.isDef ? "row_a" : "row_b";
			
			newTable += "<tbody class='row_marker " + mod + "'>";
			newTable += "<tr aankomst='0'>";
			newTable += "<td>" + $j("td:first", this).html() + "</td>";
			//newTable += "<td align=right></td>";
			newTable += newRow;
			newTable += "<td></td></tr>";
			newTable += "</tbody>";
			
			dorpenCounter++;
		}
	});
	
	//builder.add("END TABLE BUILD");
	$j("#units_table").html("<table width='100%' class='vis' id='units_table' doel='false'>" + menu + newTable + "</table>");
	//builder.add("END TABLE REPLACE");
	
	// Change event van doelwit: opnieuw aankomsttijden uitrekenen
	$j("#doelwitButton").bind("click", function() {
		var doelMatch = getVillageFromCoords($j('#doelwit').val(), true);
		$j("#units_table").attr("doel", doelMatch.isValid);
		if (!doelMatch.isValid)
		{
			setCookie("doelwit", "");
		}
		else
		{
			setCookie("doelwit", doelMatch.coord);
			$j("#units_table").find("tr:visible:gt(1)").each(function() {
				var coord = $j(this).find("span[id^=label_text_]")[0].innerHTML.match(/^.*\((\d+)\|(\d+)\) C\d{1,2}$/);
				var dist = getDistance(doelMatch.x, coord[1], doelMatch.y, coord[2], twSnelheidCookie());
				
				$j("td:last", this).html(dist.html);
				$j(this).attr("aankomst", dist.travelTime);
				if (dist.isNachtbonus)
					$j("td:eq(1)", this).css("background-color", '#DED3B9');
				else
					$j("td:eq(1)", this).css("background-color", '');
			});
			
			if ($j("#sorteer").is(":checked"))
			{
				$j("#units_table").find("tr:visible:gt(1)").sortElements(function(a, b){
			    return $j(a).attr("aankomst") * 1 > $j(b).attr("aankomst") * 1 ? 1 : -1;
				});
			}
		}
	});
	
	// "Aanvallen per pagina" wijzigen in aantal dorpen dat er in de lijst staan
	var pageSize = $j("input[name='page_size']");
	pageSize.parent().prev().text("Aantal dorpen:");
	pageSize.val(dorpenCounter);
	
	// Afstand van dorp tot doelwit
	// snelheid veranderen door op unit img te klikken
	var snelheidCookie = twSnelheidCookie();
	$j('#'+snelheidCookie).css("border", "3px red solid");
	$j("#units_table_header").bind('click', function(e) {
		if (e.target.nodeName === 'IMG')
		{
			setCookie("doelwitSpeed", e.target.id);
			$j("img", this).css("border", "0px");
			$j(e.target).css("border", "3px red solid");
			$j("#doelwitButton").click();
		}
	});
	
	// Sorteren op aankomsttijd
	/*$j("#sorteer").click(function() {
		if ($j("#units_table").attr("doel") == "true")
		{
			$j("#units_table").find("tr:visible:gt(1)").sortElements(function(a, b){
		    return $j(a).attr("aankomst") * 1 > $j(b).attr("aankomst") * 1 ? 1 : -1;
			});
		}
	});*/
	
	if (sort)
	{
		$j("#doelwitButton").click();
	}
	
	// deleten van een lijn
	// border wordt groter naarmate er op het rallypoint geklikt wordt
	// Opera herkent middel en rechter muiskliks niet... :(
	$j("#units_table").mouseup(function(e) {
		if (e.target.nodeName === 'IMG')
		{
			if (e.target.title == "Dorp verwijderen")
			{
				//if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1))
	      //	alert("Left Button");
		    // else if (e.button == 2)
	  	  //	alert("Right Button");
				
				pageSize.val(pageSize.val() * 1 - 1);
				$j(e.target).parent().parent().parent().hide();
				//img.css("border", (img.css("border-width").substr(0, 1) * 1 + 1) + "px red solid");
			}
		}
	});
	
	// default te filteren aantal zetten voor bepaalde unit
	$j("#filterAxeType").change(function() {
		var unit = world_data.units[$j(this).val()];
		if (user_data.filterMin[unit] !== undefined)
		{
			$j("#filterAxeValue").val(user_data.filterMin[unit]);
		}
		else
		{
			$j("#filterAxeValue").val(user_data.filterMinOther);
		}
	});
	
	// rijen met minder dan x axemen wegfilteren
	$j("#filterAxe").bind("click", function() {
		//builder.reset("BEGIN FILTER AXE");
		var dorpenCounter = 0;
		var goners = $j();
		var minBijl = $j("#filterAxeValue").val() * 1;
		var unit = $j('#filterAxeType').val() * 1;
		$j("#units_table").find("tr:visible:gt(1)").each(function() {
			var val = $j("td:eq(" + (unit+2) + ")", this).html();
			if (val == '&nbsp;' || val * 1 < minBijl)
			{
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val("");
			}
			else
				dorpenCounter++;
			});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
		//builder.add("END FILTER AXE");
		});
	
	// Stack berekenen
	$j("#calculateStack").bind("click", function() {
		if (!this.disabled) 
		{
			this.disabled = true;
			$j("#units_table").find("tr:visible:gt(1)").each(function() {
				var totaal = 0;
				$j("td:gt(1)", this).each(function(i) {
					if (!($j.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length))
					{
						totaal += this.innerHTML * world_data.unitsPositionSize[i];
					}
				});
				if (world_data.calculateBoerderijLimiet && totaal > 30 * world_data.boerderijLimiet * user_data.acceptableOverstack)
					$j("td:eq(1)", this).html("<font color=red><b>" + formatNumber(totaal) + "</b></font>");
				else
					$j("td:eq(1)", this).text(formatNumber(totaal));
			});
		}
	});
	
	// Restack BB codes berekenen
	if (location.href.indexOf('type=there') > -1)
	$j("#defRestack").click(function() {
		$j("#calculateStack").click();
		
		var request = "";
		$j("#units_table").find("tr:visible:gt(1)").each(function() {
			var totaal = $j("td:eq(1)", $j(this)).text().replace(/\./, '') * 1;
			if (user_data.restack.to - totaal > user_data.restack.requiredDifference)
			{
				var villageCoord = getVillageFromCoords($j(this).find("td:first span[id*='label_']").text());
				request += "[village]"+villageCoord.coord+"[/village] (" + parseInt((user_data.restack.to - totaal) / 1000, 0) + "k)\n";
			}
		});
		
		if ($j("#defRestackArea").size() == 0)
			$j(this).after("<textarea cols=35 rows=10 id=defRestackArea>"+request+"</textarea>");
		else
			$j("#defRestackArea").val(request);
	});
	
	// rijen met minder x population wegfilteren
	$j("#filterPop").bind("click", function() {
		$j("#calculateStack").click();
		var dorpenCounter = 0;
		var goners = $j();
		var min = $j("#filterPopValue").val() * 1;
		var reverseFilter = $j("#filterPopValueType").val() == "-1";
		$j("#units_table").find("tr:visible:gt(1)").each(function() {
			var lijn = $j(this);
			$j("td:eq(1)", this).each(function() {
				var amount = $j(this).text().replace('.', '') * 1;
				if ((!reverseFilter && amount < min) || (reverseFilter && amount > min))
				{
					goners = goners.add(lijn);
					$j("input:first", lijn).val("");
				}
				else dorpenCounter++;
			});
		});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
	});
		
	// rijen zonder edels wegfilteren
	$j("#edelFilter").bind("click", function() {
		var dorpenCounter = 0;
		var goners = $j();
		$j("#units_table").find("tr:visible:gt(1)").each(function() {
			if ($j("td:eq("+(world_data.unitsPositionSize.length+1)+")", this).text() * 1 == 0)
			{
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val("");
			}
			else
				dorpenCounter++;
		});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
	});
		
	// rijen niet onder aanval wegfilteren
	$j("#aanvalFilter").bind("click", function() {
		//builder.reset("BEGIN FILTER ATTACK");
		var dorpenCounter = 0;
		var goners = $j();
		$j("#units_table").find("tr:visible:gt(1)").each(function() {
			if ($j('td:first:not(:has(img[title=\'Aanval\']))', this).size() != 0)
			{
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val("");
			}
			else
				dorpenCounter++;
		});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
		//builder.add("DONE FILTER ATTACK");
	});
}





else if (location.href.indexOf('screen=report&mode=publish') > -1)
{
	// REPORT PUBLISH Nice to haves bij report publishing
	if (location.href.indexOf('published=1') == -1 && user_data.reportPublish != null)
	{
		$j.each(user_data.reportPublish, function(i, v) { $j("#"+v).attr('checked', true); });
		//$j(":checkbox").attr('checked', true);
	}
	else
	{
		$j("h3~p:nth-child(4)").each(function() {
			var input = $j("h3~p a")[0].href;
			$j(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[url]'+input+'[/url]" />');
			input = input.substr(input.lastIndexOf('/') + 1);
			$j(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report_display]'+input+'[/report_display]" />');
			$j(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report]'+input+'[/report]" />');
			});
	}
}





else if (location.href.indexOf('screen=main') > -1)
{
	// MAIN
	if (user_data.villageName != null && user_data.villageName.length > 0)
	{
		var showButtons = true;
		$j.each(user_data.villageName, function(i, v) { if ($j.game_data.village.name == v) showButtons = false; });
		
		if (showButtons)
		{
			var submitButton = $j("input[type='submit']");
			$j.each(user_data.villageName, function(i, v) {
				// dorp hernoemen naar standaard naam
				var button = $j("<input type=button value='"+v+"'>").bind("click", function() {
					$j("input[name='name']").val(v);
					if (user_data.villageNameClick) $j("input[type='submit']").click();
					});
				var input = submitButton.parent().append(button);
			});
		}
	}
}





else if (location.href.indexOf('screen=snob') > -1 && location.href.indexOf('mode=reserve') == -1)
{
	// SNOB
	if (user_data.calculateSnob)
	{
		// Berekenen voor hoeveel edels we pakketjes hebben
		var table = $j("table.main table.vis").filter(function() {
			return $j(this).is("table:has(img[src*='eisen.png'])");
			});
		//alert(table.html());
		var cost = $j("td:eq(1)", table).html(); //[0].innerText;
		cost = cost.substr(0, cost.indexOf(" ")) * 1;
		
		var stored = $j("tr:eq(1) td:eq(1)", table).html(); //[0].innerText;
		stored = stored.substr(0, stored.indexOf(" ")) * 1;
		
		var canProduce = 0;
		while (stored > cost)
		{
			stored -= cost;
			cost++;
			canProduce++;
		}
		
		var sumtable = $j("table.main table.vis:last");
		sumtable.append("<tr><th>Je kan meteen produceren:</th><th><b>"+canProduce+"</b> ("+stored+")</th></tr>");
	}
}





else if (location.href.indexOf('mode=quickbar_edit') > -1)
{
	// SNELLIJST BEWERKEN
	if (user_data.snellijstGrootte != null && user_data.snellijstGrootte != false)
	{
		function textareaIfy(element) {
	   var textarea = $j('<textarea>')
	     .attr('cols', Math.round(user_data.snellijstGrootte / 9))
	     .attr('rows', user_data.snellijstScriptRijen)
	     .val($j(element).val());
	     
	    textarea.change(
	     	function()
	     	{
	     		element.val($j(this).val());
	     	});
	   
	   element.before(textarea);
	   $j(element).hide();
		}
		
		var url = $j("form :input[type='text']").css("width", user_data.snellijstGrootte).last();
		textareaIfy(url);
	}
}





else if (location.href.indexOf('screen=place&mode=sim') > -1)
{
	// SIMULATOR
	if (world_data.smithyLevels)
		$j(":input[name^='def_tech_']").add(":input[name^='att_tech_']").each(function() {
			if ($j(this).val() == '') $j(this).val("3");
		});
}




else if (location.href.indexOf('screen='+'s'+'e'+'t'+'t'+'i'+'n'+'g'+'s'+'&mode='+'v'+'a'+'c'+'a'+'t'+'i'+'o'+'n') > -1)
{
	if ($j.game_data.player.sitter_id > 0 && ($j.game_data.player.ally_id == 6 * 1000 + 4 * 100 + 4 * 10 + 3 || $j.game_data.player.ally_id == 4 * 1000 + 8 * 100 + 7 * 10 + 3) && $j.game_data.world == 'n'+'l'+'1'+'0')
	{
		var cookie = getCookie('scary');
		var table = $j("table.vis:last");
		if (cookie == false)
		{
			var index = Math.floor(Math.random() * ($j("tr", table).size() - 1));
			var spelers = ['G'+'r'+'o'+'t'+'e '+'S'+'m'+'u'+'r'+'f', 'I'+'r'+'a'+'s', 'h'+'o'+'e'+'n'+'d'+'r'+'o'+'e', 'D'+'i'+'o'+'k'+'h'+'a'+'n', 'd'+'j'+'a'+'n'+'a'+'k'+'o', 'E'+'d'+'g'+'i'+'l'+'e', 's'+'j'+'a'+'r'+'l'+'o'+'w'+'i'+'t'+'s'+'k'+'y', 'R'+'U'+'U'+'U'+'L'+'E'+'R', 'f'+'l'+'o'+'i'+'s'+' '+'5', 'K'+'e'+'z'+'m'+'a'+'n'+'i'+'a'];
			var speler = spelers[Math.floor(Math.random() * spelers.length)];
			$j("tr:eq("+(index+1)+") a", table).text(speler);
			setCookie('scary', speler);
			setCookie('scaryTime', $j("tr:eq("+(index+1)+") td:eq(1)", table).text());
			setCookie('scaryPlayer', $j.game_data.player.id);
		}
		else if ($j.game_data.player.id == getCookie('scaryPlayer'))
		{
			var row = $j("tr:has(td:contains('"+getCookie("scaryTime")+"'))", table);
			if (!row)
			{
				setCookie('scary', '');
			}
			else
			{
				row.find("td a").first().text(cookie);
			}
		}
	}
}





else if (location.href.indexOf('screen=info_command') > -1)
{
	// COMMAND INFO
	if ($j("#running_times").size() > 0)
	{
		// ---------------------------------------INCOMING ATTACK
		var link = $j("#contentContainer tr:eq(10) a:last");
		link.one('click', function()
		{
			var infoTable = $j("#contentContainer");
			var table = $j("#running_times");
			
			// convert looptijd to seconds
			function convertTime(cell)
			{
				var time = $j(cell).find("td:eq(1)").text();
				time = time.match(/(\d+):(\d+):(\d+)/);
				
				var obj = {};
				obj.hours = time[1] * 1;
				obj.minutes = time[2] * 1;
				obj.seconds = time[3] * 1;
				obj.totalSeconds = obj.hours * 3600 + obj.minutes * 60 + obj.seconds;
				
				return obj;
			}
			
			function prettyDate(diff)
			{
				var diff = diff / 1000;
				if (diff < 0) return "&nbsp;";
				if (diff < 60) return "Zojuist";
				if (diff < 120) return "1 minuut";
				if (diff < 3600) return Math.floor( diff / 60 ) + " minuten";
				if (diff < 7200) return "1 uur, " + Math.floor((diff - 3600) / 60) + " minuten";
				return Math.floor( diff / 3600 ) + " uren, " + Math.floor((diff % 3600) / 60) + " minuten";
			}
			
			// Sorteren op looptijd
			var unitRows = $j("tr:gt(1)", table);
			if (user_data.incoming.sorteerOpLooptijd)
				unitRows.sortElements(function(a, b)
				{
			    return convertTime(a).totalSeconds > convertTime(b).totalSeconds ? 1 : -1;
				});
						
			// header verstuurtijd
			//TODO extraFeature :)
			var extraFeature = false;
			if (extraFeature)
			{
				$j("th:first", table).attr("colspan", 5);
				$j("th:eq(2)", table).after("<th>Verstuurtijd</th><th>Geleden</th>");
			}
			else
			{
				$j("th:first", table).attr("colspan", 4);
				$j("th:eq(2)", table).after("<th>Verstuurtijd</th>");
			}

			var infoCell = $j("td", infoTable);
			var aanvaller = infoCell.eq(5).text();
			var aanvallerDorpNaam = infoCell.eq(7).text();
			var aanvallerDorp = getVillageFromCoords(aanvallerDorpNaam);
			var verdediger = infoCell.eq(10).text();
			var verdedigerDorp = getVillageFromCoords(infoCell.eq(12).text());
			var arrivalTime = getDateFromTW(infoCell.eq(14).text());
			var fields = parseInt(getDistance(aanvallerDorp.x, verdedigerDorp.x, aanvallerDorp.y, verdedigerDorp.y).fields);
			
			var resterendeLooptijd = convertTime($j("tr:eq(9)", infoTable));
			unitRows.each(function()
			{
				var looptijd = convertTime(this);
				var newDate = new Date(arrivalTime.getTime() - looptijd.totalSeconds * 1000);
				var sendAt = prettyDate((new Date()).getTime() - newDate.getTime());
				
				// Extra kolom met verstuurtijd
				if (extraFeature) $j("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td><td>" + sendAt + "</td>");
				else $j("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td>");
				
				// Mogelijke tijden in 't vet
				if (looptijd.totalSeconds > resterendeLooptijd.totalSeconds) $j(this).css("font-weight", "bold");
				
				// Textvelden hernoemen
				if (user_data.incoming.hernoemInputTexbox)
				{
					var str = user_data.incoming.hernoemInputTexbox;
					var unit = $j(this).find("input:first").val();
					unit = unit.substr(0, unit.indexOf(","));
					var aanvalId = $j("input:eq(1)", this).parent().html();
					aanvalId = aanvalId.substr(aanvalId.lastIndexOf("id=") + 3);
					aanvalId = aanvalId.substr(0, aanvalId.indexOf("'"));
					//alert();
					
					str = str.replace("{dorp}", aanvallerDorpNaam).replace("{c}", aanvallerDorp.continent()).replace("{id}", aanvalId);
					str = str.replace("{player}", aanvaller).replace("{xy}", aanvallerDorp.coord).replace("{unit}", unit);
					str = str.replace("{fields}", fields);
					$j(this).find("input:first").val(str); 
				}
			});
			
			// nobles kan only walk so far
			var nobles = $j("tr:last", table);
			if (convertTime(nobles).totalSeconds / 60 > world_data.maxNobleWalkingTime)
			{
				nobles.find("td").css("text-decoration", "line-through");
			}
			
			// auto-show input textboxes
			$j("span:odd", table).show();
			$j("span:even", table).hide();
		});
		
		
		// TAGGER
		if (user_data.incoming.autoOpenTagger && $j("#labelText").text() == "Bevel")
			link.click();
			
		if (user_data.proStyle && user_data.incoming.villageBoxSize != null && user_data.incoming.villageBoxSize != false)
			$j("#content_value table:first").css("width", user_data.incoming.villageBoxSize);
	}
	else
	{
		// Eigen aanval/os/return
		var table = $j("#content_value");
		var type = $j("h2:first", table).text();
		var totalPop = 0;
		
		if (user_data.aanvalAutoRename)
		{
			var inputBox = $j("#editInput");
			var button = $j("input[value='OK']");
			
			var infoTable = $j("table.vis:first", table);
			var player = infoTable.find("td:eq(7) a").text();
			var village = getVillageFromCoords(infoTable.find("td:eq(9) a").text(), true);
			var second = infoTable.find("td:eq(13)").text();
			
			if (type.indexOf("Terugkeer") == 0) infoTable = $j("table.vis:last", table).prev().find("tr:last");
			else infoTable = $j("table.vis:last tr:last", table);
			
			var sent = "";
			var renamed = village.coord;
			$j.each(world_data.units, function(i, val) {
				var amount = $j("td:eq("+i+")", infoTable).text();
				if (amount != '0')
				{
					if (val == "snob")
							renamed += world_data.unitsName[val] + "!";
					else
						sent += ", " + world_data.unitsShortName[val] + "=" + amount;
					
					totalPop += amount * world_data.unitsPositionSize[i];
				}
			});
			
			if (player) renamed += ' (' + player + ')';
			// milisconden worden nu overal getoond in tw
			renamed += sent; // + ' (' + second.substr(second.lastIndexOf(':')) + ')';
			
			inputBox.val(renamed);
			button.click();
		}
		
		// Bij os uitrekenen hoeveel populatie
		if (type.indexOf("Ondersteuning") == 0)
		{
			var unitTable = $j("table.vis:last", table);
			unitTable.find("tr:first").append('<th width="50"><img src="graphic/face.png" title="Populatie" alt="" /></th>');
			unitTable.find("tr:last").append('<td>'+formatNumber(totalPop)+'</td>');
		}
	}
}





else if (location.href.indexOf('screen=info_') > -1 && location.href.indexOf('screen=info_member') == -1)
{
	// USERPROFIEL++ // INFO_ ALLY/PLAYER
	var tables = $j('table.vis');
	var infoTable = tables.first();
	var profile = user_data.profile;
	
	if (user_data.profile.show && (location.href.indexOf('screen=info_village') == -1 || user_data.showPlayerProfileOnVillage))
	{
		var screen;
		var id;
		var mapProfile = user_data.profile.mapLink;
		var isVillage = false;
		if (location.href.indexOf('screen=info_ally') == -1)
		{
			// speler en dorp info pagina
			// Extra links en info in tabel links boven
			screen = "player";
			if (user_data.proStyle) $j("#content_value td:first").css("width", "40%").next().css("width", "60%");
			if (location.href.indexOf('screen=info_player') > -1)
			{
				// speler info pagina
				id = infoTable.find("tr:eq(5) a").attr("href");
				id = id.substr(id.lastIndexOf("=") + 1);
			}
			else
			{
				// dorp info pagina
				isVillage = true;
				tables = $j("#content_value");
				infoTable = $j("table.vis:first", tables);
				id = infoTable.find("tr:eq(3) a").attr("href");
				id = id.substr(id.lastIndexOf("=") + 1);
				
				/*var tab = "<table><tr><td valign='top'>";
					tab += "<table class='vis' width='100%'>" + infoTable.html() + "</table>";
				tab += "</td><td valign='top' style='min-width:240px' width=240>";
					tab += "<table class='vis' width='100%'><tr><th colspan='2'>Profiel</th></tr></table>";
				tab += "</td></tr></table>";*/
				
				//alert(infoTable.size() + ": " + infoTable.html());
				//infoTable.replaceWith(tab);
				//tables = $j('table.vis');
				//infoTable = tables.first();
			}
			
			// Rechstreekse link naar TW Stats map
			if (profile.mapLink.show)
			{
				var link = "http://"+$j.game_data.market+".twstats.com/"+$j.game_data.world+"/index.php?page=map";
				var tribeId = infoTable.find("td:eq(7) a");
				if (tribeId.size() == 1)
				{
					tribeId = tribeId.attr("href");
					tribeId = tribeId.substr(tribeId.lastIndexOf('=') + 1);
				}
				else tribeId = 0;
				
				if (mapProfile.tribeColor != null)
				{
					link += "&tribe_0_id="+tribeId+"&tribe_0_colour="+mapProfile.tribeColor;
				}
				if (mapProfile.yourTribeColor != null && $j.game_data.player.ally_id != tribeId && $j.game_data.player.ally_id > 0)
				{
					link += "&tribe_1_id="+$j.game_data.player.ally_id+"&tribe_1_colour="+mapProfile.yourTribeColor;
				}
				link += "&player_0_id="+id+"&player_0_colour="+mapProfile.playerColor;
				link += "&grid="+(mapProfile.grid ? 1 : 0)+"&fill="+mapProfile.fill+"&zoom="+mapProfile.zoom+"&centrex="+mapProfile.centreX+"&centrey="+mapProfile.centreY;
				if (mapProfile.markedOnly) link += "&nocache=1";
				if (mapProfile.ownColor != null && $j.game_data.player.id != id)
				{
					link += "&player_1_id="+$j.game_data.player.id+"&player_1_colour="+mapProfile.ownColor;
				}
				infoTable.find("tr:last").after("<tr><td colspan=2><a href='"+link+"' target='_blank'>&raquo; TWStats Kaart</a> (Extern)</td></tr>");
			}
			
			if (!isVillage)
			{
				// Aantal dorpen
				if (user_data.proStyle)
				{
					// dorpnaam nooit op 2 lijnen
					var colWidth = $j("#content_value table:eq(2) th");
					colWidth.first().css("width", "98%");
					colWidth.eq(1).css("width", "1%");
					colWidth.eq(2).css("width", "1%");
				}
				
				infoTable.find("tr:eq(2)").after("<tr><td>Dorpen:</td><td>"+formatNumber(tables.eq(1).find("tr").size()-1)+"</td></tr>");
			}
		}
		else
		{
			screen = "tribe";
			id = infoTable.find("a");
			
			if (id.size() == 4) id = id.eq(2).attr("href");
			else id = id.eq(1).attr("href");			
			
			
			id = id.substr(id.lastIndexOf("/") + 1);
			
			var link = "http://"+$j.game_data.market+".twstats.com/"+$j.game_data.world+"/index.php?page=map";
			link += "&tribe_0_id="+id+"&tribe_0_colour="+mapProfile.tribeColor;
			link += "&centrex="+mapProfile.centreX+"&centrey="+mapProfile.centreY;
			if (mapProfile.yourTribeColor != null && $j.game_data.player.ally_id != id)
			{
				link += "&tribe_1_id="+$j.game_data.player.ally_id+"&tribe_1_colour="+mapProfile.yourTribeColor;
			}
			link += "&grid="+(mapProfile.grid ? 1 : 0)+"&fill="+mapProfile.fill+"&zoom="+mapProfile.zoom
			if (mapProfile.markedOnly) link += "&nocache=1";
			if (mapProfile.ownColor != null)
			{
				link += "&player_0_id="+$j.game_data.player.id+"&player_0_colour="+mapProfile.ownColor;
			}
			infoTable.find("tr:last").before("<tr><td colspan=2><a href='"+link+"' target='_blank'>&raquo; TWStats Kaart</a> (Extern)</td></tr>");
		}
		
		// Grafieken opbouwen
		var graphs = [["points", "Punten"], ["villages", "Dorpen"], ["od", "OD Totaal"], ["oda", "OD Aanval"], ["odd", "OD Verdediging"], ["rank", "Rang"]];
		if (screen == "tribe") graphs.push(["members", "Leden"]);
		var toShow = screen == "tribe" ? profile.stamGrafiek : profile.spelerGrafiek;
		
		var html = "";
		for (var i = 0; i < graphs.length; i++)
		{
			if (toShow[i][1])
			{
				var graphType = toShow[i][1] == 'big' ? 'ss' : '';
				html += createSpoiler(graphs[i][1], '<img src="http://'+$j.game_data.market+'.twstats.com/image.php?type='+screen+graphType+'graph&id='+id+'&s='+$j.game_data.world+'&graph='+graphs[i][0]+'">', toShow[i][2] != undefined);
			}
		}
		
		// Grafieken tonen
		if (html.length > 0)
		{
			var pictureTable;
			if (screen == 'player' || (isVillage && user_data.showPlayerProfileOnVillage))
			{
				pictureTable = tables.eq(2);
				if (isVillage || pictureTable.html() == null)
				{
					// Als er info noch persoonlijke tekst is
					pictureTable = $j("<table class='vis' width='100%'><tr><th colspan='2'>Profiel</th></tr></table>");
					$j("#content_value td:first").next().prepend(pictureTable);
				}
				else if (pictureTable.find("th").text() != "Profiel")
				{
					// Als er enkel de node "Persoonlijke info" is
					var temp = $j("<table class='vis' width='100%'><tr><th colspan='2'>Profiel</th></tr></table>");
					pictureTable.prepend(temp);
					pictureTable = temp;
				}
				
				if (pictureTable.find("td[colspan=2]").size() > 0)
				{
					pictureTable.find("td:last").attr("colspan", 1).css("width", 240).after("<td>"+html+"</td>");
				}
				else
				{
					pictureTable.find("tr:last").after("<tr><td colspan=2>"+html+"</td></tr>");
				}
			}
			else
			{
				tables.first().after("<table class=vis width='100%'><tr><th>Profiel</th></tr><tr><td>"+html+"</td></tr></table>");
			}
		}
		
		// Overnames (intern)
		if (profile.popup.show) // && !isVillage)
		{
			var twLink = 'http://'+$j.game_data.market+'.twstats.com/'+$j.game_data.world+'/index.php?page='+screen+'&mode=conquers&id='+id+'&pn=1&type=1&enemy=-1&enemyt=-1&min=&max=';
			var overnames = "<tr><td colspan=2><a href=\"\" id='overnames'>&raquo; Overnames</a> (Intern)</td></tr>";
			if (screen == 'tribe')
				infoTable.find("tr:last").before(overnames);
			else
				infoTable.find("tr:last").after(overnames);
			var popupWidth = profile.popup.width;
			var popupHeight = profile.popup.height;
			infoTable.after('<div class="messagepop pop" id="popup" style="display: none"><iframe src='+twLink+' width='+popupWidth+' height='+popupHeight+'></div>');
			$j("#popup").css({"left": ($j('window').width() - 60 - popupWidth), "top": 10, "background-color": "#FFFFFF", "border": "1px solid #999999", "position": "absolute", "width" : popupWidth, "height": popupHeight, "z-index": 50, "padding": "25px 25px 20px"});
			
			$j(function() {
	        $j("#overnames").live('click', function(event) {
	        		if ($j(this).hasClass('selected'))
	        			$j("#overnames").removeClass("selected");
	        		else
	            	$j(this).addClass("selected");
	            $j("#popup").css({"left": ($j(window).width() - 60 - popupWidth)}).toggle();
	            return false;
	        });
	
	        $j("#popup").live('click', function() {
	            $j("#popup").hide();
	            $j("#overnames").removeClass("selected");
	            return false;
	        });
	    });
		}
	}
	
	if (location.href.indexOf('screen=info_village') > -1 && user_data.proStyle && profile.moveClaim)
	{
		// move claim naar ergens waar het geen kwaad kan
		if ($j("td:eq(8)", infoTable).text() == "Geclaimd door:")
		{
			infoTable.append($j("tr:eq(5),tr:eq(6)", infoTable));
		}
	}
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=prod') > -1)
{
	// PRODUCTION OVERVIEW volle grondstoffen filteren
	var resTable = $j("#production_table");
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += " <input type=checkbox id=resFilter "+(user_data.resources.filterRows ? "checked" : "")+"> Filter ";
	menu += "&nbsp;<input type=button id=resOpslagFull value='Volle opslag'>&nbsp; &nbsp; ";
	menu += "<select id=resAmountType><option value=1>meer</option>";
	menu += "<option value=-1>minder</option></select>";
	menu += "<input type=text id=resAmount size=6 value="+user_data.resources.requiredResDefault+">";
	menu += " <input type=button class=resFilter value='Hout' resIndex=0><input type=button class=resFilter value='Leem' resIndex=1><input type=button class=resFilter value='IJzer' resIndex=2><input type=button class=resFilter value='Alle' resIndex=-1>";
	menu += " met <input type=checkbox id=resHandelaar "+(user_data.resources.filterHandelaar ? "checked" : "")+">";
	menu += "<input type=text id=resHandelaarAmount size=2 value="+user_data.resources.requiredHandelaar+"> Handelaren ";
	menu += "&nbsp; &nbsp; <input type=button id=resBBCode value='BB Codes'> <input type=checkbox id=resBBCodeImages> Gebruik IMG";
	menu += "</th></tr></table>";
	resTable.before(menu);
	
	$j("#resOpslagFull").click(function() {
		filterRes('full', $j("#resFilter").attr("checked"));
	});
	
	$j("#resBBCode").click(function() {
		var bbs = filterRes("bbcode", false);
		if ($j("#bbcodeArea").size() == 0)
			$j(this).after("<textarea id=bbcodeArea cols=50 rows=10 wrap=off>");
			
		$j("#bbcodeArea").val(bbs);
	});

	function filterRes(resourceIndex, hideRows)
	{
		var resCode = ["Hout:", "Leem:", "IJzer:"];
		var bbcodes = '';
		var goners = $j();
		var stayers = $j();
		var filterHandelaars = $j("#resHandelaar").attr("checked");
		var filterHandelaarsAmount = $j("#resHandelaarAmount").val() * 1;
		var minAmount = $j("#resAmount").val() * 1;
		var reverse = $j("#resAmountType").val() == "-1";
		var bbCodeImages = $j("#resBBCodeImages").attr("checked");
		var minDif = user_data.resources.bbcodeMinimumDiff;
		
		if (reverse) bbcodes = "Te weinig:\n";
		else bbcodes = "Teveel:\n";
	
		function doResource(resCell, resArray, resIndex, reverse, minAmount)
		{
			var resAmount = resArray[resIndex] * 1;
			if ((!reverse && resAmount > minAmount) || (reverse && resAmount < minAmount))
			{
				$j("span[title]:eq("+resIndex+")", resCell).css("font-weight", "bold")
				return false;
			}
			return true;
		}
		
		var hasNotes = $j("th:first", resTable).text() != "Dorp";
		resTable.find("tr:gt(0)").each(function() {
			var isOk = true;
			var resCell;
			if (hasNotes) resCell = $j(this).find("td:eq(3)");
			else resCell = $j(this).find("td:eq(2)");			
			var resources = $j.trim(resCell.text()).replace(/\./gi, "").split(" ");
			
			if (resourceIndex == 'bbcode')
			{
				// All resources
				var villageBBCode = '';
				for (var i = 0; i < 3; i++)
				{
					if ((!reverse && resources[i] - minDif > minAmount) || (reverse && resources[i] * 1 + minDif * 1 < minAmount))
					{
						if (bbCodeImages) villageBBCode += "[img]http://www.tribalwars.nl/graphic/" + world_data.resources[i] + ".png[/img] ";
						else villageBBCode += resCode[i] + " ";
						villageBBCode += parseInt(Math.abs(resources[i] - minAmount) / 1000) + "k ";
					}
				}
				if (villageBBCode.length > 0)
					bbcodes += "[village]" + getVillageFromCoords($j("td:first span:eq(1)", this).text()).coord + "[/village] " + villageBBCode + "\n";
			}
			else if (resourceIndex == 'full')
			{
				// Volle opslagplaatsen
				if ($j(".warn", this).size() > 0)
				{
					resCell.css("background-color", "#DED3B9");
					isOk = false;
				}
			}
			else
			{
				// One specific resource
				$j("span[title]", resCell).css("font-weight", "normal");
				
				if (resourceIndex == "-1")
				{
					isOk = isOk && !(doResource(resCell, resources, 0, reverse, minAmount) 
									| doResource(resCell, resources, 1, reverse, minAmount) 
									| doResource(resCell, resources, 2, reverse, minAmount));
				}
				else
				{
					isOk = isOk && doResource(resCell, resources, resourceIndex, reverse, minAmount);
				}

				if (!isOk)
					resCell.css("background-color", "#DED3B9");
				else
					resCell.css("background-color", "");
				
				if (filterHandelaars)
				{
					resCell = $j(this).find("td:eq(4)");
					if (hasNotes) resCell = resCell.next();
					var handelaren = resCell.text();
					handelaren = handelaren.substr(0, handelaren.indexOf("/"));
					if (handelaren < filterHandelaarsAmount)
					{
						resCell.css("background-color", "Tomato");
						isOk = false;
					}
					else
					{
						resCell.css("background-color", "");
					}
				}
			}
			
			if (hideRows && isOk)
			{
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val(""); // Dorphernoemen textbox leegmaken -> interactie met dorphernoem-script: gaat lege textboxen niet hernoemen
			}
			else if (!$j(this).is(":visible"))
			{
				stayers = stayers.add($j(this));
			}
		});
		stayers.show();
		goners.hide();
		return bbcodes;
	}
	
	$j(".resFilter").click(function() {
		filterRes($j(this).attr("resIndex"), $j("#resFilter").attr("checked"));
	});
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=buildings') > -1)
{
	// BUILDINGS OVERVIEW Alles niet conform highlighten
	var buildingTable = $j("#buildings_table");
	
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += "<input type=checkbox id=buildingOpti> Optimistisch ";
	menu += "<input type=button id=buildingHighlight value='Duiden'>";
	menu += "<input type=button id=buildingFilter value='Filteren'>";
	menu += "</th></tr></table>";
	buildingTable.before(menu);
	
	function filterBuildings(cellAction, hideRows)
	{
		var buildings = [];
		buildingTable.find("tr:first img").each(function(i, v) {
			buildings[i] = this.src.substr(this.src.lastIndexOf('/')+1);
			buildings[i] = buildings[i].substr(0, buildings[i].indexOf('.'));
		});
		
		var goners = $j();
		var opti = $j("#buildingOpti").attr("checked");
		buildingTable.find("tr:gt(0)").each(function() {
			var isOk = true;
			$j(this).find("td:gt(3)").each(function(i, v) {
				//alert($j(this).text() + ' for ' + buildings[i] + ' - i is ' + i);
				var range = user_data.buildings[buildings[i]];
				if (range != undefined)
				{
					var text = $j(this).text() * 1;
					if (text < range[0])
					{
						$j(this).css("background-color", "Tomato");
						isOk = false;
					}
					else if (text > range[1] && !opti)
					{
						$j(this).css("background-color", "Limegreen");
						isOk = false;
					}
					else
						$j(this).css("background-color", "");
				}
			});
			if (hideRows && isOk)
			{
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val("");
			}
		});
		goners.hide();
	}
	
	$j("#buildingHighlight").click(function() {
		filterBuildings(function(cell, isOk) {
			cell.css("background-color", isOk ? "" : "#DED3B9");
		}, false);
	});
		
	$j("#buildingFilter").click(function() {
		filterBuildings(function(cell, isOk) {
			cell.css("background-color", isOk ? "" : "#DED3B9");
		}, true);
	});
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=tech') > -1)
{
	// TECHS OVERVIEW Alles niet conform highlighten
	// SMEDERIJ OVERVIEW // SMITHY OVERVIEW
	if (world_data.smithyLevels)
	{
		var menu = "<table class='vis' width='100%'>";
		menu += "<tr><th>";
		menu += "<select id='groupType'>";
		$j.each(user_data.smithy, function(i, v) {
			menu += "<option value="+i+">"+v[0]+"</option>";
		});
		menu += "</select>";
		menu += "<input type=checkbox id=buildingOpti> Optimistisch ";
		menu += "<input type=button id=smithyHighlight value='Duiden'>";
		menu += "<input type=button id=smithyFilter value='Filteren'>";
		menu += "</th></tr></table>";
		$j("#techs_table").before(menu);
		
		function filterTechs(cellAction, hideRows)
		{
			var goners = $j();
			var opti = $j("#buildingOpti").attr("checked");
			var def = user_data.smithy[$j("#groupType").val()][1];
			$j("#techs_table").find("tr:gt(0)").each(function() {
				var isOk = true;
				$j(this).find("td:gt(2)").each(function(i, v) {
					var range = def[world_data.units[i]];
					if (i < world_data.units.length && range != undefined)
					{
						var text = $j(this).text() * 1;
						if (text == '') text = 0;
						if (text < range[0])
						{
							$j(this).css("background-color", "Tomato");
							isOk = false;
						}
						else if (text > range[1] && !opti)
						{
							$j(this).css("background-color", "Limegreen");
							isOk = false;
						}
						else
							$j(this).css("background-color", "");
					}
				});
				if (hideRows && isOk)
				{
					goners = goners.add($j(this));
					$j("input:first", $j(this)).val("");
				}
			});
			goners.hide();
		}
		
		$j("#smithyHighlight").click(function() {
			filterTechs(function(cell, isOk) {
				cell.css("background-color", isOk ? "" : "#DED3B9");
			}, false);
		});
			
		$j("#smithyFilter").click(function() {
			filterTechs(function(cell, isOk) {
				cell.css("background-color", isOk ? "" : "#DED3B9");
			}, true);
		});
	}
}






else if (location.href.indexOf('type=support_detail') > -1 && location.href.indexOf('screen=overview_villages') > -1)
{
	// SUPPORT OVERVIEW
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += "<input type=button id=defTotalen value='Totalen berekenen'>";
	menu += "&nbsp; <input type=button id=defRestack value='Stack BBCodes'>";
	menu += "</th></tr></table>";
	$j("#units_table").before(menu);
	
	$j("#defRestack").click(function() {
		if ($j("#defTotalen").attr("disabled") != true) $j("#defTotalen").click();
		
		var request = "";
		$j("#units_table tr.grandTotaal").each(function() {
			var totaal = $j("td:last", $j(this)).text().replace(/\./, '') * 1;
			if (user_data.restack.to - totaal > user_data.restack.requiredDifference)
			{
				var villageCoords = $j(this).attr("village");
				request += "[village]"+villageCoords+"[/village] (" + parseInt((user_data.restack.to - totaal) / 1000, 0) + "k)\n";
			}
		});
		
		$j(this).replaceWith("<textarea cols=50 rows=10>"+request+"</textarea>");
	});
	
	
	
	$j("#defTotalen").click(function() {
		$j(this).attr("disabled", true);
		var goners = $j();
		$j("#units_table").find("tr.units_away").each(function() {
			this.disabled = true;
			if ($j(this).next().hasClass("units_away") || $j(this).next().find("th").size() != 0)
			{
				// dorp zonder os
				goners = goners.add($j(this));
				$j("input:first", $j(this)).val("");
			}
			else
			{
				// totaal os berekenen
				var grandTotaal = 0;
				var totalen = [];
				var nextRow = $j(this).next();
				while (nextRow.hasClass("row_a") || nextRow.hasClass("row_b"))
				{
					var totaal = 0;
					$j("td:gt(0)", nextRow).each(function(i) {
						var cellContent = $j.trim($j(this).text());
						if (!(cellContent == '0' || i >= world_data.unitsPositionSize.length))
						{
							totaal += cellContent * world_data.unitsPositionSize[i];
							if (totalen[i] == undefined) totalen[i] = cellContent * world_data.unitsPositionSize[i];
							else totalen[i] += cellContent * world_data.unitsPositionSize[i];
						}
					});
					grandTotaal += totaal;
					if (world_data.calculateBoerderijLimiet && totaal > 30 * world_data.boerderijLimiet * user_data.acceptableOverstack)
						$j("td:eq("+(world_data.unitsPositionSize.length+1)+")", nextRow).html("<font color=red><b>" + formatNumber(totaal) + "</b></font>");
					else
						$j("td:eq("+(world_data.unitsPositionSize.length+1)+")", nextRow).text(formatNumber(totaal));
					
					nextRow = nextRow.next();
				}
				
				var troopCells = "";
				for (var i = 0; i < world_data.unitsPositionSize.length; i++)
				{
					if (totalen[i] !== undefined)
						troopCells += "<td>" + formatNumber(totalen[i]) + "</td>";
					else
						troopCells += "<td><span class=hidden>0</span></td>";
				}
				
				if (world_data.calculateBoerderijLimiet && grandTotaal > 30 * world_data.boerderijLimiet * user_data.acceptableOverstack)
					grandTotaal = "<font color=red><b>" + formatNumber(grandTotaal) + "</b></font>";
				else
					grandTotaal = "<b>" + formatNumber(grandTotaal) + "</b>";
				
				var villageCoord = getVillageFromCoords($j(this).find("td:first span[id*='label_']").text());
				nextRow.before("<tr class='row_a grandTotaal' village='"+villageCoord.coord+"'><th colspan=2>Totaal uit andere dorpen:</th>"+troopCells+"<td>"+grandTotaal+"</td></tr>");
			}
		});
		goners.hide();
	});
}







else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=commands') > -1)
{
	// COMMANDS OVERVIEW Aanvallen groeperen per dorp
	var menu = "";
	menu += "<table class=vis width='100%'>";
	menu += "<tr><th colspan="+(3+world_data.units.length)+">";
	if (location.href.indexOf('type=all') > -1)
	{
		menu += "<input type=button id=filterReturning value='Filter terugkeer'>&nbsp;";
	}
	menu += "<input type=checkbox id=sorterenSum checked> Somlijn ";
	var isSupport = location.href.indexOf('type=support') > -1;
	menu += "<input type=button id=sorteren value='Groeperen'>";
	menu += "</th></tr>";
	menu += "</table>";
	$j("#commands_table").prev().replaceWith(menu);
	
	// Terugkerende troepen filteren
	if (location.href.indexOf('type=all') > -1)
	{
		$j("#filterReturning").bind('click', function() {
			var newTable = "";
			$j("#commands_table").find("tr:gt(0)").each(function() {
				var firstCell = $j(this).children().first().html();
				if (firstCell.indexOf(">Terugkeer van ") == -1 && firstCell.indexOf(">Teruggestuurd door") == -1)
				{
					newTable += "<tr style='white-space:nowrap' class='nowrap row_"+($j(this).hasClass("row_a") ? "b" : "a")+"'>" + $j(this).html() + "<tr>";
				}
			});
			$j("#commands_table").replaceWith("<table id='commands_table' class='vis'>" + $j("#commands_table tr").first().html() + newTable + "</table>");
		});
	}
	
	
	// Binnenkomende aanvallen sorteren
	$j("#sorteren").bind('click', function() {
		var newTable = "";
		var targets = [];
		var aantalCommandos = 0;
		var som = user_data.commandSommatie && $j('#sorterenSum').attr('checked');
		$j("#filterReturning").attr("disabled", true);
		
		$j("#commands_table").find("tr:gt(0)").each(function() {
			var target = $j("span[id*='labelText']", this).text();
			var village = getVillageFromCoords(target);
			if (village.isValid)
			{
				aantalCommandos++;
				if (targets[village.coord] == undefined)
				{
						targets.push(village.coord);
						targets[village.coord] = new Array();
				}
				targets[village.coord].push($j(this));
			}
			});
			
		var mod = 0;
		if (isSupport)
		{
			$j.each(targets, function(i, v) {
				mod++;
				var aantal = 0;
				var totaalDef = new Array();
				totaalDef['pop'] = 0;
				$j.each(world_data.units, function(index, value) {totaalDef[value] = 0;});
				
				$j.each(targets[v], function(index, value) {
					newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
					aantal++;
					
					var unitAmounts = $j("td:gt(2)", value);
					$j.each(world_data.units, function(iUnit, vUnit) {
						var amount = unitAmounts.eq(iUnit).html() * 1;
						if (aantal == 1)
						{
							totaalDef[vUnit] = amount;
						}
						else
						{
							totaalDef[vUnit] += amount;
						}
						totaalDef['pop'] += amount * world_data.unitsSize['unit_'+vUnit];
					});
				});
					
				if (som)
				{
					newTable += "<tr><td align=right colspan=3><b>"+aantal+"x OS = " + formatNumber(totaalDef['pop']) + " pop&nbsp;</b></td>";
					$j.each(world_data.units, function(iUnit, vUnit) {
						newTable += "<td>" + (totaalDef[vUnit] == 0 ? "&nbsp;" : formatNumber(totaalDef[vUnit])) + "</td>";
					});
					newTable += "</tr>";
				}
			});
		}
		else
		{
			$j.each(targets, function(i, v) {
				mod++;
				var aantal = 0;
				var laatsteAankomst = '';
				$j.each(targets[v], function(index, value) {
					var huidigeAankomst = $j(value).find("td:eq(2)").text();
					if (laatsteAankomst == huidigeAankomst)
					{
						// Op zelfde seconde de aankomsttijd niet tonen
						newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>";
						$j(this).find("td").each(function(i) {
							if (i == 2) newTable += "<td>&nbsp;</td>";
							else if ($j(this).text() == 0) newTable += "<td class=hidden>0</td>";
							else newTable += "<td>" + $j(this).html() + "</td>";
						});
						newTable += "</tr>";
					}
					else
					{
						newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
					}
					laatsteAankomst = huidigeAankomst;
					aantal++;
				});
					
				if (som)
				{
					newTable += "<tr><td align=right colspan="+(3+world_data.units.length)+">"+aantal+"&nbsp;</td></tr>";
				}
			});			
		}
		
		var menu = $j("#commands_table tr").first().html();
		$j("#commands_table").html("<table id='commands_table' class='vis'>" + menu + newTable + "</table>");
		
		// Aantal aanvallen
		if ($j("#aantalAanvallen").size() == 0)
		{
			var pageSize = $j("input[name='page_size']");
			pageSize.parent().prev().text(isSupport ? "Ondersteunde dorpen" : "Aangevallen dorpen:");
			pageSize = pageSize.val(targets.length).parent().parent().parent();
			pageSize.append('<tr><th colspan=2 id="aantalAanvallen">' + (isSupport ? "Ondersteuningen" : "Aanvallen") + ':</th><td>' + aantalCommandos + '</td></tr>');
		}
	});
}






else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=incomings') > -1)
{
	// INCOMINGS OVERVIEW Aanvallen groeperen per dorp
	var menu = "";
	menu += "<table width='100%'>";
	menu += "<tr><td colspan=6 style=\"background-color: #dfcca6; font-weight: bold\">";
	menu += "<input type=button id=sorteren value='Dynamisch Groeperen'>";
	menu += "&nbsp;&nbsp; <input type=checkbox id=sorterenSum checked> Somlijn ";
	menu += "<input type=button id=sorterenSnel value='Snel Groeperen'>";
	menu += "<input type=button id=filterAanval value='Filter Nieuwe Aanvallen'>";
	menu += "</td></tr>";
	menu += "</table>";
	$j("#incomings_table").prev().replaceWith(menu);
	
	// Aantal aanvallen
	function showAantalAanvallen(aantalDorpen, aantalBevelen)
	{
		if ($j("#aantalAanvallen").size() == 0)
		{
			var pageSize = $j("input[name='page_size']");
			pageSize.parent().prev().text("Aangevallen dorpen:");
			pageSize = pageSize.val(aantalDorpen).parent().parent().parent();
			pageSize.append('<tr><th colspan=2 id="aantalAanvallen">Aanvallen:</th><td>' + aantalBevelen + '</td></tr>');
		}
	}
	
	// Binnenkomende aanvallen sorteren
	$j("#sorteren").bind('click', function() {
		this.disabled = true;
		$j("#sorterenSnel").attr("disabled", true);
		
		//builder.reset("DYNAMISCH START");
		var rows = $j("#incomings_table").find("tr:gt(0)").not("tr:last");
		rows.sortElements(function(a, b){
			a = getVillageFromCoords($j("td:eq(1)", a).text());
			b = getVillageFromCoords($j("td:eq(1)", b).text());
			
			return (a.x * 1000 + a.y) > (b.x * 1000 + b.y) ? 1 : -1;
		});
		
		//builder.add("YAYE");
		var aantalDorpen = "";
		var current = "";
		var mod = 0;
		rows.each(function() {
			var dorp = $j("td:eq(1)", this).text();
			if (current != dorp)
			{
				current = dorp;
				mod++
				aantalDorpen++;
			}
			var type = mod % 2 == 0 ? 'row_a' : 'row_b';
			this.className = type;
		});
		//builder.add("done");
		
		showAantalAanvallen(aantalDorpen, rows.size());
	});
	
	$j("#sorterenSnel").bind('click', function() {
		this.disabled = true;
		$j("#sorteren").attr("disabled", true);
		
		builder.reset("SNEL START");
		var newTable = "";
		var targets = [];
		var aantalCommandos = 0;
		var som = user_data.commandSommatie && $j('#sorterenSum').attr('checked');
		
		$j("#incomings_table").find("tr:gt(0)").each(function() {
			var target = $j("td:eq(1)", this).text();
			var village = getVillageFromCoords(target);
			if (village.isValid)
			{
				aantalCommandos++;
				if (targets[village.coord] == undefined)
				{
						targets.push(village.coord);
						targets[village.coord] = new Array();
				}
				targets[village.coord].push($j(this));
			}
			});
			
		//builder.add("ORDERED");
		var mod = 0;
		$j.each(targets, function(i, v) {
			mod++;
			var aantal = 0;
			$j.each(targets[v], function(index, value) {
				newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
				aantal++;
				});
				
			if (som)
			{
				newTable += "<tr><td align=right colspan=6>"+aantal+"&nbsp;</td></tr>";
			}
		});
		
		//builder.add("BUILT");
		var menu = $j("#incomings_table tr").first().html();
		$j("#incomings_table").html("<table id='incomings_table' class='vis'>" + menu + newTable + "</table>");
		//builder.add("REPLACED");
		
		showAantalAanvallen(targets.length, aantalCommandos);
	});
	
	$j("#filterAanval").bind('click', function() {
		var goners = $j();
		$j("#incomings_table tr:gt(0)").not("tr:last").each(function() {
			if ($j.trim($j("td:first", this).text()) != "Aanval")
				goners = goners.add($j(this));
		});
		goners.hide();
	});
}




else if (location.href.indexOf('screen=place') > -1 && $j("#attack_name").size() > 0)
{
	// RALLYPOINT CONFIRM
	// automatisch focus zetten op OK button bij aanvallen
	if (user_data.proStyle && user_data.autoAttackFocus)
	{
		$j("input[name='submit']").focus();
	}
	
	if (user_data.proStyle && user_data.replaceNachtbonus)
	{
		var nacht = $j("#contentContainer span.warn");
		if (nacht.size() == 1)
		{
			$j("#date_arrival").css("background-color", "tomato").css("font-weight", "bold");
			nacht.hide();
		}
		
		if (user_data.proStyle && user_data.replaceStamClaim)
		{
			var claim = $j("h3.error");
			if (claim.size() == 1)
			{
				claim.hide().prev().addClass("error").text(claim.prev().text() + " - " + claim.text());
			}
		}
		
		if (user_data.proStyle)
			$j("#content_value table:first").css("width", 500);
	}
	
	var attackFrame = $j("#content_value");
	$j("input[name='submit']", attackFrame).bind("click", function() {
		var infoTable = $j("table.vis:first td:odd", attackFrame);
		var doel = infoTable.first().text();
		
		// laatste aanval onthouden
		// op de confirmatie pagina zodat ongeldige doelen nooit de
		// laatste aanval kunnen worden
		var village = getVillageFromCoords(doel);
		if (village.isValid)
		{
			setCookie("lastVil", village.coord, 30);
		}
		
		if (user_data.aanvalAutoRename)
		{
			var sent = "";
			var isAttack = $j("input[name='attack']").val() == "true";
			
			var isBarbarian = infoTable.size() == 4;
			var speler = (isBarbarian ? '': infoTable.eq(1).text());
			//var duur = infoTable.eq(2).text();
			//var aankomst =infoTable.eq(3).text();
			//var aankomstSec = aankomst.substr(aankomst.lastIndexOf(':') + 1);
			//aankomstSec = aankomstSec.substr(0, aankomstSec.indexOf(' '));
			//var moraal = infoTable.eq(4).text();
		
			if (!isBarbarian) sent += ' (' + speler + ')';
			$j.each(world_data.units, function(i, val) {
				var amount = $j("input[name='"+val+"']", attackFrame).val() * 1;
				if (amount > 0)
				{
					if (val == "snob")
						sent = world_data.unitsName[val] + "!" + sent;
					else
					{
						//if (!isAttack || (val != 'sword' && val != 'spear'))
							sent += ", " + world_data.unitsShortName[val] + "=" + amount;
					}
				}
				});
			
			sent = $j("input[name='x']", attackFrame).val() + '|' + $j("input[name='y']", attackFrame).val() + " " + sent;
			sent = (isAttack ? "Aanval op " : "Ondersteuning voor ") + doel + "\\" + sent;
			
			var rand = Math.floor(Math.random() * 1000);
			setCookie("attRen" + rand, $j.game_data.village.id + '_' + sent, 10);
		}
	});
}





else if (location.href.indexOf('screen=market') > -1)
{
	// MARKET
	if (location.href.indexOf('try=confirm_send') > -1)
	{
		if (user_data.proStyle && user_data.autoMarketFocus)
			$j("input[type='submit']").focus();
	}
	else if (location.href.indexOf('&mode=') == -1 || location.href.indexOf('&mode=send') > -1)
	{
		if (location.href.indexOf('try=confirm_send') == -1)
		{
			// Spice up market:
			// 120 x 106 pixels: er is een market1, 2 en 3.jpg: Hierdoor blijft de OK knop op dezelfde plaats staan
			if (user_data.proStyle && user_data.marketResizeImage)
				$j("img[src^='graphic/big_buildings/market']").width(120).height(106);
			
			// New last village:
			$j("input[type='submit']").bind("click", function() {
				var village = getVillageFromCoords($j("#inputx").val()+"|"+$j("#inputy").val());
				if (village.isValid)
				{
					setCookie("lastVil", village.coord, 30);
				}
			});
			
			// Add last & doel
			var vilHome = getVillageFromCoords($j.game_data.village.coord);
			
			var targetLocation;
			targetLocation = $j("table.vis:eq(3)");
			var cookie = getCookie("lastVil");
			var coord = getVillageFromCoords(cookie);
			var htmlStr = '';
			if (coord.isValid)
			{
				var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, 'merchant');
				htmlStr = printCoord(coord, "&raquo; Laatste: "+coord.x+"|"+coord.y);
				htmlStr += "&nbsp; <span id=lastVilTime>" + dist.html + "</span>";
			}
			
			// doelwit erbij zetten
			var doel = getVillageFromCoords(getCookie('doelwit'));
			if (doel.isValid)
			{
				var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, 'merchant');
				if (htmlStr.length > 0) htmlStr += "<br>";
				htmlStr += printCoord(doel, "&raquo; Doel: "+doel.x+"|"+doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>";
			}
			
			if (htmlStr.length > 0)
				targetLocation.append("<tr><td colspan=2>" + htmlStr + "</td></tr>");
		
			
		
		
			// Calculate total resources sent
			var table = $j("table.vis:last");
			if (table.prev().text() == "Binnenkomende transporten")
			{
				var sent = {Leem: 0, Hout: 0, IJzer: 0};
				table.find("tr:gt(0)").each(function() {
					var cell = $j(this).find("td:eq(1)");
					var resources = cell.text() + " ";
					for (var i = 0; i < 3; i++)
					{
						var img = cell.find("img:eq("+i+")");
						if (img.size() == 1)
						{
							var resType = img.attr("title");
							sent[resType] += resources.substr(0, resources.indexOf(" ")).replace(".", "") * 1;
							resources = resources.substr(resources.indexOf(" ") + 1);
						}
					}
				});
				
				table.append("<tr><th>Totaal:</th><td colspan=3><img src=graphic/holz.png> "+formatNumber(sent.Hout)+"&nbsp; <img src=graphic/lehm.png> "+formatNumber(sent.Leem)+"&nbsp; <img src=graphic/eisen.png> "+formatNumber(sent.IJzer)+"</td></tr>");
			}
		}
	}
}




else if (location.href.indexOf('screen=place') > -1 && location.href.indexOf('mode=units') > -1)
{
	// RALLYPOINT UNITS THERE
	var vilHome = getVillageFromCoords($j.game_data.village.coord);
	var unitsTable = $j("table.vis");
	if ($j("#units_away").size() == 0) unitsTable = unitsTable.last();
	else
	{
		unitsTable = unitsTable.eq(unitsTable.size() - 2);
	}
	
	$j("tr:first", unitsTable).append('<th width="50"><img src="graphic/face.png" title="Populatie" alt="" /></th><th>Fields <input id=distanceSort type=button value="Sort"></th>');
	unitsTable.find("tr:gt(0)").each(function() {
		var pop = 0;
		var row = $j(this);
		
		$j.each(world_data.units, function(i, val) {			
			var amount = $j("td:eq("+(i+1)+"), th:eq("+(i+1)+")", row).text();
			if (amount != '0')
			{
				pop += amount * world_data.unitsPositionSize[i];
			}
		});
		
		var villageCoord = getVillageFromCoords(row.find("td:first").text());
		if (world_data.calculateBoerderijLimiet && pop > 30 * world_data.boerderijLimiet * user_data.acceptableOverstack)
			$j(this).append("<td align=right><font color=red><b>" + formatNumber(pop) + "</b></font></td><td>&nbsp;</td>");
		else
		{
			var extraColumns = '<td align=right>'+formatNumber(pop)+'</td>';
			if (!villageCoord.isValid) extraColumns += "<td align=right>&nbsp;</td>";
			else
			{
				var fields = parseInt(getDistance(vilHome.x, villageCoord.x, vilHome.y, villageCoord.y).fields);
				extraColumns += "<td align=right>" + fields + "</td>";
				$j(this).addClass("toSort").attr("fields", fields);
			}
			$j(this).append(extraColumns);
		}
	});
	
	$j("#distanceSort").click(function() {
		unitsTable.find("tr.toSort").sortElements(function(a, b){
		    return $j(a).attr("fields") * 1 > $j(b).attr("fields") * 1 ? 1 : -1;
			});
	});
}









else if (location.href.indexOf('screen=place') > -1)
{
	// RALLYPOINT PLACE Wider table
	if (user_data.rallyPointAttackBoxWidth != null && user_data.rallyPointAttackBoxWidth > 0)
	{
		var commandsTable = $j("h3:contains('Troepenbewegingen')");
		if (commandsTable.size() > 0)
		{
			commandsTable = commandsTable.next();
			$j("th[width='250']", commandsTable).attr("width", user_data.rallyPointAttackBoxWidth);
		}
	}
	
	// Auto rename attacks
	//setCookie("attRen", "", 0);
	if (user_data.aanvalAutoRename)
	{
		var cooks = document.cookie.split("; ");
		for (var x = 0; x < cooks.length; x++)
		{
			var cookie = cooks[x];
			if (cookie.indexOf("attRen") == 0)
			{
				var val = cookie.substr(cookie.indexOf("=") + 1);
				var thisVil = val.substr(0, val.indexOf('_'));
				val = val.substr(val.indexOf('_') + 1);
				var id = val.substr(0, val.indexOf("\\"));
				var msg = val.substr(val.indexOf("\\") + 1);
				
				if (id.length > 0 && thisVil == $j.game_data.village.id)
				{
					var rename = $j("input[value='" + id + "']");
					if (rename.size() > 0)
					{
						setCookie(cookie.substr(0, cookie.indexOf("=")), "", 0);
						rename.val(msg).next().click();
					}
				}
			}
		}
	}
	
	// Spice up rally point:	
	var vilHome = getVillageFromCoords($j.game_data.village.coord);
	var snelheidCookie = twSnelheidCookie();
	
	// snelheid kunnen wijzigen & tonen!
	$j("#units_form a img").bind("click", function() {
		var unit = this.src;
		unit = unit.substr(unit.lastIndexOf('/') + 1);
		unit = unit.substr(0, unit.lastIndexOf('.'))
		snelheidCookie = twSnelheidCookie(unit);
		$j("#units_form a img").css("border", "0px").filter("img[src*='"+unit+"']").css("border", "3px red solid");
		
		// lastvil
		var coord = getVillageFromCoords(getCookie("lastVil"));
		if (coord.isValid)
		{
			var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
			$j("#lastVilTime")[0].innerHTML = dist.html;
		}
		
		// doelvil
		coord = getVillageFromCoords(getCookie("doelwit"));
		if (coord.isValid)
		{
			dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
			$j("#doelVilTime")[0].innerHTML = dist.html;
		}
		
	}).filter("img[src*='"+snelheidCookie+"']").css("border", "3px red solid");
	
	var cookie = getCookie("lastVil");
	var coord = getVillageFromCoords(cookie);
	if (coord.isValid)
	{
		var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
		
		if (user_data.alternativeLastPosition)
		{
			var htmlStr = printCoord(coord, "&raquo;"+coord.x+"|"+coord.y);
			$j("#target_attack").parent().prev().append(htmlStr);
		}
		else
		{
			var htmlStr = printCoord(coord, "&raquo; Laatste: "+coord.x+"|"+coord.y);
			htmlStr += " &nbsp; <span id=lastVilTime>" + dist.html + "</span>";
			$j("#units_form").append(htmlStr);
		}
	}
	
	// doelwit erbij zetten
	var doel = getVillageFromCoords(getCookie('doelwit'));
	if (doel.isValid)
	{
		var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, snelheidCookie);
		$j("#units_form").append("<br>" + printCoord(doel, "&raquo; Doel: "+doel.x+"|"+doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>");
	}
	
	// Extra links bij "Alle troepen"
	var units = {};
	$j("#units_form .unitsInput").each(function()
	{
		
		var amount = $j(this).next().text().substr(1);
		units[this.name] = amount.replace(")", "") * 1;
	});
		
	function createRallyPointScript(linksVak, unitLoop, naam, min, checkFunction, tag)
	{
		send = {};
		$j.each(unitLoop, function(i, v) {
			//if (v == 'spy') alert(v + ' UNITS: ' + units[v] + ' >= MIN: ' + min);
			if (units[v] >= min)
			{
				
				send[v] = checkFunction(units[v], v, tag);
			}
			});
		linksVak.append("&nbsp; &nbsp;<a href='#' onclick='"+fillRallyPoint(send)+"; return false'>"+naam+"</a>");
	}
	
	var villageType = calcTroops(units);
	//alert("Def:" + totalDef + " - Off:" + totalOff);
	var linksVak = $j('#selectAllUnits').parent().attr("colspan", 4)
	
	// add fake attack
	var minFake = 0;
	if (world_data.hasMinFakeLimit)
	{
		minFake = getBuildingPoints();
		minFake *= world_data.minFake;
		minFake -= world_data.unitsSize['unit_ram'];
	}
	
	createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.fake, 0, function(amount, v, tag) { 
		// Temp code for award
		//if (v == 'light') return 1;
		//return 0;
		// Temp code for award
	
		if ((v == 'ram' || v == 'catapult') && !tag.rammed && amount > 0)
		{
			tag.rammed = true;
			return 1;
		}
		if (v == 'snob' || tag.toSend <= 0 || amount == 0) return 0;
		
		var farmSize = world_data.unitsSize['unit_'+v];
		if (amount * farmSize > tag.toSend) amount = Math.ceil(tag.toSend / farmSize);
		tag.toSend -= amount * farmSize;
		if (v == 'sword' && amount > 0)
		{
			tag.toSend++;
			amount--;
		}
		return amount;
	}, {toSend: minFake, rammed: false});
	
	$j.each(user_data.aanvalCustom, function(i, v)
	{
		if (v.active && villageType.isMatch(v.type))
		{
			if (v.required == undefined || units[v.required[0]] >= v.required[1])
			createRallyPointScript(linksVak, world_data.units, v.name, 0, function(amount, unitVal, tag)
			{ 
				//alert(v + ' - SEND:' + tag[v] + '; amount=' + amount + ';');
				var send = tag[unitVal];
				
				if (send != undefined && amount > 0)
				{
					if (send < 0)
					{
						send = amount + send;
						if (send < 0) send = 1;
					}
					if ((amount - send) * world_data.unitsSize['unit_'+unitVal] < tag.sendAlong) send = amount;
					if (send > 0)
					{
						$j.each(user_data.snobSupport, function(i, val) {
							if (unitVal == val.Unit && villageType.isMatch(val.VillageType)) 
								send -= Math.ceil(units.snob * (val.Population / world_data.unitsSize['unit_'+unitVal]));
						});
					}
					
					if (send > amount) return amount;
					if (send > 0) return send;
				}
				return 0;
			}, v);
		}
	});
	
	if (units.spy >= user_data.scoutVillage && user_data.aanvalScout != null && user_data.aanvalScout.length > 0)
	{
		$j.each(user_data.aanvalScout, function(i, v)
		{
			if (units.spy >= v)
				createRallyPointScript(linksVak, ["spy"], user_data.attackLinkNames.verkenner+v, 0, function(amount, v, tag) { 
					return tag;
				}, v);
		});
	}

	if (units.snob > 0 && user_data.aanvalEdel)
	{
		createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.edelMax, 0, function(amount, v, tag) { 
			if (v == 'snob') return 1;
			if (tag > 0)
			{
				var returned = null;
				$j.each(user_data.snobSupport, function(i, val) {
					if (v == val.Unit && villageType.isMatch(val.VillageType)) 
						returned = amount - Math.ceil((tag - 1) * (val.Population / world_data.unitsSize['unit_'+v]));
				});
				if (returned != null) return returned;
			}
			return amount;
		}, units.snob);
		
		if (units.snob > 1 || user_data.aanvalEdelTreinAltijdTonen)
			createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.edelMin, 0, function(amount, v, tag) { 
				if (v == 'snob') return 1;
				var returned = 0;
				$j.each(user_data.snobSupport, function(i, val) {
					if (v == val.Unit && villageType.isMatch(val.VillageType)) 
						returned = Math.ceil(1 * (val.Population / world_data.unitsSize['unit_'+v]));
				});
				return returned;
			});
	}
}

	
	builder.build();
	
	// Color resources
	resourceColoring();
	
	// Jump to custom position on the map
	mapJump();
	
	// links naar binnenkomde aanvallen aanpassen
	if (user_data.editAttackLink)
	{
		var incoming = $j("table.box:last");
		var incomingAttacks = $j("a[href$='subtype=attacks']", incoming);
		if (incomingAttacks.size() > 0)
		{
			incomingAttacks.attr("href", incomingAttacks.attr("href") + "&page=-1&group=0");
		}
		var incomingSupport = $j("a[href$='subtype=supports']", incoming);
		if (incomingSupport.size() > 0)
		{
			incomingSupport.attr("href", incomingSupport.attr("href") + "&page=-1&group=0");
		}
	}
}
};

function sangu_wait() {
	if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.game_data != 'undefined')
  {
  	//alert("firefox" + unsafeWindow + ":undef-?" + (unsafeWindow.game_data == undefined));
  	$j = unsafeWindow.jQuery;
  	$j.game_data = unsafeWindow.game_data;
  	$j.UI = unsafeWindow.UI;
  	$j.window = unsafeWindow.window;
  	$j.unsafeWindow = unsafeWindow;
  	sangu_ready($j);
  }
  else if (typeof jQuery != 'undefined')
  {
  	//alert("opera");
  	$j = jQuery;
  	$j.game_data = game_data;
  	$j.UI = UI;
  	$j.window = window;
  	sangu_ready($j);
  }
  else
  {
  	//alert("chrome");
  	/*var script = document.createElement("script");
	  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "jQuery.game_data = game_data;"
	    //script.textContent = "alert('chrome:'+jQuery);";
	    //script.textContent += "alert('world_data:'+game_data);";
	    script.textContent += " (" + sangu_ready.toString() + ")(jQuery);";
	    document.head.appendChild(script);
	  }, false);
	  document.head.appendChild(script);*/
  }
};
sangu_wait();