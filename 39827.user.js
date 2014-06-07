// ==UserScript==
// @name           Quick Links ~ Moved
// @namespace      http://www.bungie.net/
// @description    Adds quck links to any page you choose.  To edit links, simply edit the script to include any links you want.
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 48px;margin-right:59px;' +
    'position:absolute;top:122px;left:37%; margin-left:0px;' +
    'font-size: small; background-color: #303437; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242" style="color:white">Halo 3</a>   |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=3" style="color:white">Community</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=5576" style="color:white">Optimatch</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=4" style="color:white">Gallery</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=10" style="color:white">Flood</a>  |  <a href="http://www.bungie.net/Search/default.aspx?q=ENTER USERNAME IN SCRIPT&g=5" style="color:white">Recent</a>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}
