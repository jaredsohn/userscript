// ==UserScript==
// @name           Navbar Reincarnate & Quick Links ~ Moved
// @namespace      http://www.bungie.net/
// @description    CAVX's Navbar Reincarnate with JimboMonkey1234's Quick Links ~ Moved, working in perfect harmony.
// @include        http://*bungie.net/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addGlobalScript(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('script');
    style.innerHTML = css;
    head.appendChild(style);
}
var docURL = location.href;

addGlobalStyle('.sContentAlt {position:fixed; z-index:500; top:0px;}'+
'.bgRepeat {padding-top:70px;}'+
'#ctl00_dashboardNav { margin-left:32px; margin-top:-70px;}'+
'.sContent {padding-top:70px;}');

var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 48px;margin-right:59px;' +
    'position:fixed; z-index:501; top:122px;left:37%; margin-left:0px;' +
    'font-size: small; background-color: #303437; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242" style="color:white">Halo 3</a>   |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=3" style="color:white">Community</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=5576" style="color:white">Optimatch</a>  |  <a href ="http://www.bungie.net/Forums/topics.aspx?forumID=4" style="color:white">Gallery</a>  |  <a href="http://www.bungie.net/Forums/topics.aspx?forumID=10" style="color:white">Flood</a>  |  <a href="http://www.bungie.net/Search/default.aspx?q=JimboMonkey1234&g=5" style="color:white">Recent</a>' +
    '</p></div>';
    newElement.style.textAlign="center";
    forums.parentNode.insertBefore(newElement, forums);
}
