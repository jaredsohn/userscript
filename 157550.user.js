// ==UserScript==
// @name       #1 Scammer
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        https://hackforums.net/showthread.php?tid=*
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /Codevade/g, '#1 Scammer' );
document.body.innerHTML = html;