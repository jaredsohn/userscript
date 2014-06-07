// ==UserScript==
// @name          ArenaBG XXX Section
// @author        TNT
// @description   Remove onclick attribute from arenabg.com XXX section of all links.
// @icon          https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include       http://arenabg.com/torrents/type:xxx
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version       1.0
// @run-at        document-start
// ==/UserScript==

$(document).ready(function(){
	table=$('table.torrents');
	links=table.find('tbody > tr > td:nth-child(2) > a');
	links.each(function(index, el){
		try{
			$el=$(el);
			str=$el.attr('onclick');
			url=str.match(/http\:\/\/(.[^';])+/g);
			$el.removeAttr('onclick').attr('href', url);
		}
		catch(e){}
	});
});