// ==UserScript==
// @name          gutalk_ignore
// @description	  ignore specified users in page
// @include       http://talk.guardian.co.uk/*
// ==/UserScript==

//this is the list of userids to ignore - edit to your own preferences
blocked_ids = new Array('userid1','userid2','etc');

var allElements, thisElement;
allElements = document.getElementsByTagName('font');
for (var i=0; i < allElements.length; i++) {
	thisElement = allElements[i];
	for (var j=0; j<blocked_ids.length; j++) {
		thisBlockedId=blocked_ids[j];
		if (thisElement.innerHTML.match(thisBlockedId)) {
			allElements[i+3].innerHTML='';
		}
	}
}

//enjoy the silence!