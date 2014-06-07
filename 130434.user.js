// ==UserScript==
// @name          Approval Time
// @description   Displays the auto-approval time
// @include       https://www.mturk.com/mturk/preview*
// @include       https://www.mturk.com/mturk/continue*
// @include       https://www.mturk.com/mturk/accept*
// @include       https://www.mturk.com/mturk/submit
// @include       https://www.mturk.com/mturk/return*
// ==/UserScript==

var Hit = /accept/gi;
var Page_Status = document.forms[1].action;
if(Page_Status.search(Hit) != 1) {
	insertID2(findID2());
	}
	
function findID2() {
	var inputfields = document.getElementsByTagName("INPUT");
	results = "";
	for(var i = 0;i < inputfields.length;i++) {
		if(inputfields[i].name == "hitAutoAppDelayInSeconds") {
			results = inputfields[i].value;
			break;
		}
	}
	return results;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function insertID2(AutoAppTime) {
	var Tcell = document.createElement("TD");
	Tcell.appendChild(document.createTextNode("  Auto-Approval Time: "+ AutoAppTime/86400 +" days  "))
	var firstElement = document.getElementById("requester.tooltip");
	insertAfter(firstElement.parentNode.parentNode, Tcell);
}