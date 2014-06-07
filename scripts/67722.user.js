// ==UserScript==
// @name           Unappealing authority
// @namespace      http://ianen.org/greasemonkey/
// @description    Removes usernames from posts
// @include        http://news.ycombinator.com/item?id=*
// ==/UserScript==
(function()
{
	var map_ = function(xs, f)
	{
		var arr_xs = [];
		for (var ii in xs) { arr_xs.push(xs[ii]); }
		for (var ii in arr_xs) { f(arr_xs[ii]); }
	};
	
	var hide = function(e) { e.style.display='none'; }
	
	map_ (document.getElementsByClassName("comhead"), function (head)
	{
		// Hide score and username
		map_ (head.children, function (child)
		{
			if (child.href && child.href.match(/\/user\?id=.*$/) !== null)
			{ hide (child); return; }
		});
		
		// Remove stub "by"
		map_ (head.childNodes, function (node)
		{
			if (node.textContent === " by ")
			{ head.removeChild (node); }
		});
	});
})();