// ==UserScript==
// @name           Quake Live Weighted Accuracy
// @namespace      http://userstyles.org
// @description    A better accuracy measurement for QuakeLive.
// @include        http://*.quakelive.com/*
// @include        http://*.quakelive.com/profile/statistics/*
// ==/UserScript==

function weightedacc(event) {
  var totalweightedacc = 0; // The final result of the calculation.
  //var reloadtimes = [400, 100, 1000, 800, 800, 50, 1500, 100, 300, 50, 1000, 800]; // Weapon reload times (msec).
  //var totalreloadtime = reloadtimes.reduce(function(a, b){ return a+b;}); // Calculate the total of the reload times.
  //var averagereloadtime = totalreloadtime/reloadtimes.length;
  
  // Make sure the proper type of element is being inserted, and this hasn't already been called on this page.
  if (event.target.tagName != "DIV"
      && event.target.className != 'prf_weapons'
      || document.getElementById('weightedacc')) {
    return;
  }

  // Calculate a new, "weighted" accuracy.
	var weapselem = document.getElementsByClassName('prf_weapons cl')[0];
	var accelems = weapselem.getElementsByClassName('text_tooltip'); // userscripts.org/topics/77188
	var useelems = weapselem.getElementsByClassName('col_usage');

	var i;
	for (i = 0; i < accelems.length; i++) { // Foreach weapon, ignore gaunt.
		acc = accelems[i].innerHTML.substr(0,accelems[i].innerHTML.length-1)*1;
		use = useelems[i+1].innerHTML.substr(0,useelems[i+1].innerHTML.length-1)*1; // userscripts.org/topics/77188
		
		totalweightedacc += (acc * use/100);
		//totalweightedacc += (acc * reloadtimes[i]/averagereloadtime);
	}

  // Display this new value.
  var vitals = document.getElementsByClassName('prf_vitals')[0];
  var info = vitals.getElementsByTagName('p')[0];
  info.innerHTML += "<b id='weightedacc'>Weighted Accuracy: </b>"
                        + totalweightedacc.toFixed(1) + "%<br />";
}

document.body.addEventListener("DOMNodeInserted", weightedacc, true);
