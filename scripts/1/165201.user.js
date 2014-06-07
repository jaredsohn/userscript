// ==UserScript==
// @name           Planets.nu Fleet UI
// @description    Planets.nu Fleet UI for Ship Screen
// @include        http://planets.nu/home
// @include        http://planets.nu/games/*
// @include        http://play.planets.nu/*
// @include 	   http://*.planets.nu/*
// @include	   http://test.planets.nu/*
// @include	   http://planets.nu/*
// @version        0.8
// ==/UserScript==
// 0.1 First version - adds new Fleet tab to ship screen view, and the Set Fleet Movement button.
// 0.2 Sets speed for all non-towed ships to the same speed as the current ship
// 0.3 Keeps track of number of ships at that location, and displays the total cargo for all ships combined
// 0.4 Add in buttons that let you move forward and backwards among the ships of the fleet.
// 0.5 Checks fuel when setting group destination, adds button to display only ships with low fuel warnings
// 0.6 Now supports use of [] tags for fleet names. [] tagged ships are treated as fleets.
// 0.7 Adds minesweep, minelay, fighter, and torp information for fleet.
// 0.8 Improved fleet information, fixed back/next behavior, updated UI to leave room for more buttons.

function wrapper () { // wrapper for injection
  
var fleetNames=new Array();
var fleetFlagships=new Array();
var fleetSizes=new Array();
  
var oldLoad = vgapShipScreen.prototype.load;

vgapShipScreen.prototype.load = function (ship) {


oldLoad.apply(this, arguments);  
$("<div class='SepBar'><div class='SepButton' id='"+ship.id+"' title='Use this Ships warp for all non-towed ships at this location' onclick='setFleetSpeed(this);'>Set Speed</div><div class='SepButton' id='"+ship.id+"' title='Use this Ships waypoints for all ships at this location' onclick='moveFleet(this);'>Set Destination</div><div class='SepTitle' id='FleetTitle' onclick=\"vgap.septoggle('FleetCommands');\"></div></div>").appendTo("#ShipScreen");
        this.Fleet = $("<div class='SepContainer' id='FleetCommands'/>").appendTo("#ShipScreen");
		this.loadFleet();
		vgap.shipScreen.draw();

};

vgapShipScreen.prototype.loadFleet =  function () {
        //this.Fleet.empty();
		var ship = this.ship;
		var html = "<table width='100%'>";
		var ship_count=0;
		var supply_count=0;
		var moly_count=0;
		var clan_count=0;
		var dur_count=0;
		var tri_count=0;
		var mc_count = 0;
		var neut_count=0;
		var mine_sweep=0;
		var fighter_count=0;
		var mine_count=0;
		var minelay_torp_count=0;
		var total_cargo=0;
		var total_cargo_used=0;
		var total_fuel=0;
		
      	var low_fuel_count=0;
		var fleetName=returnFleetName(ship);
		if (fleetName!=-1) //in a labeled fleet
			{
			for (var i = 0; i < vgap.myships.length; i++) 
				if(returnFleetName(vgap.myships[i])==fleetName)
				{
					var hull = vgap.getHull(vgap.myships[i].hullid);	
					supply_count+=vgap.myships[i].supplies;
					moly_count+=vgap.myships[i].molybdenum;
					clan_count+=vgap.myships[i].clans;
					dur_count+=vgap.myships[i].duranium;
					tri_count+=vgap.myships[i].tritanium;
					mc_count +=vgap.myships[i].megacredits;
					neut_count+=vgap.myships[i].neutronium;
					if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) low_fuel_count++;
					if (vgap.myships[i].bays > 0)
						fighter_count+=vgap.myships[i].ammo;
					if (vgap.myships[i].beams > 0)
						mine_sweep+=(vgap.myships[i].beams * vgap.myships[i].beamid * vgap.myships[i].beamid);
					if (vgap.myships[i].torps > 0)
					{
						minelay_torp_count+=vgap.myships[i].minelaytorps;
						mine_count+=vgapShipScreen.prototype.getMineUnits(vgap.myships[i]);
					}
				total_cargo_used+=(vgap.myships[i].ammo + vgap.myships[i].duranium + vgap.myships[i].tritanium + vgap.myships[i].molybdenum + vgap.myships[i].supplies + vgap.myships[i].clans);
				total_cargo+=hull.cargo;
				total_fuel+=hull.fueltank;
				}
			$("#FleetTitle").text("Fleet: "+ fleetName + " - " +returnFleetSize(fleetName)+ " ships");

			}
		else //unlabeled group at a location
		{
		for (var i = 0; i < vgap.myships.length; i++) 
			if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
			{
				var hull = vgap.getHull(vgap.myships[i].hullid);	
				ship_count++;
				supply_count+=vgap.myships[i].supplies;
				moly_count+=vgap.myships[i].molybdenum;
				clan_count+=vgap.myships[i].clans;
				dur_count+=vgap.myships[i].duranium;
				tri_count+=vgap.myships[i].tritanium;
				mc_count +=vgap.myships[i].megacredits;
				neut_count+=vgap.myships[i].neutronium;
				if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) low_fuel_count++;
				if (vgap.myships[i].bays > 0)
					fighter_count+=vgap.myships[i].ammo;
				if (vgap.myships[i].beams > 0)
					mine_sweep+=(vgap.myships[i].beams * vgap.myships[i].beamid * vgap.myships[i].beamid);
				if (vgap.myships[i].torps > 0)
				{
					minelay_torp_count+=vgap.myships[i].ammo;
					mine_count+=vgapShipScreen.prototype.getMineUnits(vgap.myships[i]);
				}
				total_cargo_used+=(vgap.myships[i].ammo + vgap.myships[i].duranium + vgap.myships[i].tritanium + vgap.myships[i].molybdenum + vgap.myships[i].supplies + vgap.myships[i].clans);
				total_cargo+=hull.cargo;
				total_fuel+=hull.fueltank;
			}
			$("#FleetTitle").text("Fleet: "+ ship_count+ " at location");	
		}
		var html;
		html="<button id='"+ship.id+"' onclick='fleetBack(this);'>< Fleet </button><button id='"+ship.id+"' onclick='fleetNext(this);'> Fleet ></button>";
		html+="<button id='"+ship.id+"' onclick='shipBack(this);'>< Ship </button><button id='"+ship.id+"' onclick='shipNext(this);'> Ship ></button>";
		//alert("hi");        
		html += "<table width='100%'>";
		if	(vgaPlanets.prototype.version<3)
			html += "<tr><td class='head'>Neutronium:</td><td class='val'>" + neut_count + "/" + total_fuel + " kt</td><td> Fuel Warnings:<button id='"+ship.id+","+low_fuel_count+",0' onclick='showShips2(this);'> " + low_fuel_count + "</button></td></tr>";
        else
			html += "<tr><td class='head'>Neutronium:</td><td class='val'>" + neut_count + "/" + total_fuel + " kt</td><td> Fuel Warnings:<button id='"+ship.id+","+low_fuel_count+",0' onclick='showShips3(this);'> " + low_fuel_count + "</button></td></tr>";
		html += "</table>";
		html += "<table width='100%'>";
		html += "<tr><td class='head'>CARGO:</td><td class='val'>" + total_cargo_used +"/"+total_cargo + "</td><td class='head'>Fighters:</td><td class='val'>" + fighter_count + "</td><td class='head'>Torps:</td><td class='val'>" + minelay_torp_count + "</td></tr>";
		html += "<tr><td class='head'>Dur:</td><td class='val'>" + dur_count + " kt</td><td class='head'>Tri:</td><td class='val'>" + tri_count + " kt</td><td class='head'>Moly:</td><td class='val'>" + moly_count + " kt</td></tr>";
        html += "<tr><td class='head'>MCs:</td><td class='val'>" + mc_count + "</td><td class='head'>Sup:</td><td class='val'>" + supply_count + " kt</td><td class='head'>Clans:</td><td class='val'>" + clan_count + "</td></tr>";
		html += "</table>";
		html += "<table width='100%'>";
		html += "<tr><td class='head'>Minelaying:</td><td class='val'>" + mine_count + " Mines</td></tr>";
		html += "<tr><td class='head'>Minesweeping:</td><td class='val'>" + mine_sweep*4 + " Mines/"+ mine_sweep*3 + " Webmines</td></tr>";
		html += "</table>";
		$(html).appendTo("#FleetCommands");
		
};

shipBack = function(passed)
{
var ship=vgap.getShip(passed.id);
var last=ship;
var fleetName=returnFleetName(ship);
if (fleetName!=-1) //in a labeled fleet
	{
	for (var i = 0; i < vgap.myships.length; i++) 
		if(returnFleetName(vgap.myships[i])==fleetName)
			if (vgap.myships[i].id==ship.id)	
				if (ship.id!=last.id)
					vgap.map.selectShip(last.id);
				else
					break;
			else 	
				last=vgap.myships[i];
	}
else //in an unlabeled group
	for (var i = 0; i < vgap.myships.length; i++) 
		{
		var fleet=returnFleetName(vgap.myships[i]);
		if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y)&&(fleet==-1))
			if (vgap.myships[i].id==ship.id)	
				if (ship.id!=last.id)
					vgap.map.selectShip(last.id);
				else
					break;
			else 	
				last=vgap.myships[i];
		}
//vgap.map.selectShip(id);
};

shipNext = function(passed)
{
var ship=vgap.getShip(passed.id);
var last=ship;
var number=vgap.myships.length-1;
var fleetName=returnFleetName(ship);
if (fleetName!=-1) //in a labeled fleet
	{
	for (var i = number; i>=0 ; i--) 
		if(returnFleetName(vgap.myships[i])==fleetName)
			if (vgap.myships[i].id==ship.id)	
				if (ship.id!=last.id)
					vgap.map.selectShip(last.id);
				else
					break;
			else 	
				last=vgap.myships[i];
	}
else //in an unlabeled group
	for (var i = number; i>=0 ; i--) 
	{
		var fleet=returnFleetName(vgap.myships[i]);
		if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y)&&(fleet==-1))
			if (vgap.myships[i].id==ship.id)	
				if (ship.id!=last.id)
					vgap.map.selectShip(last.id);
				else
					break;
			else 	
				last=vgap.myships[i];
	}
};

setFleetSpeed = function(passed)
{
//alert ("hey!");
var towed_ships=0;
var count=0;
var ship = vgap.getShip(passed.id);
var fleetName=returnFleetName(ship);
if (fleetName!=-1) //in a labeled fleet
	for (var i = 0; i < vgap.myships.length; i++)
	{
		if (returnFleetName(vgap.myships[i])==fleetName)
				if (vgap.isTowTarget(vgap.myships[i].id))
					{
					towed_ships++;
					vgap.myships[i].warp=0;
					}
				else
					{
					count++;
					vgap.myships[i].warp = ship.warp;
        			}
	}
else	//unlabeled group at location
	for (var i = 0; i < vgap.myships.length; i++) 
	{
	//alert("its "+ i);
	if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
		{
		//alert("hi!");
				if (vgap.isTowTarget(vgap.myships[i].id))
					{
					towed_ships++;
					vgap.myships[i].warp=0;
					}
				else
					{
					count++;
					vgap.myships[i].warp = ship.warp;
        			}
		} 
	}
	alert("Set " + count + " ships to warp " + ship.warp + ", and set " + towed_ships + " towed ships to warp 0");
if (vgaPlanets.prototype.version<3)
	vgap.map.updateZoom();
else
	{	
	vgap.loadWaypoints();
    vgap.shipScreen.screen.refresh();
	}
    vgap.map.draw();
};    
	
moveFleet = function(passed)
{
var count=0;
var lowFuel=0;
var ship = vgap.getShip(passed.id);
//alert(checkFuel(ship));
var fleetName=returnFleetName(ship);
if (fleetName!=-1) //in a labeled fleet
	for (var i = 0; i < vgap.myships.length; i++)
	{
		if (returnFleetName(vgap.myships[i])==fleetName)
			{
				count++;
				if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) lowFuel++;
                vgap.myships[i].targetx = ship.targetx;
                vgap.myships[i].targety = ship.targety;
				vgap.myships[i].waypoints = ship.waypoints;
			    var dest = vgap.getDest(vgap.myships[i]);
				vgap.myships[i].target = vgap.getTarget(dest.x, dest.y);
			}
	}
else //unlabeled group at location
for (var i = 0; i < vgap.myships.length; i++) 
	{
	//alert("its "+ i);
	if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
		{
		//alert("hi!");
				count++;
				if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i])) lowFuel++;
                vgap.myships[i].targetx = ship.targetx;
                vgap.myships[i].targety = ship.targety;
				vgap.myships[i].waypoints = ship.waypoints;
			    var dest = vgap.getDest(vgap.myships[i]);
				vgap.myships[i].target = vgap.getTarget(dest.x, dest.y);
		} 
	}
	if (lowFuel>0) alert ("Updated destination for " + count + " ships. " + lowFuel + " ships have insufficient fuel!");
		else
	alert("Updated destination for " + count + " ships");

if (vgaPlanets.prototype.version<3)
	vgap.map.updateZoom();
else
	{	
	vgap.loadWaypoints();
    vgap.shipScreen.screen.refresh();
	}
    vgap.map.draw();
};
	
  showShips2 = function (passed) {
		var data = passed.id.split(",");
		var ship = vgap.getShip(data[0]);
        var inMore = vgap.shipScreenOpen;
		var ships;
        var title = "";
        var html = "<div id='SelectLocation'>";
		if (data[2]!=0)
			ships = vgap.shipsAt(ship.x, ship.y);
		else
		{
			shipArray=new Array();
			var fleetName=returnFleetName(ship);
			if (fleetName!=-1) //in a labeled fleet
				for (var i = 0; i < vgap.myships.length; i++)
				{
					if (returnFleetName(vgap.myships[i])==fleetName)
						if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i]))
							shipArray.push(vgap.myships[i]);
				}
			else //unlabeled group at location
				for (var i = 0; i < vgap.myships.length; i++) 
				{
					if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
						if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i]))
							shipArray.push(vgap.myships[i]);
				}
			ships=shipArray;
		}
			
			
        for (var i = 0; i < ships.length; i++) {
                html += vgap.shipScan(ships[i], "vgap.map.selectShip(" + ships[i].id + ");");
        }
        if (ships.length > 0) {
            if (title != "")
                title += ", ";
            title += ships.length + " ships";
        }

        html += "</div>";

        if (inMore) {
            html = "<h1>Ships with Fuel Warnings: " + title + "</h1>" + html;
            html += "<a class='MoreBack' onclick='vgap.closeMore();return false;'>OK</a>";
            vgap.more.empty();
            $(html).appendTo(vgap.more);

            $("#SelectLocation").height($(window).height() - 100);
            vgap.showMore(300);
        }
        else {
            html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();'></div><div class='TopTitle'>Scan:" + title + "</div></div>" + html;
            vgap.map.centerMap(ship.x, ship.y);
            vgap.lc.empty();
            $(html).appendTo(vgap.lc);
            vgap.openLeft();
            $("#SelectLocation").height($(window).height() - 40);
            $("#SelectLocation").width(380);
        }
        $("#SelectLocation").jScrollPane();
    };	
	
	showShips3 = function (passed) {
		var data = passed.id.split(",");
		var ship = vgap.getShip(data[0]);
		var inMore = vgap.shipScreenOpen;

		if (data[2]!=0)
			ships = vgap.shipsAt(ship.x, ship.y);
		else
		{
			shipArray=new Array();
			var fleetName=returnFleetName(ship);
			if (fleetName!=-1)	//in a labeled fleet
				for (var i = 0; i < vgap.myships.length; i++)
				{
					if (returnFleetName(vgap.myships[i])==fleetName)
						if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i]))
							shipArray.push(vgap.myships[i]);
				}
			else	//unlabeled group at location
				for (var i = 0; i < vgap.myships.length; i++) 
				{
					if((vgap.myships[i].x==ship.x)&&(vgap.myships[i].y==ship.y))
						if (vgap.myships[i].neutronium<checkFuel(vgap.myships[i]))
							shipArray.push(vgap.myships[i]);
				}
			ships=shipArray;
		}
        var title = "";
        var html = "<div id='SelectLocation'></div>";

        if (inMore) {
            html = "<h1 id='ScanTitle'>Ships with Fuel Warnings:  " + title + "</h1>" + html;
            vgap.more.empty();
            $(html).appendTo(vgap.more);
            shtml.moreBack();
        }
        else {
            var lc = new leftContent("ScanScreen", "Scan: ", null, function () { vgap.closeLeft(); });
            vgap.map.centerMap(ship.x, ship.y);
            $(html).appendTo(vgap.lc);
        }
		for (var i = 0; i < ships.length; i++) {
            var scan = $(shtml.shipScan(ships[i])).appendTo("#SelectLocation");
            scan.click(function (e) { vgap.map.selectShip($(this).data("id")); });
            }
        if (ships.length > 0) {
            if (title != "")
                title += ", ";
            title += ships.length + " Ships with Fuel warnings";
        }

        if (inMore) {
            $("#ScanTitle").text(title);
            //$("#SelectLocation").height($(window).height() - 100);
            vgap.showMore(330);
        }
        else {
            $("#ScanScreen .TopTitle").text(title);
            vgap.openLeft();
            //$("#SelectLocation").height($(window).height() - 40);
            $("#SelectLocation").width(380);
        }
        if ($("#SelectLocation").height() > ($(window).height() - 40)) {
            $("#SelectLocation").height($(window).height() - 40);
            $("#SelectLocation").jScrollPane();
        }

    };
//====================FLEET FUNCTIONS=================================
buildFleetList=function()
{
fleetNames.length=0;
fleetFlagships.length=0;
fleetSizes.length=0;

for (var i = 0; i < vgap.myships.length; i++) 
	{
	if (vgap.myships[i].name.charAt(0)=='[')
		if 	(vgap.myships[i].name.indexOf(']')!=-1)
		{
			var name=vgap.myships[i].name.substring(1,vgap.myships[i].name.indexOf(']'));
			var position=fleetNames.indexOf(name);
			if (position==-1) //fleet is new
				{
				fleetNames.push(name);
				fleetFlagships.push(vgap.myships[i].id);
				fleetSizes.push(1);
//				position=(fleetNames.length)-1;//for testing only
				}
			else
				fleetSizes[position]++;
			
			//alert(name+' '+fleetSizes[position]);
		}
		//alert(vgap.myships[i].name.charAt(1));
	}
};

returnFleetName = function(ship)
{
if (ship.name.charAt(0)=='[')
	if 	(ship.name.indexOf(']')!=-1)
		return(ship.name.substring(1,ship.name.indexOf(']')));
return(-1)
};

returnFlagshipID = function(fleet_name)
{
var index=fleetNames.indexOf(fleet_name);
return(fleetFlagships[index]);
};

returnFleetSize = function(fleet_name)
{
var index=fleetNames.indexOf(fleet_name);
return (fleetSizes[index]);
};

fleetBack = function(passed)
{
var ship=vgap.getShip(passed.id);
var fleetName=returnFleetName(ship);
var index;
if (fleetName!=-1)
	{
	index=fleetNames.indexOf(fleetName);
	if(index>0) vgap.map.selectShip(fleetFlagships[index-1]);
	if(index==0) vgap.map.selectShip(fleetFlagships[fleetFlagships.length-1]);
	}
else if (typeof fleetFlagShips[0] != 'undefined')
	vgap.map.selectShip(fleetFlagships[0]);
};

fleetNext = function(passed)
{
var ship=vgap.getShip(passed.id);
var fleetName=returnFleetName(ship);
var index;
if (fleetName!=-1)
	{
	index=fleetNames.indexOf(fleetName);
	var number=fleetFlagships.length;
	number--;
	//alert(fleetFlagships.length + " " + index + " " + number);
	if(index<number) vgap.map.selectShip(fleetFlagships[index+1]);
	if(index==number) 
		vgap.map.selectShip(fleetFlagships[0]);
	}
else if (typeof fleetFlagShips[0] != 'undefined')
	vgap.map.selectShip(fleetFlagships[0]);
}

var oldchangeShipName=vgapShipScreen.prototype.changeShipName;

vgapShipScreen.prototype.changeShipName =  function () {
oldchangeShipName.apply(this, arguments); 
buildFleetList();
};

var oldprocessLoad=vgaPlanets.prototype.processLoad;

vgaPlanets.prototype.processLoad = function (result){
oldprocessLoad.apply(this,arguments);
buildFleetList();
};


//================END FLEET FUNCTIONS=================================
	
//====================FUEL FUNCTIONS==================================
checkFuel = function(ship)
{
var fuel=0;
var path = vgap.getPath(ship);
for (var i = 0; i < path.length; i++) {
	if (vgaPlanets.prototype.version<3)
            fuel += getFuelUsage2(ship,path[i].x1, path[i].y1, path[i].x2, path[i].y2);
	else 	
			fuel += getFuelUsage3(ship,path[i].x1, path[i].y1, path[i].x2, path[i].y2);
       }
        if (fuel == 0)
            fuel += cloakedFuel(ship);
return(fuel);
};

cloakedFuel = function (ship) {
        var hull = vgap.getHull(ship.hullid);
        if ((ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8 && hull.cancloak)) && ship.hullid != 29 && ship.hullid != 31)
            return Math.max(5, Math.floor((hull.mass / 100) * 5));
        else
            return 0;
    };

turnFuel2 = function (distance, mass, xv, turndistance,ship) {
        return Math.floor(xv * Math.floor(mass / 10) * ((Math.floor(distance) / turndistance) / 10000)) + cloakedFuel(ship);
    },
	
	
getFuelUsage2 =  function (ship, x1, y1, x2, y2) {
        var engine = vgap.getEngine(ship.engineid);
        var distance = vgap.map.getDist(x1, y1, x2, y2);

        if (ship.warp == 0)
            return 0;

        var xv = 0;
        switch (ship.warp) {
            case 1:
                xv = engine.warp1;
                break;
            case 2:
                xv = engine.warp2;
                break;
            case 3:
                xv = engine.warp3;
                break;
            case 4:
                xv = engine.warp4;
                break;
            case 5:
                xv = engine.warp5;
                break;
            case 6:
                xv = engine.warp6;
                break;
            case 7:
                xv = engine.warp7;
                break;
            case 8:
                xv = engine.warp8;
                break;
            case 9:
                xv = engine.warp9;
                break;
        }
        //Save fuel value to update during the calculation
        var currentfuel = ship.neutronium;

        var fuel = 0;
        var turndistance = vgap.getSpeed(ship.warp, ship.hullid);

        var distanceremaining = distance;
        var mass = vgapShipScreen.prototype.getMass(ship, true);

        //tow
        if (ship.mission == 6 && ship.mission1target != 0) {
            var towship = vgap.getShip(ship.mission1target);
            if (towship != null)
                mass += vgapShipScreen.prototype.getMass(towship, true);
        }

        var warp = ship.warp;
        while (distanceremaining > turndistance) {
            distanceremaining -= turndistance;
            var turnfuel = turnFuel2(turndistance, mass, xv, turndistance,ship);
            fuel += turnfuel;
            ship.neutronium -= turnfuel;
            if (ship.neutronium < 0) {
                turnfuel = ship.neutronium;
                ship.neutronium = 0;
            }
            mass -= turnfuel;
            var pa = vgap.planetAt(x2, y2);
            if (distanceremaining < 3 && pa != null) {
                distanceremaining = 0;
            }
        }
        if (distanceremaining > 0)
            fuel += turnFuel2(distanceremaining, mass, xv, turndistance,ship);

        //Return fuel back to correct value
        ship.neutronium = currentfuel;

        return fuel;
    }
	
	getFuelUsage3 =  function (ship, x1, y1, x2, y2) {
        var engine = vgap.getEngine(ship.engineid);
        var distance = Math.dist(x1, y1, x2, y2);

        if (ship.warp == 0)
            return 0;

        if (vgap.isHyping(ship))
            return 50;

        var xv = vgap.getXV(engine, ship.warp);

        //Save fuel value to update during the calculation
        var currentfuel = ship.neutronium;

        var fuel = 0;
        var turndistance = vgap.getSpeed(ship.warp, ship.hullid);

        var distanceremaining = distance;
        var mass = vgap.getMass(ship, true);

        //tow
        if (ship.mission == 6 && ship.mission1target != 0) {
            var towship = vgap.getShip(ship.mission1target);
            if (towship != null)
                mass += vgap.getMass(towship, true);
        }

        var warp = ship.warp;
        while (distanceremaining > turndistance) {
            distanceremaining -= turndistance;
            var turnfuel = vgap.turnFuel(turndistance, mass, xv, turndistance, vgap.cloakFuel(ship));
            fuel += turnfuel;
            ship.neutronium -= turnfuel;
            if (ship.neutronium < 0) {
                turnfuel = ship.neutronium;
                ship.neutronium = 0;
            }
            mass -= turnfuel;
            var pa = vgap.planetAt(x2, y2);
            if (distanceremaining < 3 && pa != null) {
                distanceremaining = 0;
            }
        }
        if (distanceremaining > 0)
            fuel += vgap.turnFuel(distanceremaining, mass, xv, turndistance, vgap.cloakFuel(ship));

        //Return fuel back to correct value
        ship.neutronium = currentfuel;

        return fuel;
    }
//==========================END FUEL FUNCTIONS=======================================
/*var oldLoadCargo = vgapShipScreen.prototype.loadCargo;

vgapShipScreen.prototype.loadCargo = function () {	
	oldLoadCargo.apply(this, arguments);  
	this.loadFleet();
	};
	*/
	
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);