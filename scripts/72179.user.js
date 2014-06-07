// ==UserScript==
// @name           RevolutionTT IMDb Torrent Search
// @namespace      Haribo
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==
// Original Script by Rob Miller. Edited by hopehope

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<img src="http://imgur.com/guYnj.gif" /> <b>RevolutionTT Search</b><br />';

var wpLink = document.createElement("a");
wpLink.href = 'http://www.revolutiontt.net/browse.php?search=' + title;
wpLink.style.marginRight = "10px";
wpLink.title = "RevolutionTT";
wpLink.innerHTML = '<b>Search for this film...</b><br />';
div.appendChild(wpLink);

div.innerHTML += '<br />';

namePos.parentNode.insertBefore(div, namePos.nextSibling);