// ==UserScript==
// @name OGame Redesign : TOP400
// @namespace http://userscripts.org/users/36331
// @description OGame : highlight top 400 players and alliance tags in galaxy view.
// @date 2010-11-03
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

(function(){
	var allytags = {
		"ally1": "#FF4500",
		"ally2": "#FF8C00",
		"ally3": "#FFA500"
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
						if (rank > 0 && rank <= 400) {
							var GBcolor = (Math.ceil(rank/3) + 15).toString(16).toUpperCase();
							var color = "#FF" + GBcolor + GBcolor;
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