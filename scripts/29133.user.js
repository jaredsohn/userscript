// ==UserScript==
// @name         Bleach
// @namespace    Brandyn
// @description	  Downloads Bleach episodes automaticaly
// @include       http://*
// ==/UserScript==
//

var domainnames = ['bleachportal.net/','dl.php/Bleach/anime/bp-mkv/'];
var ipaddresses = ['67.159.54.100/','dl.php/5f13c10/Bleach/anime/bp-mkv/'];	

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
