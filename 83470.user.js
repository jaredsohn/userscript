// ==UserScript==
// @name			Pardus Necrophobia
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Takes you straight back to the Nav after killing an NPC.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/ship2opponent_combat.php*
// @include			http*://*.pardus.at/options.php
// @grant			none
// ==/UserScript==

// <!-- User variables -->

var timeout = 0; // number of ms to wait before going back to the Nav screen

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Necrophobia";
var scriptversion = 1;
var imghost = "http://s1135.photobucket.com/albums/m626/TheRealFaziri/";
var datahost = "http://dl.dropbox.com/u/3357590/GM%20Scripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"%20") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

try {
	if (location.href.indexOf("/options.php") !== -1) {
		return;
	}
	
	if (location.href.indexOf("/ship2opponent_combat.php") !== -1) {
		var pics = document.getElementsByTagName('img');
		for (var i = 0;i < pics.length;i++) {
			if (pics[i].getAttribute('src').match("/opponents/")) {
				var table = pics[i].parentNode;
			}
		}
		if (table.innerHTML.indexOf("D E A D") !== -1) {
			setTimeout(function() {
				location.href = "http://" + location.hostname + "/main.php";
			},timeout);
		}
	}
} catch(scripterror) {
	GM_log(scripterror);
}