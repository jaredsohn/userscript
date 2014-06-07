// ==UserScript==
// @name           Spy++
// @description    by Captain Ron
// @version        2.00
// @namespace http://mentatarchive.appspot.com
// @include http://playstarfleet.com/*
// @include http://starfleet-fb-vip1.bluefrogsrv.com/*
// @include http://playstarfleetextreme.com/*
// @include http://starfleet-fb-e-vip2.bluefrogsrv.com/*
// @include http://uni2.playstarfleet.com/*
// @include http://starfleet-fb-uni2-vip1.bluefrogsrv.com/*
// @include http://uni2.playstarfleetextreme.com/*
// @include http://starfleet-fb-e-vip2.bluefrogsrv.com/*
// @include http://fb.stardriftempires.com/*
// @include http://stardriftempires.com/*
// @include http://nova.playstarfleet.com/*
// @include http://fb.nova.playstarfleet.com/*
// @include http://tournament.playstarfleet.com/*
// @include http://nova.stardriftempires.com/*
// @include http://conquest.playstarfleet.com/*
// @run-at document-end
// ==/UserScript==

function spy(){

	// techs and constants
	var TECHS 			= ["Armor","Weapons","Shield","Jet","Pulse","Warp"];
//	var TECHS 			= ["Weapons","Shield","Armor","Jet","Pulse","Warp"];		
	var RESOURCES 		= ["ore", "crystal", "hydrogen"];
	var MINES			= ["Ore Mine", "Crystal Mine", "Hydrogen Synthesizer" ];

	var SHIPS			= [ [ 0			, 0			, 0			, 100		, "Shadow Probe"],
							[ 0			, 0			, 0			, 200		, "Genesis Solar Satellite"],
							[ 0			, 1000		, 0			, 100		, "Hermes Class Probe"],
							[ 0			, 2000		, 500		, 200		, "Helios Class Solar Satellite"],
							[ 3000		, 1000		, 0			, 400		, "Artemis Class Fighter"],
							[ 2000		, 2000		, 0			, 400		, "Atlas Class Cargo"],
							[ 6000		, 2500		, 0			, 850		, "Apollo Class Fighter"],
							[ 5000		, 3000		, 1000		, 800		, "Zagreus Class Recycler"],
							[ 4000		, 4000		, 1000		, 800		, "Charon Class Transport"],
							[ 6000		, 6000		, 0			, 1200		, "Hercules Class Cargo"],
							[ 10000		, 6000		, 2000		, 1600		, "Dionysus Class Recycler"],
							[ 20000		, 7000		, 2000		, 2700		, "Poseidon Class Cruiser"],
							[ 18000		, 18000		, 0			, 3600		, "Carmanor Class Cargo"],
							[ 10000		, 20000		, 10000		, 3000		, "Gaia Class Colony Ship"],
							[ 45000		, 15000		, 0			, 6000		, "Athena Class Battleship"],
							[ 50000		, 25000		, 15000		, 7500		, "Ares Class Bomber"],
							[ 30000		, 40000		, 15000		, 7000		, "Hades Class Battleship"],
							[ 60000		, 50000		, 15000		, 11000		, "Prometheus Class Destroyer"],
							[ 5000000	, 4000000	, 1000000	, 900000	, "Zeus Class"],
							[ 20000000	, 20000000	, 10000000	, 4000000	, "Hephaestus Class Attack Platform"],
							[ 500		, 0			, 7500		, 50		, "Empusa Class Fighter"],
							[ 2000		, 2000		, 10000		, 400		, "Curetes Class Cruiser"],
							[ 1750000	, 800000	, 100000	, 255000	, "Thanatos Class Destroyer"],
							[ 25000		, 12500		, 7500		, 3750		, "Pallas Class Bomber"],
							[ 28000		, 17000		, 3500		, 4500		, "Moros Class Battleship"],
							[ 4000		, 2250		, 500		, 625		, "Erebus Class Fighter"]];
	
	var DEFENSE			= [ [ 2000		, 0			, 0			, 200		, "Missile Battery"],
							[ 1500		, 500		, 0			, 200 		, "Laser Cannon"],
							[ 6000		, 2000		, 0			, 800  		, "Pulse Cannon"],
							[ 2000		, 6000		, 0			, 800		, "Particle Cannon"],
							[ 8000		, 0			, 2000		, 800 		, "Anti-Ballistic Missile"],
							[ 10000		, 10000		, 0			, 2000		, "Decoy"],
							[ 12500		, 2500		, 10000		, 1500		, "Interplanetary Ballistic Missile"],
							[ 20000		, 15000		, 2000		, 3500		, "Gauss Cannon"],
							[ 50000		, 50000		, 0			, 10000		, "Large Decoy"],
							[ 50000		, 50000		, 30000		, 10000		, "Plasma Cannon"],
							[ 500		, 0			, 300		, 50		, "Space Mine"] ];
						
	var BUILDINGS		= [ "Shipyard", "Capitol", "Research Lab", "Missile Silo", "Factory", "Ore Warehouse",
							"Crystal Warehouse", "Hydrogen Storage", "Foundry", "Resource Den", 
							"Lunar Base", "Oracle", "Warp Gate", "Lunar Dock"];

	var ALL_TECHS			= [ "Laser Tech", "Armor Tech", "Weapons Tech", "Shield Tech", "Particle Tech", "Jet Drive",
							"A.I. Tech", "Energy Tech", "Espionage Tech", "Pulse Drive", "Plasma Tech", "FTL Tech", 
							"Expedition Tech", "Warp Drive", "Advanced Research Communication Network"];
	
	var NUM_RESOURCES 	= 3;	
	var NUM_SHIPS 		= 25;
	var NUM_DEFENSE		= 11;
	var NUM_BUILDINGS	= 14;
	var NUM_TECHS		= 15;
	var NUM_MINES		= 3;
	
	var SHIP_HEPH		= 19;
	var DEF_ABM			= 4;
	var DEF_IPBM		= 6;
	var DEF_PLASMA		= 9;
	
	var UNIT_ORE		= 0;
	var UNIT_CRYSTAL	= 1;
	var UNIT_HYDROGEN	= 2;
	var UNIT_HULL		= 3;
	var UNIT_NAME		= 4;
		
	var WAREHOUSE_ORE	= 5;
	
	var FLEET_NAME		= NUM_SHIPS;
	var FLEET_DSP		= NUM_SHIPS + 1;
	var FLEET_RSP		= NUM_SHIPS + 2;
	var FLEET_SIZE		= NUM_SHIPS + 3;
	var FLEET_DEBRIS	= NUM_SHIPS + 4;
	var FLEET_DIONS		= NUM_SHIPS + 5;
	var FLEET_ZAGS		= NUM_SHIPS + 6;
	
	var BLDG_FOUNDRY	= 8;
	var BLDG_ORACLE		= 11;
	var BLDG_GATE		= 12;
	
	var TECH_ARMOR		= 1;
	var TECH_JET		= 5;
	var TECH_SPY		= 8;
	var TECH_PULSE		= 9;
	var TECH_WARP		= 13;
	
	var PLUNDER_WAVES	= 6;
	var ATLAS_CARGO		= 5000;
	var HERC_CARGO		= 25000;	
	var CARM_CARGO		= 125000;
	var PROM_CARGO		= 2000;
	var ATHHAD_CARGO	= 2250;
	
	var DION_SIZE		= 20000;
	var ZAG_SIZE		= 5000;
	
	var TECH_WEAPON		= 0;
	var BASE_NUKE		= 12000;
	
	// formatting
	var TITLE_SPAN 	= "<span style='width: 33%; font-weight: bold; display: inline-block'>";
	var STRIKE_SPAN	= "<span style='width: 33%; font-weight: bold; display: inline-block; text-decoration: line-through'>";
	var BOLD_SPAN	= "<span style='font-weight: bold'>"
	var RED_SPAN	= "<span style='color: #FF4040'>"
	var PINK_SPAN	= "<span style='color: #FFA0A0'>"
	var GREEN_SPAN	= "<span style='color: #00FF00'>"
	var MINT_SPAN	= "<span style='color: #A0FFA0'>"
	var WHITE_SPAN	= "<span style='color: #FFFFFF'>"
	var END_SPAN 	= "</span>";
	var BR 			= "<br>";
	

	if(window.location.pathname == '/buildings/research_lab'){
		labTechs();
	}
	
	if(window.location.pathname == '/messages'){
		hook("enable_ajax_links", function(){
			var msgIDs = getMessagesIds();
			for(var i=0; i<msgIDs.length; ++i) {
				var msg = new Message(msgIDs[i]);
				if(msg.isEspionage()){
					msg.parse();
					msg.setSender(msg.getSender());
					msg.setSubject(msg.getSubject());
					msg.setContent(msg.getBody()); 
				}
			}
		})();
	}
	
	// if(window.location.pathname == '/technology'){
		// localStorage.clear();
	// }
	
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
	
	// http://www.electrictoolbox.com/pad-number-zeroes-javascript/
	function pad(number, length) {
		var str = '' + number;
		while (str.length < length) {
			str = '0' + str;
		}
		return str;
	}
	
	function trim(str) {
		return str.replace(/^\s+|\s+$/g,"");
	}

	function labTechs(){
		//For each research item
		var items = document.querySelectorAll("#locations_table .details");
		for(var i=0; i<items.length; ++i){
			var item = items[i];
			var name = trim(item.querySelector(".name").innerHTML);
			var level = trim(item.querySelector(".level .amount").innerHTML);
			
			//Store research level if in list
			for(var j=0; j<TECHS.length; ++j)
				if(name.indexOf(TECHS[j])==0)
					localStorage["tech_"+TECHS[j]] = level;
		};
	}
	
	function getTechs(){
		var url = [];
		var title = "";
		
		//For each attacker tech
		for(var i=0; i<TECHS.length; ++i){
			
			//Get stored research level
			var level = localStorage["tech_"+TECHS[i]];
			title += TECHS[i]+": ";
			if(level==undefined){
				title = '';
				break;
			}
			title += level;
	/*		
			//If corresponding amp is active, increase by 1
			var amp_end = localStorage["amp_"+TECHS[i]];
			if(amp_end && parseInt(amp_end)>(new Date().getTime())){
				title += ' + amp';
				level++;
			}
			
			//If corresponding commander is active, increase by 1
			var comm_end = localStorage[i<3?'commander_Battle Commander':'commander_Drive Engineer'];
			if(comm_end && parseInt(comm_end)>(new Date().getTime())){
				title += ' + commander';
				level++;
			}
	*/
			title += '\n';
			url.push("a"+TECHS[i]+"="+encodeURIComponent(level));
		}
		return url.join("&");
	}
		
	function getMessagesIds(){
		var matchArr = document.getElementById("messages").innerHTML.match(/id="message_(\d*)_content"/g);
		for(var x=0; x<matchArr.length; ++x){
			matchArr[x] = matchArr[x].replace(/[^0-9]/g, ""); }
		return matchArr;
	}
	
	function hook(target, add){
		var backup = window[target];
		window[target] = function(){
			backup();
			add();
		}
		return add;
	};
	
	//Add an event	
	function add_event(element,name,callback)
	{
		if(element.addEventListener){
			element.addEventListener(name,callback,false);
			return {remove:function(){
				element.removeEventListener(name,callback,false);
			}}
		}
		else if(element.attachEvent){
			function innerfunc(){
				return callback(window.event);
			}
			element.attachEvent("on"+name,innerfunc);		
			return {remove:function(){
				element.detachEvent("on"+name,innerfunc);
			}}
		}
		return 0;
	};
	
	// Message class
	function Message(msgid) {
		// *** Constructor
		// Load Id
		this.id = msgid;
		// Load Subject
		var msgHeader = document.getElementById("message_" + this.id, "");
		var msgSubject = msgHeader.getElementsByClassName("subject")[0];
		this.subject = msgSubject.innerHTML.trim();
		// Load Content 
		var msgBody = document.getElementById("message_" + this.id + "_body");
		this.data = msgBody.getElementsByClassName("text")[0].innerHTML.trim();
		this.content = this.data.replace(/<br[^>]*>/g, "\n").replace(/<(.|\n)*?>/g,"");
		// Load Links
		var msgLinks= msgBody.getElementsByTagName('a');
		this.coordsLink = msgLinks[0];
		this.msgLinksHTML = " ";
		for (var i=1; i<(msgLinks.length-1); i++) { 
			if(i != 1){
				this.msgLinksHTML += " | "; 
			}
			this.msgLinksHTML += msgLinks[i].parentNode.innerHTML;
		}
		this.msgIntercept = " ";
		this.msgLeaving = " ";
		
		
		// my variables - version 2.0
		this.planetType = "";
		this.planetName = "";
		this.planetTypeComp = "";
		this.coordinates = [0,0,0,""];
		
			// O, C, H
		this.resources = [];
		this.warehouse = [];
		this.resRate = [];
		this.resTime = [];
		for(var i = (-1); i < NUM_RESOURCES; ++i){
			this.resources.push(0);
			this.warehouse.push(0);
			this.resRate.push(0);
			this.resTime.push(25);
		}
			// Ships
		this.espFleets = [ [] ];
		
			// Defense
		this.espDefense = [ ];
		this.espNukes = [ ];
		for(var i = 0; i < NUM_DEFENSE; ++i){
			this.espDefense.push(0);
			this.espNukes.push(0);
		}
		
		this.espBuildings = [ ];
		for(var i = 0; i < NUM_BUILDINGS; ++i){
			this.espBuildings.push(0);
		}
		
		this.espTechs = [ ];
		for(var i = 0; i < NUM_TECHS; ++i){
			this.espTechs.push(0);
		}
		
		this.espMines = [ ];
		for(var i = 0; i < NUM_MINES; ++i){
			this.espMines.push(0);
		}

		this.shipRes = 0;
		this.shipDSP = 0;
		this.defenseRes = 0;
		this.defenseHull = 0;
		this.shipDebris = 0;
		this.shipDions = 0;
		this.shipZags = 0;
		this.totalNukes = 0;
		this.multiShips = 0;
				
		this.fleets = 0;
		this.defenseFound = 0;
		this.buildingsFound = 0;
		this.techsFound = 0;
		this.minesFound = 0;
		
		this.oracleBottom = 0;
		this.oracleTop = 0;
		
		this.plunder = [ [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0] ];
		
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
			
			var linkAnchor = document.getElementById("links_"+this.id);
			
			var mentantURL = "http://battlementat.com/#";
			var calcURL = "http://nova.battlecalc.com/log_parse?parse_to=/&parseLog=1&log_input=";
			var location = document.querySelector("#user_planets .selected .planet_coordinates");
			if(location){
				location = trim(location.innerHTML.match(/(\d+:\d+:\d+)/)[1]);
				mentantURL += "aLocation="+encodeURIComponent(location) + "&";
			}
			
			if(this.content){
				mentantURL += "espionage=" + encodeURIComponent(this.content) + "&";
			}
			
			var techs = "";
			techs += getTechs();
			
			var mentantLink = document.createElement("a");
			mentantLink.href = mentantURL + techs;
			mentantLink.innerHTML = "BattleMentat";
			mentantLink.target = "_blank";
			
			var calcLink = document.createElement("a");
			calcLink.href = calcURL + encodeURIComponent(this.content);
			calcLink.innerHTML = "BattleCalc";
			calcLink.target = "_blank";
			
			linkAnchor.appendChild(mentantLink);
			linkAnchor.innerHTML += " | ";
			linkAnchor.appendChild(calcLink);

			
		};
	
		this.setSender = function(s) {
			var msgSender = document.getElementById("message_" + this.id).getElementsByClassName("sender")[0];
			msgSender.innerHTML = s;
		};
		
		this.getSender = function() {
			var s = "";
			if(this.fleets > 1) {
				s += "<img src='/images/starfleet/layout/attention.png' style='height: 18px; width: 18px' alt='GD!'> ";
			}
			if(this.espFleets[0][SHIP_HEPH]){
				s += "<img src='/images/starfleet/ship_templates/icon_roaming_planet.png' style='height: 15px; width: 15px' alt=''> ";
			}
			if(this.msgLinksHTML == " "){
				s += "<strike>";
			}
			s += this.planetName + " [" + this.coordinates[0] + ":" + this.coordinates[1] + ":" + this.coordinates[2] + this.coordinates[3] + "]";
//			if(this.msgLeaving == "leaving soon"){
			if(this.data.match(/(leaving soon)/)){
				s += " *";
			}
			if(this.msgLinksHTML == " "){
				s += "</strike>";
			}
			return s;
		}
	
		this.setSubject = function(s) {
			var msgSender = document.getElementById("message_" + this.id).getElementsByClassName("subject")[0];
			msgSender.innerHTML = s;
		};
		
		this.getSubject = function() {
			var s = "";
			var THIS_SPAN = TITLE_SPAN;
			if(this.msgLinksHTML == " "){
				THIS_SPAN = STRIKE_SPAN;
			}
			if(this.fleets){
				s += THIS_SPAN + "S: " + addCommas(Math.floor(this.shipRes/1000)) + END_SPAN;
			} else {
				s += THIS_SPAN + "S: ???" + END_SPAN;
			}
			
			if(this.defenseFound){
				s += THIS_SPAN + "D: " + addCommas(Math.floor(this.defenseRes/1000));
				if(this.espDefense[DEF_PLASMA]){
					s += " (" + this.espDefense[DEF_PLASMA] + ")";
				}
				s += END_SPAN;	
			} else {
				s += THIS_SPAN + "D: ???" + END_SPAN;
			}
			
			s += THIS_SPAN + "R: " + addCommas(Math.floor((this.resources[NUM_RESOURCES])/1000)) + END_SPAN;	

			return s;
		};
		
		function displayTime(time){
			s = "";
			s += Math.floor(time) + ":" + pad(Math.floor((time - Math.floor(time))*60), 2);
			return s;
		}
		
		this.getBody = function() {
			var s = "";
			if(this.fleets){
				s += BOLD_SPAN + this.espFleets[0][FLEET_NAME] + END_SPAN + " - ";
			}
			s += this.planetType + " " + this.planetName + " ";
			s += "<a href='" + this.coordsLink + "'>[" + this.coordinates[0] + ":" + this.coordinates[1] + ":" + this.coordinates[2] + this.coordinates[3] + "]</a>" + BR;
			if(this.buildingsFound) {
				if(this.planetTypeComp == "PLANET") {
					s += "(Mines " + this.espMines[0] + "-" + this.espMines[1] + "-" + this.espMines[2] + " F" + this.espBuildings[BLDG_FOUNDRY] + ")" + BR;
				} else if(this.planetTypeComp == "MOON") {
					if(this.espBuildings[BLDG_ORACLE]) {
						s += "Oracle " + this.espBuildings[BLDG_ORACLE] + " (system " + this.oracleBottom + " to " + this.oracleTop + ")";
					} else {
						s += "No Oracle";
					} 
					if(this.espBuildings[BLDG_GATE]){
						s += " with Warp Gate";
					}
					s += BR;
				}
			}
			s += BR + "RESOURCES:" + BR;
			for(var i = 0; i < NUM_RESOURCES; ++i){
				if((this.planetTypeComp == "PLANET") && this.minesFound){
					s += "* " + RESOURCES[i] + ": " + addCommas(this.resources[i]) + " (" + addCommas(this.warehouse[i]);
					if(i < 2){
						s += "(~" + addCommas(this.resRate[i]) + "/h";
					}
					if(this.resTime[i] < 24){
						s += " ~" + displayTime(this.resTime[i]);
					}
					s += ")"+ BR;
				} else {
					s += "* " + RESOURCES[i] + ": " + addCommas(this.resources[i]) + BR;
				}
			}
			s += BR;
			
			
			s += "<a href='javascript:;' onclick=\"if(document.getElementById(&quot;spypp_plunder_" + this.id + "&quot;).style.display == &quot;&quot;){ document.getElementById(&quot;spypp_plunder_" + this.id + "&quot;).style.display = &quot;none&quot; } else { document.getElementById(&quot;spypp_plunder_" + this.id + "&quot;).style.display = &quot;&quot;; };\">Toggle plunder data</a>";
			s += "<div id='spypp_plunder_" + this.id + "' style='display: none'>";
			var waves = PLUNDER_WAVES+1;
			if(this.coordinates[3] == "e"){
				waves = 4;
			}
			if(this.planetTypeComp == "HEPHAESTUS CLASS ATTACK PLATFORM"){
				waves = 1;
			}
			for(var i = 0; i < waves; ++i){
				if(i < (waves-1)){
					s += "Wave " + (i+1) + " plunder: ";
				} else {
					if(i == 0){
						s += "Total plunder in 1 wave: ";
					} else {
						s += "Total plunder in " + i + " waves: ";
					}
				}
				s += addCommas(this.plunder[i][0]) + " (";
				// s += addCommas(this.plunder[i][3]) + " Carms | ";
				s += addCommas(this.plunder[i][2]) + " Hercs | ";
				s += addCommas(this.plunder[i][1]) + " Atlas"
				if(i == 0 && this.planetTypeComp == "ENCOUNTER"){
					s += " | " + addCommas(this.plunder[i][4]) + " Hades/Athena | ";
					s += addCommas(this.plunder[i][5]) + " Prometheus";
				}
				s += ")" + BR;
			}
			s += "</div>" + BR;
			
			s += BR
			for (var j = 0; j < this.fleets; ++j){
				s += this.espFleets[j][FLEET_NAME] + "'S SHIPS:";
				// (DSP: 21,091 - Ships: 5,637 - Recyclers: 596/2,382)
				if(this.espFleets[j][FLEET_SIZE]){
					s += " ( " + BOLD_SPAN;
					if(this.coordinates[3] == "e"){
						s += PINK_SPAN + "DSP: " + addCommas(Math.floor(this.espFleets[j][FLEET_DSP]/2)) + END_SPAN;
					} else {
						s += RED_SPAN + "DSP: " + addCommas(this.espFleets[j][FLEET_DSP]) + END_SPAN;
					}
					s += " - " + RED_SPAN + "Ships: " + addCommas(this.espFleets[j][FLEET_SIZE]) + END_SPAN;
					if(this.fleets == 1){
						s += " - " + RED_SPAN + "Recyclers: " + addCommas(this.espFleets[j][FLEET_DIONS]) + END_SPAN;
						s +=  "/"  + RED_SPAN + addCommas(this.espFleets[j][FLEET_ZAGS]) + END_SPAN;
					}
					s += END_SPAN + " )" + BR;
					for(var i = 0; i < NUM_SHIPS; ++i){
						if(this.espFleets[j][i]){
							s += "* " + SHIPS[i][UNIT_NAME] + ": " + addCommas(this.espFleets[j][i]) + BR;
						}
					}
				}
				s+= BR;
			}
			if(this.fleets > 1){
				s += " ( " + BOLD_SPAN;
				s += RED_SPAN + "Total DSP: " + addCommas(this.shipDSP) + END_SPAN;
				s += " - " + RED_SPAN + "Total Ships: " + addCommas(this.multiShips) + END_SPAN;
				s += " - " + RED_SPAN + "Total Recyclers: " + addCommas(this.shipDions) + END_SPAN;
				s +=  "/"  + RED_SPAN + addCommas(this.shipZags) + END_SPAN;
				s += END_SPAN + " )" + BR;
			}
			s+= BR;
			
			if(this.defenseFound){
				if(this.planetTypeComp == "PLANET" || this.planetTypeComp == "MOON"){
					s += "DEFENSE: ( " + BOLD_SPAN + RED_SPAN + "Total Nukes: " + addCommas(this.totalNukes) + END_SPAN + END_SPAN + " )" + BR;
					for(var i = 0; i < NUM_DEFENSE; ++i){
						if(this.espDefense[i] && i != DEF_ABM && i != DEF_IPBM ){
							s += "* " + DEFENSE[i][UNIT_NAME] + ": " + addCommas(this.espDefense[i]);
							s += " (" + BOLD_SPAN + RED_SPAN + addCommas(this.espNukes[i]) + END_SPAN + END_SPAN + ") ";
							s += BR;
						}
					}
				} else {
					s += "DEFENSE:" + BR;
					for(var i = 0; i < NUM_DEFENSE; ++i){
						if(this.espDefense[i] && i != DEF_ABM && i != DEF_IPBM ){
							s += "* " + DEFENSE[i][UNIT_NAME] + ": " + addCommas(this.espDefense[i]);
							s += BR;
						}
					}
				}
				s += BR;
				if(this.espDefense[DEF_IPBM]){
					s += "* " + DEFENSE[DEF_IPBM][UNIT_NAME] + ": " + addCommas(this.espDefense[DEF_IPBM]) + BR;
				}
				if(this.espDefense[DEF_ABM]){
					s += "* " + DEFENSE[DEF_ABM][UNIT_NAME] + ": " + BOLD_SPAN + RED_SPAN + addCommas(this.espDefense[DEF_ABM]) + END_SPAN + END_SPAN + BR;
				}
				if(this.espDefense[DEF_ABM] || this.espDefense[DEF_IPBM]){
					s += BR;
				}
			}
			
			if(this.techsFound){
				s += "TECHS:" + BR;
				for(var i = 0; i < 3; ++i){
					var tech = TECH_ARMOR + i;
					var myTech = parseInt(localStorage["tech_"+TECHS[i]]);
					var theirTech = this.espTechs[tech];
					var boldSpan = 0;
					s += "* " + ALL_TECHS[TECH_ARMOR + i] + ": ";
					if((myTech - 1) > theirTech){
						s += GREEN_SPAN + BOLD_SPAN;
						boldSpan = 1;
					} else if(myTech > theirTech){
						s += MINT_SPAN;
					} else if((myTech + 1) < theirTech){
						s += RED_SPAN + BOLD_SPAN;
						boldSpan = 1;
					} else if(myTech < theirTech){
						s += PINK_SPAN;
					} else {
						s += WHITE_SPAN;
					}
					s += addCommas(this.espTechs[tech]) + END_SPAN;
					if(boldSpan > 0){
						s += END_SPAN;
					}
					s += BR;
				}
				if(this.planetTypeComp != "ENCOUNTER"){
					for(var i = 0; i < 3; ++i){
						var Flight = i * 4;
						var tech = TECH_JET + Flight;
						var myTech = parseInt(localStorage["tech_"+TECHS[3+i]]);
						var theirTech = this.espTechs[tech];
						var boldSpan = 0;
						s += "* " + ALL_TECHS[tech] + ": ";
						
						if((myTech - 1) > theirTech){
							s += GREEN_SPAN + BOLD_SPAN;
							boldSpan = 1;
						} else if(myTech > theirTech){
							s += MINT_SPAN;
						} else if((myTech + 1) < theirTech){
							s += RED_SPAN + BOLD_SPAN;
							boldSpan = 1;
						} else if(myTech < theirTech){
							s += PINK_SPAN;
						} else {
							s += WHITE_SPAN;
						}
						s += addCommas(this.espTechs[tech]) + END_SPAN;
						if(boldSpan > 0){
							s += END_SPAN;
						}
						s += BR;
					}
					s += "* " + ALL_TECHS[TECH_SPY] + ": " + addCommas(this.espTechs[TECH_SPY]) + BR;
				}
				s += BR;
			}
			
			s += "<div id='links_"+this.id+"'></div>";
			s += BR;
			if(this.msgLinksHTML != " "){
				s += this.msgLinksHTML + BR + BR;
			} 
			
			// Probe and Leaving messages go here
			s += this.msgIntercept + BR + BR;
			
			s += "<a href='javascript:;' onclick=\"if(document.getElementById(&quot;msg_" + this.id + "_data&quot;).style.display == &quot;&quot;){ document.getElementById(&quot;msg_" + this.id + "_data&quot;).style.display = &quot;none&quot; } else { document.getElementById(&quot;msg_" + this.id + "_data&quot;).style.display = &quot;&quot;; };\">Toggle original</a> " + BR + BR;			
			s += "<div id='msg_" + this.id + "_data' style='display: none'><br><br>" + this.data + "</div>";
			return s;
		}
		
		this.parseResources = function() {
			for(var i=0; i < NUM_RESOURCES; ++i){
				var resSearch = RESOURCES[i] + ": ((\\d|,)*)";
				var regExp = RegExp(resSearch, "");
				this.resources[i] = parseInt(this.content.match(regExp)[1].replace(/,/g, ""));
				this.resources[NUM_RESOURCES] += this.resources[i];
			}
		};
		
		this.insertFleet = function(s) {
			this.espFleets.push( [ ] );
			for(var i=0; i < NUM_SHIPS; ++i){
				this.espFleets[this.fleets].push(0);
			}
			this.espFleets[this.fleets].push(s);
			for(var i=0; i < 6; ++i){
				this.espFleets[this.fleets].push(0);	// slots for DSP, RSP, Size, Debris, Dions & Zags
			}
			this.fleets++;
		}
		
		this.parseFleets = function() {
			var reportLines = this.content.split("\n");
			for(var i=0; i<reportLines.length; ++i){
				var m = reportLines[i].match(/(.+)'S SHIPS/);
				if(m != null){
					this.insertFleet(m[1]);
				}

				for(var j=0; j<NUM_SHIPS; ++j){
					var shipSearch = SHIPS[j][UNIT_NAME] + ": ([\\d,]+)";
					var shipExp = RegExp(shipSearch, "");
					m = reportLines[i].match(shipExp);
					if (m != null) {
						this.espFleets[(this.fleets-1)][j] = parseInt(m[1].replace(",",""));
						this.espFleets[(this.fleets-1)][FLEET_RSP] += this.espFleets[(this.fleets-1)][j] * (SHIPS[j][UNIT_ORE] + SHIPS[j][UNIT_CRYSTAL] + SHIPS[j][UNIT_HYDROGEN]);
						this.espFleets[(this.fleets-1)][FLEET_SIZE] += this.espFleets[(this.fleets-1)][j];
						this.espFleets[(this.fleets-1)][FLEET_DSP] +=  this.espFleets[(this.fleets-1)][j] * (Math.floor(SHIPS[j][UNIT_ORE]/1000) + Math.floor(SHIPS[j][UNIT_CRYSTAL]/1000) + Math.floor(SHIPS[j][UNIT_HYDROGEN]/1000));
						this.espFleets[(this.fleets-1)][FLEET_DEBRIS] += Math.floor(this.espFleets[(this.fleets-1)][j] * (SHIPS[j][UNIT_ORE] + SHIPS[j][UNIT_CRYSTAL]) * .3);
					}
				}
			}
			for(var i = 0; i < this.fleets; ++i){
				this.espFleets[i][FLEET_DIONS] = Math.ceil(this.espFleets[i][FLEET_DEBRIS]/DION_SIZE);
				this.espFleets[i][FLEET_ZAGS] = Math.ceil(this.espFleets[i][FLEET_DEBRIS]/ZAG_SIZE);
				this.shipDebris += this.espFleets[i][FLEET_DEBRIS];
			}
			this.shipDions = Math.ceil(this.shipDebris/DION_SIZE);
			this.shipZags = Math.ceil(this.shipDebris/ZAG_SIZE);
		};
		
		this.parseDefense = function() {
			var reportLines = this.content.split("\n");
			for(var i=0; i<reportLines.length; ++i){
				var m = reportLines[i].match(/DEFENSES/);
				if(m != null){
					this.defenseFound = 1;
				}

				for(var j=0; j<NUM_DEFENSE; ++j){
					var shipSearch = DEFENSE[j][UNIT_NAME] + ": ([\\d,]+)";
					var shipExp = RegExp(shipSearch, "");
					m = reportLines[i].match(shipExp);
					if (m != null) {
						this.espDefense[j] = parseInt(m[1].replace(",",""));
						this.defenseRes += this.espDefense[j] * (DEFENSE[j][UNIT_ORE] + DEFENSE[j][UNIT_CRYSTAL] + DEFENSE[j][UNIT_HYDROGEN]);
					}					
				}
			}
		};
		
		this.parseBuildings = function() {
			var reportLines = this.content.split("\n");
			for(var i=0; i<reportLines.length; ++i){
				var m = reportLines[i].match(/BUILDINGS/);
				if(m != null){
					this.buildingsFound = 1;
				}
				
				for(var j=0; j<NUM_BUILDINGS; ++j){
					var bldgSearch = BUILDINGS[j] + ": ([\\d,]+)";
					var bldgExpress = RegExp(bldgSearch, "");
					m = reportLines[i].match(bldgExpress);
					if (m != null) {
						this.espBuildings[j] = parseInt(m[1].replace(",",""));
					}					
				}
			}
		}
		
		this.parseTechs = function() {
			var reportLines = this.content.split("\n");
			for(var i=0; i<reportLines.length; ++i){
				var m = reportLines[i].match(/TECHS/);
				if(m != null){
					this.techsFound = 1;
				}
				
				for(var j=0; j<NUM_TECHS; ++j){
					var techSearch = ALL_TECHS[j] + ": ([\\d,]+)";
					var techExpress = RegExp(techSearch, "");
					m = reportLines[i].match(techExpress);
					if (m != null) {
						this.espTechs[j] = parseInt(m[1].replace(",",""));
					}					
				}
			}
		}
		
		this.parseMines = function() {
			var reportLines = this.content.split("\n");
			for(var i=0; i<reportLines.length; ++i){
				var m = reportLines[i].match(/MINES/);
				if(m != null){
					this.minesFound = 1;
				}
				
				for(var j=0; j<NUM_MINES; ++j){
					var bldgSearch = MINES[j] + ": ([\\d,]+)";
					var bldgExpress = RegExp(bldgSearch, "");
					m = reportLines[i].match(bldgExpress);
					if (m != null) {
						this.espMines[j] = parseInt(m[1].replace(",",""));
					}					
				}
			}
		};
		
		this.calcAttack = function() {
			// calculate oracle range
			if(this.espBuildings[BLDG_ORACLE]){
				var oracle = this.espBuildings[BLDG_ORACLE];
				var system = this.coordinates[1];
				this.oracleBottom = system - (Math.pow(oracle, 2) - 1);
				if(this.oracleBottom < 1){ this.oracleBottom = 1; }
				this.oracleTop = system + (Math.pow(oracle, 2) - 1);
				if(this.oracleTop > 499){ this.oracleTop = 499; }
			}
			
			// // calculate mine rates
			if((this.planetTypeComp == "PLANET") && this.minesFound){

				var baseProd = 1.1;
				this.resRate[UNIT_ORE] = Math.floor(30*this.espMines[UNIT_ORE]*Math.pow(baseProd,this.espMines[UNIT_ORE]));
				this.resRate[UNIT_ORE] *= (1 + Math.floor(this.espMines[UNIT_ORE]/3 + 1)*0.02);
				this.resRate[UNIT_ORE] = Math.floor(this.resRate[UNIT_ORE]);
				this.resRate[UNIT_ORE] += 20;
				
				this.resRate[UNIT_CRYSTAL] = Math.floor(20*this.espMines[UNIT_CRYSTAL]*Math.pow(baseProd,this.espMines[UNIT_CRYSTAL]));
				this.resRate[UNIT_CRYSTAL] *= (1 + Math.floor(this.espMines[UNIT_CRYSTAL]/3 + 1)*0.02);
				this.resRate[UNIT_CRYSTAL] = Math.floor(this.resRate[UNIT_CRYSTAL]);
				this.resRate[UNIT_CRYSTAL] += 10;

				for(var i = 0; i < NUM_RESOURCES; ++i){
					this.warehouse[i] = 50000*(Math.ceil(Math.pow(1.6, this.espBuildings[WAREHOUSE_ORE+i])) + 1);
					this.resTime[i] = this.resources[i] / this.resRate[i];
				}
				this.resTime[2] = 25;
			}
			
			// calculate plunder data
			this.plunder[0][0] = Math.floor((this.resources[0] + this.resources[1] + this.resources[2])/2);
			var waves = PLUNDER_WAVES;
			if(this.coordinates[3] == "e"){
				waves = 3;
			}
			for (var i = 0; i < waves; ++i){
				if(i > 0){
					this.plunder[i][0] = Math.floor(this.plunder[i-1][0]/2);
				}
				this.plunder[i][1] = Math.ceil(this.plunder[i][0]/ATLAS_CARGO);
				this.plunder[i][2] = Math.ceil(this.plunder[i][0]/HERC_CARGO);
				this.plunder[i][3] = Math.ceil(this.plunder[i][0]/CARM_CARGO);
				this.plunder[i][4] = Math.ceil(this.plunder[i][0]/ATHHAD_CARGO);
				this.plunder[i][5] = Math.ceil(this.plunder[i][0]/PROM_CARGO);
				for(var j = 0; j < 4; ++j){
					this.plunder[waves][j] += this.plunder[i][j];
				}
			}
			
			// calculate nuke data
			var weaponTech = parseInt(localStorage["tech_"+TECHS[TECH_WEAPON]]);
			var nukeStrength = BASE_NUKE * (1 + (weaponTech * 0.1));
			for (var i = 0; i < NUM_DEFENSE; ++i){
				this.espNukes[i] = Math.ceil((this.espDefense[i] * (DEFENSE[i][UNIT_HULL]) * (1 + (this.espTechs[TECH_ARMOR] * 0.1)))/nukeStrength);
				if(i != DEF_ABM && i != DEF_IPBM){
					this.defenseHull += this.espDefense[i] * (DEFENSE[i][UNIT_HULL]) * (1 + (this.espTechs[TECH_ARMOR] * 0.1));
				}
			}
			this.totalNukes = Math.ceil(this.defenseHull / nukeStrength) + this.espDefense[DEF_ABM];
			
			// calculate extra fleet data
			if(this.fleets){
				for(var i=0; i < this.fleets; ++i){
					this.shipRes += this.espFleets[i][FLEET_RSP]; 
					this.shipDSP += this.espFleets[i][FLEET_DSP]; 
					this.multiShips += this.espFleets[i][FLEET_SIZE]; 
				}
			}

		};
		
		this.parse = function(){
			var m = this.content.match(/(Hephaestus Class Attack Platform|Planet|Moon|Encounter) ([^\[]+)\[(\d+):(\d+):(\d+)(\w?)\]/i);

			this.planetType = m[1];
			this.planetName = m[2];
			
			this.planetTypeComp = this.planetType.toUpperCase();
			
			this.coordinates[0] = parseInt(m[3]);
			this.coordinates[1] = parseInt(m[4]);
			this.coordinates[2] = parseInt(m[5]);
			this.coordinates[3] = m[6];

			var i = this.data.match(/(The chance) ([^\[]+)/);
			this.msgIntercept = i[0];
			var j = this.data.match(/(leaving soon)/);
			this.msgLeaving = j;
			
			//read in resources
			this.parseResources();
			this.parseFleets();
			this.parseDefense();
			this.parseBuildings();
			this.parseTechs();
			this.parseMines();
			// the rest goes here?
			this.calcAttack();
  		};
	};
};

//Inject function into page, so that the function hooking works in Chrome, where userscripts are sandboxed
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ spy +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
