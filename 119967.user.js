// ==UserScript==
// @name					Sangu Package 2.1.7
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

function sangu_ready() {
var sangu_versie = "2.1.7";
var DEBUG = false;

/*
Message to Credo:
Nothing is so common as to imitate one's enemies, and to use their weapons. — Voltaire	   
*/

// User config
var user_data = {};
// Settings on a specific world
switch (game_data.world)
{
	case 'nl10':
		// Settings specific for w10 on nl server
		user_data.worldSpecific = {
			villageName: [], // dorpsnamen instellen
			favs: [ // favorite locations on the map
						{active: false, name: "fixedPosition1", x: 462, y: 647},
						{active: false, name: "fixedPosition2", x: 492, y: 652}
						],
			customPlaceLinks: // Extra links in the place:
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
						{active: false, type:'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0},
						{active: true, type:'off', name: 'farming', axe: 6900, light: 2900, sendAlong: 0}
						// use negative numbers to leave x units home
					]
			};
			break;
			
			
	case 'nl23':
		// Settings specific for w23 on nl server
		user_data.worldSpecific = {
				showPlayerProfileOnVillage: true,
				villageName: [],
				customPlaceLinks:
					[
						{active: false, type:'def', name: 'AlleDef', spear: 25000, heavy: 5000, archer: 25000, sendAlong: 0},
						{active: false, type:'def', name: 'HelftZc', spear: 4000, heavy: 1000, sendAlong: 500},
						{active: false, type:'off', name: 'Smart', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, ram: 5000, catapult: 5000, sendAlong: 0},
						{active: false, type:'off', name: 'Bijl', spear: 25000, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0},
						{active: false, type:'off', name: 'Zwaard', spear: 25000, sword: -10, axe: 25000, spy: 1, light: 5000, heavy: 5000, marcher: 5000, sendAlong: 0, required: ['sword', 1]},
						
						{active: true, type:'all', name: 'f-40', light: 40, spy: 1, sendAlong: 0, required: ['light', 40], ignoreNobles: true},
						{active: true, type:'all', name: 'f-60', light: 60, spy: 1, sendAlong: 0, required: ['light', 60], ignoreNobles: true},
						{active: true, type:'all', name: 'f-100', light: 100, spy: 1, sendAlong: 0, required: ['light', 100], ignoreNobles: true},
						{active: true, type:'all', name: 'f-150', light: 150, spy: 1, sendAlong: 0, required: ['light', 150], ignoreNobles: true},
						{active: true, type:'all', name: 'peek', spy: 10, sendAlong: 0, required: ['spy', 10]},
						{active: false, type:'def', name: 'HelftZw', spear: 5000, sword: 5000, sendAlong: 500},
						{active: false, type:'def', name: '3deZw', spear: 3300, sword: 3300, sendAlong: 0},
						{active: false, type:'def', name: '4deZw', spear: 2500, sword: 2500, sendAlong: 0}
					]
		};
		break;
			
			
}

// These settings are applied to all worlds
$.extend(user_data, {
	colors: 
		{
			error: "tomato",
			good: "limegreen"
		},
	gsStorageShow: true,	/* All pages: true/false: color the resources based on how much the storage place is filled */
	gsStorageBackground: ['Greenyellow', 'Chartreuse', 'Limegreen', 'Mediumseagreen', 'Forestgreen', 'Orange', 'Coral', 'Tomato', 'Orangered', 'Red'], /* All pages: Colors used for the previous setting. First is least filled, last is most filled storage place */
	overviewBlinkResources: true,	/* All pages: Blink the resources if the storage place is full */
	editAttackLink: true,	/* All pages: Edit the incoming attacks/support links: add "show all groups" and "show all pages" to the original links */
	colorOs: 'rgb(255, 245, 218)', /* Main village overview: give incoming support a different background color */
	villageName: [], /* Add village names to the village headquarters to quickly edit the village name to a preset name. Set to [] or null to disable, for 1 village name use ['MyVillageName'] or for more names: ['name1', 'name2', 'name3'] */
	villageNameClick: true,	/* true: one of the previous button clicked automatically changes the village name. false: only fills in the name in the textbox but does not click the button */
	calculateSnob: true,	/* nobles: calculates how many nobles can be produced immediately */
	reportPublish: ["own_units", "own_losses", "opp_units", "opp_losses", "carry"], /* Publishing report: automatically check the 'show' checkboxes */
	calculateFarmLimit: true,	/* Different pages: Calculate stacks based on the farm limit (only relevant for some worlds) */
	acceptableOverstack: 1.2,	/* Different pages: % of acceptable overstack */
	
	command: {	/* features for the own troops overview page */
		sumRow: true,	/* Add a totalrow between different villages */
	
		filterMinPopulation: 18000, /* Default number filled in to filter on village stack */
		filterMinDefaultType: 'axe', /* This unit type is by default selected in the filter dropdown */
		filterMinDefault: 6000, /* The default number filled in to filter on troop amounts */
		filterMin: {axe: 7000, spear: 3000, heavy: 500, catapult: 500, spy: 50, light: 2000, ram: 200, snob: 2}, /* Default filter numbers for the other units */
		filterMinOther: 5000, /* Use this number as the default when the unit is not present in filterMin */
		filterAutoSort: true /* Automatically sort the list on walking distance when entering a target village */
		},
	
	displayDays: false, /* true: display (walking)times in days when > 24 hours. false: always displays in hours */
	incoming:	/* Features for the built in TW tagger */
		{
			sortOnUnitSpeed: true,	/* sort the rows of the different units on speed (duh!) */
			autoOpenTagger: true,			/* Open the tagger automatically if the incoming attack has not yet been renamed */
			renameInputTexbox: "{unit} ({xy}) {player} F{fields}", /* Possibilities: {id}:internal tw attack id {unit}: short unitname {xy}: coordinates {player} {village}: full village name {c}: continent. Set to "" to disable. */
			villageBoxSize: 600				/* Adjust the width of the table with the village information (support for 2-click) */
		},
			
	mainTagger:
		{
			active: true,
			inputBoxWidth: 400,
			defaultDescription: "DONE",
			otherDescriptions: 
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
	
	villageInfo:
		{
			active: true,
			off_link: "&group=3093&unit=2&amount=7000&sort=true&changeSpeed=ram",
			def_link: "&group=3092&unit=0&amount=3000&sort=true&changeSpeed=spear"
		},
	
	resources:
		{
			requiredResDefault: 250000,
			requiredMerchants: 50,
			filterMerchants: true,
			filterRows: false,
			bbcodeMinimumDiff: 50000
		},
			
	favs: [],
	jumper:
		{
			enabled: true,
			left: 880,
			top: 196,
			daysActive: 100,
			width: 200,
			addTargetVillage: true,
			addLastVillage: true
		},
	
	proStyle: true,
	marketResizeImage: true,
	autoMarketFocus: true,

	scriptBarEditBoxCols: 700,
  scriptBarEditBoxRows: 12,
	
	attackAutoRename: true,
	rallyPointAttackBoxWidth: 600,
	autoAttackFocus: true,
	replaceNightBonus: true,
	replaceTribeClaim: true,
		
	scoutVillage: 100,
	scoutPlaceLinks: [5, 100, 500], 
	fakePlaceLink: true,
	noblePlaceLink: true,
	noblePlaceLinksForceShow: true,
	noblePlaceLinkDivideAddRam: false,
	nobleSupport: [{Population: 200, Unit: 'light', VillageType: 'off'}, {Population: 600, Unit: 'heavy', VillageType: 'def'}],
	attackLinkNames: {fake: 'Fake', scout: 'Ver', nobleMax: 'EdelEerst', nobleMin: 'EdelTrein', nobleDivide: 'EdelDivide'},

	customPlaceLinks:
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
		requiredDifference: 1000,
		fieldsDistanceFilterDefault: 30,
		filterReverse: true,
		sufficient: 65000
		},
	
	showPlayerProfileOnVillage: false,
	profile: {
		show: true,
		moveClaim: true,
		mapLink: {show: true, fill: '000000', zoom: '200', grid: true, playerColor: 'ffff00', tribeColor: '0000FF', centreX: 500, centreY: 500, ownColor: 'FFFFFF', markedOnly: true, yourTribeColor: "FF0000"},
		playerGraph: [["points", 'big', true], ["villages", 'big'], ["od", 'big'], ["oda", false], ["odd", false], ["rank", false]], // small / big / false
		tribeGraph: [["points", false], ["villages", 'big'], ["od", false], ["oda", false], ["odd", false], ["rank", false], ["members", 'big', true]],
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
		church: [0, 1],
		church_f: [0, 1],
		snob: [1, 3],
		smith: [20, 20], 
		place: [1, 1],
		statue: [0, 1],
		market: [10, 20], 
		wood: [30, 30], 
		stone: [30, 30], 
		iron: [30, 30], 
		farm: [30, 30], 
		storage: [30, 30], 
		hide: [0, 10], 
		wall: [20, 20]
		}
	});

if (user_data.worldSpecific != undefined)
{
	$.extend(user_data, user_data.worldSpecific);
	user_data.worldSpecific = null;
}

// Translations
var trans =
	{
		tw:
		{
			units:
				{
					names: {"spear": "Speer", "sword": "Zwaard", "archer": "Boog", "axe": "Bijl", "spy": "Verk", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel"},
					shortNames: {"spear": "Sp", "sword": "Zw", "archer": "Boog", "axe": "Bijl", "spy": "Ver", "light": "Lc", "marcher": "Bb", "heavy": "Zc", "ram": "Ram", "catapult": "Kata", "knight": "Ridder", "snob": "Edel"},
					militia: "Militia"
				},
			all:
				{
					today: "vandaag om",
					tomorrow: "morgen om",
					dateOn: "op",
					farm: "Boerderij",
					wood: "Hout",
					iron: "IJzer",
					stone: "Leem"
				},
			main:
				{
					toGraphicOverview: "naar het grafische dorpsoverzicht",
					units: "Eenheden",
					hideBuildingLevels: "Gebouwlevels uitschakelen"
				},
			command:
				{
					returnText: "Terugkeer",
					attack: "Aanval",
					support: "Ondersteuning",
					haul: "Buit:",
					returnFull : ">Terugkeer van ",
					sentBackBy: ">Teruggestuurd door",
					returnFrom: ">Terugtocht van"
				},
			incoming:
				{
					defaultCommandName: "Bevel"
				},
			place:
				{
					troopMovements: "Troepenbewegingen"
				},
			market:
				{
					incomingTransports: "Binnenkomende transporten"
				},
			profile:
				{
					title: "Profiel",
					claimedBy: "Geclaimd door:",
					awardsWon: "Behaalde awards"
				},
			overview:
				{
					village: "Dorp"
				}
		},
		sp:
			{
				all:
					{
						populationShort: "Pop",
						population: "Populatie",
						total: "Totaal",
						last: "Laatste",
						target: "Doel",
						targetEx: "Doelwit",
						more: "meer",
						less: "minder",
						all: "Alle",
						withText: "met",
						merchants: "Handelaren",
						tooMuch: "Teveel:",
						tooLittle: "Te weinig:",
						further: "verder",
						closer: "dichter"
					},
				tagger:
					{
						openButton: "Open Tagger",
						rename: "Herbenoemen",
						incomingTroops: "Binnenkomende troepen",
						arrival: "Aankomst",
						arrivalIn: "Aankomst in",
						sentNow: "Zojuist",
						sent1Minute: "1 minuut",
						sentMinutes: "minuten",
						sent1Hour: "1 uur",
						sentHours: "uren",
						sentOn: "Verstuurtijd",
						ago: "Geleden",
						tagIt: "Aanval Taggen",
						checkAllAttack: "Alle aanvallen aanvinken",
						checkAllSupport: "Alle ondersteuning aanvinken",
						checkAll: "Alles aanvinken",
						tagged: "Tagged!"
					},
				place:
					{
						distance: "Afstand",
						backOn: "Terug op",
						sort: "Sort"
					},
				jumper:
					{
						close: "sluiten",
						title: "Favorieten",
						goToMap: "Ga naar de kaart",
						xy: "XY:",
						name: "Naam:"
					},
				command:
					{
						homeTime: "Thuiskomst:"
					},
				tribalWars:
					{
						showStatistics: "Statistieken tonen"
					},
				overviews:
					{
						totalVillages: "Aantal dorpen:"
					},
				troopOverview:
					{
						removeVillage: "Dorp verwijderen",
						toThePlace: "Verzamelplaats",
						setTargetVillageButton: "OK",
						commandTitle: "Opdracht",
						selectUnitSpeed: "Selecteer {0} als traagste snelheid.",
						nightBonus: "Nacht?",
						village: "Dorp",
						filterTroops: "Filter",
						filterPopulation: "Filter populatie",
						calcStack: "Bereken stack",
						filterNoble: "Filter edels",
						filterUnderAttack: "Filter onder aanval",
						sort: "Sorteren",
						restack: "Stack BB Codes"
					},
				prodOverview:
					{
						filter: "Filter",
						filterFullGS: "Volle opslag",
						merchantTooltip: "Vink aan om handelaren te highlighten",
						merchantAmountTooltip: "Als de checkbox aangevinkt is worden dorpen met minder dan x handelaren in het rood gehighlight",
						bbCodes: "BB Codes",
						bbCodesInfo: "Gebruik IMG",
						filterTooltip: "Dorpen die niet aan de filtercriteria voldoen verbergen",
						filterTooltipReverse: "Dorpen die voldoen aan de filtercriteria highlighten",
						filterFullGSTooltip: "Dorpen waarbij niet minstens 1 van de grondstoffen vol is verbergen",
						filterFullGSTooltipReverse: "Dorpen waarbij minstens 1 van de grondstoffen vol is highlighten",
						filterAllTooltip: "Dorpen waarbij niet minstens 1 van de grondstoffen meer/minder dan x is verbergen",
						filterAllTooltipReverse: "Dorpen waarbij minstens 1 van de grondstoffen meer/minder dan x is highlighten",
						filter1Tooltip: "Dorpen waarbij er nier meer/minder dan x {0} is verbergen",
						filter1TooltipReverse: "Dorpen waarbij er meer/minder dan x {0} is highlighten"
					},
				buildOverview:
					{
						optimistic: "Optimistisch",
						mark: "Duiden",
						filter: "Filteren"
					},
				smithOverview:
					{
						optimistic: "Optimistisch",
						mark: "Duiden",
						filter: "Filteren"
					},
				defOverview:
					{
						stackButton: "Totalen berekenen",
						stackTooltip: "Totale stack en afstanden berekenen",
						stackFilter: "Filter op stack",
						stackFilterTooltip: "Filter dorpen met meer/minder dan x totale stack vanbuiten het dorp",
						village: "Dorp:",
						distFilter: "Filter op afstand",
						distFilterTooltip: "Filter alle dorpen die verder/dichter dan x velden liggen van dorp y",
						stackBBCodes: "Stack BBCodes",
						stackBBCodesTooltip: "Bepaal BB codes en aantal troepen voor een stack tot x populatie voor alle zichtbare dorpen",
						filterNoOs: "Zonder OS wegfilteren",
						filterNoOsTooltip: "Wegfilteren van alle dorpen waar geen ondersteuning meer zichtbaar is",
						extraFiltersSupport: "Ondersteunende dorpen filters:",
						extraFiltersDefense: "Ondersteuning filters:",
						extraFiltersReverse: "De filtering omdraaien",
						extraFiltersInfo: "Filters omdraaien",
						distFilter2: "Afstand filter",
						freeTextFilter: "Tekst filter",
						barbarianFilter: "Barbarendorpen",
						barbarianFilterTooltip: "Toon alle ondersteuningen naar barbarendorpen",
						nobleFilter: "Alle edel-ondersteuning tonen",
						nobleFilterRev: "Alle edel-ondersteuning wegfilteren",
						spyFilter: "Alle verkenner-ondersteuning tonen",
						spyFilterRev: "Alle verkenner-ondersteuning wegfilteren",
						attackFilter: "Alle aanval-ondersteuning tonen",
						attackFilterRev: "Alle aanval-ondersteuning wegfilteren",
						supportFilter: "Alle verdediging-ondersteuning tonen",
						supportFilterRev: "Alle verdediging-ondersteuning wegfilteren",
							
						/*otherPlayer
						otherPlayerFilter*/
						
						totalFromOtherVillages: "totaal uit andere dorpen",
						totalInOtherVillages: "totaal in andere dorpen",
						freeText: "Vrij tekstveld:",
						fieldsPrefix: "F",
						thousandSuffix: "k",
						totalVillages: "Dorpen ({0})",
						distanceToVillageNoneEntered: "Geef een coördinaat! (eerste tekstveld)",
						distanceToVillage: "Afstand tot {0}"
					},
				commands:
					{
						filterReturn: "Filter terugkeer",
						totalRows: "Somlijn",
						group: "Groeperen",
						totalRowsText: "{0}x OS = {1} pop",
						totalVillagesOS: "Ondersteunde dorpen:",
						totalVillagesAttack: "Aangevallen dorpen:",
						totalOS: "Ondersteuningen",
						totalAttack: "Aanvallen"
					},
				snob:
					{
						canProduce: "Je kan meteen produceren:"
					},
				profile:
					{
						twStatsMap: "TWStats Kaart",
						externalPage: "(Extern)",
						internalPage: "(Intern)",
						conquers: "Overnames",
						villages: "Dorpen:",
						graphPoints: "Punten",
						graphVillages: "Dorpen",
						graphOD: "OD Totaal",
						graphODD: "OD Verdediging",
						graphODA: "OD Aanval",
						graphRank: "Rang",
						graphMembers: "Leden"
					}
			}
	};
	
	

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

// Activate / deactivate the tool
var isSanguActive = getCookie("sanguActive") == "true";
if (location.href.indexOf('changeStatus=') > -1)
{
	isSanguActive = location.href.indexOf('changeStatus=true') > -1;
	setCookie("sanguActive", isSanguActive);
}

$("#storage").parent().after("<td class='icon-box' nowrap><a href="+location.href.replace("&changeStatus="+isSanguActive, "")+"&changeStatus="+(!isSanguActive)+"><img src='graphic/dots/"+(isSanguActive ? 'green' : 'red')+".png' title='Sangu package "+(!isSanguActive ? 'activeren' : 'deactiveren')+" (v"+sangu_versie+")' /></a>&nbsp;</td>");
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
$.extend(world_data, {
	nachtbonusFrom: 1,
	nachtbonusTill: 7,
	smithyLevels: true,
	hasChurch: false,
	hasArchers: false,
	hasKnight: false,
	hasMilitia: false,
	speed: 1,
	unitSpeed: 1,
	farmLimit: 0,
	minFake: 0,
	coins: false
	});

// Archer worlds:
world_data.number = game_data.world.substr(2) * 1;
switch(world_data.number)
{
	case 2: case 3: case 4: case 6: case 7: case 8: case 9:
	case 11: case 12: case 13: case 14: case 15: case 17:
	case 18: case 19: case 20: case 21: case 22: case 23: case 25:
		world_data.smithyLevels = false;
		world_data.hasArchers = true;
		world_data.hasKnight = true;
		world_data.coins = true;
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

if (isNaN(world_data.number))
{
	switch (game_data.world)
	{
		case 'nlc1':
			world_data.maxNobleWalkingTime = 2695;
			world_data.minFake = 0.02;
			break;
	}
}
else
switch(world_data.number)
{
	case 10:
		world_data.farmLimit = 1800;
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
		world_data.farmLimit = 1200;
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
		world_data.farmLimit = 2500;
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
		world_data.maxNobleWalkingTime = 7000;
		world_data.hasMilitia = true;
		break;
	
	case 22:
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		world_data.hasMilitia = true;
		break;
		
	case 23:
		world_data.speed = 1.5;
		world_data.unitSpeed = 0.66666666;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		world_data.hasMilitia = true;
		break;
		
	case 25:
		world_data.speed = 1.25;
		world_data.unitSpeed = 0.8;
		world_data.minFake = 0.02;
		world_data.maxNobleWalkingTime = 2695;
		world_data.hasMilitia = true;
}
world_data.calculateFarmLimit = true;
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
	$.extend(world_data.unitsSize, {"unit_archer": 1}, {"unit_marcher": 5}, {"unit_knight": 10});
	$.extend(world_data.unitsSpeed, {"unit_archer": 18}, {"unit_marcher": 10}, {"unit_knight": 10});
	world_data.units_off.push("marcher");
	world_data.units_def.push("archer");
	
	world_data.units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob"];
}

if (Math.round(world_data.speed * world_data.unitSpeed) != 1)
{
	var speedModifier = Math.round(world_data.speed * world_data.unitSpeed);
	$.each(world_data.unitsSpeed, function(index, value) {
		world_data.unitsSpeed[index] = world_data.unitsSpeed[index] / speedModifier;
		});
}

$.fn.sortElements = (function(){
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

/*$.fn.tableFilter = 
	function(filterStrategy, options)
	{
		var opts = $.extend({}, $.fn.tableFilter.defaults, options);
		var rowCount = 0;
		var goners = $();
		var rows = this.each(
			function()
			{
				var $this = $(this);
				if ($this.attr("distance") != undefined)
				{
					if (!opts.reverseFilter != !filterStrategy($this))
					{
						goners = goners.add($this);
					}
					else
					{
						rowCount++;
					}
				}
			});
		goners.hide();
		if (opts.rowCountDisplay.text != null) opts.rowCountDisplay.text(rowCount);
		
		return rows;
	};
	
$.fn.tableFilter.defaults = {reverseFilter: false, rowCountDisplay: null};*/

function formatNumber(nStr)
{
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
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
		if (game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][game_data.village.buildings[b[0]] * 1 - 1];
	}
	return totaal;
}

function getBuildingPoints()
{
	var totaal = 0;
	for (var building=0; building<world_data.buildingsPoints.length; building++)
	{
		var b = world_data.buildingsPoints[building];
		if (game_data.village.buildings[b[0]] * 1 > 0)
			totaal += b[1][game_data.village.buildings[b[0]] * 1 - 1];
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

function twDateFormat(dat, alwaysPrintFullDate, addYear)
{
	var day = dat.getDate();
	var cur = new Date().getDate();
	
	if (!alwaysPrintFullDate && day == cur)
		return trans.tw.all.today + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	else if (!alwaysPrintFullDate && day == cur + 1)
		return trans.tw.all.tomorrow + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	else if (addYear)
		return trans.tw.all.dateOn + " " + dat.getDate() + "." + pad(dat.getMonth()+1, 2) + "." + (dat.getFullYear()+'').substr(2) + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
	else
		return trans.tw.all.dateOn + " " + dat.getDate() + "." + pad(dat.getMonth()+1, 2) + ". " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
}

function getDateFromTW(str, isTimeOnly)
{
	//13.02.11 17:51:31
	if (isTimeOnly)
	{
		var timeParts = str.split(":");
		var seconds = timeParts[2];
		var val = new Date();
		val.setHours(timeParts[0]);
		val.setMinutes(timeParts[1]);
		if (seconds.length > 2)
		{
			var temp = seconds.split(".");
			val.setSeconds(temp[0]);
			val.setMilliseconds(temp[1]);
		}
		else
		{
			val.setSeconds(seconds);
		}
		return val;
	}
	else
	{
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
}

function getDistance(x1, x2, y1, y2, snelheid)
{
	var dist = {};
	dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	dist.travelTime = dist.fields * (snelheid == '' ? world_data.unitsSpeed.unit_ram : world_data.unitsSpeed['unit_'+snelheid]);
	//dist.arrivalTime = new Date();
	dist.arrivalTime = getDateFromTW($("#serverTime").text(), true);
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
	var storage = $("#storage").text() * 1;
	var wood = $("#wood");
	var iron = $("#iron");
	var stone = $("#stone");
	//alert(wood.text() + " - " + stone.text() + " - " + iron.text());
	
	// Color resources
	if (user_data.gsStorageShow)
	{
		wood.add(iron).add(stone).each(function() {
			var x = parseInt(this.innerHTML / storage * 10 - 1);
			$(this).css("background-color", user_data.gsStorageBackground[x]);
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
	$.each(world_data.units, function(i, v) {
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

function buildAttackString(villageCoord, unitsSent, player, isOs)
{
	var totalPop = 0;
	var renamed = villageCoord + " ";
	var sent = "";
	$.each(world_data.units, function(i, val) {
		var amount = unitsSent[val];
		if (amount != 0)
		{
			if (val == "snob")
				renamed += trans.tw.units.names[val] + "! ";
			else
				sent += ", " + trans.tw.units.shortNames[val] + "=" + amount;
			
			totalPop += amount * world_data.unitsPositionSize[i];
		}
	});
	
	if (player) renamed += '(' + player + ') ';
	if (sent.length > 2) sent = sent.substr(2);
	
	if (isOs)
	{
		sent += " ("+trans.sp.all.populationShort+": " + formatNumber(totalPop) + ")";
	}
	
	return renamed + sent;
}

function calcTroops(units)
{
	// units is an array of numbers; keys are the unit names
	var x = {};
	x.totalDef = 0;
	$.each(world_data.units_def, function (i, v) { x.totalDef += units[v] * world_data.unitsSize['unit_'+v]; });
	x.totalOff = 0;
	$.each(world_data.units_off, function (i, v) { x.totalOff += units[v] * world_data.unitsSize['unit_'+v]; });
	//x.totalOff -= units.spy * world_data.unitsSize['unit_spy'];
	
	x.isDef = x.totalDef > x.totalOff;
	//alert((units.spy * world_data.unitsSize['unit_spy']) + " > " + x.totalDef +"+"+ x.totalOff);
	x.isScout = units.spy * world_data.unitsSize['unit_spy'] > x.totalDef + x.totalOff;
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
	  	cell += trans.sp.jumper.name + " <input type= type=text size=6 id=sangujumperName style='height: 16px; border: 0; top: -2px; position: relative'> ";
	  	cell += trans.sp.jumper.xy + " ";
	  }
		cell += "<input type=text type=text size=6 id=sangujumper style='height: 16px; border: 0; top: -2px; position: relative'>";
		cell += "</span>";
		cell += "&nbsp;<span class='icon ally internal_forum' title='"+trans.sp.jumper.goToMap+"' id=sangujumperOpen></span>";
		$("#menu_row2").append("<td>"+cell+"</td>"); 
		
		var favorieten = "";
		if (user_data.favs)
			$.each(user_data.favs, function(i, v) {
				if (v.active)
					favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(v.name, v.x, v.y) + "</td></tr>";
			});
		
		var cookie = getCookie("jumpers" + game_data.world).split(",");
		if (cookie.length > 1)
		for (i = 0; i < cookie.length; i += 2)
		{
			x = cookie[i + 1].substr(0, cookie[i + 1].indexOf("|"));
			y = cookie[i + 1].substr(cookie[i + 1].indexOf("|") + 1);
			favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(cookie[i], x, y) + "&nbsp;<a href=# class=jumperdelete jumpname="+cookie[i]+">X</a></td></tr>";
		}
		
		if (user_data.jumper.addTargetVillage)
		{
			var doel = getVillageFromCoords(getCookie('doelwit'));
			if (doel.isValid)
			{
				favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(trans.sp.all.target, doel.x, doel.y) + "</td></tr>";
			}
		}
		
		if (user_data.jumper.addLastVillage)
		{
			var doel = getVillageFromCoords(getCookie('lastVil'));
			if (doel.isValid)
			{
				favorieten += "<tr><td align=left colspan=2>" + createMapJumpLink(trans.sp.all.last, doel.x, doel.y) + "</td></tr>";
			}
		}

		
		if (location.href.indexOf("screen=map") == -1)
		{
			var newfavorieten = ""; //"<div id=sangujumperpos style='display: none; background-image: url(\"http://nl10.tribalwars.nl/graphic/background/content.jpg\"); width: "+(user_data.jumper.width)+"px; border: 1px solid black'>";
			newfavorieten += "<table id=sangujumperpos style='display: none; background-image: url(\"http://nl10.tribalwars.nl/graphic/background/content.jpg\"); border: 1px solid black' width="+user_data.jumper.width+" cellspacing=0 cellpadding=0>";
			newfavorieten += "<tr style='background-color: #dfcca6'><td><b>"+trans.sp.jumper.title+"</b></td><td align=right><a href=# id=sangujumperclose>"+trans.sp.jumper.close+"</a></td></tr>";
			newfavorieten += favorieten;
			newfavorieten += "</table>";
			
			$("#header_info").prepend(newfavorieten);
			
			$("#sangujumperclose").click(function() {
				$("#sangujumperpos").hide();
			});
		}
		else
		{
			$("#inputx").parent().parent().parent().append("<tr><th colspan=2>"+trans.sp.jumper.title+"</th></tr>" + favorieten);
		}
		
		$(".sangujumperlink").click(function() {
			var link = $(this);
			$("#sangujumper").val(link.attr("coordx") + "|" + link.attr("coordy"));
			$("#sangujumperOpen").click();
			return false;
		});
		
		$(".jumperdelete").click(function() {
			var toDelete = $(this).attr("jumpname");
			
			var cookie = getCookie("jumpers" + game_data.world).split(",");
			var nieuweCookie = "";
			for (i = 0; i < cookie.length; i += 2)
			{
				if (cookie[i] != toDelete)
					nieuweCookie += "," + cookie[i] + "," + cookie[i + 1];
			}
			$(this).parent().parent().remove();
			setCookie("jumpers" + game_data.world, nieuweCookie.length > 0 ? nieuweCookie.substr(1) : "", 60 * 24 * user_data.jumper.daysActive);
		});

		$("#sangujumperOpen").click(function() {
			var input = $("#sangujumper");
			if ($("#sanguJumperFrame").is(":visible"))
			{
				var village = getVillageFromCoords(input.val(), true);
				if (village.isValid)
				{
					if (location.href.indexOf("screen=map") > -1 && $("#sangujumperName").val() != "")
					{
						// Nieuwe favoriet toevoegen
						var name = $("#sangujumperName").val();
						
						var cookiefav = name + ',' + village.coord;
						var bestaand = getCookie("jumpers" + game_data.world);
						if (bestaand.length > 0) cookiefav += "," + bestaand;
						setCookie("jumpers" + game_data.world, cookiefav, 60 * 24 * user_data.jumper.daysActive);
					}
					
					if (location.href.indexOf("screen=map") == -1)
					{
						var position = $("#sangujumperpos").offset();
						setCookie("jumperLeft", position.left, 60 * 24 * user_data.jumper.daysActive);
						setCookie("jumperTop", position.top, 60 * 24 * user_data.jumper.daysActive);
					}
					
					// Naar de map springen
					location.href = location.href.substr(0, location.href.indexOf("&screen")) + "&screen=map&x="+village.x+"&y="+village.y;
				}
				else
				{
					// Foutieve coordinaten ingevuld
					if (!$("#sangujumperpos").is(":visible"))
					{
						$("#sangujumperpos").show();
						input.css("border", "1px solid red");
					}
					else $("#sangujumperpos").hide();
				}
			}
			else
			{
				// mapJumper activeren
				var favs = $("#sangujumperpos");
				var left = getCookie("jumperLeft");
				var top = getCookie("jumperTop");
				if (!left)
				{
					left = user_data.jumper.left;
					top = user_data.jumper.top;
				}
				
			  favs.css( { "left": left + "px", "top": top + "px", "position": "absolute", "z-index": 99999999 } );
			  UI.Draggable(favs);

				var input = $("#sangujumper");
				if (input.val() == "")
				{
					$("#sanguJumperFrame").add(favs).fadeIn();
					//input.focus();
				}
				else
				{
					$("#sanguJumperFrame").show();
					$("#sangujumperOpen").click();
				}
			}
		});
	}
}

function q(what) { alert(what == undefined ? "yaye" : what); }

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
			$("#content_value").prepend("<textarea cols=50 rows=20 id=textBuilder>" + this.log + "</textarea>");
			this.box = $("#textBuilder");
		}
	};
	builder.reset = function(text) { this.watch.reset(); this.add("------------\n", true); this.add(text); };
	return builder;
}

function getStackColor(totaalFarm, farmSize)
{
	// acceptableOverstack
	if (totaalFarm > farmSize * 1.35)
		return user_data.colors.error;
	else if (totaalFarm > farmSize * 1.2)
		return "Mediumseagreen";
	else if (totaalFarm > 24000)
		return "#DED3B9";
			
		return "transparant";
}
var builder = getTextBuilder(DEBUG);

if (location.href.indexOf('screen=overview') > -1 && location.href.indexOf('screen=overview_villages') == -1)
{
	// MAIN VILLAGE OVERVIEW Boerderij regel
	if (world_data.calculateFarmLimit && world_data.farmLimit > 0)
	{
		var content_value = $("#content_value");
		var isClassicOverview = $("a:contains('"+trans.tw.main.toGraphicOverview+"')", content_value).size() > 0;
		
		var farmSize = game_data.village.buildings.farm * world_data.farmLimit;
		var totaalFarm = 0;
		
		var unitCells = $("table.vis tr th:contains('"+trans.tw.main.units+"')", content_value).parent().siblings().not(":has(a)").each(function() {
			var unit = $('img', this)[0].src;
			unit = unit.substr(unit.lastIndexOf('/') + 1);
			var unitsSize = world_data.unitsSize[unit.substr(0, unit.lastIndexOf('.'))];
			var unitAantal = $('strong', this)[0].innerHTML;
			totaalFarm += unitsSize * unitAantal;
			});
			
		var percentage;
		if (isClassicOverview)
		{
			//cell = $("td[width=240]:has(img[src*=farm.png])", content_value).next();
			cell = $("#order_level_farm").parent().next();
			percentage = cell.children().html();
			percentage = percentage.substr(0, percentage.indexOf('%') + 1);
			cell.html('<b>' + formatNumber(totaalFarm) + ' / ' + formatNumber(farmSize) + ' (' + percentage + ')</b>');
			//if (totaalFarm > farmSize * user_data.acceptableOverstack)
			//	cell.css("background-color", "#DED3B9");
			//alert(totaalFarm + ">" + farmSize + "*" + user_data.acceptableOverstack + "=" + (farmSize * 1.2));
			
			cell.css("background-color", getStackColor(totaalFarm, farmSize));
		}
		else
		{
			percentage = $("#l_farm strong").first().html();
			cell = $('<tr><td style="background-color: '+getStackColor(totaalFarm, farmSize)+'">' + '<b>'+trans.tw.all.farm+': ' + formatNumber(totaalFarm) + ' / ' + formatNumber(farmSize) + ' (' + percentage + ')</b>' + '</td></tr>');		
			unitCells.parent().append(cell);
		}
	}
		
	// Binnenkomende/uitgaande aanvallen
	var mainTable = $("#content_value table:first");
	var incomingTable = $("#troops_incoming");
	var outgoingTable = $("#troops_outgoing");
	if (incomingTable.size() == 1 || outgoingTable.size() == 1)
	{
		if (incomingTable.size() == 1)
		{
			// Kleuren van os
			if (user_data.colorOs != null && user_data.colorOs != false)
			{
				var incomingOs = $("form", incomingTable);
				if (incomingOs.size() > 0)
				{
					$("img[src='graphic/command/support.png?1']", incomingOs).parent().css("background-color", user_data.colorOs);
				}
			}
			
			// tagger
			if (user_data.mainTagger.inputBoxWidth != null) $("input[type='button']", incomingTable).prev().width(user_data.mainTagger.inputBoxWidth);
			if (user_data.mainTagger.active)
			{
				$("th:first", incomingTable).append("<input type=button value='"+trans.sp.tagger.openButton+"' id=openTaggerButton>");
				$("#openTaggerButton").click(
					function()
					{
						$(this).hide();
						var rows = $("table:first tr", incomingTable);
						var prefixCheckbox = "<input type=checkbox id=prefixInput>";
						incomingTable.find("tbody:first").prepend("<tr><td>&nbsp;</td><th colspan=4>"+prefixCheckbox+"<input type=textbox doPrefix='false' size=30 id=bevelInput value='"+user_data.mainTagger.defaultDescription+"'></td></tr>");
						$("#prefixInput").change(function() { $("#bevelInput").attr("doPrefix", $(this).attr("checked")); });
						
						var buttonParent = $("#bevelInput").parent();
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
								button.click();
							}
						}
						
						// std button
						var button = $("<input type=button value='"+trans.sp.tagger.rename+"'>").click(
							function()
							{
								var tagName = $("#bevelInput").val();
								var prefix = $("#bevelInput").attr("doPrefix");
								$("input.taggerCheckbox", incomingTable).each(
									function()
									{
										renameCommand($(this), tagName, prefix);
									});
								
							});
						buttonParent.append(button);
						//buttonParent.append("<br>");
						
						if (user_data.mainTagger.otherDescriptions	!= null && user_data.mainTagger.otherDescriptions != false)
						{
							// custom buttons
							$.each(user_data.mainTagger.otherDescriptions,
									function(index, val)
									{
										var button = $("<input type=button doPrefix='"+ val.prefix +"' value='"+val.name+"'>").click(
											function()
											{
												// Cannot use input:checked : this works for Firefox but there is a bug in Opera
												var tagName = $(this).attr("value");
												var prefix = $(this).attr("doPrefix");
												$("input.taggerCheckbox", incomingTable).each(
													function()
													{
														renameCommand($(this), tagName, prefix);
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
									header += '<img src="graphic/command/attack.png?1" alt="" id="checkAttack" title="'+trans.sp.tagger.checkAllAttack+'" />';
									header += "&nbsp;";
									header += '<img src="graphic/command/support.png?1" alt="" id="checkSupport" title="'+trans.sp.tagger.checkAllAttack+'" />';
									header += "</td>";
									
									$(row).replaceWith("<tr>" + header + "<th width='78%'>"+trans.sp.tagger.incomingTroops+"</th><th width='30%'>"+trans.sp.tagger.arrival+"</th><th width='10%'>"+trans.sp.tagger.arrival+"</th><th width='1%'>&nbsp;</th>" + "</tr>");
									
									// checkbox manipulation
									$("#checkAttack").click(
										function() 
										{
											$("input.incOs", incomingTable).attr("checked", "");
											$("input.incAt", incomingTable).attr("checked", "checked");
										});
										
									$("#checkSupport").click(
										function() 
										{
											$("input.incOs", incomingTable).attr("checked", "checked");
											$("input.incAt", incomingTable).attr("checked", "");
										});
								}
								else
								{
									// incoming rows
									if (rowIndex == lastRowIndex - 1)
									{
										$(row).prepend("<td><input type=checkbox id=checkAll title='"+trans.sp.tagger.checkAll+"'></td>");
										$("#checkAll").change(
											function()
											{
												var isChecked = $(this).attr("checked");
												$("input.incOs", incomingTable).add($("input.incAt", incomingTable)).attr("checked", isChecked);
											});
									}
									else
									{
										var checkboxCell = "<td><input type=checkbox class='taggerCheckbox ";
										var incomingType = $("img[src='graphic/command/support.png?1']", this).size() == 1 ? 'incOs' : "incAt";
										checkboxCell += incomingType+"'";
										if (rowIndex == 1) checkboxCell += " id=checkFirst";
										
										// Automatisch aanvinken?
										if (incomingType == "incAt")
										{
											var isDefaultDesc = false;
											var currentDesc = $("span:first span:first", this).text();
											
											if (user_data.mainTagger.defaultDescription == currentDesc) isDefaultDesc = true;
											else if (user_data.mainTagger.otherDescriptions	!= null && user_data.mainTagger.otherDescriptions != false)
												$.each(user_data.mainTagger.otherDescriptions,
													function(index, val)
													{
														if (val.name == currentDesc || user_data.mainTagger.prefix + val.name == currentDesc) isDefaultDesc = true;
													});
											
											if (!isDefaultDesc)
											{
												checkboxCell += " checked=true";
												if (user_data.mainTagger.autoOpenCommands)
												{
													$("span:first", row).hide().next().show();
												}
											}
										}
										
										$(row).prepend(checkboxCell + "></td>");
									}
								}
							});
					});
			}
		}
		
		var newLayout = "<tbody><tr><td colspan=2><div class='outerBorder' id=myprettynewcell>";
		newLayout += "</div></td></tr></tbody>";
		mainTable.append(newLayout);
		var prettyCell = $("#myprettynewcell");
		if ($("td:eq(1)", mainTable).text() == trans.tw.main.hideBuildingLevels)
		{
			// graphical overview
			prettyCell.append($("td:first div.outerBorder", mainTable));
		}
		else
		{
			// classic overview
			prettyCell.append($("td:first div.outerBorder:gt(0)", mainTable));
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
		$.each(world_data.units, function(i, v) {
			box += "<option value="+i+(v == select ? " selected": "")+">" + trans.tw.units.names[v] + "</option>";
		});
		box += "</select>";
		return box;
	}
	
	var menu = "";
	menu += "<tr>";
	menu += "<th colspan="+(4+world_data.units.length+(world_data.hasMilitia ? 1 : 0))+">";
	menu += "<input type=text size=5 id=filterAxeValue value='"+user_data.command.filterMinDefault+"'>";
	menu += makeUnitBox("filterAxeType", user_data.command.filterMinDefaultType);
	menu += "<input type=button id=filterAxe value='"+trans.sp.troopOverview.filterTroops+"'> &nbsp;";
	menu += "<select id=filterPopValueType><option value=1>"+trans.sp.all.more+"</option>";
	menu += "<option value=-1>"+trans.sp.all.less+"</option></select>";
	menu += "<input type=text size=5 id=filterPopValue value='"+user_data.command.filterMinPopulation+"'><input type=button id=filterPop value='"+trans.sp.troopOverview.filterPopulation+"'> &nbsp; ";
	menu += "<input type=button id=calculateStack value='"+trans.sp.troopOverview.calcStack+"'> &nbsp; ";
	menu += "<input type=button id=edelFilter value='"+trans.sp.troopOverview.filterNoble+"'> &nbsp; ";
	menu += "<input type=button id=aanvalFilter value='"+trans.sp.troopOverview.filterUnderAttack+"'> &nbsp; ";
	menu += "<input type=checkbox id=sorteer " + (user_data.command.filterAutoSort ? " checked" : "") + "> "+trans.sp.troopOverview.sort+" &nbsp; ";
	
	if (location.href.indexOf('type=there') > -1) menu += "<input type=button id=defRestack value='"+trans.sp.troopOverview.restack+"'>";
	menu += "</th></tr><tr id=units_table_header>";
	menu += "<th>"+trans.sp.troopOverview.village+"</th>";
	menu += "<th>"+trans.sp.troopOverview.nightBonus+"</th>";
	$.each(world_data.units, function(i, v) {
		menu += "<th><img src='/graphic/unit/unit_" + v + ".png?1' title='"+trans.sp.troopOverview.selectUnitSpeed.replace("{0}", trans.tw.units.names[v])+"' alt='' id="+v+" /></th>";
	});
	if (world_data.hasMilitia) menu += "<th><img src='/graphic/unit/unit_militia.png?1' title='"+trans.tw.units.militia+"' alt='' id=militia /></th>";
	menu += "<th>"+trans.sp.troopOverview.commandTitle+"</th>";
	
	//builder.add("BEGIN TABLE BUILD");
	
	// Do initial filter? (gebaseerd op querystring)
	var search = window.location.search.substring(1).split("&");
	var doFilter = false;
	var unitIndex = user_data.command.filterMinDefault, unitAmount = user_data.command.filterMinDefault, sort = false, changeSpeed = false;
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
				
			case 'doelvillage':
				var newDoelwit = getVillageFromCoords(item[1]);
				setCookie("doelwit", newDoelwit.coord);
				break;
			
			case 'sort':
				sort = item[1] == "true";
				break;
		}
	}
	
	var doel = getVillageFromCoords(getCookie("doelwit"));
	menu += "<th nowrap>"+trans.sp.all.targetEx+" <input type=text id=doelwit name=doelwit size=8 value='" + (doel.isValid ? doel.coord : "") + "'><input type=button id=doelwitButton value='"+trans.sp.troopOverview.setTargetVillageButton+"'></th>";
	menu += "</tr>";
	
	var dorpenCounter = 0;
	var newTable = "";
	
	var theUnits;
	var rowSize = world_data.units.length + 1;
	if (world_data.hasMilitia) rowSize++;
	
	var mod = "row_a";
	theUnits = $("#units_table tbody");
	
	//alert(theUnits.size());
	theUnits.each(function()
	{
		//alert($(this).html());
		//var villageCell = $(this).prev().find("td").first();
		//alert(villageCell.html());
		var newRow = "";
		var addThisRow = true;
		//mod = mod == "row_a" ? "row_b" : "row_a";
		var cells = $("td:gt(0)", this);
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
				//alert(index + "==" + rowSize);
				//alert("COMMANDS:" + world_data.hasMilitia + ":" + $(this).html());
				newRow += "<td>";
				newRow += "<img src='/graphic/dots/red.png' title='"+trans.sp.troopOverview.removeVillage+"' /> ";
				newRow += "<a href='" + $("a", element).attr('href').replace("mode=units", "") + "'>";
				newRow += "<img src='/graphic/command/attack.png' title='"+trans.sp.troopOverview.toThePlace+"'/>"; // Werkt enkel met leftclick onclick='this.src=\"/graphic/command/return.png\";'
				newRow += "</a></td>";
			}
			else
			{
				//alert("units:" + world_data.units[index - 1]);
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
			newTable += "<td>" + $("td:first", this).html() + "</td>";
			//newTable += "<td align=right></td>";
			newTable += newRow;
			newTable += "<td></td></tr>";
			newTable += "</tbody>";
			
			dorpenCounter++;
		}
	});
	
	//builder.add("END TABLE BUILD");
	$("#units_table").html("<table width='100%' class='vis' id='units_table' doel='false'>" + menu + newTable + "</table>");
	//builder.add("END TABLE REPLACE");
	
	$('#doelwit').click(
		function()
		{
			$(this).focus();
			$(this).select();
		});
	
	// Change event van doelwit: opnieuw aankomsttijden uitrekenen
	$("#doelwitButton").bind("click", function() {
		var doelMatch = getVillageFromCoords($('#doelwit').val(), true);
		$("#units_table").attr("doel", doelMatch.isValid);
		if (!doelMatch.isValid)
		{
			setCookie("doelwit", "");
		}
		else
		{
			setCookie("doelwit", doelMatch.coord);
			$("#units_table").find("tr:visible:gt(1)").each(function() {
				var coord = $(this).find("span[id^=label_text_]")[0].innerHTML.match(/^.*\((\d+)\|(\d+)\) C\d{1,2}$/);
				var dist = getDistance(doelMatch.x, coord[1], doelMatch.y, coord[2], twSnelheidCookie());
				
				$("td:last", this).html(dist.html);
				$(this).attr("aankomst", dist.travelTime);
				if (dist.isNachtbonus)
					$("td:eq(1)", this).css("background-color", user_data.colors.error);
				else
					$("td:eq(1)", this).css("background-color", '');
			});
			
			if ($("#sorteer").is(":checked"))
			{
				$("#units_table").find("tr:visible:gt(1)").sortElements(function(a, b){
			    return $(a).attr("aankomst") * 1 > $(b).attr("aankomst") * 1 ? 1 : -1;
				});
			}
		}
	});
	
	// "Aanvallen per pagina" wijzigen in aantal dorpen dat er in de lijst staan
	var pageSize = $("input[name='page_size']");
	pageSize.parent().prev().text(trans.sp.overviews.totalVillages);
	pageSize.val(dorpenCounter);
	
	// Afstand van dorp tot doelwit
	// snelheid veranderen door op unit img te klikken
	var snelheidCookie = twSnelheidCookie();
	$('#'+snelheidCookie).css("border", "3px red solid");
	$("#units_table_header").bind('click', function(e) {
		if (e.target.nodeName === 'IMG')
		{
			setCookie("doelwitSpeed", e.target.id);
			$("img", this).css("border", "0px");
			$(e.target).css("border", "3px red solid");
			$("#doelwitButton").click();
		}
	});
	
	// Sorteren op aankomsttijd
	/*$("#sorteer").click(function() {
		if ($("#units_table").attr("doel") == "true")
		{
			$("#units_table").find("tr:visible:gt(1)").sortElements(function(a, b){
		    return $(a).attr("aankomst") * 1 > $(b).attr("aankomst") * 1 ? 1 : -1;
			});
		}
	});*/
	
	if (sort)
	{
		$("#doelwitButton").click();
	}
	
	// deleten van een lijn
	// border wordt groter naarmate er op het rallypoint geklikt wordt
	// Opera herkent middel en rechter muiskliks niet... :(
	$("#units_table").mouseup(function(e) {
		if (e.target.nodeName === 'IMG')
		{
			if (e.target.title == trans.sp.troopOverview.removeVillage)
			{
				//if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1))
	      //	alert("Left Button");
		    // else if (e.button == 2)
	  	  //	alert("Right Button");
				
				pageSize.val(pageSize.val() * 1 - 1);
				$(e.target).parent().parent().parent().hide();
				//img.css("border", (img.css("border-width").substr(0, 1) * 1 + 1) + "px red solid");
			}
		}
	});
	
	// default te filteren aantal zetten voor bepaalde unit
	$("#filterAxeType").change(function() {
		var unit = world_data.units[$(this).val()];
		if (user_data.command.filterMin[unit] !== undefined)
		{
			$("#filterAxeValue").val(user_data.command.filterMin[unit]);
		}
		else
		{
			$("#filterAxeValue").val(user_data.command.filterMinOther);
		}
	});
	
	// rijen met minder dan x axemen wegfilteren
	$("#filterAxe").bind("click", function() {
		//builder.reset("BEGIN FILTER AXE");
		var dorpenCounter = 0;
		var goners = $();
		var minBijl = $("#filterAxeValue").val() * 1;
		var unit = $('#filterAxeType').val() * 1;
		$("#units_table").find("tr:visible:gt(1)").each(function() {
			var val = $("td:eq(" + (unit+2) + ")", this).html();
			if (val == '&nbsp;' || val * 1 < minBijl)
			{
				goners = goners.add($(this));
				$("input:first", $(this)).val("");
			}
			else
				dorpenCounter++;
			});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
		//builder.add("END FILTER AXE");
		});
	
	// Stack berekenen
	$("#calculateStack").bind("click", function() {
		if (!this.disabled) 
		{
			this.disabled = true;
			$("#units_table").find("tr:visible:gt(1)").each(function() {
				var totaal = 0;
				$("td:gt(1)", this).each(function(i) {
					if (!($.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length))
					{
						totaal += this.innerHTML * world_data.unitsPositionSize[i];
					}
				});
				var color = world_data.calculateFarmLimit ? getStackColor(totaal, 30 * world_data.farmLimit) : "transparant";
				$("td:eq(1)", this).text(formatNumber(totaal)).css("background-color", color);	
			});
		}
	});
	
	// Restack BB codes berekenen
	if (location.href.indexOf('type=there') > -1)
	$("#defRestack").click(function() {
		$("#calculateStack").click();
		
		var request = "";
		$("#units_table").find("tr:visible:gt(1)").each(function() {
			var totaal = $("td:eq(1)", $(this)).text().replace(/\./, '') * 1;
			if (user_data.restack.to - totaal > user_data.restack.requiredDifference)
			{
				var villageCoord = getVillageFromCoords($(this).find("td:first span[id*='label_']").text());
				request += "[village]"+villageCoord.coord+"[/village] (" + parseInt((user_data.restack.to - totaal) / 1000, 0) + "k)\n";
			}
		});
		
		if ($("#defRestackArea").size() == 0)
			$(this).after("<textarea cols=35 rows=10 id=defRestackArea>"+request+"</textarea>");
		else
			$("#defRestackArea").val(request);
	});
	
	// rijen met minder x population wegfilteren
	$("#filterPop").bind("click", function() {
		$("#calculateStack").click();
		var dorpenCounter = 0;
		var goners = $();
		var min = $("#filterPopValue").val() * 1;
		var reverseFilter = $("#filterPopValueType").val() == "-1";
		$("#units_table").find("tr:visible:gt(1)").each(function() {
			var lijn = $(this);
			$("td:eq(1)", this).each(function() {
				var amount = $(this).text().replace('.', '') * 1;
				if ((!reverseFilter && amount < min) || (reverseFilter && amount > min))
				{
					goners = goners.add(lijn);
					$("input:first", lijn).val("");
				}
				else dorpenCounter++;
			});
		});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
	});
		
	// rijen zonder edels wegfilteren
	$("#edelFilter").bind("click", function() {
		var dorpenCounter = 0;
		var goners = $();
		$("#units_table").find("tr:visible:gt(1)").each(function() {
			if ($("td:eq("+(world_data.unitsPositionSize.length+1)+")", this).text() * 1 == 0)
			{
				goners = goners.add($(this));
				$("input:first", $(this)).val("");
			}
			else
				dorpenCounter++;
		});
		goners.parent().hide();
		pageSize.val(dorpenCounter);
	});
		
	// rijen niet onder aanval wegfilteren
	$("#aanvalFilter").bind("click", function() {
		//builder.reset("BEGIN FILTER ATTACK");
		var dorpenCounter = 0;
		var goners = $();
		$("#units_table").find("tr:visible:gt(1)").each(function() {
			if ($('td:first:not(:has(img[title=\''+trans.tw.command.attack+'\']))', this).size() != 0)
			{
				goners = goners.add($(this));
				$("input:first", $(this)).val("");
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
		$.each(user_data.reportPublish, function(i, v) { $("#"+v).attr('checked', true); });
		//$(":checkbox").attr('checked', true);
	}
	else
	{
		$("h3~p:nth-child(4)").each(function() {
			var input = $("h3~p a")[0].href;
			$(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[url]'+input+'[/url]" />');
			input = input.substr(input.lastIndexOf('/') + 1);
			$(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report_display]'+input+'[/report_display]" />');
			$(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report]'+input+'[/report]" />');
			});
	}
}





else if (location.href.indexOf('screen=main') > -1)
{
	// MAIN
	if (user_data.villageName != null && user_data.villageName.length > 0)
	{
		var showButtons = true;
		$.each(user_data.villageName, function(i, v) { if (game_data.village.name == v) showButtons = false; });
		
		if (showButtons)
		{
			var submitButton = $("input[type='submit']:last");
			$.each(user_data.villageName, function(i, v) {
				// dorp hernoemen naar standaard naam
				var button = $("<input type=button value='"+v+"'>").bind("click", function() {
					$("input[name='name']").val(v);
					if (user_data.villageNameClick) $("input[type='submit']").click();
					});
				var input = submitButton.parent().append(button);
			});
		}
	}
	
	// Resource coloring
	/*function rebindBuildings()
	{
		var buildings = $("#buildings a[id^='main_buildlink']");
		buildings.click(
			function()
			{
				alert("yaye");
				setTimeout(resourceColoring(), 1000);
				rebindBuildings();
			});
	}
	rebindBuildings();*/
}





else if (location.href.indexOf('screen=snob') > -1 && location.href.indexOf('mode=reserve') == -1)
{
	// SNOB
	if (user_data.calculateSnob)
	{
		// Berekenen voor hoeveel edels we pakketjes hebben
		var table = $("table.main table.vis").filter(function() {
			return $(this).is("table:has(img[src*='eisen.png'])");
			});
		//alert(table.html());
		var cost = $("td:eq(1)", table).html(); //[0].innerText;
		cost = cost.substr(0, cost.indexOf(" ")) * 1;
		
		var stored = $("tr:eq(1) td:eq(1)", table).html(); //[0].innerText;
		stored = stored.substr(0, stored.indexOf(" ")) * 1;
		
		var canProduce = 0;
		while (stored > cost)
		{
			stored -= cost;
			cost++;
			canProduce++;
		}
		
		var sumtable = $("table.main table.vis:last");
		sumtable.append("<tr><th>"+trans.sp.snob.canProduce+"</th><td style='border: 1px solid black'><img src='/graphic/unit/unit_snob.png?1'><b>"+canProduce+"</b> + <img src='graphic/res.png?1'>"+stored+"</td></tr>");
	}
}





else if (location.href.indexOf('mode=quickbar_edit') > -1)
{
	// SNELLIJST BEWERKEN
	if (user_data.scriptBarEditBoxCols != null && user_data.scriptBarEditBoxCols != false)
	{
		function textareaIfy(element) {
	   var textarea = $('<textarea>')
	     .attr('cols', Math.round(user_data.scriptBarEditBoxCols / 9))
	     .attr('rows', user_data.scriptBarEditBoxRows)
	     .val($(element).val());
	     
	    textarea.change(
	     	function()
	     	{
	     		element.val($(this).val());
	     	});
	   
	   element.before(textarea);
	   $(element).hide();
		}
		
		var url = $("form :input[type='text']").css("width", user_data.scriptBarEditBoxCols).last();
		textareaIfy(url);
	}
}





else if (location.href.indexOf('screen=place&mode=sim') > -1)
{
	// SIMULATOR
	if (world_data.smithyLevels)
		$(":input[name^='def_tech_']").add(":input[name^='att_tech_']").each(function() {
			if ($(this).val() == '') $(this).val("3");
		});
}






else if (location.href.indexOf('screen=info_command') > -1)
{
	// COMMAND INFO
	if ($("#running_times").size() > 0)
	{
		// ---------------------------------------INCOMING ATTACK
		var link = $("#contentContainer tr:eq(10) a:last");
		link.one('click', function()
		{
			var infoTable = $("#contentContainer");
			var table = $("#running_times");
			
			// convert looptijd to seconds
			function convertTime(cell)
			{
				var time = $(cell).find("td:eq(1)").text();
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
				if (diff < 60) return trans.sp.tagger.sentNow;
				if (diff < 120) return trans.sp.tagger.sent1Minute;
				if (diff < 3600) return Math.floor( diff / 60 ) + " " + trans.sp.tagger.sentMinutes;
				if (diff < 7200) return trans.sp.tagger.sent1Hour + ", " + Math.floor((diff - 3600) / 60) + " " + trans.sp.tagger.sentMinutes;
				return Math.floor( diff / 3600 ) + " " + trans.sp.tagger.sentHours + ", " + Math.floor((diff % 3600) / 60) + " " + trans.sp.tagger.sentMinutes;
			}
			
			// Sorteren op looptijd
			var unitRows = $("tr:gt(1)", table);
			if (user_data.incoming.sortOnUnitSpeed)
				unitRows.sortElements(function(a, b)
				{
			    return convertTime(a).totalSeconds > convertTime(b).totalSeconds ? 1 : -1;
				});
						
			// header verstuurtijd
			//TODO extraFeature :)
			var extraFeature = false;
			if (extraFeature)
			{
				$("th:first", table).attr("colspan", 5);
				$("th:eq(2)", table).after("<th>"+trans.sp.tagger.sentOn+"</th><th>"+trans.sp.tagger.ago+"</th>");
			}
			else
			{
				$("th:first", table).attr("colspan", 4);
				$("th:eq(2)", table).after("<th>"+trans.sp.tagger.sentOn+"</th>");
			}

			var infoCell = $("td", infoTable);
			var aanvaller = infoCell.eq(5).text();
			var aanvallerDorpNaam = infoCell.eq(7).text();
			var aanvallerDorp = getVillageFromCoords(aanvallerDorpNaam);
			var verdediger = infoCell.eq(10).text();
			var verdedigerDorp = getVillageFromCoords(infoCell.eq(12).text());
			var arrivalTime = getDateFromTW(infoCell.eq(14).text());
			var fields = parseInt(getDistance(aanvallerDorp.x, verdedigerDorp.x, aanvallerDorp.y, verdedigerDorp.y).fields);
			
			var resterendeLooptijd = convertTime($("tr:eq(9)", infoTable));
			var toFocusButton = null;
			unitRows.each(function()
			{
				var looptijd = convertTime(this);
				var newDate = new Date(arrivalTime.getTime() - looptijd.totalSeconds * 1000);
				var sendAt = prettyDate((new Date()).getTime() - newDate.getTime());
				
				// Extra kolom met verstuurtijd
				if (extraFeature) $("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td><td>" + sendAt + "</td>");
				else $("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td>");
				
				var unit = $("img:first", this).attr("src");
				unit = unit.substr(unit.lastIndexOf("unit_") + 5);
				unit = unit.substr(0, unit.indexOf("."));
				
				// Mogelijke tijden in 't vet
				if (looptijd.totalSeconds > resterendeLooptijd.totalSeconds)
				{
					if (toFocusButton == null)
					{
						toFocusButton = $("input:last", this);
						
						$("#content_value table:first").prepend("<input type=submit id=focusPlaceHolder value='" + trans.sp.tagger.tagIt + " (" + trans.tw.units.names[unit] + ")'>");
						$("#focusPlaceHolder").click(function() {toFocusButton.click(); $(this).val(trans.sp.tagger.tagged).attr("disabled", "disabled"); });
						
						if (unit == "snob")
							$("tr:last td", table).css("background-color", user_data.colors.error)
					}
					$(this).css("font-weight", "bold");
				}
				
				// Textvelden hernoemen
				if (user_data.incoming.renameInputTexbox)
				{
					var str = user_data.incoming.renameInputTexbox;
					/*var unit = $(this).find("input:first").val();
					unit = unit.substr(0, unit.indexOf(","));*/
					unit = trans.tw.units.shortNames[unit];
					
					var aanvalId = $("input:eq(1)", this).parent().html();
					aanvalId = aanvalId.substr(aanvalId.lastIndexOf("id=") + 3);
					aanvalId = aanvalId.substr(0, aanvalId.indexOf("'"));
					//alert();
					
					str = str.replace("{village}", aanvallerDorpNaam).replace("{c}", aanvallerDorp.continent()).replace("{id}", aanvalId);
					str = str.replace("{player}", aanvaller).replace("{xy}", aanvallerDorp.coord).replace("{unit}", unit);
					str = str.replace("{fields}", fields);
					$(this).find("input:first").val(str); 
				}
			});
			
			// nobles can only walk so far
			var nobles = $("tr:last", table);
			if (convertTime(nobles).totalSeconds / 60 > world_data.maxNobleWalkingTime)
			{
				nobles.find("td").css("text-decoration", "line-through");
			}
			
			// auto-show input textboxes
			$("span:odd", table).show();
			$("span:even", table).hide();
		});
		
		
		// TAGGER
		if (user_data.incoming.autoOpenTagger && $("#labelText").text() == trans.tw.incoming.defaultCommandName)
			link.click();
			
		if (user_data.proStyle && user_data.incoming.villageBoxSize != null && user_data.incoming.villageBoxSize != false)
			$("#content_value table:first").css("width", user_data.incoming.villageBoxSize);
	}
	else
	{
		// Eigen aanval/os/return
		var table = $("#content_value");
		var infoTable = $("table.vis:first", table);
		var type = $("h2:first", table).text();
		var catapultTargetActive = infoTable.find("tr:eq(5) td:eq(0)").text() == "Katapultdoel:";
		
		infoTable.width(600);
		
		// Terugkeer en annulatie arriveertijd toevoegen
		if (type.indexOf(trans.tw.command.returnText) == -1)
		{
			var offset = 5;
			if (catapultTargetActive) offset += 1;
			
			var duur = getDateFromTW(infoTable.find("tr:eq("+offset+") td:last").text(), true);
			var arriveerTijd = getDateFromTW(infoTable.find("tr:eq("+(offset+1)+") td:last").text());
			var nogTeLopen = getDateFromTW(infoTable.find("tr:eq("+(offset+2)+") td:last").text(), true);

			var cancelCell = infoTable.find("tr:last").prev();
			var canStillCancel = cancelCell.has("a").length;
			if (canStillCancel)
			{
				cancelCell.find("td:first").attr("colspan", "1").attr("nowrap", "nowrap");
				var terugTijd = getDateFromTW($("#serverTime").text(), true);
				terugTijd = new Date(terugTijd.valueOf() + (duur - nogTeLopen));
				cancelCell.append("<td>Terug op:</td><td id=returnTimer>" + twDateFormat(terugTijd, true, true).substr(3) + "</td>");
				
				setInterval(
					function timeCounter()
					{
						var timer = $("#returnTimer");
						var newTime = new Date(getDateFromTW(timer.text()).valueOf() + 2000);
						timer.text(twDateFormat(newTime, true, true).substr(3));
					}, 1000);
					
				cancelCell = cancelCell.prev();
			}
			
			if (type.indexOf(trans.tw.command.attack) == 0)
			{
				arriveerTijd.setTime(arriveerTijd.valueOf() + (duur.getSeconds() + duur.getMinutes() * 60 + duur.getHours() * 3600) * 1000);
				cancelCell.after("<tr><td colspan=2>"+trans.sp.command.homeTime+"</td><td>" + twDateFormat(arriveerTijd) + "</td></tr>");
			}
		}
		
		var player = infoTable.find("td:eq(7) a").text();
		var village = getVillageFromCoords(infoTable.find("td:eq(9) a").text());
		var second = infoTable.find("td:eq(13)").text();
		
		if (type.indexOf(trans.tw.command.returnText) == 0)
		{
			infoTable = $("table.vis:last", table);
			if (infoTable.find("td:first").text() == trans.tw.command.haul) infoTable = infoTable.prev();
			infoTable = infoTable.find("tr:last");
		}
		else
		{
			infoTable = $("table.vis:last", table);
		}
		
		var unitsSent = {};
		$.each(world_data.units, function(i, val) {
			unitsSent[val] = $("td:eq("+i+")", infoTable).text() * 1;
			});
		var unitsCalc = calcTroops(unitsSent);
		
		var isOs = type.indexOf(trans.tw.command.support) == 0;
		if (!unitsCalc.isScout && !unitsCalc.isMatch(!isOs ? 'off' : 'def')) $("h2:first", table).css("background-color", user_data.colors.error);
		
		if (user_data.attackAutoRename)
		{
			var inputBox = $("#editInput");
			var button = $("input[value='OK']");

			var renamed = buildAttackString(village.coord, unitsSent, player, isOs);
			inputBox.val(renamed);
			button.click();
		}
		
		// Bij os uitrekenen hoeveel populatie
		if (isOs)
		{
			var totalPop = 0;
			$.each(world_data.units, function(i, val) {
				var amount = unitsSent[val];
				if (amount != 0)
				{
					totalPop += amount * world_data.unitsPositionSize[i];
				}
			});
			
			var unitTable = $("table.vis:last", table);
			unitTable.find("tr:first").append('<th width="50"><img src="graphic/face.png" title="'+trans.sp.all.population+'" alt="" /></th>');
			unitTable.find("tr:last").append('<td>'+formatNumber(totalPop)+'</td>');
		}
	}
}





else if (location.href.indexOf('screen=info_') > -1 && location.href.indexOf('screen=info_member') == -1)
{
	// USERPROFIEL++ // INFO_ ALLY/PLAYER
	var tables = $('#content_value table.vis');
	var infoTable = tables.first();
	var profile = user_data.profile;
	
	if (location.href.indexOf('screen=info_village') > -1 && user_data.villageInfo.active)
	{
		//var infoTable = $("#content_value table:first table:first");
		var link = location.href.substr(0, location.href.indexOf("&"));
		link += "&screen=overview_villages&type=own_home&mode=units&page=-1";
		var id = infoTable.find("td:eq(1)").text();
		id = id.substr(id.lastIndexOf("=") + 1);
		link += "&doelvillage=" + id;
		
		//infoTable.find("tbody:first").append("<tr><td><a href='"+link+user_data.villageInfo.off_link+"'>&raquo; Aanvalleuh!</a></td><td><a href='"+link+user_data.villageInfo.def_link+"'>&raquo; Verdedigen!</a></td><tr>");
	}
	
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
			if (user_data.proStyle) $("#content_value td:first").css("width", "40%").next().css("width", "60%");
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
				tables = $("#content_value");
				infoTable = $("table.vis:first", tables);
				id = infoTable.find("tr:eq(3) a");
				if (id.size() > 0) { id = id.attr("href"); id = id.substr(id.lastIndexOf("=") + 1); }
				else id = 0;
				
				/*var tab = "<table><tr><td valign='top'>";
					tab += "<table class='vis' width='100%'>" + infoTable.html() + "</table>";
				tab += "</td><td valign='top' style='min-width:240px' width=240>";
					tab += "<table class='vis' width='100%'><tr><th colspan='2'>Profiel</th></tr></table>";
				tab += "</td></tr></table>";*/
				
				//alert(infoTable.size() + ": " + infoTable.html());
				//infoTable.replaceWith(tab);
				//tables = $('table.vis');
				//infoTable = tables.first();
			}
			
			// Rechstreekse link naar TW Stats map
			if (id > 0 && profile.mapLink.show)
			{
				var link = "http://"+game_data.market+".twstats.com/"+game_data.world+"/index.php?page=map";
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
				if (mapProfile.yourTribeColor != null && game_data.player.ally_id != tribeId && game_data.player.ally_id > 0)
				{
					link += "&tribe_1_id="+game_data.player.ally_id+"&tribe_1_colour="+mapProfile.yourTribeColor;
				}
				link += "&player_0_id="+id+"&player_0_colour="+mapProfile.playerColor;
				link += "&grid="+(mapProfile.grid ? 1 : 0)+"&fill="+mapProfile.fill+"&zoom="+mapProfile.zoom+"&centrex="+mapProfile.centreX+"&centrey="+mapProfile.centreY;
				if (mapProfile.markedOnly) link += "&nocache=1";
				if (mapProfile.ownColor != null && game_data.player.id != id)
				{
					link += "&player_1_id="+game_data.player.id+"&player_1_colour="+mapProfile.ownColor;
				}
				infoTable.find("tr:last").after("<tr><td colspan=2><a href='"+link+"' target='_blank'>&raquo; "+trans.sp.profile.twStatsMap+"</a> "+trans.sp.profile.externalPage+"</td></tr>");
			}
			
			if (!isVillage)
			{
				// Aantal dorpen
				if (user_data.proStyle)
				{
					// dorpnaam nooit op 2 lijnen
					var colWidth = $("#content_value table:eq(2) th");
					colWidth.first().css("width", "98%");
					colWidth.eq(1).css("width", "1%");
					colWidth.eq(2).css("width", "1%");
				}
				
				var aantalDorpen = tables.eq(1).find("th:first").text();
				aantalDorpen = aantalDorpen.substr(aantalDorpen.indexOf("(") + 1);
				aantalDorpen = aantalDorpen.substr(0, aantalDorpen.length - 1);
				infoTable.find("tr:eq(2)").after("<tr><td>"+trans.sp.profile.villages+"</td><td>"+formatNumber(aantalDorpen)+"</td></tr>");
			}
		}
		else
		{
			screen = "tribe";
			id = infoTable.find("a");
			
			if (id.size() == 4) id = id.eq(2).attr("href");
			else id = id.eq(1).attr("href");			
			
			
			id = id.substr(id.lastIndexOf("/") + 1);
			
			var link = "http://"+game_data.market+".twstats.com/"+game_data.world+"/index.php?page=map";
			link += "&tribe_0_id="+id+"&tribe_0_colour="+mapProfile.tribeColor;
			link += "&centrex="+mapProfile.centreX+"&centrey="+mapProfile.centreY;
			if (mapProfile.yourTribeColor != null && game_data.player.ally_id != id)
			{
				link += "&tribe_1_id="+game_data.player.ally_id+"&tribe_1_colour="+mapProfile.yourTribeColor;
			}
			link += "&grid="+(mapProfile.grid ? 1 : 0)+"&fill="+mapProfile.fill+"&zoom="+mapProfile.zoom
			if (mapProfile.markedOnly) link += "&nocache=1";
			if (mapProfile.ownColor != null)
			{
				link += "&player_0_id="+game_data.player.id+"&player_0_colour="+mapProfile.ownColor;
			}
			infoTable.find("tr:last").before("<tr><td colspan=2><a href='"+link+"' target='_blank'>&raquo; "+trans.sp.profile.twStatsMap+"</a> "+trans.sp.profile.externalPage+"</td></tr>");
		}
		
		// Grafieken opbouwen
		if (id > 0)
		{
			var graphs = [["points", trans.sp.profile.graphPoints], ["villages", trans.sp.profile.graphVillages], ["od",trans.sp.profile.graphOD], ["oda", trans.sp.profile.graphODA], ["odd", trans.sp.profile.graphODD], ["rank", trans.sp.profile.graphRank]];
			if (screen == "tribe") graphs.push(["members", trans.sp.profile.graphMembers]);
			var toShow = screen == "tribe" ? profile.tribeGraph : profile.playerGraph;
			
			var html = "";
			for (var i = 0; i < graphs.length; i++)
			{
				if (toShow[i][1])
				{
					var graphType = toShow[i][1] == 'big' ? 'ss' : '';
					html += createSpoiler(graphs[i][1], '<img src="http://'+game_data.market+'.twstats.com/image.php?type='+screen+graphType+'graph&id='+id+'&s='+game_data.world+'&graph='+graphs[i][0]+'">', toShow[i][2] != undefined);
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
						pictureTable = $("<table class='vis' width='100%'><tr><th colspan='2'>"+trans.tw.profile.title+"</th></tr></table>");
						$("#content_value td:first").next().prepend(pictureTable);
					}
					else if (pictureTable.find("th").text() != trans.tw.profile.title)
					{
						if (pictureTable.find("th:first").text() == trans.tw.profile.awardsWon);
							pictureTable = pictureTable.parent();
						
						// Als er enkel de node "Persoonlijke info" is
						var temp = $("<table class='vis' width='100%'><tr><th colspan='2'>"+trans.tw.profile.title+"</th></tr></table>");
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
					tables.first().after("<table class=vis width='100%'><tr><th>"+trans.tw.profile.title+"</th></tr><tr><td>"+html+"</td></tr></table>");
				}
			}
		}
		
		// Overnames (intern)
		if (id > 0 && profile.popup.show) // && !isVillage)
		{
			var twLink = 'http://'+game_data.market+'.twstats.com/'+game_data.world+'/index.php?page='+screen+'&mode=conquers&id='+id+'&pn=1&type=1&enemy=-1&enemyt=-1&min=&max=';
			var overnames = "<tr><td colspan=2><a href=\"\" id='overnames'>&raquo; "+trans.sp.profile.conquers+"</a> "+trans.sp.profile.internalPage+"</td></tr>";
			if (screen == 'tribe')
				infoTable.find("tr:last").before(overnames);
			else
				infoTable.find("tr:last").after(overnames);
			var popupWidth = profile.popup.width;
			var popupHeight = profile.popup.height;
			infoTable.after('<div class="messagepop pop" id="popup" style="display: none"><iframe src='+twLink+' width='+popupWidth+' height='+popupHeight+'></div>');
			$("#popup").css({"left": ($('window').width() - 60 - popupWidth), "top": 10, "background-color": "#FFFFFF", "border": "1px solid #999999", "position": "absolute", "width" : popupWidth, "height": popupHeight, "z-index": 50, "padding": "25px 25px 20px"});
			
			$(function() {
	        $("#overnames").live('click', function(event) {
	        		if ($(this).hasClass('selected'))
	        			$("#overnames").removeClass("selected");
	        		else
	            	$(this).addClass("selected");
	            $("#popup").css({"left": ($(window).width() - 60 - popupWidth)}).toggle();
	            return false;
	        });
	
	        $("#popup").live('click', function() {
	            $("#popup").hide();
	            $("#overnames").removeClass("selected");
	            return false;
	        });
	    });
		}
	}
	
	if (location.href.indexOf('screen=info_village') > -1 && user_data.proStyle && profile.moveClaim)
	{
		// move claim naar ergens waar het geen kwaad kan
		if ($("td:eq(8)", infoTable).text() == trans.tw.profile.claimedBy)
		{
			infoTable.append($("tr:eq(5),tr:eq(6)", infoTable));
		}
	}
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=prod') > -1)
{
	// PRODUCTION OVERVIEW volle grondstoffen filteren
	var resTable = $("#production_table");
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += " <input type=checkbox id=resFilter "+(user_data.resources.filterRows ? "checked" : "")+"> "+trans.sp.prodOverview.filter+" ";
	menu += "&nbsp;<input type=button id=resOpslagFull value='"+trans.sp.prodOverview.filterFullGS+"' title=''>&nbsp; &nbsp; ";
	menu += "<select id=resAmountType><option value=1>"+trans.sp.all.more+"</option>";
	menu += "<option value=-1>"+trans.sp.all.less+"</option></select>";
	menu += "<input type=text id=resAmount size=6 value="+user_data.resources.requiredResDefault+">";
	menu += " <input type=button class=resFilter value='"+trans.tw.all.wood+"' resIndex=0><input type=button class=resFilter value='"+trans.tw.all.stone+"' resIndex=1><input type=button class=resFilter value='"+trans.tw.all.iron+"' resIndex=2><input type=button class=resFilter value='"+trans.sp.all.all+"' resIndex=-1>";
	menu += " "+trans.sp.all.withText+" <input type=checkbox id=resHandelaar "+(user_data.resources.filterMerchants ? "checked" : "")+" title='"+trans.sp.prodOverview.merchantTooltip+"'>";
	menu += "<input type=text id=resHandelaarAmount size=2 value="+user_data.resources.requiredMerchants+" title='"+trans.sp.prodOverview.merchantAmountTooltip+"'> "+trans.sp.all.merchants+" ";
	menu += "&nbsp; &nbsp; <input type=button id=resBBCode value='"+trans.sp.prodOverview.bbCodes+"'> <input type=checkbox id=resBBCodeImages> " + trans.sp.prodOverview.bbCodesInfo;
	menu += "</th></tr></table>";
	resTable.before(menu);
	
	$("#resFilter").change(
		function()
		{
			var isCheck = $(this).is(":checked");
			$("#resFilter").attr("title", isCheck ? trans.sp.prodOverview.filterTooltip : trans.sp.prodOverview.filterTooltipReverse);
			$("#resOpslagFull").attr("title", isCheck ? trans.sp.prodOverview.filterFullGSTooltip : trans.sp.prodOverview.filterFullGSTooltipReverse);
			$(".resFilter").each(
				function(index, value)
				{
					if (index == 3) $(value).attr("title", isCheck ? trans.sp.prodOverview.filterAllTooltip : trans.sp.prodOverview.filterAllTooltipReverse);
					else $(value).attr("title", isCheck ? trans.sp.prodOverview.filter1Tooltip.replace("{0}", $(value).attr("value")) : trans.sp.prodOverview.filter1TooltipReverse.replace("{0}", $(value).attr("value")));
				});
		});
	$("#resFilter").change();
	
	$("#resOpslagFull").click(function() {
		filterRes('full', $("#resFilter").attr("checked"));
	});
	
	$("#resBBCode").click(function() {
		var bbs = filterRes("bbcode", false);
		if ($("#bbcodeArea").size() == 0)
			$(this).after("<textarea id=bbcodeArea cols=50 rows=10 wrap=off>");
			
		$("#bbcodeArea").val(bbs);
	});

	function filterRes(resourceIndex, hideRows)
	{
		var resCode = [trans.tw.all.wood, trans.tw.all.stone, trans.tw.all.iron];
		var bbcodes = '';
		var goners = $();
		var stayers = $();
		var filterHandelaars = $("#resHandelaar").attr("checked");
		var filterHandelaarsAmount = $("#resHandelaarAmount").val() * 1;
		var minAmount = $("#resAmount").val() * 1;
		var reverse = $("#resAmountType").val() == "-1";
		var bbCodeImages = $("#resBBCodeImages").attr("checked");
		var minDif = user_data.resources.bbcodeMinimumDiff;
		
		if (reverse) bbcodes = trans.sp.all.tooMuch + "\n";
		else bbcodes = trans.sp.all.tooLittle + "\n";
	
		function doResource(resCell, resArray, resIndex, reverse, minAmount)
		{
			var resAmount = resArray[resIndex] * 1;
			if ((!reverse && resAmount > minAmount) || (reverse && resAmount < minAmount))
			{
				$("span[title]:eq("+resIndex+")", resCell).css("font-weight", "bold")
				return false;
			}
			return true;
		}
		
		var hasNotes = $("th:first", resTable).text().indexOf(trans.tw.overview.village) == -1;
		resTable.find("tr:gt(0)").each(function()
		{
			var isOk = true;
			var resCell;
			if (hasNotes) resCell = $(this).find("td:eq(3)");
			else resCell = $(this).find("td:eq(2)");			
			var resources = $.trim(resCell.text()).replace(/\./gi, "").split(" ");
			
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
				{
					var villageCell = $("td:eq(" + (hasNotes ? "1" : "0") + ") span:eq(1)", this);
					bbcodes += "[village]" + getVillageFromCoords(villageCell.text()).coord + "[/village] " + villageBBCode + "\n";
				}
			}
			else if (resourceIndex == 'full')
			{
				// Volle opslagplaatsen
				if ($(".warn", this).size() > 0)
				{
					resCell.css("background-color", "#DED3B9");
					isOk = false;
				}
			}
			else
			{
				// One specific resource
				$("span[title]", resCell).css("font-weight", "normal");
				
				if (resourceIndex == "-1")
				{
					isOk = isOk && !(!doResource(resCell, resources, 0, reverse, minAmount) 
									| !doResource(resCell, resources, 1, reverse, minAmount) 
									| !doResource(resCell, resources, 2, reverse, minAmount));
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
					resCell = $(this).find("td:eq(4)");
					if (hasNotes) resCell = resCell.next();
					var handelaren = resCell.text();
					handelaren = handelaren.substr(0, handelaren.indexOf("/"));
					if (handelaren < filterHandelaarsAmount)
					{
						resCell.css("background-color", user_data.colors.error);
					}
					else
					{
						resCell.css("background-color", "");
					}
				}
			}
			
			if (hideRows && isOk)
			{
				goners = goners.add($(this));
				$("input:first", $(this)).val(""); // Dorphernoemen textbox leegmaken -> interactie met dorphernoem-script: gaat lege textboxen niet hernoemen
			}
			else if (!$(this).is(":visible"))
			{
				stayers = stayers.add($(this));
			}
		});
		stayers.show();
		goners.hide();
		return bbcodes;
	}
	
	$(".resFilter").click(function() {
		filterRes($(this).attr("resIndex"), $("#resFilter").attr("checked"));
	});
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=buildings') > -1)
{
	// BUILDINGS OVERVIEW Alles niet conform highlighten
	var buildingTable = $("#buildings_table");
	
	var menu = "<table class='vis' width='100%'>";
	menu += "<tr><th>";
	menu += "<input type=checkbox id=buildingOpti> " + trans.sp.buildOverview.optimistic + " ";
	menu += "<input type=button id=buildingHighlight value='"+trans.sp.buildOverview.mark+"'>";
	menu += "<input type=button id=buildingFilter value='"+trans.sp.buildOverview.filter+"'>";
	menu += "</th></tr></table>";
	buildingTable.before(menu);
	
	function filterBuildings(cellAction, hideRows)
	{
		var buildings = [];
		buildingTable.find("tr:first img").each(function(i, v) {
			buildings[i] = this.src.substr(this.src.lastIndexOf('/')+1);
			buildings[i] = buildings[i].substr(0, buildings[i].indexOf('.'));
		});
		
		var goners = $();
		var opti = $("#buildingOpti").attr("checked");
		buildingTable.find("tr:gt(0)").each(function() {
			var isOk = true;
			$(this).find("td:gt(3)").each(function(i, v) {
				//alert($(this).text() + ' for ' + buildings[i] + ' - i is ' + i);
				var range = user_data.buildings[buildings[i]];
				if (range != undefined)
				{
					var text = $(this).text() * 1;
					if (text < range[0])
					{
						$(this).css("background-color", user_data.colors.error);
						isOk = false;
					}
					else if (text > range[1] && !opti)
					{
						$(this).css("background-color", user_data.colors.good);
						isOk = false;
					}
					else
						$(this).css("background-color", "");
				}
			});
			if (hideRows && isOk)
			{
				goners = goners.add($(this));
				$("input:first", $(this)).val("");
			}
		});
		goners.hide();
	}
	
	$("#buildingHighlight").click(function() {
		filterBuildings(function(cell, isOk) {
			cell.css("background-color", isOk ? "" : "#DED3B9");
		}, false);
	});
		
	$("#buildingFilter").click(function() {
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
		$.each(user_data.smithy, function(i, v) {
			menu += "<option value="+i+">"+v[0]+"</option>";
		});
		menu += "</select>";
		menu += "<input type=checkbox id=buildingOpti> " + trans.sp.smithOverview.optimistic + " ";
		menu += "<input type=button id=smithyHighlight value='"+trans.sp.smithOverview.mark+"'>";
		menu += "<input type=button id=smithyFilter value='"+trans.sp.smithOverview.filter+"'>";
		menu += "</th></tr></table>";
		$("#techs_table").before(menu);
		
		function filterTechs(cellAction, hideRows)
		{
			var goners = $();
			var opti = $("#buildingOpti").attr("checked");
			var def = user_data.smithy[$("#groupType").val()][1];
			$("#techs_table").find("tr:gt(0)").each(function() {
				var isOk = true;
				$(this).find("td:gt(2)").each(function(i, v) {
					var range = def[world_data.units[i]];
					if (i < world_data.units.length && range != undefined)
					{
						var text = $(this).text() * 1;
						if (text == '') text = 0;
						if (text < range[0])
						{
							$(this).css("background-color", user_data.colors.error);
							isOk = false;
						}
						else if (text > range[1] && !opti)
						{
							$(this).css("background-color", user_data.colors.good);
							isOk = false;
						}
						else
							$(this).css("background-color", "");
					}
				});
				if (hideRows && isOk)
				{
					goners = goners.add($(this));
					$("input:first", $(this)).val("");
				}
			});
			goners.hide();
		}
		
		$("#smithyHighlight").click(function() {
			filterTechs(function(cell, isOk) {
				cell.css("background-color", isOk ? "" : "#DED3B9");
			}, false);
		});
			
		$("#smithyFilter").click(function() {
			filterTechs(function(cell, isOk) {
				cell.css("background-color", isOk ? "" : "#DED3B9");
			}, true);
		});
	}
}














else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=commands') > -1)
{
	// COMMANDS OVERVIEW Aanvallen groeperen per dorp
	var menu = "";
	menu += "<table class=vis width='100%'>";
	menu += "<tr><th colspan="+(3+world_data.units.length)+">";
	if (location.href.indexOf('type=all') > -1 || location.href.indexOf('&type=') == -1)
	{
		menu += "<input type=button id=filterReturning value='"+trans.sp.commands.filterReturn+"'>&nbsp;";
	}
	menu += "<input type=checkbox id=sorterenSum "+(user_data.command.sumRow ? "checked" : "")+"> "+trans.sp.commands.totalRows+" ";
	var isSupport = location.href.indexOf('type=support') > -1;
	menu += "<input type=button id=sorteren value='"+trans.sp.commands.group+"'>";
	menu += "</th></tr>";
	menu += "</table>";
	$("#commands_table").before(menu);
	
	// Terugkerende troepen filteren
	$("#filterReturning").bind('click', function() {
		var newTable = "";
		$("#commands_table").find("tr:gt(0)").each(function() {
			var firstCell = $(this).children().first().html();
			if (firstCell.indexOf(trans.tw.command.returnFull) == -1 && firstCell.indexOf(trans.tw.command.sentBackBy) == -1 && firstCell.indexOf(trans.tw.command.returnFrom) == -1)
			{
				newTable += "<tr style='white-space:nowrap' class='nowrap row_"+($(this).hasClass("row_a") ? "b" : "a")+"'>" + $(this).html() + "<tr>";
			}
		});
		$("#commands_table").replaceWith("<table id='commands_table' class='vis'>" + $("#commands_table tr").first().html() + newTable + "</table>");
	});
	
	//$("#commands_table").find("tr:gt(0)").tableFilter(function() {});
	
	$("#bbcodes").click(
		function()
		{
			var codes = "";
			$("#commands_table").find("tr:gt(0)")
				.each(
					function()
					{
						var $this = $(this);
						//var village = $
						if ($this.attr("colspan")) // == 0)
						{
							alert($this.html());
						}
					});
					
			$(this).replaceWith("<textarea>"+codes+"</textarea>");
		});
	
/*var position = $.inArray($(this).attr("id").substr(6), world_data.units) + 1;
			filterTable($("#units_table tr"),
				function(row)
				{
					return row.find("td").eq(position).text() != "0";
				});	*/
	
	// Binnenkomende aanvallen sorteren
	$("#sorteren").bind('click', function() {
		var newTable = "";
		var targets = [];
		var aantalCommandos = 0;
		var som = $('#sorterenSum').attr('checked');
		$("#filterReturning").attr("disabled", true);
		
		$("#commands_table").find("tr:gt(0)").each(function() {
			var target = $("span[id*='labelText']", this).text();
			var village = getVillageFromCoords(target);
			if (village.isValid)
			{
				aantalCommandos++;
				if (targets[village.coord] == undefined)
				{
						targets.push(village.coord);
						targets[village.coord] = new Array();
				}
				targets[village.coord].push($(this));
			}
			});
			
		var mod = 0;
		if (isSupport)
		{
			$.each(targets, function(i, v) {
				mod++;
				var aantal = 0;
				var totaalDef = new Array();
				totaalDef['pop'] = 0;
				$.each(world_data.units, function(index, value) {totaalDef[value] = 0;});
				
				$.each(targets[v], function(index, value) {
					newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
					aantal++;
					
					var unitAmounts = $("td:gt(2)", value);
					$.each(world_data.units, function(iUnit, vUnit) {
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
					newTable += "<tr><td align=right colspan=3><b>"+trans.sp.commands.totalRowsText.replace("{0}", aantal).replace("{1}", formatNumber(totaalDef['pop'])) + "&nbsp;</b></td>";
					$.each(world_data.units, function(iUnit, vUnit) {
						newTable += "<td>" + (totaalDef[vUnit] == 0 ? "&nbsp;" : formatNumber(totaalDef[vUnit])) + "</td>";
					});
					newTable += "</tr>";
				}
			});
		}
		else
		{
			$.each(targets, function(i, v) {
				mod++;
				var aantal = 0;
				var laatsteAankomst = '';
				$.each(targets[v], function(index, value) {
					var huidigeAankomst = $(value).find("td:eq(2)").text();
					if (laatsteAankomst == huidigeAankomst)
					{
						// Op zelfde seconde de aankomsttijd niet tonen
						newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>";
						$(this).find("td").each(function(i) {
							if (i == 2) newTable += "<td>&nbsp;</td>";
							else if ($(this).text() == 0) newTable += "<td class=hidden>0</td>";
							else newTable += "<td>" + $(this).html() + "</td>";
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
		
		var menu = $("#commands_table tr").first().html();
		$("#commands_table").html("<table id='commands_table' class='vis'>" + menu + newTable + "</table>");
		
		// Aantal aanvallen
		if ($("#aantalAanvallen").size() == 0)
		{
			var totalDesc = (isSupport ? trans.sp.commands.totalOS : trans.sp.commands.totalAttack);
			var totalVillagesDesc = isSupport ? trans.sp.commands.totalVillagesOS : trans.sp.commands.totalVillagesAttack;
			var pageSize = $("input[name='page_size']");
			if (pageSize.size() == 0)
			{
				pageSize = $("input[type='submit']:last");
				pageSize.after("<table class=vis><tr class='row_a'><th>"+totalVillagesDesc+"</th><td><input type=text size=5 value="+targets.length+"></td></tr><tr class='row_a'><th>"+totalDesc+":</th><td>"+aantalCommandos+"</td></tr></table>");
			}
			else
			{
				pageSize.parent().prev().text(totalVillagesDesc);
				pageSize = pageSize.val(targets.length).parent().parent().parent();
				pageSize.append('<tr><th colspan=2 id="aantalAanvallen">' + totalDesc + ':</th><td>' + aantalCommandos + '</td></tr>');
			}
		}
	});
}






else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=groups') > -1)
{
	// GROUPS OVERVIEW
	// De editeerbox minder breed maken
	$("#edit_group_href").click(
		function()
		{
			var groupTable = $("#group_list");
			groupTable.width(300);
			
			groupTable.find("th:first").attr("colspan", "3");
			var mod = 0;
			groupTable.find("tr:gt(0)").each(
				function()
				{
					mod++;
					$(this).addClass("row_" + (mod % 2 == 0 ? "a" : "b"));
				});
		});
}





else if (location.href.indexOf('screen=overview_villages') > -1 && location.href.indexOf('mode=incomings') > -1)
{
	// INCOMINGS OVERVIEW Aanvallen groeperen per dorp
	var menu = "";
	// TODO vertalen! vergrootgelas gebruiken?
	menu += "<table width='100%'>";
	menu += "<tr><th colspan=6>";
	menu += "<input type=button id=sorteren value='Dynamisch Groeperen'>";
	menu += "&nbsp;&nbsp; <input type=checkbox id=sorterenSum "+(user_data.command.sumRow ? "checked" : "")+"> Somlijn ";
	menu += "<input type=button id=sorterenSnel value='Snel Groeperen'>";
	menu += "<input type=button id=filterAanval value='Filter Nieuwe Aanvallen'>";
	menu += "</th></tr>";
	menu += "</table>";
	$("#incomings_table").before(menu);
	
	// Aantal aanvallen
	function showAantalAanvallen(aantalDorpen, aantalBevelen)
	{
		if ($("#aantalAanvallen").size() == 0)
		{
			var pageSize = $("input[name='page_size']");
			pageSize.parent().prev().text("Aangevallen dorpen:");
			pageSize = pageSize.val(aantalDorpen).parent().parent().parent();
			pageSize.append('<tr><th colspan=2 id="aantalAanvallen">Aanvallen:</th><td>' + aantalBevelen + '</td></tr>');
		}
	}
	
	// Binnenkomende aanvallen sorteren
	$("#sorteren").bind('click', function() {
		this.disabled = true;
		$("#sorterenSnel").attr("disabled", true);
		
		//builder.reset("DYNAMISCH START");
		var rows = $("#incomings_table").find("tr:gt(0)").not("tr:last");
		rows.sortElements(function(a, b){
			a = getVillageFromCoords($("td:eq(1)", a).text());
			b = getVillageFromCoords($("td:eq(1)", b).text());
			
			return (a.x * 1000 + a.y) > (b.x * 1000 + b.y) ? 1 : -1;
		});
		
		//builder.add("YAYE");
		var aantalDorpen = "";
		var current = "";
		var mod = 0;
		rows.each(function() {
			var dorp = $("td:eq(1)", this).text();
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
	
	$("#sorterenSnel").bind('click', function() {
		this.disabled = true;
		$("#sorteren").attr("disabled", true);
		
		builder.reset("SNEL START");
		var newTable = "";
		var targets = [];
		var aantalCommandos = 0;
		var som = $('#sorterenSum').attr('checked');
		
		$("#incomings_table").find("tr:gt(0)").each(function() {
			var target = $("td:eq(1)", this).text();
			var village = getVillageFromCoords(target);
			if (village.isValid)
			{
				aantalCommandos++;
				if (targets[village.coord] == undefined)
				{
						targets.push(village.coord);
						targets[village.coord] = new Array();
				}
				targets[village.coord].push($(this));
			}
			});
			
		//builder.add("ORDERED");
		var mod = 0;
		$.each(targets, function(i, v) {
			mod++;
			var aantal = 0;
			$.each(targets[v], function(index, value) {
				newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
				aantal++;
				});
				
			if (som)
			{
				newTable += "<tr><td align=right colspan=6>"+aantal+"&nbsp;</td></tr>";
			}
		});
		
		//builder.add("BUILT");
		var menu = $("#incomings_table tr").first().html();
		$("#incomings_table").html("<table id='incomings_table' class='vis'>" + menu + newTable + "</table>");
		//builder.add("REPLACED");
		
		showAantalAanvallen(targets.length, aantalCommandos);
	});
	
	$("#filterAanval").bind('click', function() {
		var goners = $();
		$("#incomings_table tr:gt(0)").not("tr:last").each(function() {
			if ($.trim($("td:first", this).text()) != "Aanval")
			{
				goners = goners.add($(this));
				$(":checkbox", this).attr("checked", false);
			}
		});
		goners.hide();
	});
}




else if (location.href.indexOf('screen=place') > -1 && $("#attack_name").size() > 0)
{
	// RALLYPOINT CONFIRM
	// automatisch focus zetten op OK button bij aanvallen
	if (user_data.proStyle && user_data.autoAttackFocus)
	{
		$("input[name='submit']").focus();
	}
	
	if (user_data.proStyle && user_data.replaceNightBonus)
	{
		var nacht = $("#contentContainer span.warn");
		if (nacht.size() == 1)
		{
			$("#date_arrival").css("background-color", user_data.colors.error).css("font-weight", "bold");
			nacht.hide();
		}
		
		if (user_data.proStyle && user_data.replaceTribeClaim)
		{
			var claim = $("h3.error");
			if (claim.size() == 1)
			{
				claim.hide().prev().addClass("error").text(claim.prev().text() + " - " + claim.text());
			}
		}
		
		if (user_data.proStyle)
			$("#content_value table:first").css("width", 500);
	}
	
	var attackFrame = $("#content_value");
	var infoTable = $("table.vis:first td:odd", attackFrame);
	var doel = infoTable.first().text();
	
	// laatste aanval onthouden
	// op de confirmatie pagina zodat ongeldige doelen nooit de
	// laatste aanval kunnen worden
	var village = getVillageFromCoords(doel);
	if (village.isValid)
	{
		setCookie("lastVil", village.coord, 30);
	}
	
	if (user_data.attackAutoRename)
	{
		var isAttack = $("input[name='attack']").val() == "true";
		
		var isBarbarian = infoTable.size() == (isAttack ? 4 : 3);
		var speler = (isBarbarian ? '': infoTable.eq(1).text());
		//var duur = infoTable.eq(2).text();
		//var aankomst =infoTable.eq(3).text();
		//var aankomstSec = aankomst.substr(aankomst.lastIndexOf(':') + 1);
		//aankomstSec = aankomstSec.substr(0, aankomstSec.indexOf(' '));
		//var moraal = infoTable.eq(4).text();
		
		var unitsSent = {};
		$.each(world_data.units, function(i, val) {
			unitsSent[val] = $("input[name='"+val+"']", attackFrame).val() * 1;
			});
		var unitsCalc = calcTroops(unitsSent);
		if (!unitsCalc.isScout && !unitsCalc.isMatch(isAttack ? 'off' : 'def')) $("h2:first", attackFrame).css("background-color", user_data.colors.error);
		
		var villageCoord = $("input[name='x']", attackFrame).val() + '|' + $("input[name='y']", attackFrame).val();
		var sent = buildAttackString(villageCoord, unitsSent, speler, !isAttack);
		document.title = game_data.village.coord + " -> " + sent;
		sent = (isAttack ? "Aanval op " : "Ondersteuning voor ") + doel + "\\" + sent;
		
		var rand = Math.floor(Math.random() * 1000);
		setCookie("attRen" + rand, game_data.village.id + '_' + sent, 10);
	}
	
	/*$("input[name='submit']", attackFrame)
		.bind("click", 
			function()
			{
		
			});*/
}




else if (location.href.indexOf('screen=ally') > -1 && location.href.indexOf('mode=tribalwars') > -1 && (location.href.indexOf('submode=running') > -1 || location.href.indexOf('submode=') == -1))
{
	var tableRows = $("table.vis:last tr:gt(0)");
	tableRows.each(
		function()
		{
			var link = $("a:eq(1)", this).attr("href");
			$("td:first", this).prepend("<a href='" + link + "' title='"+trans.sp.tribalWars.showStatistics+"'><img src='graphic/dots/green.png'></a> &nbsp;");
		});
}






else if (location.href.indexOf('screen=market') > -1)
{
	// MARKET
	if (location.href.indexOf('try=confirm_send') > -1)
	{
		if (user_data.proStyle && user_data.autoMarketFocus)
			$("input[type='submit']").focus();
	}
	else if (location.href.indexOf('&mode=') == -1 || location.href.indexOf('&mode=send') > -1)
	{
		if (location.href.indexOf('try=confirm_send') == -1)
		{
			// Spice up market:
			// 120 x 106 pixels: er is een market1, 2 en 3.jpg: Hierdoor blijft de OK knop op dezelfde plaats staan
			if (user_data.proStyle && user_data.marketResizeImage)
				$("img[src^='graphic/big_buildings/market']").width(120).height(106);
			
			// New last village:
			$("input[type='submit']").bind("click", function() {
				var village = getVillageFromCoords($("#inputx").val()+"|"+$("#inputy").val());
				if (village.isValid)
				{
					setCookie("lastVil", village.coord, 30);
				}
			});
			
			// Add last & doel
			var vilHome = getVillageFromCoords(game_data.village.coord);
			
			var targetLocation;
			targetLocation = $("table.vis:eq(4)");
			var cookie = getCookie("lastVil");
			var coord = getVillageFromCoords(cookie);
			var htmlStr = '';
			if (coord.isValid)
			{
				var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, 'merchant');
				htmlStr = printCoord(coord, "&raquo; "+trans.sp.all.last+": "+coord.x+"|"+coord.y);
				htmlStr += "&nbsp; <span id=lastVilTime>" + dist.html + "</span>";
			}
			
			// doelwit erbij zetten
			var doel = getVillageFromCoords(getCookie('doelwit'));
			if (doel.isValid)
			{
				var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, 'merchant');
				if (htmlStr.length > 0) htmlStr += "<br>";
				htmlStr += printCoord(doel, "&raquo; "+trans.sp.all.target+": "+doel.x+"|"+doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>";
			}
			
			if (htmlStr.length > 0)
				targetLocation.append("<tr><td colspan=2>" + htmlStr + "</td></tr>");
		
			
		
		
			// Calculate total resources sent
			var table = $("table.vis:last");
			if (table.prev().text() == trans.tw.market.incomingTransports)
			{
				var sent = {Leem: 0, Hout: 0, IJzer: 0};
				table.find("tr:gt(0)").each(function() {
					var cell = $(this).find("td:eq(1)");
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
				
				table.append("<tr><th>"+trans.sp.all.total+":</th><td colspan=3><img src=graphic/holz.png> "+formatNumber(sent.Hout)+"&nbsp; <img src=graphic/lehm.png> "+formatNumber(sent.Leem)+"&nbsp; <img src=graphic/eisen.png> "+formatNumber(sent.IJzer)+"</td></tr>");
			}
		}
	}
}




else if (location.href.indexOf('screen=place') > -1 && location.href.indexOf('mode=units') > -1 && location.href.indexOf('try=back') == -1)
{
	// RALLYPOINT UNITS THERE
	var vilHome = getVillageFromCoords(game_data.village.coord);
	if ($("#units_away").size() != 0)
	{
		// Troops in other villages
		var otherUnitsTable = $("#units_away").width("100%");
		$("tr:first", otherUnitsTable).append("<th>"+trans.sp.place.distance+"</th><th>"+trans.sp.place.backOn+"</th>");
		otherUnitsTable.find("tr:gt(0):even").each(
			function()
			{
				var row = $(this);
				var villageCoord = getVillageFromCoords(row.find("td:eq(1)").text());
				
				if (!villageCoord.isValid) row.append("<th>&nbsp;</th><th>&nbsp;</th>");
				else
				{
					var slowestUnit = null;
					var slowestUnitName = null;
					$.each(world_data.units, function(i, val) {			
						var amount = $("td:eq("+(i+2)+"), th:eq("+(i+1)+")", row).text();
						if (amount != '0')
						{
							if (slowestUnit == null || slowestUnit < world_data.unitsSpeed['unit_'+val])
							{
								slowestUnitName = val;
								slowestUnit = world_data.unitsSpeed['unit_'+val];
							}
						}
					});
					
					var fields = getDistance(vilHome.x, villageCoord.x, vilHome.y, villageCoord.y, slowestUnitName);
					var extraColumns = "<td align=right>" + parseInt(fields.fields) + "</td>";
					extraColumns += "<td>" + twDateFormat(fields.arrivalTime) + "</td>";
					
					row.append(extraColumns);
				}
			});
	}
	
	var unitsTable = $("form table:first");
	$("tr:first", unitsTable).append('<th width="50"><img src="graphic/face.png" title="'+trans.sp.all.population+'" alt="" /></th><th>'+trans.sp.place.distance+' <input id=distanceSort type=button value="'+trans.sp.place.sort+'"></th><th>'+trans.sp.place.backOn+'</th>');
	unitsTable.find("tr:gt(0)").each(function() {
		var pop = 0;
		var row = $(this);
		var slowestUnit = null;
		var slowestUnitName = null;
		
		$.each(world_data.units, function(i, val) {			
			var amount = $("td:eq("+(i+1)+"), th:eq("+(i+1)+")", row).text();
			if (amount != '0')
			{
				pop += amount * world_data.unitsPositionSize[i];
				
				if (slowestUnit == null || slowestUnit < world_data.unitsSpeed['unit_'+val])
				{
					slowestUnitName = val;
					slowestUnit = world_data.unitsSpeed['unit_'+val];
				}
			}
		});
		
		var villageCoord = getVillageFromCoords(row.find("td:first").text());
		
		var color = world_data.calculateFarmLimit ? getStackColor(pop, 30 * world_data.farmLimit) : "transparant";
		grandTotaal = "<td style='background-color: "+color+"'>"+formatNumber(pop)+"</td>";
		
		if (color != "transparant")
			$(this).append("<td align=right style='background-color: "+color+"'>"+formatNumber(pop)+"</td><td colspan=2>&nbsp;</td>");
		else
		{
			var extraColumns = '<td align=right>'+formatNumber(pop)+'</td>';
			if (!villageCoord.isValid) extraColumns += "<td colspan=2 align=right>&nbsp;</td>";
			else
			{
				//alert(vilHome.x + ':' + slowestUnitName);
				var dist = getDistance(vilHome.x, villageCoord.x, vilHome.y, villageCoord.y, slowestUnitName);
				var fields = parseInt(dist.fields);
				extraColumns += "<td align=right>" + fields + "</td><td>"+twDateFormat(dist.arrivalTime)+"</td>";
				$(this).addClass("toSort").attr("fields", fields);
			}
			$(this).append(extraColumns);
		}
	});
	
	$("#distanceSort").focus().click(function() {
		unitsTable.find("tr.toSort").sortElements(function(a, b){
		    return $(a).attr("fields") * 1 > $(b).attr("fields") * 1 ? 1 : -1;
			});
	});
}









else if (location.href.indexOf('screen=place') > -1)
{
	// RALLYPOINT PLACE Wider table
	if (user_data.rallyPointAttackBoxWidth != null && user_data.rallyPointAttackBoxWidth > 0)
	{
		var commandsTable = $("h3:contains('"+trans.tw.place.troopMovements+"')");
		if (commandsTable.size() > 0)
		{
			commandsTable = commandsTable.next();
			$("th[width='250']", commandsTable).attr("width", user_data.rallyPointAttackBoxWidth);
		}
	}
	
	// Auto rename attacks
	//setCookie("attRen", "", 0);
	if (user_data.attackAutoRename)
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
				
				if (id.length > 0 && thisVil == game_data.village.id)
				{
					var rename = $("input[value='" + id + "']");
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
	var vilHome = getVillageFromCoords(game_data.village.coord);
	var snelheidCookie = twSnelheidCookie();
	
	// snelheid kunnen wijzigen & tonen!
	$("#units_form a img").bind("click", function() {
		var unit = this.src;
		unit = unit.substr(unit.lastIndexOf('/') + 1);
		unit = unit.substr(0, unit.lastIndexOf('.'))
		snelheidCookie = twSnelheidCookie(unit);
		$("#units_form a img").css("border", "0px").filter("img[src*='"+unit+"']").css("border", "3px red solid");
		
		// lastvil
		var coord = getVillageFromCoords(getCookie("lastVil"));
		if (coord.isValid)
		{
			var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
			$("#lastVilTime")[0].innerHTML = dist.html;
		}
		
		// doelvil
		coord = getVillageFromCoords(getCookie("doelwit"));
		if (coord.isValid)
		{
			dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
			$("#doelVilTime")[0].innerHTML = dist.html;
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
			$("#target_attack").parent().prev().append(htmlStr);
		}
		else
		{
			var htmlStr = printCoord(coord, "&raquo; Laatste: "+coord.x+"|"+coord.y);
			htmlStr += " &nbsp; <span id=lastVilTime>" + dist.html + "</span>";
			$("#units_form").append(htmlStr);
		}
	}
	
	// doelwit erbij zetten
	var doel = getVillageFromCoords(getCookie('doelwit'));
	if (doel.isValid)
	{
		var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, snelheidCookie);
		$("#units_form").append("<br>" + printCoord(doel, "&raquo; Doel: "+doel.x+"|"+doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>");
	}
	
	// Extra links bij "Alle troepen"
	var units = {};
	$("#units_form .unitsInput").each(function()
	{
		
		var amount = $(this).next().text().substr(1);
		units[this.name] = amount.replace(")", "") * 1;
	});
		
	function createRallyPointScript(linksVak, unitLoop, naam, min, checkFunction, tag)
	{
		send = {};
		$.each(unitLoop, function(i, v) {
			//if (v == 'light') alert(v + ' UNITS: ' + units[v] + ' >= MIN: ' + min + " ;; " + tag);
			if (units[v] >= min)
			{
				send[v] = checkFunction(units[v], v, tag);
				//if (v == 'light') alert(send[v]);
			}
			});
		linksVak.append("&nbsp; &nbsp;<a href='#' onclick='"+fillRallyPoint(send)+"; return false'>"+naam+"</a>");
	}
	
	var villageType = calcTroops(units);
	//alert("Def:" + totalDef + " - Off:" + totalOff);
	var linksVak = $('#selectAllUnits').parent().attr("colspan", 4)
	
	// add fake attack
	if (user_data.fakePlaceLink)
	{
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
			//alert(v + " // " + tag.toSend + " // " + amount);
			if (v == 'snob' || tag.toSend <= 0 || amount == 0) return 0;
			
			//alert('unit_'+v);
			var farmSize = world_data.unitsSize['unit_'+v];
			//alert(v + ' sends ' + amount + ' // toSend: ' + tag.toSend + " // farmSize: " + farmSize);
			if (amount * farmSize > tag.toSend) amount = Math.ceil(tag.toSend / farmSize);
			tag.toSend -= amount * farmSize;
			if (v == 'sword' && amount > 0)
			{
				tag.toSend++;
				amount--;
			}
			
			return amount;
		}, {toSend: minFake, rammed: false});
	}
	
	$.each(user_data.customPlaceLinks, function(i, v)
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
					//alert("send: " + send + " // amount: " + amount + " // unitVal: " + unitVal); 
					if (send < 0)
					{
						send = amount + send;
						if (send < 0) send = 1;
					}
					if ((amount - send) * world_data.unitsSize['unit_'+unitVal] < tag.sendAlong) send = amount;
					if (send > 0 && !tag.ignoreNobles)
					{
						$.each(user_data.nobleSupport, function(i, val) {
							if (unitVal == val.Unit && villageType.isMatch(val.VillageType)) 
								send -= Math.ceil(units.snob * (val.Population / world_data.unitsSize['unit_'+unitVal]));
						});
					}
					//if (unitVal == 'light') alert(send);
					
					if (send > amount) return amount;
					if (send > 0) return send;
				}
				return 0;
			}, v);
		}
	});
	
	if (units.spy >= user_data.scoutVillage && user_data.scoutPlaceLinks != null && user_data.scoutPlaceLinks.length > 0)
	{
		$.each(user_data.scoutPlaceLinks, function(i, v)
		{
			if (units.spy >= v)
				createRallyPointScript(linksVak, ["spy"], user_data.attackLinkNames.scout+v, 0, function(amount, v, tag) { 
					return tag;
				}, v);
		});
	}

	if (units.snob > 0 && user_data.noblePlaceLink)
	{
		createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleMax, 0, function(amount, v, tag) { 
			if (v == 'snob') return 1;
			if (tag > 0)
			{
				var returned = null;
				$.each(user_data.nobleSupport, function(i, val) {
					if (v == val.Unit && villageType.isMatch(val.VillageType)) 
						returned = amount - Math.ceil((tag - 1) * (val.Population / world_data.unitsSize['unit_'+v]));
				});
				if (returned != null) return returned;
			}
			return amount;
		}, units.snob);
		
		if (units.snob > 1 || user_data.noblePlaceLinksForceShow)
		{
			createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleMin, 0, function(amount, v, tag) { 
				if (v == 'snob') return 1;
				var returned = 0;
				$.each(user_data.nobleSupport, function(i, val) {
					if (v == val.Unit && villageType.isMatch(val.VillageType)) 
						returned = Math.ceil(1 * (val.Population / world_data.unitsSize['unit_'+v]));
				});
				return returned;
			});
		}
			
		if (units.snob > 1)
			createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleDivide, 0, function(amount, v, tag) { 
				if (v == 'snob') return 1;
				if (v == 'catapult') return 0;
				if (v == 'ram' && !user_data.noblePlaceLinkDivideAddRam) return 0;
				return Math.floor(amount / units.snob);
			});
	}
}

	
	builder.build();
	
	// Color resources
	resourceColoring();
	
	// Jump to custom position on the map
	mapJump();
	
	// adjust links to incoming attacks/support
	if (user_data.editAttackLink)
	{
		var incoming = $("table.box:last");
		var incomingAttacks = $("a[href$='subtype=attacks']", incoming);
		if (incomingAttacks.size() > 0)
		{
			incomingAttacks.attr("href", incomingAttacks.attr("href") + "&page=-1&group=0");
		}
		var incomingSupport = $("a[href$='subtype=supports']", incoming);
		if (incomingSupport.size() > 0)
		{
			incomingSupport.attr("href", incomingSupport.attr("href") + "&page=-1&group=0");
		}
	}
}
};

// Inject script in the page
(
 function()
 {
  	var script = document.createElement("script");
  	script.textContent = "(" + sangu_ready + ")()";
  	document.body.appendChild(script);
 }
)();