//
//  Adds a link to the Geocaching.com Map page to show a list of geocaches around the map centre.
//
// ==UserScript==
// @name	Geocaching.com Map to List
// @version	0.0.4
// @namespace	inge.org.uk/userscripts
// @description	Gives you a link to switch from the Geocaching Map page to a list of caches near the centre of the map.
// @include	http://www.geocaching.com/map/*
// @match	http://www.geocaching.com/map/*
// @copyright	2009-12, James Inge (http://geo.inge.org.uk/)
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// ==/UserScript==

// Change the variables below to false if you like the list to open in the same window, or want your own finds to show in the list.

var useNewTab = true;
var filterFinds = true;

var icon = "<img border=\'0\' style=\'position: relative; top: 3px;\' src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAK3RFWHRDcmVhdGlvbiBUaW1lAFdlZCA5IFNlcCAyMDA5IDE5OjU3OjAzIC0wMDAwmC%2BFwgAAAAd0SU1FB9kJCRMJORla5NQAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L%2FGEFAAAABnRSTlMAAAAAAABupgeRAAABh0lEQVR42mNkAANJPQ85cy8xVVMIl5GR8e%2Bfnwz%2FGf8zMl7fs%2B7%2B3n4GGGCEUG5N%2B5cVWDAxQbn%2F%2F0PJ119%2BLT394dHND4vK9CBSLBCKifE%2FKzNTfnY6Ly8vNzd3aHbz77%2F%2Ffv75by7PHWjKtY2FQcuv%2BtqmVoQGsIkM%2Bc1z4BYzMTIC7Xv%2B7rs8D3OalfD%2BY04oGoCOBjqgON6NHwwg9gRkNN1%2By%2Fjr3x8bBVZGJgYUJzGzsAItmbp0D4T7j%2BH%2F3%2F%2F%2Ff%2F3%2Bz87GzPSP8T8DEwsrG6ofmJj%2FMTBMa8vPrp6YFeWCbA8HB4dhSRUTEwuKBggAqgaS05btAdr25%2B%2F%2Ff%2F%2F%2Ff%2Fvz7%2Fff%2F8hqUDRMbc1Pq5iQH%2BuKZoN2SRV2DSW17QwM3%2Bev2PT337%2Bvf7nx2SDMxcDJzNDQXFnf0hMW6Ilmg0lFlTg%2FNhuAqoHkqvXbgWYCjf%2F79%2F%2Fvv3%2BBtuH0Q2NNCVYbyipw%2BIEYG5gYSASwtPTvf96Ci6AkxQhLWFD6PzTh%2FIOKAgAP47NK51EXOgAAAABJRU5ErkJggg%3D%3D\' alt=\'List\'/>";

var s = document.createElement("script");
s.type = "text/javascript";
s.innerHTML = [
	'var target = $("#search > h3");\
	target.after("<div><a style=\'font-weight:normal;\' id=\'listLink\' title=\'Show caches as list\' target=\'_top\'>', icon, ' List ',filterFinds?'unfound ':'','caches near map centre</a><br/></div>");\
	$("#listLink").click(list_fn);\
	function list_fn() {\
		var url = "http://www.geocaching.com/seek/nearest.aspx?lat=" + MapSettings.Map.getCenter().lat + "&lng=" + MapSettings.Map.getCenter().lng',
		filterFinds?'+ "&f=1";':';',
		useNewTab?'$("#listLink").attr("target", url);':'',
		'$("#listLink").attr("href", url);\
	}'
].join('');
	
document.documentElement.firstChild.appendChild(s);
