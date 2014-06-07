// ==UserScript==
// @name           lien forum kat
// @author     	   lililou
// @include        http://*.ogame.*
// ==/UserScript==

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://forum-kat.forumactif.net/forum.htm" target="_blank"><span class="textlabel">Forum KaT INC</span></a></li>';
			

document.getElementById('menuTable').appendChild(LinkDiv);
setTimeout("tb_init('#menuTable a.thickbox')",0);