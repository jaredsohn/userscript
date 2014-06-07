// ==UserScript==
// @name           Wombat Weewar's UI -- WWUI
// @namespace      tag:wombat317@gmail.com,2008-08-07:wwui
// @include        http://*weewar.com/game/*
// @todo           remove innerHTML, add a range assistant
// ==/UserScript==

// ============================================================================================
// Inspired by - Updated from:
//   - Blub's unit stat's page
//   - Pluto's weewar suite
//   - Tracy's army stats
// ============================================================================================

// ============================================================================================
// - Data Set -
// Most stats required
// --------------------------------------------------------------------------------------------

// Terrain - Attack and Defence bonuses
var airfield = new Object;
airfield.label = 'Airfield';
airfield.id = 'airfield.png';
airfield.atck_soft =  2;	airfield.dfce_soft =  2;
airfield.atck_hard =  0;	airfield.dfce_hard = -1;
airfield.atck_air  =  3;	airfield.dfce_air  =  3;
airfield.atck_spdb =  0;	airfield.dfce_spdb =  0;
airfield.atck_amph =  0;	airfield.dfce_amph = -1;
airfield.atck_subm = -2;	airfield.dfce_subm = -1;
airfield.atck_boat =  0;	airfield.dfce_boat = -1;

airfield.mvt_soft =  3;
airfield.mvt_hard =  2;
airfield.mvt_air  =  3;
airfield.mvt_spdb = 99;
airfield.mvt_amph =  3;
airfield.mvt_subm = 99;
airfield.mvt_boat = 99;

var base = new Object;
base.label = 'City';
base.id = 'city.png';
base.atck_soft =  2;	base.dfce_soft =  2;
base.atck_hard =  0;	base.dfce_hard = -1;
base.atck_air  =  0;	base.dfce_air  =  0;
base.atck_spdb =  0;	base.dfce_spdb =  0;
base.atck_amph =  0;	base.dfce_amph =  0;
base.atck_subm =  0;	base.dfce_subm =  0;
base.atck_boat =  0;	base.dfce_boat =  0;

base.mvt_soft =  3;
base.mvt_hard =  2;
base.mvt_air  =  3;
base.mvt_spdb = 99;
base.mvt_amph =  3;
base.mvt_subm = 99;
base.mvt_boat = 99;

var desert = new Object;
desert.label = 'Desert';
desert.id = 'desert.png';
desert.atck_soft = -1;	desert.dfce_soft = -1;
desert.atck_hard =  0;	desert.dfce_hard =  0;
desert.atck_air  =  0;	desert.dfce_air  =  0;
desert.atck_spdb =  0;	desert.dfce_spdb =  0;
desert.atck_amph =  0;	desert.dfce_amph =  0;
desert.atck_subm =  0;	desert.dfce_subm =  0;
desert.atck_boat =  0;	desert.dfce_boat =  0;

desert.mvt_soft =  5;
desert.mvt_hard =  4;
desert.mvt_air  =  3;
desert.mvt_spdb = 99;
desert.mvt_amph =  3;
desert.mvt_subm = 99;
desert.mvt_boat = 99;

var harbor = new Object;
harbor.label = 'Harbor';
harbor.id = 'harbor.png';
harbor.atck_soft =  2;	harbor.dfce_soft =  2;
harbor.atck_hard =  0;	harbor.dfce_hard = -1;
harbor.atck_air  =  0;	harbor.dfce_air  =  0;
harbor.atck_spdb =  0;	harbor.dfce_spdb =  0;
harbor.atck_amph =  0;	harbor.dfce_amph = -1;
harbor.atck_subm = -2;	harbor.dfce_subm = -1;
harbor.atck_boat =  0;	harbor.dfce_boat = -1;

harbor.mvt_soft =  3;
harbor.mvt_hard =  2;
harbor.mvt_air  =  3;
harbor.mvt_spdb =  3;
harbor.mvt_amph =  3;
harbor.mvt_subm =  3;
harbor.mvt_boat =  3;

var mountain = new Object;
mountain.label = 'Mountain';
mountain.id = 'mountain.png';
mountain.atck_soft =  2;	mountain.dfce_soft =  4;
mountain.atck_hard = -10;	mountain.dfce_hard = -10;
mountain.atck_air  =  0;	mountain.dfce_air  =  0;
mountain.atck_spdb =  0;	mountain.dfce_spdb =  0;
mountain.atck_amph =  0;	mountain.dfce_amph =  0;
mountain.atck_subm =  0;	mountain.dfce_subm =  0;
mountain.atck_boat =  0;	mountain.dfce_boat =  0;

mountain.mvt_soft =  6;
mountain.mvt_hard = 99;
mountain.mvt_air  =  3;
mountain.mvt_spdb = 99;
mountain.mvt_amph = 99;
mountain.mvt_subm = 99;
mountain.mvt_boat = 99;

var plain = new Object;
plain.label = 'Plain';
plain.id = 'plain.png';
plain.atck_soft =  0;	plain.dfce_soft =  0;
plain.atck_hard =  0;	plain.dfce_hard =  0;
plain.atck_air  =  0;	plain.dfce_air  =  0;
plain.atck_spdb =  0;	plain.dfce_spdb =  0;
plain.atck_amph =  0;	plain.dfce_amph =  0;
plain.atck_subm =  0;	plain.dfce_subm =  0;
plain.atck_boat =  0;	plain.dfce_boat =  0;

plain.mvt_soft =  3;
plain.mvt_hard =  3;
plain.mvt_air  =  3;
plain.mvt_spdb = 99;
plain.mvt_amph =  3;
plain.mvt_subm = 99;
plain.mvt_boat = 99;

var repair = new Object;
repair.label = 'Repair Shop';
repair.id = 'repairshop.png';
repair.atck_soft =  0;	repair.dfce_soft = -6;
repair.atck_hard =  0;	repair.dfce_hard = -6;
repair.atck_air  =  0;	repair.dfce_air  =  0;
repair.atck_spdb =  0;	repair.dfce_spdb =  0;
repair.atck_amph =  0;	repair.dfce_amph =  0;
repair.atck_subm =  0;	repair.dfce_subm =  0;
repair.atck_boat =  0;	repair.dfce_boat =  0;

repair.mvt_soft =  3;
repair.mvt_hard =  3;
repair.mvt_air  =  3;
repair.mvt_spdb = 99;
repair.mvt_amph =  3;
repair.mvt_subm = 99;
repair.mvt_boat = 99;

var swamp = new Object;
swamp.label = 'Swamp';
swamp.id = 'swamp.png';
swamp.atck_soft = -1;	swamp.dfce_soft = -2;
swamp.atck_hard = -1;	swamp.dfce_hard = -2;
swamp.atck_air  =  0;	swamp.dfce_air  =  0;
swamp.atck_spdb =  0;	swamp.dfce_spdb =  0;
swamp.atck_amph =  0;	swamp.dfce_amph =  0;
swamp.atck_subm =  0;	swamp.dfce_subm =  0;
swamp.atck_boat =  0;	swamp.dfce_boat =  0;

swamp.mvt_soft =  6;
swamp.mvt_hard =  6;
swamp.mvt_air  =  3;
swamp.mvt_spdb = 99;
swamp.mvt_amph =  3;
swamp.mvt_subm = 99;
swamp.mvt_boat = 99;

var water = new Object;
water.label = 'Water';
water.id = 'water.png';
water.atck_soft = -10;	water.dfce_soft = -10;
water.atck_hard = -10;	water.dfce_hard = -10;
water.atck_air  =  0;	water.dfce_air  =  0;
water.atck_spdb =  0;	water.dfce_spdb =  0;
water.atck_amph =  0;	water.dfce_amph =  0;
water.atck_subm =  0;	water.dfce_subm =  0;
water.atck_boat =  0;	water.dfce_boat =  0;

water.mvt_soft = 99;
water.mvt_hard = 99;
water.mvt_air  =  3;
water.mvt_spdb =  3;
water.mvt_amph =  3;
water.mvt_subm =  3;
water.mvt_boat =  3;

var wood = new Object;
wood.label = 'Forest';
wood.id = 'forest.png';
wood.atck_soft =  2;	wood.dfce_soft =  3;
wood.atck_hard =  0;	wood.dfce_hard = -3;
wood.atck_air  =  0;	wood.dfce_air  =  0;
wood.atck_spdb =  0;	wood.dfce_spdb =  0;
wood.atck_amph =  0;	wood.dfce_amph =  0;
wood.atck_subm =  0;	wood.dfce_subm =  0;
wood.atck_boat =  0;	wood.dfce_boat =  0;

wood.mvt_soft =  4;
wood.mvt_hard =  6;
wood.mvt_air  =  3;
wood.mvt_spdb = 99;
wood.mvt_amph = 99;
wood.mvt_subm = 99;
wood.mvt_boat = 99;

// Units Stats
var antiair = new Object;
antiair.label = 'Anti Aircraft';
antiair.id    = 'antiair.png';
antiair.kind  = 'Hard';
antiair.cost  = '$300';
antiair.mvt   = '9';
antiair.range = '1-3';
antiair.atck_soft =  8;
antiair.atck_hard =  3;
antiair.atck_air  =  9;
antiair.atck_spdb =  3;
antiair.atck_amph =  3;
antiair.atck_subm =  0;
antiair.atck_boat =  3;
antiair.dfce = 4;

var assart = new Object;
assart.label = 'Assault Artillery';
assart.id    = '004.png';
assart.kind  = 'Hard';
assart.cost  = '$450';
assart.mvt   = '12';
assart.range = '1-2';
assart.atck_soft =  8;
assart.atck_hard =  6;
assart.atck_air  =  6;
assart.atck_spdb =  6;
assart.atck_amph =  6;
assart.atck_subm =  0;
assart.atck_boat =  6;
assart.dfce = 6;

var bship = new Object;
bship.label = 'Battleship';
bship.id    = 'battleship.png';
bship.kind  = 'Boat';
bship.cost  = '$2000';
bship.mvt   = '6';
bship.range = '1-4';
bship.atck_soft = 10;
bship.atck_hard = 14;
bship.atck_air  =  6;
bship.atck_spdb = 14;
bship.atck_amph = 14;
bship.atck_subm =  4;
bship.atck_boat = 14;
bship.dfce = 14;

var beserk = new Object;
beserk.label = 'Beserker';
beserk.id    = '007.png';
beserk.kind  = 'Hard';
beserk.cost  = '$900';
beserk.mvt   = '6';
beserk.range = '1-1';
beserk.atck_soft = 14;
beserk.atck_hard = 16;
beserk.atck_air  =  0;
beserk.atck_spdb = 14;
beserk.atck_amph = 14;
beserk.atck_subm =  0;
beserk.atck_boat = 14;
beserk.dfce = 14;

var bomber = new Object;
bomber.label = 'Bomber';
bomber.id    = 'bomber.png';
bomber.kind  = 'Air';
bomber.cost  = '$900';
bomber.mvt   = '18,6';
bomber.range = '1-1';
bomber.atck_soft = 14;
bomber.atck_hard = 14;
bomber.atck_air  =  0;
bomber.atck_spdb = 14;
bomber.atck_amph = 14;
bomber.atck_subm =  0;
bomber.atck_boat = 14;
bomber.dfce = 10;

var dfa = new Object;
dfa.label = 'Death From Above';
dfa.id    = '010.png';
dfa.kind  = 'Hard';
dfa.cost  = '$1200';
dfa.mvt   = '6';
dfa.range = '2-5';
dfa.atck_soft = 16;
dfa.atck_hard = 14;
dfa.atck_air  =  0;
dfa.atck_spdb = 14;
dfa.atck_amph = 14;
dfa.atck_subm =  0;
dfa.atck_boat = 14;
dfa.dfce = 4;

var destroyer = new Object;
destroyer.label = 'Destroyer';
destroyer.id    = 'destroyer.png';
destroyer.kind  = 'Boat';
destroyer.cost  = '$900';
destroyer.mvt   = '12';
destroyer.range = '1-3';
destroyer.atck_soft = 10;
destroyer.atck_hard = 10;
destroyer.atck_air  = 12;
destroyer.atck_spdb = 12;
destroyer.atck_amph = 12;
destroyer.atck_subm = 16;
destroyer.atck_boat = 10;
destroyer.dfce = 12;

var hart = new Object;
hart.label = 'Heavy Artillery';
hart.id    = '009.png';
hart.kind  = 'Hard';
hart.cost  = '$600';
hart.mvt   = '6';
hart.range = '3-4';
hart.atck_soft = 12;
hart.atck_hard = 10;
hart.atck_air  =  0;
hart.atck_spdb = 10;
hart.atck_amph = 10;
hart.atck_subm =  0;
hart.atck_boat = 10;
hart.dfce = 4;

var htank = new Object;
htank.label = 'Heavy Tank';
htank.id    = '006.png';
htank.kind  = 'Hard';
htank.cost  = '$600';
htank.mvt   = '7';
htank.range = '1-1';
htank.atck_soft = 10;
htank.atck_hard = 12;
htank.atck_air  =  0;
htank.atck_spdb = 10;
htank.atck_amph = 10;
htank.atck_subm =  0;
htank.atck_boat = 10;
htank.dfce = 14;

var htrooper = new Object;
htrooper.label = 'Heavy Trooper';
htrooper.id    = '002.png';
htrooper.kind  = 'Soft';
htrooper.cost  = '$150';
htrooper.mvt   = '6';
htrooper.range = '1-1';
htrooper.atck_soft =  6;
htrooper.atck_hard =  8;	
htrooper.atck_air  =  6;
htrooper.atck_spdb =  8;
htrooper.atck_amph =  8;
htrooper.atck_subm =  0;
htrooper.atck_boat =  8;
htrooper.dfce = 6;

var heli = new Object;
heli.label = 'Helicopter';
heli.id    = 'heli.png';
heli.kind  = 'Air';
heli.cost  = '$600';
heli.mvt   = '15,3';
heli.range = '1-1';
heli.atck_soft = 16;
heli.atck_hard = 10;	
heli.atck_air  =  6;
heli.atck_spdb = 12;
heli.atck_amph = 12;
heli.atck_subm =  0;
heli.atck_boat =  8;
heli.dfce = 10;

var hover = new Object;
hover.label = 'Hovercraft';
hover.id    = 'hovercraft.png';
hover.kind  = 'Amph';
hover.cost  = '$300';
hover.mvt   = '12';
hover.range = '1-1';
hover.atck_soft = 10;
hover.atck_hard =  6;	
hover.atck_air  =  0;
hover.atck_spdb =  8;
hover.atck_amph = 10;
hover.atck_subm =  0;
hover.atck_boat =  6;
hover.dfce = 8;

var jet = new Object;
jet.label = 'Jetfighter';
jet.id    = 'jet.png';
jet.kind  = 'Air';
jet.cost  = '$800';
jet.mvt   = '18,6';
jet.range = '1-1';
jet.atck_soft =  6;
jet.atck_hard =  8;	
jet.atck_air  = 16;
jet.atck_spdb =  6;
jet.atck_amph =  6;
jet.atck_subm =  0;
jet.atck_boat =  6;
jet.dfce = 12;

var lart = new Object;
lart.label = 'Light Artillerie';
lart.id    = '008.png';
lart.kind  = 'Hard';
lart.cost  = '$200';
lart.mvt   = '9';
lart.range = '2-3';
lart.atck_soft = 10;
lart.atck_hard =  4;	
lart.atck_air  =  0;
lart.atck_spdb =  4;
lart.atck_amph =  4;
lart.atck_subm =  0;
lart.atck_boat =  4;
lart.dfce = 3;

var raider = new Object;
raider.label = 'Raider';
raider.id    = '003.png';
raider.kind  = 'Hard';
raider.cost  = '$200';
raider.mvt   = '12';
raider.range = '1-1';
raider.atck_soft = 10;
raider.atck_hard =  4;	
raider.atck_air  =  4;
raider.atck_spdb =  4;
raider.atck_amph =  8;
raider.atck_subm =  0;
raider.atck_boat =  4;
raider.dfce = 8;

var subm = new Object;
subm.label = 'Submarine';
subm.id    = 'sub.png';
subm.kind  = 'Subm';
subm.cost  = '$1000';
subm.mvt   = '9';
subm.range = '1-2';
subm.atck_soft =  0;
subm.atck_hard =  0;	
subm.atck_air  =  0;
subm.atck_spdb =  0;
subm.atck_amph =  0;
subm.atck_subm =  10;
subm.atck_boat =  16;
subm.dfce = 10;

var spdb = new Object;
spdb.label = 'Speedboat';
spdb.id    = 'speedboat.png';
spdb.kind  = 'Spdb';
spdb.cost  = '$200';
spdb.mvt   = '12';
spdb.range = '1-1';
spdb.atck_soft =  8;
spdb.atck_hard =  6;	
spdb.atck_air  =  6;
spdb.atck_spdb = 10;
spdb.atck_amph = 16;
spdb.atck_subm =  0;
spdb.atck_boat =  6;
spdb.dfce = 6;

var tank = new Object;
tank.label = 'Tank';
tank.id    = '005.png';
tank.kind  = 'Hard';
tank.cost  = '$300';
tank.mvt   = '9';
tank.range = '1-1';
tank.atck_soft =  10;
tank.atck_hard =  7;	
tank.atck_air  =  0;
tank.atck_spdb =  7;
tank.atck_amph =  7;
tank.atck_subm =  0;
tank.atck_boat =  7;
tank.dfce = 10;

var trooper = new Object;
trooper.label = 'Trooper';
trooper.id    = '001.png';
trooper.kind  = 'Soft';
trooper.cost  = '$75';
trooper.mvt   = '9';
trooper.range = '1-1';
trooper.atck_soft =  6;
trooper.atck_hard =  3;	
trooper.atck_air  =  0;
trooper.atck_spdb =  3;
trooper.atck_amph =  3;
trooper.atck_subm =  0;
trooper.atck_boat =  3;
trooper.dfce = 6;

var ctroop = new Object;
ctroop.label = 'Capturing Trooper';
ctroop.id    = 'capturing.gif';
ctroop.kind  = 'Soft';
ctroop.cost  = '';
ctroop.mvt   = '0';
ctroop.range = '0';
ctroop.atck_soft =  0;
ctroop.atck_hard =  0;	
ctroop.atck_air  =  0;
ctroop.atck_spdb =  0;
ctroop.atck_amph =  0;
ctroop.atck_subm =  0;
ctroop.atck_boat =  0;
ctroop.dfce = 2;

// Data Arrays
var terrains = new Array( airfield, base, desert, harbor, mountain,
                          plain, repair, swamp, water, wood);

var unitTypes = new Array( trooper, hart, assart, destroyer, heli, hover, jet,
                       lart, raider, subm, spdb, tank, ctroop,
                       antiair, htank, dfa, bship, beserk, bomber, htrooper  );

// ============================================================================================
// - Generic Functions -
// Generic Functions
// --------------------------------------------------------------------------------------------

function setCursor( look )
{
	document.body.style.cursor = look;
}

function toggleView( id )
{
	arrElm = document.getElementById( id ).getElementsByTagName( 'table' );
	var setting   = '';
	if( arrElm[0].style.display == '' )
		{ setting = 'none'; }
	for(var i=0; i < arrElm.length; i++)
	{ 
		arrElm[i].style.display = setting;
	}
}

function renderToggle( id )
{
	var toggleContainer = document.getElementById( id );
	toggleContainer.style.position = 'relative';

	var toggle = document.createElement('div');
	toggle.style.position = 'absolute';
	toggle.style.right    = '2px';
	toggle.innerHTML   = "<strong id=\""+id+"Toggle\">[+/-]</strong>";
	toggleContainer.insertBefore(toggle, toggleContainer.childNodes[0]);
	document.getElementById(id+'Toggle').addEventListener('click',function (){ toggleView(id)},false);
	document.getElementById(id+'Toggle').addEventListener('mouseover',function (){ setCursor('pointer')},false);
	document.getElementById(id+'Toggle').addEventListener('mouseout',function (){ setCursor('default')},false);
}



// ============================================================================================
// Feature 1 - Background color -
// This makes blanks in maps easier on the eyes
// USES: Nothing
// --------------------------------------------------------------------------------------------

document.getElementById('game').style.backgroundColor = '#d4d4d4';

// ============================================================================================
// Feature 2 - Inspector NG -
// A new, detailed inspector
// TODO: replace with a battle simulator?
// USES: Data Set, Generic Functions
// --------------------------------------------------------------------------------------------

function renderDefault( id )
{
	var defaultInspector = document.getElementById( id );
	var header = "&nbsp;<span style=\"font-size: 1em; padding: 0px;\" class=\"head\">"
	           + "<img src=\"/images/blank.gif\" style=\"vertical-align: middle\" "
	           + " width=\"1\" height=\"34\" />"
	           + "<strong>Inspector</strong></span>";
	
	var details = "<table border=\"0\" cellpadding=\"2\" "
	            + " style=\"display: none; background-color: #eee; border-top: 1px solid #ddd; "
	            + " font-size: 1em; width: 100%;\">"
	            + "<tr><td>Mouse over the map for terrains/units stats.<strong>&nbsp;</strong></td></tr></table>"
	            + "<table border=\"0\" cellpadding=\"2\" "
	            + " style=\"display: none; border-top: 1px solid #ccc; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td><strong>&nbsp;</strong></td>"
	            + "</tr><tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr><tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr></table>";

	var bonuses = "<table class=\"collapsable\" border=\"0\" cellpadding=\"2\" cellspacing=\"2\" "
	            + " style=\"display: none; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr><tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr><tr>"
	            + "<td style=\"padding-bottom: 0px;\">&nbsp;</td>"
	            + "</tr></table>";

	defaultInspector.innerHTML = header + details + bonuses;

}

function renderUnit( unit )
{
	var unitDiv = document.getElementById( unit.id );
	var header = "&nbsp;<span style=\"font-size: 1em; padding: 0px;\" class=\"head\">"
	           + "<img nocount=\"nocount\" src=\"/images/blue_"+unit.id+"\" "
	           + "     style=\"vertical-align: middle\"/>"
	           + "&nbsp;<strong>" + unit.label + "</strong>"
	           + "&nbsp;-&nbsp;"  + unit.kind  + "&nbsp;-&nbsp;" + unit.cost + "</span>";
	
	var details = "<table border=\"0\" cellpadding=\"2\" "
	            + " style=\"display: none; background-color: #eee; border-top: 1px solid #ddd; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td width=\"25%\" style=\"text-align: center;\">"
	            + "<strong>Def:</strong> "+unit.dfce+"</td>"
	            + "<td colspan=\"2\" style=\"text-align: center;\">"
	            + "<strong>Range:</strong> "+unit.range+"</td>"
	            + "<td width=\"25%\"><strong>Mvt:</strong> "+unit.mvt +"</td>"
	            + "</tr></table>"
	            + "<table border=\"0\" cellpadding=\"2\" "
	            + "       style=\"display: none; border-top: 1px solid #ccc; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td colspan=\"2\"><strong>Attacks:</strong></td>"
	            + "</tr><tr>"
	            + "<td>Soft: "+unit.atck_soft +"</td>"
	            + "<td>Hard: "+unit.atck_hard +"</td>"
	            + "<td>Air: " +unit.atck_air  +"</td>"
	            + "<td>Amph: "+unit.atck_amph +"</td>"
	            + "</tr><tr>"
	            + "<td>Boat: "+unit.atck_boat +"</td>"
	            + "<td>Sub: "+unit.atck_subm +"</td>"
	            + "<td colspan=\"2\">Spd Boat: "+unit.atck_spdb +"</td>"
	            + "</tr></table>";

	var bonuses = "<table class=\"collapsable\" border=\"0\" cellpadding=\"2\" "
	            + "cellspacing=\"2\" "
	            + "style=\"display: none; font-size: 1em; width: 100%;\">"
	            + "<tr>";
	for( key in terrains )
	{
		bonuses += "<td style=\"color: #c00; text-align: center; width: 10%\">"
		        +  eval( 'terrains[key].atck_'+unit.kind.toLowerCase())+"</td>";
	}
	bonuses += "</tr><tr>";
	for( key in terrains )		
	{ 
		bonuses += "<td style=\"background-image: url(/images/"+terrains[key].id+"); "
		        +  " background-position: -4px -7px;\">&nbsp;</td>";
	}
	bonuses += "</tr><tr>";
	for( key in terrains )
	{ 
		bonuses += "<td "
		        +  "style=\"padding-bottom: 0px; color: #00c; text-align: center; width: 10px;\">"
		        +  eval( 'terrains[key].dfce_'+unit.kind.toLowerCase())+"</td>";
	}
	bonuses += "</tr></table>";
	unitDiv.innerHTML = header + details + bonuses;
}

function renderTerrains( terrain )
{
	var terrainDiv = document.getElementById( terrain.id );
	var header = "&nbsp;<span style=\"font-size: 1em; padding: 0px;\" class=\"head\">"
	           + "<img src=\"/images/"+terrain.id+"\" style=\"vertical-align: middle\"/>"
	           + "&nbsp;<strong>" + terrain.label + "</strong></span>";
	
	var details = "<table border=\"0\" cellpadding=\"2\" "
	            + " style=\"display: none; background-color: #eee; border-top: 1px solid #ddd; "
	            + " font-size: 1em; width: 100%;\">"
	            + "<tr><td><strong>&nbsp;</strong></td></tr></table>"
	            + "<table border=\"0\" cellpadding=\"2\" "
	            + " style=\"display: none; border-top: 1px solid #ccc; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td colspan=\"2\"><strong>Movement Cost:</strong></td>"
	            + "</tr><tr>"
	            + "<td>Soft: "+terrain.mvt_soft +"</td>"
	            + "<td>Hard: "+terrain.mvt_hard +"</td>"
	            + "<td>Air: " +terrain.mvt_air  +"</td>"
	            + "<td>Amph: "+terrain.mvt_amph +"</td>"
	            + "</tr><tr>"
	            + "<td>Boat: "+terrain.mvt_boat +"</td>"
	            + "<td>Sub: "+terrain.mvt_subm +"</td>"
	            + "<td colspan=\"2\">Spd Boat: "+terrain.mvt_spdb +"</td>"
	            + "</tr></table>";

	var bonuses = "<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" "
	            + "class=\"collapsable\" style=\"display: none; font-size: 1em; width: 100%;\">"
	            + "<tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr><tr>"
	            + "<td>&nbsp;</td>"
	            + "</tr><tr>"
	            + "<td style=\"padding-bottom: 0px;\">&nbsp;</td>"
	            + "</tr></table>";

	terrainDiv.innerHTML = header + details + bonuses;

}

// Rendering InspectorNG --
renderToggle('inspector');
renderDefault('unitDefault');

for( key in unitTypes)
	{ renderUnit( unitTypes[key] ); }
for( key in terrains)
	{ renderTerrains( terrains[key] ); }

// ============================================================================================
// Feature 3 - Army Stats -
// A new updated Army Stats
// TODO: 
// USES: Generic Functions
// --------------------------------------------------------------------------------------------

function Unit()
{
	this.red = 0;
	this.blue = 0;
	this.purple = 0;
	this.white  = 0;
	this.yellow = 0;
	this.green  = 0;
}

function Player( colorPri, colorSec )
{
	this.totalUnit = 0;
	this.strength  = 0;
	this.potential = 0;

	this.city     = 0;
	this.harbor   = 0;
	this.airfield = 0;

	this.primaryColor   = colorPri;
	this.secondaryColor = colorSec;
}

function isPlayerActive( player )
{
	if( player.totalUnit == 0 && player.city == 0 && player.harbor == 0 && player.airfield == 0)
		{ return false; }
	return true;
}

function convertUnitStrength( unitType )
{
	switch( unitType )
	{
		case 'antiair.png' :    return 300; break;
		case '004.png' :        return 450; break;
		case 'battleship.png' : return 2000;break;
		case '007.png' :        return 900; break;
		case 'bomber.png' :     return 900; break;
		case '010.png' :        return 1200;break;
		case 'destroyer.png' :  return 900; break;
		case '006.png' :        return 600; break;
		case '009.png' :        return 600; break;
		case '002.png' :        return 150; break;
		case 'heli.png' :       return 600; break;
		case 'hovercraft.png' : return 300; break;
		case 'jet.png' :        return 800; break;
		case 'sub.png' :        return 1000;break;
		case '008.png' :        return 200; break;
		case 'speedboat.png' :  return 200; break;
		case '003.png' :        return 200; break;
		case '005.png' :        return 300; break;
		case '001.png' :        return 75;  break;
	}

	return 0;
}

function calculateStats( players, armies )
{
	var listOfImages = document.getElementById( 'game' ).getElementsByTagName( 'img' );
	var imgId, imgSrc, strengthSrc, unitStrength;

	// Patterns
	var unitPattern = new RegExp("_unit$");
	var cityPattern = new RegExp("_city.png$");
	var hbPattern   = new RegExp("_harbor.png$");
	var afPattern   = new RegExp("_airfield.png$");

	for(var i=0; i< listOfImages.length; i++)
	{
		imgId  = listOfImages[i].getAttribute('id');
		imgSrc  = listOfImages[i].getAttribute('src');
		
		if( unitPattern.test(imgId) )
		{
			strengthSrc = document.getElementById( imgId+'Quantity').getAttribute('src');
			unitStrength= strengthSrc.substring( strengthSrc.lastIndexOf('/')+1, strengthSrc.indexOf('.'));

			faction = imgSrc.substring( imgSrc.lastIndexOf('/')+1, imgSrc.indexOf('_'));
			unitType= imgSrc.substring( imgSrc.indexOf('_')+1,imgSrc.length);

			players[faction].totalUnit += 1;
			players[faction].strength  += unitStrength * convertUnitStrength( unitType ) / 10;
			players[faction].potential += 10 * convertUnitStrength( unitType ) / 10;

			if( typeof(armies[unitType]) == 'undefined' )
				{ armies[unitType] = new Unit(); }
			eval( 'armies[unitType].'+faction+' += 1' );
		}
		else if( cityPattern.test(imgSrc) )
		{
			faction = imgSrc.substring( imgSrc.lastIndexOf('/')+1, imgSrc.indexOf('_'));
			players[faction].city += 1;
		}
		else if( hbPattern.test(imgSrc) )
		{
			faction = imgSrc.substring( imgSrc.lastIndexOf('/')+1, imgSrc.indexOf('_'));
			players[faction].harbor += 1;
		}
		else if( afPattern.test(imgSrc) )
		{
			faction = imgSrc.substring( imgSrc.lastIndexOf('/')+1, imgSrc.indexOf('_'));
			players[faction].airfield += 1;
		}
	}

}

function renderStats( players, armies )
{
	var health;
	
	var armyStats = document.createElement('div');
	armyStats.id = 'armyStats';
	document.getElementById('inspector').parentNode.insertBefore(armyStats,document.getElementById('inspector').nextSibling);
	armyStats.style.borderColor = '#DDD #AAA #AAA #DDD';
	armyStats.style.borderStyle = 'solid';
	armyStats.style.borderWidth = '1px';
	armyStats.style.marginBottom = '6px';
	armyStats.style.backgroundColor = '#F8F8F8';

	var unitStats = document.createElement('div');
	unitStats.id = 'unitStats';
	document.getElementById('armyStats').parentNode.insertBefore(unitStats,document.getElementById('armyStats').nextSibling);
	unitStats.style.borderColor = '#DDD #AAA #AAA #DDD';
	unitStats.style.borderStyle = 'solid';
	unitStats.style.borderWidth = '1px';
	unitStats.style.marginBottom = '6px';
	unitStats.style.backgroundColor = '#F8F8F8';
	
	var aStats = "&nbsp;<strong>Army Stats</strong>"
	             + "<table style=\"text-align: center; background-color: #F8F8F8; width: 100%;\" "
	             + " cellspacing=\"2\" cellpadding=\"1\" border=\"0\">"
	             + "<tr><td style=\"border: 1px solid #ddd; width: 20px;"
	             + "background-image: url('/images/green_001.png'); background-position: -4px -7px;\">&nbsp;</td>"
	             + "<td style=\"border: 1px solid #ddd; width: 20px;"
	             + "background-image: url('/images/city.png'); background-position: -4px -7px;\">&nbsp;</td>"
	             + "<td style=\"border: 1px solid #ddd; width: 20px;"
	             + "background-image: url('/images/harbor.png'); background-position: -4px -7px;\">&nbsp;</td>"
	             + "<td style=\"border: 1px solid #ddd; width: 20px;"
	             + "background-image: url('/images/airfield.png'); background-position: -4px -7px;\">&nbsp;</td>"
	             + "<td style=\"border: 1px solid #ddd\">Strength</td>"
	             + "<td style=\"border: 1px solid #ddd\">Potential</td>"
	             + "<td style=\"border: 1px solid #ddd\">Health</td>"
	             + "</tr>";
	for( key in players )
	{
		if( isPlayerActive(players[key]) )
		{
			health = (players[key].potential == 0) ? '-' : parseInt(players[key].strength*100/players[key].potential)+'%';
			aStats += "<tr>"
			       +  "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+players[key].totalUnit+"</td>"
			       +  "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+players[key].city+"</td>"
			       +  "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+players[key].harbor+"</td>"
			       +  "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+players[key].airfield+"</td>"
			       +  "<td style=\"text-align: right; "
			       +  " border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+parseInt(players[key].strength)+"</td>"
			       +  "<td style=\"text-align: right; "
			       +  " border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"+parseInt(players[key].potential)+"</td>"
			       +  "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
			       +  " background-color: "+players[key].secondaryColor+"\">"
			       +  health +"</td>"
			       + "</tr>";
		}
	}
	aStats += "</table>";
	armyStats.innerHTML = aStats;

	var uStats = "&nbsp;<strong>Unit Stats</strong>"
	           + "<table style=\"text-align: center; background-color: #F8F8F8; "
	           + " display: none; position: fixed; z-index: 100;\" "
	           + " cellspacing=\"2\" cellpadding=\"1\" border=\"0\">"
	           + "<tr>";
	for( key in armies )
	{
		uStats += "<td style=\"border: 1px solid #ddd\"><img src=\"/images/green_"+key+"\"/></td>";
	}
	uStats += "</tr><tr>";
	for( key in players )
	{
		if( isPlayerActive(players[key]) )
		{
			uStats += "<tr>";
			for( subkey in armies )
			{
				uStats += "<td style=\"border: 1px solid "+players[key].primaryColor+"; "
				       +  " background-color: "+players[key].secondaryColor+"\">"+eval('armies[subkey].'+key)+"</td>";
			}
			uStats += "</tr>";
		}
	}
	uStats += "</table>";
	unitStats.innerHTML = uStats;
}

var armies = new Array();
var players = new Array();
players['blue']   = new Player( '#81b7f5','#b3d2f5' );
players['red']    = new Player( '#fa5950','#fa8882' );
players['purple'] = new Player( '#ce90c9','#ceb9cc' );
players['yellow'] = new Player( '#fff22c','#fff778' );
players['green']  = new Player( '#9fe07c','#bce0a8' );
players['white']  = new Player( '#d4d7d2','#f4f7f2' );

calculateStats( players, armies );
renderStats( players, armies );

renderToggle('armyStats');
renderToggle('unitStats');

//--------------- END of WWUI.. for now anyway... ---------------------------------