// ==UserScript==
// @name           'Get Torrent File' on The Pirate Bay
// @namespace      http://claude.duvergier.fr/portfolio/developpements/greasemonkey/
// @description    Re-adds the "Get Torrent File" link on The Pirate Bay
// @include        http://thepiratebay.se/*
// @autor          DUVERGIER Claude
// @see            http://claude.duvergier.fr/portfolio/developpements/greasemonkey/get_torrent_file_on_the_pirate_bay/
// ==/UserScript==

/*** Configuration ***/
var cfg_torrentBaseUrl = 'http://torrents.thepiratebay.se/';
/*** /Configuration ***/


/*** Fetch infos on torrent TPB's entry ***/
var torrentName = document.querySelector('div#title').innerHTML.trim();
var torrentId = document.querySelector('form#commentsform>p>input[name=id]').getAttribute('value');
/*** /Fetch infos on torrent TPB's entry ***/


var downloadDiv = document.querySelector('div#details>div.download');
if (downloadDiv.innerHTML.indexOf(cfg_torrentBaseUrl) == -1) { // No torrent link found
	var magnetLink = document.querySelector('div#details>div.download>a');
	var getTorrentLink = document.createElement('a');
	
	downloadDiv.innerHTML += '('; //Note: if this line if placed before the one that fetches magnetLink element, getTorrentLink will be created beforce the parentheses
	
	/* Create classic torrent link */
	getTorrentLink.setAttribute('href', cfg_torrentBaseUrl + torrentId + '/' + torrentName.replace(/[\\\/ :*?"<>|]/g, '_') + '.' + torrentId + '.TPB.torrent');
	getTorrentLink.setAttribute('title', 'Torrent File');
	getTorrentLink.innerHTML = 'Get Torrent File';
	/* /Create classic torrent link */
	
	downloadDiv.insertBefore(getTorrentLink, magnetLink.nextSibling); // Adds classic torrent link
	
	downloadDiv.innerHTML += ')';
}