// ==UserScript==
// @name        Move Staff Section
// @namespace   2007HQ+
// @include     http://www.2007hq.com/forum/
// @include     http://www.2007hq.com/forum/index.php
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==

var e = $("a:contains('Off-Topic Discussion')").closest("table");
var t = $("a:contains('View Forum Leaders')").closest("tbody");
var n = t.clone();
e.append(n);
t.remove();
var r = $("a:contains('Announcements')").closest("table");
var i = $("a:contains('Staff Discussion')").closest("table");
var s = i.clone().add("<br/>");
i.remove();
r.before(s);