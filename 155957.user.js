// ==UserScript==
// @name        TorrentFreak Pirate Bay Link
// @description Adds a link to The Pirate Bay to the "Top 10 Most Pirated Movies on BitTorrent" posts on TorrentFreak
// @namespace   TorrentFreak
// @include     http://torrentfreak.com/top-10-most-pirated-movies*
// @include     https://torrentfreak.com/top-10-most-pirated-movies*
// @grant       none
// @version     1
// ==/UserScript==

thead = document.getElementsByTagName("thead")[0];
th = thead.getElementsByTagName("th")[3];
th.innerHTML += "<strong> / TPB </strong>";
tbody = document.getElementsByTagName("tbody")[0];
tr_list = tbody.getElementsByTagName("tr");
for(var i=0;i < tr_list.length;i++){
	tr = tr_list[i];
	if(tr.getElementsByTagName("td").length > 2){
		td = tr.getElementsByTagName("td")[3];
		imdbHref = td.getElementsByTagName("a")[0].href;
		re = /imdb.*title\/(\w+)/.exec(imdbHref);
		if(re){
			imdbId = re[1]
			console.log("ID: " + imdbId)
			td.innerHTML += " / <a href='https://thepiratebay.se/search/" + imdbId + "'><strong>TPB</strong></a>"
		}
	}
}