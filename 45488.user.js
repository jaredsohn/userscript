// ==UserScript==
// @name           What.CD Collage Direct Link
// @namespace      http://jonls.dk
// @description    Make collage images link directly to album when opened in a new tab.
// @include        http://what.cd/collage.php?id=*
// @include        https://ssl.what.cd/collage.php?id=*
// @version        0.1
// @date           2009-03-30
// ==/UserScript==

(function() {
	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	/* Change links */
	var links = document.getElementById('collage_table').getElementsByTagName('a');
	for (var i in links) {
		var m = links[i].href.match(/#group_(\d+)/);
		if (m) {
			links[i].href = whatcd_url_base+'/torrents.php?id='+m[1];
			links[i].addEventListener('click', function(event) {
				window.location.hash = 'group_'+m[1];
				event.preventDefault();
			}, false);
		}
	}
})();
