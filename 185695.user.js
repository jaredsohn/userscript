// ==UserScript==
// @name        Leaderboards Assetto Corsa HFR
// @namespace   madcat
// @include     http://hfr-ac.miniw.tk/
// @version     1
// @grant       none
// ==/UserScript==

var allLB;
var myName = "madcat";
var myColor = "#ff4040";
var backColor = "#004558";
var bodyTextColor = "white";
var LBTextColor = "black";
var rowColor1 = "#caecf2";
var rowColor2 = "#b2e4ec";
var headerColor = "black";
var headerTextColor = "#fcad60";


document.body.style.background = backColor;
document.body.style.color = bodyTextColor;

allLB = document.getElementsByTagName("table");

for (var i=0; i<allLB.length; i++) {

	var allRows = allLB[i].getElementsByTagName("TR");

	
	for (var j=0; j<allRows.length; j++) {
	
		(j%2 == 0) ? allRows[j].style.background = rowColor1 : allRows[j].style.background = rowColor2;
		allRows[j].style.color = LBTextColor;
	
		if (allRows[j].innerHTML.indexOf(myName) != -1) {
		
			allRows[j].style.color = myColor;
		}
		
		var allTD = allRows[j].getElementsByTagName("TD");
	
		for (var k=0; k<allTD.length; k++) {
			allTD[k].style.border = 0;
		}

	}
	
	allRows[0].style.background = headerColor;
	allRows[0].style.color = headerTextColor;
	
	var allTH = allRows[0].getElementsByTagName("TH");
	
	for (var k=0; k<allTH.length; k++) {
		allTH[k].style.border = 0;
	}
	
}