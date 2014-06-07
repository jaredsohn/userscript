// ==UserScript==
// @name           	Ika simpson theme
// @description		Modifie les personnages en haut a droite avec un simpson Weed !!
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
// @version 		0.00.1
// @author			Logvar, code d'origine de PhasmaExMachina
//
//
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require 		http://userscripts.org/scripts/source/57756.user.js
//
// ------------- List of most used icons downloaded localy ---------------------
// @resource		skinMiscHomePage http://img214.imageshack.us/img214/7757/ikariamhome01.jpg
// --- Advisors ---
// @resource 		skinAdviserMayorActive http://img268.imageshack.us/img268/5982/villejn.jpg  
// @resource 		skinAdviserMayor http://img139.imageshack.us/img139/9124/villex.jpg 
// @resource 		skinAdviserGeneralAttack http://img195.imageshack.us/img195/5791/generalrp.jpg
// @resource 		skinAdviserGeneralActive http://img8.imageshack.us/img8/4493/generalja.jpg  
// @resource 		skinAdviserGeneral http://img405.imageshack.us/img405/5674/geneal.jpg 
// @resource 		skinAdviserDiplomatActive http://img194.imageshack.us/img194/8623/messagejv.jpg 
// @resource 		skinAdviserDiplomat http://img232.imageshack.us/img232/5281/messagem.jpg
// @resource 		skinAdviserScientist http://img38.imageshack.us/img38/2190/rechercheug.jpg 
// @resource 		skinAdviserScientistActive http://img16.imageshack.us/img16/9923/recherchej.jpg


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
/* Parameters are not set because we use GM_getResourceUrl methode with resource call in header
	skin.layout.advisors.diplomat = "http://img232.imageshack.us/i/messagem.jpg/";
	skin.layout.advisors.diplomat_active = "http://img194.imageshack.us/img194/8623/messagejv.jpg";
	skin.layout.advisors.general = "http://img405.imageshack.us/img405/5674/geneal.jpg";
	skin.layout.advisors.general_active = "http://img8.imageshack.us/img8/4493/generalja.jpg";
	skin.layout.advisors.general_alerte = "http://img195.imageshack.us/img195/5791/generalrp.jpg";
	skin.layout.advisors.mayor = "http://img139.imageshack.us/img139/9124/villex.jpg";
	skin.layout.advisors.mayor_active = "http://img268.imageshack.us/img268/5982/villejn.jpg";
	skin.layout.advisors.scientist = "http://img38.imageshack.us/img38/2190/rechercheug.jpg";
	skin.layout.advisors.scientist_active = "http://img16.imageshack.us/img16/9923/recherchej.jpg";
*/
	//----------------------------------------- Backgrounds ------------------------------------------------------------
//	skin.layout.bg_breadcrumbs = skin.url + "layout/bg_breadcrumbs.gif";
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
	//----------------------------------------- Backgrounds ------------------------------------------------------------
//	GM_addStyle("#breadcrumbs { background:transparent url(" + skin.layout.bg_breadcrumbs + ") no-repeat scroll 0 0; }");
}

// In skin.views[] functions, add all skins.replaceImage before and list of GM_addStyle
// have an image 120X100 and one 40X40 for each unit.
skin.views = {};

skin.views["barracks"] = function() {
	skin.replaceImage(/ram_r_120x100/, GM_getResourceURL('skinUnitsRam120'),  document.getElementById('mainview'));
	GM_addStyle("#unitConstructionList .ram { background:transparent url(" + GM_getResourceURL('skinUnitsRam40') + ") no-repeat scroll 6px 6px;");
}


/*
// Partie pour les militaires dans les RC et dans les occupations
//
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
*/


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