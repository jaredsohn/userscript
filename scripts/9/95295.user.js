// ==UserScript==
// @name           soundcloud hide comments fixed
// @author         1allen, modified by m36
// @namespace      http://userscripts.org/scripts/show/95295
// @description    soundcloud hide comments fixed
// @include        http://www.soundcloud.com/*
// @include        http://soundcloud.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){

function fix_cm_soundcloud()
{
	$('div.player').addClass('no-comments');
	$(document).bind('onContentLoaded', function(){ $('div.player').addClass('no-comments')});
}

document.addEventListener('DOMNodeInserted', fix_cm_soundcloud, false);
})();