// ==UserScript==
// @name           Quick
// @namespace      http://www.bungie.net/Account/Profile.aspx
// @include        http://www.bungie.net/*
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '<a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242">Halo 3</a>  |  <a href="http://www.bungie.net/Forums/default.aspx?mode=halo3">Halo 3 Files</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=5576">Optimatch</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=1">Underground</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=3">Septagon</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=10">Flood</a>  |  <a href="http://www.bungie.net/Forums/default.aspx?mode=other">All the rest</a>' +
    '</p></div>';
    forums.parentNode.insertBefore(newElement, forums);
}