// ==UserScript==
// @name           DW24/7 Shoutbox Index
// @namespace      McPeake (Hostile)
// @description    Shoutbox on index
// @include        http://forums.digitalwarfare247.com/*
// ==/UserScript==

if (document.getElementById ('category_45'))
{
	var wdiv = document.getElementById ('category_45');
			wdiv.innerHTML = '<iframe id=reloader name=reloader scrolling=yes frameborder=0 width=1000px height=150px src=http://forums.digitalwarfare247.com/index.php?/shoutbox/index.php#shoutbox-shouts-td>';
			wdiv.innerHTML += '<input type="button" value="Refresh ^" onclick="parent.top.reloader.location.reload(true);" />';
			wdiv.innerHTML += '<iframe scrolling=no frameborder=0 width=100% height=150px src=http://forums.digitalwarfare247.com/index.php?/shoutbox/index.php#shouts-resizer>';
}