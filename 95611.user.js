// ==UserScript==
// @name OGame Redesign : Highlight Players and Alliances
// @namespace http://userscripts.org/users/36331
// @description OGame : highlight top 300 players and alliance tags in galaxy view.
// @date 2010-11-03
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

(function(){
	var allytags = {
		"ally1": "#CC3300",
		"ally2": "#CC3300",
		"ally3": "#CC3300"
		};

	var $;
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }
	$("#galaxyContent").ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=galaxyContent") == -1) return;

		var rows = document.querySelectorAll("#galaxytable tr.row");
		for (var i = 0; i < rows.length; i++) {
			var playername = rows[i].querySelector("td.playername");
			if (playername) {
				var link = playername.getElementsByTagName("a")[0];
				if (link && link.getAttribute("rel") != null) {
					var rel_attr = link.getAttributeNode("rel").nodeValue;
					var div = document.querySelector(rel_attr);
					if (div) {
						var rank = parseInt(div.getElementsByClassName("rank")[0].innerHTML.replace(/\D/g, ''));
						if (rank > 0 && rank <= 1100) {
							var GBcolor = (Math.ceil(rank/10) + 100).toString(16).toUpperCase();
							var color = "#BF" + GBcolor + GBcolor;
							link.getElementsByTagName("span")[0].style.color = color;
						}
					}
				}
			}
			var allytag = rows[i].querySelector("td.allytag");
			if (allytag) {
				var span = allytag.getElementsByTagName("span")[0];
				if (span) {
					var color = allytags[span.childNodes[0].nodeValue];
					if (color)
						span.style.color = color;
				}
			}
		}
	});
})();
