// ==UserScript==
// @name          Toranoana Cart Links
// @version        0.1
// @namespace      http://d.hatena.ne.jp/kei_koyama/
// @description    add permalink on Toranoana mailorder's cart
// @include        http://www.toranoana.jp/cgi-bin/R2/details05.cgi*
// ==/UserScript==

(function addLinks() {
	var tdTotal = document.getElementsByTagName("td").length;

	for (i = 29; i <= tdTotal; i = i + 9) {
		if (document.getElementsByTagName("td")[i].firstChild.length !== 12)
			break;
	var itemID = document.getElementsByTagName("td")[i].firstChild.nodeValue;
	var itemURL = "http://www.toranoana.jp/mailorder/article/"+itemID.substring(0,2)+"/"+itemID.substring(2,6)+"/"+itemID.substring(6,8)+"/"+itemID.substring(8,10)+"/"+itemID+".html";

	document.getElementsByTagName("td")[i+1].innerHTML = document.getElementsByTagName("td")[i+1].innerHTML.link(itemURL);
	}

})();