// ==UserScript==
// @name           Pardus PM Highlighter
// @namespace      pardus.at
// @description    Pardus PM Highlighter
// @include        http://*.pardus.at/messages_private.php*
// @version        0.2
// @author         John Wu
// ==/UserScript==

var vips = /Erius|John Wu/
var doc = document;
var a = doc.getElementsByTagName('a');
		for (var i=0;i < a.length;i++) {
			if (a[i].innerHTML.match(vips)) {
				var foo = a[i].innerHTML;
				a[i].innerHTML = "<font color='black'>" + foo + "</font>";
				var x = a[i].parentNode.parentNode;
				x.style.padding = '1px';
				x.style.border = '1px solid white';
				x.style.backgroundColor = 'yellow';
				}
			}