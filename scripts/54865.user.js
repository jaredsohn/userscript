// ==UserScript==
// @name          Remove MSN Top
// @description   Removes top of MSN page
// @include       http://my.msn.com/*
// ==/UserScript==

document.getElementById('logosection').style.display='none';
document.getElementById('topcontent').style.setProperty('height','30px','important');
document.getElementById('head').style.setProperty('min-height','50px','important');
document.getElementById('headWrap').style.display='none';
document.getElementById('headimage').style.setProperty('background-image','none','important');