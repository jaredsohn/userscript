// ==UserScript==
// @name        TrackPanelNewWindows
// @namespace   trackpanel
// @description TrackPanelNewWindows
// @include     https://trackpanel.net/space/*
// @version     1
// ==/UserScript==

var waiter = null;
waiter = setInterval(function()
{
	if (typeof Space != 'undefined')
	{
		makeLinksOpenInNewWindow();
	}
	
}, 1000);

function makeLinksOpenInNewWindow()
{
	$("a[href^=http]").each(function()
	{
		if(this.href.indexOf(location.hostname) == -1)
		{
			$(this).off('click').attr('target', '_blank').on('click', function() {
				window.open(this.href);
				return false;
			});
		}
	});
	clearInterval(waiter);
}