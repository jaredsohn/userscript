// ==UserScript==
// @name           MSDN - Lightweight View LeftNav Toggler
// @namespace      http://www.davidkirk.net
// @include        http://msdn.microsoft.com/en-us/library/*
// ==/UserScript==


function GO() {
	var bodyContent = $('.OH_outerContent');
	var leftNav = $('.OH_leftNav');
	var toggler = $('<div title="Toggle Navigation" style="position:absolute; top:0px; left:0px; bottom:0px; width:8px; background-color:#3F529C;color:silver;font-size:7pt;"></div>');
	toggler.toggle(function(){leftNav.css('width', '2px');}, function(){leftNav.css('width', null);});
    
    bodyContent.
		css('position', 'relative').
		css('padding-left', '18px').
		prepend(toggler);
		
}

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; GO(); }
}

GM_wait();

