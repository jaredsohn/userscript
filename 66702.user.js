// ==UserScript==
// @name           GameKnot tournament tables on my games page
// @namespace      maeki.org
// @description    Show tournaments on "My Games" page
// @include        http://gameknot.com/play-chess.pl*
// ==/UserScript==

var soundDiv = document.getElementById('div_sound');

GM_xmlhttpRequest({ 
    method: 'GET', 
    url: 'http://gameknot.com/tournament.pl', 
    onload: function(responseDetails) {
        var parser = new DOMParser(); 
        var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
		html.innerHTML = responseDetails.responseText;
        doc.appendChild(html);
	    
        var allPps, thisPp; 
		allPps = doc.evaluate( "//div[@class='pp']", doc, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
		for (var i = 0; i < allPps.snapshotLength; i++) { 
			thisPp = allPps.snapshotItem(i); 
			var newElement = document.createElement('div');
			newElement.innerHTML = thisPp.innerHTML+"<br/><br/>";
			soundDiv.parentNode.insertBefore(newElement, soundDiv); 
			} 

        } 
}); 

