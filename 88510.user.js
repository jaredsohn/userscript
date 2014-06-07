// ==UserScript==
// @name           Battledome Pet Selector
// @namespace      archonz.com
// @description    Selects battledome pet and attack stance. 
// @include        http://www.neopets.com/battledome/*
// ==/UserScript==

var petNumber = 1;
var petStance = 1;

if(location.href.match("player&subtype=challenge")){
		document.getElementsByTagName("select")[0].selectedIndex = petNumber;
}

if(location.href.match("fightid")){
	document.getElementsByTagName("center")[0].getElementsByTagName("select")[0].selectedIndex = petStance;
	var item1 = "activate_equip(1);";
	var item2 = "activate_equip(2);";
	location.href="javascript:" + item1 + item2;
}