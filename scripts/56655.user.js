// ==UserScript==
// @name            NWS Metrify
// @author          Jakob van Santen
// @namespace       http://www.example.url/to/your-web-site/
// @description     Replace imperial units on National Weather Service forecast pages with metric equivalents
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://forecast.weather.gov/MapClick.php?*
// @released        2009-08-29
// @updated         2009-08-29
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

(function(){
	// conversions for each unit
	function celcius(fahrenheit) {
		var out = (fahrenheit - 32)*(5.0/9.0);
		return out;
	};
	function kph(mph) {
		return mph*1.609344;
	}
	function meters(feet) {
		return feet*0.3048;
	}
	
	// object definition
	function metrify(){
		this.banish_fahrenheit();
	};
	metrify.prototype.banish_fahrenheit = function() {
		var operations, textnodes;
		
		// replacements for each unit type
		// these will be applied in order, so operations that don't explicity
		// match a unit type should go last!
		operations = [
			{ // speed range
				patterns: [/(\d+)(\s+and\s+)(\d+)(\s+mph)/g],
				replacement: function($0,$1,$2,$3) { return Math.round(kph($1)) + $2 + Math.round(kph($3)) + " kph"}
			},
			{ // speed
				patterns: [/(\d+)(\s+mph)/gi],
				replacement: function($0,$1) { return Math.round(kph($1)) + " kph"}
			},
			{ // elevation
				patterns: [/()(\d+)(\sf(ee)?t\.?)/g, /(Elev:\s+)(\d+)/g],
				replacement: function($0,$1,$2) { return $1 + Math.round(meters($2)) + " m"}
			},
			{ // temperature
				patterns: [/(high\s+near\s+)(\d+)/g, /(low\s+around\s+)(\d+)/g, /()(\d+)\s?\u00B0F/g],
				replacement: function($0,$1,$2) { return $1 + Math.round(celcius($2)) + " \u00B0C"}
			}
		];

		// get all text nodes of the document
		textnodes = document.evaluate(
			"//text()",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			
		// loop over each text node
		for (var i = 0; i < textnodes.snapshotLength; i++) {
		    var node = textnodes.snapshotItem(i);
		    var s = node.data;
		    // apply each operation
		    for (var j in operations) {
				var operation = operations[j];
				for (k in operation.patterns) {
					s = s.replace(operation.patterns[k],operation.replacement);
				}
			}
			// replace text
		    node.data = s;
		}
	};

    //instantiate and run 
	var metrifier = new metrify();

})();
