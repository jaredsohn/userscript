// ==UserScript==
// @name           MB. check all subscriptions
// @description    Adds a "check all" checkbox to subscriptions pages
// @version        2012-01-03_0956
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @namespace      http://userscripts.org/scripts/show/122083
// @include        http://*musicbrainz.org/user/*/subscriptions/*
// ==/UserScript==

(function () {

var cbs = document.getElementsByTagName("input");
var tmp = [];
for (var icb1=0; icb1 < cbs.length; icb1++) {
	if (cbs[icb1].getAttribute("type") == "checkbox") {
		tmp.push(cbs[icb1]);
	}
}
cbs = tmp;
var pag = document.getElementById("page");
var ths = document.getElementsByTagName("th");
if (pag && ths && ths.length > 0 && !ths[0].hasChildNodes() && cbs && cbs.length > 0) {
	var cb = ths[0].appendChild(document.createElement("input"));
	cb.setAttribute("type", "checkbox");
	cb.addEventListener("click", function (e) {
		for (var icb=0; icb < cbs.length; icb++) {
			if (cbs[icb].checked != this.checked) {
				cbs[icb].click();
			}
		}
	}, false);
}

})();