// ==UserScript==
// @name           Ogame Redesign: FixServerTimeBug
// @namespace      antikiller
// @description    Bug fix for server time after switching to winter time (start it before AntGame if you use them both)
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function(){
	
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	
	if ( !unsafe.$ ) return;
	
	unsafe.old_getFormatedDate_fix = unsafe.getFormatedDate; 
	unsafe.getFormatedDate = function (date,format)
		{ return unsafe.old_getFormatedDate_fix(date-3600000, format) };

})()