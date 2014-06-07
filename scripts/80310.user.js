// ==UserScript==
// @name           IMDb External Sites + PreToMe \\
// @namespace      Livinsky
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==
// Original Script by Rob Miller. Edited to add PreTome search by kjung.
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
    {
	if (divs[i].id.search(/sponsored_links/) != -1)
	    divs[i].style.display = 'none';
	if (divs[i].id == 'top_rhs_after')
	    divs[i].style.display = 'none';
	if (divs[i].id == 'tn15adrhs')
	    divs[i].style.display = 'none';    
	}

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML = '<table><tr><td>';

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
wpLink.href = 'https://preto.me/browse.php?search=' + title + "&tags=&st=1&tf=all&cat[]=19&cat[]=7";
wpLink.style.marginRight = "70px";
wpLink.title = "PreToMe";
wpLink.innerHTML = '<img src="https://preto.me/themes/Menicante/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>PreToMe</b>';
div.appendChild(wpLink);

div.innerHTML += '</td><td>';

namePos.parentNode.insertBefore(div, namePos.nextSibling);