// ==UserScript==
// @id             Hit_Availability
// @name           Discover Fake Availabilities
// @version        1.0
// @namespace      
// @author         TachisAlopex
// @description    
// @include        https://www.mturk.com/mturk/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/132559.user.js
// ==/UserScript==


/// Built using Turkopticon X's code, striping it and moding it

var TURKOPTICON = "http://turkopticon.differenceengines.com/";

function insertAttrsHTML(n, result) {

    var parent = n.parentNode;

    if (result > 0) {
	if (result == 1) {

	    stuff = "&#9745; ";

	} else {

            stuff = "&#9746; ";
	    n.style.color = "red";
        }

    } else {
	stuff += "<strong>E</strong>";

    }

    var pie = parent.getElementsByTagName("img")[0];
    pie.parentNode.removeChild(pie);
    n.innerHTML = stuff + n.innerHTML;

}

//moded
function getHitName(n) {
    var href = n.getAttribute('href');
	if (href==null) return "";
	var splitArr = href.split("groupId="); 
	if (splitArr.length == 1) {
	   return '';
	} else {
        return splitArr[1].split("&")[0];
	}
}

//left alone
function insertPie(n) {
    var parent = n.parentNode;
    var pie = "<img src=\"http://turkopticon.differenceengines.com/pie.gif\" alt=\"Loading...\" />";
    parent.innerHTML = pie + parent.innerHTML;
}

//greatly moded
function parseAndInsert(n) {

    GM_xmlhttpRequest(
	{method: 'GET',
         url: n.href,
 
        onload: function(results, numReports, numUsers) {
		result = 0; // result
                r = results.responseText;
                if (r != "null") {
                    var splitArr = r.split('alertboxHeader">');
                    if(splitArr.length == 2) {
			result = 2; //hits all out
                    } else {
                        result = 1; //all fine
                    }
                } else {
		    result = -1; //error
		}
                insertAttrsHTML(n, result);
            }
        });
}

//moded  (names only)
function getHitAnchors() {
    var anchors = document.getElementsByTagName("a");
    var hitAnchors = new Array;
    for (var i = 0; i < anchors.length; i++) {
        if (getHitName(anchors[i]) != "") {
            hitAnchors.push(anchors[i]);
        }
    }
    return hitAnchors;
}


//==============================  Modded (name only (and removed some checks))
var hitAnchors = getHitAnchors();

for (var i = 0; i < hitAnchors.length; i++) {
    insertPie(hitAnchors[i]);
}

var hitAnchors = getHitAnchors();

for (var k = 0; k < hitAnchors.length; k++) {

setTimeout(
	   (function(k) {
		return function()
		{
			parseAndInsert(hitAnchors[k]);
		};
	    }
	    )
	(k), 500*k);  //need to add a delay so people won't get a maximum refresh rate message
}
