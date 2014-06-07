// ==UserScript==
// @name           Vehical Time Calculator
// @namespace      Minethings
// @description    Calculates the time it takes for a vehical to get to the end of its route
// @include        http://*.minethings.com/vehicles/browse/
// ==/UserScript==
//(c) 2011 Felix Maxwell
var table = document.getElementById("fullcenter");
var Speeds = new Array();
//--Speeds--

//Land
//Yellow
Speeds[0] = 9;//Camel
Speeds[1] = 8;//Donkey
Speeds[2] = 16;//Unicycle
Speeds[3] = 18;//Rickshaw

//Green
Speeds[4] = 30;//Golf Cart
Speeds[5] = 40;//Go Kar
Speeds[6] = 55;//Scooter
Speeds[7] = 80;//Van

//Blue
Speeds[8] = 25;//Tractor
Speeds[9] = 70;//Sidecar Motorcycle
Speeds[10] = 60;//Short Bus
Speeds[11] = 120;//Roadster

//Red
Speeds[12] = 80;//Bus
Speeds[13] = 185;//Bandit
Speeds[14] = 10;//Siege Tower
Speeds[15] = 90;//Milk Truck

//Purple
Speeds[16] = 120;//Tank
Speeds[17] = 75;//Armored Limo
Speeds[18] = 85;//Gun Car
Speeds[19] = 200;//Scout

//Orange
Speeds[20] = 200;//Thing 3
Speeds[21] = 150;//Jumper
Speeds[22] = 75;//Assault Truck
Speeds[23] = 0;//MISSINGNO

//Ships
//Yellow
Speeds[24] = 7;//Row Boat
Speeds[25] = 15;//Outrigger
Speeds[26] = 23;//War Canoe
Speeds[27] = 16;//Dinghy

//Green
Speeds[28] = 29;//Sloop
Speeds[29] = 24;//Galley
Speeds[30] = 30;//Barque
Speeds[31] = 26;//Junk

//Blue
Speeds[32] = 32;//Brig
Speeds[33] = 42;//Pinnace
Speeds[34] = 36;//Caravel
Speeds[35] = 35;//Corvette

//Red
Speeds[36] = 45;//Ferry
Speeds[37] = 37;//Fluyt
Speeds[38] = 35;//Carrack
Speeds[39] = 38;//Whaler

//Purple
Speeds[40] = 52;//Galleon
Speeds[41] = 42;//Frigate
Speeds[42] = 38;//Steamship
Speeds[43] = 56;//Yacht

//Orange
Speeds[44] = 56;//Clipper
Speeds[45] = 46;//Schooner
Speeds[46] = 44;//Ironclad
Speeds[47] = 47;//Liner

var lines = table.innerHTML.split( "<tr>" );
var innerdata = "<table border='1'><tbody><tr><th>Time</th><th>Vehicle</th><th>City</th><th>En Route To</th><th>Km Left</th><th>Cargo</th><th>Status</th><th>Send</th></tr>";
function addTime( old, time )
{
	var division = old.split( "<td>" );
	division[1] = time;
	var output = "<td>" + division[1] + "</td><td>" + division[2] + "</td><td>" + division[3] + "</td><td>" + division[4] + "</td><td>" + division[5] + "</td><td>" + division[6] + "</td><td>" + division[7] + "</td><td>" + division[8] + "</td>";
	innerdata = innerdata + output;
}
function getDist( line )
{
	var division = line.split( "<td>" );
	return division[5];
}
function getSpeed( line )
{
	var division = line.split( "<td>" );
	var name = division[2];
	if( name.indexOf( "Camel" ) != -1 )
	{
		return Speeds[0];
	}
	else if( name.indexOf( "Donkey" ) != -1 )
	{
		return Speeds[1];
	}
	else if( name.indexOf( "Unicycle" ) != -1 )
	{
		return Speeds[2];
	}
	else if( name.indexOf( "Rickshaw" ) != -1 )
	{
		return Speeds[3];
	}
	else if( name.indexOf( "Golf&nbsp;Cart" ) != -1 )
	{
		return Speeds[4];
	}
	else if( name.indexOf( "Go&nbsp;Kart" ) != -1 )
	{
		return Speeds[5];
	}
	else if( name.indexOf( "Scooter" ) != -1 )
	{
		return Speeds[6];
	}
	else if( name.indexOf( "Van" ) != -1 )
	{
		return Speeds[7];
	}
	else if( name.indexOf( "Tractor" ) != -1 )
	{
		return Speeds[8];
	}
	else if( name.indexOf( "Sidecar&nbsp;Motorcycle" ) != -1 )
	{
		return Speeds[9];
	}
	else if( name.indexOf( "Short&nbsp;Bus" ) != -1 )
	{
		return Speeds[10];
	}
	else if( name.indexOf( "Roadster" ) != -1 )
	{
		return Speeds[11];
	}
	else if( name.indexOf( "Bus" ) != -1 )
	{
		return Speeds[12];
	}
	else if( name.indexOf( "Bandit" ) != -1 )
	{
		return Speeds[13];
	}
	else if( name.indexOf( "Seige&nbsp;Tower" ) != -1 )
	{
		return Speeds[14];
	}
	else if( name.indexOf( "Milk&nbsp;Truck" ) != -1 )
	{
		return Speeds[15];
	}
	else if( name.indexOf( "Tank" ) != -1 )
	{
		return Speeds[16];
	}
	else if( name.indexOf( "Armored&nbsp;Limo" ) != -1 )
	{
		return Speeds[17];
	}
	else if( name.indexOf( "Gun&nbsp;Car" ) != -1 )
	{
		return Speeds[18];
	}
	else if( name.indexOf( "Scout" ) != -1 )
	{
		return Speeds[19];
	}
	else if( name.indexOf( "Thing&nbsp;3" ) != -1 )
	{
		return Speeds[20];
	}
	else if( name.indexOf( "Jumper" ) != -1 )
	{
		return Speeds[21];
	}
	else if( name.indexOf( "Assault&nbsp;Truck" ) != -1 )
	{
		return Speeds[22];
	}
	else if( name.indexOf( "Row&nbsp;Boat" ) != -1 )
	{
		return Speeds[23];
	}
	else if( name.indexOf( "Outrigger" ) != -1 )
	{
		return Speeds[24];
	}
	else if( name.indexOf( "War&nbsp;Canoe" ) != -1 )
	{
		return Speeds[25];
	}
	else if( name.indexOf( "Dinghy" ) != -1 )
	{
		return Speeds[26];
	}
	else if( name.indexOf( "Sloop" ) != -1 )
	{
		return Speeds[27];
	}
	else if( name.indexOf( "Galley" ) != -1 )
	{
		return Speeds[28];
	}
	else if( name.indexOf( "Barque" ) != -1 )
	{
		return Speeds[29];
	}
	else if( name.indexOf( "Junk" ) != -1 )
	{
		return Speeds[30];
	}
	else if( name.indexOf( "Brig" ) != -1 )
	{
		return Speeds[31];
	}
	else if( name.indexOf( "Galley" ) != -1 )
	{
		return Speeds[32];
	}
	else if( name.indexOf( "Pinnace" ) != -1 )
	{
		return Speeds[33];
	}
	else if( name.indexOf( "Caravel" ) != -1 )
	{
		return Speeds[34];
	}
	else if( name.indexOf( "Corvette" ) != -1 )
	{
		return Speeds[35];
	}
	else if( name.indexOf( "Ferry" ) != -1 )
	{
		return Speeds[36];
	}
	else if( name.indexOf( "Fluyt" ) != -1 )
	{
		return Speeds[37];
	}
	else if( name.indexOf( "Carrack" ) != -1 )
	{
		return Speeds[38];
	}
	else if( name.indexOf( "Whaler" ) != -1 )
	{
		return Speeds[39];
	}
	else if( name.indexOf( "Galleon" ) != -1 )
	{
		return Speeds[40];
	}
	else if( name.indexOf( "Frigate" ) != -1 )
	{
		return Speeds[41];
	}
	else if( name.indexOf( "Steamship" ) != -1 )
	{
		return Speeds[42];
	}
	else if( name.indexOf( "Yacht" ) != -1 )
	{
		return Speeds[43];
	}
	else if( name.indexOf( "Clipper" ) != -1 )
	{
		return Speeds[44];
	}
	else if( name.indexOf( "Schooner" ) != -1 )
	{
		return Speeds[45];
	}
	else if( name.indexOf( "Ironclad" ) != -1 )
	{
		return Speeds[46];
	}
	else if( name.indexOf( "Liner" ) != -1 )
	{
		return Speeds[47];
	}
	return 0;
}
function getTime( line )
{
	var speed = getSpeed( line );
	speed = parseFloat( speed );
	var dist = getDist( line );
	dist = parseFloat( dist );
	var time = dist/speed;
	return time;
}
function roundPoint1( num )
{
	var tobe = num*10;
	tobe = Math.round( tobe );
	tobe = tobe/10;
	return tobe
}
function formatTime( line )
{
	var start = getTime( line );
	if( start > 24 )
	{
		return roundPoint1( start/24 ) + " Days";
	}
	else if( start < 1 )
	{
		return Math.round( start*60 ) + " Minutes";
	}
	else
	{
		return roundPoint1( start )+ " Hours";
	}
	return start;
}
for( i = 2; i < lines.length; ++i )
{
	addTime( lines[i], formatTime( lines[i] ) );
}
innerdata = innerdata + "</tbody></table>";
table.innerHTML = innerdata;