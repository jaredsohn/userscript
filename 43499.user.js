// ==UserScript==
// @name           Nettby - Back... in black!
// @namespace      http://www.nettby.no/user/index.php?user_id=563395
// @description    Gir nettby et MYE bedre utsende!  CSS-code.
// @include        *nettby.no*
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://dump.no/files/48c302c38a8d/css.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
