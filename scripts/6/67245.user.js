// ==UserScript==
// @name           4chan - old style post page
// @namespace      fuck that
// @description    It changes the retarded text.
// @version        1.7
// @author         lukini
// @include        http://sys.4chan.org/*/post
// @include        http://sys.4chan.org/*/imgboard.php
// ==/UserScript==

var table = document.getElementsByTagName("table")[0];
table.style.textAlign = "left";
table.style.fontSize = "inherit";
table.style.height = "auto";
var td = document.getElementsByTagName("td")[0];
td.innerHTML = td.innerHTML.replace(/<\/?b>/g, "");