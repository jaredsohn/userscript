// ==UserScript==
// @author      Steve Geluso
// @name        grade_check
// @namespace   https://norfolk.cs.washington.edu/gradebook/grades_entry.php
// @description double checks grades ensuring entries sum correctly.
// @include     https://norfolk.cs.washington.edu/gradebook/grades_entry.php
// ==/UserScript==

// Parses the first table on a page

// Color definitions used to color-code rows.
var correct = "77ff77";
var incorrect = "ff7777";
var inconclusive = "ffff77";

// Sums first (N - 1) input values within a table row and compares the sum to the
// Nth value in the row. Changes the background color of the row to indicate whether
// the row sums correctly, incorrectly or inconclusively (is not properly entered).
function colorSum(row) {
        var input = row.getElementsByTagName("input");
	var sum = 0;
	for (var i = 0; i < input.length - 1; i++) {
		sum += parseInt(input[i].value, 10);
	}

	if (isNaN(sum)) {
		row.bgColor = inconclusive;
	} else if (sum == parseInt(input[input.length - 1].value, 10)) {
		row.bgColor = correct;
	} else {
		row.bgColor = incorrect;
	}
};

// Finds the row containing the input element just modified and recalculates the
// asserted sum of the row and recolors the background of the row accordingly.
function keyUpHandler() {
    var node = document.activeElement;
    while (node != null && node.tagName.toUpperCase != "TR") {
        node = node.parentNode;
    }
    if (node != null) {
        colorSum(document.activeElement.parentNode.parentNode);
    }
}

// Finds the second table on the page and asserts that the sum of the first (N-1)
// values in the row are equal to the Nth element in the row. Changes the
// background color of each row depending on the result of the assertion.
var table = document.getElementsByTagName("table")[1];
var rows = table.getElementsByTagName("tr");
for (var i = 2; i < rows.length; i++) {	
	var inputs = rows[i].getElementsByTagName("input");
	for (var j = 0; j < inputs.length; j++) {
		inputs[j].addEventListener('keyup', keyUpHandler, true);
		// check initial values
		colorSum(rows[i]);
	}
}