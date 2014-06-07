// ==UserScript==
// @name           bookmarks
// @namespace      http://userscripts.org/users/33073/scripts
// @description    holt die lesezeichen in die unterforen
// @include        http://forum.mods.de/bb/*
// @exclude        http://forum.mods.de/bb/index.php
// ==/UserScript==


var td = document.evaluate("//table[@cellspacing='0' and @cellpadding='1' and @border='0' and @width='95%' and contains(.,'Moderiert von:')]", document, null, 8, null).singleNodeValue.getElementsByTagName("tr")[1],
	rs = function() {
		return function(e) {
		// das waere die schoene loesung:
		/*
			var text = e.responseText, parser = new DOMParser();
			text = parser.parseFromString(text, "text/xml");
			alert(text.getElementsByClassName("std").textContent);
		*/
			var text = e.responseText.split("<div class='std'>")[1].split("<table border")[0], bm;
			with(td.parentNode.insertBefore((bm=document.createElement("div")), td.nextSibling)) innerHTML = text;
		}
	}
GM_xmlhttpRequest({
	method: "get",
	url: "http://forum.mods.de/bb/index.php",
	onload: rs()
});
