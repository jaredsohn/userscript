// ==UserScript==
// @name hidemyg
// @namespace http://www.travian.de/
// @description hides mygame links in T4
// @include http://*t*.travian.*
// ==/UserScript==

function hidemyg() {
var mygm = document.getElementsById("myGameLinkMessages").;
var mygp = document.getElementsById("myGameLinkPlayerProfile");
var myga = document.getElementsById("myGameLinkAllianceProfile");
mygm.style.visibility = 'hidden';
mygp.style.visibility = 'hidden';
myga.style.visibility = 'hidden';
};

/*
var tab = document.getElementsByTagName('div');

<div title="Farmlist" class="container normal">
	<div class="background-start">&nbsp;</div>
	<div class="background-end">&nbsp;</div>
	<a href="build.php?tt=2&amp;id=39" class="tabItem">Truppen schicken<img src="img/x.gif" class="favorIcon" /></a>
</div>
*/

hidemyg();