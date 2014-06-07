// ==UserScript==
// @name           Ogame Redesign: No reload for Movement page
// @namespace      userscripts.org
// @description    Prevent Fleet movement page from being reloaded when some fleet reaches its destination
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function() {
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}

	if ( !unsafe.$ ) return;
	
	unsafe.reload_page = function() {};
})()