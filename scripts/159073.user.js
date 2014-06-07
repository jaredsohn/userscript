// ==UserScript==
// @name           Passion Updated
// @namespace      World-war_AutoCalc
// @description    Storm8 World War Auto Calc
// @version	   2.8.2011  by Passion GT
// @include        http://wwar.storm8.com/*
// @exclude        http://wwar.storm8.com/ajax/*
// ==/UserScript==




var INCOME	= 0;
var DEFENCE = 1;
var ENERGY	= 2;

var NAME	= 0;
var IMG		= 1;
var ATK		= 2;
var DEF		= 3;
var UPKEEP	= 4;
var OWNED	= 5;

var arrayBN = new Array ("Income", "Defence", "Energy");

var arrayC = new Array (
["CHINA", 	"4_60x33.png", 0],
["GERMANY", "1_60x33.png", 1],
["UK", 		"2_60x33.png", 2],
["USA", 	"3_60x33.png", 3],
["RUS", 	"5_60x33.png", 4]
);
var arrayBuilding = new Array (
//name, 						img, 		type, value(income, defence, energy), owned
["Supply Depot", 				"1.png", 	INCOME, 	1000, 	0],
["Bunker", 						"2.png", 	DEFENCE, 	3, 		0],
["Refinery", 					"3.png", 	INCOME, 	6500, 	0],
["Barracks", 					"4.png", 	ENERGY, 	1, 		0],
["Guard Tower", 				"5.png", 	DEFENCE, 	10, 	0],
["Weapons Factory", 			"6.png", 	INCOME, 	16500, 	0],
["Anti-Aircraft Launcher", 		"7.png", 	DEFENCE, 	15, 	0],
["Power Plant", 				"8.png", 	INCOME, 	56000, 	0],
["Turret", 						"9.png", 	DEFENCE, 	32, 	0],
["Airfield", 					"10.png", 	ENERGY, 	2, 		0],
["Landmine Field", 				"11.png", 	DEFENCE, 	50, 	0],
["Oil Rig", 					"12.png", 	INCOME, 	270000, 0],
["Communications Center", 		"13.png", 	ENERGY, 	3, 		0],
["Military Research Lab", 		"14.png", 	INCOME, 	500000, 0],
["Automated Sentry Gun", 		"18.png", 	DEFENCE, 	75, 	0],
["Nuclear Testing Facility", 	"15.png", 	INCOME, 	700000, 0],
["Solar Satellite Network", 	"17.png", 	INCOME, 	1200000, 0],
["Fusion Reactor", 	            "20.png", 	INCOME, 	1400000, 0],
["Coastal Cannons",         	"21.png", 	DEFENCE, 	100,     0]
);
var arrayWeapon = new Array (
//Infantry
// 0Name, 								1img, 2atk, 3def, 4upkeep, 5owned, 6army type
["Minigunners",							"1m.png",	1,	1,	0,		0,	0],
["Fireteam",							"2m.png",	2,	1,	0,		0,	0],
["Marines",								"3m.png",	2,	2,	0,		0,	0],
["Paratroopers",						"4m.png",	4,	1,	0,		0,	0],
["Medics",								"5m.png",	0,	6,	0,		0,	0],
["Grenadiers",							"6m.png",	6,	1,	0,		0,	0],
["Snipers",								"7m.png",	3,	5,	100,	0,	0],
["Navy Seals",							"8m.png",	5,	4,	100,	0,	0],
["Heavy Machine Gunners",				"11m.png",	6,	4,	200,	0,	0],
["Rocketeers",							"9m.png",	9,	2,	200,	0,	0],
["Corner Shot Recon",					"15m.png",	10,	1,	300,	0,	0],
["Commandos",							"10m.png",	6,	6,	300,	0,	0],
["Aerial Vehicle Squad",				"18m.png",	12,	4,	600,	0,	0],
["XM-25 Gunner",						"16m.png",	14,	3,	700,	0,	0],
["Tank Blasters",						"12m.png",	17,	5,	1000,	0,	0],
["PackBot Robot Troopers",				"19m.png",	24,	4,	1600,	0,	0],
["FELIN Combat Infantry",				"17m.png",	27,	9,	2400,	0,	0],
["Heavy Assault Squad",					"13m.png",	28,	16,	3000,	0,	0],
["Future Force Warrior Squad",			"20m.png",	42,	12,	6000,	0,	0],
["LW50 Machine Gun Squad",				"21m.png",	55,	10,	9000,	0,	0],
["M110 Sniper Team",					"22m.png",	65,	9,	12000,	0,	0],
["XM-307 Grenade Machine Gun Squad",	"23m.png",	75,	10,	15600,	0,	0],
["Railgun Troopers",					"14m.png",	90,	4,	19200,	0,	0],
["Mobile Infantry Marines",				"24m.png",	95,	10,	24000,	0,	0],
// Loot
["Prisoner",							"1007m.png",0,	1,	0,		0,	0],
["Cadet Squad",							"1008m.png",1,	0,	0,		0,	0],
["Patrol Unit",							"1009m.png",1,	2,	0,		0,	0],
["Light Machine Gunner",				"1010m.png",3,	1,	0,		0,	0],
["Avionics Engineers",					"1056m.png",3,	5,	0,		0,	0],
["Biosoldier Unit",						"1013m.png",6,	3,	0,		0,	0],
["Bioweapon Scientists",				"1060m.png",4,	6,	0,		0,	0],
["Rebel Fighter",						"1015m.png",4,	7,	0,		0,	0],
["Nuclear Squad",						"1017m.png",10,	5,	1000,	0,	0],
["Stealth Infiltrator ",				"1065m.png",14,	6,	1000,	0,	0],
["GMS Lynx Rifle Squad",				"1048m.png",37,	72,	0,		0,	0],
["Exosuit Infantry",					"1043m.png",15,	24,	0,		0,	0],
["Big Dog Robot",						"1046m.png",17,	21,	0,		0,	0],
//Ground
// Name, img, atk, def, upkeep, owned
["Supply Truck",						"51m.png",	2,	2,	0,		0,	1],
["Hum-Vee",								"52m.png",	3,	2,	0,		0,	1],
["Light Tank",							"53m.png",	6,	4,	0,		0,	1],
["Mobile Artillery",					"54m.png",	9,	6,	0,		0,	1],
["Armored Personnel Carrier",			"55m.png",	5,	18,	700,	0,	1],
["Stealth Tank",						"56m.png",	20,	13,	1400,	0,	1],
["Heavy Equipment Transporter",			"57m.png",	10,	35,	2100,	0,	1],
["Amphibious Assault Vehicle",			"60m.png",	28,	24,	2800,	0,	1],
["SSM Launcher",						"58m.png",	42,	17,	3600,	0,	1],
["Armored Snow Hovercraft",				"61m.png",	19,	48,	4800,	0,	1],
["Mammoth Tank",						"59m.png",	45,	30,	6400,	0,	1],
["Otokar Cobra Armored Vehicle",		"64m.png",	36,	50,	10500,	0,	1],
["M-ATV Ambush Protected Vehicle",		"65m.png",	46,	51,	16000,	0,	1],
["AHED Hybrid Electric Tank",			"66m.png",	54,	54,	22000,	0,	1],
["Predator Armored Tank",				"62m.png",	71,	49,	25000,	0,	1],
["Piranha V Armored Vehicle",			"67m.png",	83,	57,	33000,	0,	1],
["Warthog Tracked Carrier",				"68m.png",	90,	60,	39000,	0,	1],
["Black Knight Unmanned Combat Vehicle","69m.png",	115,50,	45000,	0,	1],
["Hellfire Tank",						"63m.png",	108,72,	55000,	0,	1],
["Expeditionary Fighting Vehicle",		"70m.png",	118,74,	69000,	0,	1],
["T-95 Battle Tank",					"71m.png",	125,78,	84000,	0,	1],
["XM 1202 Mounted Combat System",		"72m.png",	130,82,	108000,	0,	1],
["Titan Self Propelled Artillery Tank",	"73m.png",	140,85,	150000,	0,	1],
["MIM-72 Chaparral",                	"77m.png",	137,99,	160000,	0,	1],
["G6 Howitzer",	                        "83m.png",	156,96,	170000,	0,	1],
["2S19 Msta",	                        "76m.png",	143,125,190000,	0,	1],
["Astros-II MLRS",	                    "74m.png",	183,111,210000,	0,	1],
["PZA Loara AA System",               	"75m.png",	149,165,230000,	0,	1],
["PZH 2000",			               	"80m.png",	210,106,260000,	0,	1],
["MBT-2000",    			           	"82m.png",	152,184,300000,	0,	1],
["Terrex Infantry Combat Vehicle",		"1050m.png",110,80,	0,		0,	1],
//Loot
["Caterpillar Track Tank",				"1005m.png",6,	12,	0,		0,	1],
["Flame Tank",							"1001m.png",14,	5,	0,		0,	1],
["Robotic Tank Drone",					"1024m.png",10,	10,	0,		0,	1],
["AMX-30 Air Defense Tank",				"1022m.png",7,	12,	0,		0,	1],
["Willys Army Jeep",					"1035m.png",8,	9,	0,		0,	1],
["Fast Attack Vehicle",					"1036m.png",11,	7,	0,		0,	1],
["Torpedo Launcher",					"1028m.png",12,	7,	0,		0,	1],	//
["Mobile Howitzer Cannon",				"1012m.png",13,	15,	2000,	0,	1],
["Wiesel 2 Mortar Unit",				"1057m.png",21,	12,	3000,	0,	1],
["M163 Anti-aircraft Vehicle",			"1058m.png",24,	18,	5000,	0,	1],
["SA-8 Gecko Missile Launcher",			"1059m.png",15,	33,	6000,	0,	1],
["Koalitcia-SV Artillery",				"1063m.png",47,	29,	16000,	0,	1],
["NLOS-C",								"1018m.png",52,	25,	7000,	0,	1],
["Patriot Missile System",				"1067m.png",60,	100,112000,	0,	1],
["BMP 3M Armored Personnel Carrier",	"1049m.png",40,	65,	0,		0,	1],	// Unknown Shipment unit
["Amphibious Assault Vehicle (v2)",		"1041m.png",55,	25,	0,		0,	1],
["CV90120T Tank",						"1044m.png",60,	40,	0,		0,	1],
["Obyekt 500 SPAAG",					"84m.png",  38,	53,	33000,	0,	1],	
["Black Widow PMC Operatives",			"1100m.png",40,	35,	6000,	0,	1],	
["Aegis Defense PMC Operatives",		"1101m.png",70,	85,	30000,	0,	1],		
// Water
// Name,	img,	atk,	def,	upkeep,	owned
["Cruiser",								"101m.png",	4,	2,	0,		0,	2],
["Transport",							"102m.png",	2,	7,	0,		0,	2],
["Frigate",								"103m.png",	11,	5,	0,		0,	2],
["Naval Tanker",						"104m.png",	8,	20,	0,		0,	2],
["Naval Destroyer",						"105m.png",	27,	15,	2000,	0,	2],
["M80 Stiletto",						"109m.png",	15,	35,	2900,	0,	2],
["Submarine",							"106m.png",	45,	10,	3400,	0,	2],
["Helicopter Carrier",					"110m.png",	28,	34,	5100,	0,	2],
["Battleship",							"107m.png",	42,	28,	6200,	0,	2],
["Aircraft Carrier",					"108m.png",	40,	60,	11700,	0,	2],
["Horizon Frigate",						"113m.png",	45,	65,	17200,	0,	2],
["Borey Class Missile Submarine",		"114m.png",	62,	62,	25000,	0,	2],
["Type 45 Destroyer",					"115m.png",	80,	50,	33000,	0,	2],
["Scorpene Submarine",					"116m.png",	74,	74,	38000,	0,	2],
["DDG 1000 Destroyer",					"117m.png",	90,	70,	46000,	0,	2],
["Elite Dreadnought",					"111m.png",	94,	78,	51000,	0,	2],
["Astute Class Submarine",				"119m.png",	95,	93,	58000,	0,	2],
["FSF-1 Sea Fighter",					"118m.png",	85,	105,60000,	0,	2],
["HSV-2 Swift",							"120m.png",	110,92,	70000,	0,	2],
["CG(X) Guided Missile Cruiser",		"121m.png",	95,	115,107000,	0,	2],
["UXV Combatant",						"122m.png",	130,90,	130000,	0,	2],
["Mukha Antisubmarine Ship",			"123m.png",	107,121,168000,	0,	2],
["Kanimbla AT Ship",	         		"128m.png",	118,125,180000,	0,	2],
["Houbei Missile Ship",		        	"132m.png",	140,120,210000,	0,	2],
["Albion Landing Platform Dock",		"129m.png",	120,163,230000,	0,	2],
["Type 23 Frigate",	            		"124m.png",	131,171,250000,	0,	2],
["SPY-1D Destroyer",                	"125m.png",	175,152,280000,	0,	2],
["Bay-Class Landing Ship Dock",		    "130m.png",	149,192,300000,	0,	2],
["Fridtjof Nansen-Class Frigate",		"126m.png",	155,210,350000,	0,	2],	
["Nuclear Battlecruiser",				"112m.png",	250,210,975000,0,	2],	//
//Loot
["Corvette",							"1011m.png",9,	4,	0,		0,	2],
["Sea Shadow Stealth Cruiser",			"1003m.png",11,	11,	0,		0,	2],
["PHM-1 Pegasus Hydrofoil Cruiser",		"1023m.png",6,	17,	0,		0,	2],
["Thresher Submarine",					"1014m.png",34,	14,	3000,	0,	2],
["Nuclear Submarine",					"1019m.png",65,	20,	8000,	0,	2],
["Guardian Patrol Boat",				"1061m.png",46,	37,	21000,	0,	2],
["Amphibious Command Ship",				"1064m.png",55,	66,	54000,	0,	2],
["Zubr Class Hovercraft",				"1068m.png",112,112,325000,	0,	2],
["F124 Sachsen Class Frigate",			"1052m.png",80,	110,	0,	0,	2],	// Unknown Shipment unit
["DDH 181 Hyuga Carrier",				"1051m.png",135,135,	0,	0,	2],
["LCS-2 Littoral Combat Ship",			"1045m.png",38,	62,		0,	0,	2],
// Air
// Name,	img,	atk,	def,	upkeep,	owned
["Fighter",								"151m.png",	6,	1,	0,		0,	3],
["Cargo Chopper",						"152m.png",	6,	4,	0,		0,	3],
["Patrol Plane",						"153m.png",	12,	3,	0,		0,	3],
["Harrier Jet",							"154m.png",	24,	5,	0,  	0,	3],
["Comanche Helicopter",					"155m.png",	25,	13,	2100,	0,	3],
["B-1 Lancer",							"156m.png",	50,	2,	3600,	0,	3],
["Stealth Jet",							"157m.png",	50,	15,	6000,	0,	3],
["X-20 Supersonic Aircraft",			"160m.png",	68,	6,	7200,	0,	3],
["Apache Helicopter",					"158m.png",	52,	30,	8400,	0,	3],
["B-2 Bomber",							"159m.png",	110,5,	13000,	0,	3],
["F-18 Super Hornet Fighter",			"171m.png",	117,10,	23000,	0,	3],
["IAI Harop UAV",						"163m.png",	135,0,	0,  	0,	3],
["F-15 Silent Eagle Fighter",			"164m.png",	142,12,	36000,	0,	3],
["Havoc Helicopter",					"161m.png",	102,65,	46000,	0,	3],
["MQ-8B Fire Scout Helicopter",			"165m.png",	170,0,	0,  	0,	3],
["Mitsubishi F3 Interceptor",			"166m.png",	160,30,	65000,	0,	3],
["BAE Mantis UAV",						"167m.png",	180,0,	0,  	0,	3],
["AV-22 War Osprey Gunship",			"172m.png",	182,16,	80000,	0,	3],
["PAK-FA Fighter",						"168m.png",	190,18,	102000,	0,	3],
["Sikorsky X2 Helicopter",				"169m.png",	160,70,	156000,	0,	3],
["Boeing NGB Bomber",					"170m.png",	225,22,	210000,	0,	3],
["F-14 Tomcat",			        		"174m.png",	184,72,	250000,	0,	3],
["Aurora Aircraft",						"162m.png",	165,100,270000,	0,	3],
["Bird of Prey Stealth Jet",			"181m.png",	233,65, 300000,	0,	3],
["Shenyang J-8",						"179m.png",	245,78, 330000,	0,	3],
["CH-53E Hurricane Maker",  			"177m.png",	205,146,370000,	0,	3],
["UH-1Y Venom",							"176m.png",	272,90,	400000,	0,	3],
["X-45 UAV",							"182m.png",	280,0,		0,	0,	3],
["IAI Heron",							"186m.png",	233,178,470000,	0,	3],	
// Loot
["SR-71 Blackbird",						"1002m.png",17,	4,	0,		0,	3],
["RQ-1 Predator",						"1004m.png",15,	4,	0,		0,	3],
["F-201 Starfighter",					"1006m.png",11,	9,	0,		0,	3],
["F-35 Lightning II Fighter",			"1020m.png",16,	6,	0,		0,	3],
["F-4 Phantom",							"1029m.png",14,	6,	0,		0,	3],
["AH-64 Cheyenne Helicopter",			"1031m.png",10,	10,	0,		0,	3],
["A-10 Thunderbolt II",					"1032m.png",11,	8,	0,		0,	3],
["Hind Helicopter",						"1034m.png",11,	10,	0,		0,	3],
["F-16 Fighting Falcon",				"1033m.png",10,	10,	0,		0,	3],
["Raptor Jet",							"1016m.png",45,	14,	5000,	0,	3],
["Annihilator Fighter",					"1027m.png",54,	21,	7000,	0,	3],
["SU-34 Fullback Bomber",				"1062m.png",80,	20,	28000,	0,	3],
["Eurocopter Tiger",					"1066m.png",110,56,	109000,	0,	3],
["Dark Sword Aircraft",					"1069m.png",145,125,390000,	0,	3],
["Eurofighter Typhoon",					"1042m.png",72,	48,	0,		0,	3],
["X-29 FSW Fighter",					"1054m.png",170,20,	0,		0,	3],
["JAS 39 Gripen Fighter",				"1053m.png",200,40,	0,		0,	3],
["KA-52 Alligator Helicopter",			"1055m.png",150,80,	0,		0,	3],
["SU-47 Berkut Fighter",				"1040m.png",50,	20,	0,		0,	3],
["E-3 Sentry",							"180m.png",	73,	42,	44000,	0,	3],
["A129 Mangusta Helicopter",			"1039m.png",20,	25,	0,		0,	3], // UNKNOWN SHIPMENT
["Steel Talon PMC Operatives",			"1102m.png",145,115,250000,	0,	3] // UNKNOWN SHIPMENT
);

function $setObj(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
 
function $getObj(key) {
    return JSON.parse(localStorage.getItem(key));
}

// http://www.jslab.dk/library/Array.copy
Array.prototype.copy =
  function() {
    return [].concat(this);
  };

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

function sortByAtk(a, b) {
	var x = a[2], y = b[2];
	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}

function sortByDef(a, b) {
	var x = a[3], y = b[3];
	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}

function sortByOwned(a, b) {
	var x = a[4], y = b[4];
	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}

function Comma(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
		if ((mod == 0) && (i == 0))
			output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
		else
			output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
else return number;
}

function gup( name, url ){  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  var regexS = "[\\?&]"+name+"=([^&#]*)";  var regex = new RegExp( regexS );  var results = regex.exec( url );  if( results == null )    return "";  else    return results[1];}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


// fix display issues
document.getElementsByTagName('html')[0].style.display = '';
var link = document.getElementsByTagName('link');
	for (var i=0; i<link.length; i++) link[i].media ='';	

document.body.style.background='black';
document.body.style.overflowX='hidden';
document.getElementsByClassName('topBar')[0].style.width = '100%';
document.getElementsByClassName('topBarBg')[0].style.width = '100%';
document.getElementById('cashTimerDiv').style.width = '100%';

//**********************************************
// GET INFO FROM REFRESHED PAGE  ***************
//**********************************************
  var DEBUG=1;
  var DEBUG_BUILDING = 1;
  var DEBUG_PROFILE_ON = 0;
  var DEBUG_SHOW_ITEM = 1;
  var done=0;
  var settingsOpen = false;
  var msg = '';
  var delay = 2000; //2 seconds

if (location.href.indexOf('/home.php') != -1) { home();}

function home()
{
	o = new Object();
	o.uid = parseInt(getCookie("uid"));

//	localStorage.setItem(o.uid, o.ally);
	if ($getObj(o.uid)) o=$getObj(o.uid);
	o.ally = parseInt(document.getElementsByClassName("crewCount")[0].innerHTML);
	$setObj(o.uid, o);
}

// create navigation menu
desc = document.getElementById("topBar");
descP = desc.parentNode;
var menu = document.createElement("div");
menu.setAttribute("id","wwhelpermenu");
menu.innerHTML = "[<a href=\"home.php\">Passion</a>] [<a href=\"missions.php\">Mission</a>] [<a href=\"fight.php\">Battle</a>] [<a href=\"hitlist.php\">Sanc</a>] [<a href=\"equipment.php?cat=3\">Units</a>] [<a href=\"investment.php\">Bdlg</a>] [<a href=\"profile.php?x=1&selectedTab=comment&formNonce=0c31b3e0b3ded7c177f74638898a438d2207640e&h=16475f575ad6e5d9c4a0c989d2f805a8be8b8371\">Wall</a>] [<a href=\"group.php\">Recruit</a>] [<a href=\"group_member.php?tab=group.php\">Ally</a>] [<a href=\"profile.php?selectedTab=main\">Profile</a>]";
menu.style.padding = '10px';
descP.insertBefore(menu, desc);

// widen the comments stuff
if (document.getElementsByClassName("commentTable").length > 0)
{
  var comments = document.getElementsByClassName("commentTable")[0];
  comments.style.width = '90%';
  var ctext = document.getElementsByClassName("commentText");
  for (i in ctext)
    ctext[i].style.width = '100%';
  var text = document.getElementsByTagName("textarea")[0];
  text.style.width = '90%';
  text.rows = "5";
}

// and the newsfeed
if (document.getElementsByClassName("newsFeedItem").length > 0)
{
  var feed1 = document.getElementsByClassName("newsFeedItem");
  for (i in feed1)
    feed1[i].style.width = '90%';
  var feed2 = document.getElementsByClassName("newsFeedItemMsg");
  for (i in feed2)
    feed2[i].style.width = '100%';
}

if (location.href.indexOf('/profile.php') != -1) profile();

function profile()
{
	if (document.getElementsByClassName("sectionHeader").length == 0) return;
	  
		o = new Object();
		var newP = document.getElementsByClassName("sectionContent")[0];
		var newMenu = document.createElement("div");
		var newMsg;

		o = doCalc(document);
		newMenu.setAttribute("id","newMenu");
		newMsg = "<TABLE>";
		newMsg += "<TR><TD class='statsCol1'>UserID</TD><TD class='statsCol2'>" + o.uid + "</TD>";
		newMsg += "<TD class='statsCol3'>Alliance</TD><TD class='statsCol4'>" + o.ally + "</TD></TR>";
		newMsg += "<TR><TD class='statsCol1'>Attack Points</TD><TD class='statsCol2'>" + Comma(o.atk) + "</TD>";
		newMsg += "<TD class='statsCol3'>Defense Points</TD><TD class='statsCol4'>" + Comma(o.def+o.buildingdef) + "</TD></TR>";
		newMsg += "<TR><TD class='statsCol1'>Unit Defense</TD><TD class='statsCol2'>" + Comma(o.def) + "</TD>";
		newMsg += "<TD class='statsCol3'>Building Defense</TD><TD class='statsCol4'>" + Comma(o.buildingdef) + "</TD></TR>";
		newMsg += "<TR><TD class='statsCol1'>Income</TD><TD class='statsCol2'><span class = 'cash' style='white-space: nowrap;'><img height='12' width='15' style='' src='http://static.storm8.com/wwar/images/money.png?v=218'/>" + Comma(o.income) + "</span></TD></TR>";
		newMsg += "<TR><TD class='statsCol1'>Upkeep</TD><TD class='statsCol2'><span class = 'upkeepCost' style='white-space: nowrap;'><img height='12' width='15' style='' src='http://static.storm8.com/wwar/images/money.png?v=218'/>" +  Comma(o.upkeep) + "</TD></TR>";
		newMsg += "<TR><TD class='statsCol1'>Net Income</TD><TD class='statsCol2'><span class = 'cash' style='white-space: nowrap;'><img height='12' width='15' style='' src='http://static.storm8.com/wwar/images/money.png?v=218'/>" +  (Comma(o.income-o.upkeep)) + "</TD></TR>";
		newMsg += "</TABLE>";
		newMsg += "<TABLE><TR><TD class='statsCol1'><font color=yellow>Fight Log</FONT></TD><TD>" + o.fightLog + "</TD></TR></TABLE>";		
		newMenu.innerHTML = newMsg;
		newMenu.setAttribute("style", "font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px;");
		newP.parentNode.insertBefore(newMenu, newP);
}

if (location.href.indexOf('/fight.php') != -1) fight();

function fight()
{
	var arrayPuid = new Array();
	var arrayNeedUpdate = new Array();	
	var tmpHtml;
	var enemyP = document.getElementsByClassName("fightTable");
	
	if (document.getElementsByClassName("wonFight").length > 0 ){ // When attacke someone else, write event into log
	   tmpObj = new Object();
	   var rivalId = parseInt(gup ("rivalId", location.href));
	   var d=new Date();
	   var fightHistory = "W/" + (d.getMonth()+1) + "/" + d.getDate();
		
		// User is in DB
	   if($getObj(rivalId)) {
		   tmpObj = $getObj(rivalId);
		   if (tmpObj.fightLog) fightHistory += ", " + tmpObj.fightLog;
		   tmpObj.fightLog = fightHistory;
	     $setObj(tmpObj.uid, tmpObj);
	     tmpObj.fightLog = "";
	     fightHistory = "";
	   }
	    // User is not in DB
	   else {
			tmpObj.uid = rivalId;
			tmpObj.ally = 0; // need update
			tmpObj.name = ""; // Need update
			tmpObj.date = d;
			tmpObj.level = 0;
			tmpObj.atk = 0;
			tmpObj.def = 0;
			tmpObj.buildingdef = 0;
			tmpObj.income = 0;
			tmpObj.upkeep = 0;
			tmpObj.fightLog = fightHistory;
			$setObj(tmpObj.uid, tmpObj);
			tmpObj.fightLog = "";
			fightHistory = "";
	   }
	}

	if (document.getElementsByClassName("lostFight").length > 0 ){ // When you loose
	   tmpObj = new Object();
	   var rivalId = gup ("rivalId", location.href);
	   var d=new Date();
	   var fightHistory = "L/" + (d.getMonth()+1) + "/" + d.getDate();
		
		// User is in DB
	   if($getObj(rivalId)) {
		   tmpObj = $getObj(rivalId);
		   if (tmpObj.fightLog) fightHistory += ", " + tmpObj.fightLog;
		   tmpObj.fightLog = fightHistory;
	       $setObj(tmpObj.uid, tmpObj);
	       fightHistory = "";
	       tmpObj.fightLog = "";
	   }
	    // User is not in DB
	   else {
			tmpObj.uid = rivalId;
			tmpObj.ally = 0; // need update
			tmpObj.name = ""; // Need update
			tmpObj.date = d;
			tmpObj.level = 0;
			tmpObj.atk = 0;
			tmpObj.def = 0;
			tmpObj.buildingdef = 0;
			tmpObj.income = 0;
			tmpObj.upkeep = 0;
			tmpObj.fightLog = fightHistory;
			$setObj(tmpObj.uid, tmpObj);
	   }
	}


	for (var i=enemyP.length-1; i >= 0; i--){
		eObj = new Object();
		var elm = enemyP[i];
		var tmpAlly = parseInt(elm.getElementsByClassName("fightMobSize")[0].textContent.match(/\s+(\d+)/)[1]);
		var tmpHref=elm.getElementsByTagName("a")[1].href;
		// Check if uid is in DB
		arrayPuid[i] = parseInt(gup("puid",tmpHref));
		if ($getObj(arrayPuid[i])) {
			eObj = $getObj(arrayPuid[i]);
			// if ally is not changed, no need to update DB
			if (eObj.ally==tmpAlly) {
				arrayNeedUpdate[i] = 0;
				updateFightScreen(eObj, i);
			} else {
				//msg += "<BR>[UPDATE] UID : " + i + " " + eObj.name + " Ally in DB: " + eObj.ally + " Real Ally: " + tmpAlly;
				//msg += JSON.stringify(eObj);			
				eObj.ally = tmpAlly;
				eObj.date = new Date();
				$setObj(eObj.uid, eObj);
				arrayNeedUpdate[i] = 1;
			}
			// if DB is out of date, need update DB
			// if (eObj.date){}
		} else {
			arrayNeedUpdate[i] = 1;
			eObj.uid = arrayPuid[i];
			eObj.name = elm.getElementsByTagName("a")[1].textContent;//elm.getElementsByClassName("fightMobster")[0].textContent;
			eObj.ally = tmpAlly;
			eObj.date = new Date();
			$setObj(eObj.uid, eObj);
			//msg += "<BR>[NEW] " + i + JSON.stringify(eObj);
		}
	}

	for (var i=enemyP.length-1; i >= 0; i--){
		eOBj = new Object();
		var elm = enemyP[i];
		var tmpHref=elm.getElementsByTagName("a")[1].href;
		if (arrayNeedUpdate[i]) {

			GM_xmlhttpRequest({
				method: 'GET',
				url: tmpHref,
				onload: function(responseDetails) {
					if(responseDetails.status == 200){ 
						var tmpHtml = document.createElement("div");
						tmpHtml.innerHTML = responseDetails.responseText.toString();
						eObj=doCalc(tmpHtml);
						for (var y in arrayPuid)
							if (arrayPuid[y] == eObj.uid) { updateFightScreen(eObj, y); break;}
					} else {
						alert("Error from GM_xmlhttpRequest");
					} 
				}
			}); 
		} 
	}
}

function updateFightScreen(o, i)
{
	//setTimeout("window.location = 'http://wwar.storm8.com/profile.php?selectedTab=main'", 10*1000);
	if (o==0) GM_log("Error: " + i);

	var newP = document.getElementsByClassName("fightAction")[i];
	var newMenu = document.createElement("div");
	var newMsg;
	myObj = new Object();
	myObj = $getObj(parseInt(getCookie("uid")));
	if ((o.def+o.buildingdef) >= myObj.atk ) {newP.innerHTML = "Can't win";}
	else {newP.getElementsByClassName("fightActionInnerInner")[0].textContent = (Math.round((myObj.atk-o.def-o.buildingdef)/myObj.atk*100))};
		

	newMsg = "<TABLE style='width:250px;margin-top:0px;margin-bottom:0px;background-color:#000000;' border='0' cellpadding='0' cellspacing='0'>";
	//newMsg += "<TR><TD style='width:40px;'>PUID </TD><TD class = 'cash' > " + o.uid + "</TD>";
	newMsg += "<TR><TD style='width:40px;'>Units</TD><TD class = 'upkeepCost' >" + o.ally * 6 + "</TD>";
	newMsg += "<TD style='width:40px;'>Atk</TD><TD class = 'cash' >" + Comma(o.atk) + "</TD>";
	newMsg += "<TD style='width:40px;'>Def</TD><TD class = 'upkeepCost' >" + Comma(o.def+o.buildingdef) + "</TD></TR></TABLE>";
	newMsg += "<TABLE style='width:160px;margin-top:0px;margin-bottom:0px;background-color:#000000;' border='0' cellpadding='0' cellspacing='0'><TR><TD style='width:100px;font-size: 11px; font-weight: normal;'>Net Income</TD><TD class='statsCol2'><span class = 'cash' style='white-space: nowrap;'><img height='12' width='15' style='' src='http://static.storm8.com/wwar/images/money.png?v=218'/>" +  (Comma(o.income-o.upkeep)) + "</TD></TR>";
	newMsg += "</TABLE>";
	
	var now = new Date();
	var mobDate = new Date(o.date);
	var timeStr = '';
	if ( parseInt((now.getTime() - mobDate.getTime())/1000/60) == 0) timeStr = 'NEW';
	else if ( parseInt((now.getTime() - mobDate.getTime())/1000/60/60) == 0) timeStr = parseInt((now.getTime() - mobDate.getTime())/1000/60) + ' min';
	else if (parseInt((now.getTime() - mobDate.getTime())/1000/60/60) < 24)  timeStr = parseInt((now.getTime() - mobDate.getTime())/1000/60/60)  + ' hr';
	else timeStr = parseInt((now.getTime() - mobDate.getTime())/1000/60/60/24)  + ' days';
	newMsg += "<TABLE><TR><TD style='width:100px;font-size: 11px; font-weight: normal;'><font color=white>Last Update</font></TD><TD>" + timeStr + "</TD></TR></TABLE>";
		
	if (o.fightLog != "")newMsg += "<TABLE><TR><TD style='width:100px;font-size: 11px; font-weight: normal;'><font color=yellow>Fight Log</font></TD><TD>" + o.fightLog + "</TD></TR></TABLE>";
	newMenu.innerHTML = newMsg;
	newMenu.setAttribute("style", "font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px;");
	newP.parentNode.insertBefore(newMenu, newP.nextSibling);
}

function doCalc(docProfile)
{

	tmpItem = new Object();
	var itemCount = 0;
	var arrayW = arrayWeapon.clone();
	var arrayB = arrayBuilding.clone();
	var maxUnit = 0;
	o = new Object();
	// Get user ID
	o.uid = parseInt(gup("puid", docProfile.getElementsByClassName("sectionTabs")[0].getElementsByTagName("a")[0].href));
		if (! o.uid) o.uid = parseInt(getCookie("uid"));
	o.level = parseInt(docProfile.getElementsByClassName("profileRight")[0].innerHTML.split("Level ")[1].split(" ")[0]);
	// Get Object ally info from DB
	if ($getObj(o.uid))
	{
		o = $getObj(o.uid);
		if (o.ally == 0 || o.ally > o.level * 5) {maxUnit = o.level * 5 * 6;}
		else { maxUnit = o.ally * 6; }
	} else {
		maxUnit = o.level * 5 * 6;
		o.ally = 0;
	}

	// Initialize Object Info
	o.name = docProfile.getElementsByClassName("profileRight")[0].innerHTML.split("<b>")[1].split("</b>")[0];
	var now = new Date();
	o.date = now.toString();	
	o.level = parseInt(docProfile.getElementsByClassName("profileRight")[0].innerHTML.split("Level ")[1].split(" ")[0]);
	o.atk = 0;
	o.def = 0;
	o.income = 0;
	o.upkeep = 0;
	o.buildingdef = 0;
	if (! o.fightLog) o.fightLog = "";

	// get item information from profile page
	var snapResults = document.evaluate('//div/div/div/div[@style]',
				docProfile,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	for (var i = snapResults.snapshotLength-1; i >=0; i--) {
		var imgRegex = /\/med\/([^"]*)[png|jpg]/;
		var found = 0;
		var elm = snapResults.snapshotItem(i);
		if (imgRegex.test(elm.innerHTML)) {
			tmpItem.img = elm.innerHTML.split('/med/')[1].split('?')[0];
			tmpItem.owned = parseInt(elm.innerHTML.split('<div>x')[1].split('</div>')[0]);
			// Check WEAPONS
			if (!found) {
				for ( var y in arrayW ){
					if (tmpItem.img == arrayW[y][1]){
						found=1; tmpItem.name = arrayW[y][NAME]; tmpItem.atk = arrayW[y][ATK]; tmpItem.def = arrayW[y][DEF]; arrayW[y][OWNED] = tmpItem.owned; o.upkeep += arrayW[y][UPKEEP] * tmpItem.owned;
						if (DEBUG_SHOW_ITEM) {elm.innerHTML += "<div style='color: #AFAFAF;'>" + tmpItem.name + "<br>Atk <font color=red>" + tmpItem.atk + "</font> Def <font color=yellow>" + tmpItem.def + "</font></div>";}
						break;
					}
				}
			}
			// Check Buildings
			if (!found)	{
				for ( var y in arrayB ){
					if (tmpItem.img == arrayB[y][1]){
						found=1; tmpItem.name = arrayB[y][NAME]; tmpItem.type = arrayB[y][2]; tmpItem.value = arrayB[y][3]; arrayB[y][4] = tmpItem.owned;
						if (DEBUG_SHOW_ITEM) {elm.innerHTML += tmpItem.name + "<br>" + arrayBN[tmpItem.type] + " +<font color=yellow>" + Comma(tmpItem.value) + "</font>";}
						break;
					}
				}
			}
			//elm.innerHTML = elm.innerHTML.replace(/\/med\//g,"/sm/");
			//elm.innerHTML = elm.innerHTML.replace(/m.png/g,"s.png");
			if (DEBUG_SHOW_ITEM) {elm.innerHTML = elm.innerHTML.replace(/150/g,"65");}

		}
	}
	if (DEBUG_PROFILE_ON){
		msg += "<TABLE style='width:400px;margin-top:0px;margin-bottom:0px;background-color:#000000;' border='0' cellpadding='0' cellspacing='0'>";
		msg += "<TR style='background-color:#888888;'><TD>NAME</TD><TD width='40'> DEF</TD><TD width='40'>OWN</TD><TD width='40'>ACTIVE</TD><TD width='40' align='right'>SUM</TD></TR>";
	}
	// Calculate Defence Value
	arrayW.sort(sortByDef);
	itemCount = maxUnit;
	for ( var y in arrayW){
		if (itemCount == 0) break;
		if (arrayW[y][OWNED] == 0) continue;

			if (itemCount > arrayW[y][OWNED]){
				o.def += arrayW[y][DEF] * arrayW[y][OWNED];
				itemCount -= arrayW[y][OWNED];
				if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayW[y][NAME] + "</TD><TD align='right'>" + arrayW[y][DEF] + "</TD<TD align='right'> " + arrayW[y][OWNED] + "</TD<TD align='right'> "+ arrayW[y][OWNED] + "</TD><TD align='right'> " + Comma(arrayW[y][DEF] * arrayW[y][OWNED]) + "</TD></TR>"; }
			}
			else if (arrayW[y][OWNED] > 0){
				o.def += arrayW[y][DEF] * itemCount;
				if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayW[y][NAME] + "</TD><TD align='right'>" + arrayW[y][DEF] + "</TD<TD align='right'> " + arrayW[y][OWNED] + "</TD<TD align='right'> "+ itemCount + "</TD><TD align='right'> " + Comma(arrayW[y][DEF] * itemCount) + "</TD></TR>"; }
				itemCount = 0;
				break;
			}
	}
	if (DEBUG_PROFILE_ON){ msg += "<TR><TD> SUM </TD><TD></TD><TD></TD><TD></TD><TD align='right' style='font-size: 10pt;'>" + Comma(o.def) + "</TD></TR>";}
	// Calculate Attack Value
	if (DEBUG_PROFILE_ON){ msg += "<TR style='background-color:#888888;'><TD>NAME</TD><TD width='40'> ATK</TD><TD width='40'>OWN</TD><TD width='40'>ACTIVE</TD><TD width='40' align='right'>TOTAL</TD></TR>"; }
	arrayW.sort(sortByAtk);
	itemCount = maxUnit;
	for ( var y in arrayW){
		if (itemCount == 0) break;
		if (arrayW[y][OWNED] == 0) continue;
			if (itemCount > arrayW[y][OWNED]){
				// Normal points
				o.atk += arrayW[y][ATK] * arrayW[y][OWNED];
				itemCount -= arrayW[y][OWNED];
				if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayW[y][NAME] + "</TD><TD align='right'>" + arrayW[y][ATK] + "</TD<TD align='right'> " + arrayW[y][OWNED] + "</TD<TD align='right'> "+ arrayW[y][OWNED] + "</TD><TD align='right'> " + Comma(arrayW[y][ATK] * arrayW[y][OWNED]) + "</TD></TR>"; }
			}
			else if (arrayW[y][OWNED] > 0){
				// Normal points
				o.atk += arrayW[y][ATK] * itemCount;
				if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayW[y][NAME] + "</TD><TD align='right'>" + arrayW[y][ATK] + "</TD<TD align='right'> " + arrayW[y][OWNED] + "</TD<TD align='right'> "+ itemCount + "</TD><TD align='right'> " + Comma(arrayW[y][ATK] * itemCount) + "</TD></TR>"; }
				itemCount = 0;
				break;
			}
	}	
	if (DEBUG_PROFILE_ON){ msg += "<TR><TD> SUM </TD><TD></TD><TD></TD><TD></TD><TD align='right' style='font-size: 10pt;'>" + Comma(o.atk) + "</TD></TR>";}
	// Caluculate Building Defence Value
	if (DEBUG_PROFILE_ON){ msg += "<TR style='background-color:#888888;'><TD>BUILDING</TD><TD width='20'>TYPE</TD><TD width='20'>OWN</TD><TD width='60'>VALUE</TD><TD width='90' align='right'>SUM</TD></TR>"; }

	for ( var y in arrayB){
		if (arrayB[y][4] != 0){
			switch(arrayB[y][2]) {
				case DEFENCE:
					o.buildingdef += arrayB[y][3] * arrayB[y][4];
					if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayB[y][NAME] + "</TD><TD>DEF</TD><TD align='right'>" +  arrayB[y][4] + "</TD<TD align='right'> " + Comma(arrayB[y][3]) + "</TD><TD align='right'> " + Comma(arrayB[y][3] * arrayB[y][4]) + "</TD></TR>"; }
					break;
				case INCOME:
					o.income += arrayB[y][3] * arrayB[y][4];
					if (DEBUG_PROFILE_ON){ msg += "<TR><TD>" + arrayB[y][NAME] + "</TD><TD>INC</TD><TD align='right'>" +  arrayB[y][4] + "</TD<TD align='right'> " + Comma(arrayB[y][3]) + "</TD><TD align='right'> " + Comma(arrayB[y][3] * arrayB[y][4]) + "</TD></TR>"; }
					break;
				default:
					break;
			}
		}
	}
	if (DEBUG_PROFILE_ON){ msg += "</TABLE>"; }

	$setObj (o.uid, o);
	return o;
}


// **************************************************
// BUILDINGS: Investment Category, Show ROI and best Buildings
// **************************************************
if (location.href.indexOf('/investment.php') != -1)
{
  // modify buildings page to show building efficiency
  var buildings = document.getElementsByClassName("reTable");
  var buy_income_name;
  var buy_income_money;
  var buy_income_url;
  var buy_income_ratio=999999;
  var buy_defence_name;
  var buy_defence_money;
  var buy_defence_url;
  var buy_defence_ratio=999999;

  for (var i=0; i<buildings.length; i++)
  {
    var cols = buildings[i].getElementsByTagName("td");
    var returns = cols[0].getElementsByClassName("reInfoItem")[0];
  	var price;

		try {	price = (cols[2].getElementsByClassName("cash")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));	}
		catch(err) {break};

    if (price.lastIndexOf('K') > 0)
      price = parseInt(price) * 1000;
    else if (price.lastIndexOf('mil') > 0)
      price = parseFloat(price) * 1000000;
    else if (price.lastIndexOf('bil') > 0)
    	price = parseFloat(price) * 1000000000;
  
    var type = returns.innerHTML.split(":")[0];
    if (type == "Income" || type == "Defense")
    {
      var ratio = document.createElement("div");
      ratio.setAttribute('class','ratio');
      ratio.style.textAlign = 'center';
      if (type == "Income") // Income building
      {
  			var nret = returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,'');
  			if (nret.lastIndexOf('K') >0) nret = parseInt(nret) * 1000;
  			else if (nret.lastIndexOf('mil') > 0) nret = parseFloat(nret) * 1000000;
        var tmp_ratio = Math.round(price * 10 / nret)/10;
        // need optimization *******************
        if ( tmp_ratio < buy_income_ratio) { 
          buy_income_ratio=tmp_ratio; 
          buy_income_name = buildings[i].getElementsByClassName("reName")[0].innerHTML;
          buy_income_money = parseInt(price);
          buy_income_url = buildings[i].getElementsByTagName("a")[0];
        }
      }
      else // Defence building
	  {
        var nret = parseInt(returns.getElementsByClassName("defense")[0].innerHTML.substr(1)) * 500;
        var tmp_ratio = Math.round(price * 10 / nret)/10;
        // need optimization *******************
        if ( tmp_ratio < buy_defence_ratio) { 
          buy_defence_ratio=tmp_ratio; 
          buy_defence_name = buildings[i].getElementsByClassName("reName")[0].innerHTML;
          buy_defence_money = parseInt(price);
          buy_defence_url = buildings[i].getElementsByTagName("a")[0];
		}
	  }
      ratio.innerHTML = "Ratio: <b><font color=\"#00ff00\">"+(Math.round(price * 10 / nret)/10)+"</font></b>";
      cols[0].appendChild(ratio);
    }
  }
  if (DEBUG_BUILDING) 
  {  
	var gold = parseInt(document.getElementById('cashCurrent').innerHTML.replace(/,/g,''));  	
    // Show best income building
    if (gold < buy_income_money) msg +="<BR>Next Income Bldg: <font color=red>" + buy_income_name +  " (opps, need green)</font>";
    else msg += "<br>Next Income Bldg: <a href='" + buy_income_url + "'>" + buy_income_name + "</a> price=" + buy_income_money;
    // Show best defence building
    if (gold < buy_defence_money) msg +="<br>Next Defence Bldg: <font color=red>" + buy_defence_name +  " (opps, need green)</font>";
    else msg += "<br>Next Defence Bldg: <a href='" + buy_defence_url + "'>" + buy_defence_name + "</a> price=" + buy_defence_money;
  }
}


function sortByLevel(a, b) {
	var x = a[0], y = b[0];
	return ((x > y) ? 1 : ((x < y) ? -1 : 0));
}

if (location.href.indexOf('/hitlist.php') != -1) { sortHitlist(); }
function sortHitlist()
{
	var arrayMobsters = new Array();
	var arrayNeedUpdate = new Array();	
	var tmpHtml, done=0;
	var enemyP = document.getElementsByClassName("fightTable");
	for (var i=enemyP.length-1; i >= 0; i--){
		eObj = new Object();
		var elm = enemyP[i];
		var level = parseInt(elm.getElementsByClassName("fightMobster")[0].textContent.split("Level ")[1].split(" ")[0]);
		var country = parseInt(elm.getElementsByClassName("fightClass")[0].innerHTML.split("/races/")[1].split(".")[0]);
		arrayMobsters.push([level, country, elm.innerHTML]);
	}
	arrayMobsters.sort(sortByLevel);

	for (var i=0; i <=arrayMobsters.length-1; i++)	enemyP[i].innerHTML = arrayMobsters[i][2];
}

if (location.href.indexOf('/equipment.php') != -1) { enableDisband()}
function enableDisband()
{
	var sectionT = document.getElementById("sectionTabs");
	var sT = sectionT.getElementsByTagName("a");
	for (var i=0; i<4;i++) sT[i].href="/equipment.php?cat="+(i+1);
	
	var equipP = document.getElementsByClassName("equipmentSellAction");
	for (var i=equipP.length-1; i >= 0; i--){
		var elm = equipP[i];
		var href = elm.getElementsByTagName("a");
		//alert(elm.innerHTML.indexOf("sellEquipmentDialog"));
		if (href.length && elm.innerHTML.indexOf("sellEquipmentDialog") != -1) {
			var iid = href[0].href.split(",%20")[1].split(',')[0];
			var cat = href[0].href.split(",%20")[2].split(',')[0];
			href[0].href= "/equipment.php?action=sell&iid=" + iid + "&cat=" + cat;
		}
	}
}

if (DEBUG && msg != '')
{
  var debugMenu = document.createElement("div");
  debugMenu.innerHTML = msg;
  debugMenu.setAttribute("style", "font-family: tahoma; font-size: 9pt; text-align: left; padding: 5px; border: 1px dotted;");
  descP.insertBefore(debugMenu, desc);
}

if (location.href.indexOf('/setting.php') != -1) setting();

function localStorageLength()   {
  var lg=0; try { lg=unsafeWindow.localStorage.length; } catch(e) { lg='Unreadable'; } // Catch Security error
  return lg;
}

function panel_clear(event) {
  if(localStorage!=null) {
    if(confirm('Clear all data ?')) { localStorage.clear(); }
  }
}

function setting()
{
	var elem=document.createElement('button');
	elem.setAttribute('style','width:80px; padding:4px; background: #C0C0C0 !important; color:#000000 !important; cursor: pointer;');
	elem.textContent='Clear';
	elem.addEventListener('click', panel_clear, true);
	document.body.appendChild(elem);
	
	var newElem=document.createElement('table');d
	newElem.setAttribute('style','width:95%; margin-top:20px;');

	
	var trS=document.createElement('tr');
	trS.setAttribute('style','text-align:center; border: 1px solid gray;');
	var tdS1=document.createElement('td');
	tdS1.textContent="No";
	trS.appendChild(tdS1);
	//var tdS2=document.createElement('td');
	//tdS2.textContent="UID";
	//trS.appendChild(tdS2);
	var tdS3=document.createElement('td');
	tdS3.textContent="NAME";
	trS.appendChild(tdS3);
	var tdS4=document.createElement('td');
	tdS4.textContent="LEVEL";
	trS.appendChild(tdS4);
	var tdS5=document.createElement('td');
	tdS5.textContent="ATK";
	trS.appendChild(tdS5);	
	var tdS6=document.createElement('td');
	tdS6.textContent="DEF";
	trS.appendChild(tdS6);
	//var tdS7=document.createElement('td');
	//tdS7.textContent="Income";
	//trS.appendChild(tdS7);	
	//var tdS8=document.createElement('td');
	//tdS8.textContent="upkeep";
	//trS.appendChild(tdS8);
	var tdS9=document.createElement('td');
	tdS9.textContent="Net Income";
	trS.appendChild(tdS9);
	var tdS10=document.createElement('td');
	tdS10.textContent="Date";
	trS.appendChild(tdS10);
	var tdS11=document.createElement('td');
	tdS11.textContent="Fight Log";
	trS.appendChild(tdS11);
	newElem.appendChild(trS);

	var lg = localStorageLength();	
	for(var h=0; h<localStorageLength(); ) {
	    o = new Object();
		var key=localStorage.key(h);
		o = $getObj(key);
		h++;

		var tr=document.createElement('tr');
		tr.setAttribute('style','text-align:left; border: 1px solid gray;');
		var td1=document.createElement('td');
		td1.setAttribute('style','text-align:center; border: 1px solid gray;');
		td1.textContent=h;
		tr.appendChild(td1);
		//var td2=document.createElement('td');
		//td2.setAttribute('style','text-align:left; border: 1px solid gray;');
		//td2.textContent=o.uid;
		//tr.appendChild(td2);
		var td3=document.createElement('td');
		td3.setAttribute('style','text-align:left; border: 1px solid gray;');
		td3.textContent=o.name;
		tr.appendChild(td3);
		var td4=document.createElement('td');
		td4.setAttribute('style','text-align:center; border: 1px solid gray;');
		td4.textContent=o.level;
		tr.appendChild(td4);
		var td5=document.createElement('td');
		td5.setAttribute('style','text-align:right; border: 1px solid gray;');
		td5.textContent=Comma(o.atk);
		tr.appendChild(td5);	
		var td6=document.createElement('td');
		td6.setAttribute('style','text-align:right; border: 1px solid gray;');
		td6.textContent=Comma(o.def+o.buildingdef);
		tr.appendChild(td6);
		//var td7=document.createElement('td');
		//td7.setAttribute('style','text-align:right; border: 1px solid gray;');
		//td7.textContent=Comma(o.income);
		//tr.appendChild(td7);	
		//var td8=document.createElement('td');
		//td8.setAttribute('style','text-align:right; border: 1px solid gray;');
		//td8.textContent=Comma(o.upkeep);
		//tr.appendChild(td8);
		var td9=document.createElement('td');
		td9.setAttribute('style','text-align:right; border: 1px solid gray;');
		td9.textContent=Comma(o.income-o.upkeep);
		tr.appendChild(td9);
		var td10=document.createElement('td');
		td10.setAttribute('style','text-align:center; border: 1px solid gray;');
		var mobDate = new Date(o.date);
		td10.textContent = mobDate.getFullYear() + '/' + (mobDate.getMonth()+1) + '/' + mobDate.getDate() + ' ' + mobDate.getHours() + ':' + mobDate.getMinutes();
		//td10.textContent=o.date;
		tr.appendChild(td10);
		var td11=document.createElement('td');
		td11.setAttribute('style','text-align:left; border: 1px solid gray;');
		td11.textContent=o.fightLog;
		tr.appendChild(td11);
		var td12=document.createElement('td');
		td12.setAttribute('style','text-align:center; border:1px solid gray; color:#660000; font-weight:bold; cursor:pointer;');
		td12.textContent='X';
		td12.setAttribute('value',key);
		tr.appendChild(td12);
		newElem.appendChild(tr);
	}
	document.body.appendChild(newElem);
}