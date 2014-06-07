// ==UserScript==
// @name           IMTpb Linker
// @author         AliaRNL
// @include        http://*.imdb.*/title/*
// @exclude        http://*.imdb.*/title/*/locations
// @exclude        http://*.imdb.*/title/*/releaseinfo
// @exclude        http://*.imdb.*/title/*/mediaindex
// @exclude        http://*.imdb.*/title/*/videogallery
// @exclude        http://*.imdb.*/title/*/keywords
// @exclude        http://*.imdb.*/title/*/synopsis
// @exclude        http://*.imdb.*/title/*/fullcredits
// @exclude        http://*.imdb.*/title/*/companycredits
// @exclude        http://*.imdb.*/title/*/business
// @exclude        http://*.imdb.*/title/*/news
// @exclude        http://*.imdb.*/title/*/technical
// @exclude        http://*.imdb.*/title/*/cinemashowtimes
// ==/UserScript==


nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

// TITLE
var title = nameEl.innerHTML.replace(/<[^>]+>/g, '');
title = title.replace(/(\([^\)]+\))/g, '');
title = title.replace(/^\s+|\s+$/g, '');

//Placing Search
var div = document.createElement("div");
div.id='tpb';
div.style.textAlign="right";
div.style.marginTop="-35px";
div.innerHTML = '<table><td>';

//Google TPB Search
var tpblink = document.createElement("a");
tpblink.setAttribute("target","_blank");

// 200 = All Videos | 201 = Movies | 207 = HD Movies | 202 = DVD
tpblink.href = 'https://thepiratebay.org/search/' + title + '/0/99/201';
tpblink.title = "Search on TPB";
tpblink.innerHTML = '<img src="data:image/bmp;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA=" align="absmiddle" border="0" vspace="3"> <b>The Pirate Bay</b>';
div.appendChild(tpblink);
div.innerHTML += '</td>';

namePos = document.evaluate( '//div[@id = "tn15main"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos.parentNode.insertBefore(div, namePos.nextSibling);