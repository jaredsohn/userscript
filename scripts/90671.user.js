// ==UserScript==
// @name           TV-Vault Highlight Newest Torrents
// @namespace      http://________.com
// @description    Highlights the most recently added torrent of a particular group making it easy to find when browsing torrent listings.
// @include        http://tv-vault.me/torrents.php*
// @include        http://*.tv-vault.me/torrents.php*
// ==/UserScript==

//v 0.7R

var nhn = document.getElementById("torrent_table").getElementsByTagName("tr");
for (var y=0;y<nhn.length;y++) {
	if (nhn[y].className=="group"&&nhn[y].getElementsByTagName("td")[3]) {
		var refd = nhn[y].getElementsByTagName("td")[3].textContent;
	}
	var nes = nhn[y];
	while (nes) {
		if (refd&&nes.className.indexOf("group_torrent")!=-1&&nes.getElementsByTagName("td")[2]) {
			var matd = nes.getElementsByTagName("td")[2];
			if (refd.match(matd.textContent)) {
				//applyStyling();
				matd.id="badhack";
				break;
			}
		}
		nes = nes.nextElementSibling;
	}
}

GM_addStyle('#badhack {color:#ffffff !important; font-size: 101%!important;}');


