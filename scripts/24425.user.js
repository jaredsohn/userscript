// ==UserScript==
// @name           Browsershots extender
// @namespace      bf
// @description    Clicks Extend button on Browsershots site every minute not to let your screenshots expire :P
// @include        https://browsershots.org/http://*
// ==/UserScript==

(function() {

	setTimeout( 
		'var buttons = document.getElementsByTagName("input");'
		+'for (var i=0; i<buttons.length; i++) {'
		+'	var b = buttons[i];'
		+'	if (b.name!="extend"||b.disabled=="disabled") continue;'
		+'	b.click();'
		+'	break;'
		+'}', 1000*60);	
		
	setTimeout("window.location.reload()", 1000*70);
})();