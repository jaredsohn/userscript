// ==UserScript==
// @name           Pigskin Empire: Total Draft Board Amount
// @namespace      GiantsFan23
// @include        http://*pigskinempire.com/draftboard.aspx
// ==/UserScript==


window.setTimeout( function() {
	main();
}, 100);

function main()
{
var ul = document.getElementById('draftlist');
var li=ul.getElementsByTagName('li').length;
var title = document.getElementById("ctl00_CPH1_lblDraftBoard");
var string = title.innerHTML;
string += " <br />Total: " + li;
title.innerHTML = string;
	
	
}
