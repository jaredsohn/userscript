// ==UserScript==
// @name           Quick2
// @namespace      http://www.bungie.net/
// @include        http://www.bungie.net/*
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 43px;margin-right:53px;' +
    'font-size: small; background-color: #242223; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/Forums/topics.aspx?forumID=304365" style="color:white">Halo: Reach</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=304364" style="color:white">Halo 3: ODST</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242" style="color:white">Halo 3</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=1" style="color:white">Bungie Universe</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=3" style="color:white">Septagon</a>  |  <a href="http://www.bungie.net/Forums/default.aspx?mode=other" style="color:white">All the rest</a>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}