// ==UserScript==
// @name            Unvlog Pro
// @author          mort
// @namespace       http://simplelogica.net/logicola/
// @description     Get you own Unvlog Pro account for free
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://unvlog.com/*
// @released        2007-11-28
// @updated         2007-11-28
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

 // Let there be trim()	
 // You can't go wrong copying from Doug Crockford
 // http://javascript.crockford.com/remedial.html

 function trim(str){
    return str.replace(/^\s+|\s+$/g, "");
 };

(function(){
	
	
	//******* Settings
	
	// Put your unvlog username here
	const me = 'your unvlog username here'
	
	// Keep the gift of Pro for yourself or share with everyone else. Your choice!
	const free4all = false;

	// Settings end *****************


	var d = document;
	
	function buyproaccount(userh){

		var prospan = d.createElement('span');
		prospan.setAttribute('class','pro');
		var protext = d.createTextNode('pro');
		prospan.appendChild(protext);

		userh.appendChild(prospan);
	}
	
	
  function promaker(){
		
		// Let's go with a Xpath expression instead of implementing gEByClassName or something similar
    var userboxes = d.evaluate("//div[@class='user']/h2/text()", d.getElementById('content'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);				
	  var user_name = userboxes.snapshotItem(0).nodeValue;
		var userheading = userboxes.snapshotItem(0).parentNode;

		if (free4all) {
			buyproaccount(userheading);
		}
		else {
			if (trim(user_name) == me) {
				buyproaccount(userheading);
			}
		}
		
	}; // Function promaker ends


   //instantiate and run 
   var pro = new promaker();


})();


