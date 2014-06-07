// ==UserScript==
// @name           Blog.hu komment szuro
// @namespace      vastagbor
// @include        http://*.blog.hu/*
// ==/UserScript==
// Szurendo felhasznalo azonositok.
var mutedIds = ['203600','3227','301164'];
// Helyettesitendo szoveg.
var replaceText = "Lényegtelen.";
var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	var profileURL = thisLink.getAttribute("href");
	var type = typeof profileURL;
	var killMe = false;
	var linktomb = profileURL.split("/");
	var hossz = linktomb.length;
	var userID = linktomb[hossz-1];
	for( var j = 0; j < mutedIds.length; j++ ) {
		var killUser = mutedIds[j];
		if(userID==killUser){
			//egyezest talaltam!
			var h4Node = thisLink.parentNode;
			var commentDiv = h4Node.parentNode.parentNode;
			commentDiv.innerHTML = replaceText;
			break;
		}
	}
}

//}

