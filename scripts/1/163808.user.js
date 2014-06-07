// ==UserScript==
// @name        MarkForClick
// @namespace   Uni
// @include     http://unicreatures.com/explore.php?area=*
// @version     1
// ==/UserScript==


var allLinks = document.getElementsByTagName('a');

for (var i=0;i<allLinks.length;i++){

	if((allLinks[i].href).match(/explore.php.*key/)){
		allLinks[i].focus();
	}

}

