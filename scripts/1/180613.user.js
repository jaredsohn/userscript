// ==UserScript==
// @name           CodeChef Submit Helper
// @description    Adds a submit button to past contest problems.
// @include        *://*.codechef.com/*
// ==/UserScript==

/*
 * Author : Swapnil Agarwal
 */

function setToZero () {
    var ul = document.getElementsByClassName("problems");
    var content = ul[0].innerHTML;
    content = content.replace(new RegExp("<td align=\"center\">[0-9]+</td>", "g"), "<td align=\"center\">0</td>");
    content = content.replace(new RegExp("[0-9]+.[0-9]+</a></td></tr>", "g"), "0.0</a></td></tr>");
    ul[0].innerHTML = content;
}
function checkIfContestHasEnded () {
    var ul = document.getElementsByClassName("rounded-b-footer");
	if ( ul.length > 0 ) {
		var content = ul[0].innerHTML;
		var n = content.search("CONTEST ENDED.");
		if ( n != -1 ) {
			setToZero();
		}
	}
}
function addSubmitButton () {
    var pathArray = window.location.pathname.split( '/' );
    if ( pathArray[pathArray.length-2] == "problems" ) {
        var ul = document.getElementsByClassName("button-list");
        if(ul[0].childNodes.length==5){
            var content = ul[0].innerHTML;
            var problemId = pathArray[pathArray.length-1];
            ul[0].innerHTML = "<li><a href=\"/submit/" + problemId + "\">Submit</a></li>" + content;
        }
    }
}
checkIfContestHasEnded();
addSubmitButton();