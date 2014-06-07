// ==UserScript==
// @name           PCC D2L: Wrap long message titles
// @namespace      pcc-d2l
// @include        https://online.pcc.edu/d2l/lms/discussions/messageLists/message_list_gridstyle.d2l?*
// ==/UserScript==

function allowTitlesToWrap () {
	var tds = document.getElementsByTagName("TD");
	for (var i = 0; i < tds.length; i++) {
		if (tds[i].className == "d_gn" && tds[i].colSpan > 1) {
			tds[i].className = "i_dont_think_so";
			tds[i].style.whiteSpace = "normal !important";
		}

	}
}

allowTitlesToWrap();
