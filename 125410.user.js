// ==UserScript==
// @name        coord to gcffm
// @namespace   http://gcffm.de
// @description	You can change the geocode-link from coord.info to gcffm.de
// @include     http://www.geocaching.com/seek/cache_details*
// @copyright   2012, Tobias Riefer (http://tobiasriefer.de)
// @version	    1.0
// ==/UserScript==
var target = document.getElementById('dlgClipboard');
var source = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');
if( target && source ) {
	var i = document.createElement("img");
    var neues_div = document.createElement("textarea");
    var text = document.createTextNode("http://gcffm.de/f/" + source.innerHTML);
	i.src = "http://gcffm.de/pics/facebook_avatar.png";
	i.style.width = "50px";
	i.style.height = "50px";
    i.style.marginTop = "15px";
	i.alt = "http://gcffm.de";
	target.appendChild(i);
    neues_div.appendChild(text);
    neues_div.style.border = "1px solid #ff0000";
    neues_div.style.marginTop = "10px";
    neues_div.style.padding = "5px";
    neues_div.style.width = "210px";
    neues_div.style.height = "18px";
    document.getElementById("dlgClipboard").appendChild(neues_div);
    target.style.height = "150px";
}