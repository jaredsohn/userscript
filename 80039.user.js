// ==UserScript==
// @name           	Ikariam Sexy
// @description		Skin for Ikariam that changes some of the Ikariam artwork with some sexier images
// @namespace      	icariam
// @include        	http://s*.ikariam.*/index.php*
// @include			http://*.ikariam.*/
// @exclude         http://*board*.ikariam.*
// @version 		0.25
// @author			PhasmaExMachina
//
// @history 		0.25 Added options to show or hide certain elements
// @history 		0.24 Updated beachboys image
// @history 		0.23 Fixed display of defender units on troops in town view
// @history 		0.23 Updated troops view for cities in which you have deployed troops
// @history 		0.22 Fixed broken layout of sea unit help pages
// @history 		0.22 Added support for Ikariam Empire Board script
// @history 		0.21 Fixed sea battle detailed report page
// @history 		0.20 Added silhouette to header
// @history 		0.19 Changed header background (based on Fungah's Cutthroat theme)
// @history 		0.18 Combat reports and unit icons
// @history 		0.17 Fixed "View Troops in City" page for Ikariam v0.3.1
// @history 		0.17 Changed marksman unit image
// @history 		0.16 Added home page Ikariam logo
// @history 		0.15 Added warehouse image 
// @history 		0.14 Added missing general adviser alert (being attacked)
// @history 		0.13 Added automatic check for updates once every 24 hours
// @history 		0.13 Fixed dismiss units image on troops in town page
// @history 		0.13 Changed back to barracks image on troops in town page
// @history 		0.13 Changed back to barracks image on dismiss troops page
// @history 		0.12 Added military research image
// @history 		0.12 Updated misc. instances of library image
// @history 		0.11 Added Spear Thrower for Ikariam v0.3.2
// @history 		0.11 Added science and seafaring images to v0.3.2 research advisor
// @history 		0.11 Added seafaring image to login page
// @history 		0.10 Added tradegood worker
// @history 		0.10 Added wood worker
// @history 		0.10 Added battle report warrior icons
// @history 		0.10 Added citizens resource icons
// @history 		0.10 Added population icon

// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require         http://userscripts.org/scripts/source/57377.user.js
// @require 		http://userscripts.org/scripts/source/57756.user.js
// @require         http://userscripts.org/scripts/source/62718.user.js


// @resource		skinLayoutHeader http://lh6.ggpht.com/_1Nek0ZarHrk/Sun4W7MZjqI/AAAAAAAAADM/NkDiRlKeieI/header3.png
// @resource        skin/layout/bg_ocean.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/themes/cutthroat/ocean.jpg
// @resource        skin/layout/bg_sky.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/themes/cutthroat/sky.jpg

// @resource		skinBuildingsAcademy http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/academy.gif
// @resource		skinBuildingsBarracks http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/Barracks.gif
// @resource		skinBuildingsBranchoffice http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/branchoffice.gif
// @resource		skinBuildingsMuseum http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/museum.gif
// @resource		skinBuildingsPort http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/port.gif
// @resource		skinBuildingsSafehouse http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/safeHouse.gif
// @resource		skinBuildingsShipyard http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/shipyard.gif
// @resource		skinBuildingsTavern http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/tavern.gif
// @resource		skinBuildingsTownhall http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/townHall.gif
// @resource		skinBuildingsWall http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/wall.gif
// @resource		skinBuildingsWarehouse http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buildings/warehouse.gif
// @resource		skinBuildingsPalace http://www.speedbadminton.rs/ikariam/building_palace.png

// @resource		skinUnitsButtons http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/buttons_sprite2.gif
// @resource		skinUnitsSprites http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/unitsprites2.gif
// @resource		skinUnitsArcher40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/archer40.png
// @resource		skinUnitsArcher60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/archer60.png
// @resource		skinUnitsArcher120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/archer120.png
// @resource		skinUnitsBombardier40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/bombardier40.png
// @resource		skinUnitsBombardier60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/bombardier60.png
// @resource		skinUnitsBombardier120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/bombardier120.png
// @resource		skinUnitsCook40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/cook40.png
// @resource		skinUnitsCook60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/cook60.png
// @resource		skinUnitsCook120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/cook120.png
// @resource		skinUnitsGyrocopter40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gyrocopter40.png
// @resource		skinUnitsGyrocopter60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gyrocopter60.png
// @resource		skinUnitsGyrocopter120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gyrocopter120.png
// @resource		skinUnitsMarksman40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gunner_40.png
// @resource		skinUnitsMarksman60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gunner_60.png
// @resource		skinUnitsMarksman120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gunner_120.png
// @resource		skinUnitsMarksmanHelp http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/gunner_help.png
// @resource		skinUnitsMedic40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/medic40.png
// @resource		skinUnitsMedic60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/medic60.png
// @resource		skinUnitsMedic120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/medic120.png
// @resource		skinUnitsPhalanx40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/phalanx40.png
// @resource		skinUnitsPhalanx60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/phalanx60.png
// @resource		skinUnitsPhalanx120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/phalanx120.png
// @resource		skinUnitsSlinger40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/slinger40.png
// @resource		skinUnitsSlinger60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/slinger60.png
// @resource		skinUnitsSlinger120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/slinger120.png
// @resource		skinUnitsSpearman40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/spearthrower40.png
// @resource		skinUnitsSpearman60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/spearthrower60.png
// @resource		skinUnitsSpearman120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/spearthrower120.png
// @resource		skinUnitsSteamgiant40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/steamgiant40.png
// @resource		skinUnitsSteamgiant60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/steamgiant60.png
// @resource		skinUnitsSteamgiant120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/steamgiant120.png
// @resource		skinUnitsSwordsman40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/swordsman40.png
// @resource		skinUnitsSwordsman60 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/swordsman60.png
// @resource		skinUnitsSwordsman120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/swordsman120.png
// @resource		skinUnitsCitizen40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/citizen40.png
// @resource		skinUnitsCitizen http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/citizen.png
// @resource		skinUnitsCitizen120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/citizen120.png
// @resource		skinUnitsScientist40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/scientist40.png
// @resource		skinUnitsScientist http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/scientist.png
// @resource		skinUnitsScientist120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/scientist120.png
// @resource		skinUnitsSpy120 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/spy120.png
// @resource		skinUnitsTradeWorker40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/worker_tradegood40.png
// @resource		skinUnitsTradeWorker120_l http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/worker_tradegood120_l.png
// @resource		skinUnitsWarrior40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/warrior40.png
// @resource		skinUnitsWoodWorker40 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/lumberjack40.png
// @resource		skinUnitsWoodWorker120_l http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/lumberjack120_l.png

// @resource		skinMiscLibrary http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/library.jpg
// @resource		skinMiscScience http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/science.jpg
// @resource		skinMiscScienceChange http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/scienceChange.jpg
// @resource		skinMiscAcademyView http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/academyView.png
// @resource		skinMiscBarracksView http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/barracksView.png
// @resource		skinMiscMilitary http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/military.jpg
// @resource		skinMiscMilitaryChange http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/militaryChange.jpg
// @resource		skinMiscPortView http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/portview.png
// @resource		skinMiscSeafaring http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/seafaring.jpg
// @resource		skinMiscSeafaringChange http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/seafaringChange.jpg
// @resource		skinMiscWonder3 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/wonder3.png
// @resource		skinMiscWonder4 http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/wonder4.png
// @resource		skinMiscSpyEspionage http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/spy_espionage.png
// @resource		skinMiscCitizensIcon http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/citizen_icon.png
// @resource		skinMiscPopulationIcon http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/population_icon.png
// @resource		skinMiscDismissTroups http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/misc/militay-dismissed.jpg
// @resource		skinMiscHomePage http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/ikariam_home.jpg 
// @resource		skinMiscBeachboys http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/themes/beachboys.png

// @resource		skinAdviserGeneralAttack http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/advisers/general_attack.png

// ==/UserScript==

var startTime = new Date();

ScriptUpdater.check(56757, '0.25');

skin = {};
skin.url = "http://s558.photobucket.com/albums/ss26/jeromedane_bc/ikariam/fantasy_theme/";	// root location of images

Config.prefix = document.domain;
Config.settings = {
	"General":{
		html:'<p>Select the elements you would like replaced by this theme.</p>',
		fields:{
			showHeader:{
				type:'checkbox',
				label:'Header',
				text:'replace header background',
				value:true,
			},
			showAdvisors:{
				type:'checkbox',
				label:'Advisors',
				text:'replace advisor images',
				value:true,
			},
			showCrumbNav:{
				type:'checkbox',
				label:'Crumb Nav',
				text:'brown background for crumb navigation',
				value:true,
			},	
		}
	},
	"City":{
		html:'<p>Elements in city view</p>',
		fields:{
			showCityBg:{
				type:'checkbox',
				label:'City Backgrounds',
				text:'brown-roofed buildings (incomplete)',
				value:true,
			},
			showCityBuildings:{
				type:'checkbox',
				label:'Buildings',
				text:'brown roofs for main buildings (incomplete)',
				value:true,
			},
			showCityBeachboys:{
				type:'checkbox',
				label:'Beachboys',
				text:'replace beachboys image when shown',
				value:true,
			},		
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/59879" target="_blank" style="font-weight:bold !important;">Ikariam Sexy Theme v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/PhasmaExMachina" target="_blank">PhasmaExMachina</a>\
				<p>This script is designed to make your life easier when pillaging.</p>\
				<p>Please post all comments, fedbacks, and bugs <a href="http://userscripts.org/scripts/discuss/' + ScriptUpdater.scriptId + '" target="_blank">here</a>.</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Debug Mode',
				text:'show script execution time',
				value:false,
			}
		}
	}
};
Config.scriptName = 'Ikariam Sexy Theme';
IkaTools.addOptionsLink("Sexy Theme");

/*
GM_addStyle(".assignUnits li.doctor { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/doctor40.png); }");
GM_addStyle(".assignUnits li.archer { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/archer40.png); }");
GM_addStyle(".assignUnits li.cook { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/cook40.png); }");
GM_addStyle(".assignUnits li.phalanx { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/phalanx40.png); }");
GM_addStyle(".assignUnits li.swordsman { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/swordsman40.png); }");

GM_addStyle("#mainview, #breadcrumbs, #information { margin-top:10px; }");
GM_addStyle("body, #conExtraDiv1, #conExtraDiv2, #conExtraDiv3 { background:none; }");


GM_addStyle("#GF_toolbar a { color:#999; }");

GM_addStyle("#header { background-color:#282319; }");

GM_addStyle(".contentBox01, .contentBox01h { background-image:url(" + skin.folder + "bg_contentBox01.gif); }");
GM_addStyle(".contentBox01h h3.header { background-image:url(" + skin.folder + "bg_contentBox01h_header.gif); color:#8e7a56; line-height:12px; }");

GM_addStyle("#container .dynamic { background:transparent url(" + skin.folder + "bg_sidebox.gif) repeat-y scroll 0 0; }");
GM_addStyle("#container .dynamic h3.header { background:transparent url(" + skin.folder + "bg_sidebox_header.gif) no-repeat scroll 0 0; color:#8e7a56; }");
GM_addStyle("#container .dynamic div.footer { background:transparent url(" + skin.folder + "bg_sidebox_footer.gif) no-repeat scroll 0 0; }");
GM_addStyle("body { background-color:#282319; }");
GM_addStyle("#island #mainview { background-image:url(" + skin.folder + "bg_island.jpg); }");
*/

//GM_addStyle("#city #container #mainview #locations .barracks .buildingimg { background-image:url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/building_barracks.png); }");
//GM_addStyle("#barracks .buildingDescription { background:transparent url(http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/building_barracks.png) no-repeat scroll right 10px; }");


//---------------------------
// Declare Style Variables //
//---------------------------
skin.declareStyles= function() {
	//----------------------------------------- Text Colors ------------------------------------------------------------
	skin.text.base = "#542C0F";							// base text color (default is #542C0F)
	skin.text.advisors = skin.text.base;				// advisor label text color	(default is #542C0F)
	skin.text.cityNav = skin.text.base;				// city nav. text color	(default is #542C0F)
	skin.text.contentBoxHeader = "#333";				// content box header color (default is ##542C0F)
	//----------------------------------------- Advisors ---------------------------------------------------------------
	skin.layout.advisors.diplomat = skin.url + "layout/advisors/diplomat.png";
	skin.layout.advisors.diplomat_active = skin.url + "layout/advisors/diplomat_active.png";
	skin.layout.advisors.general = skin.url + "layout/advisors/general.png";
	skin.layout.advisors.general_active = skin.url + "layout/advisors/general_active.png";
	skin.layout.advisors.mayor = skin.url + "layout/advisors/mayor.png";
	skin.layout.advisors.mayor_active = skin.url + "layout/advisors/mayor_active.png";
	skin.layout.advisors.scientist = skin.url + "layout/advisors/scientist.png";
	skin.layout.advisors.scientist_active = skin.url + "layout/advisors/scientist_active.png";
	//----------------------------------------- Backgrounds ------------------------------------------------------------
	skin.layout.bg_breadcrumbs = skin.url + "layout/bg_breadcrumbs.gif";
//	skin.layout.bg_content = "/skin/layout/bg_content.jpg";
//	skin.layout.bg_footer = "/skin/layout/bg_footer.jpg";
	skin.layout.bg_ocean  = "/skin/layout/bg_ocean.jpg";
	skin.layout.bg_sky = "/skin/layout/bg_sky.jpg";
	skin.layout.bg_stone = "/skin/layout/bg_stone.jpg";
	skin.layout.corner_bottomleft = "/skin/layout/corner_bottomleft.gif";
	skin.layout.corner_bottomright = "/skin/layout/corner_bottomright.gif";
	//----------------------------------------- Buttons ----------------------------------------------------------------
	skin.layout.btn_city = "";
	//----------------------------------------- Icons ------------------------------------------------------------------
	skin.resources.icon_glass = "/skin/resources/icon_glass.gif";
	skin.resources.icon_marble = "/skin/resources/icon_marble.gif";
	skin.resources.icon_population = "/skin/resources/icon_population.gif";
	skin.resources.icon_sulfur = "/skin/resources/icon_sulfur.gif";
	skin.resources.icon_wine = "/skin/resources/icon_wine.gif";
	skin.resources.icon_wood = "/skin/resources/icon_wood.gif";

	//---------------------------------------- Misc Images ---------------------------------------------------------------
	skin.layout.militay_dismissed = "http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/militay-dismissed.jpg";
	skin.layout.spy_espionage = "http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/spy_espionage.png";	
	skin.layout.spy_test = skin.url + "layout/spy-test.jpg";

}

skin.addStyles = function() {
	//----------------------------------------- Text Colors ------------------------------------------------------------
	GM_addStyle("body { color:" + skin.text.base + "; }");
	GM_addStyle("#cityNav .textLabel { color:" + skin.text.cityNav + "; }");
	GM_addStyle("#advisors a .textLabel { color:" + skin.text.advisors + "; }");
	GM_addStyle(".contentBox h3.header{ color:" + skin.text.contentBoxHeader + "; }");
	//----------------------------------------- Advisors ---------------------------------------------------------------
	if(Config.get('showAdvisors')) {
		GM_addStyle("#advisors #advDiplomacy a.normal { background-image:url(" + skin.layout.advisors.diplomat + "); }");
		GM_addStyle("#advisors #advDiplomacy a.normalactive { background-image:url(" + skin.layout.advisors.diplomat_active + "); }");
		GM_addStyle("#advisors #advCities a.normal { background-image:url(" + skin.layout.advisors.mayor + "); }");
		GM_addStyle("#advisors #advCities a.normalactive { background-image:url(" + skin.layout.advisors.mayor_active + "); }");
		GM_addStyle("#advisors #advMilitary a.normal { background-image:url(" + skin.layout.advisors.general + "); }");
		GM_addStyle("#advisors #advMilitary a.normalactive { background-image:url(" + skin.layout.advisors.general_active + "); }");
		GM_addStyle("#advisors #advMilitary a.normalalert { background-image:url(" + GM_getResourceURL("skinAdviserGeneralAttack") + "); }");
		GM_addStyle("#advisors #advResearch a.normal { background-image:url(" + skin.layout.advisors.scientist + "); }");
		GM_addStyle("#advisors #advResearch a.normalactive { background-image:url(" + skin.layout.advisors.scientist_active + "); }");
	}
	//----------------------------------------- Backgrounds ------------------------------------------------------------
	if(Config.get('showCrumbNav')) { GM_addStyle("#breadcrumbs { background:transparent url(" + skin.layout.bg_breadcrumbs + ") no-repeat scroll 0 0; }"); }
//	GM_addStyle("#container2 { background-image:url(" + skin.layout.bg_content + "); }");
//	GM_addStyle("#footer { background-image:url(" + skin.layout.bg_footer + "); }");
	if(Config.get('showHeader')) { 
		GM_addStyle("#header { background:url(" + GM_getResourceURL("skinLayoutHeader") + ") no-repeat !important; }"); 
		GM_addStyle('#extraDiv1 { background-image:url(' + GM_getResourceURL('skin/layout/bg_sky.jpg') + ') !important; }');
		GM_addStyle('#extraDiv2 { background-image:url(' + GM_getResourceURL('skin/layout/bg_ocean.jpg') + ') !important; }');
	}
	
	GM_addStyle("body { background:#DBBE8C url(" + skin.layout.bg_stone + ") repeat scroll center top; }");
	//GM_addStyle("#conExtraDiv1 { background:transparent url(" + skin.layout.corner_bottomleft + ") no-repeat scroll left bottom; }");
	//GM_addStyle("#conExtraDiv2 { background:transparent url(" + skin.layout.corner_bottomright + ") no-repeat scroll right bottom; }");
	//----------------------------------------- Buildings ----------------------------------------------------------------
	//----------------------------------------- Icons ------------------------------------------------------------------
	GM_addStyle("#container ul.resources .glass { background-image:url(" + skin.resources.icon_glass + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .marble { background-image:url(" + skin.resources.icon_marble + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .population { background-image:url(" + skin.resources.icon_population + "); background-position: 2px 0; padding:left:40px; }");
	GM_addStyle("#container ul.resources .sulfur { background-image:url(" + skin.resources.icon_sulfur + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .wine { background-image:url(" + skin.resources.icon_wine + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .wood { background-image:url(" + skin.resources.icon_wood + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .citizens { background-image:url(" + GM_getResourceURL("skinMiscCitizensIcon") + "); background-position: 4px 2px; }");
	GM_addStyle("#container ul.resources .population { background-image:url(" + GM_getResourceURL("skinMiscPopulationIcon") + "); }");
	//---------------------------------------- Ikariam Empire Board Script
	GM_addStyle("\
		#EmpireBoard #EmpireBoardArmy th.slinger {background: url(" + GM_getResourceURL("skinUnitsSlinger40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.spearman {background: url(" + GM_getResourceURL("skinUnitsSpearman40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.swordsman {background: url(" + GM_getResourceURL("skinUnitsSwordsman40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.phalanx {background: url(" + GM_getResourceURL("skinUnitsPhalanx40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.archer {background: url(" + GM_getResourceURL("skinUnitsArcher40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.marksman {background: url(" + GM_getResourceURL("skinUnitsMarksman40") + ") no-repeat center 2px;}\
		#EmpireBoard #EmpireBoardArmy th.medic {background: url(" + GM_getResourceURL("skinUnitsMedic40") + ") no-repeat center 4px;}\
		#EmpireBoard #EmpireBoardArmy th.cook {background: url(" + GM_getResourceURL("skinUnitsCook40") + ") no-repeat center 1px;}\
		#EmpireBoard #EmpireBoardArmy th.gyrocopter {background: url(" + GM_getResourceURL("skinUnitsGyrocopter40") + ") no-repeat center -9px;}\
		#EmpireBoard #EmpireBoardArmy th.steamgiant {background: url(" + GM_getResourceURL("skinUnitsSteamgiant40") + ") no-repeat center -3px;}\
		#EmpireBoard #EmpireBoardArmy th.bombardier {background: url(" + GM_getResourceURL("skinUnitsBombardier40") + ") no-repeat center -14px;}\
	");
	
}

skin.views = {};
skin.views["academy"] = function() {
	GM_addStyle("#academy #mainview #setScientists .scientists { background-image:url(" + GM_getResourceURL('skinUnitsScientist120') +  "); background-position:5px; } ");	
	GM_addStyle("#academy #mainview #setScientists .citizens { background-image:url(" + GM_getResourceURL('skinUnitsCitizen120') +  "); background-position:-5px; } ");	
	GM_addStyle("#academy .buildingDescription { background-image:url(" + GM_getResourceURL('skinMiscAcademyView') +  "); } ");	
	GM_addStyle("#researchLibrary div.content img {display:none; }");
	GM_addStyle("#researchLibrary div.content { background:url(" + GM_getResourceURL('skinMiscLibrary') + ") top center no-repeat; padding-top:85px; }");
	skin.replaceImage(/area_knowledge/, GM_getResourceURL('skinMiscScience'), document.getElementById('researchFocus'));
	skin.replaceImage(/area_seafaring/, GM_getResourceURL('skinMiscSeafaring'), document.getElementById('researchFocus'));
}
skin.views["armyGarrisonEdit"] = function() {
	GM_addStyle("#backTo .content img { display:none; }");
	GM_addStyle("#backTo .content { padding-top:95px; background:url(" + GM_getResourceURL('skinMiscBarracksView') + ") center 5px no-repeat; }");
	skin.views.barracks();
}
skin.views["barracks"] = function() {
	GM_addStyle("#barracks .buildingDescription { background-image:url(" + GM_getResourceURL('skinMiscBarracksView') +  "); } ");		
	skin.replaceImage(/archer_r_120x100/, GM_getResourceURL('skinUnitsArcher120'),  document.getElementById('mainview'));
	skin.replaceImage(/bombardier_r_120x100/, GM_getResourceURL('skinUnitsBombardier120'),  document.getElementById('mainview'));
	skin.replaceImage(/cook_r_120x100/, GM_getResourceURL('skinUnitsCook120'),  document.getElementById('mainview'));
	skin.replaceImage(/gyrocopter_r_120x100/, GM_getResourceURL('skinUnitsGyrocopter120'),  document.getElementById('mainview'));
	skin.replaceImage(/marksman_r_120x100/, GM_getResourceURL('skinUnitsMarksman120'),  document.getElementById('mainview'));
	skin.replaceImage(/medic_r_120x100/, GM_getResourceURL('skinUnitsMedic120'),  document.getElementById('mainview'));
	skin.replaceImage(/phalanx_r_120x100/, GM_getResourceURL('skinUnitsPhalanx120'),  document.getElementById('mainview'));
	skin.replaceImage(/slinger_r_120x100/, GM_getResourceURL('skinUnitsSlinger120'),  document.getElementById('mainview'));
	skin.replaceImage(/spearman_r_120x100/, GM_getResourceURL('skinUnitsSpearman120'),  document.getElementById('mainview'));
	skin.replaceImage(/steamgiant_r_120x100/, GM_getResourceURL('skinUnitsSteamgiant120'),  document.getElementById('mainview'));
	skin.replaceImage(/swordsman_r_120x100/, GM_getResourceURL('skinUnitsSwordsman120'),  document.getElementById('mainview'));
	GM_addStyle("#unitConstructionList .archer { background:transparent url(" + GM_getResourceURL('skinUnitsArcher40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .bombardier { background:transparent url(" + GM_getResourceURL('skinUnitsBombardier40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .cook { background:transparent url(" + GM_getResourceURL('skinUnitsCook40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .gyrocopter { background:transparent url(" + GM_getResourceURL('skinUnitsGyrocopter40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .marksman { background:transparent url(" + GM_getResourceURL('skinUnitsMarksman40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .doctor { background:transparent url(" + skin.characters.military.doctor40 + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .phalanx { background:transparent url(" + GM_getResourceURL('skinUnitsPhalanx40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .slinger { background:transparent url(" + GM_getResourceURL('skinUnitsSlinger40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .spearman { background:transparent url(" + GM_getResourceURL('skinUnitsSpearman40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .steamgiant { background:transparent url(" + GM_getResourceURL('skinUnitsSteamgiant40') + ") no-repeat scroll 6px 6px;");
	GM_addStyle("#unitConstructionList .swordsman { background:transparent url(" + GM_getResourceURL('skinUnitsSwordsman40') + ") no-repeat scroll 6px 6px;");
}
skin.views["changeResearch"] = function() {
	GM_addStyle("#researchLibrary div.content img {display:none; }");
	GM_addStyle("#researchLibrary div.content { background:url(" + GM_getResourceURL('skinMiscLibrary') + ") top center no-repeat; padding-top:85px; }");
	GM_addStyle("#changeResearch #mainview ul li.knowledge { background-image:url(" + GM_getResourceURL('skinMiscScienceChange') + "); }");
	GM_addStyle("#changeResearch #mainview ul li.seafaring { background-image:url(" + GM_getResourceURL('skinMiscSeafaringChange') + "); }");
	GM_addStyle("#changeResearch #mainview ul li.military { background-image:url(" + GM_getResourceURL('skinMiscMilitaryChange') + "); }");
	skin.views["researchOverview"]();
}
skin.views["city"] = function() {
	var inspectMilitary = "http://i558.photobucket.com/albums/ss26/jeromedane_bc/ikariam%20anime/militaer_inspizieren.jpg";
	skin.replaceImage(/militaer_inspizieren/, inspectMilitary,  document.getElementById('reportInboxLeft'));
	
	if(Config.get('showCityBuildings')) {
		GM_addStyle("#city #container #mainview #locations .academy .buildingimg { background-image:url(" + GM_getResourceURL('skinBuildingsAcademy') + ") }");
		GM_addStyle("#city #container #mainview #locations .barracks .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsBarracks') + "); }");
		GM_addStyle("#city #container #mainview #locations .branchOffice .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsBranchoffice') + "); }");
		GM_addStyle("#city #container #mainview #locations .museum .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsMuseum') + "); }");
		GM_addStyle("#city #container #mainview #locations .port .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsPort') + "); }");
		GM_addStyle("#city #container #mainview #locations .safehouse .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsSafehouse') + "); }");
		GM_addStyle("#city #container #mainview #locations .shipyard .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsShipyard') + "); }");
		GM_addStyle("#city #container #mainview #locations .tavern .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsTavern') + "); }");
		GM_addStyle("#city #container #mainview #locations .townHall .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsTownhall') + "); }");
		GM_addStyle("#city #container #mainview #locations .wall .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsWall') + "); }");
		GM_addStyle("#city #container #mainview #locations .warehouse .buildingimg{ background-image:url(" + GM_getResourceURL('skinBuildingsWarehouse') + "); }");
	}
//	GM_addStyle("#city #container .phase1 { background-image:url(" + skin.url + "img/city/city_level1.jpg) }");
//	GM_addStyle("#city #container .phase2 { background-image:url(" + skin.url + "img/city/city_level2.jpg) }");
//	GM_addStyle("#city #container .phase3 { background-image:url(" + skin.url + "img/city/city_level3.jpg) }");
//	GM_addStyle("#city #container .phase4 { background-image:url(" + skin.url + "img/city/city_level4.jpg) }");
//	GM_addStyle("#city #container .phase5 { background-image:url(" + skin.url + "img/city/city_level5.jpg) }");
//	GM_addStyle("#city #container .phase6 { background-image:url(" + skin.url + "img/city/city_level6.jpg) }");
//	GM_addStyle("#city #container .phase7 { background-image:url(" + skin.url + "img/city/city_level7.jpg) }");
//	GM_addStyle("#city #container .phase8 { background-image:url(" + skin.url + "img/city/city_level8.jpg) }");
//	GM_addStyle("#city #container .phase9 { background-image:url(" + skin.url + "img/city/city_level9.jpg) }");
//	GM_addStyle("#city #container .phase10 { background-image:url(" + skin.url + "img/city/city_level10.jpg) }");
//	GM_addStyle("#city #container .phase11 { background-image:url(" + skin.url + "img/city/city_level11.jpg) }");
//	GM_addStyle("#city #container .phase12 { background-image:url(" + skin.url + "img/city/city_level12.jpg) }");
//	GM_addStyle("#city #container .phase13 { background-image:url(" + skin.url + "img/city/city_level13.jpg) }");
//	GM_addStyle("#city #container .phase14 { background-image:url(" + skin.url + "img/city/city_level14.jpg) }");
//	GM_addStyle("#city #container .phase15 { background-image:url(" + skin.url + "img/city/city_level15.jpg) }");
	if(Config.get('showCityBeachboys')) { GM_addStyle("#city #container #mainview #locations .beachboys { background-image:url(" + GM_getResourceURL('skinMiscBeachboys') + "); }"); }
}
skin.views["cityMilitary-army"] = function() {

	GM_addStyle("#tab1 .content th img { display:none; }");
	GM_addStyle("#tab1 .content th { height:65px; }");
		
	GM_addStyle("#tab1 .content th { background:url(" + GM_getResourceURL('skinUnitsPhalanx60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th { background:url(" + GM_getResourceURL('skinUnitsSteamgiant60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th + th { background:url(" + GM_getResourceURL('skinUnitsSpearman60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSwordsman60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSlinger60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsArcher60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMarksman60') + ") center center no-repeat; }");
	
	GM_addStyle("#tab1 .content table + table th { background:url(/skin/characters/military/x60_y60/y60_ram_faceright.gif) center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th { background:url(/skin/characters/military/x60_y60/y60_catapult_faceright.gif) center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th + th { background:url(/skin/characters/military/x60_y60/y60_mortar_faceright.gif) center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsGyrocopter60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsBombardier60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsCook60') + ") center center no-repeat; }");
	GM_addStyle("#tab1 .content table + table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMedic60') + ") center center no-repeat; }");
	
	
	GM_addStyle("\
		.contentBox01h  + .contentBox01h .content table th { background:none !important; }\
		.contentBox01h  + .contentBox01h .content table th + th { background:url(" + GM_getResourceURL('skinUnitsPhalanx60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th { background:url(" + GM_getResourceURL('skinUnitsSteamgiant60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSpearman60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSwordsman60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsSlinger60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsArcher60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table th + th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMarksman60') + ") center center no-repeat !important; }\
		\
		.contentBox01h  + .contentBox01h .content table + table th + th { background:url(/skin/characters/military/x60_y60/y60_ram_faceright.gif) center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th { background:url(/skin/characters/military/x60_y60/y60_catapult_faceright.gif) center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th + th { background:url(/skin/characters/military/x60_y60/y60_mortar_faceright.gif) center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsGyrocopter60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsBombardier60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsCook60') + ") center center no-repeat !important; }\
		.contentBox01h  + .contentBox01h .content table + table th + th + th + th + th + th + th + th { background:url(" + GM_getResourceURL('skinUnitsMedic60') + ") center center no-repeat !important; }\
	");
	
	GM_addStyle("#reportInboxLeft .content img { display:none; }");
	GM_addStyle("#reportInboxLeft .content { padding-top:85px; background:url(" + GM_getResourceURL('skinMiscDismissTroups') + ") center 0 no-repeat; }");
	
	GM_addStyle("#reportInboxLeft + div .content img { display:none; }");
	GM_addStyle("#reportInboxLeft + div .content { padding-top:95px; background:url(" + GM_getResourceURL('skinMiscBarracksView') + ") center 5px no-repeat; }");
}
skin.views["informations"] = function() {
	skin.replaceImage(/spy_espionage/, skin.layout.spy_espionage,  document.getElementById('mainview'));	
}
skin.views["island"] = function() {
	GM_addStyle("#island #islandfeatures .wonder3 { background-image:url(" + GM_getResourceURL('skinMiscWonder3') + "); }");
	GM_addStyle("#island #islandfeatures .wonder4 { background-image:url(" + GM_getResourceURL('skinMiscWonder4') + "); }");
}
skin.views["militaryAdvisorCombatReports"] = function() {
	GM_addStyle("table.operations tbody tr.taStats td.subject { background-image:url(" + GM_getResourceURL('skinUnitsWarrior40') + "); background-position:0 1px; }");	
}
skin.views["militaryAdvisorReportView"] = function() {
	GM_addStyle('#militaryAdvisorReportView #troopsReport table.overview th div.army { background-image:url(' + GM_getResourceURL('skinUnitsButtons') + '); }');
	
}
skin.views["militaryAdvisorDetailedReportView"] = function() {
	if(!$('#battlefield')[0].className.match(/sea_/)) {
		GM_addStyle('#events ul.unitlist li { background-image:url(' + GM_getResourceURL('skinUnitsSprites') + ') !important; }');
		$('#battlefield div ul li div:first-child').each(function() {
			if(!this.className.match(/empty|hitpoints/))
				this.style.backgroundImage = 'url(' + GM_getResourceURL('skinUnitsSprites') + ')';
		});
	}
}
skin.views["port"] = function() {
	GM_addStyle("#port .buildingDescription { background-image:url(" + GM_getResourceURL('skinMiscPortView') +  "); } ");	
}
skin.views["plunder"] = function() {
	GM_addStyle(".assignUnits li.archer { background-image:url(" + GM_getResourceURL('skinUnitsArcher40') + "); }");	
	GM_addStyle(".assignUnits li.bombardier { background-image:url(" + GM_getResourceURL('skinUnitsBombardier40') + "); }");	
	GM_addStyle(".assignUnits li.cook { background-image:url(" + GM_getResourceURL('skinUnitsCook40') + "); }");	
	GM_addStyle(".assignUnits li.gyrocopter { background-image:url(" + GM_getResourceURL('skinUnitsGyrocopter40') + "); }");	
	GM_addStyle(".assignUnits li.marksman { background-image:url(" + GM_getResourceURL('skinUnitsMarksman40') + "); }");	
	GM_addStyle(".assignUnits li.medic { background-image:url(" + GM_getResourceURL('skinUnitsMedic40') + "); }");	
	GM_addStyle(".assignUnits li.phalanx { background-image:url(" + GM_getResourceURL('skinUnitsPhalanx40') + "); }");	
	GM_addStyle(".assignUnits li.slinger { background-image:url(" + GM_getResourceURL('skinUnitsSlinger40') + "); }");	
	GM_addStyle(".assignUnits li.spearman { background-image:url(" + GM_getResourceURL('skinUnitsSpearman40') + "); }");	
	GM_addStyle(".assignUnits li.steamgiant { background-image:url(" + GM_getResourceURL('skinUnitsSteamgiant40') + "); }");	
	GM_addStyle(".assignUnits li.swordsman { background-image:url(" + GM_getResourceURL('skinUnitsSwordsman40') + "); }");	
}
skin.views["relatedCities"] = function() {
	GM_addStyle('#relatedCities #container #mainview .content .army div.troops .armybutton { background-image:url(' + GM_getResourceURL('skinUnitsButtons') + '); }');
}
skin.views["researchAdvisor"] = function() {
	GM_addStyle("#mainview .researchType .leftBranch img { display:none; padding-top:70px; }");
	GM_addStyle("#mainview .researchType .leftBranch .researchTypeLabel { margin-top:70px; }");
	GM_addStyle("#mainview .researchType .leftBranch { background-repeat:no-repeat; width:151px; }");
	$("#mainview .researchType .leftBranch").each(function(i) {
		switch(i) {
			case 0: this.style.backgroundImage = "url(" + GM_getResourceURL('skinMiscSeafaringChange') + ")"; break;
			case 1: this.style.backgroundImage = "url(http://s666.ikariam.org/skin/layout/changeResearchEconomy.jpg)"; break;
			case 2: this.style.backgroundImage = "url(" + GM_getResourceURL('skinMiscScienceChange') + ")"; break;
			case 3: this.style.backgroundImage = "url(" + GM_getResourceURL('skinMiscMilitaryChange') + ")"; break;
		}
	});
	GM_addStyle("#changeResearch #mainview ul li.seafaring { background-image:url(" + GM_getResourceURL('skinMiscSeafaringChange') + "); }");
	GM_addStyle("#researchLibrary div.content img {display:none; }");
	GM_addStyle("#researchLibrary div.content { background:url(" + GM_getResourceURL('skinMiscLibrary') + ") top center no-repeat; padding-top:85px; }");
}
skin.views["researchOverview"] = function() {
	skin.replaceImage(/academy/, GM_getResourceURL('skinMiscAcademyView'), document.getElementById('backTo'));
	var elems = document.getElementById('backTo').getElementsByTagName('img');
	elems[0].height = "120";
	elems[0].width = " 120";
	skin.views["academy"]();
}
skin.views["resource"] = function() {
	GM_addStyle("#mainview #setWorkers .citizens { background-image:url(" + GM_getResourceURL('skinUnitsCitizen120') +  "); background-position:-5px; } ");	
	GM_addStyle("#mainview #setWorkers .workers { background-image:url(" + GM_getResourceURL('skinUnitsWoodWorker120_l') +  "); background-position:-3px; } ");	
}
skin.views["safehouse"] = function() {
	GM_addStyle("#sendSpy p.desc { background:transparent url(" + GM_getResourceURL('skinMiscSpyEspionage') + ") no-repeat scroll 10px 0; }");	
	GM_addStyle("#safehouse #container #mainview div.spyinfo { background:transparent url(" + skin.layout.spy_test + ") no-repeat scroll 10px -10px; }");
	skin.replaceImage(/spy_120x100/, GM_getResourceURL('skinUnitsSpy120'),  document.getElementById('mainview'));	
}
skin.views["shipdescription"] = function() {
	GM_addStyle("#mainview { position:relative; }");
	GM_addStyle("#shipdescription div.contentBox01h { width:680px; float:left; top:40px; position:absolute; }");
	GM_addStyle("#shipdescription #container #unitRes { padding-top:0; }");
}
skin.views["townHall"] = function() {
	skin.replaceImage(/citizen_faceright/, GM_getResourceURL('skinUnitsCitizen'), document.getElementById('CityOverview'));
	skin.replaceImage(/woodworker/, GM_getResourceURL('skinUnitsWoodWorker40'), document.getElementById('CityOverview'));
	skin.replaceImage(/luxuryworker/, GM_getResourceURL('skinUnitsTradeWorker40'), document.getElementById('CityOverview'));
	skin.replaceImage(/scientist/, GM_getResourceURL('skinUnitsScientist40'), document.getElementById('PopulationGraph'));
	skin.replaceImage(/citizen/, GM_getResourceURL('skinUnitsCitizen40'), document.getElementById('PopulationGraph'));
}
skin.views["tradegood"] = function() {
	GM_addStyle("#mainview #setWorkers .citizens { background-image:url(" + GM_getResourceURL('skinUnitsCitizen120') +  "); background-position:-5px; } ");	
	GM_addStyle("#mainview #setWorkers .workers { background-image:url(" + GM_getResourceURL('skinUnitsTradeWorker120_l') +  "); background-position:-5px; } ");	
}
skin.views["unitdescription"] = function() { 
	GM_addStyle("#mainview { position:relative; }");
	GM_addStyle("#unitdescription div.contentBox01h { width:680px; float:left; top:40px; position:absolute; }");
	GM_addStyle("#unitdescription #container #unitRes { padding-top:0; }");
	GM_addStyle("#unitdescription #unit.s301 { background:url(http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/slinger200.png) no-repeat 90px 20px; }");
	GM_addStyle("#unitdescription #unit.s304 { background-image:url(" + GM_getResourceURL('skinUnitsMarksmanHelp') +  "); }");
//	http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/units/slinger200.png
	
	

}
skin.views["wonder"] = function() {
	GM_addStyle("#wonder #container #mainview #wonderbox .wonderPic3 { background-image:url(" + GM_getResourceURL('skinMiscWonder3') +  "); background-position:50px -10px; } ");	
	GM_addStyle("#wonder #container #mainview #wonderbox .wonderPic4 { background-image:url(" + GM_getResourceURL('skinMiscWonder4') +  "); background-position:50px 20px; } ");	
}
skin.views["wonderDetail"] = function() {
	skin.replaceImage(/wonder3/, GM_getResourceURL('skinMiscWonder3'), document.getElementById('mainview'));
	skin.replaceImage(/wonder4/, GM_getResourceURL('skinMiscWonder4'), document.getElementById('mainview'));
}
skin.views["workshop"] = function() {
	skin.replaceImage(/60_archer/, GM_getResourceURL('skinUnitArcher60'), document.getElementById('tab1'));
	skin.replaceImage(/60_bombardier/, GM_getResourceURL('skinUnitsBombardier60'), document.getElementById('tab1'));
	skin.replaceImage(/60_cook/, GM_getResourceURL('skinUnitsCook60'), document.getElementById('tab1'));
	skin.replaceImage(/60_gyrocopter/, GM_getResourceURL('skinUnitsGyrocopter60'), document.getElementById('tab1'));
	skin.replaceImage(/60_marksman/, GM_getResourceURL('skinUnitsMarksman60'), document.getElementById('tab1'));
	skin.replaceImage(/60_medic/, GM_getResourceURL('skinUnitsMedic60'), document.getElementById('tab1'));
	skin.replaceImage(/60_phalanx/, GM_getResourceURL('skinUnitsPhalanx60'), document.getElementById('tab1'));
	skin.replaceImage(/60_slinger/, GM_getResourceURL('skinUnitsSlinger60'), document.getElementById('tab1'));
	skin.replaceImage(/60_spearman/, GM_getResourceURL('skinUnitsSpearman60'), document.getElementById('tab1'));
	skin.replaceImage(/60_steamgiant/, GM_getResourceURL('skinUnitsSteamgiant60'), document.getElementById('tab1'));
	skin.replaceImage(/60_swordsman/, GM_getResourceURL('skinUnitsSwordsman60'), document.getElementById('tab1'));
}

skin.processView = function() {
	var view = document.getElementsByTagName('body')[0].id;
	if(typeof(skin.views[view]) == 'function') {
		skin.views[view]();
	}
}
skin.replaceImage = function(srcPattern, newSrc, context) {
	context = context ? context : document;
	var elems = context.getElementsByTagName('img');
	for(var i = 0; i < elems.length; i++) {
		if(elems[i].src.match(srcPattern)) {
			elems[i].src = newSrc;
		}
	}
}

skin.text = {};
skin.layout = {};
skin.layout.advisors = {};
skin.resources = {};
skin.characters = {};
skin.characters.military = {};

skin.declareStyles();
skin.addStyles();
skin.processView();

var elems = document.getElementsByTagName("img");
for(var i = 0; i < elems.length; i++) {
	if(elems[i].src.match(/40_archer/)) { elems[i].src = GM_getResourceURL('skinUnitsArcher40'); }
	if(elems[i].src.match(/40_bombardier/)) { elems[i].src = GM_getResourceURL('skinUnitsBombardier40'); }
	if(elems[i].src.match(/40_cook/)) { elems[i].src = GM_getResourceURL('skinUnitsCook40'); }
	if(elems[i].src.match(/40_gyrocopter/)) { elems[i].src = GM_getResourceURL('skinUnitsGyrocopter40'); }
	if(elems[i].src.match(/40_marksman/)) { elems[i].src = GM_getResourceURL('skinUnitsMarksman40'); }
	if(elems[i].src.match(/40_medic/)) { elems[i].src = GM_getResourceURL('skinUnitsMedic40'); }
	if(elems[i].src.match(/40_phalanx/)) { elems[i].src = GM_getResourceURL('skinUnitsPhalanx40'); }
	if(elems[i].src.match(/40_slinger/)) { elems[i].src = GM_getResourceURL('skinUnitsSlinger40'); }
	if(elems[i].src.match(/40_spearman/)) { elems[i].src = GM_getResourceURL('skinUnitsSpearman40'); }
	if(elems[i].src.match(/40_steamgiant/)) { elems[i].src = GM_getResourceURL('skinUnitsSteamgiant40'); }
	if(elems[i].src.match(/40_swordsman/)) { elems[i].src = GM_getResourceURL('skinUnitsSwordsman40'); }
}

// home page
if(document.location.toString().match(/\/$/) || document.location.toString().match(/\/index\.php$/)) {
	skin.replaceImage(/bild1/, GM_getResourceURL('skinMiscSeafaring'), document.getElementById('text'));	
	GM_addStyle('#headlogo { background-image:url(' + GM_getResourceURL('skinMiscHomePage') + ') !important; }');
}

var endTime = new Date();
if(Config.get('debugMode')) {
	IkaTools.config.debugMode = true;
	IkaTools.debug('Sexy Theme: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
}	