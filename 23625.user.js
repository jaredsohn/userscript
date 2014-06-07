// Ikariam Extender user script
// version 0.6
// 2008-03-03
// Copyright (c) 2008, wphilipw
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ikariam Translation Helper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ikariam Translation Helper
// @description   Ikariam Translation Aid
// @include       *.ikariam.org/index.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var imgs = document.getElementsByTagName('img');
var options = document.getElementsByTagName('option');
var ths = document.getElementsByTagName('th');
var tds = document.getElementsByTagName('td');
var ps = document.getElementsByTagName('p');
var lis = document.getElementsByTagName('li');
var inputs = document.getElementsByTagName('input');
document.getElementsByClass = function(className) {
  var all = document.all ? document.all : document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}
for (var i = 0; i < links.length; i++) {
	links[i].innerHTML = links[i].innerHTML.replace(/Send circular message/gi, "Send Message to All Members");
	links[i].innerHTML = links[i].innerHTML.replace(/Friedensabkommen anbieten/gi, "Offer peace agreement");
	for(var x = 0; x < links[i].attributes.length; x++) {
		if(links[i].attributes[x].nodeName.toLowerCase() == 'title') {
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Allianz beitreten/gi, "Join Alliance");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/stufe/gi, "Level");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Inspect the selected town/gi, "Switch to the map of selected town");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Centre the selected town on the World Map/gi, "Switch to the world map centered on current city");
		}
	}
}
for (var i = 0; i < imgs.length; i++) {
	for(var x = 0; x < imgs[i].attributes.length; x++) {
		if(imgs[i].attributes[x].nodeName.toLowerCase() == 'title') {
			imgs[i].attributes[x].nodeValue = imgs[i].attributes[x].nodeValue.replace(/Gunsman/gi, "Marksman");
		}
	}
}
for (var i = 0; i < inputs.length; i++) {
	for(var x = 0; x < inputs[i].attributes.length; x++) {
		if(inputs[i].attributes[x].nodeName.toLowerCase() == 'value') {
			inputs[i].attributes[x].nodeValue = inputs[i].attributes[x].nodeValue.replace(/Ja!/gi, "Yes!");
		}
	}
}
for (var i = 0; i < options.length; i++) {
	options[i].innerHTML = options[i].innerHTML.replace(/Handelsabkommen[^a-zA-Z0-9]*anbieten/gi, "Offer trade agreement");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  anbieten/gi, "Offer cultural goods agreement");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  k[^n]*ndigen/gi, "Offer to exchange cultural goods");
	options[i].innerHTML = options[i].innerHTML.replace(/als gelesen markieren/gi, "Mark as read");
	options[i].innerHTML = options[i].innerHTML.replace(/l[^s]*schen/gi, "Delete");
	options[i].innerHTML = options[i].innerHTML.replace(/Aktion w[^h]*hlen/gi, "Choose action...");
	options[i].innerHTML = options[i].innerHTML.replace(/ausgegraut/gi, "out of points");
	options[i].innerHTML = options[i].innerHTML.replace(/Allianz Milit[^r]*rabkmmen[^a-zA-Z0-9]*To the town ([\sa-zA-Z0-9]*)anbieten/gi, "Offer Military Alliance to the town $1");
	options[i].innerHTML = options[i].innerHTML.replace(/stunden/gi, "hours");
	options[i].innerHTML = options[i].innerHTML.replace(/stunde/gi, "hour");
}
for (var i = 0; i < ps.length; i++) {
	ps[i].innerHTML = ps[i].innerHTML.replace(/Inspect troops, that are stationed in the town/gi, "Inspect troops that are stationed in the town.");
	ps[i].innerHTML = ps[i].innerHTML.replace(/Merchants and traders do their business at the trading post. There is always a deal to make or a bargain to hunt. Merchants from far away rather to head for big and well known trading posts!/gi, "Merchants do their business at the trading post. There is always a deal to be made or a bargain to be found here. Merchants from far away prefer heading for big, well known trading posts rather than smaller ones!");
}
for (var i = 0; i < ths.length; i++) {
	ths[i].innerHTML = ths[i].innerHTML.replace(/M[^g]*gliche Upgrades/gi, "Possible upgrades");
}
for (var i = 0; i < tds.length; i++) {
	tds[i].innerHTML = tds[i].innerHTML.replace(/Allianz Rundmail/gi, "Message to alliance members");
	tds[i].innerHTML = tds[i].innerHTML.replace(/[^A-Za-z0-9]xB4;/gi, "'");
	tds[i].innerHTML = tds[i].innerHTML.replace(/If we get to know all the other peoples, this will help us to make progress ourselves./gi, "Getting to know other cultures will help us make progress as well.");
}
for (var i = 0; i < lis.length; i++) {
	for(var x = 0; x < lis[i].attributes.length; x++) {
		if(lis[i].attributes[x].nodeName.toLowerCase() == 'title') {
			lis[i].attributes[x].nodeValue = lis[i].attributes[x].nodeValue.replace(/Kosten: ([0-9,]*) ([a-zA-Z\s]*)/gi, "Costs: $1 $2");
		}
	}
}