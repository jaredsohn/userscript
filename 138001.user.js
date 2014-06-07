// ==UserScript==
// @name          Links for netvibes bar
// @version       1.1
// @namespace     http://userscripts.org/users/fredp42
// @description   Insert Links in the netvibes bar
// @include       http://www.netvibes.com/*
// @grant         none
// ==/UserScript==

// links to display: name + url
var links = [
    "Google",   "https://www.google.com",
    "Images",   "https://www.google.com/imghp",
    "Maps",     "https://maps.google.com",
    "Play",     "https://play.google.com",
    "YouTube",  "https://www.youtube.com",
    "News",     "https://news.google.com",
    "Gmail",    "https://mail.google.com",
    "Agenda",   "https://www.google.com/calendar/",
    "Drive",    "https://drive.google.com",
];

// style to use
style = 'height: 20px; padding: 0px 8px 0px 8px; cursor: pointer; \
    font: bold 1.2em/20px "Helvetica Neue",Helvetica,Arial,sans-serif;';

txt = "";
for (i = 0; i < links.length; i = i + 2)
{
    txt = txt + "<a style='" + style + "' href='" + links[i+1] + "'>" + links[i] + "</a>";
}

// get element bar and insert a cell in the first row
var top = document.getElementById('top');
var row = top.rows[0];
row.insertCell(1).innerHTML = txt;
