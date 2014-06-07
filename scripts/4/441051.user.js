// ==UserScript==
// @name        Neopets pet finder
// @namespace   NPpetfinder
// @include     */petlookup*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @require	http://www.zoidberg25.com/jquery-1.11.0.min.js
// @updateURL	http://userscripts.org/scripts/source/441051.user.js
// @downloadURL	http://userscripts.org/scripts/source/441051.user.js
// ==/UserScript==

$("#main").before("<div style=\"position: fixed; top: 10px; left: 5px;\"><span id=\"autosearch\">Auto search pets</span></div>");
$("#autosearch").css({"background": "#5DC419", "border-radius": "5px", "padding": "5px", "cursor": "pointer", "font-size": "18px", "font-weight": "100"});
/*$("#autosearch").click(function(){autosearch()});*/

var searchstatus = GM_getValue("searchstatus", "disabled");
var adoptablepet = new Boolean();
adoptablepet = false;
var paintedpet = new Boolean();
paintedpet = false;
var negativestats = new Boolean();
negativestats = false;
var year1pet = new Boolean();
year1pet = false;


autosearch = function()
{
	url = $(location).attr('href');

	var str = url;
	var pattern = /[0-9]+$/;
	var number = url.match(pattern);
	url = url.replace(/[0-9]+$/, "");

	if(number) {
	   number++;
	   window.location = url + number;
	} else {
	   /*alert("This pet doesn't have a number! P.S. I love you baby");*/
	   window.location = url + "0";
	}
}

checkforpets = function()
{
	if ($(".contentModuleContent > a[href*='/pound/adopt.phtml?search=']").length > 0) {
		adoptablepet =  true;
		//alert("it's adoptable");
	}
	if ($("span:contains(\"Baby\")").length >= 1
	 || $("span:contains(\"Coconut\")").length >= 1
	 || $("span:contains(\"Darigan\")").length >= 1
	 || $("span:contains(\"Faerie\")").length >= 1
	 || $("span:contains(\"Grey\")").length >= 1
	 || $("span:contains(\"Halloween\")").length >= 1
	 || $("span:contains(\"Ice\")").length >= 1
	 || $("span:contains(\"Lost Desert\")").length >= 1
	 || $("span:contains(\"Mallow\")").length >= 1
	 || $("span:contains(\"Maraquan\")").length >= 1
	 || $("span:contains(\"MSP\")").length >= 1
	 || $("span:contains(\"Mutant\")").length >= 1
	 || $("span:contains(\"Plushie\")").length >= 1
	 || $("span:contains(\"Quiguki\")").length >= 1
	 || $("span:contains(\"Robot\")").length >= 1
	 || $("span:contains(\"Royal\")").length >= 1
	 || $("span:contains(\"Sponge\")").length >= 1
	 || $("span:contains(\"Tyrannian\")").length >= 1
	 || $("span:contains(\"Usuki\")").length >= 1) {
		paintedpet = true;
	}
	var HP = $(".content > table > tbody > tr > td:nth-of-type(3) > div.contentModule > table.contentModuleTable > tbody > tr:nth-of-type(2) > td.contentModuleContent > table > tbody > tr > td:nth-of-type(2) > font:first-of-type").text();
	var splitHP = HP.split('/'),
	HPlevel = splitHP[splitHP.length-1];
	FinalHP = parseInt(HPlevel);
	if (FinalHP <= 0) {
		negativestats = true;
	}
	var Year = $(".content > table > tbody > tr > td:nth-of-type(3) > div.contentModule > table.contentModuleTable > tbody > tr:nth-of-type(2) > td.contentModuleContent > table > tbody > tr > td:first-of-type").text();
	var splitYear = Year.split('('),
	FinalYear = splitYear[splitYear.length-1];
	var splitYear2 = FinalYear.split(')'),
	FinalYear2 = splitYear2[0];
	FinalYear3 = FinalYear2.replace(/\D/g,'');
	FinalYear4 = parseInt(FinalYear3);
	if (FinalYear4 <= 1) {
		year1pet = true;
	}

	if (adoptablepet == true && (paintedpet == true || negativestats == true || year1pet == true)) {
		GM_setValue("searchstatus", "disabled");
		//alert("Adoptable: "+adoptablepet+", Painted: "+paintedpet+", Negative Stats: "+negativestats+", Year 1 Pet: "+year1pet);
	} else {
		manualsearch();
	}
	
}

manualsearch = function()
{
	var searchstatus = GM_getValue("searchstatus");

	if (searchstatus == "enabled") {
		autosearch();
	} else {
		/*alert("it would've progressed, but it didn't!");*/
		/*GM_setValue("searchstatus", "disabled");*/
	}
}

$("#autosearch").mouseenter(function()
{
	GM_setValue("searchstatus", "enabled");
	var searchstatus = GM_getValue("searchstatus");
});

$("#autosearch").mouseout(function()
{
	GM_setValue("searchstatus", "disabled");
	var searchstatus = GM_getValue("searchstatus");
});

/*$("#autosearch").click(function(){
	var searchstatus = GM_getValue("searchstatus");

	if (searchstatus == "enabled") {
		alert("autosearch disabled");
		GM_setValue("searchstatus", "disabled");
	} else {
		alert("autosearch enabled");
		GM_setValue("searchstatus", "enabled");
	}
});*/

$(document).ready(function(){checkforpets();});
setInterval(manualsearch, 2500);