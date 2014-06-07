// ==UserScript==
// @name          Sozluk Arama Eklentisi
// @description   e$isözlük başlık arama fasilitesine torrent sitelerini ekler
// @description   this script adds various torrent search sites to e$isözlük topic search dropdown menu
// @author        HuzursuZ
// @version       0.0.2
// @date          11/03/2013
// @include       http://antik.eksisozluk.com/show.asp*

// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
newTorrentSearches = [
								["demonoid","www.demonoid.com/files/?category=0&subcategory=All&quality=All&seeded=0&external=2&uid=0&sort=&query="],
								["youtorrent","www.youtorrent.com/tag/?q="],
								["mininova","www.mininova.org/search/?search="],
								["the pirate bay","thepiratebay.org/search.php?q="],
								["torrentspy","torrentspy.com/search.asp?query="],
								["tvrss","tvrss.net/search/?show_name="],
								["isohunt","isohunt.com/torrents.php?ext=&op=and&ihq="],
								["pointblank","bt.point-blank.cc/?search="],
								["sumo torrent","www.sumotorrent.com/searchResult.php?search="],
								["btjunkie","btjunkie.org/search?q="],
								["bush torrent","www.bushtorrent.com/torrents.php?search=&words="],
								["fenopy","fenopy.com/?keyword="],
								["mybittorrent","mybittorrent.com/?keywords="],
								["seedpeer","www.seedpeer.com/search.php?search="],
								["torrent box","torrentbox.com/torrents-search.php?search="],
								["torrent reactor","www.torrentreactor.to/torrents/search/"],
								["bittorrent","www.bittorrent.com/search?search="],
								["torrentz","www.torrentz.com/search?q="]
							];
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}

window.addEventListener(
    'load', 
    function() {
		var searchSelect = find("//select[@class='asl']",XPFirst);
		if (searchSelect) {
			var toropt = document.createElement("optgroup");
			toropt.label = "torrent arama";
			for(var i=0;i<newTorrentSearches.length;i++) {
				var addSearch = document.createElement("option");
				addSearch.innerHTML = newTorrentSearches[i][0];
				addSearch.value = "http://" + newTorrentSearches[i][1];
				toropt.appendChild(addSearch);
			}
			searchSelect.appendChild(toropt);
		}
	},
    false);