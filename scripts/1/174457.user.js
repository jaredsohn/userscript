// ==UserScript==
// @name         ComedixTools-IG
// @namespace    http://tools.comedix.de
// @version      0.0.2
// @description  Gives you useful ingame tools.
// @match        *://game.asterix.browsergames.telekom.net/xiro_live/client/play/index.php*
// @copyright    2013+, ComedixTools (c) Bubelbub
// @author       Bubelbub <bubelbub@gmail.com>
// @updateURL    https://userscripts.org/scripts/source/174457.meta.js
// @downloadURL  https://userscripts.org/scripts/source/174457.user.js
// ==/UserScript==

var minimized = false,
	div = null,
	minDiv = null,
	minLink = null,
	iframe = null;

unsafeWindow.jQuery(function()
{
	div = unsafeWindow.jQuery('<div />').appendTo('body').attr('id', 'comedixtools-ig');
	minDiv = unsafeWindow.jQuery('<div />').appendTo(div);
	minLink = unsafeWindow.jQuery('<a />').appendTo(minDiv);
	iframe = unsafeWindow.jQuery('<iframe></iframe>').appendTo(div).attr('src', 'http://tools.comedix.de/ingame');

	/* Global style */
	div
		.css('position', 'absolute')
		.css('left', '0px')
		.css('bottom', '0px')
		.css('min-width', '420px')
		.css('min-height', '306px')
		.css('height', '34%')
		.css('width', '25%')
		.css('background-color', '#ffffff')
		.css('z-index', 2)
		.css('padding-top', '10px')
		.css('padding-right', '17px')
		.css('padding-left', '17px')
	;
	minDiv
		.css('position', 'absolute')
	;
	minLink.attr('href', '#').html('X');
	iframe
		.css('height', '98%')
		.css('width', '99%')
		.css('border', '0px')
		.css('min-height', '300px')
	;

	/* Chrome browser */
	if(typeof(unsafeWindow.BrowserDetect) !== 'undefined' && unsafeWindow.BrowserDetect.browser === 'Chrome')
	{
		div
			.css('opacity', '0.8')
			.css('border-top-right-radius', '50px')
		;
		minDiv
			.css('right', '17px')
			.css('top', '17px')
		;
	}
	else
	/* Firefox etc. */
	{
		minDiv
			.css('right', '10px')
			.css('top', '10px')
		;
	}

	minLink.click(function(e)
	{
		if(minimized === false)
		{
			minimized = true;
			iframe.hide();
			div
				.css('min-width', '20px')
				.css('min-height', '23px')
				.css('height', '4%')
				.css('width', '1%')
				.css('padding-left', '0px')
			;
		}
		else
		{
			minimized = false;
			minLink.html('X').css('text-decoration', 'none').css('font-weight', 'normal');
			iframe.show();
			div
				.css('min-width', '420px')
				.css('min-height', '306px')
				.css('height', '34%')
				.css('width', '25%')
				.css('padding-left', '17px')
			;
		}
		e.preventDefault();
	});
});

/* Events for alerts etc. */

// variables copied from http://davidwalsh.name/window-iframe / THX
var eventMethod = unsafeWindow.addEventListener ? 'addEventListener' : 'attachEvent',
	eventer = unsafeWindow[eventMethod],
	messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

eventer(messageEvent, function(e)
{
	var cmd = e.data.split(';');

	if(cmd[0] == 'newMessages')
	{
		var newMessages = minLink.html().match(/[0-9]+/) ? parseInt(minLink.html()) : 0;
		minLink.html(parseInt(cmd[1]) < 1 || !minimized ? 'X' : newMessages + parseInt(cmd[1]));
		if(!minLink.html().match(/X/))
		{
			minLink.css('text-decoration', 'blink').css('font-weight', 'bold');
		}
	}
}, false);
