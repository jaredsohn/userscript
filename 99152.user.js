// ==UserScript==
// @name		MoodleAssist
// @namespace	        http://userscripts.org/users/308061
// @description	        Adds quiz metrics, and optionally hides answers already entered correctly.
// @include		http://blendedlearning.infotecpro.com/mod/quiz/*
// ==/UserScript==

// Copyright (C) 2011 by Brandon Fields
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// get the multiple choice and short answers sections, check if they are correct
// if so hide them (clip the html).
var snapResults = document.evaluate("//div[@class='que multichoice clearfix']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

clearCorrect(snapResults);

var snapResults = document.evaluate("//div[@class='que shortanswer clearfix']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

clearCorrect(snapResults);

// create a table at the bottom of the quiz pages with the
// running averages.
averageTable();

function clearCorrect(snapResults) {
	var numQuestions = snapResults.snapshotLength;

	if (numQuestions > 1) {
		// get the sum of the scores
		for (var i = numQuestions - 1; i >= 0; i--) {
			var elm = snapResults.snapshotItem(i);
			var str = elm.innerHTML;

			if (str.indexOf("1/1") != -1) {
				elm.innerHTML = "<center>Hidden</center>";
			}
		}
	}
}

function averageTable()
{
	// get the footer element to put the average table over
	var elmFoo = document.getElementById('footer');

	// cell 3 is where all the scores are
	var snapResults = document.evaluate("//*[@class='cell c3']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var numRows = snapResults.snapshotLength;
	var numTests = 0;

	if (numRows > 1) {
		var totalScore = 0;

		// get the sum of the scores
		for (var i = numRows - 1; i >= 0; i--) {
			var elm = snapResults.snapshotItem(i);
			var str = elm.innerHTML;

			if (str) {
				var mydiv = document.createElement("div");
				mydiv.innerHTML = str;
	 
				str = mydiv.textContent;
			}

			str = str.split(' ')[0];
			var score = parseFloat(str);


			// Check that the score is numerical, if so increase the number
			// of tests taken to get an accurate average.
			if ( !(isNaN(score)) ) {
				totalScore += score;
				numTests += 1;
			}
		}

		// compute the average score
		var average = totalScore / numTests;	

		// create the table for the average score
		var avgTable = document.createElement("div");
		avgTable.innerHTML = '<br /><table width="30%"  cellpadding="5"' +
			' cellspacing="1" class="generaltable boxaligncenter"><tr class="r0"> ' +
			'<td style=" text-align:center;" class="cell c0">' +
			'</td><td style=" text-align:left;" class="cell c1">' +
			'Average Quiz Score' +
			'</td><td style=" text-align:left;" class="cell c2">' +
			'</td><td style=" text-align:left;" class="cell c3">' +
		 	average.toFixed(2) + '%</td><td style=" text-align:left;" class="cell c4">' +
			'</td></tr> </table>';

		// render the table above the footer
		var footer;
		footer = document.getElementById('footer');
		if (footer) {
			footer.parentNode.insertBefore(avgTable, footer);
		}
	}
}
