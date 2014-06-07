// ==UserScript==
// @name           BBAW Numbering
// @namespace      com.bbaw.appnumbers
// @description    Number the product listing pages
// @include        https://appworld.blackberry.com/webstore/toppaid*
// @include        https://appworld.blackberry.com/webstore/topfree*
// @include        https://appworld.blackberry.com/webstore/newest*
// @include        http://appworld.blackberry.com/webstore/toppaid*
// @include        http://appworld.blackberry.com/webstore/topfree*
// @include        http://appworld.blackberry.com/webstore/newest*
// ==/UserScript==

var i=0;
var divlist = document.getElementsByTagName("div");
var count = 0;

for (i=0;i<=divlist.length;i++)
{
	var divnode = divlist[i];
	
	if(!divnode)
		break;

	if(!divnode.id || divnode.id != "j_idt1030") {
		continue;
	}

	var anode = divnode.children[0].children[0].children[0];
	anode.innerHTML = "" + (count + 1) + ". " + anode.innerHTML;

	count++;	
}