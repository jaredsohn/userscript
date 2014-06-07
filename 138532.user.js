// ==UserScript==
// @name        Planets.nu extended shiplist
// @namespace   planets.nu
// @include     http://planets.nu/home
// @include     http://*.planets.nu/*
// @include     http://planets.nu/games
// @description Adds a link to export the own shiplist to csv and shows enemy ships
// @version     0.11
// @grant	none
// ==/UserScript==

// 0.11 adjusted to work with new server - will probably break when updating from some versions, sorry :(
// 0.10 array mismatch
// 0.9 added min/max fuel to shipsurvey, try to avoid data loss in allied ships
// 0.8 and another fix - saving to server is too unsecure, only local storage used
// 0.7 deleted too much. Setting waypoints in space could be made impossible.
// 0.6 storage/retrieval now also in localstorage, removed useless data to send less data
// 0.5 ammo not used in fuel calculation; ship has fuel if has warp; 
// storage/retrieval functions; ship name can have disturbing characters (cat's paw)
// 0.4 fixed small bugs in fuel calculation
// 0.3 stability (links won't disappear anymore)
// 0.2 list enemy ships (only current turn for now)
// 0.1 Export own shiplist


function wrapper () { // wrapper for injection

vgaPlanets.prototype.setupAddOn = function (addOnName) {
        if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
        vgaPlanets.prototype.addOns[addOnName] = {};
        var settings = localStorage.getItem(addOnName + ".settings");
        if (settings != null)
            vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
        else
            vgaPlanets.prototype.addOns[addOnName].settings = {};
        vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
            localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
        };
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };

// END Add-On Header

// Note Storage/Retrieval functions
vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null)
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions

// Datenexport shiplist
vgaPlanets.prototype.setupAddOn("shipList");
vgaPlanets.prototype.addOns.shipList.notetype = -138532; 

vgaPlanets.prototype.addOns.shipList.getShipList=function(){
	var s;
	var localList=new Array();
	for (var i=1; i<=500; ++i)
	{	
		s=vgap.getObjectFromNote(i, this.notetype);
		if (s!=null) localList.push(s);
	}
	var allships= new Array();
	var ships=new Array();
	allships=vgap.ships.slice();
	for (var i=0;i<allships.length;i++)
		{if (allships[i].ownerid!=vgap.player.id) ships.push(allships[i])}
	localList=this.mergeArrays(localList, ships);
	if (this.settings!=null && this.settings.shipList!=null) {localList=this.mergeArrays(localList, this.settings.shipList[vgap.game.id]);}
	//console.log(localList);
	this.shipList=localList.slice();
	return this.shipList;
};

vgaPlanets.prototype.addOns.shipList.saveShipList=function(){
	this.getShipList();
	if (this.settings==null) {
		this.settings={}; 
		this.settings.shipList={};
	}
	this.settings.shipList[vgap.game.id]=this.shipList;
	this.saveSettings();
	var s; var note;
	for (var i=1; i<=500; ++i)
	{
		s=vgap.getArray(this.shipList, i);
		if (s!=null) vgap.saveObjectAsNote(i, this.notetype, s);
		else {
			note=vgap.getNote(i, this.notetype);
			if (note!=null) {vgap.saveObjectAsNote(i, this.notetype, {})};
		}
	}
};

vgaPlanets.prototype.addOns.shipList.mergeArrays=function(array1, array2){
	//merges two lists, sorted by id, if there are two of the same id take the higher infoturn
	//can be used for vgap.ships, vgap.planets
	
	//sort array1 and array2 first
	function sortByID (a, b) {
		return (a.id-b.id);
	}
	
	if (array1) array1.sort(sortByID); else array1=[];
	if (array2) array2.sort(sortByID); else array2=[];
	
	var newArray= new Array();
	var e1, e2;
	var end1=(array1.length==0);
	var end2=(array2.length==0);
	
	if (!end1) e1=array1.shift();
	if (!end2) e2=array2.shift();
	
	while (!end1 || !end2) {
		if (!end1 && !end2) {
			if (e1.id == e2.id) {
				//both fields have entries with that id, so take the newer one
				newArray.push(e1.infoturn>e2.infoturn ? e1 : e2);
				e1=array1.shift();
				e2=array2.shift();
			}
			else {
				//take the one with ne lower id so we have order
				if (e1.id < e2.id) { newArray.push(e1); e1=array1.shift();}
				else { newArray.push(e2); e2=array2.shift();}
			}
			 if (!e1) end1=true;
			 if (!e2) end2=true;
		}
		
		//break condition - one field is empty so concat the other field
		if (end1 && !end2) {
			newArray=newArray.concat(e2, array2);
			end2=true;
		}
		else if (end2 && !end1) {
			newArray=newArray.concat(e1, array1);
			end1=true;
		}
	}
	return newArray;
};

vgaPlanets.prototype.addOns.shipList.old_showShips=vgapDashboard.prototype.showShips;
vgapDashboard.prototype.showShips=function(view) {
	vgap.addOns.shipList.old_showShips.apply(this, arguments);
	var newViewID=98;
	if ($('#enemyShips').html()==null) {
		var newItems="";
		newItems+="<li id='enemyShips' onclick='vgap.dash.showShips(" + newViewID + ");'>Known Enemy Ships</li>";
		newItems+="<li onclick='vgap.addOns.shipList.DownloadJSON2CSV(vgap.ships);'>Export Data (csv) »</li>";
		$("[onclick='vgap.dash.showShips(3);']").after(newItems);
	}
	if (view==newViewID) {
		vgap.closeSecond();
		this.pane.remove();
		html="";
		html += "<ul class='FilterMenu'><li ";
		html += " onclick='vgap.dash.showShips(0);'>Status</li><li ";
		html += " onclick='vgap.dash.showShips(1);'>Cargo View</li><li ";
		html += " onclick='vgap.dash.showShips(2);'>Fleet View</li><li ";
		html += " onclick='vgap.dash.showShips(3);'>Notes View</li>";
		html += "<li class='SelectedFilter' onclick='vgap.dash.showShips(" + newViewID + ");'>Known Enemy Ships</li>";
		html += "<li onclick='vgap.addOns.shipList.DownloadJSON2CSV(vgap.ships);'>Export Data (csv) »</li>";
		html += "</ul>";
		vgap.addOns.shipList.load=true;

		html += "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 30) + "px;'>";

		html += "<table id='ShipTable' align='left' rules='rows' frame='void' border='1' width='100%' style='cursor:pointer;'><thead>";
		
		html += "<th align='left'>Hull</th>";
		html += "<th align='left'>Id</th>";
		html += "<th align='left'>Player</th>";
		html += "<th align='left' title='Beam Count'>B</th>";
		html += "<th align='left' title='Beam Type'>Beams</th>";
		html += "<th align='left' title='Torpedo Launcher Count'>T</th>";
		html += "<th align='left' title='Torpedo Launcher Type/Fighter Bays'>Torps/Bays</th>";
		html += "<th align='left' title='Torps/Fighters'>Ammo</th>";
		html += "<th align='left'>Crew</th>";
		html += "<th align='left'>Damage</th>";
		html += "<th align='left' title='Last Warp'>Speed</th>";
		html += "<th align='left' title='Last turn spotted'>Info Turn</th>";
		html += "<th align='left' title='Minimal/Maximal possible Fuel'>min/max Fuel</th>";

		html += "</thead><tbody align='left'>";
		
		var otherShips=vgap.addOns.shipList.getShipList();
		if (otherShips!=null) {
		for (var i = 0; i < otherShips.length; i++) {
			var ship = otherShips[i];
			if (ship.id==null) continue;
			var hull = vgap.getHull(ship.hullid);
			var isKnown = ship.damage!=-1;
			var owner=ship.ownerid;
			var goodrel=false;
			if (owner==0 || vgap.getRelation(owner).relationfrom>1) goodrel=true;
			var dam = (isKnown ? (ship.damage > 0 ? "<span class='WarnText'>" + ship.damage + "%</span>" : ship.damage + "%") : "<span style='color:#cccccc'>0%</span>" );
			//crew is not in data
			//var crew = (isKnown ? (ship.crew < hull.crew ? "<span class='WarnText'>" + ship.crew + "</span>" : ship.crew ) : "<span style='color:#cccccc'>" + hull.crew + "</span>");
			var crew = "<span style='color:#cccccc'>" + hull.crew + "</span>";
			var beamtype = (hull.beams > 0 ? (isKnown ? vgap.getBeam(ship.beamid).name : "<span style='color:#cccccc'>Unknown Beams</span>") : "");
			var torptype = (hull.launchers > 0 ? (isKnown ? vgap.getTorpedo(ship.torpedoid).name : "<span style='color:#cccccc'>Unknown Torps</span>") : "") + (hull.fighterbays > 0 ? "Fighter Bays" : "");
			var beams = (hull.beams > 0 ? (isKnown ? ship.beams : "<span style='color:#cccccc'>" + hull.beams + "</span>") :"");
			var torps = (hull.launchers > 0 ? (isKnown ? ship.torps : "<span style='color:#cccccc'>" + hull.launchers + "</span>") : "") + (hull.fighterbays > 0 ? hull.fighterbays : "");
			var ammo = "";
			if (isKnown) ammo=ship.ammo + ( hull.fighterbays > 0 ? " F." : " T.") ;
			else if (hull.launchers > 0 || hull.fighterbays > 0) {
			ammo="<span style='color:#cccccc'>max. " + hull.cargo + ( hull.fighterbays > 0 ? " F." : " T.") + "</span>";
			}
			var minFuel=vgap.addOns.shipList.getMinFuel(ship);
			var maxFuel=vgap.addOns.shipList.getMaxFuel(ship);	
			var shipname=ship.name.replace(/\'/g, " ");

			html += "<tr class='RowSelect' title='" + shipname + "'" + (ship.infoturn==vgap.nowTurn ? "onclick='vgap.map.centerMap("+ship.x+", "+ship.y+");vgap.showMap();'" : "") +">";
			html += "<td><img class='TinyIcon' src='" + hullImg(ship.hullid) + "'/>" + hull.name + "</td>";
			html += "<td>" + ship.id + "</td>";
			var racename=(owner==0?"Unknown":vgap.raceName(owner));
			html += "<td><span " + (goodrel ? "style='color:#009900'" : "" ) +">" +  racename + "</span></td>";
			
			html += "<td>" + beams + "</td>";
			html += "<td>" + beamtype + "</td>";
			html += "<td>" + torps + "</td>";
			html += "<td>" + torptype + "</td>";
			html += "<td>" + ammo + "</td>";
			html += "<td>" + crew + "</td>";
			html += "<td>" + dam + "</td>";
			html += "<td>" + ship.warp + "</td>";
			html += "<td>" + ship.infoturn + "</td>";
			html += "<td>" + minFuel + " / " + maxFuel + " kt</td>";
			html += "</tr>";
		}
		}
		html += "</tbody></table>";
		html += "</div>";
		this.pane = $(html).appendTo(this.content);
		$("#ShipTable").tablesorter();
		this.pane.jScrollPane();
	}
			
};

vgaPlanets.prototype.addOns.shipList.old_shipSurvey=vgapMap.prototype.shipSurvey;
vgapMap.prototype.shipSurvey= function (shipId){
	vgap.addOns.shipList.old_shipSurvey.apply(this, arguments);
	var ship=vgap.getArray(vgap.ships, shipId);
	if (ship!=null)
	{
		var minFuel=vgap.addOns.shipList.getMinFuel(ship);
		var maxFuel=vgap.addOns.shipList.getMaxFuel(ship);

		var text="<br />min. Fuel: "+ minFuel + " kt<br />max. Fuel: " + maxFuel + " kt";
		$("span.BadText:contains('Mass')").append(text);
	}
};


vgaPlanets.prototype.addOns.shipList.getMaxFuel=function(ship){
	var hull = vgap.getHull(ship.hullid);
	var isKnown = ship.damage!=-1;
	var fuel = ship.mass-hull.mass;
	if (isKnown) 
	{
		if (hull.beams>0 && ship.beams>0) fuel-= ship.beams*vgap.getBeam(ship.beamid).mass;
		if (hull.launchers>0 && ship.torps>0) fuel-= ship.torps*vgap.getTorpedo(ship.torpedoid).mass;
		//fuel -= ship.ammo; //too easily loaded/unloaded
	}
	
	if (fuel<0) fuel=0;
	if (fuel>hull.fueltank) fuel=hull.fueltank;
	if (fuel==0 && ship.warp>0) fuel=1;
	return fuel;
};

vgaPlanets.prototype.addOns.shipList.getMinFuel=function(ship){
	var hull = vgap.getHull(ship.hullid);
	var fuel=ship.mass-hull.mass;
	
	if (hull.beams>0) fuel-= hull.beams*7; //highest beam mass = 7 (H.Blaster/H.Disruptor)
	if (hull.launchers>0) fuel-= hull.launchers*4; //highest launcher mass = 4 (Gamma Bombs, ridiculously)
	fuel-=hull.cargo;
	
	if (fuel<0) fuel=0;
	if (fuel>hull.fueltank) fuel=hull.fueltank;
	if (fuel==0 && ship.warp>0) fuel=1;
	return fuel;
};

vgaPlanets.prototype.addOns.shipList.loadHistory=vgaPlanets.prototype.loadHistory;
vgaPlanets.prototype.loadHistory=function(turn){
	vgap.addOns.shipList.loadHistory.apply(this, arguments);
	vgap.addOns.shipList.getShipList();
};

vgaPlanets.prototype.addOns.shipList.loadNow=vgaPlanets.prototype.loadNow;
vgaPlanets.prototype.loadNow=function(){
	vgap.addOns.shipList.loadNow.apply(this, arguments);
	vgap.addOns.shipList.saveShipList();
};


//from http://stackoverflow.com/questions/4130849/convert-json-format-to-csv-format-for-ms-excel (modified)
vgaPlanets.prototype.addOns.shipList.DownloadJSON2CSV=function (objArray) 
    {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	var data={"id":"ID", "hullid":"Hull", "name":"Name", "friendlycode":"Friendly Code", "x":"x", "y":"y", "targetx":"target x", "targety":"target y", "damage":"Damage", "engineid":"Engine", "beams":"Number of Beams", "beamid":"Beam Type", "torps":"Number of Launchers", "torpedoid":"Type of Launchers", "mass":"Total Mass", "neutronium":"Neutronium", "duranium":"Duranium", "tritanium":"Tritanium", "molybdenum":"Molybdenum", "supplies":"Supplies", "clans":"Clans", "megacredits":"MC", "ammo":"Torps or Fighters"};
        var str = '';
	var firstline='';
	for (var index in data) {
	firstline += data[index] + ',';
	}
	//alert(firstline);
	str+=firstline.slice(0,firstline.length-1) + '\r\n';
        for (var i = 0; i < array.length; i++) {
		if (array[i]['ownerid']!=vgap.player.id) continue; // only own ships
		
		var line = '';
		for (var j in data) {
			var d=array[i][j];
			//console.log(d);
			if (j=="engineid") line+=vgap.getEngine(d).name;
			else if (j=="hullid") line+=vgap.getHull(d).name;
			else if (j=="beamid" && d>0) line+=vgap.getBeam(d).name;
			else if (j=="torpedoid"&& d>0) line+=vgap.getTorpedo(d).name;
			else line += d;
			line += ',';
		}

		// Here is an example where you would wrap the values in double quotes
		// for (var index in array[i]) {
		//    line += '"' + array[i][index] + '",';
		// }

		line.slice(0,line.length-1); 

		str += line + '\r\n';
        }
        window.open( "data:text/csv;charset=utf-8," + escape(str));
    };

}



var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
