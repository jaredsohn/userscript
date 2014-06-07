// ==UserScript==
// @name           Spy++
// @description    by Darth Brunus, Fixed by __Zx_(Fixed image error due to BFG update)
// @version        1.1
// @include        http://uni2.playstarfleet.com/messages*
// @include        http://playstarfleet.com/messages*
// @include        http://uni2.playstarfleetextreme.com/messages*
// @include        http://playstarfleetextreme.com/messages*
// ==/UserScript==


// Message class
function Message(msgid) {
	// *** Constructor
	// Load Id
	this.id = msgid;
	
	// Load Subject
	this.subject = document.getElementById("message_" + this.id).getElementsByClassName("subject")[0].innerHTML.trim();
	
	// Load Content 
	var msgBody = document.getElementById("message_" + this.id + "_body");
	this.data = msgBody.getElementsByClassName("text")[0].innerHTML.trim();
	this.content = this.data.replace(/<br[^>]*>/g, "\n").replace(/<(.|\n)*?>/g,"");
	// Load Links
	var msgLinks= msgBody.getElementsByTagName('a');
	this.coordsLink = msgLinks[0];
    this.msgLinksHTML = " ";
    for (var i=1; i<msgLinks.length; i++) { 
		this.msgLinksHTML += " | " + msgLinks[i].parentNode.innerHTML; 
    }
	// *** End Constructor

	this.isEspionage = function() {
		if(this.subject.match(/Espionage Report for.*/g) != null)
			return true;
		else
			return false;
	};

	this.setContent = function(s) {
		var msgContent = document.getElementById("message_" + this.id + "_body").getElementsByClassName("text")[0];
		msgContent.innerHTML = s;
	};

	this.setSender = function(s) {
		var msgSender = document.getElementById("message_" + this.id).getElementsByClassName("sender")[0];
		msgSender.innerHTML = s;
	};

	this.setSubject = function(s) {
		var msgSender = document.getElementById("message_" + this.id).getElementsByClassName("subject")[0];
		msgSender.innerHTML = s;
	};
};

// Coordinates class
function Coordinates(gal, sys, slot) {
	this.galaxy = parseInt(gal);
	this.system = parseInt(sys);
	this.slot = parseInt(slot);
};

// Resources class
function Resources(o, c, h) {
	this.ore = parseInt(o);
	this.crystal = parseInt(c);
	this.hydrogen = parseInt(h);
};

// Fleet class
function Fleet(owner) {
	this.owner = owner;
	this.hermes = 0;
	this.helios = 0;
	this.artemis = 0;
	this.atlas = 0;
	this.apollo = 0;
	this.charon = 0;
	this.hercules = 0;
	this.dionysus = 0;
	this.gaia = 0;
	this.poseidon = 0;
	this.athena = 0;
	this.ares = 0;
	this.hades = 0;
	this.prometheus = 0;
	this.zeus = 0;
	this.hephaestus = 0;
	
	this.calcValues = function() {	
		this.value = new Resources(0,0,0);
		// Hermes
		this.value.crystal += this.hermes * 1;
		// Helios
		this.value.crystal += this.helios * 2;
		this.value.hydrogen += this.helios * 0.5;
		// Artemis
		this.value.ore += this.artemis * 3;
		this.value.crystal += this.artemis * 1;
		// Atlas
		this.value.ore += this.atlas * 2;
		this.value.crystal += this.atlas * 2;
		// Apollo
		this.value.ore += this.apollo * 6;
		this.value.crystal += this.apollo * 2.5;
		// Charon
		this.value.ore += this.charon * 4;
		this.value.crystal += this.charon * 4;
		this.value.hydrogen += this.charon * 1;
		// Hercules
		this.value.ore += this.hercules * 6;
		this.value.crystal += this.hercules * 6;
		// Dionysus
		this.value.ore += this.dionysus * 10;
		this.value.crystal += this.dionysus * 6;
		this.value.hydrogen += this.dionysus * 2;
		// Gaia
		this.value.ore += this.gaia * 10;
		this.value.crystal += this.gaia * 20;
		this.value.hydrogen += this.gaia * 10;
		// Poseidon
		this.value.ore += this.poseidon * 20;
		this.value.crystal += this.poseidon * 7;
		this.value.hydrogen += this.poseidon * 2;
		// Athena
		this.value.ore += this.athena * 45;
		this.value.crystal += this.athena * 15;
		// Ares
		this.value.ore += this.ares * 50;
		this.value.crystal += this.ares * 25;
		this.value.hydrogen += this.ares * 15;
		// Hades
		this.value.ore += this.hades * 30;
		this.value.crystal += this.hades * 40;
		this.value.hydrogen += this.hades * 15;
		// Prometheus
		this.value.ore += this.prometheus * 60;
		this.value.crystal += this.prometheus * 50;
		this.value.hydrogen += this.prometheus * 15;
		// Zeus
		this.value.ore += this.zeus * 5000;
		this.value.crystal += this.zeus * 4000;
		this.value.hydrogen += this.zeus * 1000;
		// Hephaestus
		this.value.ore += this.hephaestus * 20000;
		this.value.crystal += this.hephaestus * 20000;
		this.value.hydrogen += this.hephaestus * 10000;
		
		// Fleet total raw value (this.resPoints)
		var r = 0;
		if(this.value.ore != null) r += this.value.ore;
		if(this.value.crystal != null) r += this.value.crystal;
		if(this.value.hydrogen != null) r += this.value.hydrogen;
		this.resPoints = r;
		
		// Fleet debris (this.debris)
		r = 0;
		if(this.value.ore != null) r += this.value.ore * 0.3;
		if(this.value.crystal != null) r += this.value.crystal * 0.3;
		this.debris = r;
	}
	
	this.getFleetPoints = function() {
		return    this.hermes
				+ this.helios
				+ this.artemis
				+ this.atlas
				+ this.apollo
				+ this.charon
				+ this.hercules
				+ this.dionysus
				+ this.gaia
				+ this.poseidon
				+ this.athena
				+ this.ares
				+ this.hades
				+ this.prometheus
				+ this.zeus
				+ this.hephaestus;
	}
}

// Defense class
function Defense() {
	this.missileBatt = 0;
	this.laserCannon = 0;
	this.pulseCannon = 0;
	this.particleCannon = 0;
	this.abm = 0;
	this.decoy = 0;
	this.ibm = 0;
	this.gaussCannon = 0;
	this.largeDecoy = 0;
	this.plasmaCannon = 0;
	
	this.calcValues = function() {
		this.value = new Resources(0,0,0);
		// Missile Battery
		this.value.ore += this.missileBatt * 2;
		// Laser cannon
		this.value.crystal += this.laserCannon * 0.5;
		this.value.ore += this.laserCannon * 1.5;
		// Pulse cannon
		this.value.ore += this.pulseCannon * 6;
		this.value.crystal += this.pulseCannon * 2;
		// Particle cannon
		this.value.ore += this.particleCannon * 2;
		this.value.crystal += this.particleCannon * 6;
		// Decoy
		this.value.ore += this.decoy * 10;
		this.value.crystal += this.decoy * 10;
		// Gauss
		this.value.ore += this.gaussCannon * 20;
		this.value.crystal += this.gaussCannon * 15;
		this.value.hydrogen += this.gaussCannon * 2;
		// Large Decoy
		this.value.ore += this.largeDecoy * 50;
		this.value.crystal += this.largeDecoy * 50;
		// Plasma Cannon
		this.value.ore += this.plasmaCannon * 50;
		this.value.crystal += this.plasmaCannon * 50;
		this.value.hydrogen += this.plasmaCannon * 30;
		
		var r = 0;
		if(this.value.ore != null) r += this.value.ore;
		if(this.value.crystal != null) r += this.value.crystal;
		if(this.value.hydrogen != null) r += this.value.hydrogen;
		this.resPoints = r;
	}
}

// Espionage report class
function EspionageReport(msgObj) {
	this.coords = new Coordinates();
	this.msg = msgObj;

	this.parse = function() {
		var esp = this.msg.content;
		// Coordinates and Name
		var m = esp.match(/(Hephaestus Class Attack Platform|Planet|Moon) ([^\[]+)\[(\d+):(\d+):(\d+)\]/);
		this.type = m[1];
		this.planetName = m[2];
		this.coords.galaxy = parseInt(m[3]);
		this.coords.system = parseInt(m[4]);
		this.coords.slot = parseInt(m[5]);

		// Resources
		var o = esp.match(/ore: ((\d|,)*)/)[1].replace(/,/g, "");
		var c = esp.match(/crystal: ((\d|,)*)/)[1].replace(/,/g, "");
		var h = esp.match(/hydrogen: ((\d|,)*)/)[1].replace(/,/g, "");
		this.resources = new Resources(o,c,h);
		
		this.parseFleets();
		this.playerName = this.fleets[0].owner;
		
		// Ships
		if(this.fleetsCount > 0) {
			this.hasShips = true;
			
			// Defenses
			if(esp.match(/DEFENSES:/) != null) {
				this.hasDefenses = true;
				this.parseDefense();
				
				// Buildings
				if(esp.match(/BUILDINGS:/) != null) {
					this.hasBuildings = true;
					if(this.type != "Hephaestus Class Attack Platform") {
						this.capitol = esp.match(/Capitol: (\d*)/)[1];
						this.shipyard = esp.match(/Shipyard: (\d*)/)[1];
					}
					if(this.type == "Planet") {
						this.researchLab = esp.match(/Research Lab: (\d*)/)[1];
						this.missileSilo = esp.match(/Missile Silo: (\d*)/)[1];
						this.factory = esp.match(/Factory: (\d*)/)[1];
						this.oreWarehouse = esp.match(/Ore Warehouse: (\d*)/)[1];
						this.crystalWarehouse = esp.match(/Crystal Warehouse: (\d*)/)[1];
						this.hydrogenStorage = esp.match(/Hydrogen Storage: (\d*)/)[1];
						this.foundry = esp.match(/Foundry: (\d*)/)[1];
					}
					else if(this.type == "Moon") {
						this.oracle = esp.match(/Oracle: (\d*)/)[1];
						this.lunarBase = esp.match(/Lunar Base: (\d*)/)[1];
						this.warpGate = esp.match(/Warp Gate: (\d*)/)[1];
					}
					
					// Mines
					if(esp.match(/MINES:/) != null && this.type == "Planet") {
						this.hasMines = true;
						this.oreMine = esp.match(/Ore Mine: (\d*)/)[1];
						this.crystalMine = esp.match(/Crystal Mine: (\d*)/)[1];
						this.hydrogenSynth = esp.match(/Hydrogen Synthesizer: (\d*)/)[1];

						this.calcProduction();
					}
						
					// Techs
					if(esp.match(/TECHS:/) != null) {
						this.hasTechs = true;
						this.laserTech = esp.match(/Laser Tech: (\d*)/)[1];
						this.armorTech = esp.match(/Armor Tech: (\d*)/)[1];
						this.weaponsTech = esp.match(/Weapons Tech: (\d*)/)[1];
						this.shieldTech = esp.match(/Shield Tech: (\d*)/)[1];
						this.particleTech = esp.match(/Particle Tech: (\d*)/)[1];
						this.jetDrive = esp.match(/Jet Drive: (\d*)/)[1];
						this.aiTech = esp.match(/A.I. Tech: (\d*)/)[1];
						this.energyTech = esp.match(/Energy Tech: (\d*)/)[1];
						this.espionageTech = esp.match(/Espionage Tech: (\d*)/)[1];
						this.pulseDrive = esp.match(/Pulse Drive: (\d*)/)[1];
						this.plasmaTech = esp.match(/Plasma Tech: (\d*)/)[1];
						this.ftlTech = esp.match(/FTL Tech: (\d*)/)[1];
						this.expeditionTech = esp.match(/Expedition Tech: (\d*)/)[1];
						this.warpDrive = esp.match(/Warp Drive: (\d*)/)[1];
						this.arcNet = esp.match(/Advanced Research Communication Network: (\d*)/)[1];
					}
				}
			}
		}
	}
	
	this.parseFleets = function () {
		var espLines = this.msg.content.split("\n");
		this.fleets = [ ];
		this.totalFleetResPoints = 0;
		this.totalFleetDebris = 0;
		var i;
		for(i = 0; i < espLines.length; i++) {
			var m = espLines[i].match(/(.+)'S SHIPS/);
			if(m != null) {
				this.fleets.unshift(new Fleet(m[1]));
			}
			
			m = espLines[i].match(/\* ([A-Za-z]+) Class.*: ([\d,]+)/);
			if(m != null) {
				switch(m[1].toLowerCase()) {
					case "hermes": this.fleets[0].hermes = parseInt(m[2].replace(",","")); break;
					case "helios": this.fleets[0].helios = parseInt(m[2].replace(",","")); break;
					case "artemis": this.fleets[0].artemis = parseInt(m[2].replace(",","")); break;
					case "atlas": this.fleets[0].atlas = parseInt(m[2].replace(",","")); break;
					case "apollo": this.fleets[0].apollo = parseInt(m[2].replace(",","")); break;
					case "charon": this.fleets[0].charon = parseInt(m[2].replace(",","")); break;
					case "hercules": this.fleets[0].hercules = parseInt(m[2].replace(",","")); break;
					case "dionysus": this.fleets[0].dionysus = parseInt(m[2].replace(",","")); break;
					case "poseidon": this.fleets[0].poseidon = parseInt(m[2].replace(",","")); break;
					case "gaia": this.fleets[0].gaia = parseInt(m[2].replace(",","")); break;
					case "athena": this.fleets[0].athena = parseInt(m[2].replace(",","")); break;
					case "ares": this.fleets[0].ares = parseInt(m[2].replace(",","")); break;
					case "hades": this.fleets[0].hades = parseInt(m[2].replace(",","")); break;
					case "prometheus": this.fleets[0].prometheus = parseInt(m[2].replace(",","")); break;
					case "zeus": this.fleets[0].zeus = parseInt(m[2].replace(",","")); break;
					case "hephaestus": this.fleets[0].hephaestus = parseInt(m[2].replace(",","")); break;
				}
			}
		}
		
		for(i = 0; i < this.fleets.length; i++) {
			this.fleets[i].calcValues();
			this.totalFleetResPoints += this.fleets[i].resPoints;
			this.totalFleetDebris += this.fleets[i].debris;
		}
		
		this.fleetsCount = this.fleets.length;
		this.fleets.reverse();
	}
	
	this.parseDefense = function() {
		this.defense = new Defense();
		
		var esp = this.msg.content;
		m = esp.match(/Missile Battery: ((\d|,)*)/);
		if(m != null)
			this.defense.missileBatt = parseInt(m[1].replace(",", ""));

		m = esp.match(/Laser Cannon: ((\d|,)*)/);
		if(m != null)
			this.defense.laserCannon = parseInt(m[1].replace(",", ""));

		m = esp.match(/Pulse Cannon: ((\d|,)*)/);
		if(m != null)
			this.defense.pulseCannon = parseInt(m[1].replace(",", ""));

		m = esp.match(/Particle Cannon: ((\d|,)*)/);
		if(m != null)
			this.defense.particleCannon = parseInt(m[1].replace(",", ""));

		m = esp.match(/Anti-Ballistic Missile: ((\d|,)*)/);
		if(m != null)
			this.defense.abm = parseInt(m[1].replace(",", ""));

		m = esp.match(/Decoy: ((\d|,)*)/);
		if(m != null)
			this.defense.decoy = parseInt(m[1].replace(",", ""));

		m = esp.match(/Interplanetary Ballistic Missile: ((\d|,)*)/);
		if(m != null)
			this.defense.ibm = parseInt(m[1].replace(",", ""));

		m = esp.match(/Gauss Cannon: ((\d|,)*)/);
		if(m != null)
			this.defense.gaussCannon = parseInt(m[1].replace(",", ""));

		m = esp.match(/Large Decoy: ((\d|,)*)/);
		if(m != null)
			this.defense.largeDecoy = parseInt(m[1].replace(",", ""));

		m = esp.match(/Plasma Cannon: ((\d|,)*)/);
		if(m != null)
			this.defense.plasmaCannon = parseInt(m[1].replace(",", ""));
		
		this.defense.calcValues();
	}

	this.calcProduction = function() {
		var productionBase = document.title.match(/Uni 2/gi) ? 1.14 : 1.1;
		var oProduction = Math.floor(30*this.oreMine*Math.pow(productionBase,this.oreMine));
		oProduction = oProduction * (1 + Math.floor(this.oreMine/3 + 1)*0.02) + 20;
		var cProduction = Math.floor(20*this.crystalMine*Math.pow(productionBase,this.crystalMine));
		cProduction = cProduction * (1 + Math.floor(this.crystalMine/3 + 1)*0.02) + 10;

		if(document.title.match(/Extreme/gi)) {
			oProduction = oProduction * 2;
			cProduction = cProduction * 2;
		}

		this.production = new Resources(oProduction, cProduction, 0);

		var oProdTime = this.resources.ore/oProduction;
		var cProdTime = this.resources.crystal/cProduction;

		if(oProdTime < 24 && cProdTime < 24) {
			this.showsProdTime = true;
			this.oProdTime = Math.floor(oProdTime) + ":" + pad(Math.floor((oProdTime - Math.floor(oProdTime))*60), 2);
			this.cProdTime = Math.floor(cProdTime) + ":" + pad(Math.floor((cProdTime - Math.floor(cProdTime))*60), 2);
		}
		else {
			this.showsProdTime = false;
		}
	}
	
	this.getResourcesPoints = function() {
		return Math.floor((this.resources.ore + this.resources.crystal + this.resources.hydrogen)/1000);
	}

	this.getPlusReport = function() {
		var s = "";
		if(this.playerName != null)
			s += "<span style='font-weight: bold'>" + this.playerName + "</span> - ";
		s += this.type + " " + this.planetName + " ";
		s += "<a href='" + this.msg.coordsLink + "'>[" + this.coords.galaxy + ":" + this.coords.system + ":" + this.coords.slot + (this.type == "Moon" ? "m" : "" ) + "]</a><br>";
		if(this.hasBuildings && this.type == "Moon") {
			if(this.oracle != null && this.oracle != 0) {
				var lowerORange = this.coords.system - (Math.pow(this.oracle, 2) - 1);
				var upperORange = this.coords.system + (Math.pow(this.oracle, 2) - 1);
				lowerORange = (lowerORange < 1) ? 1 : lowerORange;
				upperORange = (upperORange > 499) ? 499 : upperORange;
				s += "Oracle " + this.oracle + " (system " + lowerORange + " to " + upperORange + ")";
			}
			else
				s += "No oracle";
			s += (this.warpGate != 0 ? " with Warp Gate" : "");
			s += "<br>";
		}
		if(this.hasBuildings && this.type == "Planet")
			s += "(Mines " + this.oreMine + "-" + this.crystalMine + "-" + this.hydrogenSynth + " F" + this.foundry + ")<br>";
			
		s += "<br>";
		s += "RESOURCES:<br>";
		s += "* ore: " + addCommas(this.resources.ore);
		if(this.hasBuildings && this.type == "Planet")
			s += " (" + addCommas(50000*(Math.ceil(Math.pow(1.6, this.oreWarehouse)) + 1)) + ")";
		if(this.hasMines && this.type == "Planet") {
			s += " (~" + addCommas(this.production.ore) + "/h";
			if(this.showsProdTime) s += " ~" + this.oProdTime;
			s += ")";
		}
		s += "<br>";
		s += "* crystal: " + addCommas(this.resources.crystal);
		if(this.hasBuildings && this.type == "Planet")
			s += " (" + addCommas(50000*(Math.ceil(Math.pow(1.6, this.crystalWarehouse)) + 1)) + ")";
		if(this.hasMines && this.type == "Planet") {
			s += " (~" + addCommas(this.production.crystal) + "/h";
			if(this.showsProdTime) s += " ~" + this.cProdTime;
			s += ")";
		}
		s += "<br>";
		s += "* hydrogen: " + addCommas(this.resources.hydrogen);
		if(this.hasBuildings && this.type == "Planet")
			s += " (" + addCommas(50000*(Math.ceil(Math.pow(1.6, this.hydrogenStorage)) + 1)) + ")";
		s += "<br><br>";
	
		var totalPlunder = 0;
		s += "<a href='javascript:;' onclick=\"if(document.getElementById(&quot;spypp_plunder_" + this.msg.id + "&quot;).style.display == &quot;&quot;){ document.getElementById(&quot;spypp_plunder_" + this.msg.id + "&quot;).style.display = &quot;none&quot; } else { document.getElementById(&quot;spypp_plunder_" + this.msg.id + "&quot;).style.display = &quot;&quot;; };\">Toggle plunder data</a> ";
		s += "<div id='spypp_plunder_" + this.msg.id + "' style='display: none'>";
		for(var i = 1; i<7; i++) {
			var plunder = Math.floor((this.resources.ore + this.resources.crystal + this.resources.hydrogen)/Math.pow(2,i));
			totalPlunder += plunder;
			s += "Wave " + i + " plunder: " + addCommas(plunder);
			s += " (" + addCommas(Math.ceil(plunder/25000)) + " hercs | ";
			s += addCommas(Math.ceil(plunder/5000)) + " atlas)<br>";
		}
		s += "Total plunder in 6 waves: " + addCommas(totalPlunder);
		s += " (" + addCommas(Math.ceil(totalPlunder/25000)) + " hercs | ";
		s += addCommas(Math.ceil(totalPlunder/5000)) + " atlas)";
		s += "</div><br><br>";

		var thumbSize = "height='22' width='22'";
		var siteAddr = getSiteAddr();
		
		if(this.hasShips) {
			if(this.fleetsCount > 1) {
				s += "<span style='color: #FF4040; font-weight: bold'>";
				s += "Total DSP: " + addCommas(Math.floor(this.totalFleetResPoints)) + " - ";
				s += "Total Dios: " + addCommas(Math.ceil(this.totalFleetDebris/20)) + "</span>&nbsp;<br><br>";
			}
			var i;
			for(i = 0; i < this.fleets.length; i++) {
				s += this.fleets[i].owner + "'S SHIPS (";
				s += "<span style='color: #FF4040; font-weight: bold'>";
				s += "&nbsp;DSP: " + addCommas(Math.floor(this.fleets[i].resPoints)) + " - ";
				s += "Dios: " + addCommas(Math.ceil(this.fleets[i].debris/20)) + " - ";
				s += "Ships: " + addCommas(this.fleets[i].getFleetPoints()) + "</span>&nbsp;):<br>";
				var shipThumbsAddr = siteAddr + "/images/starfleet/ship_templates/";
				if (this.fleets[i].hermes > 0)
					s += "<img src='" + shipThumbsAddr + "hermes_class.png' " + thumbSize + " alt='* Hermes Class Probe: " + addCommas(this.fleets[i].hermes) + " '> x" + addCommas(this.fleets[i].hermes) + " ";
				if (this.fleets[i].helios > 0)
					s += "<img src='" + shipThumbsAddr + "solar_satellite.png' " + thumbSize + " alt='* Helios Class Solar Satellite: " + addCommas(this.fleets[i].helios) +  " '> x" + addCommas(this.fleets[i].helios) + " ";
				if (this.fleets[i].artemis > 0)
					s += "<img src='" + shipThumbsAddr + "artemis_class.png' " + thumbSize + " alt='* Artemis Class Fighter: " + addCommas(this.fleets[i].artemis) + " '> x" + addCommas(this.fleets[i].artemis) + " ";
				if (this.fleets[i].atlas > 0)
					s += "<img src='" + shipThumbsAddr + "atlas_class.png' " + thumbSize + " alt='* Atlas Class Cargo: " + addCommas(this.fleets[i].atlas) + "'> x" + addCommas(this.fleets[i].atlas) + " ";
				if (this.fleets[i].apollo > 0)
					s += "<img src='" + shipThumbsAddr + "apollo_class.png' " + thumbSize + " alt='* Apollo Class Fighter: " + addCommas(this.fleets[i].apollo) + " '> x" + addCommas(this.fleets[i].apollo) + " ";
				if (this.fleets[i].charon > 0)
					s += "<img src='" + shipThumbsAddr + "charon_class.png' " + thumbSize + " alt='* Charon Class Transport: " + addCommas(this.fleets[i].charon) + " '> x" + addCommas(this.fleets[i].charon) + " ";
				if (this.fleets[i].hercules > 0)
					s += "<img src='" + shipThumbsAddr + "hercules_class.png' " + thumbSize + " alt='* Hercules Class Cargo: " + addCommas(this.fleets[i].hercules) + " '> x" + addCommas(this.fleets[i].hercules) + " ";
				if (this.fleets[i].dionysus > 0)
					s += "<img src='" + shipThumbsAddr + "dionysus_class.png' " + thumbSize + " alt='* Dionysus Class Recycler: " + addCommas(this.fleets[i].dionysus) + " '> x" + addCommas(this.fleets[i].dionysus) + " ";
				if (this.fleets[i].gaia > 0)
					s += "<img src='" + shipThumbsAddr + "gaia_class.png' " + thumbSize + " alt='* Gaia Colony Ship: " + addCommas(this.fleets[i].gaia) + " '> x" + addCommas(this.fleets[i].gaia) + " ";
				if (this.fleets[i].poseidon > 0)
					s += "<img src='" + shipThumbsAddr + "poseidon_class.png' " + thumbSize + " alt='* Poseidon Class Cruiser: " + addCommas(this.fleets[i].poseidon) + " '> x" + addCommas(this.fleets[i].poseidon) + " ";
				if (this.fleets[i].athena > 0)
					s += "<img src='" + shipThumbsAddr + "athena_class.png' " + thumbSize + " alt='* Athena Class Battleship: " + addCommas(this.fleets[i].athena) + " '> x" + addCommas(this.fleets[i].athena) + " ";
				if (this.fleets[i].ares > 0)
					s += "<img src='" + shipThumbsAddr + "ares_class.png' " + thumbSize + " alt='* Ares Class Bomber: " + addCommas(this.fleets[i].ares) + " '> x" + addCommas(this.fleets[i].ares) + " ";
				if (this.fleets[i].hades > 0)
					s += "<img src='" + shipThumbsAddr + "hades_class.png' " + thumbSize + " alt='* Hades Class Battleship: " + addCommas(this.fleets[i].hades) + " '> x" + addCommas(this.fleets[i].hades) + " ";
				if (this.fleets[i].prometheus > 0)
					s += "<img src='" + shipThumbsAddr + "prometheus_class.png' " + thumbSize + " alt='* Prometheus Class Destroyer: " + addCommas(this.fleets[i].prometheus) + " '> x" + addCommas(this.fleets[i].prometheus) + " ";
				if (this.fleets[i].zeus > 0)
					s += "<img src='" + shipThumbsAddr + "zeus_class.png' " + thumbSize + " alt='* Zeus Class: " + addCommas(this.fleets[i].zeus) + " '> x" + addCommas(this.fleets[i].zeus) + " ";
				if (this.fleets[i].hephaestus > 0)
					s += "<img src='" + siteAddr + "/images/starfleet/planets/roaming_planet.png' " + thumbSize + " alt='* Hephaestus Class Attack Platform: " + addCommas(this.fleets[i].hephaestus) + " '> x" + addCommas(this.fleets[i].hephaestus) + " ";
				s += "<br><br>";
			}
		}
		if(this.hasDefenses) {
			var defsThumbsAddr = siteAddr + "/images/starfleet/defense_templates/";
			s += "DEFENSES:<br>";
			if (this.defense.missileBatt > 0 && this.defense.missileBatt > 0)
				s += "<img src='" + defsThumbsAddr + "missile_turret.png' " + thumbSize + " alt='* Missile Battery: " + this.defense.missileBatt + " '> x" + this.defense.missileBatt + " ";
			if (this.defense.laserCannon > 0 && this.defense.laserCannon > 0)
				s += "<img src='" + defsThumbsAddr + "laser_turret.png' " + thumbSize + " alt='* Laser Cannon: " + this.defense.laserCannon + " '> x" + this.defense.laserCannon + " ";
			if (this.defense.pulseCannon > 0 && this.defense.pulseCannon > 0)
				s += "<img src='" + defsThumbsAddr + "pulse_cannon.png' " + thumbSize + " alt='* Pulse Cannon: " + this.defense.pulseCannon + " '> x" + this.defense.pulseCannon + " ";
			if (this.defense.particleCannon > 0 && this.defense.particleCannon > 0)
				s += "<img src='" + defsThumbsAddr + "particle_cannon.png' " + thumbSize + " alt='* Particle Cannon: " + this.defense.particleCannon + " '> x" + this.defense.particleCannon + " ";
			if (this.defense.decoy > 0 && this.defense.decoy > 0)
				s += "<img src='" + defsThumbsAddr + "decoy.png' " + thumbSize + " alt='* Decoy: " + this.defense.decoy + " '> x" + this.defense.decoy + " ";
			if (this.defense.gaussCannon > 0 && this.defense.gaussCannon > 0)
				s += "<img src='" + defsThumbsAddr + "gauss_cannon.png' " + thumbSize + " alt='* Gauss Cannon: " + this.defense.gaussCannon + " '> x" + this.defense.gaussCannon + " ";
			if (this.defense.largeDecoy > 0 && this.defense.largeDecoy > 0)
				s += "<img src='" + defsThumbsAddr + "large_decoy.png' " + thumbSize + " alt='* Large Decoy: " + this.defense.largeDecoy + " '> x" + this.defense.largeDecoy + " ";
			if (this.defense.plasmaCannon > 0 && this.defense.plasmaCannon > 0)
				s += "<img src='" + defsThumbsAddr + "plasma_turret.png' " + thumbSize + " alt='* Plasma Cannon: " + this.defense.plasmaCannon + " '> x" + this.defense.plasmaCannon + " ";
			if (this.defense.abm > 0 || this.defense.ibm > 0)
				s += "<br>";
			if (this.defense.abm > 0 && this.defense.abm > 0)
				s += "<img src='" + defsThumbsAddr + "antiballistic_missile.png' " + thumbSize + " alt='* Anti-Ballistic Missile: " + this.defense.abm + " '> x" + this.defense.abm + " ";
			if (this.defense.ibm > 0 && this.defense.ibm > 0)
				s += "<img src='" + defsThumbsAddr + "interplanetary_missile.png' " + thumbSize + " alt='* Interplanetary Ballistic Missile: " + this.defense.ibm + " '> x" + this.defense.ibm + " ";
			s += "<br><br>";
		}

		if(this.hasTechs) {
			s+= "TECHS:<br>";
			s+= "* Armor Tech: " + this.armorTech + "<br>";
			s+= "* Weapons Tech: " + this.weaponsTech + "<br>";
			s+= "* Shield Tech: " + this.shieldTech + "<br>";
			s+= "* Spy: " + this.espionageTech + "<br><br>";
		}
		
		s += "<a href='javascript:;' onclick=\"if(document.getElementById(&quot;msg_" + this.msg.id + "_data&quot;).style.display == &quot;&quot;){ document.getElementById(&quot;msg_" + this.msg.id + "_data&quot;).style.display = &quot;none&quot; } else { document.getElementById(&quot;msg_" + this.msg.id + "_data&quot;).style.display = &quot;&quot;; };\">Toggle original</a> ";
		s += this.msg.msgLinksHTML;
		s += " | <a href='http://www.battlecalc.com/log_parse?parse_to=/&parseLog=1&log_input=" + fixedEncodeURIComponent(this.msg.content) + "' target='_blank'>Parse to Battlecalc.com</a>";

		s += "<div id='msg_" + this.msg.id + "_data' style='display: none'><br><br>" + this.msg.data + "</div>";
		return s;
	}

	this.getPlusSubject = function() {
		var s = "";
		s += "<span style='width: 33%; font-weight: bold; display: inline-block'>S: ";
		if(this.hasShips) {
			s += addCommas(Math.floor(this.totalFleetResPoints)); 
		}
		else {
			s += "?";
		}
		s += "</span>";
		s += "<span style='width: 33%; font-weight: bold; display: inline-block'>D: ";
		if(this.hasDefenses) {
			s += addCommas(Math.floor(this.defense.resPoints));
		}
		else {
			s += "?";
		}
		s += "</span>";	
		s += "<span style='width: 33%; font-weight: bold; display: inline-block'>R: ";
		s += addCommas(Math.floor(this.getResourcesPoints()));
		s += "</span>";	
		return s;
	}

	this.getPlusSender = function() {
		var s = "";
		if(this.fleetsCount > 1) {
			var siteAddr = getSiteAddr();
			s += "<img src='" + siteAddr + "/images/starfleet/layout/attention.png' style='height: 18px; width: 18px' alt='GD!'>&nbsp;";
		}
		s+= this.planetName + " [" + this.coords.galaxy + ":" + this.coords.system + ":" + this.coords.slot + (this.type == "Moon" ? "m" : "" ) + "]";
		return s;
	}
};

function getSiteAddr() {
	var siteAddr = "http://";
	if(document.title.match(/Uni 2/gi))
		siteAddr += "uni2.";
	siteAddr += "playstarfleet";
	if(document.title.match(/Extreme/gi))
		siteAddr += "extreme";
	siteAddr += ".com";
	return siteAddr;
}

// http://www.mredkj.com/javascript/numberFormat.html
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function fixedEncodeURIComponent (str) {  
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');  
} 

// http://www.electrictoolbox.com/pad-number-zeroes-javascript/
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getMessagesIds() {
	var matchArr = document.getElementById("messages").innerHTML.match(/id="message_(\d*)_content"/g);
	for(var x in matchArr)
		matchArr[x] = matchArr[x].replace(/[^0-9]/g, "");
	return matchArr;
}

function run() {
	// If it's already parsed, die
	if(document.getElementById("spyplus_signature") != null) {
		return;
	}

	var msgIds = getMessagesIds();	
	
	var i;
	for(i = 0; i < msgIds.length; i++) {
		var msg = new Message(msgIds[i]);
		if(msg.isEspionage()) {
			var espReport = new EspionageReport(msg);
			espReport.parse();
			msg.setContent(espReport.getPlusReport());
			msg.setSender(espReport.getPlusSender());
			msg.setSubject(espReport.getPlusSubject());
		}
	}

	// Write signature
	var sign = document.createElement("div");
	sign.setAttribute("id", "spyplus_signature");
	sign.setAttribute("style", "display: none");
	document.getElementById("message_table").appendChild(sign);
}

run();
setInterval(run, 1000);
