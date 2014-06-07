// ==UserScript==
// @name           4chan Unspoiler
// @namespace      userscript.org
// @description    Makes all text spoilers visible.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @version        1.0
// ==/UserScript==

var despoilcount = 0;
function removeSpoilers() {
	var s = document.createElement("style");
	s.innerHTML = "s, s a:not(:hover) {background: none repeat scroll 0% 0% #000000 ! important;color: #ffffff ! important;text-decoration: none;}";
	s.setAttribute("id","despoilsheet"+despoilcount);
	document.getElementsByTagName("head")[0].appendChild(s);
	document.getElementById("styleSelector").setAttribute("onchange" , "document.getElementById('despoilsheet" + despoilcount + "').disabled = true; setActiveStyleSheet(this.value);document.getElementById('despoilbutton').click(); return false;");
	despoilcount++;
	despoil.setAttribute('value', 'Hide spoilers');
	despoil.onclick = function() {
		onClick();
	};
}
removeSpoilers();