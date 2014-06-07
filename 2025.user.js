// ==UserScript==
// @name          del.icio.us maxim.us
// @namespace   http://forestfortrees.edublogs.edu/
// @description   Widens the input fields on the del.icio.us posting and edit pages.
// @include       http://del.icio.us/*
// ==/UserScript==

(function() {
	var allTableCells, thisTableCell;
	allTableCells = document.getElementsByTagName('td');
	for (var i = 0; i < allTableCells.length; i++) {
		thisTableCell = allTableCells[i];
		if (thisTableCell.innerHTML == " space separated" || thisTableCell.innerHTML == " optional" || thisTableCell.innerHTML == " 		") {
			thisTableCell.parentNode.removeChild(thisTableCell);
		}
	}
	var windowWidth = window.innerWidth;
	var newFieldWidth = windowWidth-130;
	var newFieldStyle = "width:" + newFieldWidth + "px;";
	var allInputs, thisInput;
	allInputs = document.getElementsByTagName('input');
	for (var i = 0; i < allInputs.length; i++) {
		thisInput = allInputs[i];
		if (thisInput.id == "tags" || thisInput.name == "extended" || thisInput.name == "description" || thisInput.name == "url") {
			thisInput.setAttribute("style", newFieldStyle);
		}
	}
	/*var tagField = document.getElementById("tags");
	var extendedField = document.getElementByName("extended");
	alert(extendedField.value);
	tagField.setAttribute("style", newFieldStyle);*/
})();