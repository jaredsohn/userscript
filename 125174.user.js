// ==UserScript==
// @name           Back to the torrents
// @namespace      tb
// @include        http://torrentbutler.eu/*-*
// ==/UserScript==
/*
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004
 
Copyright (C) 2004 Sam Hocevar
 14 rue de Plaisance, 75014 Paris, France
Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.
 
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 
 0. You just DO WHAT THE FUCK YOU WANT TO.
*/

function main(){
	var $jq = jQuery.noConflict();
	var start = "http://torrents.thepiratebay.se/";
	var end = ".torrent";
	$jq('.neutral').each(function(){
		var link = start + $jq(this).find('.info_link a').attr('href').split('/').slice(4,6).join('/') + end;
		$jq(this).find('.download a').attr('href', link);
	});
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
} 

addJQuery(main);