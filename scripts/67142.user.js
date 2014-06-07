// ==UserScript==
// @name           IMDB Warez-BB OpenSubs Youtube
// @namespace      r3b31
// @include        http://*.imdb.*/title/*
// @include        http://imdb.*/title/*
// ==/UserScript==
// Original Script by Rob Miller. Edited by r3b31.

//ad remover code by skeeto (http://userscripts.org/scripts/review/50476)
//licensed under ISC License (https://www.isc.org/software/license)

// Hide certain page elements with CSS.
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
    {
	if (divs[i].id.search(/sponsored_links/) != -1)
	    divs[i].style.display = 'none';
	if (divs[i].id == 'top_rhs_after')
	    divs[i].style.display = 'none';
    }

// Remove all iframes (only used for ads)
var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';

//end of ad remover code

nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

var imdbcode = document.location.toString();
imdbcode = imdbcode.replace('http://www.imdb.com/title/', '');
imdbcode = imdbcode.replace('/', '');
imdbid = imdbcode.replace('tt', '');


div.innerHTML = '';

//Warez-BB

var wpLink = document.createElement("a");
wpLink.href = 'http://www.warez-bb.org/search.php?mode=results&search_keywords=' + imdbcode
wpLink.style.marginRight = "25px";
wpLink.title = "warez-bb";
wpLink.innerHTML = '<img src="http://img5.warez-bb.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Warez-BB</b>';
div.appendChild(wpLink);

div.innerHTML += ' ';

//OpenSubtitles

var wpLink = document.createElement("a");
wpLink.href = 'http://www.opensubtitles.org/en/search/sublanguageid-por,pob/imdbid-' + imdbid;
wpLink.style.marginRight = "25px";
wpLink.title = "opensubtitles";
wpLink.innerHTML = '<img src="http://www.opensubtitles.org/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>OpenSubtitles</b>';
div.appendChild(wpLink);

div.innerHTML += ' ';


//Youtube

var wp2Link = document.createElement("a");
wp2Link.href = 'http://www.youtube.com/results?search_query=' + title;
wp2Link.style.marginRight = "25px";
wp2Link.title = "YouTube";
wp2Link.innerHTML = '<img src="http://www.youtube.com/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>YouTube</b>';
div.appendChild(wp2Link);

div.innerHTML += ' ';

namePos.parentNode.insertBefore(div, namePos.nextSibling);

//r3b31