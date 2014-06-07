// ==UserScript==
// @name          WaniKani Turtle Total
// @namespace     https://www.wanikani.com
// @description   This will optionally add the cumulative turtle counts for each category to the srs-progress display. It will also mark increases and decreases in all the counts since the last display (for example, right after a review session.)  By RhosVeedcy.
// @version 2.3.5
// @downloadURL   https://userscripts.org/scripts/source/433650.user.js
// @updateURL     https://userscripts.org/scripts/source/433650.meta.js
// @include       https://www.wanikani.com/
// @include       https://www.wanikani.com/dashboard
// @run-at	  document-end
// @grant	  GM_registerMenuCommand
// ==/UserScript==




function GMsetup() {
  if (GM_registerMenuCommand) {

    GM_registerMenuCommand('WaniKani Turtle Total: Show/Hide overall totals', function() {
	var curDType = localStorage.getItem("WKturtotlsDType") || "0";
	curDType = JSON.parse(curDType);
	curDType++;
	curDType %= 2;
	localStorage.setItem("WKturtotlsDType", JSON.stringify(curDType));
	location.reload();
    });

  }
}



function totalTheTurtles() {	// cumulative (enl = enl + bur, etc.)

	console.log("totalTheTurtles()");

	var burEl = document.getElementById("burned");
	var enlEl = document.getElementById("enlightened");
	var masEl = document.getElementById("master");
	var gurEl = document.getElementById("guru");
	var appEl = document.getElementById("apprentice");

	var burned = Number( burEl.getElementsByTagName("span")[0].innerHTML || 0 );
	var enlightened = Number( enlEl.getElementsByTagName("span")[0].innerHTML || 0 );
	var master = Number( masEl.getElementsByTagName("span")[0].innerHTML || 0 );
	var guru = Number( gurEl.getElementsByTagName("span")[0].innerHTML || 0 );
	var apprentice = Number( appEl.getElementsByTagName("span")[0].innerHTML || 0 );

	console.log("raw counts: ", apprentice, guru, master, enlightened, burned);

	var totEn = enlightened + burned;
	var totMa = master + totEn;
	var totGu = guru + totMa;
	var totAp = apprentice + totGu;

	console.log("cumulative counts: ", totAp, totGu, totMa, totEn, burned);

	var curDType = localStorage.getItem("WKturtotlsDType") || "0";
	curDType = JSON.parse(curDType);

	if (curDType == 0) { 

		if (burned != 0) {

			document.getElementById("enlightened").getElementsByTagName("span")[0].innerHTML += " / " + totEn;
		}
		if (enlightened != 0) {

			document.getElementById("master").getElementsByTagName("span")[0].innerHTML += " / " + totMa;
		}
		if (master != 0) {

			document.getElementById("guru").getElementsByTagName("span")[0].innerHTML += " / " + totGu;
		}
		if (guru != 0) {

			document.getElementById("apprentice").getElementsByTagName("span")[0].innerHTML += " / " + totAp;
		}
	}

	burEl.style.padding = "30px 0px 22.5px";
	enlEl.style.padding = "30px 0px 22.5px";
	masEl.style.padding = "30px 0px 22.5px";
	gurEl.style.padding = "30px 0px 22.5px";
	appEl.style.padding = "30px 0px 22.5px";

	return [apprentice, guru, master, enlightened, burned, totAp, totGu, totMa, totEn];
}



function markTheDiffs (cur, prev) {

	console.log("markTheDiffs()");

	// check for null

	if (!prev || !cur) { return; }

	var uparrow = "↑";
	var downarrow = "↓";
	var tags = ["apprentice", "guru", "master", "enlightened", "burned"];

	if (cur[5] != prev[5]) {

		// if total active turtles decreased... must be a different account... don't mark anything.
		// if total active turtles increased... user did lesson, not review... don't mark anything.
		return;
	}

	for (var x=0; x<5; x++) {

		var theEl = document.getElementById(tags[x]).getElementsByTagName("span")[0];

		if (cur[x] > prev[x]) {

			theEl.innerHTML = uparrow + theEl.innerHTML;
		}
		else if (cur[x] < prev[x]) {

			theEl.innerHTML = downarrow + theEl.innerHTML;
		}
		if (theEl.innerHTML.indexOf("/") > 0) {

			if (cur[x+5] > prev[x+5]) {

				theEl.innerHTML += uparrow;
			}
			else if (cur[x+5] < prev[x+5]) {

				theEl.innerHTML += downarrow;
			}
		}
	}
}



function main () {

	console.log('Turle Total main()');

	GMsetup();

	// calculate and display current totals

	var curTotals = totalTheTurtles();
	var ct = JSON.stringify(curTotals);
	console.log('curTotals: ', ct);

	// get previous totals

	var pt = sessionStorage.getItem("WKturtotPrevs") || -1;

	if (pt == -1) {

		console.log("no record of previous totals, saving current totals for next time");
		pt = ct;
		sessionStorage.setItem("WKturtotPrevs", ct);
	}

	var prevTotals = JSON.parse( pt );
	console.log('prevTotals: ', pt);

	if (ct !== pt) {	// mark increases and decreases with up-arrows and down-arrows

		markTheDiffs(curTotals, prevTotals);

		// save current totals for next comparison

		sessionStorage.setItem("WKturtotPrevs", ct);
		console.log("saved curTotals");
	}
}


window.addEventListener("load", main, false);

console.log('Turle Total script load end');
