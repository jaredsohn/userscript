// ==UserScript==
// @name           SSW Mars Nextmonster
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Advances to the next monster on mars, saving you one whole click per battle!
// @include        http://www.secretsocietywars.com/index.php?p=monsters
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=mars&place=*
// ==/UserScript==

var frm;
var btn;
var loc;

if(document.location.href.indexOf('a=mars&place=') > -1) {
	GM_setValue("loc", document.location.href);
}

loc = GM_getValue("loc", false);
btn = document.evaluate('//input[@value="Go back to Mars."]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
frm = document.evaluate('//form[@action="http://www.secretsocietywars.com/index.php?p=planets&a=view_planet"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(loc && btn && frm) {
	frm.action = loc;
}
