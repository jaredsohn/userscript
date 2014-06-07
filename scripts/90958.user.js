// ==UserScript==
// @name           Youtube - upper playlist pager
// @namespace      http://www.youtube.com/my_playlists*
// @include        http://www.youtube.com/my_playlists*
// ==/UserScript==
(function(){pager=document.getElementById('vm-pagination');upper=pager.cloneNode(true);document.getElementById('vm-playlist-header').appendChild(upper)})();