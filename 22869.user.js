// ==UserScript==
// @name           Goblinz.net Treasure Cove
// @namespace      http://www.dp.cx/userscripts
// @include        http://www.goblinz.net/treasure_cove/*
// ==/UserScript==

var energy_xpath = "/html/body/table[@id='wrapper']/tbody/tr[2]/td/table[@id='tbox']/tbody/tr[2]/td/b";
var coves_xpath = "/html/body/table[@id='wrapper']/tbody/tr[2]/td/table[@id='tbox']/tbody/tr[3]/td/table/tbody/tr/td/a";

var energy = document.evaluate(energy_xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var coves = document.evaluate(coves_xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var energyvalue = energy.snapshotItem(0).innerHTML;
var covelength = coves.snapshotLength;

if (energyvalue > 0) {
	// random cove number
	var covenum = Math.floor(Math.random()*covelength);
	
	// because this page redirects, we don't have to worry about handling anything afterwards
	location.href = coves.snapshotItem(covenum);
}