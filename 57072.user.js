// ==UserScript==
// @name           Reddit WorkSafe
// @namespace      Allan Bogh
// @description    Hides certain links where the domain matches a list of domains.
// @include        http://www.reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

var excludeDomains = new Array();

//---Add or remove domains below---//
excludeDomains["fugly.com"] = true;
excludeDomains["backsidepotential.com"] = true;
excludeDomains["thechive.com"] = true;
excludeDomains["englishrussia.com"] = true;
excludeDomains["hq-models.blogspot.com"] = true;
excludeDomains["florencejohann.com"] = true;
excludeDomains["hollyhotty.com"] = true;
excludeDomains["jaylastarr.com"] = true;
excludeDomains["on205th.com"] = true;
excludeDomains["hailmaryjane.com"] = true;
excludeDomains["loqu.com"] = true;
excludeDomains["newfilmdimension.com"] = true;
excludeDomains["whatthechrist.com"] = true;
excludeDomains["backsidepotential.com"] = true;
excludeDomains["sharapovasthigh.com"] = true;
excludeDomains["thechive.com"] = true;
excludeDomains["gabbybabble.celebuzz.com"] = true;
excludeDomains["funtasticus.com"] = true;
excludeDomains["epiccarnival.com"] = true;
excludeDomains["drunkenstepfather.com"] = true;
excludeDomains["drdirty.net"] = true;
excludeDomains["nuas.nu"] = true;
excludeDomains["flabber.nl"] = true;
excludeDomains["subimg.net"] = true;
excludeDomains["wikiwig.com"] = true;
excludeDomains["nsfwpoa.com"] = true;
excludeDomains["xiggot.com"] = true;
excludeDomains["jblyth.com"] = true;
excludeDomains["picleecher.net"] = true;
excludeDomains["digitaldesire.com"] = true;



//---DO NOT EDIT BELOW---//
/* 
   If you decide to improve the script, please notify Allan Bogh
   on userscripts.org or message Buckwheat469 on Reddit.
*/
var taglines = document.getElementsByClassName("link");
var domain = null;
for(i=0, il=taglines.length; i < il; i++){
	domain = taglines[i].getElementsByClassName("domain");

	if(excludeDomains[domain[0].getElementsByTagName("a")[0].innerHTML]){
		taglines[i].style.display = "none";
	}
}