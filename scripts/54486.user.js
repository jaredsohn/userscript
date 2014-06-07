// ==UserScript==
// @name	antropomoorfico Alianza
// @namespace  	antropomorfico Alianza
// @description	antropomorfico script Alianza
// @include    	http://s12.ikariam.es/index.php*
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:500px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';

if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}
function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function add_Alliance_Menu(){
var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var Tools_Link       = document.createElement('LI');
Tools_Link.setAttribute('id', 'Tools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(Tools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('Tools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>ALIANZA -13 TITANES-</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://www.13titanes.co.cc" align="left">&nbsp;FORO DE LA ALIANZA</a></li>'
+ '     <li><center><a href="http://hi.muriandre.com/cdv.php" align="left">&nbsp;CALCULADOR DE TIEMPOS DE VIAJE</a></li>'
+ '     <li><center><a href="http://ikariamlibrary.com/?content=IkaFight" align="left">&nbsp;SIMULADOR DE BATALLAS</a></li>'
+ '     <li><center><a href="http://www.ika-world.com/es/suche.php?view=suche_deluxe&land=es" align="left">&nbsp;BUSCADOR DE JUGADORES Y CIUDADES</a></li>'
+ '     <li><center><a href="http://hi.muriandre.com/cdb.php" align="left">&nbsp;COMPACTADOR DE BATALLAS</a></li>'


+'</ul>'
+'</DIV>';

break;
}}}

add_Alliance_Menu();



// ==UserScript==

// @include			http://s*.ikariam.*/index.php*

// ==/UserScript==

// Version Log:
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fix to support different languages (thanks to oliezekat).
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

// URL to icons
var imgURL = "http://www.atdao.dk/public/images/";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
	}

	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					posInfoTop = POSITIONS['constructionSite'][1]["y"];
					posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 3 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + imgURL + img +'.png\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m2.png')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { curWine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { curMarble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { curCrystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { curSulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l2.png\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wine.png" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'marble.png" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'glass.png" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'sulfur.png" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r2.png\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m.png')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) { curRes2 = document.getElementById('value_crystal').textContent.replace(",",""); }
			
			resIcon2 = "glass";
		
		} else {
		
			if (document.getElementById('value_marble')) { curRes2 = document.getElementById('value_marble').textContent.replace(",",""); }
			resIcon2 = "marble";
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l.png\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + resIcon2 +'.png" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r.png\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
		// academy
		"academy" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },	// MANGLER
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },
			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33450, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56728, "crystal" : 78724 },
			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103458, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175057, "crystal" : 282571 },
			{ "wood" : 243929, "crystal" : 408877 }		// level 25
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },
			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },
			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191053 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403824 },
			{ "wood" : 314902, "marble" : 515592 }	// level 29
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },
			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },
			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6777 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35825, "marble" : 16017 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21245 },
			{ "wood" : 56185, "marble" : 24454 },
			{ "wood" : 65251, "marble" : 28141 }	// level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },
			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7007, "marble" : 2613 },
			{ "wood" : 8107, "marble" : 3078 },
			{ "wood" : 9547, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4242 },
			{ "wood" : 12422, "marble" : 4967 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16400, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24708, "marble" : 10757 },
			{ "wood" : 29488, "marble" : 12526 },
			{ "wood" : 33741, "marble" : 14577 },
			{ "wood" : 38589, "marble" : 16956 },
			{ "wood" : 44115, "marble" : 19715 },
			{ "wood" : 46585, "marble" : 21399 },
			{ "wood" : 53221, "marble" : 24867 }	// level 32
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },
			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },
			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },
			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 }	// level 32
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3071 },
			{ "wood" : 4460, "marble" : 3942 },
			{ "wood" : 5689, "marble" : 5038 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14745, "marble" : 13117 },
			{ "wood" : 18650, "marble" : 16600 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37572, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59807, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95107, "marble" : 84814 }	// level 25
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },
			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8850, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },
			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76366 },
			{ "wood" : 94250, "marble" : 85042 }	// level 27
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },
			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },
			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },
			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 }	// level 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },
			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 }	// level 16
		],

		// workshop, wood, marble, missing 2 (level 30, 31)
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 58462, "marble" : 38447 }	// level 31
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },
			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },
			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 160157, "marble" : 91013 }	// level 22
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },
			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },
			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },
			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 }	// level 32
		],

		// barracks, wood, marble, missing 1 (level 29)
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },
			{ "wood" : 58772, "marble" : 39957 },
			{ "wood" : 72932, "marble" : 49839 },
			{ "wood" : 90490, "marble" : 61909 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 158796, "marble" : 109259 },
			{ "wood" : 186750, "marble" : 128687 }	// level 31
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },
			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15404, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },
			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 39261, "marble" : 54769 },
			{ "wood" : 47240, "marble" : 66733 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },
			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 }	// level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 }	// level 24
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },
			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4737, "marble" : 4834 },
			{ "wood" : 5487, "marble" : 5663 },
			{ "wood" : 6347, "marble" : 6624 },
			{ "wood" : 7339, "marble" : 7739 },
			{ "wood" : 8480, "marble" : 9033 },
			{ "wood" : 9791, "marble" : 10534 },
			{ "wood" : 11298, "marble" : 12275 },
			{ "wood" : 13031, "marble" : 14295 },
			{ "wood" : 15025, "marble" : 16637 },
			{ "wood" : 17318, "marble" : 19355 },
			{ "wood" : 19955, "marble" : 22508 },
			{ "wood" : 22987, "marble" : 26164 }	// level 28
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42484, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72052, "marble" : 39791 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },
			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },
			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },
			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 }	// level 32
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },
			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },
			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },
			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245231 }	// level 34
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },
			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47282, "marble" : 28502 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75448, "marble" : 45481 }	// level 21
		]
	};
}



// ==UserScript==
// @name           		antropomorfico
// @version		1
// @author			oliezekat
// @namespace      	antropomorfico
// @description    	Increase your worldmap view (not your p3n!s)
// @include     http://*.ikariam.*/*


// ==/UserScript==

if (!DoubleMap) var DoubleMap = {};

DoubleMap =
	{
	View: ''
	};
	
DoubleMap.Init = function()
	{
	// Fetch view name
	try
		{
		DoubleMap.View = document.getElementsByTagName("body")[0].id;
		}
	catch (e)
		{
		var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
		if (url_view != null) DoubleMap.View = RegExp.$1;
		}
	
	if (DoubleMap.View =='worldmap_iso')
		{
		DoubleMap.Set_Styles();
		}
	};
	
DoubleMap.Set_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#worldmap_iso #scrollcover { height: 840px !important;}
	#worldmap_iso #dragHandlerOverlay { height: 900px !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};

DoubleMap.Init();

// ==UserScript==

// @include			http://s*.ikariam.*/index.php*

// ==/UserScript==

// Version Log:
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fix to support different languages (thanks to oliezekat).
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

// URL to icons
var imgURL = "http://www.atdao.dk/public/images/";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
	}

	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					posInfoTop = POSITIONS['constructionSite'][1]["y"];
					posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 3 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
							reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + imgURL + img +'.png\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m2.png')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }
		if (document.getElementById('value_wine')) { curWine = document.getElementById('value_wine').textContent.replace(",",""); }
		if (document.getElementById('value_marble')) { curMarble = document.getElementById('value_marble').textContent.replace(",",""); }
		if (document.getElementById('value_crystal')) { curCrystal = document.getElementById('value_crystal').textContent.replace(",",""); }
		if (document.getElementById('value_sulfur')) { curSulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l2.png\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wine.png" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'marble.png" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'glass.png" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'sulfur.png" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r2.png\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgURL + "scroll-m.png')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) { curWood = document.getElementById('value_wood').textContent.replace(",",""); }		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) { curRes2 = document.getElementById('value_crystal').textContent.replace(",",""); }
			
			resIcon2 = "glass";
		
		} else {
		
			if (document.getElementById('value_marble')) { curRes2 = document.getElementById('value_marble').textContent.replace(",",""); }
			resIcon2 = "marble";
		}
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgURL +'scroll-l.png\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + 'wood.png" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgURL + resIcon2 +'.png" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgURL +'scroll-r.png\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
		// academy
		"academy" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },	// MANGLER
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5824, "wine" : 0, "marble" : 1434, "crystal" : 0, "sulfur" : 0 },
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3089 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10301 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 }	// level 10
		],
		
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },
			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33450, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56728, "crystal" : 78724 },
			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103458, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175057, "crystal" : 282571 },
			{ "wood" : 243929, "crystal" : 408877 }		// level 25
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },
			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },
			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191053 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403824 },
			{ "wood" : 314902, "marble" : 515592 }	// level 29
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },
			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },
			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6777 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35825, "marble" : 16017 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21245 },
			{ "wood" : 56185, "marble" : 24454 },
			{ "wood" : 65251, "marble" : 28141 }	// level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },
			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7007, "marble" : 2613 },
			{ "wood" : 8107, "marble" : 3078 },
			{ "wood" : 9547, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4242 },
			{ "wood" : 12422, "marble" : 4967 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16400, "marble" : 6785 },
			{ "wood" : 18815, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24708, "marble" : 10757 },
			{ "wood" : 29488, "marble" : 12526 },
			{ "wood" : 33741, "marble" : 14577 },
			{ "wood" : 38589, "marble" : 16956 },
			{ "wood" : 44115, "marble" : 19715 },
			{ "wood" : 46585, "marble" : 21399 },
			{ "wood" : 53221, "marble" : 24867 }	// level 32
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },
			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },
			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },
			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 }	// level 32
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3071 },
			{ "wood" : 4460, "marble" : 3942 },
			{ "wood" : 5689, "marble" : 5038 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14745, "marble" : 13117 },
			{ "wood" : 18650, "marble" : 16600 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37572, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59807, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95107, "marble" : 84814 }	// level 25
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },
			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8850, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },
			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76366 },
			{ "wood" : 94250, "marble" : 85042 }	// level 27
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },
			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },
			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },
			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 }	// level 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },
			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 }	// level 16
		],

		// workshop, wood, marble, missing 2 (level 30, 31)
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 58462, "marble" : 38447 }	// level 31
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },
			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },
			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 160157, "marble" : 91013 }	// level 22
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },
			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },
			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },
			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 }	// level 32
		],

		// barracks, wood, marble, missing 1 (level 29)
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },
			{ "wood" : 58772, "marble" : 39957 },
			{ "wood" : 72932, "marble" : 49839 },
			{ "wood" : 90490, "marble" : 61909 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 158796, "marble" : 109259 },
			{ "wood" : 186750, "marble" : 128687 }	// level 31
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },
			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15404, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },
			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 39261, "marble" : 54769 },
			{ "wood" : 47240, "marble" : 66733 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },
			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 }	// level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 }	// level 24
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },
			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4737, "marble" : 4834 },
			{ "wood" : 5487, "marble" : 5663 },
			{ "wood" : 6347, "marble" : 6624 },
			{ "wood" : 7339, "marble" : 7739 },
			{ "wood" : 8480, "marble" : 9033 },
			{ "wood" : 9791, "marble" : 10534 },
			{ "wood" : 11298, "marble" : 12275 },
			{ "wood" : 13031, "marble" : 14295 },
			{ "wood" : 15025, "marble" : 16637 },
			{ "wood" : 17318, "marble" : 19355 },
			{ "wood" : 19955, "marble" : 22508 },
			{ "wood" : 22987, "marble" : 26164 }	// level 28
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42484, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72052, "marble" : 39791 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },
			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },
			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },
			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 }	// level 32
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },
			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },
			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },
			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245231 }	// level 34
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 }	// level 21
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },
			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47282, "marble" : 28502 },
			{ "wood" : 59806, "marble" : 36051 },
			{ "wood" : 75448, "marble" : 45481 }	// level 21
		]
	};
}


// ==UserScript==
// @name           Ikariam Military Cargo (Blank Canvas)
// @namespace      http://blankcanvasweb.com
// @description	   Shows cargo icons and quantities in military view
// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// @version		   0.01
// @author		   Jerome Dane
// ==/UserScript==

GM_addStyle('.resourcesOnBoard h5 { display:none; }\
			.resourcesOnBoard .unitBox { width:35px; float:left; margin-top:4px; text-align:center; }\
			.resourcesOnBoard .unitBox img { width:20px; }\
			.resourcesOnBoard .unitBox .iconSmall { padding-top:4px; }\
			.resourcesOnBoard .count { text-align:center; font-weight:normal; font-size:10px; }\
			.resourcesOnBoard .icon { text-align:center; }\
			tr.own td:first-child + td {  }');

var elems = document.getElementById('mainview').getElementsByTagName('div');
for(var i = 0; i < elems.length; i++) {
	if(elems[i].className == 'tooltip2' && elems[i].innerHTML.match(/count/)) {
		try {
			var src = elems[i].innerHTML;
			var target = elems[i].parentNode;
			target.wrappedJSObject.onmouseover = null;
			target.style.cursor = "auto";
			target.innerHTML = "";
			target.innerHTML += '<table class="resourcesOnBoard" style="width:275px;">' + src + '</table>';	
		} catch(e) {}
	}
}


// ==/UserScript==

if (!IkaPayloads) var IkaPayloads = {};

IkaPayloads =
	{
	View: '',
	
	EnhancedBy: 'Enhanced by <a target="_blank" href="http://userscripts.org/scripts/show/51384"><b>Ikariam Payloads</b></a>.',

	Init: function()
		{
		IkaPayloads.DOM.Init(this);

		// Fetch view name
		try
			{
			IkaPayloads.View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) IkaPayloads.View = RegExp.$1;
			}
		if (IkaPayloads.View =='transport')
			{
			IkaPayloads.View_Transport();
			}
		else if (IkaPayloads.View =='branchOffice')
			{
			IkaPayloads.View_BranchOffice();
			}
		else if (IkaPayloads.View =='takeOffer')
			{
			IkaPayloads.View_TakeOffer();
			}
		else if (IkaPayloads.View =='colonize')
			{
			IkaPayloads.View_Colonize();
			}
		// Oh my god! I had forgot view's name while launch new colony. And I coudn't try this now :o(  .oO(hope I will not forget...)
		},
		
	View_Transport: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 750px; }
			#container .resourceAssign input.textfield { top: 9px; }
			input.IkaPayloads1 { position: absolute; top: 6px; left: 511px; margin: 0px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { position: absolute; top: 6px; left: 541px; margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { position: absolute; top: 6px; left: 570px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { position: absolute; top: 6px; left: 603px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { position: absolute; top: 6px; left: 636px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				li.appendChild(input);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				li.appendChild(input);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				li.appendChild(input);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				li.appendChild(input);
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				li.appendChild(input);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
				
	View_TakeOffer: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
		
	View_BranchOffice: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; margin-bottom: 2px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i=i+2)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
		
				
	Add_500_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value or complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_1k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 1000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 1000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_2k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 2000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 2000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_5k_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 5000 and complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 + 5000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Dec_500_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button = obj;
		
		// unfocus button
		button.blur();	
		
		var TextfieldID = button.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Decrease value or complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 - 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Insert_Footer: function()
		{
		var div = document.createElement('div');
		div.id = 'IkaPayloadsFooter';
		div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
		div.innerHTML = IkaPayloads.EnhancedBy;
		var mainview = document.getElementById("mainview");
		mainview.appendChild(div);
		}
	};

IkaPayloads.View_Colonize = function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 750px; }
			#container .resourceAssign input.textfield { top: 9px; }
			#container .resourceAssign .summary {left: 500px !important;}
			input.IkaPayloads1 { position: absolute; top: 6px; left: 511px; margin: 0px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { position: absolute; top: 6px; left: 541px; margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { position: absolute; top: 6px; left: 570px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { position: absolute; top: 6px; left: 603px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { position: absolute; top: 6px; left: 636px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
		
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				if ((Good == undefined) || (Good == '')) continue;
			
				// Fix for colonize
				if (Good == 'wood') Good = 'resource';
				if (Good == 'glass') Good = 'crystal';
			
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				li.appendChild(input);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				li.appendChild(input);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				li.appendChild(input);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				li.appendChild(input);
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				li.appendChild(input);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},

IkaPayloads.DOM =
	{
	_Parent: null
	};
	
IkaPayloads.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkaPayloads.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
IkaPayloads.Init();

// ==UserScript==
// @name           SnP helper
// @namespace      ikariamLibrary
// @description    Add caculate ship amout to pillage all resource
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.04 (06/06/2009)
// Credits (some function is copy or modify from other srcipt): Town Enhancer, Ikariam Inline Score

var woodAmt = 0;
var wineAmt = 0;
var marbleAmt = 0;
var crystalAmt = 0;
var sulphurAmt = 0;
var totalAmt = 0;
var lootableAmt = 0;

//b= wood
//w=wines
//m=marble
//c=crystal
//s=sulphur
var data = {
	"warehouse": [
		{ b: 0, w: 0, m: 0, c: 0, s: 0 },	// 0
		{ b: 180, w: 180, m: 180, c: 180, s: 180 },	// 1
		{ b: 260, w: 260, m: 260, c: 260, s: 260 },	// 2
		{ b: 340, w: 340, m: 340, c: 340, s: 340 },	// 3
		{ b: 420, w: 420, m: 420, c: 420, s: 420 },	// 4
		{ b: 500, w: 500, m: 500, c: 500, s: 500 },	// 5
		{ b: 580, w: 580, m: 580, c: 580, s: 580 },	// 6
		{ b: 660, w: 660, m: 660, c: 660, s: 660 },	// 7
		{ b: 740, w: 740, m: 740, c: 740, s: 740 },	// 8
		{ b: 820, w: 820, m: 820, c: 820, s: 820 },	// 9
		{ b: 900, w: 900, m: 900, c: 900, s: 900 },	// 10
		{ b: 980, w: 980, m: 980, c: 980, s: 980 },	// 11
		{ b: 1060, w: 1060, m: 1060, c: 1060, s: 1060 },	// 12
		{ b: 1140, w: 1140, m: 1140, c: 1140, s: 1140 },	// 13
		{ b: 1220, w: 1220, m: 1220, c: 1220, s: 1220 },	// 14
		{ b: 1300, w: 1300, m: 1300, c: 1300, s: 1300 },	// 15
		{ b: 1380, w: 1380, m: 1380, c: 1380, s: 1380 },	// 16
		{ b: 1460, w: 1460, m: 1460, c: 1460, s: 1460 },	// 17
		{ b: 1540, w: 1540, m: 1540, c: 1540, s: 1540 },	// 18
		{ b: 1620, w: 1620, m: 1620, c: 1620, s: 1620 },	// 19
		{ b: 1700, w: 1700, m: 1700, c: 1700, s: 1700 },	// 20
		{ b: 1780, w: 1780, m: 1780, c: 1780, s: 1780 },	// 21
		{ b: 1860, w: 1860, m: 1860, c: 1860, s: 1860 },	// 22
		{ b: 1940, w: 1940, m: 1940, c: 1940, s: 1940 },	// 23
		{ b: 2020, w: 2020, m: 2020, c: 2020, s: 2020 },	// 24
		{ b: 2100, w: 2100, m: 2100, c: 2100, s: 2100 },	// 25
		{ b: 2180, w: 2180, m: 2180, c: 2180, s: 2180 },	// 26
		{ b: 2260, w: 2260, m: 2260, c: 2260, s: 2260 },	// 27
		{ b: 2340, w: 2340, m: 2340, c: 2340, s: 2340 },	// 28
		{ b: 2420, w: 2420, m: 2420, c: 2420, s: 2420 },	// 29
		{ b: 2500, w: 2500, m: 2500, c: 2500, s: 2500 },	// 30
		{ b: 2580, w: 2580, m: 2580, c: 2580, s: 2580 }	// 31
	]
};

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};

getElementsByClass = function(inElement, className, findIn)
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++)
  {
    if (findIn == true)
    {
        if (all[e].className.indexOf(className) > 0)
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className)
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// get all attributes in object (for debug)
function objToString(obj, description){
	var str = '';
	if( typeof(description) != 'undefined' && description != '' ){
		str = '+++ [ ' + description + ' ] +++\n';
	}
	str += 'typeof - ' + typeof(obj) + '\n';
	if(typeof(obj) != 'undefined'){
		for(key in obj){
			str += key + ' - ' + obj[key] + '\n';
		}
	}
	return str;
}

// alert all attribute in object (for debug)
function describe(obj, description){
	alert(objToString(obj, description));
}

function getRequestParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function getUnFormatNumberBy3(num) {
    var z = num.replace(/(\,)/g, "");
    return z;
}

function getFormatNumberBy3(num, decpoint, sep, isFillFraction, fraction_len, zeroAllow) {
    // check for missing parameters and use defaults if so
    if (arguments.length < 2) {
        sep = ",";
        decpoint = ".";
    }
    if (arguments.length < 3) {
        sep = ",";
    }
    if (arguments.length < 4) {
        isFillFraction = false;
    }
    if (arguments.length < 5) {
        fraction_len = 0;
    }
    if (arguments.length < 6) {
        zeroAllow = false;
    }


    // need a string for operations
    num = num.toString();
    if (num.indexOf(".") < 0) {
        num = num + decpoint;
    }

    // separate the whole number and the fraction if possible
    var a = num.split(decpoint);
    // decimal
    var x = a[0];
    // fraction
    var y = a[1];
    if (isFillFraction) {
        var padLen = 0;
        if (y != null) {
            padLen = fraction_len - y.length;
        }
        for (var j = 0; j < padLen; j++) {
            y = y + '0';
        }
    }

    var rexNumeric = /[0-9]/i;
    var strSign = "";
    if (x.length > 0) {
        strSign = x.substring(0, 1);
        if (!rexNumeric.test(strSign)) {
            x = x.substring(1, x.length);
        } else {
            strSign = "";
        }
    }

    var z = "";
    var result = "";

    if (typeof(x) != "undefined") {
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i) != sep?x.charAt(i):'';

        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        result = "";
        for (i = z.length - 1; i >= 0; i--)
            result += z.charAt(i);
        if (typeof(y) != "undefined" && y.length > 0) {
            result = result + decpoint + y;
        }
    }
    if (result.charAt(0) == '.') {
        result = '0' + result;
    }
    if ((getUnFormatNumberBy3(result) * 1) == 0) {
        if (!zeroAllow) {
            result = '';
        }
    }
    result = strSign + result;
    return result;
}

function calculateTotalAmt()
{
var resourcesTable = document.getElementById('resources');

if(resourcesTable)
{
		var listElements = resourcesTable.getElementsByTagName('tr');

		for (var i = 1; i < listElements.length; i++)
		{
				//alert(listElements[i].innerHTML);
		if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0)
		{
				//alert('Wood');
				var res = getElementsByClass(listElements[i], "count", false);
				woodAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0)
		{
				//alert('Wine');
				var res = getElementsByClass(listElements[i], "count", false);
				wineAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0)
		{
				//alert('Marble');
				var res = getElementsByClass(listElements[i], "count", false);
				marbleAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0)
		{
				//alert('Crystal Glass');
				var res = getElementsByClass(listElements[i], "count", false);
				crystalAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0)
		{
				//alert('Sulphur');
				var res = getElementsByClass(listElements[i], "count", false);
				sulphurAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
}

totalAmt = woodAmt+wineAmt+marbleAmt+crystalAmt+sulphurAmt;

//alert('Woods:'+woodAmt);
//alert('Wine:'+wineAmt);
//alert('marble:'+marbleAmt);
//alert('crystal:'+crystalAmt);
//alert('sulphur:'+sulphurAmt);
//alert('total:'+totalAmt);
}
}

function isTargetPage()
{
	if(document.body.id == 'safehouseReports')
	{
		var resourcesTable = document.getElementById('resources');
		if(resourcesTable)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		return false;
	}
}

function showTotal()
{
		var tbodys = document.getElementsByTagName('tbody');

		// Total
		totalElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Total Amount:';

		td2 = document.createElement("td");
		td2.innerHTML = getFormatNumberBy3(totalAmt, ".", ",", false, 0, true);

		totalElement.appendChild(td1);
		totalElement.appendChild(td2);

		//Warehouse Level
		levelElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Warehouse Level:';

		td2 = document.createElement("td");
		 var wareDiv = <>
								<input type="text" style="text-align: right;" size="8"  id="warehouseLevelId" value="0"/>  Ex. 3 or 1,2,3 for multi warehouse.
							</>;
		td2.innerHTML = wareDiv;
		td2.addEventListener("change",calculateShip,false);

		levelElement.appendChild(td1);
		levelElement.appendChild(td2);

		// Lootable Amount
		lootElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Lootable Amount:';

		td2 = document.createElement("td");
		td2.setAttribute("id","lootableId");
		td2.innerHTML = '0';

		lootElement.appendChild(td1);
		lootElement.appendChild(td2);

		// Ship Amount
		shipElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Ship Amount:';

		td2 = document.createElement("td");
		td2.setAttribute("id","shipId");
		td2.innerHTML = '0';

		shipElement.appendChild(td1);
		shipElement.appendChild(td2);

		//Back to hideout
		var backURL = document.getElementById("backTo").getElementsByTagName("a")[0].href.replaceAll("tab=reports","");
		backElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = <>
								<a
									href={backURL}
									title="Back to the hideout"> <img
									src="skin/buildings/y100/safehouse.gif"
									width="160" height="100" /> <span class="textLabel">&lt;&lt; Back to the Hideout(Hideout Tab)</span>
								</a>
								</>;

		backElement.appendChild(td1);
		backElement.appendChild(td2);

		// Enjoy!!
		enjoyElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = 'Enjoy!!  (Kabji Lambda Ikariam.org)';

		enjoyElement.appendChild(td1);
		enjoyElement.appendChild(td2);

		tbodys[0].appendChild(totalElement);
		tbodys[0].appendChild(levelElement);
		tbodys[0].appendChild(lootElement);
		tbodys[0].appendChild(shipElement);
		tbodys[0].appendChild(enjoyElement);
		tbodys[0].appendChild(backElement);
}

function validateInput()
{
	//validate input
		var level = document.getElementById('warehouseLevelId');
		var snp_LevelSplit = level.value.split(",");

		for (var i = 0; i < snp_LevelSplit.length; i++)
		{

			if(isNaN(snp_LevelSplit[i]))
			{
				alert('Please input only number');
				level.value='0';
				level.focus();
				return false;
			}else
			{
				if(parseInt(snp_LevelSplit[i]) > 31 || parseInt(snp_LevelSplit[i]) < 0)
				{
					alert('Please input only number(0-31)');
					level.value='0';
					level.focus();
					return false;
				}
			}
		}

		return true;
}

function calculateShip()
{
		if(!validateInput())
		{
			document.getElementById('warehouseLevelId').value = '0';
		}

		//find safe amt
			var level = document.getElementById('warehouseLevelId');
			var snp_LevelSplit = level.value.split(",");

			var snp_sumB = 0;
			var snp_sumW = 0;
			var snp_sumM = 0;
			var snp_sumC = 0;
			var snp_sumS = 0;
			
			for (var i = 0; i < snp_LevelSplit.length; i++)
			{
				if (typeof(data['warehouse'][snp_LevelSplit[i]]) != "undefined") {
						var b = data['warehouse'][snp_LevelSplit[i]].b;
						var w = data['warehouse'][snp_LevelSplit[i]].w;
						var m = data['warehouse'][snp_LevelSplit[i]].m;
						var c = data['warehouse'][snp_LevelSplit[i]].c;
						var s = data['warehouse'][snp_LevelSplit[i]].s;
						
						snp_sumB = snp_sumB + b;
						snp_sumW = snp_sumW + w;
						snp_sumM = snp_sumM + m;
						snp_sumC = snp_sumC + c;
						snp_sumS = snp_sumS + s;
				}
			}

			b = woodAmt - snp_sumB;
			w = wineAmt - snp_sumW;
			m = marbleAmt - snp_sumM;
			c = crystalAmt - snp_sumC;
			s = sulphurAmt - snp_sumS;

			if(b < 0) b = 0;
			if(w < 0) w = 0;
			if(m < 0) m = 0;
			if(c < 0) c = 0;
			if(s < 0) s = 0;

			lootableAmt = b + w + m + c + s;

			document.getElementById('lootableId').innerHTML = getFormatNumberBy3(lootableAmt, ".", ",", false, 0, true);

		// cal ship
			document.getElementById('shipId').innerHTML = Math.ceil(lootableAmt / 500);

		// save value
		//alert(getRequestParam("reportId"));
		GM_setValue(getRequestParam("reportId"),level.value);

}

function checkCurrentViewEqual(name)
{
		if(getRequestParam("view") == name)
		{
			return true;
		}else
		{
			return false;
		}
}

function findAndSaveWarehouseLevel()
{
	var snp_ware = getElementsByClass(document, "warehouse", false);

	for (var i = 0; i < snp_ware.length; i++)
	{
		var snp_wLevel = parseInt(snp_ware[i].getElementsByTagName("a")[0].title.split(" ")[snp_ware[i].getElementsByTagName("a")[0].title.split(" ").length-1].trim());
		//alert(buildingLevel);

		//find city id and city name
		var snp_cityId = getRequestParam("id");
		//alert(snp_cityId);

		var snp_cityName = getElementsByClass(document, "city", false)[0].innerHTML;
		//alert(snp_cityName);

		//save value
		GM_setValue(snp_cityId,snp_wLevel);
		GM_setValue(snp_cityName,snp_wLevel);
	}

}

function snpInit()
{
	// Warehouse Report
	if(isTargetPage())
	{
		//Calculate Amount
		calculateTotalAmt();

		//Insert Result
		showTotal();

		//get warehose level saved value
		var snp_townName = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
		//alert(snp_townName);
		var snp_saveLevel = GM_getValue(snp_townName,'0');
		if(snp_saveLevel == '0')
		{
			snp_saveLevel = GM_getValue(getRequestParam("reportId"),'0');
		}
		document.getElementById('warehouseLevelId').value = snp_saveLevel;

		//Caculate Ship and lootable amt
		calculateShip();
	}

	if(checkCurrentViewEqual("city"))
	{
		findAndSaveWarehouseLevel();
	}

}

snpInit();


// ==/UserScript==


// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 630px; z-index:99; display:block;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Go\" /></form>";






// ==UserScript==

// @include		   http://s*.ikariam.*/*

// ==/UserScript==
/*
 * This script comes from an idea of N-I-K-O.
 * It merge in a unique script 2 other scripts
 * IkariamMemberLastOnline (http://userscripts.org/scripts/show/34793) from Ektdeheba
 * Ikariam Ally's Memebers Info (http://userscripts.org/scripts/show/34852) from Luca Saba... wich is me :D
*/
/*
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter.... not needed anymore
 */
 
if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://iudis.mmxforge.net/images/stories/ikariam/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}
