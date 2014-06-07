// ==UserScript==
// @name LIFE Harabe Topla ve Aya Sonda
// @namespace http://userscripts.org/life
// @description OGAMA : LIFE Otomatik Harabe - Aya Sonda (Yeni Evren)
// @date 2012-07-02
// @version 4.1
// @creator LIFE
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @exclude
// ==/UserScript==

var strFunc = (function(){
	$("#galaxyContent").ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=galaxyContent") == -1) return;

		var rows = document.querySelectorAll("#galaxytable tr.row");
		for (var i = 0; i < rows.length; i++) {
			var moon = rows[i].querySelector("td.moon");
			if (moon) {
				var ul = moon.getElementsByClassName("ListLinks")[0];
				if (ul) {
					var items = rows[i].querySelectorAll(".ListLinks>li");
					for (var j = 0; j < items.length; j++) {
						if (items[j].innerHTML.indexOf("(6,") > -1) {
							var li = items[j].cloneNode(true);
							var spy_link = li.getElementsByTagName("a")[0];
							spy_link.setAttribute("onclick",spy_link.getAttribute("onclick").replace(/(\(\d*,\d*,\d*,\d*),\d*,(\d*\))/,"$1,3,$2"));

							if (moon.getElementsByClassName("activity").length > 0) {
								ul.insertBefore(li,ul.getElementsByTagName("li")[0].nextSibling);
							} else {
								ul.insertBefore(li,ul.firstChild);
							}
							break;
						}
					}
				}
			}
			var debris = rows[i].querySelector("td.debris");
			if (debris) {
				var pos = debris.querySelector("#pos-debris");
				if (pos) {
					var li1 = debris.getElementsByClassName("debris-recyclers")[0];
					var lis = debris.getElementsByTagName("li");
					var li2;
					var j = 0;
					do {
						li2 = lis[j];
						j++;
					}while(li2 && li2.innerHTML.indexOf("errorBoxDecision") == -1);
					if (li1 && li2) {
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
	});
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);