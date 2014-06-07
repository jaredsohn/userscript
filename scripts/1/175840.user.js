// ==UserScript==
// @name            Gaia Online Remove Pjax
// @description     Gaia's Pjax sucks. This will remove it.
// @author          Sheldon Corcoran (Awesomolocity)
// @icon            http://gaiaonline.com/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/175840
// @downloadURL     http://userscripts.org/scripts/source/175840.user.js
// @updateURL       http://userscripts.org/scripts/source/175840.meta.js
// @namespace       http://awesomolocity.info
// @version         1.0.0
// @include         http*://*.gaiaonline.com/forum/*
// @include         http*://gaiaonline.com/forum/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

if($('.yui3-pjax').length !=0){
	$('.yui3-pjax').each(function(){
		$(this).removeClass('yui3-pjax');
	});
}