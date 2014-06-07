// ==UserScript==
// @name           What.CD Torrent Direct Link
// @namespace      http://jonls.dk
// @description    Make torrent links on album pages link directly to torrent when opened in a new tab.
// @include        http://what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @version        0.1.1
// @date           2009-10-04
// ==/UserScript==

(function() {
	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	/* Change links */
	var groups = document.getElementById('content').getElementsByClassName('torrent_table')[0].getElementsByClassName('group_torrent');
	for (var i = 0; i < groups.length; i++) {
		var c = groups[i].getElementsByTagName('td')[0].childNodes;
		for (var j = 0; j < c.length; j++) {
			if (c[j].tagName == 'A') {
				var link = c[j];
				var m = link.getAttribute('onclick').match(/\$\(\'\#torrent_(\d+)\'\)\.toggle\(\)/);
				if (m) {
					var n = document.URL.match(/torrents.php\?id=(\d+)/);
					if (n) {
						link.href = whatcd_url_base+'/torrents.php?id='+n[1]+'&torrentid='+m[1];
						link.addEventListener('click', function(event) {
							$('#torrent_'+m[1]).toggle();
							event.preventDefault();
						}, false);
					}
				}
				break;
			}
		}
	}
})();
