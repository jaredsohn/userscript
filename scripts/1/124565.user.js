// ==UserScript==
// @name           TabCloseSeveralSeconds
// @namespace      http://www.trojanbear.net/
// @description    Close a Tab after several seconds automatically
// @include        http://thecolourclock.co.uk/
// ==/UserScript==

//You have to change a setting before use this script.
//    1. Open about:config page.
//    2. check a value of dom.allow_scripts_to_close_windows .
//    3. Set it's value as true.



(function() {

var SECOND = 90;	// Time to wait (seconds). 
var scriptVersion = "1.0";



	function closeTab() {
		this.window.close();
	}


  id = setInterval(closeTab, SECOND * 1000);



})();













