// ==UserScript==
// @name OGame Redesign : Moon Spy and Recycler
// @namespace http://userscripts.org/users/36331
// @description OGame : directly spy a moon and send recyclers from galaxy view.
// @date 2009-08-05
// @creator Black Cat
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

(function(){

	function addLinks() {
		var table = document.getElementById("galaxyContent").getElementsByTagName("table")[0];
		if (!table || table.getAttribute("done13576") == "done") return;
		table.setAttribute("done13576","done");

		var rows = table.getElementsByTagName("tr");
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].className == "row") {
				var cells = rows[i].getElementsByTagName("td");
				var spy_link = null;
				for (var j = 0; j < cells.length; j++) {
					if (cells[j].className.indexOf("microplanet") != -1) {
						var links = cells[j].getElementsByTagName("a");
						var k = 0;
						do {
							spy_link = links[k];
							k++;
						}while(spy_link && spy_link.parentNode.innerHTML.indexOf("sendShips(6,") == -1);
					} else if (cells[j].className == "moon") {
						if (!spy_link || cells[j].innerHTML.replace(/\s/g,"") == "") continue;
						var li = spy_link.parentNode.cloneNode(true);
						li.getElementsByTagName("a")[0].setAttribute("onclick",li.getElementsByTagName("a")[0].getAttribute("onclick").replace(/(sendShips\(\d*,\d*,\d*,\d*),\d*,(\d*\))/,"$1,3,$2"));
						var ul = cells[j].getElementsByTagName("ul")[1];
						ul.insertBefore(li,ul.firstChild);
					} else if (cells[j].className == "debris") {
						var spans = cells[j].getElementsByTagName("span");
						var pos;
						var k = 0;
						do {
							pos = spans[k];
							k++;
						}while(pos && pos.id != "pos-debris");
						var lis = cells[j].getElementsByTagName("li");
						var li1;
						k = 0;
						do {
							li1 = lis[k];
							k++;
						}while(li1 && li1.className != "debris-recyclers");
						var li2;
						k = 0;
						do {
							li2 = lis[k];
							k++;
						}while(li2 && li2.innerHTML.indexOf("errorBoxDecision") == -1);
						if (pos && li1 && li2) {
							var expression = /(\d*):(\d*):(\d*)/;
							expression.exec(pos.innerHTML);
							var galaxy = RegExp.$1;
							var system = RegExp.$2;
							var planet = RegExp.$3;
							var nb_rec = li1.innerHTML.replace(/\D/g, "");
							li2.getElementsByTagName("a")[0].setAttribute("onclick","sendShips(8," + galaxy + "," + system + "," + planet + ",2," + nb_rec + ");return false;");
						}
					}
				}
			}
		}
	}
	document.getElementById("galaxyContent").innerHTML; //check
	setInterval(addLinks,1000);
})();