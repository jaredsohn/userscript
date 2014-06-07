// ==UserScript==
// @name          Stay in TheLion.com Forum
// @description   When clicking on a Stock Symbol in a Trader Forum, go to the Stock's Forum rather than it's Yahoo Quote.
// @include       http://thelion.com/bin/la.cgi?cmd=open&url=http%3A%2F%2Ffinance.yahoo.com%2Fq%3Fs%3D*
// @include       http://www.thelion.com/bin/la.cgi?cmd=open&url=http%3A%2F%2Ffinance.yahoo.com%2Fq%3Fs%3D*
// ==/UserScript==

window.location.replace ( "http://" + document.location.host + "/bin/forum.cgi?sf=" + unescape(document.location.href).match( /[\w|\.]*(?=&return)/ ) );