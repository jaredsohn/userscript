// ==UserScript==
// @name           TitleOnTop
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
// @exclude		   *flickr.com/photos/*/alltags*
// @exclude		   *flickr.com/photos/*/organize*
// ==/UserScript==

document.getElementById('primary-column').insertBefore(document.getElementsByTagName('h1')[0],document.getElementById('nav'));
