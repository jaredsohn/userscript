// ==UserScript==
// @name				Youtube Favorites Top Navigation
// @version				2011 Sep 15th
// @author				XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Adds page link navigation (Prev, Next) above videos on Favorites page to match the bottom.
// @include				http://www.youtube.com/my_favorites*
// @include				http://*.youtube.com/my_favorites*
// ==/UserScript==

function gid(_X){return document.getElementById(_X);}
X=gid('vm-video-actions-bar');
Y=gid('vm-pagination');
if(X&&Y){X.parentNode.insertBefore(Y.cloneNode(1),X);}