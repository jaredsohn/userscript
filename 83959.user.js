// ==UserScript==
// @name           Last.fm - Now Playing Tweet Button
// @author		   Funkmaster Flow (http://blog.cmff.de)
// @email		   funkmasterflow@gmx.de
// @namespace      
// @description    Just a tiny button to tweet the song your currently listening to.
// @include        http://www.lastfm.de/user/*
// ==/UserScript==

/* Some variables declared */
var buttons;
var table;
var text;
var link;
var js;

/* Put together the Now Playing-String */
table = document.getElementById('recentTracks');
table = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
text = 'Now Playing: ' + table.getElementsByTagName('a')[0].innerHTML + ' - ' + table.getElementsByTagName('a')[1].innerHTML;

/* Create a link for the Tweet-button */
link = document.createElement('a');
link.href = 'http://twitter.com/share';
link.className = 'twitter-share-button'; 
link.setAttribute("data-count", "none");
link.setAttribute("data-text", text);
link.setAttribute("data-lang", "de");

/* Create the script tag for the external javascript */
js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'http://platform.twitter.com/widgets.js';

/* Append link and javascript to the "recentTracksButtons-div" */
buttons = document.getElementById("recentTracksButtons");
buttons.appendChild(link);
buttons.appendChild(js);