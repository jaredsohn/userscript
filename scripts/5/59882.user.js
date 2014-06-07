// ==UserScript==
// @name           BvS Partyhouse Defaults
// @namespace      BvS
// @description    Selects checkboxes for some partyhouse games.
// @include        http://*animecubed.com/billy/bvs/partyhouse.*
// ==/UserScript==
/*
Copyright (c) 2009 Daniel Karlsson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

// Tsukiball: Set Go for Broke and Throw all TsukiBalls
var form = document.getElementsByName("skib")[0];
if (form) {
	var check = document.getElementsByName("rolltype")[2]; // Go for Broke
	if (check)
		check.setAttribute("checked", "checked");
	check = document.getElementsByName("doemall")[0];
	if (check)
		check.setAttribute("checked", "checked");
}

// Scratchies: Set Upgrade to a SuperTicket
form = document.getElementsByName("scratch")[0];
if (form) {
	var check = document.getElementsByName("superticket")[0];
	if (check) {
		check.setAttribute("checked", "checked");
	}
}

// Jackpot: Select all rows
form = document.getElementsByName("ninrou")[0];
if (form) {
	var checkboxes = ["rowone", "rowtwo", "rowthree", "rowfour", "rowfive"];
	for (var i in checkboxes) {
		var check = document.getElementsByName(checkboxes[i])[0];
		if (check)
			check.setAttribute("checked", "checked");
	}
}
