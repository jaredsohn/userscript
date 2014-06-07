// ==UserScript==
// @name           IMDb External Sites + IPTorrents & Revolution TT
// @namespace      Livinsky
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==
// Original Script by Rob Miller. Edited to add IPTorrents and RevolutionTT searches by kjung.

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<table><tr><td>';

var wp2Link = document.createElement("a");
wp2Link.href = 'http://www.google.com/search?hl=en&source=hp&q=' + title;
wp2Link.style.marginRight = "70px";
wp2Link.title = "Google";
wp2Link.innerHTML = '<img src="http://66.102.9.104/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Google</b>';
div.appendChild(wp2Link);

div.innerHTML += '</td><td>';

var wp2Link = document.createElement("a");
wp2Link.href = 'http://www.youtube.com/results?search_query=' + title;
wp2Link.style.marginRight = "70px";
wp2Link.title = "YouTube";
wp2Link.innerHTML = '<img src="http://www.youtube.com/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>YouTube</b>';
div.appendChild(wp2Link);

div.innerHTML += '</td><td>';

var wpLink = document.createElement("a");
wpLink.href = 'http://en.wikipedia.org/wiki/Special:Search?search=' + title;
wpLink.style.marginRight = "70px";
wpLink.title = "Wikipedia";
wpLink.innerHTML = '<img src="http://en.wikipedia.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Wikipedia</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

var wpLink = document.createElement("a");
wpLink.href = 'http://www.iptorrents.com/browse.php?search=' + title;
wpLink.style.marginRight = "70px";
wpLink.title = "IPTorrents";
wpLink.innerHTML = '<img src="http://www.iptorrents.com/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>IPTorrents</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

var wpLink = document.createElement("a");
wpLink.href = 'http://www.revolutiontt.net/browse.php?search=' + title;
wpLink.style.marginRight = "70px";
wpLink.title = "RevolutionTT";
wpLink.innerHTML = '<img src="http://www.revolutiontt.net/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Revolution TT</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

namePos.parentNode.insertBefore(div, namePos.nextSibling);