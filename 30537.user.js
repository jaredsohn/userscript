// ==UserScript==

// @name           Njoy d cool Rapidshare waiting time for download killer by Kalyan Srinivas K!
// @description    based on the "Rapidshare - Timer" of dob (http://userscripts.org/scripts/show/27821), this script press "free user", wait for download link,then click download,u shud have greasemonkey
addon in ur firefox to have zis script installed.
// @include        http://*.rapidshare.com/*

// @include        http://*.rapidshare.tld/*

// @include        http://rapidshare.tld/*

// @include        http://lix.in/*

// @include        http://*.rapidsafe.net/*

// @include        http://rapidsafe.net/*

// @exclude        http://rapidshare.tld/users/*

// ==/UserScript==

 

GM_addStyle("#counter { position: fixed; width: 60px; top: 0; left: 0; border: 3px solid #999; padding: 2px 5px; font-size: 12pt;}");

// hide stuff

GM_addStyle("p.downloadlink, div#dl h2, div#dl p, table.klapp { display: none; }");

var free = document.getElementById("ff");
if(free)
   free.childNodes[7].click();


setTimeout(function() {

	var x = unsafeWindow.c;

	unsafeWindow.c = 2;

	var div = document.createElement("div");

	with (div) {

		id = "counter",

		innerHTML = (x/60).toFixed(1);

	}

	document.body.appendChild(div);

	var rs = function() {

		var timer = window.setInterval(function() {

			x--;

			document.getElementById("counter").innerHTML = x;

			if (x == 0) {

				//alert("Download ready!");

				clearInterval(timer);
				// click en el elemento...
				var link = document.getElementById("dl");
				var X = link.childNodes[0].childNodes[2].childNodes[0];
				X.click();

			}

		}, 1000);

	}

	rs();

}, 500);