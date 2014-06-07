// ==UserScript==
// @name	Pardus FSC Ship Exporter
// @namespace	http://monsterthreat.somethingnice.net/
// @description	Exports current ship setup string in a format suitable for the FSC
// @include	http://*.pardus.at/overview_ship.php
// @author	Influence D (through version 1.3), In A Mirror Darkly (version 1.4+)
// @version	1.6
// ==/UserScript== 

// ---- CONFIGURATION ----
//

// Changing equipMode is only necessary if you're Union or TSS and fly a *neutral* ship (e.g. Liberator):
// 	Union - set equipMode to 1
// 	TSS - set equipMode to 2
// This affects how the script determines what sort of cloaking device, etc you have (since the game doesn't distinguish but the FSC does).
// If you're in a Union- or TSS-specific ship, this will be automatically determined anyway; you don't need to touch this.
var equipMode = 1;

//
// ---- END CONFIGURATION ----


// YOU NO TOUCHY
const MAX_GUNS=6;
const MAX_MISSILES=25;
const VERSION='FSCv4.2';

var ships=
[
	"sabre", 0,
	"rustclaw", 0,
	"interceptor", 0,
	"lanner_mini", 0,
	"harrier", 0,
	"mercury", 0,
	"hercules", 0,
	"lanner", 0,
	"hawk", 0,
	"gargantua", 0,
	"behemoth", 0,
	"liberator", 0,

	"wasp", 0,
	"adder", 0,
	"thunderbird", 0,
	"viper_defence_craft", 0,
	"babel_transporter", 0,
	"piranha", 0,
	"nighthawk", 0,
	"nighthawk_deluxe", 0,
	"mantis", 0,
	"extender", 0,
	"gauntlet", 0,
	"doomstar", 0,
	"war_nova", 0,

	"ficon", 0,
	"tyrant", 0,
	"spectre", 0,
	"shadow_stealth_craft", 0,
	"venom", 0,
	"constrictor", 0,
	"phantom_advanced_stealth_craft", 0,
	"dominator", 0,
	"boa_ultimate_carrier", 0,
	"mooncrusher", 0,

	"rustfire", 1,
	"marauder", 1,
	"junkeriv", 1,
	"slider", 1,
	"elpadre", 1,
	"chitin", 1,
	"horpor", 1,
	"scorpion", 1,

	"trident", 0,
	"celeus", 0,
	"pantagruel", 0,
	"vulcan", 0,
	"nano", 0,
	"liberator_eps", 0,

	"rover", 2,
	"reaper", 2,
	"blood_lanner", 2,
	"sudden_death", 2

];

var guns=[
	"MWmin010",
	"MWmin030",
	"MWimp001",
	"MWimp005",
	"MWpar001",
	"MWpar004",
	"MWlwpar004",
	"MWpar020",
	"MWlwpar020",
	"MWpar100",
	"MWlwpar100",
	"MWpar140",
	"MWlwpar140",

	"MWgat004",
	"MWlwgat004",
	"MWgat006",
	"MWlwgat006",
	"MWgat010",
	"MWlwgat010",
	"MWgat020",
	"MWlwgat020",
	"MWplas035",
	"MWplas040",
	"MWplas060",

	"exo",
	"endo",
	"bsp",
	"viralg",

	"MTmd080",
	"MTmd120",
	"lpc",
	"vlpc",

	"par01",
	"par02",
	"par03",
	"par04"
];

var missiles=[
	"missile0",
	"missile1",
	"missile2",
	"missile3",
	"missile4",

	"missile20",
	"missile30",
	"missile31",
	"missile32",
	"missile33",
	"missile34",
	"missile35",
	"missile36",
	"missile37"
];

var equip=[
	[
		"armor_c1", 0,
		"armor_c2", 0,
		"armor_c3", 0,
		"armor_c4", 0,
		"armor_c5", 0,
		"armor_c6", 0,

		"armor_o2", 0,
		"armor_o3", 0,
		"armor_o4", 0,
		"armor_o5", 0,

		"armor_e2", 0,
		"armor_e3", 0,
		"armor_e4", 0,
		"armor_e5", 0

		// pardus armour?
	],
	[
		"shield_small", 0,
		"shield_standard", 0,
		"shield_medium", 0,
		"shield_large", 0,

		"shield_qsmall", 0,
		"shield_qstandard", 0,
		"shield_qmedium", 0,
		"shield_qlarge", 0,
		"shield_huge", 0,
		"shield_qhuge", 0,
		"shield_lhuge", 0,
		"shield_lqlarge", 0,
		"shield_lqhuge", 0,
		"shield_tiny",0
	],
	[
		"drive_nuclear", 0,
		"drive_fusion", 0,
		"drive_ion", 0,
		"drive_antimatter", 0,
		"drive_hyper", 0,
		"drive_interphased", 0,

		"drive_fusion_enhanced", 0,
		"drive_antimatter_enhanced", 0,
		"drive_interphased_enhanced", 0
	],
	[
		"lucidi_cloaker", 0
	],
	[
		"auto_refueler", 0
	],
	[
		"escape_pod", 0
	],
	[
		"fuel_scoop", 0
	],
	[
		"bussard_ramscoop", 0
	],
	[
		"magnetic_scoop", 0
	],
	[
		"ambush_teleporter", 0
	],
	[
		"teleporter_1", 0,
		"teleporter_2", 0
	],
	[
		"mappack_1", 0,
		"mappack_2", 0
	],
	[
		"bountylink_1", 0,
		"bountylink_2", 0,
		"bountylink_3", 0
	],
	[
		"ecm_jammer", 0,
		"ecm_jammer_strong", 0
	],
	[
		"eccm_jammer", 0
	],
	[
		"cloaking_device", 1,		//Union
		"cloaking_device", 2,		//TSS
		"cloaking_device_improved", 0	//(should be 0 as there's no Union equivalent)
	],
	[
		"damping_field_generator", 0,
		"damping_field_generator_reinforced", 0,
		"damping_field_generator_perfected", 0
	],
	[
		"interferometer_single", 1,	//Union
		"interferometer_dual", 1,	//Union
		"interferometer_single", 2,	//TSS
		"interferometer_dual", 2,	//TSS
		"interferometer_triple", 0	//(should be 0 as there's no Union equivalent)
	],
	[
		"flux_capacitor_gas", 0,
		"flux_capacitor_energy", 0,
		"flux_capacitor_gas_strong", 0,
		"flux_capacitor_energy_strong", 0
	],
	[
		"dematerializer_light_mk1", 0,
		"dematerializer_light_mk2", 0,
		"dematerializer_medium_mk1", 0,
		"dematerializer_medium_mk2", 0,
		"dematerializer_heavy_mk1", 0,
		"dematerializer_heavy_mk2", 0
	],
	[
		"eps_contraband_scanner", 0
	],
	[
		"key_of_sheppard", 0
	],
	[
		"gyro_stabilizer_1", 0,
		"gyro_stabilizer_2", 0
	],
	[
		//RESERVED B5
	],
	[
		//RESERVED B6
	]
];
var orbiters=[
	"orbiter_leech",		//"leech_baby"
	"orbiter_x_993_repair_drone",
	"orbiter_neural_stimulator",
	"orbiter_christmas_glitter"
];



function findShip(typeName)
{
	var i;
	for (i=0;i<ships.length;i+=2)
	{
		if (typeName==ships[i] || typeName==ships[i]+'_xmas')
		{
			if (ships[i+1] != 0)
				equipMode = ships[i+1];
			return i/2;
		}
	}
	return -1;
}

function findGun(typeName)
{
	var i;
	for (i=0;i<guns.length;++i)
	{
		if (guns[i]==typeName)
			return i+1;
	}
	return -1;
}
function findMissile(typeName)
{
	var i;
	for (i=0;i<missiles.length;++i)
	{
		if (missiles[i]==typeName)
			return i+1;
	}
	return -1;
}
function setEquipment(equipArray,typeName)
{
	var i,j;
	for (i=0;i<equip.length;++i)
	{
		for (j=0;j<equip[i].length;j += 2)
		{
			if (equip[i][j]==typeName)
			{
				if (equip[i][j+1] != 0 && equip[i][j+1] != equipMode)
					continue;
				equipArray[i]=(j/2)+1;
				return true;
			}
		}
	}
	return false;
}
function findOrbiter(typeName)
{
	var i;
	for (i=0;i<orbiters.length;++i)
	{
		if (orbiters[i]==typeName)
			return i+1;
	}
	return -1;
}


var shipID = -1;
var shipName = 'Nameless';

var shipTypeMatch = /\/ships\/(\w+)\.png/i;
var equipTypeMatch = /\/equipment\/(\w+)\.png/i;
var orbiterTypeMatch = /\/orbiter\/(\w+)\.png/i;

var gunArray=[];
var missileArray=[];
var equipArray=[];
var orbiterID=-1;

var i,j,k;


// setup equipArray
for (i=0; i<equip.length; i++)
{
	equipArray[equipArray.length] = '';
}


// go through all images on page
var imgs = document.getElementsByTagName('img');
for(i = 0; i < imgs.length; i++)
{
	results = imgs[i].src.match(shipTypeMatch);
	if (results != null)
	{
		shipID = findShip(results[1]);
		continue;
	}

	results = imgs[i].src.match(equipTypeMatch);
	if (results != null)
	{
		// is it a gun
		j = findGun(results[1]);
		if (j!=-1)
		{
			gunArray[gunArray.length]=j;
			continue;
		}
		// is it a missile
		j = findMissile(results[1]);
		if (j!=-1)
		{
			missileArray[missileArray.length]=j;
			continue;
		}
		// no it's super normal equipment
		setEquipment(equipArray,results[1]);
		continue;
	}

	results = imgs[i].src.match(orbiterTypeMatch);
	if (results != null)
	{
		orbiterID = findOrbiter(results[1]);
		continue;
	}
}

// get ship name
var texta = document.getElementsByTagName('input');
for(i = 0; i < texta.length; i++)
{
	if (texta[i].name == 'shipname')
	{
		shipName = texta[i].value;
		break;
	}
}

// output string
var str = VERSION + '|' + shipName + "|" + shipID + "|";

// guns
for (i=0;i<gunArray.length;++i)
	str += gunArray[i] + '|';
for (;i<MAX_GUNS;++i)
	str += '|';

// missiles
for (i=0;i<missileArray.length;++i)
	str += missileArray[i] + '|';
for (;i<MAX_MISSILES;++i)
	str += '|';

// equipment
for (i=0;i<equipArray.length;++i)
	str += equipArray[i] + '|';

// orbiter
if (orbiterID != -1)
	str += orbiterID + '';

// hardcoded :(
var tbls = document.getElementsByTagName('table');
var calcloc = "http://pardus.rukh.de/pshipcalc.htm";
//var calcloc = "file:///home/influence/pardus/fsc/pshipcalc.html";

tbls[4].innerHTML += '<tr>'
			+ '<td colspan="2" align="center" style="color:#ffcc11;font-size:110%;">'
			+ '<br />' + str
			+ '<br /><br /><small><a href="' + calcloc + '?' + escape(str) + '" target="_blank">Click here to open in Fearsome Ship Calculator</a></small>'
			+ '<br /><br />'
			+ '</td></tr>';