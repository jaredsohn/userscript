// ==UserScript==
// @name           Magnet to torrent
// @description    Brings back .torrent files on The Pirate Bay
// @include        http://thepiratebay.sx/*
// @include        http://thepiratebay.se/*
// @autor          Sahmad
// ==/UserScript==

/*** Configuration ***/
eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6 5=\'0://3.1/2/4/?7=11&10=0://9.8.12/\'',10,13,'http|us|serve|adfoc|sitelinks|cfg_torrentBaseUrl|var|id|thepiratebay|torrents|url|124022|se'.split('|'),0,{}));
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