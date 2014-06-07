// ==UserScript==
// @name          LJ Twitterless
// @namespace     http://twilite.org/~xtina/scripts/
// @description   This removes the bullet list from LoudTwitter posts.
// @include       http://*.livejournal.com/friends
// @include       http://*.livejournal.com/friends*
// ==/UserScript==

// Leave at 1 if you just want the bullet list removified.  See the script page
// for assistance:
// http://userscripts.org/scripts/show/17139

var branchesUp = 1;

var elms = new Array("ul", "div", "p");

for (var q = 0; q < elms.length; q++) {

// Get all 'loudtwitter' uls.
	var allTwitz = getElementsByClassName(document, elms[q], 'loudtwitter');
	for (var x = 0; x < allTwitz.length; x++) {
		theContainer = allTwitz[x];
		for (var y = 0; y < branchesUp; y++) {
			var aTempper = theContainer.parentNode
			theContainer.parentNode.removeChild(theContainer);
			theContainer = aTempper;
		}
	}
}

// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];     
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}
