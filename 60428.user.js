// ==UserScript==
// @name OGame Redesign : Highlight Players and Alliances
// @namespace http://userscripts.org/users/36331
// @description OGame : highlight top 300 players and alliance tags in galaxy view.
// @date 2009-10-23
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

(function(){
	var allytags = {
		".AnGeS.": "#ffad53",
		".AnGeS.w": "#ffcc95",
		"ally3": "#FFA500"
		};

	function hlPlayers() {
		var table = document.getElementById("galaxyContent").getElementsByTagName("table")[0];
		if (!table || table.getAttribute("done14111") == "done") return;
		table.setAttribute("done14111","done");
		
		var rows = table.getElementsByTagName("tr");
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].className == "row") {
				var cells = rows[i].getElementsByTagName("td");
				for (var j = 0; j < cells.length; j++) {
					if (cells[j].className.indexOf("playername") != -1) {
						var link = cells[j].getElementsByTagName("a")[0];
						if (link && link.getAttribute("rel") != null) {
							var rel_attr = link.getAttributeNode("rel").nodeValue;
							if (rel_attr.indexOf("#player") != -1) {
								var player_id = rel_attr.replace(/\D/g, '');
								var div = document.getElementById("player" + player_id);
								if (div) {
									var rank = parseInt(div.getElementsByTagName("li")[0].innerHTML.replace(/\D/g, ''));
									if (rank <= 300) {
										var GBcolor = (Math.ceil(rank/2) + 15).toString(16);
										var color = "#FF" + GBcolor + GBcolor;
										link.getElementsByTagName("span")[0].style.color = color;
									}
								}
							}
						}
					} else if (cells[j].className == "allytag") {
						var span = cells[j].getElementsByTagName("span")[0];
						if (span) {
							var color = allytags[span.childNodes[0].nodeValue];
							if (color)
								span.style.color = color;
						}
					}
				}
			}
		}
	}
	document.getElementById("galaxyContent").innerHTML; //check
	setInterval(hlPlayers,1000);
})();