// ==UserScript==
// @name           IMDb External Sites
// @namespace      Livinsky
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<table><tr><td>';

var wpLink = document.createElement("a");
wpLink.href = 'http://en.wikipedia.org/wiki/Special:Search?search=' + title;
wpLink.style.marginRight = "70px";
wpLink.title = "Wikipedia (EN)";
wpLink.innerHTML = '<img src="http://en.wikipedia.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Wikipedia (EN)</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

var wp2Link = document.createElement("a");
wp2Link.href = 'http://es.wikipedia.org/wiki/Special:Search?search=' + title;
wp2Link.style.marginRight = "70px";
wp2Link.title = "Wikipedia (ES)";
wp2Link.innerHTML = '<img src="http://en.wikipedia.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Wikipedia (ES)</b>';
div.appendChild(wp2Link);

div.innerHTML += '</td><td>';

var isoLink = document.createElement("a");
isoLink.href = 'http://isohunt.com/torrents/?ihq=' + title;
isoLink.style.marginRight = "70px";
isoLink.title = "IsoHunt";
isoLink.innerHTML = '<img src="http://isohunt.com/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>IsoHunt</b>';
div.appendChild(isoLink);

div.innerHTML += '</td></tr></table>';

namePos.parentNode.insertBefore(div, namePos.nextSibling);