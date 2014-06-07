// ==UserScript==
// @name            LSL-Wiki Link Fix
// @namespace       http://home.comcast.net/~mailerdaemon/
// @description     Fixes bad links on the LSL wiki
// @include         http*://*secondlife.com/badgeo/*
// ==/UserScript==
(function() {
	var links = window._content.document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++)
	{
		var t = links.item(i).href.split("?");
		if(t.length>2)
		{
			var m = t[0].concat("?").concat(t[1]);
			for (var j = 2; j < t.length; j++)
				m = m.concat("&").concat(t[j]);
			links.item(i).href = m;
		}
	}
})();