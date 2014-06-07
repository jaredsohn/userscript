// ==UserScript==
// @name           Add Link to a Tektek Search for Gaia Items
// @description    Adds a link for a tektek search for the gaia item you are viewing.
// @include        http://www.gaiaonline.com/marketplace/itemdetail/*
// @include        http://gaiaonline.com/marketplace/itemdetail/*
// ==/UserScript==
var get = document.getElementById('vend_item_title');
for (x=0;x<=x+x;x++) {
	if ( !(get.innerHTML.match(unescape('%20%20'))==null) || !(get.innerHTML.match(unescape('%0A'))==null) ) {
		get.innerHTML=get.innerHTML.replace(unescape('%20%20'),unescape('%20'));
		get.innerHTML=get.innerHTML.replace(unescape('%0A'),unescape('%20'));
	} else {
		break;
	}
}
if (get.innerHTML.charAt(unescape(get.innerHTML.length-1))==unescape('%20')) {
get.innerHTML=get.innerHTML.slice(0,get.innerHTML.length-1);
}
get.innerHTML='<table width="98%"><tr><td>'+get.innerHTML+'<td align="right">Search <a target="_blank" href="http://tektek.org">Tektek.org</a> for <a href="http://www.tektek.org/gaia/item_search.php?s='+get.innerHTML.replace(/ /,'&#32;')+'" target="_blank">'+get.innerHTML+'</a></td></tr></table>';