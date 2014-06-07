// ==UserScript==
// @name         Private
// @namespace    
// @description	  Substitui o nome do site pelo IP
// @include       
// ==/UserScript==
//
//   v1.0 - 06/03/2010
//
//  sobre:  script privado...
//  
//


var domainnames = ['http://www.tribalwars.com.br','http://www.travian.pt','http://www.thecrims.com','http://www.google.pt'];
var ipaddresses = ['212.48.106.216','92.51.158.110','67.15.137.105','209.85.229.104'];

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	for (var j = 0; j < domainnames.length; j++) {
		if (thisLink.href.match(domainnames[j])) {
			thisLink.href = thisLink.href.replace(domainnames[j], ipaddresses[j]);
		}
	}
}