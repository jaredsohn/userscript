// ==UserScript==
// @name           saite uz pēdējā galerijas apskatītāja profilu
// @namespace      draugiemLv
// @description    iegūst saiti uz pēdējā galerijas apskatītāja profilu, ja šī saite nav pieejama - nav pasūtīta galeriju statistika.
// @include        http://*draugiem.lv/gallery/
// ==/UserScript==

// Add jQuery
if(typeof unsafeWindow.jQuery == 'undefined') {
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

// Check if jQuery's loaded
function GM_wait() {
	if	(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else {
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait();

// Code
function letsJQuery() {
	$(".pairPicBoxImg1 a").each(function(i) {	
		if (this.href.indexOf("/gallery/?selectedTab=8") > -1) {
			var img = $(this).children("img").attr("src");
			if (img.split("sm_").length == 2) {
				var id = parseInt(img.split("sm_")[1].split(".")[0]);
				if (id > 0) {
					this.href = "http://www.draugiem.lv/friend/?fid=" + id;
				}
			}
		}
	});
}
