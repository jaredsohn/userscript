// ==UserScript==

// @name          Hide apple stuff

// @description   Hide apple stuff

// @author	  amareus

// @include       http*://*what.cd*viewforum*

// ==/UserScript==


if (document.URL.match(/viewforum/)) {


	var me = new Array("apple","OSX","whatever you like");

	//change this to your liking

	var lets = document.getElementsByTagName("a");

	for (var e in lets) {
		for (var o in me) {
			var myRegExp = me[o];
			//var matchPos1 = lets[e].innerHTML.search(myRegExp);
			var matchPos1 = lets[e].innerHTML.search(RegExp([myRegExp].join("|"), "gi"));
			if(matchPos1 != -1) {
				lets[e].parentNode.parentNode.parentNode.parentNode.style.display = "none";
			}
		}
	}
}