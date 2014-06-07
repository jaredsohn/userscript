// ==UserScript==
// @name Liens moteurs NewsGroup sur BinnewZ
// @namespace www.binnews.in
// @description Ajoute des liens vers les moteurs nzb (BZNIdex, YabSearch & Binsearch) sur le site BinnewZ.
// @match http://*binnews.in/_bin/liste.php*
// @match http://*binnews.in/_bin/lastrefs.php*
// @match http://*binnews.in/_bin/search.php*
// @match http://*binnews.in/_bin/search2.php*
// @author JockerCool
// @version 0.0.1
// ==/UserScript==

function make_link(elem, cible, linkContent, search, last){
	var newLink = document.createElement("a");
	newLink.href = cible;
	newLink.target = "_blank";
	newLink.title = "Chercher " + search + " sur " + linkContent;
	newLink.alt = "Chercher " + search + " sur " + linkContent;
	newLink.appendChild(document.createTextNode(linkContent));
	elem.appendChild(newLink);
	if (last == false) {
		elem.appendChild(document.createTextNode(" | "));
	}
}

function buildNzbindexUrl(search) {
	return "http://www.nzbindex.nl/index.php?go=search&age=&results=250&sort=age_desc&searchitem=" + search;
}

function buildYabsearchUrl(search) {
	return "http://www.yabsearch.nl/search/" + search;
}

function buildBinsearchUrl(search) {
	return "http://www.binsearch.info/?max=250&adv_age=&server=1&q=" + search;
}

function add_links(){
	var search_array = document.getElementsByTagName("TD");
	for (var n=0; n < search_array.length; ++n){
		var Td = search_array[n];
		if(Td.innerHTML.match(/flag/)){
			var z = 1;
			do{
				++z;
			} while(search_array[n+z].innerHTML.match(/ng_id/));
			var newelem = search_array[n+z];
			var originalText = newelem.innerHTML;
			var req = originalText.replace(/ /g, "+");
			req = req.split("*").join(" "); 
			var div = document.createElement("span");
			var req_amp = req.replace("&amp;","&");
			var method1 = encodeURI(req).replace("&amp;","%26");
			var method2 = encodeURI(req_amp);
			var method3 = escape(req_amp);
			make_link(div, buildNzbindexUrl(method1), "NZBindex", originalText, false);
			make_link(div, buildYabsearchUrl(method2), "Yabsearch", originalText, false);
			make_link(div, buildBinsearchUrl(method3), "Binsearch", originalText, true);
			newelem.innerHTML = "";
			newelem.appendChild(div);
		}
	}
}

add_links();