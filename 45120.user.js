// ==UserScript==
// @name           remove-marktplaats-ads
// @namespace      marktplaats
// @description    Removes some ads from marktplaats
// @include        http://www.marktplaats.nl/
// ==/UserScript==

function remove(a) {
	a.parentNode.removeChild(a);
}

function removeById(a) {
	var thiss;
	while((thiss=document.getElementById(a))!=null) {
		remove(thiss);
	}
}

var all, thiss;
try {
	removeById("AD");
	removeById("googleadstop");
	removeById("googleads");
	all = document.getElementsByTagName("td");
	for (var i = all.length-1; i>=0; i--) {
	    thiss = all[i];
		if (thiss!=null) {
		    var b=false;
			b|=thiss.className.match("admarkt")!=null;
			b|=thiss.className.match("ad_list_row_normal_paid")!=null;
			b|=thiss.className.match("ad_list_row_normal_no_top_paid")!=null;
			b|=thiss.className.match("ec_list")!=null;
			if (b) {
				remove(thiss.parentNode);
			}
		}
	}
} catch (e) {
  alert("remove-marktplaats-ads: "+e);
}
