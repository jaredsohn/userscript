
// ==UserScript==
// @name           Auto Accept Facebook Friend Requests
// @namespace      http://www.korkodili.com
// @description    Accept all Facebook friend requests automatically 2010
// @include        http://*facebook.com/reqs.php*
// ==/UserScript==

/*

g00gl3

http://www.korkodili.com

2010.11.06

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