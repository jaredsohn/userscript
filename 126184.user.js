// ==UserScript==
// @id             BibliaBiblicalPopups
// @name           Biblia Biblical Popups
// @version        1.0
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    Want to popout a passage in a separate window - middle click the book cover.
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
var sp = document.createElement('script');
sp.setAttribute('type', 'text/javascript');
sp.setAttribute('src', 'http://userscripts.org/scripts/source/126183.user.js');

var headID = document.getElementsByTagName("head")[0];
headID.appendChild(sp);