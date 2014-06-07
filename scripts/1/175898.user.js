// ==UserScript==
// @name          planets.nu random names and friendly codes
// @description   set random ship names and friendly codes
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-set-random-buttons-for-name-friendly-codes-1
// @version 0.11
// ==/UserScript==

function wrapper () { // setRandomFC.js

	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

		oldLoadControls.apply(this, arguments);
           
//        var b = "";
//        b += "<li onclick='vgap.resetTurn();'>Reset Turn</li>";
//        
//       $("#MapTools li:contains('Clear')").after(b);
        
        var b = "<style type='text/css'>\n";
        b += ".SepTitle{font-size:10px}\n";	// don't know why this doesn't work hence the added style attr below
        b += ".SepButton{font-size:10px}\n";
        b += "</style>";

        $("head").append(b);
	};

	var oldPlanetScreenLoad = vgapPlanetScreen.prototype.load;
	vgapPlanetScreen.prototype.load = function(k) {
		
		oldPlanetScreenLoad.apply(this, arguments);

		var b =  "<div class='SepButton' onclick='vgap.planetScreen.randomFriendly();'>Random</div>";
		$(".SepButton:contains(Friendly)").before(b);

		$(".SepTitle").attr("style", "font-size:10px");
	    $("#Buildings .fc").removeClass("fc").addClass("val").attr("id", "friendly");
	    
		var planet = vgap.planetScreen.planet;
	    b = "<td class='val' id='friendly'>"+planet.friendlycode+"</td>";
	    $("#friendly").replaceWith(b);
	};
	
	vgapPlanetScreen.prototype.randomFriendly = function() {
	    var nukArray = ["NUK", "nuk", "Nuk", "nUk", "nuK", "NUk", "NuK", "nUK"]
	    var planet = vgap.planetScreen.planet;
	    var r = (Math.floor(Math.random() * 50000)) % 8;
            var fc = nukArray[r];
	    planet.friendlycode = fc;
	    planet.changed = 1;
	    
	    var b = "<td class='val' id='friendly'>"+planet.friendlycode+"</td>";
	    $("#friendly").replaceWith(b);
	};

//	vgaPlanets.prototype.planetTransferView = function(b, c) {
//		return vgap.map.hitTextBox(b, c);
//	};
	
	var oldShipScreenLoad = vgapShipScreen.prototype.load;
	vgapShipScreen.prototype.load = function(k) {
		
		oldShipScreenLoad.apply(this, arguments);

		var b = "<div class='SepButton' onclick='vgap.shipScreen.randomName();'>Random</div>";
		$(".SepButton:contains(Name)").before(b);
		
		b = "<div class='SepButton' onclick='vgap.shipScreen.randomFriendly();'>Random</div>";
		$(".SepButton:contains(Friendly)").before(b);
		
		$(".SepTitle").attr("style", "font-size:10px");
	    $("#ShipOrders .fc").removeClass("fc").addClass("textval").attr("id", "friendly");
	    
		var ship = vgap.shipScreen.ship;
	    b = "<td class='textval' id='friendly'>"+ship.friendlycode+"</td>";
	    $("#friendly").replaceWith(b);
	};
	
//	vgaPlanets.prototype.shipTransferView = function(b, c) {
//		return vgap.map.hitTextBox(b, c);
//	};
//	
//	vgaPlanets.prototype.shipScan = function(b, c) {
//		return vgap.map.hitTextBox(b, c);
//	};
	
	vgapShipScreen.prototype.randomFriendly = function() {
	    var ship = vgap.shipScreen.ship;
            var raceArray = ["Empire", "Colony", "Rebel", "Crystal", "Federation", "Robot", "Borg", "Lizard", "Fascist", "Privateer", "Birdmen"]
	    var r = (Math.floor(Math.random() * 50000)) % 11;
            var name = raceArray[r];
	    ship.name = name;
	    ship.changed = 1;
            var b = "<td class='val' id='friendly'>"+ship.name+"</td>";
	    $("#friendly").replaceWith(b);
	};
}
	
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);