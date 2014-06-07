// ==UserScript==
// @name          kef.bg XXX Section
// @author        TNT
// @description   Remove onclick attribute from kef.bg XXX section of all links.
// @icon          https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include       http://www.kef.bg/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version       1.0
// @run-at        document-start
// ==/UserScript==

$(document).ready(function(){
	container=$('div#rightPart');
	links=container.find('.thumbGirls > a.linkGrey');
	links.each(function(index, el){
		try{
			$el=$(el);
			str=$el.attr('href');
			url=str.match(/(\/list\/\d+\/\d+){1}/g);
			$el.attr('href', url);
		}
		catch(e){}
	});
});