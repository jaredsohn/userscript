// ==UserScript==
// @name         TwinTwist4Evar
// @description  Never, ever change
// @version      1.00
// @date         2010-11-16
// @creator      Ian Ziese / optimusfan
// @include      http://www.tfw2005.com/*
// ==/UserScript==

function replaceAll(source,stringToFind,stringToReplace){
  var temp = source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }

        return temp;

}
function findAndReplaceAllByTag(allElements) {
	var filterkey = "McBradders";
	var thisElement;
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if(thisElement.innerHTML.indexOf(filterkey)!=-1) {
			thisElement.innerHTML = replaceAll(thisElement.innerHTML,filterkey,"Twin Twist");
		}
	}	
}

(function (){
	findAndReplaceAllByTag(document.getElementsByTagName('b'));
	findAndReplaceAllByTag(document.getElementsByTagName('strong'));
	findAndReplaceAllByTag(document.getElementsByTagName('h1'));
	findAndReplaceAllByTag(document.getElementsByTagName('a'));
        findAndReplaceAllByTag(document.getElementsByTagName('span'));
}());