// ==UserScript==
// @name           Ogame Redesign: Alliance button in left menu - Leaders of the Galaxy
// @namespace      userscripts.org
// @version        1.0
// @description    Add alliance button in left menu - Leaders of the Galaxy
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
(function() {
	var unsafe = window;
	try {unsafe = unsafeWindow} catch(e) {}
	var $ = unsafe.$;
	if (!$) return;
	try {
        var objButton = $('#menuTable li').eq(1).clone(true);
        objButton.find('.menu_icon').html('');
        objButton.find('.menubutton').removeClass('selected').attr('href', 'http://galaxyleaders.ucoz.ru/').attr('target', '_blank').find('.textlabel').html('LoG - Site');
        objButton.appendTo('#menuTable');
    }
   	catch(e) {}
})()