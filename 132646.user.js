// ==UserScript==
// @name        ADC direct torrent links
// @namespace   http://userstyles.org/
// @description Displays direct torrent links on torrents browse page.
// @include     https://asiandvdclub.org/browse.php*
// @include     http://asiandvdclub.org/browse.php*
// @version     1.0.2
// ==/UserScript==

(function() {
	var TorrentLinks = document.evaluate("//table[@class='torrenttable']//td[@class='torrentname']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var TorrentIDRegExp = /\.php\?id=(\d{1,})/i;
	var ExcludesList = [];
	var TorrentDetailsLink = "undefined";
	var TorrentRow = "undefined";

	for (var i = 0; i < TorrentLinks.snapshotLength; i++) {
		TorrentDetailsLink = TorrentLinks.snapshotItem(i);

		if(TorrentIDRegExp.test(TorrentDetailsLink.href)) {
			if(ExcludesList.indexOf(RegExp.$1) >= 0) {
				// download id is already in exclusions list?
				continue;
			} else if(TorrentDetailsLink.href.indexOf('download.php') >= 0) {
				// extract download id and add it to exclusions list
				ExcludesList.push(RegExp.$1);
				
				continue;
			}

			TorrentRow = TorrentDetailsLink.parentNode;

			// making icon
			var icon = document.createElement('img');
			icon.className = "main-arrowdown";
			icon.style.margin = "2px 12px 2px 2px";
			icon.src = '/pic/trans.gif';
			icon.title = 'Click to download the .torrent file.';

			// making link
			var link = document.createElement('a');
			link.href = "/download.php?id="+RegExp.$1;

			// inserting icon inside of link
			link.appendChild(icon);

			// putting everything in place
			TorrentRow.insertBefore(link, TorrentDetailsLink);
		}
	}
})();