// ==UserScript==
// @name           MusicBrainz: Vertical changes boxes on voting pages
// @description    A script to make the left and right boxes showing changes to edits vertical. 
// @version        2008-03-30
// @author         -
// @namespace      df069240-fe79-11dc-95ff-0800200c9a66
//
// @include        http://musicbrainz.org/mod/search/results.html*

// ==/UserScript==
//**************************************************************************//

function getElementsByClassName (oElm, strTagName, strClassName) {
    var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i = 0; i < arrElements.length; i++) {
        oElement = arrElements[i];
        if (oRegExp.test(oElement.className)) {
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements);
}

var all = getElementsByClassName(document, "tr", "showedit");

for (var i = 0; i < all.length; i++) {
	var left, right, vote;

	left = getElementsByClassName(all[i], "td", "oldvalue");
	if (left.length == 1) {
		right = getElementsByClassName(all[i], "td", "newvalue");
		vote = getElementsByClassName(all[i], "td", "vote");

		left[0].colSpan = 2;
		right[0].colSpan = 2;
		vote[0].rowSpan = 2;
		
		if (left[0].childNodes.length <= 1) {
			left[0].style.padding = 0;
			left[0].style.borderBottom = 0;
			right[0].style.borderTop = 0;
		}

		var newrow = document.createElement("tr");
		newrow.className = "showedit";
		newrow.appendChild(right[0]);
		all[i].parentNode.insertBefore(newrow, all[i].nextSibling);
	}
}
