// ==UserScript==
// @name           Newgrounds New Reviews Highlighter
// @namespace      greasemonkey.knugen.com/ngnewreviewshighlighter
// @description    Highlights new reviews on your flash submissions
// @include        http://www.newgrounds.com/account/flash/edit
// ==/UserScript==

var container 	= document.getElementById('cont');
var html		 = container.innerHTML;

container.innerHTML = html.replace(/(([1-9]+) (New))/gi, '<span style="background-color: #F00">$2 $3</span>');
