// ==UserScript==
// @name           IMDb Standard Deviation
// @namespace      http://userscripts.org/users/7063
// @include        http://www.imdb.com/title/tt*/ratings
// @include        http://www.imdb.com/title/tt*/ratings-*
// @include        http://www.imdb.com/title/tt*/ratings?*
// @version        2013.2.17.4.3
// @grant          none
// ==/UserScript==

(function () {
	"use strict";

	var	$ = function (a, b) {return b.getElementsByTagName(a); },
		tn = document.getElementById("tn15content"),
		table = $("table", tn),
		votes = [],
		product = 0,
		votecount = 0,
		sd = 0,
		mean,
		i;

	if (table.length) {
		for (i = 0; i < 10; i++) {
			votes.push(+table[0].rows[i + 1].cells[0].textContent);
			product += votes[i] * (10 - i);
			votecount += votes[i];
		}

		//votecount--;
		mean = product / votecount;

		for (i = 1; i <= 10; i++) {
			sd += Math.pow(i - mean, 2) * votes[10 - i];
		}

		$("p", tn)[2].textContent += ". \xA0Standard Deviation = " + Math.sqrt(sd / votecount).toFixed(2);
	}
}());
