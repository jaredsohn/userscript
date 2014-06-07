// ==UserScript==
// @name           fotocommunity nude pictures by judgeu
// @namespace      http://www.fotocommunity.de/
// @description    fotocommunity nude pictures by judgeu
// @include        http://www.fotocommunity.com/*
// @include        http://www.fotocommunity.de/*
// ==/UserScript==


window.addEventListener('load', function (e)  {
	var makeNudeImages = function()
	{
		$('a.img').find('canvas').each(function()
		{
			var c = $(this),
			a = c.parents('a'),
			href = a.attr('href');
			
			//extract id
			if (href.match(/\/(\d+)$/))
			{
				var thumb = 'http://cdn.fotocommunity.com/images/1/2/3-m' + RegExp.$1 + '.jpg';
				var newSrc = 'http://cdn.fotocommunity.com/images/1/2/3-a' + RegExp.$1 + '.jpg';
				
				a.html('<img src="' + thumb + '">');
				a.attr('href', newSrc);
				a.attr('target', '_blank');
			}
		});
	};
	
	makeNudeImages();
	
	$(document).scroll(function()
	{
		makeNudeImages();
	});
}, false);

