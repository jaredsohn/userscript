// ==UserScript==
// @name			Free-lance.ru NoRedirect
// @namespace		http://hurumba.ru
// @description		Remove all redirects from the site Free-lance.ru
// @include			http://www.free-lance.ru/*
// @version			1.0 - 6th Sep 2009
// ==/UserScript==

//
// (C) Vlad Medov 2009			http://hurumba.ru
//

(
	function()
	{
		for (var i=0;i<document.links.length;i++)
		{
			var link = document.links[i];

			if (link.href.match(/.+\/a\.php\?href=(.+)/i))
			{
				var okhref = unescape(RegExp.$1);
				
				if (okhref.length>20)
					link.innerHTML='ссылка:'+okhref.substring(0,20)+'...';
				else
					link.innerHTML='ссылка:'+okhref;
				
				link.alt=okhref;
				link.href=okhref;
				
			}
		}
	}
)();