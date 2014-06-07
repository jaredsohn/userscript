// ==UserScript==
// @id             whatsidr9komegle
// @name           Omegle regular avoider
// @version        1.0
// @namespace
// @author
// @description    reconnects before you're connected to a non-interest Omegler
// @include        http://www.omegle.com/
// @include        http://omegle.com/
// @include        https://www.omegle.com/
// @include        https://omegle.com/
// @run-at         document-end
// ==/UserScript==

(function()
{
	var omegle_interval = 10 * 1000; // 10 seconds

	var $ = function(a, b)
	{
		var es = document.getElementsByTagName(a);

		for(var i in es)
		{
			if(es[i].className === b)
			{
				var e = es[i];
				break;
			}
		}

		if(typeof e !== 'undefined')
		{
			return e;
		}
	}

	var timeout;

	setInterval(function()
	{
		if($('div', 'commonlikescancel')) // if we've begun to wait
		{
			if(typeof timeout === 'undefined')
			{
				timeout = setTimeout(function()
				{
					try
					{
						$('button', 'disconnectbtn').click()
						setTimeout(function() { $('button', 'disconnectbtn').click() }, 250);
						setTimeout(function() { $('button', 'disconnectbtn').click() }, 500);
					}
					catch(e) {}

					clearTimeout(timeout); timeout = undefined;
				}, omegle_interval - (2 * 1000));
			}
		}
		else
		{
			clearTimeout(timeout); timeout = undefined;
		}
	}, 500);
})();