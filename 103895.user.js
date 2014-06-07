// ==UserScript==
// @name           beterspellen.nl
// @namespace      http://jellefresen.nl/BS
// @description    Voegt kleine tweaks toe aan de website beterspellen.nl
// @include        http://beterspellen.nl/website/index.php?pag=69
// @include        http://www.beterspellen.nl/website/index.php?pag=69
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('img[src="p/kolomgroen.png"]').each(function(i){$(this).attr('title',$(this).attr('alt').match(/^\d*%/i));});