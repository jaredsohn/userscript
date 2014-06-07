// ==UserScript==
// @name        4shared less clicks
// @namespace   http://4shared.com/
// @description Less clicks for 4shared.com
// @include     http://*.4shared.com/*
// @include     http://4shared.com/*
// @copyright   2009, Perberos (perberos@gmail.com)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     1.1
// @author      German Perugorria (Perberos)
// @homepage    http://matsusoft.com.ar/
// ==/UserScript==
if (document.getElementById("divDLWait"))
{
	function superfunction()
	{
		if (c == undefined)
			return;

		if (c > 0)
		{
			var sec = parseInt(c) + 1;
			document.title = "Still " + sec + " seconds";
			setTimeout("superfunction();", 500);
			return;
		}

		document.title = 'Done';

		var obj = document.getElementById("divDLStart");
		obj = obj.getElementsByTagName("a")[0];
		location.href = obj.href;
	}
	// Attach hack method
	var obj = document.createElement("script");
	obj.type = "application/javascript";
	obj.innerHTML = superfunction + "superfunction();";
	document.body.appendChild(obj);
}
else if (location.href.indexOf('http://www.4shared.com/file/') != -1 ||
		location.href.indexOf('http://www.4shared.com/account/file/') != -1 )
{
	var obj = document.getElementsByTagName("a");

	for (x = 0; x < obj.length; x++)
	{
		if (obj[x].className == 'dbtn')
		{
			// redirigimos al url
			location.href = obj[x].href;
		}
	}
}
