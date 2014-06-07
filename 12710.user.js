// ==UserScript==
// @name           Yahoo! Mail Classic Large Editor
// @namespace      http://fatknowledge.blogspot.com
// @description    Use all available screen space for the editor. 
// @include        http://*.mail.yahoo.com/ym/Compose*
// ==/UserScript==

unsafeWindow.addEventListener('load', function() {
GM_log("width:"+window.innerWidth);
GM_log("height:"+window.innerHeight);

	var ea = document.getElementById('bodyfield');
	if (ea) {
		var new_cols = Math.round((window.innerWidth-100)/9);
		//GM_log("new_cols:"+new_cols);
		ea.cols = new_cols;

        var new_rows = Math.round((window.innerHeight-420)/16);
		//GM_log("new_rows:"+new_rows);
		ea.rows = new_rows; 
	}
}, false);