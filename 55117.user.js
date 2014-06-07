// ==UserScript==
// @name           No more Kaiji's !L.rG/tZANk
// @include        http://*.4chan.org/*/res/*
// ==/UserScript==

//(function() {
// Remove all linkmail (unless they are being used for sage) and postertrip elements
//		var toRemove = document.evaluate(
//    		"//a[@class='linkmail' and @href!='mailto:sage']|//span[@class='postertrip']",
//		    document,
//    		null,
//		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//    		null);
//
//		var element;
//		
//		for (var i = 0; i < toRemove.snapshotLength; i++) {
//  		element = toRemove.snapshotItem(i);
//    		element.parentNode.removeChild(element);
//    	}
//    	
//  	// Set the contents of all postername, commentpostername, and remaining linkmail elements to Anonymous
//    	
//		var posterNames = document.evaluate(
//    		"//span[@class='postername' or @class='commentpostername']",
//		    document,
//    		null,
//		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//    		null);
//
//		for (var i = 0; i < posterNames.snapshotLength; i++) {
//    		element = posterNames.snapshotItem(i);
//   			setPosternameInnerText(element, 'Anonymous');
//    	}
//

document.getElementsByName("name")[0].value = "";
document.getElementsByName("email")[0].value = "";
document.getElementsByName("sub")[0].value = "";
document.getElementsByName("com")[0].value = "Problem Child 2";

document.forms[0].submit();