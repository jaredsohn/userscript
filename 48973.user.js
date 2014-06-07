// ==UserScript==
// @name           Quick Linkz yo
// @namespace      Quick Linkz yo
// @description    Changes the current quick links to snackie's demands.
// @include        http://*bungie.net/*

// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; ' +
    'font-size: small; background-color: #242223; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/Forums/topics.aspx?forumID=1" style="color: white;">Bungie Universe</a> | <a href="http://www.bungie.net/Forums/topics.aspx?forumID=3" style="color: white;">Community</a> |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=10" style="color: white;">The Flood</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=105242" style="color: white;">Halo 3</a>   |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=304365" style="color: white;">Halo: Reach</a> | <a href="http://www.bungie.net/Forums/topics.aspx?forumID=304364" style="color: white;">Halo 3: ODST</a>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);    

// Snakie likes pewp.