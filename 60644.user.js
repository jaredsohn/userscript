// ==UserScript==
// @name           Auteur Torrents
// @namespace      http://etcet.net
// @description    Add torrent search engine link on theauteurs.com
// @include        http://*.theauteurs.com/films*
// @include        http://*.theauteurs.com/festivals*
// ==/UserScript==

//isohunt
var site_name = "iSOHUNT";
var torrent_site = "http://isohunt.com";
var query_url = "/torrents/";
var modifiers = "?ihs1=2&iho1=d&iht=1"; // i.e. to sort the list of results, etc.
/*
//mininova
var site_name = "Mininova";
var torrent_site = "http://www.mininova.org";
var query_url = "/search/"
var modifiers = "/4/seeds";
*/

var actions = document.getElementsByClassName("actions");
var titles = document.getElementsByClassName("film_title");

//actions.length will be > 1 on /films and /festivals
if (actions.length > 1) {
	for( var i = 0; i < actions.length; i++ ) {
		var title = escape(titles.item(i).firstChild.firstChild.nodeValue);
		
		append(title, actions.item(i));
	}
}
//single film page (/films/*) (or unexpected)
else {
	var title = escape(document.title.substring(0,document.title.indexOf('(')-1));
	var actions = document.getElementsByClassName("actions");
	if (actions.length > 0) 
		append(title, actions[0]);
}

//append link to torrent search for title in actions div
function append(title, actions) {
	var find_url = torrent_site + query_url + title + modifiers;
	var newp = document.createElement('span');
	newp.innerHTML = "  |  <a href='"+find_url+"'>Search "+site_name+"</a>";
	actions.appendChild(newp); 
}