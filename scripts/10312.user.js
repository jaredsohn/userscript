// ==UserScript==
// @name           IMDb External Sites
// @namespace      r@robm.me.uk
// @include        http://www.imdb.com/*title*
// @include        http://imdb.com/*title*
// ==/UserScript==

titleEl = document.evaluate( '//div[@id = "tn15title"]/h1', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
var title = titleEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var p = document.createElement("p");
p.style.marginTop = "5px";

var cLink = document.createElement("a");
cLink.href = 'http://www.criticker.com/index.php?st=movies&h=' + title;
cLink.style.marginLeft = "5px"
cLink.title = "View on Criticker";
cLink.innerHTML = "Criticker";
p.appendChild(cLink);

var wpLink = document.createElement("a");
wpLink.href = 'http://google.co.uk/search?q=site:en.wikipedia.org film ' + title;
wpLink.style.marginLeft = "10px"
wpLink.title = "View on Wikipedia";
wpLink.innerHTML = "Wikipedia";
p.appendChild(wpLink);

titleEl.parentNode.insertBefore(p, titleEl.nextSibling);