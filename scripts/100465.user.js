// ==UserScript==
// @name          Base Uploader (MiT)
// @description   Saves base info to a database
// @include       *juno.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//===========================CONSTANTS============================
//================================================================

var SKIN = "Dark Astros";
var databaseText = 'MiT Database';
var database = 'mit';
var server = 'juno';
var scriptVer = 1;

//================================================================
//=========================END CONSTANTS==========================
//================================================================

//================================================================
//==========================SCAN BASES============================
//================================================================

// New Version Popup
if (GM_getValue("oldversion","0")==scriptVer){
		// its up to date
		//alert("It's up to date.");
	}else{
		// detected a new version
		GM_setValue("oldversion",scriptVer);
		var htm="";
		htm+="Version "+ scriptVer +"\n";
		htm+="\n";
		htm+="Updates\n";
		htm+="----------\n";
		htm+="1. Link to user's bases added to everyone's profile page. \n";
		htm+="2. Link to user's faboo page added to everyone's profile page. \n";
		htm+="\n";
		htm+="To Do\n";
		htm+="----------\n";
		htm+="1. Remove some obsolete features. \n";
		alert(htm);
}


url = window.location.href;

findBase = 0;


if(url.match(/base\.aspx\?base/)){
	if(url.match(/\&view\=/)){
		findBase = 0;
	} else {
		findBase = 1;
	}
} else {
	findBase = 0;
}


if(findBase){
          
    var alertBox = document.createElement('div');
    aPosition = document.body.childNodes[5];
		alertBox.innerHTML = "<b>Checking script version...</b>";
		alertBox.style.width = "100%";
		alertBox.style.color = "red";
		alertBox.style.border = "0px solid #6699cc";
		alertBox.style.marginLeft = "auto";
		alertBox.style.marginRight = "auto";
		alertBox.style.backgroundColor = "#0";
		alertBox.style.textAlign = "center";
		document.body.appendChild(alertBox);
		document.body.insertBefore(alertBox, aPosition);

	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://"+ server +".mckflux.co.cc/"+ database +"/scriptCheck.php",
	  data: "scriptVer=" + scriptVer + "&rand=" + parseInt(Math.random()*99999999),
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		rText = response.responseText;
		alertBox.innerHTML = rText;
		upToDate = rText.match(/Script is up to date./);
		if(upToDate){
			
			alertBox.innerHTML = "<b>Submitting Data...</b>";
			

			ihtmlz = document.body.innerHTML;


			// Owner information

				baseOwner = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a .+?title=".+?">.+?<\/a>/);
				baseOwner = baseOwner[0].replace(/Base Owner<\/td><td colspan="2"><a .+?title=".+?">/,"");
				baseOwner = baseOwner.replace(/<\/a>/,"");

				ownerID = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a(.+?)href="(.*?)profile.aspx\?player=(.+?)">(.+?)<\/a>/);
				ownerplayer = ownerID[0].match(/profile.aspx\?player=(.+?)"(.*?)>(.+?)</)[0];
				ownerID = ownerID[0].match(/profile.aspx\?player=(.+?)">/)[0];
				ownerplayer = ownerplayer.match(/>(.+?)</);
				ownerID = ownerID.match(/=[0-9]+/)[0];
				ownerID = ownerID.replace("=", "");
				
				if(baseOwner.match(/\[.+?\]/)){
					ownerGuild = baseOwner.match(/\[.+?\]/);
					ownerGuild = ownerGuild[0].replace(/\[/,"");
					ownerGuild = ownerGuild.replace(/\]/,"");
					baseOwner = baseOwner.replace(/\[.+?\]  /,"");
				} else {
					ownerGuild = "";
				}
				
				if(baseOwner.match(/United Colonies/)){
					ownerLevel = "";
				} else {
					ownerLevel = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a .+?" title="Player level .+?">/);
					ownerLevel = ownerLevel[0].replace(/Base Owner<\/td><td colspan="2"><a .+?" title="Player level /,"");
					ownerLevel = ownerLevel.replace(/ \(.+?\% of your level\)">/,"");
					ownerLevel = ownerLevel.replace(/">/,"");
				}

				if(ihtmlz.match(/Occupier<\/td><td colspan="2"><a/)){
					occupiedBy = ihtmlz.match(/<td>Occupier<\/td>.+?<\/a>/);
					occupiedBy = occupiedBy[0].replace(/<td>Occupier<\/td>.+?title="Player level .+?">/,"");
					occupiedBy = occupiedBy.replace(/<\/a>/,"");
				} else {
					occupiedBy="";
				}
				
			// Basic astro information

				astroLoc = ihtmlz.match(/<a href="map.aspx\?loc=.+?">/);
				astroLoc = astroLoc[0].replace(/<a href="map.aspx\?loc=/,"");
				astroLoc = astroLoc.replace(/">/,"");

			// Capacities

				construction = ihtmlz.match(/Construction<\/td><td align="right">.+?<\/td>/);
				construction = construction[0].replace(/Construction<\/td><td align="right">/,"");
				construction = construction.replace(/<\/td>/,"");

				production = ihtmlz.match(/Production<\/td><td align="right">.+?<\/td>/);
				production = production[0].replace(/Production<\/td><td align="right">/,"");
				production = production.replace(/<\/td>/,"");

				research = ihtmlz.match(/Research<\/td><td align="right">.+?<\/td>/);
				research = research[0].replace(/Research<\/td><td align="right">/,"");
				research = research.replace(/<\/td>/,"");
				
				economy = ihtmlz.match(/Economy<\/td><td align="right">.+?<\/td>/);
				economy = economy[0].replace(/Economy<\/td><td align="right">/,"");
				economy = economy.replace(/<\/td>/,"");
				
				ownerIncome = ihtmlz.match(/Owner Income<\/td><td align="right">.+?<\/td>/);
				ownerIncome = ownerIncome[0].replace(/Owner Income<\/td><td align="right">/,"");
				ownerIncome = ownerIncome.replace(/<\/td>/,"");
				
				baseCommander = ihtmlz.match(/<small>\(.+?\)<\/small>/);
				
				if(baseCommander){
					baseCommander = baseCommander[0].replace(/<small>\(/,"");
					baseCommander = baseCommander.replace(/\)<\/small>/,"");
				} else {
					baseCommander = "";
				}
				
			// Other stuff

			if(ihtmlz.match(/ credits in space debris.<\//)){
				debrisString = ihtmlz;
				debrisString = debrisString.replace(/\,/g,"");
				debrisString = debrisString.replace(/\./g,"");
				debris = debrisString.match(/\d+ credits in space debris<\//);
				debris = debris[0].match(/\d+/);
			} else {
				debris = 0;
			}
			
				
				topBarString=ihtmlz
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				area = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				area = area[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				
				energy = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				energy = energy[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");

				population = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				population = population[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");

				trades = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				trades = trades[0]

				
			// Base structures of interest

				structureString = ihtmlz.match(/Level<\/th><th>Defenses.+?<\/td><\/tr>/);
				
				var arrayStructures = [];
					arrayStructures['commandCenters'] = null;
					arrayStructures['jumpGate'] = null;
					arrayStructures['capital'] = null;
					
				if(structureString[0].match(/Command Centers/)){arrayStructures['commandCenters'] = true;}
				if(structureString[0].match(/Jump Gate/)){arrayStructures['jumpGate'] = true;}
				if(structureString[0].match(/Capital/)){arrayStructures['capital'] = true;}
				
				structureStringZ = structureString[0];
				structureStringZ = structureStringZ.replace(/.+?<\/td><td>.+?<br><\/td><td>/,"");

				for(structure in arrayStructures){
					if(arrayStructures[structure]){
						arrayStructures[structure] = structureStringZ.match(/\d\d?/);
						structureStringZ = structureStringZ.replace(/\d\d?/,"");
					} else {
						arrayStructures[structure] = "0";
					}
				}
				
				
				
			// Base defenses
				
				var arrayDefenses = [];
					arrayDefenses['barracks'] = null;
					arrayDefenses['laserTurrets'] = null;
					arrayDefenses['missileTurrets'] = null;
					arrayDefenses['plasmaTurrets'] = null;
					arrayDefenses['ionTurrets'] = null;
					arrayDefenses['photonTurrets'] = null;
					arrayDefenses['disruptorTurrets'] = null;
					arrayDefenses['deflectionShields'] = null;
					arrayDefenses['planetaryShield'] = null;
					arrayDefenses['planetaryRing'] = null;
					
				if(structureString[0].match(/Barracks/)){arrayDefenses['barracks'] = true;}
				if(structureString[0].match(/Laser Turrets/)){arrayDefenses['laserTurrets'] = true;}
				if(structureString[0].match(/Missile Turrets/)){arrayDefenses['missileTurrets'] = true;}
				if(structureString[0].match(/Plasma Turrets/)){arrayDefenses['plasmaTurrets'] = true;}
				if(structureString[0].match(/Ion Turrets/)){arrayDefenses['ionTurrets'] = true;}
				if(structureString[0].match(/Photon Turrets/)){arrayDefenses['photonTurrets'] = true;}
				if(structureString[0].match(/Disruptor Turrets/)){arrayDefenses['disruptorTurrets'] = true;}
				if(structureString[0].match(/Deflection Shields/)){arrayDefenses['deflectionShields'] = true;}
				if(structureString[0].match(/Planetary Shield/)){arrayDefenses['planetaryShield'] = true;}
				if(structureString[0].match(/Planetary Ring/)){arrayDefenses['planetaryRing'] = true;}
				
				defenseString = structureString[0];

				for(defense in arrayDefenses){
					if(arrayDefenses[defense]){
						arrayDefenses[defense] = defenseString.match(/\d.?\d* \/ \d*.?\d/);
						defenseString = defenseString.replace(/\d.?\d* \/ \d*.?\d/,"");
					} else {
						arrayDefenses[defense] = "0 / 0";
					}
				}
				
			

				fleetLanded = 0;
				fleetIncoming = 0;
				arrayFleetString = ihtmlz.match(/<tr align="center"><td sorttable_customkey=.+?<a href="fleet.+?<\/a><\/td><\/tr>/g);
				
				for(i in arrayFleetString){
					thisFleet = arrayFleetString[i].match(/<a href="fleet.+?>.+?<\/a><\/td><\/tr>/);
					thisFleet = thisFleet[0].replace(/<a href="fleet.+?>/,"");
					thisFleet = thisFleet.match(/<a href="fleet.+?>.+?<\/a><\/td><\/tr>/);
					thisFleet = thisFleet[0].replace(/<a href="fleet.+?>/,"");
					thisFleet = thisFleet.replace(/<\/a><\/td><\/tr>/,"");
					thisFleet = thisFleet.replace(/\,/g,"");
					thisFleet = thisFleet.replace(/\./g,"");
					if(arrayFleetString[i].match(/id="time/)){
						fleetIncoming = fleetIncoming + parseInt(thisFleet);
					}
					else{
						fleetLanded = fleetLanded + parseInt(thisFleet);
					}
				}

			//Submitter info

				submitterAccount = ihtmlz.match(/Account<\/a><\/th><th width="90"><a href="http:\/\/juno.astroempires.com\/profile.aspx\?player=.+?">.+?<\/a>/);
				submitterAccount = submitterAccount[0].replace(/Account<\/a><\/th><th width="90"><a href="http:\/\/juno.astroempires.com\/profile.aspx\?player=.+?">/,"");
				submitterAccount = submitterAccount.replace(/<\/a>/,"");
				
			// Data submission
				
				submitURL = 	"scriptVer=" + scriptVer +
								"&baseOwner=" + encodeURIComponent(baseOwner) + 
								"&ownerGuild=" + encodeURIComponent(ownerGuild) + 
								"&ownerLevel=" + encodeURIComponent(ownerLevel) + 
								"&occupiedBy=" + encodeURIComponent(occupiedBy) + 
								"&astroLoc=" + encodeURIComponent(astroLoc) + 
								"&economy=" + encodeURIComponent(economy) + 
								"&ownerIncome=" + encodeURIComponent(ownerIncome) + 
								"&baseCommander=" + encodeURIComponent(baseCommander) + 
								"&debris=" + encodeURIComponent(debris) + 
								"&trades=" + encodeURIComponent(trades) + 
								"&barracks=" + encodeURIComponent(arrayDefenses['barracks']) + 
								"&laserTurrets=" + encodeURIComponent(arrayDefenses['laserTurrets']) + 
								"&missileTurrets=" + encodeURIComponent(arrayDefenses['missileTurrets']) + 
								"&plasmaTurrets=" + encodeURIComponent(arrayDefenses['plasmaTurrets']) + 
								"&ionTurrets=" + encodeURIComponent(arrayDefenses['ionTurrets']) + 
								"&photonTurrets=" + encodeURIComponent(arrayDefenses['photonTurrets']) + 
								"&disruptorTurrets=" + encodeURIComponent(arrayDefenses['disruptorTurrets']) + 
								"&deflectionShields=" + encodeURIComponent(arrayDefenses['deflectionShields']) + 
								"&planetaryShield=" + encodeURIComponent(arrayDefenses['planetaryShield']) + 
								"&planetaryRing=" + encodeURIComponent(arrayDefenses['planetaryRing']) + 
								"&commandCenters=" + encodeURIComponent(arrayStructures['commandCenters']) + 
								"&jumpGate=" + encodeURIComponent(arrayStructures['jumpGate']) + 
								"&capital=" + encodeURIComponent(arrayStructures['capital']) + 
								"&submitter=" + encodeURIComponent(submitterAccount) + 
								"&fleetLanded=" + encodeURIComponent(fleetLanded) + 
								"&fleetIncoming=" + encodeURIComponent(fleetIncoming) + 
								"&ownerID=" + encodeURIComponent(ownerID) + 
								"&construction=" + encodeURIComponent(construction) + 
								"&production=" + encodeURIComponent(production) + 
								"&research=" + encodeURIComponent(research) +  
								"&rand=" + parseInt(Math.random()*99999999);


				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://"+ server +".mckflux.co.cc/"+ database +"/astroAdd.php",
				  data: submitURL,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					alertBox.innerHTML = response.responseText;
				  }
				});

		}

		 }
	});

}

//================================================================
//========================END SCAN BASES==========================
//================================================================

//================================================================
//==========================SCAN TECH=============================
//================================================================


url = window.location.href;

findTech = 0;


if(url.match(/empire\.aspx\?view\=technologies/)){
		findTech = 1;
} else {
	findTech = 0;
}

if(findTech){
          
    var alertBox = document.createElement('div');
    aPosition = document.body.childNodes[5];
		alertBox.innerHTML = "<b>Checking script version...</b>";
		alertBox.style.width = "100%";
		alertBox.style.color = "red";
		alertBox.style.border = "0px solid #6699cc";
		alertBox.style.marginLeft = "auto";
		alertBox.style.marginRight = "auto";
		alertBox.style.backgroundColor = "#0";
		alertBox.style.textAlign = "center";
		document.body.appendChild(alertBox);
		document.body.insertBefore(alertBox, aPosition);

	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://"+ server +".mckflux.co.cc/"+ database +"/scriptCheck.php",
	  data: "scriptVer=" + scriptVer + "&rand=" + parseInt(Math.random()*99999999),
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		rText = response.responseText;
		alertBox.innerHTML = rText;
		upToDate = rText.match(/Script is up to date./);
		if(upToDate){
			
			alertBox.innerHTML = "<b>Submitting Data...</b>";
			
			ihtmlz = document.body.innerHTML;

			// Owner information

				energyLevel = ihtmlz.match(/Energy<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>.+?<\/td>/);
				energyLevel = energyLevel[0].replace(/Energy<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>/,"");
				energyLevel = energyLevel.replace(/<\/td>/,"");

				computerLevel = ihtmlz.match(/Computer<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>.+?<\/td>/);
				computerLevel = computerLevel[0].replace(/Computer<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>/,"");
				computerLevel = computerLevel.replace(/<\/td>/,"");

				armourLevel = ihtmlz.match(/Armour<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>.+?<\/td>/);
				armourLevel = armourLevel[0].replace(/Armour<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td><\/td><td>/,"");
				armourLevel = armourLevel.replace(/<\/td>/,"");

				laserLevel = ihtmlz.match(/Laser<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				laserLevel = laserLevel[0].replace(/Laser<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				laserLevel = laserLevel.replace(/<\/td>/,"");

				missilesLevel = ihtmlz.match(/Missiles<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				missilesLevel = missilesLevel[0].replace(/Missiles<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				missilesLevel = missilesLevel.replace(/<\/td>/,"");

				stellarLevel = ihtmlz.match(/Stellar Drive<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				stellarLevel = stellarLevel[0].replace(/Stellar Drive<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				stellarLevel = stellarLevel.replace(/<\/td>/,"");

				plasmaLevel = ihtmlz.match(/Plasma<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				plasmaLevel = plasmaLevel[0].replace(/Plasma<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				plasmaLevel = plasmaLevel.replace(/<\/td>/,"");

				warpLevel = ihtmlz.match(/Warp Drive<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				warpLevel = warpLevel[0].replace(/Warp Drive<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				warpLevel = warpLevel.replace(/<\/td>/,"");

				shieldingLevel = ihtmlz.match(/Shielding<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				shieldingLevel = shieldingLevel[0].replace(/Shielding<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				shieldingLevel = shieldingLevel.replace(/<\/td>/,"");

				ionLevel = ihtmlz.match(/Ion<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				ionLevel = ionLevel[0].replace(/Ion<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				ionLevel = ionLevel.replace(/<\/td>/,"");

				photonLevel = ihtmlz.match(/Photon<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				photonLevel = photonLevel[0].replace(/Photon<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				photonLevel = photonLevel.replace(/<\/td>/,"");

				aiLevel = ihtmlz.match(/Artificial Intelligence<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				aiLevel = aiLevel[0].replace(/Artificial Intelligence<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				aiLevel = aiLevel.replace(/<\/td>/,"");

				disruptorLevel = ihtmlz.match(/Disruptor<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				disruptorLevel = disruptorLevel[0].replace(/Disruptor<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				disruptorLevel = disruptorLevel.replace(/<\/td>/,"");

				cyberLevel = ihtmlz.match(/Cybernetics<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				cyberLevel = cyberLevel[0].replace(/Cybernetics<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				cyberLevel = cyberLevel.replace(/<\/td>/,"");

				tachLevel = ihtmlz.match(/Tachyon Communications<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td>/);
				tachLevel = tachLevel[0].replace(/Tachyon Communications<\/b><\/td><td>.+?<\/td><td>.+?<\/td><td>.+?<\/td><td>/,"");
				tachLevel = tachLevel.replace(/<\/td>/,"");



			//Submitter info

				submitterAccount = ihtmlz.match(/Account<\/a><\/th><th width="90"><a href="http:\/\/juno.astroempires.com\/profile.aspx\?player=.+?">.+?<\/a>/);
				submitterAccount = submitterAccount[0].replace(/Account<\/a><\/th><th width="90"><a href="http:\/\/juno.astroempires.com\/profile.aspx\?player=.+?">/,"");
				submitterAccount = submitterAccount.replace(/<\/a>/,"");
				
			// Data submission
				
				submitURL = 	"scriptVer=" + scriptVer +
								"&energyLevel=" + encodeURIComponent(energyLevel) + 
								"&computerLevel=" + encodeURIComponent(computerLevel) + 
								"&armourLevel=" + encodeURIComponent(armourLevel) + 
								"&laserLevel=" + encodeURIComponent(laserLevel) + 
								"&missilesLevel=" + encodeURIComponent(missilesLevel) + 
								"&stellarLevel=" + encodeURIComponent(stellarLevel) + 
								"&plasmaLevel=" + encodeURIComponent(plasmaLevel) + 
								"&warpLevel=" + encodeURIComponent(warpLevel) + 
								"&shieldingLevel=" + encodeURIComponent(shieldingLevel) + 
								"&ionLevel=" + encodeURIComponent(ionLevel) + 
								"&photonLevel=" + encodeURIComponent(photonLevel) + 
								"&aiLevel=" + encodeURIComponent(aiLevel) + 
								"&disruptorLevel=" + encodeURIComponent(disruptorLevel) +
								"&cyberLevel=" + encodeURIComponent(cyberLevel) +
								"&tachLevel=" + encodeURIComponent(tachLevel) + 
								"&submitter=" + encodeURIComponent(submitterAccount) +  
								"&rand=" + parseInt(Math.random()*99999999);

				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://"+ server +".mckflux.co.cc/"+ database +"/techAdd.php",
				  data: submitURL,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					alertBox.innerHTML = response.responseText;
				  }
				});

		}

		 }
	});

}

//================================================================
//========================END SCAN TECH===========================
//================================================================

//================================================================
//===========================ID INFO==============================
//================================================================

//gets current server
function getGalaxy() {
  var href = document.location.href;
  href = href.substr("http://".length,href.indexOf(".") - "http://".length);
  return href;
}
//turns profile number to a link to your profile
function replaceIds() {
  var account = document.getElementById("account").nextSibling;
  var galaxy = getGalaxy();
  var id = account.innerHTML.substr(0,account.innerHTML.length);
  switch(galaxy) {
    case 'alpha': galaxy = "alpha"; break;
    case 'beta': galaxy = "beta"; break;
    case 'ceti': galaxy = "ceti"; break;
    case 'delta': galaxy = "delta"; break;
    case 'epsilon': galaxy = "epsilon"; break;
    case 'fenix': galaxy = "fenix"; break;
    case 'gamma': galaxy = "gamma"; break;
    case 'helion': galaxy = "helion"; break;
    case 'ixion': galaxy = "ixion"; break;
    case 'juno': galaxy = "juno"; break;
    default: return null;
  }
  var atag = '<a href="http://' + galaxy + 
   '.astroempires.com/profile.aspx?player=' + id + '">' + account.innerHTML + '</a>';
  account.innerHTML = atag;
}
//turns pending member id into a link to their faboo account
function replaceGuild() {
  var pending;
  if(!(pending = document.getElementById("guild_pending-members"))) {
    return;
  }
  var galaxy = getGalaxy();
  var regex = /<td>[0-9]+<\/td>/g;
  var matches = pending.innerHTML.match(regex);
if (matches == null) return;
  for(var i = 0;i < matches.length;i++) {
    var id = matches[i].substr(4,matches[i].length - 9);
    var atag = '<td><a target="_blank" href="http://faboo.org/eddie/' + galaxy + '/publicPlayer' 
      + '/playerid/' + id + '">' + id +  '</a></td>';
    pending.innerHTML=pending.innerHTML.replace(matches[i],atag);
  }
}
replaceIds();
replaceGuild();


//================================================================
//==========================End ID INFO===========================
//================================================================


//================================================================
//====================DATABASE LINK IN NAV BAR====================
//================================================================
//Thanks to Nathan Hook for helping me with the nav bar link.

var databaseUrl = "http://"+ server +".mckflux.co.cc/"+ database +"/";

window.addEventListener('load',
function() {
  
  // Representss the ' - ' between all the links at the top of the page.
  var dividerText = document.createElement('span');
  
  dividerText.innerHTML=' - ';
  
  var linkArray;
  
  linkArray = document.evaluate('//a[contains(@href, "home.aspx?session=logout&id=")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var logoutLink = linkArray.snapshotItem(0);
  
  var databaseLink = document.createElement('a');
  
  databaseLink.href=databaseUrl;
  databaseLink.setAttribute('href', databaseUrl);
  databaseLink.innerHTML=databaseText;
  // Opens the link in a new window.  Don't want that behavior, comment or remove the line below.
  databaseLink.target='_blank';
  
  logoutLink.parentNode.insertBefore(databaseLink, logoutLink);
  
  logoutLink.parentNode.insertBefore(dividerText, logoutLink);
  
}, true);

//================================================================
//======================END DATABASE LINK=========================
//================================================================

//================================================================
//======================ADDITIONAL FEATURES=======================
//================================================================

function insertEmpireMenu() {
	var tables = document.evaluate("//table[@class='top']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if (tables.snapshotLength == 0) return;
    var topTable = tables.snapshotItem(0);

    table = document.createElement("table");
	table.innerHTML="<tr><th width='10%'><a href='empire.aspx?view=bases_events'>Events</a></th><th width='10%'><a href='empire.aspx?view=bases_production'>Production</a></th><th width='10%'><a href='empire.aspx?view=economy'>Economy</a></th><th width='10%'><a href='empire.aspx?view=trade'>Trade</a></th><th width='10%'><a href='empire.aspx?ch=1&view=scanners'>Scanners</a></th></tr><tr><th width='10%'><a href='empire.aspx?view=bases_capacities'>Capacities</a></th><th width='10%'><a href='empire.aspx?view=structures'>Structures</a></th><th width='10%'><a href='empire.aspx?view=fleets'>Fleets</a></th><th width='10%'><a href='empire.aspx?view=units'>Units</a></th><th width='*'><a href='empire.aspx?view=technologies'>Technologies</a></th></tr>"
		table.width = "850"
	table.align = "center"
	if (topTable) {
        topTable.parentNode.insertBefore(table, topTable.nextSibling);
        var lineBreak = document.createElement('br');
        topTable.parentNode.insertBefore(lineBreak, table);
	}
}
    if (!document.location.href.match(/empire.aspx/)) {
        insertEmpireMenu();
    }

function stripDescriptions() {
    var helpCells = document.evaluate("//td[@class='help comment']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    ////console.log(helpCells.snapshotLength);
    for (var i = 0; i < helpCells.snapshotLength; i++) {
        helpCells.snapshotItem(i).innerHTML = helpCells.snapshotItem(i).innerHTML.match(/<div(.*?)id="itemDetails([0-9]+)"(.*?)><\/div>/)[0]
    }
}

if (document.location.href.match(/http:\/\/(.+?).astroempires.com\/base.aspx\?base=[0-9]{1,}&view=production/)) {
        stripDescriptions()
    }


function sumCreditsPage() {
 	table = document.createElement("table");
	table.innerHTML = document.getElementById("credits_table_sumary").innerHTML;
	table.width = "250"
	table.align = "center"
	document.getElementById("credits_table").parentNode.insertBefore(table, document.getElementById("credits_table")); 
	br = document.createElement("br");
	document.getElementById("credits_table").parentNode.insertBefore(br, document.getElementById("credits_table")); 
	document.getElementById("credits_table").parentNode.removeChild(document.getElementById("credits_table_sumary"))
}

if (document.location.href.match(/http:\/\/(.+?).astroempires\.com\/credits.aspx/)) {
        sumCreditsPage();
    }

function playerBases(){
  UserID = document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)[1];
  document.getElementById("profile_show").insertRow(1);
  document.getElementById("profile_show").rows[1].insertCell(0);
  document.getElementById("profile_show").rows[1].cells[0].innerHTML = "<a href='http://"+ server +".mckflux.co.cc/"+ database +"/astroInfo.php?submitted=TRUE&hideAll=show&showBlanks=show&show_age=TRUE&show_loc=TRUE&show_guild=TRUE&show_owner=TRUE&show_level=TRUE&show_economy=TRUE&show_ownerInc=TRUE&show_occdBy=TRUE&show_commander=TRUE&show_debris=TRUE&show_trades=TRUE&show_ccs=TRUE&show_jg=TRUE&show_cap=TRUE&show_dt=TRUE&show_des=TRUE&show_ps=TRUE&show_pr=TRUE&show_landed=TRUE&show_incoming=TRUE&filter_astroLoc=%28Any%29&filter_ownerGuild=%28Any%29&filter_owner=" + UserID + "&filter_level=%28Any%29&filter_jumpGate=%28Any%29&sortOrder=None&sortDirection=ASC&limit=50&page=0&hideGuild=' target='_blank'>User's Bases in DB</a>";
  document.getElementById("profile_show").rows[1].cells[0].align = "center";
}


function playerFaboo(){
  UserID = document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)[1];
  document.getElementById("profile_show").insertRow(1);
  document.getElementById("profile_show").rows[1].insertCell(0);
  document.getElementById("profile_show").rows[1].cells[0].innerHTML = "<a href='http://faboo.org/eddie/"+ server +"/publicPlayer/playerid/" + UserID + "' target='_blank'>User's Faboo page</a>";
  document.getElementById("profile_show").rows[1].cells[0].align = "center";
}

if (document.body.innerHTML.match(/<b>Player:<.b> ([0-9]+)/)) {
	playerFaboo();
	playerBases();
    }

//================================================================
//====================END ADDITIONAL FEATURES=====================
//================================================================

var VERSION = "1.6.5";
var BROWSER = "FF";

function checkToRun()
{
	if(typeof(GM_getValue) != 'function')
	{
		BROWSER = "Chrome";
		return;
	}
	else
	{
		BROWSER = "FF";
		servers = GM_getValue('excludeServers', '');
		if(servers.search(server) != -1)
		{
			exit(0);
		}
	}
}


function getServer()
{
	if(typeof(GM_xmlhttpRequest) != 'function')
		return;

	loc = window.location.href.substr(7);
	server = loc.substr(0, loc.search('astro') - 1);
}

function dateToString(time)
{
	month = time.getMonth() + 1;
	day = time.getDate();
	year = time.getFullYear();
	hours = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	if(month < 10)
		month = '0' + month;
	if(day < 10)
		day = '0' + day;
	if(hours < 10)
		hours = '0' + hours;
	if(min < 10)
		min = '0' + min;
	if(sec < 10)
		sec = '0' + sec;
	return day + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec;
}

function timeToString(time, type)
{
	hours = time / 3600;
	mins = (time / 60) % 60;
	if(mins < 10)
		mins = '0' + parseInt(mins);
	else
		mins = parseInt(mins);
	secs = time % 60;
	if(secs < 10)
		secs = '0' + parseInt(secs);
	else
		secs = parseInt(secs);

	if(type == 'h')
		return parseInt(hours) + 'h ' + mins + 'm ' + secs + 's';
	else if(type == ':')
		return parseInt(hours) + ':' + mins + ':' + secs;
}

function stringToTime(time)
{
	parts = time.split(' ');
	if(time.search('h') != -1)
	{
		hours = parts[0].substr(0, parts[0].length - 1);
		mins = parts[1].substr(0, parts[1].length - 1);
		secs = parts[2].substr(0, parts[2].length - 1);
	}
	else if(time.search('m') != -1)
	{
		hours = 0;
		mins = parts[0].substr(0, parts[0].length - 1);
		secs = parts[1].substr(0, parts[1].length - 1);
	}
	else if(time.search('s') != -1)
	{
		hours = 0;
		mins = 0;
		secs = parts[0].substr(0, parts[0].length - 1);
	}
	else
	{
		parts = time.split(':');
		hours = parts[0];
		mins = parts[1];
		secs = parts[2];
	}

	secs = Number(secs);
	secs += Number(mins) * 60;
	secs += Number(hours) * 3600;

	return secs;
}

function setServerTime()
{
	element = document.getElementById('top-header_server-time');
	now = new Date();
	totalSeconds = Number(element.title);
	serverDate = new Date(totalSeconds * 1000 + now.getTime());
	element.innerHTML = 'Server Time: ' + dateToString(serverDate);
}

function setupServerTime()
{
	// Get the server time element
	elements = document.getElementsByTagName('small');
	element = null;
	for(i = 0; i < elements.length; i++)
	{
		if(elements[i].innerHTML.search('Server time:') != -1)
		{
			element = elements[i];
			element.id = 'top-header_server-time';
			break;
		}
	}

	// Deep Space
	if(element == null)
	{
		element = document.getElementById('top-header_server-time');
		SKIN = "Deep Space";
	}

	fullText = element.innerHTML;
	fullText = fullText.substr(	13);

	// Jan 20 2010,
	if(fullText.search(/[A-Z][A-Z][A-Z]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 20 Jan 2010,
	else if(fullText.search(/[0-9][0-9][ ]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 2010-01-20
	else
	{
		dateText = fullText.split(' ')[0];
		timeText = fullText.split(' ')[1];

		dateParts = dateText.split('-');
		serverDate = new Date(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timeText);
	}

	totalSeconds = serverDate.getTime() / 1000;
	now = new Date();
	totalSeconds = totalSeconds - (now.getTime() / 1000);

	element.title = '' + totalSeconds;
	setServerTime();
	setInterval(function() {setServerTime()}, 200);
}

function checkExcludes()
{
	currentServers = GM_getValue('excludeServers', '');
	currentServers = currentServers.replace(/,/gm, ' ');
	if(currentServers != '')
	{
		alert(currentServers);
	}
	else
	{
		alert('No servers excluded');
	}
}

function addExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		currentServers = new Array();
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < servers.length; i++)
	{
		servers[i] = servers[i].toLowerCase();
		currentServers.push(servers[i]);
	}

	GM_setValue('excludeServers', currentServers.toString());
}
function removeExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		return;
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < currentServers.length; i++)
	{
		for(j = 0; j < servers.length; j++)
		{
			if(currentServers[i] == servers[j].toLowerCase())
			{
				currentServers.splice(i, 1);
				i--;
				break;
			}
		}
	}

	GM_setValue('excludeServers', currentServers.toString());
}

function addOptions()
{
	if(typeof(GM_getValue) != 'function')
		return;

	GM_registerMenuCommand('Check Excluded Servers', checkExcludes, 'c', 'shift alt', 'c');
	GM_registerMenuCommand('Exclude Servers', addExclude, 'e', 'shift alt', 'e');
	GM_registerMenuCommand('Unexclude Servers', removeExclude, 'u', 'shift alt', 'u');
}


function showFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = '';
		}
	}

	// change elem to hide fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Hide";
	link.addEventListener('click',
		function()
		{
			hideFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function hideFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = 'none';
		}
	}

	// change elem to show fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Show";
	link.addEventListener('click',
		function()
		{
			showFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function moveFleetSummary()
{
	sumElem = document.getElementById('fleets_summary');
	if(!sumElem)
		return;

	sumElem.style.display = 'block';

	if(window.location.href.search('map.aspx') != -1)
		fleetsTable = document.getElementById('map_fleets');
	else
		fleetsTable = document.getElementById('base_fleets');

	sumElem.parentNode.removeChild(sumElem);
	fleetsTable.parentNode.insertBefore(sumElem, fleetsTable);

	rowHTML = fleetsTable.rows[2].innerHTML
	fleetsTable.deleteRow(2);
	fleetsTable.insertRow(0);
	fleetsTable.rows[0].innerHTML = rowHTML;

	document.getElementById('link_hide_fleets_summary').style.display = 'inline';
	document.getElementById('link_show_fleets_summary').style.display = 'none';

	// add hides for each guild if more than one guild displayed
	if(SKIN == 'Dark Astros')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
		sumElem = sumElem.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	if(sumElem.innerHTML.search('<th>Total</th>') == -1)
		return;

	for(i = 1; i < sumElem.rows.length - 1; i++)
	{
		name = sumElem.rows[i].cells[0];
		if(name.firstChild.innerHTML == null)
		{
			name = name.innerHTML;
		}
		else
		{
			name = name.firstChild.innerHTML;
		}
		sumElem.rows[i].cells[0].innerHTML += ' - ';
		link = document.createElement('a');
		link.href = "javascript:void(0);";
		link.innerHTML = "Hide";
		link.title = name;
		link.addEventListener('click',
			function()
			{
				hideFleets(this);
			},
			true
		);
		sumElem.rows[i].cells[0].appendChild(link);
	}
}

function enhanceCapacities()
{
	mainTable = document.getElementById('empire_capacities');
	mainRow = mainTable.rows[1];
	mainCell = mainRow.cells[0];
	if(SKIN == 'Dark Astros')
	{
		realTable = mainCell.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = mainCell.firstChild;
		realTable = fakeTable.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	addConstr = 0;
	addProd = 0;
	for(i = 1; i < realTable.rows.length - 1; i++)
	{
		commanderCell = realTable.rows[i].cells[7];
		if(commanderCell.innerHTML != '')
		{
			commanderText = commanderCell.firstChild.innerHTML;
			commanderParts = commanderText.split(' ');
			effect = (100 - Number(commanderParts[1])) / 100;
		}

		var bonusCell = null;
		if(commanderCell.innerHTML.search('Construction') != -1)
		{
			bonusCell = realTable.rows[i].cells[4];
			baseText = bonusCell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
			oldValue = Number(baseText);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addConstr += newValue - oldValue;
		}
		else if(commanderCell.innerHTML.search('Production') != -1)
		{
			bonusCell = realTable.rows[i].cells[5];
			baseText = bonusCell.innerHTML.replace(',', '').replace('.', '');
			parts = baseText.split(' ');
			oldValue = Number(parts[0]);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addProd += newValue - oldValue;
		}
	}

	// for last row add the new totals
	lastRow = realTable.rows[realTable.rows.length - 1];
	constrCell = lastRow.cells[4];
	prodCell = lastRow.cells[5];

	constrElem = constrCell.firstChild;
	oldConstr = Number(constrElem.innerHTML.replace(',', '').replace('.', ''));
	newConstr = oldConstr + addConstr;
	constrElem.innerHTML += ' <font color="orange">(' + newConstr + ')</font>';

	prodElem = prodCell.firstChild;
	oldProd = Number(prodElem.innerHTML.replace(',', '').replace('.', ''));
	newProd = oldProd + addProd;
	prodElem.innerHTML += ' <font color="orange">(' + newProd + ')</font>';
}

function addBaseQueue(elem)
{
	if(window.location.href.search('view=research') == -1)
	{
		timeCell  = 5;
	}
	else
	{
		timeCell = 3;
	}

	row = elem.parentNode.parentNode;
	elem = row.cells[1].getElementsByTagName('font');
	// If item already has queue info
	if(elem.length != 0)
	{
		elem = elem[0];
		currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
		currentLv++;
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost *= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime *= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
	else
	{
		elem = row.cells[1];
		pos = elem.innerHTML.search('Level');
		// If level 0
		if(pos == -1)
		{
			currentLv = 0;
		}
		// if level >= 1
		else
		{
			currentLv = Number(elem.innerHTML.substr(pos + 6, elem.innerHTML.length - pos - 7).replace(/[)]/ig, ''));
		}
		currentLv++;
		row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';

		currentCost = row.cells[2].innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
		currentCost *= 1.5;
		row.cells[2].innerHTML += '<br><font color="orange">(' + currentCost.toFixed(0) + ')</font>';

		currentTime = stringToTime(row.cells[timeCell].innerHTML);
		currentTime *= 1.5;
		row.cells[timeCell].innerHTML += '<br><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
	}
}

function removeBaseQueue(structure)
{
	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].innerHTML.search(structure) != -1)
		{
			row = table.rows[i];
			break;
		}
	}

	elem = row.cells[1].getElementsByTagName('font')[0];
	currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
	currentLv--;
	// If at actual level remove all of these extra labels
	if(elem.parentNode.innerHTML.search('Level ' + currentLv) != -1 ||
		(elem.parentNode.innerHTML.search('Level') > elem.parentNode.innerHTML.search('<font') && currentLv == 0))
	{
		elems = row.getElementsByTagName('font');
		while(elems.length != 0)
		{
			elems[0].parentNode.innerHTML = elems[0].parentNode.innerHTML.replace(/<br>/ig, '');
			elems[0].parentNode.removeChild(elems[0]);
		}
	}
	else
	{
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost /= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime /= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
}

function refreshQueueItems(listElem)
{
	// Wait until the list of queued Items actually changes
	if(listElem == document.getElementById('item'))
	{
		window.setTimeout(
			function()
			{
				refreshQueueItems(listElem);
			}, 200);
		return;
	}

	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		row = table.rows[i];

		// Search if this structure is possible to queue
		queue = false;
		if(row.cells[endCell].innerHTML.search('Build') != -1 || row.cells[endCell].innerHTML.search('Research') != -1)
		{
			queue = false;
		}
		else
		{
			for(j = 0; j < opt.length; j++)
			{
				if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
				{
					break;
				}

				row = table.rows[i];
				name = row.cells[1].firstChild.firstChild.innerHTML;

				if(opt[j] == name)
				{
					queue = true;
					break;
				}
			}
		}

		if(queue == true && row.cells[endCell].innerHTML.search('Queue') == -1)
		{
			input = document.createElement('input');
			input.type = 'button';
			input.value = 'Queue';
			input.title = j;
			input.addEventListener('click', function (e)
				{
					e.stopPropagation();
					queueItem(this);
				}
				, false);
			input.className = 'input-button';

			// If this is what is building
			if(row.cells[endCell].id == 'time1')
			{
				span = document.createElement('span');
				span.id = 'time1';
				span.class = 'active';
				span.title = row.cells[endCell].title;

				blank = document.createElement('span');
				blank.innerHTML = '<br/>';

				row.cells[endCell].innerHTML = '';
				row.cells[endCell].id = '';
				row.cells[endCell].class = '';
				row.cells[endCell].title = '';

				row.cells[endCell].appendChild(input);
				row.cells[endCell].appendChild(blank);
				row.cells[endCell].appendChild(span);
			}
			else
			{
				row.cells[endCell].innerHTML = "";
				row.cells[endCell].appendChild(input);
			}
		}
		// Change the title of the queue item
		else if(queue == true)
		{
			input = row.cells[endCell].firstChild;
			input.title = j;
		}
		else if(queue == false && row.cells[endCell].innerHTML.search('Queue') != -1)
		{
			if(row.cells[endCell].innerHTML.search('time1') == -1)
			{
				row.cells[endCell].className = 'gray inactive';
				row.cells[endCell].align = 'center';
				row.cells[endCell].innerHTML = 'working';
			}
			else
			{
				span = row.cells[endCell].lastChild;
				row.cells[endCell].innerHTML = span.innerHTML;
				row.cells[endCell].id = 'time1';
				row.cells[endCell].title = span.title;
			}
		}
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function queueItem(elem)
{
	listElem = document.getElementById('item');
	listElem.selectedIndex = elem.title;

	listElem.parentNode.parentNode.cells[1].firstChild.click();
	addBaseQueue(elem);

	refreshQueueItems(listElem);
}

function enhanceBaseConstruction()
{
	// Get already queued up items
	queueList = new Array();
	table = document.getElementById('base-queue_content');
	table = table.firstChild.firstChild;

	// Get list of items queued up
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[1].innerHTML.search('Add to Queue') != -1)
		{
			break;
		}

		item = table.rows[i].cells[0].innerHTML;
		if(queueList[item] == null)
		{
			queueList[item] = 1;
		}
		else
		{
			queueList[item] = queueList[item] + 1;
		}
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Get list of what can be done
	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Add queue option
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
		{
			break;
		}

		row = table.rows[i];
		name = row.cells[1].firstChild.firstChild.innerHTML;

		// If nothing to queue, menu already setup for it
		if(row.cells[endCell].innerHTML.search('Build') == -1 && row.cells[endCell].innerHTML.search('Research') == -1)
		{
			// Check if this is whats building to add it to queueList
			if(row.cells[endCell].id == 'timer1')
			{
				if(queueList[name] == null)
				{
					queueList[name] = 1;
				}
				else
				{
					queueList[name] = queueList[name] + 1;
				}
			}

			// Search for if their is a option to queue this building
			for(j = 0; j < opt.length; j++)
			{
				if(opt[j] == name)
				{
					input = document.createElement('input');
					input.type = 'button';
					input.value = 'Queue';
					input.title = j;
					input.addEventListener('click', function (e)
						{
							e.stopPropagation();
							queueItem(this);
						}
						, false);
					input.className = 'input-button';

					// If this is what is building
					if(row.cells[endCell].id == 'timer1')
					{
						span = document.createElement('span');
						span.id = 'timer1';
						span.class = 'active';
						span.title = row.cells[endCell].title;

						blank = document.createElement('span');
						blank.innerHTML = '<br/>';

						row.cells[endCell].innerHTML = '';
						row.cells[endCell].id = '';
						row.cells[endCell].class = '';
						row.cells[endCell].title = '';

						row.cells[endCell].appendChild(input);
						row.cells[endCell].appendChild(blank);
						row.cells[endCell].appendChild(span);
					}
					else
					{
						row.cells[endCell].innerHTML = "";
						row.cells[endCell].appendChild(input);
					}

					break;
				}

			}

			// Search for if there is a item of this type queued
			if(queueList[name] != null)
			{
				currentCost = row.cells[2].innerHTML;
				currentCost = currentCost.replace(/[,]/g, '').replace(/[.]/g, '');

				currentTime = row.cells[timeCell].innerHTML;
				currentTime = stringToTime(currentTime);

				currentLv = row.cells[1].innerHTML;
				currentLv = currentLv.split('(');
				if(currentLv.length != 1)
				{
					currentLv = currentLv[1].split(')')[0];
					currentLv = Number(currentLv.substr(6));
				}
				else
				{
					currentLv = 0;
				}

				queued = Number(queueList[name]);
				for(j = 0; j < queued; j++)
				{
					currentCost *= 1.5;
					currentTime *= 1.5;
					currentLv++;
				}

				row.cells[2].innerHTML += '<br/><font color="orange">(' + currentCost.toFixed(0) + ')</font>';
				row.cells[timeCell].innerHTML += '<br/><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
				row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';
			}
		}
		// row.cells[endCell].align = 'right';
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function resetRecallTime()
{
	elem = document.getElementById('recall_duration');
	recallTime = Number(elem.title);
	elem.title = recallTime + 1;

	recallTimeString = timeToString(recallTime, 'h');

	elem.value = 'Recall Fleet (' + recallTimeString + ')';
}

function addRecallTime()
{
	arrivalElem = document.getElementById('timer1');
	arrivalTime = arrivalElem.title;

	centerElems = document.getElementsByTagName('center');
	for(i = 0; i < centerElems.length; i++)
	{
		if(centerElems[i].innerHTML.search('Travel Duration:') != -1)
		{
			durationElem = centerElems[i];
			break;
		}
	}

	parts = durationElem.firstChild.innerHTML.split(": ");
	duration = parts[1];

	secs = stringToTime(duration);

	recallTime = secs - arrivalTime;

	elems = document.getElementsByTagName('input');
	for(i = 0; i < elems.length; i++)
	{
		if(elems[i].value == 'Recall Fleet')
		{
			elems[i].id = 'recall_duration';
			elems[i].title = recallTime;
			break;
		}
	}

	resetRecallTime();
	setInterval(function() {resetRecallTime()}, 1000);
}

function removeNonAttackable()
{
	table = document.getElementById('fleets_attack-list');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling
	}

	for(i = 1; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[3].innerHTML == '')
		{
			table.deleteRow(i);
			i--;
		}
	}
}

function delayedMove()
{
	// Get current date/time
	timeElem = document.getElementById('server-time');
	timeDate = new Date(timeElem.innerHTML);

	// Get desired date/time
	launchElem = document.getElementById('launch');
	launchDate = new Date(launchElem.value);

	// check if time to launch
	if((timeDate.getTime() - launchDate.getTime()) > 0)
	{
		// Find move button
		elems = document.getElementsByTagName('input');
		for(i = 0; i < elems.length; i++)
		{
			if(elems[i].value == 'Move')
			{
				elems[i].click();
			}
		}
	}
}

function startDelayedMove()
{
	elem = document.getElementById('autoLaunch');

	if(elem.value == 'Enable Auto-Launch')
	{
		elem.value = 'Disable Auto-Launch';

		delayedInterval = setInterval(
			function()
			{
				delayedMove();
			},
			1000
		);
	}
	else
	{
		elem.value = 'Enable Auto-Launch';
		clearInterval(delayedInterval);
	}
}

function addDelayedMove()
{
	table = document.getElementById('fleet_move');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.firstChild;
	}

	// Find move row
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].innerHTML.search('value="Move"') != -1)
		{
			i++;
			break;
		}
	}

	// Get current date/time
	timeElem = document.getElementById('server-time');

	row = table.insertRow(i);
	cell = document.createElement('th');
	if(SKIN == 'Dark Astros')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant" value="' + timeElem.innerHTML + '" size="26">';
	}
	else if(SKIN == 'Deep Space')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant input-numeric" value="' + timeElem.innerHTML + '" size="26">';
	}
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
	i++;

	row = table.insertRow(i);
	cell = document.createElement('th');
	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Enable Auto-Launch';
	link.id = 'autoLaunch';
	link.addEventListener('click',
		function()
		{
			startDelayedMove();
		},
	false);
	link.className = 'input-button';
	cell.appendChild(link);
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
}

function enhanceTradePage()
{
	table = document.getElementById('empire_trade_trade-routes');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Get list of players
	players = new Array();
	for(i = 1; i < table.rows.length - 1; i++)
	{
		row = table.rows[i];

		// Check for duplicates
		nameElem = row.cells[1].firstChild.nextSibling.nextSibling;
		name = nameElem.innerHTML;

		// Check if player already found
		if(players[name] == null)
		{
			players[name] = i;
		}
		else
		{
			nameElem.innerHTML += ' <font color="red">(duplicate)</font>';

			// Havent changed first occurance yet
			if(players[name] != 0)
			{
				nameElem = table.rows[players[name]].cells[1].firstChild.nextSibling.nextSibling;
				nameElem.innerHTML += ' <font color="red">(duplicate)</font>';
			}
		}

		// Put difference between bases
		base1 = Number(row.cells[2].firstChild.wholeText);
		base2 = Number(row.cells[3].firstChild.wholeText);
		diff = base2 - base1;
		if(diff < 0)
		{
			diff = ' <font color="red">(' + diff + ')</font>';
		}
		else
		{
			diff = ' <font color="orange">(+' + diff + ')</font>';
		}

		row.cells[3].innerHTML += diff;
	}
}



/////////////////////////////////////////////////////////////
/////////////////////// Main ////////////////////////////////
/////////////////////////////////////////////////////////////

start = new Date();

//// Do for all AE pages
// Check if allowed to run
getServer();
addOptions();
checkToRun();


//// Specific page enchancements
// If base or astro page, move fleet summary up to top default on
if((window.location.href.search('map.aspx') != -1 && window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9][:][0-9][0-9]/i) != -1) || window.location.href.search('base.aspx') != -1)
{
	moveFleetSummary();
}

// Add commander effects on capacity page
if(window.location.href.search('bases_capacities') != -1)
{
	enhanceCapacities();
}
// Add commander effects on base page
if(window.location.href.search('base.aspx') != -1)
{
	if(window.location.href.search('structures') != -1 || window.location.href.search('defenses') != -1 || window.location.href.search('research') != -1)
	{
		enhanceBaseConstruction();
	}
}
// Add recall time for in transit fleets
if(window.location.href.search('fleet.aspx?') != -1)
{
	if(document.getElementById('timer1') && window.location.href.search('recall') == -1)
	{
		addRecallTime();
	}
	else if(window.location.href.search('view=attack') != -1)
	{
		removeNonAttackable();
	}
	else if(window.location.href.search('view=move') != -1)
	{
		addDelayedMove();
	}
}

// Duplicates/difference in econ on trade page
if(window.location.href.search('view=trade') != -1)
{
	enhanceTradePage();
}


end = new Date();
// alert((end.getTime() - start.getTime()) / 1000);