// ==UserScript==
//
// @name           TL.net Stream Viewer Count
// @description    Always show viewer count for streams on TL.net
// @namespace      rEiGN
// @author         rEiGN
// @version        0.1
// @include        http://www.teamliquid.net/*
//
// ==/UserScript==

var main = function() {
	var $ = jQuery;

	var streamSel = 'a[href^="/video/streams/"]';
	var links     = $(streamSel, '#calendar_content, #streams_content');

	links.each(function() {
		try {
			var link = $(this);
			var count = $('<span>', {
				text: link.attr('title').match(/(\d+) viewers?/)[1],
				css: {
					'font-size': '10px',
					'float': 'right',
					'margin-right': '8px',
					'color': '#949494',
					'text-shadow': '1px 1px rgba(255, 255, 255, 0.5)'
				}
			});

			link.after(count);
		} catch (err)  {
			return true;
		}
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
