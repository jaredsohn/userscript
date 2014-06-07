// ==UserScript==
// @name           FullAnimes Enable Text Selection
// @author         Aversiste
// @namespace      FullAnimes
// @date           24/09/2010
// @version        0.1
// @description	   The FullAnimes.free.fr guy is stupid and disable text selection. Only work with GreaseMonkey
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://fullanimes.free.fr*
// ==/UserScript==

unsafeWindow.document.onmousedown=function() {return true};