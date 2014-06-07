// ==UserScript==
// @name           Screw By SW
// @namespace      http://userscripts.org/ 
// @description    Removes references to that festival in Austin from your Twitter stream, by a jealous and broke Tyler Kremberg (www.myinitialsare.tk)
// @include        http://twitter.com/*
// ==/UserScript==

(function() {

	var regex, key, tweettexts, node, tweet_to_inspect, tweet_to_remove; 
	var stupid_things = { "SXSW" : "", "SxSW" : "", "austin": "", "Austin" : "", "sxsw" : ""  };
	
	regex = {}; 
	for (key in stupid_things) { 
	    regex[key] = new RegExp(key, 'g'); 
	} 
	
	tweettexts = document.evaluate( "//*[@class='entry-content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	
	for (var i = 0; i < tweettexts.snapshotLength; i++) { 
		tweet_to_inspect = tweettexts.snapshotItem(i);
	    node = tweet_to_inspect.textContent;
		//console.log("Tweet Says: " + node);
		
	    for (key in stupid_things) { 
			if (regex[key].test(tweet_to_inspect.textContent))  {
					tweet_to_remove = tweettexts.snapshotItem(i).parentNode.parentNode;
					//	console.log("Remove that Annoying Tweet, element id: " + tweet_to_remove.id);
					tweet_to_remove.parentNode.removeChild(tweet_to_remove);
				}
	    } 
	} 

})();