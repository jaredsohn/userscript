// ==UserScript==
// @name           Quick Links JK edition
// @namespace      http://www.bungie.net/
// @include        http://www.bungie.net/*
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 0px;margin-right:0px;' +
    'font-size: small; background-color: #282A29; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/default.aspx" style="color:white">Bungie Home</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242" style="color:white">Halo 3</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=10" style="color:white">The Flood</a>  |  <a href="http://www.bungie.net/Forums/default.aspx?mode=other" style="color:white">The rest</a>  |  <a href="http://www.bungie.net/fanclub/dead_cowboys/Group/GroupHome.aspx" style="color:white">Dead Cowboys</a>  |  <a href ="http://www.bungie.net/fanclub/256623/Group/GroupHome.aspx" style="color:white">ODST 14th</a>  |  <a href ="http://reapersmodz.b1.jcink.com/index.php?" style="color:white">Reapers</a>  |  <a href="http://www.facebook.com/home.php?" style="color:white">Facebook</a>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}