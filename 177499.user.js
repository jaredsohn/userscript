// ==UserScript==
// @name           Get Fullsize Image for Naver
// @namespace      http://userscripts.org/users/mizuho
// @description    
// @include        http://blog.naver.com/*
// @include        http://cafe.naver.com/*
// @copyright      2013 by Mizuho
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @version        1258306524556; Mon Nov 16 2009 02:35:24 GMT+0900
// @injectframes   1
// ==/UserScript==

(function()
{

	var intervalID;
	var domain = window.location.host;

	start();

	function start()
	{
		// For Blog
		if (domain.toLowerCase().indexOf("blog.")>-1)
		{
			var pagecontainer=document.getElementById('mainFrame').contentWindow.document;
			if (!pagecontainer) return;
			for (var i=0; i<pagecontainer.images.length; i++) 
			{
				var imgobj = pagecontainer.images[i];
				if (imgobj != null) 
				{
					var link = imgobj.getAttribute('src');
					var newlink = link.replace(/postfiles([0-9]+)/gi, "blogfiles");
					link = newlink.replace(/[?]type=w([0-9]+)/gi, "");
					imgobj.setAttribute('src', link);
				}
			}
		}

		/* For Cafe */
		if (domain.toLowerCase().indexOf("cafe.")>-1)
		{
			var pagecontainer=document.getElementById('cafe_main').contentWindow.document;
			if (!pagecontainer) return;
			for (var i=0; i<pagecontainer.images.length; i++) 
			{
				var imgobj = pagecontainer.images[i];
				if (imgobj != null) 
				{
					var link = imgobj.getAttribute('src');
					var newlink = link.replace(/cafeptthumb([0-9]+).phinf/gi, "cafefiles");
					link = newlink.replace(/[?]type=w([0-9]+)/gi, "");
					imgobj.setAttribute('src', link);
				}
			}
		}
	}
})();