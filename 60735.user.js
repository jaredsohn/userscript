// ==UserScript==
// @name           Lukijakuvan ottaja
// @namespace      http://maisa.kaleva.biz
// @description    Näyttää Kalevan lukijakuvasivulla kuvan ottajan nimen
// @include        http://www.kaleva.fi/plus/index.cfm?lkuva=*
// @include        http://www.kaleva.fi/plus/index.cfm?naytalukijakuvat=*
// ==/UserScript==


(function() {
	function addMainPhotographerName() {
		if (document.images) {
			var tables = document.getElementsByTagName("table");
			for (var i = 0; i < tables.length; i++) {
				if (tables[i].getAttribute("class") == "extraboxb") {
					target = tables[i];
					break;
				}
			}
			var main_pic_present = 1
			tds = target.getElementsByTagName("td");
			for (var i = 0; i < tds.length; i++) {
				if (tds[i].getAttribute("class") == "tummatausta_fade") {
					main_pic_present = 0;
					break;
				}
			}
			if (main_pic_present == 1) {
			spans = target.getElementsByTagName("span");
			for (var i = 0; i < spans.length; i++) {
				if (spans[i].getAttribute("class") == "leipis") {
					var kuvaaja;
					var container = spans[i].parentNode.parentNode.parentNode;
					var img_alt = container.getElementsByTagName("img")[0].alt;
					var luk = "Lukijakuva: ";
					var index = img_alt.indexOf(luk);
					if (index >= 0) {
						kuvaaja = img_alt.substring(luk.length)
						if (kuvaaja.length > 1)
							spans[i].innerHTML += "<br/><b>Kuvaaja: " + kuvaaja + "</b>";
						else
							spans[i].innerHTML += " <i>Kuvaaja ei tiedossa</i>";
					}
				}
			}
			}

		}
	}
	function addPhotographerNamesToGrid() {
		if (document.images) {
			var tables = document.getElementsByTagName("table");
			var second_extraboxb = 0;
			for (var i = 0; i < tables.length; i++) {
				if (tables[i].getAttribute("class") == "extraboxb") {
					if (second_extraboxb == 0)
						second_extraboxb = 1;
					else {
						target = tables[i];
						break;
					}
				}
			}
			spans = target.getElementsByTagName("span");
			for (var i = 0; i < spans.length; i++) {
				if (spans[i].getAttribute("class") == "leipis") {
					var kuvaaja;
					var img_alt = spans[i].parentNode.getElementsByTagName("img")[0].alt;
					var luk = "Lukijakuva: ";
					var index = img_alt.indexOf(luk);
					if (index >= 0) {
						kuvaaja = img_alt.substring(luk.length);
						if (kuvaaja.length > 1)
							spans[i].innerHTML += "<br/><b>" + kuvaaja + "</b>";
						else
							spans[i].innerHTML += "";
					}
				}
			}
		}
	}
	addMainPhotographerName();
	addPhotographerNamesToGrid();
})();