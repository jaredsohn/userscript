// ==UserScript==
// @name           PAPAZ Visited Links and Images
// @namespace      http://www.w3.org/1999/xhtml
// @description    Highlights Visited Links AND Images for easy identification.
// @version	2.05
// @include        *
// ==/UserScript== 

var VI=new String();

function ImON()
{
	GM_setValue(VI,1);

}
function ImOFF()
{
	GM_setValue(VI,0);

}
GM_registerMenuCommand( "Visited Images ON", ImON);
GM_registerMenuCommand( "Visited Images OFF", ImOFF);

var VII=GM_getValue(VI)

if (VII==1)
{
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);   a:link {font-weight:  bold !important; text-decoration: none !important;}  a:visited {font-weight: bold !important; text-decoration: line-through !important; color: #CC0000 !important } a:hover {font-weight: bold !important; text-decoration: none !important; color: #005E2F !important; background-color:rgba(245,230,0,0.3) !important;} a:visited img {border: 3px dotted #CC0000 !important;}"; 


if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

}
else 
{
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);   a:link {font-weight:  bold !important; text-decoration: none !important;}  a:visited {font-weight: bold !important; text-decoration: line-through !important; color: #CC0000 !important } a:hover {font-weight: bold !important; text-decoration: none !important; color: #005E2F !important; background-color:rgba(245,230,0,0.3) !important;}"; 



if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

}


