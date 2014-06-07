// ==UserScript==
// @name           Auto-Accept Facebook Friend Reqests
// @namespace      xxx
// @description    Accept all Facebook friend requests automatically
// @include        http://*facebook.com/reqs.php*
// ==/UserScript==

/*

xxx
xxx

xxx

*/

(function() {

	var findPattern = "//div[@id='friend_connect']//input[@class='inputbutton' and @value='Confirm']";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var i=0;
	while ( (res = results.snapshotItem(i) ) !=null ){
	    res.click();
	    i++;
	}

})();