// ==UserScript==
// @name           beatDJ.net - No More 'SWAG'
// @namespace      http://userscripts.org/users/minevalmont
// @description    Con este script, no volveras a oir la cancion de Celebrity Deathmatch.
// @include        http://www.beatdj.net/foros/*
// @include        http://beatdj.net/foros/*
// @exclude        http://www.beatdj.net/foros/misc.php?page=radio
// @exclude        http://beatdj.net/foros/misc.php?page=radio
// ==/UserScript==

var x = document.getElementsByTagName('embed');
for(var i=x.length-1;i>=0;i--)
{
	x[i].parentNode.removeChild(x[i]);
}