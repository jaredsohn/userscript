// ==UserScript==
// @name	Search Romanian for Google
// @namespace   http://userscripts.org/
// @description    Displays a Search in Romania link on Google Search
// @include        http*://www.google.ro/*
// @exclude
// @version	00.1
// ==/UserScript==
//body {;




//alert("active");

	if(unsafeWindow.console){
	   var GM_log = unsafeWindow.console.log;
	}


	var t=setTimeout(function (){
	var snapResults = document.evaluate("//*[@class='mitem msel']", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
//alert(snapResults.snapshotLength);
	var node = snapResults.snapshotItem(0);
	
	node.parentNode.innerHTML = '<li class="mitem"><a href="#" onclick="location.href=location.href+\'&tbs=ctr:countryRO&cr=countryRO\'">Search only pages from Romania</a></li>' + node.parentNode.innerHTML;	
	
	},500)
	
	
	
	