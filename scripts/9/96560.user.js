// ==UserScript==
// @name           Pchome_auto18
// @namespace      pa
// @include        http://shopping.pchome.com.tw/*f=sexy*
// @version        1.01
// ==/UserScript==
function simulateClick(e){
	e.nodeType || (e=e.length==1?e[0]:null);
	if( e )
	{
	  var Event;
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("mousedown", true, true);
	  e.dispatchEvent(Event);
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("click", true, true);
	  e.dispatchEvent(Event);
	  Event = document.createEvent("MouseEvents");
	  Event.initEvent("mouseup", true, true);
	  e.dispatchEvent(Event);
	}
}
var ok = document.querySelectorAll('img[src$="sexy_index_06.jpg"]');
simulateClick(ok);