// ==UserScript==
// @name           Whirlpool Forums Archive
// @namespace      http://userscripts.org/users/74605
// @description    Add a link to the archive view of a thread in the thread pagination.
// @include        http://forums.whirlpool.net.au/forum-replies.cfm?t=*
// ==/UserScript==

var url = document.location.href;
var start = url.lastIndexOf('?t=') + 3;
var end = url.indexOf('&') > 0 ? url.indexOf('&') : url.length;
var thread = url.substring(start, end);
var pages = document.getElementById('top_pagination');
var li = document.createElement('li');
li.innerHTML = '<a href="forum-replies-archive.cfm/' + thread + '.html">Archive</a>';
pages.insertBefore(li, pages.childNodes[pages.childNodes.length - 1]);