// Dinosaur Comics Easter Eggs NG v0.1
//
// Copyright (c) 2007 Ben Bleything <ben@bleything.net>
// Distributed under the BSD license
//
// ==UserScript==
// @name          Dinosaur Comics Easter Eggs NG
// @namespace     http://bleything.net
// @description   shows the three Dinosaur Comics easter eggs (comic title, RSS title, and comments subject) beneath the comic.  Works for archive pages too!
// @version       0.2
// @include       http://www.qwantz.com/
// @include       http://www.qwantz.com/index.pl?comic=*
// @include       http://www.qwantz.com/archive/*
// @include       http://qwantz.com/
// @include       http://qwantz.com/index.pl?comic=*
// @include       http://qwantz.com/archive/*
// ==/UserScript==

// // helper from http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
        if (!context) context = document;
        var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
        return arr;
}

// rss_title looks like this:
//   <span class="rss-title">panel three is pretty straightforward.</span>
// so we need to get rid of the html
var rss_title = $x("/html/body/font/table/tbody/tr/td/table/tbody/tr[4]/td/comment()")[0].textContent;
rss_title = rss_title.substring( 25, (rss_title.length - 8) );

var comic_img = $x("//span[@class='rss-content']/table/tbody/tr/td/center/font/img")[0];
var comic_title = comic_img.getAttribute( 'title' );

var comments_href = $x("//a[contains(@href, 'mailto')]")[0].href;
var comments_subject = comments_href.substring(31,comments_href.length);

// <div id="easter_eggs_container">
var easter_eggs = document.createElement("div");

easter_eggs.innerHTML += "<b>Comic Title:</b> "      + comic_title + "<br />";
easter_eggs.innerHTML += "<b>RSS Title:</b> "        + rss_title   + "<br />";
easter_eggs.innerHTML += "<b>Comments Subject:</b> " + unescape(comments_subject);

comic_img.parentNode.insertBefore(easter_eggs, comic_img.nextSibling);
