// ==UserScript==
// @name           PCC D2L: Rows to Columns
// @namespace      pcc-d2l
// @include        https://online.pcc.edu/d2l/lms/discussions/messageLists/frame_right.d2l?*
// ==/UserScript==

function rowsToColumns () {
	var frames = document.getElementsByTagName("FRAMESET");
	for (var i = 0; i < frames.length; ++i) {
		if (frames[i].rows == "50%,50%") {
			frames[i].cols = "50%,50%";
			frames[i].rows = "*";
		}
	}
}

rowsToColumns();