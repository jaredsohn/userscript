// ==UserScript==
// @name           TribalWarsMap Auto
// @namespace      MrPopeen
// @description    Auto closes the ads and then center on your main village. Intended for the no flash map.
// @include        *tribalwarsmap.com*
// ==/UserScript==

location.assign( "javascript:toggle('adds');");
location.assign( "javascript:%20mainvillage.center();");