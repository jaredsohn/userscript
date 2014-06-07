// ==UserScript==
// @name			Pardus Dogfighter
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Allows you to attack a player by clicking his/her ship's image.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/main.php
// @include			http*://*.pardus.at/options.php
// @grant			none
// ==/UserScript==

// <!-- User variables -->

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Dogfighter";
var scriptversion = 1;
var imghost = "http://s1135.photobucket.com/albums/m626/TheRealFaziri/";
var datahost = "http://dl.dropbox.com/u/3357590/GM%20Scripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"%20") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

// <!-- Nav refresh fix -->

if (location.href.indexOf("/main.php") !== -1) {
	function runscript() {
		navscript();
		if (unsafeWindow.checkToDo !== undefined) {
			var local_checkToDo = unsafeWindow.checkToDo;
			unsafeWindow.checkToDo = function() {
				local_checkToDo();
				setTimeout(navscript,1);
			}
		}
	}
}

// <!-- End of Nav refresh fix -->

try {
	if (location.href.indexOf("/options.php") !== -1) {
		return;
	}
	
	if (location.href.indexOf("/main.php") !== -1) {
		function navscript() {
			var shipbox = document.getElementById('otherships_content');
			if (shipbox !== undefined) {
				var pilots = shipbox.getElementsByTagName('tr');
				for (var i = 0;i < pilots.length;i++) {
					var id = pilots[i].getElementsByTagName('a')[0].href.match(/[0-9]+/);
					var ship = pilots[i].getElementsByTagName('td')[0];
					
					ship.setAttribute('onclick',"location.href='/ship2ship_combat.php?playerid=" + id + "';");
					ship.setAttribute('title',"Engage in Combat!");
				}
			}
		}
		
		runscript();
	}
}
catch(scripterror) {
	GM_log(scripterror);
}