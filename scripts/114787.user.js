// ==UserScript==
// @name           ogame_img
// @namespace      exter
// @include        http://*.ogame.*game/index.php?page=showmessage*
// @author 		   exter
// @homepage 	   http://ineiron.net
// @version 	   1.0
// ==/UserScript==
var imgs = document.getElementsByClassName('reloadimage');
for (var i = 0; i<imgs.length; i++){imgs[i].src = imgs[i].title;}
