// ==UserScript==
// @name        NoPremium FHSST Mathematics
// @namespace   everythingmaths.co.za
// @description Removes floating Premium services banner from everythingmaths.co.za
// @include     http://everythingmaths.co.za/grade-10/01-algebraic-expressions/01-algebraic-expressions-02.cnxmlplus
// @version     1
// ==/UserScript==

//THX http://www.codingforums.com/showthread.php?t=143110
function getElementsByClassName(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = document.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 

var erkki = getElementsByClassName("premiumservices-trigger");
if (erkki.length > 0)
    document.body.removeChild(erkki[0]);