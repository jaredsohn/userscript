// ==UserScript==
// @name           IMDb NextGen
// @namespace      tgk00
// @include        http://*.imdb.*/title/*
// @include        http://imdb.*/title/*
// @include        http://*.imdb.*/name/*
// @include        http://imdb.*/name/*
// ==/UserScript==
// Original Script by Rob Miller. Edited by tgk00.

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<table><tr><td>';

//NextGen

var wpLink = document.createElement("a");
wpLink.href = 'http://nxtgn.org/browse.php?search=' + title;
wpLink.style.marginRight = "12px";
wpLink.title = "NextGen";
wpLink.innerHTML = '<img src="http://nxtgn.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>NG</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';



namePos.parentNode.insertBefore(div, namePos.nextSibling);
