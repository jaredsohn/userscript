// ==UserScript==
// @name          Planets.nu map printing
// @description   Allows opening a printable map of every turn
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @grant none
// @version 0.2
// ==/UserScript==


// later there will be svg-map animations - hopefully
// Version 0.2 - works with new servers
// Version 0.1 - created

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
        }
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };

// END Add-On Header

vgaPlanets.prototype.setupAddOn("printMap");

vgaPlanets.prototype.addOns.printMap.openMap=function()
{
	var mapWindow=window.open(vgap.curMap,'MapWindow');
};

var old_loadDashboard=vgapDashboard.prototype.load;

vgapDashboard.prototype.load=function() {
	old_loadDashboard.apply(this, arguments);
	$("<ul><li onclick='vgap.addOns.printMap.openMap();'>Printable Map »</li></ul>").appendTo("#DashboardMenu");
	/*working on it...
	$("<ul><li onclick='vgap.addOns.printMap.loadMaps();'>Map Animation »</li></ul>").appendTo("#DashboardMenu");
	*/
};

/* working on it...
vgaPlanets.prototype.addOns.printMap.nextmap=function()
{
	var t=vgap.addOns.printMap.t; 
	var x=vgap.addOns.printMap.x++;	
	//console.log(x);
	if (!vgap.loadingHistory) 
	{
		if (t==vgap.nowTurn) vgap.addOns.printMap.maps.push({turn:vgap.nowTurn, img:vgap.curMap});
		else if (t>0) vgap.addOns.printMap.maps.push({turn:t, img:vgap.curMap});
		t=vgap.addOns.printMap.t++;
		//console.log("Turn "+t);
	}
	if (t==vgap.nowTurn) vgap.loadNow();
	else 
	{
		vgap.loadHistory(t);
		vgap.indicator.text("Loading Maps");
	}
	if (t==vgap.nowTurn && !vgap.loadingHistory) 
	{
		//alert("Maps geladen");
		window.clearInterval(vgap.addOns.printMap.myInterval);
		vgap.indicateOff();
	}
}; */

vgaPlanets.prototype.addOns.printMap.loadMaps=function()
{
	vgap.addOns.printMap.maps=new Array();
	vgap.addOns.printMap.t=0; 
	vgap.addOns.printMap.x=0;
	vgap.loadingHistory=false;
	vgap.addOns.printMap.myInterval = window.setInterval("vgap.addOns.printMap.nextmap()",1000);
	//window.setTimeout(clearInterval(vgap.addOns.printMap.myInterval),1000000); //for emergency?
}; 

}


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
