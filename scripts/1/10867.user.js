// ==UserScript==
// @name               Kashmira Shah Orkut Community !
// @description        Adds link to the sexy lady Kashmira Shah Pictures, News, Gossips, Etc . Now Everything About Her In Every Orkut Page . By Going To Her Community
// @include          http://orkut.com/*
// @include            http://*.orkut.com/*
// @exclude            http://orkut.com/GLogin.aspx*
// @exclude            http://*.orkut.com/GLogin.aspx*
// ==/UserScript==

// Variables declared.
var headerHTMLModified;
var headerMenu        =    document.getElementById("headerMenu");
var headerHTML        =    headerMenu.innerHTML;

// Modification of the header with the Scrapbook and Profile links.
headerHTMLModified    =    headerHTML + ' | <a href="http://www.orkut.com/Community.aspx?cmm=27869768">Kashmira Shah</a>';
headerMenu.innerHTML    =    headerHTMLModified;