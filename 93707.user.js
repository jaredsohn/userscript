// ==UserScript==
// @name			Pardus Gameserver Stats
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Shows the live statistics of the gameserver for your game.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/msgframe.php
// @include			http*://*.pardus.at/options.php
// @grant			GM_xmlhttpRequest
// ==/UserScript==

// <!-- User variables -->

var game = "Minecraft"; // your game as named here: http://gameserver.pardus.at/
var highcolor = "green"; // server is >50% populated
var mediumcolor = "orange"; // <50% populated
var lowcolor = "red"; // 0 players online

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Gameserver Stats";
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
	
	if (location.href.indexOf("/msgframe.php") !== -1) {
		function parse(response,ping) {
			var info = response.responseText.split(';');
			var players = parseInt(info[0]);
			var maxplayers = parseInt(info[1]);
			var map = info[2];
			
			var span = document.createElement('span');
			var stats = document.createElement('a');
			var link = document.getElementsByTagName('a')[1];
			link.parentNode.insertBefore(stats,link.nextSibling);
			link.parentNode.insertBefore(span,link.nextSibling);
			
			var crowd = Math.round(players/maxplayers*100);
			var color = "";
			if (crowd > 50) {
				color = highcolor;
			} else {
				if (crowd !== 0) {
					color = mediumcolor;
				} else {
					color = lowcolor;
				}
			}
			
			stats.style.color = color;
			stats.innerHTML = players + "/" + maxplayers;
			stats.title = "Map: " + map + ", approximate ping: " + ping + "ms";
			stats.href = "http://gameserver.pardus.at/";
			stats.target = "blank";
			
			span.innerHTML = "| " + game + ": ";	
		}

		var t1 = (new Date()).getTime();
		GM_xmlhttpRequest(
			{
				method:'GET',
				url:"http://gameserver.pardus.at/stats.php?query=" + game,
				headers: {
					'User-agent':"Mozilla/4.0 (comaxplayersatible) Greasemonkey",
					'Accept': "application/atom+xml,application/xml,text/xml",
				},
				onload:function(response) {
					var ping = (new Date()).getTime() - t1;
					parse(response,ping);
				}
			}
		);
	}
} catch(scripterror) {
	GM_log(scripterror);
}