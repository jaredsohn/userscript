// ==UserScript==
// @name           ShortNews | Werbe-Blocker
// @namespace      ShortNews
// @description    Werbung wird entfernt.
// @include        http://*shortnews.de/*
// ==/UserScript==

document.getElementById("logo").innerHTML = "<div style='padding: 15px; float: left;'><a href='http://www.shortnews.de' target='_top'><img src='/img/shortnews_logo.gif' alt=' ShortNews Logo ' title=' ShortNews - die news-community  ' border='0'></a></div>";