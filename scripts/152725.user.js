// ==UserScript==
// @name          planets.nu random names and friendly codes
// @description   set random ship names and friendly codes
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-set-random-buttons-for-name-friendly-codes-1
// @version 1.01
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
		var planet = vgap.planetScreen.planet;
	    var r = Math.random() * 500 + 500;
	    r = Math.floor(r);
	    planet.friendlycode = r.toString();
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
	    var r = Math.random() * 500 + 500;
	    r = Math.floor(r);
	    ship.friendlycode = r.toString();
	    ship.changed = 1;
	    
	    var b = "<td class='textval' id='friendly'>"+ship.friendlycode+"</td>";
	    $("#friendly").replaceWith(b);
	};

	vgapShipScreen.prototype.randomName = function() {
		var ship = vgap.shipScreen.ship;

		var url = "http://api.wordnik.com//v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&api_key=ba10726cf11176f65842402a80108c34e27da1ec2cff135e7&callback=?";
		$.getJSON(url, function(r) {
			ship.name = r.word;
			ship.changed = 1;

			var b = "<div id='ShipTitle' class='TopTitle'>"+ship.id+": "+ship.name+"</div>";
			$("#ShipTitle").replaceWith(b);
		});
	};
	
}
	
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
