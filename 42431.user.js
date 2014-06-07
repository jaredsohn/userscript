// ==UserScript==
// @name           PF MyCup Filter
// @namespace      SimanFC
// @include        http://premierfootball.pagefad.com/Cups/CupsCompetingIn.aspx*
// ==/UserScript==

var awaiting = function(event) {
	var cells = document.getElementsByTagName("td");
	for (var i = cells.length-1; i >= 3; i--) {
		if ((i%3==1) && (cells[i].innerHTML != "Awaiting Teams")) {
			var row = cells[i].parentNode;
			row.parentNode.parentNode.deleteRow(row.rowIndex);
		}
	}
	event.preventDefault();
}

var copylinks = function(event) {
	var links = document.getElementsByTagName("a");
	var txtBox;
	var txtLinks = "";
	if (document.getElementById("myTxtBox")) {
		txtBox = document.getElementById("myTxtBox");
	} else {
		txtBox = document.createElement("textarea");
		txtBox.id = "myTxtBox";
		txtBox.cols = 70;
		txtBox.rows = 10;
	}
	for (i in links) {
		if (links[i].href.match("cupId")) {
			txtLinks += links[i].href + '\n';
		}
	}
	txtBox.value = txtLinks;
	document.getElementById("ctl00_ContentPlaceHolder1_cupsCompetingInLbl").appendChild(txtBox);
	event.preventDefault();
}

var label = document.getElementById("ctl00_ContentPlaceHolder1_cupsCompetingInLbl");
var button = document.createElement("button");
button.style.cursor = "pointer";
button.setAttribute("class","fb_button");
button.addEventListener('click', awaiting, false);
button.innerHTML = "Show Awaiting only";
label.appendChild(button);

var buttonCopy = document.createElement("button");
buttonCopy.style.cursor = "pointer";
buttonCopy.setAttribute("class","fb_button");
buttonCopy.addEventListener('click', copylinks, false);
buttonCopy.innerHTML = "Copy links to textbox";
label.appendChild(buttonCopy);