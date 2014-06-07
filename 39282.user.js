// ==UserScript==
// @name           Auto-Accept Facebook Friend Reqests
// @namespace      http://chrisda.wson.co.za
// @description    Accept all Facebook friend requests automatically
// @include        http://*facebook.com/reqs.php*
// ==/UserScript==

/*

Chris Dawson
http://chrisda.wson.co.za

2008.12.26

*/

(function() {

	var findPattern = "//div[@id='friend_add']//input[@class='inputbutton' and @value='Confirm']";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var i=0;
	while ( (res = results.snapshotItem(i) ) !=null ){
	    res.click();
	    i++;
	}

})();