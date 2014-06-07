// ==UserScript==
// @name           Vitalist Upgrade remover
// @namespace      http://jtymes.net
// @description    Remove the banner that asks you to upgrade
// @include       http://*vitalist.com/dashboard/
// @include       http://*vitlast.com/dashboard
// @include	     http://my.vitalist.com/
// @include	     http://my.vitalist.com
// ==/UserScript==

var thep = document.getElementsByTagName('p');
var i = 0;
for (i; i<thep.length; i++) {
	if(thep[i].innerHTML.search("/You are using the <em>FREE<\/em> version of Vitalist\./i"))
		thep[i].parentNode.removeChild(thep[i]);
}

var ad = document.getElementById("ads");
ad.parentNode.removeChild(ad);

