// ==UserScript==
// @name		Purge facebook redirects
// @description	Purge facebook redirects
// @include 		https://*.facebook.com*
// ==/UserScript



// ==/UserScript==
(function() {
	setTimeout(function() {
		var redirectLinks = document.evaluate(
			"//a"
			, document
			, null
			, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			, null);
		
		if (typeof redirectLinks != 'undefined' && redirectLinks.snapshotLength > 0) {
		    var regexp = /(http.*?)"/;
			for (var i = 0; i < redirectLinks.snapshotLength; i++) {

				var onmouseover = redirectLinks.snapshotItem(i).getAttribute('onmouseover');
				
				if (onmouseover != null) {
				    var newlink = (regexp.exec(onmouseover)[1]).replace(/\\/g,"");
				    redirectLinks.snapshotItem(i).setAttribute('href',newlink);
				    redirectLinks.snapshotItem(i).setAttribute('onclick','');
    				redirectLinks.snapshotItem(i).setAttribute('onmouseover','');
				}
			} 
		}
		
	}, 1000);
	
})()