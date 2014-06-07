// ==UserScript==
// @name           	Ikariam lVdB Theme
// @description		Logvar vous a change les p'tites icones pour etre plus "Bacchusard" !!
//
// @include        	http://s*.*.ikariam.*/index.php*
// @include        	http://s*.ikariam.*/index.php*
// @include		http://*.*.ikariam.*/
// @include		http://*.ikariam.*/
// @include		http://*.ikariam.*/index.php
// @include		http://ikariam.*/index.php
//
// @exclude         http://*board*.ikariam.*
//
// @version 		0.10.05
// @author			Logvar, code d'origine de PhasmaExMachina
//
// @history             0.10.05 add include with new domain format (s6.fr.ikariam.com for exemple)
// @history		0.10.04 add ram unit to test functions
// @history 		0.10.03 add most used icons like resources to limit loaded time of most used pages
// @history 		0.10.00 On commence par les Adviser (en haut a droite)
//
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require 		http://userscripts.org/scripts/source/57756.user.js
//
// ------------- List of most used icons downloaded localy ---------------------
// @resource		skinMiscHomePage http://img214.imageshack.us/img214/7757/ikariamhome01.jpg
// --- Advisors ---
// @resource 		skinAdviserMayorActive http://img152.imageshack.us/img152/3824/mayor01active.png
// @resource 		skinAdviserMayor http://img695.imageshack.us/img695/21/mayor01.png
// @resource 		skinAdviserGeneralAttack http://img214.imageshack.us/img214/6096/general02alerte.png
// @resource 		skinAdviserGeneralActive http://img695.imageshack.us/img695/2196/general02active.png
// @resource 		skinAdviserGeneral http://img509.imageshack.us/img509/1818/general02.png
// @resource 		skinAdviserDiplomatActive http://img230.imageshack.us/img230/7137/diplomat03active.png
// @resource 		skinAdviserDiplomat http://img265.imageshack.us/img265/2949/diplomat03.png
// @resource 		skinAdviserScientistActive http://img684.imageshack.us/img684/8853/chercheur04active.png
// @resource 		skinAdviserScientist http://img101.imageshack.us/img101/2256/chercheur04.png
// --- Units -----
// @resource		skinUnitsRam40 http://a.imageshack.us/img838/4623/christiandubois40x40.png
// @resource		skinUnitsRam120 http://img686.imageshack.us/img686/1324/christiandubois120x100.png
// @resource		skinUnitsRam60.png http://a.imageshack.us/img651/6392/christiandubois60x60.png

// ----------------- End of List -------------------------
//
// ==/UserScript==
//
skin = {};

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
}

skin.addStyles = function() {
	//----------------------------------------- Text Colors ------------------------------------------------------------
	GM_addStyle("body { color:" + skin.text.base + "; }");
	GM_addStyle("#cityNav .textLabel { color:" + skin.text.cityNav + "; }");
	GM_addStyle("#advisors a .textLabel { color:" + skin.text.advisors + "; }");
	GM_addStyle(".contentBox h3.header{ color:" + skin.text.contentBoxHeader + "; }");
	//----------------------------------------- Advisors ---------------------------------------------------------------
	GM_addStyle("#advisors #advDiplomacy a.normal { background-image:url(" + GM_getResourceURL("skinAdviserDiplomat") + "); }");
	GM_addStyle("#advisors #advDiplomacy a.normalactive { background-image:url(" + GM_getResourceURL("skinAdviserDiplomatActive") + "); }");
	GM_addStyle("#advisors #advCities a.normal { background-image:url(" + GM_getResourceURL("skinAdviserMayor") + "); }");
	GM_addStyle("#advisors #advCities a.normalactive { background-image:url(" + GM_getResourceURL("skinAdviserMayorActive") + "); }");
	GM_addStyle("#advisors #advMilitary a.normal { background-image:url(" + GM_getResourceURL("skinAdviserGeneral") + "); }");
	GM_addStyle("#advisors #advMilitary a.normalactive { background-image:url(" + GM_getResourceURL("skinAdviserGeneralActive") + "); }");
	GM_addStyle("#advisors #advMilitary a.normalalert { background-image:url(" + GM_getResourceURL("skinAdviserGeneralAttack") + "); }");
	GM_addStyle("#advisors #advResearch a.normal { background-image:url(" + GM_getResourceURL("skinAdviserScientist") + "); }");
	GM_addStyle("#advisors #advResearch a.normalactive { background-image:url(" + GM_getResourceURL("skinAdviserScientistActive") + "); }");

}

// In skin.views[] functions, add all skins.replaceImage before and list of GM_addStyle
// have an image 120X100 and one 40X40 for each unit.
skin.views = {};

skin.views["barracks"] = function() {
	skin.replaceImage(/ram_r_120x100/, GM_getResourceURL('skinUnitsRam120'),  document.getElementById('mainview'));
	GM_addStyle("#unitConstructionList .ram { background:transparent url(" + GM_getResourceURL('skinUnitsRam40') + ") no-repeat scroll 6px 6px;");
}

//skin.view["cityMilitary-army"] = function() {
//GM_addStyle("#tab1 .content table + table th { background:url(" + GM_getResourceURL('skinUnitsRam60.png') + ") center center no-repeat; }");
//}

// fonctions d'affichage et de traitement des views
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


// lancement des fonctions
skin.declareStyles();
skin.addStyles();
skin.processView();

// home page
if(document.location.toString().match(/\/$/) || document.location.toString().match(/\/index\.php$/)) {
	GM_addStyle('#headlogo { background-image:url(' + GM_getResourceURL('skinMiscHomePage') + ') !important; }');
}