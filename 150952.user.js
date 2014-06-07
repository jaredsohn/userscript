// ==UserScript==
// @name       Keyboard Layout Shortcuts
// @namespace  http://use.i.E.your.homepage/
// @version    1.1
// @description  Keyboard Layout Shortcuts for Projanmo Forum
// @match      http://*/*
// @copyright  2012+, Zelal (zelalbd@gmail.com)
// @updateURL  https://userscripts.org/scripts/source/150952.user.js
// ==/UserScript==

//var draft_area_id = document.getElementsByTagName("textarea")[0].id;
//var draft_area = document.getElementById(draft_area_id);

var sh_keys = {17: false, 16: false, 18: false, 85: false, 80: false, 82: false, 73: false, 78: false, 69: false};
document.onkeydown = function(event)
{
	if(event.keyCode in sh_keys)
	{
		sh_keys[event.keyCode] = true;
		if(sh_keys[17] && sh_keys[18] && sh_keys[85])
		{
			document.getElementById("kblayout").selectedIndex = 1;
			get_kblayout(document.getElementById("kblayout"));
		}
		if(sh_keys[17] && sh_keys[18] && sh_keys[80])
		{
			document.getElementById("kblayout").selectedIndex = 2;
			get_kblayout(document.getElementById("kblayout"));
		}
		if(sh_keys[17] && sh_keys[18] && sh_keys[82])
		{
			document.getElementById("kblayout").selectedIndex = 3;
			get_kblayout(document.getElementById("kblayout"));
		}
		if(sh_keys[17] && sh_keys[18] && sh_keys[73])
		{
			document.getElementById("kblayout").selectedIndex = 4;
			get_kblayout(document.getElementById("kblayout"));
		}
		if(sh_keys[17] && sh_keys[18] && sh_keys[69])
		{
			document.getElementById("kblayout").selectedIndex = 5;
			get_kblayout(document.getElementById("kblayout"));
		}
	}
}


document.onkeyup = function(event)
{
	if(event.keyCode in sh_keys)
	{
		sh_keys[event.keyCode] = false;
	}
}