// ==UserScript==
// @name           LoudTwitter Atless
// @namespace      http://axisofevil.net/~xtina/
// @description    This removes the @ bullet list items from LoudTwitter posts.
// @include        *
// ==/UserScript==

var allTwitz = getElementsByClassName(document, 'ul', 'loudtwitter');
for (var x = 0; x < allTwitz.length; x++) {
	theTwitz = allTwitz[x];
	theItemz = theTwitz.getElementsByTagName("li");
	for (var y = 0; y < theItemz.length; y++) {
		var theEntry = theItemz[y].childNodes[1].nodeValue;
		if (theItemz[y].childNodes[0].nodeValue == '@') {
			theItemz[y].parentNode.removeChild(theItemz[y]);
			y -= 1;
		} else if (theItemz[y].childNodes[1].nodeValue == ' @') {
			theItemz[y].parentNode.removeChild(theItemz[y]);
			y -= 1;
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
