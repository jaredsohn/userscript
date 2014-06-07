// ==UserScript==
// @name           	eBay Location Linker
// @namespace      	http://stmenzel.mine.nu
// @description    	Changes the item location on eBay to a link to Google Maps with a route from your hometown to the actual location already drawn. (Works currently only on eBay in German.)
// @include        	http://*ebay.de*
// @grant			none
// ToDo:			-Create international version.
// ==/UserScript==

var local = 'Berlin'; 		//your home address 
var glink = 'http://maps.google.de/maps?saddr=' + local + '&daddr='; //the Google Maps syntax

var alldivs = document.evaluate(
    '//div',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// alert('found ' + alldivs.snapshotLength + ' instances');
var limit=alldivs.snapshotLength
for (var i = 0; i < alldivs.snapshotLength; i++) {
	var thisdiv = alldivs.snapshotItem(i);
	//alert(i + ' von ' + limit + '\n' + thisdiv.innerHTML);
	//alert(i + ' von ' + limit + '\n' + thisdiv.innerHTML.substring(2,17));
	if (thisdiv.innerHTML.substring(2,17) === "Artikelstandort") {
		//alert(thisdiv.innerHTML.substring(2,17));
		//old ebay version: var location = thisdiv.innerHTML.substring(35,thisdiv.innerHTML.length-7)
		var location = alldivs.snapshotItem(i+1).innerHTML;
		//alert(location);
		//old ebay version: thisdiv.innerHTML = thisdiv.innerHTML.replace(thisdiv.innerHTML.substring(17,thisdiv.innerHTML.length), ...
		alldivs.snapshotItem(i+1).innerHTML = alldivs.snapshotItem(i+1).innerHTML.replace(alldivs.snapshotItem(i+1).innerHTML.substring(0,alldivs.snapshotItem(i+1).innerHTML.length), '<a target="_blank" href="' + 
		glink + 
		location +
		'">' +
		location +
		'</a>');
	}
}