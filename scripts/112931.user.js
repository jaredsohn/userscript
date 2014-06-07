// ==UserScript==
// @name           test_skin
// @namespace      none
// @include        http://spaceswars.fr/univers*
// @include        http://www.spaceswars.fr/univers*
// @include        http://www.spaceswars.com/univers*
// @include        http://www.spaceswars.com/univers*
// ==/UserScript==

if (document.getElementById("lm_dh"))
{
	var css = document.getElementsByTagName("link")[1];
	css.href = "http://niark.spaceswars.fr/SW_tools/Greasemonkey/Skin_by_NiArK/lm2.css";
}
else
{
	
	
	var css = document.getElementsByTagName("link");
	css[1].href = "http://niark.spaceswars.fr/SW_tools/Greasemonkey/Skin_by_NiArK/default2.css";

//css de la page
	var regPageName = /univers[49]\/(.*)\.php/;
	regPageName = regPageName.exec(window.location.href)[1];
	if (regPageName == "fleet" || regPageName == "floten1" || regPageName == "floten2" || regPageName == "floten3")
		css[2].href = "http://niark.spaceswars.fr/SW_tools/Greasemonkey/Skin_by_NiArK/fleet.css";
	else
		css[2].href = "http://niark.spaceswars.fr/SW_tools/Greasemonkey/Skin_by_NiArK/"+regPageName+".css";

	//bâtiments
	if (regPageName == "buildings")
	{
		var listNames = new Array();
				listNames["Mine de cristal"] = "0 -484px";
				listNames["Synthétiseur de deutérium"] = "0 -1089px";
				listNames["Centrale électrique solaire"] = "-121px -968px";
				listNames["Centrale électrique de fusion"] = "0 -121px";
				listNames["Usine de robots"] = "0 -242px";
				listNames["Usine de nanites"] = "0 -363px";
				listNames["Chantier spatial"] = "0 -605px";
				listNames["Entrepôt de métal"] = "0 -726px";
				listNames["Entrepôt de cristal"] = "0 -847px";
				listNames["Réservoir de deutérium"] = "0 -968px";
				listNames["Laboratoire de recherche"] = "-121px -363px";
				listNames["Terraformeur"] = "-121px -484px";
				listNames["Station de ravitaillement"] = "-121px -605px";
				listNames["Laboratoire avancé"] = "-121px -726px";
				listNames["Centre de formation"] = "-121px -847px";
				listNames["Silo de missiles"] = "-121px -242px";
				listNames["Base lunaire"] = "-121px -1089px";
				listNames["Phalange de capteur"] = "-121px 0";
				listNames["Porte de saut spatial"] = "-121px -121px";
		
		var bat = document.getElementsByClassName("buildings_1a1");
		for (var i=0; i<bat.length; i++)
		{
			bat[i].getElementsByTagName("div")[0].removeAttribute("style");
		}
		var bat = document.getElementsByClassName("buildings_1a1");
		var batTitle = document.getElementsByClassName("buildings_1b1");
		for (var i=0; i<bat.length; i++)
		{
			var batName = batTitle[3*i].getElementsByTagName("a")[0].textContent;
			bat[i].getElementsByTagName("div")[0].style.backgroundPosition = listNames[batName];
		}
	}
}